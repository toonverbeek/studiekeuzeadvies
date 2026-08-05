---
name: Studiekeuzeadvies.nl
description: A warm ochre reading surface for parents who help a child select a study.
---

<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

# Design System: Studiekeuzeadvies.nl

## Overview

**Creative North Star: "The Kitchen Table Letter"**

It is half past ten in the evening. A 17 year old lies in bed with a telephone and reads a letter from a person who knows this subject and who does not want anything from them yet. Downstairs, a parent reads the same letter on a laptop. The paper is warm. The handwriting is not decorated. The letter says the difficult part out loud: this is expensive, this is hard, and you did not fail.

That is the whole system. One ochre color carries the surface, one sans family carries every word, and nothing moves unless the reader touches it. The color makes the page recognisable in two seconds. The type makes 1500 words readable at night on a small screen. The stillness makes a worried reader calm. Density is low and space is generous, because hurry is the emotion we must remove.

This system rejects, by name, the looks the brief bans: the corporate consultancy (dark blue, gold, a handshake photo), the government website (grey, dense, no person visible), the SaaS landing page (gradient hero, three icon cards, big number statistics, purple accent), and the gamified app (mascot, points, badges, animation on every action). It also stays away from the standard education template of soft blue and mint green with rounded shapes and stock photos of pupils who laugh. Every competitor is there. The reference that is correct is De Correspondent: a Dutch surface built to read long texts without hurry, where the author is visible and the page is quiet.

**Key Characteristics:**
- Ochre carries the page. It is the identity, not an accent.
- One sans family for every size. Hierarchy comes from weight and size, never from a second font.
- Long text always on warm paper, never on color.
- Flat surfaces. Depth comes from tone, not from shadow.
- Movement only as an answer to the reader.
- Warm neutrals. No pure black, no pure white, anywhere.

## Colors

A committed ochre and mustard palette on warm paper. The yellow is the brand; the neutrals are the reading room.

### Primary
- **Ochre** `[hue family selected, exact value to be resolved during implementation]`: fills whole zones. The header, the footer, the invitation section at the end of an article, the author block. It must cover 30 to 60 percent of the page when a reader scrolls through it. It is never used as a thin line or a small icon color only.
- **Deep Ochre** `[to be resolved during implementation]`: the darker step of the same hue. Used for text and links on ochre surfaces, and for hover states. It must give 4.5:1 contrast or better.

### Neutral
- **Warm Paper** `[to be resolved during implementation]`: the background of every reading surface. Warm, low chroma, tinted toward the ochre hue. Not white.
- **Warm Ink** `[to be resolved during implementation]`: body text. A very dark warm brown-grey, tinted toward the ochre hue. Not black.
- **Muted Ink** `[to be resolved during implementation]`: dates, captions, secondary text. Must stay at 4.5:1 or better on Warm Paper.
- **Hairline** `[to be resolved during implementation]`: a 1px warm border for separations. The only structure line in the system.

All values are made in OKLCH. Reduce chroma as lightness goes to the extremes. Every neutral is tinted toward the ochre hue with a chroma of 0.005 to 0.01.

### Named Rules

**The Ochre Carries It Rule.** The ochre fills complete sections from edge to edge. If the yellow appears only in a button and a link, the strategy failed and the page is Restrained, not Committed.

**The Reading Room Rule.** Article text never sits on ochre. Long text is always Warm Ink on Warm Paper. Color marks where the reading stops and the person starts to speak.

**The No Pure Rule.** `#000` and `#fff` are forbidden. Also `oklch(0% ...)` and `oklch(100% ...)`. Every neutral carries the brand hue.

## Typography

**Display Font:** `[one warm humanist sans, to be chosen at implementation]`
**Body Font:** the same family.
**Label/Mono Font:** none. A mono font on this brand reads as a costume.

**Character:** one warm humanist sans at every size. Humanist, so the letter shapes come from a written hand and not from a drawing compass. The family must have a real heavy weight (700 or more) and a good italic, because all emphasis must come from inside one family.

