# The client's feedback on the redesign, 21 August 2026

Mirjam sent one mail with every change, page by page, box by box. This file is
that mail turned into a register: one row per request, an identifier, what was
asked, and what was done about it.

**The client leads here.** Where a request contradicts [PRODUCT.md](../../PRODUCT.md)
the request wins, and the row says so. Three rules of the rebuild are overruled
by this mail and the reversal is recorded in [docs/decisions.md](../decisions.md):

1. **There is a central mailbox again.** `info@studiekeuzeadvies.nl` is the
   address "waar we straks allemaal bij moeten kunnen". Decision 2026-08-15
   (issue #7) said there is no central sign-up point; that is reversed for the
   forms the client names, and the per-coach route stays for an intake.
2. **"8,8 gemiddeld" goes back on the home page.** The rebuild removed it as a
   number that is not ours. The client kept it and dropped "1.000+ trajecten per
   jaar" beside it, so the choice is theirs and considered.
3. **The five coaches are real people now.** The rebuild carried one real coach
   and five stand-ins. Mirjam, Aart, Tamara and Regula replace the stand-ins,
   with their own texts, work areas and photographs.

The mail itself is kept word for word in
[client-feedback-email.md](client-feedback-email.md), so every row below can be
held against what was actually written. Read this file with
[design-spec.md](design-spec.md) as well: the spec says what the client
designed, this file says what the client changed after seeing it built.

## How to read a row

| Column | Meaning |
|---|---|
| **ID** | The handle to quote in a commit or an issue. Page letter, then number. |
| **Asked** | The request, shortened. The client's own words are in quotes. |
| **Done** | What landed, and where. |

Status is in the **Done** column: a row that says *Open* did not land, and the
reason follows it. Every open row is also a GitHub issue.

---

## A. Over the whole site

| ID | Asked | Done |
|---|---|---|
| A1 | Every "Studiekeuze…" gets the inner capitals: *StudieKeuzeAdvies*, *StudieKeuzeCoach*, *StudieKeuzeTraject*. | Done, 48 lines in 18 files. `app/site-config.ts` carries the brand string; the sweep covers prose, headings, metadata titles and descriptions. **Four things keep their small letters, and each is an address rather than a sentence**: a URL (`/studiekeuzecoaches`), an anchor (`#studiekeuzescan`), an e-mail address (`info@studiekeuzeadvies.nl`) and the domain itself. A capital in any of those is a different address. The drawn wordmark in the header and the footer also stays as the client drew it: it is a logo, not a word in a sentence. Its `aria-label` and `<title>` are not, though, and a review caught them in small letters; they are swept now. |
| A2 | *KeuzeScan* is always *StudieKeuzeScan*. | Done. Swept over the traject page, the tarieven page, the home page, the footer and the pricing data. |
| A3 | Pictures: colour only, photographs only, and inclusive. Offer to shoot real young people. | Partly done. The five generated coach portraits are gone, replaced by the coaches' own photographs. The remaining generated pictures are listed in the open question Q2. |
| A4 | A few pages are still missing. Shall Lau design them? | Open, question Q7. The two the mail names itself (Contact, Samenwerken) are built here. |

## H. Home page

| ID | Asked | Done |
|---|---|---|
| H1 | New lead paragraph under the title. | Done, `app/page.tsx`. |
| H2 | Statistics line becomes "8,8 gemiddeld · gratis intake, daarna één vaste prijs". Drop "1.000+ trajecten per jaar". | Done. Overrules PRODUCT.md, see rule 2 above. |
| H3 | Left: add a pill "✓ Incl. rapportage". Right: "4 stappen · online of dichtbij", drop "± 4 weken". | Done. |
| H4 | The four steps get new titles and new bodies. | Done. |
| H5 | Price panel, left half: new paragraph and five ticks. | Done. |
| H6 | "Gratis en vrijblijvend — je beslist daarna pas." becomes "De intake is vrijblijvend. Je beslist daarna pas." | Done. |
| H7 | The scan line gets new wording and must point at the StudieKeuzeScan block on the traject page, not at the tarieven page. | Done. It links to `/studiekeuzetraject#studiekeuzescan`. |
| H8 | "Jouw keuze, jouw tempo. Met één vaste coach." over two lines. | Done. |
| H9 | "Ook als je gestopt bent of vastloopt" becomes "… gestopt bent met of vastloopt in je huidige studie". | Done. |
| H10 | The test line ends with ", afgerond in een rapportage". | Done. The client files this under "Kader voor jou", and the sentence they quote has always stood in the box beside it, "Voor ouders" (`forParents` in `app/page.tsx`). It is edited where it stands rather than moved: the client asked for the ending, not for the line to change boxes. Say the word and it moves. |
| H11 | Moya's caption becomes "koos na haar herstart voor de opleiding Toegepaste Psychologie". | Done. |
| H12 | The "één vaste coach" paragraph is rewritten and names deaf and hard-of-hearing readers, and Tamara's sign language. | Done. |
| H13 | Drop the small "Sterk in …" box under a coach. Put the work area there instead, for the SEO. | Done. The chip under a coach now lists that coach's own towns, and the city list beside it is alphabetical. |
| H14 | New closing one-liner and new line under it. | Done, and "35+ locaties" became "onze vaste locaties". |
| H15 | Footer: "Keuzecheck herstarters" becomes "StudieKeuzeScan" and points at the traject page. Drop "Extra ondersteuning". "Contactformulier" points at a new Contact page. | Done, `app/components/site-footer.tsx` and the new `app/contact`. The page carries the client's paragraph word for word, including "of mail naar info@studiekeuzeadvies.nl", which a review found missing from the sentence it belongs in. |
| H16 | Add "Scholen" beside "Decanen"; both point at a new page "Samenwerken". Keep the page switched off at launch. | Done. `app/samenwerken` exists and is complete; `showSamenwerken` in `app/site-config.ts` is `false`, so the page answers 404 and the two links stay out of the footer. One flag turns it on. |

## T. Het traject

| ID | Asked | Done |
|---|---|---|
| T1 | "bouwt op het vorige" becomes "bouwt voort op het vorige, zodat jij een keuze kan maken waar je écht achter staat." | Done. |
| T2 | The meta line becomes "4 gesprekken · 2 online testen". | Done. |
| T3 | Add "✓ Incl. rapportage" beside the two tests. | Done. |
| T4 | The four steps get the long new texts. | Done. |
| T5 | The orange "Daarna, thuis" column is rewritten; step 3 is headed "Daarna, thuis en erop uit"; step 4 reads "Daarna, inschrijven!" with a festive mark. | Done. The mark is 🎉, and it carries `aria-hidden`. |
| T6 | The tests panel loses the TalentDrives badge for "Betrouwbare tests, gericht op betere keuzes", gets the long new text, and names "matrix + rapportage". | Done. The mail says the mention "moet er nog bij", so it joins the three pills instead of replacing one. Two notes from a review: the client writes "Samen met de studiekeuzeadviseur" and a first pass had swept that common noun into "StudieKeuzeCoach" — the client's word is back. The pill reads "Matrix + rapportage" and not the client's lower-case "matrix + rapportage", because every pill beside it starts with a capital. |
| T7 | The scan block: rename to StudieKeuzeScan, button "Boek hier je StudieKeuzeScan" to a form that reaches info@, three new steps, and drop the closing sentence. | Done. The form is `/studiekeuzescan`. |
| T8 | New closing one-liner and text. "Kies je stad" points at the coaches page. Drop "Bekijk alle coaches". | Done, in `app/components/closing-band.tsx`. **Two deviations, both flagged by a review, both easy to undo.** The client asks only that the link point elsewhere, and the button is also renamed "Kies je coach": a button that says "Kies je stad" and opens a list of people asks the reader to trust the label or the page, not both. And the client's sentence reads "en beslis of het traject bij je past", which is missing its subject; it reads "en beslis je of" here. The client wrote the same four lines twice, once here and once under VOOR WIE, so they are one component: two copies of a text the client will edit again is two chances to edit only one of them. |

## V. Voor wie

| ID | Asked | Done |
|---|---|---|
| V1 | Add a block for deaf and hard-of-hearing readers, beside ADD, ADHD and autism. | Done. |
| V2 | New text beside "Waarom is de juiste studiekeuze zo belangrijk?". | Done. |
| V3 | The same closing one-liner as T8. | Done, the same `ClosingBand`. The two other closings that carried "Kies je stad" (`contact-section.tsx` and /veelgestelde-vragen) were pointed at the coaches page too, so no button on the site sends a reader to a city when the client asked for a person. |

## C. Coaches

| ID | Asked | Done |
|---|---|---|
| C0 | (Implied by the whole mail.) The roster is Mirjam, Janneke, Aart, Tamara and Regula. | Done. The five stand-ins are gone from `app/coaches.ts`; the four new coaches carry the names, work areas, experience lines and slogans from the mail and from the two Drive documents. |
| C1 | "De persoon die je straks spreekt" becomes "De coach die je straks spreekt". | Done. |
| C2 | "6 regio's" becomes "12 provincies + online". | Done. |
| C3 | New intro text: no call centre, pick a city, ask that coach. | Done. |
| C4 | The "Online" option leads to a form that reaches info@. | Done, `/online-begeleiding`. |
| C5 | Every coach does MBO, HBO and WO. | Done, it already did, and it now also holds for the four new coaches. |
| C6 | Under a coach: not a made-up speciality but their work experience. | Done. The `specialties` field is gone; `experience` holds the client's own sentence per coach. |
| C7 | New slogan per coach. | Done, `quote` and `quoteSource` per coach. |
| C8 | Drop the "Twijfel je welke coach past?" box. | Done. |

## P. The coach's own page

| ID | Asked | Done |
|---|---|---|
| P1 | Every headline reads "Hoi, ik ben …" with the first name only. | Done. |
| P2 | The form loses "Waar loop je tegenaan?". | Done. |
| P3 | The form offers WhatsApp. | Done: "Hoe kunnen we je bereiken?", with mail, telefonisch and WhatsApp. The number field is **always** on the card, not revealed by the choice. A reader whose JavaScript never arrives can still pick WhatsApp, and a field that appears under your thumb as you tap is the worse of the two. The server refuses the request when WhatsApp or telephone is chosen and the number is empty. |
| P4 | The small name-and-role card on the photograph goes, for everybody. | Done. |
| P5 | Janneke: new sentence under the headline, new first paragraph, and Wormerveer in the work area. | Done. |

## R. Artikelen

| ID | Asked | Done |
|---|---|---|
| R1 | "Kies je regio" becomes "Vind je coach" and points at the coaches page. | Done, `app/artikelen/page.tsx`. |
| R2 | "Dit ga jij helemaal overzetten toch van de Qompas site?" | Open, question Q8. The import is issue #15 and it is not part of this change. |

## TA. Tarieven

| ID | Asked | Done |
|---|---|---|
| TA1 | The scan gets "✓ Rapportage". | Done. |
| TA2 | "Start met de scan" becomes "Boek hier je StudieKeuzeScan" and leads to the form that reaches info@. | Done, to `/studiekeuzescan`. It is the one button on this page that does not open a coach: a scan does not need you to pick a person first. |
| TA3 | The traject: "+ rapportage" behind the tests, and "elk gesprek bouwt voort op het vorige gesprek". | Done. |
| TA4 | "Plan gratis intake" points at the coaches page. | Done. |
| TA5 | New text for the extra conversation. | Done. |
| TA6 | "Bij te boeken na afloop van het StudieKeuzeTraject of de StudieKeuzeScan bij je coach", as plain text and not a link. | Done, and it no longer looks like a link either. It was plain text already, inside a bordered pill that sat where the other two cards carry a button. The border is gone, because "geen link" and "looks exactly like the two buttons beside it" cannot both be true. |
| TA7 | New text for "Twijfel je of het past", and the link becomes "Kom in contact met een coach" to the coaches page. | Done. |

## O. Over ons

| ID | Asked | Done |
|---|---|---|
| O1 | The heading names the five: Tamara, Aart, Mirjam, Regula en Janneke. | Done, and it is the h1: "Wie zijn wij? Tamara, Aart, Mirjam, Regula en Janneke." The eyebrow above it read "Wie zijn wij" and would have said it twice, so it reads "Over ons". |
| O2 | Drop "Plan gratis intake bij een coach", keep "Ontmoet onze coaches". | Done. |
| O3 | New text beside "Waarom we opnieuw zijn begonnen". | Done. |
| O4 | A photograph of the five together, or a generated one for now. | Open, question Q6. |

## W. Sluit je aan als coach

| ID | Asked | Done |
|---|---|---|
| W1 | "Word coach" becomes "Sluit je aan als coach". | Done. The h1 and the footer carry the client's sentence exactly: "Sluit je aan als coach." It first read "als StudieKeuzeCoach", which a review called out and which was wrong: row A1 capitalises the brand, it does not put the brand where the client wrote the plain word. The eyebrow ("Werken als StudieKeuzeCoach") and the title tag still name the brand, because a search engine reads those and neither is the kop the client named. In the top navigation it is shortened to "Sluit je aan": the client's sentence is 22 characters in a bar that already carries six links and a button. The verb is theirs. The address `/coach-worden` does not move, so the four old vacancy redirects and the ranking stay. |
| W2 | The form must carry a CV. | Done. One file, PDF or Word, at most 5 MB, delivered as a real attachment on the application mail. It is **optional**: the client asked that a CV *can* be sent, and somebody reading this page on a telephone has their CV on a laptop. Three things had to move together: `Mail` in `app/lib/mail.ts` now carries attachments, `serverActions.bodySizeLimit` in `next.config.ts` is 6mb (a server action refuses a body over 1MB by default, and multipart adds its own bytes), and nothing is written to disk: the file is read once, encoded, sent and forgotten. |
| W3 | "Wat krijg je" gains a yearly intervisie meeting. | Done. |
| W4 | "Wat verwachten we" gains "en hanteert dezelfde tarieven". | Done. |
| W5 | The licence is "een jaarlijkse licentie van €750". | Done in `app/pricing.ts`, which is the only place the figure is written. A review found the page's own header comment typing it as well, which made that sentence false; the comment no longer names an amount. It was "± € 750, eenmalig, een indicatie". The amount did not move; the term did, and the hedge is gone, because the client has now decided it. |
| W6 | New text for "Hoe het verder gaat". | Done. |

---

## Open questions, back to the client

These are the client's own questions, and the ones this change could not answer.
Each is a GitHub issue, so this table is a pointer and not a second list of work
(see AGENTS.md). Two of them belong on an issue that already existed and were
added there as a comment rather than filed twice.

| ID | Issue | Question |
|---|---|---|
| Q1 | #69 | The example rapportage. Mirjam mails it separately and asks whether to publish it now or wait for the new house style. It is not on the site yet. |
| Q2 | #70 | Photographs of real young people. The client offers to shoot them. The home page hero and the article pictures are still generated scenes; they name nobody, but the client asked for photographs only. |
| Q3 | #71 | "Kan dit? Dat je op de landkaart op een coach/regio kan klikken?" Yes. Every pin on the map already opens the city page for that town, and a city page names its coach. Whether a pin should skip the city page and open the coach directly is the open half. |
| Q4 | #72 | The SEO question: big city at the top of a coach's page, the smaller towns underneath. **That shape is right, and it is what the pages do.** All 15 towns the mail names have their own page under `/locaties/`, in the alphabetical order the mail asked for, and each names its coach. What is still open is the other side of it: `docs/url-map.csv` holds 37 old city pages that are not in the client's 15, and issue `#29` decides which of those come back. |
| Q5 | #73 | Moya's photograph. The coaches want to keep it; Lau finds the AI glow too strong. There is no photograph of Moya on the site now, only her words. |
| Q6 | #74 | A photograph of the five owners for Over ons. |
| Q7 | #75 | The missing pages. Which ones, and does Lau design them first? |
| Q8 | #15 | The articles from the Qompas site: who moves them, and when? |
| Q9 | #17 | The e-mail address per coach. An intake request still has no route: `email` is `null` on all five, so a request is archived and not delivered. This blocks going live. |
| Q10 | #76 | Tamara's photograph. The one in the Drive folder is 192×192 pixels, which is too small for the 640px slot on her own page and shows it. Her card and her page are built to stand without a portrait, so nothing is broken, but she is the only coach without a face. A photograph at 1000px or more fixes it. |

---

## Where the page does not say exactly what the mail says

A review of this change read every request against the mail and found the
places where the built copy and the written copy differ. None of them is a
disagreement; they are slips in the mail, or a house rule that the mail did not
speak to. **All of them are the client's to overrule.** Each is one edit.

Slips in the mail, corrected in silence until this list:

| Mail | Page | Why |
|---|---|---|
| "Ben je doof **op** slechthorend" (twice: H12 and V1) | "doof **of** slechthorend" | The sentence needs "of". |
| "hoe jij je toekomst voor je **zit**" (T4) | "voor je **ziet**" | Same word, one letter. |
| "De testresultaten **ontvang** in een rapportage" (T7) | "**ontvang je** in een rapportage" | The subject is missing. |
| "door **jouw** samengestelde lijst" (H4) | "door **jou** samengestelde lijst" | |
| "Kies hiernaast **stad** … en **vraagt** het" (C3) | "kies hiernaast **een** stad … en **vraag** het" | |
| "MBO, HBO, **HBO**" (C5) | "MBO · HBO · **WO**" | The mail writes "mbo, hbo en wo" on the home page, so the third is a slip. |
| "**30 Jaar** ervaring", "**Gebaarvaardig**", "stage oriëntatie" (C6) | "30 jaar", "Gebarenvaardig", "stage-oriëntatie" | |
| "vak.Toen" (O3) | Two sentences, three paragraphs | |
| "beslis of het traject bij je past" (T8) | "beslis **je** of" | |

House rules the mail did not speak to, applied for consistency:

- **"✓ incl rapportage" is written "✓ Incl. rapportage"** (T3), because every
  tick beside it is capitalised and abbreviated the same way.
- **"matrix + rapportage" is a pill reading "Matrix + rapportage"** (T6), for
  the same reason.
- **The orange column writes the two tests in small letters** (T5) where the
  mail capitalises them mid-sentence.
- **The new contact form says "Je naam" and "Bericht (mag je leeg laten)"**
  where the mail sketches "Naam" and "Bericht (optioneel)" (H16). Every other
  form on the site asks in those words. This is the one on the list that is a
  real choice rather than a spelling, so it is the one most worth a word back.

## What was deliberately not changed

Three things the mail could be read as asking for, and the reason each stayed:

1. **The wordmark keeps its small letters.** Row A1 is about the name in a
   sentence. The mark in the header and the footer is a drawing the client made,
   and redrawing a logo is not a spelling correction.
2. **`/coach-worden` keeps its address** although the page is renamed (row W1).
   Four old vacancy URLs redirect into it and it is in the sitemap; a rename
   costs those and buys nothing a reader can see.
3. **`/samenwerken` is finished but switched off.** The client asked for the
   page and asked to keep it off at launch (row H16). `showSamenwerken` in
   `app/site-config.ts` is that switch: the page answers 404, it is out of the
   sitemap, and the two footer links are hidden. One `true` turns all four on.
