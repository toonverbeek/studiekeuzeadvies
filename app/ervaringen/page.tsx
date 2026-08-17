import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/app/components/contact-section";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader, type NavItem } from "@/app/components/site-header";
import { button, linkOnOchre, linkOnPaper, readingRow, shell } from "@/app/shell";
import { stories } from "@/app/stories";

// The old title, word for word. The URL stays the same and the title is what
// ranks: `docs/url-map.csv` sends /ervaringen/ to /ervaringen with 182 inbound
// links behind it. The old meta description said "96% van hen"; the old lead on
// the page said 92%. Neither number is ours to print, so the description is new
// and says what the page really holds.
export const metadata: Metadata = {
  title: "Lees over de ervaringen van studiekiezers | StudieKeuzeAdvies",
  description:
    "Studiekiezers schreven zelf op hoe hun traject ging. Bij elk verhaal staat uit welk jaar het komt, zodat je weet hoe oud het is.",
  alternates: { canonical: "/ervaringen" },
};

const nav: NavItem[] = [
  { href: "/studiekeuzetraject", label: "Het traject" },
  { href: "/studiekeuzecoaches", label: "Coaches" },
  { href: "/locaties", label: "Locaties" },
  { href: "/artikelen", label: "Artikelen" },
  { href: "#contact", label: "Contact" },
];

const jumps: NavItem[] = [
  { href: "#over-deze-verhalen", label: "Over deze verhalen" },
  { href: "#verhalen", label: "Wat studiekiezers schreven" },
  { href: "#contact", label: "Begin met een gesprek" },
];

/**
 * A quote of two or three sentences looks lost in a body column that is built
 * for 230 words, so the short ones are set one step larger. The measure is the
 * length of the whole quote, because that is what decides whether the block
 * fills its column or floats in it. 220 characters is where the switch sits:
 * above it a paragraph carries itself, below it it does not.
 */
const SHORT_QUOTE = 220;

/**
 * NO GRID OF CARDS AND NO STATISTICS BAR. The old page opened on "92% van de
 * studenten" and then dealt three testimonials in a slider. Both are gone. The
 * stories stand under each other on hairline rules, in the reading row this site
 * uses everywhere: the name and the date in the left column, the words in the
 * right one. That is a letter with the signature in the margin, which is what
 * these texts are.
 */
