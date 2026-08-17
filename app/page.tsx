import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import heroPhoto from "@/public/images/hero-gesprek.jpg";
import { citiesWithCoach } from "./cities";
import { ContactSection } from "./components/contact-section";
import { WorkAreaMap } from "./components/maps";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { linkOnPaper, shell } from "./shell";
import { heroImage, legacyQuotes } from "./site-config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const situations = [
  {
    number: "01",
    href: "/eerste-studiekeuze",
    title: "Je kiest voor het eerst",
    body: "Je gaat na je examen studeren, maar je weet nog niet wat. Of je vindt juist veel dingen leuk, en daarom kun je niet kiezen.",
  },
  {
    number: "02",
    href: "/verkeerde-studiekeuze",
    title: "Je twijfelt of je bent gestopt",
    body: "Je bent begonnen aan een opleiding die niet blijkt te passen. Dat is balen, en het zegt niets over jou. We kijken samen wat er wel klopt.",
  },
  {
    // The page behind this door is about ADD and ADHD only, because that is
    // where the archived copy is. The door still names autism, because the
    // group is named in PRODUCT.md and a coach can answer it in the intake.
    // See issue #40: the page must gain an autism section, or this door must
    // lose the word.
    number: "03",
    href: "/studiekeuze-met-add-adhd",
    title: "Je hebt ADD, ADHD of autisme",
    body: "Dan helpt overzicht meer dan nog meer opties. Minder keuzes tegelijk, een vast ritme, en een coach die weet dat de manier van kiezen net zo belangrijk is als de keuze zelf.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* The ochre poster. It carries the brand and it holds the only proof we have. */}
        <section className="bg-ochre text-ink">
          <div className={`${shell} pb-14 md:pb-20`}>
            <p className="text-eyebrow pt-16 uppercase sm:pt-24">
              Voor mbo, hbo en wo
            </p>

            <h1 className="text-display mt-5 max-w-[13ch] font-extrabold">
              Een goede studiekeuze maken. Lastig hè?
            </h1>

            <div className="mt-12 grid items-start gap-x-16 gap-y-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)]">
              <div className="flex flex-col items-start gap-8">
                <p className="text-lead max-w-[46ch]">
                  Je moet kiezen uit duizenden opleidingen, en overal krijg je de
                  vraag wat je later wilt worden. Je hoeft dat niet alleen uit te
                  zoeken. Samen met een vaste coach ontdek je wie je bent, waar
                  je goed in bent en welke studies daarbij passen.
                </p>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    className="bg-ink px-8 py-4 text-eyebrow uppercase text-paper transition-colors duration-150 ease-out-quart hover:bg-ochre-deep"
                    href="#contact"
                  >
                    Plan een gratis intakegesprek
                  </a>
                  <a
                    className="font-medium underline decoration-ink/40 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink"
                    href="#aanpak"
                  >
                    Eerst lezen hoe het werkt
                  </a>
                </div>
              </div>

              {/*
                A generated scene, not a generated person. The hero used to be a
                generated face under "Je vaste coach, bij jou in de buurt", and
                the caption is what made it a claim about somebody who does not
                exist. Nobody here is named, and the caption is about the traject,
                so the picture promises only what we can keep. The rule and its
                limits stand in app/site-config.ts, next to the text itself.

                `sizes` follows the slot in three steps: 400px from lg up, where
                the grid column caps it; 420px in the single column above the
                telephone, where max-w-[420px] caps it; and the gutter width of
                the shell below that. Without those steps a telephone downloads
                a file made for a laptop, and this is the LCP image.
              */}
              <figure className="flex w-full max-w-[420px] flex-col gap-3 lg:max-w-none">
                <Image
                  alt={heroImage.alt}
                  className="w-full"
                  placeholder="blur"
                  priority
                  sizes="(min-width: 1024px) 400px, (min-width: 480px) 420px, 100vw"
                  src={heroPhoto}
                />
                <figcaption className="text-eyebrow uppercase">
                  {heroImage.caption}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* The old site had three unprovable numbers here. Now it holds the coach. */}
        <section className="bg-paper" id="coaches">
          <div className={`${shell} py-20 md:py-28`}>
            <h2 className="text-section max-w-[24ch] font-extrabold">
              Eén vaste coach die je leert kennen
            </h2>
            <div className="mt-10 grid gap-x-16 gap-y-6 border-t border-hairline pt-10 md:grid-cols-2">
              <p>
                Geen wisselend team en geen wachtrij. Je krijgt één coach die
                met je meeloopt, van het eerste gesprek tot je keuze. Iemand die
                jaren met jongeren werkt en die niet oordeelt over wat je zegt.{" "}
                <Link
                  className="font-medium underline decoration-ochre-line decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink"
                  href="/studiekeuzecoaches"
                >
                  Maak kennis met de coaches
                </Link>
                .
              </p>
              <p>
                In vier gesprekken kijken we naar wie je bent, wat je kunt en wat
                je wilt. Tussen de gesprekken door ga je zelf aan de slag, en je
                bezoekt open dagen om te voelen of een opleiding klopt.{" "}
                <Link
                  className="font-medium underline decoration-ochre-line decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink"
                  href="/studiekeuzetraject"
                >
                  Zo ziet het traject eruit
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* A short ochre band. It breaks the long paper run and it stops the
            locations from disappearing between two quiet sections. */}
        <section className="bg-ochre text-ink" id="locaties">
          <div className={`${shell} py-14 md:py-16`}>
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
              <h2 className="text-section font-extrabold">Waar we nu zitten</h2>
              <div className="flex flex-col gap-6">
                <ul className="flex flex-wrap gap-x-12 gap-y-2">
                  {citiesWithCoach.map((city) => (
                    <li className="text-title font-bold" key={city.slug}>
                      <Link
                        className="underline decoration-ink/30 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink"
                        href={`/locaties/${city.slug}`}
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="max-w-[62ch]">
                  We noemen alleen steden waar echt een coach werkt. Staat jouw
                  stad er nog niet bij? Een coach in de buurt werkt vaak ook in
                  de steden eromheen, dus kijk bij{" "}
                  <Link
                    className="font-medium underline decoration-ink/40 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink"
                    href="/locaties"
                  >
                    alle locaties
                  </Link>
                  .
                </p>

                {/* Under the names and under the sentence, in that order, on
                    every screen. The names are the answer to "waar", the
                    sentence is the nuance, and the map is the picture of both.
                    It carries no pins, so it says nothing on its own: the list
                    above it is its legend. app/components/maps.tsx says why the
                    pins are not there. */}
                <WorkAreaMap cities={citiesWithCoach} />
              </div>
            </div>
          </div>
        </section>

        {/* Three doors as an index: the numeral hangs in the margin, the title
            and the answer sit in their own columns. A card grid is banned here. */}
        <section className="bg-paper" id="aanpak">
          <div className={`${shell} py-20 md:py-28`}>
            <h2 className="text-section max-w-[18ch] font-extrabold">
              Waar sta jij nu?
            </h2>
            <ul className="mt-12 border-b border-hairline">
              {situations.map((item) => (
                <li
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-8 gap-y-3 border-t border-hairline py-10 md:py-14 lg:grid-cols-[5rem_minmax(0,20rem)_minmax(0,1fr)] lg:items-baseline lg:gap-x-16"
                  key={item.number}
                >
                  <span
                    aria-hidden="true"
                    className="text-numeral font-normal tabular-nums text-ink-soft"
                  >
                    {item.number}
                  </span>
                  <h3 className="text-title font-bold">
                    {item.href ? (
                      <Link
                        className="underline decoration-ochre-line decoration-2 underline-offset-[6px] transition-colors duration-150 ease-out-quart hover:decoration-ink"
                        href={item.href}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="col-start-2 max-w-[62ch] lg:col-start-3 lg:row-start-1">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Second ochre zone. Half of the old customers came in through this door. */}
        <section className="bg-ochre text-ink">
          <div className={`${shell} py-20 md:py-28`}>
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
              <h2 className="text-section font-extrabold">
                Helaas de verkeerde studie gekozen?
              </h2>
              <div className="flex flex-col items-start gap-8">
                <p className="text-lead max-w-[58ch]">
                  Ben je dit jaar begonnen aan een studie die niet bij je past?
                  Je bent niet de enige, en je hoeft niet te wachten tot
                  september. Hoe eerder je begint, hoe rustiger je volgende
                  keuze wordt.
                </p>
                <a
                  className="bg-ink px-8 py-4 text-eyebrow uppercase text-paper transition-colors duration-150 ease-out-quart hover:bg-ochre-deep"
                  href="#contact"
                >
                  Bespreek je situatie
                </a>
              </div>
            </div>
          </div>
        </section>

        {/*
          These two quotes come from the old site, and the right to use them is
          settled: the rights to the whole archive are bought (2026-08-06, see
          PRODUCT.md). The TODO that stood here said the opposite and was out of
          date. They are the two with a real completion date, which is why the
          home page shows these two and not the other eight. All ten stand on
          /ervaringen, and they are written down once, in app/site-config.ts.
        */}
        <section className="bg-paper-shade">
          <div className={`${shell} py-20 md:py-28`}>
            <h2 className="text-section max-w-[20ch] font-extrabold">
              Wat studiekiezers zeggen
            </h2>
            <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
              {legacyQuotes.map((item) => (
                <figure
                  className="flex flex-col gap-6 border-t border-hairline pt-8"
                  key={item.person}
                >
                  <blockquote className="text-lead max-w-[46ch]">
                    {item.quote}
                  </blockquote>
                  <figcaption className="text-ink-soft">
                    <span className="font-medium text-ink">{item.person}</span>,{" "}
                    {item.meta}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-10">
              <Link className={linkOnPaper} href="/ervaringen">
                Lees alle ervaringen van studiekiezers
              </Link>
            </p>
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
