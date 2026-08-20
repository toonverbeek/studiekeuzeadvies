---
name: Studiekeuzeadvies.nl
description: Violet and indigo on warm paper, with one coral point per screen. The client's "Stap" identity, as built.
colors:
  paper: "#faf8f4"
  ink: "#1e1b4b"
  violet: "#6d4aff"
  violet-dark: "#5a38e6"
  violet-light: "#8f75ff"
  lavender: "#efebff"
  lavender-ink: "#b9b3e8"
  lavender-soft: "#cfc2ff"
  coral: "#ff6b4a"
  coral-text: "#d84a26"
  coral-soft: "#ffb3a0"
  coral-tint: "#fff1ec"
  amber: "#ffc94d"
  amber-tint: "#fff7e0"
  amber-ink: "#a97c00"
  muted: "#4d4a6b"
  muted-read: "#3a3760"
  hairline: "#eae6dc"
  hairline-ink: "#322e63"
  chip-border: "#d9d0f5"
  sand-line: "#d9d3c7"
  photo-line: "#e2dcf2"
  photo-line-warm: "#f5d9d0"
  error: "#c0341a"
  card-white: "#ffffff"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 1.6rem + 3.9vw, 3.625rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 1.5rem + 3.2vw, 3.125rem)"
    fontWeight: 700
    lineHeight: 1.07
    letterSpacing: "-0.028em"
  section:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.25rem + 2vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  price:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.8rem + 2.2vw, 2.875rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.09375rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.78125rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  pill: "99px"
  panel: "28px"
  photo: "26px"
  card: "24px"
  card-sm: "22px"
  inner: "20px"
  box: "16px"
  row: "14px"
  field: "12px"
spacing:
  gutter-sm: "24px"
  gutter-md: "32px"
  gutter-lg: "48px"
  section-sm: "56px"
  section-md: "72px"
  section-lg: "88px"
  card-pad: "28px"
  card-pad-lg: "32px"
  panel-pad: "52px"
  grid-gap: "22px"
components:
  button-primary:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.violet-dark}"
    textColor: "{colors.card-white}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "44px"
  button-dark-hover:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.paper}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "44px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.violet}"
    padding: "0"
  pill-lavender:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.violet-dark}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
  pill-glass:
    backgroundColor: "rgba(255,255,255,0.1)"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
  pill-coral:
    backgroundColor: "{colors.coral-tint}"
    textColor: "{colors.coral-text}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
  pill-amber:
    backgroundColor: "{colors.amber-tint}"
    textColor: "{colors.amber-ink}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
  badge-amber:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
  card-default:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  card-indigo:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  card-lavender:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad}"
  card-dashed:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
    height: "48px"
  nav-link-active:
    backgroundColor: "transparent"
    textColor: "{colors.violet}"
    typography: "{typography.body}"
    padding: "8px 0"
---

# Design System: Studiekeuzeadvies.nl

## 1. Overview

**Creative North Star: "The Staircase on Warm Paper"**

The client drew the identity and named it "Stap": a violet path that climbs in
three steps and ends in one coral dot. That drawing is the whole system. The
page is warm paper, the same warm paper the reader has always read on. The
violet is the path forward: the button, the link, the label, the active page.
Indigo is where the path gets serious: the price, the promise, the form, the
footer. Coral is the dot at the top, one point per screen and no more. Amber is
the check mark that only appears on the dark.

The surface is round and calm. Every button, pill, chip and badge is a full pill
at 99px. Every card is a 24px rectangle with a 1px warm hairline, and every big
panel is 28px. Nothing is sharp, nothing is boxed in a border of three colours,
and nothing floats without a reason: a card lifts only when it is an object you
can pick up, such as the featured price card, the intake form or a violet
button. Density stays low, because the reader is 17 and worried, or 45 and
reading at night, and hurry is the emotion this site has to remove.

The system rejects, by name, the looks PRODUCT.md bans: the corporate
consultancy, the government website, the SaaS landing page, the gamified app,
and the old site's own bar of three statistics. One line of that list was
overruled on 2026-08-20: PRODUCT.md warned against a "purple accent", and the
client's identity is violet. The ban that stands is the *SaaS* purple, a
gradient hero with a violet glow and a row of icon cards. Flat violet on warm
paper, carrying the path from the logo to the button, is the brand.

