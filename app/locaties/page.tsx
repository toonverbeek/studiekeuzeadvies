import type { Metadata } from "next";
import { cities, citiesWithCoach } from "@/app/cities";
import { NlMap } from "@/app/components/nl-map";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Container,
  CtaBand,
  Eyebrow,
  Pill,
  Reveal,
  Section,
} from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Locaties | StudieKeuzeAdvies",
  description:
    "De steden waar een StudieKeuzeCoach werkt. Staat jouw stad er niet bij? Kijk wie er in de buurt werkt, en vraag het gesprek bij die coach aan.",
  alternates: { canonical: "/locaties" },
};

export default function LocationsPage() {
  const withoutCoach = cities.filter((city) => city.coach === null);

  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* This is the page the map belongs to: the question is "where", and
            the answer is a picture with the city names in it. Every pin is a
            link to the page of that city. */}
        <header className="pt-10 pb-12 lg:pt-14 lg:pb-16">
          <Container className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <Eyebrow className="mb-4">Een coach bij jou in de buurt</Eyebrow>

              <h1 className="text-h1 font-bold">Locaties</h1>

              <p className="text-lead mt-5 max-w-[32rem] text-muted">
                We noemen alleen steden waar echt een coach werkt. Dat zijn er
                minder dan vroeger, en dat is met opzet. Een naam op een lijst
                helpt je niet, een mens wel.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#steden" size="lg">
                  Bekijk de steden
                </Button>
                <Button href="/studiekeuzecoaches" size="lg" variant="outline">
                  Of kies eerst een coach
                </Button>
              </div>
            </div>

            <div className="rounded-photo bg-lavender p-3.5 shadow-map sm:p-[18px]">
              <NlMap
                cities={citiesWithCoach.map((city) => ({
                  name: city.name,
                  at: city.at,
                  href: `/locaties/${city.slug}`,
                }))}
                title="Kaart van Nederland met de steden waar een coach werkt"
              />
            </div>
          </Container>
        </header>

        {/* One card per city, in the shape of the coach card: the city is the
            heading, the coach is the proof, and the two links go to the two
            questions a reader has here, "where" and "who". */}
        <Section id="steden" space="md">
          <Container>
            <Reveal>
              <h2 className="text-h2 border-t-[1.5px] border-ink pt-6 font-bold lg:pt-7">
                Hier werkt een coach
              </h2>

              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-9 lg:grid-cols-3">
                {citiesWithCoach.map((city) => (
                  <li className="flex" key={city.slug}>
                    <article className="flex w-full flex-col gap-3 rounded-card-sm border border-hairline bg-white p-6">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-title font-bold">{city.name}</h3>
                        <Pill className="shrink-0" size="sm" tone="lavender">
                          {city.coach.name}
                        </Pill>
                      </div>

                      {/* "voor", not "ook voor": a work region already holds
                          the city itself, so "ook" made every line repeat its
                          own heading. */}
                      <p className="text-card text-muted">
                        {city.coach.name}, StudieKeuzeCoach voor {city.region}.
                      </p>

                      <p className="text-small text-muted">
                        {city.coach.experience}
                      </p>

                      {/* One pill and one text link, not two pills: the city
                          is what this card is for, and the coach is the second
                          question, not an equal one. */}
                      <div className="mt-auto flex flex-col items-start gap-1 pt-4">
                        <Button
                          className="w-full"
                          href={`/locaties/${city.slug}`}
                        >
                          Bekijk {city.name}
                        </Button>
                        <Button
                          href={`/studiekeuzecoaches/${city.coach.slug}`}
                          variant="ghost"
                        >
                          Maak kennis met {city.coach.name} →
                        </Button>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>

        {withoutCoach.length > 0 && (
          <Section space="sm">
            <Container>
              <Reveal className="rounded-panel bg-lavender p-6 sm:p-10 lg:p-13">
                <h2 className="text-h4 font-bold">Hier zoeken we nog</h2>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {withoutCoach.map((city) => (
                    <li key={city.slug}>
                      <Button href={`/locaties/${city.slug}`} variant="outline">
                        {city.name}
                      </Button>
                    </li>
                  ))}
                </ul>

                {/* One city is the normal case today, so the sentence counts.
                    "In deze steden" under a single pill reads as a list that
                    lost its other names. */}
                <p className="mt-5 max-w-[52ch] text-muted">
                  {withoutCoach.length === 1
                    ? "In deze stad werkt op dit moment geen coach."
                    : "In deze steden werkt op dit moment geen coach."}{" "}
                  Online begeleiding kan wel, en we zoeken hier actief iemand.
                </p>
              </Reveal>
            </Container>
          </Section>
        )}

        {/* This block used to end at a central telephone number (issue #7).
            A request ends at a person, so it ends at the coaches: you read who
            works closest to you and you ask that person yourself. */}
        <CtaBand
          accent="Kijk wie er het dichtst bij werkt."
          primary={{ href: "/studiekeuzecoaches", label: "Bekijk de coaches" }}
          secondary={{
            href: "/studiekeuzetraject",
            label: "Lees hoe het traject werkt",
          }}
          text="Vaak zit er een coach in een buurstad, en anders doen we het online. Je vraagt het gesprek aan bij die coach zelf, dus je weet meteen wie je straks spreekt."
          title="Staat jouw stad er niet bij?"
        />
      </main>

      <SiteFooter />
    </>
  );
}
