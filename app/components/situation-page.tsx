import Link from "next/link";
import { getArticle, headingId } from "@/app/articles";
import { ContactSection } from "@/app/components/contact-section";
import { ReadAlso } from "@/app/components/read-also";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader, type NavItem } from "@/app/components/site-header";
import { button, linkOnOchre, linkOnPaper, readingRow, shell } from "@/app/shell";
import type { Situation } from "@/app/situations";

/**
 * The template behind /eerste-studiekeuze and /verkeerde-studiekeuze.
 *
 * Two root dynamic segments cannot live next to each other, so these are real
 * folders and not one [situatie] route. A static route also wins over
 * app/[artikel], which is what keeps both URLs working.
 *
 * The shape is the traject page's shape on purpose: ochre poster with an index,
 * reading rows on paper, then the invitation and the form. The words differ per
 * page; the skeleton does not.
 */
export function SituationPage({ situation }: { situation: Situation }) {
  const related = situation.related
    .map((slug) => getArticle(slug))
    .filter((article) => article !== undefined);

  const other = situation.slug === "eerste-studiekeuze"
    ? { href: "/verkeerde-studiekeuze", label: "Ik ben al eens gestopt" }
    : { href: "/eerste-studiekeuze", label: "Ik kies voor het eerst" };

  const nav: NavItem[] = [
    { href: "/studiekeuzetraject", label: "Het traject" },
    { href: "/locaties", label: "Locaties" },
    { href: "/artikelen", label: "Artikelen" },
    { href: "#contact", label: "Contact" },
  ];

  const jumps: NavItem[] = [
    ...situation.sections.map((section) => ({
      href: `#${headingId(section.title)}`,
      label: section.title,
    })),
    { href: "#gesprekken", label: "De vier gesprekken" },
    { href: "#contact", label: "Gratis intakegesprek" },
  ];

  return (
    <>
      <SiteHeader homeHref="/" nav={nav} />

      <main id="top">
        <section className="bg-ochre text-ink">
          <div className={`${shell} pb-20 md:pb-28`}>
            <p className="text-eyebrow pt-16 uppercase sm:pt-24">
              {situation.eyebrow}
            </p>

            {/* Two words. That is what the display size is built for, and it is
                the h1 of the old page, word for word. */}
            <h1 className="text-display mt-5 max-w-[12ch] font-extrabold">
              {situation.title}
            </h1>

            <div className="mt-12 grid items-start gap-x-16 gap-y-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
              <div className="flex flex-col items-start gap-6">
                <p className="text-lead max-w-[52ch]">{situation.lead}</p>

                <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a className={button} href="#contact">
                    Plan een gratis intakegesprek
                  </a>
                  <Link className={linkOnOchre} href={other.href}>
                    {other.label}
                  </Link>
                </div>
              </div>

              {/* Overview before detail. A requirement for one of the named
                  user groups, and the way a parent finds the answer fast. */}
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

        <section className="bg-paper">
          <div className={`${shell} py-8 md:py-12`}>
            {situation.sections.map((section) => (
              <div
                className={`${readingRow} border-t border-hairline py-12 md:py-16`}
                id={headingId(section.title)}
                key={section.title}
              >
                <h2 className="text-section scroll-mt-8 font-extrabold">
                  {section.title}
                </h2>
                <div className="flex max-w-[62ch] flex-col gap-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* The four themes, as the old page listed them: names only. The
                descriptions live on the traject page, and they stay there. */}
            <div
              className={`${readingRow} border-t border-b border-hairline py-12 md:py-16`}
              id="gesprekken"
            >
              <h2 className="text-section scroll-mt-8 font-extrabold">
                Hoe ziet dit traject eruit?
              </h2>
              <div className="flex flex-col gap-6">
                <p className="max-w-[62ch]">{situation.themesIntro}</p>
                <ol className="grid gap-x-16 gap-y-4 sm:grid-cols-2">
                  {situation.themes.map((theme, index) => (
                    <li
                      className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 border-t border-hairline pt-4"
                      key={theme}
                    >
                      <span
                        aria-hidden="true"
                        className="text-title font-normal tabular-nums text-ochre-deep"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium">{theme}</span>
                    </li>
                  ))}
                </ol>
                <p className="max-w-[62ch]">
                  <Link className={linkOnPaper} href="/studiekeuzetraject">
                    Lees per gesprek wat je doet
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The answer has been given, so now the offer may come. Not before it. */}
        <section className="bg-ochre text-ink">
          <div className={`${shell} py-20 md:py-28`}>
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
              <h2 className="text-section max-w-[16ch] font-extrabold">
                Plan een gratis en vrijblijvend intakegesprek
              </h2>
              <div className="flex flex-col items-start gap-8">
                <p className="text-lead max-w-[52ch]">
                  In het intakegesprek vertel je wat er speelt, en horen we of
                  dit traject bij je past. Het kost je niets en je zegt daarna
                  gewoon nee als het niet klopt.
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a className={button} href="#contact">
                    Plan een gratis intakegesprek
                  </a>
                  <Link className={linkOnOchre} href="/locaties">
                    Kies een locatie bij jou in de buurt
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReadAlso articles={related} />

        <ContactSection />
      </main>

      <SiteFooter
        pageLinks={[
          ...situation.sections.map((section) => ({
            href: `#${headingId(section.title)}`,
            label: section.title,
          })),
          { href: "#gesprekken", label: "De vier gesprekken" },
          { href: "#contact", label: "Gratis intakegesprek" },
        ]}
      />
    </>
  );
}