**Key Characteristics:**
- Warm paper carries the reading. The identity changed in 2026; the paper did not.
- Violet is the path, indigo is the weight, coral is the single point, amber is the mark on dark.
- Everything is round: pills at 99px, cards at 24px, panels at 28px.
- Three families, three jobs: Bricolage speaks, Figtree reads, Plex Mono labels.
- Flat on paper, lifted only where an object is meant to be an object.
- Two motions on the whole site: a 24px rise on arrival, and a pulse on a map pin.
- 17px is the floor for anything a person reads, on every screen size.

## 2. Colors

Violet and indigo on warm paper, with coral and amber as the only two accents.
The tokens live in the `@theme` block of `app/globals.css` and are the single
source; the names below are the class names a page writes.

### Primary
- **Violet** (`#6d4aff`, `bg-violet` / `text-violet`): the path. Primary button, link, mono eyebrow, active nav item, check mark on paper, the second half of the wordmark, the logo path. 4.9:1 on paper, so it may carry 13px bold labels and links.
- **Violet Dark** (`#5a38e6`, `violet-dark`): the hover of every violet button, and the only violet allowed as text on lavender. Violet on lavender is 4.4:1 and fails; violet-dark is 5.6:1 and the eye cannot tell them apart.
- **Violet Light** (`#8f75ff`, `violet-light`): the logo path on an ink surface, and the halftone dots of the map.
- **Lavender** (`#efebff`): soft emphasis. The big quiet panel, the pill on paper, the tag, the halo behind a map label. It is a surface, never a text colour.
- **Lavender Ink** (`#b9b3e8`) and **Lavender Soft** (`#cfc2ff`): the two texts that live on dark. Lavender-ink is body text on ink at 7.9:1; lavender-soft is the eyebrow on a violet surface.

### Secondary
- **Coral** (`#ff6b4a`): the dot at the top of the staircase. Map pins, the dot in a badge, an accent rule, a display numeral, the big quote mark. Decoration and large display only.
- **Coral Text** (`#d84a26`, `coral-text`): the same accent where it has to be read. Plain coral on white is 2.9:1 and fails every text test.
- **Coral Tint** (`#fff1ec`) and **Coral Soft** (`#ffb3a0`): the coral pill on paper, and the error text on ink (8.9:1).

### Tertiary
- **Amber** (`#ffc94d`): the mark on dark. Check marks and arrows on an indigo panel, the badge on a price card, the accent border of a callout, the numerals of a short list. Never text.
- **Amber Tint** (`#fff7e0`) with **Amber Ink** (`#a97c00`): the amber pill, 4.6:1 and readable.

### Neutral
- **Paper** (`#faf8f4`): the page. Also the text colour on ink and on violet, and the background of an input.
- **Ink** (`#1e1b4b`): all body text on paper, and every dark surface: the price panel, the form card, the footer, the cookie bar, the featured card.
- **Muted** (`#4d4a6b`): every secondary sentence on paper, at 7.6:1. **Muted Read** (`#3a3760`): the same job in a long reading column.
- **Hairline** (`#eae6dc`): the 1px border of a card, the rule under the nav, a divider. **Hairline Ink** (`#322e63`): that rule on an ink surface.
- **Chip Border** (`#d9d0f5`), **Sand Line** (`#d9d3c7`), **Photo Line** (`#e2dcf2` and `#f5d9d0`): the three 1px to 1.5px outlines, for a violet chip, a warm outline button, and the frame around a photo.
- **White** (`#ffffff`): a card lifted off the paper, and the label on a violet button. Nothing else. `#000` appears nowhere.

### Named Rules

**The One Coral Rule.** Coral is one point per screen. A hero badge dot, or a
map pin cluster, or one display numeral: not all three. If a screen has two
coral moments, the second one is amber, violet or nothing. Its rarity is the
whole effect.

**The Coral Is Not Text Rule.** `#ff6b4a` is forbidden as text below 18px on
paper or on white. Use `#d84a26`. Keep `#ff6b4a` for dots, pins, borders, big
display numerals and the quote mark.

**The Indigo Rule.** An ink panel means money or a conclusion: the price, what
is included, the intake form, the summary card, the footer, the cookie bar. An
ink panel that carries a normal paragraph is a decoration and is wrong. On that
surface the check mark turns amber and the body text turns lavender-ink.

**The Lavender Rule.** Lavender is soft emphasis, never a shout. It is the panel
you would otherwise have given a border, and the pill you would otherwise have
given a colour. Text on lavender is ink or violet-dark, never violet.

**The Warm Paper Rule.** Long text is ink or muted-read on `#faf8f4`, always.
Colour marks where the reading stops and the offer starts.

## 3. Typography

