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
import { button, buttonOnInk, shell } from "../shell";

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
      // INK, NOT OCHRE. The bar used to be ochre, and it lay over ochre bands
      // half the time: on the home page it could arrive on top of one. A bar
      // that asks a question has to be an object on the page, not another band
      // of it. Ink is the one surface this site keeps for that, and the thin
      // ochre line on top separates it from the footer, which is ink as well.
      className="sticky bottom-0 z-10 border-t border-ochre-line bg-ink text-paper"
      data-consent-bar
    >
      <div
        className={`${shell} flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10`}
      >
        {/* THIS LINE NAMES NO PAGE, ON PURPOSE. It named the city page, and
            then the home page as well, and it would have to be edited again for
            every embed we add. It says what the answer covers instead: anything
            of somebody else. The map is the example, not the rule, so a video
            or a form of a third party is already covered here. Wrap it in
            ConsentGate and this bar needs no new sentence.

            "Zelf zetten we er geen" is true and it is checked: this site has no
            analytics and no third party script, and the answer to this very
            question lives in localStorage and not in a cookie (app/consent.ts).
            Add anything that sets a cookie of our own and this sentence has to
            go first. */}
        <p className="max-w-[62ch]">
          Sommige onderdelen op deze site komen van iemand anders, zoals een
          kaart van Google. Die zetten cookies op je apparaat, dus we laden ze
          pas als jij het goedvindt. Zelf zetten we er geen. Dit is de enige
          vraag over cookies die we je stellen.
        </p>

        {/* Both answers get the same size, the same type and the same place.
            Only the fill differs, so yes is easy to find and no is just as easy
            to press. A no must never be the small grey word in the corner.

            They cannot use the ink button of the rest of the site, because an
            ink block on an ink bar is a hole. The pair keeps its relation and
            swaps its colours: the yes is filled, the no is the same shape in
            outline, both in paper. */}
        <div className="flex shrink-0 flex-wrap items-center gap-4">
          <button
            className={buttonOnInk}
            onClick={() => writeConsent("granted")}
            type="button"
          >
            Cookies toestaan
          </button>
          <button
            className="border border-paper px-8 py-4 text-eyebrow uppercase transition-colors duration-150 ease-out-quart hover:bg-paper hover:text-ink"
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
