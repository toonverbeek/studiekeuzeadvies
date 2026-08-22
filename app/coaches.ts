/**
 * The people. One coach is written once, here, and every page reads from this
 * file: /studiekeuzecoaches shows the whole roster, a city page shows the one
 * coach who works there, and the home page and the footer count them.
 *
 * EVERY COACH IN THIS FILE IS A REAL PERSON. That was not true until the
 * client's mail of 21 August 2026 (docs/redesign/client-feedback.md, row C0).
 * Before it the roster held Janneke and five stand-ins, and `isPlaceholder`
 * was the field that kept the stand-ins off the live site. The stand-ins are
 * gone; the field stays, because the next coach may again be typed in before
 * the contract is signed, and every guard that hangs off it (the noindex on a
 * profile, the sitemap filter, the banner in development) still works.
 *
 * WHERE THE TEXTS COME FROM. Each coach wrote their own, and each one is on the
 * client's Drive in "Delen met Toon/Coachpagina teksten". `bio` and `selfIntro`
 * are their own words, in the first person, shortened but not rewritten.
 * `experience` and `quote` are the client's own two lines from the mail, rows
 * C6 and C7. Nothing here is invented, ever: this file describes people who can
 * read it.
 *
 * TWO VOICES, ON PURPOSE. `selfIntro` and `bio` are first person, because they
 * stand on the coach's own page under "Hoi, ik ben ..." and there the coach
 * speaks. `intro` is third person, because it stands on a city page and in the
 * region chooser on the home page, where the site introduces somebody the
 * reader has not met yet.
 */

import type { StaticImageData } from "next/image";
import portraitAart from "@/public/images/coach-aart.jpg";
import portraitJanneke from "@/public/images/coach-janneke.jpg";
import portraitMirjam from "@/public/images/coach-mirjam.jpg";
import portraitRegula from "@/public/images/coach-regula.jpg";

export type Coach = {
  /** Also the anchor on /studiekeuzecoaches. */
  slug: string;
  /**
   * true means this person does not exist and may not go live. Every coach in
   * this file is false today; the field is required so that adding somebody
   * without an answer to "is this a real person" does not compile.
   */
  isPlaceholder: boolean;
  /** The first name. Every page but their own uses this one. */
  name: string;
  /** The name on their own page and in its title. */
  fullName: string;
  /** The town they work from. It is the first word of `region`. */
  town: string;
  /** The whole work area, in the words a reader would use. */
  region: string;
  /**
   * The towns of `region`, one by one and in alphabetical order.
   *
   * The client asked for this in row H13: the small "Sterk in …" card under a
   * coach was a made-up speciality, and the work area belongs there instead,
   * because a reader searches for their own town and because those towns are
   * what a search engine can see. `region` reads as a sentence, this reads as
   * a list, and both say the same thing.
   */
  regionTowns: string[];
  /**
   * The city page to link to, or null when that city has no page. More coaches
   * than city pages is on purpose: a coach can start before their city page is
   * written, and a city page is only worth making where the traffic is.
   */
  citySlug: string | null;
  /**
   * The address that receives an intake request for this coach.
   * TODO: null for everybody until a real address is confirmed per coach.
   *
   * The client's mail brought back a central mailbox for the general forms
   * (`centralInbox` in app/site-config.ts), but not for an intake: an intake
   * still ends at the coach the reader picked. So this field is still the whole
   * delivery route of a request, it is still required and not optional, and it
   * still blocks going live. See docs/redesign/client-feedback.md, question Q9.
   */
  email: string | null;
  /** Two or three sentences, third person. A city page shows this and nothing else. */
  intro: string;
  /** One sentence, first person. It stands under "Hoi, ik ben ..." on their page. */
  selfIntro: string;
  /** The long text, first person, in the coach's own words. */
  bio: string[];
  /**
   * The one line under a coach on the roster: what this person did before, in
   * the client's own words (row C6). It replaced `oneLiner` and `specialties`,
   * two fields that between them printed a speciality nobody had claimed.
   */
  experience: string;
  /** The coach's own motto, printed under `experience` (row C7). */
  quote: string;
  /** Who said it, where the coach quotes somebody else. null when it is theirs. */
  quoteSource: string | null;
  /**
   * The levels the roster card prints, as one line. It says the same thing for
   * every coach, and the client confirmed that in the mail: "Alle coaches doen
   * MBO, HBO, WO" (row C5).
   */
  levels: string;
  /**
   * How fast this coach answers an intake request, in their own words, or null
   * when nobody asked them. The promise is printed under the form, so it may
   * only stand where the person confirmed it.
   */
  responseTime: string | null;
  /** A coach can start before they send a photo. Then this stays null. */
  portrait: StaticImageData | null;
  portraitAlt: string;
};

