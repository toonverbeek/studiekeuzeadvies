#!/usr/bin/env node
/**
 * Draws the Netherlands once, offline, into app/components/nl-map-data.ts.
 *
 * WHY A SCRIPT AND NOT A LIBRARY. The client's own map page (docs/redesign/
 * client/kaart-nl/index.html) pulls d3 and topojson from a CDN and projects the
 * country in the browser. That is three network requests and about 90 KB of
 * JavaScript for a picture that never changes. Everything below happens here,
 * at build time, and the site ships one path string, one array of dots and
 * three numbers. Nothing of this runs in a browser and nothing of it is a
 * runtime dependency.
 *
 * SOURCE: world-atlas 2.0.2, `countries-50m.json`, which is Natural Earth
 * 1:50m as TopoJSON. The version is exact, not `@2`, so a new minor release
 * cannot change the geometry under the committed file: the output of this
 * script is a pure function of the constants at the top of it.
 * https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json
 *
 * WHY 50m AND NOT THE 110m THE CLIENT USED. Measured on 2026-08-20: at 110m the
 * Netherlands is a fourteen point blob, no Wadden islands, no Zeeland, and it
 * does not read as the country. At 50m the mainland ring is 161 points, the
 * islands are there, and the whole projected outline is under 4 KB. The
 * Caribbean part of the kingdom is three separate polygons around longitude
 * -63 and -68; they are dropped, because this map answers "where in the
 * Netherlands do we work" and they would push the projection off the page.
 *
 * TopoJSON is decoded here in about twenty lines (delta encoded arcs plus one
 * quantisation transform), so the script needs no dependency either.
 *
 * Run it with `node scripts/build-nl-map.mjs`. It needs the network. The output
 * is committed, so this only has to run again when the geometry or the viewBox
 * changes.
 */

import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_VERSION = "2.0.2";
const SOURCE = `https://cdn.jsdelivr.net/npm/world-atlas@${SOURCE_VERSION}/countries-50m.json`;
const COUNTRY = "Netherlands";

/** The box the client's map is drawn in, and the inset it keeps free. */
const VIEW = { width: 520, height: 560, margin: 30 };

/** The halftone grid of section 3.24: 13px pitch, every other row shifted. */
const GRID = { step: 13, rowOffset: 0.5 };

/** Everything west of this is the Caribbean part of the kingdom. */
const EUROPE_MIN_LON = -20;

const here = dirname(fileURLToPath(import.meta.url));
const OUT = join(here, "..", "app", "components", "nl-map-data.ts");

/* ------------------------------------------------------------------ topojson */

/**
 * One arc, decoded. TopoJSON stores an arc as a first point plus deltas, in
 * quantised integer space; `transform` scales that back to degrees. A negative
 * index means "the arc with index ~i, walked backwards".
 */
function decodeArc(topology, index) {
  const reversed = index < 0;
  const raw = topology.arcs[reversed ? ~index : index];
  const [scaleX, scaleY] = topology.transform.scale;
  const [translateX, translateY] = topology.transform.translate;

  let x = 0;
  let y = 0;
  const points = raw.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * scaleX + translateX, y * scaleY + translateY];
  });

  return reversed ? points.reverse() : points;
}

/** A ring is a list of arcs laid end to end; the shared point is not repeated. */
function decodeRing(topology, arcIndices) {
  const ring = [];
  for (const index of arcIndices) {
    const points = decodeArc(topology, index);
    ring.push(...(ring.length === 0 ? points : points.slice(1)));
  }
  return ring;
}

/** Every polygon of one country, as rings of [lon, lat]. */
function decodeCountry(topology, geometry) {
  const polygons =
    geometry.type === "Polygon" ? [geometry.arcs] : geometry.arcs;
  return polygons.map((rings) =>
    rings.map((arcIndices) => decodeRing(topology, arcIndices)),
  );
}

/* ---------------------------------------------------------------- projection */

/**
 * Spherical Mercator, the naked version: longitude straight through, latitude
 * through the isometric latitude. Both in radians, y already flipped so north
 * is up in SVG coordinates. `fit` below turns these into pixels.
 */
function mercator([lon, lat]) {
  const phi = (lat * Math.PI) / 180;
  return [
    (lon * Math.PI) / 180,
    -Math.log(Math.tan(Math.PI / 4 + phi / 2)),
  ];
}

/**
 * The same thing d3's `fitExtent` does: project everything, then pick the one
 * scale and the one offset that put the whole country inside the box with the
 * margin free. Three numbers come out, and those three numbers are the whole
 * projection at runtime.
 */
