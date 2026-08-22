import type { Metadata } from "next";
import { coaches } from "@/app/coaches";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Card,
  Check,
  Container,
  Eyebrow,
  Pill,
  Reveal,
  Section,
} from "@/app/components/ui";
import { coachLicence } from "@/app/pricing";
import { CoachApplicationForm } from "./application-form";

/**
 * "Word coach", the client's page (design-spec 4.9). The third reader of
 * PRODUCT.md: without coaches there is no product, so this page has to make a
 * good coach want to write to us.
 *
 * THE LICENCE AMOUNT IS AN INDICATION AND SAYS SO, which is how the client
 * printed it (GESPREK.md section 5 lists the final price as still open). It is
 * one constant here, so the day it is fixed one line changes.
 *
 * WHICH REGIONS ARE TAKEN IS READ FROM THE ROSTER, never typed, and only the
 * coaches who exist count. The client's export names six cities by hand; five
 * of the six coaches in app/coaches.ts carry `isPlaceholder: true`, so the
 * sentence and the pills below are generated from the real coaches and grow by
 * themselves the day a stand-in becomes a person.
 */
export const metadata: Metadata = {
  title: "Word studiekeuzecoach van jouw regio | StudieKeuzeAdvies",
  description:
    "StudiekeuzeAdvies is van de coaches zelf. Per stad of regio sluit precies één coach aan: eigen profielpagina, aanvragen rechtstreeks bij jou, een eenmalige licentie en geen maandelijkse afdracht.",
  alternates: { canonical: "/coach-worden" },
};

/** The one-off licence, as an indication. See app/pricing.ts. */
const licentie = coachLicence.label;

/**
 * The coaches who really work here. The five stand-ins in the roster carry
 * `isPlaceholder: true`, and a region is only taken when a real person covers
 * it: telling a coach from Rotterdam that the city is gone, because an invented
 * colleague sits there, is the one thing this page may not do.
 */
const echteCoaches = coaches.filter((coach) => !coach.isPlaceholder);

/** Every town and region a coach already covers, in one lower-case haystack. */
const bezetteGebieden = echteCoaches
  .map((coach) => `${coach.town} ${coach.region}`)
  .join(" ")
  .toLowerCase();

/** "Amsterdam, Utrecht en Amersfoort", from the roster. */
function opsomming(namen: string[]): string {
  if (namen.length <= 1) return namen.join("");
  return `${namen.slice(0, -1).join(", ")} en ${namen[namen.length - 1]}`;
}

const bezetteSteden = opsomming(echteCoaches.map((coach) => coach.town));

/* The client's own list of open regions, minus every name a coach already
   covers. A pair ("Arnhem / Nijmegen") only stands when both halves are free. */
const vrijeRegios = [
  "Groningen",
  "Arnhem / Nijmegen",
  "Den Haag / Leiden",
  "Breda / Tilburg",
  "Maastricht",
  "Leeuwarden",
  "Zwolle",
].filter((regio) =>
  regio
    .split(" / ")
    .every((deel) => !bezetteGebieden.includes(deel.toLowerCase())),
);

/** The four rows of the "In het kort" card in the hero. */
const inHetKort = [
  {
    title: "Eén coach per regio",
    line: "Jouw stad is exclusief van jou: geen interne concurrentie.",
  },
  {
    title: "Zichtbaar op de website",
    line: "Eigen profielpagina, vindbaar via de kaart en het regiofilter.",
  },
  {
    title: "Eenmalige licentie",
    line: `Eenmalig ${licentie} (indicatie), geen maandelijkse afdracht.`,
  },
  {
    title: "Eén vaste methode",
    line: "Alle coaches werken volgens het traject zoals op de website beschreven.",
  },
];

const krijgJe = [
  "Een eigen, exclusieve regio: jij bent daar de enige coach van StudiekeuzeAdvies",
  "Zichtbaarheid op de website: eigen profielpagina, plek op de kaart en in het regiofilter",
  "Aanvragen uit jouw regio komen rechtstreeks bij jou binnen",
  "Eén uitgewerkte methode: het complete traject, de twee testen en alle materialen",
  "Een hecht team van collega-coaches: het bedrijf is van de coaches zelf",
];

const vragenWe = [
  `Een eenmalige licentie van ${licentie}: een indicatie, de definitieve prijs stemmen we samen af`,
  "Je werkt volgens de methode zoals die op deze website staat beschreven",
  "Ervaring met jongeren, coaching of loopbaanbegeleiding",
  "Je bent zelfstandig ondernemer (of wilt dat worden)",
];