export default function StoriesPage() {
  return (
    <>
      <SiteHeader homeHref="/" nav={nav} />

      <main id="top">
        <section className="bg-ochre text-ink">
          <div className={`${shell} pb-16 md:pb-20`}>
            <p className="text-eyebrow pt-16 uppercase sm:pt-24">Ervaringen</p>

            <h1 className="text-headline sm:text-display mt-5 max-w-[13ch] font-extrabold">
              Ervaringen van studiekiezers
            </h1>

            <div className="mt-12 grid items-start gap-x-16 gap-y-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
              <div className="flex flex-col items-start gap-6">
                <p className="text-lead max-w-[52ch]">
                  Hieronder staat wat studiekiezers zelf opschreven over hun
                  traject. We hebben er niets bij verzonnen en niets mooier
                  gemaakt. Dit zijn hun eigen woorden, met hun eigen fouten erin.
                  Eén ding hebben we wel veranderd: waar iemand de naam van hun
                  coach noemde, staat nu &ldquo;mijn coach&rdquo;. Die coaches
                  werken hier niet meer, en dan hoort hun naam hier ook niet
                  meer.
                </p>
                <p className="max-w-[58ch]">
                  Bij elk verhaal staat een jaartal. Sommige zijn van jaren
                  geleden, en dat mag je gewoon weten: dan weet je ook wat je
                  leest.
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a className={button} href="#contact">
                    Begin met een gesprek
                  </a>
                  <Link className={linkOnOchre} href="/studiekeuzetraject">
                    Lees hoe het traject werkt
                  </Link>
                </div>
              </div>

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

        {/* The honest paragraph comes before the stories, not after them. A
            reader who is being shown testimonials wants to know two things
            first: who wrote them, and when. Answer that, and the stories that
            follow are worth more, not less.

            It sits on paper-shade, one tone away from the stories under it, so
            the reader sees at a glance where we stop talking and the
            studiekiezers start. A tone change, not a card and not a shadow. */}
        <section className="bg-paper-shade" id="over-deze-verhalen">
          <div className={`${shell} py-16 md:py-20`}>
            <div className={readingRow}>
              <h2 className="text-section font-extrabold">
                Over deze verhalen
              </h2>
              <div className="flex max-w-[62ch] flex-col gap-5">
                <p>
                  Deze verhalen zijn niet van gisteren. Ze zijn geschreven door
                  studiekiezers die een traject bij StudieKeuzeAdvies deden, in
                  de jaren voordat wij deze site overnamen. Daarom staat er bij
                  elk verhaal een jaartal.
                </p>
                <p>
                  De coach in zo&apos;n verhaal is meestal niet een van onze
                  coaches. We laten de verhalen toch staan, want ze vertellen
                  goed hoe een traject van binnen voelt. Wie er nu voor je
                  klaarstaat, lees je op de coachespagina.
                </p>
                <p>
                  <Link className={linkOnPaper} href="/studiekeuzecoaches">
                    Maak kennis met de coaches
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-paper" id="verhalen">
          <div className={`${shell} py-20 md:py-28`}>
            <h2 className="text-section max-w-[20ch] font-extrabold">
              Wat studiekiezers schreven
            </h2>

            <ul className="mt-10 border-b border-hairline md:mt-14">
              {stories.map((story) => {
                const short =
                  story.paragraphs.join(" ").length <= SHORT_QUOTE;

                return (
                  <li
                    className="border-t border-hairline py-12 md:py-16"
                    key={story.person}
                  >
                    <figure className={readingRow}>
                      {/* The signature stands where a heading stands on every
                          other page of this site, so the words start on the
                          same line here as they do there. It is a figcaption
                          and not a heading: the person is the author of the
                          quote, not a section of the page. */}
                      <figcaption className="flex flex-col gap-1">
                        <span className="text-title font-bold">
                          {story.person}
                        </span>
                        <span className="text-ink-soft">{story.meta}</span>
                      </figcaption>

                      <blockquote
                        className={`flex flex-col gap-5 ${
                          short ? "text-lead max-w-[52ch]" : "max-w-[62ch]"
                        }`}
                      >
                        {story.paragraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                        ))}
                      </blockquote>
                    </figure>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* The reading is done, so now the invitation may come. Not before. */}
        <section className="bg-ochre text-ink" id="zelf">
          <div className={`${shell} py-20 md:py-28`}>
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
              <h2 className="text-section font-extrabold">
                En jouw verhaal dan?
              </h2>
              <div className="flex flex-col items-start gap-8">
                {/* Nothing here claims anything about the ten people above. We
                    do not know how their traject started, and a sentence that
                    borrows their credit is exactly the thing this page is built
                    to avoid. This says only what is true of us today. */}
                <p className="text-lead max-w-[52ch]">
                  Het begint met één gesprek. Je vertelt wat er speelt, waar je
                  vastloopt en wat je al hebt geprobeerd, en wij leggen uit hoe
                  een traject werkt. Dat intakegesprek kost je niets en je zegt
                  daarna gewoon nee als het niet klopt.
                </p>
                <a className={button} href="#contact">
                  Begin met een gesprek
                </a>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter
        pageLinks={[
          { href: "#over-deze-verhalen", label: "Over deze verhalen" },
          { href: "#verhalen", label: "Wat studiekiezers schreven" },
          { href: "/studiekeuzetraject", label: "Hoe het traject werkt" },
          { href: "#contact", label: "Begin met een gesprek" },
        ]}
      />
    </>
  );
}
