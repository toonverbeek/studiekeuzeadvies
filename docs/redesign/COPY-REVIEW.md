# Copy review: client export vs built site

Date: 2026-08-21. Branch `worktree-redesign-client-v2`, production build in `.next`, served on port 3211.

## Method

- `extract.py` strips `<script>`, `<style>`, `<svg>`, `<noscript>`, `<head>`, collapses whitespace and writes one text node per line. Dumps: `client/<page>.txt` and `built/<page>.txt` in this folder; `dump-all.sh` reproduces them.
- The client pages render their lists from `renderVals()` in an inline script (`{{ s.title }}`, `{{ c.name }}`, `{{ t }}`). Those arrays were read from the script and compared by hand. Two client blocks are hidden by default (`prijsAlsStrip`, the "losse strip" price; the `sent` confirmation) and are compared only where noted.
- Ignored: the mobile "Menu" duplicate of the nav, straight vs curly quotes (`"geen idee"` vs `“geen idee”`), a text node split in two (`Ontwikkeld door` / `TalentDrives`), placeholders turned into labels, link targets, `alt`/`aria-label`.
- Class: **INTENTIONAL** needs a decisions.md row, a REVIEW.md id or a PRODUCT.md principle. **JUDGEMENT** has a plausible reason, sometimes written in a code comment or in `docs/redesign/design-spec.md` section 8 ("spec 8.n" below), but no decision row. **DRIFT** has neither.
- Roster data (coach names, bios, cities, article titles) is data, not copy, and is not counted; the client's coaches and articles are invented placeholders.

## Summary

| Page | Differences | INTENTIONAL | DRIFT | JUDGEMENT |
|---|---|---|---|---|
| Header (shared) | 0 | 0 | 0 | 0 |
| Footer (shared) | 6 | 2 | 0 | 4 |
| / (home) | 13 | 12 | 0 | 1 |
| /studiekeuzetraject | 8 | 4 | 1 | 3 |
| /voor-wie | 4 | 1 | 0 | 3 |
| /studiekeuzecoaches | 7 | 3 | 0 | 4 |
| /studiekeuzecoaches/janneke | 8 | 1 | 1 | 6 |
| /over-ons | 1 | 1 | 0 | 0 |
| /artikelen | 1 | 0 | 0 | 1 |
| /tarieven | 2 | 1 | 0 | 1 |
| /coach-worden | 16 | 8 | 1 | 7 |
| **Total** | **66** | **33** | **3** | **30** |

The prices are correct everywhere: € 249 eenmalig, € 649 compleet traject, € 89 per gesprek, ± € 750 (indicatie) twice. Every em dash of the client is a comma, colon or period; no clause was lost with one. The "u" register stands only where the client wrote it (the parent panel, on home and copied to /voor-wie); everything else is "je". All section eyebrows match word for word.

## Header (shared)

Nav labels `Het traject · Voor wie · Coaches · Artikelen · Tarieven · Over ons · Word coach · Plan gratis intake` match on every page; `/coach-worden` swaps the pill to `Meld je aan als coach`, as the client does. No difference.

## Footer (shared)

The client has two footers: the full four-column one on the home page, and a compact one (wordmark + Home/Coaches/Artikelen/Tarieven/Word coach + © line) on the other eight. The built site prints the full footer on every page.

