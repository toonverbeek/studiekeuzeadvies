import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { coaches } from "@/app/coaches";
import { ContactSection } from "@/app/components/contact-section";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader, type NavItem } from "@/app/components/site-header";
import { button, linkOnOchre, linkOnPaper, readingRow, shell } from "@/app/shell";

export const metadata: Metadata = {
  // The old title, word for word. It is what ranks today.
  title: "Leer onze professionele studiekeuzecoaches kennen | StudieKeuzeAdvies",
  description:
    "Maak kennis met de studiekeuzecoaches: wie ze zijn, waar ze werken en hoe ze met je meelopen. Eén vaste coach, en het eerste gesprek is gratis.",
  alternates: { canonical: "/studiekeuzecoaches" },
};

const nav: NavItem[] = [
  { href: "/studiekeuzetraject", label: "Het traject" },
  { href: "#coaches", label: "Coaches" },
  { href: "/locaties", label: "Locaties" },
  { href: "/artikelen", label: "Artikelen" },
  { href: "#contact", label: "Contact" },
];

/**
 * This block stands where the old page put "gemiddeld beoordeeld met een 8,8".
 * A rating we may not use is replaced by four things we can keep, and the first
 * two are the old page's own opening sentence, taken apart.
 */
const shared = [
  {
    title: "Ze hebben zelf gestudeerd én gewerkt",
    body: "Elke coach heeft jaren buiten het onderwijs gewerkt. Ze weten dus niet alleen hoe een opleiding eruitziet, maar ook waar die op uitkomt.",
  },
  {
    title: "Ze werken al jaren met jouw leeftijd",
    body: "Studiekiezers van 16 tot 22 begeleiden is een vak apart. Het is iets anders dan volwassenen coachen, en het vraagt geduld met stiltes.",
  },
  {
    title: "Je houdt dezelfde coach",
    body: "Van het eerste gesprek tot je keuze rond is. Geen wisselend team, geen wachtrij, en je hoeft je verhaal maar één keer te vertellen.",
  },
  {
    title: "De keuze blijft van jou",
    body: "Een coach stelt vragen en zoekt mee. Wat je uiteindelijk kiest, kies je zelf. Niemand hier vult dat voor je in.",
  },
];

