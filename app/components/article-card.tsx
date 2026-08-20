import Link from "next/link";
import { type Article, formatDate, type Topic } from "@/app/articles";
import { Pill, type PillTone } from "./ui";

/**
 * One article as a card (design spec 3.18): a tag and a date on one line, the
 * title, the description, and the way in. The whole card is the link, so a
 * thumb finds it without aiming.
 *
 * The tag is the article's own `topic`. The client's export invents four
 * categories (Aanmelden, Regelingen, Open dagen, Keuzeproces) that no article
 * in this repo carries; `topic` is the field we really have, and printing it
 * costs nothing and says something true. See sharedNeeds: a real `category`
 * field on `app/articles.ts` would let the tag say more than four words.
 */
const topicTag: Record<Topic, { label: string; tone: PillTone }> = {
  aanmelden: { label: "Aanmelden", tone: "lavender" },
  stoppen: { label: "Stoppen", tone: "coral" },
  kiezen: { label: "Kiezen", tone: "lavender" },
  geld: { label: "Geld", tone: "amber" },
};

export function ArticleCard({
  article,
  headingLevel = "h3",
}: {
  article: Article;
  /** h2 on the hub, where the cards are the page; h3 under a "Lees ook" h2. */
  headingLevel?: "h2" | "h3";
}) {
  const tag = topicTag[article.topic];
  const Heading = headingLevel;

  return (
    <Link
      className="group hover-lift flex w-full flex-col gap-3 rounded-card-sm border border-hairline bg-white p-6 sm:p-8"
      href={`/${article.slug}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
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

      <Heading className="text-title-lg font-bold text-ink transition-colors duration-150 ease-out-quart group-hover:text-violet">
        {article.title}
      </Heading>

      <p className="text-card flex-1 text-muted">{article.description}</p>

      <span className="text-small font-bold text-violet">
        Lees artikel →
      </span>
    </Link>
  );
}
