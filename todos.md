# Follow-ups

The working list for studiekeuzeadvies.nl. Claude keeps this file up to date.

**Last update:** 2026-08-05 (the coaches page is built and polished, and the
coaches now live in their own file)

---

## The one date that matters

The old WordPress site goes offline in **September 2026**. That is about four
weeks from now. Everything under *Before the old site disappears* must be done
first, because the access and the data go away with the seller's tenant. You
cannot get them back later.

---

## 1. Blockers. Nothing may go live until these are done

- [ ] **The intake form delivers nothing.** `app/actions.ts` validates, then
      writes a warning to the console. A real request is lost. Connect it to a
      mailbox or a form service, and add spam protection at the same time.
- [ ] **The coaches are invented people.** `app/coaches.ts` holds five: Hanneke,
      Bram, Nadia, Wietske and Joris. Invented names, invented histories,
      invented work regions, and five generated faces
      (`public/images/coach-placeholder.png` and `-2` to `-5`). They carry the
      whole `/studiekeuzecoaches` page and two city pages. Replace with real
      coaches under contract, with their written permission for name and photo.
      Delete every portrait file that no real coach replaces.
- [ ] **The four claims under "Wat elke coach gemeen heeft" are promises.**
      `app/studiekeuzecoaches/page.tsx`, the `shared` array. Two come from the
      old page (studied and worked, years with this age group), two are ours
      (one coach for the whole traject, the choice stays with the reader). They
      are hiring requirements, so they are only true once the contracts say so.
- [ ] **The two customer quotes belong to the seller.** `app/site-config.ts`,
      `legacyQuotes`. Ger and Moya. Remove them or get written permission.
- [ ] **Cookie consent banner.** The Google map on a city page sets cookies. The
      iframe must not load before the visitor agrees. This applies to the whole
      site once the map is live.
- [ ] **Telephone number.** `app/site-config.ts`. The 088 number on the old site
      belongs to Qompas / Lyceo. Get your own.
- [ ] **WhatsApp number.** `app/site-config.ts`. Stand-in.
- [ ] **E-mail address.** `hallo@studiekeuzeadvies.nl` must exist and must
      receive mail.
- [ ] **The cities.** `app/cities.ts` holds three. Only name a city where a
      coach really works.

## 2. Before the old site disappears

- [ ] **Get Search Console access** and export everything: queries, pages,
      positions, over the longest range available.
- [ ] **Get GA4 access** and export page traffic per URL.
- [ ] **Save the 22 existing redirects.** They carry link value from two or
      three rebrands ago. They must survive the move.
- [ ] **Export the full URL list.** All 522, with their traffic and positions,
      so the keep / redirect / drop decisions rest on data, not on judgement.

## 3. Rights to confirm with the seller

- [ ] The 8,8 coach rating, the 92 percent number, and "meest gevraagde partij".
- [ ] The coach biographies and photos in the archive (Mirjam, Janneke, Astrid,
      Barbara, and the others). They worked for the seller, and portrait rights
      stay with the people.
- [ ] The customer stories on `/ervaringen/`.
- [ ] The Qompas tests (Persoonstype, Competentie, Beroepen, Interesse) and the
      TalentenTest with Tilburg University. These were the core of the old
      product, and Qompas is the seller.
- [ ] The old prices, €199 to €699, if the tests do not come with the sale.
- [ ] A written licence for the 219 media files in the archive.

## 4. SEO and migration

- [ ] **Decide per URL: keep, redirect, or drop.** All 522. Needs the data from
      section 2.
- [ ] **Redirects for the odd city URLs.** These do not fit `/locaties/[stad]`:
      `/locaties/arnhem-2/`, `/locaties/studiekeuzeadvies-apeldoorn/`,
      `/bergen-op-zoom/`, `/gouda/`, `/deventer-2/`, `/zutphen/`.
- [ ] **The three vacancy redirects.** They exist on the old site today and they
      die with it. `/vacature-keuzecoach/` and `/vacature-keuzecoach-zwolle/`
      both go to `/vacatures/`, and `/vacature-keuzecoach-dordrecht/` goes to
      the home page. Decide where they point when `/vacatures/` has no page.
- [ ] **Decide which of the 37 city pages stay.** The rule is: a city page only
      where a coach works. Every city you drop loses its ranking, so measure
      first.
- [ ] **Decide which of the 63 articles stay.** They were orphaned on the old
      site: no hub, no navigation link, one inbound link each.
- [ ] **`sitemap.ts` and `robots.ts`.** Neither exists yet.
- [ ] **Confirm the canonical host.** `app/layout.tsx` sets `metadataBase` to
      `https://www.studiekeuzeadvies.nl`. Confirm www against non-www and match
      the server redirect to it.
