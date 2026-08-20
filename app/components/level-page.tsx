import Link from "next/link";
import { getArticle, headingId } from "@/app/articles";
import { ContactSection } from "@/app/components/contact-section";
import { ReadAlso } from "@/app/components/read-also";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Container,
  CtaBand,
  Eyebrow,
  type Jump,
  PageIndex,
  readingRow,
  Reveal,
  Section,
} from "@/app/components/ui";
import { type Level, levelThemes } from "@/app/levels";

/**
 * The template behind the three level pages: /mbo-opleiding-kiezen,
 * /hbo-opleiding-kiezen and /wo-opleiding-kiezen.
 *
 * It is a skeleton and almost nothing else. Every word a reader reads comes out
 * of app/levels.ts, and it is written for one level. The old site put the same
 * text on all three URLs with the level swapped, and that is the pattern this
 * component exists to avoid, so resist the urge to move a nice sentence up into
 * here: a sentence in this file appears three times on the site.
 *
 * The shape is the client's design (docs/redesign/design-spec.md 6.2): Hero A
 * with the two-voice h1 and the index card, reading rows on paper, the four
 * themes as the 01-04 step columns of 3.11, the two doors as the violet and ink
 * situation cards of 4.3, then the CTA band, "Lees ook" and the contact steps.
 */
