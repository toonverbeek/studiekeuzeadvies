#!/usr/bin/env node
/**
 * Full-page screenshots of every route, at a telephone width and a desktop
 * width. They are the proof that a page was built, and the thing a reviewer
 * looks at first.
 *
 *   node scripts/screenshots.mjs                      # all routes, both widths
 *   node scripts/screenshots.mjs /tarieven /voor-wie  # some routes
 *   BASE=http://localhost:3210 OUT=docs/screenshots/redesign node scripts/screenshots.mjs
 *
 * Needs a running server at BASE (default http://localhost:3000). Writes JPEG,
 * so fifty pages fit in a pull request. The file name is the route with the
 * slashes replaced, then the width: `locaties--amsterdam-390.jpg`.
 */

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = process.env.OUT ?? "docs/screenshots/redesign";
const WIDTHS = (process.env.WIDTHS ?? "390,1280").split(",").map(Number);

/** Every route that a visitor can reach. Keep in step with app/sitemap.ts. */
export const ROUTES = [
  "/",
  "/studiekeuzetraject",
  "/voor-wie",
  "/tarieven",
  "/studiekeuzecoaches",
  "/studiekeuzecoaches/janneke",
  "/over-ons",
  "/coach-worden",
  "/artikelen",
  "/locaties",
  "/locaties/amsterdam",
  "/veelgestelde-vragen",
  "/ervaringen",
  "/eerste-studiekeuze",
  "/verkeerde-studiekeuze",
  "/studiekeuze-met-add-adhd",
  "/hbo-opleiding-kiezen",
  "/mbo-opleiding-kiezen",
  "/wo-opleiding-kiezen",
  "/een-pagina-die-niet-bestaat",
];

const routes = process.argv.slice(2).length ? process.argv.slice(2) : ROUTES;

const fileName = (route, width) =>
  (route === "/"
    ? "home"
    : route.replace(/^\//, "").replace(/\/index\.html$/, "").replace(/\//g, "--")) +
  `-${width}.jpg`;

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const failures = [];

for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    locale: "nl-NL",
  });
  const page = await context.newPage();
  for (const route of routes) {
    const target = BASE + route;
    try {
      const response = await page.goto(target, { waitUntil: "networkidle", timeout: 60_000 });
      // Scroll through, so lazy images and reveal-on-scroll sections render.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(300);
      const file = path.join(OUT, fileName(route, width));
      await page.screenshot({ path: file, fullPage: true, type: "jpeg", quality: 70 });
      const status = response?.status() ?? "?";
      console.log(`${status}  ${width}px  ${route}  ->  ${file}`);
      if (status >= 500) failures.push(`${route} returned ${status}`);
    } catch (error) {
      failures.push(`${route} at ${width}px: ${error.message.split("\n")[0]}`);
      console.log(`FAIL ${width}px ${route}: ${error.message.split("\n")[0]}`);
    }
  }
  await context.close();
}

await browser.close();
if (failures.length) {
  console.error(`\n${failures.length} screenshot(s) failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
