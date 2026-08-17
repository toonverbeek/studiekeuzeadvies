# Decisions already taken

Do not re-open one of these without a reason. Each row is dated, and where a
decision was reversed the row says so rather than disappearing: a reversal is
worth as much as the decision.

**This file holds no work.** Open work is GitHub issues, `gh issue list`. This
repo used to carry a `todos.md` beside them, which meant a closed issue and an
open checkbox could describe the same job. It was retired on 2026-08-17 and its
open items became issues `#11` and `#15` to `#56`.

---

## The one date that matters

The old WordPress site goes offline in **September 2026**. Everything that needs
the seller's tenant has to happen first, because the access and the data go with
it: Search Console, GA4, the 22 legacy redirects, the URL list (`#22`), and the
DNS and the mailbox (`#23`). You cannot get them back later.

The launch gate is the domain switch, not the build. See the row of 2026-08-16.

## Client feedback, round 1

Arrived on 2026-08-12, eleven points from Janneke. Eight are questions that need
an answer, two reverse a decision below (the tests, and the central contact
point), and four are build items. The plan that answers it holds the email in
full: `~/grill-client-feedback-round-1-plan.html`.

---

## The table

| Decision | When |
|---|---|
| Home page and city pages are high fidelity, not production ready | 2026-08-04 |
| Keep the old page structure and section order | 2026-08-04 |
| No Qompas tests on the site. Coaching conversations only | 2026-08-04 |
| Keep the old customer quotes for now, pending permission. **Settled on 2026-08-06:** the rights are bought, so they stay | 2026-08-04 |
| City pages use one shared text with city facts on top | 2026-08-05 |
| A meeting place per city, to be filled in later | 2026-08-05 |
| The coach is the only local proof on a city page | 2026-08-05 |
| Google Maps embed for the map, not OpenStreetMap | 2026-08-05 |
| The map on the home page shows the area, not pins. The Maps Embed API cannot pin a list of cities, and the two ways that can (the Maps JavaScript API, the Static Maps API) each buy one map at the price of a second Google product. The city names beside it are the legend | 2026-08-17 |
| Both map frames are square below `sm`. This is the consent placeholder talking, not the map: four lines of text and a button need 260px, and a 4/3 box on a 320px screen is 204px | 2026-08-17 |
| The traject page keeps the section order of the old page | 2026-08-05 |
| The intake form stays at the end of every page. Mid-page the traject page carries an invitation to it, where the old page had the form. **Reversed on 2026-08-15 by issue #7:** there is no central sign-up point, so only a page that can name the person who reads the request shows a form. Every other page shows the route to one instead | 2026-08-05 |
| No central telephone number, no WhatsApp number and no central mailbox anywhere on the site. The contact point is a named coach in a named city | 2026-08-15 |
| The canonical host is `www.studiekeuzeadvies.nl`. Measured over the whole archive, not chosen | 2026-08-15 |
| The cookie answer lives in `localStorage`, not in a cookie. A cookie would need `cookies()`, which makes every prerendered page dynamic, and the prerendered pages are what the purchase paid for | 2026-08-15 |
| One question about cookies and no more. Two answers of equal weight, a bar and never a modal, and a no is never asked again | 2026-08-15 |
| The cookie bar is ink, not ochre. An ochre bar over an ochre band reads as one more band, and the home page has three of them. Ink is the surface this site keeps for an object that is not the page. A 1px ochre line on top separates it from the footer, which is ink as well | 2026-08-17 |
| The bar asks the generic question and names no page. It covers everything that comes from somebody else, with the Google map as the example. It also says we set no cookie ourselves, which is true and has to stay true: no analytics, no third party script, and the answer itself in `localStorage` | 2026-08-17 |
| **The launch gate is the domain switch, not the build.** We are in rapid development: we merge to production all day, and production is a Vercel URL. `studiekeuzeadvies.nl` still points at the old WordPress on AWS, so nothing we ship is reachable by a customer until we flip the domain. Therefore no build guard on `isPlaceholder`, and issue `#13` stays closed. A guard would only block our own merges to protect a URL nobody visits. The five invented coaches are checked by a person before the flip. A future review will find this and call it a defect: it is not, it is this row | 2026-08-16 |
| A generated image may show a scene, never a person we present as one of ours. The home page hero is such a scene; the five stand-in portraits still may not go live | 2026-08-13 |
| No `lastModified`, `changeFrequency` or `priority` in the sitemap. We can prove none of the three, and a wrong one costs trust | 2026-08-15 |
| Every customer story carries a date that can be proved. A story we cannot date does not go on `/ervaringen` at all | 2026-08-15 |
| The wordmark and the icons are generated from one font file by `docs/art/build-marks.py`, so the vector and the raster cannot drift. That font is fetched, not committed: the script says where from, and it stops with that line if you have not. They are placeholders for the designed logo that is waiting on the client's yes | 2026-08-15 |
| An article keeps its old root URL. The hub is at `/artikelen`. Zero redirects. Re-opened the same day by `docs/url-map.csv`, which moved them to `/artikelen/<slug>`. **Settled on 2026-08-15 at the root**, as first decided: a post resolves to `/<slug>`, so its address does not change and the row is a keep, not a redirect | 2026-08-05 |
| Article text in MDX, article metadata in `app/articles.ts` | 2026-08-05 |
| No image on an article. The archive images die with the seller's S3 bucket and the rights are not confirmed. **Half of that reason fell away on 2026-08-06:** the rights are bought, and the 219 files are already on disk in the archive. Re-open if an article wants a picture | 2026-08-05 |
| No author name and no portrait on an article. The date is the only signature | 2026-08-05 |
| /eerste-studiekeuze and /verkeerde-studiekeuze are full standalone pages, not short pages that point at the traject page | 2026-08-05 |
| The situation pages keep the sentences of the old pages, cleaned, not a rewrite | 2026-08-05 |
| A coach is written once, in `app/coaches.ts`. A city points at a coach and takes its region from them | 2026-08-05 |
| Coach texts are third person, not the first person of the old site. Twelve people who all open with "Hoi! Ik ben" read as one voice | 2026-08-05 |
| The coaches page shows five coaches; `/locaties` keeps three cities. **Re-opened on 2026-08-06:** six coaches and four cities | 2026-08-05 |
| A real coach stands before every stand-in on `/studiekeuzecoaches`, and their city stands first on `/locaties`. The top of both pages then stays true if the stand-ins are pulled | 2026-08-06 |
| `isPlaceholder` on a coach is required, not optional. Adding a person without an answer to "does this one exist" does not compile | 2026-08-06 |
| A coach carries only their first name on the roster. The archive surname stays out until the coach asks for it | 2026-08-06 |
| A real coach's own photo goes on the site as it is, even when it does not match the warm colour of the stand-ins. It is honest, and the stand-ins are the ones that leave | 2026-08-06 |
| A city page names the coach's whole work region, so `/locaties` says "studiekeuzecoach voor ..." and not "ook voor ..." | 2026-08-06 |
| A coach and their city link to each other, both ways. The long text about a person lives once, on `/studiekeuzecoaches`, and a city page sends the reader there instead of repeating it | 2026-08-06 |
| The coaches page speaks only to the studiekiezer and the parent. Recruiting a coach waits for its own page | 2026-08-05 |
| The face of a coach sits in the 20rem margin column, the column that holds a heading on every other page | 2026-08-05 |
| Coach portraits are cropped 4:5, not square. Five squares in a column read as profile pictures, which is the team grid DESIGN.md sends us away from | 2026-08-05 |
| A page title may drop one type step below `sm` when a long compound word does not fit. The step above stays the same as every sibling page | 2026-08-05 |
| The three level pages share a skeleton, never a text. A sentence in `app/components/level-page.tsx` appears three times on the site, so the sentences live in `app/levels.ts`, one level at a time | 2026-08-05 |
| `/studiekeuze-met-add-adhd` keeps the old scope, ADD and ADHD. Autisme is named on the doors that lead to it, and it is not written on the page, because there is no source copy and no coach who can confirm it | 2026-08-05 |
| The FAQ answers stand open. No accordion, because a parent scans and because choosers with ADD, ADHD or autisme need overview more than interaction | 2026-08-05 |
| No price question on the FAQ until the price is decided. No "vanaf", no range, no placeholder | 2026-08-05 |
| A new FAQ answer may only say what another page in this repo already says. The FAQ is never the first place a promise is made | 2026-08-05 |
| The rights to the whole old site are bought. Nothing in the archive is blocked by rights. A number still has to be true of us before it goes on a page | 2026-08-06 |
| The work list is GitHub issues and nothing else. A second list in the repo drifts: issue `#11` was closed while the same job stood open in `todos.md`, and nobody saw it for two days | 2026-08-17 |