export function LevelPage({ level }: { level: Level }) {
  const related = level.related
    .map((slug) => getArticle(slug))
    .filter((article) => article !== undefined);

  const jumps: Jump[] = [
    ...level.sections.map((section) => ({
      href: `#${headingId(section.title)}`,
      label: section.title,
    })),
    { href: "#ander-niveau", label: "Past een ander niveau beter?" },
    { href: "#gesprekken", label: "Hoe het traject werkt" },
    { href: "#situaties", label: "Waar sta jij nu?" },
    { href: "#contact", label: "Begin met een gesprek" },
  ];

  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* Hero A: the page opens with its own words on the left and the map of
            itself on the right. Overview before detail is a requirement for one
            of the named user groups, and it is how a parent finds the answer
            fast. Below lg the map becomes a row of pills under the buttons. */}
        <header className="pt-10 pb-12 lg:pt-16 lg:pb-16">
          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)] lg:gap-14">
              <div>
                <Eyebrow className="mb-4">{level.eyebrow}</Eyebrow>

                {/* The old h1, word for word, in two voices. The level is the
                    one word that separates this page from the other two, so it
                    is the word that carries the poster type. */}
                <h1>
                  {/* The trailing space is not decoration: without it a screen
                      reader reads "studiekeuzembo" as one word. */}
                  <span className="text-h3 block font-medium text-muted">
                    {level.titleLead}{" "}
                  </span>
                  <span className="text-h1 mt-1 block font-bold">
                    {level.titleLevel}
                  </span>
                </h1>

                <p className="text-lead mt-5 max-w-[34rem] text-muted">
                  {level.lead}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    className="max-[420px]:w-full"
                    href="#contact"
                    size="lg"
                  >
                    Begin met een gesprek
                  </Button>
                  <Button
                    className="max-[420px]:w-full"
                    href="#situaties"
                    size="lg"
                    variant="outline"
                  >
                    Eerst lezen waar je staat
                  </Button>
                </div>
              </div>

              <PageIndex items={jumps} />
            </div>
          </Container>
        </header>

        {/* The answer to the search question, and nothing sold yet. */}
        <Container>
          {level.sections.map((section) => (
            <div
              className="border-t border-hairline"
              id={headingId(section.title)}
              key={section.title}
            >
              <Reveal className={`${readingRow} py-12 md:py-16`}>
                <h2 className="text-h2 font-bold">{section.title}</h2>
                <div className="flex max-w-[62ch] flex-col gap-5 text-muted-read">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}

          {/* The way to the other two levels. It sits here, straight after the
              level's own text and before we say anything about the traject,
              because this is the moment a reader finds out that this page is not
              their page. Sending them on is worth more than keeping them. The
              sentence is written per level; only this heading is shared, and it
              is four words. */}
          <div className="border-t border-hairline" id="ander-niveau">
            <Reveal className={`${readingRow} py-12 md:py-16`}>
              <h2 className="text-h2 font-bold">
                Past een ander niveau beter?
              </h2>
              <div className="flex flex-col gap-6">
                <p className="max-w-[62ch] text-muted-read">
                  {level.otherLevels.intro}
                </p>
                <ul className="flex flex-wrap gap-3">
                  {level.otherLevels.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="inline-flex min-h-11 items-center rounded-full bg-lavender px-5 text-small font-bold text-violet-dark transition-colors duration-150 ease-out-quart hover:bg-violet hover:text-white"
                        href={link.href}
                      >
                        {link.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* The four themes as the old page listed them: names only. The
              descriptions live on the traject page, and they stay there. */}
          <div className="border-t border-hairline" id="gesprekken">
            <Reveal className={`${readingRow} py-12 md:py-16`}>
              <h2 className="text-h2 font-bold">Hoe werkt het traject?</h2>
              <div className="flex flex-col gap-8">
                <p className="max-w-[62ch] text-muted-read">
                  {level.themesIntro}
                </p>

                <ol className="grid gap-x-7 border-t-[1.5px] border-ink pt-6 sm:grid-cols-2 lg:grid-cols-4">
                  {levelThemes.map((theme, index) => (
                    <li
                      className="border-t border-hairline py-5 first:border-t-0 sm:[&:nth-child(2)]:border-t-0 lg:border-t-0 lg:border-r lg:pr-6 lg:last:border-r-0"
                      key={theme}
                    >
                      <span
                        aria-hidden="true"
                        className={`text-numeral block font-bold tabular-nums ${
                          index === levelThemes.length - 1
                            ? "text-violet"
                            : "text-sand-line"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-title-sm mt-2.5 block font-display font-semibold">
                        {theme}
                      </span>
                    </li>
                  ))}
                </ol>

                <p>
                  <Button href="/studiekeuzetraject" variant="ghost">
                    Lees per gesprek wat je doet →
                  </Button>
                </p>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* The two doors of the old page. A fork in the road, not a product
            range: one reader belongs behind the first card and one behind the
            second, and the colour says which is which. */}
        <Section id="situaties" space="md">
          <Container>
            <Reveal>
              <h2 className="text-h2 max-w-[14ch] font-bold">
                Waar sta jij nu?
              </h2>

              <ul className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2">
                {level.doors.map((door) => {
                  // The first door is the first choice and the second is the
                  // second chance, and the colour says which is which. It is
                  // read off the route, not off the position, so a level that
                  // ever orders its doors the other way still paints right.
                  const violet = door.href !== "/verkeerde-studiekeuze";

                  return (
                    <li
                      className={`flex flex-col gap-3 rounded-card p-8 sm:p-9 ${
                        violet ? "bg-violet text-white" : "bg-ink text-paper"
                      }`}
                      key={door.href}
                    >
                      <h3 className="text-title-lg font-bold">{door.label}</h3>
                      <p
                        className={`text-card flex-1 ${
                          violet ? "text-white" : "text-lavender-ink"
                        }`}
                      >
                        {door.body}
                      </p>
                      <Link
                        className={`mt-2 inline-flex min-h-11 items-center text-small font-bold underline decoration-2 underline-offset-4 ${
                          violet
                            ? "text-white decoration-white/40 hover:text-white hover:decoration-white"
                            : "text-coral decoration-coral/40 hover:text-coral hover:decoration-coral"
                        }`}
                        href={door.href}
                      >
                        {violet
                          ? "Start meteen goed →"
                          : "Maak een einde aan de twijfel →"}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </Container>
        </Section>

        {/* The answer has been given, so now the offer may come. Not before
            it. The heading no longer says "plan een gratis en vrijblijvend
            intakegesprek", because this page cannot name a coach
            (commit 7013373), and it is not the heading of the ContactSection
            further down either: a reader who scrolls must not read the same
            sentence twice. The button stays, because a whole "Lees ook" block
            stands between this band and that section. */}
        <CtaBand
          accent="Dat hoor je in het intakegesprek."
          primary={{ href: "#contact", label: "Begin met een gesprek" }}
          secondary={{
            href: "/studiekeuzetraject",
            label: "Lees hoe het traject werkt",
          }}
          text={level.invitation}
          title="Twijfel je of dit traject bij je past?"
        />

        <ReadAlso articles={related} />

        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
