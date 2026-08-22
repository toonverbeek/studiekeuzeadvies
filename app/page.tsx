import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import heroPhoto from "@/public/images/hero-gesprek.jpg";
import { citiesWithCoach } from "./cities";
import { NlMap } from "./components/nl-map";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import {
  Button,
  Card,
  Check,
  Container,
  CtaBand,
  Eyebrow,
  Pill,
  Reveal,
  Section,
} from "./components/ui";
import { scan, traject } from "./pricing";
import { HeroLines } from "./home/hero-lines";
import { RegionPicker, type RegionOption } from "./home/region-picker";
import { HomeTicker } from "./home/ticker";
import { heroImage } from "./site-config";

export const metadata: Metadata = {
  title: "Studiekeuzehulp met een vaste coach | StudieKeuzeAdvies",
  description:
    "Kiezen uit honderden opleidingen is lastig. In vier gesprekken met één vaste coach ontdek je wie je bent, wat je kunt en welke studie daarbij past. De intake is gratis.",
  alternates: { canonical: "/" },
};

/**
 * The four steps of the traject, in the client's words (design-spec 4.1). The
 * fourth number is violet: it is the one the reader is walking towards.
 */
const steps = [
  {
    number: "01",
    title: "Wie ben ik en wat kan ik?",
    body: "Je begint bij jezelf, niet bij opleidingen. Met een persoonlijkheidstest en gesprekken ontdek je je sterke kanten.",
  },
  {
    number: "02",
    title: "Blik op de toekomst",
    body: "In wat voor werk zou je passen, met wat voor mensen? Je hoeft geen beroep te kiezen, alleen een warme richting.",
  },
  {
    number: "03",
    title: "Mijn interesses en verdieping",
    body: "Met de studie-interessetest maak je de lijst kort: van duizenden opleidingen naar tien, van tien naar drie.",
  },
  {
    number: "04",
    title: "De studiekeuze",
    body: "Je legt je keuze naast alles wat je ontdekte en schrijft op waarom. Zo start je met een keuze waar je achter staat.",
  },
];

/**
 * What the price covers. The client's fourth line reads "Online of op een van
 * de 35+ locaties"; we have no 35 locations, so it says what is true instead.
 */
const included = [
  "Vier 1-op-1 gesprekken met één vaste coach",
  "Persoonlijkheidstest én studie-interessetest",
  "Opdrachten voor thuis, elk gesprek bouwt verder",
  "Online of op locatie bij jou in de buurt",
];

const forYou = [
  "Ontdek wat je écht leuk vindt (niet wat “moet”)",
  "Eén vaste coach, geen wisselende gezichten",
  "Ook als je gestopt bent of vastloopt",
];

/** The client wrote this half in "u". It is their wording and it stays. */
const forParents = [
  "Alle gesprekken zijn 1-op-1, zo praat uw kind vrijuit",
  "Het traject bevat een persoonlijkheidstest en een studie-interessetest",
  "Uw kind beslist zelf, weloverwogen en zonder haast",
];

const regioSteps = [
  "Kies de stad waar je begeleiding wilt",
  "Lees wie daar werkt en waar die coach goed in is",
  "Vraag bij die coach een gratis intakegesprek aan",
];

/**
 * The chips of the regio-kiezer, built from the file that decides where we
 * work. The line under a coach is the first sentence of their own
 * introduction, so this card and their profile cannot say two things.
 */
const regionOptions: RegionOption[] = [
  ...citiesWithCoach.map((city): RegionOption => {
    const coach = city.coach;
    const firstSentence = `${coach.intro.split(". ")[0]}.`;

    return {
      key: city.slug,
      chip: city.name,
      name: coach.name,
      line: firstSentence,
      href: `/studiekeuzecoaches/${coach.slug}`,
      cta: "Plan gratis intake bij deze coach",
      // A generated portrait belongs to a coach who does not exist yet, and
      // those may not go live: `isPlaceholder` is the field that decides it.
      portrait:
        !coach.isPlaceholder && coach.portrait
          ? { src: coach.portrait, alt: coach.portraitAlt }
          : null,
    };
  }),
  {
    key: "online",
    chip: "Online",
    name: "Online, waar je ook woont",
    line: "Het volledige traject via video. Je kiest de coach bij wie het klikt, ook als die niet in jouw stad zit.",
    href: "/studiekeuzecoaches",
    cta: "Plan gratis intake bij een coach",
    portrait: null,
  },
];

