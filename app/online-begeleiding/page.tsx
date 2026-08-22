import type { Metadata } from "next";
import Link from "next/link";
import { getCentralTopic } from "@/app/central";
import { citiesWithCoachByName } from "@/app/cities";
import { CentralForm } from "@/app/components/central-form";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { Container, PageHero, Section } from "@/app/components/ui";

/**
 * Where the "Online" chip goes (row C4): "De optie/link 'online' moet gaan naar
 * pagina met aanmeldformulier die naar @info gaat."
 *
 * WHY IT IS A PAGE AND NOT A COACH. Every other way into this site ends at one
 * named person, because a reader who picks a city has already chosen. A reader
 * who picks "Online" has said the opposite: their town is not on the list. So
 * this request goes to the central mailbox, where the five coaches decide
 * together who has room, and the reader does not have to guess at a name they
 * have no reason to know.
 */

export const metadata: Metadata = {
  title: "Online begeleiding, waar je ook woont | StudieKeuzeAdvies",
  description:
    "Woon je niet in de buurt van een van onze steden? Het hele StudieKeuzeTraject kan ook via video, met dezelfde vaste coach en dezelfde vier gesprekken.",
  alternates: { canonical: "/online-begeleiding" },
};

const points = [
  "Vier 1-op-1 gesprekken via video, met dezelfde vaste coach van het eerste gesprek tot je keuze rond is.",
  "Dezelfde persoonlijkheidstest en studie-interessetest, thuis en in je eigen tempo, afgerond in een rapportage.",
  "Dezelfde prijs. Online kost niet meer en niet minder dan een gesprek op locatie.",
  "Het intakegesprek is ook online, en ook gratis. Je beslist daarna pas.",
];

export default function OnlineBegeleidingPage() {
  const topic = getCentralTopic("online");
  if (!topic) throw new Error("Het onderwerp 'online' ontbreekt in app/central.ts.");

  return (
    <>
      <SiteHeader />

      <main id="top">
        <PageHero
          eyebrow="Online begeleiding"
          lede="Het hele traject via video: dezelfde vier gesprekken, dezelfde tests en dezelfde vaste coach. Waar je ook woont."
          title="Begeleiding op afstand, net zo persoonlijk."
        />

        <Section space="md">
          <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
            <div>
              <ul className="flex flex-col gap-4">
                {points.map((point) => (
                  <li className="flex gap-3.5" key={point}>
                    <span
                      aria-hidden="true"
                      className="mt-1 font-bold text-violet"
                    >
                      ✓
                    </span>
                    <p className="max-w-[52ch] text-muted-read">{point}</p>
                  </li>
                ))}
              </ul>

              {/* A reader who lands here by accident should be able to leave
                  by the right door: if their town IS on the list, a named
                  coach is the better road. */}
              <p className="text-card mt-8 max-w-[52ch] border-t border-hairline pt-5 text-muted">
                Woon je wél in de buurt van {citiesWithCoachByName[0]?.name} of
                een van onze andere {citiesWithCoachByName.length} steden? Dan
                kun je ook gewoon afspreken.{" "}
                <Link
                  className="font-semibold text-violet underline underline-offset-4 hover:no-underline"
                  href="/studiekeuzecoaches"
                >
                  Bekijk wie waar werkt
                </Link>
                .
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