| # | Client | Built | Class | Source or file |
|---|---|---|---|---|
| F1 | `Keuzecheck herstarters` | `Verkeerde studiekeuze` | INTENTIONAL | REVIEW T6 |
| F2 | `Decanen` (Voor wie column) | dropped | JUDGEMENT | spec 3.3 warning + spec 8.1; comment in `app/components/site-footer.tsx`: no page speaks to a decaan |
| F3 | `Contactformulier` (to Janneke's form) | `Kies je coach` (to /studiekeuzecoaches) | INTENTIONAL | decisions 2026-08-15 (no central contact point), spec 3.3 |
| F4 | Contact column: `Contactformulier · Locaties` | `Kies je coach · Locaties · Word coach` | JUDGEMENT | GESPREK.md §3 ("Word coach toegevoegd aan menu en footer"); the client's compact footers carry it, the full one does not |
| F5 | `Algemene voorwaarden · Privacy` (legal line) | dropped; only `© 2026 StudiekeuzeAdvies` | JUDGEMENT | spec 8.13: the pages do not exist; comment in `site-footer.tsx` |
| F6 | compact footer on 8 inner pages | full footer everywhere | JUDGEMENT | spec 8.1 recommends one footer |

## / (homepage-definitief-v4)

| # | Client | Built | Class | Source or file |
|---|---|---|---|---|
| H1 | `★★★★★ 8,8 gemiddeld · 1.000+ trajecten per jaar · gratis intake, daarna één vaste prijs` | `Gratis intake · MBO, HBO en WO · online of op locatie · daarna één vaste prijs` | INTENTIONAL | decisions 2026-08-20 (principle 5 row), PRODUCT.md 5, REVIEW §3.1 |
| H2 | `Ger (18), traject afgerond` | `Ger (18), traject afgerond in november 2023` | INTENTIONAL | decisions 2026-08-15 (every story carries a provable date); `app/site-config.ts` `legacyQuotes` |
| H3 | badge `92% kiest goed` | badge `Gratis intake` | INTENTIONAL | decisions 2026-08-20, PRODUCT.md 5 |
| H4 | ticker: `8,8 gemiddelde beoordeling`, `92% studeert met plezier door`, `35+ locaties in Nederland`, `MBO · HBO · WO`, `Gratis intake`, `Ook bij ADD, ADHD of autisme`, `Alle gesprekken 1-op-1` | `Gratis intake`, `MBO · HBO · WO`, `Alle gesprekken 1-op-1`, `Ook bij ADD, ADHD of autisme`, `Online of op locatie`, `Eén vaste coach`, `3 steden en online` | INTENTIONAL | decisions 2026-08-20 ("the slot stays and true statements fill it"), REVIEW T12; `app/home/ticker.tsx` |
| H5 | `Je weet vooraf precies waar je aan toe bent — en je beslist pas ná het gratis intakegesprek.` | `..., en je beslist pas ná het gratis intakegesprek.` | INTENTIONAL | DESIGN.md, no em dash in UI text |
| H6 | `Online of op een van de 35+ locaties` | `Online of op locatie bij jou in de buurt` | INTENTIONAL | decisions 2026-08-20 (35+ locaties banned) |
| H7 | `Gratis en vrijblijvend — je beslist daarna pas.` | `Gratis en vrijblijvend. Je beslist daarna pas.` | INTENTIONAL | DESIGN.md |
| H8 | `Moya (22), koos na haar herstart voor Toegepaste Psychologie` | `Moya (22), traject afgerond in maart 2024` | INTENTIONAL | PRODUCT.md 5 (the study is not in the archive quote), decisions 2026-08-15; spec 8.4 |
| H9 | links `Alle artikelen` · `Voor wie is het traject? →` | `Meer ervaringen` · `Alle artikelen →` · `Voor wie is het traject? →` | JUDGEMENT | `app/page.tsx` 445-455; a link to /ervaringen was added and an arrow for consistency |
| H10 | `Onze coaches kennen alle niveaus (mbo, hbo en wo) en alle twijfels.` | `Het traject werkt op elk niveau (mbo, hbo en wo) en bij elke twijfel.` | INTENTIONAL | REVIEW T5, §3.3 |
| H11 | region chips `Amsterdam · Utrecht · Amersfoort · Rotterdam · Eindhoven · Zwolle · Online` | `Amsterdam · Utrecht · Amersfoort · Online` | INTENTIONAL | PRODUCT.md 3 and 5; built from `app/cities.ts`, comment in `app/home/region-picker.tsx` |
| H12 | card `Coach in Amsterdam` / `Sterk in twijfel tussen hbo en wo, en herstarters.` | `Janneke` / `Janneke is psycholoog en werkt sinds 2015 als studiekeuzecoach in Amsterdam.` | INTENTIONAL | PRODUCT.md 3 (a named coach); "sinds 2015" is proved by the archive (`janneke-van-den-brand.md`: "ik werk sinds januari 2015") |
| H13 | `Vrijblijvend kennismaken: samen, of eerst alleen. Online of op een van onze 35+ locaties.` | `... Online of op locatie bij een coach in de buurt.` | INTENTIONAL | decisions 2026-08-20 |

Not a difference: the client's hidden "losse strip" (`€ 649 compleet traject · vier gesprekken, beide tests, één vaste coach — geen verrassingen achteraf`, `Alle tarieven →`) is off by default in the export and is not built. Hero, four steps, price panel, "Voor jou" / "Voor ouders" rows (with "u"), "Begin met een gesprek", the three numbered steps, the closing band and the tagline match word for word.

## /studiekeuzetraject (het-traject)

| # | Client | Built | Class | Source or file |
|---|---|---|---|---|
| T1 | `Je krijgt een ervaren coach met wie je vier bijeenkomsten hebt` | `Je krijgt een vaste coach met wie ...` | INTENTIONAL | REVIEW T2, §3.3 |
| T2 | button `Plan gratis intakegesprek` | `Plan gratis intake bij een coach` | JUDGEMENT | GESPREK.md §3: the client decided every intake CTA is called "Plan gratis intake bij een coach"; their own export did not apply it on this page |
| T3 | (none) | added index `Op deze pagina: De vier gesprekken · De twee testen · Liever een korte scan? · Waarom StudiekeuzeAdvies` | JUDGEMENT | decisions 2026-08-20 (PageIndex is one component) records the component, not that this page gets one; `app/studiekeuzetraject/page.tsx` |
| T4 | pill `Praktijkgericht & betrouwbaar` | `Praktijkgericht en betrouwbaar` | **DRIFT** | `app/traject.ts` line 83. No rule on the ampersand: Janneke's caption keeps `psycholoog & studiekeuzecoach` |
| T5 | `Snel inzicht met de KeuzeScan` / `De KeuzeScan is een kort traject ...` / `Zo werkt de KeuzeScan` | `Snel inzicht met de Studiekeuzescan` / `De Studiekeuzescan is een kort traject ...` / `Zo werkt de scan` | JUDGEMENT | spec 8.6; comments in `app/studiekeuzetraject/scan-panel.tsx` and `app/traject.ts`; decisions 2026-08-20 names the product "Studiekeuzescan" |
| T6 | `Je bespreekt samen de resultaten — voor je uitgewerkt in een overzichtelijke matrix — krijgt toelichting` | `..., voor je uitgewerkt in een overzichtelijke matrix, krijgt toelichting` | INTENTIONAL | DESIGN.md |
| T7 | button `Start met de KeuzeScan` | `Kies een coach voor de scan` | INTENTIONAL | REVIEW T8 |
| T8 | (none) | added `€ 249` / `eenmalig, beide testen en de sessie inbegrepen` in the scan panel | INTENTIONAL | decisions 2026-08-20 ("one price is written once ... the scan panel ... read from that file") |

Everything else matches: eyebrow, h1, second lede paragraph, `Eerst lezen wat je doet`, the four gesprekken with their `Daarna, thuis` boxes, the TalentDrives block (printed as the client's claim, REVIEW §3.2), the three scan steps, the three "Waarom" columns, the closing band.

## /voor-wie

| # | Client | Built | Class | Source or file |
|---|---|---|---|---|
| V1 | button `Plan gratis intakegesprek` | `Plan gratis intake bij een coach` | JUDGEMENT | GESPREK.md §3, as T2 |
| V2 | (hero photo) | added card `In het kort`: `Het intakegesprek is gratis · Vier gesprekken met één vaste coach · Inclusief persoonlijkheidstest en studie-interessetest · Voor mbo, hbo en wo · In 3 steden, of online` | JUDGEMENT | comment in `app/voor-wie/page.tsx`: replaces the stock photo (decision 2026-08-13 allows a scene on the home hero only); REVIEW T10 saw the card |
| V3 | `Ongeveer de helft van de mensen die bij ons aanklopt, maakte eerder al een keuze die niet bleek te passen.` | `Herken je jezelf in een van deze zinnen, dan zit je hier goed.` | INTENTIONAL | decisions 2026-08-20 ("No unproven number survives, including the ones written as words"), issue #24 |
| V4 | (none) | added panel `Voor ouders` / `Inzicht en zekerheid, óók voor u.` / the three "u" rows of the home page / buttons `Zo werkt het traject` · `Wat het kost` | JUDGEMENT | spec 8.7; GESPREK.md §2 lists "ouders" as a part of this page; the home panel links "Informatie voor ouders" here. The two button labels are new |

Matches: eyebrow, h1, both lede paragraphs, `Bekijk het traject`, `Welk keuze-type ben jij?`, the eight lines, the three doors and their link labels, `Waarom is de juiste studiekeuze zo belangrijk?` with both paragraphs, the closing band.

## /studiekeuzecoaches (coaches)

| # | Client | Built | Class | Source or file |
|---|---|---|---|---|
| C1 | `6` / `regio's + online` | `3` / `steden + online` | INTENTIONAL | REVIEW F2 |
| C2 | `8,8` / `gemiddelde beoordeling` | `Gratis` / `het eerste gesprek` | INTENTIONAL | PRODUCT.md 5, decisions 2026-08-20 |
| C3 | chips `Alle · Amsterdam · Utrecht · Amersfoort · Rotterdam · Eindhoven · Zwolle · Online` | `Alle · Amsterdam · Utrecht · Amersfoort · Rotterdam · Groningen · Eindhoven` | JUDGEMENT | built from `coach.town` in `app/coaches.ts`; REVIEW §2.8 notes chips vs pins. `Online` and `Zwolle` have no coach in the roster |
| C4 | (none) | added status line `Alle 6 coaches staan in de lijst.` | JUDGEMENT | `app/studiekeuzecoaches/coach-filter.tsx` line 92, live region for the filter |
| C5 | card carries a quote `"{{ c.quote }}"` | no quote; added `Werkgebied: …` line and three specialism chips | JUDGEMENT | comment in `app/studiekeuzecoaches/page.tsx` `CoachCard`: no real coach has written a quote; PRODUCT.md 5 |
| C6 | (none) | added section `Wat je van elke coach mag verwachten` with `Je houdt dezelfde coach` and `De keuze blijft van jou` | INTENTIONAL | REVIEW T3 records heading and both cards |
| C7 | band buttons `Plan gratis intake bij een coach` · `Kies je regio` (both to home `#regio`) | `Kies je coach` (`#coaches`) · `Bekijk de locaties` (`/locaties`) | JUDGEMENT | comment in `app/studiekeuzecoaches/page.tsx`: the grid above is the region chooser, so the buttons stay on the page |

Matches: eyebrow, h1, lede, `1-op-1 / alle gesprekken`, `Filter op regio:`, `Maak kennis met {naam}`, `Intake`, `Twijfel je welke coach past?` and its sentence.

## /studiekeuzecoaches/janneke (coach-janneke)

| # | Client | Built | Class | Source or file |
|---|---|---|---|---|
| J1 | `Ik ben psycholoog en studiekeuzecoach — en samen met vier collega-coaches trotse eigenaar van StudiekeuzeAdvies.` | `..., en samen met vier collega-coaches ...` | INTENTIONAL | DESIGN.md; comment in `app/studiekeuzecoaches/[coach]/profiles.ts` |
| J2 | select `Voor wie is de intake?` with `Voor mijzelf (studiekiezer)` · `Voor mijn kind (ik ben ouder)` | `Voor wie is de intake?` with `Kies wat op jou past` · `Ik kies voor het eerst een studie` · `Ik twijfel of ik ben gestopt` · `Ik heb ADD, ADHD of autisme` · `Ik ben ouder of verzorger` | JUDGEMENT | `app/intake.ts` `situaties`; the 2026-08-20 row on `situatie` describes this field (four options, one a health statement) but nothing records choosing it over the client's two |
| J3 | select `Voorkeur: online of in Amsterdam?` with `Online` · `In Amsterdam` · `Geen voorkeur` | missing | **DRIFT** | `app/components/intake-form.tsx` (fields), `app/intake.ts`, `app/actions.ts`. The form's own lede still says "online of in Amsterdam" |
| J4 | placeholders `Naam`, `Waar loop je tegenaan? (optioneel)` | labels `Je naam`, `Waar loop je tegenaan? (mag je leeg laten)` | JUDGEMENT | `intake-form.tsx` 279-282; wording only |
| J5 | (none) | added `We gebruiken je gegevens alleen voor dit gesprek. Je zit nergens aan vast.` | JUDGEMENT | `intake-form.tsx` 316-319; the repo's form, in the spirit of the 2026-08-20 row on deleting requests |
| J6 | confirmation `Aanvraag verstuurd!` / `Bedankt {naam}. Janneke neemt binnen twee werkdagen contact met je op om de intake in te plannen.` | `Aanvraag verstuurd` / `Bedankt. Je aanvraag staat bij Janneke. Je krijgt binnen twee werkdagen antwoord, en dan plannen jullie samen het gratis intakegesprek.` | JUDGEMENT | `app/actions.ts` line 220, one message for every coach form |
| J7 | error `Vul je naam en een geldig e-mailadres in.` | `Er ontbreekt nog iets. Kijk hieronder wat je moet aanvullen.` plus a message per field | JUDGEMENT | REVIEW C3 (per-field errors) |
| J8 | (none) | added `Werkt Janneke niet bij jou in de buurt? Bekijk wie waar werkt.` | JUDGEMENT | `app/studiekeuzecoaches/[coach]/page.tsx` 240-249 |

Matches word for word: `← Alle coaches`, eyebrow, h1, the three pills, `Plan gratis intake bij Janneke`, `Zo werkt het traject`, the caption `Janneke van den Brand · psycholoog & studiekeuzecoach`, all eight paragraphs including the note box and `Altijd een happy end dus!`, `Werkgebied`, the form title and lede, `Vraag gratis intake aan`, `Janneke neemt binnen twee werkdagen contact op.` (kept for her only, REVIEW F8).

## /over-ons (wie-zijn-wij)

| # | Client | Built | Class | Source or file |
|---|---|---|---|---|
| O1 | pill `Coaches in heel Nederland` | `3 steden en online` | INTENTIONAL | REVIEW T11, PRODUCT.md 5 |

Everything else matches, including `het vak waar we jaren ervaring in hebben` (left as the client's sentence, REVIEW §3.4). A `sr-only` h2 `Waar we voor staan` was added over the three value columns; it is not visible.

## /artikelen

| # | Client | Built | Class | Source or file |
|---|---|---|---|---|
| A1 | `Praktische artikelen over aanmelden, regelingen en het keuzeproces, geschreven door onze coaches.` | `Praktische artikelen over aanmelden, regelingen en het keuzeproces.` | JUDGEMENT | `app/artikelen/page.tsx` line 33. Likely PRODUCT.md 5 and decisions 2026-08-05 (no author on an article): the 63 archive articles were written under earlier owners. Note that the page's own meta description still says `Geschreven door studiekeuzecoaches.` |

The cards are data: the client's four invented posts (tags Aanmelden, Regelingen, Open dagen, Keuzeproces) against the three real articles of `app/articles.ts` (tags Aanmelden, Stoppen, Stoppen; spec 8.14). `Lees artikel →`, `Liever gewoon een gesprek?`, `Het intakegesprek is gratis en verplicht je tot niets.` and `Kies je regio` match.

## /tarieven (tarieven-v3)

| # | Client | Built | Class | Source or file |
|---|---|---|---|---|
| P1 | button `Start met de scan` | `Kies een coach voor de scan` | INTENTIONAL | REVIEW T9 |
| P2 | badge `Meest gekozen` | `Aanbevolen` | JUDGEMENT | spec 8.12; comment in `app/tarieven/page.tsx` line 23-24 (a sales claim we cannot prove, PRODUCT.md 5) |

All three cards match word for word: `Studiekeuzescan € 249 eenmalig`, `Studiekeuzetraject € 649 compleet traject`, `Aanvullend Extra coaching € 89 per gesprek`, every check row, `Bij te boeken na scan of traject`, and the closing `Eerst weten of het bij je past?` paragraph.

## /coach-worden (word-coach)

| # | Client | Built | Class | Source or file |
|---|---|---|---|---|
| W1 | `Jouw stad is exclusief van jou — geen interne concurrentie.` | `Jouw stad is exclusief van jou: geen interne concurrentie.` | INTENTIONAL | DESIGN.md |
| W2 | `Eenmalig ± € 750 (indicatie) — geen maandelijkse afdracht.` | `Eenmalig ± € 750 (indicatie), geen maandelijkse afdracht.` | INTENTIONAL | DESIGN.md; figure from `app/pricing.ts` |
| W3 | `Eén bewezen methode` | `Eén vaste methode` | JUDGEMENT | `app/coach-worden/page.tsx` line 96; no comment. Likely PRODUCT.md 5 ("bewezen" is a claim without proof) |
| W4 | `Helder vooraf — net als voor onze klanten` | `Helder vooraf, net als voor onze klanten` | INTENTIONAL | DESIGN.md |
| W5 | `Een bewezen methode: het complete traject, de twee testen en alle materialen` | `Eén uitgewerkte methode: het complete traject, de twee testen en alle materialen` | JUDGEMENT | `app/coach-worden/page.tsx` line 105; as W3 |
| W6 | `Een hecht team van collega-coaches — het bedrijf is van de coaches zelf` | `Een hecht team van collega-coaches: het bedrijf is van de coaches zelf` | INTENTIONAL | DESIGN.md |
| W7 | `Een eenmalige licentie van ± € 750 — indicatie, de definitieve prijs stemmen we samen af` | `Een eenmalige licentie van ± € 750: een indicatie, de definitieve prijs stemmen we samen af` | INTENTIONAL | DESIGN.md; REVIEW §3.9 quotes this wording |
| W8 | `Amsterdam, Utrecht, Amersfoort, Rotterdam, Eindhoven en Zwolle zijn bezet.` | `Amsterdam is bezet.` | INTENTIONAL | REVIEW T4 (generated from the real roster) |
| W9 | `Alle andere steden en regio's staan open — van Groningen tot Maastricht.` | `Alle andere steden en regio's staan open.` | JUDGEMENT | the clause is dropped with the em dash; the sentence is generated and Groningen now stands in the open list under it. Not named in T4 |
| W10 | open regions `Groningen · Arnhem / Nijmegen · Den Haag / Leiden · Breda / Tilburg · Maastricht · Leeuwarden` | same plus `Zwolle` | INTENTIONAL | REVIEW T4 |
| W11 | `Na je aanmelding plannen we een kennismakingsgesprek met een van de vijf eigenaren.` | `... met een van de eigenaren.` | **DRIFT** | `app/coach-worden/page.tsx` lines 262-263. No record and no comment; the site prints "met z'n vijven" and "vier collega-coaches" on Janneke's page, so the number is not withheld elsewhere |
| W12 | `Vrijblijvend — we plannen eerst een kennismakingsgesprek.` | `Vrijblijvend: we plannen eerst een kennismakingsgesprek.` | INTENTIONAL | DESIGN.md |
| W13 | options `Coach / loopbaanbegeleider` · `Decaan / mentor in het onderwijs` · `Psycholoog / orthopedagoog` | `Coach of loopbaanbegeleider` · `Decaan of mentor in het onderwijs` · `Psycholoog of orthopedagoog` | JUDGEMENT | `app/application.ts` 59-65; the comment calls them "the client's own four options" but the slash became "of", probably for reading aloud |
| W14 | placeholders `Naam`, select placeholder `Je achtergrond` | labels `Je naam`, `Je achtergrond` + option `Kies wat het beste past` | JUDGEMENT | wording only |
| W15 | confirmation `Aanmelding verstuurd!` / `Bedankt {naam}. We nemen binnen een week contact op voor een kennismakingsgesprek.` | `Aanmelding verstuurd` / `Bedankt {naam}. We lezen je aanmelding en nemen binnen een week contact op voor een kennismakingsgesprek.` | JUDGEMENT | `app/actions.ts` line 344 |
| W16 | error `Vul je naam, e-mailadres en gewenste regio in.` | `Er ontbreekt nog iets. Kijk hieronder wat je moet aanvullen.` plus a message per field | JUDGEMENT | REVIEW C3 |

Matches: eyebrow, h1, lede, `Meld je aan`, `Bekijk onze methode`, `In het kort` rows 1, 2 and 4 (text), `Wat je krijgt, wat we vragen`, `Dit krijg je` rows 1-3, `Dit vragen we` rows 2-4, `Geen maandelijkse fee, geen omzetafdracht: na de licentie is wat je verdient van jou.`, `Is jouw regio nog vrij?`, `Twijfel je of jouw regio past? Vraag het gewoon in het formulier.`, `…of stel jouw regio voor`, `Hoe het verder gaat` (rest of the paragraph), `Meld je aan als coach`, `Gewenste stad of regio`, `Vertel kort iets over jezelf en je ervaring`, `Anders`, `Verstuur aanmelding`, `We reageren binnen een week.`

## DRIFT: fix instructions, most visible first

All three were applied on 2026-08-22, in the commit after the one that added this report. The form question is the `voorkeur` field in `app/intake.ts`; it is optional, the select takes its town from the coach or the city the form sends to, and the mail prints it as `Voorkeur: In Amsterdam` or `Voorkeur: niet ingevuld`.

1. **Janneke's intake form lost the client's second question.** `app/components/intake-form.tsx` (with `app/intake.ts` for the values and `app/actions.ts` for validation and the mail body): add the select `Voorkeur: online of in Amsterdam?` with options `Online`, `In Amsterdam`, `Geen voorkeur`, where "Amsterdam" is the coach's town (`coach.town`), so the form that says "online of in Amsterdam" in its lede also asks it. If the question is left out on purpose, add a row to `docs/decisions.md`.
2. **"een van de vijf eigenaren" became "een van de eigenaren".** `app/coach-worden/page.tsx` lines 262-263: restore `met een van de vijf eigenaren`. The client's number also stands on `/studiekeuzecoaches/janneke` ("met z'n vijven"). If the count was dropped on purpose (REVIEW §3.7, the four others are unnamed), record it, and then Janneke's page is the one that disagrees.
3. **"Praktijkgericht & betrouwbaar" became "Praktijkgericht en betrouwbaar".** `app/traject.ts` line 83: restore `Praktijkgericht & betrouwbaar`, or write the ampersand rule into DESIGN.md and then also change the caption `psycholoog & studiekeuzecoach` in `app/studiekeuzecoaches/[coach]/profiles.ts` line 77.

## JUDGEMENT items worth one row in `docs/decisions.md`

Not defects, but each is a client-visible change whose reason lives only in a code comment or in `design-spec.md` section 8: the footer set (F2, F4, F5, F6), `KeuzeScan` → `Studiekeuzescan` (T5), `Meest gekozen` → `Aanbevolen` (P2), `Plan gratis intakegesprek` → `Plan gratis intake bij een coach` (T2, V1), `bewezen` → `vaste` / `uitgewerkte` (W3, W5), the dropped `geschreven door onze coaches` (A1, and then align the meta description), the parent panel on /voor-wie (V4), and the coach-card quote that was replaced by specialism chips (C5).