- [ ] **Structured data.** `LocalBusiness` markup for a city page, but only
      after a real address exists. Today it would assert a place we do not have.
- [ ] **Analytics.** Nothing is installed.

## 5. The duplicate-content risk

You chose the old model: one shared text with the city name inserted. That is
what Google calls a doorway page, and it is the biggest risk to the rankings you
paid for.

The code is ready for the fix. Every text block in `app/cities.ts` is an
optional per-city field. Write a paragraph for one city and that city uses it;
write nothing and it falls back to the shared text.

- [ ] Write real local content for the cities with the most traffic first.
      Use the Search Console data to decide the order.

## 6. Google Maps

- [ ] **Get an API key** and restrict it to the studiekeuzeadvies.nl domain.
      Put it in `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY`, see `.env.example`.
      Until then the map uses an old keyless endpoint that Google does not
      document or support.
- [ ] **Fill the meeting places.** `app/cities.ts`, the `meeting` field. When it
      holds an address, the map moves to that address and zooms in, and the
      address block appears. No code change is needed.

## 7. Build next

### What is left, measured

**Read this before you trust a number in the crawl.** Two columns of
`redirect-map.csv` look like signal and are not:

- **`words` includes the footer and the menu.** The chrome is about 118 words.
  `/vacatures/` is listed at 118 words and its body is completely empty. So
  subtract about 118 from every count, and treat anything near 120 as a page
  with nothing on it.
- **`editorial_inbound` of 182 is the footer link**, which sits on every page.
  Only two pages off the menu have real editorial links: `/eerste-studiekeuze/`
  with 58 and `/verkeerde-studiekeuze/` with 54. Everything else off the menu
  has 2 to 8.

The remaining pages, by real body length, measured 2026-08-05:

| Page | Real words | State |
|---|---|---|
| `/studiekeuzecoaches/` | 3341 | Twelve named people with photos. The most blocked page on the site, and it needs real coaches under contract before it can exist at all |
| `/online-studiekeuzeadvies/` | 648 | 92%, 8,8, Keuzegids. Little survives the cleaning |
| `/opnieuw-een-studiekeuze-maken/` | 646 | Written to decanen and mentoren, not to students. Carries a price and the Keuzegids |
| `/studiekeuze-met-add-adhd/` | 566 | Blocked parts are small. The third user group of PRODUCT.md |
| `/hbo-opleiding-kiezen/` | 447 | Blocked parts are small. A keyword page |
| `/mbo-opleiding-kiezen/` | 413 | Blocked parts are small. A keyword page |
| `/studiekeuzetest/` | 416 | The Qompas tests. You decided the site does not sell them |
| `/vacatures/` | 0 | Empty. But two retired vacancy URLs redirect into it, see section 4 |
| `/over-ons/veelgestelde-vragen/` | ~45 | Empty. The questions were never in the HTML |
| `/contact/` | ~45 | It was only a form. The site already has the form |
| `/over-ons/` | ~300 | Partly blocked: "Unieke samenwerking" names Lyceo |
| `/ervaringen/` | 777 | Customer stories. Rights not confirmed, see section 3 |
| `/onze-methode/` | 696 | Blocked on the method-without-Qompas decision |
| `/onze-diensten-en-producten/` | 673 | Blocked on the price decision |
| `/tarieven/` | 627 | Blocked on the price decision |
| `/janneke-van-den-brand/` | 1139 | Coach interview. Portrait and story rights stay with the person |
| `/aart-smit/` | 625 | Coach interview. Same |
| `/angelina-muller/` | 516 | Coach interview. Same |

**The order this suggests.** First the plumbing in section 4, because it is the
only work with a deadline. Then `/studiekeuze-met-add-adhd/`, because the
template of the two situation pages takes it with no new code, and because the
third door on the home page and on the traject page is plain text today for
want of a page. Then the two keyword pages. `/vacatures/` is not a rebuild: it
needs an answer first about what you offer a freelance coach.

### The pages themselves

- [x] **`/studiekeuzetraject/`. The traject page.** Built on 2026-08-05.
      `app/studiekeuzetraject/page.tsx`, content in `app/traject.ts`. It follows
      the section order of the old page: intro, "Hulp bij jouw studiekeuze",
      "Wat ga je bij ons doen?", "Voor wie is het?" (the eight keuze-types), the
      invitation to the intake, the three reader types, the four meetings,
      "Waarom is de juiste studiekeuze zo belangrijk?", "Waarom
      StudieKeuzeAdvies" and "Wie zijn wij?". The URL and the old title are
      kept. Removed on purpose: the 92 percent claim, "meest gevraagde partij",
      "meest ervaren partij", Qompas, the tests, the Keuzegids, the section
      "Unieke samenwerking" and "in vrijwel alle grote steden". Open points
      below.
