/**
 * The content of /mbo-opleiding-kiezen, /hbo-opleiding-kiezen and
 * /wo-opleiding-kiezen.
 *
 * THE DECISION THAT SHAPES THIS FILE. On the old site these three pages were
 * one text with the level swapped: the same opening, the same middle and the
 * same closing paragraph, with "mbo" changed into "hbo" or "wo".
 * `docs/rebuild-review.md` section 5 names that pattern as the biggest ranking
 * risk in the whole move, so it is not rebuilt here. The three pages share one
 * skeleton and about 35 words of text: the four themes, the two headings above
 * them, the link to /studiekeuzetraject and the heading of the invitation.
 * Every other sentence is written for one level and stands on one page only.
 *
 * The URL, the <title> and the h1 of each page are the old ones, word for word.
 * That is what ranks, and it does not change:
 *
 *   /mbo-opleiding-kiezen  h1 "Hulp bij studiekeuze mbo"
 *                          <title> "Opleiding kiezen mbo | Hulp bij studiekeuze | StudieKeuzeAdvies"
 *   /hbo-opleiding-kiezen  h1 "Hulp bij studiekeuze hbo"
 *                          <title> "Opleiding kiezen hbo | Hulp bij studiekeuze | StudieKeuzeAdvies"
 *   /wo-opleiding-kiezen   h1 "Hulp bij studiekeuze wo"
 *                          <title> "Opleiding kiezen wo | Hulp bij studiekeuze | StudieKeuzeAdvies"
 *
 * The h1 is split into `titleLead` and `titleLevel` because the level is the one
 * word that separates these three pages, and it is the word that carries the
 * poster type. Together they read as the old sentence.
 *
 * WHAT WAS REMOVED, ON ALL THREE PAGES
 *
 * - The TalentenTest and the sentence about the research developed with the
 *   Universiteit van Tilburg. It belongs to the seller, and this site does not
 *   sell it. Qompas and the Keuzegids go with it.
 * - The whole closing section about the coaches ("De coaches van
 *   StudieKeuzeAdvies" and "De studiekeuzecoaches van StudieKeuzeAdvies").
 *   Every sentence in it is a claim about the people who worked for the seller:
 *   that they all finished a university degree, that they are young
 *   professionals, and that they have years of experience with this age group.
 *   Those are hiring wishes, not facts we can stand behind today, and todos.md
 *   lists them as a blocker. What the traject does is described instead.
 * - The 088 number in the copy. app/site-config.ts owns the number.
 * - The claims about ourselves in the old h2s and closing lines: "de
 *   professionals van nu voor de professionals van straks", "Bij
 *   StudieKeuzeAdvies ben je aan het juiste adres!", and "coaches die zich
 *   hebben gespecialiseerd". We cannot prove any of them.
 * - No price was on these three pages, and none is added.
 * - The remaining sentences that only pointed at ourselves: "Ben jij iemand die
 *   wel wat advies kan gebruiken? De studiekeuzecoaches van StudieKeuzeAdvies
 *   staan voor je klaar" (mbo), and "Wij helpen je graag met het beantwoorden
 *   van de vraag: welke hbo opleiding past bij mij?" (hbo). That last question
 *   is not lost: it is the heading of the first section on the hbo page, which
 *   is where the reader was already looking for it.
 *
 * WHAT IS NEW HERE, NOT MIGRATED
 *
 * The old copy that survives the cleaning is roughly 170 words per page, so
 * about half of each page below is written now. It is written about the level,
 * never about us:
 *
 * - mbo: the second paragraph of "Welke mbo opleiding past bij mij?", the
 *   second paragraph of "Het aanbod verschilt per ROC", and the whole of
 *   "Niveau, leerweg en wat er daarna kan".
 * - hbo: the whole of "Twee wegen naar het hbo" and the whole of "Welke
 *   opleiding, en welke hogeschool?". The idea of that second one is the old
 *   page's own question, the sentences are not.
 * - wo: the second paragraph of "Welke studie kies je, en waar?", and the whole
 *   of "In Nederland of in het buitenland" and "Wat een wo-studie van je
 *   vraagt".
 * - The two lines under the doors, the intro above the four themes and the
 *   paragraph in the invitation, on all three pages.
 *
 * The Deltion College and ROC Nijmegen example on the mbo page is the old
 * page's own, and it is concrete and true, so it stays word for word.
 *
 * THE META DESCRIPTIONS
 *
 * Each one opens with the question the old description opened with, word for
 * word, because that question is the search phrase and the reason to click. The
 * rest of each old description was the same generic sentence about ourselves on
 * all three pages ("StudieKeuzeAdvies helpt je een passende studiekeuze te
 * maken!"), which would give three near-identical descriptions. That half is
 * written per level instead.
 *
 * SMALL CHANGES TO MIGRATED SENTENCES, ALL COSMETIC
 *
 * - hbo: "aan een Hogeschool (Hbo)" became "aan een hogeschool".
 * - wo: "VWO" became "vwo", and "carrière mogelijkheden" became
 *   "carrièremogelijkheden".
 * - wo: the doors said "WO opleiding". They now say "wo opleiding", like the
 *   h1 and like the other two pages.
 *
 * The unhyphenated "mbo opleiding" of the old mbo page is kept: it is the
 * search phrase and the URL. The hbo page keeps the old page's own mix, which
 * writes "hbo-opleiding" in running text and "hbo opleiding" in the doors.
 */

