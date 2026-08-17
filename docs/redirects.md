# The redirect table

Written 2026-08-15. It answers GitHub issue #4, and the canonical host half of
issue #6.

The old WordPress site goes offline in September 2026. On that day every old
address must land somewhere correct, or the search rankings that were bought are
lost. This file says where the table lives, which decisions are baked into it,
and what still has to happen before the old site can be switched off.

## Where it lives

| File | What it is |
|---|---|
| `docs/url-map.csv` | All 522 old URLs, each with a new URL and an action. Generated. |
| `app/redirects.ts` | Every row that must not 404, as a typed array: 439 of them. Generated. |
| `next.config.ts` | Imports the array, turns `temporary` into 307 or 308, and adds the canonical host rule. Written by hand. |
| `scripts/build-url-map.py` | Writes both generated files. Run it after any change. |

```sh
python3 scripts/build-url-map.py
```

The table is data, so it does not live in `next.config.ts`. A config file that
is 439 rows of data is a config file nobody reads.

Counts today: 522 old URLs, of which 346 redirect, 101 keep, 66 drop and 9
rebuild. That produces 439 rows in `app/redirects.ts`: 259 permanent (308,
the address has moved for good) and 180 parked (307, the page it wants is not
written yet). Only the 66 `drop` rows answer 404, which is what `drop` means.

## Decision 1. The articles stay at the root

`docs/rebuild-review.md` section 5 proposed moving the 63 articles to
`/artikelen/<slug>`. That is reversed. An article keeps its old root URL,
`/<slug>`, which is what `app/[artikel]/page.tsx` already serves. `/artikelen`
stays as the index page, and it exists.

Why: it is the one URL change that would cost a redirect hop on pages that rank,
and it buys nothing. The rule is one line in `scripts/build-url-map.py`, in
`resolve()`, under `if kind == "post"`.

Two things follow from it.

- **An article row is a `keep`, not a `redirect`.** The address does not change,
  and a redirect from a URL to itself is a loop. The script now also catches
  that case in general: any row whose new URL is its own old URL becomes a
  `keep`. One other row needed it, `/locaties/gouda/`, because the old site
  redirects it to `/gouda/` and we send `/gouda/` back to `/locaties/gouda`.
- **A `keep` is still work.** 60 of the 63 articles are not imported into
  `app/articles.ts` yet. Until they are, their URLs are parked on `/artikelen`
  with a 307 rather than left to 404. See "308 for gone, 307 for parked".

  This file used to warn against exactly that, on the grounds that the day an
  article is imported the stale redirect would shadow the live page and the
  article would be invisible. The risk is real and it is now caught: the ladder
  reads the routes that exist on disk, so re-running the generator removes the
  row by itself, and if somebody imports an article and forgets to re-run it,
  **the build fails**. `app/sitemap.ts` refuses to prerender when a sitemap URL
  is also a redirect source, and every article is in the sitemap. Proved on
  2026-08-16 by putting a parked source into `staticPaths`: the build stopped
  with `sitemap: /... is a redirect source in app/redirects.ts`.

## Decision 2. No redirect may land on a 404

Many targets in the map are pages nobody has written yet. `build-url-map.py`
reads the routes that really exist (it walks `app/` for `page.tsx`, and fills
`[artikel]` from `app/articles.ts` and `[stad]` from `app/cities.ts`), and sends
every target that does not exist down this ladder:

| Target with no page | Lands on |
|---|---|
| `/tarieven` | `/studiekeuzetraject` (the price is not decided) |
| `/onze-methode` | `/studiekeuzetraject` |
| `/coach-worden`, `/vacatures` | `/studiekeuzecoaches` |
| `/bedankt` | `/` |
| `/studiekeuzecoaches/<person>` | `/studiekeuzecoaches` |
| `/locaties/<city with no page>` | `/locaties` |
| An article slug that is not in `app/articles.ts` | `/artikelen` |
| Anything else | `/` |

A route counts as real only when its page is on disk, so the ladder can never
trust a promise. `/ervaringen` was written as an exception while this table was
built, because it was being written at the same time. Its page landed first, so
the exception is gone. No redirect targets it: the old `/ervaringen/` URL keeps
its address, it does not move.

The ladder line for an article reads `/artikelen/<slug>` in the ticket. Because
of Decision 1 an article target is a root URL, so the script matches a target
that is a known old article slug instead. Same rule, new address shape.

**A fallback carries a `// waits for <target>` comment** on its row in
`app/redirects.ts`. Build the page, run the script again, and the fallback
disappears by itself. Nothing has to be edited by hand.

### A `keep` row with no page is a redirect too, until its page lands

The ladder used to run on `action=redirect` rows only. That left every `keep`
and `rebuild` row whose page was not written yet answering **404**: 93 URLs,
carrying 5.898 inbound links and 57.348 words of archived text, and every one of
them still ranking. Decision 1 made that worse rather than better, because it
moved 62 article rows from `redirect` to `keep`, so they stopped falling down
the ladder and started 404ing instead.

