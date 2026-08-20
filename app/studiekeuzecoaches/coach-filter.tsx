"use client";

import { useState, type ReactNode } from "react";

/**
 * The region filter of the client's Coaches page (design-spec 3.15 and 4.4):
 * one row of chips above the grid, and the grid shows the coaches of the chip
 * you pressed.
 *
 * THE CARDS ARE NOT BUILT HERE. Each item carries a card that the page already
 * rendered on the server, so the portraits, the text and the links never cross
 * to the browser as data. This component owns one string of state and decides
 * which of those cards it renders. It is the whole reason the file says "use
 * client" and the rest of the page does not.
 *
 * Without JavaScript the chips do nothing and every coach stands in the grid,
 * which is the state a reader needs. Nothing is hidden by a script that cannot
 * run.
 */

/**
 * The chip that shows everybody. Also the state a page loads in.
 *
 * One word, because the row already carries the label "Filter op regio:" and
 * the group its own `aria-label`. "Alle regio's" said regio twice and was
 * wider than every other chip.
 */
export const allRegions = "Alle";

export type FilterItem = {
  /** The coach slug: the React key and the anchor of the card. */
  key: string;
  /** The chip this card answers to. The town of the coach. */
  region: string;
  card: ReactNode;
};

const chipBase =
  "inline-flex min-h-11 items-center rounded-full border px-4.5 py-2 text-small font-semibold transition-colors duration-150 ease-out-quart";

export function CoachFilter({
  items,
  regions,
}: {
  items: FilterItem[];
  /** The towns, in roster order. `allRegions` is added in front of them. */
  regions: string[];
}) {
  const [picked, setPicked] = useState(allRegions);

  const shown =
    picked === allRegions
      ? items
      : items.filter((item) => item.region === picked);

  return (
    <>
      <div
        aria-label="Filter op regio"
        className="flex flex-wrap items-center gap-2 border-t-[1.5px] border-ink pt-6 lg:pt-7"
        role="group"
      >
        <span className="font-display mr-1 text-small font-semibold">
          Filter op regio:
        </span>

        {[allRegions, ...regions].map((region) => {
          const on = region === picked;

          return (
            <button
              aria-pressed={on}
              className={`${chipBase} ${
                on
                  ? "border-ink bg-ink text-paper"
                  : "border-chip-border bg-white hover:border-violet hover:text-violet"
              }`}
              key={region}
              onClick={() => setPicked(region)}
              type="button"
            >
              {region}
            </button>
          );
        })}
      </div>

      {/* The chips change the page under the reader's thumb, so say what
          happened for somebody who cannot see it. */}
      <p aria-live="polite" className="sr-only">
        {shown.length === items.length
          ? `Alle ${items.length} coaches staan in de lijst.`
          : `${shown.length} van de ${items.length} coaches, in ${picked}.`}
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-9 lg:grid-cols-3">
        {shown.map((item) => (
          <li className="flex" key={item.key}>
            {item.card}
          </li>
        ))}
      </ul>
    </>
  );
}
