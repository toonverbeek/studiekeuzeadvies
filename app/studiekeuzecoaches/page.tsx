import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { citiesWithCoach } from "@/app/cities";
import { type Coach, coaches } from "@/app/coaches";
import { NlMap } from "@/app/components/nl-map";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Container,
  Eyebrow,
  Pill,
  Reveal,
  Section,
} from "@/app/components/ui";
import { CoachFilter, type FilterItem } from "./coach-filter";

export const metadata: Metadata = {
  // The old title, word for word. It is what ranks today.
  title: "Leer onze professionele StudieKeuzeCoaches kennen | StudieKeuzeAdvies",
  description:
    "Maak kennis met de StudieKeuzeCoaches: wie ze zijn, waar ze werken en hoe ze met je meelopen. Eén vaste coach, en het eerste gesprek is gratis.",
  alternates: { canonical: "/studiekeuzecoaches" },
};

/**
 * The towns in roster order, without repeats. This feeds the filter over the
 * grid and nothing else.
 */
const regions = [...new Set(coaches.map((coach) => coach.town))];

/**
 * The three facts under the h1.
 *
 * THE FIRST ONE IS THE CLIENT'S OWN NUMBER, AND IT REPLACED A COUNT OF OURS.
 * The page counted the cities with a coach and printed "N steden + online".
 * The client's mail asks for "12 provincies + online" (row C2), so that is
 * what stands here. It is a claim about reach and not about staff: four
 * coaches sit in five provinces, and the twelfth province is reached the same
 * way the first one is, online. The client wrote it about their own business.
 */
const stats = [
  { value: "12", label: "provincies + online", tone: "text-violet" },
  { value: "Gratis", label: "het eerste gesprek", tone: "text-coral-text" },
  { value: "1-op-1", label: "alle gesprekken", tone: "text-amber-ink" },
];

/**
 * What every coach has in common. Two promises about the traject, which is ours
 * to promise, and nothing about the people, which the cards above already say
 * in each coach's own words.
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
 * THE CARD THE CLIENT ASKED FOR (rows C6 and C7). It used to print a one-line
 * summary and a pill row of specialisms, and the client's verdict on those was
 * short: "Onder de coaches geen specialisatie (hier door ai gegenereerd), maar
 * benoemen van werkervaring." So the card now prints what the coach did before
 * and the slogan they chose, both in the client's own words, and the pills are
 * gone. The work area took the place of the small "Sterk in ..." card.
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

        <p className="text-card text-muted">{coach.experience}</p>

        {/* The slogan (row C7). A blockquote and not a paragraph, because it
            is a quotation: sometimes of the coach, sometimes of Descartes. */}
        <blockquote className="mt-1 border-l-2 border-coral pl-3.5">
          <p className="text-card text-ink italic">&ldquo;{coach.quote}&rdquo;</p>
          {coach.quoteSource ? (
            <cite className="mt-1 block text-small text-muted not-italic">
              &mdash; {coach.quoteSource}
            </cite>
          ) : null}
        </blockquote>

        {/* Row H13 and row C6: where a made-up speciality stood, the work area
            stands. The towns are the words a reader searches for. */}
        <p className="mt-1 text-small text-muted">
          <span className="font-semibold text-ink">Werkgebied:</span>{" "}
          {coach.regionTowns.join(" · ")}
        </p>

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
              <Eyebrow className="mb-4">Onze StudieKeuzeCoaches</Eyebrow>

              <h1 className="text-h1 font-bold">
                De coach die je straks spreekt, kies je zelf.
              </h1>

              <p className="text-lead mt-5 max-w-[30rem] text-muted">
                Geen centraal callcenter: kies hiernaast een stad, zie wie daar
                werkt en vraag bij díe coach een gratis intakegesprek aan. Alle
                gesprekken zijn 1-op-1. Of scroll naar beneden en klik op een
                stad of een coach.
              </p>

              {/* Row C4: the third way in. A reader who does not want to
                  travel picks nobody off the map, so the page says so and
                  gives them their own form. */}
              <p className="mt-4 max-w-[30rem] text-card text-muted">
                Woon je buiten deze steden? Wij begeleiden ook volledig online.{" "}
                <Link
                  className="font-semibold text-violet underline underline-offset-4 hover:no-underline"
                  href="/online-begeleiding"
                >
                  Vraag online begeleiding aan
                </Link>
                .
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

        {/* ROW C8: "kader 'twijfel je welke coach past' mag helemaal weg."
            An ink panel stood here with "Twijfel je welke coach past?" and two
            buttons back into this same page. It is gone, and nothing replaces
            it: the grid above already is the chooser. */}
      </main>

      <SiteFooter />
    </>
  );
}
