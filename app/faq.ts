/**
 * The content of /veelgestelde-vragen.
 *
 * The old page at `../studiekeuzeadvies archive/markdown/over-ons__veelgestelde-vragen.md`
 * asked five questions. Three come back word for word, one is dropped, and one
 * is postponed. Five questions are new.
 *
 * THE OLD WORDS, WORD FOR WORD. Nothing is added and nothing is cut in these
 * three answers. The only change is where a paragraph breaks, so a long answer
 * is easier to read on a telephone at night.
 *
 * - "Wat houdt StudieKeuzeAdvies in?"
 * - "Voor wie is StudieKeuzeAdvies?"
 * - "Hoe lang duurt een traject?" The old question read "Hoe lang duurt een
 *   traject bij StudieKeuzeAdvies?". The page already carries our name, so the
 *   question says it once instead of twice. The answer is untouched.
 *
 * NEW, AND EVERY LINE IS PROVABLE FROM A PAGE THAT ALREADY EXISTS. This page
 * may not be the first place a promise is made. Where a new answer says
 * something, another page in this repo says it too:
 *
 * - "Wat gebeurt er in het intakegesprek?" from the invitation band on
 *   /studiekeuzetraject and on both situation pages, from `ContactSection`, and
 *   from "Voor je ouders" in app/situations.ts.
 * - "Wie is mijn coach?" from /studiekeuzecoaches: one coach for the whole
 *   traject, the coach of your region where there is one, and the choice stays
 *   yours. Nothing here describes what a coach has studied or how long they
 *   have done this work. No coach is under contract. See todos.md.
 * - "Waar vinden de gesprekken plaats?" from /locaties and from the meeting
 *   place block on a city page.
 * - "Kan het ook online?" is the old line that already stands in
 *   app/situations.ts, plus the online paragraph of the city pages.
 * - "Wat als het niet blijkt te passen?" from the invitation band: the intake
 *   is free and you say no afterwards. It stays away from money and from the
 *   terms of the contract, because those are not decided.
 *
 * REMOVED, AND WHY:
 *
 * - The whole answer to "Waarom StudieKeuzeAdvies?". It was the Keuzegids with
 *   an online licence, the tests of Talentfocus, and a list of partners. Those
 *   belong to the seller. What was left after taking them out is one sentence
 *   that says nothing, so the question does not come back.
 * - "de enige echt onafhankelijke consumentengids". A superlative we cannot
 *   prove, about a product we do not sell.
 * - The whole question about the price, and both amounts. The price is not
 *   decided, so this page says nothing about it: no "vanaf", no range, no
 *   placeholder. See todos.md. One line of that old answer does survive, in the
 *   intake answer below: the intake is free because the click between you and
 *   your coach has to be right.
 * - The 088 number in the running text. It belonged to the seller, and since
 *   issue #7 this site prints no central number at all: a reader picks a city
 *   and writes to the coach who works there.
 *
 * NO FAQ STRUCTURED DATA. An FAQPage script is a separate decision and it sits
 * in todos.md. It is not added here.
 */

export type AnswerLink = { href: string; label: string };

export type Question = {
  /**
   * The anchor. Short and written by hand, not made from the question: a
   * reworded question must not break a link that somebody saved or shared.
   */
  id: string;
  /** The h2, and one line in the "Op deze pagina" index. */
  question: string;
  /** One string per paragraph. */
  answer: string[];
  /** Where the full answer lives. Empty where there is no better page. */
  links: AnswerLink[];
};

