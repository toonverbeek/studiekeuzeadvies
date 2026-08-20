import type { Metadata } from "next";
import Link from "next/link";
import { citiesWithCoach } from "@/app/cities";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Card,
  Check,
  Container,
  CtaBand,
  Eyebrow,
  Reveal,
  Section,
} from "@/app/components/ui";

/**
 * /voor-wie, built to the client's "Voor wie" page
 * (docs/redesign/client/voor-wie/index.html, design-spec 4.3).
 *
 * The client's desktop rendering is the target: hero, "Welk keuze-type ben
 * jij?" with eight rows, the three situation cards, "Waarom is de juiste
 * studiekeuze zo belangrijk?", the CTA band. Two things are ours:
 *
 * - THE HERO PHOTO IS NOT COPIED. It is a stock photo of people we have never
 *   met, and the archive rule says a scene may go on the home hero only
 *   (decision 2026-08-13). The right column carries five true facts instead,
 *   which is also where the client's own page would print "8,8 gemiddeld".
 * - THE PARENT BLOCK IS ADDED. The home page panel says "Informatie voor
 *   ouders" and links here, and the client's export has no parent section
 *   (design-spec 4.3, open question 7). The block is the ink half of the
 *   client's own two-tone panel, with the client's three "u" rows word for
 *   word: the client writes "u" to a parent and "je" to everybody else.
 */

export const metadata: Metadata = {
  title: "Voor wie is het studiekeuzetraject? | StudieKeuzeAdvies",
  description:
    "Voor wie voor het eerst kiest, voor wie gestopt is met een studie en voor wie meer overzicht nodig heeft. Lees welk keuze-type bij je past en hoe wij je helpen.",
  alternates: { canonical: "/voor-wie" },
};

/**
 * The client's eight lines, word for word. The old site printed the same list
 * on /studiekeuzetraject in a longer wording; in the client's design it belongs
 * here, and here only, so app/traject.ts no longer carries a copy of it.
 */
const chooserTypes = [
  "Je bent een serieuze scholier die zich goed wil voorbereiden op je toekomst.",
  "Je hebt geen idee wat je wilt, of je vindt juist veel leuk en je twijfelt.",
  "Je woont in het buitenland en wilt in Nederland studeren, maar kent het aanbod niet.",
  "Je vraagt je af welke studie bij je past, of wat je wilt worden.",
  "Je hebt al een idee, maar wilt verder kijken dan je eerste ingeving.",
  "Je bent gestopt met een studie en weet niet wat je nu wilt gaan doen.",
  "Je bent nog bezig met een studie, maar twijfelt of die wel bij je past.",
  "Je vindt het moeilijk om overzicht te krijgen in alle mogelijkheden.",
];

/**
 * The three doors, in the client's order and in the client's words. Each one
 * points at the page that answers it, which the client's export could not do
 * because those pages were not in the design.
 *
 * The third card names autisme, and the page it opens does not. That is the
 * decision of 2026-08-05: autisme is named on the doors that lead there, and
 * the page keeps the scope its source copy can carry (ADD and ADHD).
 */
const situations = [
  {
    href: "/eerste-studiekeuze",
    title: "Eerste studiekeuze",
    body: "Ga je voor het eerst een opleiding starten, maar heb je geen idee wat je wilt? Lijken veel opleidingen je leuk, waardoor je geen keuze kunt maken? Of wil je je gewoon goed voorbereiden op de toekomst? We helpen je een passende keuze te maken.",
    link: "Start meteen goed",
    surface: "bg-violet text-white",
    text: "text-white",
    linkColor: "text-white",
  },
  {
    href: "/verkeerde-studiekeuze",
    title: "Verkeerde studiekeuze",
    body: "Gestopt met een studie en weet je niet wat nu? Of twijfel je of je huidige studie wel past? Aan het eind van het traject heb je een overwogen keuze gemaakt voor de studie die écht bij je past. Wachten tot september hoeft niet.",
    link: "Maak een einde aan de twijfel",
    surface: "bg-ink text-paper",
    text: "text-lavender-ink",
    linkColor: "text-coral",
  },
  {
    href: "/studiekeuze-met-add-adhd",
    title: "Studeren met ADD, ADHD of autisme",
    body: "Dan helpt overzicht meer dan nóg meer opties: vaste stappen, één ding per keer, dezelfde coach elke afspraak en vooraf weten wat er gaat gebeuren. Zeg het in het intakegesprek, dan houdt je coach er rekening mee.",
    link: "Extra structuur in je keuze",
    surface: "border-[1.5px] border-ink bg-white text-ink",
    text: "text-muted",
    linkColor: "text-violet",
  },
];