/** Every coach does every level, so the line is written once. */
const alleNiveaus = "MBO · HBO · WO";

export const mirjam: Coach = {
  slug: "mirjam",
  isPlaceholder: false,
  responseTime: null,
  name: "Mirjam",
  fullName: "Mirjam Schmidt-Erftemeijer",
  town: "Hilversum",
  region: "'t Gooi en omstreken, Baarn, Weesp, Almere en Amersfoort",
  regionTowns: ["Almere", "Amersfoort", "Baarn", "Bussum", "Hilversum", "Weesp"],
  citySlug: "amersfoort",
  email: null,
  intro:
    "Mirjam werkte in het bedrijfsleven, de media en het toerisme, en vond daarna haar plek in het voortgezet onderwijs als docent, mentor en coach. Juist in die rol ontdekte ze hoeveel voldoening het geeft om jongeren te begeleiden bij een belangrijke keuze. Als onafhankelijke coach kijkt ze zonder verwachtingen of belangen met je mee.",
  selfIntro:
    "Als StudieKeuzeCoach begeleid ik jongeren uit 't Gooi en omstreken, Almere en Amersfoort bij het maken van een studiekeuze die écht bij hen past.",
  bio: [
    "Mijn loopbaan is veelzijdig. Ik heb gewerkt in het bedrijfsleven, de media en het toerisme en daarnaast jarenlang lesgegeven. Later vond ik mijn plek in het voortgezet onderwijs als docent Performing Arts, mentor en coach. Juist in die rol ontdekte ik hoeveel voldoening het geeft om jongeren te begeleiden bij belangrijke keuzes in hun leven.",
    "Iedere studiekiezer is uniek. Daarom neem ik de tijd om jou te leren kennen: wie ben je, waar word je blij van, wat zijn jouw talenten en welke toekomst zie jij voor je? Maar ook: wat heb je al meegemaakt en tot nu toe bereikt? Samen onderzoeken we welke studie en richting het beste aansluiten bij jouw persoonlijkheid, interesses en ambities.",
    "Als onafhankelijke StudieKeuzeCoach kijk ik zonder verwachtingen of belangen met je mee. Waar familie, vrienden of school vaak, vanuit betrokkenheid, hun eigen ideeën of wensen hebben, bied ik een objectieve blik. Mijn enige doel is jou helpen ontdekken welke keuze het beste bij jou past, zodat je een beslissing neemt waar je zelf vol vertrouwen achter staat.",
    "Ik geloof dat een goede keuze begint met inzicht in jezelf. Soms betekent dat nieuwe mogelijkheden ontdekken, soms juist de moed hebben om een andere weg te kiezen dan je omgeving van je verwacht. Uiteindelijk is er maar één persoon die de keuze kan maken: jij. Mijn rol is om je daarbij te begeleiden, uit te dagen en je het vertrouwen te geven om een keuze te maken waar jij achter staat.",
  ],
  experience:
    "Gewerkt in het bedrijfsleven en in het voortgezet onderwijs als docent en coach.",
  quote: "Twijfel is het begin van wijsheid.",
  quoteSource: "René Descartes",
  levels: alleNiveaus,
  portrait: portraitMirjam,
  portraitAlt:
    "Mirjam Schmidt-Erftemeijer, StudieKeuzeCoach in 't Gooi, lachend in een gestreepte trui voor een lichte houten wand",
};

/**
 * The first coach this site ever carried, and the one whose text the client
 * rewrote in the mail (row P5): a new sentence under the headline, a new first
 * paragraph, and Wormerveer added to the work area. Her long text lives in
 * app/studiekeuzecoaches/[coach]/profiles.ts, because hers is the one profile
 * with a box in the middle of it.
 */
