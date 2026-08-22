import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import heroPhoto from "@/public/images/hero-gesprek.jpg";
import { citiesWithCoach, citiesWithCoachByName } from "./cities";
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
 * The four steps of the traject, in the client's words. Row H4 replaced all
 * eight strings: the mail carries the short version for this page and a longer
 * version for /studiekeuzetraject, and the two are meant to differ.
 *
 * The fourth number is violet: it is the one the reader is walking towards.
 */
const steps = [
  {
    number: "01",
    title: "Wie ben ik en wat kan ik?",
    body: "Met behulp van opdrachten, de persoonlijkheidstest en de gesprekken, ontdek je je talenten, interesses en kwaliteiten.",
  },
  {
    number: "02",
    title: "Interesses en blik op de toekomst.",
    body: "Met behulp van de studie-interessetest komen we tot een lijst met best passende studies. Daarnaast onderzoeken we hoe jij je toekomst voor je ziet.",
  },
  {
    number: "03",
    title: "Oriënteren en erop uit!",
    body: "Je gaat je verdiepen in de door jou samengestelde lijst met studies en vervolgens gericht en goed voorbereid naar open dagen.",
  },
  {
    number: "04",
    title: "De studiekeuze.",
    body: "Alles wat je hebt ontdekt, neem je mee in je uiteindelijke keuze. Jij bepaalt wat bij je past en waarom. Zo zet je een volgende stap waar je met zekerheid achter staat.",
  },
];

/**
 * What the price covers. Five lines now and not four: the client added the
 * report of the test results, and rewrote the other four (row H5). "35+
 * locaties" is gone from their own wording too, here and in the closing band.
 */
const included = [
  "Vier 1-op-1 gesprekken met één vaste coach",
  "Persoonlijkheidstest én studie-interessetest",
  "Rapportage van de testuitslagen",
  "Opdrachten voor thuis, elk gesprek bouwt voort op het vorige",
  "Online of op een van de vaste locaties",
];

const forYou = [
  "Ontdek wat je écht leuk vindt (niet wat “moet”)",
  "Eén vaste coach, geen wisselende gezichten",
  "Ook als je gestopt bent met of vastloopt in je huidige studie",
];

/** The client wrote this half in "u". It is their wording and it stays. */
const forParents = [
  "Alle gesprekken zijn 1-op-1, zo praat uw kind vrijuit",
  "Het traject bevat een persoonlijkheidstest en een studie-interessetest, afgerond in een rapportage",
  "Uw kind beslist zelf, weloverwogen en zonder haast",
];

const regioSteps = [
  "Kies de stad waar je begeleiding wilt",
  "Lees wie daar werkt en waar die coach goed in is",
  "Vraag bij die coach een gratis intakegesprek aan",
];

/**
 * The chips of the regio-kiezer.
 *
 * ROW H13, THE TWO CHANGES THE CLIENT ASKED FOR. The card used to carry a
 * short sentence about the coach, where the client's own export carried a
 * made-up speciality ("Sterk in techniek- en designrichtingen"). Their verdict
 * was that neither belongs there: "Kleine kader 'Sterk in ....' willen we
 * niet ... Of dat daar ons werkgebied komt met dus alle steden/plaatsen die
 * erbij horen, levert dat nog extra SEO op, dan graag dit doen." So the line
 * under a coach is now that coach's own towns. And the chips run in
 * alphabetical order, which is `citiesWithCoachByName`.
 *
 * The options are built here on the server and handed over as finished data,
 * so no biography travels to the browser.
 */
