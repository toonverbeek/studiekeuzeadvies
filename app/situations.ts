/**
 * The content of /eerste-studiekeuze and /verkeerde-studiekeuze.
 *
 * These two pages carry the editorial link value of the whole article corpus:
 * 58 and 54 of the 63 archived articles link to them. Their URLs and their old
 * titles are kept word for word, because that is what ranks.
 *
 * THE WORDS ARE THE OLD WORDS. This file keeps the sentences of the old pages
 * where they are true and where we may use them. It is not a rewrite. Four
 * things are taken out:
 *
 * - "Bewezen effectief", the 92 percent figure and the 8,8 rating. We cannot
 *   prove them. See PRODUCT.md, "Say only what is true".
 * - Qompas, the four tests, the Keuzegids and the TalentenTest. They belong to
 *   the seller, and this site does not sell them.
 * - "Het beste alternatief voor open dagen en andere voorlichtingsactiviteiten
 *   die voorlopig geen doorgang vinden gezien de huidige maatregelen." That
 *   line is from 2020 and it is not true now.
 * - The link to /tarieven/. There is no price page yet, and no price decision.
 *
 * The line about online meetings stays. It is the old copy, and the traject
 * page already makes the same promise.
 */

export type Section = {
  /** The heading, and one entry in both indexes. */
  title: string;
  paragraphs: string[];
};

export type Situation = {
  slug: string;
  /** The small line above the title. */
  eyebrow: string;
  /** The h1. Two words, as on the old page. */
  title: string;
  /** The <title>. The old one, word for word. */
  seoTitle: string;
  description: string;
  /** The opening paragraph of the old page. */
  lead: string;
  sections: Section[];
  /** The line above the four themes, and the four themes of the old page. */
  themesIntro: string;
  themes: string[];
  /** The articles under "Lees ook", by slug. Missing slugs are skipped. */
  related: string[];
};

/** The four themes are the four the old landing pages list, word for word. */
const themes = [
  "Oriëntatie",
  "Wie ben ik en wat kan ik?",
  "Blik op de toekomst",
  "De studiekeuze",
];

