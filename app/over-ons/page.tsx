import type { Metadata } from "next";
import { citiesWithCoach } from "@/app/cities";
import { NlMap } from "@/app/components/nl-map";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  PageHero,
  Pill,
  Reveal,
  Section,
} from "@/app/components/ui";

/**
 * "Wie zijn wij", the client's page (design-spec 4.6), at the old address
 * /over-ons so the 301 inbound links keep landing on a page about us.
 *
 * WHO IS NAMED HERE: nobody. GESPREK.md calls this "het verhaal van de vijf
 * coach-eigenaren", but the client's own export names no one, and only Janneke
 * is a confirmed person in app/coaches.ts. The story is told in "we", which is
 * how the client wrote it, and the reader meets a named person one click away
 * on /studiekeuzecoaches. Nothing is invented to fill the gap.
 *
 * NO PHOTO. The client's hero and panel carry stock photographs. The one scene
 * image this repo owns is reserved for the home hero (decision 2026-08-13), so
 * the hero is one column and the panel holds our own map of the country: the
 * cities where a coach really works, which is the same claim in a picture.
 */
export const metadata: Metadata = {
  title:
    "Wie zijn wij | Een collectief van studiekeuzecoaches | StudieKeuzeAdvies",
  description:
    "StudiekeuzeAdvies is een collectief van freelance studiekeuzecoaches. Geen callcenter en geen tussenlagen: je kiest zelf je coach, in jouw regio, van intake tot keuze.",
  alternates: { canonical: "/over-ons" },
};

/** The three columns under the story. Eyebrow, title, one paragraph. */
const values = [
  {
    eyebrow: "Passie",
    title: "Passie voor het vak",
    body: "Studiekiezers begeleiden is geen bijbaan voor ons. Het is het vak waar we jaren ervaring in hebben en elke dag beter in willen worden.",
  },
  {
    eyebrow: "Missie",
    title: "Zoveel mogelijk juiste stappen",
    body: "Ons doel is simpel: zoveel mogelijk studiekiezers helpen om de stap te zetten die echt bij ze past. Elke goede keuze telt.",
  },
  {
    eyebrow: "Belofte",
    title: "De student staat centraal",
    body: "Geen targets of tussenlagen. Jij kiest je coach, jouw tempo bepaalt het traject en jouw keuze is het enige resultaat dat telt.",
  },
];

export default function OverOnsPage() {
  const steden = citiesWithCoach.length;

  return (
    <>
      <SiteHeader />

      <main id="top">
        <PageHero
          eyebrow="Wie zijn wij"
          lede="StudiekeuzeAdvies is een collectief van freelance studiekeuzecoaches. We werkten jarenlang voor een grote opdrachtgever, maar hebben nu de handen ineengeslagen om het op onze eigen manier te doen: met de student als middelpunt."
          title="Een collectief van coaches. Met de student centraal."
          titleClassName="max-w-[28ch]"
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="max-[420px]:w-full"
              href="/studiekeuzecoaches"
              size="lg"
            >
              Ontmoet de coaches
            </Button>
            <Button
              className="max-[420px]:w-full"
              href="/studiekeuzecoaches"
              size="lg"
              variant="outline"
            >
              Plan gratis intake bij een coach
            </Button>
          </div>
        </PageHero>

        {/* The client's verhaal opens 24px under the hero, not a full band
            below it, so the top half of `space` is switched off. */}
        <Section className="pt-4 lg:pt-6" space="md" top="none">
          <Container>
            <Reveal className="grid gap-8 lg:grid-cols-2 lg:gap-14">
              <h2 className="text-h2 max-w-[22ch] font-bold">
                Waarom we opnieuw zijn begonnen
              </h2>

              <div className="flex flex-col gap-4">
                <p className="text-muted">
                  Jarenlang begeleidden we studiekiezers in opdracht van een
                  grote organisatie. Daar leerden we het vak, maar we zagen ook
                  hoe processen en targets soms belangrijker werden dan de
                  studiekiezer zelf. Toen die samenwerking stopte, was de keuze
                  snel gemaakt: samen verder, op onze eigen voorwaarden.
                </p>
                <p className="text-muted">
                  Vanaf nu staat de student veel centraler. Geen callcenter of
                  tussenlagen: je kiest zelf je coach, in jouw regio, en die
                  coach blijft van intake tot keuze. Ons doel is simpel: zoveel
                  mogelijk studiekiezers helpen om de juiste stap te zetten.
                </p>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* And the waarden row sits flush against the verhaal above it. */}
        <Section space="md" top="none">
          <Container>
            <h2 className="sr-only">Waar we voor staan</h2>

            <Reveal className="grid divide-y divide-hairline border-t-[1.5px] border-ink lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {values.map((value) => (
                <div
                  className="pt-7 pb-7 last:pb-0 lg:pr-8 lg:pb-0 lg:first:pl-0 lg:[&:not(:first-child)]:pl-8"
                  key={value.eyebrow}
                >
                  <Eyebrow className="mb-3">{value.eyebrow}</Eyebrow>
                  <h3 className="text-title-sm font-display font-bold">
                    {value.title}
                  </h3>
                  <p className="text-card mt-3 text-muted">{value.body}</p>
                </div>
              ))}
            </Reveal>
          </Container>
        </Section>

        <Section space="close">
          <Container>
            <Reveal>
              <Card
                className="grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:p-14"
                pad="none"
                variant="indigo"
              >
                <div>
                  <h2 className="text-h3 font-bold">
                    Freelance, maar niet los van elkaar
                  </h2>
                  <p className="mt-4 max-w-[29rem] text-lavender-ink">
                    Elke coach werkt zelfstandig in de eigen regio, maar we
                    delen dezelfde methode, dezelfde testen en dezelfde
                    standaard. We leren van elkaar en vallen voor elkaar in als
                    dat nodig is. Zo krijg je de aandacht van een zelfstandige
                    coach, met de kwaliteit van een team.
                  </p>

                  {/* The client's third pill said "Coaches in heel Nederland".
                      It is not true yet, so it counts the roster instead. */}
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <Pill size="sm" tone="glass">
                      Eén methode
                    </Pill>
                    <Pill size="sm" tone="glass">
                      Zelfde testen
                    </Pill>
                    <Pill size="sm" tone="glass">
                      {steden === 1
                        ? "1 stad en online"
                        : `${steden} steden en online`}
                    </Pill>
                  </div>

                  <Button
                    className="mt-7 max-[420px]:w-full"
                    href="/studiekeuzecoaches"
                  >
                    Bekijk wie waar werkt
                  </Button>
                </div>

                {/* The map sits on its own light surface: its names are ink and
                    its halo is lavender, so it needs paper under it. */}
                <div className="rounded-inner bg-lavender p-5 sm:p-7">
                  <NlMap
                    cities={citiesWithCoach.map((city) => ({
                      name: city.name,
                      at: city.at,
                      href: `/locaties/${city.slug}`,
                    }))}
                    title="Kaart van Nederland met de steden waar onze coaches werken"
                  />
                </div>
              </Card>
            </Reveal>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