---

## Four ways of measuring the old site that give the wrong answer

Recorded so nobody repeats them. Use `scripts/build-url-map.py` and read
`real_words` from `docs/url-map.csv`.

- **`words` in the archive's `redirect-map.csv` includes the footer and the
  menu**, about 118 words of it. Anything near 120 looks like a page and is not.
- **`editorial_inbound` of 182 is the footer link**, which sits on every page.
  Only two pages off the menu carry real editorial links: `/eerste-studiekeuze/`
  with 58 and `/verkeerde-studiekeuze/` with 54. The rest have 2 to 8.
- **Counting from `archive/markdown/` misses content that only survived in the
  HTML.** On 2026-08-05 it produced one wrong call:
  `/over-ons/veelgestelde-vragen/` was written down as empty, and it holds five
  real questions with full answers, 380 words.
- **Do not hand-roll an HTML word count either.** This WordPress theme has no
  `<nav>` and no `<footer>` element, so stripping those tags leaves the whole
  menu in the total. That made `/vacatures/` look like 175 words on the same
  day. It is 0: every word on it is chrome.

## How to read `docs/url-map.csv`

`action=rebuild` means the URL stays and the page has to be written. `redirect`
means the *address* moves, not that the page dies, so `/veelgestelde-vragen` and
`/coach-worden` still have to be built even though their old URLs are marked
`redirect`. The current rebuild list:

```sh
awk -F, '$8=="rebuild" {print $1" -> "$7}' docs/url-map.csv
```
