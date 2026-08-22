/**
 * The data behind /locaties/[stad].
 *
 * ONE SHARED TEXT, CITY FACTS ON TOP. That is the model the old site used, and
 * it is the model we keep for now. It carries a known risk: pages that are one
 * text with the name changed are what Google calls doorway pages.
 *
 * So every text field on a city is OPTIONAL. Write a paragraph for one city and
 * that city uses it. Write nothing and the city uses the shared text. You can
 * improve the copy one city at a time, and no component has to change.
 *
 * WHY THERE ARE FIFTEEN. The client's mail of 21 August 2026 names them, in the
 * row about the region chooser on the home page, and asks for "zoveel mogelijk
 * knoppen op de site voor de steden/plaatsen". Each of the fifteen has a coach
 * behind it, taken from the client's own table ("Onderverdeling coaches
 * regio's/steden" on their Drive). See docs/redesign/client-feedback.md, row
 * H13 and question Q4.
 *
 * Add one and three things do not happen on their own: `at` is required so the
 * compiler asks for it, but `python3 scripts/build-url-map.py` has to be run
 * again, and the map on the home page works out its own frame from these
 * points. AGENTS.md says why.
 */

import { aart, type Coach, janneke, mirjam, regula, tamara } from "./coaches";

export type MeetingPlace = {
  street: string;
  postcode: string;
  town: string;
};

/** A place on the map, in degrees. */
export type Point = { lat: number; lng: number };

export type City = {
  slug: string;
  /** The name in the heading and in the running text. */
  name: string;
  /**
   * The middle of the city, so the map on the home page can frame the whole
   * work area. This is not the meeting place: that is `meeting`, and no city
   * has one yet. Read it off Google Maps; four decimals is more than enough at
   * this zoom. It is required and not optional on purpose, because a city
   * without a point would quietly fall outside the frame of that map.
   */
  at: Point;
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
   * have no confirmed address. This is the one thing the archive cannot give
   * us. The rights to its content are bought, but a lease is not content: an
   * address on an old page is not a room we can walk into. Until a room is
   * fixed, this stays null and the page says we agree a place together. Fill
   * the object and the address block appears.
   *
   * Regula names one in her own text, a central spot on the Maliebaan in
   * Utrecht, but she does not give the number, so it is not an address yet.
   */
  meeting: MeetingPlace | null;

  /** Optional per-city copy. Set one and it replaces the shared text. */
  intro?: string;
  firstChoice?: string[];
  wrongChoice?: string[];
};