/** What a parent asks first, and every line of it is true of us today. */
const parentRows = [
  "Alle gesprekken zijn 1-op-1, zo praat uw kind vrijuit",
  "Het traject bevat een persoonlijkheidstest en een studie-interessetest",
  "Uw kind beslist zelf, weloverwogen en zonder haast",
];

export default function VoorWiePage() {
  const cityCount = citiesWithCoach.length;

  /* No unproven number goes in this slot (PRODUCT.md principle 5). Five true
     lines do the same work: what it costs to start, how long it takes, what is
     in it, who it is for, and where it happens. */
  const facts = [
    "Het intakegesprek is gratis",
    "Vier gesprekken met één vaste coach",
    "Inclusief persoonlijkheidstest en studie-interessetest",
    "Voor mbo, hbo en wo",
    cityCount === 1 ? "In 1 stad, of online" : `In ${cityCount} steden, of online`,
  ];

  return (
    <>
      <SiteHeader />

      <main id="top">
        <header className="pt-10 pb-8 lg:pt-16 lg:pb-12">
          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
              <div>
                <Eyebrow className="mb-4">Voor wie</Eyebrow>

                <h1 className="text-h1 max-w-[16ch] font-bold">
                  Voor wie is het traject?
                </h1>

                <p className="text-lead mt-5 max-w-[34rem] text-muted">
                  Een studiekeuze is geen keuze voor het leven: met de meeste
                  studies kun je nog alle kanten op. Wat wél telt, is dat je
                  kiest voor een studie waar je de komende jaren op je plek zit
                  en je het beste kunt ontwikkelen.
                </p>

                <p className="text-lead mt-4 max-w-[34rem] text-muted">
                  Een verkeerde keuze is duur, zonde van je tijd en kan je
                  zelfvertrouwen raken. Daarom zijn wij er om je te helpen
                  kiezen.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    className="max-[420px]:w-full"
                    href="/studiekeuzecoaches"
                    size="lg"
                  >
                    Plan gratis intake bij een coach
                  </Button>
                  <Button
                    className="max-[420px]:w-full"
                    href="/studiekeuzetraject"
                    size="lg"
                    variant="outline"
                  >
                    Bekijk het traject
                  </Button>
                </div>
              </div>

              <Card className="lg:mt-2">
                <Eyebrow color="muted" size="sm">
                  In het kort
                </Eyebrow>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {facts.map((fact) => (
                    <Check key={fact}>{fact}</Check>
                  ))}
                </ul>
              </Card>
            </div>
          </Container>
        </header>

        {/* The client's own section paddings: 24px above the keuze-types and
            72px between every block below it. Written on the section, because
            `Section` sets `py` and a `pb-0` beside it is a fight about which
            utility Tailwind writes last. */}
        <Section className="pt-4 pb-12 lg:pt-6 lg:pb-18" space="none">
          <Container>
            <Reveal>
              <h2 className="text-h2 font-bold">Welk keuze-type ben jij?</h2>

              {/* The client wrote a second sentence here: "ongeveer de helft
                  van de mensen die bij ons aanklopt, maakte eerder al een keuze
                  die niet bleek te passen". That is a number about us and we
                  have not counted it, so it is gone. PRODUCT.md, principle 5.
                  The line below says the same thing without counting: the list
                  under it is the proof, because one of those eight lines is
                  about a choice that did not fit. */}
              <p className="mt-2.5 max-w-[36rem] text-muted">
                In welke fase van het zoeken je ook zit, we helpen je op de
                manier die jij nodig hebt. Herken je jezelf in een van deze
                zinnen, dan zit je hier goed.
              </p>
            </Reveal>

            <Reveal>
              <ul className="mt-7 grid gap-3 md:grid-cols-2">
                {chooserTypes.map((type) => (
                  <Check
                    className="items-center rounded-row border border-hairline bg-white px-5 py-4"
                    key={type}
                  >
                    {type}
                  </Check>
                ))}
              </ul>
            </Reveal>

            {/* The three doors. Each card is one situation, and the link goes
                to the page that answers it in full. */}
            <Reveal>
              <div className="mt-6 grid gap-5.5 md:mt-8 lg:grid-cols-3">
                {situations.map((situation) => (
                  <div
                    className={`flex flex-col gap-3 rounded-card p-8 lg:p-9 ${situation.surface}`}
                    key={situation.href}
                  >
                    <h3 className="text-title-lg font-bold">
                      {situation.title}
                    </h3>
                    {/* 15px is the card size of the system, and the client set
                        14.5px. On a telephone the card is the whole column and
                        the reader is in bed, so it reads at 17px there and
                        steps down only when it is one of three. */}
                    <p
                      className={`text-body flex-1 lg:text-card ${situation.text}`}
                    >
                      {situation.body}
                    </p>
                    <Link
                      className={`mt-1 inline-flex min-h-11 items-center font-bold ${situation.linkColor}`}
                      href={situation.href}
                    >
                      {situation.link} →
                    </Link>
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* The parent block. The home page promises it, so it stands here. */}
        <Section className="pb-12 lg:pb-18" id="ouders" space="none">
          <Container>
            <Reveal>
              <Card
                className="px-6 py-10 sm:px-10 lg:px-12 lg:py-13"
                pad="none"
                radius="panel"
                variant="indigo"
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
                  <div>
                    <Eyebrow className="mb-4" color="lavender-ink">
                      Voor ouders
                    </Eyebrow>
                    <h2 className="text-h4 max-w-[16ch] font-bold">
                      Inzicht en zekerheid, óók voor u.
                    </h2>
                  </div>

                  <div>
                    <ul className="flex flex-col gap-3">
                      {parentRows.map((row) => (
                        <Check key={row} mark="→" tone="coral">
                          {row}
                        </Check>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-3.5">
                      <Button
                        className="max-[420px]:w-full"
                        href="/studiekeuzetraject"
                        variant="outline-on-ink"
                      >
                        Zo werkt het traject
                      </Button>
                      <Button
                        className="max-[420px]:w-full"
                        href="/tarieven"
                        variant="outline-on-ink"
                      >
                        Wat het kost
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          </Container>
        </Section>

        <Section className="pb-12 lg:pb-18" space="none">
          <Container>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <h2 className="text-h2 font-bold">
                  Waarom is de juiste studiekeuze zo belangrijk?
                </h2>
              </Reveal>

              <Reveal className="flex flex-col gap-3.5 text-muted">
                <p>
                  De keuze voor een vervolgstudie is één van de belangrijkste
                  keuzes die je tot nu toe hebt gemaakt. Tegelijk is de uitval
                  en de switch in het eerste jaar van het mbo, hbo en wo hoog.
                  Het grootste deel van de studenten die uitvallen, valt uit
                  omdat de studie niet bleek te passen.
                </p>
                <p>
                  Veel scholieren stellen het kiezen uit en maken op het laatste
                  moment snel een keuze. Een verkeerde studiekeuze kost niet
                  alleen geld, maar geeft ook stress, doordat je toekomst
                  onzeker lijkt. Goede begeleiding helpt je een overwogen keuze
                  te maken. Dat scheelt frustratie, teleurstelling en een hoop
                  geld.
                </p>
              </Reveal>
            </div>
          </Container>
        </Section>

        <CtaBand
          accent="Het kost je niets."
          primary={{ href: "/locaties", label: "Kies je stad" }}
          secondary={{
            href: "/studiekeuzecoaches",
            label: "Bekijk eerst alle coaches",
          }}
          text="In het intakegesprek vertel je wat er speelt, en horen we of dit traject bij je past. Daarna zeg je gewoon nee als het niet klopt."
          title="Begin met een gesprek."
        />
      </main>

      <SiteFooter />
    </>
  );
}