- [ ] **Confirm the four home assignments.** `app/traject.ts`, the `homework`
      lines under each meeting. The old page only says that you work on
      assignments in the meeting and at home; it never says which. The lines are
      written to fit that shape. A real coach must confirm them, or replace
      them.
- [ ] **Confirm the written end report.** The traject page promises that the
      coach writes a report at the end ("Aan het eind. Je verslag"). That is a
      promise a coach must keep. Confirm it, or take the block out.
- [ ] **Decide about the section "Unieke samenwerking".** The old page names
      Qompas, Lyceo, deans, universities and secondary schools as partners. None
      of that transfers with the sale as far as we know. The section is not on
      the new page. If a real partner exists later, it can come back.
- [ ] **Revisit the title "Kiezen met zekerheid".** Kept word for word because
      it ranks. It is a promise about the result, and PRODUCT.md asks for
      honesty. Measure first, then decide.
- [ ] **`/onze-methode/`. The method page.** 805 words. **Read this before you
      build it.** More than half the page is the four Qompas tests and the
      Keuzegids licence. You decided on 2026-08-04 that the site does not sell
      the Qompas tests. That removes most of the page. Decide first what the
      method is without them, then write the page. Do not build it before that
      answer.
- [x] **The article template and the hub.** Built on 2026-08-05.
      `app/[artikel]/page.tsx` renders an article at its old root URL,
      `app/artikelen/page.tsx` is the hub. The text lives in
      `content/artikelen/<slug>.mdx`, everything about the text lives in
      `app/articles.ts`. The section index in the header and the index in the
      margin are both read from the `##` headings of the .mdx file, so a heading
      and its index entry cannot disagree. Three real articles are imported.
      Removed from all three: the 088 number, the Qompas and Lyceo links, the
      old call to action, and the Keuzegids partner credit.
- [ ] **Import the other 60 articles.** Needs the Search Console data from
      section 2 to decide which ones earn a place. Adding one is two steps:
      write `content/artikelen/<slug>.mdx` and add a line to `app/articles.ts`.
- [ ] **The facts in the old articles are old.** The 2014 to 2020 texts describe
      a `leenstelsel` that ended in 2023. Check every article you import against
      the rules of today. None of the three that are in now touch it.
- [ ] **Give the articles a date you can defend.** The date is the only
      signature an article carries, because no coach is under contract. A 2015
      date on the page is honest, and it also tells a reader the text is eleven
      years old. Decide whether to re-date an article when you rewrite it.
- [ ] **A topic for each article.** `app/articles.ts` has a `topic` field that
      picks the "Lees ook" articles. It is not shown to the reader. With 63
      articles it may be worth showing, as a filter on the hub.
- [x] **The two situation pages.** Built on 2026-08-05.
      `/verkeerde-studiekeuze` and `/eerste-studiekeuze`, content in
      `app/situations.ts`, template in `app/components/situation-page.tsx`.
      These two carry the editorial link value of the whole article corpus: 54
      and 58 of the 63 archived articles link to them. The old sentences are
      kept. Removed: "Bewezen effectief", the 92 percent figure, the 8,8
      rating, Qompas and the four tests, the Keuzegids, the TalentenTest, the
      link to /tarieven/, and the 2020 line about open days that did not go
      ahead. The home page and the traject page now link to both.
- [ ] **Duplicate text between three pages.** You chose a full standalone page
      on 2026-08-05, so `/eerste-studiekeuze`, `/verkeerde-studiekeuze` and
      `/studiekeuzetraject` all describe the same traject. The four gesprekken
      are named only on the two situation pages, and described only on the
      traject page, so the overlap is small today. Watch it in Search Console
      after the move: if Google picks one page and drops the others, shorten
      the shared parts first.
- [ ] **A page for choosing with ADD, ADHD or autisme.** The third door on the
      home page and on the traject page has no page behind it, so it is plain
      text where the other two are links. The old `/studiekeuze/` is 679 words
      and it is built on the TalentenTest and the Keuzegids, so it is a rewrite
      and not a rebuild. It has 2 inbound links.
- [ ] **Confirm that online trajecten are really on offer.** Both situation
      pages carry the old sentence about online meetings, and the traject page
      says the same under "Bij jou in de buurt". A coach must be able to do it.
- [ ] `/onze-diensten-en-producten/` (793 words) and `/tarieven/` (718 words),
      the other two children of "Ons aanbod". Both need the price answer first.
- [x] **`/studiekeuzecoaches/`. The coaches page.** Built on 2026-08-05.
      `app/studiekeuzecoaches/page.tsx`, people in `app/coaches.ts`. It keeps
      the old URL and the old title word for word, and the old H1 without its
      exclamation mark. Section order: the poster with the roster as its index,
      "Wat elke coach gemeen heeft", the five coaches, "Welke coach krijg jij?",
      the intake. Removed on purpose: the 8,8 rating, and the twelve real names,
      histories and photos of the old page. The menu item "Coaches" now points
      here instead of at the section on the home page.
