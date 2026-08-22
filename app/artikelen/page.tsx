import type { Metadata } from "next";
import { articles } from "@/app/articles";
import { ArticleCard } from "@/app/components/article-card";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { Button, Container, PageHero, Section } from "@/app/components/ui";

/**
 * The hub the old site never had. Its 63 articles had no index page, no link in
 * the menu, and one inbound link each: they were orphans, and Google treats an
 * orphan as a page nobody stands behind. This page is the fix.
 *
 * The client's design (docs/redesign/client/artikelen): a short hero, then one
 * grid of cards under a heavy rule, then one soft invitation. No year headings:
 * each card prints its own full date, so the reader still sees that an article
 * is from 2015 and another from 2025.
 */
export const metadata: Metadata = {
  title: "Artikelen over studiekeuze | StudieKeuzeAdvies",
  description:
    "Antwoorden op de vragen die je stelt als je moet kiezen: deadlines, inschrijven, stoppen en opnieuw beginnen. Geschreven door StudieKeuzeCoaches.",
  alternates: { canonical: "/artikelen" },
};

export default function ArtikelenPage() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <PageHero
          eyebrow="Artikelen"
          lede="Praktische artikelen over aanmelden, regelingen en het keuzeproces."
          title="Slimmer kiezen begint met goed geïnformeerd zijn"
        />

        {/* The client's own rhythm: the rule follows the hero at 8px, and the
            page closes at 88px. `space="none"` because a Section's own lg:
            padding would win over a pt-0 written after it. */}
        <Section className="pt-2 pb-14 lg:pb-22" space="none">
          <Container>
            {articles.length === 0 ? (
              <p className="text-lead max-w-[54ch] border-t-[1.5px] border-ink pt-8 text-muted">
                Hier komen de artikelen te staan. Nu is er nog niets te lezen.
              </p>
            ) : (
              <ul className="grid gap-[22px] border-t-[1.5px] border-ink pt-8 md:grid-cols-2">
                {articles.map((article) => (
                  <li className="flex" key={article.slug}>
                    <ArticleCard article={article} headingLevel="h2" />
                  </li>
                ))}
              </ul>
            )}

            {/* The one invitation on this page. It comes after the answers,
                never before them (PRODUCT.md, principle 2). */}
            <div className="mt-11 flex flex-wrap items-center justify-between gap-x-6 gap-y-7 rounded-card-sm bg-lavender p-7 sm:px-10 sm:py-9">
              <div>
                <p className="text-title font-display font-bold">
                  Liever gewoon een gesprek?
                </p>
                <p className="text-card mt-1.5 text-muted">
                  Het intakegesprek is gratis en verplicht je tot niets.
                </p>
              </div>

              {/* ROW R1. It read "Kies je regio" and opened /locaties. The
                  client wants the roster: "Die link moet naar de pagina met
                  coaches en mag daarom heten 'Vind je coach'." */}
              <Button className="max-[420px]:w-full" href="/studiekeuzecoaches">
                Vind je coach
              </Button>
            </div>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
