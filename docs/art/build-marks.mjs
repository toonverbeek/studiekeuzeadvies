/**
 * Writes app/apple-icon.png and app/favicon.ico from app/icon.svg, so the
 * vector and the two rasters can never disagree.
 *
 *   node docs/art/build-marks.mjs
 *
 * It needs no install: sharp is already in node_modules (Next brings it for
 * next/image), and sharp rasterises SVG with librsvg. It is used here as a
 * build-time tool, not as a dependency of the site: nothing in app/ imports it.
 *
 * After a run, LOOK at the files. The .ico is worth opening at 16 pixels,
 * because that is the size that decides whether a mark works at all.
 *
 * public/wordmark.svg is the third mark and it is not built here: it needs a
 * font, and docs/art/wordmark-paths.py says how. Both marks do get a raster
 * proof here, in docs/screenshots/, because an SVG in a review is a file you
 * have to open and a PNG is a picture you have already seen.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const svg = await readFile(join(root, "app", "icon.svg"));

/** iOS shows this one on the home screen, at 180x180 and with its own mask. */
const applePng = await sharp(svg, { density: 384 })
  .resize(180, 180)
  .png()
  .toBuffer();
await writeFile(join(root, "app", "apple-icon.png"), applePng);

/**
 * A .ico is a six byte header, one sixteen byte directory entry per size, and
 * the images themselves. A PNG payload inside an .ico is read by every browser
 * that is still shipped, so one 32x32 PNG is the whole file.
 */
const icoPng = await sharp(svg, { density: 384 }).resize(32, 32).png().toBuffer();

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // 1 = icon
header.writeUInt16LE(1, 4); // one image in the file

const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0); // width
entry.writeUInt8(32, 1); // height
entry.writeUInt8(0, 2); // colours in the palette: 0 means "no palette"
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // colour planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(icoPng.length, 8);
entry.writeUInt32LE(header.length + entry.length, 12); // offset of the payload

await writeFile(
  join(root, "app", "favicon.ico"),
  Buffer.concat([header, entry, icoPng]),
);

/**
 * The proofs. Not used by the site: they are what a reviewer looks at, so they
 * are rendered big enough to judge and on the paper the site is printed on.
 * Delete these two lines and the review has to open two SVGs instead.
 */
const shots = join(root, "docs", "screenshots");
await mkdir(shots, { recursive: true });

const paper = { r: 250, g: 248, b: 244, alpha: 1 };

await sharp(await readFile(join(root, "public", "wordmark.svg")), { density: 384 })
  .resize({ width: 900, background: paper, fit: "contain" })
  .flatten({ background: paper })
  .png()
  .toFile(join(shots, "wordmark.png"));

await sharp(svg, { density: 384 })
  .resize(256, 256)
  .png()
  .toFile(join(shots, "icon.png"));

console.log(
  "wrote app/apple-icon.png, app/favicon.ico, docs/screenshots/wordmark.png and docs/screenshots/icon.png",
);