### Hierarchy
- **Display** (heavy weight, fluid `clamp()`, line-height near 1.05): the title of an article, and the one sentence at the top of a page. One idea per screen.
- **Headline** (heavy weight, line-height near 1.15): section titles inside a long article. They are the map for a reader who scans.
- **Title** (medium to semibold): the title of a card, an author name, a question in an FAQ.
- **Body** (regular, 17px minimum on a telephone, line-height 1.6 to 1.7, maximum 65 to 75 characters per line): the main product of this site.
- **Label** (medium, small, letter-spacing near 0.02em, sentence case): dates, reading time, categories. Never all capitals for more than three words.

### Named Rules

**The One Family Rule.** One family only. A second display font is forbidden. Steps in the scale differ by 1.25 times or more. A flat scale reads as an unfinished page.

**The Night Reading Rule.** Body text is 17px or more, also on the smallest telephone. One reader is 17 and reads in the dark, the other is 45 or more and reads at night. Both read in bed with low light.

**The Reflex Font Ban.** At implementation, do not select Inter, DM Sans, Plus Jakarta Sans, Outfit, Instrument Sans, IBM Plex Sans, or Space Grotesk. They are training defaults and they make monoculture. Also do not select Poppins or Nunito: they are the Dutch education default and they push the page into the school brochure look. Find the family in a real catalog with the words *human, calm, honest* in mind.

## Elevation

Flat by default. This system has no shadow vocabulary. Depth comes from tone: an ochre zone against a paper zone, and a 1px Hairline border where two surfaces of the same tone touch. Motion energy is restrained, so surfaces do not lift, float, or blur.

The one exception is the focus ring. It must be visible, thick enough to see at night, and it uses Deep Ochre on paper or Warm Ink on ochre.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. If a surface needs a shadow to be understood, the layout is wrong. Rebuild the layout with space or with a tone change.

**The Test.** If the page looks like it has cards that float above a background, the elevation is wrong. Zones sit next to each other, they do not sit on top of each other.

## Do's and Don'ts

### Do:
- **Do** fill complete sections with ochre so the color covers 30 to 60 percent of a scroll.
- **Do** put every long text as Warm Ink on Warm Paper, at 17px or more, at 65 to 75 characters per line.
- **Do** make all hierarchy with one family, with weight and with size, at 1.25 times or more between steps.
- **Do** show a named person with a real face in the ochre zone at the end of an article.
- **Do** use a 1px Hairline border, and nothing more, to separate two surfaces of the same tone.
- **Do** limit movement to a state change: hover, focus, open, closed. Use an ease-out curve (quart, quint, or expo).
- **Do** respect `prefers-reduced-motion` and remove every transition when it is set.
- **Do** keep a visible focus ring on every control that the keyboard can reach.

### Don't:
- **Don't** make it look like **a corporate consultancy**: dark blue, gold, a photo of a handshake.
- **Don't** make it look like **a government website**: grey, dense, correct, with no person visible.
- **Don't** make it look like **a SaaS landing page**: a gradient hero, a row of three cards with icons, big number statistics, a purple accent, "Get started free".
- **Don't** make it look like **a gamified app**: a mascot, points, badges, a level bar, or an animation after every action. This is a serious decision, not a game.
- **Don't** fall back to the education template: soft blue and mint green, rounded corners everywhere, stock photos of pupils who laugh.
- **Don't** copy the old site's own template: a bar of three statistics under the hero (8,8 / 92% / "meest gevraagde partij"), and city pages that are one text with the city name changed.
- **Don't** put body text on the ochre. It breaks The Reading Room Rule.
- **Don't** use a second font family, and do not use a mono font at all.
- **Don't** use `#000`, `#fff`, or any untinted grey.
- **Don't** use a `border-left` or `border-right` of more than 1px as a colored stripe on a card, a list item, or a callout.
- **Don't** use gradient text (`background-clip: text`), glassmorphism, or a blur as decoration.
- **Don't** build the hero as a big number with a small label and supporting statistics.
- **Don't** build a grid of identical cards with an icon, a heading, and three lines of text.
- **Don't** open a modal, a popup, or a newsletter overlay. The reader came to read.
- **Don't** animate a layout property (`width`, `height`, `top`, `margin`). Animate `transform` and `opacity`, and use `grid-template-rows` for an open and close movement.
- **Don't** write an em dash in any interface text. Use a comma, a colon, a semicolon, a period, or parentheses.
