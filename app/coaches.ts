/**
 * The people. One coach is written once, here, and every page reads from this
 * file: /studiekeuzecoaches shows the whole roster, a city page shows the one
 * coach who works there, and the home page and the footer count them.
 *
 * WARNING: READ `isPlaceholder` BEFORE YOU PUBLISH ANYTHING FROM THIS FILE.
 *
 * `isPlaceholder: true` means the person does not exist. The name, the history,
 * the work region and the portrait are stand-ins, so the pages can be judged at
 * full length before a coach is under contract. NONE OF THOSE MAY GO LIVE.
 *
 * `isPlaceholder: false` means a real coach. Janneke is the first one. Her
 * facts and her photo come from the archive, `../studiekeuzeadvies archive/
 * markdown/janneke-van-den-brand.md`, and the rights to that archive are bought,
 * so they may go live. See PRODUCT.md, section "Inherited Content and Open
 * Questions".
 *
 * VOICE. Every text here is in the third person. The old site let each coach
 * write their own introduction, and twelve people who all begin with "Hoi! Ik
 * ben ..." and end with "Ik kijk ernaar uit!" read as one voice, not twelve.
 * Third person also keeps the register of the rest of the site, where a city
 * page introduces the coach before the reader has met them.
 */

import type { StaticImageData } from "next/image";
import portraitJanneke from "@/public/images/coach-janneke.jpg";
import portraitOne from "@/public/images/coach-placeholder.png";
import portraitTwo from "@/public/images/coach-placeholder-2.png";
import portraitThree from "@/public/images/coach-placeholder-3.png";
import portraitFour from "@/public/images/coach-placeholder-4.png";
import portraitFive from "@/public/images/coach-placeholder-5.png";

export type Coach = {
  /** Also the anchor on /studiekeuzecoaches. */
  slug: string;
  /**
   * true means this person does not exist and may not go live. It is the one
   * field that decides that, so it is required on every coach: adding someone
   * without an answer to "is this a real person" must not compile.
   */
  isPlaceholder: boolean;
  name: string;
  /** The town they work from. It is the first word of `region`. */
  town: string;
  /** The whole work area, in the words a reader would use. */
  region: string;
  /**
   * The city page to link to, or null when that city has no page. More coaches
   * than city pages is on purpose: a coach can start before their city page is
   * written, and a city page is only worth making where the traffic is.
   */
  citySlug: string | null;
  /** Two or three sentences. A city page shows this and nothing else. */
  intro: string;
  /** The long text. Only /studiekeuzecoaches shows it. */
  bio: string[];
  /**
   * Who this coach sees most. It helps a reader pick a person instead of a
   * postcode, and over the whole roster it names the three groups of PRODUCT.md.
   */
  focus: string;
  /** A coach can start before they send a photo. Then this stays null. */
  portrait: StaticImageData | null;
  portraitAlt: string;
};

/**
 * The first real coach. Every fact below stands in the archive interview at
 * `../studiekeuzeadvies archive/markdown/janneke-van-den-brand.md`, but not one
 * sentence is copied from it: that text is her own, in the first person, in the
 * voice of the old site. What is written here is the same history in the voice
 * of this site. Nothing is added that she did not say herself.
 *
 * Her portrait is her own photo from the archive, so it is the only face on the
 * site that belongs to a person. It is black and white against a bare wall,
 * where the five stand-ins are warm colour at a table. That difference is real
 * and it stays until she sends a photo she likes better. Ask her for one: the
 * rights are not the reason, the photo is from 2019.
 */
export const janneke: Coach = {
  slug: "janneke",
  isPlaceholder: false,
  name: "Janneke",
  town: "Amsterdam",
  region: "Amsterdam en Amstelveen",
  citySlug: "amsterdam",
  intro:
    "Janneke is psycholoog en werkt sinds 2015 als studiekeuzecoach in Amsterdam. In haar praktijk zag ze volwassenen vastlopen in werk dat nooit bij ze paste, en bij bijna iedereen kwam dezelfde vraag boven: hoe was het gelopen als er iemand had meegedacht toen de keuze nog open lag. Daarom zit ze nu naast mensen van jouw leeftijd.",
  bio: [
    "Ze studeerde psychologie aan de UvA en werkte daarna met zware doelgroepen: eerst in een huis van bewaring, later bij een ggz-instelling. Het werk zelf was goed, de omstandigheden niet, en op een dag stopte ze zonder te weten wat er dan wel moest komen.",
    "Ze liet zich toen zelf coachen om dat uit te zoeken. Dat hielp zo goed dat ze de opleiding ging doen, en zo kwam ze bij een jongere doelgroep terecht. Naast dit werk is ze nog steeds parttime psycholoog, met jongeren in de verslavingszorg. Dat merk je: ze schrikt niet van wat je vertelt, en ze gaat niet harder praten als je stil valt.",
    "Vraag je haar wat ze belangrijk vindt in een traject, dan begint ze bij vertrouwen. Ze werkt veel met studiekiezers bij wie thuis al een richting klaarligt, en met studiekiezers die weinig van zichzelf verwachten. Ouders hebben haar weleens apart gevraagd om hun kind richting de universiteit te duwen. Dat doet ze niet. De keuze is van jou, ook als iemand anders betaalt.",
  ],
  focus: "Kiezen terwijl thuis iets anders wordt verwacht",
  portrait: portraitJanneke,
  portraitAlt:
    "Janneke, studiekeuzecoach in Amsterdam, zwart-witportret tegen een lichte muur",
};

export const hanneke: Coach = {
  slug: "hanneke",
  isPlaceholder: true,
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
  isPlaceholder: true,
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
  isPlaceholder: true,
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
  isPlaceholder: true,
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
  isPlaceholder: true,
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

/**
 * The order on /studiekeuzecoaches, and the order of the index in its hero.
 * It carries no ranking, with one exception: the real coach stands first, and
 * every stand-in follows. That keeps the top of the page true if the rest is
 * pulled at short notice.
 */
export const coaches: Coach[] = [janneke, hanneke, bram, nadia, wietske, joris];
