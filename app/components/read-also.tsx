import type { Article } from "@/app/articles";
import { ArticleCard } from "./article-card";
import { Button, Container, Section } from "./ui";

/**
 * The other exit. For the reader who has the answer but is not ready to ask
 * anything yet. It disappears when there is nothing to point at, instead of
 * showing an empty box.
 *
 * Two article cards (design spec 3.18), the same shape as the hub, under the
 * same heavy rule. Used by an article, by both situation pages and by the
 * three level pages.
 */
export function ReadAlso({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <Section space="sm">
      <Container>
        <div className="border-t-[1.5px] border-ink pt-8">
          <h2 className="text-title-lg font-bold">Lees ook</h2>

          <ul className="mt-6 grid gap-[22px] md:grid-cols-2">
            {articles.map((article) => (
              <li className="flex" key={article.slug}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>

          <p className="mt-8">
            <Button href="/artikelen" variant="ghost">
              Alle artikelen →
            </Button>
          </p>
        </div>
      </Container>
    </Section>
  );
}