So the ladder now runs on every row except a `drop`. A `keep` row whose page
exists is skipped, because the address answers for itself. A `keep` row whose
page does not exist yet is parked on the nearest real page until it does.

### 308 for gone, 307 for parked

Not every row is permanent, and the difference matters more than it looks.

- **308, permanent.** The address is gone for good, so a search engine should
  move the ranking to the destination and stop asking.
- **307, temporary.** The destination is a stand-in for a page we intend to
  write. A 308 here would hand away an address that still ranks and that we mean
  to serve ourselves, so the crawler is asked to keep the old address and come
  back.

`settled` in `scripts/build-url-map.py` decides which, and **it is not the same
as "did we need a fallback"**. A fallback can be the final answer:

| Landing | Code | Why |
|---|---|---|
| The real target exists | 308 | The move is done |
| `/contact` to `/locaties` | 308 | There is no central contact point, and there will not be one |
| `/over-ons` to `/studiekeuzecoaches` | 308 | The company is the coaches. No about page is planned |
| `/studiekeuzecoaches/<person>` to the roster | 308 | Those three people do not work here. That page is never coming |
| An article to `/artikelen` | 307 | The text is in the archive and the rights are bought. Importing it is work, not a decision |
| A city to `/locaties` | 307 | The page opens when a coach signs |
| `/tarieven`, `/onze-methode`, `/coach-worden`, `/bedankt` | 307 | Planned, blocked on the client |
| Anything unrecognised | 308 | Nothing is planned for it, so the front door is the honest final answer |

### Targets waiting for a page

180 of the 439 rows stand on a fallback today, and answer 307 rather than 308.

| Waiting target | Rows | Lands on for now |
|---|---:|---|
| `/tarieven` | 42 | `/studiekeuzetraject` |
| `/onze-methode` | 4 | `/studiekeuzetraject` |
| `/coach-worden` | 4 | `/studiekeuzecoaches` |
| `/bedankt` | 2 | `/` |
| `/locaties/` for 33 cities without a coach | 58 | `/locaties` |
| 59 articles not imported into `app/articles.ts` | 70 | `/artikelen` |

The three old coach interviews are not in that list any more: they are settled
308s to the roster, because those people do not work here. One of them is worth
a second look though. 1129 words of Janneke's interview hang on
`/studiekeuzecoaches/janneke-van-den-brand`, she IS our coach, and today the
roster only offers the anchor `#janneke`. A page per coach would turn that 308
into a real destination. See issue #46.

## The 22 legacy redirects

The old site already redirects 22 URLs. They carry link value from two or three
rebrands ago and they must survive the move. They are in
`../studiekeuzeadvies archive/redirect-map.csv`, in the `redirects_to` column,
and `build-url-map.py` follows every one of them to its final destination, so a
legacy source never points at another redirect. 21 of the 22 are rows in
`app/redirects.ts`. The 22nd is `/locaties/gouda/`, which the old site sends to
`/gouda/`, which comes back to `/locaties/gouda`: the address does not change,
so it is a `keep` and not a redirect. It answers 404 until Gouda has a page.

## The two rows the generator cannot judge

**`/vacature-keuzecoach-dordrecht/` now goes to `/coach-worden`,** and not to
`/` where the old site sends it. The old hop is what WordPress does with a
deleted vacancy, not a decision: its two sisters, `/vacature-keuzecoach/` and
`/vacature-keuzecoach-zwolle/`, both go to `/vacatures/`, and all three are
mapped to `/coach-worden` by hand. The reader on that URL is a coach who looks
for work, and the home page speaks to a study chooser. So the rule in the script
is now general: a path that is written down by hand in `PAGE_MAP` beats the hop
the old site happens to make. Only this one row changes because of it. Until
`/coach-worden` is built, the ladder sends it on to `/studiekeuzecoaches`.