export const janneke: Coach = {
  slug: "janneke",
  isPlaceholder: false,
  // Her own page in the archive makes this promise in the first person.
  responseTime: "binnen twee werkdagen",
  name: "Janneke",
  fullName: "Janneke van den Brand",
  town: "Amsterdam",
  region: "Amsterdam, Amstelveen, Haarlem, Zaandam, Wormerveer en omgeving",
  regionTowns: [
    "Aalsmeer",
    "Abcoude",
    "Amstelveen",
    "Amsterdam",
    "Diemen",
    "Haarlem",
    "Heemstede",
    "Hoofddorp",
    "Purmerend",
    "Uithoorn",
    "Wormerveer",
    "Zaandam",
  ],
  citySlug: "amsterdam",
  email: null,
  intro:
    "Janneke is psycholoog en werkt al jaren met jongeren, de afgelopen tien daarvan als StudieKeuzeCoach in Amsterdam. Daarnaast is ze psycholoog in de verslavingszorg. Dat merk je: ze schrikt niet van wat je vertelt, en ze gaat niet harder praten als je stil valt.",
  selfIntro:
    "Ik ben psycholoog en StudieKeuzeCoach en samen met vier collega-coaches trotse eigenaar van StudieKeuzeAdvies.",
  bio: [],
  experience:
    "Werkt al jaren met jongeren en doet dat de afgelopen 10 jaar als StudieKeuzeCoach en als psycholoog in de verslavingszorg.",
  quote: "Samen ontdekken wat bij je past, zodat jij met vertrouwen kunt kiezen.",
  quoteSource: null,
  levels: alleNiveaus,
  portrait: portraitJanneke,
  portraitAlt:
    "Janneke van den Brand, StudieKeuzeCoach in Amsterdam, met haar kin op haar hand voor een lichte muur",
};

export const aart: Coach = {
  slug: "aart",
  isPlaceholder: false,
  responseTime: null,
  name: "Aart",
  fullName: "Aart Smit",
  town: "Maastricht",
  region:
    "Maastricht, Roermond, Sittard-Geleen, Heerlen en de Belgische grensregio",
  regionTowns: [
    "Geleen",
    "Genk",
    "Hasselt",
    "Heerlen",
    "Maasmechelen",
    "Maastricht",
    "Roermond",
    "Sittard",
  ],
  citySlug: null,
  email: null,
  intro:
    "Aart is psycholoog en begeleidt al meer dan tien jaar jongeren uit Zuid-Limburg bij hun studiekeuze. Hij werkte binnen de Universiteit Maastricht met studenten en daarna als psycholoog. Zijn begeleiding is persoonlijk, gestructureerd en onafhankelijk.",
  selfIntro:
    "Als StudieKeuzeCoach begeleid ik al meer dan tien jaar jongeren uit Zuid-Limburg bij het maken van een studiekeuze die bij hen past.",
  bio: [
    "Je weet dat je een studie wilt kiezen. Alleen weet je nog niet welke. Misschien heb je al opleidingen bekeken, open dagen bezocht en veel informatie verzameld, en kom je toch niet echt verder. Of misschien weet je juist niet goed waar je moet beginnen.",
    "Dat is niet vreemd. Een studiekeuze gaat namelijk niet alleen over het vergelijken van opleidingen. Het gaat ook over jou. Over wie je bent, wat bij je past, waar je energie van krijgt en wat je nodig hebt om goed tot je recht te komen.",
    "Iedere studiekiezer is anders. Door te luisteren, vragen te stellen en opdrachten te doen ontstaat er meer helderheid en overzicht. We kijken naar wie je bent en wat je kwaliteiten zijn, naar wat jou motiveert en wat jij belangrijk vindt in een studie, naar wat je nodig hebt om je prettig te voelen, en naar welke opleidingen en richtingen daarbij aansluiten.",
    "Misschien twijfel je tussen verschillende opleidingen. Misschien weet je niet of je naar het hbo of de universiteit wilt, welke stad bij je past of wat je later met een opleiding kunt bereiken. Of misschien ben je al begonnen met een studie, maar merk je dat die toch niet goed bij je past. Daar is ruimte voor tijdens de begeleiding. Je hoeft niet al precies te weten wat je wilt.",
    "Na mijn studie psychologie werkte ik binnen de Universiteit Maastricht, in verschillende functies waarin ik onder andere studenten begeleidde en ondersteunde binnen het onderwijs. Later ben ik als psycholoog gaan werken. In al die rollen merkte ik hoe waardevol het is om mensen te ondersteunen bij keuzes die richting geven aan hun toekomst.",
    "Mijn rol is om je te begeleiden, vragen te stellen, nieuwe perspectieven te bieden en te helpen mogelijkheden tegen elkaar af te wegen. Soms ontdek je dat een opleiding beter aansluit dan je vooraf dacht. Een keuze waar jij achter staat en mee verder kunt.",
  ],
  experience:
    "10 jaar ervaring als StudieKeuzeCoach, met een achtergrond in de psychologie en ruime ervaring met jongeren en studenten.",
  quote: "Wie zichzelf beter kent, vindt gemakkelijker een weg die bij hem past.",
  quoteSource: null,
  levels: alleNiveaus,
  portrait: portraitAart,
  portraitAlt:
    "Aart Smit, StudieKeuzeCoach in Maastricht, lachend in een spijkerblouse voor een lichtblauwe muur",
};

