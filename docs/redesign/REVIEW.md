# Review of the client rebuild

The site was rebuilt to the client's Claude Design export (`docs/redesign/client/`)
and then reviewed by four lenses: **fidelity** (does it look like the client's
desktop design), **responsive / a11y / perf** (does it work at 320px, for a
keyboard, and fast), **code** (is it the code we want to keep), and **content**
(is every sentence on it true and in our voice).

47 findings came back: 3 blockers, 11 majors, 33 minors. **44 are fixed. 3 are
left open**, all of them minor and all of them recorded below as work the user
can file.

The state of the tree at the end of this pass:

| check | result |
| --- | --- |
| `npx tsc --noEmit` | clean |
| `npx eslint .` | clean |
| `npm run build` | clean, 38 pages, no warning |
| `node scripts/check-pages.mjs` | 69 checks over 23 routes at 320, 390 and 1280px, 35 internal links fetched, every page passed |
| `node scripts/screenshots.mjs` | 46 images in `docs/screenshots/redesign/`, all looked at, at both widths |

---

## 1. Findings by lens

Outcome is **fixed**, **open** (nothing changed, and why), or **partly fixed**
(the part that was worth doing landed, the rest is an issue below).

### Fidelity, 11 findings

| # | sev | file | finding | outcome |
| --- | --- | --- | --- | --- |
| F1 | major | `app/page.tsx` | Home `h1` wraps to three lines at 1280; the client's is two | **fixed.** Text column `1.25fr` → `1.3fr` (~638px). "Samen kiezen voor een / studie die écht past." |
| F2 | major | `app/studiekeuzecoaches/page.tsx` | Stat said "6 regio's", the map beside it pinned 3 | **fixed.** The stat reads `citiesWithCoach`, so it prints "3 / steden + online" and agrees with the map and with the home strip |
| F3 | major | `app/over-ons/page.tsx` | Two `className="pt-0"` / `"pt-4"` overrides beaten by `lg:pt-18` | **fixed.** Replaced with the `top="none"` prop the Section already has |
| F4 | minor | `app/coach-worden/page.tsx` | Same dead `pt-0` | **fixed.** `space="md" top="none"`; the rule now sits at the hero's own 64px |
| F5 | minor | `app/studiekeuzecoaches/page.tsx` | Coach card said "Maak kennis" with the name hidden | **fixed.** "Maak kennis met {naam}" on a growing violet button beside a nowrap "Intake" chip |
| F6 | minor | `app/studiekeuzecoaches/coach-filter.tsx` | First chip "Alle regio's" says regio twice | **fixed.** "Alle". The group keeps `aria-label="Filter op regio"` |
| F7 | minor | `app/tarieven/page.tsx` | Extra coaching's third slot read as disabled | **fixed.** Still a `<p>`, now `border-ink text-ink font-bold`, so the three cards end on one row of equal pills |
| F8 | minor | `app/studiekeuzecoaches/[coach]/page.tsx` | "binnen twee werkdagen" was generated for five people who do not exist | **fixed.** `responseTime` is a field on the coach, set on Janneke only; the others print "{naam} neemt contact met je op." |
| F9 | minor | `app/veelgestelde-vragen/page.tsx` | The page closes twice with one message | **fixed, by a rule.** See the note under this table |
| F10 | minor | `app/over-ons/page.tsx` | Hero `h1` broke over three short lines in a 19ch measure | **fixed.** `titleClassName="max-w-[28ch]"`; two lines at 50px |
| F11 | minor | `app/[artikel]/page.tsx` | Masthead carried two label rows | **fixed.** The eyebrow is a real back link ("← Alle artikelen", the shape of "← Alle coaches"), and tag + date is the single label row above the `h1` |

**Note on F9, and it is a deviation.** The finding offered two ways out: drop
the `ContactSection`, or strip the `CtaBand` down to a heading. Neither is right
everywhere, because the two components are not always neighbours.