export const situations: Situation[] = [
  {
    slug: "verkeerde-studiekeuze",
    eyebrow: "Als je bent gestopt of twijfelt",
    title: "Verkeerde studiekeuze",
    seoTitle: "Verkeerde studiekeuze? Geen paniek! | (Online) StudieKeuzeAdvies",
    description:
      "Bleek jouw eerste studiekeuze toch niet bij jou te passen? Met een persoonlijke coach ga jij aan de slag om dit keer wél de juiste studiekeuze te maken.",
    lead: "De keuze voor de juiste studie kan verdraaid lastig zijn. Dat merken eindexamenscholieren vaak op het moment dat ze zich serieus gaan oriënteren op hun vervolgopleiding. Wanneer jij al gestopt bent met een opleiding of erover denkt te stoppen met een studie, weet jij nog veel beter hoe lastig een studie kiezen kan zijn.",
    sections: [
      {
        title: "Het traject",
        paragraphs: [
          "Bij StudieKeuzeAdvies ga jij met een persoonlijke en ervaren studiecoach aan de slag om dit keer wél de juiste studiekeuze te maken. Je ontdekt in vier bijeenkomsten wie je bent, wat je kan en welke studiemogelijkheden er zijn. We richten ons volledig op het einddoel, de studiekeuze. We kijken ook naar de invulling daarna, waaronder: beroep, carrière en werkomgeving. Aan het eind van het traject heb jij deze keer wél een passende studiekeuze gemaakt.",
          "Het is ook mogelijk om de trajecten online te volgen, uiteraard afhankelijk van jouw wensen en behoeften.",
        ],
      },
      {
        title: "Nieuwe studie kiezen",
        paragraphs: [
          "Het allerbelangrijkst: heb je een verkeerde studiekeuze gemaakt, realiseer je dan dat er geen man overboord is. Het voelt misschien als het eind van de wereld, dat is het niet. Dat neemt natuurlijk niet weg dat een studie die niet passend blijkt te zijn erg vervelend is. Gelukkig zijn er best dingen te regelen. Want geloof het of niet: als jij één keer, of zelfs meerdere keren, een verkeerde studiekeuze hebt gemaakt heeft dat voordelen. Door je verkeerde keuze heb je al de nodige ervaring opgedaan. Ervaring die wij inzetten om samen met jou dit keer wél de juiste studiekeuze te maken.",
          "Volgens ons heb je dus bepaalde voordelen als je al eens eerder een verkeerde studie hebt gekozen. Ten eerste dankzij de ervaring die je meebrengt. Je hebt al een tijdje op een hogeschool of universiteit rondgelopen, dus je weet hoe het werkt. Tentamenperiode op de uni of de hogeschool? Jij hebt het meegemaakt. Wat is een werkgroep? Weet jij al. Hoe gaat een hoorcollege in zijn werk? Niets bijzonders. Kortom, als opnieuw-studiekiezer zijn er enorm veel zaken die jij al weet. Vergelijk jezelf eens met de persoon die je was toen je net van de middelbare school afkwam. Je mag dan in eerste instantie een verkeerde studiekeuze hebben gemaakt, de ervaring die je op die niet-passende studie hebt opgedaan is onbetaalbaar tijdens het opnieuw kiezen van een studie. En wel de juiste studie.",
        ],
      },
      {
        title: "Wat doet StudieKeuzeAdvies voor jou?",
        paragraphs: [
          "Jij wilt een studie kiezen, wat doet StudieKeuzeAdvies tijdens een keuzetraject voor jou? Een betere vraag is: wat doet StudieKeuzeAdvies sámen met jou? Jij gaat een nieuwe en passende studie kiezen, wij zijn er voor de ondersteuning en de begeleiding. We gaan kijken naar wie jij bent, en wat je kunt. We betrekken je interesses en je toekomstbeeld bij de studiekeuze, en we kijken samen met jou terug naar je eerdere verkeerde studiekeuze.",
          "Met name voor studenten die opnieuw kiezen zit er vaak een knelpunt bij het stukje verleden. Je hebt immers al eens gekozen en dat was helaas geen succes. Dat je daardoor bewust of onbewust spanning ervaart bij het idee dat je weer een belangrijke keuze moet maken is logisch. We zijn gewend om studenten te begeleiden die zich in deze situatie bevinden.",
        ],
      },
      {
        title: "Help, mijn situatie is net wat lastiger",
        paragraphs: [
          "Misschien denk je bij het lezen van deze tekst wel: allemaal leuk en aardig, dat opnieuw kiezen, maar bij mij is het allemaal net wat lastiger. Dat zijn gedachten die vooral opkomen bij studenten die vaker dan één keer een verkeerde keuze hebben gemaakt. Om maar direct duidelijk te zijn: wanneer je twee, drie of zelfs vier keer eerder een studiekeuze hebt gemaakt, en het bleek steeds niet de juiste te zijn, dan moet er in elk geval wat veranderen.",
          "Herken jij jezelf hierin? Ook met deze situaties hebben we voldoende ervaring. Ben je het zat om een verkeerde keuze voor een studie te maken en heb je de moed al bijna opgegeven? Je bent niet de enige met dit probleem, en je bent zeker geen hopeloos geval. Samen met je eigen studiekeuzecoach zetten we je op het goede spoor.",
        ],
      },
    ],
    themesIntro:
      "De thema's van de vier coachingsgesprekken zijn als volgt.",
    themes,
    related: ["gestopt-met-je-studie-blijf-niet-stilzitten", "de-1-februariregeling"],
  },
  {
    slug: "eerste-studiekeuze",
    eyebrow: "Als je voor het eerst kiest",
    title: "Eerste studiekeuze",
    seoTitle: "Bewuste studiekeuze | mbo, hbo of wo | (Online) StudieKeuzeAdvies",
    // The old description sold the page as the alternative to open days that
    // were cancelled in 2020. That is gone, so this line is new.
    description:
      "Ga je voor het eerst studeren en weet je nog niet wat? In vier bijeenkomsten met een eigen studiekeuzecoach maak je een keuze die echt bij je past.",
    lead: "Een studiekeuze maken is iets heel persoonlijks. Het gaat namelijk om jouw toekomst. Om jou als studiekiezer zo goed mogelijk te begeleiden in je keuzeproces, hebben wij een eigen studiekeuzetraject ontwikkeld. Met behulp van een persoonlijke studiekeuzecoach helpen wij jou om een studiekeuze te maken die echt bij je past.",
    sections: [
      {
        title: "Het traject",
        paragraphs: [
          "Met het persoonlijke en doelgerichte studiekeuzetraject begeleiden wij jou op gestructureerde wijze naar een passende vervolgstudie. Je krijgt een enthousiaste en ervaren studiekeuzecoach met wie je in totaal vier bijeenkomsten op een locatie bij jou in de buurt zult hebben.",
          "Het is ook mogelijk om de trajecten online te volgen, uiteraard afhankelijk van jouw wensen en behoeften.",
        ],
      },
      {
        title: "Mbo, hbo of wo? Je kunt alle kanten op",
        paragraphs: [
          "Het kan heel logisch aanvoelen: na het vwo ga je naar de universiteit, na de havo ga je naar het hbo, en na het vmbo ga je naar het mbo. Maar dit hoeft niet zo te zijn.",
          "Je niveau maakt voor onze aanpak niet uit. We helpen bij een keuze op mbo-, hbo- en wo-niveau, en in het traject kijken we naar wat bij jou past, niet naar wat bij je diploma hoort.",
        ],
      },
      {
        title: "Voor je ouders",
        paragraphs: [
          "Je kind gaat studeren. Een spannende tijd breekt aan. Ook als ouder, want: hoe ben je tot steun?",
          "In het gratis intakegesprek leggen we uit wat er in de vier bijeenkomsten gebeurt, wat je kind zelf doet en wat wij doen. Je bent welkom bij dat gesprek. Daarna beslissen jullie samen, zonder haast.",
        ],
      },
    ],
    themesIntro:
      "Je gaat met gezamenlijke en individuele opdrachten aan de slag, zowel tijdens de bijeenkomst als thuis. De thema's van de vier gesprekken zijn als volgt.",
    themes,
    related: ["artikel-aanmelden-studies", "de-1-februariregeling"],
  },
];

export function getSituation(slug: string): Situation | undefined {
  return situations.find((situation) => situation.slug === slug);
}