export default function CoachWordenPage() {
  return (
    <>
      <SiteHeader cta={{ href: "#aanmelden", label: "Meld je aan als coach" }} />

      <main id="top">
        {/* The hero is two columns, so it is built here instead of with
            PageHero: the card beside the text is part of the hero, and the
            primitive holds one column. The type classes are its own. */}
        <header className="pt-12 pb-12 lg:pt-18 lg:pb-16">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
              <div>
                <Eyebrow className="mb-4">Werken als studiekeuzecoach</Eyebrow>

                {/* "studiekeuzecoach" is 16 letters and it does not fit on a
                    320px line at the smallest step of text-h1, so the title
                    drops one step there (decision 2026-08-05). */}
                <h1 className="text-h1 max-w-[16ch] font-bold max-[380px]:text-h2-lg">
                  Word dé studiekeuzecoach van jouw regio.
                </h1>

                <p className="text-lead mt-5 max-w-[34rem] text-muted">
                  StudiekeuzeAdvies is van de coaches zelf. We groeien met zorg:
                  per stad of regio sluit precies één coach aan, die daar het
                  gezicht van StudiekeuzeAdvies wordt.
                </p>

                <div className="mt-8 flex flex-wrap gap-3.5">
                  <Button className="max-[420px]:w-full" href="#aanmelden" size="lg">
                    Meld je aan
                  </Button>
                  <Button
                    className="max-[420px]:w-full"
                    href="/studiekeuzetraject"
                    size="lg"
                    variant="outline"
                  >
                    Bekijk onze methode
                  </Button>
                </div>
              </div>

              <Card
                className="rounded-photo p-7 sm:p-9 lg:px-10"
                pad="none"
                variant="indigo"
              >
                <Eyebrow color="lavender-ink" size="sm">
                  In het kort
                </Eyebrow>

                <ol className="mt-5 flex flex-col gap-5.5">
                  {inHetKort.map((row, index) => (
                    <li className="flex gap-4" key={row.title}>
                      <span
                        aria-hidden="true"
                        className="text-title-sm font-display font-bold text-amber"
                      >
                        {index + 1}
                      </span>
                      <span>
                        <span className="block font-display font-bold">
                          {row.title}
                        </span>
                        <span className="text-small mt-1 block text-lavender-ink">
                          {row.line}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </Container>
        </header>

        <Section space="md" top="none">
          <Container>
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t-[1.5px] border-ink pt-7">
                <h2 className="text-h2 font-bold">Wat je krijgt, wat we vragen</h2>
                <p className="font-mono text-[0.8125rem] text-violet">
                  Helder vooraf, net als voor onze klanten
                </p>
              </div>

              <div className="mt-8 grid gap-[22px] lg:grid-cols-2">
                <Card className="p-7 sm:p-9 lg:px-10" pad="none">
                  <h3 className="text-title font-display font-bold text-violet">
                    Dit krijg je
                  </h3>
                  <ul className="text-card mt-5 flex flex-col gap-3.5 text-muted-read">
                    {krijgJe.map((row) => (
                      <Check key={row}>{row}</Check>
                    ))}
                  </ul>
                </Card>

                <Card className="flex flex-col p-7 sm:p-9 lg:px-10" pad="none">
                  <h3 className="text-title font-display font-bold text-coral-text">
                    Dit vragen we
                  </h3>
                  <ul className="text-card mt-5 flex flex-1 flex-col gap-3.5 text-muted-read">
                    {vragenWe.map((row) => (
                      <Check key={row} tone="coral">
                        {row}
                      </Check>
                    ))}
                  </ul>
                  <p className="text-small mt-6 border-t border-hairline pt-5 text-muted">
                    Geen maandelijkse fee, geen omzetafdracht: na de licentie is
                    wat je verdient van jou.
                  </p>
                </Card>
              </div>
            </Reveal>
          </Container>
        </Section>

        <Section id="aanmelden" space="close">
          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_27.5rem] lg:gap-14">
              <Reveal>
                <h2 className="text-h2 font-bold">Is jouw regio nog vrij?</h2>

                <p className="text-card mt-4 max-w-[32rem] text-muted">
                  {bezetteSteden} {echteCoaches.length === 1 ? "is" : "zijn"}{" "}
                  bezet. Alle andere steden en regio&apos;s staan open. Twijfel
                  je of jouw regio past? Vraag het gewoon in het formulier.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {vrijeRegios.map((regio) => (
                    <Pill key={regio} size="sm">
                      {regio}
                    </Pill>
                  ))}
                  <Pill size="sm" tone="amber">
                    …of stel jouw regio voor
                  </Pill>
                </div>

                <div className="mt-7 max-w-[32rem] rounded-box bg-lavender p-6 sm:px-7">
                  <p className="font-display font-bold">Hoe het verder gaat</p>
                  <p className="text-card mt-2 text-muted-read">
                    Na je aanmelding plannen we een kennismakingsgesprek met een
                    van de vijf eigenaren. Klikt het van beide kanten? Dan bespreken
                    we de licentie, je regio en de onboarding in de methode.
                  </p>
                </div>
              </Reveal>

              <CoachApplicationForm className="w-full max-w-[30rem] lg:max-w-none" />
            </div>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
