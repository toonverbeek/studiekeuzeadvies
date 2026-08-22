# Design spec: the client redesign ("Stap / Definitief"), extracted

Source: `docs/redesign/client/<page>/index.html` (Claude Design export, inline
styles), `docs/redesign/client/GESPREK.md`, and the 20 screenshots in
`docs/redesign/client-screenshots/`. Extracted 2026-08-20. Every value below is
read from the HTML, not guessed. Where this file and the HTML disagree, the HTML
wins; where this file and PRODUCT.md disagree, PRODUCT.md wins and the conflict
is marked with `WARNING`.

The client's DESKTOP rendering (1280px) is the target. The client's 390px
rendering is broken and is described in section 7 as a do-not-copy list. The
responsive behaviour is ours to design, mobile first.

This file replaces the visual rules of DESIGN.md (ochre system). DESIGN.md is
obsolete from the moment this spec lands; do not apply its colour or type rules.

Contents

1. Tokens
2. Typography
3. Components
4. Pages (section order, layout, complete copy)
5. Interactions (the `text/x-dc` scripts)
6. Route map, and the pages without a client template
7. What the client's 390px rendering gets wrong, and the responsive rules
8. Open questions

---

## 1. Tokens

### 1.1 Colours

Every hex that occurs in the ten HTML files, named by role. "Where" lists every
use found.

| Token | Value | Where it is used |
|---|---|---|
| `paper` | `#faf8f4` | page background; text on ink and violet surfaces; nav CTA text; input background; price-card inner background; "thuis" box background; KeuzeScan steps box background; ring stroke of map pins |
| `ink` | `#1e1b4b` | body text colour; links; nav CTA background; all dark panels (price panel, voor-ouders panel, coaches CTA, testen card, collectief card, form cards, word-coach "In het kort" card); footer background; outline-button border (1.5px); section top rules (1.5px); region chip selected background; hero quote card background; ticker background |
| `violet` | `#6d4aff` | primary button background; logo path; logo wordmark "advies"; active nav link; eyebrow labels; link hover colour; step number 04; pill text on lavender; check marks on paper; "Voor jou" panel background; KeuzeScan numbers 1 and 2; TD icon background; confirmation check circle; "Altijd een happy end dus!" heading; stat "6"; coach-card city tag text; article tag text |
| `violet-dark` | `#5a38e6` | primary button hover |
| `violet-light` | `#8f75ff` | logo path on ink (footer); halftone map dots |
| `lavender` | `#efebff` | soft panels (home coaches panel, regio box, gesprekken section, tarieven CTA, artikelen CTA, werkgebied box, "hoe het verder gaat" box); pill background on paper; hero badge background; coach-card city tag background; "Aanvullend" badge background; map frame background and label halo; article tag bg (Aanmelden, Keuzeproces) |
| `lavender-ink` | `#b9b3e8` | muted text on ink (footer text and links, price-panel paragraph, eyebrow on ink, testen card paragraphs, form helper text, collectief paragraph); ticker text |
| `lavender-soft` | `#cfc2ff` | eyebrow "Voor jou" on the violet panel |
| `lavender-body-on-violet` | `#e4dcff` | paragraph text on the violet situation card (Voor wie) |
| `lavender-body-on-ink` | `#c5bfec` | paragraph text on the ink situation card (Voor wie) |
| `coral` | `#ff6b4a` | logo dot; hero badge dot; ticker separator `✦`; step number 04 (traject page); "Daarna, thuis" eyebrow; KeuzeScan step 3 number; KeuzeScan eyebrow "Liever een korte verkenning?"; stat "8,8"; coach-card levels line; "Dit vragen we" heading and its checks; arrows on the voor-ouders panel; link on the ink situation card; map pins; big `"` on the testimonial; the rotated "92% kiest goed" badge background |
| `coral-soft` | `#ffb3a0` | form validation error text on ink |
| `coral-tint` | `#fff1ec` | "Psycholoog" pill background (Janneke) |
| `coral-tag-bg` / `coral-tag-fg` | `#ffe9e2` / `#d84a26` | article tag "Regelingen" |
| `amber` | `#ffc94d` | check marks on ink surfaces; arrows on the violet panel; "Meest gekozen" badge background; star row; numbers 1 to 4 on the word-coach "In het kort" card; left border of the "Als er meer speelt" box and of coach-card quotes; link on the violet situation card; stat "1-op-1" |
| `amber-tint` / `amber-ink` | `#fff7e0` / `#a97c00` | "10 jaar bij StudiekeuzeAdvies" pill; "…of stel jouw regio voor" pill |
| `amber-tag-bg` / `amber-tag-fg` | `#fff4d6` / `#9a6b00` | article tag "Open dagen" |
| `muted` | `#4d4a6b` | secondary body text everywhere on paper (lead paragraphs, card bodies, captions, "compleet", star-row text, footer-less legal text) |
| `muted-read` | `#3a3760` | long reading text (Janneke story, word-coach check lists, "hoe het verder gaat") |
| `muted-date` | `#8a85a8` | mono date on article cards |
| `hairline` | `#eae6dc` | nav bottom border; card borders (1px); column dividers in the 01-04 and 3-column rows; internal rules in cards; price-strip border |
| `hairline-ink` | `#322e63` | footer legal rule on ink |
| `chip-border` | `#d9d0f5` | region chip border; "Intake" outline button border on coach card; "Aanvullend" dashed card border (1.5px dashed) |
| `sand-line` | `#d9d3c7` | step numbers 01 to 03 on the home page; outline button border on the Janneke and Word coach heroes |
| `photo-line` | `#e2dcf2` | 1px border around hero photos |
| `photo-line-warm` | `#f5d9d0` | 1px border around the testimonial portrait |
| `avatar-stripe-a` / `avatar-stripe-b` | `#e0d8f7` / `#e8e2fa` | repeating 45° stripes of the placeholder avatar (regio-kiezer coach row) |
| `white` | `#ffffff` | cards on paper; pills on lavender; primary button text; chip default background |
| `nav-glass` | `rgba(250,248,244,0.9)` | sticky nav background with `backdrop-filter: blur(10px)` |
| `caption-glass` | `rgba(250,248,244,0.94)` | caption over the Janneke portrait, `backdrop-filter: blur(6px)` |
| `white-10` / `white-20` | `rgba(255,255,255,0.1)` / `rgba(255,255,255,0.2)` | pill background and border on ink surfaces |
| `white-40` | `rgba(255,255,255,0.4)` | outline button border on ink ("Informatie voor ouders") |
| `paper-40` | `rgba(250,248,244,0.4)` | outline button border on ink ("Kies je regio", coaches CTA) |

Suggested `@theme` names (Tailwind v4): `--color-paper`, `--color-ink`,
`--color-violet`, `--color-violet-dark`, `--color-violet-light`,
`--color-lavender`, `--color-lavender-ink`, `--color-lavender-soft`,
`--color-coral`, `--color-coral-soft`, `--color-coral-tint`, `--color-amber`,
`--color-amber-tint`, `--color-amber-ink`, `--color-muted`,
`--color-muted-read`, `--color-muted-date`, `--color-hairline`,
`--color-hairline-ink`, `--color-chip-border`, `--color-sand-line`,
`--color-photo-line`. The four tag colours for articles can be literal
utilities on the article card.

Contrast notes (PRODUCT.md asks 4.5:1 or better):

- `#4d4a6b` on `#faf8f4`: 7.6:1, fine.
- `#b9b3e8` on `#1e1b4b`: 7.9:1, fine.
- `#6d4aff` on `#faf8f4`: 4.9:1, fine for 13px bold eyebrows and links.
- `#6d4aff` on `#efebff`: 4.4:1, below 4.5. The pills on lavender use 13 to
  13.5px bold. Use `#5a38e6` (violet-dark, 5.6:1) for text on lavender, the
  visual difference is invisible.
- `#ff6b4a` on `#ffffff`: 2.9:1. The coral levels line on the coach card (13px
  semibold) fails. Use `#d84a26` for coral text on white or paper; keep
  `#ff6b4a` for dots, borders, pins and large display numbers.
- `#a97c00` on `#fff7e0`: 4.6:1, ok. `#9a6b00` on `#fff4d6`: 5.3:1, ok.
- `#8a85a8` on `#ffffff`: 3.6:1. The mono date (12.5px) fails. Use `#4d4a6b`.
- `#ffc94d` stars on paper: decoration only, not text.
- `#d9d3c7` step numbers 01 to 03: decorative, 44px, acceptable as ornament.

### 1.2 Spacing

- Container: `max-width: 1160px; margin: 0 auto`. Horizontal page padding
  `48px` on every section on desktop. Nav padding `16px 28px`.
- Section vertical paddings used (top / bottom), desktop:
  - home hero `84px 48px 72px`; other heroes `72px 48px 56px`, coaches hero
    `72px 48px 64px`, Janneke hero `64px 48px 56px`, word-coach `72px 48px 64px`,
    tarieven and artikelen hero `72px 48px 48px`.
  - first content section after a hero: `0 48px 72px` (traject), `24px 48px 64px`
    (voor-wie types, wie-zijn-wij verhaal), `8px 48px 88px` (coaches grid,
    tarieven cards, artikelen grid), `8px 48px 72px` (Janneke story).
  - home: traject `88px 48px 40px`; tweegesprekken `64px 48px`; verhalen
    `72px 48px`; coaches `24px 48px 80px`; regio `0 48px 80px`; CTA `0 48px 88px`.
  - closing CTA everywhere: `0 48px 88px`.
  - footer: full `52px 48px 34px`; compact `40px 48px 30px`.
- Grid gaps: hero two-column `56px`; card grids `22px`; 3-col panel grid
  `48px` to `52px`; regio grid `56px`; tarieven CTA `32px`; footer `32px`.
- Inner panel paddings: big panels `52px` (home coaches, regio) or `56px`
  (gesprekken, coaches CTA, collectief), price panel `48px 52px`, two-tone
  panel `52px 48px`, price cards `38px 34px`, form card `34px 34px 30px`, info
  box `24px 28px`, regio box `36px`, coach row `24px`, coach card body
  `22px 24px 24px`, article card `32px`, gesprek card `30px 34px`, keuze-type row
  `16px 20px`, situation card `36px`, KeuzeScan box `32px 34px`, word-coach
  "In het kort" `38px 40px`, tarieven CTA `40px 44px`, artikelen CTA `36px 40px`,
  testen ink card `40px`.
- Vertical rhythm inside a text column: eyebrow to heading `14px` to `16px`;
  heading to paragraph `16px` to `22px`; paragraph to paragraph `14px`;
  paragraph to buttons `26px` to `32px`; buttons to trust row `30px`; list rows
  gap `10px` to `14px`.
- Button gaps: `12px` (hero pairs), `14px` (Janneke, word coach).
- Pill gaps: `8px` (chips) or `10px` (tag pills).

### 1.3 Radii

| Radius | Used for |
|---|---|
| `99px` | every button, pill, chip, badge |
| `50%` | avatar placeholder (52px), hero badge dot (8px), confirmation circle (54px) |
| `28px` | large panels: price panel, two-tone panel, home coaches panel, gesprekken panel, KeuzeScan panel, coaches CTA, collectief panel |
| `26px` | hero photos (home, traject, voor-wie, wie-zijn-wij, Janneke), map frame, word-coach "In het kort" card, testimonial portrait |
| `24px` | price cards, situation cards (voor-wie), form cards (Janneke, word coach), regio box, testen ink card, tarieven CTA panel, word-coach "Dit krijg je / Dit vragen we" cards |
| `22px` | coach cards, article cards, artikelen CTA panel |
| `20px` | price-card inner (paper card in the ink panel), gesprek cards (traject), KeuzeScan steps box, price strip, collectief photo, home coaches photo |
| `18px` | step column hover surface (home 01-04) |
| `16px` | hero quote card, info boxes (Als er meer speelt, Werkgebied, Hoe het verder gaat), regio coach row |
| `14px` | keuze-type rows, "Daarna, thuis" box, Janneke caption |
| `12px` | inputs, selects, textareas; the coral "92%" badge; the TD icon square (44px) |

### 1.4 Shadows

| Name | Value | Used for |
|---|---|---|
| `shadow-violet` | `0 8px 24px rgba(109,74,255,0.3)` | primary violet button (hero, CTA band, tarieven) |
| `shadow-violet-strong` | `0 8px 24px rgba(109,74,255,0.35)` | violet button inside the price card and the form submit |
| `shadow-ink-card` | `0 18px 44px rgba(30,27,75,0.25)` | the featured price card (Tarieven) |
| `shadow-ink-form` | `0 18px 48px rgba(30,27,75,0.22)` | form cards (Janneke, word coach) |
| `shadow-portrait` | `0 18px 48px rgba(30,27,75,0.16)` | Janneke portrait |
| `shadow-price-inner` | `0 18px 44px rgba(0,0,0,0.22)` | paper price card inside the ink panel |
| `shadow-quote` | `0 14px 34px rgba(30,27,75,0.25)` | hero floating quote card |
| `shadow-map` | `0 14px 40px rgba(30,27,75,0.1)` | map frame (Coaches) |
| `shadow-coral` | `0 10px 26px rgba(255,107,74,0.35)` | "92% kiest goed" badge (do not build, see WARNING in 4.1) |
| `shadow-step-hover` | `0 0 0 2px #6d4aff, 0 18px 44px rgba(109,74,255,0.25)` | step column hover (home) |
| `shadow-card-hover` | `0 12px 32px rgba(30,27,75,0.1)` | article card hover |

### 1.5 Borders and rules

- Card border: `1px solid #eae6dc`.
- Strong section rule: `1.5px solid #1e1b4b` (above the 01-04 steps, above the
  3-column value rows, above the coaches filter row, above the artikelen grid,
  above "Wat je krijgt").
- Column divider between step columns: `1px solid #eae6dc` on the right of each
  column (the last one too, in the HTML).
- Outline buttons: `1.5px solid` (ink, sand-line, chip-border, white-40, paper-40).
- Dashed: `1.5px dashed #d9d0f5` (Extra coaching card).
- Accent left border: `4px solid #ffc94d` (Als er meer speelt), `3px solid #ffc94d`
  (coach-card quote).
- Underlined link: `border-bottom: 2px solid #6d4aff; padding-bottom: 2px`
  ("Alle artikelen" on home).

### 1.6 Nav height

`16px` padding top and bottom + the tallest child, the CTA pill at `13.5px`
text with `11px 18px` padding, about 40px. Nav height is about **72px**.
Sticky, `top: 0; z-index: 20`. The sticky intake form on the Janneke page uses
`top: 96px` (nav + 24px).

---

## 2. Typography

### 2.1 Families

| Role | Family | Weights used | next/font/google |
|---|---|---|---|
| Display (headings, wordmark, prices, card titles, numbers) | Bricolage Grotesque | 600, 700 | `Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], weight: ["600","700"], axes: ["opsz","wdth"]? no: use default, variable: "--font-display" })` |
| Body (everything else, inputs, buttons, chips) | Figtree | 400, 500, 600, 700 | `Figtree({ subsets: ["latin","latin-ext"], variable: "--font-body" })` |
| Labels (eyebrows, mono meta, ticker) | IBM Plex Mono | 500 | `IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono" })` |

Fallback stacks: display `'Bricolage Grotesque', ui-sans-serif, system-ui,
sans-serif`; body `'Figtree', ui-sans-serif, system-ui, sans-serif`; mono
`'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace`.

Base: `body { background: #faf8f4; font-family: Figtree; color: #1e1b4b }`,
`a { color: #1e1b4b; text-decoration: none } a:hover { color: #6d4aff }`.
Inputs, selects and textareas inherit Figtree explicitly.

WARNING (PRODUCT.md accessibility): body text must be 17px or more. The client
sets most paragraphs at 14.5px to 16.5px. Recommended: keep the client's size
hierarchy but lift the floor: hero leads 17.5px as designed, general paragraphs
`16px` minimum, card bodies `15px` minimum (cards are short), and never below
14px except mono labels and legal lines. Where the table below says "client"
it is the exact value in the HTML; "ours" is the recommended value.

### 2.2 Scale per role (desktop values from the HTML, with proposed clamp())

All headings: Bricolage Grotesque, `text-wrap: balance` on h1. Letter-spacing
is always negative on display sizes.

