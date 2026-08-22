# The client's redesign

The client designed the whole site in Claude Design and asked us to rebuild
every page to it (decision of 2026-08-20 in [docs/decisions.md](../decisions.md)).
This folder is the delivery: ten pages of plain HTML, twenty screenshots, the
client's own account of the project, and one extracted spec.

Two sources, and they answer different questions.

- **What the design says** lives here. `design-spec.md` is the working
  document; the HTML beside it is the proof.
- **What the design became** lives in [DESIGN.md](../../DESIGN.md) and in
  `app/globals.css`. That pair is the rule for new work. Do not build a page
  from the client's inline styles: build it from the tokens and the primitives,
  and use the export to check the result.

## What is in this folder

| Path | What it is |
|---|---|
| `design-spec.md` | The extracted spec, in eight sections: tokens, typography, components, pages with the complete copy, interactions, route map, the responsive rules, open questions. Read it before you touch a page. |
| `client/<page>/index.html` | One client page as plain HTML with inline styles. Open it in a browser. |
| `client/<page>/assets/` | The photos that page uses, and any page it embeds in an iframe. |
| `client/<page>/bundle.json` | The asset table: uuid, file name, mime type. `ext_resources` names the CDN scripts the client's page loaded (React, three.js, d3). |
| `client/GESPREK.md` | The client's own summary of the project: the identity, the nine pages, the decisions, and the five points they left open. |
| `client-screenshots/<page>-390.jpg` and `-1280.jpg` | Every page as one full page image, at both widths. |

Ten page folders, and this is where each one goes:

| Client page | Route |
|---|---|
| `homepage-definitief-v4` | `/` |
| `het-traject` | `/studiekeuzetraject` |
| `voor-wie` | `/voor-wie` |
| `coaches` | `/studiekeuzecoaches` |
| `coach-janneke` | `/studiekeuzecoaches/[coach]` |
| `wie-zijn-wij` | `/over-ons` |
| `artikelen` | `/artikelen` |
| `tarieven-v3` | `/tarieven` |
| `word-coach` | `/coach-worden` |
| `kaart-nl` | no route. It is the map the coaches page embeds in an iframe, and it is rebuilt as `app/components/nl-map.tsx`. |

Three rules hold for everything in here, and they are not style questions:

1. **The desktop rendering is the target. The 390px rendering is broken.** The
   client's pages keep desktop grids, fixed widths and `white-space: nowrap` on
   a telephone, so the page scrolls sideways. Section 7 of the spec lists all
   fifteen faults. The responsive behaviour is ours, mobile first.
2. **A number goes on a page only when it is true of us.** The export prints
   "8,8 gemiddeld", "1000+ trajecten per jaar", "92% studeert met plezier
   door", "92% kiest goed" and "35+ locaties". None of them is ours to claim.
   Keep the slot, fill it with a fact we own.
3. **The photos are stock.** They stay in this folder. A page uses the repo's
   own images in `public/images`, or no photo.

## How the folder was made

A Claude Design export is one `*.dc.html` file per page, and each file is a
bundle: the page sits as a JSON string in a `<script type="__bundler/template">`
and every font, image and script sits base64 encoded, usually gzipped, in a
`__bundler/manifest`. A browser unpacks it on load. Nothing else can read it.

`scripts/unpack-client-export.py` reads the bundle and writes plain files:

```sh
python3 scripts/unpack-client-export.py "~/Downloads/website-export-v2" docs/redesign/client
```

Per page it writes `index.html` with every asset reference pointed at
`assets/`, the `bundle.json` table, and the `assets/` folder. It writes images
and nested pages only. Fonts, React, three.js and d3 are third party libraries
we do not commit, so they stay out unless you pass `--all`; the page names the
fonts itself and `bundle.json` names the scripts. It also copies `GESPREK.md`
from the export root if it is there.

The committed state came from `website-export-v2`, received 2026-08-20, with
these defaults. The unpacked pages are 1.2 MB, the screenshots 4.0 MB.