**Display Font:** Bricolage Grotesque (with `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Figtree (with `ui-sans-serif, system-ui, sans-serif`)
**Label/Mono Font:** IBM Plex Mono (with `ui-monospace, SFMono-Regular, Menlo, monospace`)

**Character:** Bricolage is a wide, slightly irregular grotesque that speaks the
headings, the prices and the numerals; it carries the personality so the reading
text does not have to. Figtree is a plain humanist sans that disappears at 17px
in the dark. Plex Mono appears only in a small uppercase label, where it reads as
a stamp and not as a costume. All three arrive through `next/font/google` in
`app/layout.tsx` with the `latin` and `latin-ext` subsets, because Dutch copy
carries ï, ë and é.

### Hierarchy
- **Hero** (`text-hero`, 700, `clamp(38px, …, 58px)`, line-height 1.04, tracking -0.028em): the one sentence at the top of the home page.
- **H1** (`text-h1`, 700, `clamp(34px, …, 50px)`, 1.07): the title of every other page. One per page.
- **H2** (`text-h2` 26 to 36px, `text-h2-lg` 28 to 40px, 700, 1.08 to 1.1): a section title, and the two-line heading of a closing band.
- **H3 / H4** (`text-h3` 24 to 32px, `text-h4` 22 to 30px): a panel heading inside a section.
- **Title** (`text-title` 21px, `text-title-sm` 19px, `text-title-lg` 20 to 24px, 700): a card title, a coach name, a step title, an article title.
- **Price and Numeral** (`text-price` 36 to 46px, `text-numeral` 36 to 44px, 700, tracking -0.03em): a price figure, a step number. Bricolage, never Figtree.
- **Lead** (`text-lead`, 17.5px, 1.62, muted): the sentence under an h1.
- **Body** (`text-body`, 17px, 1.65) and **Read** (`text-read`, 17px, 1.75): everything a person reads. Cap a reading column at `max-w-read` (68ch).
- **Card** (`text-card`, 15px, 1.6): the short text inside a card, which is three lines and not a paragraph.
- **Small** (`text-small`, 13.5px) and **Micro** (`text-micro`, 12.5px): a pill, a caption, a footer link, a legal line, a form helper.
- **Eyebrow** (`eyebrow` utility with `text-eyebrow` 12.5px or `text-eyebrow-sm` 11.5px, mono 500, uppercase, 0.1em): the label above a heading. Violet on paper, coral on a warm accent, lavender-ink on ink, lavender-soft on violet.

### Named Rules

**The Night Reading Rule.** Body text is 17px or more, on every screen, always.
The client's export sets paragraphs at 14.5px to 16.5px; that is a design of the
desktop mock, not a rule of this site, and PRODUCT.md wins. Display roles are
fluid with `clamp()`, text roles are fixed, so nothing scales the floor down.

**The Three Jobs Rule.** Bricolage sets headings, titles, prices and numerals.
Figtree sets sentences, buttons, inputs and chips. Plex Mono sets uppercase
labels, dates and meta lines, and nothing longer than five words. A family that
takes another family's job is a defect.

**The Balance Rule.** Every heading gets `text-wrap: balance`, every paragraph
gets `text-wrap: pretty`. Both are set once in the base layer.

**The Long Word Rule.** A Dutch compound ("studiekeuzecoach", "Veelgestelde")
may drop one clamp step below `sm`. `overflow-wrap: anywhere` is a last resort
and only on an h1.

## 4. Elevation

A hybrid, and the split is strict. On paper, surfaces are flat: a card is white
with a 1px `#eae6dc` hairline and no shadow, and two sections separate by tone,
not by lift. A shadow appears only where the design means a physical object: a
violet button that must sit above the page, the featured price card, the intake
form card, a portrait, the map frame, and a card under the pointer. The nine
shadows are tokens in `app/globals.css`; do not invent a tenth.

### Shadow Vocabulary
- **`shadow-violet`** (`0 8px 24px rgb(109 74 255 / 0.3)`): every primary violet button on paper. `shadow-violet-strong` (0.35) inside a price card or a form.
- **`shadow-ink-card`** (`0 18px 44px rgb(30 27 75 / 0.25)`): the featured price card.
- **`shadow-ink-form`** (`0 18px 48px rgb(30 27 75 / 0.22)`): an intake or application form card.
- **`shadow-portrait`** (`0 18px 48px rgb(30 27 75 / 0.16)`): a coach portrait.
- **`shadow-price-inner`** (`0 18px 44px rgb(0 0 0 / 0.22)`): the paper card inside an ink panel.
- **`shadow-quote`** (`0 14px 34px rgb(30 27 75 / 0.25)`): the floating quote card on a hero.
- **`shadow-map`** (`0 14px 40px rgb(30 27 75 / 0.1)`): the map frame.
- **`shadow-card-hover`** (`0 12px 32px rgb(30 27 75 / 0.1)`): the only hover shadow, through the `hover-lift` utility.

### Named Rules

**The Object Rule.** A shadow says "this is a thing you can take". A price card,
a form, a portrait, a button. A section, a panel and a paragraph are not things.
If a surface needs a shadow to be understood, the layout is wrong; fix it with
tone or space.

**The One Hover Rule.** The only hover lift is the `hover-lift` utility: 4px up
plus `shadow-card-hover`, 350ms, inside `@media (hover: hover)` so a finger
never triggers it. No other element grows, glows or tilts.

**The Focus Rule.** The focus ring is 3px solid violet with a 3px offset, and it
turns paper on an ink or violet surface. It is never removed, never thinner, and
never replaced by a colour change.

## 5. Components

Everything below is built once in `app/components/ui.tsx` and imported. A page
never hand writes a pill, a card or a section rhythm.

### Buttons
- **Shape:** a full pill (99px), minimum height 44px, `inline-flex`, centred label, colour transition of 150ms `ease-out-quart`. Two sizes: `md` (14.5px, in a card or a panel) and `lg` (15.5px, in a hero or a closing band).
- **Primary:** violet with `shadow-violet` and white bold text. Hover goes violet-dark.
- **Dark:** ink with paper text, 600 weight. Hover goes violet. This is the nav CTA and the second button on a light panel.
- **Outline:** 1.5px ink rule, no fill. Hover turns the rule and the text violet.
- **Ghost:** violet bold text, no padding, no pill. Write the arrow into the label ("Lees meer →"), never as a pseudo element.
- **Wrapping:** a button row is `flex-wrap: wrap` with a 12px gap, and below 420px each button is full width. The client's fixed row makes vertical ovals at 390px, which is the one thing a button must never do.

### Pills, Chips, Tags and Badges
- **Style:** pill radius, bold, 13.5px, 8px by 18px of padding. Five tones: `lavender` (default, violet-dark text), `white` (on a lavender panel), `glass` (white at 10% with a 20% inset ring, on ink), `coral` (coral tint with coral-text), `amber` (amber tint with amber-ink).
- **Badge:** the small label that sits on the edge of a card ("Aanbevolen"), amber on ink text, positioned by the card with `absolute -top-3.5 left-1/2 -translate-x-1/2`.
- **Rule:** a pill is a label, not a control. A pill that can be clicked is a chip and needs 44px of height and a real focus ring.

### Check rows
- **Style:** `flex gap-3`, a bold mark in a span with `aria-hidden`, and the text in a second span. Violet on paper, amber on ink, coral where the client asks.
- **Rule:** the marks are decoration. The rows sit in a real `ul`, so a screen reader reads a list and does not say "check" eight times.

### Cards and Panels
- **Corner style:** 24px for a card (`rounded-card`), 22px for a coach or article card, 28px for a big panel, 26px for a photo or a map frame, 20px for a card inside a panel, 16px for an info box, 14px for a list row, 12px for a field.
- **Four variants:** `default` (white, 1px hairline), `indigo` (ink with paper text: money and conclusions only), `lavender` (the big soft panel at 28px), `dashed` (1.5px dashed chip-border, for the one product that is an add-on).
- **Internal padding:** `sm` 24px, `md` 28px rising to 32px, `lg` 24px rising to 52px on a large panel.
- **Rule:** a card inside a card is forbidden. A card inside an ink *panel* is the one nesting the design allows, and it uses `rounded-inner` (20px).

### Inputs and Fields
- **Style:** 12px radius, paper background, 1px hairline, 16px text so iOS does not zoom, minimum 44px of height, Figtree inherited from the base layer.
- **Focus:** the global 3px violet ring, offset 3px. On the ink form card the ring turns paper.
- **Error:** `#c0341a` on paper, `coral-soft` on ink, with the message tied to the field by `aria-describedby`. A form never colours a field red and says nothing.

### Navigation
- **Style:** sticky at the top, paper at 0.9 alpha with a 10px backdrop blur, a hairline underneath, about 73px high. Full width, with the mark, the wordmark, seven links and one dark pill.
- **States:** a link is ink at 13.5px, 500 weight, and turns violet on hover. The current page is violet and bold, and carries `aria-current="page"`.
- **Mobile:** below `lg` the links collapse into a Menu button that opens a full width panel under the bar. Every row is at least 48px. Escape closes it, and it closes itself on arrival. The seven links never stay on one line: that is what breaks the client's own 390px rendering.
- **Footer:** ink, four columns, lavender-ink text, every link 44px high, one legal line above a `hairline-ink` rule.

### Signature: the Netherlands map
`app/components/nl-map.tsx` draws the country as a first-party inline SVG: a
halftone grid of violet-light dots inside the outline, a coral pin per city with
a paper stroke, a label with a lavender halo, and one pulse ring on the
highlighted city. It sits in a lavender frame at 26px with `shadow-map`. It
loads no script, sets no cookie and needs no consent question, and its sizes
follow a container query on its own frame, so the same component reads correctly
in a 520px panel and in a 245px column.

### Signature: the reveal
`Reveal` from `app/components/reveal.tsx` adds one class when a block reaches
10% of the viewport, and the CSS raises it 24px and fades it in over 700ms with
`--ease-reveal`. The hidden state lives behind `@media (prefers-reduced-motion:
no-preference) and (scripting: enabled)`, so a reader without JavaScript and a
reader who asked for less motion never see an empty block.

### Signature: the closing band
`CtaBand` ends every page: the mark (home only), a two-line heading whose second
line is violet, one sentence, and two buttons that go full width below 420px. It
is the same shape on every page, so the reader learns where the page ends.

## 6. Do's and Don'ts

### Do:
- **Do** build with the primitives in `app/components/ui.tsx`. One shape, one radius, one shadow, on every page.
- **Do** keep every reading size at 17px or more (`text-body`, `text-read`, `text-lead`), on a telephone as well.
- **Do** give an ink panel to money and to conclusions, and turn its check marks amber and its paragraphs lavender-ink.
- **Do** use lavender for soft emphasis, and `violet-dark` for any text on it.
- **Do** keep coral to one point per screen, and use `#d84a26` the moment it has to be read.
- **Do** write the mono eyebrow above a heading, uppercase, five words at most.
- **Do** start every grid at one column and add columns upward (`sm:grid-cols-2 lg:grid-cols-3`), and keep every touch target at 44px.
- **Do** animate `transform` and `opacity` only, and stop every motion under `prefers-reduced-motion: reduce`.
- **Do** test at 320, 390, 768, 1024, 1280 and 1440 with `scripts/screenshots.mjs`, and fix any sideways scroll before reporting done.
- **Do** print a number only when it is true of us. Fill the slot with a fact we own: gratis intake, MBO · HBO · WO, online of op locatie, the real number of cities in `app/cities.ts`.

### Don't:
- **Don't** make it look like **a corporate consultancy**: dark blue and gold, a photo of a handshake, "wij ontzorgen".
- **Don't** make it look like **a government website**: correct, grey, dense, with no person visible.
- **Don't** make it look like **a SaaS landing page**: a gradient hero, a row of three icon cards, big number statistics, "Get started free". PRODUCT.md also banned the "purple accent"; that one line is overruled by the client's own identity, dated 2026-08-20. Flat violet is the brand. A violet *gradient*, a violet glow, or violet as a decorative wash is still the SaaS look and is still banned.
- **Don't** make it look like **a gamified app**: a mascot, points, badges, a level bar, an animation after every action.
- **Don't** copy the old site's own template: a bar of three statistics under the hero (8,8 / 92% / "meest gevraagde partij"), or a city page that is one text with the city name changed.
- **Don't** print "8,8 gemiddeld", "1000+ trajecten per jaar", "92% studeert met plezier door", "92% kiest goed" or "35+ locaties", however the client's export writes them. We cannot prove one of them.
- **Don't** set body text below 17px, and never below 14px anywhere except a mono label or a legal line.
- **Don't** use `#ff6b4a` as small text, `#6d4aff` as text on lavender, `#8a85a8` as a date, or `#000` at all.
- **Don't** put a card inside a card, or give a section a shadow. Flat on paper is the default.
- **Don't** use a `border-left` or `border-right` heavier than 1px as a coloured stripe on a card, a list item or a callout. The client's export does it twice; use a full border, a tint, or a leading mark instead.
- **Don't** use gradient text (`background-clip: text`), glassmorphism as decoration, or a blur that is not the nav bar.
- **Don't** keep a fixed width, a fixed height or a negative offset below `lg`. Those four things are what make the client's 390px export scroll sideways.
- **Don't** open a modal, a popup or a newsletter overlay. The cookie bar asks one question, once, and it is a bar.
- **Don't** animate a layout property (`width`, `height`, `top`, `margin`), and don't let a hover effect fire on a touch device.
- **Don't** write an em dash in any interface text. Use a comma, a colon, a semicolon, a period or parentheses.
