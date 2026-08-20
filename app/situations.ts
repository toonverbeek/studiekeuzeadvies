/**
 * The content of /eerste-studiekeuze, /verkeerde-studiekeuze and
 * /studiekeuze-met-add-adhd.
 *
 * The first two carry the editorial link value of the whole article corpus:
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
 *
 * ONE SECTION ON /verkeerde-studiekeuze IS NEW: "Misschien lag het aan het
 * niveau". It is added after "Nieuwe studie kiezen", so it changes nothing in
 * the order of the old sections. Two reasons for it. This page is the link
 * target of 54 of the 63 archived articles and it pointed at none of the three
 * level pages, which had one inbound link each. And section 4 of
 * docs/rebuild-review.md measures this page 33 percent shorter than the old
 * one, and names it as one of the two pages where new copy has to be written
 * rather than migrated. The claims in it are about the education system, not
 * about us: a level is a question and not a given, and a diploma decides what
 * you may do rather than what fits you. The second one is the sentence
 * /eerste-studiekeuze already carries.
 *
 * ---
 *
 * THE THIRD PAGE, /studiekeuze-met-add-adhd. The old page is
 * `../studiekeuzeadvies archive/markdown/studiekeuze-met-add-adhd.md`, and its
 * <title> is kept letter for letter. Taken out of it:
 *
 * - The whole block "Inclusief TalentenTest en Keuzegids". The TalentenTest and
 *   the Keuzegids belong to the seller, and "de enige echt onafhankelijke" is a
 *   superlative we cannot prove either way.
 * - The 088 number, and the two "Vragen of advies nodig?" blocks around it. It
 *   belonged to the seller, and since issue #7 this site prints no central
 *   number at all. The route to a coach in your own city does this work now.
 * - "een enthousiaste en ervaren studiekeuze coach". No coach has signed, so
 *   nothing here says who the coaches are or what they have done before. For
 *   the same reason, no sentence on this page claims experience with ADD or
 *   ADHD. What the traject does is described instead.
 * - Every price. The old page routed to /tarieven/, and there is no price
 *   decision yet.
 * - Three exclamation marks. The sentences are the old sentences; the shouting
 *   is not our voice. "studiekeuze traject" is also written as one word here,
 *   the way the rest of the site writes it.
 *
 * THE H1 CHANGED, and that is not a removal. The old h1 was "ADHD of ADD en
 * Beroepskeuze": keyword first, and "beroepskeuze" is not what the page is
 * about. The h1 is now "Studeren met ADD of ADHD", which is the old page's own
 * breadcrumb line and the opening of the old <title>. The <title> itself does
 * not change, because that is what ranks.
 *
 * THE SCOPE IS ADD AND ADHD, decided by the user on 2026-08-05. PRODUCT.md
 * names a wider group ("ADD, ADHD, of autisme") and the home page and the
 * traject page use that wider wording, but the real copy only covers ADD and
 * ADHD. Nothing about autism is written here. The gap is issue #40.
 *
 * ONE SECTION IS NEW: "Overzicht in plaats van nog meer opties". The page is
 * short after the cleaning, and every sentence in that section is already true
 * elsewhere on this site (app/traject.ts, the third door): vaste stappen, één
 * ding per keer, dezelfde coach elke afspraak, en van tevoren weten wat er
 * gaat gebeuren.
 */

import { meetings } from "@/app/traject";

/** A link with its own words. Used in the poster and under a section. */
export type SituationLink = {
  href: string;
  label: string;
};

export type Section = {
  /** The heading, and one entry in both indexes. */
  title: string;
  paragraphs: string[];
  /**
   * Where the answer continues on another page. Optional, because most
   * sections do not need it: a section is finished text, not a stub.
   */
  links?: SituationLink[];
};

