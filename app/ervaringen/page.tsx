import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/app/components/contact-section";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Container,
  CtaBand,
  Eyebrow,
  PageIndex,
  Reveal,
  Section,
} from "@/app/components/ui";
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

const jumps = [
  { href: "#over-deze-verhalen", label: "Over deze verhalen" },
  { href: "#verhalen", label: "Wat studiekiezers schreven" },
  { href: "#contact", label: "Begin met een gesprek" },
];

/**
 * A quote of two or three sentences looks lost when it is set at the size a
 * story of 230 words needs, so the short ones are set one step larger. The
 * measure is the length of the whole quote, because that is what decides
 * whether the block fills its column or floats in it. 260 characters is where
 * the switch sits: above it a paragraph carries itself, below it it does not.
 * It is deliberately above the two dated quotes, which are 214 and 221
 * characters: they stand next to each other, and two quotes of the same length
 * at two different sizes reads as an accident.
 */
const SHORT_QUOTE = 260;

/**
 * NO GRID OF CARDS AND NO STATISTICS BAR. The old page opened on "92% van de
 * studenten" and then dealt three testimonials in a slider. Both are gone. The
 * stories stand under each other on hairline rules, each one in the client's
 * testimonial block (design spec 3.13): the coral quote mark, the words in
 * Bricolage, the name and the date under them.
 *
 * NO PORTRAITS. The client's block carries a stock portrait beside the quote.
 * We have no photograph of any of these people, and a face that is not theirs
 * next to their words is the one thing this page may never do.
 */
export default function StoriesPage() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <header className="pt-10 pb-12 lg:pt-16 lg:pb-16">
          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)] lg:gap-14">
              <div>
                <Eyebrow className="mb-4">Ervaringen</Eyebrow>

                <h1 className="text-h1 max-w-[13ch] font-bold">
                  Ervaringen van studiekiezers
                </h1>

                <p className="text-lead mt-5 max-w-[34rem] text-muted">
                  Hieronder staat wat studiekiezers zelf opschreven over hun
                  traject. We hebben er niets bij verzonnen en niets mooier
                  gemaakt. Dit zijn hun eigen woorden, met hun eigen fouten erin.
                  Eén ding hebben we wel veranderd: waar iemand de naam van hun
                  coach noemde, staat nu &ldquo;mijn coach&rdquo;. Die coaches
                  werken hier niet meer, en dan hoort hun naam hier ook niet
                  meer.
                </p>
                <p className="mt-4 max-w-[34rem] text-muted">
                  Bij elk verhaal staat een jaartal. Sommige zijn van jaren
                  geleden, en dat mag je gewoon weten: dan weet je ook wat je
                  leest.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    className="max-[420px]:w-full"
                    href="#verhalen"
                    size="lg"
                  >
                    Lees de verhalen
                  </Button>
                  <Button
                    className="max-[420px]:w-full"
                    href="/studiekeuzetraject"
                    size="lg"
                    variant="outline"
                  >
                    Lees hoe het traject werkt
                  </Button>
                </div>
              </div>

              <PageIndex items={jumps} />
            </div>
          </Container>
        </header>

        {/* The honest paragraph comes before the stories, not after them. A
            reader who is being shown testimonials wants to know two things
            first: who wrote them, and when. Answer that, and the stories that
            follow are worth more, not less. */}
        <Section id="over-deze-verhalen" space="sm">
          <Container>
            <Reveal className="max-w-[45rem] rounded-card bg-lavender p-7 sm:p-9">
              <h2 className="text-title-lg font-bold">Over deze verhalen</h2>

              <div className="mt-4 flex flex-col gap-4 text-muted-read">
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
              </div>

              <p className="mt-6">
                <Button href="/studiekeuzecoaches" variant="ghost">
                  Maak kennis met de coaches →
                </Button>
              </p>
            </Reveal>
          </Container>
        </Section>

        <Section id="verhalen" space="sm">
          <Container>
            <h2 className="text-h2 max-w-[20ch] font-bold">
              Wat studiekiezers schreven
            </h2>

            <ul className="mt-8 md:mt-10">
              {stories.map((story) => {
                const short =
                  story.paragraphs.join(" ").length <= SHORT_QUOTE;

                return (
                  <li
                    className="border-t border-hairline"
                    key={story.person}
                  >
                    <Reveal
                      as="figure"
                      className="max-w-[42rem] py-12 md:py-16"
                    >
                      {/* The coral mark of the client's testimonial block. It
                          is decoration: the blockquote already says what this
                          is, so a screen reader does not read it out. */}
                      <span
                        aria-hidden="true"
                        className="block font-display text-[clamp(3rem,2.2rem+3vw,4.5rem)] leading-[0.72] font-bold text-coral"
                      >
                        &ldquo;
                      </span>

                      <blockquote
                        className={`mt-4 flex flex-col gap-4 font-display font-semibold tracking-[-0.02em] ${
                          short
                            ? "text-h3 leading-[1.3]"
                            : "text-title-lg leading-[1.42]"
                        }`}
                      >
                        {story.paragraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                        ))}
                      </blockquote>

                      {/* The signature. It is a figcaption and not a heading:
                          the person is the author of the quote, not a section
                          of the page. The date is the point of this page, so it
                          stands next to the name and never under a fold. */}
                      <figcaption className="text-small mt-6 text-muted">
                        <strong className="font-bold text-ink">
                          {story.person}
                        </strong>
                        , {story.meta}
                      </figcaption>
                    </Reveal>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 border-t border-hairline pt-8 text-muted">
              Wie er nu voor je klaarstaat, lees je bij{" "}
              <Link
                className="font-bold text-violet underline decoration-violet/40 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-violet"
                href="/studiekeuzecoaches"
              >
                de coaches
              </Link>
              .
            </p>
          </Container>
        </Section>

        {/* The reading is done, so now the invitation may come. Not before.
            Nothing here claims anything about the ten people above: we do not
            know how their traject started, and a sentence that borrows their
            credit is exactly the thing this page is built to avoid. */}
        <CtaBand
          accent="Het begint met één gesprek."
          id="zelf"
          text="Je vertelt wat er speelt, waar je vastloopt en wat je al hebt geprobeerd, en wij leggen uit hoe een traject werkt. Dat intakegesprek kost je niets en je zegt daarna gewoon nee als het niet klopt."
          title="En jouw verhaal dan?"
        />

        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
