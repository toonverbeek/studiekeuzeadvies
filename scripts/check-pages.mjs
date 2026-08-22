#!/usr/bin/env node
/**
 * The six things a page of this site must do, checked on every route at three
 * widths. It is the companion of scripts/screenshots.mjs: that one shows you a
 * page, this one tells you whether the page is sound. Same style, same ROUTES
 * list, same BASE.
 *
 *   node scripts/check-pages.mjs                      # every route
 *   node scripts/check-pages.mjs /tarieven /voor-wie  # some routes
 *   BASE=http://localhost:3210 node scripts/check-pages.mjs
 *
 * Needs a running server at BASE (default http://localhost:3000). Prints one
 * line per route and width, then a summary, and exits 1 when anything failed.
 *
 * WHAT IS CHECKED, AND WHY EACH ONE IS HERE.
 *
 *   fit     document.documentElement.scrollWidth <= window.innerWidth. A page
 *           that scrolls sideways on a telephone is broken, and 320px is the
 *           narrowest screen we name. This is the check that catches a grid
 *           that never collapsed and a word that cannot break.
 *   console no error on the console. A React hydration mismatch and a failed
 *           image both arrive here and nowhere else.
 *   h1      exactly one. Zero means the page never says what it is; two means
 *           a second one is dressed as the first, and a screen reader that
 *           lists the headings then reads two answers to the same question.
 *   alt     every <img> carries an alt attribute. An empty alt is an answer
 *           (the image is decoration); a missing one is not.
 *   main    the page has a <main>. "Skip to content" and every reader that
 *           jumps to the body of a page need it.
 *   links   every unique internal href on the page answers under 400. This is
 *           the check that finds the link to the page that was renamed, and
 *           the anchor to a section that no longer exists.
 *
 * Links are only fetched once each across the whole run, and only at the first
 * width, because an address does not change with the viewport.
 */

import { chromium } from "playwright";
import { ROUTES } from "./screenshots.mjs";

const BASE = process.env.BASE ?? "http://localhost:3000";
const WIDTHS = (process.env.WIDTHS ?? "320,390,1280").split(",").map(Number);

/** The routes that are supposed to answer 404. The probe is one on purpose. */
const EXPECT_404 = new Set(["/een-pagina-die-niet-bestaat"]);

const routes = process.argv.slice(2).length ? process.argv.slice(2) : ROUTES;

/* --------------------------------------------------------------- the links */

/** address -> status, so a link that appears on twelve pages is fetched once. */
const linkStatus = new Map();

async function statusOf(url) {
  const known = linkStatus.get(url);
  if (known !== undefined) return known;

  let status = 0;
  try {
    // GET and not HEAD: Next answers a HEAD from the router without rendering,
    // so a page that throws while rendering would pass a HEAD check.
    const response = await fetch(url, { redirect: "follow" });
    status = response.status;
  } catch (error) {
    status = `unreachable (${error.message.split("\n")[0]})`;
  }
  linkStatus.set(url, status);
  return status;
}

/* -------------------------------------------------------------- the checks */

