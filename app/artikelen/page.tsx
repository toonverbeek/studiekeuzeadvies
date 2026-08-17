import type { Metadata } from "next";
import Link from "next/link";
import { articles, formatDate, yearOf } from "@/app/articles";
import { ContactSection } from "@/app/components/contact-section";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader, type NavItem } from "@/app/components/site-header";
import { linkOnOchre, shell } from "@/app/shell";

/**
 * The hub the old site never had. Its 63 articles had no index page, no link in
 * the menu, and one inbound link each: they were orphans, and Google treats an
 * orphan as a page nobody stands behind. This page is the fix.
 */
export const metadata: Metadata = {
  title: "Artikelen over studiekeuze | StudieKeuzeAdvies",
  description:
    "Antwoorden op de vragen die je stelt als je moet kiezen: deadlines, inschrijven, stoppen en opnieuw beginnen. Geschreven door studiekeuzecoaches.",
  alternates: { canonical: "/artikelen" },
};

const nav: NavItem[] = [
  { href: "/studiekeuzetraject", label: "Het traject" },
  { href: "/locaties", label: "Locaties" },
  { href: "#contact", label: "Contact" },
];

export default function ArtikelenPage() {
  // Grouped by year, newest first. The year is not decoration: an article from
  // 2015 and one from 2025 are not equally true, and the reader may see that.
  const years = [...new Set(articles.map((article) => yearOf(article.published)))];

  return (
    <>
      <SiteHeader homeHref="/" nav={nav} />

      <main id="top">
        <section className="bg-ochre text-ink">
          <div className={`${shell} pt-14 pb-16 sm:pt-20 md:pb-20`}>
            <p className="text-eyebrow uppercase">Artikelen</p>

            <h1 className="text-headline mt-5 max-w-[18ch] font-extrabold">
              Antwoorden op de vragen die je nu hebt
            </h1>

            <p className="text-lead mt-8 max-w-[54ch]">
              Deadlines, inschrijven, stoppen, opnieuw beginnen. Elk artikel
              beantwoordt één vraag, helemaal en gratis. Kom je er daarna nog
              niet uit, dan{" "}
              <Link className={linkOnOchre} href="/studiekeuzetraject">
                doe je het samen met een coach
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="bg-paper">
          <div className={`${shell} py-14 md:py-20`}>
            {articles.length === 0 ? (
              <p className="text-lead max-w-[54ch]">
                Hier komen de artikelen te staan. Nu is er nog niets te lezen.
              </p>
            ) : (
              years.map((year) => (
                <section className="mb-14 last:mb-0 md:mb-20" key={year}>
                  <h2
                    className="text-eyebrow scroll-mt-8 uppercase text-ink-soft"
                    id={`jaar-${year}`}
                  >
                    {year}
                  </h2>

                  <ul className="mt-6 border-b border-hairline">
                    {articles
                      .filter((article) => yearOf(article.published) === year)
                      .map((article) => (
                        <li
                          className="border-t border-hairline"
                          key={article.slug}
                        >
                          {/* The whole row is the link, so a thumb finds it. */}
                          <Link
                            className="group grid gap-x-16 gap-y-3 py-8 md:py-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]"
                            href={`/${article.slug}`}
                          >
                            <div className="text-ink-soft">
                              <time dateTime={article.published}>
                                {formatDate(article.published)}
                              </time>
                            </div>

                            {/* A real heading, under the year. A reader who
                                moves through this page by heading gets the
                                titles, not a wall of undifferentiated links. */}
                            <div className="flex flex-col gap-3">
                              <h3 className="text-title max-w-[26ch] font-bold underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors duration-150 ease-out-quart group-hover:decoration-ink">
                                {article.title}
                              </h3>
                              <p className="max-w-[62ch] text-ink-soft">
                                {article.description}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </section>
              ))
            )}
          </div>
        </section>

        <ContactSection />
      </main>

      {/* The years, so the column under "Op deze pagina" really is this page.
          With 63 articles this becomes the fastest way back to an old year. */}
      <SiteFooter
        pageLinks={[
          ...years.map((year) => ({ href: `#jaar-${year}`, label: year })),
          { href: "#contact", label: "Begin met een gesprek" },
        ]}
      />
    </>
  );
}
