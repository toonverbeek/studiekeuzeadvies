/**
 * The content of /studiekeuzetraject.
 *
 * The page follows the section order of the old page at
 * `../studiekeuzeadvies archive/markdown/studiekeuzetraject.md`, and it keeps
 * the old words where they are true and in voice. Four things are removed on
 * purpose:
 *
 * - The figure "92%" and the claims "meest gevraagde partij" and "meest
 *   ervaren partij". We cannot prove them. See PRODUCT.md, "Say only what is
 *   true".
 * - Qompas, the tests and the Keuzegids. They belong to the seller, and this
 *   site does not sell them.
 * - The section "Unieke samenwerking". It only names those partners.
 * - "in vrijwel alle grote steden". At this moment we have a few cities.
 *
 * WARNING ABOUT `homework`. The old page says that you work on assignments in
 * the meeting and at home, but it never says which assignments. The lines
 * below are written to be true to that shape. A real coach must confirm that
 * this is the work they really give. If the work is different, change the text
 * here. Nothing else has to change.
 */

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
    body: "Je begint bij jezelf, niet bij opleidingen. Waar word je blij van, waar loop je op leeg, en wat kun je goed zonder dat je het bijzonder vindt? Dat laatste is meestal het belangrijkste, want je eigen talent voelt vaak als iets gewoons.",
    homework:
      "Je vraagt aan drie mensen die je goed kennen waar zij jou goed in vinden. De antwoorden verrassen bijna iedereen.",
  },
  {
    number: "02",
    title: "Blik op de toekomst",
    body: "Een studie is een middel. Daarom kijken we een stap verder: in wat voor werk zou je passen, met wat voor mensen, en in wat voor omgeving? Je hoeft nog geen beroep te kiezen. Je moet alleen weten welke richting warm aanvoelt.",
    homework:
      "Je praat met iemand die het werk doet dat jou aanspreekt. Eén gesprek van een half uur zegt meer dan tien websites.",
  },
  {
    number: "03",
    title: "Mijn interesses en verdieping",
    body: "Nu pas gaan we naar opleidingen kijken. Je coach helpt je de lijst kort te maken: van duizenden naar een stuk of tien, en van tien naar drie. Bij elke opleiding kijken we naar het rooster en de vakken, niet naar de folder.",
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
 * "Welk keuze-type ben jij?" The old page had these eight lines. They do the
 * work of a self-test without being one: je herkent jezelf, of niet.
 */
export const chooserTypes: string[] = [
  "Je bent een serieuze scholier die zich goed wil voorbereiden op je toekomst.",
  "Je hebt geen idee wat je wilt, of je vindt juist veel leuk en je twijfelt.",
  "Je woont in het buitenland en je zou graag in Nederland gaan studeren, maar je weet niet welke opleidingen er zijn.",
  "Je vraagt je af welke studie bij je past, of je worstelt met de vraag wat je wilt worden.",
  "Je hebt al een idee wat je wilt gaan studeren, maar je wilt verder kijken dan je eerste ingeving.",
  "Je bent gestopt met een studie en je weet nu niet wat je wilt gaan doen.",
  "Je bent nog bezig met een studie, maar je twijfelt of die wel bij je past.",
  "Je vindt het moeilijk om overzicht te krijgen in alle mogelijkheden.",
];

/** `href` is null where the door has no page of its own yet. */
export type Path = { title: string; body: string; href: string | null };

/** The three doors of the old page, in the order the old page used. */
export const paths: Path[] = [
  {
    href: "/eerste-studiekeuze",
    title: "Eerste studiekeuze",
    body: "Ga je voor het eerst een opleiding starten, maar heb je geen idee wat je wilt gaan doen? Lijken veel opleidingen je leuk, waardoor je geen keuze kunt maken? Of wil je je gewoon goed voorbereiden op de toekomst? We helpen je een passende keuze te maken voor een vervolgopleiding.",
  },
  {
    href: "/verkeerde-studiekeuze",
    title: "Verkeerde studiekeuze",
    body: "Ben je gestopt met een studie en weet je niet wat je nu wilt gaan doen? Of ben je nog bezig met een studie, maar twijfel je of die wel bij je past? Aan het eind van het traject heb je een overwogen keuze gemaakt voor de studie die écht bij je past. Wachten tot september hoeft niet.",
  },
  {
    // The page behind this door is about ADD and ADHD only. The door keeps the
    // wider wording; see the note on the same door in app/page.tsx.
    href: "/studiekeuze-met-add-adhd",
    title: "Studeren met ADD, ADHD of autisme",
    body: "Ben je gediagnosticeerd met ADD, ADHD of autisme? Dan helpt overzicht meer dan nog meer opties. Vaste stappen, één ding per keer, dezelfde coach elke afspraak, en van tevoren weten wat er gaat gebeuren. Zeg het in het intakegesprek, dan houdt je coach er rekening mee.",
  },
];

export type Reason = { title: string; body: string };

/**
 * "Waarom StudieKeuzeAdvies". The old page had a fourth block, "92% door naar
 * het 2e jaar". We cannot prove that figure, so the block is not here.
 */
export const reasons: Reason[] = [
  {
    title: "Doelgerichte trajecten",
    body: "Het traject is zo opgebouwd dat je, samen met je eigen coach, stap voor stap toewerkt naar een keuze. Leren, ontdekken, ervaren en kiezen.",
  },
  {
    title: "Kiezen met zekerheid",
    body: "Doordat je in het hele traject begeleiding krijgt, weet je aan het eind waarom je kiest wat je kiest. Zo begin je met een zelfverzekerd gevoel aan je nieuwe opleiding.",
  },
  {
    title: "Bij jou in de buurt",
    body: "Je spreekt af in de stad waar je coach werkt, en anders gaan de gesprekken online. Dat werkt beter dan je denkt.",
  },
];

/** "Waarom is het maken van de juiste studiekeuze zo belangrijk?" */
export const whyItMatters: string[] = [
  "De keuze voor een vervolgstudie is één van de belangrijkste keuzes die je tot nu toe hebt moeten maken. Tegelijk is de uitval en de switch in het eerste jaar van het mbo, hbo en wo hoog.",
  "Het grootste deel van de studenten die uitvallen, valt uit omdat de studie niet bleek te passen. Je moet op jonge leeftijd kiezen, en je bent vaak niet overtuigd van je keuze. Veel scholieren stellen het kiezen ook uit, en maken op het laatste moment snel een keuze die misschien helemaal niet de juiste is.",
  "Een verkeerde studiekeuze kost niet alleen geld, maar kan je ook veel stress bezorgen, doordat je toekomst onzeker lijkt. Goede begeleiding helpt je bij het maken van een overwogen keuze. Dat scheelt frustratie, teleurstelling en een hoop geld.",
];
