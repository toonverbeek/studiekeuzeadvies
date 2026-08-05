# Design brief — the five unblocked pages

Written 2026-08-05 with `/impeccable shape`, against PRODUCT.md, DESIGN.md and
`docs/rebuild-review.md` section 6.

These are the five pages of the rebuild that wait on nobody: no price decision,
no coach contract, no rights question. All five have real copy in the archive.
Three build sessions divide them, and each session owns only the files named in
section 12.

---

## 1. Feature summary

Five pages that answer a search question completely, before they offer
anything.

| New URL | Old URL | Old real words | Session |
|---|---|---:|---|
| `/studiekeuze-met-add-adhd` | same | 561 | A |
| `/veelgestelde-vragen` | `/over-ons/veelgestelde-vragen/` | 380 | B |
| `/hbo-opleiding-kiezen` | same | 441 | C |
| `/mbo-opleiding-kiezen` | same | 408 | C |
| `/wo-opleiding-kiezen` | same | 329 | C |

All five URLs are already in `docs/url-map.csv` with the correct action. The map
does not have to be regenerated.

## 2. Primary user action

Per page, one action, and it is always the same shape: **read the answer, then
ask for the free intake.** Nobody has to buy anything, and no page may ask for
the intake before it has answered.

- ADD/ADHD page: the reader recognises their own situation and understands that
  the way of choosing is what the traject fixes.
- FAQ: the reader, usually the parent, finds one specific answer fast.
- The three level pages: the reader sees that we help at their level, and picks
  the door that fits them (first choice, or a choice that went wrong).

## 3. Design direction

No new visual direction. This is not net-new work: DESIGN.md is committed and
the page templates already exist in code. Follow them.

- **Color strategy: Committed**, as the project default. Ochre carries the
  poster at the top, the invitation block and the footer. Long text is Warm Ink
  on Warm Paper. Never body text on ochre.
- **Theme scene sentence:** it is half past ten at night. A 17 year old reads
  this on a telephone in bed with the light low, and a parent reads the same
  page on a laptop downstairs. Light, warm paper. This is settled for the whole
  site, and these pages do not re-open it.
- **Anchor references:** the pages that already exist. `/eerste-studiekeuze`
  and `/verkeerde-studiekeuze` for shape, `/studiekeuzetraject` for rhythm.
  Outside the repo, De Correspondent for a Dutch reading surface.

**No visual probes were generated.** The image gate is skipped for one reason:
these pages join a design system that is already built and shipped in code, so
an exploration would only re-decide what DESIGN.md decided.

## 4. Scope

- **Fidelity:** production-ready. These go live.
- **Breadth:** five routes, two new components at most.
- **Interactivity:** the site's existing model. Jump links, hover and focus
  states, the intake form that already exists. Nothing new.
- **Time intent:** polish until it ships. One branch,
  `worktree-five-unblocked-pages`.

## 5. Layout strategy

Every page follows the skeleton the site already uses. Do not invent a new one.

```
SiteHeader                       ochre
Poster:  eyebrow, h1, lead,      ochre
         "Op deze pagina" index
Body:    reading rows on         paper
         hairline rules
Invitation: "Plan een gratis
         intakegesprek"          ochre
ReadAlso (where articles fit)    paper
ContactSection (the form)
SiteFooter                       ink
```

The reading row (`readingRow` in `app/shell.ts`) puts the question on the left
and the answer on the right. Use it for every long section, so the answer column
starts on the same line as on every other page.

Rhythm rule for this batch: vary the vertical space between sections, do not
repeat one padding value. Sections are separated by a 1px hairline, never by a
card and never by a shadow.

## 6. Key states

These are static content pages, so the state list is short but it is not empty.

| State | What it needs |
|---|---|
| Default | The full answer, readable at 17px on a small screen. |
| Long text on a telephone | The jump index at the top must work as the map. Every section id must be reachable. |
| Keyboard | A visible focus ring on every link, in reading order. |
| Reduced motion | Every transition off. Already handled globally in `globals.css`. |
| Form error and success | Owned by `ContactSection` and `app/actions.ts`. Do not touch. |
| Missing related article | `getArticle` returns undefined and the entry is skipped. Keep that behaviour. |