## The screenshots

They were shot from the unpacked HTML with `scripts/screenshots.mjs`, the same
script that proves our own pages. The `-390` files are 919 to 945 pixels wide,
not 390: that is the client's page overflowing its own viewport, and it is the
evidence behind section 7 of the spec.

To make them again, serve this folder and point the script at it:

```sh
python3 -m http.server 8231 --directory docs/redesign/client
OUT=docs/redesign/client-screenshots BASE=http://localhost:8231 \
  node scripts/screenshots.mjs /homepage-definitief-v4/index.html /het-traject/index.html
```

The script drops a trailing `/index.html` from the file name, so the files stay
`<page>-<width>.jpg`. Expect a few pixels of difference in height against the
committed images: the export's fonts are not committed, so a re-shot page may
fall back (`tarieven-v3-1280.jpg` measured 1235px against 1269px). Content
differences are real, height differences of a few pixels are not.

## When the client sends v3

1. Unzip the export outside the repo. The zip is never committed, only the
   unpacked result.
2. Run the unpack script into `docs/redesign/client`. It overwrites a page
   folder in place. Delete by hand any folder whose page the client dropped.
3. `git diff --stat docs/redesign/client` tells you which pages moved. Read the
   changed `index.html` files.
4. Re-shoot the screenshots with the recipe above, for the changed pages at
   least.
5. **Update `design-spec.md` in the same commit.** Every page agent reads the
   spec and not the HTML, so a spec that lags the export is worse than no spec.
   Keep its rule: where the spec and the HTML disagree the HTML wins, where the
   spec and [PRODUCT.md](../../PRODUCT.md) disagree PRODUCT.md wins and the
   conflict is marked `WARNING`.
6. If a token moved, change `app/globals.css` and `DESIGN.md`, not the pages.
   A page that hard codes a hex has to be fixed anyway.
7. If the client added a page, it is a new route: add it to `staticPaths` in
   `app/sitemap.ts`, run `python3 scripts/build-url-map.py`, and give a new city
   its `at` point in `app/cities.ts`. AGENTS.md says why none of the three
   happens on its own.

## How a page proves it matches

`scripts/screenshots.mjs` is the proof. With the dev server running:

```sh
OUT=docs/screenshots/redesign BASE=http://localhost:3210 node scripts/screenshots.mjs /tarieven
WIDTHS=320 OUT=docs/screenshots/redesign BASE=http://localhost:3210 node scripts/screenshots.mjs /tarieven
```

The first writes `-390` and `-1280`. Look at both, every time; a page is not
done because the desktop looks right. The second is the overflow test: at 320px
the image must be exactly 320 wide. Anything wider is a page that scrolls
sideways, and that is a defect, not a detail.

Compare against `client-screenshots/<page>-1280.jpg`, never against the `-390`
one. The script runs with `reducedMotion: "reduce"`, so a reveal is captured at
rest: that is also the check that nothing is invisible for a reader who asked
for less motion.

`scripts/check-pages.mjs` is the other half of the proof, and it is the half a
person cannot do by eye. Same routes, same server:

```sh
BASE=http://localhost:3210 node scripts/check-pages.mjs
BASE=http://localhost:3210 node scripts/check-pages.mjs /tarieven
```

At 320, 390 and 1280 it checks six things per route: the page does not scroll
sideways, the console is quiet, there is exactly one `h1`, every `img` carries
an `alt`, there is a `<main>`, and every internal link and every `#anchor` on
the page leads somewhere. It prints a table and exits 1 on the first failure,
so it can stand in a hook or a pipeline. Its route list is `ROUTES` in
`screenshots.mjs`: one list, two scripts, and a new page is added in one place.

The screenshot script answers the cookie bar before the shutter opens, because
it is sticky and would otherwise park in the middle of every full page picture.
`CONSENT=ask node scripts/screenshots.mjs /` photographs the first visit
instead. The checker leaves the question open on purpose: a first visit is the
state most readers arrive in, and the bar must not push a page sideways
either.