- Where they touch (`/veelgestelde-vragen`, `/ervaringen`) the band now keeps
  its own words and **gives up its buttons**: the section right under it carries
  the one set of actions. `CtaBand`'s `primary` prop became optional for this.
- Where a whole "Lees ook" block stands between them (the three level pages,
  the three situation pages, an article) the button is a shortcut past that
  block, not a second closing, so it stays.

The rule is written into the `CtaBand` comment in `app/components/ui.tsx`.

### Responsive, accessibility and performance, 10 findings

| # | sev | file | finding | outcome |
| --- | --- | --- | --- | --- |
| A1 | major | `app/home/ticker.tsx` | The fact strip scrolled for ever with no way to stop it (WCAG 2.2.2) | **fixed.** A real 44px pause/play button with `aria-pressed` toggles `animation-play-state`. Hidden under reduced motion, where the strip already stands still |
| A2 | major | `app/page.tsx` | The coral "Gratis intake" badge was white on `#ff6b4a`, 2.82:1 | **fixed.** `text-ink`, 5.67:1. The fill and the rotation stay |
| A3 | major | `app/globals.css` | `--color-lavender-soft` 3.15:1 on violet | **fixed.** `#f3f0ff`, measured 4.60:1, still visibly a tint and not white |
| A4 | major | `app/globals.css` | `--color-coral-text` 4.02:1 on paper, 3.87:1 on coral-tint | **fixed.** `#b8381a`: 5.47:1 on paper, 5.26:1 on coral-tint |
| A5 | major | `app/globals.css` | `--color-amber-ink` 3.52:1 on amber-tint, not the 4.6:1 the comment claimed | **fixed.** `#7d5c00`: 5.77:1 on amber-tint, 5.82:1 on paper |
| A6 | major | `app/levels.ts`, `app/situations.ts` | Six pages printed a four-step traject the traject page does not have | **fixed, both halves.** `levelThemes` and `themes` are now `meetings.map((m) => m.title)` from `app/traject.ts`. One traject, one list |
| A7 | minor | `app/locaties/[stad]/page.tsx` | A 340px portrait a screen below the fold carried `priority` | **fixed.** `priority` gone, `sizes="340px"`, `placeholder="blur"` kept |
| A8 | minor | `app/components/site-nav.tsx` | Escape closed the menu but left focus on a hidden link | **fixed.** Escape returns focus to the Menu button, and a pointer outside the bar and the panel closes it |
| A9 | minor | `app/components/intake-form.tsx`, `app/coach-worden/application-form.tsx` | `placeholder:text-muted/70` is 3.7:1 | **fixed.** `placeholder:text-muted`, 7.9:1, in both `fieldBase` strings |
| A10 | minor | `app/components/reveal.tsx` | The comment named an `html[data-js]` hook that does not exist | **fixed.** It names the real gate, `(prefers-reduced-motion: no-preference) and (scripting: enabled)` |

### Code, 12 findings