| Role | Client desktop | Proposed fluid value | Line-height | Letter-spacing |
|---|---|---|---|---|
| Wordmark (nav) | 700 20px | `20px` fixed (18px below 400px) | 1 | -0.02em |
| Wordmark (footer full) | 700 18px | 18px | 1 | 0 |
| Wordmark (footer compact) | 700 16px | 16px | 1 | 0 |
| Hero h1, home | 700 58px / 1.04 | `clamp(2.375rem, 1.6rem + 3.9vw, 3.625rem)` (38 to 58px) | 1.04 | -0.028em |
| Hero h1, coaches, artikelen, word coach | 700 52px / 1.06 | `clamp(2.25rem, 1.55rem + 3.4vw, 3.25rem)` (36 to 52px) | 1.06 | -0.028em |
| Page h1 (traject, voor wie, wie zijn wij, tarieven, Janneke) | 700 50px / 1.07 (Janneke 1.06) | `clamp(2.125rem, 1.5rem + 3.2vw, 3.125rem)` (34 to 50px) | 1.07 | -0.028em |
| CTA band h2, home | 700 46px / 1.06 | `clamp(2rem, 1.4rem + 3vw, 2.875rem)` (32 to 46px) | 1.06 | -0.028em |
| CTA band h2, other pages | 700 42px / 1.08 | `clamp(1.875rem, 1.35rem + 2.7vw, 2.625rem)` (30 to 42px) | 1.08 | -0.026em |
| Section h2, large (home traject) | 700 40px / 1.08 | `clamp(1.75rem, 1.3rem + 2.4vw, 2.5rem)` (28 to 40px) | 1.08 | -0.025em |
| Section h2, coaches CTA | 700 38px / 1.1 | `clamp(1.75rem, 1.3rem + 2.2vw, 2.375rem)` | 1.1 | -0.025em |
| Section h2, standard | 700 36px / 1.1 (or 1.12) | `clamp(1.625rem, 1.25rem + 2vw, 2.25rem)` (26 to 36px) | 1.1 | -0.022em (home regio -0.022em, word coach -0.025em) |
| Section h2, panel (home coaches, KeuzeScan) | 700 34px / 1.12 | `clamp(1.5rem, 1.2rem + 1.8vw, 2.125rem)` (24 to 34px) | 1.12 | -0.02em (KeuzeScan -0.022em) |
| Panel h3 (price panel, collectief) | 700 32px / 1.12 (collectief 1.15) | `clamp(1.5rem, 1.2rem + 1.6vw, 2rem)` (24 to 32px) | 1.12 | -0.02em |
| Two-tone panel h3 | 700 30px / 1.15 | `clamp(1.375rem, 1.1rem + 1.5vw, 1.875rem)` (22 to 30px) | 1.15 | -0.02em |
| Testimonial blockquote | 600 32px / 1.3 | `clamp(1.375rem, 1.05rem + 1.7vw, 2rem)` (22 to 32px) | 1.3 | -0.02em |
| Testimonial quote mark | 700 90px / 0.5, coral | `clamp(3.5rem, 2.5rem + 4vw, 5.625rem)` | 0.5 | 0 |
| Price figure (home panel) | 700 46px | `clamp(2.25rem, 1.8rem + 2.2vw, 2.875rem)` (36 to 46px) | 1 | -0.03em |
| Price figure (tarieven cards) | 700 44px | `clamp(2.25rem, 1.9rem + 1.8vw, 2.75rem)` (36 to 44px) | 1 | -0.03em |
| Price figure (price strip) | 700 34px | 34px | 1 | -0.03em |
| Step number 01-04 (home) | 700 44px | `clamp(2.25rem, 2rem + 1.2vw, 2.75rem)` | 1 | -0.03em |
| Step number 01-04 (traject cards) | 700 40px | `clamp(2rem, 1.8rem + 1vw, 2.5rem)` | 1 | -0.03em |
| Stat figure (coaches hero) | 700 28px | 28px | 1 | 0 |
| Article card title | 700 24px / 1.2 | `clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem)` | 1.2 | -0.015em |
| Tarieven CTA title | 700 24px | 24px | 1.2 | 0 |
| Situation card h3 (voor wie) | 700 23px | `clamp(1.25rem, 1.1rem + 0.6vw, 1.4375rem)` | 1.2 | 0 |
| "Altijd een happy end dus!" | 700 22px, violet | 22px | 1.2 | 0 |
| Form card title, artikelen CTA title, KeuzeScan number | 700 22px | 22px | 1.2 | 0 |
| Gesprek card title (traject) | 700 21px | 21px | 1.25 | 0 |
| Price card product name, word-coach card heading | 700 21px | 21px | 1.25 | 0 |
| Confirmation title | 700 21px | 21px | 1.2 | 0 |
| Value-column title (3-col rows) | 700 20px | 20px | 1.25 | 0 |
| Step title (home 01-04) | 600 19px | 19px | 1.3 | 0 |
| Coach card name, price card inner title | 700 19px | 19px | 1.25 | 0 |
| TD title | 700 17px | 17px | 1.3 | 0 |
| Info box title, word-coach "In het kort" item title, regio coach name | 600/700 16px | 16px | 1.3 | 0 |
| KeuzeScan step title | 600 15.5px | 15.5px | 1.3 | 0 |
| Hero quote card text | 600 14.5px / 1.4 | 14.5px | 1.4 | 0 |
| Regio box label, filter label | 600 14px | 14px | 1.3 | 0 |
| Footer column heading | 600 13px, paper | 13px | 1.3 | 0 |

Body roles (Figtree):

| Role | Client | Ours | Line-height | Colour |
|---|---|---|---|---|
| Hero lead, home | 17.5px | 17.5px | 1.62 | muted |
| Hero lead, coaches / artikelen / word coach | 17px | 17px | 1.62 | muted |
| Hero lead, traject / voor wie / wie zijn wij / tarieven | 16.5px | 17px | 1.65 | muted |
| Janneke intro | 18px | 18px | 1.6 | muted |
| Janneke long read | 16px | 17px | 1.75 | muted-read |
| Section paragraph | 15.5px | 16px | 1.65 to 1.68 | muted |
| CTA band paragraph | 16px | 16px | 1.6 | muted |
| Panel paragraph on ink | 15px | 16px | 1.62 | lavender-ink |
| Two-tone list rows, check rows, regio steps, word-coach check rows | 15px | 16px | 1.5 to 1.6 | inherits |
| Keuze-type rows | 15px | 16px | 1.5 | ink |
| Card body (step, gesprek, coach bio, price card, article card, value column, situation card) | 14.5px (coach 14px) | 15px | 1.6 to 1.62 | muted |
| Inputs | 14.5px | 16px (prevents iOS zoom) | normal | ink |
| Small (caption, TD subline, thuis text, Janneke caption, pills, trust row) | 13 to 13.5px | 13.5px | 1.5 to 1.55 | muted |
| Footer text and links | 13.5px | 14px | 1.6 | lavender-ink |
| Micro (price-card reassurance, form helper, legal line) | 12 to 12.5px | 12.5px | 1.5 | muted / lavender-ink |

Labels (IBM Plex Mono, weight 500):

| Role | Size | Transform | Letter-spacing | Colour |
|---|---|---|---|---|
| Eyebrow (above h1/h2) | 12.5px | uppercase | 0.1em | violet (coral on KeuzeScan; lavender-ink on ink) |
| Small eyebrow (inside cards: "Daarna, thuis", "Zo werkt de KeuzeScan", "In het kort", 3-col value eyebrows) | 11.5px (value eyebrows 12.5px) | uppercase | 0.08em | coral / violet / lavender-ink |
| Meta line next to an h2 ("4 stappen · ± 4 weken · online of dichtbij") | 13px | none | 0 | violet |
| Ticker | 14px | none | 0 | lavender-ink |
| Article date | 12.5px | none | 0 | muted-date (use muted) |

Buttons (Figtree):

| Variant | Size / weight | Padding |
|---|---|---|
| Nav CTA | 13.5px / 600 | 11px 18px |
| Hero primary and outline | 15px / 700 (outline 600) | 15px 28px |
| CTA band pair | 15.5px / 700 (outline 600) | 16px 32px |
| Panel button | 14.5px / 700 | 13px 24px |
| Large panel button ("Ontmoet de coaches", "Bekijk wie waar werkt", "Start met de KeuzeScan") | 15px / 700 (KeuzeScan 14.5px) | 14px 26px |
| Price card button | 14.5px / 700 | 14px 24px |
| Coach card buttons | 14px / 700 | 12px 16px |
| Form submit | 15px / 700 | 15px 24px |
| Text link with arrow | 14.5px / 600 or 700 | none |
| Region chip | 13.5px / 600 | 9px 18px |

Nav link: Figtree 13.5px, weight 500, gap 15px; active page `color: #6d4aff;
font-weight: 700`.

---

## 3. Components

Each component: exact CSS as in the HTML, then every variant, then the
responsive rule we add.

### 3.1 Logo mark

SVG, `viewBox="0 0 44 44"`:

```svg
<svg width="30" height="30" viewBox="0 0 44 44" aria-hidden="true">
  <path d="M6 36 L16 36 L16 26 L26 26 L26 16 L36 16 L36 8"
        stroke="#6d4aff" stroke-width="5" fill="none"
        stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="36" cy="8" r="4.5" fill="#ff6b4a"/>
</svg>
```

A staircase of three steps rising left to right, ending in a coral dot
("two converging step paths" in GESPREK.md, but the export draws one path).

Sizes: nav 30px; footer full 26px; footer compact 24px; CTA band 46px
(`margin-bottom: 16px`, centred). On ink the path is `#8f75ff`, the dot stays
`#ff6b4a`.

Wordmark next to it: `font: 700 20px 'Bricolage Grotesque'; letter-spacing:
-0.02em; color: #1e1b4b`, text `studiekeuze` + `<span style="color:#6d4aff">advies</span>`.
In the footer the whole word is `#faf8f4`, no violet half. Gap mark to word:
10px. The whole thing is a link to `/`.

### 3.2 Nav (site header)

```css
nav { display:flex; align-items:center; gap:18px; padding:16px 28px;
      white-space:nowrap; position:sticky; top:0; z-index:20;
      background:rgba(250,248,244,0.9); backdrop-filter:blur(10px);
      border-bottom:1px solid #eae6dc; }
.links { display:flex; gap:15px; font-size:13.5px; font-weight:500; margin-left:2px; }
.links a.active { color:#6d4aff; font-weight:700; }
.cta { margin-left:auto; background:#1e1b4b; color:#faf8f4; font-weight:600;
       font-size:13.5px; padding:11px 18px; border-radius:99px; }
.cta:hover { background:#6d4aff; }
```

Links, in order, on every page: Het traject `/studiekeuzetraject`, Voor wie
`/voor-wie`, Coaches `/studiekeuzecoaches`, Artikelen `/artikelen`, Tarieven
`/tarieven`, Over ons `/over-ons`, Word coach `/coach-worden`.