export const cities: City[] = [
  {
    // First, because it is the city with the most traffic. The old
    // /locaties/amsterdam/ is also the one city URL that docs/url-map.csv marks
    // `keep` on its own traffic, so the address does not change either.
    //
    // No address. The old page named Van Baerlestraat 13, but that room was
    // rented by the seller, so it stays out until a room is ours. See the
    // `meeting` field above.
    slug: "amsterdam",
    name: "Amsterdam",
    at: { lat: 52.3676, lng: 4.9041 },
    region: janneke.region,
    coach: janneke,
    meeting: null,

    // The first city to carry its own text instead of the shared one, so this
    // is also the worked example for issue #35, the doorway risk. What makes it
    // local is the one thing the old Amsterdam page had that no other city page
    // had: the four institutions a reader here is actually choosing between.
    // The shared text stays underneath for every city that has nothing to add.
    intro:
      "De UvA, de VU, de HvA en Inholland zitten allemaal in dezelfde stad. Meer keuze dus, maar niet meer overzicht. In Amsterdam en Amstelveen werkt een vaste coach die met je meeloopt tot je keuze rond is. Het eerste gesprek is gratis, en daarna beslis jij.",

    firstChoice: [
      "Woon je in Amsterdam, in Amstelveen of daar vlakbij, en moet je na je examen kiezen? Dan heb je al gemerkt hoeveel opleidingen er zijn. Alleen al in deze stad zijn het er honderden, en op de website klinken ze bijna allemaal goed. Daarom is kiezen zo moeilijk. Niet omdat je nog niet weet wat je wilt, maar omdat niemand honderden dingen kan overzien.",
      "In vier gesprekken kijken we naar wie je bent, wat je goed kunt en wat je wilt. Tussen de gesprekken door zoek je zelf verder, en je gaat naar open dagen om te voelen of een opleiding klopt. Hier ben je daar weinig reistijd aan kwijt, dus doe er meer dan één. Aan het eind heb je geen lijst met honderd opties, maar één keuze waar je zelf achter staat. Of je nu mbo, hbo of wo gaat doen maakt voor onze aanpak niets uit.",
    ],

    wrongChoice: [
      "Je begon vol goede moed aan een studie aan de UvA, de VU, de HvA of Inholland, en onderweg ging het mis. Je bent gestopt, of je denkt erover. Dat is balen, en het zegt niets over jou. Je bent niet de enige, en je bent zeker niet de eerste: stoppen of twijfelen is een van de gewoonste redenen waarom iemand hier aanklopt.",
      "Je weet nu iets wat je een jaar geleden nog niet wist: hoe studeren echt gaat, en wat er niet bij je past. Soms lag dat aan de opleiding zelf, soms aan alles eromheen: de reistijd, het wonen, of hoe groot en druk zo'n instelling is. We kijken naar allebei. Dat is bruikbare informatie, en daar beginnen we mee. Wachten tot september hoeft niet.",
    ],
  },
  {
    slug: "amstelveen",
    name: "Amstelveen",
    at: { lat: 52.3114, lng: 4.8701 },
    region: janneke.region,
    coach: janneke,
    meeting: null,
  },
  {
    slug: "haarlem",
    name: "Haarlem",
    at: { lat: 52.3874, lng: 4.6462 },
    region: janneke.region,
    coach: janneke,
    meeting: null,
  },
  {
    slug: "utrecht",
    name: "Utrecht",
    at: { lat: 52.0907, lng: 5.1214 },
    region: regula.region,
    coach: regula,
    meeting: null,
  },
  {
    slug: "amersfoort",
    name: "Amersfoort",
    at: { lat: 52.1561, lng: 5.3878 },
    region: mirjam.region,
    coach: mirjam,
    meeting: null,
  },
  {
    slug: "almere",
    name: "Almere",
    at: { lat: 52.3508, lng: 5.2647 },
    region: mirjam.region,
    coach: mirjam,
    meeting: null,
  },
  {
    slug: "hilversum",
    name: "Hilversum",
    at: { lat: 52.2292, lng: 5.1669 },
    region: mirjam.region,
    coach: mirjam,
    meeting: null,
  },
  {
    slug: "weesp",
    name: "Weesp",
    at: { lat: 52.3081, lng: 5.0417 },
    region: mirjam.region,
    coach: mirjam,
    meeting: null,
  },
  {
    slug: "den-bosch",
    name: "Den Bosch",
    at: { lat: 51.6978, lng: 5.3037 },
    region: tamara.region,
    coach: tamara,
    meeting: null,
  },
  {
    slug: "vught",
    name: "Vught",
    at: { lat: 51.6553, lng: 5.287 },
    region: tamara.region,
    coach: tamara,
    meeting: null,
  },
  {
    slug: "eindhoven",
    name: "Eindhoven",
    at: { lat: 51.4416, lng: 5.4697 },
    region: tamara.region,
    coach: tamara,
    meeting: null,
  },
  {
    slug: "tilburg",
    name: "Tilburg",
    at: { lat: 51.5555, lng: 5.0913 },
    region: tamara.region,
    coach: tamara,
    meeting: null,
  },
  {
    slug: "maastricht",
    name: "Maastricht",
    at: { lat: 50.8514, lng: 5.691 },
    region: aart.region,
    coach: aart,
    meeting: null,
  },
  {
    slug: "roermond",
    name: "Roermond",
    at: { lat: 51.1942, lng: 5.987 },
    region: aart.region,
    coach: aart,
    meeting: null,
  },
  {
    slug: "sittard-geleen",
    name: "Sittard-Geleen",
    at: { lat: 50.9983, lng: 5.8686 },
    region: aart.region,
    coach: aart,
    meeting: null,
  },
  {
    // This city has no coach. It is here on purpose: the network is smaller
    // than the 37 cities of the old site, and a page that says so honestly is
    // worth more than a page that promises a coach who is not there.
    slug: "bergen-op-zoom",
    name: "Bergen op Zoom",
    at: { lat: 51.4939, lng: 4.2871 },
    region: "Bergen op Zoom, Roosendaal en Steenbergen",
    coach: null,
    meeting: null,
  },
];

export const citySlugs = cities.map((city) => city.slug);

export function getCity(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

/** A city that has a coach. The narrowing is what makes `city.coach.slug` safe. */
export type CityWithCoach = City & { coach: Coach };

/** The cities we may name on the home page and in the footer. */
export const citiesWithCoach = cities.filter(
  (city): city is CityWithCoach => city.coach !== null,
);

/**
 * The same list, sorted by name. The client asked for the towns in alphabetical
 * order (row H13), and the chooser on the home page and the map both read it.
 */
export const citiesWithCoachByName = [...citiesWithCoach].sort((a, b) =>
  a.name.localeCompare(b.name, "nl"),
);

export function otherCitiesWithCoach(slug: string): CityWithCoach[] {
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
      `Ben je begonnen aan een studie die niet blijkt te passen? Dat is balen, en het zegt niets over jou. Je bent niet de enige, en je bent zeker niet de eerste: stoppen of twijfelen is een van de gewoonste redenen waarom iemand hier aanklopt.`,
      `Je weet nu iets wat je een jaar geleden nog niet wist: hoe studeren echt gaat, en wat er niet bij je past. Dat is bruikbare informatie, en daar beginnen we mee. Wachten tot september hoeft niet. Hoe eerder je begint, hoe rustiger je volgende keuze wordt.`,
    ],
  };
}
