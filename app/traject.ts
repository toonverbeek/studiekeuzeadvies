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
  /**
   * The heading of the orange box beside the meeting. Three of the four say
   * "Daarna, thuis"; the client changed the third and the fourth (row T5).
   */
  homeworkTitle: string;
  /**
   * What you do before the next one. null on the last meeting: after that one
   * you enrol, and the heading says so on its own.
   */
  homework: string | null;
};

/**
 * The four meetings, and what you do at home between them.
 *
 * ALL EIGHT TEXTS ARE THE CLIENT'S OWN, from the mail of 21 August 2026 (rows
 * T4 and T5). They rewrote every title, every body and every homework line,
 * and the mail carries a shorter set for the home page: app/page.tsx holds
 * those, and the two are meant to differ.
 *
 * `homeworkTitle` is new. Three meetings say "Daarna, thuis" and the third one
 * says "Daarna, thuis en erop uit", because that is the week the reader
 * actually leaves the house. The fourth says "Daarna, inschrijven!" and it is
 * the one card whose heading is the whole message: `homework` stays null there
 * and the heading carries it alone.
 */
export const meetings: Meeting[] = [
  {
    number: "01",
    title: "Wie ben ik en wat kan ik?",
    body: "Je begint bij jezelf, niet bij opleidingen. Waar word je blij van, waar loop je op leeg, en wat kun je goed zonder dat je het bijzonder vindt? Dat laatste is meestal het belangrijkste: je eigen talent voelt vaak als iets gewoons.",
    homeworkTitle: "Daarna, thuis",
    homework:
      "Maken van opdrachten over wie jij bent en de persoonlijkheidstest.",
  },
  {
    number: "02",
    title: "Interesses en blik op de toekomst.",
    body: "Met de studie-interessetest komen we tot een lijst met best passende studies. En we onderzoeken hoe jij je toekomst voor je ziet.",
    homeworkTitle: "Daarna, thuis",
    homework:
      "Maken van opdrachten gericht op de toekomst en de studie-interessetest.",
  },
  {
    number: "03",
    title: "Oriënteren en erop uit!",
    body: "Nu ga je gericht kijken naar opleidingen. Met de studie-interessetest en je coach breng je de mogelijkheden terug: van duizenden opleidingen naar ongeveer tien en uiteindelijk naar een shortlist van twee of drie opleidingen die echt bij je passen. Je verdiept je online in deze opleidingen en kijkt verder dan mooie folders en verhalen. Welke vakken krijg je? Hoe is de opleiding opgebouwd? Wat kun je ermee? Daarna ga je goed voorbereid op pad naar open dagen en proeflessen, zodat je zelf kunt ervaren wat bij je past.",
    homeworkTitle: "Daarna, thuis en erop uit",
    homework:
      "Verdiepen in opleidingen, gericht en goed voorbereid naar de open dagen en meelopen of proefstuderen.",
  },
  {
    number: "04",
    title: "De studiekeuze.",
    body: "Je vergelijkt je overgebleven opties met wat je over jezelf hebt ontdekt. Wat past bij jouw interesses, kwaliteiten en manier van leren? Je zet op een rij waarom je voor een opleiding kiest. Zo maak je uiteindelijk een bewuste keuze waar je helemaal achter staat.",
    homeworkTitle: "Daarna, inschrijven!",
    homework: null,
  },
];

/**
 * The two tests.
 *
 * ROW T6: THE SUPPLIER IS NO LONGER NAMED. The panel carried a violet "TD"
 * monogram, "Ontwikkeld door TalentDrives" and "30+ jaar ervaring in
 * assessments en testontwikkeling". The client replaced all three with one
 * heading of their own, "Betrouwbare tests, gericht op betere keuzes", and
 * wrote the body underneath themselves. The thirty years is still in that
 * text, now as a claim about experience and not as a supplier's badge. So the
 * `supplier`, `monogram` and `claim` fields are gone, and with them the one
 * place on this site that made a promise on a third party's behalf.
 *
 * "matrix + rapportage" is the third pill, at the client's request.
 */
export const tests = {
  heading: "Betrouwbare tests, gericht op betere keuzes",
  body: [
    "Een studie kiezen betekent je verdiepen in een wereld die vaak nog grotendeels onbekend is. Er zijn veel opleidingen, richtingen en mogelijkheden. Onze tests helpen om daarin structuur aan te brengen. Ze zijn ontwikkeld vanuit meer dan 30 jaar ervaring met assessments, studiekeuze, coaching en testontwikkeling en zijn gericht op het verkrijgen van betrouwbare inzichten in persoonlijkheid en interesses.",
    "Zo wordt duidelijker waar je voorkeuren liggen, wat bij je past en welke richtingen het meest interessant zijn om verder te onderzoeken. De testuitslagen vormen daarbij het vertrekpunt. Samen met de studiekeuzeadviseur geef je betekenis aan de resultaten, leg je verbanden en vertaal je de inzichten naar concrete opleidingen en keuzes. Zo ontstaat stap voor stap overzicht in een zoektocht die aan het begin vaak nog heel breed en onbekend is.",
  ],
  pills: [
    "Persoonlijkheidstest",
    "Studie-interessetest",
    "Praktijkgericht & betrouwbaar",
    "Matrix + rapportage",
  ],
} as const;

export type ScanStep = { number: string; title: string; body: string };

/**
 * The three steps of the StudieKeuzeScan, in the client's own words (row T7).
 *
 * THE PRODUCT HAS ONE NAME NOW. The client's export called it "KeuzeScan" on
 * this page and "Studiekeuzescan" on the home page and on /tarieven, and the
 * rebuild picked the priced name to stop one product having two. The client's
 * mail settles it for good and gives a third spelling that is the only one:
 * "KeuzeScan moet overal StudieKeuzeScan worden" (rows A2 and T7).
 */
export const scanSteps: ScanStep[] = [
  {
    number: "1",
    title: "Persoonlijkheidstest",
    body: "Thuis, online, in je eigen tempo.",
  },
  {
    number: "2",
    title: "Interessetest",
    body: "Welke studierichtingen passen bij jou?",
  },
  {
    number: "3",
    title: "Eén online sessie met een coach",
    body: "De testresultaten ontvang je in een rapportage. Toelichting op je antwoorden en concrete vervolgstappen krijg je van je coach.",
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
 * "Waarom StudieKeuzeAdvies". The old page had a fourth block, "92% door naar
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
