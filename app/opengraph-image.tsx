import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The picture that a chat app, a search engine or a social network shows when
 * somebody shares a link to this site.
 *
 * Next picks this file up by convention. It becomes the route /opengraph-image
 * and it fills og:image, og:image:width, og:image:height, og:image:type and
 * og:image:alt on every page under app/. Next also copies these images into
 * twitter:image when no twitter-image file exists, so one file covers both.
 * Do not add the image to the metadata export in app/layout.tsx: the file
 * convention already did it, and the export would only be able to disagree.
 *
 * The design is the new system reduced to what survives at thumbnail size: the
 * mark, the name in its two colours, one sentence in the display face, and one
 * quiet line of facts. There is no photograph, no number and no claim on it.
 * PRODUCT.md is strict about that: a number goes on the site when we can prove
 * it of ourselves, and a share image is the one place where an unprovable
 * claim travels furthest.
 *
 * To see a change, build and open .next/server/app/opengraph-image.body: it is
 * a static route, so what you get is what a chat app gets. The last build of it
 * is kept as docs/screenshots/opengraph-image.png. Check it at thumbnail size
 * too, because that is where it is read, and remember that some clients crop it
 * to a square from the centre.
 */

export const alt =
  "StudiekeuzeAdvies. Samen kiezen voor een studie die echt past.";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

/**
 * next/og renders with Satori, which cannot use next/font and cannot read our
 * stylesheet: it wants the font as bytes. The two files are read from the file
 * system at module scope, once, and the image is generated at build time, so a
 * build never depends on the network. They are the two families the site uses,
 * in the two weights this image needs. app/fonts/OFL.txt is the licence.
 *
 * THIS ROUTE ONLY ANSWERS IN A BUILD. `next dev` returns an empty reply for
 * /opengraph-image and the worker that rendered it is gone, measured on
 * 2026-08-20 with Next 16.3.0. `next build` writes the file without a word of
 * complaint, and that file is the one a chat app gets, so this is a nuisance in
 * development and not a defect on the site. Moving the two reads inside the
 * handler does not help; it was tried. To look at the picture, build and open
 * .next/server/app/opengraph-image.body, which is the PNG itself.
 */
const fontsDir = join(process.cwd(), "app", "fonts");
const bricolageBold = await readFile(
  join(fontsDir, "BricolageGrotesque-Bold.ttf"),
);
const figtreeRegular = await readFile(join(fontsDir, "Figtree-Regular.ttf"));

/* The tokens of app/globals.css, written out because Satori does not read it. */
const PAPER = "#faf8f4";
const INK = "#1e1b4b";
const VIOLET = "#6d4aff";
const MUTED = "#4d4a6b";

/* The mark of app/icon.svg as a data URI. Satori draws an SVG that arrives as
   an image, so the same shape serves the tab, the home screen and this file. */
const MARK = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="88" height="88"><path d="M6 36 L16 36 L16 26 L26 26 L26 16 L36 16 L36 8" stroke="${VIOLET}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="36" cy="8" r="4.5" fill="#ff6b4a"/></svg>`,
).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: PAPER,
          color: INK,
          fontFamily: "Figtree",
          padding: 76,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img alt="" height={88} src={MARK} width={88} />
          <div
            style={{
              display: "flex",
              fontFamily: "Bricolage Grotesque",
              fontWeight: 700,
              fontSize: 56,
              letterSpacing: "-0.02em",
            }}
          >
            <span>studiekeuze</span>
            <span style={{ color: VIOLET }}>advies</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Bricolage Grotesque",
            fontWeight: 700,
            fontSize: 82,
            lineHeight: 1.06,
            letterSpacing: "-0.028em",
            maxWidth: 960,
          }}
        >
          Samen kiezen voor een studie die écht past.
        </div>

        <div style={{ display: "flex", fontSize: 30, color: MUTED }}>
          Gratis intake · MBO, HBO en WO · online of op locatie
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Figtree",
          data: figtreeRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Bricolage Grotesque",
          data: bricolageBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
