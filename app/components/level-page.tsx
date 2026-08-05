import Link from "next/link";
import { getArticle, headingId } from "@/app/articles";
import { ContactSection } from "@/app/components/contact-section";
import { ReadAlso } from "@/app/components/read-also";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader, type NavItem } from "@/app/components/site-header";
import { type Level, levelThemes } from "@/app/levels";
import { button, linkOnOchre, linkOnPaper, readingRow, shell } from "@/app/shell";

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
 * The shape is the site's shape: ochre poster with an index, reading rows on
 * paper, the doors and the invitation on ochre, then "Lees ook" and the form.
 */
export function LevelPage({ level }: { level: Level }) {
  const related = level.related
    .map((slug) => getArticle(slug))
    .filter((article) => article !== undefined);

  const nav: NavItem[] = [
    { href: "/studiekeuzetraject", label: "Het traject" },
    { href: "/locaties", label: "Locaties" },
    { href: "/artikelen", label: "Artikelen" },
    { href: "#contact", label: "Contact" },
  ];

  const jumps: NavItem[] = [
    ...level.sections.map((section) => ({
      href: `#${headingId(section.title)}`,
      label: section.title,
    })),
    { href: "#gesprekken", label: "Hoe het traject werkt" },
    { href: "#situaties", label: "Waar sta jij nu?" },
    { href: "#contact", label: "Gratis intakegesprek" },
  ];

  return (
    <>
      <SiteHeader homeHref="/" nav={nav} />

      <main id="top">
        <section className="bg-ochre text-ink">
          <div className={`${shell} pb-20 md:pb-28`}>
            <p className="text-eyebrow pt-16 uppercase sm:pt-24">
              {level.eyebrow}
            </p>

            {/* The old h1, word for word, in two voices. Display size is built
                for one or two words, and the word that separates this page from
                the other two is the level. So the level gets the poster type and
                the rest of the sentence stays a sentence. */}
            <h1 className="mt-5">
              {/* The trailing space is not decoration: without it a screen
                  reader reads "studiekeuzembo" as one word. */}
              <span className="text-title block font-medium">
                {level.titleLead}{" "}
              </span>
              <span className="text-display mt-1 block font-extrabold">
                {level.titleLevel}
              </span>
            </h1>

            <div className="mt-12 grid items-start gap-x-16 gap-y-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
              <div className="flex flex-col items-start gap-6">
                <p className="text-lead max-w-[52ch]">{level.lead}</p>

                <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a className={button} href="#contact">
                    Plan een gratis intakegesprek
                  </a>
                  <a className={linkOnOchre} href="#situaties">
                    Eerst lezen waar je staat
                  </a>
                </div>
              </div>

              {/* Overview before detail. A requirement for one of the named user
                  groups, and the way a parent finds the answer fast. */}
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

        {/* The answer to the search question, and nothing sold yet. */}
        <section className="bg-paper">
          <div className={`${shell} pt-4 pb-10 md:pt-8 md:pb-14`}>
            {level.sections.map((section) => (
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

            {/* The four themes as the old page listed them: names only. The
                descriptions live on the traject page, and they stay there.
                A wider band than the rows above it, because it closes the
                reading zone and opens the part where we ask something. */}
            <div
              className={`${readingRow} border-t border-b border-hairline py-16 md:py-24`}
              id="gesprekken"
            >
              <h2 className="text-section scroll-mt-8 font-extrabold">
                Hoe werkt het traject?
              </h2>
              <div className="flex flex-col gap-6">
                <p className="max-w-[62ch]">{level.themesIntro}</p>
                <ol className="grid gap-x-16 gap-y-4 sm:grid-cols-2">
                  {levelThemes.map((theme, index) => (
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

        {/* The two doors of the old page. They are a fork in the road, not a
            product range, so they are two rows on a rule and not two cards with
            an icon: one reader belongs in the first row and one in the second,
            and a row you can read in one line is easier to sort yourself into. */}
        <section className="bg-ochre text-ink" id="situaties">
          <div className={`${shell} pt-20 md:pt-28`}>
            <h2 className="text-section max-w-[14ch] font-extrabold">
              Waar sta jij nu?
            </h2>
            <ul className="mt-10 border-b border-ochre-line md:mt-14">
              {level.doors.map((door) => (
                <li
                  className={`${readingRow} border-t border-ochre-line py-10 md:py-14`}
                  key={door.href}
                >
                  <h3 className="text-title font-bold">
                    <Link className={linkOnOchre} href={door.href}>
                      {door.label}
                    </Link>
                  </h3>
                  <p className="max-w-[58ch]">{door.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The answer has been given, so now the offer may come. Not before it. */}
        <section className="bg-ochre text-ink">
          <div className={`${shell} pt-14 pb-20 md:pt-20 md:pb-28`}>
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
              <h2 className="text-section max-w-[16ch] font-extrabold">
                Plan een gratis en vrijblijvend intakegesprek
              </h2>
              <div className="flex flex-col items-start gap-8">
                <p className="text-lead max-w-[52ch]">{level.invitation}</p>
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

      <SiteFooter pageLinks={jumps} />
    </>
  );
}
