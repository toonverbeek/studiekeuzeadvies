# Global review — the new site against the old archive

Written 2026-08-05, against `../studiekeuzeadvies archive/` (crawled 30 July 2026)
and the site as it builds today.

The goal this review measures against: a faithful rebuild of the old site, in a
new design and a new URL structure, reusing as much of the old copy as we can.
Copy first, improvement later.

Two companion files are generated, not written by hand:

- `docs/url-map.csv` — all 522 old URLs, each with a proposed new URL and an
  action. Regenerate with `python3 scripts/build-url-map.py`.
- `scripts/compare-word-counts.py` — body length of a new page against the same
  page on the old site. Run `npm run build` first.

---

## 1. The scoreboard

The old site, by URL type:

| Type | Count | Carries ranking value |
|---|---:|---|
| City pages | 38 | Yes. This is the engine |
| Articles (posts) | 63 | Yes, but orphaned: one inbound link each |
| Other pages | 42 | Yes, for the commercial keywords |
| Attachment pages | 198 | No. Redirect to parent |
| Tag pages | 74 | No. Redirect to the hub |
| Date archives | 55 | No. Already noindex |
| Shop taxonomy, products, cart | 32 | Only if the shop survives |
| Legacy redirects and dead ends | 20 | The 22 old redirects must survive |
| **Total crawled** | **522** | |

What exists in the new site today, measured from the build:

| Content | Old | New | Done |
|---|---:|---:|---:|
| City pages | 38 | 3 | 8% |
| Articles | 63 | 3 | 5% |
| Other pages | 42 | 6 | 14% |
| **Pages that rank** | **143** | **12** | **8%** |

**That 8% understates the work, and this is the most important thing in this
review.** The expensive part of a city page and of an article is the template,
and both templates exist and are good. Adding city 4 is a row in
`app/cities.ts`. Adding article 4 is one `.mdx` file and one line in
`app/articles.ts`. So of the 131 pages still missing, 95 are data entry against
a finished template, and only about 15 need a page to be designed and written.

The honest split of what is left:

| Work | Count | Blocked on |
|---|---:|---|
| City rows | 35 | The coach rule, and Search Console for the order |
| Article imports | 60 | Search Console, and a fact-check of the old text |
| Pages to design and write | 15 | Of these, 5 are blocked on a commercial decision |

---

## 2. What the rebuild already gets right

Worth saying plainly, because the rest of this file is about gaps.