const regionOptions: RegionOption[] = [
  ...citiesWithCoachByName.map((city): RegionOption => {
    const coach = city.coach;

    return {
      key: city.slug,
      chip: city.name,
      name: coach.name,
      line: `Werkgebied: ${coach.regionTowns.join(" · ")}`,
      href: `/studiekeuzecoaches/${coach.slug}`,
      cta: "Plan gratis intake bij deze coach",
      // A portrait may only stand for somebody who exists. Every coach in the
      // file is real today; `isPlaceholder` still guards the next one.
      portrait:
        !coach.isPlaceholder && coach.portrait
          ? { src: coach.portrait, alt: coach.portraitAlt }
          : null,
    };
  }),
  {
    // ROW C4: this chip leads to its own form, and not to the roster. A reader
    // who picks "Online" has just said their town is not on the list.
    key: "online",
    chip: "Online",
    name: "Online, waar je ook woont",
    line: "Het volledige traject via video. Je kiest de coach bij wie het klikt, ook als die niet in jouw stad zit.",
    href: "/online-begeleiding",
    cta: "Vraag online begeleiding aan",
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
                  Kiezen uit honderden opleidingen is lastig. In vier sessies
                  met een vaste coach ontdek je wie je bent, wat je kunt en
                  welke studie daarbij hoort. De gesprekken zijn 1-op-1. Wij
                  begeleiden, jij kiest.
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
                  ROW H2. The rebuild took the client's rating line out and put
                  four provable facts in its place. The client put the rating
                  back and dropped the other half themselves: "8,8 gemiddeld ·
                  gratis intake, daarna één vaste prijs ('1.000+ trajecten per
                  jaar' weglaten)". The client leads here, and the reversal is
                  written down in docs/decisions.md.

                  The stars are decoration and carry `aria-hidden`; the number
                  beside them is the sentence a screen reader gets.
                */}
                <p className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted">
                  <span aria-hidden="true" className="tracking-[1px] text-amber">
                    ★★★★★
                  </span>
                  <span>8,8 gemiddeld · gratis intake, daarna één vaste prijs</span>
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
                {/* Row H3: "± 4 weken" is gone at the client's request. */}
                <p className="font-mono text-[0.8125rem] text-violet">
                  4 stappen · online of dichtbij
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Pill>
                  <span aria-hidden="true">✓</span> Incl. persoonlijkheidstest
                </Pill>
                <Pill>
                  <span aria-hidden="true">✓</span> Incl. studie-interessetest
                </Pill>
                {/* Row H3: the third pill the client asked for. */}
                <Pill>
                  <span aria-hidden="true">✓</span> Incl. rapportage
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
                  waar je aan toe bent en je beslist pas ná het gratis
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
                  Het StudieKeuzeTraject
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
                {/* Row H6. */}
                <p className="text-micro mt-2.5 text-center text-muted">
                  De intake is vrijblijvend. Je beslist daarna pas.
                </p>

                {/* ROW H7. Two changes: the wording, and where it goes. It
                    pointed at /tarieven, and the client wants the reader at the
                    block that explains the scan: "Deze link verwijst nu naar de
                    tarieven pagina, maar moet verwijzen naar de traject pagina,
                    als kan direct naar kader 'liever een korte verkenning'." */}
                <p className="mt-4.5 border-t border-hairline pt-4 text-small text-muted">
                  Maak je liever alleen de tests, met één toelichtend gesprek?
                  Dat kan!{" "}
                  <Link
                    className="font-bold text-violet hover:text-violet-dark"
                    href="/studiekeuzetraject#studiekeuzescan"
                  >
                    Kies voor de StudieKeuzeScan voor {scan.label} →
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
                {/* Row H8: over two lines, "visueel mooier". */}
                <h3 className="text-h4 mt-4 font-bold">
                  Jouw keuze, jouw tempo.
                  <br />
                  Met één vaste coach.
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
              {/* Row H11: the client rewrote the caption themselves. */}
              <p className="text-card mt-6 text-muted">
                <strong className="font-semibold text-ink">Moya (22)</strong>,
                koos na haar herstart voor de opleiding Toegepaste Psychologie
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
                {/* Row H12, the client's own paragraph. It names Tamara,
                    who is gebarenvaardig, so the promise has a person behind
                    it and not a policy. */}
                <p className="mt-4 max-w-[27.5rem] text-muted">
                  Onze coaches kennen alle niveaus (mbo, hbo en wo) en alle
                  twijfels. Ook met ADD, ADHD of autisme ben je op de juiste
                  plek: structuur en overzicht zitten in de methode ingebakken.
                  Ben je doof of slechthorend? Ook dan zit je bij ons goed. We
                  hebben 1 coach (Tamara) die jou online of thuis in
                  gebarentaal kan begeleiden.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Pill tone="white">Niet oordelen, wél doorvragen</Pill>
                  <Pill tone="white">MBO · HBO · WO</Pill>
                  <Pill tone="white">Gebarentaal mogelijk</Pill>
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

        {/* Row H14. Both lines are the client's, word for word, and "35+
            locaties" went out of their own version too. */}
        <CtaBand
          accent="Zet hem samen, plan je intake."
          mark
          primary={{
            href: "/studiekeuzecoaches",
            label: "Plan gratis intake bij een coach",
          }}
          secondary={{ href: "/tarieven", label: "Bekijk tarieven" }}
          text="Vrijblijvend kennismaken: samen met je ouders of alleen. Online of op een van onze vaste locaties."
          title="Elke goede keuze begint met een eerste stap."
        />
      </main>

      <SiteFooter />
    </>
  );
}