| # | sev | file | finding | outcome |
| --- | --- | --- | --- | --- |
| C1 | major | `app/sitemap.ts`, `app/locaties/[stad]/page.tsx` | Stand-in coaches were guarded on their profile but not on their city page | **fixed, both halves.** The sitemap filters `!city.coach?.isPlaceholder`, and `generateMetadata` adds `robots: { index: false, follow: false }` for the same case. Verified in the build: `/locaties/utrecht` carries `noindex, nofollow`, `/locaties/amsterdam` carries none, and the sitemap lists amsterdam and bergen-op-zoom only |
| C2 | minor | `app/actions.ts` | `resolveDestination()` accepted a stand-in as a real destination and promised an answer from them | **fixed.** A stand-in returns `{ coach: null, cityName: coach.town }`, so the request takes the honest "nog geen coach" road. The city route drops a stand-in coach the same way |
| C3 | minor | `app/actions.ts` | No field had an upper bound, and two were interpolated into a subject line | **fixed.** 200 characters for the short fields, 5000 for `bericht` and `motivatie`, each with its own visible error rather than a silent cut, and both subjects go through `oneLine()`, which turns `\r` and `\n` into a space. `"bericht"` was added to `IntakeField` and wired into the textarea so its error can be seen |
| C4 | minor | `app/lib/mail.ts` | 429 was treated as a permanent refusal | **fixed.** `response.status < 500 && response.status !== 429`, so a rate limit falls through to the one retry |
| C5 | minor | `app/components/intake-form.tsx` | ~150 lines are copied verbatim into `app/coach-worden/application-form.tsx` | **open.** See issue list, item 1 |
| C6 | minor | `app/components/reveal.tsx` | Same stale comment as A10 | **fixed** by the same change |
| C7 | minor | `app/studiekeuzecoaches/[coach]/page.tsx` | Hand-typed `Params` where the rest of the repo uses `PageProps<"/...">` | **fixed.** `PageProps<"/studiekeuzecoaches/[coach]">` in both `generateMetadata` and the page |
| C8 | minor | `scripts/build-nl-map.mjs` | `world-atlas@2` plus `new Date()` made the generator irreproducible | **fixed.** Pinned to `world-atlas@2.0.2`, the version is written into the generated header and the date is gone. The committed `nl-map-data.ts` was not regenerated, so its header only picks the new wording up on the next run |
| C9 | minor | `scripts/screenshots.mjs` | The hand-kept `ROUTES` list never visits 17 of the 38 built pages | **partly fixed.** See issue list, item 2 |
| C10 | minor | `app/components/nl-map.tsx` | The hit circle is about 39px in the 245px city-page column, under the 44px rule | **fixed.** `r` 22 → 26 units, which is 47px at the smallest scale we draw. The comment now carries the arithmetic instead of a claim |
| C11 | minor | `app/components/maps.tsx` | The lavender map frame is written by hand at four call sites, and two of them already disagreed | **partly fixed.** See issue list, item 3 |
| C12 | minor | `.gitignore` | The comment under `!.env.example` named `todos.md` and `maps.tsx`, neither of which reads it | **fixed.** It names `app/lib/mail.ts`, `app/site-config.ts` and `docs/decisions.md` |

### Content, 14 findings

