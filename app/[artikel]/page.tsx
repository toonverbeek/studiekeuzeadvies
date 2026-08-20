import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  articleSections,
  articles,
  formatDate,
  getArticle,
  relatedArticles,
  type Topic,
} from "@/app/articles";
import { ArticleIndex } from "@/app/components/article-index";
import { ContactSection } from "@/app/components/contact-section";
import { ReadAlso } from "@/app/components/read-also";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Container,
  linkOnSoft,
  Pill,
  type PillTone,
  Section,
} from "@/app/components/ui";

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

/** The same four tags the cards on /artikelen carry (app/components/article-card). */
const topicTag: Record<Topic, { label: string; tone: PillTone }> = {
  aanmelden: { label: "Aanmelden", tone: "lavender" },
  stoppen: { label: "Stoppen", tone: "coral" },
  kiezen: { label: "Kiezen", tone: "lavender" },
  geld: { label: "Geld", tone: "amber" },
};

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

export default async function ArticlePage(props: PageProps<"/[artikel]">) {
  const { artikel } = await props.params;
  const article = getArticle(artikel);
  if (!article) notFound();

  const { default: Body } = await import(`@/content/artikelen/${artikel}.mdx`);
  const sections = articleSections(article.slug);
  const related = relatedArticles(article.slug);
  const tag = topicTag[article.topic];

  // One heading is not an overview, it is a heading. The index appears from
  // two sections up, and the reading column takes the whole width without it.
  const hasIndex = sections.length >= 2;

  return (
    <>
      <SiteHeader />

      <main id="top">
        <article>
          {/* The masthead (design spec 3.18 + 6.2): the way back, the tag and
              the date on one line, and the title. Nothing else: the lead
              belongs in the reading room, under the rule. */}
          <header className="pt-12 pb-8 lg:pt-18 lg:pb-10">
            <Container>
              {/* A back link, not an eyebrow. As an eyebrow it made a second
                  label row above the masthead, and the client's article
                  pattern (design-spec 3.18) has one: the tag and the date.
                  Same shape as "← Alle coaches" on a coach page. */}
              <Link
                className="text-small mb-6 inline-flex min-h-11 items-center font-semibold text-violet hover:text-violet-dark"
                href="/artikelen"
              >
                ← Alle artikelen
              </Link>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Pill size="sm" tone={tag.tone}>
                  {tag.label}
                </Pill>
                <time
                  className="font-mono text-micro font-medium text-muted"
                  dateTime={article.published}
                >
                  {formatDate(article.published)}
                </time>
              </div>

              <h1 className="text-h1 mt-4 max-w-[16ch] font-bold">
                {article.title}
              </h1>

              {/* The margin index cannot follow a narrow screen, and the reader
                  who needs the overview most is on one (PRODUCT.md, ADD and
                  ADHD). Below lg the same sections become a row of pills, the
                  shape design spec 6.2 gives the index of every other page. */}
              {hasIndex && (
                <nav
                  aria-label="Naar een deel van dit artikel"
                  className="mt-7 lg:hidden"
                >
                  <ul className="flex flex-wrap gap-2">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          className="text-small inline-flex min-h-11 items-center rounded-full bg-lavender px-4.5 py-2 font-bold text-violet-dark transition-colors duration-150 ease-out-quart hover:bg-violet hover:text-paper"
                          href={`#${section.id}`}
                        >
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </Container>
          </header>

          {/* The reading room. Ink on warm paper, one column, 68 characters
              wide, with the index sitting quietly in the margin beside it. */}
          <Container>
            <div
              /* The rail is narrow at 1024 and full width from 1280 up. At one
                 fixed 20rem the reading column falls to 52 characters on a
                 small laptop, and the measure matters more than the rhythm. */
              className={`grid gap-x-16 gap-y-10 border-t-[1.5px] border-ink pt-10 pb-14 md:pb-20 ${
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

              <div className="text-read max-w-read text-muted-read">
                <Body />
              </div>
            </div>
          </Container>
        </article>

        {/* The answer has been given, so now the offer may come. Not before it.
            The client's lavender strip (design spec 3.14, tarieven variant). */}
        <Section space="sm">
          <Container>
            <div className="rounded-card bg-lavender p-7 sm:px-11 sm:py-10 lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-8">
              <div>
                <h2 className="text-title-lg font-bold">
                  Kom je er zelf niet uit?
                </h2>
                <p className="text-card mt-2.5 max-w-[56ch] text-muted">
                  Dat is niet gek. Je kunt het ook samen doen: vier gesprekken
                  met een vaste coach bij jou in de buurt. Het eerste gesprek is
                  gratis en verplicht je tot niets.
                </p>
              </div>

              <div className="mt-7 flex flex-col items-start gap-4 lg:mt-0 lg:items-end">
                <Button
                  className="max-[420px]:w-full"
                  href="#contact"
                  size="lg"
                >
                  Begin met een gesprek
                </Button>
                <Link className={linkOnSoft} href="/studiekeuzetraject">
                  Eerst lezen hoe het traject werkt
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        <ReadAlso articles={related} />

        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