function fit(rings) {
  const projected = rings.flat().map(mercator);
  const xs = projected.map((point) => point[0]);
  const ys = projected.map((point) => point[1]);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const boxWidth = VIEW.width - VIEW.margin * 2;
  const boxHeight = VIEW.height - VIEW.margin * 2;
  const scale = Math.min(boxWidth / (maxX - minX), boxHeight / (maxY - minY));

  return {
    scale,
    // Centre what is left over, so the country sits in the middle of the box.
    translateX: VIEW.margin + (boxWidth - (maxX - minX) * scale) / 2 - minX * scale,
    translateY: VIEW.margin + (boxHeight - (maxY - minY) * scale) / 2 - minY * scale,
  };
}

const round = (value) => Math.round(value * 10) / 10;

/* -------------------------------------------------------------------- inside */

/**
 * Even-odd ray casting, in projected pixels. A dot is drawn when it is inside
 * an odd number of rings, which handles the one hole this outline has and the
 * islands at the same time.
 */
function isInside(x, y, rings) {
  let inside = false;

  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      const crosses = yi > y !== yj > y;
      if (crosses && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
  }

  return inside;
}

/* --------------------------------------------------------------------- build */

const response = await fetch(SOURCE);
if (!response.ok) {
  throw new Error(`${SOURCE} answered ${response.status}`);
}
const topology = await response.json();

const geometry = topology.objects.countries.geometries.find(
  (candidate) => candidate.properties.name === COUNTRY,
);
if (!geometry) throw new Error(`No country named ${COUNTRY} in ${SOURCE}`);

const mainland = decodeCountry(topology, geometry)
  .filter((polygon) => polygon[0].every(([lon]) => lon > EUROPE_MIN_LON))
  .flat();

const projection = fit(mainland);
const toPixels = (point) => {
  const [x, y] = mercator(point);
  return [
    x * projection.scale + projection.translateX,
    y * projection.scale + projection.translateY,
  ];
};

const pixelRings = mainland.map((ring) => ring.map(toPixels));

// One path, all rings, each closed. `Z` after every ring is what makes the
// even-odd fill rule find the holes.
const path = pixelRings
  .map(
    (ring) =>
      `M${ring
        .map(([x, y]) => `${round(x)} ${round(y)}`)
        .join("L")}Z`,
  )
  .join("");

const dots = [];
let row = 0;
for (let y = VIEW.margin; y <= VIEW.height - VIEW.margin; y += GRID.step) {
  const shift = row % 2 === 1 ? GRID.step * GRID.rowOffset : 0;
  for (let x = VIEW.margin + shift; x <= VIEW.width - VIEW.margin; x += GRID.step) {
    if (isInside(x, y, pixelRings)) dots.push([round(x), round(y)]);
  }
  row += 1;
}

const file = `/**
 * THIS FILE IS GENERATED. Do not edit it by hand.
 *
 * Written by \`scripts/build-nl-map.mjs\` from world-atlas ${SOURCE_VERSION}
 * \`countries-50m.json\` (Natural Earth 1:50m as TopoJSON), the Netherlands
 * without the Caribbean polygons. Run that script to change any of it: the
 * viewBox, the grid pitch and the source are all constants at the top of it.
 *
 * Two runs on the same input give the same file, so a diff means the map
 * really moved.
 *
 * The three numbers in \`nlProjection\` are a whole Mercator projection. See
 * \`projectPoint\` in app/components/nl-map.tsx, which is the five lines that
 * turn a lon/lat from app/cities.ts into a point in this viewBox.
 */

/** The box every coordinate below lives in. */
export const nlViewBox = {
  width: ${VIEW.width},
  height: ${VIEW.height},
} as const;

/** The outline of the country, every ring closed, fill rule evenodd. */
export const nlOutlinePath =
  "${path}";

/**
 * Spherical Mercator, fitted to the outline above with a ${VIEW.margin}px inset.
 * x = lon in radians * scale + translateX
 * y = -ln(tan(pi/4 + lat in radians / 2)) * scale + translateY
 */
export const nlProjection = {
  scale: ${projection.scale.toFixed(4)},
  translateX: ${projection.translateX.toFixed(4)},
  translateY: ${projection.translateY.toFixed(4)},
} as const;

/**
 * The halftone grid: ${GRID.step}px pitch, every other row shifted half a step,
 * every point inside the outline. ${dots.length} dots.
 */
export const nlDots: readonly (readonly [number, number])[] = [
${dots.map(([x, y]) => `  [${x}, ${y}],`).join("\n")}
];
`;

await writeFile(OUT, file, "utf8");

console.log(
  `nl-map-data.ts written: ${pixelRings.length} rings, ${path.length} path characters, ${dots.length} dots.`,
);