/** Everything the browser can see, read in one pass inside the page. */
const readPage = () => ({
  scrollWidth: document.documentElement.scrollWidth,
  innerWidth: window.innerWidth,
  // The widest element on the page, so a failure names the thing to fix.
  widest: (() => {
    let worst = { tag: "", width: 0 };
    for (const el of document.querySelectorAll("body *")) {
      const box = el.getBoundingClientRect();
      const right = box.right + window.scrollX;
      if (right > worst.width) {
        worst = {
          width: Math.round(right),
          tag:
            el.tagName.toLowerCase() +
            (el.className && typeof el.className === "string"
              ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
              : ""),
        };
      }
    }
    return worst;
  })(),
  h1: document.querySelectorAll("h1").length,
  mains: document.querySelectorAll("main").length,
  imagesWithoutAlt: [...document.querySelectorAll("img")]
    .filter((img) => !img.hasAttribute("alt"))
    .map((img) => img.getAttribute("src") ?? "(no src)")
    .slice(0, 5),
  hrefs: [
    ...new Set(
      [...document.querySelectorAll("a[href]")]
        .map((a) => a.getAttribute("href"))
        .filter((href) => href && !/^(https?:|mailto:|tel:|#)/.test(href)),
    ),
  ],
  anchors: [
    ...new Set(
      [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute("href").slice(1))
        .filter(Boolean),
    ),
  ],
  ids: [...document.querySelectorAll("[id]")].map((el) => el.id),
});

/* ----------------------------------------------------------------- the run */

const browser = await chromium.launch();
const rows = [];
const failures = [];

for (const [index, width] of WIDTHS.entries()) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    locale: "nl-NL",
  });

  for (const route of routes) {
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    const problems = [];
    let status = "?";

    try {
      const response = await page.goto(BASE + route, {
        waitUntil: "networkidle",
        timeout: 60_000,
      });
      status = response?.status() ?? "?";

      const want = EXPECT_404.has(route) ? 404 : 200;
      if (status !== want) problems.push(`status ${status}, wanted ${want}`);

      const seen = await page.evaluate(readPage);

      if (seen.scrollWidth > seen.innerWidth) {
        problems.push(
          `overflow: ${seen.scrollWidth}px in ${seen.innerWidth}px, widest is ${seen.widest.tag} at ${seen.widest.width}px`,
        );
      }
      // A browser logs the 404 of the document itself as a console error, so
      // the probe route would fail its own check. That one line is the answer
      // we asked for; anything else on that page still counts.
      const noise = EXPECT_404.has(route)
        ? consoleErrors.filter((line) => !/status of 404/.test(line))
        : consoleErrors;
      if (noise.length) {
        problems.push(`console: ${noise[0]}`);
      }
      if (seen.h1 !== 1) problems.push(`${seen.h1} h1 elements, wanted 1`);
      if (seen.mains !== 1) problems.push(`${seen.mains} main elements, wanted 1`);
      if (seen.imagesWithoutAlt.length) {
        problems.push(`img without alt: ${seen.imagesWithoutAlt.join(", ")}`);
      }

      const missing = seen.anchors.filter((id) => !seen.ids.includes(id));
      if (missing.length) problems.push(`anchor to nothing: #${missing.join(", #")}`);

      // Only the first width fetches links: an address is the same at 1280px.
      if (index === 0) {
        for (const href of seen.hrefs) {
          const url = new URL(href, BASE + route).toString();
          if (!url.startsWith(BASE)) continue;
          const linkCode = await statusOf(url);
          if (typeof linkCode !== "number" || linkCode >= 400) {
            problems.push(`link ${href} answers ${linkCode}`);
          }
        }
      }
    } catch (error) {
      problems.push(error.message.split("\n")[0]);
    }

    await page.close();

    rows.push({ width, route, status, problems });
    if (problems.length) failures.push({ width, route, problems });
  }

  await context.close();
}

await browser.close();

/* -------------------------------------------------------------- the report */

const routeColumn = Math.max(...rows.map((row) => row.route.length), 5);
console.log(
  `${"width".padEnd(6)}${"route".padEnd(routeColumn + 2)}${"code".padEnd(6)}result`,
);
console.log("-".repeat(routeColumn + 26));

for (const row of rows) {
  const verdict = row.problems.length ? `FAIL  ${row.problems[0]}` : "ok";
  console.log(
    `${String(row.width).padEnd(6)}${row.route.padEnd(routeColumn + 2)}${String(row.status).padEnd(6)}${verdict}`,
  );
}

console.log(
  `\n${rows.length} checks over ${routes.length} routes at ${WIDTHS.join(", ")}px. ` +
    `${linkStatus.size} internal links fetched.`,
);

if (failures.length) {
  console.error(`\n${failures.length} failing check(s):`);
  for (const failure of failures) {
    console.error(`\n${failure.route} at ${failure.width}px`);
    for (const problem of failure.problems) console.error(`  - ${problem}`);
  }
  process.exit(1);
}

console.log("Every page passed.");
