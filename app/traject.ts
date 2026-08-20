/**
 * The content of /studiekeuzetraject.
 *
 * The page is rebuilt to the client's own design (`docs/redesign/client/
 * het-traject/`, design-spec 4.2). Where the client's copy is newer than the
 * text the archive gave us, the client wins, so the four meetings below carry
 * the client's wording and the two tests are back: the client's feedback of
 * 2026-08-12 reversed the decision of 2026-08-04 that this site sells no
 * tests. What stays removed is what we cannot prove of ourselves: "92%",
 * "meest gevraagde partij", "meest ervaren partij" and "in vrijwel alle grote
 * steden". See PRODUCT.md, "Say only what is true".
 *
 * WARNING ABOUT `homework`. The old page says that you work on assignments in
 * the meeting and at home, but it never says which assignments. The lines
 * below are the client's own, so they are the client's claim about the client's
 * own method. If the work is different, change the text here. Nothing else has
 * to change.
 */

import { scan } from "@/app/pricing";

export type Meeting = {
  /** Shown large, and hidden from screen readers. The list carries the order. */
  number: string;
  title: string;
  body: string;
  /** What you do before the next one. The last meeting has nothing after it. */
  homework: string | null;
};

/** The four names are the names of the old page, word for word. */
export const meetings: Meeting[] = [
  {
    number: "01",
    title: "Wie ben ik en wat kan ik?",
    body: "Je begint bij jezelf, niet bij opleidingen. Waar word je blij van, waar loop je op leeg, en wat kun je goed zonder dat je het bijzonder vindt? Dat laatste is meestal het belangrijkste: je eigen talent voelt vaak als iets gewoons. Een persoonlijkheidstest helpt hierbij.",
    homework:
      "Je vraagt aan drie mensen die je goed kennen waar zij jou goed in vinden. De antwoorden verrassen bijna iedereen.",
  },
  {
    number: "02",
    title: "Blik op de toekomst",
    body: "Een studie is een middel. Daarom kijken we een stap verder: in wat voor werk zou je passen, met wat voor mensen, in wat voor omgeving? Je hoeft nog geen beroep te kiezen, alleen te weten welke richting warm aanvoelt.",
    homework:
      "Je praat met iemand die het werk doet dat jou aanspreekt. Eén gesprek van een half uur zegt meer dan tien websites.",
  },
  {
    number: "03",
    title: "Mijn interesses en verdieping",
    body: "Nu pas kijken we naar opleidingen. Met de studie-interessetest en je coach maak je de lijst kort: van duizenden naar een stuk of tien, en van tien naar drie. Bij elke opleiding kijken we naar het rooster en de vakken, niet naar de folder.",
    homework:
      "Je gaat naar de open dagen van de opleidingen die overblijven. Let vooral op de mensen die er rondlopen: daar zit je straks tussen.",
  },
  {
    number: "04",
    title: "De studiekeuze",
    body: "Je legt je keuze naast alles wat je in de gesprekken hebt ontdekt. Klopt het, dan schrijf je op waarom, in je eigen woorden. Klopt het niet helemaal, dan weet je nu waar het wringt. Ook dat is winst, en beter nu dan in november.",
    homework: null,
  },
];

/**
 * The two tests, and who makes them.
 *
 * WARNING. "TalentDrives" and "meer dan 30 jaar" are facts about a third
 * party. The client supplied both when the tests came back on 2026-08-12, so
 * they are printed as the client's claim and not as ours. If TalentDrives is
 * not the supplier of the tests a coach really uses, this block is the only
 * place that has to change.
 */
export const tests = {
  supplier: "TalentDrives",
  /** The two letters in the violet square next to the supplier's name. */
  monogram: "TD",
  claim: "30+ jaar ervaring in assessments en testontwikkeling",
  body: [
    "Onze testen zijn ontwikkeld door TalentDrives, met meer dan 30 jaar ervaring in assessments, coaching en testontwikkeling. De instrumenten zijn praktijkgericht en betrouwbaar, en sluiten aan bij de ontwikkelingsfase van jongeren.",
    "Zo weet je zeker dat je werkt met inzichten die niet alleen theorie, maar ook de dagelijkse realiteit weerspiegelen.",
  ],
  pills: [
    "Persoonlijkheidstest",
    "Studie-interessetest",
    "Praktijkgericht en betrouwbaar",
  ],
} as const;

export type ScanStep = { number: string; title: string; body: string };

/**
 * The three steps of the Studiekeuzescan. The client's export calls this
 * product "KeuzeScan" on this page and "Studiekeuzescan" on the home page and
 * on /tarieven. One product with two names is a defect, so the priced name
 * wins on every page (design-spec, open question 6).
 */
export const scanSteps: ScanStep[] = [
  {
    number: "1",
    title: "Persoonlijkheidstest",
    body: "Thuis, in je eigen tempo.",
  },
  {
    number: "2",
    title: "Interessetest",
    body: "Welke studierichtingen passen bij wat jou boeit?",
  },
  {
    number: "3",
    title: "Eén online sessie met een coach",
    body: "Resultaten in een matrix, toelichting op je antwoorden en concrete vervolgstappen.",
  },
];

/**
 * What the scan costs. The client decided the three prices; /tarieven prints
 * all three, and this page prints the one it is talking about, so a reader who
 * lands here does not have to leave to learn what it costs. The figure itself
 * lives in app/pricing.ts, with the other three.
 */
export const scanPrice = scan.label;

export type Reason = { eyebrow: string; title: string; body: string };

/**
 * "Waarom StudiekeuzeAdvies". The old page had a fourth block, "92% door naar
 * het 2e jaar". We cannot prove that figure, so the block is not here.
 */
export const reasons: Reason[] = [
  {
    eyebrow: "Doelgericht",
    title: "Doelgerichte trajecten",
    body: "Het traject is zo opgebouwd dat je, samen met je eigen coach, stap voor stap toewerkt naar een keuze. Leren, ontdekken, ervaren en kiezen.",
  },
  {
    eyebrow: "Zekerheid",
    title: "Kiezen met zekerheid",
    body: "Doordat je in het hele traject begeleiding krijgt, weet je aan het eind waarom je kiest wat je kiest. Zo begin je zelfverzekerd aan je opleiding.",
  },
  {
    eyebrow: "Dichtbij",
    title: "Bij jou in de buurt",
    body: "Je spreekt af in de stad waar je coach werkt, en anders gaan de gesprekken online. Dat werkt beter dan je denkt.",
  },
];
