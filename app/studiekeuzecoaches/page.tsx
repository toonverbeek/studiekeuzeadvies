import type { Metadata } from "next";
import Image from "next/image";
import { citiesWithCoach } from "@/app/cities";
import { type Coach, coaches } from "@/app/coaches";
import { NlMap } from "@/app/components/nl-map";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Pill,
  Reveal,
  Section,
} from "@/app/components/ui";
import { CoachFilter, type FilterItem } from "./coach-filter";

export const metadata: Metadata = {
  // The old title, word for word. It is what ranks today.
  title: "Leer onze professionele studiekeuzecoaches kennen | StudieKeuzeAdvies",
  description:
    "Maak kennis met de studiekeuzecoaches: wie ze zijn, waar ze werken en hoe ze met je meelopen. Eén vaste coach, en het eerste gesprek is gratis.",
  alternates: { canonical: "/studiekeuzecoaches" },
};

/**
 * The three facts under the h1, where the client's export prints a rating.
 *
 * WHAT IS NOT HERE. The client wrote "8,8 gemiddelde beoordeling" and "6
 * regio's". The 8,8 was earned by coaches who are mostly not ours, so it may
 * not be printed (PRODUCT.md principle 5, issue #24). The count is not typed
 * either.
 *
 * WHY IT COUNTS CITIES AND NOT TOWNS. The number stands beside the map, and
 * the map pins `citiesWithCoach`. Counting every coach's town instead gave six
 * next to three pins, so one screen said two different things. Both now read
 * the same list, and the strip on the home page reads it too.
 */
/**
 * The towns in roster order, without repeats. The real coach stands first
 * (decision 2026-08-06), so the first chip after "Alle regio's" is hers. This
 * feeds the filter over the grid and nothing else.
 */
const regions = [...new Set(coaches.map((coach) => coach.town))];

const stats = [
  {
    value: String(citiesWithCoach.length),
    label: citiesWithCoach.length === 1 ? "stad + online" : "steden + online",
    tone: "text-violet",
  },
  { value: "Gratis", label: "het eerste gesprek", tone: "text-coral-text" },
  { value: "1-op-1", label: "alle gesprekken", tone: "text-amber-ink" },
];

/**
 * This block stands where the old page put "gemiddeld beoordeeld met een 8,8".
 *
 * WHAT WENT OUT (issue #19). It opened with two cards about the people: "Elke
 * coach heeft jaren buiten het onderwijs gewerkt" and "Ze werken al jaren met
 * jouw leeftijd". Neither is a fact about this roster. The first one is even
 * contradicted by it: Hanneke stood ten years in a school and Wietske taught
 * eighteen. They were promises about hiring, and a promise about hiring may
 * not be printed as a fact (PRODUCT.md principle 5).
 *
 * WHAT STAYS. The two that describe the traject, which is ours to promise.
 */
const shared = [
  {
    title: "Je houdt dezelfde coach",
    body: "Van het eerste gesprek tot je keuze rond is. Geen wisselend team, geen wachtrij, en je hoeft je verhaal maar één keer te vertellen.",
  },
  {
    title: "De keuze blijft van jou",
    body: "Een coach stelt vragen en zoekt mee. Wat je uiteindelijk kiest, kies je zelf. Niemand hier vult dat voor je in.",
  },
];

/**
 * One card of the roster (design-spec 3.16). It is rendered on the server and
 * handed to the filter as a finished block, so nothing about a coach travels to
 * the browser as data.
 *
 * The client's card carries a quote from the coach. Ours does not: five of
 * these six people do not exist yet, and the one who does has not written one.
 * A pill row of specialisms does the same work and says nothing untrue.
 */
