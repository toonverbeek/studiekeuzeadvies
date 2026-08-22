/**
 * What the things on this site cost. Every price is written here once, and
 * every page that prints one reads it from here.
 *
 * WHY IT EXISTS. The prices were decided on 2026-08-20 (docs/decisions.md) and
 * within a day five files were writing them out by hand: /tarieven, the home
 * page, app/traject.ts, app/faq.ts and /coach-worden. Four pages that each hold
 * their own copy of "€ 649" is four places to forget when the client raises it,
 * and the one that is forgotten is the one a reader quotes back at us. Five
 * separate reports from the rebuild asked for this file by name.
 *
 * WHAT MAY STAND HERE. Only a number the client has decided. No "vanaf", no
 * range, no old price, no placeholder (decision 2026-08-05, satisfied rather
 * than reversed by the decision of 2026-08-20). A number about us that is not a
 * price does not belong here at all: PRODUCT.md principle 5 keeps those off the
 * site altogether.
 *
 * THE FORM OF THE STRING. Sign, space, figure, no decimals, because every
 * price is whole: "€ 649", which is how the client writes it on every page of
 * the export. A page prints `label` as it is and never rebuilds it from
 * `amount`, so the euro sign cannot end up on one side of the site and not the
 * other.
 */

export type Price = {
  /** What a page prints: "€ 649". */
  label: string;
  /** The same figure as a number, for a JSON-LD offer or a calculation. */
  amount: number;
};

const euro = (amount: number): Price => ({ label: `€ ${amount}`, amount });

/**
 * The intake. It is free, and that is the one "price" on this site that is a
 * promise rather than a figure, so it is a sentence and not a Price.
 */
export const intakeIsFree = "Het intakegesprek is gratis en verplicht je tot niets.";

/** Vier gesprekken, één vaste coach, beide testen, opdrachten voor thuis. */
export const traject = euro(649);

/** De korte weg: dezelfde twee testen en één gesprek. */
export const scan = euro(249);

/**
 * One more conversation, per conversation. It is NOT a third product: it can be
 * added only after a scan or a traject, and only when the coach thinks it
 * helps. Any page that prints this number has to print that sentence with it.
 */
export const extraGesprek = euro(89);

/**
 * The one-off licence a new coach pays (/coach-worden). It is the only price on
 * this site the client has not fixed, so it is printed as an indication and it
 * says so in the same breath. See docs/redesign/client/GESPREK.md, section 5.
 */
export const coachLicence = {
  ...euro(750),
  label: `± € 750`,
  /** Print this beside the figure. Never the figure on its own. */
  note: "een indicatie, de definitieve prijs stemmen we samen af",
} as const;
