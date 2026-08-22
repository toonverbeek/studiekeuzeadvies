import { getArticle, headingId } from "@/app/articles";
import { ContactSection } from "@/app/components/contact-section";
import { ReadAlso } from "@/app/components/read-also";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import type { Situation } from "@/app/situations";
import {
  Button,
  Container,
  CtaBand,
  Eyebrow,
  PageIndex,
  Reveal,
  Section,
} from "@/app/components/ui";

/**
 * The template behind /eerste-studiekeuze, /verkeerde-studiekeuze and
 * /studiekeuze-met-add-adhd.
 *
 * Two root dynamic segments cannot live next to each other, so these are real
 * folders and not one [situatie] route. A static route also wins over
 * app/[artikel], which is what keeps all three URLs working.
 *
 * THE WORDS DO NOT CHANGE HERE. Every sentence still comes from
 * app/situations.ts, which is the cleaned old copy (decision 2026-08-05). What
 * changed on 2026-08-20 is the frame: the ochre poster is gone and the page is
 * built in the client's system (design-spec 6.2, "Hero A"):
 *
 *   hero        eyebrow, h1, lead, two buttons, and the index as a white card
 *               on the right from lg, as a lavender pill row below it.
 *   sections    reading rows on paper: the question left, the answer right at
 *               17px on a 62ch measure.
 *   themes      the client's 01-04 step columns, without the hover.
 *   closing     the CTA band, the articles, and the route to a coach.
 *
 * Each page borrows the colour of its own card on /voor-wie: violet for the
 * first choice, coral for the one that went wrong, and the 1.5px ink rule for
 * the third. That is `accent` in app/situations.ts, and it is the only visual
 * difference between the three.
 */
export function SituationPage({ situation }: { situation: Situation }) {
  const related = situation.related
    .map((slug) => getArticle(slug))
    .filter((article) => article !== undefined);

  const jumps = [
    ...situation.sections.map((section) => ({
      href: `#${headingId(section.title)}`,
      label: section.title,
    })),
    { href: "#gesprekken", label: "De vier gesprekken" },
    { href: "#contact", label: "Begin met een gesprek" },
  ];


  return (
    <>
      <SiteHeader />

      <main id="top">
        <header className="pt-10 pb-8 lg:pt-16 lg:pb-12">
          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
              <div>
                <Eyebrow
                  className="mb-4"
                  color={situation.accent === "coral" ? "coral" : "violet"}
                >
                  {situation.eyebrow}
                </Eyebrow>

                {/* A few short words. That is what the h1 size is built for,
                    and every one of them comes from the old page. */}
                <h1 className="text-h1 max-w-[14ch] font-bold">
                  {situation.title}
                </h1>

                <p className="text-lead mt-5 max-w-[34rem] text-muted">
                  {situation.lead}
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
                    href={situation.crossLink.href}
                    size="lg"
                    variant="outline"
                  >
                    {situation.crossLink.label}
                  </Button>
                </div>
              </div>

              {/* Overview before detail. A requirement for one of the named
                  user groups, and the way a parent finds the answer fast. One
                  list, two shapes: pills on a telephone, a card from lg. */}
              {/* The index card carries the page's accent. Ink is a rule and
                  not a fill: the third situation card on /voor-wie is white
                  with a 1.5px ink border, and this page borrows it. */}
              <PageIndex
                className="lg:mt-2"
                items={jumps}
                tone={situation.accent === "ink" ? "ink" : "hairline"}
              />
            </div>
          </Container>
        </header>

        {/* The rows carry their own rhythm, so the section only closes the gap
            to the band under it. */}
        <Section className="pb-6 lg:pb-10" space="none">
          <Container>
            {situation.sections.map((section) => (
              <div
                className="border-t border-hairline"
                id={headingId(section.title)}
                key={section.title}
              >
                <Reveal className="grid gap-x-14 gap-y-5 py-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:py-14">
                  <h2 className="text-h2 font-bold">{section.title}</h2>

                  <div className="flex max-w-[62ch] flex-col gap-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        className="text-read text-muted-read"
                        key={paragraph.slice(0, 24)}
                      >
                        {paragraph}
                      </p>
                    ))}

                    {/* Where the answer continues on another page. A short list,
                      one line each, so it reads as a door and not as a card. */}
                    {section.links ? (
                      <ul className="mt-1 flex flex-col gap-2">
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Button href={link.href} variant="ghost">
                              {link.label} →
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              </div>
            ))}

            {/* The four themes, as the old page listed them: names only. The
                descriptions live on the traject page, and they stay there. */}
            <div className="border-t border-hairline" id="gesprekken">
              <Reveal className="grid gap-x-14 gap-y-5 py-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:py-14">
                <h2 className="text-h2 font-bold">
                  Hoe ziet dit traject eruit?
                </h2>

                <div className="flex flex-col gap-6">
                  <p className="text-read max-w-[62ch] text-muted-read">
                    {situation.themesIntro}
                  </p>

                  <ol className="grid gap-6 border-t-[1.5px] border-ink pt-6 sm:grid-cols-2 lg:gap-x-0">
                    {situation.themes.map((theme, index) => (
                      <li
                        className="border-t border-hairline pt-4 sm:pr-6 lg:border-t-0 lg:pt-0"
                        key={theme}
                      >
                        <span
                          aria-hidden="true"
                          className={`text-numeral block font-bold ${
                            index === situation.themes.length - 1
                              ? "text-violet"
                              : "text-sand-line"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-title-sm mt-2 block font-semibold">
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
        </Section>

        {/* The answer has been given, so now the offer may come. Not before it.
            The band does not say "plan een intakegesprek": this page cannot
            name a coach, so the first real step is the city (commit 7013373). */}
        <CtaBand
          accent="Dat hoor je in het intakegesprek."
          primary={{ href: "#contact", label: "Begin met een gesprek" }}
          secondary={{
            href: "/studiekeuzetraject",
            label: "Lees hoe het traject werkt",
          }}
          text="In het intakegesprek vertel je wat er speelt, en horen we of dit traject bij je past. Het kost je niets en je zegt daarna gewoon nee als het niet klopt."
          title="Twijfel je of dit bij je past?"
        />

        <ReadAlso articles={related} />

        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
