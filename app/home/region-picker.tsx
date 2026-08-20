"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { Button } from "../components/ui";

/**
 * The regio-kiezer of the home page (design-spec 3.15): chips for the places a
 * reader can pick, and one card that changes with the chip.
 *
 * WHAT IS DIFFERENT FROM THE CLIENT'S BOX. Theirs lists seven cities and writes
 * "Coach in Rotterdam" under three of them where nobody works. This one is
 * built from `citiesWithCoach` in app/cities.ts and from the real people in
 * app/coaches.ts, so a city can only appear here once a coach is in the file
 * (PRODUCT.md, principle 5). "Online" is the seventh option on their list that
 * is true of us, so it stays, with a row that promises a way of working and
 * not a person.
 *
 * The options are built on the server and handed over as data. That keeps the
 * coach biographies out of the browser bundle: the card needs a name, a line
 * and a link, and nothing else.
 */

export type RegionOption = {
  /** `aria-pressed` is keyed on this, so it has to be unique. */
  key: string;
  /** The word on the chip. */
  chip: string;
  /** The heading of the card: a coach, or the way of working. */
  name: string;
  /** One sentence under the name. */
  line: string;
  href: string;
  cta: string;
  /** Only a real coach with a real photo has one. Everybody else gets the
   *  striped circle the client drew, which claims no face. */
  portrait: { src: StaticImageData; alt: string } | null;
};

export function RegionPicker({ options }: { options: RegionOption[] }) {
  const [picked, setPicked] = useState(options[0]?.key);
  const current = options.find((option) => option.key === picked) ?? options[0];

  if (!current) return null;

  return (
    <div className="rounded-card bg-lavender p-6 sm:p-9">
      <p
        className="font-display text-[0.875rem] font-semibold"
        id="regio-kiezer-label"
      >
        Waar wil je begeleiding?
      </p>

      <div
        aria-labelledby="regio-kiezer-label"
        className="mt-3.5 flex flex-wrap gap-2"
        role="group"
      >
        {options.map((option) => {
          const on = option.key === current.key;
          return (
            <button
              aria-pressed={on}
              className={`inline-flex min-h-11 items-center rounded-full border px-4.5 text-small font-semibold transition-colors duration-150 ease-out-quart ${
                on
                  ? "border-ink bg-ink text-paper"
                  : "border-chip-border bg-white text-ink hover:border-violet hover:text-violet"
              }`}
              key={option.key}
              onClick={() => setPicked(option.key)}
              type="button"
            >
              {option.chip}
            </button>
          );
        })}
      </div>

      {/* One region at a time, so the card is a live region: a reader who
          cannot see the chip change still hears which coach came up. */}
      <div aria-live="polite" className="mt-5">
        {/* Top aligned, not centred as the client draws it: at 320px the
            sentence runs to five lines and a centred portrait then floats
            beside the middle of it, away from the name it belongs to. */}
        <div className="flex items-start gap-4 rounded-box bg-white p-5 sm:p-6">
          {current.portrait ? (
            <Image
              alt={current.portrait.alt}
              className="h-13 w-13 shrink-0 rounded-full object-cover"
              height={52}
              src={current.portrait.src}
              width={52}
            />
          ) : (
            <span
              aria-hidden="true"
              className="h-13 w-13 shrink-0 rounded-full bg-[repeating-linear-gradient(45deg,#e0d8f7_0_6px,#e8e2fa_6px_12px)]"
            />
          )}
          <div>
            <p className="font-display text-[1rem] font-semibold">
              {current.name}
            </p>
            <p className="mt-1 text-small text-muted">{current.line}</p>
          </div>
        </div>

        <Button className="mt-4.5" href={current.href}>
          {current.cta}
        </Button>
      </div>
    </div>
  );
}
