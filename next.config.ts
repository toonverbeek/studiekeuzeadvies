import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import { legacyRedirects } from "./app/redirects";

// The canonical host is the www one. It is measured, not chosen. Counted over
// the whole archive (html, markdown and meta): 146356 links write
// https://www.studiekeuzeadvies.nl, 18 write the http www form, and none write
// the bare host. Every link the old site ever printed carries the www, so the
// www is what the search engines know. docs/redirects.md holds the command.
//
// This rule belongs on the Vercel domain configuration as well, and there it is
// the one that counts: both domains have to be attached to the project anyway,
// and Vercel answers before the app runs, so the redirect costs no function call
// and it also covers the requests the app never sees. The rule below is the
// safety net that travels with the code, so a preview, a self hosted build or a
// new hosting provider keeps the same canonical host. See docs/redirects.md.
const CANONICAL_HOST = "www.studiekeuzeadvies.nl";

// A `has` host value is read as a regular expression, anchored at both ends by
// Next itself. The dot is escaped so it means a dot, and the anchoring is what
// keeps this rule from matching www.studiekeuzeadvies.nl and looping forever.
const BARE_HOST = "studiekeuzeadvies\\.nl";

const nextConfig: NextConfig = {
  // The articles are .mdx files under content/artikelen/. app/[artikel]/page.tsx
  // imports them by slug, so they are never routed by their own filename. This
  // setting only teaches the compiler that .mdx is a module it can import.
  pageExtensions: ["ts", "tsx", "mdx"],

  // The old WordPress site goes offline in September 2026. On that day every old
  // address must land somewhere correct, or the rankings that were bought are
  // lost. app/redirects.ts holds the table, all 346 rows of it, generated from
  // docs/url-map.csv by scripts/build-url-map.py. It is data, so it lives in its
  // own file; this config only says what to do with it.
  //
  // Every row is permanent, so Next answers 308 and a search engine moves the
  // ranking to the new address. The sources carry no trailing slash on purpose:
  // Next normalises `/oude-pagina/` to `/oude-pagina` with its own 308 before it
  // reads this table. app/redirects.ts explains that at more length.
  async redirects() {
    return [
      {
        // The source is `/:path(.*)` and not `/:path*`. Next matches a source
        // in strict mode, and `/:path*` does not match `/` at all: the bare
        // host home page, which is the one address a person types by hand,
        // would be the only page that never reached the www. `(.*)` matches the
        // empty rest of `/` as well as any deeper path.
        source: "/:path(.*)",
        has: [{ type: "host", value: BARE_HOST }],
        destination: `https://${CANONICAL_HOST}/:path`,
        permanent: true,
      },
      ...legacyRedirects.map(({ source, destination }) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