export type Situation = {
  slug: string;
  /** The small line above the title. */
  eyebrow: string;
  /** The h1. A few short words, and the old page's own words. */
  title: string;
  /**
   * The colour this page borrows from its own card on /voor-wie
   * (design-spec 6.2). `violet` and `coral` paint the eyebrow; `ink` keeps the
   * violet eyebrow and gives the index card the 1.5px ink rule of the third
   * card. It is the only visual difference between the three pages.
   */
  accent: "violet" | "coral" | "ink";
  /** The <title>. The old one, word for word. */
  seoTitle: string;
  description: string;
  /** The opening paragraph of the old page. */
  lead: string;
  /**
   * The other door, next to the button in the poster. This was hard-coded on
   * the slug of the two first pages, which cannot answer for a third one, so
   * every page now names its own door.
   */
  crossLink: SituationLink;
  sections: Section[];
  /** The line above the four themes, and the four themes of the old page. */
  themesIntro: string;
  themes: string[];
  /** The articles under "Lees ook", by slug. Missing slugs are skipped. */
  related: string[];
};

/**
 * The four meetings of the traject, by name only.
 *
 * READ FROM app/traject.ts, NOT TYPED HERE. This list used to be typed by hand
 * and it drifted: it opened with "Oriëntatie" and it had no "Mijn interesses
 * en verdieping", so a reader who opened this page and the traject page saw
 * two different trajects. There is one traject, so there is one list. The same
 * rule holds for `levelThemes` in app/levels.ts.
 */
const themes = meetings.map((meeting) => meeting.title);

