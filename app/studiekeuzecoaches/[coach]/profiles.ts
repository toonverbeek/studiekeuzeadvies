import type { Coach } from "@/app/coaches";
import type { PillTone } from "@/app/components/ui";

/**
 * The long text of one coach profile, keyed by slug.
 *
 * WHY IT IS NOT IN app/coaches.ts. That file is the roster: who exists, where
 * they work, and where their post goes. Every page reads it. This file is read
 * by one route, and it holds the one thing only that route prints: a profile
 * of a thousand words, in the coach's own words. It is also the file another
 * agent does not have to merge with when a coach is added.
 *
 * WHAT MAY STAND HERE. Only a text a real person wrote or confirmed. Janneke's
 * profile below is the client's own copy (docs/redesign/client/coach-janneke/,
 * design-spec 4.5); she is the client and she wrote it about herself, so it is
 * hers to print. Nobody else has a record here, and `fallbackProfile` builds
 * their page out of `intro`, `bio`, `focus` and `region`, which are the fields
 * app/coaches.ts already carries. Nothing is invented here, ever: a stand-in
 * with a written profile would read as a real person with a real history.
 */

/** One block of the reading column, in the order it is printed. */
export type ProfileBlock =
  /** A paragraph of the running text. */
  | { kind: "p"; text: string }
  /** A short line in violet, the size of a sub-heading. */
  | { kind: "accent"; text: string }
  /** The white box with the amber edge: what this coach also has an eye for. */
  | { kind: "note"; title: string; text: string }
  /** The lavender box at the end: where this coach works. */
  | { kind: "area"; title: string; text: string };

export type Profile = {
  /** The name as this page prints it. Janneke's own page carries her surname,
   *  because she wrote the page; every other page keeps the first name only
   *  (decision 2026-08-06). It is used in the title and in the photo caption. */
  fullName: string;
  /** The mono line above the h1. */
  eyebrow: string;
  /** The h1. One per page. */
  heading: string;
  /** The sentence under it. */
  lede: string;
  /** The "oog voor" chips: what this coach is and who they see. */
  pills: { label: string; tone: PillTone }[];
  /** The line over the portrait, or under it on a narrow screen. */
  caption: string;
  /** The reading column. */
  blocks: ProfileBlock[];
  /** The heading and the sentence of the intake card. */
  formTitle: string;
  formLede: string;
  /** The <meta name="description"> of this page. */
  description: string;
};

/**
 * Janneke, the only real coach (`isPlaceholder: false`).
 *
 * This is the client's copy, word for word, with two changes the house rules
 * ask for: the em dash in the lede is a comma, and nothing was added. She
 * writes in the first person and with her surname, where the roster and the
 * city pages use the third person and the first name (decisions of 2026-08-05
 * and 2026-08-06). That split is on purpose: on her own page she speaks, and
 * everywhere else the site speaks about her.
 */
