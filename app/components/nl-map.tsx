import Link from "next/link";
import type { CSSProperties } from "react";
import { nlDots, nlOutlinePath, nlProjection, nlViewBox } from "./nl-map-data";

/**
 * The map of the Netherlands that this site draws itself.
 *
 * WHY IT EXISTS. The client's design puts a halftone map on the coaches page:
 * a grid of violet dots inside the outline of the country, with coral pins on
 * the cities where a coach works. Their own page builds it in the browser with
 * d3 and topojson from a CDN. This one is an inline SVG with no script at all.
 * `scripts/build-nl-map.mjs` projected the country once, offline, into
 * `nl-map-data.ts`, and everything below is markup.
 *
 * WHAT THAT BUYS. It is first party, so it sets no cookie, needs no consent bar
 * and no API key. It renders on the server, so it is in the HTML of a
 * prerendered page. It costs one path string, 529 circles and no runtime
 * dependency. See the decision of 2026-08-20 in docs/decisions.md.
 *
 * ONE COMPONENT, EVERY SIZE, AND NOTHING TO PASS. The 520px panel on the
 * coaches page, a 400px column on the home page and a 245px column on a city
 * page all render the same call. `className` gives the map a width and the
 * viewBox does the rest, but the pins and the city names deliberately do NOT
 * live in the viewBox: they are sized in CSS against `--nlmap-scale`, and a
 * container query sets that from the width the map is actually drawn at. A name
 * is about thirteen real pixels at every one of those three widths. `scale` is
 * the manual override, and a page should need it about never.
 *
 * `r` as a CSS property is the one thing here that an old browser may not
 * understand. Every circle carries its viewBox radius as an attribute as well,
 * so a browser that ignores the rule draws the client's own sizes instead of
 * nothing.
 */

/** The shape `at` has in app/cities.ts. Structural on purpose, so a page that
 *  only wants a picture does not drag the whole city list into this file. */
type Point = { lat: number; lng: number };

export type NlMapCity = {
  /** Printed beside the pin, and the value `highlight` is matched against. */
  name: string;
  at: Point;
  /** A pin with an href is a link. Without one it is a dot on a picture. */
  href?: string;
  /** Which side of the pin the name sits on. Default "right". */
  labelSide?: "left" | "right";
  /** Nudge the name up or down when two of them collide. viewBox units. */
  labelDy?: number;
};

/**
 * Where a city name sits, when the caller does not say.
 *
 * Utrecht and Amersfoort are 25 kilometres apart, so at this size their two
 * names land on each other. The client solved that on their own map page with a
 * hand-made offset per city, and this is that table (design spec 3.24). It is a
 * default and not a rule: anything a caller passes wins, and a city that is not
 * in the table gets the plain right-hand label.
 *
 * It lives here rather than in every page that draws a map, because the reason
 * two labels collide is the projection, and the projection is this file.
 */
const nlLabelNudges: Record<
  string,
  { labelSide?: "left" | "right"; labelDy?: number }
> = {
  // Left, over the sea. The client's own table puts Amsterdam on the right,
  // which is correct on a wide map, but every narrow column on this site (the
  // home page panel, the /over-ons panel, a city column) scales the names up
  // through the container query and then "Amsterdam" runs into "Amersfoort",
  // 40km away. Two pages were each passing this override by hand.
  Amsterdam: { labelSide: "left", labelDy: 4 },
  Utrecht: { labelDy: 13 },
  Amersfoort: { labelDy: -5 },
  Rotterdam: { labelSide: "left", labelDy: 17 },
  Eindhoven: { labelDy: 4 },
  Zwolle: { labelDy: 4 },
  // Ours, not the client's: the name is long and it sits on the west coast, so
  // it reads inland instead of over the sea.
  "Bergen op Zoom": { labelSide: "left", labelDy: 4 },
};

/**
 * Spherical Mercator with the three numbers the build script fitted: longitude
 * straight through, latitude through the isometric latitude, y flipped so north
 * is up. This is the whole projection, and it is why no library ships.
 */
function projectPoint({ lat, lng }: Point) {
  const x = (lng * Math.PI) / 180;
  const y = -Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));

  return {
    x: x * nlProjection.scale + nlProjection.translateX,
    y: y * nlProjection.scale + nlProjection.translateY,
  };
}

/**
 * The stylesheet of the map.
 *
 * It sits here and not in app/globals.css because this is the only component
 * that uses a line of it and app/globals.css belongs to the shell. Every name
 * is prefixed, so no rule here can reach anything outside a map.
 *
 * All three animations move `transform` and `opacity` and nothing else. The
 * last block switches every one of them off for a reader who asked for less
 * motion; the map then simply starts in the state the animation ends in.
 */
