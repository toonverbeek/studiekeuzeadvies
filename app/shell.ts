/** The page gutter. One value, so every section on every page lines up. */
export const shell = "mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16";

/**
 * The reading row of this site: the question on the left, the answer on the
 * right. Every long section uses it, so the answer column starts on the same
 * line from the home page to the last article.
 */
export const readingRow =
  "grid gap-x-16 gap-y-5 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]";

/*
 * Links carry an underline at rest, never a colour change alone. The decoration
 * is the quiet state and the ink is the loud one, so a link is visible without
 * shouting and the hover still has somewhere to go.
 */

/** A link inside text on an ochre surface. */
export const linkOnOchre =
  "font-medium underline decoration-ink/40 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink";

/** A link inside text on a paper surface. */
export const linkOnPaper =
  "font-medium underline decoration-ochre-line decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink";

/** A link inside text on the ink surface of the footer. */
export const linkOnInk =
  "underline decoration-paper/30 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-paper";

/** The one button of this site. A flat ink block, never a rounded pill. */
export const button =
  "bg-ink px-8 py-4 text-eyebrow uppercase text-paper transition-colors duration-150 ease-out-quart hover:bg-ochre-deep";
