import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { citiesWithCoach } from "@/app/cities";
import { ContactSection } from "@/app/components/contact-section";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader, type NavItem } from "@/app/components/site-header";
import {
  button,
  linkOnOchre,
  linkOnPaper,
  readingRow,
  shell,
} from "@/app/shell";
import {
  chooserTypes,
  meetings,
  paths,
  reasons,
  whyItMatters,
} from "@/app/traject";

// The old title, word for word. This URL carries 182 inbound links and it is
// the second best ranked page of the old site. The title is what ranks.
export const metadata: Metadata = {
  title: "Begeleiding bij studiekeuze | Kiezen met zekerheid | StudieKeuzeAdvies",
  description:
    "Vier gesprekken met één vaste coach, opdrachten die je zelf doet en een verslag aan het eind. Het eerste gesprek is gratis en verplicht je tot niets.",
  alternates: { canonical: "/studiekeuzetraject" },
};

/** The row that carries a meeting, and the row that carries what comes after it. */
const meetingRow =
  "grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-8 gap-y-4 lg:grid-cols-[5rem_minmax(0,20rem)_minmax(0,1fr)] lg:gap-x-16";

const nav: NavItem[] = [
  { href: "#gesprekken", label: "De gesprekken" },
  { href: "#wie", label: "Wie zijn wij" },
  { href: "/locaties", label: "Locaties" },
  { href: "/artikelen", label: "Artikelen" },
  { href: "#contact", label: "Contact" },
];

const jumps: NavItem[] = [
  { href: "#hulp", label: "Wat je bij ons doet" },
  { href: "#voor-wie", label: "Voor wie is het?" },
  { href: "#gesprekken", label: "Hoe het traject eruitziet" },
  { href: "#waarom-ska", label: "Waarom StudieKeuzeAdvies" },
  { href: "#contact", label: "Begin met een gesprek" },
];