const janneke: Profile = {
  fullName: "Janneke van den Brand",
  eyebrow: "Studiekeuzecoach in Amsterdam en omgeving",
  heading: "Hoi, ik ben Janneke van den Brand.",
  lede: "Ik ben psycholoog en studiekeuzecoach, en samen met vier collega-coaches trotse eigenaar van StudiekeuzeAdvies.",
  pills: [
    { label: "Amsterdam + online", tone: "lavender" },
    { label: "Psycholoog", tone: "coral" },
    { label: "10 jaar bij StudiekeuzeAdvies", tone: "amber" },
  ],
  caption: "Janneke van den Brand · psycholoog & studiekeuzecoach",
  blocks: [
    {
      kind: "p",
      text: "Vanaf het prille begin ben ik betrokken bij StudiekeuzeAdvies. In de afgelopen 10 jaar heb ik actief meegewerkt aan de ontwikkeling en vormgeving van het studiekeuzetraject. In diezelfde periode heb ik StudiekeuzeAdvies een aantal keer van eigenaar zien veranderen. Toen de laatste eigenaar besloot de samenwerking met de coaches te stoppen, kregen wij de mogelijkheid aangeboden om het over te nemen. Samen met vier collega-coaches heb ik die kans gegrepen. Inmiddels zijn we met z'n vijven de trotse eigenaar.",
    },
    {
      kind: "p",
      text: "Jongeren helpen bij het maken van keuzes en werken aan hun toekomst past goed bij mij. Als psycholoog in de verslavingszorg werk ik met jongeren bij wie het leven ingewikkeld is geworden. Dat zijn vooral langdurige trajecten, waarin het gaat over herstel en welzijn. Bij studiekeuze is het vraagstuk heel anders en veel concreter: wat past bij mij en welke richting wil ik op?",
    },
    {
      kind: "p",
      text: "Dat klinkt misschien als een simpele vraag, maar er komt verrassend veel bij kijken. Je interesses en talenten, verwachtingen van jezelf en soms ook van anderen, twijfels, cijfers, het studentenleven en natuurlijk de vraag: wat past nou écht bij mij? Geen wonder dat kiezen soms best lastig is.",
    },
    {
      kind: "note",
      title: "Als er meer speelt dan alleen studiekeuze",
      text: "Onzekerheid, faalangst of eerdere ervaringen kunnen het maken van keuzes behoorlijk beïnvloeden. Maar het kan ook zijn dat er (mogelijk) iets anders speelt, bijvoorbeeld ADHD, autisme, dyslexie, een lichamelijke beperking of andere psychische of persoonlijke problematiek. Als psycholoog heb ik daar oog voor. Ik neem de tijd om te kijken wat iemand nodig heeft om weer wat vertrouwen en ruimte te ervaren. Soms zijn een paar concrete tips of een andere manier van kijken al helpend. Als er meer nodig is, denk ik mee over passende ondersteuning of een eventuele doorverwijzing. Ik behandel niet, maar zorg er wel voor dat wat er speelt gezien en meegenomen wordt in het studiekeuzeproces.",
    },
    {
      kind: "p",
      text: "Mijn rol is niet om voor jou te kiezen. Sterker nog: jij doet het meeste werk. Ik stel vragen, luister, houd je een spiegel voor en durf soms net even door te vragen waar anderen misschien stoppen. Zo help ik je om jezelf en je mogelijkheden beter te begrijpen. Tegelijkertijd hoef je het niet allemaal zelf uit te zoeken. Ik bied je een duidelijk stappenplan, breng mijn kennis en ervaring in en denk met je mee over alles wat bij een studiekeuze komt kijken. Ook voor alle praktische vragen en randzaken rondom je studiekeuze kun je bij mij terecht. Uiteindelijk ben jij degene die de keuze maakt.",
    },
    {
      kind: "p",
      text: "En dat vind ik juist zo mooi aan dit werk. We beginnen met een vraagstuk en eindigen met een antwoord. Meestal is dat een studie waarvan je denkt: ja, dit past bij mij. En heel soms komen we er samen achter dat studeren (nog) niet de juiste stap is voor jou. Ook dat is een waardevolle uitkomst: weten wat op dit moment wél bij je past.",
    },
    { kind: "accent", text: "Altijd een happy end dus!" },
    {
      kind: "p",
      text: "Ik vind het enorm waardevol en vooral heel leuk om daar onderdeel van te mogen zijn. Want een studiekeuze bepaalt natuurlijk niet je hele leven, maar een keuze maken die echt bij jou past, kan wél een heel fijne start zijn van de volgende fase van je leven.",
    },
    {
      kind: "area",
      title: "Werkgebied",
      text: "Ik ontvang je in Amsterdam, maar begeleid ook studiekiezers uit onder andere Amstelveen, Abcoude, Zaandam, Haarlem, Purmerend, Diemen, Hoofddorp, Heemstede, Uithoorn en Aalsmeer. Liever vanuit huis? Online kan natuurlijk ook!",
    },
  ],
  formTitle: "Plan je gratis intake bij Janneke",
  formLede:
    "Vrijblijvend kennismaken, online of in Amsterdam. Je beslist daarna pas of je start.",
  description:
    "Janneke van den Brand is psycholoog en studiekeuzecoach in Amsterdam en omgeving. Lees hoe zij werkt en vraag een gratis intakegesprek aan.",
};

/** Written profiles, by slug. One entry today, and that is the honest number. */
const profiles: Record<string, Profile> = { janneke };

/**
 * The page of a coach who has no written profile.
 *
 * Every sentence below is already in app/coaches.ts, in the third person, so
 * this builds a real page without one new claim: `intro` becomes the lede,
 * `bio` becomes the reading column, `focus` becomes a chip and `region`
 * becomes the work area box. A stand-in therefore reads as a stand-in, and a
 * real coach who joins tomorrow already has a page before she writes a word.
 */
function fallbackProfile(coach: Coach): Profile {
  return {
    fullName: coach.name,
    eyebrow: `Studiekeuzecoach in ${coach.region}`,
    heading: `Maak kennis met ${coach.name}.`,
    lede: coach.intro,
    // `specialties` is app/coaches.ts's own list of two or three short labels,
    // and every one of them points at something the same file already says.
    // Nothing here is a new claim about a person.
    pills: [
      { label: `${coach.town} + online`, tone: "lavender" as const },
      ...coach.specialties.map((label, index) => ({
        label,
        tone: index === 0 ? ("coral" as const) : ("amber" as const),
      })),
    ],
    caption: `${coach.name}, studiekeuzecoach in ${coach.town}`,
    blocks: [
      ...coach.bio.map((text): ProfileBlock => ({ kind: "p", text })),
      {
        kind: "area",
        title: "Werkgebied",
        text: `${coach.name} werkt in ${coach.region}. Liever vanuit huis? Online kan ook.`,
      },
    ],
    formTitle: `Plan je gratis intake bij ${coach.name}`,
    formLede: `Vrijblijvend kennismaken, online of in ${coach.town}. Je beslist daarna pas of je start.`,
    description: `${coach.name} is studiekeuzecoach in ${coach.region}. Lees wie ${coach.name} is en vraag een gratis intakegesprek aan.`,
  };
}

/** The profile of one coach. Written where we have one, built where we do not. */
export function getProfile(coach: Coach): Profile {
  return profiles[coach.slug] ?? fallbackProfile(coach);
}