export const situations: Situation[] = [
  {
    slug: "verkeerde-studiekeuze",
    eyebrow: "Als je bent gestopt of twijfelt",
    title: "Verkeerde studiekeuze",
    accent: "coral",
    seoTitle:
      "Verkeerde studiekeuze? Geen paniek! | (Online) StudiekeuzeAdvies",
    description:
      "Bleek jouw eerste studiekeuze toch niet bij jou te passen? Met een persoonlijke coach ga jij aan de slag om dit keer wél de juiste studiekeuze te maken.",
    lead: "De keuze voor de juiste studie kan verdraaid lastig zijn. Dat merken eindexamenscholieren vaak op het moment dat ze zich serieus gaan oriënteren op hun vervolgopleiding. Wanneer jij al gestopt bent met een opleiding of erover denkt te stoppen met een studie, weet jij nog veel beter hoe lastig een studie kiezen kan zijn.",
    crossLink: { href: "/eerste-studiekeuze", label: "Ik kies voor het eerst" },
    sections: [
      {
        title: "Het traject",
        paragraphs: [
          "Bij StudiekeuzeAdvies ga jij met een eigen studiekeuzecoach aan de slag om dit keer wél de juiste studiekeuze te maken. Je ontdekt in vier bijeenkomsten wie je bent, wat je kan en welke studiemogelijkheden er zijn. We richten ons volledig op het einddoel, de studiekeuze. We kijken ook naar de invulling daarna, waaronder: beroep, carrière en werkomgeving. Aan het eind van het traject heb jij deze keer wél een passende studiekeuze gemaakt.",
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
        // New, and not on the old page. See the note at the top of this file.
        title: "Misschien lag het aan het niveau",
        paragraphs: [
          "Als een studie niet blijkt te passen, ligt dat niet altijd aan het vak. Soms lag het aan het niveau, aan het tempo, of aan de manier waarop er les werd gegeven. Iemand die stopt op het hbo vindt soms een mbo-opleiding waarin hetzelfde vak veel beter valt, en die stap wordt net zo goed de andere kant op gezet.",
          "Je diploma bepaalt wat je mág gaan doen, niet wat bij je past. In het traject kijken we naar allebei, en het niveau is daarbij een vraag en geen gegeven.",
        ],
        links: [
          { href: "/mbo-opleiding-kiezen", label: "Een mbo opleiding kiezen" },
          { href: "/hbo-opleiding-kiezen", label: "Een hbo opleiding kiezen" },
          { href: "/wo-opleiding-kiezen", label: "Een wo opleiding kiezen" },
        ],
      },
      {
        title: "Wat doet StudiekeuzeAdvies voor jou?",
        paragraphs: [
          "Jij wilt een studie kiezen, wat doet StudiekeuzeAdvies tijdens een keuzetraject voor jou? Een betere vraag is: wat doet StudiekeuzeAdvies sámen met jou? Jij gaat een nieuwe en passende studie kiezen, wij zijn er voor de ondersteuning en de begeleiding. We gaan kijken naar wie jij bent, en wat je kunt. We betrekken je interesses en je toekomstbeeld bij de studiekeuze, en we kijken samen met jou terug naar je eerdere verkeerde studiekeuze.",
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
    themesIntro: "De thema's van de vier coachingsgesprekken zijn als volgt.",
    themes,
    related: [
      "gestopt-met-je-studie-blijf-niet-stilzitten",
      "de-1-februariregeling",
    ],
  },
  {
    slug: "eerste-studiekeuze",
    eyebrow: "Als je voor het eerst kiest",
    title: "Eerste studiekeuze",
    accent: "violet",
    seoTitle:
      "Bewuste studiekeuze | mbo, hbo of wo | (Online) StudiekeuzeAdvies",
    // The old description sold the page as the alternative to open days that
    // were cancelled in 2020. That is gone, so this line is new.
    description:
      "Ga je voor het eerst studeren en weet je nog niet wat? In vier bijeenkomsten met een eigen studiekeuzecoach maak je een keuze die echt bij je past.",
    lead: "Een studiekeuze maken is iets heel persoonlijks. Het gaat namelijk om jouw toekomst. Om jou als studiekiezer zo goed mogelijk te begeleiden in je keuzeproces, hebben wij een eigen studiekeuzetraject ontwikkeld. Met behulp van een persoonlijke studiekeuzecoach helpen wij jou om een studiekeuze te maken die echt bij je past.",
    crossLink: {
      href: "/verkeerde-studiekeuze",
      label: "Ik ben al eens gestopt",
    },
    sections: [
      {
        title: "Het traject",
        paragraphs: [
          "Met het persoonlijke en doelgerichte studiekeuzetraject begeleiden wij jou op gestructureerde wijze naar een passende vervolgstudie. Je krijgt een eigen studiekeuzecoach met wie je in totaal vier bijeenkomsten op een locatie bij jou in de buurt zult hebben.",
          "Het is ook mogelijk om de trajecten online te volgen, uiteraard afhankelijk van jouw wensen en behoeften.",
        ],
      },
      {
        title: "Mbo, hbo of wo? Je kunt alle kanten op",
        paragraphs: [
          "Het kan heel logisch aanvoelen: na het vwo ga je naar de universiteit, na de havo ga je naar het hbo, en na het vmbo ga je naar het mbo. Maar dit hoeft niet zo te zijn.",
          "Je niveau maakt voor onze aanpak niet uit. We helpen bij een keuze op mbo-, hbo- en wo-niveau, en in het traject kijken we naar wat bij jou past, niet naar wat bij je diploma hoort.",
        ],
        links: [
          { href: "/mbo-opleiding-kiezen", label: "Een mbo-opleiding kiezen" },
          { href: "/hbo-opleiding-kiezen", label: "Een hbo-opleiding kiezen" },
          { href: "/wo-opleiding-kiezen", label: "Een wo-opleiding kiezen" },
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
  {
    slug: "studiekeuze-met-add-adhd",
    eyebrow: "Als je ADD of ADHD hebt",
    title: "Studeren met ADD of ADHD",
    accent: "ink",
    seoTitle:
      "Studeren met ADD of ADHD | Hulp bij studiekeuze | StudiekeuzeAdvies",
    // The old meta description, word for word. It makes no claim we cannot keep.
    description:
      "Een studiekeuze voor jongeren met ADD of ADHD is vaak erg lastig. Met een persoonlijke studiecoach helpen wij jou de juiste vervolgopleiding te kiezen.",
    lead: "Een studiekeuze voor jongeren met ADD of ADHD is vaak erg lastig. Er zijn talloze mogelijke studies op verschillende niveaus in verschillende steden. Waar moet je überhaupt beginnen om een keuze te gaan maken? Hoe weet je welk beroep bij jou past? En als je dan uiteindelijk hebt gekozen moet je voordat je kan gaan studeren ook heel veel zaken regelen: je inschrijving, studiefinanciering, studentenreisproduct, en misschien ga je zelfs op kamers. Het is dus helemaal niet raar dat je door de bomen het bos niet meer ziet.",
    crossLink: {
      href: "/verkeerde-studiekeuze",
      label: "Ik ben al eens gestopt",
    },
    sections: [
      {
        title: "Zelfinzicht en je valkuilen",
        paragraphs: [
          "Naast verschillende praktische zaken is zelfinzicht essentieel in het kiezen van een passende studie. Vragen die hiervoor eerst beantwoord moeten worden zijn: Wie ben ik? Waar ben ik goed in? Hoe zie ik mijn toekomst voor me? Wat vind ik interessant?",
          "Daarbij zal je door je ADD of ADHD bepaalde valkuilen hebben als je gaat studeren. Je vervolgopleiding zal behoorlijk wat meer zelfstandigheid eisen en minder structuur bieden dan de middelbare school. Het is van belang van tevoren te kijken naar deze mogelijke valkuilen, zodat je deze kan voorkomen in plaats van verhelpen. Gelukkig heeft het hebben van ADD of ADHD ook bepaalde pluspunten, maar hoe kan je deze op een goede manier inzetten tijdens je studie?",
        ],
      },
      {
        title: "Als een studie eerder niet is gelukt",
        paragraphs: [
          "Een andere mogelijkheid is dat je al een studie hebt gevolgd, maar dat dit om bepaalde redenen niet is gelukt. Misschien viel de structuur tegen of bleek je de vakken helemaal niet leuk te vinden. Maar wat moet je nu dan kiezen? Wanneer dit op jou van toepassing is, is het belangrijk om op onderzoek te gaan waarom het precies niet lukte, en hoe je die problemen kan verhelpen of voorkomen bij je nieuwe studiekeuze.",
          "Dat je opziet tegen een nieuwe keuze is logisch. Je hebt immers al eens gekozen, en het pakte anders uit. In het traject kijken we daar samen naar terug: wat werkte er niet voor jou, en wat weet je nu wel over jezelf? Die ervaring gebruiken we bij de keuze die je nu maakt.",
        ],
      },
      {
        title: "Is dit traject iets voor mij?",
        paragraphs: [
          "Herken je je in een van de bovenstaande scenario's? Dan is het studiekeuzetraject iets voor jou. In een persoonlijk en doelgericht traject begeleiden we jou op een gestructureerde wijze naar een vervolgstudie. Hierbij besteden we aandacht aan jouw specifieke hulpvragen en kijken we naar de verschillende zaken die je moet regelen voordat je gaat studeren.",
          "We richten ons volledig op het einddoel, de studiekeuze. Echter kijken we ook naar de invulling daarna, waaronder: beroep, carrière en werkomgeving. Aan het eind van het traject heb jij een passende studiekeuze gemaakt, zodat jij je zonder zorgen kan voorbereiden op je studententijd.",
        ],
      },
      {
        // New. See the note at the top of this file: every line below is the
        // third door of app/traject.ts, and nothing in it is a claim about a
        // coach.
        title: "Overzicht in plaats van nog meer opties",
        paragraphs: [
          "Wat vaak helpt is niet nog meer keuze, maar overzicht. Daarom bestaat het traject uit vaste stappen: vier gesprekken in een vaste volgorde, met één onderwerp per keer.",
          "Je weet van tevoren wat er in een gesprek gaat gebeuren, en wat je daarna zelf doet. Je hoeft dus niet zelf te bedenken wat de volgende stap is. Dat stuk nemen we van je over.",
          "Bij elke afspraak zit dezelfde coach tegenover je, dus je hoeft je verhaal maar één keer te vertellen. Zeg in het intakegesprek wat voor jou werkt en wat niet, dan houdt je coach daar het hele traject rekening mee.",
          "Je spreekt af in de stad waar je coach werkt. Het is ook mogelijk om de trajecten online te volgen, uiteraard afhankelijk van jouw wensen en behoeften.",
        ],
      },
    ],
    themesIntro:
      "Je gaat met gezamenlijke en individuele opdrachten aan de slag, zowel tijdens de bijeenkomst als thuis. De thema's van de vier gesprekken zijn als volgt.",
    themes,
    related: [
      "gestopt-met-je-studie-blijf-niet-stilzitten",
      "artikel-aanmelden-studies",
    ],
  },
];

export function getSituation(slug: string): Situation | undefined {
  return situations.find((situation) => situation.slug === slug);
}