**The webshop URLs still point at `/tarieven`.** 41 rows target `/tarieven`, of
which 29 are the shop itself: 9 product pages, 5 shop pages (`/winkel/`,
`/winkelwagen/`, `/afrekenen/`, `/mijn-account/` and its lost password page) and
15 product taxonomies. That holds only if the shop does not come back. It is not
decided, so they follow the ladder to `/studiekeuzetraject` for now. Two things
to know when the price decision lands: the old products are the Qompas tests,
which this site does not sell (see issue #43), so most of those URLs
describe something we do not offer. Sending them to a price page we do have is
still better than a 404.

## Trailing slashes, and the one extra hop

Every old URL ends in a slash. Every source in `app/redirects.ts` is written
without one, on purpose.

`trailingSlash` is false, which is the Next default and what this site uses.
With that setting Next puts its own redirect, `/:path+/` to `/:path+`, in front
of the whole table (see `load-custom-routes.js`, which unshifts it). So
`/oude-pagina/` first loses its slash with a 308, and only then matches our row.
A source written *with* a slash would never be reached, which is the failure
mode this note exists to prevent.

The price is one extra hop for every old URL: 308 to strip the slash, 308 to the
new address. Both are permanent and a search engine follows them, so the ranking
arrives. Vercel behaves the same way, and the alternative
(`skipTrailingSlashRedirect`) is worse: it would serve the same page on two
addresses and make the duplicate content problem of issue #35 bigger.

Measured against Next's own matcher, with the config of this repo:

```
http://www.studiekeuzeadvies.nl/vacature-keuzecoach-dordrecht/
   308 -> http://www.studiekeuzeadvies.nl/vacature-keuzecoach-dordrecht
   308 -> http://www.studiekeuzeadvies.nl/studiekeuzecoaches
```

## The canonical host: www wins

Counted over the whole archive:

```sh
grep -roh "https\?://\(www\.\)\?studiekeuzeadvies\.nl" html meta markdown | sort | uniq -c
```

146356 links write `https://www.studiekeuzeadvies.nl`, 18 write the `http` www
form, and not one writes the bare host. So the www host is the one the search
engines know, and it is the canonical host.

`next.config.ts` holds a permanent redirect from `studiekeuzeadvies.nl` to
`https://www.studiekeuzeadvies.nl`, matched with a `has` host rule. Next reads a
`has` host value as a regular expression and anchors it at both ends, so the
escaped dot in `studiekeuzeadvies\.nl` cannot match `www.studiekeuzeadvies.nl`
and the rule cannot loop.

The source of that rule is `/:path(.*)`, not the `/:path*` that reads more
naturally. Next matches a source in strict mode, and `/:path*` compiles to a
regular expression that does not match `/` at all. With `/:path*` the bare host
home page, the one address a person types by hand, would be the only page that
never reached the www. This was measured against Next's own matcher, not
assumed.

**The same redirect must also be set on the Vercel domain configuration, and
that is where it belongs in production.** Both domains have to be attached to
the project anyway, or the bare host answers nothing at all and the rule below
never runs. Vercel answers at the edge, before the app runs, so the redirect
costs no function call and it also covers the requests the app never sees. Set
`studiekeuzeadvies.nl` to redirect to `www.studiekeuzeadvies.nl`.

The rule in `next.config.ts` is the safety net that travels with the code, so a
preview, a self hosted build or a new hosting provider keeps the same canonical
host. `app/layout.tsx` already sets `metadataBase` to the www host.

## What still answers 404

Only the 66 `drop` rows, which is what `drop` means: a date archive, a tag page,
an attachment, a page the old site already marked `noindex`. Letting those 404
is the decision, not a gap in it.

Everything else lands on a page that answers 200. Verified by walking all 522
rows of `docs/url-map.csv` against a production build on 2026-08-16:

| Intended action | Rows | Final answer |
|---|---:|---|
| `redirect` | 346 | 200 |
| `keep` | 101 | 200 |
| `rebuild` | 9 | 200 |
| `drop` | 66 | 404, on purpose |

**The 404s are gone, the work behind them is not.** 180 of those rows only reach
200 because they are parked on a stand-in page. A reader who followed a Google
result for "studiekeuze Eindhoven" now lands on `/locaties` instead of nothing,
which is better, but it is not the page they searched for. The two decisions
that actually close this are unchanged, and both are tracked: which articles to
import (#15) and which of the 37 cities to open (#29). The 307
exists to keep those addresses ours until then.

Importing the articles is the cheapest of the two by a distance. The text is
already on disk in the archive, the rights are bought, and 70 parked rows point
at articles. Search Console tells you which to do first. It does not gate
whether you may.

## How to check the table

Four things must be true, and they are checked against `app/redirects.ts` and
the real routes:

1. No source is also a real route. A redirect would shadow a live page, because
   Next checks redirects before the filesystem.
2. No target is itself a source. No chains.
3. Every target resolves to a route that exists.
4. No duplicate sources.

Result on 2026-08-16: 439 rows, 0 shadowed routes, 0 chains, 0 missing targets,
0 duplicates, 0 self redirects, 0 empty sources, 259 permanent and 180 parked.
Re-check after any change to `app/`:

```sh
python3 - <<'PY'
import re, csv, importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location("bum", "scripts/build-url-map.py")
bum = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bum)
routes = bum.app_routes()

rows = re.findall(
    r'\{ source: "([^"]+)", destination: "([^"]+)" \}',
    Path("app/redirects.ts").read_text(),
)
sources = [s for s, _ in rows]
targets = [d for _, d in rows]
print("rows           ", len(rows))
print("1 shadowing    ", sorted(set(sources) & routes))
print("2 chains       ", sorted(set(targets) & set(sources)))
print("3 missing      ", sorted({d for d in targets if d not in routes}))
print("4 duplicates   ", sorted({s for s in sources if sources.count(s) > 1}))
PY
```

Run `python3 scripts/build-url-map.py` first if anything in `app/` changed. The
generator will not fix a shadowed route by itself, and check 1 is the one that
catches it: adding a city to `app/cities.ts` without regenerating leaves a
redirect standing in front of the new page.
