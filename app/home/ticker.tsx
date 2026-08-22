"use client";

import { useState } from "react";
import { citiesWithCoach } from "../cities";

/**
 * The ink strip under the hero (design-spec 3.21).
 *
 * WHAT IT MAY SAY. The client's strip runs "8,8 gemiddelde beoordeling",
 * "92% studeert met plezier door" and "35+ locaties in Nederland". Those three
 * are the old site's own numbers and not one of them is proven of us
 * (PRODUCT.md, principle 5), so they are gone. What is left is true today, and
 * the count of cities is read from app/cities.ts, so the strip cannot drift
 * away from the map and the footer.
 *
 * WHY IT MOVES. PRODUCT.md bans counters and urgency; a slow line of facts is
 * neither. It travels once every 36 seconds and it stops under the pointer.
 * Under `prefers-reduced-motion` it does not move at all: the second copy is
 * removed and the facts wrap on one still row.
 *
 * WHY THERE IS A BUTTON. WCAG 2.2.2 asks for a way to stop anything that moves
 * for longer than five seconds, and that way may not need a mouse. The hover
 * rule serves the pointer only, and the old `:focus-within` rule served nobody
 * at all, because the track held no focusable element. The toggle is that
 * control: 44px, it takes the keyboard and it takes a finger. It is hidden
 * where the strip already stands still.
 *
 * The `<style>` element is here and not in app/globals.css because that file
 * belongs to the Foundation phase. Every class name is prefixed `home-ticker`,
 * so nothing can reach out of this component.
 */

const cityFact =
  citiesWithCoach.length === 1
    ? "1 stad en online"
    : `${citiesWithCoach.length} steden en online`;

const facts = [
  "Gratis intake",
  "MBO · HBO · WO",
  "Alle gesprekken 1-op-1",
  "Ook bij ADD, ADHD of autisme",
  "Online of op locatie",
  "Eén vaste coach",
  cityFact,
];

const css = `
@keyframes home-ticker-run {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.home-ticker-track {
  display: flex;
  width: max-content;
  animation: home-ticker-run 36s linear infinite;
}

.home-ticker:hover .home-ticker-track,
.home-ticker-paused .home-ticker-track {
  animation-play-state: paused;
}

/* The facts run into the button, so the last 3rem of the window fades out and
   a word is never cut off against the icon. The still, wrapped row of the
   reduced-motion strip has no such edge, so it keeps its full ink. */
@media (prefers-reduced-motion: no-preference) {
  .home-ticker-window {
    -webkit-mask-image: linear-gradient(to right, black calc(100% - 3rem), transparent);
    mask-image: linear-gradient(to right, black calc(100% - 3rem), transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-ticker-track {
    animation: none;
    width: 100%;
  }

  .home-ticker-track ul {
    flex-wrap: wrap;
    justify-content: center;
  }

  .home-ticker-copy,
  .home-ticker-toggle {
    display: none;
  }
}
`;

function Facts({ copy = false }: { copy?: boolean }) {
  return (
    <ul
      aria-hidden={copy ? "true" : undefined}
      className={`flex ${copy ? "home-ticker-copy" : ""}`}
    >
      {facts.map((fact) => (
        <li
          className="flex items-center gap-5 px-5 font-mono text-[0.875rem] font-medium whitespace-nowrap text-lavender-ink"
          key={fact}
        >
          {fact}
          <span aria-hidden="true" className="text-coral">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export function HomeTicker() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`home-ticker flex items-center bg-ink ${paused ? "home-ticker-paused" : ""}`}
    >
      <style>{css}</style>

      <div className="home-ticker-window grow overflow-hidden py-3.5">
        {/* The list is printed twice, so translating the track by half its
            width lands exactly on the start of the second copy and the loop
            has no seam. The second copy is decoration and says nothing new. */}
        <div className="home-ticker-track">
          <Facts />
          <Facts copy />
        </div>
      </div>

      <button
        aria-label="Beweging van de feitenregel pauzeren"
        aria-pressed={paused}
        className="home-ticker-toggle mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lavender-ink transition-colors duration-150 ease-out-quart hover:bg-white/10 hover:text-paper"
        onClick={() => setPaused((state) => !state)}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="h-3.5 w-3.5"
          fill="currentColor"
          viewBox="0 0 12 12"
        >
          {paused ? (
            <path d="M2 1.2 10.5 6 2 10.8Z" />
          ) : (
            <path d="M2 1h3v10H2zM7 1h3v10H7z" />
          )}
        </svg>
      </button>
    </div>
  );
}
