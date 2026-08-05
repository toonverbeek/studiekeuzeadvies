/**
 * The people. One coach is written once, here, and every page reads from this
 * file: /studiekeuzecoaches shows the whole roster, a city page shows the one
 * coach who works there, and the home page and the footer count them.
 *
 * WARNING: NOT ONE PERSON BELOW IS REAL. The names, the histories, the work
 * regions and the five portraits are stand-ins, so the pages can be judged at
 * full length before a single coach is under contract. The twelve coaches on
 * the old site worked for the seller, and portrait rights stay with the people,
 * so their names and photos could not be carried over. See PRODUCT.md, section
 * "Inherited Content and Open Questions", and todos.md, section 1.
 *
 * NONE OF THIS MAY GO LIVE.
 *
 * VOICE. Every text here is in the third person. The old site let each coach
 * write their own introduction, and twelve people who all begin with "Hoi! Ik
 * ben ..." and end with "Ik kijk ernaar uit!" read as one voice, not twelve.
 * Third person also keeps the register of the rest of the site, where a city
 * page introduces the coach before the reader has met them.
 */

import type { StaticImageData } from "next/image";
import portraitOne from "@/public/images/coach-placeholder.png";
import portraitTwo from "@/public/images/coach-placeholder-2.png";
import portraitThree from "@/public/images/coach-placeholder-3.png";
import portraitFour from "@/public/images/coach-placeholder-4.png";
import portraitFive from "@/public/images/coach-placeholder-5.png";

export type Coach = {
  /** Also the anchor on /studiekeuzecoaches. */
  slug: string;
  /** TODO: invented. No coach is under contract. */
  name: string;
  /** The town they work from. It is the first word of `region`. */
  town: string;
  /** The whole work area, in the words a reader would use. */
  region: string;
  /**
   * The city page to link to, or null when that city has no page. Five coaches
   * and three cities is on purpose: a coach can start before their city page is
   * written, and a city page is only worth making where the traffic is.
   */
  citySlug: string | null;
  /** Two or three sentences. A city page shows this and nothing else. */
  intro: string;
  /** The long text. Only /studiekeuzecoaches shows it. */
  bio: string[];
  /**
   * Who this coach sees most. It helps a reader pick a person instead of a
   * postcode, and between the five it names the three groups of PRODUCT.md.
   */
  focus: string;
  /** A coach can start before they send a photo. Then this stays null. */
  portrait: StaticImageData | null;
  portraitAlt: string;
};

export const hanneke: Coach = {
  slug: "hanneke",
  name: "Hanneke",
  town: "Utrecht",
  region: "Utrecht, Nieuwegein, Houten en Zeist",
  citySlug: "utrecht",
  intro:
    "Hanneke werkt sinds 2016 met studiekiezers. Ze begon als decaan op een middelbare school, en daar merkte ze dat de gesprekken die echt hielpen nooit over roosters gingen. Ze werkt graag met mensen die twijfelen. Twijfel is meestal het begin van een goede keuze.",
  bio: [
    "Tien jaar stond ze op een school in Utrecht, eerst als docent aardrijkskunde en later als decaan. In dat decanaat voerde ze elk jaar honderden gesprekken van tien minuten. Dat is precies te kort om iemand te leren kennen, en het is de reden dat ze voor zichzelf begon.",
    "Wat ze in een gesprek doet, is vooral vragen stellen en niets invullen. Zeg je iets waar je zelf van schrikt, dan blijft dat gewoon staan. Ze zegt er niet achteraan dat het vast goed komt.",
    "Ze ziet veel studiekiezers die tussen twee richtingen heen en weer gaan, en tweedejaars die zich afvragen of ze door moeten. Bij allebei duurt het meestal twee gesprekken voordat het echte antwoord op tafel komt.",
  ],
  focus: "Twijfelen tussen twee richtingen, en tweedejaars",
  portrait: portraitOne,
  portraitAlt:
    "Hanneke, studiekeuzecoach in Utrecht, aan tafel in haar werkkamer",
};

export const bram: Coach = {
  slug: "bram",
  name: "Bram",
  town: "Amersfoort",
  region: "Amersfoort, Leusden, Soest en Barneveld",
  citySlug: "amersfoort",
  intro:
    "Bram is zelf twee keer gestopt met een studie voordat hij vond wat wel klopte. Hij weet dus hoe het voelt om een jaar over te doen, en hoe weinig je eraan hebt als iemand zegt dat het vanzelf goed komt. Hij werkt vooral met studiestoppers.",
  bio: [
    "Die twee studies waren rechten en bedrijfskunde. Allebei gekozen omdat ze een brede basis leken, en allebei van dichtbij iets anders dan van een afstand. Daarna werd het toegepaste psychologie, en dat klopte wel.",
    "Wat hij aan die omweg heeft overgehouden: bijna niemand stopt omdat hij het niet kan. Mensen stoppen omdat ze kozen op te weinig informatie. Dat is vervelend en het kost een jaar, maar het is geen karakterfout. Het is bruikbaar.",
    "Bram begint daarom bij wat er misging. Niet om erin te blijven hangen, maar omdat je daarna weet waar je de tweede keer op moet letten. Wachten tot september hoeft van hem niet.",
  ],
  focus: "Gestopt, of erover denken te stoppen",
  portrait: portraitTwo,
  portraitAlt:
    "Bram, studiekeuzecoach in Amersfoort, aan tafel in zijn werkkamer",
};

