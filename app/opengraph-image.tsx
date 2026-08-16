import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The picture that a chat app, a search engine or a social network shows when
 * somebody shares a link to this site. Without this file they show whatever
 * they can find, and until now that was the create-next-app triangle, which a
 * coach read as our logo.
 *
 * Next picks this file up by convention. It becomes the route /opengraph-image
 * and it fills og:image, og:image:width, og:image:height, og:image:type and
 * og:image:alt on every page under app/. Next also copies these images into
 * twitter:image when no twitter-image file exists, so one file covers both.
 * Do not add the image to the metadata export in app/layout.tsx: the file
 * convention already did it, and the export would only be able to disagree.
 *
 * The design is the site, reduced to what survives at thumbnail size:
 *   - the ochre zone with the name, the way the header is built,
 *   - the warm paper zone with the sentence, the way a reading page is built,
 *   - two flat surfaces next to each other, no shadow, no rounded corner.
 * There is no photograph, no number and no claim on it. PRODUCT.md is strict
 * about that: a number goes on the site when we can prove it of ourselves, and
 * a share image is the one place where an unprovable claim travels furthest.
 *
 * The proportions were chosen by looking at the result, not by taste in the
 * abstract. The ochre row is two thirds of the height. To see a change, build
 * and open /opengraph-image: it is a static route, so what you get is what a
 * chat app gets. Check it at thumbnail size too, because that is where it is
 * read, and remember that some clients crop it to a square from the centre.
 */

export const alt =
  "StudieKeuzeAdvies. Je hoeft je studiekeuze niet alleen uit te zoeken.";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

/**
 * The fonts are read from the file system at module scope, once, and the image
 * is generated at build time. A build must never depend on the network, so the
 * two weights live in app/fonts/ instead of being fetched from Google at
 * request time. They are subsets: next/og allows 500 KB for the whole route,
 * and the full family is 260 KB per weight. They keep every letter, digit and
 * mark a Dutch sentence can need, not only the letters of today's copy, so a
 * later edit to the sentence cannot silently lose a glyph.
 *
 * To remake them, take the two weights from Google Fonts (the URL is in
 * docs/art/mark.py) and run pyftsubset over each one, keeping the kern, liga
 * and calt features so the shaping matches the browser, and --name-IDs=* so
 * the licence travels with the file. app/fonts/OFL.txt is that licence.
 */
const fontsDir = join(process.cwd(), "app", "fonts");
const alegreyaBold = await readFile(
  join(fontsDir, "AlegreyaSans-Bold-subset.ttf"),
);
const alegreyaRegular = await readFile(
  join(fontsDir, "AlegreyaSans-Regular-subset.ttf"),
);

/* The tokens of app/globals.css, resolved from OKLCH to sRGB by
   docs/art/oklch.py. next/og renders with Satori, which does not read our
   stylesheet and does not understand oklch(), so the numbers are written out
   here. Ink on ochre is 8.5:1 and ink on paper is 15.6:1. */
const OCHRE = "#e5ad33";
const PAPER = "#f6f3ed";
const INK = "#1f1a0f";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: PAPER,
          fontFamily: "Alegreya Sans",
          color: INK,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 420,
            backgroundColor: OCHRE,
            paddingLeft: 80,
            paddingRight: 80,
            fontSize: 124,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          StudieKeuzeAdvies
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            paddingLeft: 80,
            paddingRight: 80,
            fontSize: 42,
            fontWeight: 400,
            lineHeight: 1.2,
          }}
        >
          Je hoeft je studiekeuze niet alleen uit te zoeken.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Alegreya Sans",
          data: alegreyaRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Alegreya Sans",
          data: alegreyaBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
