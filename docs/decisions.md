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
| **The client's own design replaces the ochre system.** The client designed the whole site in Claude Design and asked us to rebuild every page to it (`docs/redesign/`). So: violet `#6d4aff` and indigo `#1e1b4b` on the same warm paper, with coral `#ff6b4a` and amber `#ffc94d` as the two accents; Bricolage Grotesque for every heading, Figtree for every sentence, IBM Plex Mono for every label; pills instead of blocks, rounded cards, real shadows, and one restrained motion (a 24px rise on scroll). Every ochre token is gone from `app/globals.css`. DESIGN.md is rewritten from the extracted spec, `docs/redesign/design-spec.md`, and the desktop rendering of the client's export is the target; the responsive behaviour is ours, because the client's 390px rendering overflows sideways | 2026-08-20 |
| PRODUCT.md's anti-reference "purple accent" is overruled by the client's choice, and only that line. Everything else in PRODUCT.md stands, including principle 5: a number goes on a page only when it is true of us. So "8,8 gemiddeld", "1000+ trajecten per jaar", "92% studeert met plezier door", "92% kiest goed" and "35+ locaties" do not get printed, however the client's export writes them. The slot stays and true statements fill it: gratis intake, MBO, HBO en WO, online of op locatie, and the real number of cities in `app/cities.ts` | 2026-08-20 |
| The marks come from the client's logo path, not from a font. `app/icon.svg` is the staircase with the coral dot; `docs/art/build-marks.mjs` rasterises it into `app/apple-icon.png` and `app/favicon.ico` with sharp, which is already in `node_modules`. Only `public/wordmark.svg` still needs a font, Bricolage Grotesque Bold, and `docs/art/wordmark-paths.py` says where to fetch it. This replaces `docs/art/build-marks.py` and the Alegreya row of 2026-08-15 | 2026-08-20 |
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
| The wordmark and the icons are generated from one font file by `docs/art/build-marks.py`, so the vector and the raster cannot drift. That font is fetched, not committed: the script says where from, and it stops with that line if you have not. They are placeholders for the designed logo that is waiting on the client's yes. **Replaced on 2026-08-20:** the client delivered a logo, it is a drawn path and not a letter, and the script and the font both went with it | 2026-08-15 |
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
| The Netherlands on this site is drawn by us. `app/components/nl-map.tsx` is an inline SVG, projected once offline by `scripts/build-nl-map.mjs` into `app/components/nl-map-data.ts`. It is first party, so it sets no cookie, needs no consent question, no API key and no request, and it is the map language of the client's own design. It can also pin every city where a coach works, which the Maps Embed API never could, so it reverses the practical half of the row of 2026-08-17 | 2026-08-20 |
| The Google Maps embed stays, behind `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY`, as an enhancement and not as the floor. With a key you get streets and the consent gate of issue #10; without one you get our own map. The undocumented keyless `output=embed` endpoint is dropped: Google does not support it, so it could stop on any morning, and paying a cookie question for it was a poor deal | 2026-08-20 |
| The map is not sized by a media query but by a container query on its own frame. The same 1280px window holds a 520px panel on the coaches page and a 245px column on a city page, and a name set in viewBox units would read as six pixels in the second. `--nlmap-scale` follows the width the map is really drawn at | 2026-08-20 |
| Mail goes out through Resend, over plain `fetch` in `app/lib/mail.ts`, with the key in `RESEND_API_KEY` on an account the client owns. No SDK and no Vercel Marketplace integration: the Marketplace provisions into the developer's account and bills him (issue #17) | 2026-08-20 |
| Every intake request and every coach application goes to the destination AND as a copy to `MAIL_ARCHIVE`, so no request exists in one place only. A lead is worth about seven hundred euro, and a bare send-and-forget loses it when the provider answers 500 or the coach's address bounces (issue #17) | 2026-08-20 |
| Without `RESEND_API_KEY` the site prints the mail to the terminal in development and refuses to send in production. Production never pretends: the reader is told we could not send and is given an address to write to, because a false confirmation is how a request is lost quietly | 2026-08-20 |
| The `situatie` answer never appears in a subject line, and every message carries one line saying the request should be deleted within 30 days. One of the four options is a health statement about a named person who is usually 16 to 22 (issue #21). The thirty days is our proposal and the sentence says so, so the client has to confirm it rather than inherit it | 2026-08-20 |
| Spam protection on both forms is a honeypot field and a minimum time, and no captcha. A captcha is a third party, a second consent question and a wall in front of a nervous sixteen year old. A caught request gets the same confirmation a real one gets, because telling a robot it was caught tells its author what to change | 2026-08-20 |
| **The product has two tests again**, a persoonlijkheidstest and a studie-interessetest, in the traject and in the Studiekeuzescan. This reverses the row of 2026-08-04 above ("No Qompas tests on the site"), which now stands only for what it names: the four Qompas tests and the TalentenTest with Tilburg University are not ours and stay off the site. The tests we sell come from the client's own supplier, and only the client may name that supplier on a page. Written down here because the reversal arrived in the client's feedback and lived nowhere in this table, so the old row read as current | 2026-08-12 |
| **The prices are decided and they stand on the site.** Studiekeuzescan € 249, Studiekeuzetraject € 649, Extra coaching € 89 per gesprek. Extra coaching is not a third product: it can be added only after a scan or a traject, and only when the coach thinks it helps. No page writes "vanaf", a range or an old price, and the row of 2026-08-05 ("no price question on the FAQ until the price is decided") is now satisfied rather than reversed | 2026-08-20 |
| **One price is written once**, in `app/pricing.ts`. Five pages used to carry their own "€ 649", which is five places to forget when the client raises it and one of them will be missed. The FAQ answer, the tariff cards, the scan panel, the coach licence and the home page all read from that file now | 2026-08-20 |
| `app/shell.ts` is gone. It was the bridge from the ochre system to the client's, and by the end it held three strings that the design system should own. `readingRow`, `linkOnPaper` and `linkOnSoft` moved into `app/components/ui.tsx`; the rest had no caller | 2026-08-20 |
| The shell is 1256px, not 1160px. The client's export writes 1160px of content inside a section with `padding: 0 48px`, so 1160 was the content and the gutter was outside it. Measured in `docs/redesign/client/homepage-definitief-v4/index.html` | 2026-08-20 |
| The page index ("Op deze pagina") is one component, `PageIndex` in `ui.tsx`. Five pages had written their own, and three of them disagreed about the hairline | 2026-08-20 |
| **No unproven number survives, including the ones written as words.** "Ongeveer de helft van de mensen die bij ons aanklopt is gestopt" stood on every city page and on /voor-wie. It is a count of our own customers and nobody has counted them, so it reads no better than "92%". PRODUCT.md, principle 5, and issue `#24` | 2026-08-20 |
| The number above the coach grid counts towns, not people. It said `coaches.length` under the label "regio's", which is only right while no two coaches share a town | 2026-08-20 |
| A coach's own profile page speaks in the first person, and the roster stays in the third. The client designed the profile (Coach Janneke) as her own letter, "Hoi, ik ben Janneke van den Brand", with her surname, and that is the one place on the site where a person speaks for herself. The row of 2026-08-05 (third person, first name) still holds for `/studiekeuzecoaches`, a city page and every card, where twelve first persons would read as one voice | 2026-08-20 |
| `WorkAreaMap` is deleted from `app/components/maps.tsx`. Our own map draws a pin per city, so the home page calls `NlMap` and the Google overview map has no job left. `CityMap` stays, because a reader who wants to know how far it is by bike wants streets | 2026-08-20 |
| **A page proves itself twice: a picture and a check.** `scripts/screenshots.mjs` shoots every route at 390 and 1280, `scripts/check-pages.mjs` checks every route at 320, 390 and 1280 for sideways scroll, console errors, one `h1`, `alt` on every image, a `<main>`, and a working target behind every internal link and every anchor. One `ROUTES` list feeds both | 2026-08-20 |
| `/opengraph-image` answers only in a build. `next dev` returns an empty reply and loses the worker (Next 16.3.0, measured 2026-08-20); `next build` writes the PNG without complaint. The last built file is kept as `docs/screenshots/opengraph-image.png` so a review can look at it | 2026-08-20 |
| **The brand is written `StudiekeuzeAdvies` in running text and `StudieKeuzeAdvies` in a `<title>`.** The first is the client's own spelling and the one on the wordmark; the second is the string the bought rankings hang on, so every `<title>` and `seoTitle` keeps it letter for letter. `Studiekeuzeadvies in <stad>` on a city page is the service, not the brand, and stays | 2026-08-20 |
| **One traject, one list of four meetings.** `app/traject.ts` owns the names; `levelThemes` in `app/levels.ts` and `themes` in `app/situations.ts` map over it. Both were typed by hand and both had drifted, so six pages printed a traject the traject page does not have | 2026-08-20 |
| **A stand-in coach is invisible to a search engine and is never a delivery address.** `isPlaceholder` now gates three things: the `robots` tag on the coach page and on the city page, the entry in `app/sitemap.ts`, and `resolveDestination` in `app/actions.ts`, which routes a request for a stand-in down the "nog geen coach" road instead of promising an answer from somebody who does not exist | 2026-08-20 |
| **A promise about how fast a coach answers is a field on that coach.** `responseTime` is set on Janneke, who made the promise, and null on the five stand-ins. It was generated for everybody | 2026-08-20 |

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