export const tamara: Coach = {
  slug: "tamara",
  isPlaceholder: false,
  responseTime: null,
  name: "Tamara",
  fullName: "Tamara Pijnenburg",
  town: "Den Bosch",
  region: "Den Bosch, Vught, Eindhoven, Tilburg en omliggende gemeenten",
  regionTowns: ["Den Bosch", "Eindhoven", "Tilburg", "Vught"],
  citySlug: null,
  email: null,
  intro:
    "Tamara is onderwijsprofessional en werkte als coach, trainer en stagecoördinator. Ze gelooft in de kracht van praktijkervaring: een stage of een bijbaan zegt vaak meer dan een brochure. Ze is gebarenvaardig (NGT/NmG) en daardoor ook toegankelijk voor dove en slechthorende jongeren.",
  selfIntro:
    "Vanuit mijn ervaring als coach, trainer en stagecoördinator begeleid ik jongeren bij het ontdekken van een studie- en loopbaanrichting die echt bij hen past.",
  bio: [
    "Je hebt opleidingen bekeken, open dagen bezocht of misschien zelfs al een studie gekozen. Toch blijft de vraag knagen: past dit eigenlijk wel bij mij? Of je nu een vervolgopleiding moet kiezen, twijfelt over je studie of overweegt om van richting te veranderen: je bent zeker niet de enige.",
    "In de praktijk zie ik dat veel jongeren denken dat ze direct een antwoord moeten hebben op de vraag wat ze later willen doen. Maar een passende studiekeuze ontstaat meestal niet in één keer. Het is een proces van ontdekken, ervaren en steeds beter leren begrijpen wie je bent, wat je belangrijk vindt en waar jouw kwaliteiten liggen.",
    "Juist daarom geloof ik in de kracht van praktijkervaring. Een stage, een project, een bijbaan of een kennismaking met een werkveld zegt vaak meer dan een brochure of opleidingsgids. Door ervaringen op te doen ontdek je niet alleen wat bij je past, maar ook wat minder goed aansluit. En juist die inzichten helpen bij het maken van een bewuste keuze.",
    "Tijdens het StudieKeuzeTraject kijken we verder dan alleen opleidingen. Samen onderzoeken we jouw interesses, talenten, motivatie en toekomstwensen. We kijken naar wat jou energie geeft, hoe jij het liefst leert en wat je nodig hebt om tot je recht te komen.",
    "Daarbij is er ook ruimte voor zaken die het kiezen soms ingewikkeld maken. Denk aan onzekerheid, perfectionisme, faalangst of persoonlijke omstandigheden zoals ADHD, autisme of dyslexie. Twijfelen betekent niet dat je niet kunt kiezen. Het betekent vaak dat je de keuze serieus neemt.",
    "Mijn aanpak is persoonlijk, praktisch en zonder oordeel. Ik luister, stel vragen, spiegel en help je overzicht creëren. Niet om voor jou te bepalen welke studie je moet kiezen, maar om jou te helpen ontdekken welke mogelijkheden écht bij jou passen. Want een goede studiekeuze begint niet met het vinden van de perfecte opleiding. Die begint met het ontdekken van jezelf.",
  ],
  experience:
    "Onderwijsprofessional en StudieKeuzeCoach met ruime ervaring in talentontwikkeling, stage-oriëntatie en toekomstkeuzes. Gebarenvaardig (NGT/NmG) en daardoor ook toegankelijk voor dove en slechthorende jongeren.",
  quote: "Door te ervaren ontdek je wat bij je past.",
  quoteSource: null,
  levels: alleNiveaus,
  // Her Drive photograph is 192 by 192 pixels, which is a quarter of what the
  // smallest card asks for. The card and the profile both handle a coach
  // without a photo, so she has none until she sends a bigger one. See
  // docs/redesign/client-feedback.md, question Q10.
  portrait: null,
  portraitAlt: "",
};