CTA label "Plan gratis intake" and target: the client points it at the
Coaches page on the home page, at `Homepage#regio` on most pages, at `#intake`
on the Janneke page. On the Word coach page the CTA reads "Meld je aan als
coach" and points at `#aanmelden`. Decision for us: the CTA goes to
`/studiekeuzecoaches` everywhere (GESPREK.md section 3: "alle intake-CTA's
linken naar de Coaches-pagina"), except on a coach profile where it goes to
`#intake` and on Word coach where it is the aanmelden variant.

Responsive (ours): below `lg` (1024px) the seven links collapse into a menu
button (44x44px touch target, label "Menu", `aria-expanded`) that opens a
full-width panel under the nav on paper with the seven links as 48px rows and
the CTA as a full-width pill at the bottom. The nav CTA stays visible beside
the menu button from `sm` up and hides below 400px (the menu panel carries
it). The logo shrinks to 26px and the wordmark to 18px below 400px. Never
`white-space: nowrap` on the whole bar.

### 3.3 Footer

Two variants in the export.

**Full footer (home page only):**

```css
footer { background:#1e1b4b; color:#b9b3e8; padding:52px 48px 34px; margin-top:auto; }
.grid { max-width:1160px; margin:0 auto; display:grid;
        grid-template-columns:2fr 1fr 1fr 1fr; gap:32px; }
.brand p { font-size:13.5px; line-height:1.6; margin:14px 0 0; max-width:300px; }
.col { display:flex; flex-direction:column; gap:10px; font-size:13.5px; }
.col h { font:600 13px 'Bricolage Grotesque'; color:#faf8f4; margin-bottom:4px; }
.col a { color:#b9b3e8; }
.legal { max-width:1160px; margin:34px auto 0; border-top:1px solid #322e63;
         padding-top:20px; font-size:12px; display:flex; justify-content:space-between; }
```

Copy: brand column: logo (26px, `#8f75ff` path) + "studiekeuzeadvies" (700
18px, paper); paragraph "Wij geven scholieren, studenten en hun ouders het
vertrouwen om de juiste studiekeuze te maken."
Column "Aanbod": Het studiekeuzetraject `/studiekeuzetraject`, Keuzecheck
herstarters `/voor-wie`, Extra ondersteuning `/voor-wie`, Tarieven `/tarieven`.
Column "Voor wie": Scholieren, Studenten, Ouders, Decanen (all `/voor-wie`).
Column "Contact": Contactformulier (client: Janneke's `#intake`), Locaties
(client: Coaches `#kaart`).
Legal line: "© 2026 StudiekeuzeAdvies" left, "Algemene voorwaarden · Privacy"
right.

WARNING: "Decanen" links to a page that has no decanen section; either drop
the link or point it at `/voor-wie` and accept it. "Contactformulier" must not
point at one coach's form for the whole site (decision 2026-08-15: no central
contact point): point it at `/studiekeuzecoaches` with the label "Kies je
coach", or at `/locaties`. "Locaties" points at `/locaties`. "Algemene
voorwaarden" and "Privacy" have no pages: render them only when the pages
exist (report as newRoutes if built).

Recommended for us: use the full footer on EVERY page (one footer, not two;
the compact one was the client saving effort). Add a fifth "Meer" column or
fold into "Contact": Veelgestelde vragen `/veelgestelde-vragen`, Ervaringen
`/ervaringen`, Locaties `/locaties`, Word coach `/coach-worden`. Add the city
links from `citiesWithCoach` under "Locaties" (the current footer does this).

**Compact footer (all other client pages):** `padding:40px 48px 30px`, one flex
row `justify-content:space-between; align-items:center; gap:24px; flex-wrap:wrap`:
logo 24px + wordmark 700 16px paper; link row `gap:22px; font-size:13.5px`
(Home, Coaches, Artikelen, Word coach; varies per page: tarieven adds Voor wie,
coaches shows Home Tarieven Word coach); "© 2026 StudiekeuzeAdvies" 12px.

Responsive: grid `1fr` below `sm`, `1fr 1fr` from `sm`, `2fr 1fr 1fr 1fr` from
`lg`. Legal line wraps to two lines below `sm` (`flex-wrap:wrap; gap:8px`).
Links as 44px-high rows on touch.

### 3.4 Buttons

All: `border-radius:99px; font-family:Figtree; text-decoration:none;
display:inline-block; text-align:center; white-space:normal` (ours: allow
wrapping; the client's 390px pills become vertical ovals because they wrap
one word per line inside a fixed flex row; fix by making the button row
`flex-wrap:wrap` and letting buttons take `width:100%` below 400px).

| Variant | CSS |
|---|---|
| `violet` (primary) | `background:#6d4aff; color:#fff; font-weight:700; box-shadow:0 8px 24px rgba(109,74,255,0.3)`; hover `background:#5a38e6` |
| `violet` no shadow | same without shadow (panel buttons: "Plan gratis intake bij deze coach", "Bekijk wie waar werkt", "Kies je regio" on artikelen, coach-card "Maak kennis met") |
| `indigo` | `background:#1e1b4b; color:#faf8f4` (or `#fff`); `font-weight:600` in nav, `700` elsewhere; hover `background:#6d4aff` |
| `outline-ink` | `border:1.5px solid #1e1b4b; color:#1e1b4b; font-weight:600` (700 on tarieven cards) |
| `outline-sand` | `border:1.5px solid #d9d3c7; font-weight:600` (Janneke "Zo werkt het traject", word coach "Bekijk onze methode") |
| `outline-chip` | `border:1.5px solid #d9d0f5; color:#6d4aff; font-weight:700` (coach card "Intake") |
| `outline-on-ink` | `border:1.5px solid rgba(255,255,255,0.4); color:#fff; font-weight:600` (voor ouders panel) or `rgba(250,248,244,0.4); color:#faf8f4` (coaches CTA) |
| `white-on-violet` | `background:#fff; color:#6d4aff; font-weight:700` (voor jou panel) |
| `text-link` | `color:#6d4aff; font-weight:600/700; font-size:14.5px`, trailing ` →` |
| `text-link-underlined` | `color:#6d4aff; font-weight:700; border-bottom:2px solid #6d4aff; padding-bottom:2px` |
| `text-link-muted` | `color:#4d4a6b; font-weight:600`, trailing ` →` |

Sizes: see the button table in 2.2. Minimum touch height 44px: the nav CTA
(about 40px) gets `min-height:44px` on touch devices; all others already
clear 44px.

Focus: `outline:3px solid #1e1b4b; outline-offset:3px` on paper; on ink
surfaces `outline-color:#faf8f4` (keep the current globals.css rule).

### 3.5 Eyebrow label

```css
.eyebrow { font:500 12.5px 'IBM Plex Mono', monospace; text-transform:uppercase;
           letter-spacing:0.1em; color:#6d4aff; margin-bottom:14px; } /* 16px above h1 */
.eyebrow-small { font-size:11.5px; letter-spacing:0.08em; margin-bottom:6px; }
```

Colour variants: violet (default), coral (`#ff6b4a`: "Liever een korte
verkenning?", "Daarna, thuis"), lavender-ink (`#b9b3e8`, on ink: "En wat kost
dat?", "Voor ouders", "In het kort"), lavender-soft (`#cfc2ff`, on violet:
"Voor jou").

Meta line variant (next to an h2, right-aligned in a flex row with
`justify-content:space-between; align-items:end; gap:24px; flex-wrap:wrap`):
`font:500 13px 'IBM Plex Mono'; color:#6d4aff; text-transform:none`.

### 3.6 Pills and tags

| Variant | CSS |
|---|---|
| `pill-lavender` | `background:#efebff; color:#6d4aff; font-size:13.5px; font-weight:700; padding:8px 18px; border-radius:99px` ("✓ Incl. persoonlijkheidstest") |
| `pill-lavender-small` | `font-size:13px; padding:7px 16px` (Janneke tags, word-coach free regions) |
| `pill-white` | `background:#fff; color:#6d4aff; font-size:13px; font-weight:600; padding:8px 16px` (on lavender panel: "Niet oordelen, wél doorvragen") |
| `pill-white-bold` | `background:#fff; color:#6d4aff; font-size:13.5px; font-weight:700; padding:8px 18px` (on lavender gesprekken panel) |
| `pill-glass` | `background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); font-size:12.5px (13px on collectief); font-weight:600; padding:6px 14px (8px 16px)` on ink |
| `pill-coral` | `background:#fff1ec; color:#ff6b4a` (use `#d84a26` for contrast) |
| `pill-amber` | `background:#fff7e0; color:#a97c00` |
| `tag-city` | `background:#efebff; color:#6d4aff; font-size:12px; font-weight:700; padding:4px 12px; white-space:nowrap` (coach card) |
| `tag-article` | `font-size:12px; font-weight:700; padding:4px 12px` with bg/fg pairs: Aanmelden `#efebff/#6d4aff`, Regelingen `#ffe9e2/#d84a26`, Open dagen `#fff4d6/#9a6b00`, Keuzeproces `#efebff/#6d4aff` |
| `hero-badge` | `display:inline-flex; align-items:center; gap:8px; background:#efebff; border-radius:99px; padding:8px 18px; font-size:13.5px; font-weight:600; color:#6d4aff; margin-bottom:26px` with an 8px coral dot |

Pills wrap: container `display:flex; gap:10px; flex-wrap:wrap`.

### 3.7 Check list rows

```css
.row { display:flex; gap:12px; }      /* 10px on tarieven cards */
.row .mark { font-weight:700; }       /* the ✓ or → or 1. */
.list { display:flex; flex-direction:column; gap:10px; font-size:14.5px; }
```

Mark colours: `✓` amber (`#ffc94d`) on ink; `✓` violet on paper/white; `→`
amber on the violet panel, coral on the ink panel; `1.` `2.` `3.` violet bold
(regio steps, `font-size:15px`); coral `✓` in "Dit vragen we".
Use a real list (`ul`/`ol`) with the mark as `aria-hidden` span.

Keuze-type row (voor wie): `background:#fff; border:1px solid #eae6dc;
border-radius:14px; padding:16px 20px; display:flex; gap:14px;
align-items:center; font-size:15px; line-height:1.5`, violet bold `✓`.
Grid `1fr 1fr; gap:12px`, one column below `md`.

### 3.8 Price cards (Tarieven, three variants)

Grid: `repeat(3, 1fr); gap:22px; align-items:stretch`. One column below `md`,
three from `lg`; between `md` and `lg` two columns with the featured card
first and full width? No: keep one column below `lg` so the featured card
stays in the middle order (scan, traject, extra) as the client ordered it.
Cards: `display:flex; flex-direction:column; gap:14px; padding:38px 34px;
border-radius:24px`; the check list has `flex:1` so the button sits at the
bottom.

1. **Studiekeuzescan (paper card):** `background:#fff; border:1px solid #eae6dc`.
   Name 700 21px; `€ 249` 700 44px -0.03em + ` eenmalig` 14px muted; body
   14.5px muted; checks violet; button `outline-ink` 700 14.5px `14px 24px`
   "Start met de scan".
2. **Studiekeuzetraject (featured, ink card):** `background:#1e1b4b;
   color:#faf8f4; position:relative; box-shadow:0 18px 44px rgba(30,27,75,0.25)`.
   Badge "Meest gekozen": `position:absolute; top:-14px; left:50%;
   transform:translateX(-50%); background:#ffc94d; color:#1e1b4b; font:700
   12.5px Figtree; padding:6px 16px; border-radius:99px; white-space:nowrap`.
   `€ 649` + ` compleet traject` (lavender-ink); body lavender-ink; checks
   amber; button `violet` (no shadow) "Plan gratis intake bij een coach".
3. **Extra coaching (dashed card):** `background:#fff; border:1.5px dashed
   #d9d0f5; position:relative`. Badge "Aanvullend": same geometry, `background:
   #efebff; color:#6d4aff`. `€ 89` + ` per gesprek`; checks violet; button
   `outline-ink` "Bij te boeken na scan of traject" (it is not a real action;
   ours: render it as a non-link pill or point it at `/studiekeuzecoaches`).

Price figure row: `display:flex; align-items:baseline; gap:10px` (home) or
inline spans (tarieven). Format: `€ 249` with a normal space after the euro
sign, as the client writes it.

### 3.9 Indigo price panel (home)

```css
.panel { margin-top:52px; background:#1e1b4b; color:#faf8f4; border-radius:28px;
         padding:48px 52px; display:grid; grid-template-columns:1.15fr 1fr;
         gap:52px; align-items:center; }
.panel .eyebrow { color:#b9b3e8; margin-bottom:14px; }
.panel h3 { font:700 32px/1.12 'Bricolage Grotesque'; letter-spacing:-0.02em; }
.panel p { font-size:15px; line-height:1.62; color:#b9b3e8; margin:14px 0 0; max-width:400px; }
.panel .list { gap:10px; margin-top:22px; font-size:14.5px; }  /* amber ✓ */
.card { background:#faf8f4; color:#1e1b4b; border-radius:20px; padding:34px 36px;
        box-shadow:0 18px 44px rgba(0,0,0,0.22); }
.card .name { font:700 19px 'Bricolage Grotesque'; }
.card .price { display:flex; align-items:baseline; gap:10px; margin-top:12px; }
.card .price b { font:700 46px 'Bricolage Grotesque'; letter-spacing:-0.03em; }
.card .price span { font-size:14px; color:#4d4a6b; }
.card a.violet { display:block; text-align:center; margin-top:20px; padding:15px 24px;
                 font-size:15px; box-shadow:0 8px 24px rgba(109,74,255,0.35); }
.card .reassure { font-size:12.5px; color:#4d4a6b; text-align:center; margin-top:10px; }
.card .scan { border-top:1px solid #eae6dc; margin-top:18px; padding-top:16px;
              font-size:13.5px; line-height:1.55; color:#4d4a6b; }
.card .scan a { color:#6d4aff; font-weight:700; }
```

Responsive: one column below `lg`; padding `28px 22px` below `sm`; the card
keeps its shadow; price 36px below `sm`.

### 3.10 Two-tone "Voor jou / Voor ouders" panel (home)

```css
.duo { display:grid; grid-template-columns:1fr 1fr; border-radius:28px; overflow:hidden; }
.jou    { background:#6d4aff; color:#fff; padding:52px 48px; }
.ouders { background:#1e1b4b; color:#fff; padding:52px 48px; }
.duo .eyebrow { margin-bottom:16px; }      /* #cfc2ff on violet, #b9b3e8 on ink */
.duo h3 { font:700 30px/1.15 'Bricolage Grotesque'; letter-spacing:-0.02em; }
.duo .list { gap:12px; margin-top:24px; font-size:15px; line-height:1.5; }  /* → marks */
.duo a { display:inline-block; margin-top:28px; padding:13px 24px; font-size:14.5px; }
```

Left button `white-on-violet` "Zo werkt het voor jou" `/studiekeuzetraject`;
right button `outline-on-ink` "Informatie voor ouders" `/voor-wie`.
Responsive: stack to one column below `md`; padding `36px 24px` below `sm`;
radius stays 28px on the outer (overflow hidden clips both halves).

### 3.11 Step columns 01-04 (home)

```css
.steps { display:grid; grid-template-columns:repeat(4,1fr); gap:0; margin-top:48px;
         border-top:1.5px solid #1e1b4b; padding-top:22px; }
.step { padding:28px 26px 24px 0; padding-left:26px; /* 0 on the first */
        border-right:1px solid #eae6dc; border-radius:18px;
        transition:background .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ..., transform .35s ...; }
.step:hover { background:#fff; box-shadow:0 0 0 2px #6d4aff, 0 18px 44px rgba(109,74,255,0.25);
              transform:translateY(-6px); padding-left:26px; padding-right:26px; }
.step .nr { font:700 44px 'Bricolage Grotesque'; letter-spacing:-0.03em; color:#d9d3c7; } /* 04: #6d4aff */
.step .title { font:600 19px 'Bricolage Grotesque'; margin-top:10px; }
.step p { font-size:14.5px; line-height:1.6; color:#4d4a6b; margin:10px 0 0; }
```

WARNING: the hover changes padding (layout). Ours: animate only transform and
box-shadow; keep padding constant (`padding:28px 26px 24px`, and pull the
first column with `margin-left:-26px` on desktop if the flush left edge
matters). Skip the hover entirely under `prefers-reduced-motion` and on
touch (`@media (hover:hover)`).

Responsive: `1fr` below `sm`, `1fr 1fr` from `sm`, `repeat(4,1fr)` from `lg`.
Dividers: right border only when a column is not last in its row; simplest:
drop vertical dividers below `lg` and use a `border-top:1px solid #eae6dc` per
step instead.

The same pattern with 3 columns (`repeat(3,1fr)`, `padding:28px 26px 8px 0`,
eyebrow 12.5px mono + title 700 20px + body) is the "Waarom
StudiekeuzeAdvies" row (traject) and the "Passie / Missie / Belofte" row (wie
zijn wij). No hover on those.

### 3.12 Gesprek cards 01-04 (traject page)

Inside the lavender panel (`background:#efebff; border-radius:28px; padding:56px`):

```css
.gesprek { background:#fff; border-radius:20px; padding:30px 34px;
           display:grid; grid-template-columns:80px 1.2fr 1fr; gap:28px; align-items:start; }
.gesprek .nr { font:700 40px 'Bricolage Grotesque'; letter-spacing:-0.03em; color:#6d4aff; } /* 04: #ff6b4a */
.gesprek .title { font:700 21px 'Bricolage Grotesque'; }
.gesprek p { font-size:14.5px; line-height:1.62; color:#4d4a6b; margin:8px 0 0; }
.thuis { background:#faf8f4; border-radius:14px; padding:18px 20px; }
.thuis .eyebrow-small { color:#ff6b4a; margin-bottom:6px; }  /* "Daarna, thuis" */
.thuis div { font-size:13.5px; line-height:1.55; color:#4d4a6b; }
```

List gap 16px, `margin-top:36px`. Card 04 has no "thuis" box (empty third
column). Responsive: `grid-template-columns:56px 1fr` below `md` with the
thuis box spanning the full width under the text (`grid-column:1 / -1`);
one column below `sm` with the number above the title. Panel padding `24px
16px` below `sm`.

### 3.13 Testimonial block (home)

```css
.quote-grid { display:grid; grid-template-columns:1fr 1.5fr; gap:56px; align-items:center; }
img { width:100%; aspect-ratio:4/4.6; object-fit:cover; border-radius:26px; border:1px solid #f5d9d0; }
.mark { font:700 90px/0.5 'Bricolage Grotesque'; color:#ff6b4a; }
blockquote { font:600 32px/1.3 'Bricolage Grotesque'; letter-spacing:-0.02em; margin:18px 0 0; }
.who { margin-top:24px; font-size:14.5px; color:#4d4a6b; }   /* <strong>Moya (22)</strong>, ... */
.links { display:flex; gap:24px; margin-top:28px; }
```

WARNING: the portrait is a stock photo. Do not use. Render the quote without
a portrait: one column, the quote mark above, `max-width:640px`, or use the
repo's `public/images/hero-gesprek.jpg` only if a picture is wanted (it is a
scene, allowed). The quote text and "Moya (22)" are the client's copy and may
be used (legacyQuotes in `app/site-config.ts` holds Moya's real archive quote
and date, "traject afgerond in maart 2024"; prefer adding the date).

### 3.14 CTA band with logo mark (closing section)

```css
section { padding:0 48px 88px; }
.band { max-width:1160px; margin:0 auto; text-align:center; }
.band svg { width:46px; height:46px; margin-bottom:16px; }          /* home only */
.band h2 { font:700 46px/1.06 'Bricolage Grotesque'; letter-spacing:-0.028em; } /* 42px/1.08, -0.026em elsewhere */
.band h2 span { color:#6d4aff; }                                    /* second line */
.band p { font-size:16px; color:#4d4a6b; margin:16px auto 0; max-width:460px; } /* 14px top, 480px elsewhere */
.band .buttons { display:flex; gap:12px; justify-content:center; margin-top:30px; } /* 28px elsewhere */
```

Buttons: `violet` with shadow + `outline-ink`, both `16px 32px`, 15.5px.
Responsive: buttons `flex-wrap:wrap`, full-width stacked below 400px.

Ink variant (Coaches page): `background:#1e1b4b; border-radius:28px;
padding:56px; text-align:center; color:#faf8f4`; h2 700 38px/1.1 -0.025em;
p 15.5px lavender-ink max-width 460px margin-top 14px; buttons margin-top
26px, `violet` (no shadow, `15px 30px`) + `outline-on-ink` (paper-40).

Lavender strip variants: Tarieven (`background:#efebff; border-radius:24px;
padding:40px 44px; grid 1.4fr 1fr; gap:32px; align-items:center`; title 700
24px; p 15px/1.62 muted margin-top 10px; button right-aligned `violet` with
shadow 15.5px `16px 32px`) and Artikelen (`border-radius:22px; padding:36px
40px; display:flex; justify-content:space-between; align-items:center; gap:24px;
flex-wrap:wrap`; title 700 22px; line 14.5px muted margin-top 4px; button
`violet` 15px `14px 28px`). Responsive: one column, button full width below
`sm`.

### 3.15 Regio-kiezer (home) and region filter (Coaches)

Chip:

```css
button.chip { border:1px solid #d9d0f5; cursor:pointer; font:600 13.5px Figtree;
              padding:9px 18px; border-radius:99px; background:#fff; color:#1e1b4b; }
button.chip[aria-pressed="true"] { background:#1e1b4b; color:#faf8f4; }
.chips { display:flex; flex-wrap:wrap; gap:8px; }
```

Chips are about 37px high; ours: `min-height:44px` via `padding:12px 18px`
or a transparent tap area.

**Regio box (home):** `background:#efebff; border-radius:24px; padding:36px`;
label "Waar wil je begeleiding?" 600 14px Bricolage, margin-bottom 14px; chips;
coach row `background:#fff; border-radius:16px; padding:24px; margin-top:20px;
display:flex; gap:16px; align-items:center` with a 52px round avatar
(`repeating-linear-gradient(45deg,#e0d8f7 0 6px,#e8e2fa 6px 12px)`), name 600
16px Bricolage, spec 13.5px/1.5 muted margin-top 3px; button `violet` (no
shadow) 14.5px `13px 24px` margin-top 18px "Plan gratis intake bij deze coach".

Ours: chips come from `citiesWithCoach` in `app/cities.ts` (Amsterdam,
Utrecht, Amersfoort) plus "Online"; the coach row shows the real coach of the
selected city (`coach.name`, first sentence of `coach.intro`, and the real
portrait for Janneke, the striped placeholder for a stand-in); the button
links to `/studiekeuzecoaches/<slug>` or `/studiekeuzecoaches#<slug>`. "Online"
shows a neutral row ("Het volledige traject via video, waar je ook woont")
and links to `/studiekeuzecoaches`. WARNING: the client lists Rotterdam,
Eindhoven and Zwolle and invents "Coach in Rotterdam" etc.; do not print
cities without a coach.

**Filter row (Coaches):** `display:flex; align-items:center; gap:8px;
flex-wrap:wrap; border-top:1.5px solid #1e1b4b; padding-top:28px`; label
"Filter op regio:" 600 14px Bricolage `margin-right:8px`; chips "Alle" +
cities. Ours: "Alle" + `citiesWithCoach` names. Use `role="group"
aria-label="Filter op regio"` and `aria-pressed`.

### 3.16 Coach card (Coaches)