export type LevelSection = {
  /** The h2, and one entry in both indexes. */
  title: string;
  paragraphs: string[];
};

/** One of the two doors of the old page. Kept, because they really do route. */
export type Door = {
  href: string;
  /** The old link text, with the level in it. */
  label: string;
  /** One line, written for this level. Not on the old page. */
  body: string;
};

/**
 * The route to the other two level pages. Not on the old site, where these
 * three URLs never mentioned each other: a reader on the mbo page who worked
 * out that they wanted the hbo had to go back to Google.
 *
 * The heading above it lives in the template, because it is four words. The
 * sentence below is written per level, because the doubt is different per
 * level: on the hbo page it comes from both sides, and on the other two it
 * comes from one.
 */
export type OtherLevels = {
  intro: string;
  links: { href: string; label: string }[];
};

export type Level = {
  slug: string;
  /** The small line above the title. The breadcrumb line of the old page. */
  eyebrow: string;
  /**
   * The h1 of the old page, in two parts. `titleLevel` is the last word, and it
   * is the only word that differs between these three pages, so it is the word
   * that gets the poster type. Read together they are the old h1, word for word.
   */
  titleLead: string;
  titleLevel: string;
  /** The <title>. The old one, word for word. */
  seoTitle: string;
  description: string;
  /** The opening sentences of the old page. */
  lead: string;
  sections: LevelSection[];
  /** The way to the other two levels. See the type above. */
  otherLevels: OtherLevels;
  doors: Door[];
  /** The line above the four themes. Written per level on purpose. */
  themesIntro: string;
  /** The paragraph in the invitation block. Written per level on purpose. */
  invitation: string;
  /** The articles under "Lees ook", by slug. Missing slugs are skipped. */
  related: string[];
};

/**
 * The four themes are the four the old level pages listed, word for word, and
 * the same four that app/situations.ts uses. Names only: the descriptions live
 * on the traject page and they stay there.
 */
export const levelThemes = [
  "Oriëntatie",
  "Wie ben ik en wat kan ik?",
  "Blik op de toekomst",
  "De studiekeuze",
];

