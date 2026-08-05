import Link from "next/link";
import { type Article, formatDate } from "@/app/articles";
import { linkOnPaper, shell } from "@/app/shell";

/**
 * The other exit. For the reader who has the answer but is not ready to ask
 * anything yet. It disappears when there is nothing to point at, instead of
 * showing an empty box.
 *
 * Used by an article and by both situation pages.
 */
export function ReadAlso({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-paper-shade">
      <div className={`${shell} py-16 md:py-20`}>
        <h2 className="text-eyebrow uppercase text-ink-soft">Lees ook</h2>

        <ul className="mt-8 border-b border-hairline">
          {articles.map((article) => (
            <li className="border-t border-hairline" key={article.slug}>
              {/* The whole row is the link, so a thumb finds it. */}
              <Link
                className="group grid gap-x-16 gap-y-2 py-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-baseline"
                href={`/${article.slug}`}
              >
                <div className="text-ink-soft">
                  <time dateTime={article.published}>
                    {formatDate(article.published)}
                  </time>
                </div>
                <h3 className="text-title max-w-[24ch] font-bold underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors duration-150 ease-out-quart group-hover:decoration-ink">
                  {article.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8">
          <Link className={linkOnPaper} href="/artikelen">
            Alle artikelen
          </Link>
        </p>
      </div>
    </section>
  );
}