| # | sev | file | finding | outcome |
| --- | --- | --- | --- | --- |
| T1 | blocker | `app/situations.ts` | Two lines still said "ervaren" about a coach (issue #11) | **fixed.** "met een eigen studiekeuzecoach" and "Je krijgt een eigen studiekeuzecoach" |
| T2 | blocker | `app/studiekeuzetraject/page.tsx` | "Je krijgt een ervaren coach" | **fixed.** "een vaste coach". A client edit, see section 3 |
| T3 | blocker | `app/studiekeuzecoaches/page.tsx` | Two of the four "Wat elke coach gemeen heeft" cards were hiring promises, one contradicted by the roster (issue #19) | **fixed.** Both deleted, the two facts about the traject stay, and the `h2` is now "Wat je van elke coach mag verwachten" |
| T4 | major | `app/coach-worden/page.tsx` | The busy-region list counted the five stand-ins, so a real coach in Rotterdam was turned away by an invented one | **fixed.** Both lists read `coaches.filter((c) => !c.isPlaceholder)`. The page prints "Amsterdam is bezet." and Groningen and Leeuwarden are open again |
| T5 | minor | `app/page.tsx` | "Onze coaches kennen alle niveaus" is a claim about a roster with one real person | **fixed.** "Het traject werkt op elk niveau (mbo, hbo en wo) en bij elke twijfel." A client edit, see section 3 |
| T6 | minor | `app/components/site-footer.tsx` | "Keuzecheck herstarters" names a product we do not sell | **fixed.** "Verkeerde studiekeuze", the `h1` of the page it opens |
| T7 | minor | `app/components/level-page.tsx` | The band promised an intakegesprek the page cannot give | **fixed, with different words than the finding proposed.** The pair it named ("Begin met een gesprek. / Het kost je niets.") is the `ContactSection`'s own heading one block lower, so it would have printed twice. The band now reads "Twijfel je of dit traject bij je past? / Dat hoor je in het intakegesprek." |
| T8 | minor | `app/studiekeuzetraject/scan-panel.tsx` | "Start met de Studiekeuzescan" starts nothing | **fixed.** "Kies een coach voor de scan" |
| T9 | minor | `app/tarieven/page.tsx` | "Start met de scan" beside "Plan gratis intake bij een coach" for one destination | **fixed.** "Kies een coach voor de scan" |
| T10 | minor | `app/voor-wie/page.tsx` | `In ${cityCount} steden` becomes "In 1 steden" | **fixed.** Singular guard |
| T11 | minor | `app/over-ons/page.tsx` | Same | **fixed.** `steden === 1 ? "1 stad en online" : ...` |
| T12 | minor | `app/home/ticker.tsx` | Same, on the most visible of the three | **fixed** |
| T13 | minor | `app/coaches.ts` | The site said two things about the one real coach's region | **fixed.** `region` is "Amsterdam, Amstelveen, Haarlem, Zaandam en omgeving", which the roster card, the city page and her own profile now agree on |
| T14 | minor | `app/site-config.ts` | The brand was spelled three ways | **fixed, with a decision.** Running text is `StudiekeuzeAdvies` (the client's spelling, the wordmark). Every `<title>` and `seoTitle` keeps `StudieKeuzeAdvies`, because that string is what the bought rankings hang on. "Studiekeuzeadvies in {stad}" on a city page is the service and not the brand, and stays. Recorded in `docs/decisions.md` |

---

## 2. Left open: a list to file as issues

Three findings and six smaller notes. None of them blocks a launch.

1. **Extract the shared form UI** (C5, minor). `app/coach-worden/application-form.tsx`
   copies about 150 lines of `app/components/intake-form.tsx` verbatim:
   `fieldBase`, `labelBase`, `errorBase`, the ink card, the confirmation card
   with the violet check disc, the undeliverable alert with its mailto, the two
   spam-guard inputs with their `renderedAt` effect, and the select chevron.
   A change to one (the 17px field floor, the honeypot markup) has to be made
   twice, and this pass had to make the placeholder fix twice for exactly that
   reason. *Not done because* it is a new shared module in `app/components` at
   the end of a fix pass: a refactor that no screenshot can prove and that puts
   both forms at risk. The two server actions stay separate either way.
2. **Build the route list at run time** (C9, minor, partly fixed).
   `scripts/screenshots.mjs` exports a hand list that `scripts/check-pages.mjs`
   imports, so 17 of the 38 built pages were never visited. **Done in this
   pass:** `/locaties/bergen-op-zoom` (the only city page with the no-coach
   layout) and `/studiekeuzecoaches/hanneke` (a stand-in profile, which the
   sitemap leaves out on purpose) were added, and the comment now states the
   rule for adding one: a route earns a place when it has a layout no other
   route has. **Still open:** fetching `${BASE}/sitemap.xml` and deriving the
   list. *Not done because* the remaining 15 differ from a route we already shoot
   only in content, and the list is also the review artefact: 38 routes means 76
   images to look at every pass.
3. **Give `NlMap` a `frame` prop** (C11, minor, partly fixed). The lavender
   frame was written by hand at four call sites and two of them disagreed.
   **Done in this pass:** `app/components/maps.tsx` now uses the same string as
   `/locaties` and `/studiekeuzecoaches`. **Still open:** the prop itself. Note
   that the home page (`bg-white p-4` inside an ink panel) and `/over-ons`
   (`bg-lavender p-5` inside an ink panel) carry a different frame on purpose,
   so a single `frame` boolean is not enough: it needs a tone.
4. **`app/components/ui.tsx` needs an `outline-chip` Button variant.** The
   client's coach card has a 1.5px `chip-border` rule with a violet bold label.
   The workaround on the card is `variant="ghost"` plus
   `shrink-0 border-[1.5px] border-chip-border px-6 py-3 text-button whitespace-nowrap hover:border-violet`.
   Replace that string with the variant when it exists.
5. **The ticker's CSS lives in a `<style>` element inside `app/home/ticker.tsx`.**
   Its keyframes, its pause rule and its mask were kept there because
   `app/globals.css` belongs to the Foundation phase. Every class is prefixed
   `home-ticker`, so it is safe where it is; move it if all keyframes should sit
   in one file. The same file also writes a literal `0.875rem`, which the type
   ramp in `DESIGN.md` may want a step for.
6. **The coral section header in `app/globals.css` still says "Never text on
   paper below 18px".** With `--color-coral-text` now at 5.47:1 on paper that
   caution applies only to `--color-coral` itself (`#ff6b4a`, 2.5:1). The line
   to change is the `/* --- Coral: the warm accent ... */` header.
7. **`app/components/nl-map-data.ts` was not regenerated**, so its header still
   says "world-atlas 2.x" and carries a generation date. The generator is fixed
   (C8); the file picks the new header up the first time somebody runs
   `node scripts/build-nl-map.mjs`.
8. **`/studiekeuzecoaches` offers six town chips above a map with three pins.**
   The counter and the map agree now (F2), but the filter still has a chip for
   Rotterdam, Groningen and Eindhoven, because three stand-ins live there. If
   the client wants six pins, add those towns to `app/cities.ts` with an `at`
   point (Rotterdam 51.9244/4.4777, Groningen 53.2194/6.5665, Eindhoven
   51.4416/5.4697) and the map, the counter and the home strip move together.
9. **The `/coach-worden` hero leaves about 250px of empty paper under the left
   column at 1280**, because the application form beside it is much taller. It
   is not broken and it is close to the client's own rendering, but it is the
   one place on the site where the two-column rhythm visibly runs out.

---

## 3. Open questions for the client

Nothing below can be answered from the archive or from the code. Each one is a
thing the site either cannot say yet, or says on the client's word alone.

### Facts we may not print until they are true of us

1. **The unproven numbers.** The client's pages print "8,8 gemiddeld",
   "1000+ trajecten per jaar", "92% studeert met plezier door", "92% kiest
   goed" and "35+ locaties". None of them is on the site: PRODUCT.md principle 5
   and issue #24. Their slots carry true statements instead (gratis intake,
   MBO · HBO · WO, online of op locatie, the real number of cities from
   `app/cities.ts`). **Question: can any of these be proved of the new company?**
   Each one that can, goes back in the same slot.
2. **"Ontwikkeld door TalentDrives, met meer dan 30 jaar ervaring."** This is on
   `/studiekeuzetraject` and it is the client's own copy about their own
   supplier, so it is printed as their claim and not as ours (`app/traject.ts`
   carries the warning). **Question: confirm the supplier's name and that
   number, or give us wording you stand behind.**
3. **Three edits made under principle 5 that need the client's nod.**
   - `/studiekeuzetraject`: "Je krijgt een **ervaren** coach" became "een
     **vaste** coach". No coach is under contract, so "ervaren" is unprovable,
     and "vaste" is true on every page of this site.
   - Home page: "Onze coaches kennen alle niveaus (mbo, hbo en wo) en alle
     twijfels" became "Het traject werkt op elk niveau (mbo, hbo en wo) en bij
     elke twijfel." Same reason, moved from the people to the method.
   - `/studiekeuzecoaches`: two of the four cards under "Wat elke coach gemeen
     heeft" were deleted ("Elke coach heeft jaren buiten het onderwijs gewerkt",
     "Ze werken al jaren met jouw leeftijd"). The roster contradicts the first
     one. The heading is now "Wat je van elke coach mag verwachten". **If you
     want four cards again, give us two facts that are true of the roster we
     actually have.**
4. **`/over-ons` still prints "het vak waar we jaren ervaring in hebben"**, the
   client's own sentence. It is about the collective and not about a named
   coach, so it is outside issue #11 and it was left alone. Flagging it in case
   you want it checked against principle 5 as well.

### People and pictures

5. **The stock photos in the export may not go live.** Every photo in the
   client's HTML is a stock placeholder, so none of them was copied into
   `public/`. The site uses the repo's own images or no photo. The home hero is
   the generated scene that names nobody (decision 2026-08-13). **Question: we
   need real photographs, or the budget for a photographer.**
6. **The five stand-in coaches.** Hanneke, Bram, Nadia, Wietske and Joris do
   not exist: `isPlaceholder: true` in `app/coaches.ts`. They are visible in
   development behind a yellow banner, they are out of the sitemap, their pages
   and their city pages carry `noindex, nofollow`, and an intake request from
   one of their pages no longer promises that they will answer. **They may not
   go live.** Every guard drops away by itself the day `isPlaceholder` becomes
   `false`. **Question: who are the real coaches, and in which cities?**
7. **The Over ons names.** Janneke's profile, which is her own text, says she
   and **four colleague coaches** own StudiekeuzeAdvies together, "met z'n
   vijven". The site cannot name the other four, so `/over-ons` speaks about a
   collective without naming anybody. **Question: the names, and per person
   whether they want a face and a page.**
8. **Janneke's photo is from 2019** and is the only real face on the site. The
   rights are fine; the photo is six years old and it is black and white where
   everything else is warm colour. **Question: a newer photo she likes.**

### Money

9. **The coach licence price.** `/coach-worden` prints "± € 750" with the note
   "een indicatie, de definitieve prijs stemmen we samen af", which is what the
   client said. **Question: the definitive figure, and whether the page may
   print it without "±".**
10. **The three product prices are settled** and need nothing: Studiekeuzescan
    € 249, Studiekeuzetraject € 649, Extra coaching € 89 per gesprek after a
    scan or a traject.

### Accounts and environment variables

11. **Resend, and it is a launch blocker (issue #17).** Without a key no intake
    request and no coach application leaves the site. **The account must belong
    to the client**, not to the developer, so nothing has to move when the
    engagement ends. We only hold the key.
    - `RESEND_API_KEY` from https://resend.com/api-keys, sending permission is
      enough.
    - `MAIL_FROM`, the sender. The domain has to be verified in Resend first.
      **DKIM and SPF wait on the DNS move (issues #17 and #23):**
      studiekeuzeadvies.nl still points at the old WordPress and its DNS is in
      the seller's tenant, so the three Resend records cannot be added yet.
      Until they are, mail from this address lands in spam or is refused. Add
      the records on the day the domain moves and check one real send before you
      tell a coach to watch their inbox.
    - `MAIL_ARCHIVE`, one mailbox that somebody really reads. Every request goes
      to the coach **and** as a copy here, so no request exists in only one
      place, and it catches a city with no coach and a coach whose own address is
      still null. A lead is worth about seven hundred euro.
    - `COACH_APPLICATION_INBOX` is optional and falls back to `MAIL_ARCHIVE`.
12. **`NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` is optional since 2026-08-20.**
    Without it every page draws our own map (`app/components/nl-map.tsx`):
    first party, no cookie, no consent question and no key. The Google embed is
    the enhancement, not the floor. Set it only if the client wants streets on a
    city page.
13. **The addresses that are still null in `app/site-config.ts`.**
    `unassignedIntakeInbox` (who answers a request from a city with no coach)
    and `coachRecruitmentInbox` (the address a coach can write to, printed on a
    city page). Both are `null` on purpose: an invented address is worse than
    none, and while they are null every block that would show one hides itself.
    `hallo@studiekeuzeadvies.nl` is cancelled with the seller's tenant (issue
    #7), so it bounces. **Question: name a mailbox for each, or confirm they
    stay closed.** The same holds for the `email` field of every coach in
    `app/coaches.ts`, which is null for all six.

### Meeting places

14. **The meeting addresses.** The seller rented the rooms and a lease is not
    content, so no page prints an address. `/locaties/amsterdam` says "een
    rustige ruimte in het centrum, dicht bij het station" and nothing more.
    **Question: confirm each address before it goes on a city page.**
