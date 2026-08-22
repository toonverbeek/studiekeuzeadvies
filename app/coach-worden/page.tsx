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
 * "Sluit je aan als coach", the client's page (design-spec 4.9). The third
 * reader of PRODUCT.md: without coaches there is no product, so this page has
 * to make a good coach want to write to us.
 *
 * ROW W1 RENAMED IT. It was "Word coach"; the client's mail says "De kop 'word
 * coach' moet worden: sluit je aan als coach". The address /coach-worden does
 * not move with the name: four old vacancy URLs redirect into it and it is in
 * the sitemap, and a rename that breaks those buys nothing.
 *
 * THE LICENCE IS DECIDED NOW, row W5: €750 a year. It used to be an indication
 * of a one-off amount and said so in the same breath. app/pricing.ts holds the
 * figure and the term, so this page never types either.
 *
 * WHICH REGIONS ARE TAKEN IS READ FROM THE ROSTER, never typed. The client's
 * export names six cities by hand; the roster in app/coaches.ts now holds five
 * real coaches, so the sentence and the pills below are generated from it and
 * grow by themselves the day a sixth signs.
 */
export const metadata: Metadata = {
  title: "Sluit je aan als StudieKeuzeCoach in jouw regio | StudieKeuzeAdvies",
  description:
    "StudieKeuzeAdvies is van de coaches zelf. Per stad of regio sluit precies één coach aan: eigen profielpagina, aanvragen rechtstreeks bij jou, een jaarlijkse licentie en geen omzetafdracht.",
  alternates: { canonical: "/coach-worden" },
};

/** The yearly licence. See app/pricing.ts, row W5. */
const licentie = coachLicence.label;

/**
 * The coaches who really work here. A region is only taken when a real person
 * covers it: telling a coach from Rotterdam that the city is gone, because a
 * stand-in sits there, is the one thing this page may not do. Every coach in
 * the roster is a real person today, so the filter passes all five; it stays
 * because the guard is what makes that safe to change.
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
    title: "Jaarlijkse licentie",
    line: `${licentie} ${coachLicence.term}, en geen afdracht over je omzet.`,
  },
  {
    title: "Eén vaste methode",
    line: "Alle coaches werken volgens het traject zoals op de website beschreven.",
  },
];

/* ROW W3 added the last line: "In het kader 'wat krijg je' toevoegen: Een
   jaarlijkse intervisie bijeenkomst." */
const krijgJe = [
  "Een eigen, exclusieve regio: jij bent daar de enige coach van StudieKeuzeAdvies",
  "Zichtbaarheid op de website: eigen profielpagina, plek op de kaart en in het regiofilter",
  "Aanvragen uit jouw regio komen rechtstreeks bij jou binnen",
  "Eén uitgewerkte methode: het complete traject, de twee testen en alle materialen",
  "Een hecht team van collega-coaches: het bedrijf is van de coaches zelf",
  "Een jaarlijkse intervisie bijeenkomst",
];

/* ROWS W4 and W5. The methode line gained "en hanteert dezelfde tarieven", and
   the licence is a year's licence at a decided price. */
const vragenWe = [
  `Een jaarlijkse licentie van ${licentie}`,
  "Je werkt volgens de methode zoals die op deze website staat beschreven en hanteert dezelfde tarieven",
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
                <Eyebrow className="mb-4">Werken als StudieKeuzeCoach</Eyebrow>

                {/* ROW W1, the client's own words. "StudieKeuzeCoach" is 16
                    letters and does not fit on a 320px line at the smallest
                    step of text-h1, so the title drops one step there
                    (decision 2026-08-05). */}
                <h1 className="text-h1 max-w-[16ch] font-bold max-[380px]:text-h2-lg">
                  Sluit je aan als StudieKeuzeCoach.
                </h1>

                <p className="text-lead mt-5 max-w-[34rem] text-muted">
                  StudieKeuzeAdvies is van de coaches zelf. We groeien met zorg:
                  per stad of regio sluit precies één coach aan, die daar het
                  gezicht van StudieKeuzeAdvies wordt.
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

                {/* ROW W6, the client's own text. It is more precise than
                    ours was, and the precision is the point: five people read
                    it, two of them do the interview. */}
                <div className="mt-7 max-w-[32rem] rounded-box bg-lavender p-6 sm:px-7">
                  <p className="font-display font-bold">Hoe het verder gaat</p>
                  <p className="text-card mt-2 text-muted-read">
                    Na je aanmelding bekijken we je profiel met z&rsquo;n vijven.
                    Zien we een mogelijke match? Dan nodigen twee van ons je uit
                    voor een kennismakingsgesprek. Tijdens dit gesprek maken we
                    kennis en bespreken we de samenwerking en verdere
                    mogelijkheden.
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