export const levels: Level[] = [
  {
    slug: "mbo-opleiding-kiezen",
    eyebrow: "Mbo opleiding kiezen",
    titleLead: "Hulp bij studiekeuze",
    titleLevel: "mbo",
    seoTitle: "Opleiding kiezen mbo | Hulp bij studiekeuze | StudieKeuzeAdvies",
    description:
      "Welke mbo opleiding past bij mij? Dat vragen veel scholieren en studenten zichzelf af. Het aanbod is enorm en verschilt per ROC. Een vaste coach helpt je kiezen.",
    lead: "Op het moment dat je in het laatste jaar van je vmbo zit begint het allemaal erg serieus te worden. Je moet je gaan oriënteren op een vervolgopleiding aan het mbo. Veel eindexamenscholieren komen erachter dat dit een hele lastige keuze kan zijn.",
    sections: [
      {
        title: "Welke mbo opleiding past bij mij?",
        paragraphs: [
          "Meestal ben je nog vrij jong op het moment dat je jouw diploma haalt en verder gaat studeren. Grote kans dat jij je afvraagt: welke mbo opleiding past bij mij? Misschien weet je nog helemaal niet wat je wilt, of je hebt al wel een idee maar je weet niet zeker of de opleiding wel echt goed bij jou en je kwaliteiten en ambities past. Het kan ook zijn dat je al eerder een mbo opleiding gevolgd hebt, maar dat dit niet de juiste keuze bleek te zijn.",
          "Dat je jong bent, maakt het niet makkelijker. Op het mbo kies je meteen een vak, en op je zestiende weet lang niet iedereen al welk werk daarbij hoort. Je hoeft dat ook niet te weten. Je moet alleen weten waar je op moet letten, en wat je nog niet hebt gezien.",
        ],
      },
      {
        title: "Het aanbod verschilt per ROC",
        paragraphs: [
          "Daar komt nog bij dat, zeker op het mbo, het aantal opleidingen waar je uit kunt kiezen echt enorm is. En dan verschillen de opleidingen per ROC ook nog eens. Een opleiding Verpleegkunde ziet er op het Deltion College in Zwolle heel anders uit dan een opleiding Verpleegkunde op het ROC Nijmegen. Hoe kies je nou voor de opleiding die écht bij jou past?",
          "Dezelfde naam betekent dus niet hetzelfde rooster. Kijk daarom verder dan de naam van de opleiding. Welke vakken krijg je, hoeveel dagen sta je in de praktijk, en met wat voor bedrijven werkt die school samen? Dat verschilt per school, en het bepaalt hoe jouw week er straks echt uitziet.",
        ],
      },
      {
        title: "Niveau, leerweg en wat er daarna kan",
        paragraphs: [
          "Op het mbo kies je niet alleen een vak, maar ook een niveau en een leerweg. Bij de beroepsopleidende leerweg (bol) zit je vooral op school en loop je stage. Bij de beroepsbegeleidende leerweg (bbl) werk je het grootste deel van de week en ga je één dag naar school. Dezelfde opleiding voelt in die twee vormen heel anders.",
          "En je zit nergens aan vast. Met een diploma op niveau 2 kun je door naar niveau 3, en daarna naar niveau 4. Met een diploma op niveau 4 kun je naar het hbo. Dat hoef je nu allemaal nog niet te beslissen. Het helpt wel om te weten dat die deur openblijft.",
        ],
      },
    ],
    otherLevels: {
      intro:
        "Op het vmbo lijkt het mbo de enige route, en zo vast ligt het niet. Met een diploma op niveau 4 kun je later naar het hbo, en er zijn genoeg mensen die die stap zetten. Denk je daar nu al aan, kijk dan ook eens verder vooruit.",
      links: [
        { href: "/hbo-opleiding-kiezen", label: "Een hbo opleiding kiezen" },
        { href: "/wo-opleiding-kiezen", label: "Een wo opleiding kiezen" },
      ],
    },
    doors: [
      {
        href: "/eerste-studiekeuze",
        label: "Ik ga voor het eerst een mbo opleiding kiezen",
        body: "Je doet dit jaar examen op het vmbo en het mbo is de volgende stap. Je zet met je coach op een rij wat er is, en wat daarvan bij jou past.",
      },
      {
        href: "/verkeerde-studiekeuze",
        label: "Ik heb eerder een verkeerde mbo opleiding gekozen",
        body: "Je bent gestopt met een mbo opleiding, of je twijfelt of je op de goede plek zit. Je weet nu een heleboel wat je vorig jaar nog niet wist. Dat gebruiken we.",
      },
    ],
    themesIntro:
      "Je werkt in vier gesprekken met dezelfde coach naar één keuze toe. De gesprekken draaien om deze vier thema's.",
    invitation:
      "Vertel wat je nu doet en waar je vastloopt. We kijken samen of dit traject je verder helpt bij het kiezen van een mbo opleiding. Het gesprek kost je niets en je zegt daarna gewoon nee als het niet klopt.",
    related: ["artikel-aanmelden-studies", "de-1-februariregeling"],
  },
  {
    slug: "hbo-opleiding-kiezen",
    eyebrow: "Hbo opleiding kiezen",
    titleLead: "Hulp bij studiekeuze",
    titleLevel: "hbo",
    seoTitle: "Opleiding kiezen hbo | Hulp bij studiekeuze | StudieKeuzeAdvies",
    description:
      "Welke hbo opleiding past bij mij? Dat vragen veel scholieren en studenten zich af. Je kiest twee keer: een opleiding, en een hogeschool. Een vaste coach helpt.",
    lead: "Ben jij een scholier die in het eindexamenjaar van de havo zit, of rond jij binnenkort een mbo-opleiding af? Dan is de kans groot dat je graag verder wilt studeren aan een hogeschool. Je komt nu voor een lastige keuze te staan.",
    sections: [
      {
        title: "Welke hbo opleiding past bij mij?",
        paragraphs: [
          "Welke studie sluit goed aan bij jouw wensen en mogelijkheden en welke onderwijsinstelling is voor jou de beste? Dit zijn vragen waar veel scholieren maar ook studenten mee te maken krijgen. Het kan namelijk ook zo zijn dat jij al begonnen bent aan een hbo-opleiding, maar deze niet de juiste blijkt te zijn.",
          "Weet je al precies wat je wilt gaan doen? Gefeliciteerd met je keuze. Twijfel je nog erg tussen twee of meerdere studies, heb je nog totaal geen idee welke kant je op wilt, of heb je een verkeerde studiekeuze gemaakt? Dat is geen ramp. Een troost is dat veel scholieren en studenten hiermee worstelen, je bent dus zeker niet de enige.",
        ],
      },
      {
        title: "Twee wegen naar het hbo",
        paragraphs: [
          "In dezelfde collegezaal zitten twee groepen naast elkaar. De ene komt van de havo en gaat voor het eerst studeren. De andere komt van het mbo, heeft al een vak geleerd en stage gelopen, en stapt een niveau hoger in. Dat zijn twee heel verschillende startpunten voor dezelfde keuze.",
          "Kom je van het mbo, dan begin je niet overnieuw. Je weet al hoe een stage werkt en wat je van een vakgebied vindt, en dat is precies het materiaal waarmee je kiest. Kom je van de havo, dan is het hbo je eerste keuze voor een richting en heb je die ervaring nog niet. In allebei de gevallen begint kiezen bij wat je al over jezelf weet.",
        ],
      },
      {
        title: "Welke opleiding, en welke hogeschool?",
        paragraphs: [
          "Op het hbo kies je twee keer. Eerst de opleiding, en daarna de hogeschool. Die tweede vraag wordt vaak overgeslagen, terwijl dezelfde opleiding per hogeschool anders is opgebouwd: andere vakken in het eerste jaar, andere stages, andere bedrijven in de buurt, en een andere stad om in te wonen.",
          "Let ook op de vorm. Veel opleidingen bestaan naast voltijd ook als deeltijd of duaal, en naast de vierjarige bachelor bestaat de tweejarige Associate degree. Dat verandert hoeveel je werkt, hoe lang je studeert en waarmee je daarna naar buiten stapt. Zoek dat uit voordat je je aanmeldt, niet erna.",
        ],
      },
    ],
    otherLevels: {
      intro:
        "Het hbo ligt tussen de andere twee in, en daarom komt de twijfel hier van twee kanten. De ene helft vraagt zich af of het mbo praktischer en prettiger is, de andere of de universiteit meer past. Dat is een echte vraag, en je hoeft hem nu niet in je eentje te beantwoorden.",
      links: [
        { href: "/mbo-opleiding-kiezen", label: "Een mbo opleiding kiezen" },
        { href: "/wo-opleiding-kiezen", label: "Een wo opleiding kiezen" },
      ],
    },
    doors: [
      {
        href: "/eerste-studiekeuze",
        label: "Ik ga voor het eerst een hbo opleiding kiezen",
        body: "Je doet examen op de havo, of je rondt je mbo af, en het hbo is de volgende stap. Je zet met je coach op een rij wat er is, en wat daarvan bij jou past.",
      },
      {
        href: "/verkeerde-studiekeuze",
        label: "Ik heb eerder een verkeerde hbo opleiding gekozen",
        body: "Je bent begonnen aan een hbo-opleiding en die blijkt niet te kloppen. Je hebt nu ervaring die je vorig jaar nog niet had, en daar kiezen we deze keer mee.",
      },
    ],
    themesIntro:
      "In vier gesprekken met je eigen coach werk je toe naar een keuze voor een opleiding én voor een school. Dat gaat langs deze vier thema's.",
    invitation:
      "Vertel wat je tot nu toe hebt gedaan en waar je nu staat. We kijken samen of dit traject je helpt om te kiezen tussen opleidingen en hogescholen. Het gesprek kost je niets en verplicht je tot niets.",
    related: [
      "artikel-aanmelden-studies",
      "gestopt-met-je-studie-blijf-niet-stilzitten",
    ],
  },
  {
    slug: "wo-opleiding-kiezen",
    eyebrow: "Wo opleiding kiezen",
    titleLead: "Hulp bij studiekeuze",
    titleLevel: "wo",
    seoTitle: "Opleiding kiezen wo | Hulp bij studiekeuze | StudieKeuzeAdvies",
    description:
      "Zoveel wo opleidingen, welke past bij jou? Je kijkt naar universiteiten in binnen- of buitenland. Met een vaste coach maak je een keuze die echt bij je past.",
    lead: "Jij bent iemand die in het examenjaar van het vwo zit. In dat geval ligt het voor de hand om verder te gaan studeren. Waarschijnlijk oriënteer jij je op een studie aan één van de universiteiten in binnen- of buitenland.",
    sections: [
      {
        title: "Welke studie kies je, en waar?",
        paragraphs: [
          "Natuurlijk wil je een studie die aansluit bij jouw kwaliteiten, wensen en interesses. Maar ook baanzekerheid en carrièremogelijkheden zijn belangrijk om mee te nemen in je keuze. Maar welke studie kies je nu? Wat past nou echt bij jou en waar ga je deze studie volgen? Vragen die wij je graag helpen beantwoorden.",
          "Baanzekerheid staat op dat lijstje omdat jij hem erop zet, en dat is een eerlijk argument. Het wordt alleen lastig als het het enige argument is. Een studie die je niet ligt maak je meestal niet af, hoe goed het beroep erna ook betaalt.",
        ],
      },
      {
        title: "In Nederland of in het buitenland",
        paragraphs: [
          "Kijk je ook over de grens, dan kies je meer dan alleen een studie. Een universiteit in het buitenland heeft eigen aanmelddata, eigen toelatingseisen, een eigen collegegeld en meestal een andere taal waarin je straks tentamens maakt. Zoek dat vroeg uit, want die deadlines liggen vaak eerder dan de Nederlandse.",
          "En kijk in Nederland verder dan de naam op de gevel. Dezelfde studie kan aan de ene universiteit vooral uit hoorcolleges bestaan en aan de andere uit kleine werkgroepen. Het verschil zit in het rooster en in de werkvormen, en dat merk je elke week.",
        ],
      },
      {
        title: "Wat een wo-studie van je vraagt",
        paragraphs: [
          "Een wo-bachelor duurt drie jaar en daarna volgt bijna altijd een master. Je kiest dus eigenlijk twee keer, en je eerste keuze bepaalt welke tweede keuzes je overhoudt. Sommige bachelors zijn breed opgezet en laten je pas later specialiseren. Andere leggen je meteen vast.",
          "Voor een aantal studies geldt bovendien een numerus fixus, met een eigen selectie en een eigen deadline. Kom je daar pas in het voorjaar achter, dan is de keuze al voor je gemaakt. Daarom helpt het om vroeg te weten welke kant het ongeveer op gaat, ook als je nog niet weet welke studie het wordt.",
        ],
      },
    ],
    otherLevels: {
      intro:
        "Met een vwo-diploma ligt de universiteit voor de hand, en verplicht ben je tot niets. Het hbo is geen stap terug maar een andere manier van leren: dichter op de praktijk, met stages erin. Wie dat liever doet, hoort daar thuis en niet in een collegezaal.",
      links: [
        { href: "/hbo-opleiding-kiezen", label: "Een hbo opleiding kiezen" },
        { href: "/mbo-opleiding-kiezen", label: "Een mbo opleiding kiezen" },
      ],
    },
    doors: [
      {
        href: "/eerste-studiekeuze",
        label: "Ik ga voor het eerst een wo opleiding kiezen",
        body: "Je doet dit jaar eindexamen op het vwo en je moet kiezen. Je brengt met je coach in kaart wat er is, en wat daarvan bij jou past.",
      },
      {
        href: "/verkeerde-studiekeuze",
        label: "Ik heb eerder een verkeerde wo opleiding gekozen",
        body: "Je bent begonnen aan een studie en die blijkt niet te kloppen. Je weet nu beter wat je niet wilt, en dat is een prima plek om opnieuw te beginnen.",
      },
    ],
    themesIntro:
      "Zet jij graag alle mogelijkheden op een rijtje voordat je een definitieve beslissing neemt? Dan is dit de volgorde waarin je dat doet, in vier gesprekken met je eigen coach.",
    invitation:
      "Vertel welke studies je overweegt en waar je op vastloopt. We kijken samen of dit traject je helpt om een keuze te maken waar je echt achter staat. Het gesprek kost je niets en verplicht je tot niets.",
    related: ["de-1-februariregeling", "artikel-aanmelden-studies"],
  },
];

export function getLevel(slug: string): Level | undefined {
  return levels.find((level) => level.slug === slug);
}
