import type { MetadataRoute } from "next";
import { articles } from "@/app/articles";
import { cities } from "@/app/cities";
import { coaches } from "@/app/coaches";
import { legacyRedirects } from "@/app/redirects";
import { showSamenwerken } from "@/app/site-config";

/**
 * The list of addresses this site wants indexed, served at /sitemap.xml.
 *
 * WHY IT EXISTS. The domain, the content and the rankings were bought, and the
 * old WordPress site goes offline in September 2026. From that day 346 old
 * addresses answer with a 308 (app/redirects.ts) and twenty new ones answer
 * with a 200. Google finds the 308 by itself: it already knows the old address
 * and it comes back to check. It does not know the new addresses at all. This
 * file is the list of the new ones, and app/robots.ts points every crawler at
 * it. Without it the whole move depends on crawling in the one week the old
 * site disappears.
 *
 * WHAT MAY STAND IN IT. Only a path that answers 200 today. A path that
 * redirects is a contradiction: this file says "index this", the server says
 * "go elsewhere", and the crawler believes the server and trusts the file less.
 * So the list is built from the code that makes the pages, and `check()` holds
 * it against the redirect table before it is returned.
 *
 * WHAT IS DELIBERATELY MISSING. No `lastModified`, no `changeFrequency` and no
 * `priority`. All three are optional, and we can prove none of them. The pages
 * are new, the texts behind them come from an archive of 2014 to 2026, and a
 * date per page would be a guess. PRODUCT.md principle 5 says: where the proof
 * is missing, say less. Google ignores `changefreq` and `priority` anyway, and
 * it ignores a `lastmod` as soon as one value turns out to be wrong, so a
 * guessed date costs trust and buys nothing. Add a date the day the code can
 * read a real one, per page, from the content.
 */

/**
 * The one host of this site, and the only place in these two files where it is
 * written. app/robots.ts imports it from here.
 *
 * It repeats the `metadataBase` of app/layout.tsx and the `CANONICAL_HOST` of
 * next.config.ts, which is one place too many. The value is settled and
 * measured (see the comment on `metadataBase`), so the repetition is safe for
 * now. The fix belongs in app/site-config.ts: export the origin there and let
 * the layout, the config and this file read it. That file is owned elsewhere.
 */
export const canonicalOrigin = "https://www.studiekeuzeadvies.nl";

/**
 * The pages with a folder of their own under app/. Next has no API that lists
 * its own routes at build time, so this list is written by hand and every entry
 * carries a canonical tag in its page.tsx that says the same path. Add a page,
 * add a line. If a line ever names a path that no longer exists, the URL turns
 * into a 404 in the sitemap, which is why the list stays short and near the
 * routes it describes.
 *
 * The order is the order a reader meets the pages: the front door, the offer,
 * the four situations, the levels, the people, the proof, the questions, and
 * then the two hubs that carry the pages generated below.
 *
 * /samenwerken IS DELIBERATELY NOT IN THIS LIST WHILE IT IS OFF. The client
 * asked for the page and asked for it to be switched off at launch (row H16),
 * and `showSamenwerken` in app/site-config.ts is that switch: it makes the
 * route answer 404, so a line here would be a sitemap entry for a 404. It is
 * added by the spread below the moment the flag is turned on.
 */
const staticPaths = [
  "/",
  "/studiekeuzetraject",
  "/voor-wie",
  "/tarieven",
  "/eerste-studiekeuze",
  "/verkeerde-studiekeuze",
  "/studiekeuze-met-add-adhd",
  "/mbo-opleiding-kiezen",
  "/hbo-opleiding-kiezen",
  "/wo-opleiding-kiezen",
  "/studiekeuzecoaches",
  "/ervaringen",
  "/veelgestelde-vragen",
  "/locaties",
  "/artikelen",
  "/over-ons",
  "/coach-worden",
  // The four pages the client's mail asked for. See app/central.ts.
  "/contact",
  "/studiekeuzescan",
  "/online-begeleiding",
  ...(showSamenwerken ? ["/samenwerken"] : []),
];

/**
 * Every path the site answers with a 200 AND wants indexed. The city pages, the
 * coach profiles and the articles are read from the same lists that
 * `generateStaticParams` reads, so a city, a coach or an article can never be
 * in the sitemap without a page, or on the site without a line in the sitemap.
 *
 * A stand-in coach is the one exception, and it is not an exception to the rule
 * above but to the second half of the sentence. `app/studiekeuzecoaches/[coach]/
 * page.tsx` gives a coach with `isPlaceholder: true` a `robots: { index: false }`
 * tag, because that person does not exist. A sitemap line for a noindex page is
 * the same contradiction as a sitemap line for a redirect: the file says "index
 * this" and the page says "do not". So the roster is filtered here, and the day
 * a stand-in becomes a real coach the line appears by itself.
 *
 * A city page whose coach is a stand-in is the same page in another shape: it
 * prints that person's name, photo and intake button. It is filtered on the
 * same field, and for the same reason. A city with no coach at all is honest
 * about it in its own copy, so that one stays in.
 */
function allPaths(): string[] {
  return [
    ...staticPaths,
    ...coaches
      .filter((coach) => !coach.isPlaceholder)
      .map((coach) => `/studiekeuzecoaches/${coach.slug}`),
    ...cities
      .filter((city) => !city.coach?.isPlaceholder)
      .map((city) => `/locaties/${city.slug}`),
    ...articles.map((article) => `/${article.slug}`),
  ];
}

const redirectSources = new Set(legacyRedirects.map(({ source }) => source));

/**
 * The two mistakes this file can make, both caught at build time.
 *
 * A path that is also a redirect source is worse than a bad sitemap line: the
 * redirect in next.config.ts answers before the router does, so that page is
 * unreachable for every visitor as well. Stopping the build is the right answer
 * to it, because a deploy that ships an unreachable page is a deploy that
 * quietly loses a ranking.
 *
 * A path that appears twice means two routes claim the same address, for
 * example an article whose slug is also the name of a folder under app/. Next
 * gives the static route priority and the article disappears without a word.
 */
function check(paths: string[]): string[] {
  const seen = new Set<string>();

  for (const path of paths) {
    if (redirectSources.has(path)) {
      throw new Error(
        `sitemap: ${path} is a redirect source in app/redirects.ts, so it can never answer 200. Remove the row from docs/url-map.csv and run scripts/build-url-map.py, or take the page out of the sitemap.`,
      );
    }
    if (seen.has(path)) {
      throw new Error(
        `sitemap: ${path} is claimed twice. Two routes cannot share one address.`,
      );
    }
    seen.add(path);
  }

  return paths;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // `new URL(path, origin)` is the same resolution Next uses for a canonical
  // tag, so the sitemap and the canonical of a page always print the same
  // string, down to the closing slash of the home page.
  return check(allPaths()).map((path) => ({
    url: new URL(path, canonicalOrigin).toString(),
  }));
}
