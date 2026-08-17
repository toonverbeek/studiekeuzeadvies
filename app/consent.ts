/**
 * Cookie consent. One question: may we load the parts of this site that come
 * from somebody else? Today that is the two Google maps and nothing else, but
 * the question is written wider than the map on purpose, so a video or a form
 * of a third party needs no second bar and no second answer. Wrap it in
 * ConsentGate and it is covered.
 *
 * WHY THE ANSWER LIVES IN localStorage AND NOT IN A COOKIE
 *
 * Every page of this site is prerendered at build time. See dynamicParams and
 * generateStaticParams in app/locaties/[stad]/page.tsx. Reading the answer with
 * cookies() from next/headers is a request-time API, and the Next 16 guide says
 * it opts the route that uses it into dynamic rendering. In the root layout
 * that means every page of the site, and the whole purchase was the rankings on
 * fast static pages. So a cookie would cost us the thing we bought.
 *
 * Nothing on the server needs the answer either. The only thing that acts on it
 * is an iframe in the browser. A cookie would travel up with every request for
 * every file and never be read.
 *
 * So the answer stays in the browser: first party, one key, two values, and we
 * set no cookie of our own to remember that somebody did not want a cookie.
 *
 * Read against node_modules/next/dist/docs/01-app/03-api-reference/04-functions/cookies.md
 * on 2026-08-15.
 *
 * This file holds no React and no Next import on purpose, so a server component
 * can read the key or the type without pulling anything into the client bundle.
 */

/** The two answers a visitor can give. There is no third one. */
export type ConsentChoice = "granted" | "denied";

/**
 * What the interface knows at this moment.
 * - "unknown": the browser has not read its own storage yet. This is what the
 *   server renders, so a returning visitor never sees the bar flash by.
 * - "unanswered": read, and the visitor has not answered. Ask now.
 */
export type ConsentState = ConsentChoice | "unanswered" | "unknown";

/**
 * First party, one key, prefixed so it is recognisable in devtools.
 *
 * It was "ska:kaart-cookies" until 2026-08-17. The question is not about the
 * map any more, it is about anything of somebody else, and the key said the old
 * thing. An answer under the old key is simply asked again, which costs nobody
 * anything: the site has no visitors yet.
 */
export const consentStorageKey = "ska:cookies";

/** Same tab: the bar and the map must agree the moment one of them is used. */
const consentEventName = "ska:consent-change";

/**
 * The fallback when the browser refuses storage (private mode, storage off).
 * The answer then holds for this page and we ask again on the next visit. That
 * is the safe side: we would rather ask twice than load Google without a yes.
 */
let answeredThisVisit: ConsentChoice | null = null;

function isChoice(value: string | null): value is ConsentChoice {
  return value === "granted" || value === "denied";
}

/** The client snapshot for useSyncExternalStore. */
export function consentSnapshot(): ConsentState {
  try {
    const stored = window.localStorage.getItem(consentStorageKey);
    if (isChoice(stored)) return stored;
  } catch {
    // Storage can throw before we ever get a value out of it.
  }
  return answeredThisVisit ?? "unanswered";
}

/** The server snapshot, and the one React hydrates with. We know nothing yet. */
export function consentServerSnapshot(): ConsentState {
  return "unknown";
}

export function writeConsent(choice: ConsentChoice): void {
  answeredThisVisit = choice;
  try {
    window.localStorage.setItem(consentStorageKey, choice);
  } catch {
    // See answeredThisVisit above. The page still obeys the answer right now.
  }
  window.dispatchEvent(new Event(consentEventName));
}

export function subscribeToConsent(onChange: () => void): () => void {
  // The custom event carries the answer across this page: press yes in the map
  // and the bar goes away. The storage event carries it across the other tabs
  // this visitor has open, so they do not each ask their own question.
  window.addEventListener(consentEventName, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(consentEventName, onChange);
    window.removeEventListener("storage", onChange);
  };
}