```css
.card { background:#fff; border:1px solid #eae6dc; border-radius:22px; overflow:hidden;
        display:flex; flex-direction:column; }
.card img { width:100%; aspect-ratio:4/3; object-fit:cover; display:block; }
.body { padding:22px 24px 24px; display:flex; flex-direction:column; gap:8px; flex:1; }
.head { display:flex; justify-content:space-between; align-items:center; gap:10px; }
.name { font:700 19px 'Bricolage Grotesque'; }
.city { /* tag-city */ }
.levels { font-size:13px; font-weight:600; color:#ff6b4a; }   /* ours: #d84a26 */
.bio { font-size:14px; line-height:1.6; color:#4d4a6b; margin:0; flex:1; }
.quote { font-size:13.5px; font-style:italic; color:#4d4a6b; border-left:3px solid #ffc94d;
         padding-left:12px; margin-top:4px; }
.actions { display:flex; gap:10px; margin-top:12px; }
.actions .primary { flex:1; background:#6d4aff; color:#fff; font-weight:700; font-size:14px;
                    padding:12px 16px; border-radius:99px; text-align:center; }   /* hover #5a38e6 */
.actions .intake { border:1.5px solid #d9d0f5; color:#6d4aff; font-weight:700; font-size:14px;
                   padding:12px 16px; border-radius:99px; white-space:nowrap; }
```

Grid `repeat(3,1fr); gap:22px; margin-top:32px`. Responsive: `1fr` below
`sm`, `1fr 1fr` from `sm`, three from `lg`.

Ours: cards come from `app/coaches.ts`. Portrait only for `isPlaceholder:
false` (Janneke's real photo, cropped 4:5 per decision 2026-08-05, so use
`aspect-ratio:4/5` on the card image, or 4/3 with `object-position:top`); a
stand-in gets no photo (card starts at the body). Levels line: from the coach
data if it exists, else omit. Quote: only if the coach wrote one; do not
invent. Buttons: "Maak kennis met {name}" to `/studiekeuzecoaches/{slug}`,
"Intake" to `/studiekeuzecoaches/{slug}#intake`. WARNING: all seven client
names (Sanne de Vries, Mark Jansen, Fatima el Amrani, Jeroen Bakker, Lisa
Vermeer, Tom Visser, Nadia Groen), their bios, quotes and Unsplash photos are
invented. Never print them.

### 3.17 Coach profile with sticky intake form (Coach Janneke)

Hero: back link "← Alle coaches" 600 13.5px violet; grid `1fr 400px; gap:56px;
align-items:start; margin-top:24px`. Left: eyebrow, h1 700 50px/1.06, intro
18px/1.6 muted max-width 560px margin-top 18px, pills (lavender / coral-tint /
amber-tint, 13px 700 `7px 16px`, margin-top 24px), buttons (`violet` with
shadow "Plan gratis intake bij Janneke" `#intake` + `outline-sand` "Zo werkt
het traject" `/studiekeuzetraject`, gap 14px, margin-top 30px). Right:
portrait `aspect-ratio:4/5; border-radius:26px; box-shadow:0 18px 48px
rgba(30,27,75,0.16)` with a caption `position:absolute; left:20px; bottom:20px;
background:rgba(250,248,244,0.94); backdrop-filter:blur(6px); border-radius:14px;
padding:12px 18px; font-size:13.5px; font-weight:600`.

Story: grid `1fr 400px; gap:56px; align-items:start`. Left column `font-size:
16px; line-height:1.75; color:#3a3760; display:flex; flex-direction:column;
gap:18px`. Two info boxes: amber-accented (`background:#fff; border:1px solid
#eae6dc; border-left:4px solid #ffc94d; border-radius:16px; padding:24px 28px`;
title 700 16px Bricolage margin-bottom 8px; p 15px/1.7) and lavender
(`background:#efebff; border-radius:16px; padding:24px 28px`). A violet
sub-heading 700 22px.

Right column: `position:sticky; top:96px`; form card (3.19).

Responsive: one column below `lg` (portrait first at `max-width:340px` as the
roster does, or after the hero text); form not sticky below `lg`, placed
directly after the hero and before the story (the reader came for the form),
with a "Plan gratis intake" anchor button in the hero. Caption becomes static
below the photo if the photo is narrower than 300px.

Ours: the coach comes from `app/coaches.ts` by slug; Janneke is the only one
that may be live. Decision 2026-08-05 says coach texts are third person and
first name only; the client's page is first person and uses the surname. The
client's feedback of 2026-08-12 supplied this first-person text and the
surname, so this page uses the client's copy as written (see section 8, open
question 2). Pills: "Amsterdam + online", "Psycholoog", and "10 jaar bij
StudiekeuzeAdvies" (true of Janneke per her own text).

### 3.18 Article card (Artikelen)

```css
a.card { background:#fff; border:1px solid #eae6dc; border-radius:22px; padding:32px;
         display:flex; flex-direction:column; gap:12px; }
a.card:hover { box-shadow:0 12px 32px rgba(30,27,75,0.1); }
.head { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.date { font:500 12.5px 'IBM Plex Mono'; color:#8a85a8; }      /* ours: #4d4a6b */
.title { font:700 24px/1.2 'Bricolage Grotesque'; letter-spacing:-0.015em; }
.body { font-size:14.5px; line-height:1.6; color:#4d4a6b; flex:1; }
.more { font-weight:700; font-size:14px; color:#6d4aff; }          /* "Lees artikel →" */
```

Grid `repeat(2,1fr); gap:22px; border-top:1.5px solid #1e1b4b; padding-top:32px`.
One column below `md`. Ours: the card body is `article.description` from
`app/articles.ts`, the date is `formatDate(article.published)`, the tag is a
category if `app/articles.ts` has one, otherwise omit the tag and keep the
date. Link to `/${slug}`. The hover animates box-shadow; acceptable, or use
`transform:translateY(-2px)` under `@media (hover:hover)`.

### 3.19 Form card, fields, validation, confirmation

Card: `background:#1e1b4b; color:#faf8f4; border-radius:24px; padding:34px 34px
30px; box-shadow:0 18px 48px rgba(30,27,75,0.22)`. Title 700 22px Bricolage;
sub 13.5px/1.6 lavender-ink margin-top 8px; fields column `gap:12px;
margin-top:20px`.

```css
input, select, textarea { background:#faf8f4; border:none; border-radius:12px;
  padding:13px 16px; font-size:14.5px; color:#1e1b4b; width:100%; box-sizing:border-box;
  font-family:Figtree; }
textarea { resize:vertical; }          /* rows=3 (Janneke), rows=4 (word coach) */
.error { font-size:13px; color:#ffb3a0; }
button { background:#6d4aff; color:#fff; border:none; cursor:pointer; font:700 15px Figtree;
         padding:15px 24px; border-radius:99px; box-shadow:0 8px 24px rgba(109,74,255,0.35); }
button:hover { background:#5a38e6; }
.helper { font-size:12px; color:#b9b3e8; text-align:center; }
```

Confirmation state (replaces the whole card content): `text-align:center;
padding:18px 0`; circle 54px `background:#6d4aff; border-radius:50%` with a
24px white `✓`; title 700 21px margin-top 16px; p 14px/1.6 lavender-ink
margin-top 10px.

The client uses placeholders as labels. Ours: visible labels above each
field (13px, 600, lavender-ink on ink) and the client's placeholder text kept
as placeholder; `aria-invalid` and an error line per field; inputs 16px so
iOS does not zoom; `min-height:48px`. Error colour `#ffb3a0` on ink is 8.9:1,
fine. Use the existing server action `requestIntake` (`app/actions.ts`) and
`IntakeForm` semantics (hidden `voor` route field); the visual is this card.
The confirmation copy comes from the server action's `message`, or the
client's text below.

Field sets:

Janneke intake: Naam; E-mailadres (type email); select "Voor wie is de
intake?" (Voor mijzelf (studiekiezer) / Voor mijn kind (ik ben ouder)); select
"Voorkeur: online of in Amsterdam?" (Online / In Amsterdam / Geen voorkeur);
textarea "Waar loop je tegenaan? (optioneel)". Submit "Vraag gratis intake
aan". Helper "Janneke neemt binnen twee werkdagen contact op." Error "Vul je
naam en een geldig e-mailadres in." Confirmation title "Aanvraag verstuurd!",
text "Bedankt {naam}. Janneke neemt binnen twee werkdagen contact met je op om
de intake in te plannen."

WARNING: "binnen twee werkdagen" is a promise only Janneke can make; keep it
on her page only if she confirmed it (open question 3). The current
IntakeForm deliberately makes no time promise.

Word coach aanmelden: Naam; E-mailadres; Gewenste stad of regio; select "Je
achtergrond" (Coach / loopbaanbegeleider; Decaan / mentor in het onderwijs;
Psycholoog / orthopedagoog; Anders); textarea "Vertel kort iets over jezelf en
je ervaring" (rows 4). Submit "Verstuur aanmelding". Helper "We reageren
binnen een week." Error "Vul je naam, e-mailadres en gewenste regio in."
Confirmation "Aanmelding verstuurd!", "Bedankt {naam}. We nemen binnen een
week contact op voor een kennismakingsgesprek."

WARNING: there is no inbox for coach applications (`coachRecruitmentInbox`
is null in `app/site-config.ts`, issues #20 and #44). The form must post to a
real destination before it goes live; until then render the card with the
fields disabled and a line "Het aanmeldformulier volgt; mail ons via ..." is
NOT possible either (no mailbox). Build the form against a new server action
that needs an inbox from the client; report in sharedNeeds.

### 3.20 Badges

- "Meest gekozen": amber pill on the featured price card (3.8).
- "Aanvullend": lavender pill on the dashed card (3.8).
- "92% kiest goed": `position:absolute; top:26px; right:-18px; background:
  #ff6b4a; color:#fff; border-radius:12px; padding:10px 16px; font:700 13.5px
  'Bricolage Grotesque'; box-shadow:0 10px 26px rgba(255,107,74,0.35);
  transform:rotate(3deg)`. WARNING: unproven number. Do not build. If a
  floating badge is wanted on the hero photo, fill it with "Gratis intake"
  (true).
- Hero quote card (home): `position:absolute; left:-26px; bottom:34px;
  background:#1e1b4b; color:#faf8f4; border-radius:16px; padding:16px 20px;
  max-width:250px; box-shadow:0 14px 34px rgba(30,27,75,0.25)`; quote 600
  14.5px/1.4 Bricolage; name 12px opacity 0.7 margin-top 5px. Copy:
  `"Eindelijk weet ik wat ik wil, en waarom."` / `Ger (18), traject afgerond`.
  WARNING: Ger's real archive quote (site-config legacyQuotes) reads
  differently; this one-liner is the client's paraphrase. Use the client's
  line (the client owns the rights and wrote it), but add the date "november
  2023" which is provable, or use the first sentence of Ger's real quote.

### 3.21 Ticker strip (home)

```css
.ticker { background:#1e1b4b; overflow:hidden; padding:14px 0; }
.track { display:flex; width:max-content; animation:ska-ticker 36s linear infinite; }
.item { display:inline-flex; align-items:center; gap:20px; padding:0 20px;
        font:500 14px 'IBM Plex Mono'; color:#b9b3e8; white-space:nowrap; }
.item .sep { color:#ff6b4a; }   /* ✦ */
@keyframes ska-ticker { from { transform:translateX(0) } to { transform:translateX(-50%) } }
```

The list is printed twice so `-50%` loops seamlessly. Items (client): "8,8
gemiddelde beoordeling", "92% studeert met plezier door", "35+ locaties in
Nederland", "MBO · HBO · WO", "Gratis intake", "Ook bij ADD, ADHD of autisme",
"Alle gesprekken 1-op-1".

WARNING: drop the first three. Ours: "Gratis intake", "MBO · HBO · WO", "Alle
gesprekken 1-op-1", "Ook bij ADD, ADHD of autisme", "Online of op locatie",
"Eén vaste coach", "{n} steden en online" where n is `citiesWithCoach.length`
(3 today). Under `prefers-reduced-motion` the strip does not move: render the
items once, wrapping, centred. PRODUCT.md ("no counters") tolerates a slow
ticker of true statements; keep 36s, and pause on hover/focus.

### 3.22 Scroll reveal (`.ska-reveal`)

```css
@keyframes ska-rise { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
.ska-reveal { opacity:0; }
.ska-reveal.on { animation:ska-rise 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
```

Applied to: h2s, step columns, panels, images, CTA band, coach cards (with
`on` preset), gesprek cards (preset). Ours: a `Reveal` client component
(Foundation owns `app/components/reveal`) that sets `on` via an
IntersectionObserver with `threshold:0.1` (home uses 0.15), `rootMargin:
"0px 0px -10% 0px"`, unobserve after first hit. Without JS or under
`prefers-reduced-motion` the element is visible (start with `opacity:1` and
only add the hidden state when JS runs, so nothing is ever invisible).
Transform and opacity only.

### 3.23 Hero background lines (three.js in the client; redo in SVG or canvas)

The client renders, behind the home hero (absolutely positioned, `inset:0;
pointer-events:none; z-index:0`), with a transparent WebGL canvas:

- Camera: perspective, fov 50, `z = 12`. Visible half-height at z=0 is
  `tan(25°) * 12 = 5.6` world units, visible half-width is `5.6 * aspect`. So
  the world maps to the hero box: y from -5.6 (bottom) to +5.6 (top).
- **7 horizontal sine lines**, at `y0 = -4.5 + i * 1.5` for i = 0..6 (so
  -4.5, -3, -1.5, 0, 1.5, 3, 4.5), each spanning the full width with 61
  points, drawn at depth z = -2 (slightly smaller than the front plane).
  Colours cycle `#6d4aff, #ff6b4a, #ffc94d` (i % 3). Opacity **0.16**.
  Line width 1px (WebGL line). Each line's y at position x is
  `y0 + sin(x * 0.45 + t * f + ph) * amp`, with `amp = 0.5 + (i % 3) * 0.3`
  (0.5, 0.8, 1.1 world units, about 4.5%, 7%, 10% of the hero height),
  `f = 0.25 + (i % 4) * 0.1` (0.25 to 0.55 rad/s, so one full wave every 11
  to 25 s), phase `ph = i * 1.1`. Wavelength `2π / 0.45 = 14` world units,
  about 1.25 screen widths at 16:9.
- **14 dots**: spheres of radius `0.07 + random * 0.06` (about 0.6% to 1.2%
  of the hero height, 5 to 10px at 900px), colours cycling the same three,
  opacity **0.5**, at z = -1.5. Each drifts slowly to the right:
  `x = -hw + 2*hw * ((fx + t * 0.036 * f) mod 1)` with f in 0.3..0.7 (one
  crossing every 40 to 90 s) and rides a sine of amplitude 0.8 at its own y0
  in -4.5..4.5.
- Pixel ratio capped at 2; resizes with the box.

Visual result: seven faint, slowly breathing horizontal ripples across the
whole hero in violet, coral and amber, with a sprinkle of soft pastel dots
drifting right. At 0.16 opacity on paper the lines read as pencil-thin
pastel threads; they pass behind the text and photo.

Rebuild (no three.js): an inline `<svg>` sized to the hero, 7 `<path>`
elements with `stroke-width:1`, `opacity:0.16`, `fill:none`, the three
colours, each path rebuilt per frame from 61 points with the same formula
(map world y to pixels: `py = H/2 - y * (H / 11.2)`, x across 0..W), and 14
`<circle>` at `r = 3 + random*3` px, `opacity:0.5`. Drive it with
`requestAnimationFrame` in a client component, 30fps is enough; stop when the
hero is off screen (IntersectionObserver) and do not animate at all under
`prefers-reduced-motion` (draw one static frame at t = 0). Alternatively a
`<canvas>` with `ctx.lineWidth = 1` and `globalAlpha`. Only opacity and path
geometry change; no layout. Keep it out of the LCP path (render after mount,
`aria-hidden`).

### 3.24 NL map (kaart-nl)

The client's `kaart-nl` is an iframe page built with d3 + topojson from a CDN
(world-atlas 110m), so the two screenshots of it are blank (no network) and
the map frame on the Coaches screenshot is an empty lavender box. The intent:

- Frame (Coaches hero right column): `background:#efebff; border-radius:26px;
  padding:18px; box-shadow:0 14px 40px rgba(30,27,75,0.1)`; inner 520px high,
  `border-radius:16px`, transparent background.
- Projection: Mercator fitted to the Netherlands polygon with a 30px inset
  inside the box (`fitExtent([[30,30],[W-30,H-30]])`), default box 520x560.
- **Halftone dot grid** inside the NL outline: `step = 13px`, every other row
  offset by `step/2` (hex packing), circles `r = 3.1`, `fill:#8f75ff`,
  `opacity:0.55`. Entrance: each dot grows from r=0 to 3.1 over 500ms with
  `delay = y * 1.4ms + random(0..220ms)`, ease cubic-out (a top-to-bottom
  wipe over about 1 s).
- **Pins** for six cities (lng, lat, label offset dx/dy, text anchor):
  Amsterdam (4.90, 52.37) dx 12 dy 4; Utrecht (5.12, 52.09) dx 12 dy 13;
  Amersfoort (5.39, 52.16) dx 12 dy -5; Rotterdam (4.48, 51.92) dx -12 dy 17
  anchor end; Eindhoven (5.47, 51.44) dx 12 dy 4; Zwolle (6.09, 52.51) dx 12
  dy 4. Each pin group fades in (opacity 0 to 1, 400ms) at `900ms + i*140ms`.
  Pin: circle `r=5.5; fill:#ff6b4a; stroke:#faf8f4; stroke-width:2.5`. Pulse
  ring: circle `r:6 → 22`, `stroke:#ff6b4a; stroke-width:2; fill:none`,
  opacity `0.9 → 0`, duration 2400ms, delay `600 + i*340ms`, ease cubic-out,
  looping.
- Label: `font:600 12.5px Figtree; fill:#1e1b4b; paint-order:stroke;
  stroke:#efebff; stroke-width:4px` (a lavender halo so the label reads over
  the dots).

Rebuild (no d3, no CDN): the Foundation `nl-map` component renders an inline
SVG. Precompute the dot grid offline (a script samples a NL polygon, for
example from the same world-atlas file, into a static array of [x,y] at
viewBox 520x560) and ship the array as JSON inside the component (about 900
dots, roughly 9 KB). Pins: project `city.at` from `app/cities.ts` with the
same Mercator constants used to make the grid (store `lng0, lat0, scale` with
the grid). Only `citiesWithCoach` get a pin; a city without a coach
(Bergen op Zoom) gets a hollow ring or nothing. Animate with CSS: dots
`animation: grow 500ms both` with per-dot `animation-delay` as an inline
style (dynamic value, allowed) or stagger by row only (13 row delays via
`nth-child` is impractical; use inline delay), pins `animation: fade-in`,
rings `animation: pulse 2400ms infinite` (transform: scale + opacity only,
`transform-origin` at the pin). No animation under `prefers-reduced-motion`.
Decision 2026-08-17 (home map shows the area, Google embed) concerns the
Google Maps on the home and city pages; this SVG map on the Coaches page does
not replace those and loads no third party.

WARNING: Rotterdam, Eindhoven, Zwolle have no coach; do not pin them.

---

## 4. Pages

For each page: section order, layout, complete copy. Button targets are given
as the repo route (section 6). Text in quotes is verbatim client copy,
including its own em dashes; replace every em dash (`—`) with a comma, colon or
period when typing it (hard rule), for example "Geen uurtarieven, geen kosten
achteraf. Je weet vooraf precies waar je aan toe bent, en je beslist pas ná
het gratis intakegesprek."

### 4.1 Homepage (`homepage-definitief-v4` → `/`)

Sections: nav, hero (with hero lines), ticker, traject (h2 + pills + 01-04 +
price panel), [price strip, hidden by default], two-tone panel, testimonial,
coaches panel, regio-kiezer, CTA band, full footer.

**Hero.** `padding:84px 48px 72px; position:relative; overflow:hidden`;
background lines layer; grid `1.25fr 1fr; gap:56px; align-items:center`.

Left:
- Badge: coral dot + "Voor scholieren, studenten én hun ouders".
- h1: "Samen kiezen voor een studie die écht past."
- Lead (17.5px/1.62 muted, max-width 500px, margin-top 22px): "Kiezen uit
  honderden opleidingen is lastig, voor jou én voor je ouders. In vier sessies
  met een vaste coach ontdek je wie je bent, wat je kunt en welke studie
  daarbij hoort. De gesprekken zijn 1-op-1, en de keuze is uiteindelijk aan
  jou."
- Buttons (margin-top 32px): `violet` "Plan gratis intake bij een coach" →
  `/studiekeuzecoaches`; `outline-ink` "Zo werkt het" → `#traject`.
- Trust row (margin-top 30px, 13.5px muted, gap 10px): amber `★★★★★`
  (`letter-spacing:1px`) + "**8,8** gemiddeld · 1.000+ trajecten per jaar ·
  gratis intake, daarna één vaste prijs".
  WARNING: unproven. Ours: no stars; text "Gratis intake · MBO, HBO en WO ·
  online of op locatie · daarna één vaste prijs".

Right: photo `aspect-ratio:4/4.6; object-fit:cover; border-radius:26px;
border:1px solid #e2dcf2` (stock: replace with `public/images/hero-gesprek.jpg`,
alt from `heroImage.alt`, `priority`, `sizes="(min-width:1024px) 460px, 100vw"`);
floating quote card (3.20) bottom-left; coral badge top-right (do not build,
or "Gratis intake").

**Ticker** (3.21).

**Traject** (`id="traject"`, `padding:88px 48px 40px`):
- Row: h2 (700 40px, max-width 480px) "Van \"geen idee\" naar een keuze die
  klopt" + meta "4 stappen · ± 4 weken · online of dichtbij".
- Pills (margin-top 20px): "✓ Incl. persoonlijkheidstest", "✓ Incl.
  studie-interessetest".
- Steps (3.11):
  01 "Wie ben ik en wat kan ik?" / "Je begint bij jezelf, niet bij
  opleidingen. Met een persoonlijkheidstest en gesprekken ontdek je je sterke
  kanten."
  02 "Blik op de toekomst" / "In wat voor werk zou je passen, met wat voor
  mensen? Je hoeft geen beroep te kiezen, alleen een warme richting."
  03 "Mijn interesses en verdieping" / "Met de studie-interessetest maak je de
  lijst kort: van duizenden opleidingen naar tien, van tien naar drie."
  04 (violet number) "De studiekeuze" / "Je legt je keuze naast alles wat je
  ontdekte en schrijft op waarom. Zo start je met een keuze waar je achter
  staat."
- Price panel (3.9): eyebrow "En wat kost dat?"; h3 "Eén vaste prijs.<br>Alles
  zit erin."; p "Geen uurtarieven, geen kosten achteraf. Je weet vooraf precies
  waar je aan toe bent — en je beslist pas ná het gratis intakegesprek."
  (replace the dash); checks: "Vier 1-op-1 gesprekken met één vaste coach",
  "Persoonlijkheidstest én studie-interessetest", "Opdrachten voor thuis, elk
  gesprek bouwt verder", "Online of op een van de 35+ locaties" (WARNING:
  ours "Online of op locatie bij jou in de buurt"). Card: "Het
  studiekeuzetraject"; "€ 649" + "compleet"; button "Plan gratis intake bij
  een coach" → `/studiekeuzecoaches`; "Gratis en vrijblijvend — je beslist
  daarna pas." (replace dash: "Gratis en vrijblijvend. Je beslist daarna
  pas."); scan line "Liever alleen de tests, met één gesprek erover?
  [Studiekeuzescan · € 249 →]" → `/tarieven`.

