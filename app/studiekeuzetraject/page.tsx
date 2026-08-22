import type { Metadata } from "next";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Card,
  Container,
  CtaBand,
  Eyebrow,
  PageIndex,
  Pill,
  Reveal,
  Section,
} from "@/app/components/ui";
import { reasons, tests } from "@/app/traject";
import { GesprekkenPanel } from "./gesprekken-panel";
import { ScanPanel } from "./scan-panel";

// The old title, word for word. This URL carries 182 inbound links and it is
// the second best ranked page of the old site. The title is what ranks.
export const metadata: Metadata = {
  title: "Begeleiding bij studiekeuze | Kiezen met zekerheid | StudieKeuzeAdvies",
  description:
    "Vier gesprekken met één vaste coach, een persoonlijkheidstest en een studie-interessetest, en een keuze waar je achter staat. Het intakegesprek is gratis.",
  alternates: { canonical: "/studiekeuzetraject" },
};

/**
 * The index in the right column of the hero.
 *
 * The client drew a stock photo there. We do not use stock photos, and the one
 * generated scene this repo owns is reserved for the home hero (decision
 * 2026-08-13). So the slot carries the thing this page can honestly put in it:
 * an overview of what is on it. Overview before detail is a requirement for a
 * named user group, and it is how the parent finds the answer without reading
 * the whole page.
 *
 * One list, two shapes: lavender pills under the lead on a telephone, a paper
 * card with hairline rows from `lg` (design-spec 6.2, "Hero A").
 */
const jumps = [
  { href: "#gesprekken", label: "De vier gesprekken" },
  { href: "#testen", label: "De twee testen" },
  { href: "#studiekeuzescan", label: "Liever een korte scan?" },
  { href: "#waarom", label: "Waarom StudiekeuzeAdvies" },
];

export default function TrajectPage() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <header className="pt-12 pb-10 lg:pt-18 lg:pb-14">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
              <div>
                <Eyebrow className="mb-4">Het traject</Eyebrow>

                <h1 className="text-h1 font-bold">
                  Vier gesprekken. Eén vaste coach. Jouw keuze.
                </h1>

                <p className="text-lead mt-5 max-w-[33rem] text-muted">
                  Met het persoonlijke en doelgerichte studiekeuzetraject werk
                  je gestructureerd toe naar een passende vervolgstudie. Je
                  krijgt een vaste coach met wie je vier bijeenkomsten hebt,
                  op een locatie bij jou in de buurt of online.
                </p>
                <p className="text-lead mt-3.5 max-w-[33rem] text-muted">
                  Je gaat aan de slag met gesprekken, tests en opdrachten voor
                  thuis. Elk gesprek bouwt op het vorige, tot er een keuze ligt
                  waar je écht achter staat.
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
                    href="#gesprekken"
                    size="lg"
                    variant="outline"
                  >
                    Eerst lezen wat je doet
                  </Button>
                </div>
              </div>

              <PageIndex items={jumps} />
            </div>
          </Container>
        </header>

        <GesprekkenPanel />

        {/* The tests came back with the client's feedback of 2026-08-12. The
            supplier and the "30+ jaar" are the client's claim about a third
            party, printed as the client wrote them; app/traject.ts says so. */}
        <Section className="pb-12 lg:pb-18" id="testen" space="none">
          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <Eyebrow className="mb-3.5">De testen</Eyebrow>
                <h2 className="text-h2 font-bold">Thuis testen, samen duiden</h2>
                <p className="mt-4 text-muted">
                  Tijdens onze studiekeuzetrajecten maak je thuis, in je eigen
                  tempo, een persoonlijkheids- en interessetest. Handig, want zo
                  krijg je direct inzicht in wat bij je past. Maar hoe zet je
                  die inzichten om in een studiekeuze waar je écht zeker van
                  bent?
                </p>
                <p className="mt-3.5 text-muted">
                  Daarom ga je na de test in gesprek met een studiekeuzecoach.
                  Geen standaardvragen, maar een gesprek waarin jij centraal
                  staat. Je coach daagt je uit om dieper na te denken, moedigt
                  je aan om over je eigen grenzen heen te kijken en zorgt dat je
                  een keuze maakt die écht bij jou past.
                </p>
              </Reveal>

              <Reveal>
                <Card
                  className="p-6 sm:p-10"
                  pad="none"
                  variant="indigo"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex size-11 shrink-0 items-center justify-center rounded-field bg-violet font-display font-bold text-white"
                    >
                      {tests.monogram}
                    </span>
                    <div>
                      <h3 className="font-display font-bold">
                        Ontwikkeld door {tests.supplier}
                      </h3>
                      <p className="text-small text-lavender-ink">
                        {tests.claim}
                      </p>
                    </div>
                  </div>

                  {tests.body.map((paragraph) => (
                    <p
                      className="text-body mt-5 text-lavender-ink lg:text-card"
                      key={paragraph.slice(0, 24)}
                    >
                      {paragraph}
                    </p>
                  ))}

                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {tests.pills.map((pill) => (
                      <li key={pill}>
                        <Pill size="sm" tone="glass">
                          {pill}
                        </Pill>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>
          </Container>
        </Section>

        <ScanPanel />

        {/* Three reasons, under one ink rule. The old page had a fourth, "92%
            door naar het 2e jaar". We cannot prove it, so it is not here. */}
        <Section className="pb-12 lg:pb-18" id="waarom" space="none">
          <Container>
            <h2 className="text-h2 font-bold">Waarom StudiekeuzeAdvies</h2>

            <ul className="mt-8 grid border-t-[1.5px] border-ink lg:mt-9 lg:grid-cols-3">
              {reasons.map((reason) => (
                <Reveal
                  as="li"
                  className="border-b border-hairline py-7 lg:border-r lg:border-b-0 lg:pr-6 lg:pb-2 lg:pl-6 lg:last:border-r-0 lg:first:pl-0"
                  key={reason.title}
                >
                  <p className="eyebrow text-eyebrow text-violet">
                    {reason.eyebrow}
                  </p>
                  <h3 className="text-title-sm mt-2.5 font-bold">
                    {reason.title}
                  </h3>
                  <p className="text-body mt-2.5 text-muted lg:text-card">{reason.body}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>

        {/* No form on this page: there is no central sign-up point, so the
            invitation is the road to a named coach (decision 2026-08-15). */}
        <Reveal>
          <CtaBand
            accent="Het kost je niets."
            id="intake"
            primary={{ href: "/locaties", label: "Kies je stad" }}
            secondary={{
              href: "/studiekeuzecoaches",
              label: "Bekijk eerst alle coaches",
            }}
            text="In het intakegesprek vertel je wat er speelt, en horen we of dit traject bij je past. Daarna zeg je gewoon nee als het niet klopt."
            title="Begin met een gesprek."
          />
        </Reveal>
      </main>

      <SiteFooter />
    </>
  );
}