const css = `
/*
 * ONE KNOB, AND IT WATCHES THE MAP AND NOT THE WINDOW. The viewBox is 520 wide
 * whatever size the map is drawn at, so a name set in viewBox units shrinks
 * with the country: at 245px, which is what a city page column gives it, the
 * client's 12.5px reads as six. A media query cannot see that, because the same
 * 1280px window holds both a 520px panel and that 245px column. A container
 * query can: the frame around the SVG is the container, and every size below is
 * multiplied so a name stays about 13 real pixels at every width we ship.
 */
.nlmap-frame { container-type: inline-size; }
.nlmap { --nlmap-scale: 1; }
@container (max-width: 520px) { .nlmap { --nlmap-scale: 1.15; } }
@container (max-width: 420px) { .nlmap { --nlmap-scale: 1.45; } }
@container (max-width: 320px) { .nlmap { --nlmap-scale: 1.9; } }
@container (max-width: 240px) { .nlmap { --nlmap-scale: 2.5; } }

.nlmap-coast { stroke-width: calc(1.2px * var(--nlmap-scale)); }
.nlmap-core {
  r: calc(5.5px * var(--nlmap-scale));
  stroke-width: calc(2.5px * var(--nlmap-scale));
}
.nlmap-here .nlmap-core { r: calc(7.2px * var(--nlmap-scale)); }
.nlmap-ring { r: calc(6px * var(--nlmap-scale)); }
.nlmap-here .nlmap-ring { r: calc(7.7px * var(--nlmap-scale)); }
.nlmap-halo { r: calc(15px * var(--nlmap-scale)); }
.nlmap-hit { r: calc(26px * var(--nlmap-scale)); }
.nlmap-label {
  font-size: calc(12.5px * var(--nlmap-scale));
  stroke-width: calc(4px * var(--nlmap-scale));
  transform: translate(
    calc(12px * var(--nlmap-scale)),
    calc(var(--nlmap-dy, 4px) * var(--nlmap-scale))
  );
}
.nlmap-label-left {
  transform: translate(
    calc(-12px * var(--nlmap-scale)),
    calc(var(--nlmap-dy, 4px) * var(--nlmap-scale))
  );
}

.nlmap-dot {
  transform-box: fill-box;
  transform-origin: center;
  animation: nlmap-grow 500ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--nlmap-row, 0ms) + var(--nlmap-jitter, 0ms));
}
.nlmap-j1 { --nlmap-jitter: 60ms; }
.nlmap-j2 { --nlmap-jitter: 130ms; }
.nlmap-j3 { --nlmap-jitter: 190ms; }
.nlmap-pin {
  animation: nlmap-fade 400ms ease-out both;
  animation-delay: var(--nlmap-pin, 0ms);
}
.nlmap-ring {
  transform-box: fill-box;
  transform-origin: center;
  animation: nlmap-pulse 2400ms cubic-bezier(0.22, 1, 0.36, 1) infinite both;
  animation-delay: var(--nlmap-ring, 0ms);
}
@keyframes nlmap-grow {
  from { transform: scale(0); }
  to { transform: scale(1); }
}
@keyframes nlmap-fade {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes nlmap-pulse {
  from { transform: scale(1); opacity: 0.85; }
  to { transform: scale(3.4); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .nlmap-dot, .nlmap-pin { animation: none; }
  .nlmap-ring { animation: none; opacity: 0; }
}
`;

