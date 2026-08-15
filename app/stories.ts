/**
 * The content of /ervaringen.
 *
 * The old page at `../studiekeuzeadvies archive/markdown/ervaringen.md` carried
 * eight customer stories: three short lines in a slider, and five longer ones in
 * a table. All eight come back here, in the writer's own words. The rights to the
 * archive are bought (PRODUCT.md, "Inherited Content and Open Questions"), so
 * nothing here waits on permission.
 *
 * THE WORDS ARE THE OLD WORDS. Nothing is rewritten and nothing is polished. A
 * spelling slip of the writer stays in ("een psychologisch achtergrond", "kwam
 * snel ten sprake"), because a corrected quote is not a quote. Three changes were
 * made, and they are the only three:
 *
 * 1. Paragraph breaks. Two stories were one block of 230 words. They are split
 *    where the writer changes subject, so the text is readable on a telephone at
 *    night. No word moved. `app/faq.ts` made the same change for the same reason.
 * 2. The name of one coach. Vincent's story named Charlie Ramsaran four times.
 *    He is not one of our coaches, and PRODUCT.md principle 3 says a named coach
 *    with a face is our proof. Printing the name of a coach who does not work
 *    here is false proof, so the story now says "mijn studiecoach" and "mijn
 *    coach" where the name stood. The story itself is untouched.
 * 3. The typographic mess of the old CMS: a double space, and "doen……geen idee"
 *    which is now "doen... geen idee".
 *
 * EVERY STORY CARRIES A DATE, AND THE DATE IS THE POINT. Most of these people
 * were coached by somebody who does not work for us. The date is what keeps the
 * page honest, so a story without one does not go on it. Two shapes appear here,
 * because we know two different things:
 *
 * - "traject afgerond in november 2023". A real completion date. Only Ger and
 *   Moya have one. They live in `legacyQuotes` in app/site-config.ts, which is
 *   also where the home page reads them, and they are imported below instead of
 *   copied, so there is one source and not two.
 * - "stond in 2019 op de oude site". The eight archive stories carry no date at
 *   all: not in the markdown, not in the HTML, not in `meta/crawl.json`, and not
 *   in the Yoast sitemaps. The page itself has one publication date for all of
 *   them (2013-12-15), which is the date of the page and not of any story, so it
 *   cannot be printed next to a name. What can be proved is the year a story
 *   stood on the old site, from the Internet Archive captures of
 *   `https://www.studiekeuzeadvies.nl/ervaringen/`:
 *
 *     capture 2016-01-09  Maura Peters, Rachel van Dijk and Ruben Schurink
 *                         are on the page. The 2015-07-24 capture has none of
 *                         them.
 *     capture 2019-08-23  all eight are on the page. The 2017-08-21 capture
 *                         still has only the three above.
 *
 *   So "stond in 2016 op de oude site" and "stond in 2019 op de oude site" are
 *   both true and both provable. They do not claim the story was written that
 *   year, because that is exactly what nobody knows. Ruben's line was already
 *   live in April 2014, on the older page `/casus-ervaringen/`, under the name
 *   "Ruben". That is very probably the same person, but "very probably" is not
 *   proof of a name, so his date stays at the year we can prove on this URL.
 *
 * REMOVED, AND WHY. `docs/five-pages-brief.md` section 8 applies to every page
 * built after it:
 *
 * - "Afgelopen jaar gaf 92% van de studenten aan dat de keuze inderdaad de juiste
 *   is gebleken." The old lead, and the old meta description said 96 percent on
 *   the same page. Neither number is ours to print. See PRODUCT.md principle 5.
 * - The old h1, "Honderden leerlingen en studenten gingen je voor!". "Honderden"
 *   is a figure about ourselves, and this company has one coach under contract.
 *   The h1 is now "Ervaringen van studiekiezers", which is the words of the old
 *   `<title>` and of the old footer link. The `<title>` itself stays word for
 *   word, because that is what ranks.
 * - The 088 number and the Keuzegids link. They belong to the seller.
 *
 * LEFT IN, AND WORTH A SECOND OPINION. Maura writes that the traject arranged a
 * day of walking along with a student. That was true of her traject in or before
 * 2016. It is her account and not our promise, and the date under her name says
 * so, but /studiekeuzetraject does not offer it today. See todos.md.
 */

import { legacyQuotes } from "./site-config";

export type Story = {
  /** One string per paragraph, in the writer's own words. */
  paragraphs: string[];
  /** The name as the old site printed it. */
  person: string;
  /**
   * When. Never empty and never a guess: a story we cannot date does not go on
   * this page at all.
   */
  meta: string;
};

/**
 * The eight stories of the old /ervaringen/, from new to old. Ger and Moya are
 * not in here: they are imported below, so app/site-config.ts stays the one
 * place they are written down.
 */
