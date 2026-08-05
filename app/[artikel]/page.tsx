import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  articleSections,
  articles,
  formatDate,
  getArticle,
  relatedArticles,
} from "@/app/articles";
import { ArticleIndex } from "@/app/components/article-index";
import { ContactSection } from "@/app/components/contact-section";
import { ReadAlso } from "@/app/components/read-also";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader, type NavItem } from "@/app/components/site-header";
import { button, linkOnOchre, shell } from "@/app/shell";

/**
 * An article, at the URL it had on the old site. The rankings are attached to
 * that URL, so the slug sits at the root and not under /artikelen/. See
 * PRODUCT.md: losing the rankings loses the business.
 *
 * This route is the last one Next tries, so /locaties and /studiekeuzetraject
 * still win. Every other unknown path is a real 404, because dynamicParams is
 * off and the list of articles is complete at build time.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ artikel: article.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[artikel]">,
): Promise<Metadata> {
  const { artikel } = await props.params;
  const article = getArticle(artikel);
  if (!article) return {};

  return {
    // The old title, word for word. The title is what ranks.
    title: article.seoTitle,
    description: article.description,
    alternates: { canonical: `/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.seoTitle,
      description: article.description,
      publishedTime: article.published,
    },
  };
}

const nav: NavItem[] = [
  { href: "/studiekeuzetraject", label: "Het traject" },
  { href: "/artikelen", label: "Artikelen" },
  { href: "/locaties", label: "Locaties" },
  { href: "#contact", label: "Contact" },
];

export default async function ArticlePage(props: PageProps<"/[artikel]">) {
  const { artikel } = await props.params;
  const article = getArticle(artikel);
  if (!article) notFound();

  const { default: Body } = await import(`@/content/artikelen/${artikel}.mdx`);
  const sections = articleSections(article.slug);
  const related = relatedArticles(article.slug);

  // One heading is not an overview, it is a heading. The indexes appear from
  // two sections up, and the reading column takes the whole width without them.
  const hasIndex = sections.length >= 2;

  return (
    <>
      <SiteHeader homeHref="/" nav={nav} />

      <main id="top">
        <article>
          {/* The masthead. Label, title, date, and the map of the page. Nothing
              else: the lead belongs in the reading room, on paper. */}
          <header className="bg-ochre text-ink">
            <div className={`${shell} pt-14 pb-10 sm:pt-20 md:pb-12`}>
              <p className="text-eyebrow uppercase">
                <Link
                  className="underline decoration-ink/30 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink"
                  href="/artikelen"
                >
                  Artikelen
                </Link>
              </p>

              <h1 className="text-headline mt-5 max-w-[16ch] font-extrabold">
                {article.title}
              </h1>

              {/* 80 percent, not 70: on ochre, ink/70 measures 4.44:1 and the
                  floor is 4.5. text-ink-soft is worse here, at 4.18. */}
              <p className="mt-6 text-ink/80">
                <time dateTime={article.published}>
                  {formatDate(article.published)}
                </time>
              </p>

              {hasIndex && (
                <nav
                  aria-label="Naar een deel van dit artikel"
                  className="mt-8 border-t border-ochre-line pt-6"
                >
                  <ul className="flex flex-wrap gap-x-8 gap-y-3">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a className={linkOnOchre} href={`#${section.id}`}>
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </header>

          {/* The reading room. Warm ink on warm paper, one column, 68 characters
              wide, with the index sitting quietly in the margin beside it. */}
          <div className="bg-paper">
            <div
              /* The rail is narrow at 1024 and full width from 1280 up. At one
                 fixed 20rem the reading column falls to 52 characters on a
                 small laptop, and the measure matters more than the rhythm. */
              className={`${shell} grid gap-x-16 gap-y-10 py-14 md:py-20 ${
                hasIndex
                  ? "lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-x-10 xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:gap-x-16"
                  : ""
              }`}
            >
              {hasIndex && (
                <div className="hidden lg:block">
                  <ArticleIndex sections={sections} />
                </div>
              )}

              <div className="max-w-[68ch]">
                <Body />
              </div>
            </div>
          </div>
        </article>

        {/* The answer has been given, so now the offer may come. Not before it. */}
        <section className="bg-ochre text-ink">
          <div className={`${shell} py-16 md:py-20`}>
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
              <h2 className="text-title max-w-[18ch] font-bold">
                Kom je er zelf niet uit?
              </h2>
              <div className="flex flex-col items-start gap-8">
                <p className="max-w-[54ch]">
                  Dat is niet gek. Je kunt het ook samen doen: vier gesprekken
                  met een vaste coach bij jou in de buurt. Het eerste gesprek is
                  gratis en verplicht je tot niets.
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a className={button} href="#contact">
                    Plan een gratis intakegesprek
                  </a>
                  <Link className={linkOnOchre} href="/studiekeuzetraject">
                    Eerst lezen hoe het traject werkt
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReadAlso articles={related} />

        <ContactSection />
      </main>

      {/* The footer column is headed "Op deze pagina", so it carries this
          page's own sections: a second chance at the index for a reader who
          has scrolled past the one at the top. */}
      <SiteFooter
        pageLinks={[
          ...sections
            .slice(0, 4)
            .map((section) => ({ href: `#${section.id}`, label: section.label })),
          { href: "#contact", label: "Gratis intakegesprek" },
        ]}
      />
    </>
  );
}