- **The copy is genuinely reused, not paraphrased.** `app/situations.ts`
  carries the old sentences of `/eerste-studiekeuze/` and
  `/verkeerde-studiekeuze/` word for word, and the file header lists exactly
  what was removed and why. The home page keeps the old H1 ("Een goede
  studiekeuze maken. Lastig hè?") and the old section heading ("Helaas de
  verkeerde studie gekozen?"). Article `seoTitle` values are kept letter for
  letter. This is the right instinct and it should not change.
- **The removals are principled and recorded.** The 8,8 rating, the 92 percent,
  "meest gevraagde partij", Qompas, the four tests, the Keuzegids and the
  TalentenTest are gone from every page they were on, and each removal is
  documented in the file that made it. Nothing unprovable has leaked back in.
- **Every stand-in is quarantined and labelled.** The invented coaches, the
  placeholder telephone number and the seller's two customer quotes all sit in
  named files with a warning at the top, and `todos.md` lists them as blockers.
  Nothing fake is hidden inside a component.
- **The design holds.** Ochre carries the surface, one sans at all sizes, flat
  surfaces, and the reading row (`app/shell.ts`) lines up the answer column from
  the home page to the last article. It does not read as any of the four
  anti-references in PRODUCT.md, and it does not read as the old site.
- **The build is clean.** 16 routes, TypeScript passes, lint is quiet.

---

## 3. The gap

### 3.1 City pages — 3 of 38

The 36 near-identical location pages were the SEO engine, and 34 of them sit
under `/locaties/`. Four do not: `/bergen-op-zoom/`, `/gouda/`, `/zutphen/`,
`/deventer-2/`. Two more are duplicates the old site already redirects:
`/locaties/arnhem-2/` and `/locaties/studiekeuzeadvies-apeldoorn/`.

`docs/url-map.csv` normalises all of them to `/locaties/<stad>`.

The rule already taken — a city page only where a coach works — means most of
these 38 cannot be rebuilt until coaches sign. That is correct and it is also
the single largest ranking risk in the whole move. Measure before you drop.

### 3.2 Articles — 3 of 63

60 are missing. They were orphaned on the old site (no hub, no nav link, one
editorial inbound link each), so their individual authority is small, but
together they are what makes the two situation pages rank: 58 of them link to
`/eerste-studiekeuze/` and 54 to `/verkeerde-studiekeuze/`. Drop the corpus and
those two pages lose the links that feed them.

The 2014 to 2020 texts describe a `leenstelsel` that ended in 2023. Every
import needs a fact-check, not only a paste.

### 3.3 Pages with no new counterpart

Ordered by the body length they had on the old site:

| Old page | Real words | What it needs |
|---|---:|---|
| `/janneke-van-den-brand/` | 1129 | Coach interview. Portrait and story rights stay with the person |
| `/ervaringen/` | 757 | Customer stories. Rights not confirmed |
| `/onze-methode/` | 687 | Blocked: over half the page is Qompas and the Keuzegids |
| `/onze-diensten-en-producten/` | 675 | Blocked on the price decision |
| `/opnieuw-een-studiekeuze-maken/` | 636 | Written to decanen, not to students. Redirect into `/verkeerde-studiekeuze` |
| `/online-studiekeuzeadvies/` | 624 | Little survives the cleaning. Redirect |
| `/aart-smit/` | 619 | Coach interview. Same rights problem |
| `/tarieven/` | 600 | Blocked on the price decision |
| `/studiekeuze-met-add-adhd/` | 561 | **Not blocked.** The third user group of PRODUCT.md |
| `/angelina-muller/` | 511 | Coach interview. Same rights problem |
| `/hbo-opleiding-kiezen/` | 441 | **Not blocked.** Keyword page |
| `/studiekeuzetest/` | 408 | The Qompas tests. Redirect |
| `/mbo-opleiding-kiezen/` | 408 | **Not blocked.** Keyword page |
| `/over-ons/veelgestelde-vragen/` | 380 | **Not blocked** once prices are known. Five real Q&As in the HTML |
| `/wo-opleiding-kiezen/` | 329 | **Not blocked.** Keyword page |
| `/over-ons/` | 301 | Partly blocked: "Unieke samenwerking" names Lyceo |
| `/contact/` | 45 | Was only a form. Decide: page or redirect |
| `/vacatures/` | 0 | Empty on the old site. Needs an offer to a coach first, then `/coach-worden` |

Note on `/over-ons/veelgestelde-vragen/`: `todos.md` records this as empty
("the questions were never in the HTML"). That is not right — the five
questions and their full answers **are** in the archived markdown. They are
reusable copy today, minus the Keuzegids sentence and the two prices. This is
the cheapest real page left on the list.

Four of the fifteen missing pages are blocked on one commercial answer: **what
does the traject cost, now that the Qompas tests are not part of it?** Until
that is decided, `/tarieven`, `/onze-diensten-en-producten`, `/onze-methode`
and half of the FAQ cannot be written.

---

## 4. Copy: how faithful, and where it thins out

The reuse is faithful. The concern is volume. Measured with
`scripts/compare-word-counts.py`, body words, new against old:

| Page | Old | New | Change |
|---|---:|---:|---:|
| `/studiekeuzecoaches` | 3313 | 1239 | **−63%** |
| `/locaties` | 354 | 144 | **−59%** |
| `/eerste-studiekeuze` | 846 | 528 | **−38%** |
| `/verkeerde-studiekeuze` | 1408 | 943 | **−33%** |
| `/locaties/utrecht` | 726 | 549 | −24% |
| `/locaties/bergen-op-zoom` | 747 | 590 | −21% |
| `/` | 583 | 579 | −1% |
| `/artikel-aanmelden-studies` | 1068 | 1017 | −5% |
| `/studiekeuzetraject` | 1169 | 1476 | +26% |
| `/de-1-februariregeling` | 402 | 583 | +45% |

Read this as a thermometer, not as a target. The two sides are not counted
identically: the old count subtracts a flat 118 words of chrome, and the new
pages carry the intake form and a "Lees ook" band inside `<main>`. Treat
anything inside ±10% as noise.

Three signals are real and worth acting on:

1. **`/studiekeuzecoaches` at −63%** is the twelve real coaches replaced by
   five invented ones. It recovers by itself when real coaches sign. No action
   beyond the blocker already on the list.
2. **`/locaties` at −59%** is the hub with 3 cities instead of 38. Same cause,
   same cure.
3. **The two situation pages, at −38% and −33%, will not recover by
   themselves.** What was cut is the Qompas block, the Keuzegids block and the
   proof numbers, and none of that is coming back. These two pages carry the
   editorial link value of the entire article corpus, and they are the ad
   landing pages. They are the one place where new copy has to be *written*,
   not migrated, to put the body length back. That is the clearest copy task on
   the site.

The city pages at −24% are the same story in miniature and are lower priority:
the shared text is leaner than the old shared text, which is fine while the
per-city fields in `app/cities.ts` are empty.

---

## 5. The new URL structure

The principle I applied: **change a URL only where the change buys something.**
Everything that ranks and reads sensibly keeps its address; the rest gets a
namespace.

```
/                                     Home
/studiekeuzetraject                   The traject                    (keep)
/onze-methode                         How the traject works          (keep)
/tarieven                             Prices                         (keep)
/eerste-studiekeuze                   First choice, 58 inbound       (keep)
/verkeerde-studiekeuze                Stopped or in doubt, 54        (keep)
/studiekeuze-met-add-adhd             The third door                 (keep)
/hbo-opleiding-kiezen                 Keyword page                   (keep)
/mbo-opleiding-kiezen                 Keyword page                   (keep)
/wo-opleiding-kiezen                  Keyword page                   (keep)
/locaties                             Hub                            (keep)
/locaties/<stad>                      38 cities, normalised          (keep, 4 moved in)
/studiekeuzecoaches                   The roster                     (keep)
/studiekeuzecoaches/<naam>            Coach interviews               (NEW: were at root)
/artikelen                            Article hub                    (NEW)
/artikelen/<slug>                     63 articles                    (MOVED: were at root)
/ervaringen                           Customer stories               (keep)
/over-ons                             About                          (keep)
/veelgestelde-vragen                  FAQ                            (moved up one level)
/contact                              Contact                        (keep)
/coach-worden                         For coaches                    (NEW: was /vacatures/)
/bedankt                              Form landing                   (NEW: was two pages)
```

Five things change, and each one buys something:

1. **63 articles move from the root to `/artikelen/<slug>`.** The root
   namespace is what produced `/studiekeuze-traject/` next to
   `/studiekeuzetraject/`, and `/gouda/` next to `/locaties/breda/`. A hub with
   real internal links also gives these articles more authority than they ever
   had orphaned.
2. **Three coach interviews move under `/studiekeuzecoaches/`.** At the root
   they were unfindable.
3. **Four stray city pages and two `-2` duplicates normalise to
   `/locaties/<stad>`.**
4. **`/vacatures/` becomes `/coach-worden`.** PRODUCT.md names the coach as the
   third user; "vacatures" describes an employer, which is not what this is.
5. **Two thank-you pages become one `/bedankt`.**

### The decision this re-opens

`todos.md` records, on 2026-08-05: *"An article keeps its old root URL. The hub
is at `/artikelen`. Zero redirects."* The structure above contradicts that on
purpose, because you have now asked for a new URL structure and the article
namespace is the only place where one is genuinely needed.

State the trade honestly: moving 63 URLs costs 63 redirect hops on pages whose
whole value is inherited ranking. A 301 passes essentially all of its weight
now, and these are the lowest-authority pages on the site (one inbound link
each), so the risk is small — but it is not zero, and it is the kind of risk
that only shows up eight weeks later. **This is your call, not mine.** If you
want zero URL risk, keep articles at the root and delete rule 1; the other four
changes stand either way, and `scripts/build-url-map.py` needs one line changed
to produce that variant.

### The redirect map

`docs/url-map.csv` resolves all 522 URLs:

| Action | Count |
|---:|---|
| redirect | 409 |
| drop | 66 |
| keep | 38 |
| rebuild | 9 |

The 22 redirects that already exist on the old site are preserved
automatically: the generator follows the old hop, then applies the new rule to
its target, so a legacy redirect can never point somewhere the target does not.

Two rows to look at by hand:

- `/vacature-keuzecoach-dordrecht/` currently lands on `/` because that is
  where the old site sends it. `/coach-worden` is probably better once that
  page exists.
- All 32 shop URLs point at `/tarieven`. That holds only if the shop does not
  come back.

Every action in the file is a heuristic. None of it is final until the Search
Console export exists, which is the deadline item in `todos.md` section 2.

---

## 6. The order I would build in

**Now, because it expires.** Search Console and GA4 export. Everything in
sections 3.1, 3.2 and 5 is a guess until that data exists, and it disappears
with the seller's tenant in about four weeks. This is the only work on the list
with a hard deadline.

**Next, because it is unblocked and cheap.** Four pages need no decision from
anybody:

1. `/studiekeuze-met-add-adhd` — the situation-page template takes it with no
   new code, and the third door on the home page and the traject page is plain
   text today for want of it.
2. `/veelgestelde-vragen` — five reusable Q&As already in the archive.
3. `/hbo-opleiding-kiezen`, `/mbo-opleiding-kiezen`, `/wo-opleiding-kiezen` —
   one template, three data rows, three keyword URLs recovered.

**Then, the plumbing.** `sitemap.ts`, `robots.ts`, and the redirect table
generated from `docs/url-map.csv`. None of it exists yet, and the redirects
have to be live on the day the old site goes down.

**Then, the copy task.** Put body length back into `/eerste-studiekeuze` and
`/verkeerde-studiekeuze`. They are the ad landing pages and the link target of
the whole article corpus, and they are the two pages that lost the most text
that will not return by itself.

**In parallel, the answer that unblocks four pages.** What does the traject
cost without the Qompas tests? `/tarieven`, `/onze-diensten-en-producten`,
`/onze-methode` and half the FAQ all wait on it.

**Bulk import, once the data lands.** 60 articles and up to 35 city rows,
ordered by measured traffic, each article fact-checked against today's rules.
