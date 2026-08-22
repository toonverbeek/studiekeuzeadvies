import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCentralTopic } from "@/app/central";
import { CentralForm } from "@/app/components/central-form";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { Container, PageHero, Section } from "@/app/components/ui";
import { showSamenwerken } from "@/app/site-config";

/**
 * The page for schools and decanen, asked for in row H16.
 *
 * IT IS BUILT AND IT IS SWITCHED OFF, because the client asked for both in one
 * breath: "Is het mogelijk om deze linkjes (decanen en scholen) en dus de
 * pagina Samenwerken bij de lancering nog even 'uit' te zetten? We willen
 * eerst opstarten, alvorens dit gelijk aan te bieden, maar we willen dit in de
 * nabije toekomst wel graag doen."
 *
 * `showSamenwerken` in app/site-config.ts is that switch, and it is the only
 * thing that has to change. While it is false this route answers 404, the two
 * footer links are not printed, and app/sitemap.ts leaves the path out. Turn it
 * true and the page, the links and the sitemap line appear together.
 *
 * The `notFound()` below is what makes the switch real. A page that is only
 * unlinked is still a page: it is in the sitemap of anyone who guesses the
 * address, and Google finds unlinked pages every day.
 */

export const metadata: Metadata = {
  title: "Samenwerken met scholen en decanen | StudieKeuzeAdvies",
  description:
    "We bieden de StudieKeuzeScan ook op scholen aan. Benieuwd wat we voor jouw school of leerlingen kunnen betekenen? We denken graag mee over een passende samenwerking.",
  alternates: { canonical: "/samenwerken" },
  // While the page is off it is never reachable, so this is belt and braces:
  // if the flag is flipped for a preview, the preview still stays out of the
  // index until somebody decides otherwise.
  robots: showSamenwerken ? undefined : { index: false, follow: false },
};

const paragraphs = [
  "Een goede studiekeuze begint bij inzicht in jezelf. Daarom werken we graag samen met scholen en decanen om leerlingen te ondersteunen bij hun studiekeuze.",
  "We bieden de StudieKeuzeScan ook op scholen aan. Leerlingen maken de persoonlijkheids- en interessetest thuis, waarna ze op school samen met een van onze StudieKeuzeCoaches de resultaten bespreken. Zo krijgen ze in korte tijd meer inzicht in wat bij hen past en welke vervolgstappen ze kunnen zetten.",
  "Benieuwd wat we voor jouw school of leerlingen kunnen betekenen? We denken graag mee over een passende samenwerking.",
  "Neem gerust contact met ons op.",
];

export default function SamenwerkenPage() {
  if (!showSamenwerken) notFound();

  const topic = getCentralTopic("samenwerken");
  if (!topic) {
    throw new Error("Het onderwerp 'samenwerken' ontbreekt in app/central.ts.");
  }

  return (
    <>
      <SiteHeader />

      <main id="top">
        <PageHero
          eyebrow="Voor scholen en decanen"
          lede="De StudieKeuzeScan op school: de tests thuis, het gesprek in de klas."
          title="Samenwerken met StudieKeuzeAdvies."
        />

        <Section space="md">
          <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
            <div className="flex flex-col gap-5">
              {paragraphs.map((text) => (
                <p className="text-lead max-w-[52ch] text-muted-read" key={text}>
                  {text}
                </p>
              ))}
            </div>

            <CentralForm topic={topic} />
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