## 7. Interaction model

Nothing new. Links carry an underline at rest and change ink on hover.
Transitions are 150ms `ease-out-quart`. There are no modals, no popups, no
accordions that hide text a reader came to read, and no motion that starts by
itself.

## 8. Content requirements

The rule for the whole batch: **the words are the old words where they are true
and where we may use them.** Every page keeps the old `<title>` letter for
letter, because that is what ranks. Write a file header that lists exactly what
was removed and why, the way `app/situations.ts` and `app/traject.ts` do.

### Always remove, on every page in this batch

1. **Qompas, the TalentenTest, the Keuzegids, the four tests, Talentfocus.**
   They belong to the seller. Every level page and the FAQ carry a paragraph
   about them. All of it goes.
2. **The 088 telephone number** in the copy. `app/site-config.ts` owns the
   number.
3. **Every claim about who the coaches are.** The old level pages say the
   coaches all finished a university degree, that they are young
   professionals, and that they have years of experience with this age group.
   Those are hiring requirements, not facts, and `todos.md` lists them as a
   blocker. Do not repeat them. Describe what the *traject* does instead.
4. **Every unprovable number and superlative.** 8,8 / 92 percent / "meest
   gevraagde partij" / "de enige echt onafhankelijke".
5. **Prices.** No amount goes on any page in this batch.
6. **Em dashes.** Use a comma, a colon, a semicolon, a period, or parentheses.

### Voice

"Je" and "jij" to everybody, also to parents. Short sentences. Warm, never
formal, never childish. Say the difficult part out loud. Never use urgency,
never use fear about the future, and never call ourselves experts.

### Body length

`docs/rebuild-review.md` section 4 is the thermometer. The target is the old
word count **minus what we legitimately removed**, not below it. Where a page
falls short after the cleaning, put the length back with copy that is true and
ours: what happens in the four meetings, the same coach every time, online is
possible, the intake is free and costs nothing.

Verify with `python3 scripts/compare-word-counts.py` after `npm run build`.

---

## 9. Page specs

### 9.1 `/studiekeuze-met-add-adhd` (session A)

Source: `/Users/toon/Dev/studiekeuzeadvies archive/markdown/studiekeuze-met-add-adhd.md`

**Scope decision, taken by the user on 2026-08-05: ADD and ADHD only.** PRODUCT.md
names a wider group ("ADD, ADHD, or autism"), and the home page and the traject
page already use the wider wording. This page keeps the old scope, because that
is where the real copy is. Do not write anything about autism on this page. The
gap is recorded in `todos.md`, not filled with invention.

Build it as a third entry in `app/situations.ts` and render it with the existing
`SituationPage`. The template needs one small change: the cross-link at the top
right ("Ik ben al eens gestopt") is hard-coded for two pages. Make it data, as a
field on `Situation`, and keep the two existing pages exactly as they read now.

- `seoTitle`: `Studeren met ADD of ADHD | Hulp bij studiekeuze | StudieKeuzeAdvies`,
  word for word from the old page.
- `title` (the h1): `Studeren met ADD of ADHD`. The old h1 was "ADHD of ADD en
  Beroepskeuze". It is keyword-first and "beroepskeuze" is not what this page
  is about; the old page's own breadcrumb line says "Studeren met ADD of ADHD".
  Record the change in the file header.
- `eyebrow`: something in the shape of the other two, for example
  `Als je ADD of ADHD hebt`.
- `lead`: the first paragraph of the old page.
- Sections, from the old text, in this order:
  1. Self-insight and the pitfalls. The second old paragraph. Further study
     asks for more independence and gives less structure than secondary
     school, so look at the pitfalls before they happen. ADD and ADHD also
     bring their own strong points.
  2. If a study already went wrong. The third old paragraph.
  3. "Is dit traject iets voor mij?" The old h2 and its two paragraphs, minus
     the sentence that sells the tests.
