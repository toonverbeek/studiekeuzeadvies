# StudiekeuzeAdvies — Redesign, gespreksverslag

Samenvatting van de volledige samenwerking rond het redesign van de StudiekeuzeAdvies-website (afgerond 19 augustus 2026).

## 1. Uitgangspunt & identiteit
- Doel: complete redesign van het Dutch study-guidance platform StudiekeuzeAdvies (coaching voor scholieren/studenten bij hun studiekeuze).
- Gekozen identiteit: violet `#6D4AFF`, indigo `#1E1B4B`, koraal `#FF6B4A`, amber `#FFC94D`. Logo: twee samenkomende "stap"-paden (violet + koraal). Typografie: Bricolage Grotesque (display) + Figtree (body), IBM Plex Mono voor labels.
- Meerdere merkrichtingen verkend (Scribbr-stijl, Vonk, Vooruit, Sense, Contentoo, SK123); "Stap/Definitief" won.

## 2. Opgeleverde pagina's
1. **Homepage** (Definitief v4) — hero, trajectstappen, prijs-panel, doelgroepen, regio-kiezer, testimonial, CTA.
2. **Het traject** — vier stappen, de twee testen, KeuzeScan-sectie, waarom SKA.
3. **Voor wie** — scholieren, herstarters, ouders, extra ondersteuning.
4. **Coaches** — regiofilter, coachkaarten, geanimeerde Nederland-kaart (kaart-nl.html).
5. **Coach Janneke** — coachprofiel met volledige introtekst + sticky intakeformulier.
6. **Wie zijn wij** — het verhaal van de vijf coach-eigenaren.
7. **Artikelen** — artikeloverzicht (detailpagina's nog niet gebouwd).
8. **Tarieven v3** — Studiekeuzescan €249, Studiekeuzetraject €649 (uitgelicht), Extra coaching €89 als "Aanvullend".
9. **Word coach** — vacaturepagina met licentiemodel + aanmeldformulier.

## 3. Belangrijkste beslissingen (chronologisch)
- **Parent/child-toggle verwijderd**: beide doelgroepen worden op één pagina aangesproken ("Jouw keuze, jouw tempo" / "Uw kind beslist zelf, weloverwogen").
- **Extra coaching is geen los product meer**: alleen bij te boeken ná scan of traject, en alleen als de coach het zinvol vindt. Op Tarieven v3 gemarkeerd met badge "Aanvullend" en gestippelde rand; klanten kiezen effectief uit 2 opties.
- **Prijs op de homepage** (conversiekeuze): eerst als losse strip, daarna herontworpen tot een indigo panel onder de trajectstappen — links "Eén vaste prijs. Alles zit erin." met inclusies, rechts prijskaart €649 met CTA "Plan gratis intake bij een coach" en de geruststelling "gratis en vrijblijvend — je beslist daarna pas".
- **Scan op de homepage**: klein, als ontsnappingslink onder de trajectprijs — "Liever alleen de tests, met één gesprek erover? Studiekeuzescan · € 249 →". Bewust ondergeschikt aan het traject.
- **KeuzeScan-sectie op Het traject**: korte verkenning — twee testen, één online sessie, resultaten in een matrix, overstap naar het volledige traject mogelijk.
- **Coachprofiel (Janneke van den Brand)**: psycholoog & mede-eigenaar, werkgebied Amsterdam e.o., oog voor faalangst/ADHD/autisme/dyslexie; intakeformulier met validatie en bevestiging.
- **Word coach-pagina**: één coach per regio (exclusiviteit), zichtbaarheid op de website, eenmalige licentie ± €750 (indicatie, nog af te stemmen), geen maandelijkse afdracht, werken volgens de beschreven methode; aanmeldformulier.
- **Navigatie**: "Word coach" toegevoegd aan menu en footer; nav compacter gemaakt zodat alles past; dubbele knoppen ("Kies je regio"/"Bekijk de kaart") uit de nav verwijderd.
- **Knopteksten**: alle intake-CTA's heten "Plan gratis intake bij een coach" (in de nav de korte variant) en linken naar de Coaches-pagina, zodat tekst en bestemming kloppen.
- **Alle links geconsolideerd** naar Homepage v4 en Tarieven v3; dode `#`-links gerepareerd; footer-Contactformulier wijst naar het intakeformulier op de coachpagina.

## 4. Tweakbare instellingen (in de bronbestanden)
- Homepage v4: prijsweergave (in het traject / losse strip / verborgen), trajectprijs, scan tonen aan/uit.
- Tarieven: plaatsing en prijs van extra coaching.
- Word coach: licentiebedrag.

## 5. Openstaande punten
- Stockfoto's (coaches, team, Janneke) vervangen door echt beeldmateriaal; foto's vereisen nu internet.
- Artikel-detailpagina's bestaan nog niet; artikelkaarten hebben geen bestemming.
- Formulieren zijn prototypes (geen backend/e-mail).
- Definitieve licentieprijs Word coach nog af te stemmen.
- Overweeg een echte boekingsflow achter de intake-CTA.

## 6. Bestanden in deze zip
Alle pagina's zijn zelfstandige HTML-bestanden (offline te openen, behalve externe foto's). Startpunt: `Homepage Definitief v4.dc.html`.