export const nadia: Coach = {
  slug: "nadia",
  name: "Nadia",
  town: "Rotterdam",
  region: "Rotterdam, Schiedam en Capelle aan den IJssel",
  citySlug: null,
  intro:
    "Nadia werkte twaalf jaar in personeelszaken voordat ze studiekiezers ging begeleiden. Ze was zelf de eerste in haar familie die ging studeren, en ze weet hoeveel je dan alleen moet uitzoeken.",
  bio: [
    "Die twaalf jaar zaten bij een bedrijf in de Rotterdamse haven. Ze voerde er de gesprekken met mensen die net binnenkwamen en met mensen die weg wilden. Die twee gesprekken gingen vaker over hetzelfde dan je zou denken: wat wil je eigenlijk, en durf je dat hardop te zeggen.",
    "Thuis kon niemand haar vertellen wat het verschil is tussen hbo en universiteit, of wat een propedeuse is. Ze kwam er gaandeweg achter, meestal net te laat om er nog iets aan te hebben.",
    "Met studiekiezers legt ze daarom eerst het speelveld uit, ook als je denkt dat je dat allang zou moeten weten. Pas daarna gaat het over wat bij jou past. Die volgorde scheelt een hoop schaamte.",
  ],
  focus: "De eerste in je familie die gaat studeren",
  portrait: portraitThree,
  portraitAlt:
    "Nadia, studiekeuzecoach in Rotterdam, aan tafel in haar werkkamer",
};

export const wietske: Coach = {
  slug: "wietske",
  name: "Wietske",
  town: "Groningen",
  region: "Groningen, Assen en Leeuwarden",
  citySlug: null,
  intro:
    "Wietske gaf achttien jaar les en was daarnaast zorgcoördinator op een school in Groningen. Ze is opgeleid als autismecoach en werkt veel met studiekiezers die meer aan overzicht hebben dan aan opties.",
  bio: [
    "Als zorgcoördinator zag ze de leerlingen voor wie de gewone weg niet werkt. Slim genoeg, maar vastgelopen op de manier waarop het onderwijs is ingericht: te veel tegelijk, te weinig ritme, te veel open vragen.",
    "Haar uitgangspunt is dat overzicht meer helpt dan keuze. Twee opleidingen die je echt kent zijn bruikbaarder dan twintig die je van een website hebt. Ze knipt de zoektocht daarom in kleine stukken, met één ding per keer.",
    "Ze werkt met een vast ritme: hetzelfde tijdstip, dezelfde plek, en aan het begin van elk gesprek de vraag wat er sinds de vorige keer is gebeurd. Heb je daar niets aan, dan laat ze het weg.",
  ],
  focus: "Kiezen met ADD, ADHD of autisme",
  portrait: portraitFour,
  portraitAlt:
    "Wietske, studiekeuzecoach in Groningen, aan tafel in haar werkkamer",
};

export const joris: Coach = {
  slug: "joris",
  name: "Joris",
  town: "Eindhoven",
  region: "Eindhoven, Helmond en Veldhoven",
  citySlug: null,
  intro:
    "Joris studeerde natuurkunde en werkte zes jaar in de techniek. Hij werkt vooral met studiekiezers die te veel leuk vinden, en daardoor niet kunnen kiezen.",
  bio: [
    "Bij dat technische bedrijf stopte hij omdat hij merkte dat hij het liefst deed wat het minst in zijn functie zat: uitleggen, en naast iemand zitten die iets aan het uitzoeken is.",
    "Te veel leuk vinden klinkt als een luxeprobleem. Dat is het niet. Wie overal ja op zegt kiest uiteindelijk niets, en bij elke keuze komt het gevoel dat je iets weggooit.",
    "Joris maakt dat gevoel kleiner. Je kiest geen leven, je kiest een eerste opleiding, en die ligt niet vast tot je pensioen. Je mag bij hem ook gewoon zeggen dat je het niet weet. Dat is precies waarom je er zit.",
  ],
  focus: "Te veel leuk vinden om te kunnen kiezen",
  portrait: portraitFive,
  portraitAlt:
    "Joris, studiekeuzecoach in Eindhoven, aan tafel in zijn werkkamer",
};

/** The order on /studiekeuzecoaches. It carries no ranking. */
export const coaches: Coach[] = [hanneke, bram, nadia, wietske, joris];
