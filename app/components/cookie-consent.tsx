"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import {
  consentSnapshot,
  consentServerSnapshot,
  subscribeToConsent,
  writeConsent,
  type ConsentState,
} from "../consent";
import { button, shell } from "../shell";

/**
 * The two client pieces of the cookie question, and the only client JavaScript
 * on the pages that carry a map. Everything around them stays a server
 * component.
 *
 * PRODUCT.md, principle 4: calm is the feature, and the reader is worried. So
 * this is a bar and not a modal. It does not dim the page, it does not trap the
 * keyboard, it does not sit in front of the text, and it asks once. A no is an
 * answer, not a reason to ask again on the next visit.
 *
 * Both pieces read the same store, so the answer given in one is the answer in
 * the other, in the same frame, without a reload.
 */
function useConsent(): ConsentState {
  return useSyncExternalStore(
    subscribeToConsent,
    consentSnapshot,
    consentServerSnapshot,
  );
}

/**
 * The bar. It is the last child of the body and it is sticky, not fixed. That
 * choice does three things at once: the footer never moves, the bar is inside
 * the normal tab order after the footer instead of jumping in front of it, and
 * at the end of the page it parks under the footer instead of covering the last
 * links on the page. globals.css keeps room free below a focused element while
 * the bar is up, and gives the bar its one small entrance.
 */
export function CookieConsentBar() {
  const state = useConsent();

  // "unknown" means the browser has not read its storage yet. Rendering nothing
  // then is what keeps a returning visitor from seeing the bar flash by.
  if (state !== "unanswered") return null;

  return (
    <aside
      aria-label="Cookies"
      className="sticky bottom-0 z-10 border-t border-ink/20 bg-ochre text-ink"
      data-consent-bar
    >
      <div
        className={`${shell} flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10`}
      >
        {/* Two maps now: one on the home page, and one on a city page where a
            coach works. So this line names the home page as well. It stays
            indefinite about the other one ("een locatiepagina"), because a city
            without a coach has no map. See app/components/maps.tsx. */}
        <p className="max-w-[62ch]">
          Op de homepage en op een locatiepagina staat een kaart van Google. Die
          kaart zet cookies op je apparaat, dus we laden hem pas als jij het
          goedvindt. Dit is de enige vraag over cookies die we je stellen.
        </p>

        {/* Both answers get the same size, the same type and the same place.
            Only the fill differs, so yes is easy to find and no is just as easy
            to press. A no must never be the small grey word in the corner. */}
        <div className="flex shrink-0 flex-wrap items-center gap-4">
          <button
            className={button}
            onClick={() => writeConsent("granted")}
            type="button"
          >
            Kaart toestaan
          </button>
          <button
            className="border border-ink px-8 py-4 text-eyebrow uppercase transition-colors duration-150 ease-out-quart hover:bg-ink hover:text-paper"
            onClick={() => writeConsent("denied")}
            type="button"
          >
            Nee, liever niet
          </button>
        </div>
      </div>
    </aside>
  );
}

/**
 * Everything that would set a cookie of somebody else goes inside this gate.
 * Before a yes it renders a still block of the same size instead, with the
 * reason and a control that gives the yes on the spot.
 *
 * The caller passes the frame classes, so the placeholder and the thing behind
 * it have the same width, the same aspect ratio and the same border, and the
 * page does not jump when the map arrives.
 *
 * The children are only rendered after a yes. Before that they are not in the
 * DOM at all, so no request leaves for Google and no Google cookie is set.
 */
export function ConsentGate({
  agreeLabel,
  children,
  className,
  reason,
}: {
  agreeLabel: string;
  children: ReactNode;
  className: string;
  reason: string;
}) {
  const state = useConsent();

  if (state === "granted") return <>{children}</>;

  return (
    <div
      className={`flex flex-col items-start justify-center gap-6 p-6 sm:p-8 ${className}`}
    >
      {/* The same line before the question and after a no. In both cases the
          map is not there for the same reason, and in both cases the visitor
          can still change their mind here. */}
      <p className="max-w-[38ch]">{reason}</p>
      <button
        className={button}
        onClick={() => writeConsent("granted")}
        type="button"
      >
        {agreeLabel}
      </button>
    </div>
  );
}