export function NlMap({
  cities,
  highlight,
  labels = true,
  scale,
  className = "w-full",
  title = "Kaart van Nederland met de steden waar een coach werkt",
}: {
  cities: readonly NlMapCity[];
  /** The `name` of the city that gets the bigger pin and the wider ring. */
  highlight?: string;
  /** false draws the pins without their names. */
  labels?: boolean;
  /** Overrides the size the container query works out. 1 fits a 520px map. */
  scale?: number;
  /** Goes on the frame around the map, which is what carries the width. */
  className?: string;
  /** The accessible name of the picture. */
  title?: string;
}) {
  const interactive = cities.some((city) => city.href);

  return (
    <div className={`nlmap-frame ${className}`}>
      <svg
        aria-label={interactive ? title : undefined}
        // `overflow-visible` so a long name on the west coast, "Bergen op Zoom",
        // is not cut off by the edge of the box. It leans into the padding of
        // the frame around the map, which is where the client left 18px free.
        className="nlmap block h-auto w-full overflow-visible"
        fill="none"
        role={interactive ? "group" : "img"}
        style={
          scale === undefined
            ? undefined
            : ({ "--nlmap-scale": scale } as CSSProperties)
        }
        viewBox={`0 0 ${nlViewBox.width} ${nlViewBox.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {!interactive && <title>{title}</title>}
        <style>{css}</style>

        {/* The country carries no fill: the dots are the country. The outline is
          here so the shape still reads while the dots grow in, and so Zeeland
          and the Wadden islands keep the edge that makes them recognisable. */}
        <path
          className="nlmap-coast"
          d={nlOutlinePath}
          fillRule="evenodd"
          opacity="0.28"
          stroke="var(--color-violet-light, #8f75ff)"
          strokeLinejoin="round"
        />

        <NlMapDots />

        {cities.map((city, index) => {
          const { x, y } = projectPoint(city.at);
          const here = highlight !== undefined && city.name === highlight;
          const nudge = nlLabelNudges[city.name] ?? {};
          const left = (city.labelSide ?? nudge.labelSide) === "left";
          const labelDy = city.labelDy ?? nudge.labelDy;

          const pin = (
            <g
              className={`nlmap-pin${here ? " nlmap-here" : ""}`}
              style={
                {
                  "--nlmap-pin": `${900 + index * 140}ms`,
                  "--nlmap-ring": `${1400 + index * 340}ms`,
                } as CSSProperties
              }
            >
              {/* The ring is drawn before the pin, so it never covers the pin it
                comes from. A non-scaling stroke keeps it one hairline wide at
                every size the map is drawn at. */}
              <circle
                className="nlmap-ring"
                cx={x}
                cy={y}
                r={6}
                stroke="var(--color-coral, #ff6b4a)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {here && (
                <circle
                  className="nlmap-halo"
                  cx={x}
                  cy={y}
                  opacity="0.4"
                  r={15}
                  stroke="var(--color-coral, #ff6b4a)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              )}
              <circle
                className="nlmap-core"
                cx={x}
                cy={y}
                fill="var(--color-coral, #ff6b4a)"
                r={5.5}
                stroke="var(--color-paper, #faf8f4)"
                strokeWidth="2.5"
              />
              {labels && (
                /* paint-order puts the halo behind the letters, so a name stays
                 readable where it crosses the dot grid. */
                <text
                  className={`nlmap-label${left ? " nlmap-label-left" : ""}`}
                  fill="var(--color-ink, #1e1b4b)"
                  fontSize="12.5"
                  fontWeight="600"
                  paintOrder="stroke"
                  stroke="var(--color-lavender, #efebff)"
                  strokeWidth="4"
                  style={
                    labelDy === undefined
                      ? undefined
                      : ({ "--nlmap-dy": `${labelDy}px` } as CSSProperties)
                  }
                  textAnchor={left ? "end" : "start"}
                  x={x}
                  y={y}
                >
                  {city.name}
                </text>
              )}
            </g>
          );

          if (!city.href) return <g key={city.name}>{pin}</g>;

          /* The pin itself is seven pixels across, which no thumb can hit.
           This invisible circle is the link. The radius is in viewBox units
           and the CSS multiplies it by --nlmap-scale, so the smallest map we
           draw (the 245px column of a city page, scale 1.9) gives
           2 * 26 * 1.9 * 245 / 520 = 47px, over the 44px rule. Lowering the
           radius below 26 breaks that floor. */
          return (
            <Link aria-label={city.name} href={city.href} key={city.name}>
              {pin}
              <circle
                className="nlmap-hit"
                cx={x}
                cy={y}
                fill="transparent"
                r={26}
              />
            </Link>
          );
        })}
      </svg>
    </div>
  );
}

/** The dots of `nl-map-data.ts`, collected per row. Computed once, at module
 *  load, because the grid is the same on every page that shows the map. */
const dotRows = (() => {
  const rows = new Map<number, number[]>();
  for (const [x, y] of nlDots) {
    const row = rows.get(y);
    if (row) row.push(x);
    else rows.set(y, [x]);
  }
  return [...rows.entries()].map(([y, xs]) => ({ y, xs }));
})();

/**
 * The halftone grid, grouped by row.
 *
 * The entrance is a wipe from the top of the country to the bottom, so the
 * delay follows `y` and every dot in one row shares it: 37 dynamic values
 * instead of 529. The four jitter buckets break the straight line that a pure
 * row delay would otherwise draw across the map.
 */
function NlMapDots() {
  return (
    <g fill="var(--color-violet-light, #8f75ff)" opacity="0.55">
      {dotRows.map((row, rowIndex) => (
        <g
          key={row.y}
          style={
            { "--nlmap-row": `${Math.round(row.y * 1.4)}ms` } as CSSProperties
          }
        >
          {row.xs.map((x, index) => (
            <circle
              className={`nlmap-dot nlmap-j${(rowIndex + index) % 4}`}
              cx={x}
              cy={row.y}
              key={x}
              r={3.1}
            />
          ))}
        </g>
      ))}
    </g>
  );
}