export default function CoachesPage() {
  return (
    <>
      <SiteHeader homeHref="/" nav={nav} />

      <main id="top">
        {/* The ochre poster. The right column is the roster itself, so a reader
            who came for one city can leave the hero at the right person. */}
        <section className="bg-ochre text-ink">
          <div className={`${shell} pb-16 md:pb-20`}>
            <p className="text-eyebrow pt-16 uppercase sm:pt-24">
              Wie je tegenover je hebt
            </p>

            {/* The words of the old H1, without its exclamation mark. The loud
                line is the display step from sm up, so this page opens with the
                same weight as the traject page and every city page. Below sm it
                drops to the headline step: "studiekeuzecoaches" is one word of
                eighteen letters that cannot break, and at the display size it
                runs past the gutter on every telephone. */}
            <h1 className="mt-5">
              {/* The trailing space is not decoration: without it a screen
                  reader runs the two spans together into one word. */}
              <span className="text-title block font-medium">Leer onze </span>
              <span className="text-headline sm:text-display mt-1 block font-extrabold">
                studiekeuzecoaches kennen
              </span>
            </h1>

            <div className="mt-12 grid items-start gap-x-16 gap-y-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
              <div className="flex flex-col items-start gap-8">
                <p className="text-lead max-w-[52ch]">
                  Een traject bij ons is geen test en geen portaal. Het zijn
                  gesprekken met één persoon, die je leert kennen en die je niets
                  aanpraat. Hieronder lees je wie dat zijn, waar ze werken en
                  waar ze vandaan komen.
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a className={button} href="#contact">
                    Begin met een gesprek
                  </a>
                  <Link className={linkOnOchre} href="/studiekeuzetraject">
                    Eerst lezen hoe het traject werkt
                  </Link>
                </div>
              </div>

              {/* The index of the two sibling pages lists sections. Here it
                  lists people, because a reader who came for one city wants the
                  person, not the section. The label says so: "De coaches" is
                  the heading of the roster further down, and one name for two
                  different things sends a reader to the wrong place. */}
              <nav aria-label="Direct naar een coach">
                <p className="text-eyebrow border-t border-ochre-line pt-4 uppercase">
                  Direct naar
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {coaches.map((person) => (
                    <li key={person.slug}>
                      <a className={linkOnOchre} href={`#${person.slug}`}>
                        {person.name}
                      </a>{" "}
                      in {person.town}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* Still ochre, so the top of the page reads as one poster. Four short
            lines are not a reading text, so they may sit on the colour. */}
        <section className="bg-ochre text-ink" id="samen">
          <div className={`${shell} pb-20 md:pb-28`}>
            <div
              className={`${readingRow} border-t border-ochre-line pt-12 md:pt-16`}
            >
              <h2 className="text-section font-extrabold">
                Wat elke coach gemeen heeft
              </h2>
              <ul className="grid gap-x-16 gap-y-8 md:grid-cols-2">
                {shared.map((item) => (
                  <li
                    className="flex max-w-[46ch] flex-col gap-2 border-t border-ochre-line pt-5"
                    key={item.title}
                  >
                    <h3 className="text-title font-bold">{item.title}</h3>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* The spine of the page. The face sits in the column that holds a
            heading everywhere else on this site, so the text of every coach
            starts on the same line as the text of every other page. */}
        <section className="bg-paper" id="coaches">
          <div className={`${shell} py-20 md:py-28`}>
            <div className={readingRow}>
              <h2 className="text-section font-extrabold">De coaches</h2>
              <p className="text-lead max-w-[52ch]">
                Ze werken los van elkaar, elk in hun eigen regio, met dezelfde
                manier van kijken. Je krijgt de coach van jouw gebied.
              </p>
            </div>

            {/* No portrait here carries `priority`. The roster starts about two
                screens down, the largest paint of this page is the ochre poster
                at the top, and preloading a face nobody has scrolled to yet
                only takes bandwidth away from it. */}
            <ul className="mt-14 border-b border-hairline md:mt-20">
              {coaches.map((person) => (
                <li
                  className={`${readingRow} border-t border-hairline py-14 md:py-20`}
                  id={person.slug}
                  key={person.slug}
                >
                  {person.portrait ? (
                    <Image
                      alt={person.portraitAlt}
                      // Below lg the cap is wider than the reading column, so
                      // the photo runs flush with the text on a telephone. From
                      // lg it sits in the 20rem margin column of the site.
                      // The source files are square. A column of five squares
                      // reads as a row of profile pictures, which is the team
                      // grid DESIGN.md sends us away from, so they are cropped
                      // to a portrait 4:5. It also shortens the empty paper
                      // under the face, which the long texts leave behind.
                      className="aspect-[4/5] w-full max-w-[22rem] object-cover lg:max-w-[20rem]"
                      placeholder="blur"
                      sizes="(max-width: 1024px) 352px, 320px"
                      src={person.portrait}
                    />
                  ) : (
                    // A coach can start before they send a photo. The column
                    // then stays empty instead of showing a grey box.
                    <span aria-hidden="true" />
                  )}

                  <div className="flex flex-col items-start gap-6">
                    <div className="flex flex-col gap-2">
                      <p className="text-eyebrow text-ink-soft uppercase">
                        Studiekeuzecoach in {person.town}
                      </p>
                      <h3 className="text-section font-extrabold">
                        {person.name}
                      </h3>
                    </div>

                    <p className="text-lead max-w-[52ch]">{person.intro}</p>

                    <div className="flex max-w-[62ch] flex-col gap-5">
                      {person.bio.map((paragraph) => (
                        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                      ))}
                    </div>

                    <dl className="grid w-full max-w-[62ch] gap-x-10 gap-y-5 border-t border-hairline pt-6 sm:grid-cols-2">
                      <div className="flex flex-col gap-1">
                        <dt className="text-eyebrow text-ink-soft uppercase">
                          Werkgebied
                        </dt>
                        <dd>{person.region}</dd>
                      </div>
                      <div className="flex flex-col gap-1">
                        <dt className="text-eyebrow text-ink-soft uppercase">
                          Werkt veel met
                        </dt>
                        <dd>{person.focus}</dd>
                      </div>
                    </dl>

                    {person.citySlug && (
                      <p>
                        <Link
                          className={linkOnPaper}
                          href={`/locaties/${person.citySlug}`}
                        >
                          Studiekeuzeadvies in {person.town}
                        </Link>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The practical question a reader has by now, answered before the
            form. It also brings the ochre back after the long paper run. */}
        <section className="bg-ochre text-ink">
          <div className={`${shell} py-20 md:py-28`}>
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
              <h2 className="text-section font-extrabold">
                Welke coach krijg jij?
              </h2>
              <div className="flex flex-col items-start gap-8">
                <p className="text-lead max-w-[58ch]">
                  Meestal die van jouw regio. Werkt er in jouw stad geen coach,
                  dan kijken we of iemand uit de buurt tijd heeft, en anders doen
                  we het online. Dat hoef je nu niet te beslissen. Het eerste
                  gesprek is gratis en je zit nergens aan vast.
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a className={button} href="#contact">
                    Begin met een gesprek
                  </a>
                  <Link className={linkOnOchre} href="/locaties">
                    Bekijk alle locaties
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter
        pageLinks={[
          { href: "#samen", label: "Wat elke coach gemeen heeft" },
          { href: "#coaches", label: "De coaches" },
          { href: "#contact", label: "Begin met een gesprek" },
        ]}
      />
    </>
  );
}
