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
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = process.env.OUT ?? "docs/screenshots/redesign";
const WIDTHS = (process.env.WIDTHS ?? "390,1280").split(",").map(Number);

/**
 * THE COOKIE BAR IS ANSWERED BEFORE THE SHUTTER OPENS, AND ON PURPOSE. It is
 * sticky, so in a full page screenshot it parks in the middle of the picture
 * and hides a band of every page. These files are the proof that a page was
 * built, so the page is what they have to show. `CONSENT=ask` leaves the
 * question open and photographs the first visit instead; `CONSENT=denied`
 * photographs the site after a no.
 */
const CONSENT = process.env.CONSENT ?? "granted";

/**
 * Every shape a visitor can reach, and one address per shape. Keep in step
 * with app/sitemap.ts.
 *
 * It is a hand list and not the sitemap, so it does not grow with the 37 city
 * pages and the 63 articles that are still coming. That has a cost: a page
 * that only differs in content is never shot and never checked. The rule for
 * adding one is therefore "does this page have a layout no other route has":
 * /locaties/bergen-op-zoom is the city without a coach, and
 * /studiekeuzecoaches/hanneke is a stand-in profile, which the sitemap leaves
 * out on purpose. Both were invisible to both scripts until 2026-08-20.
 */
export const ROUTES = [
  "/",
  "/studiekeuzetraject",
  "/voor-wie",
  "/tarieven",
  "/studiekeuzecoaches",
  "/studiekeuzecoaches/janneke",
  "/studiekeuzecoaches/hanneke",
  "/over-ons",
  "/coach-worden",
  "/artikelen",
  "/de-1-februariregeling",
  "/locaties",
  "/locaties/amsterdam",
  "/locaties/bergen-op-zoom",
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

/**
 * Nothing below this line runs when the file is imported. scripts/check-pages.mjs
 * reads ROUTES from here, because one list of routes is the whole point, and it
 * must not launch a browser and write two hundred JPEGs to do it.
 */
const runningDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (runningDirectly) await shoot();

async function shoot() {
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

    // The key is app/consent.ts, `consentStorageKey`. Change it there and this
    // line has to follow, or every screenshot grows a cookie bar again.
    if (CONSENT !== "ask") {
      await context.addInitScript((choice) => {
        try {
          window.localStorage.setItem("ska:cookies", choice);
        } catch {
          // Storage off in this context. The bar comes back; nothing breaks.
        }
      }, CONSENT);
    }

    // `next dev` paints its own round badge over the bottom left corner of
    // every page. It is not part of the site, so it is not in the proof.
    await context.addInitScript(() => {
      const style = document.createElement("style");
      style.textContent = "nextjs-portal { display: none !important; }";
      document.addEventListener("DOMContentLoaded", () =>
        document.head.append(style),
      );
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
}