export const regula: Coach = {
  slug: "regula",
  isPlaceholder: false,
  responseTime: null,
  name: "Regula",
  fullName: "Regula Rexwinkel",
  town: "Utrecht",
  region: "Utrecht, Houten, Nieuwegein, Zeist, Bilthoven, Maarssen en Breukelen",
  regionTowns: [
    "Bilthoven",
    "Breukelen",
    "Houten",
    "Maarssen",
    "Nieuwegein",
    "Utrecht",
    "Zeist",
  ],
  citySlug: "utrecht",
  email: null,
  intro:
    "Regula werkte dertig jaar in het onderwijs, als docent maatschappijleer en als studieloopbaanbegeleider in het vo, het mbo en het hbo. Sinds twee jaar is ze StudieKeuzeCoach. Ze ziet het traject als een puzzel die jullie samen oplossen.",
  selfIntro:
    "Ik ben StudieKeuzeCoach en studieloopbaanbegeleider, en ik zie het traject als een puzzel die we samen oplossen.",
  bio: [
    "Naast StudieKeuzeCoach ben ik studieloopbaanbegeleider voor nieuwkomers tussen 18 en 27, die na de inburgering via de onderwijsroute doorstromen naar het mbo en het hbo. Ook ben ik moeder van vier zoons die alle vier een heel eigen opleidingspad volgen of hebben gevolgd.",
    "Na mijn studie rechten ben ik in het onderwijs beland, omdat ik tijdens mijn studie gastlessen strafrecht op middelbare scholen gaf en merkte dat ik het ontzettend leuk vond om les te geven en met leerlingen in gesprek te gaan over persoonlijke en maatschappelijke onderwerpen.",
    "Ik heb toen besloten om mijn lesbevoegdheid voor maatschappijleer te halen en heb altijd met heel veel plezier lesgegeven in zowel het voortgezet onderwijs als het mbo en het hbo. Ook heb ik docenten opgeleid en daardoor heel veel lessen en scholen bezocht. Zou ik zelf opnieuw moeten kiezen, dan zou dat weer het onderwijs zijn: de scholen en collegezalen vol jongeren met al hun dromen, zoekend, flexibel en vol potentie.",
    "In de rol van docent, maar ook als mentor en studieloopbaanbegeleider heb je voor je gevoel altijd te weinig tijd om iedere leerling de aandacht te geven die hij of zij verdient. Ik ben nu twee jaar StudieKeuzeCoach en merk hoe prettig het is om de tijd te hebben voor persoonlijke begeleiding bij zo'n belangrijk keuzemoment. Ik zie het traject als een puzzel die we samen oplossen, waarbij we gebruikmaken van testen en reflectie op de uitkomst daarvan.",
    "Een test is maar een test. Jij weet zelf het beste wie je bent, wat je kunt en wat je wilt, en ik begeleid je graag bij het leggen van deze puzzel.",
  ],
  experience:
    "30 jaar werkzaam in het onderwijs als docent en studieloopbaanbegeleider in het vo, mbo en hbo, en de afgelopen 2 jaar ook als StudieKeuzeCoach.",
  quote: "Wie naar buiten kijkt, droomt; wie naar binnen kijkt, ontwaakt.",
  quoteSource: "Carl Jung",
  levels: alleNiveaus,
  portrait: portraitRegula,
  portraitAlt:
    "Regula Rexwinkel, StudieKeuzeCoach in Utrecht, aan haar werktafel met de Keuzegidsen voor mbo, hbo en universiteiten",
};

/**
 * The order on /studiekeuzecoaches, and the order of the index in its hero.
 * It carries no ranking: it is the order the client wrote them in.
 */
export const coaches: Coach[] = [mirjam, janneke, aart, tamara, regula];

/**
 * One coach by slug, or undefined. The intake form carries a slug through the
 * browser, so the server must be able to turn that string back into a person
 * before it believes it. It mirrors `getCity` in app/cities.ts.
 */
export function getCoach(slug: string): Coach | undefined {
  return coaches.find((coach) => coach.slug === slug);
}