/** The pins of the map beside the coaches panel: only cities with a coach. */
const mapCities = citiesWithCoach.map((city) => ({
  name: city.name,
  at: city.at,
  href: `/locaties/${city.slug}`,
}));

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/*
          The hero. `overflow-x-clip` is the safety net under the two floating
          cards: they hang outside the photo from lg up, and a stray pixel of
          theirs may never make the whole page scroll sideways.
        */}
        <section className="relative overflow-x-clip pt-12 pb-12 lg:pt-21 lg:pb-18">
          <HeroLines />

          <Container className="relative">
            {/* `minmax(0,…)` on both tracks, because a grid column defaults to
                a minimum of its content and the photo's own 1024px would then
                push the text column narrow. */}
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-lavender px-4.5 py-2 text-small font-semibold text-violet-dark">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-coral"
                  />
                  Voor scholieren, studenten én hun ouders
                </p>

                <h1 className="text-hero mt-6 font-bold">
                  Samen kiezen voor een studie die écht past.
                </h1>

                <p className="text-lead mt-5 max-w-[31.25rem] text-muted">
                  Kiezen uit honderden opleidingen is lastig, voor jou én voor
                  je ouders. In vier sessies met een vaste coach ontdek je wie
                  je bent, wat je kunt en welke studie daarbij hoort. De
                  gesprekken zijn 1-op-1, en de keuze is uiteindelijk aan jou.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    className="max-[420px]:w-full"
                    href="/studiekeuzecoaches"
                    size="lg"
                  >
                    Plan gratis intake bij een coach
                  </Button>
                  <Button
                    className="max-[420px]:w-full"
                    href="#traject"
                    size="lg"
                    variant="outline"
                  >
                    Zo werkt het
                  </Button>
                </div>

                {/*
                  The client puts five amber stars and "8,8 gemiddeld · 1.000+
                  trajecten per jaar" here. Both are the old site's numbers,
                  earned by coaches who are mostly not ours, so the slot keeps
                  its place and holds four things we can prove today.
                */}
                <p className="mt-7 text-small text-muted">
                  Gratis intake · MBO, HBO en WO · online of op locatie · daarna
                  één vaste prijs
                </p>
              </div>

              <div className="relative">
                <Image
                  alt={heroImage.alt}
                  className="aspect-[4/3] w-full rounded-photo border border-photo-line object-cover sm:aspect-[4/4.3]"
                  placeholder="blur"
                  priority
                  sizes="(min-width: 1024px) 460px, 100vw"
                  src={heroPhoto}
                />

                {/* The quote card. Ger's line is the client's paraphrase and
                    theirs to write; the month behind it is the one fact the
                    archive can prove, so it is printed with it.

                    Below `sm` it is a block under the photo and not a card on
                    it: at 390px a floating card covers half the picture, and
                    the picture is the reason the photo is there. */}
                <figure className="mt-4 rounded-box bg-ink px-5 py-4 text-paper shadow-quote sm:absolute sm:bottom-5 sm:left-4 sm:mt-0 sm:max-w-[15.625rem] lg:bottom-8 lg:-left-6">
                  <blockquote className="font-display text-[0.90625rem] leading-[1.4] font-semibold">
                    &ldquo;Eindelijk weet ik wat ik wil, en waarom.&rdquo;
                  </blockquote>
                  <figcaption className="mt-1.5 text-[0.75rem] text-lavender-ink">
                    Ger (18), traject afgerond in november 2023
                  </figcaption>
                </figure>

                {/* The client's badge reads "92% kiest goed". We cannot prove
                    it, so the badge keeps its shape and says something that is
                    true of every reader who arrives here.

                    The label is ink and not the client's white: white on this
                    coral is 2.82:1, and ink on it is 5.67:1. */}
                <p className="absolute top-5 right-3 rotate-3 rounded-field bg-coral px-4 py-2.5 font-display text-small font-bold text-ink shadow-[0_10px_26px_rgba(255,107,74,0.35)] lg:-right-4">
                  Gratis intake
                </p>
              </div>
            </div>
          </Container>
        </section>

        <HomeTicker />

        {/* ------------------------------------------------ Het traject --- */}
        <Section
          className="pt-14 pb-8 lg:pt-22 lg:pb-10"
          id="traject"
          space="none"
        >
          <Container>
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                <h2 className="text-h2-lg max-w-[30rem] font-bold">
                  Van &ldquo;geen idee&rdquo; naar een keuze die klopt
                </h2>
                <p className="font-mono text-[0.8125rem] text-violet">
                  4 stappen · ± 4 weken · online of dichtbij
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Pill>
                  <span aria-hidden="true">✓</span> Incl. persoonlijkheidstest
                </Pill>
                <Pill>
                  <span aria-hidden="true">✓</span> Incl. studie-interessetest
                </Pill>
              </div>
            </Reveal>

            {/*
              The 01-04 columns. The client's hover animates padding, which is
              layout; this one moves transform and shadow only, so the row
              beside it never shifts. The dividers are vertical from lg, where
              the four columns exist; below that they are spacing.
            */}
            <ol className="mt-10 grid border-t-[1.5px] border-ink pt-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
              {steps.map((step) => (
                <Reveal
                  as="li"
                  className="rounded-[18px] py-6 transition-[transform,box-shadow,background-color] duration-[350ms] ease-reveal hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_0_0_2px_#6d4aff,0_18px_44px_rgba(109,74,255,0.25)] motion-reduce:hover:translate-y-0 lg:px-6.5 lg:pt-7 lg:pb-6 lg:first:-ml-6.5 lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-hairline"
                  key={step.number}
                >
                  <span
                    aria-hidden="true"
                    className={`block font-display text-numeral font-bold ${
                      step.number === "04" ? "text-violet" : "text-sand-line"
                    }`}
                  >
                    {step.number}
                  </span>
                  <h3 className="text-title-sm mt-2.5 font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-card mt-2.5 text-muted">{step.body}</p>
                </Reveal>
              ))}
            </ol>

            {/* The price panel. The client hides an alternative "losse strip"
                behind a setting; the panel is their default and the only one
                built. */}
            <Card
              as={Reveal}
              className="mt-13 grid gap-9 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-13 lg:px-13 lg:py-12"
              pad="none"
              radius="panel"
              variant="indigo"
            >
              <div>
                <Eyebrow color="lavender-ink">En wat kost dat?</Eyebrow>
                <h3 className="text-h3 mt-3.5 font-bold">
                  Eén vaste prijs.
                  <br />
                  Alles zit erin.
                </h3>
                <p className="mt-3.5 max-w-[25rem] text-lavender-ink">
                  Geen uurtarieven, geen kosten achteraf. Je weet vooraf precies
                  waar je aan toe bent, en je beslist pas ná het gratis
                  intakegesprek.
                </p>
                <ul className="mt-5.5 flex flex-col gap-2.5">
                  {included.map((line) => (
                    <Check key={line} tone="amber">
                      {line}
                    </Check>
                  ))}
                </ul>
              </div>

              <div className="rounded-inner bg-paper p-7 text-ink shadow-price-inner sm:p-9">
                <p className="text-title-sm font-display font-bold">
                  Het studiekeuzetraject
                </p>
                <p className="mt-3 flex items-baseline gap-2.5">
                  <span className="text-price font-display font-bold">
                    {traject.label}
                  </span>
                  <span className="text-small text-muted">compleet</span>
                </p>

                {/* `md` and not `lg`: at 320px the long label needs the six
                    pixels of padding that `lg` would eat, or the pill grows
                    into a two-line lozenge. */}
                <Button className="mt-5 w-full" href="/studiekeuzecoaches">
                  Plan gratis intake bij een coach
                </Button>
                <p className="text-micro mt-2.5 text-center text-muted">
                  Gratis en vrijblijvend. Je beslist daarna pas.
                </p>

                <p className="mt-4.5 border-t border-hairline pt-4 text-small text-muted">
                  Liever alleen de tests, met één gesprek erover?{" "}
                  <Link
                    className="font-bold text-violet hover:text-violet-dark"
                    href="/tarieven"
                  >
                    Studiekeuzescan · {scan.label} →
                  </Link>
                </p>
              </div>
            </Card>
          </Container>
        </Section>

        {/* ----------------------------------------- Voor jou / voor ouders */}
        <Section
          className="py-10 lg:py-16"
          id="tweegesprekken"
          space="none"
        >
          <Container>
            <Reveal className="grid overflow-hidden rounded-panel md:grid-cols-2">
              <div className="bg-violet p-7 text-white sm:p-11 lg:px-12 lg:py-13">
                <Eyebrow color="lavender-soft">Voor jou</Eyebrow>
                <h3 className="text-h4 mt-4 font-bold">
                  Jouw keuze, jouw tempo. Met één vaste coach.
                </h3>
                <ul className="mt-6 flex flex-col gap-3">
                  {forYou.map((line) => (
                    <Check key={line} mark="→" tone="amber">
                      {line}
                    </Check>
                  ))}
                </ul>
                <Button
                  className="mt-7"
                  href="/studiekeuzetraject"
                  variant="light"
                >
                  Zo werkt het voor jou
                </Button>
              </div>

              {/* The client wrote this half in "u", to the parent who reads
                  over the chooser's shoulder. It is their wording, so it
                  stays exactly as they wrote it. */}
              <div className="bg-ink p-7 text-paper sm:p-11 lg:px-12 lg:py-13">
                <Eyebrow color="lavender-ink">Voor ouders</Eyebrow>
                <h3 className="text-h4 mt-4 font-bold">
                  Inzicht en zekerheid, óók voor u.
                </h3>
                <ul className="mt-6 flex flex-col gap-3">
                  {forParents.map((line) => (
                    <Check key={line} mark="→" tone="coral">
                      {line}
                    </Check>
                  ))}
                </ul>
                <Button
                  className="mt-7"
                  href="/voor-wie"
                  variant="outline-on-ink"
                >
                  Informatie voor ouders
                </Button>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* -------------------------------------------------- Testimonial - */}
        <Section className="py-12 lg:py-18" id="verhalen" space="none">
          <Container>
            <Reveal className="max-w-[40rem]">
              {/* The client sets a stock portrait beside this quote. There is
                  no photograph of Moya, so the coral mark carries the block
                  and nobody's face is borrowed for it. */}
              <p
                aria-hidden="true"
                className="font-display text-[clamp(3.5rem,2.5rem+4vw,5.625rem)] leading-none font-bold text-coral"
              >
                &ldquo;
              </p>
              <blockquote className="mt-3 font-display text-[clamp(1.375rem,1.05rem+1.7vw,2rem)] leading-[1.3] font-semibold tracking-[-0.02em]">
                Mijn coach oordeelde niet, maar vroeg door. Nu weet ik zeker wat
                ik wil, en waarom.
              </blockquote>
              <p className="text-card mt-6 text-muted">
                <strong className="font-semibold text-ink">Moya (22)</strong>,
                traject afgerond in maart 2024
              </p>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-small font-semibold">
                <Link
                  className="border-b-2 border-violet pb-0.5 hover:text-violet"
                  href="/ervaringen"
                >
                  Meer ervaringen
                </Link>
                <Link className="text-muted hover:text-violet" href="/artikelen">
                  Alle artikelen →
                </Link>
                <Link className="text-muted hover:text-violet" href="/voor-wie">
                  Voor wie is het traject? →
                </Link>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* ------------------------------------------------- Eén vaste coach */}
        <Section className="pt-2 pb-12 lg:pt-6 lg:pb-20" id="coaches" space="none">
          <Container>
            <Reveal className="grid items-center gap-8 rounded-panel bg-lavender p-6 sm:p-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12 lg:p-13">
              <div>
                <h2 className="text-h2 font-bold">
                  Eén vaste coach.
                  <br />
                  Van eerste twijfel tot definitieve keuze.
                </h2>
                <p className="mt-4 max-w-[27.5rem] text-muted">
                  Het traject werkt op elk niveau (mbo, hbo en wo) en bij elke
                  twijfel. Ook met ADD, ADHD of autisme ben je op de juiste
                  plek: structuur en overzicht zitten in de methode ingebakken.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Pill tone="white">Niet oordelen, wél doorvragen</Pill>
                  <Pill tone="white">MBO · HBO · WO</Pill>
                  <Pill tone="white">Extra ondersteuning</Pill>
                </div>
                <Button
                  className="mt-7"
                  href="/studiekeuzecoaches"
                  size="lg"
                  variant="dark"
                >
                  Ontmoet de coaches
                </Button>
              </div>

              {/*
                The client's slot holds a stock photo of "het team". No such
                photograph exists and the generated scene is the hero's, so the
                slot holds the map instead: the same true statement in a
                picture, and every pin is a city where somebody really works.
              */}
              <div className="rounded-inner bg-white p-4 shadow-map">
                <NlMap
                  cities={mapCities}
                  title="Kaart van Nederland met de steden waar een coach werkt"
                />
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* ------------------------------------------------- Regio-kiezer -- */}
        <Section className="pb-14 lg:pb-20" id="regio" space="none">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
              <Reveal>
                <Eyebrow>Begin met een gesprek. Het kost je niets</Eyebrow>
                <h2 className="text-h2 mt-3.5 font-bold">
                  Kies je regio en kom bij de juiste coach terecht
                </h2>
                <p className="mt-4 max-w-[27.5rem] text-muted">
                  Je vraagt een gesprek aan bij de coach in jouw stad. Niet bij
                  een centraal punt, maar bij de persoon die je straks écht
                  spreekt.
                </p>
                <ol className="mt-6 flex flex-col gap-2.5">
                  {regioSteps.map((line, index) => (
                    <li className="flex gap-3" key={line}>
                      <span aria-hidden="true" className="font-bold text-violet">
                        {index + 1}.
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal>
                <RegionPicker options={regionOptions} />
              </Reveal>
            </div>
          </Container>
        </Section>

        <CtaBand
          accent="Zet hem samen, met een gratis intake."
          mark
          primary={{
            href: "/studiekeuzecoaches",
            label: "Plan gratis intake bij een coach",
          }}
          secondary={{ href: "/tarieven", label: "Bekijk tarieven" }}
          text="Vrijblijvend kennismaken: samen, of eerst alleen. Online of op locatie bij een coach in de buurt."
          title="Elke goede keuze begint met één stap."
        />
      </main>

      <SiteFooter />
    </>
  );
}