function CoachCard({ coach }: { coach: Coach }) {
  return (
    <article
      className="flex w-full flex-col overflow-hidden rounded-card-sm border border-hairline bg-white"
      id={coach.slug}
    >
      {coach.portrait ? (
        <Image
          alt={coach.portraitAlt}
          // 4:5, not the client's 4:3. Five squares in a column read as profile
          // pictures, which is the team grid this brand stays away from
          // (decision 2026-08-05).
          className="aspect-[4/5] w-full object-cover"
          placeholder="blur"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          src={coach.portrait}
        />
      ) : (
        // A coach can start before they send a photo. The card then opens at
        // the name instead of at a grey box.
        null
      )}

      <div className="flex flex-1 flex-col gap-2 p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-title-sm font-bold">{coach.name}</h3>
          <Pill className="shrink-0" size="sm" tone="lavender">
            {coach.town}
          </Pill>
        </div>

        <p className="text-small font-semibold text-coral-text">
          {coach.levels}
        </p>

        <p className="text-card text-muted">{coach.oneLiner}</p>

        <p className="text-small text-muted">Werkgebied: {coach.region}</p>

        <ul className="mt-1 flex flex-wrap gap-2">
          {coach.specialties.map((item) => (
            <li
              className="inline-flex items-center rounded-full border border-chip-border px-3 py-1 text-micro font-semibold text-muted"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* The name stands on the button and not in an `sr-only` span: the
            page promises "de persoon die je straks spreekt", and the client's
            card prints it. The second button is the client's outline chip. It
            is written out here and not as a `variant`, because app/components
            belongs to the Foundation phase; the need is reported. */}
        <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
          <Button className="grow" href={`/studiekeuzecoaches/${coach.slug}`}>
            Maak kennis met {coach.name}
          </Button>
          <Button
            className="shrink-0 border-[1.5px] border-chip-border px-6 py-3 text-button whitespace-nowrap hover:border-violet"
            href={`/studiekeuzecoaches/${coach.slug}#intake`}
            variant="ghost"
          >
            Intake
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function CoachesPage() {
  const items: FilterItem[] = coaches.map((coach) => ({
    key: coach.slug,
    region: coach.town,
    card: <CoachCard coach={coach} />,
  }));

  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* Hero: the sentence on the left, the country on the right. */}
        <header className="pt-10 pb-12 lg:pt-14 lg:pb-16" id="kaart">
          <Container className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <Eyebrow className="mb-4">Onze studiekeuzecoaches</Eyebrow>

              <h1 className="text-h1 font-bold">
                De persoon die je straks spreekt, kies je zelf.
              </h1>

              <p className="text-lead mt-5 max-w-[30rem] text-muted">
                Geen centraal callcenter: je kiest een stad, ziet wie daar werkt
                en vraagt bij díe coach een gratis intakegesprek aan. Alle
                gesprekken zijn 1-op-1.
              </p>

              <ul className="mt-8 grid max-w-[30rem] grid-cols-3 gap-x-5 gap-y-5">
                {stats.map((stat) => (
                  <li key={stat.label}>
                    <p
                      className={`font-display text-h4 font-bold ${stat.tone}`}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-2 text-small text-muted">{stat.label}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* The map pins the cities that have a page of their own. A pin is
                a link to that page, so the picture is also the index. */}
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

        {/* Filter and grid. */}
        <Section id="coaches" space="lg">
          <Container>
            <Reveal>
              <CoachFilter items={items} regions={regions} />
            </Reveal>
          </Container>
        </Section>

        {/* What every coach has in common. It is the honest answer to the
            question the client's "8,8" was there to answer. */}
        <Section space="md">
          <Container>
            <Reveal className="rounded-panel bg-lavender p-6 sm:p-10 lg:p-13">
              <h2 className="text-h2 max-w-[18ch] font-bold">
                Wat je van elke coach mag verwachten
              </h2>

              <ul className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
                {shared.map((item) => (
                  <li className="flex flex-col gap-2" key={item.title}>
                    <h3 className="text-title-sm font-bold">{item.title}</h3>
                    <p className="text-card max-w-[42ch] text-muted">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>

        {/* The ink CTA of the client's page (design-spec 3.14, ink variant).
            Its buttons stay on this site: the grid above is the region
            chooser, and /locaties is the same roster sorted by city. */}
        <Section space="close">
          <Container>
            <Card
              className="px-6 py-12 text-center sm:px-10 lg:px-14 lg:py-14"
              pad="none"
              radius="panel"
              variant="indigo"
            >
              <h2 className="text-h2 mx-auto max-w-[16ch] font-bold">
                Twijfel je welke coach past?
              </h2>
              <p className="mx-auto mt-3.5 max-w-[29rem] text-lavender-ink">
                Begin gewoon met een gratis intake in jouw regio, de coach denkt
                met je mee, ook als een collega beter past.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button
                  className="max-[420px]:w-full"
                  href="#coaches"
                  size="lg"
                >
                  Kies je coach
                </Button>
                <Button
                  className="max-[420px]:w-full"
                  href="/locaties"
                  size="lg"
                  variant="outline-on-ink"
                >
                  Bekijk de locaties
                </Button>
              </div>
            </Card>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