const archiveStories: Story[] = [
  {
    person: "Vincent van den Berg",
    meta: "stond in 2019 op de oude site",
    paragraphs: [
      "Nadat ik was gestopt met mijn studie wilde mijn ouders dat ik in gesprek ging met een studiecoach. Zo zou ik een gegronde en doordachte keuze kunnen maken voor mijn volgende studie. In eerste instantie zag ik dit niet zitten, maar wat ik volgend jaar zou kunnen doen... geen idee. Vandaar dat ik toch contact opnam met mijn studiecoach.",
      "Toen ik begon met het traject kwam snel ten sprake dat ik wel hobby's en wat interesses had, maar daar bleef het dan ook bij. Mijn coach hielp mij hier verder. Aan de hand van gesprekken en opdrachten kwamen we steeds verder en hielp hij mij bij het zoeken naar een passende studie. Een passende studie die wij ook vonden!",
      "Nu is het bijna twee jaar geleden dat ik in gesprek was gegaan met mijn coach. Mijn propedeuse is binnen, ook heb ik al mijn stages gehaald. Echter is één ding het allerbelangrijkst: ik voel mij op mijn plek. Mijn coach heeft mij geholpen met het maken van deze doordachte keuze, eentje waarin ik zelf ook vertrouwen had. Waar ik in het begin niet op zat te wachten, bleken de coaching sessies erg nuttig en zeer effectief!",
    ],
  },
  {
    person: "Ryan Lloyd",
    meta: "stond in 2019 op de oude site",
    paragraphs: [
      "Ik heb heel erg veel baat gehad bij mijn studiekeuze traject! Ik wist eerst niet wat ik wilde doen en waaruit ik allemaal kon kiezen, zo veel keuze allemaal! Maar dankzij dit traject heb ik nu een studie gevonden die perfect bij mij past en die ik nu nog steeds met veel plezier neem! Je wordt tijdens dit traject goed begeleid en je komt erachter wat nou allemaal kenmerkend is aan jezelf en je leert wat je zwakke en sterke punten zijn en hoe die je goed kan toepassen op je studie. Je wordt duidelijk een richting in gestuurd maar moet het toch allemaal zelf doen, want het is belangrijk voor jezelf en niet iemand anders.",
      "Het heeft mij in ieder geval goed geholpen en kan het mensen zeker aanraden!!",
    ],
  },
  {
    person: "Max Vogt",
    meta: "stond in 2019 op de oude site",
    paragraphs: [
      "Voor mij heeft het studiekeuzetraject heel erg geholpen om een paar dingen voor mij duidelijk te maken. Ten eerste natuurlijk de studiekeuze zelf: door het doen van oefeningen en het voeren van gesprekken kwam ik er steeds meer achter welke studie het best bij mij paste en waarom. Ten tweede hielpen de oefeningen en gesprekken voor mij persoonlijk ook heel erg. Omdat ik hierdoor ook veel over mezelf te weten kwam.",
    ],
  },
  {
    person: "Juliette Hermida",
    meta: "stond in 2019 op de oude site",
    paragraphs: [
      "Ik vond het traject heel erg fijn. Ik heb me erg op mijn gemak gevoeld en ben ook bij mijn juiste studiekeuze terecht gekomen. Er was ook veel diepgang in de gesprekken, wat erg fijn was.",
    ],
  },
  {
    person: "Stefano Markink",
    meta: "stond in 2019 op de oude site",
    paragraphs: [
      "Ik heb het traject heel fijn gevonden. Het was erg gepersonaliseerd en het heeft mij tot mijn compleet eigen keuze gebracht qua studie. Het voelde echt goed toen ik mijn studiekeuze had gemaakt.",
    ],
  },
  {
    person: "Maura Peters",
    meta: "stond in 2016 op de oude site",
    paragraphs: [
      "Na al eerder gestopt te zijn met een studie wilde ik niet weer de verkeerde studiekeuze maken. Zelf wist ik écht niet wat ik wilde studeren en er zijn zo veel studies dat ik ook niet wist waar ik moest beginnen met zoeken. Zo kwam ik bij het Studiekeuze traject terecht. Ik wilde niet zo'n studiekeuze bureau waarbij je een aantal testjes doet en er vervolgens een resultaat uit de computer kwam, dat vond ik te onpersoonlijk.",
      "Het studiekeuze traject bestaat vooral uit praten, wat wil je? Wat wil je niet? En zodoende kreeg ik een steeds duidelijker beeld van wat ik wilde. Dit had ik nooit verwacht want ik had echt geen flauw idee wat ik wilde studeren. Uiteindelijk kreeg ik een lijst met een aantal studies, waarvan ik een aantal opties heb verkend.",
      "Het Studiekeuze traject regelt dan ook nog van alles voor je, je kunt bijvoorbeeld meelopen met een student zodat je weet hoe de studie écht is (en dus niet alleen die veel te rooskleurige praatjes die je op open dagen hoort). Zo heb ik binnen acht weken een studiekeuze kunnen maken, waar ik nog steeds tevreden mee ben!",
    ],
  },
  {
    person: "Rachel van Dijk",
    meta: "stond in 2016 op de oude site",
    paragraphs: [
      "Mijn coach was erg betrokken en had ook een psychologisch achtergrond wat mij erg heeft geholpen bij mijn keuze.",
    ],
  },
  {
    person: "Ruben Schurink",
    meta: "stond in 2016 op de oude site",
    paragraphs: [
      "Veel dank voor alle gesprekken. Zelf was ik nooit bij deze opleiding gekomen.",
    ],
  },
];

/**
 * The reading order: first the two stories with a real completion date, in the
 * order app/site-config.ts holds them, then the eight from the archive, from the
 * newest year we can prove to the oldest. Newest first, because the first
 * question a reader has about a customer story is how old it is.
 */
export const stories: Story[] = [
  ...legacyQuotes.map((item) => ({
    paragraphs: [item.quote],
    person: item.person,
    meta: item.meta,
  })),
  ...archiveStories,
];
