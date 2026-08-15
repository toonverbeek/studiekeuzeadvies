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
| `app/redirects.ts` | The 346 `action=redirect` rows, as a typed array. Generated. |
| `next.config.ts` | Imports the array, makes every row permanent, and adds the canonical host rule. Written by hand. |
| `scripts/build-url-map.py` | Writes both generated files. Run it after any change. |

```sh
python3 scripts/build-url-map.py
```

The table is data, so it does not live in `next.config.ts`. A config file that
is 346 rows of data is a config file nobody reads.

Counts today: 522 old URLs, of which 346 redirect, 101 keep, 66 drop and 9
rebuild. Every redirect is permanent, so Next answers with a 308 and a search
engine moves the ranking to the new address.

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
- **A `keep` is still work.** 59 of the 63 articles are not imported into
  `app/articles.ts` yet, so their URLs answer 404 today. See "What still answers
  404" below. Do not paper over that with a redirect to `/artikelen`: the day
  the article is imported, that redirect would shadow the live page and the
  article would be invisible.

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

**Every fallback is temporary.** Each one carries a `// waits for <target>`
comment on its row in `app/redirects.ts`. Build the page, run the script again,
and the fallback disappears by itself. Nothing has to be edited by hand.

### Targets waiting for a page

93 of the 346 redirects stand on a fallback today.

| Waiting target | Rows | Lands on for now |
|---|---:|---|
| `/tarieven` | 41 | `/studiekeuzetraject` |
| `/locaties/` for 15 cities: apeldoorn, arnhem, breda, bussum, deventer, enschede, gouda, groningen, leiden, maastricht, roosendaal, sittard, wassenaar, zutphen, zwolle | 28 | `/locaties` |
| `/van-studie-wisselen` (an article, not imported) | 10 | `/artikelen` |
| `/coach-worden` | 4 | `/studiekeuzecoaches` |
| `/onze-methode` | 3 | `/studiekeuzetraject` |
| `/studiekeuzecoaches/aart-smit`, `/studiekeuzecoaches/angelina-muller`, `/studiekeuzecoaches/janneke-van-den-brand` | 3 | `/studiekeuzecoaches` |
| `/bedankt` | 2 | `/` |
| `/over-ons` | 1 | `/` |
| `/wat-betekent-het-leenstelsel-concreet-voor-jou` (an article) | 1 | `/artikelen` |

The three coach URLs are the open item in `todos.md` section 7: 1129 words of
Janneke's interview hang on `/studiekeuzecoaches/janneke-van-den-brand`, and
today the roster only has the anchor `#janneke`. Until there is a page per
coach, the redirect lands on the roster.

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
which this site does not sell (`todos.md` section 3), so most of those URLs
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
addresses and make the duplicate content problem of `todos.md` section 5 bigger.

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

The redirect table is complete and lands nowhere empty. The `keep` and `rebuild`
rows are a different matter: they are URLs whose address does not change, and
93 of them have no page in this checkout.

| Missing page | Rows |
|---|---:|
| An article that is not imported into `app/articles.ts` | 59 |
| A city that is not in `app/cities.ts` | 30 |
| `/contact`, `/onze-methode`, `/over-ons`, `/tarieven` | 4 |

None of these is a redirect problem, and none can be fixed by a redirect. Each
one is a decision that is written down elsewhere: which of the 63 articles stay
and which of the 37 city pages stay both need the Search Console export
(`todos.md` sections 2 and 4), and the four pages wait on the price and on the
method. The day a decision falls the other way, the row moves from `keep` to
`redirect` in `docs/url-map.csv`, the script runs again, and the URL lands on
`/artikelen` or `/locaties` instead of on a 404.

This is the last thing that has to be resolved before the old site is switched
off.

## How to check the table

Four things must be true, and they are checked against `app/redirects.ts` and
the real routes:

1. No source is also a real route. A redirect would shadow a live page, because
   Next checks redirects before the filesystem.
2. No target is itself a source. No chains.
3. Every target resolves to a route that exists.
4. No duplicate sources.

Result on 2026-08-15: 346 rows, 0 shadowed routes, 0 chains, 0 missing targets,
0 duplicates, 93 rows on a fallback. Re-check after any change to `app/`:

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