export const questions: Question[] = [
  {
    id: "wat-is-het",
    question: "Wat houdt StudieKeuzeAdvies in?",
    answer: [
      "Bij StudieKeuzeAdvies bieden we hulp bij het maken van de juiste studiekeuze. Dit doen wij voor scholieren die hun eerste studiekeuze moeten maken of voor studenten die een verkeerde studie hebben gekozen.",
      "In vier bijeenkomsten ontdek je samen met een persoonlijke studiecoach wie jij bent, waar jouw interesses liggen en welke mogelijkheden er zijn. Aan het einde van het studiekeuzetraject heb je een weloverwogen keuze gemaakt voor een studie die echt bij jou past!",
    ],
    links: [
      { href: "/studiekeuzetraject", label: "Lees per gesprek wat je doet" },
    ],
  },
  {
    id: "voor-wie",
    question: "Voor wie is StudieKeuzeAdvies?",
    answer: [
      "StudieKeuzeAdvies is voor scholieren die niet weten wat ze willen studeren en hulp nodig hebben bij het maken van de keuze voor een mbo, hbo of wo opleiding.",
      "Of voor studenten die een verkeerde studiekeuze hebben gemaakt en hulp nodig hebben bij het maken van een nieuwe keuze voor een mbo, hbo of wo opleiding.",
    ],
    links: [
      { href: "/eerste-studiekeuze", label: "Ik kies voor het eerst" },
      { href: "/verkeerde-studiekeuze", label: "Ik ben al eens gestopt" },
    ],
  },
  {
    id: "hoe-lang",
    question: "Hoe lang duurt een traject?",
    answer: [
      "In totaal heb je vier bijeenkomsten met een persoonlijke studiecoach. De sessies duren ongeveer 60 tot 90 minuten. De laatste bijeenkomst duurt altijd iets langer, aangezien daar de definitieve studiekeuze wordt gemaakt.",
      "Je stemt samen met je studiecoach af wanneer de bijeenkomsten plaatsvinden, meestal is dit 1 keer per week. Dit is uiteraard afhankelijk van jouw wensen en behoeftes.",
    ],
    links: [],
  },
  {
    id: "intakegesprek",
    question: "Wat gebeurt er in het intakegesprek?",
    answer: [
      "Je vertelt wat er speelt: waar je nu staat, wat je al hebt geprobeerd en waar je vastloopt. Wij leggen uit hoe een traject werkt, wat er in de vier bijeenkomsten gebeurt, wat je zelf doet en wat je coach doet. En we horen of dit traject bij je past.",
      "Ben je ouder of verzorger? Dan ben je welkom bij dat gesprek. Het intakegesprek is gratis, want we willen dat er een goede klik is tussen jou en je coach. Daarna beslis je, zonder haast.",
    ],
    links: [],
  },
  {
    id: "je-coach",
    question: "Wie is mijn coach?",
    answer: [
      "Je krijgt één coach, en het blijft dezelfde: van het intakegesprek tot het moment dat je keuze rond is. Geen wisselend team en geen wachtrij, dus je hoeft je verhaal maar één keer te vertellen.",
      "Meestal is het de coach van jouw regio, en anders kijken we samen wat wel kan. Op de coachespagina lees je wie de coaches zijn, waar ze vandaan komen en met wie ze het vaakst werken.",
      "Je coach stelt vragen en zoekt mee. Wat je uiteindelijk kiest, kies je zelf. Niemand vult dat voor je in.",
    ],
    links: [
      { href: "/studiekeuzecoaches", label: "Maak kennis met de coaches" },
    ],
  },
  {
    id: "waar",
    question: "Waar vinden de gesprekken plaats?",
    answer: [
      "Je spreekt af in de stad waar je coach werkt, op een plek die we samen kiezen. Meestal een rustige ruimte in het centrum, dicht bij het station.",
      "We noemen alleen steden waar op dit moment echt een coach werkt. Dat zijn er minder dan vroeger, en dat is met opzet: een naam op een lijst helpt je niet, een mens wel.",
      "Staat jouw stad er niet bij, dan kijken we of een coach uit een buurstad tijd heeft, en anders gaan de gesprekken online.",
    ],
    links: [{ href: "/locaties", label: "Bekijk alle locaties" }],
  },
  {
    id: "online",
    question: "Kan het ook online?",
    answer: [
      "Het is ook mogelijk om de trajecten online te volgen, uiteraard afhankelijk van jouw wensen en behoeften.",
      "Dat werkt beter dan je denkt: je zit thuis, je bent geen reistijd kwijt, en je kunt tussendoor rustig nadenken. Voor sommige gesprekken werkt een scherm ertussen zelfs beter.",
    ],
    links: [],
  },
  {
    id: "past-het-niet",
    question: "Wat als het niet blijkt te passen?",
    answer: [
      "Dan zeg je nee. Het intakegesprek is gratis en je zit nergens aan vast, dus je hoeft geen reden te geven. Wij zeggen het ook als we denken dat dit traject je niet verder helpt. Aan een traject dat niet past heeft niemand iets.",
      "Merk je het pas tijdens het traject? Zeg het dan tegen je coach. Twijfel hoort bij kiezen, en je coach kan er pas iets mee als je het hardop zegt.",
    ],
    links: [],
  },
];