**Price strip** (hidden variant, only when `prijsWeergave = "Losse strip"`):
`background:#fff; border:1px solid #eae6dc; border-radius:20px; padding:24px
34px; display:flex; align-items:center; gap:28px; flex-wrap:wrap`; "€ 649" 700
34px + "compleet traject · vier gesprekken, beide tests, één vaste coach —
geen verrassingen achteraf" 14.5px muted; right: text link "Alle tarieven →"
→ `/tarieven` + `indigo` button 14.5px `13px 24px` "Plan gratis intake bij een
coach". Do not build unless the setting is wanted; the default is the panel.

**Two-tone panel** (`id="tweegesprekken"`, `padding:64px 48px`; 3.10):
Left (violet): eyebrow "Voor jou"; h3 "Jouw keuze, jouw tempo. Met één vaste
coach."; rows: "Ontdek wat je écht leuk vindt (niet wat \"moet\")", "Eén vaste
coach, geen wisselende gezichten", "Ook als je gestopt bent of vastloopt";
button "Zo werkt het voor jou" → `/studiekeuzetraject`.
Right (ink): eyebrow "Voor ouders"; h3 "Inzicht en zekerheid, óók voor u.";
rows: "Alle gesprekken zijn 1-op-1, zo praat uw kind vrijuit", "Het traject
bevat een persoonlijkheidstest en een studie-interessetest", "Uw kind beslist
zelf, weloverwogen en zonder haast"; button "Informatie voor ouders" →
`/voor-wie`. (Keep "u" here: the client's wording.)

**Testimonial** (`id="verhalen"`, `padding:72px 48px`; 3.13): quote "Mijn coach
oordeelde niet, maar vroeg door. Nu weet ik zeker wat ik wil, en waarom.";
"**Moya (22)**, koos na haar herstart voor Toegepaste Psychologie"; links
"Alle artikelen" (underlined) → `/artikelen` and "Voor wie is het traject? →"
(muted) → `/voor-wie`. WARNING: no stock portrait. Ours: also link
"Meer ervaringen" → `/ervaringen`. "koos na haar herstart voor Toegepaste
Psychologie" is the client's claim about Moya; the archive quote does not
say it. Open question 4.

**Coaches panel** (`id="coaches"`, `padding:24px 48px 80px`): `background:
#efebff; border-radius:28px; padding:52px; grid 1.2fr 1fr; gap:48px;
align-items:center`. h2 700 34px/1.12 "Eén vaste coach.<br>Van eerste twijfel
tot definitieve keuze."; p 15.5px/1.65 muted max-width 440px "Onze coaches
kennen alle niveaus (mbo, hbo en wo) en alle twijfels. Ook met ADD, ADHD of
autisme ben je op de juiste plek: structuur en overzicht zitten in de methode
ingebakken."; white pills "Niet oordelen, wél doorvragen", "MBO · HBO · WO",
"Extra ondersteuning"; `indigo` button 15px `14px 26px` "Ontmoet de coaches"
→ `/studiekeuzecoaches`. Right: photo `aspect-ratio:16/13; border-radius:20px`
(stock "Team van coaches"; WARNING: no team photo exists; use no photo and let
the text column span, or Janneke's portrait is NOT appropriate here as "team").
Recommended: drop the image, make the panel one column with `max-width:720px`
text, or show the NL map component (3.24) at small size here, which is true
and on-brand.

**Regio-kiezer** (`id="regio"`, `padding:0 48px 80px`): grid `1fr 1.1fr;
gap:56px; align-items:center`. Left: eyebrow "Begin met een gesprek. Het kost
je niets"; h2 700 36px/1.1 -0.022em "Kies je regio en kom bij de juiste coach
terecht"; p "Je vraagt een gesprek aan bij de coach in jouw stad. Niet bij een
centraal punt, maar bij de persoon die je straks écht spreekt."; numbered
rows (15px, violet bold numbers): "Kies de stad waar je begeleiding wilt",
"Lees wie daar werkt en waar die coach goed in is", "Vraag bij die coach een
gratis intakegesprek aan". Right: regio box (3.15).

**CTA band** (3.14): logo 46px; h2 "Elke goede keuze begint met één stap.<br>
<span violet>Zet hem samen, met een gratis intake.</span>"; p "Vrijblijvend
kennismaken: samen, of eerst alleen. Online of op een van onze 35+ locaties."
(WARNING: ours "Online of op locatie bij een coach in de buurt."); buttons
"Plan gratis intake bij een coach" → `/studiekeuzecoaches`, "Bekijk tarieven"
→ `/tarieven`.

**Footer** full (3.3).

### 4.2 Het traject (`het-traject` → `/studiekeuzetraject`)

Sections: nav (active "Het traject"), hero, gesprekken panel, testen, KeuzeScan,
waarom, CTA band, compact footer.

**Hero** `padding:72px 48px 56px`; grid `1.2fr 1fr; gap:56px`. Eyebrow "Het
traject"; h1 "Vier gesprekken. Eén vaste coach. Jouw keuze."; p1 (16.5px/1.65,
max-width 520px) "Met het persoonlijke en doelgerichte studiekeuzetraject werk
je gestructureerd toe naar een passende vervolgstudie. Je krijgt een ervaren
coach met wie je vier bijeenkomsten hebt, op een locatie bij jou in de buurt of
online."; p2 "Je gaat aan de slag met gesprekken, tests en opdrachten voor
thuis. Elk gesprek bouwt op het vorige, tot er een keuze ligt waar je écht
achter staat."; buttons `violet` "Plan gratis intakegesprek" →
`/studiekeuzecoaches`, `outline-ink` "Eerst lezen wat je doet" →
`#gesprekken`. Right: photo 4/4.4 radius 26 (stock "Scholier in gesprek";
ours: `hero-gesprek.jpg` is reserved for the home hero per decision
2026-08-13 "hero only"; this is also a hero, but the safer reading is home
only. Use no photo: make the hero one column with `max-width:720px`, or
reuse the image and record it. Open question 5).

**Gesprekken** (`id="gesprekken"`, `padding:0 48px 72px`): lavender panel
`padding:56px`. Row: h2 700 36px/1.1 max-width 460px "Hoe ziet het traject
eruit?" + meta "4 gesprekken · elk gesprek bouwt op het vorige". White pills
"✓ Incl. persoonlijkheidstest", "✓ Incl. studie-interessetest". Cards (3.12):

01 "Wie ben ik en wat kan ik?" / "Je begint bij jezelf, niet bij opleidingen.
Waar word je blij van, waar loop je op leeg, en wat kun je goed zonder dat je
het bijzonder vindt? Dat laatste is meestal het belangrijkste: je eigen talent
voelt vaak als iets gewoons. Een persoonlijkheidstest helpt hierbij." / thuis:
"Je vraagt aan drie mensen die je goed kennen waar zij jou goed in vinden. De
antwoorden verrassen bijna iedereen."

02 "Blik op de toekomst" / "Een studie is een middel. Daarom kijken we een
stap verder: in wat voor werk zou je passen, met wat voor mensen, in wat voor
omgeving? Je hoeft nog geen beroep te kiezen, alleen te weten welke richting
warm aanvoelt." / thuis: "Je praat met iemand die het werk doet dat jou
aanspreekt. Eén gesprek van een half uur zegt meer dan tien websites."

03 "Mijn interesses en verdieping" / "Nu pas kijken we naar opleidingen. Met
de studie-interessetest en je coach maak je de lijst kort: van duizenden naar
een stuk of tien, en van tien naar drie. Bij elke opleiding kijken we naar het
rooster en de vakken, niet naar de folder." / thuis: "Je gaat naar de open
dagen van de opleidingen die overblijven. Let vooral op de mensen die er
rondlopen: daar zit je straks tussen."

04 (coral number) "De studiekeuze" / "Je legt je keuze naast alles wat je in
de gesprekken hebt ontdekt. Klopt het, dan schrijf je op waarom, in je eigen
woorden. Klopt het niet helemaal, dan weet je nu waar het wringt. Ook dat is
winst, en beter nu dan in november." / no thuis box.

**Testen** (`padding:0 48px 72px`): grid `1fr 1fr; gap:56px; align-items:start`.
Left: eyebrow "De testen"; h2 700 36px/1.12 "Thuis testen, samen duiden"; p
"Tijdens onze studiekeuzetrajecten maak je thuis, in je eigen tempo, een
persoonlijkheids- en interessetest. Handig, want zo krijg je direct inzicht in
wat bij je past. Maar hoe zet je die inzichten om in een studiekeuze waar je
écht zeker van bent?"; p "Daarom ga je na de test in gesprek met een
studiekeuzecoach. Geen standaardvragen, maar een gesprek waarin jij centraal
staat. Je coach daagt je uit om dieper na te denken, moedigt je aan om over
je eigen grenzen heen te kijken en zorgt dat je een keuze maakt die écht bij
jou past."
Right: ink card `border-radius:24px; padding:40px`: header row (44px violet
square radius 12 with "TD" 700 18px white; "Ontwikkeld door TalentDrives" 700
17px; "30+ jaar ervaring in assessments en testontwikkeling" 13px
lavender-ink); p 14.5px/1.66 lavender-ink "Onze testen zijn ontwikkeld door
TalentDrives, met meer dan 30 jaar ervaring in assessments, coaching en
testontwikkeling. De instrumenten zijn praktijkgericht en betrouwbaar, en
sluiten aan bij de ontwikkelingsfase van jongeren."; p "Zo weet je zeker dat
je werkt met inzichten die niet alleen theorie, maar ook de dagelijkse
realiteit weerspiegelen."; glass pills "Persoonlijkheidstest",
"Studie-interessetest", "Praktijkgericht & betrouwbaar".
WARNING: "TalentDrives" and "30+ jaar" are facts about a third party that the
client supplied (feedback round 1 reversed the "no tests" decision). Print
them as the client wrote them; they are the client's claim, not ours. Record in
docs/decisions.md that the tests are back (2026-08-12) and who supplies them.

**KeuzeScan** (`padding:0 48px 72px`): white card `border:1px solid #eae6dc;
border-radius:28px; padding:52px 56px; grid 1.15fr 1fr; gap:52px;
align-items:center`. Left: coral eyebrow "Liever een korte verkenning?"; h2
700 34px/1.12 -0.022em "Snel inzicht met de KeuzeScan"; p "De KeuzeScan is een
kort traject voor wie snel inzicht wil in welke studie past. Je maakt dezelfde
twee testen als in het volledige traject: de persoonlijkheidstest en de
interessetest."; p "Daarna heb je één online sessie met een studiekeuzecoach.
Je bespreekt samen de resultaten — voor je uitgewerkt in een overzichtelijke
matrix — krijgt toelichting op je antwoorden en denkt na over vervolgstappen.
Ideaal als je snel duidelijkheid wilt of behoefte hebt aan een eerste
verkenning van je mogelijkheden." (dashes → commas); row: `indigo` 14.5px
`14px 26px` "Start met de KeuzeScan" → `/studiekeuzecoaches` + text link
"Bekijk tarieven →" → `/tarieven`.
Right: paper box `border:1px solid #eae6dc; border-radius:20px; padding:32px
34px; gap:18px`: small eyebrow "Zo werkt de KeuzeScan"; steps (number 700
22px + title 600 15.5px + line 13.5px muted): 1 "Persoonlijkheidstest" /
"Thuis, in je eigen tempo."; 2 "Interessetest" / "Welke studierichtingen
passen bij wat jou boeit?"; 3 (coral) "Eén online sessie met een coach" /
"Resultaten in een matrix, toelichting op je antwoorden en concrete
vervolgstappen."; rule + "Wil je daarna toch volledige begeleiding? Dan stap
je over op het studiekeuzetraject."
Note: the client calls it "KeuzeScan" here and "Studiekeuzescan" on Tarieven
and the home page. Use "Studiekeuzescan" (the priced product name) in the h2
and keep "KeuzeScan" out, or keep both as the client did. Open question 6.

**Waarom** (`padding:0 48px 72px`): h2 700 36px/1.1 "Waarom
StudiekeuzeAdvies" margin-bottom 36px; 3-col row (3.11 variant):
"Doelgericht" / "Doelgerichte trajecten" / "Het traject is zo opgebouwd dat
je, samen met je eigen coach, stap voor stap toewerkt naar een keuze. Leren,
ontdekken, ervaren en kiezen."; "Zekerheid" / "Kiezen met zekerheid" /
"Doordat je in het hele traject begeleiding krijgt, weet je aan het eind
waarom je kiest wat je kiest. Zo begin je zelfverzekerd aan je opleiding.";
"Dichtbij" / "Bij jou in de buurt" / "Je spreekt af in de stad waar je coach
werkt, en anders gaan de gesprekken online. Dat werkt beter dan je denkt."

**CTA band**: h2 42px "Begin met een gesprek.<br><span>Het kost je niets.</span>";
p "In het intakegesprek vertel je wat er speelt, en horen we of dit traject
bij je past. Daarna zeg je gewoon nee als het niet klopt."; buttons `violet`
"Kies je stad" → `/locaties` (client: home `#regio`), `outline-ink` "Bekijk
eerst alle coaches" → `/studiekeuzecoaches`.

Compact footer: Home, Coaches, Artikelen, Word coach.

Unused data in the script: `types` (the eight keuze-types, duplicated from
Voor wie). Ignore.

### 4.3 Voor wie (`voor-wie` → `/voor-wie`, new)

Sections: nav (active "Voor wie"), hero, keuze-types, three situations,
waarom belangrijk, CTA band, compact footer.

**Hero** (same geometry as 4.2): eyebrow "Voor wie"; h1 "Voor wie is het
traject?"; p "Een studiekeuze is geen keuze voor het leven: met de meeste
studies kun je nog alle kanten op. Wat wél telt, is dat je kiest voor een
studie waar je de komende jaren op je plek zit en je het beste kunt
ontwikkelen."; p "Een verkeerde keuze is duur, zonde van je tijd en kan je
zelfvertrouwen raken. Daarom zijn wij er om je te helpen kiezen."; buttons
`violet` "Plan gratis intakegesprek" → `/studiekeuzecoaches`, `outline-ink`
"Bekijk het traject" → `/studiekeuzetraject`. Photo 4/4.4 (stock; no photo,
see open question 5).

**Keuze-types** (`padding:24px 48px 64px`): h2 700 36px/1.1 "Welk keuze-type
ben jij?" margin-bottom 10px; p 15.5px muted max-width 560px margin-bottom
28px "In welke fase van het zoeken je ook zit, we helpen je op de manier die
jij nodig hebt. Ongeveer de helft van de mensen die bij ons aanklopt, maakte
eerder al een keuze die niet bleek te passen."; 2-col rows (3.7), in order:
1. "Je bent een serieuze scholier die zich goed wil voorbereiden op je toekomst."
2. "Je hebt geen idee wat je wilt, of je vindt juist veel leuk en je twijfelt."
3. "Je woont in het buitenland en wilt in Nederland studeren, maar kent het aanbod niet."
4. "Je vraagt je af welke studie bij je past, of wat je wilt worden."
5. "Je hebt al een idee, maar wilt verder kijken dan je eerste ingeving."
6. "Je bent gestopt met een studie en weet niet wat je nu wilt gaan doen."
7. "Je bent nog bezig met een studie, maar twijfelt of die wel bij je past."
8. "Je vindt het moeilijk om overzicht te krijgen in alle mogelijkheden."
("Ongeveer de helft" is also in PRODUCT.md and the Amsterdam city copy; ok.)

**Three situations** (`padding:0 48px 72px`): grid `repeat(3,1fr); gap:22px`;
cards `border-radius:24px; padding:36px; display:flex; flex-direction:column;
gap:12px`, h3 700 23px, p 14.5px/1.62 `flex:1`, link 700 14.5px with ` →`.
1. Violet card (`background:#6d4aff; color:#fff`, p `#e4dcff`, link amber):
   "Eerste studiekeuze" / "Ga je voor het eerst een opleiding starten, maar
   heb je geen idee wat je wilt? Lijken veel opleidingen je leuk, waardoor je
   geen keuze kunt maken? Of wil je je gewoon goed voorbereiden op de
   toekomst? We helpen je een passende keuze te maken." / "Start meteen goed
   →" → `/eerste-studiekeuze` (client: traject `#gesprekken`).
2. Ink card (p `#c5bfec`, link coral): "Verkeerde studiekeuze" / "Gestopt met
   een studie en weet je niet wat nu? Of twijfel je of je huidige studie wel
   past? Aan het eind van het traject heb je een overwogen keuze gemaakt voor
   de studie die écht bij je past. Wachten tot september hoeft niet." / "Maak
   een einde aan de twijfel →" → `/verkeerde-studiekeuze`.
3. White card (`border:1.5px solid #1e1b4b`, p muted, link violet): "Studeren
   met ADD, ADHD of autisme" / "Dan helpt overzicht meer dan nóg meer opties:
   vaste stappen, één ding per keer, dezelfde coach elke afspraak en vooraf
   weten wat er gaat gebeuren. Zeg het in het intakegesprek, dan houdt je
   coach er rekening mee." / "Extra structuur in je keuze →" →
   `/studiekeuze-met-add-adhd`.
Responsive: one column below `md`.

**Waarom belangrijk** (`padding:0 48px 72px`): grid `1fr 1fr; gap:56px;
align-items:start`; h2 700 36px/1.12 "Waarom is de juiste studiekeuze zo
belangrijk?"; right: p "De keuze voor een vervolgstudie is één van de
belangrijkste keuzes die je tot nu toe hebt gemaakt. Tegelijk is de uitval en
de switch in het eerste jaar van het mbo, hbo en wo hoog. Het grootste deel
van de studenten die uitvallen, valt uit omdat de studie niet bleek te
passen."; p "Veel scholieren stellen het kiezen uit en maken op het laatste
moment snel een keuze. Een verkeerde studiekeuze kost niet alleen geld, maar
geeft ook stress, doordat je toekomst onzeker lijkt. Goede begeleiding helpt
je een overwogen keuze te maken. Dat scheelt frustratie, teleurstelling en een
hoop geld."

**CTA band**: identical to 4.2. Compact footer: Home, Coaches, Artikelen, Word
coach.

Note: GESPREK.md lists "ouders" as a section of this page; the export has no
parent section. The home two-tone panel links "Informatie voor ouders" here.
Ours: add a short "Voor ouders" block (reuse the ink half of 3.10 with the
client's three "u" rows) between the situations and "Waarom belangrijk", so
the link keeps its promise. Open question 7.

### 4.4 Coaches (`coaches` → `/studiekeuzecoaches`)

Sections: nav (active "Coaches"), hero with map (`id="kaart"`), filter + grid,
ink CTA, compact footer.

**Hero** `padding:72px 48px 64px`; grid `1.15fr 1fr; gap:56px;
align-items:center`. Eyebrow "Onze studiekeuzecoaches"; h1 700 52px/1.06 "De
persoon die je straks spreekt, kies je zelf."; p 17px/1.62 max-width 480px
"Geen centraal callcenter: je kiest een stad, ziet wie daar werkt en vraagt
bij díe coach een gratis intakegesprek aan. Alle gesprekken zijn 1-op-1.";
stats row (`gap:32px; margin-top:32px`; figure 700 28px + 13px muted label):
"6" violet / "regio's + online"; "8,8" coral / "gemiddelde beoordeling";
"1-op-1" amber / "alle gesprekken". WARNING: "8,8" is unproven and "6" is
false. Ours: "{n}" / "steden + online" with n = `citiesWithCoach.length`;
"Gratis" / "intakegesprek"; "1-op-1" / "alle gesprekken".
Right: map frame (3.24).

**Filter + grid** (`padding:8px 48px 88px`): filter row (3.15), cards (3.16).

**Ink CTA** (3.14 ink variant): "Twijfel je welke coach past?" / "Begin
gewoon met een gratis intake in jouw regio, de coach denkt met je mee, ook als
een collega beter past." / "Plan gratis intake bij een coach" → (ours)
`/studiekeuzecoaches/janneke#intake` is wrong for a list page; point it at
`#coaches` (the grid) or `/locaties`; "Kies je regio" → `/locaties`.

Compact footer: Home, Tarieven, Word coach.

Ours: the real roster order rule (decision 2026-08-06): a real coach stands
before every stand-in. The current page carries long third-person texts per
coach with anchors `#<slug>`; keep those anchors working (cards get
`id={slug}`), and the long text moves to `/studiekeuzecoaches/[coach]`.

### 4.5 Coach Janneke (`coach-janneke` → `/studiekeuzecoaches/[coach]`, new)

Sections: nav (active "Coaches", CTA → `#intake`), hero, story + sticky form,
compact footer. Layout in 3.17.

Copy:
- Back link "← Alle coaches" → `/studiekeuzecoaches`.
- Eyebrow "Studiekeuzecoach in Amsterdam en omgeving".
- h1 "Hoi, ik ben Janneke van den Brand."
- Intro "Ik ben psycholoog en studiekeuzecoach — en samen met vier
  collega-coaches trotse eigenaar van StudiekeuzeAdvies." (dash → comma).
- Pills "Amsterdam + online", "Psycholoog", "10 jaar bij StudiekeuzeAdvies".
- Buttons "Plan gratis intake bij Janneke" → `#intake`; "Zo werkt het
  traject" → `/studiekeuzetraject`.
- Portrait: `public/images/coach-janneke.jpg` (real, from the archive), alt
  from `coach.portraitAlt`; caption "Janneke van den Brand · psycholoog &
  studiekeuzecoach".
- Story paragraphs, in order:
  1. "Vanaf het prille begin ben ik betrokken bij StudiekeuzeAdvies. In de
     afgelopen 10 jaar heb ik actief meegewerkt aan de ontwikkeling en
     vormgeving van het studiekeuzetraject. In diezelfde periode heb ik
     StudiekeuzeAdvies een aantal keer van eigenaar zien veranderen. Toen de
     laatste eigenaar besloot de samenwerking met de coaches te stoppen,
     kregen wij de mogelijkheid aangeboden om het over te nemen. Samen met
     vier collega-coaches heb ik die kans gegrepen. Inmiddels zijn we met z'n
     vijven de trotse eigenaar."
  2. "Jongeren helpen bij het maken van keuzes en werken aan hun toekomst past
     goed bij mij. Als psycholoog in de verslavingszorg werk ik met jongeren
     bij wie het leven ingewikkeld is geworden. Dat zijn vooral langdurige
     trajecten, waarin het gaat over herstel en welzijn. Bij studiekeuze is
     het vraagstuk heel anders en veel concreter: wat past bij mij en welke
     richting wil ik op?"
  3. "Dat klinkt misschien als een simpele vraag, maar er komt verrassend veel
     bij kijken. Je interesses en talenten, verwachtingen van jezelf en soms
     ook van anderen, twijfels, cijfers, het studentenleven en natuurlijk de
     vraag: wat past nou écht bij mij? Geen wonder dat kiezen soms best
     lastig is."
  4. Amber box, title "Als er meer speelt dan alleen studiekeuze": "Onzekerheid,
     faalangst of eerdere ervaringen kunnen het maken van keuzes behoorlijk
     beïnvloeden. Maar het kan ook zijn dat er (mogelijk) iets anders speelt,
     bijvoorbeeld ADHD, autisme, dyslexie, een lichamelijke beperking of
     andere psychische of persoonlijke problematiek. Als psycholoog heb ik
     daar oog voor. Ik neem de tijd om te kijken wat iemand nodig heeft om
     weer wat vertrouwen en ruimte te ervaren. Soms zijn een paar concrete
     tips of een andere manier van kijken al helpend. Als er meer nodig is,
     denk ik mee over passende ondersteuning of een eventuele doorverwijzing.
     Ik behandel niet, maar zorg er wel voor dat wat er speelt gezien en
     meegenomen wordt in het studiekeuzeproces."
  5. "Mijn rol is niet om voor jou te kiezen. Sterker nog: jij doet het meeste
     werk. Ik stel vragen, luister, houd je een spiegel voor en durf soms net
     even door te vragen waar anderen misschien stoppen. Zo help ik je om
     jezelf en je mogelijkheden beter te begrijpen. Tegelijkertijd hoef je
     het niet allemaal zelf uit te zoeken. Ik bied je een duidelijk
     stappenplan, breng mijn kennis en ervaring in en denk met je mee over
     alles wat bij een studiekeuze komt kijken. Ook voor alle praktische
     vragen en randzaken rondom je studiekeuze kun je bij mij terecht.
     Uiteindelijk ben jij degene die de keuze maakt."
  6. "En dat vind ik juist zo mooi aan dit werk. We beginnen met een vraagstuk
     en eindigen met een antwoord. Meestal is dat een studie waarvan je
     denkt: ja, dit past bij mij. En heel soms komen we er samen achter dat
     studeren (nog) niet de juiste stap is voor jou. Ook dat is een
     waardevolle uitkomst: weten wat op dit moment wél bij je past."
  7. Violet heading "Altijd een happy end dus!"
  8. "Ik vind het enorm waardevol en vooral heel leuk om daar onderdeel van te
     mogen zijn. Want een studiekeuze bepaalt natuurlijk niet je hele leven,
     maar een keuze maken die echt bij jou past, kan wél een heel fijne start
     zijn van de volgende fase van je leven."
  9. Lavender box, title "Werkgebied": "Ik ontvang je in Amsterdam, maar
     begeleid ook studiekiezers uit onder andere Amstelveen, Abcoude, Zaandam,
     Haarlem, Purmerend, Diemen, Hoofddorp, Heemstede, Uithoorn en Aalsmeer.
     Liever vanuit huis? Online kan natuurlijk ook!"
- Form card (3.19): title "Plan je gratis intake bij Janneke"; sub
  "Vrijblijvend kennismaken, online of in Amsterdam. Je beslist daarna pas of
  je start."

Data model for ours: this long text belongs in `app/coaches.ts` (per-coach
`profile` blocks: paragraphs, an optional highlight box, the work-area box,
pills), so `/studiekeuzecoaches/[coach]` renders every coach; only Janneke
has real content today. Stand-ins: `dynamicParams=false` and
`generateStaticParams` over `coaches`, but their pages carry `isPlaceholder`
content and must not go live (same gate as the roster). The work-area list
disagrees with `janneke.region` ("Amsterdam en Amstelveen"): the client's
list is longer. Open question 8.

### 4.6 Wie zijn wij (`wie-zijn-wij` → `/over-ons`, new)

Sections: nav (active "Over ons"), hero, verhaal, waarden row, collectief
panel, compact footer. No CTA band.

**Hero** (4.2 geometry, photo 4/4.2): eyebrow "Wie zijn wij"; h1 "Een
collectief van coaches. Met de student centraal."; p "StudiekeuzeAdvies is een
collectief van freelance studiekeuzecoaches. We werkten jarenlang voor een
grote opdrachtgever, maar hebben nu de handen ineengeslagen om het op onze
eigen manier te doen: met de student als middelpunt."; buttons `violet`
"Ontmoet de coaches" → `/studiekeuzecoaches`, `outline-ink` "Plan gratis intake
bij een coach" → `/studiekeuzecoaches`. Photo: stock "Coaches in overleg";
no photo (open question 5).

**Verhaal** (`padding:24px 48px 64px`): grid `1fr 1fr; gap:56px`; h2 700
36px/1.12 "Waarom we opnieuw zijn begonnen"; p "Jarenlang begeleidden we
studiekiezers in opdracht van een grote organisatie. Daar leerden we het vak,
maar we zagen ook hoe processen en targets soms belangrijker werden dan de
studiekiezer zelf. Toen die samenwerking stopte, was de keuze snel gemaakt:
samen verder, op onze eigen voorwaarden."; p "Vanaf nu staat de student veel
centraler. Geen callcenter of tussenlagen: je kiest zelf je coach, in jouw
regio, en die coach blijft van intake tot keuze. Ons doel is simpel: zoveel
mogelijk studiekiezers helpen om de juiste stap te zetten."

**Waarden** (`padding:0 48px 72px`): 3-col row: "Passie" / "Passie voor het
vak" / "Studiekiezers begeleiden is geen bijbaan voor ons. Het is het vak waar
we jaren ervaring in hebben en elke dag beter in willen worden."; "Missie" /
"Zoveel mogelijk juiste stappen" / "Ons doel is simpel: zoveel mogelijk
studiekiezers helpen om de stap te zetten die echt bij ze past. Elke goede
keuze telt."; "Belofte" / "De student staat centraal" / "Geen targets of
tussenlagen. Jij kiest je coach, jouw tempo bepaalt het traject en jouw keuze
is het enige resultaat dat telt."

**Collectief panel** (`padding:0 48px 80px`): ink panel `border-radius:28px;
padding:56px; grid 1.2fr 1fr; gap:48px; align-items:center`; h2 700
32px/1.15 -0.02em "Freelance, maar niet los van elkaar"; p 15.5px/1.65
lavender-ink max-width 460px "Elke coach werkt zelfstandig in de eigen regio,
maar we delen dezelfde methode, dezelfde testen en dezelfde standaard. We
leren van elkaar en vallen voor elkaar in als dat nodig is. Zo krijg je de
aandacht van een zelfstandige coach, met de kwaliteit van een team."; glass
pills (13px, `8px 16px`) "Eén methode", "Zelfde testen", "Coaches in heel
Nederland" (WARNING: not true with three cities; ours "Coaches in meerdere
steden" or "{n} steden en online"); `violet` button 15px `14px 26px` "Bekijk
wie waar werkt" → `/studiekeuzecoaches` (or `/locaties`). Right: photo 16/13
radius 20 (stock; replace with the NL map component or nothing).

Compact footer: Home, Coaches, Tarieven, Word coach.

Note: GESPREK.md says "het verhaal van de vijf coach-eigenaren". The export
names nobody. Do not add names: only Janneke is confirmed.

### 4.7 Artikelen (`artikelen` → `/artikelen`)

Sections: nav (active "Artikelen"), hero (no image), grid, lavender CTA,
compact footer. No reveal script.

**Hero** `padding:72px 48px 48px`, one column: eyebrow "Artikelen"; h1 700
52px/1.06 max-width 700px "Slimmer kiezen begint met goed geïnformeerd zijn";
p 17px/1.62 max-width 520px "Praktische artikelen over aanmelden, regelingen
en het keuzeproces, geschreven door onze coaches." (WARNING: decision
2026-08-05, no author on an article, and most of the 63 articles were written
by the seller's staff. Ours: "Praktische artikelen over aanmelden, regelingen
en het keuzeproces.")

**Grid** (`padding:8px 48px 88px`; 3.18). Client sample cards (the first two
exist in the archive; the last two are "Binnenkort" placeholders, do not
create them):
1. Aanmelden · 29 oktober 2025 · "Inschrijven voor je opleiding" · "Aanmelden
   via Studielink, selectie en deadlines: zo regel je je inschrijving zonder
   verrassingen."
2. Regelingen · 8 februari 2025 · "De 1-februariregeling" · "Stop je vóór 1
   februari met je studie, dan telt dit jaar niet mee voor je
   studiefinanciering. Hoe het werkt."
3. Open dagen · Binnenkort · "Zo haal je meer uit een open dag" · "Let vooral
   op de mensen die er rondlopen: daar zit je straks tussen. Een praktische
   checklist."
4. Keuzeproces · Binnenkort · "Twijfelen mag: zo gebruik je het" · "Twijfel is
   geen zwakte, maar het begin van een goede keuze. Hoe je van twijfel naar
   richting komt."
Ours: all articles from `app/articles.ts`, newest first, the current page's
grouping by year may stay as a heading row between card groups if wanted.

**Lavender CTA** (3.14 artikelen variant): "Liever gewoon een gesprek?" / "Het
intakegesprek is gratis en verplicht je tot niets." / "Kies je regio" →
`/locaties`.

Compact footer: Home, Coaches, Word coach.

### 4.8 Tarieven (`tarieven-v3` → `/tarieven`, new)

Sections: nav (active "Tarieven"), centred hero, three price cards, lavender
CTA, compact footer. No script.

**Hero** `padding:72px 48px 48px; text-align:center`: eyebrow "Tarieven"; h1
700 50px/1.07 "Heldere tarieven, geen verrassingen"; p 16.5px/1.62 max-width
520px centred margin-top 18px "Het intakegesprek is altijd gratis en
verplicht je tot niets. Daarna kies je wat bij je situatie past."

**Cards** (`padding:8px 48px 72px`; 3.8):
1. "Studiekeuzescan" · "€ 249" "eenmalig" · "Snel inzicht: je maakt de tests
   en bespreekt de uitkomsten in één gesprek met een coach." · checks
   "Persoonlijkheidstest", "Studie-interessetest", "Eén begeleidend gesprek
   over de uitkomsten" · "Start met de scan" → `/studiekeuzecoaches`.
2. "Meest gekozen" · "Studiekeuzetraject" · "€ 649" "compleet traject" · "Het
   volledige traject: vier gesprekken met één vaste coach, van eerste twijfel
   tot definitieve keuze." · checks "Vier 1-op-1 gesprekken met je eigen
   coach", "Persoonlijkheidstest en studie-interessetest", "Opdrachten voor
   thuis, elk gesprek bouwt verder", "Op locatie bij jou in de buurt of
   online" · "Plan gratis intake bij een coach" → `/studiekeuzecoaches`.
   WARNING: "Meest gekozen" is a claim about sales we cannot prove yet. Ours:
   "Aanbevolen" or "Het volledige traject" on the same amber badge.
3. "Aanvullend" · "Extra coaching" · "€ 89" "per gesprek" · "Geen los product,
   maar een aanvulling: een extra gesprek kan alleen als je eerst de scan of
   het traject hebt gedaan." · checks "1-op-1 met je eigen coach", "Alleen ná
   de scan of het traject", "Op locatie of online" · "Bij te boeken na scan of
   traject" (no link target of its own; render as a muted pill, not a button).

**Lavender CTA** (3.14 tarieven variant): "Eerst weten of het bij je past?" /
"Begin met het gratis intakegesprek. Je vertelt wat er speelt, wij vertellen
hoe we kunnen helpen. Daarna zeg je gewoon nee als het niet klopt. Twijfel je
tussen de scan en het traject? Dat bespreek je in de intake." / "Plan gratis
intake bij een coach" → `/studiekeuzecoaches`.

Compact footer: Home, Voor wie, Coaches, Artikelen, Word coach.

Note: the FAQ decision "no price question until the price is decided" is now
released: prices are decided (€ 249 / € 649 / € 89). The FAQ may add a price
answer that repeats this page, and nothing more (decision: the FAQ is never
the first place a promise is made).

### 4.9 Word coach (`word-coach` → `/coach-worden`, new)

Sections: nav (active "Word coach", CTA "Meld je aan als coach" → `#aanmelden`),
hero with "In het kort" card, "Wat je krijgt, wat we vragen", regions + form,
compact footer.

**Hero** `padding:72px 48px 64px`; grid `1.2fr 1fr; gap:56px;
align-items:center`. Eyebrow "Werken als studiekeuzecoach"; h1 700 52px/1.06
"Word dé studiekeuzecoach van jouw regio."; p 17px/1.62 max-width 520px
"StudiekeuzeAdvies is van de coaches zelf. We groeien met zorg: per stad of
regio sluit precies één coach aan, die daar het gezicht van StudiekeuzeAdvies
wordt."; buttons (gap 14px) `violet` "Meld je aan" → `#aanmelden`,
`outline-sand` "Bekijk onze methode" → `/studiekeuzetraject`.
Right: ink card `border-radius:26px; padding:38px 40px; gap:22px`: small
eyebrow "In het kort" (lavender-ink); four rows (amber number 20px 700; title
600 16px Bricolage; line 13.5px/1.55 lavender-ink):
1 "Eén coach per regio" / "Jouw stad is exclusief van jou — geen interne
concurrentie." (dash → colon)
2 "Zichtbaar op de website" / "Eigen profielpagina, vindbaar via de kaart en
het regiofilter."
3 "Eenmalige licentie" / "Eenmalig ± € 750 (indicatie) — geen maandelijkse
afdracht."
4 "Eén bewezen methode" / "Alle coaches werken volgens het traject zoals op
de website beschreven."

**Wat je krijgt** (`padding:0 48px 72px`): header row `border-top:1.5px solid
#1e1b4b; padding-top:28px; display:flex; align-items:baseline;
justify-content:space-between; flex-wrap:wrap`: h2 700 36px/1.1 -0.025em "Wat
je krijgt, wat we vragen" + meta "Helder vooraf — net als voor onze klanten"
(dash → colon). Two white cards (`border:1px solid #eae6dc; border-radius:24px;
padding:38px 40px`, grid `1fr 1fr; gap:22px; margin-top:32px`):
Left, heading violet 700 21px "Dit krijg je"; rows (15px/1.6 `#3a3760`,
gap 14px, violet ✓): "Een eigen, exclusieve regio: jij bent daar de enige
coach van StudiekeuzeAdvies"; "Zichtbaarheid op de website: eigen
profielpagina, plek op de kaart en in het regiofilter"; "Aanvragen uit jouw
regio komen rechtstreeks bij jou binnen"; "Een bewezen methode: het complete
traject, de twee testen en alle materialen"; "Een hecht team van
collega-coaches — het bedrijf is van de coaches zelf".
Right, heading coral 700 21px "Dit vragen we" (use `#d84a26`); rows (coral
✓): "Een eenmalige licentie van ± € 750 — indicatie, de definitieve prijs
stemmen we samen af"; "Je werkt volgens de methode zoals die op deze website
staat beschreven"; "Ervaring met jongeren, coaching of loopbaanbegeleiding";
"Je bent zelfstandig ondernemer (of wilt dat worden)"; rule + 13.5px muted
"Geen maandelijkse fee, geen omzetafdracht: na de licentie is wat je verdient
van jou."
WARNING: "± € 750 (indicatie)" is explicitly undecided (GESPREK.md section 5).
The client chose to print it as an indication; keep the word "indicatie" and
make the amount one constant (`licentiePrijs`) so it changes in one place.
"Een bewezen methode": PRODUCT.md forbids "expert" and unproven claims;
"bewezen" is borderline. Ours: "Eén vaste methode" / "Een uitgewerkte methode".

**Regions + form** (`id="aanmelden"`, `padding:0 48px 88px`): grid `1fr 440px;
gap:56px; align-items:start`. Left: h2 "Is jouw regio nog vrij?"; p 15.5px
max-width 480px "Amsterdam, Utrecht, Amersfoort, Rotterdam, Eindhoven en
Zwolle zijn bezet. Alle andere steden en regio's staan open — van Groningen
tot Maastricht. Twijfel je of jouw regio past? Vraag het gewoon in het
formulier." (WARNING: ours, from `citiesWithCoach`: "Amsterdam, Utrecht en
Amersfoort zijn bezet." and honest: only Amsterdam is real; the sentence must
be generated from the roster, and the placeholder cities are a known risk
until the flip.) Pills (lavender-small): "Groningen", "Arnhem / Nijmegen",
"Den Haag / Leiden", "Breda / Tilburg", "Maastricht", "Leeuwarden", and amber
"…of stel jouw regio voor". Lavender box (`margin-top:28px; max-width:480px`)
"Hoe het verder gaat" / "Na je aanmelding plannen we een kennismakingsgesprek
met een van de vijf eigenaren. Klikt het van beide kanten? Dan bespreken we de
licentie, je regio en de onboarding in de methode."
Right: form card (3.19, word coach set).

Compact footer: Home, Coaches, Word coach.

### 4.10 kaart-nl

Not a page; the map iframe. Fully described in 3.24. Its two screenshots are
blank because the CDN was unreachable; there is no visual reference beyond
the code.

---

## 5. Interactions (the `text/x-dc` scripts)

Each client page embeds `class Component extends DCLogic` with
`componentDidMount` and `renderVals`. What they do, and how to rebuild them:

1. **Reveal observer** (all pages except Artikelen and Tarieven).
   `IntersectionObserver(threshold 0.1)` adds class `on` and unobserves. The
   home page uses threshold 0.15 and also a `MutationObserver` on `body` to
   pick up elements rendered later (the `sc-for` items). React: a `Reveal`
   wrapper with a `ref` and a `useEffect`; no MutationObserver needed. See
   3.22.

2. **Hero three.js** (home). Described in 3.23. Rebuild as `HeroLines`
   client component with SVG or canvas, `requestAnimationFrame`, pause when
   off screen, static under reduced motion, cleanup on unmount.

3. **Region picker state** (home). `state.city` defaults to `'Amsterdam'`;
   `cities` array maps to chips with bg/fg swapped for the selected one and a
   `pick` handler; `coach` is looked up by city from a hard-coded map of seven
   invented entries. React: `useState(citiesWithCoach[0].slug)`, chips with
   `aria-pressed`, coach row from `getCity(slug).coach`. Keyboard: chips are
   `<button type="button">`.

4. **Region filter state** (Coaches). `state.filter` defaults to `'Alle'`;
   `coaches` is `all` or `all.filter(c => c.city === filter)`. React: same
   shape; filter over `coaches` by `city.coach.slug` membership; announce the
   count in a visually hidden `aria-live` region ("3 coaches"). Preserve card
   `id={slug}` anchors.

5. **Intake form** (Janneke). State `name, email, wie, vorm, msg, sent, err`;
   `submit` validates `name.trim()` and `email.includes('@')`, sets `err` or
   `sent`. No network. React: use `useActionState` with the existing
   `requestIntake` server action (`app/actions.ts`), which already validates
   and routes to a coach; map the client's field names to the action's
   (`naam`, `email`, `bericht`, plus `voor` hidden route); the two selects
   ("voor wie", "voorkeur") are new fields: add them to the action's schema or
   fold them into `bericht` as a prefix. The `sent` branch renders the
   confirmation block.

6. **Coach application form** (Word coach). Same pattern; validation adds
   `regio.trim()`. Needs a new server action and an inbox (see 3.19 WARNING).

7. **Price display settings** (home, `data-props`):
   - `prijsWeergave`: enum `"In het traject"` (default) | `"Losse strip"` |
     `"Verborgen"`. Controls which of the panel / strip / nothing renders.
   - `trajectPrijs`: int, default 649, range 0..2000, unit €. Printed in the
     panel and strip; `perGesprek = round(prijs/4)` is computed but unused.
   - `toonScan`: boolean, default true. Shows the scan line in the price card.
   Word coach: `licentiePrijs`: int, default 750, range 0..5000.
   GESPREK.md section 4 calls these "tweakbare instellingen". Ours: a single
   `app/pricing.ts` (or in `site-config.ts`) exporting
   `{ scan: 249, traject: 649, extraGesprek: 89, licentieIndicatie: 750,
   homePriceDisplay: "panel" | "strip" | "hidden", showScanOnHome: true }`,
   imported by Home, Tarieven, Word coach and the FAQ, so a number lives
   once. Report this as a shared need (Foundation owns shared files).

8. **Ticker** is CSS only (keyframes), no script.

9. **Map** (kaart-nl): async d3 script described in 3.24; rebuild as static
   SVG + CSS animations.

---

## 6. Route map

### 6.1 Client page → repo route

| Client export | Route | Status |
|---|---|---|
| homepage-definitief-v4 | `/` | exists, rebuild |
| het-traject | `/studiekeuzetraject` | exists, rebuild |
| voor-wie | `/voor-wie` | NEW |
| coaches (+ kaart-nl) | `/studiekeuzecoaches` | exists, rebuild |
| coach-janneke | `/studiekeuzecoaches/[coach]` | NEW (dynamic, `generateStaticParams` over `coaches`) |
| wie-zijn-wij | `/over-ons` | NEW (old `/over-ons/` URL: check `docs/url-map.csv`; it was a redirect source) |
| artikelen | `/artikelen` | exists, rebuild |
| tarieven-v3 | `/tarieven` | NEW |
| word-coach | `/coach-worden` | NEW (url-map marks the old `/vacatures/` → `/coach-worden` as redirect, so the page must exist) |

New routes must be registered by the Integrate phase (`staticPaths` in
`app/sitemap.ts`, `python3 scripts/build-url-map.py`). Report in `newRoutes`.

Nav targets for the CTA: `/studiekeuzecoaches` everywhere; on a coach profile
`#intake`; on `/coach-worden` "Meld je aan als coach" → `#aanmelden`.

### 6.2 Pages without a client template, and what they borrow

Each page below keeps its content (it was written from the archive and
passed review) and adopts the new system: paper background, Bricolage
headings, Figtree body, mono eyebrows, pill buttons, 1160px container, the
new nav and footer, reveal on sections. The ochre poster dies; its job (one
loud heading plus an "Op deze pagina" index) is kept in the new hero type.

Define two hero types for these pages:

- **Hero A, "page hero with index"** (from the client's traject / voor-wie
  hero geometry, 1.2fr 1fr, but the right column holds the index instead of
  a stock photo): eyebrow, h1 (page h1 scale, 50px), lead (17px muted),
  buttons (`violet` + `outline-ink`), and on the right a paper card
  (`background:#fff; border:1px solid #eae6dc; border-radius:24px; padding:
  28px 32px`) headed by a small mono eyebrow "Op deze pagina" with the jump
  links as 44px rows separated by hairlines, violet on hover. Below `lg` the
  index moves under the lead as a horizontal pill row (lavender pills).
- **Hero B, "short hero"** (from the client's tarieven / artikelen hero):
  eyebrow, h1, lead, no buttons or one; used where the page is one list.

Define the reading pattern: **reading rows** keep the current
`readingRow` grid (`lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]`, h2 left,
text right, `border-top:1px solid #eae6dc`, `py-12 md:py-16`), restyled: h2
at section scale 700 36px Bricolage, body 17px/1.7 `#3a3760`, links violet
700 with ` →`. This is the client's "Waarom is de juiste studiekeuze zo
belangrijk?" two-column layout repeated per section, which is already the
repo's shape.

Define the closing: every page ends with the **CTA band** (3.14, "Begin met
een gesprek. / Het kost je niets.") followed by the existing
`ContactSection` logic (form only when a coach is known), restyled as a
lavender panel (`#efebff`, radius 28, padding 52px, grid 1fr 1fr) holding
either the form card (3.19, ink) or the three numbered steps + "Kies je stad"
button. Then the footer.

| Route | Today (page.tsx / component) | Borrows |
|---|---|---|
| `/locaties` | ochre poster (eyebrow, h1 "Locaties", lead) + hairline list of cities with coach (city link + "{coach}, studiekeuzecoach voor {region}") + paper-shade block "Hier zoeken we nog" + ochre "Staat jouw stad er niet bij?" band with "Bekijk de coaches" | Hero B with the NL map (3.24) in the right column (this is where the map earns its keep: it is the location page); the city list as the client's **coach cards** (3.16) one per city, card title = city name, tag = coach name, body = region sentence, buttons "Bekijk {stad}" → `/locaties/{slug}` and "Coach" → `/studiekeuzecoaches/{slug}`; "Hier zoeken we nog" as a lavender panel with `pill-lavender` city pills and one line; close with the CTA band ("Staat jouw stad er niet bij?" as the h2, buttons "Bekijk de coaches" / "Online kan ook" → `/studiekeuzecoaches`) + compact contact steps |
| `/locaties/[stad]` | ochre poster with breadcrumb, two-line h1 ("Studiekeuzeadvies in" / city), lead, buttons, "Op deze pagina" index; paper-shade coach section (portrait 340px + name + intro + werkgebied dl + "Lees meer"); paper reading rows "Je eerste studiekeuze" / "Verkeerde studiekeuze gemaakt?" from `cityCopy`; ochre "Waar spreken we af?" band with `CityMap` (Google embed, consent); `ContactSection city=` (form when coach) | Hero A (breadcrumb as a mono eyebrow "Locaties / {stad}", h1 keeps the two voices: 16px mono-ish lead line then the city at page h1 scale); coach block as the **coach profile hero** (3.17) in miniature: grid `1fr 400px`, portrait 4/5 radius 26 with the glass caption, pills "{stad} + online", the coach's intro 18px, button "Maak kennis met {naam}" → `/studiekeuzecoaches/{slug}`; the two reading rows unchanged in shape; "Waar spreken we af?" as a **lavender panel** (radius 28) with the text left and the `CityMap` right (keep the Google embed and consent placeholder, square below `sm` per decision 2026-08-17); close with the CTA band + contact section (the **form card** 3.19 sticky is not needed here; inline) |
| `/[artikel]` (`mdx-components.tsx`) | ochre masthead (eyebrow link "Artikelen", h1 headline scale, date, section index row), paper reading room (sticky `ArticleIndex` in a 20rem margin, body max 68ch), ochre "Kom je er zelf niet uit?" band, `ReadAlso`, `ContactSection` | Masthead on paper: Hero B with the **article tag + mono date** row from the article card (3.18) above the h1 (h1 at 52px/1.06 -0.028em, max 16ch), a `border-top:1.5px solid #1e1b4b` rule under the masthead as on the Artikelen grid; reading room unchanged (body 17px/1.75 `#3a3760`, h2 700 28px Bricolage with the hairline rule above, h3 700 21px, bullets as violet 6px squares, blockquote as the client's **lavender info box** radius 16 padding 24px 28px, links violet); `ArticleIndex` restyled: active item violet 700 with a 16x3px violet bar; "Kom je er zelf niet uit?" as the **tarieven lavender CTA** (3.14 variant, grid 1.4fr 1fr, button `violet`); `ReadAlso` as two **article cards** (3.18); close with the contact steps |
| `/veelgestelde-vragen` | ochre poster (eyebrow, h1 "Veelgestelde vragen", lead + second paragraph, buttons "Kies je stad" / "Lees hoe het traject werkt", index of all questions), paper reading rows per question (open answers, link row), ochre "Staat je vraag er niet bij?" band, `ContactSection` | Hero A with the question index in the right card; questions as reading rows (open, never an accordion: decision 2026-08-05), h2 at 700 24px (the client's tarieven CTA title scale, because eight 36px headings would shout); add a price question that repeats `/tarieven` (see 4.8 note); close with the CTA band (h2 "Staat je vraag er niet bij?", span "Stel hem in het intakegesprek.") + contact steps |
| `/ervaringen` | ochre poster (eyebrow, h1, long honest lead, second paragraph, buttons, index), paper-shade "Over deze verhalen" row, paper list of stories in reading rows (figcaption name + meta left, blockquote right, short ones at lead size), ochre "En jouw verhaal dan?" band, `ContactSection` | Hero A; "Over deze verhalen" as a **lavender info panel** (radius 24, padding 36px, max 720px); stories as the client's **testimonial block** (3.13) without portraits: coral `"` mark, quote 600 24px/1.35 Bricolage (32px only for the two short dated quotes), name + meta 14.5px muted, on hairline rows with `py-12`; close with the CTA band ("En jouw verhaal dan?") + contact steps |
| `/eerste-studiekeuze`, `/verkeerde-studiekeuze` (`situation-page.tsx`) | ochre poster with index, paper reading rows per section (with link lists), "Hoe ziet dit traject eruit?" row with the four themes as a 2-col numbered list, ochre invitation band, `ReadAlso`, `ContactSection` | Hero A (the situation card colour of `/voor-wie` 4.3 as an accent: a violet eyebrow for eerste, a coral eyebrow for verkeerde); reading rows; the four themes as the client's **01-04 step columns** (3.11, no hover, numbers sand-line with 04 violet); invitation as the CTA band; `ReadAlso` as article cards; contact steps |
| `/studiekeuze-met-add-adhd` (same component) | as above | as above, with the white `border:1.5px solid #1e1b4b` accent of the third situation card for its hero index card; keep scope ADD and ADHD (decision 2026-08-05) |
| `/hbo-opleiding-kiezen`, `/mbo-opleiding-kiezen`, `/wo-opleiding-kiezen` (`level-page.tsx`) | ochre poster with two-voice h1 (lead line + level), index; reading rows; "Past een ander niveau beter?" row with links; "Hoe werkt het traject?" themes; ochre "Waar sta jij nu?" doors (two rows); ochre invitation; `ReadAlso`; `ContactSection` | Hero A with the two-voice h1 (small line at 17px mono eyebrow style, level word at page h1 scale); reading rows; "Past een ander niveau beter?" as three **pill-lavender** links in a row; themes as 01-04 columns; "Waar sta jij nu?" as the two client **situation cards** (violet and ink) from 4.3; CTA band; article cards; contact steps |
| `not-found` | ochre poster: eyebrow "404", h1 "Deze pagina bestaat niet", lead, two links | Hero B on paper: mono eyebrow "404", h1 at hero scale, lead, buttons `violet` "Naar de homepagina" → `/` and `outline-ink` "Alle locaties" → `/locaties`; then the footer. No CTA band |

Shared text to keep: the contact steps ("Kies de stad waar je begeleiding
wilt." etc.), the link label rule from `contact-section.tsx` ("Plan een gratis
intakegesprek" only where a form is; "Begin met een gesprek" where the route
is; "Zoek een coach in de buurt" where a city has no coach). The client's
label "Plan gratis intake bij een coach" → `/studiekeuzecoaches` satisfies the
rule because the Coaches page leads to a form on a coach profile.

---

## 7. What the client's 390px rendering gets wrong (do not copy)

Observed in every `*-390.jpg`:

1. **Nav**: the seven links and the CTA stay on one line (`white-space:
   nowrap`), overflow the viewport and push the page to about 920px wide; the
   whole page then scrolls horizontally (screenshots are 919 to 945px wide).
   Never reproduce: collapse to a menu below `lg` (3.2).
2. **Heroes**: the `1.25fr 1fr` grid is kept, so the text column is 190px
   wide: one or two words per line in the h1, the floating quote card and the
   coral badge overlap the text, and the photo column is a 120px sliver. Rule:
   one column below `lg`, text first, image second at full width with
   `aspect-ratio:4/3` capped at `max-height:420px`; floating cards become
   static blocks under the image or are dropped below `md`.
3. **Buttons**: two buttons in a `display:flex` row with no wrap; each wraps
   to five lines and becomes a tall oval. Rule: `flex-wrap:wrap; gap:12px`,
   and below 400px each button `width:100%`.
4. **Step columns 01-04**: `repeat(4,1fr)` stays, 60px columns, words broken
   mid-word. Rule: 1 → 2 → 4 columns at base / `sm` / `lg`.
5. **Price panel and two-tone panel**: two columns kept at 150px each; the
   ink panel becomes a 1400px-tall strip. Rule: one column below `lg`.
6. **Three-column card grids** (tarieven, coaches, situations, value rows):
   kept at three columns, 90px each, one word per line, "Bij te boeken na scan
   of traject" becomes a vertical oval. Rule: one column below `sm` (coaches
   two from `sm`), three from `lg`.
7. **Two-column reading layout** (Waarom belangrijk, verhaal, testen,
   KeuzeScan, Janneke story + form): the right column is 110px wide and a
   paragraph becomes a 1200px-tall ribbon. Rule: one column below `lg`;
   sticky sidebars become static and move above the long text.
8. **Keuze-type rows** and **article cards**: two columns of 150px, checks
   wrapping. Rule: one column below `md`.
9. **Gesprek cards** `80px 1.2fr 1fr`: three columns at 390px. Rule in 3.12.
10. **Forms**: the form card keeps `400px`/`440px` fixed columns; it either
    overflows or compresses. Rule: the form card is `width:100%`, `max-width:
    480px` centred below `lg`.
11. **Footer**: the footer is a 390px box inside a 920px page (the screenshot
    shows the ink ending at 40% width). Rule: `width:100%`, grid collapse.
12. **Map frame**: `height:520px` fixed on a 150px-wide column. Rule:
    `aspect-ratio:13/14`, `width:100%`, height auto; the SVG scales by
    viewBox.
13. **Hero quote card** with `left:-26px` and badge with `right:-18px` bleed
    outside the container and create horizontal scroll. Rule: no negative
    offsets below `lg`; `overflow-x:clip` on the hero as a safety net, never
    on `body`.
14. **Ticker**: fine on mobile as a strip, but `width:max-content` inside an
    overflowing page doubles the scroll width; `overflow:hidden` on the
    strip is required and present; keep it.
15. **Type sizes** do not scale: 58px h1 at 390px. Rule: the clamp() values in
    2.2.

Responsive rules (summary for every implementer):

- Breakpoints: Tailwind defaults `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
  Page gutter `px-5` (20px) below `sm`, `px-8` at `sm`, `px-12` (48px) at `lg`.
  Container `max-w-[1160px] mx-auto`.
- Section padding: desktop values from 1.2 at `lg`; at base use about 60% (a
  `88px` becomes `56px`, `72px` becomes `48px`, `48px` panel padding becomes
  `24px`).
- Every grid starts at `grid-cols-1`. Two-up grids go `md:grid-cols-2`.
  Three-up go `sm:grid-cols-2 lg:grid-cols-3` (cards) or `lg:grid-cols-3`
  (value rows). Four-up go `sm:grid-cols-2 lg:grid-cols-4`. Asymmetric hero
  grids (`1.2fr 1fr`) go `lg:grid-cols-[1.2fr_1fr]`.
- Images: `width:100%; height:auto`, `next/image` with `sizes` written per
  slot; never a fixed height.
- Touch targets 44px: nav items, chips, footer links, card buttons, form
  controls (`min-h-11` or `min-h-12`).
- Fluid type with the clamp() values; body floor 16px on cards and 17px in
  reading columns.
- No horizontal overflow at 320px: test at 320, 390, 768, 1024, 1280, 1440.
  Long words in h1 ("studiekeuzecoach", "Veelgestelde", "geïnformeerd") may
  drop one clamp step below `sm` (decision 2026-08-05 allows it) and get
  `overflow-wrap:anywhere` as a last resort only on h1.
- Motion: reveal, ticker, hero lines, pulse rings and hover lifts all stop
  under `prefers-reduced-motion: reduce`; only `transform` and `opacity`
  animate; hover effects only under `@media (hover:hover)`.
- Sticky: nav always; the Janneke form only from `lg`; `scroll-margin-top`
  on every `[id]` becomes `calc(72px + 1rem)` because the nav is sticky now
  (globals.css has 2.5rem today; Foundation to change).

---

## 8. Open questions

1. **Footer variant.** One full footer on every page (recommended) or the
   client's full-on-home, compact-elsewhere? Recommended: one full footer
   with the true link set (no "Decanen", no central "Contactformulier").
2. **Coach voice and surname.** Decisions of 2026-08-05 and 2026-08-06 say
   third person and first name only. The client's Janneke page is first
   person ("Hoi, ik ben Janneke van den Brand") and uses the surname. Since
   the client is Janneke and she wrote it, the recommendation is: first
   person and full name on her own profile page only, third person and first
   name on the roster and city pages; record the reversal in
   docs/decisions.md.
3. **"Binnen twee werkdagen"** on Janneke's form: confirmed by her? Until then
   drop the line (the existing IntakeForm makes no time promise).
4. **Moya's line** "koos na haar herstart voor Toegepaste Psychologie": not in
   the archive quote. Print only "Moya (22), traject afgerond in maart 2024"
   unless the client confirms.
5. **Hero photos** on traject, voor-wie, over-ons: the only allowed scene image
   is `hero-gesprek.jpg`, and the rule says "hero only" (written for the home
   hero). Use it on other heroes, or go without photos? Recommended: without
   (one column, `max-width:720px`), and ask the client for real photos
   (GESPREK.md section 5 already lists this).
6. **Product name**: "KeuzeScan" (traject page) vs "Studiekeuzescan" (tarieven,
   home). Recommended: "Studiekeuzescan" everywhere.
7. **Parents section** on `/voor-wie`: the home panel links "Informatie voor
   ouders" there, and the page has no parent block. Add one (recommended) or
   retarget the link to the home panel itself.
8. **Janneke's work area**: `janneke.region` is "Amsterdam en Amstelveen"; her
   page lists ten towns. Which is the canonical list for the city page and the
   footer? Recommended: keep `region` short for headings and add the long list
   to her profile data only.
9. **Tests supplier** "TalentDrives, 30+ jaar": the client's claim, allowed as
   the client's copy, but it must go into docs/decisions.md with the date the
   "no tests" decision was reversed (2026-08-12).
10. **Coach application inbox**: `coachRecruitmentInbox` is null; the Word
    coach form cannot send. Who receives applications?
11. **Licence amount** ± € 750 is an indication by the client's own words;
    print with "indicatie" or wait? The client printed it; keep it, one
    constant.
12. **"Meest gekozen"** badge: replace with "Aanbevolen" until sales data
    exists? Recommended yes.
13. **Algemene voorwaarden / Privacy** pages do not exist; the legal line
    names them. Build `/privacy` and `/algemene-voorwaarden` (content from the
    client) or drop the words.
14. **Article categories**: the client's tags (Aanmelden, Regelingen, Open
    dagen, Keuzeproces) need a `category` field in `app/articles.ts` for all
    63 articles, or the cards show only the date.
