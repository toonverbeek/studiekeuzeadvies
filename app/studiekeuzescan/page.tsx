import type { Metadata } from "next";
import { getCentralTopic } from "@/app/central";
import { CentralForm } from "@/app/components/central-form";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { Container, Eyebrow, PageHero, Section } from "@/app/components/ui";
import { scanPrice, scanSteps } from "@/app/traject";

/**
 * Where "Boek hier je StudieKeuzeScan" lands (rows T7 and TA2).
 *
 * THE SCAN NOW HAS A BOOKING, AND IT DID NOT BEFORE. Both buttons used to send
 * a reader to the roster to pick a coach, because there was no central address
 * to book at. The client's mail names one and asks for the button to reach it:
 * "Boek hier je StudieKeuzeScan (en deze link moet gaan naar een
 * aanmeldformulier info@)". A scan is one online session and the coach is
 * assigned afterwards, so a central booking is the right shape for it. An
 * intake for the full traject still goes to one named coach.
 *
 * The three steps are the same three the traject page prints, read from
 * app/traject.ts, so the page a reader books on cannot promise something
 * different from the page that convinced them.
 */

export const metadata: Metadata = {
  title: "Boek de StudieKeuzeScan | StudieKeuzeAdvies",
  description: `De StudieKeuzeScan: de persoonlijkheidstest en de interessetest thuis, daarna één online sessie met een coach en een rapportage. ${scanPrice} eenmalig.`,
  alternates: { canonical: "/studiekeuzescan" },
};

export default function StudieKeuzeScanPage() {
  const topic = getCentralTopic("scan");
  if (!topic) throw new Error("Het onderwerp 'scan' ontbreekt in app/central.ts.");

  return (
    <>
      <SiteHeader />

      <main id="top">
        <PageHero
          eyebrow="StudieKeuzeScan"
          lede={`Twee testen thuis, één online sessie met een coach en een rapportage. ${scanPrice} eenmalig, en je zit daarna nergens aan vast.`}
          title="Boek hier je StudieKeuzeScan."
        />

        <Section space="md">
          <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
            <div>
              <Eyebrow as="h2" size="sm">
                Zo werkt de scan
              </Eyebrow>

              <ol className="mt-4 flex flex-col gap-4.5">
                {scanSteps.map((step) => (
                  <li className="flex gap-4" key={step.number}>
                    {/* The list numbers itself for a screen reader; this is
                        the same number drawn large. */}
                    <span
                      aria-hidden="true"
                      className={`text-title font-display font-bold ${
                        step.number === "3" ? "text-coral" : "text-violet"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-card font-display leading-snug font-semibold">
                        {step.title}
                      </h3>
                      <p className="text-card mt-1 max-w-[46ch] text-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="text-card mt-7 max-w-[52ch] border-t border-hairline pt-5 text-muted">
                Weet je nog niet of de scan of het volledige StudieKeuzeTraject
                bij je past? Zet het in het bericht hiernaast, dan bespreken we
                het eerst even telefonisch.
              </p>
            </div>

            <CentralForm topic={topic} />
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
