/**
 * The data behind /locaties/[stad].
 *
 * ONE SHARED TEXT, CITY FACTS ON TOP. That is the model the old site used, and
 * it is the model we keep for now. It carries a known risk: 37 pages that are
 * one text with the name changed is what Google calls a doorway page.
 *
 * So every text field on a city is OPTIONAL. Write a paragraph for one city and
 * that city uses it. Write nothing and the city uses the shared text. You can
 * improve the copy one city at a time, and no component has to change.
 *
 * WARNING: NO COACH NAMED HERE IS A REAL PERSON. The people live in
 * app/coaches.ts, and that file carries the full warning. None of it may go
 * live.
 */

import { bram, type Coach, hanneke } from "./coaches";

export type MeetingPlace = {
  street: string;
  postcode: string;
  town: string;
};

export type City = {
  slug: string;
  /** The name in the heading and in the running text. */
  name: string;
  /**
   * The towns around it that the coach also covers. Where a coach works, take
   * this straight from the coach, so the region cannot say two things on two
   * pages. A city without a coach carries its own.
   */
  region: string;
  /** null means: no coach here yet. The page then changes shape. */
  coach: Coach | null;
  /**
   * TODO: every meeting room on the old site was rented by the seller, so we
   * have no confirmed address. Until a room is fixed, this stays null and the
   * page says we agree a place together. Fill the object and the address block
   * appears. Do not put a street here that nobody can walk into.
   */
  meeting: MeetingPlace | null;

  /** Optional per-city copy. Set one and it replaces the shared text. */
  intro?: string;
  firstChoice?: string[];
  wrongChoice?: string[];
};

export const cities: City[] = [
  {
    slug: "utrecht",
    name: "Utrecht",
    region: hanneke.region,
    coach: hanneke,
    meeting: null,
  },
  {
    slug: "amersfoort",
    name: "Amersfoort",
    region: bram.region,
    coach: bram,
    meeting: null,
  },
  {
    // This city has no coach. It is here on purpose: the network will be smaller
    // than the 37 cities of the old site, and a page that says so honestly is
    // worth more than a page that promises a coach who is not there.
    slug: "bergen-op-zoom",
    name: "Bergen op Zoom",
    region: "Bergen op Zoom, Roosendaal en Steenbergen",
    coach: null,
    meeting: null,
  },
];

export const citySlugs = cities.map((city) => city.slug);

export function getCity(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

/** The cities we may name on the home page and in the footer. */
export const citiesWithCoach = cities.filter((city) => city.coach !== null);

export function otherCitiesWithCoach(slug: string): City[] {
  return citiesWithCoach.filter((city) => city.slug !== slug);
}

/**
 * The shared text. Everything here takes the city name, and every block steps
 * aside when the city carries its own version.
 */
export function cityCopy(city: City) {
  return {
    intro:
      city.intro ??
      (city.coach
        ? `Je zoekt hulp bij het kiezen van een studie, en je zoekt het in ${city.name}. Dan ben je hier goed. In ${city.name} werkt een vaste coach die met je meeloopt tot je keuze rond is. Het eerste gesprek is gratis, en daarna beslis jij.`
        : `In ${city.name} werkt op dit moment geen coach. Dat zeggen we liever eerlijk dan dat we je een naam geven die er niet is. Je kunt wel bij ons terecht, online of in een stad hier in de buurt. Het eerste gesprek is gratis, en daarna beslis jij.`),

    firstChoice: city.firstChoice ?? [
      `Woon je in ${city.name} of in de buurt, en moet je na je examen kiezen? Dan heb je al gemerkt hoeveel opleidingen er zijn. Duizenden, en op de website klinken ze bijna allemaal goed. Daarom is kiezen zo moeilijk. Niet omdat je nog niet weet wat je wilt, maar omdat niemand duizend dingen kan overzien.`,
      `In vier gesprekken kijken we naar wie je bent, wat je goed kunt en wat je wilt. Tussen de gesprekken door zoek je zelf verder, en je gaat naar open dagen om te voelen of een opleiding klopt. Aan het eind heb je geen lijst met honderd opties, maar één keuze waar je zelf achter staat. Of je nu mbo, hbo of wo gaat doen maakt voor onze aanpak niets uit.`,
    ],

    wrongChoice: city.wrongChoice ?? [
      `Ben je begonnen aan een studie die niet blijkt te passen? Dat is balen, en het zegt niets over jou. Ongeveer de helft van de mensen die bij ons aanklopt is gestopt, of denkt erover om te stoppen. Je bent dus niet de enige, en je bent zeker niet de eerste.`,
      `Je weet nu iets wat je een jaar geleden nog niet wist: hoe studeren echt gaat, en wat er niet bij je past. Dat is bruikbare informatie, en daar beginnen we mee. Wachten tot september hoeft niet. Hoe eerder je begint, hoe rustiger je volgende keuze wordt.`,
    ],
  };
}