- [x] **Polished `/studiekeuzecoaches/`.** Done on 2026-08-05. Five changes.
      The loud line of the H1 is the display step from `sm` up, so the page
      opens with the weight of the traject page and the city pages; below `sm`
      it stays on the headline step, because "studiekeuzecoaches" is one word of
      eighteen letters that runs past the gutter on every telephone at the
      display size. The hero index is labelled "Direct naar" instead of "De
      coaches", which is the heading of the roster further down. The portraits
      are cropped to 4:5 instead of the square of the source files, so a column
      of five faces does not read as a row of profile pictures. The first
      portrait lost `priority`: the roster starts two screens down and the
      preload only competed with the poster at the top. And `[id]` now carries
      `scroll-margin-top` in `app/globals.css`, so a jump link on any page lands
      with air above it instead of flush against the window edge.
- [ ] **Five coaches, three cities.** `/studiekeuzecoaches` names five work
      regions, `/locaties` names three cities. Only Hanneke and Bram have a city
      page to link to. That is a choice, not a bug, but the two numbers must
      grow together once real coaches sign.
- [ ] **A contact page.** `/contact/` on the old site was only a form, and every
      page already carries that form. Decide whether the URL needs a page at all
      or only a redirect.
- [ ] A page for coaches who want to open a city. PRODUCT.md names the coach as
      the third user, and today they get one line in a paragraph.
- [x] **Link the city pages to the traject page.** Done on 2026-08-05. The
      `#traject` section of a city page, the home page and the main menu all
      point to `/studiekeuzetraject`.
- [ ] **Redirects to `/studiekeuzetraject`.** The archive also holds
      `/studiekeuze-traject/` (an older six-meeting page with a price) and
      `/studiekeuzetest/`. Both must redirect, see section 4.
- [x] **The lint error in `app/locaties/page.tsx`.** Fixed on 2026-08-05. The
      `<a href="/#contact">` is a `<Link>`. `npm run lint` now reports zero
      errors. The warnings that remain all come from the vendored skill scripts
      under `.cursor/`, not from the site.

## 8. Design system

- [ ] **Re-run `/impeccable document`.** `DESIGN.md` is still marked
      `<!-- SEED -->`. It has no real values, because there was no code when it
      was written. There is now: tokens in `app/globals.css`, and components in
      `app/components/`.

---

## Decisions already taken

Do not re-open these without a reason.

| Decision | When |
|---|---|
| Home page and city pages are high fidelity, not production ready | 2026-08-04 |
| Keep the old page structure and section order | 2026-08-04 |
| No Qompas tests on the site. Coaching conversations only | 2026-08-04 |
| Keep the old customer quotes for now, pending permission | 2026-08-04 |
| City pages use one shared text with city facts on top | 2026-08-05 |
| A meeting place per city, to be filled in later | 2026-08-05 |
| The coach is the only local proof on a city page | 2026-08-05 |
| Google Maps embed for the map, not OpenStreetMap | 2026-08-05 |
| The traject page keeps the section order of the old page | 2026-08-05 |
| The intake form stays at the end of every page. Mid-page the traject page carries an invitation to it, where the old page had the form | 2026-08-05 |
| An article keeps its old root URL. The hub is at `/artikelen`. Zero redirects | 2026-08-05 |
| Article text in MDX, article metadata in `app/articles.ts` | 2026-08-05 |
| No image on an article. The archive images die with the seller's S3 bucket and the rights are not confirmed | 2026-08-05 |
| No author name and no portrait on an article. The date is the only signature | 2026-08-05 |
| /eerste-studiekeuze and /verkeerde-studiekeuze are full standalone pages, not short pages that point at the traject page | 2026-08-05 |
| The situation pages keep the sentences of the old pages, cleaned, not a rewrite | 2026-08-05 |
| A coach is written once, in `app/coaches.ts`. A city points at a coach and takes its region from them | 2026-08-05 |
| Coach texts are third person, not the first person of the old site. Twelve people who all open with "Hoi! Ik ben" read as one voice | 2026-08-05 |
| The coaches page shows five coaches; `/locaties` keeps three cities | 2026-08-05 |
| The coaches page speaks only to the studiekiezer and the parent. Recruiting a coach waits for its own page | 2026-08-05 |
| The face of a coach sits in the 20rem margin column, the column that holds a heading on every other page | 2026-08-05 |
| Coach portraits are cropped 4:5, not square. Five squares in a column read as profile pictures, which is the team grid DESIGN.md sends us away from | 2026-08-05 |
| A page title may drop one type step below `sm` when a long compound word does not fit. The step above stays the same as every sibling page | 2026-08-05 |