export default function TrajectPage() {
  // One coach, borrowed from the city data, so this page does not invent a
  // third person. If there is no coach at all, the block loses its portrait
  // and the text still stands.
  const featured = citiesWithCoach[0] ?? null;

  return (
    <>
      <SiteHeader homeHref="/" nav={nav} />

      <main id="top">
        <section className="bg-ochre text-ink">
          <div className={`${shell} pb-20 md:pb-28`}>
            <p className="text-eyebrow pt-16 uppercase sm:pt-24">Het traject</p>

            {/* The question of the old page, in two voices: the words that rank,
                then the words that stick. The city pages use the same shape. */}
            <h1 className="mt-5">
              {/* The trailing space is not decoration: without it a screen
                  reader reads "maken:kiezen" as one word. */}
              <span className="text-title block font-medium">
                Een goede studiekeuze maken:{" "}
              </span>
              <span className="text-display mt-1 block font-extrabold">
                kiezen voor het leven?
              </span>
            </h1>

            <div className="mt-12 grid items-start gap-x-16 gap-y-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
              <div className="flex flex-col items-start gap-6">
                <p className="text-lead max-w-[52ch]">
                  Een studiekeuze is geen keuze voor het leven: met de meeste
                  studies kun je nog alle kanten op. Wat wel telt, is dat je
                  kiest voor een studie waar je de komende jaren op je plek zit
                  en waar je je het beste kunt ontwikkelen.
                </p>
                <p className="max-w-[58ch]">
                  Een verkeerde studiekeuze is niet alleen duur, het is ook
                  zonde van je tijd, en het kan je zelfvertrouwen raken.
                  Daarnaast is het gewoon moeilijk om je weg te vinden in het
                  enorme aanbod. Daarom zijn wij er om je te helpen kiezen.
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a className={button} href="#contact">
                    Begin met een gesprek
                  </a>
                  <a className={linkOnOchre} href="#gesprekken">
                    Eerst lezen wat je doet
                  </a>
                </div>
              </div>

              {/* An index, not decoration. Overview before detail is a
                  requirement for one of the named user groups, and it is how a
                  parent finds the answer without reading the whole page. */}
              <nav aria-label="Op deze pagina">
                <p className="text-eyebrow border-t border-ochre-line pt-4 uppercase">
                  Op deze pagina
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {jumps.map((item) => (
                    <li key={item.href}>
                      <a className={linkOnOchre} href={item.href}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* The three questions the old page asked in this order: what is it,
            what do you do, and who is it for. */}
        <section className="bg-paper" id="hulp">
          <div className={`${shell} py-8 md:py-12`}>
            <div className={`${readingRow} border-t border-hairline py-12 md:py-16`}>
              <h2 className="text-section font-extrabold">
                Hulp bij jouw studiekeuze
              </h2>
              <div className="flex max-w-[62ch] flex-col gap-5">
                <p>
                  Als je voor een studiekeuzetraject bij ons kiest, kies je voor
                  zekerheid. Je niveau maakt voor onze aanpak niet uit: we
                  helpen bij een keuze op mbo-, hbo- en wo-niveau.
                </p>
                <p>
                  We werken met scholieren die voor het eerst gaan studeren, en
                  met studenten die eerder een keuze maakten die niet bleek te
                  passen. Dat tweede is ongeveer de helft van de mensen die bij
                  ons aanklopt.
                </p>
              </div>
            </div>

            <div className={`${readingRow} border-t border-hairline py-12 md:py-16`}>
              <h2 className="text-section font-extrabold">
                Wat ga je bij ons doen?
              </h2>
              <div className="flex max-w-[62ch] flex-col gap-5">
                <p>
                  Je gaat met een eigen studiekeuzecoach bij jou in de buurt aan
                  de slag om te ontdekken wie je bent, waar je interesses liggen
                  en wat je mogelijkheden zijn. Je hebt gesprekken met je coach,
                  en je werkt aan concrete opdrachten: in het gesprek en thuis.
                </p>
                <p>
                  We helpen je ook om een toekomstbeeld te vormen. Dat klinkt
                  groot, maar het is nodig: zonder een idee van waar je heen
                  wilt, is elke opleiding even goed. Door die aanpak eindigt een
                  traject bij ons met een echte keuze.
                </p>
                <p>
                  <a className={linkOnPaper} href="#gesprekken">
                    Bekijk hoe de vier gesprekken eruitzien
                  </a>
                </p>
              </div>
            </div>

            <div
              className={`${readingRow} border-t border-b border-hairline py-12 md:py-16`}
              id="voor-wie"
            >
              <h2 className="text-section font-extrabold">Voor wie is het?</h2>
              <div className="flex flex-col gap-6">
                <p className="max-w-[62ch]">
                  In welke fase van het zoeken je ook zit, we kunnen je helpen op
                  de manier die jij nodig hebt. Welk keuze-type ben jij?
                </p>
                {/* Eight lines you scan, not read. Two columns keep the list
                    short enough to take in at once. */}
                <ul className="grid gap-x-16 gap-y-4 md:grid-cols-2">
                  {chooserTypes.map((type) => (
                    <li
                      className="max-w-[46ch] border-t border-hairline pt-4"
                      key={type}
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The old page put the intake form right here, straight after "Voor wie
            is het?". The form itself lives at the end of every page on this
            site, so this band carries the invitation to it. */}
        <section className="bg-ochre text-ink" id="intake">
          <div className={`${shell} py-20 md:py-28`}>
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
              <h2 className="text-section font-extrabold">
                Plan een gratis en vrijblijvend intakegesprek
              </h2>
              <div className="flex flex-col items-start gap-8">
                <p className="text-lead max-w-[52ch]">
                  In het intakegesprek vertel je wat er speelt, en horen we of
                  dit traject bij je past. Het kost je niets en je zegt daarna
                  gewoon nee als het niet klopt.
                </p>
                <a className={button} href="#contact">
                  Begin met een gesprek
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Three doors, in the words and the order of the old page. */}
        <section className="bg-ochre text-ink" id="situaties">
          <div className={`${shell} pb-20 md:pb-28`}>
            <ul className="border-b border-ochre-line">
              {paths.map((path) => (
                <li
                  className={`${readingRow} border-t border-ochre-line py-10 md:py-14`}
                  key={path.title}
                >
                  <h2 className="text-title font-bold">
                    {path.href ? (
                      <Link className={linkOnOchre} href={path.href}>
                        {path.title}
                      </Link>
                    ) : (
                      path.title
                    )}
                  </h2>
                  <p className="max-w-[62ch]">{path.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The spine of the page. A loud row for the meeting, a quiet row for
            the work you do at home. The rhythm answers the question the reader
            really has: how much work is this? */}
        <section className="bg-paper" id="gesprekken">
          <div className={`${shell} py-20 md:py-28`}>
            <h2 className="text-section max-w-[20ch] font-extrabold">
              Hoe ziet dit studiekeuzetraject eruit?
            </h2>
            <p className="text-lead mt-6 max-w-[58ch]">
              Je krijgt een ervaren studiekeuzecoach met wie je in totaal vier
              bijeenkomsten hebt. Je gaat aan de slag met opdrachten, tijdens de
              bijeenkomst en thuis. Elk gesprek bouwt op het vorige.
            </p>

            <ol className="mt-12 border-b border-hairline lg:mt-16">
              {meetings.map((meeting) => (
                <li
                  className={`${meetingRow} border-t border-hairline py-12 md:py-16`}
                  key={meeting.number}
                >
                  <span
                    aria-hidden="true"
                    className="text-numeral font-normal tabular-nums text-ochre-deep"
                  >
                    {meeting.number}
                  </span>
                  <h3 className="text-title font-bold">{meeting.title}</h3>
                  <p className="col-start-2 max-w-[62ch] lg:col-start-3 lg:row-start-1">
                    {meeting.body}
                  </p>

                  {meeting.homework && (
                    <div className="col-start-2 flex flex-col gap-2 border-t border-hairline pt-5 lg:col-start-3">
                      <p className="text-eyebrow uppercase text-ink-soft">
                        Daarna, thuis
                      </p>
                      <p className="max-w-[62ch] text-ink-soft">
                        {meeting.homework}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ol>

            {/* No numeral here. The sequence has ended, and what follows is a
                thing you keep instead of a thing you attend. */}
            <div className={`${meetingRow} pt-12 md:pt-16`}>
              <div className="col-start-2 flex flex-col gap-3 lg:col-start-2">
                <p className="text-eyebrow uppercase text-ink-soft">
                  Aan het eind
                </p>
                <h3 className="text-title font-bold">Je verslag</h3>
              </div>
              <p className="col-start-2 max-w-[62ch] lg:col-start-3 lg:row-start-1">
                Je coach schrijft op wat je hebt gedaan, wat eruit kwam en waarom
                deze studie bij je past. Je houdt dat verslag. Handig als je over
                een half jaar weer even twijfelt, en handig als je thuis moet
                uitleggen hoe je tot deze keuze bent gekomen.
              </p>
            </div>
          </div>
        </section>

        {/* The argument, not the sales pitch. The old page put its 92% here.
            That figure is gone; the reasoning under it is still true. */}
        <section className="bg-paper-shade" id="waarom">
          <div className={`${shell} py-20 md:py-28`}>
            <div className={readingRow}>
              <h2 className="text-section font-extrabold">
                Waarom is de juiste studiekeuze zo belangrijk?
              </h2>
              <div className="flex max-w-[62ch] flex-col gap-5">
                {whyItMatters.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Three short reasons on ochre. Short enough to live there. */}
        <section className="bg-ochre text-ink" id="waarom-ska">
          <div className={`${shell} py-20 md:py-28`}>
            <h2 className="text-section max-w-[20ch] font-extrabold">
              Waarom StudieKeuzeAdvies
            </h2>
            <ul className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((reason) => (
                <li
                  className="flex flex-col gap-3 border-t border-ochre-line pt-6"
                  key={reason.title}
                >
                  <h3 className="text-title font-bold">{reason.title}</h3>
                  <p className="max-w-[38ch]">{reason.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-12 max-w-[62ch]">
              Kijk bij{" "}
              <Link className={linkOnOchre} href="/locaties">
                alle locaties
              </Link>{" "}
              waar op dit moment een coach werkt. Staat jouw stad er niet bij,
              dan gaan de gesprekken online, of kijken we of een coach uit een
              buurstad tijd heeft.
            </p>
          </div>
        </section>

        {/* "Wie zijn wij?" of the old page, with a face under it. */}
        <section className="bg-paper" id="wie">
          <div className={`${shell} py-20 md:py-28`}>
            <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
              <div className="flex flex-col gap-5">
                <h2 className="text-section max-w-[16ch] font-extrabold">
                  Wie zijn wij?
                </h2>
                <p className="text-lead max-w-[52ch]">
                  Onze coaches werken al jaren met studiekeuzeprocessen, en ze
                  weten daarom hoe ze je kunnen helpen. Je krijgt er één, en het
                  blijft dezelfde: van het intakegesprek tot het moment dat je
                  keuze rond is.
                </p>
                <p className="max-w-[58ch]">
                  We vinden het belangrijk dat je als toekomstig student serieus
                  genomen wordt. Een studiekeuze gaat om meer dan een advies over
                  opleidingen: we laten je ontdekken wie je bent, en we vertellen
                  je uit eigen ervaring waar je aan begint.
                </p>
              </div>

              {featured?.coach?.portrait && (
                <figure className="flex w-full max-w-[420px] flex-col gap-4 lg:max-w-none">
                  <Image
                    alt={featured.coach.portraitAlt}
                    className="w-full"
                    placeholder="blur"
                    sizes="(max-width: 1024px) 100vw, 320px"
                    src={featured.coach.portrait}
                  />
                  <figcaption>
                    <span className="text-title font-bold">
                      {featured.coach.name}
                    </span>
                    <span className="mt-1 block">
                      coach in{" "}
                      <Link
                        className={linkOnPaper}
                        href={`/locaties/${featured.slug}`}
                      >
                        {featured.name}
                      </Link>
                    </span>
                  </figcaption>
                </figure>
              )}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter
        pageLinks={[
          { href: "#hulp", label: "Wat je bij ons doet" },
          { href: "#voor-wie", label: "Voor wie is het?" },
          { href: "#gesprekken", label: "De vier gesprekken" },
          { href: "#waarom-ska", label: "Waarom StudieKeuzeAdvies" },
          { href: "#contact", label: "Begin met een gesprek" },
        ]}
      />
    </>
  );
}
