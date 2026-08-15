import type { MetadataRoute } from "next";
import { canonicalOrigin } from "@/app/sitemap";

/**
 * /robots.txt. It opens the whole site and it names the sitemap.
 *
 * WHY EVERYTHING IS ALLOWED. Every page here is written to be found: the 37
 * city pages and the 63 articles are what the purchase paid for. There is no
 * account area, no basket and no admin path to keep out. So there is one rule,
 * it holds for every crawler, and it allows every path. A `Disallow` line goes
 * in the day a path exists that must stay private, and not one day earlier.
 *
 * WHY THE SITEMAP LINE MATTERS MOST. A crawler reads /robots.txt first, before
 * any page. The `Sitemap:` line is the only place where a crawler that has
 * never seen this site learns that a full list of addresses exists. It is what
 * carries the twenty new URLs to Google in the week the old site goes offline.
 * The URL must be absolute, so it takes the host from app/sitemap.ts, which
 * holds the single copy of it in these two files.
 *
 * The AI crawlers are not blocked either. That is a decision, not an oversight:
 * a person who asks a chat assistant which studies exist is the same person who
 * types the question into Google, and the answer we want them to find is ours.
 * Revisit it if it ever costs us a visit instead of bringing one.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${canonicalOrigin}/sitemap.xml`,
  };
}
