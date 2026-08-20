import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * The articles. To add one, write content/artikelen/<slug>.mdx and add a line
 * to the list below. The slug is the URL, and the URL is what ranks, so it must
 * stay exactly the same as on the old site.
 *
 * The text lives in the .mdx file. Everything a page needs to know *about* the
 * text lives here, in one typed list. That keeps the hub cheap: it reads this
 * file, not 63 compiled articles.
 *
 * See PRODUCT.md, "Inherited Content and Open Questions". Only three of the 63
 * archived articles are here. Which of the rest to keep is a decision that needs
 * Search Console data, and that data disappears with the seller's tenant.
 */

/** Used to pick the "Lees ook" articles. Not shown to the reader. */
export type Topic = "aanmelden" | "stoppen" | "kiezen" | "geld";

export type Article = {
  slug: string;
  /** The h1, and the link text in a list. Written for a person. */
  title: string;
  /** The <title>. Kept word for word from the old site, because it is what ranks. */
  seoTitle: string;
  description: string;
  /** ISO date. The only signature an article carries: we have no author yet. */
  published: string;
  topic: Topic;
};

const all: Article[] = [
  {
    slug: "artikel-aanmelden-studies",
    title: "Inschrijven voor je opleiding",
    seoTitle: "Studiekeuze gemaakt? | Inschrijven voor 1 mei | StudieKeuzeAdvies",
    description:
      "Je studiekeuze is rond. Nu de inschrijving. Waar meld je je aan, welke deadline geldt voor jou, en wanneer heb je recht op toelating?",
    published: "2025-10-29",
    topic: "aanmelden",
  },
  {
    slug: "de-1-februariregeling",
    title: "De 1-februariregeling",
    seoTitle: "De 1-februariregeling | Stoppen voor 1 februari | StudieKeuzeAdvies",
    description:
      "Stop je in je eerste jaar voor 1 februari, dan hoef je je studiefinanciering en je reisproduct niet terug te betalen. Zo werkt de regeling.",
    published: "2025-02-08",
    topic: "stoppen",
  },
  {
    slug: "gestopt-met-je-studie-blijf-niet-stilzitten",
    title: "Gestopt met je studie? Blijf niet stilzitten",
    seoTitle: "Gestopt met je studie? Blijf niet stilzitten! | StudieKeuzeAdvies",
    description:
      "Je bent gestopt en het jaar is nog lang. Wat je nu doet, bepaalt of je volgende keuze wel klopt. Vier dingen die je meteen kunt oppakken.",
    published: "2015-10-14",
    topic: "stoppen",
  },
];

/** Newest first. The hub reads this order, and so does the "Lees ook" fallback. */
export const articles: Article[] = [...all].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/**
 * Two articles under the running text. First one that shares the topic, then the
 * newest, so a reader who wants more always finds something. Returns fewer than
 * `limit` only when there are not enough articles, and the band hides itself then.
 */
export function relatedArticles(slug: string, limit = 2): Article[] {
  const current = getArticle(slug);
  if (!current) return [];

  const others = articles.filter((article) => article.slug !== slug);
  const sameTopic = others.filter((article) => article.topic === current.topic);
  const rest = others.filter((article) => article.topic !== current.topic);

  return [...sameTopic, ...rest].slice(0, limit);
}

export type Section = { id: string; label: string };

/**
 * The id of a heading. The same function makes the id in the running text
 * (see mdx-components.tsx) and the id in the index, so the two can never drift.
 */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * The h2 headings of an article, read from the .mdx source at build time. This
 * is what the index in the header and the index in the margin are made of.
 *
 * Reading the file beats writing the list by hand a second time: a heading and
 * its index entry cannot disagree if only one of them exists.
 */
export function articleSections(slug: string): Section[] {
  const file = path.join(process.cwd(), "content", "artikelen", `${slug}.mdx`);
  const source = readFileSync(file, "utf8");

  const sections: Section[] = [];
  for (const line of source.split("\n")) {
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const label = match[1].replace(/\*\*/g, "").trim();
    sections.push({ id: headingId(label), label });
  }
  return sections;
}

const months = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];

/** "2025-10-29" becomes "29 oktober 2025". Written out, not Intl: same result on every machine. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}