- One extra section is allowed and wanted, because the page is short after the
  cleaning: **how the traject is built for a reader who needs overview.** The
  true copy for it already exists in `app/traject.ts`, the third audience block:
  fixed steps, one thing at a time, the same coach at every appointment, and
  knowing in advance what is going to happen. Do not claim experience with ADD
  or ADHD that no signed coach can back.
- The four themes and `themesIntro`: as the other two situation pages.
- `related`: pick two articles that really exist in `app/articles.ts`.

**Also in this session, because it is the same file:** in the
`eerste-studiekeuze` entry, the section "Mbo, hbo of wo? Je kunt alle kanten op"
should link to the three new level pages (`/mbo-opleiding-kiezen`,
`/hbo-opleiding-kiezen`, `/wo-opleiding-kiezen`). Those URLs are fixed, so the
link can be written before session C finishes.

### 9.2 `/veelgestelde-vragen` (session B)

Source: `/Users/toon/Dev/studiekeuzeadvies archive/markdown/over-ons__veelgestelde-vragen.md`

The old page had five questions. Three are reusable as they stand, one is
mostly Keuzegids and Talentfocus, and one is only the price.

**Decision taken by the user on 2026-08-05:** ship the three clean answers plus
new questions we can already answer truthfully from the pages that exist. **The
price question is left off the page entirely** until the price is decided. Do
not write "vanaf", do not write a range, and do not invent a placeholder.

Questions, in this order:

| Question | Source |
|---|---|
| Wat houdt StudieKeuzeAdvies in? | Old answer, word for word |
| Voor wie is StudieKeuzeAdvies? | Old answer, word for word |
| Hoe lang duurt een traject? | Old answer, minus nothing. It is clean |
| Wat gebeurt er in het intakegesprek? | New, from `/studiekeuzetraject` and the intake copy |
| Wie is mijn coach? | New, from `/studiekeuzecoaches`. Say what is true: one coach for the whole traject, a named person with a region |
| Waar vinden de gesprekken plaats? | New, from `/locaties`. Say that we only name cities where a coach really works |
| Kan het ook online? | The old line that is already in `app/situations.ts` |
| Wat als het niet blijkt te passen? | New. The intake is free and you say no afterwards without a reason |

The old third question, "Waarom StudieKeuzeAdvies?", does not come back. What is
left of it after the Keuzegids, Talentfocus and the partner list are taken out
is one sentence that says nothing.

**Layout: every answer is open.** No accordion. A reader who came for one
answer scans, and one of our named user groups needs overview more than it
needs interaction. Use the reading row: the question on the left, the answer on
the right, a hairline between the pairs, and the question list repeated as the
"Op deze pagina" index in the poster. Mark the questions up as real headings so
the index and the browser find them.

Do not add FAQ structured data in this session. `todos.md` keeps structured
data as a separate decision.

### 9.3 `/hbo-opleiding-kiezen`, `/mbo-opleiding-kiezen`, `/wo-opleiding-kiezen` (session C)

Sources: the three `*-opleiding-kiezen.md` files in
`/Users/toon/Dev/studiekeuzeadvies archive/markdown/`.

**Decision taken by the user on 2026-08-05: a shared skeleton, but each page
gets its own body.** On the old site these three were nearly the same text, and
`docs/rebuild-review.md` section 5 names that pattern as the biggest ranking
risk in the whole move. We do not repeat it.

Build `app/levels.ts` with three entries and one page component. The shared part
must stay under about 80 words: the four themes and a link to
`/studiekeuzetraject`. Everything else is written per level.

Each entry keeps the old `<title>` and the old h1 word for word:

| Slug | h1 | `<title>` |
|---|---|---|
| `mbo-opleiding-kiezen` | Hulp bij studiekeuze mbo | Opleiding kiezen mbo \| Hulp bij studiekeuze \| StudieKeuzeAdvies |
| `hbo-opleiding-kiezen` | Hulp bij studiekeuze hbo | Opleiding kiezen hbo \| Hulp bij studiekeuze \| StudieKeuzeAdvies |
| `wo-opleiding-kiezen` | Hulp bij studiekeuze wo | Opleiding kiezen wo \| Hulp bij studiekeuze \| StudieKeuzeAdvies |

What makes each page genuinely different, from the old copy:

- **mbo.** You are in the last year of the vmbo and you are still young when
  you choose. The number of programmes is enormous, and the same programme
  differs per ROC: Verpleegkunde at the Deltion College in Zwolle does not look
  like Verpleegkunde at ROC Nijmegen. That example is concrete and true, so
  keep it.
- **hbo.** Two roads arrive here: the last year of the havo, and the mbo
  student who moves up. Two questions, not one: which programme, and which
  hogeschool.
- **wo.** The last year of the vwo. Universities at home and abroad. Job
  security and career weigh into the choice more heavily here, and that is the
  reader's own words, not a promise from us.

Keep the old page's two doors, they are genuinely useful:
"Ik ga voor het eerst een <niveau> opleiding kiezen" to `/eerste-studiekeuze`,
and "Ik heb eerder een verkeerde <niveau> opleiding gekozen" to
`/verkeerde-studiekeuze`. Do not build them as two identical cards with icons.

**Delete the whole "De coaches van StudieKeuzeAdvies" section on all three
pages.** Every sentence in it is a claim about people who worked for the seller.

Each page needs about 400 words of real body. After the cleaning the old copy
gives roughly 250, so about 150 words per page must be written. Write them
about the level, never about us.

---

## 10. Accessibility

PRODUCT.md sets the level: good practice, and these five points are hard
requirements.

- Text contrast 4.5:1 or better, on ochre as well as on paper.
- Body text 17px or more, everywhere.
- Correct heading order. One `h1`, then `h2`, and no level skipped.
- Every jump target has an id that the index really points at.
- A visible focus ring on everything the keyboard reaches.
- Simple Dutch and short blocks. For the ADD/ADHD page this is the subject of
  the page, so it is not a style preference there.

## 11. Verification, per session

The three sessions share one worktree, so **a session must not run
`npm run build`**. Three builds at the same time write to the same `.next`
directory and corrupt each other. Each session runs only:

```bash
npx tsc --noEmit          # types
npm run lint              # eslint
```

The main session runs the build and the word-count compare once, after all
three are finished:

```bash
npm run build             # the five routes must appear in the route list
python3 scripts/compare-word-counts.py
```

There is no test suite in this repo, so the build and the word-count compare
are the check. Read the compare output: a new page far under the old page means
copy is missing, not that the page is finished.

## 12. File ownership

Three sessions work on one branch at the same time. A session may create and
edit only its own files. **Nobody edits a file in the "integration" row.**

| Session | Files |
|---|---|
| A. ADD/ADHD | `app/situations.ts`, `app/components/situation-page.tsx`, `app/studiekeuze-met-add-adhd/page.tsx` |
| B. FAQ | `app/faq.ts`, `app/components/faq-list.tsx` (if one is needed), `app/veelgestelde-vragen/page.tsx` |
| C. Level pages | `app/levels.ts`, `app/components/level-page.tsx`, `app/hbo-opleiding-kiezen/page.tsx`, `app/mbo-opleiding-kiezen/page.tsx`, `app/wo-opleiding-kiezen/page.tsx` |
| Integration (the main session, afterwards) | `app/page.tsx`, `app/traject.ts`, `app/components/site-header.tsx`, `app/components/site-footer.tsx`, `todos.md`, the commit |

No session runs `git commit`, `git add`, or any other git command. The main
session commits the whole branch once, after all three are finished and the
build is clean.

## 13. Open questions, for the integration step

1. The home page and the traject page describe the third door as "ADD, ADHD **of
   autisme**", and they will link to a page that says nothing about autism. Link
   them anyway, and record the mismatch in `todos.md`.
2. Do the three level pages belong in the main menu? Probably not: the menu has
   five items already. The `/eerste-studiekeuze` page links to them, and that is
   the honest route in.
3. `/veelgestelde-vragen` has no route in from anywhere yet. The footer is the
   natural place.
