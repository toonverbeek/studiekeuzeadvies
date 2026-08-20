import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ElementType,
  ReactNode,
} from "react";

export { Reveal } from "./reveal";

/**
 * The primitives of the client's design system (docs/redesign/design-spec.md).
 * A page builds with these, never with a hand-written pill or a hand-written
 * card: one shape, one radius, one shadow, on every page.
 *
 * Everything here is a server component except Reveal, which is re-exported
 * from ./reveal so that a page needs one import.
 */

/* ---------------------------------------------- The three shared strings --
   Not components, because they are handed to somebody else's className: a
   Reveal that is also the grid row, or an <a> that MDX renders. They came
   from app/shell.ts, which was the bridge from the ochre system and is gone.
   ------------------------------------------------------------------------ */

/**
 * The reading row of this site: the question in a 20rem margin column, the
 * answer beside it. Every long section uses it, so the answer column starts on
 * the same line from /veelgestelde-vragen to the last city page. Four files
 * had written this same string out.
 */
export const readingRow =
  "grid gap-x-14 gap-y-5 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]";

/**
 * A link inside a sentence. Violet and bold on every surface: the underline is
 * the quiet state and the colour is the loud one. `Button variant="ghost"` is
 * the link that stands on its own; these two are the link inside a paragraph.
 */
export const linkOnPaper =
  "font-bold text-violet underline decoration-violet/40 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-violet";

/** The same link on a soft violet surface, where violet needs the dark step. */
export const linkOnSoft =
  "font-bold text-violet-dark underline decoration-violet/40 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-violet";

/* ------------------------------------------------------------------ Button */

export type ButtonVariant =
  | "primary"
  | "dark"
  | "outline"
  | "outline-on-ink"
  | "light"
  | "ghost";
export type ButtonSize = "md" | "lg";

type ButtonOwnProps = {
  /**
   * primary = violet with its shadow, dark = ink, outline = 1.5px ink rule,
   * ghost = the violet text link (write the arrow into the label yourself).
   *
   * The two variants for a coloured surface: `light` is the white pill that
   * stands on violet, `outline-on-ink` the 1.5px paper rule that stands on ink.
   * Both are real variants and not a `className`, because two utilities for the
   * same property are ordered by Tailwind's own generation order and not by the
   * order of the string, so `variant="outline" className="border-paper/40"` is
   * a coin toss. Four pages had written this by hand before it existed.
   */
  variant?: ButtonVariant;
  /** md = 14.5px in a card or a panel, lg = 15.5px in a hero or a CTA band. */
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

export type ButtonProps = ButtonOwnProps &
  (
    | ({ href: string } & Omit<
        ComponentProps<typeof Link>,
        "href" | "className" | "children"
      >)
    | ({ href?: undefined } & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "className" | "children"
      >)
  );

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-center transition-colors duration-150 ease-out-quart";

const buttonSize: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-button",
  lg: "px-8 py-4 text-button-lg",
};

const buttonVariant: Record<ButtonVariant, string> = {
  primary: "bg-violet font-bold text-white shadow-violet hover:bg-violet-dark",
  dark: "bg-ink font-semibold text-paper hover:bg-violet",
  outline:
    "border-[1.5px] border-ink font-semibold text-ink hover:border-violet hover:text-violet",
  "outline-on-ink":
    "border-[1.5px] border-paper/40 font-semibold text-paper hover:border-paper",
  light: "bg-white font-bold text-violet-dark hover:bg-lavender",
  ghost: "font-bold text-violet hover:text-violet-dark",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  ...rest
}: ButtonProps) {
  // A ghost is a link inside a sentence, so it carries no padding; every other
  // variant is a pill and clears 44px on the shortest side.
  const classes = `${buttonBase} ${variant === "ghost" ? "" : buttonSize[size]} ${buttonVariant[variant]} ${className}`;

  if (href !== undefined) {
    return (
      <Link
        className={classes}
        href={href}
        {...(rest as Omit<ComponentProps<typeof Link>, "href" | "className">)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

/* ----------------------------------------------------------------- Eyebrow */

export type EyebrowColor =
  | "violet"
  | "coral"
  | "lavender-ink"
  | "lavender-soft"
  | "muted";

const eyebrowColor: Record<EyebrowColor, string> = {
  violet: "text-violet",
  coral: "text-coral-text",
  "lavender-ink": "text-lavender-ink",
  "lavender-soft": "text-lavender-soft",
  muted: "text-muted",
};

/** The mono label above a heading. `sm` is the one inside a card. */
export function Eyebrow({
  as: Tag = "p",
  color = "violet",
  size = "md",
  className = "",
  children,
}: {
  as?: ElementType;
  color?: EyebrowColor;
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={`eyebrow ${size === "sm" ? "text-eyebrow-sm" : "text-eyebrow"} ${eyebrowColor[color]} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------- Pill */

export type PillTone = "lavender" | "white" | "glass" | "coral" | "amber";

const pillTone: Record<PillTone, string> = {
  // violet-dark, not violet: violet on lavender is 4.4:1 and the pill text is
  // small and bold. The difference is invisible, the contrast is not.
  lavender: "bg-lavender text-violet-dark",
  white: "bg-white text-violet-dark",
  glass: "bg-white/10 text-paper ring-1 ring-white/20 ring-inset",
  coral: "bg-coral-tint text-coral-text",
  amber: "bg-amber-tint text-amber-ink",
};

/**
 * A small round label: a tag, a chip that is not a control, a fact.
 *
 * With `href` it becomes a control, and then it clears 44px on the short side,
 * because a jump link the size of a caption is not a touch target. That is the
 * shape the "Op deze pagina" index, the FAQ answer links and the "ander niveau"
 * links all wanted, and all three were writing it by hand.
 */
export function Pill({
  tone = "lavender",
  size = "md",
  className = "",
  children,
  href,
  ...rest
}: {
  tone?: PillTone;
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
} & (
  | ({ href: string } & Omit<
      ComponentProps<typeof Link>,
      "href" | "className" | "children"
    >)
  | { href?: undefined }
)) {
  const classes = `inline-flex items-center gap-2 rounded-full font-bold ${
    size === "sm" ? "px-4 py-1.5 text-[0.8125rem]" : "px-4.5 py-2 text-small"
  } ${pillTone[tone]} ${className}`;

  if (href !== undefined) {
    return (
      <Link
        className={`${classes} min-h-11 transition-colors duration-150 ease-out-quart hover:bg-violet hover:text-white`}
        href={href}
        {...(rest as Omit<ComponentProps<typeof Link>, "href" | "className">)}
      >
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}

/* ------------------------------------------------------------------- Check */

export type CheckTone = "violet" | "amber" | "coral";

const checkTone: Record<CheckTone, string> = {
  violet: "text-violet",
  amber: "text-amber",
  coral: "text-coral",
};

/**
 * One row of a check list. The mark is decoration and is hidden from a screen
 * reader, which reads the list as a list and does not say "check" eight times.
 * Amber on ink, violet on paper, coral where the client asks for it.
 */
export function Check({
  as: Tag = "li",
  tone = "violet",
  mark = "✓",
  className = "",
  children,
}: {
  as?: ElementType;
  tone?: CheckTone;
  /** The mark itself: a check, an arrow, a number. */
  mark?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`flex gap-3 ${className}`}>
      <span aria-hidden="true" className={`font-bold ${checkTone[tone]}`}>
        {mark}
      </span>
      <span>{children}</span>
    </Tag>
  );
}

/* --------------------------------------------------------------- Container */

/**
 * The page gutter. The content column is 1160px, which is the client's own
 * measure, and the 48px gutter sits OUTSIDE it: `max-w-shell` is 1256px and the
 * padding is inside that box, so from 1256px up the text column is exactly the
 * 1160px every page of the export is drawn at. `max-w-shell` was 1160px
 * including the padding until 2026-08-20, which left a 1064px column and wrapped
 * four h1s one line further than the client's. 24px of air on a telephone.
 */
export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-shell px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------------- Section */

export type SectionSpace = "sm" | "md" | "lg" | "close" | "none";

const spaceAbove: Record<SectionSpace, string> = {
  sm: "pt-10 lg:pt-14", // 40 -> 56
  md: "pt-12 lg:pt-18", // 48 -> 72
  lg: "pt-14 lg:pt-22", // 56 -> 88
  close: "", // the closing band opens flush against the section above it
  none: "",
};

const spaceBelow: Record<SectionSpace, string> = {
  sm: "pb-10 lg:pb-14",
  md: "pb-12 lg:pb-18",
  lg: "pb-14 lg:pb-22",
  close: "pb-14 lg:pb-22",
  none: "",
};

/**
 * Vertical rhythm. Desktop values from the spec, about 60% of them on small.
 *
 * `space` sets both ends; `top` and `bottom` set one of them. Ask for those
 * rather than writing `className="pt-0"`: the built-in value carries a media
 * query, a media-query utility is generated later in the sheet than a plain
 * one, and the plain `pt-0` therefore loses at lg and only at lg. That silently
 * left 136px of air under the hero of /artikelen.
 */
export function Section({
  as: Tag = "section",
  space = "md",
  top,
  bottom,
  className = "",
  id,
  children,
}: {
  as?: ElementType;
  space?: SectionSpace;
  /** Overrides the top half of `space`. */
  top?: SectionSpace;
  /** Overrides the bottom half of `space`. */
  bottom?: SectionSpace;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={`${spaceAbove[top ?? space]} ${spaceBelow[bottom ?? space]} ${className}`}
      id={id}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------- Card */

export type CardVariant = "default" | "indigo" | "lavender" | "dashed";
export type CardPad = "none" | "sm" | "md" | "lg";
export type CardRadius = "card" | "card-sm" | "panel";

const cardVariant: Record<CardVariant, string> = {
  default: "border border-hairline bg-white",
  indigo: "bg-ink text-paper",
  lavender: "bg-lavender",
  dashed: "border-[1.5px] border-dashed border-chip-border bg-white",
};

/**
 * The client draws the same surface at two sizes: a card is 24px, a panel that
 * holds a whole section is 28px. `lavender` is a panel by default, because the
 * client never draws a small one; every other surface is a card until a page
 * asks. Before this prop the two ink panels of the home page, the ink panel of
 * /voor-wie and the white panel of /studiekeuzetraject were hand-written divs.
 */
const cardRadius: Record<CardRadius, string> = {
  card: "rounded-card",
  "card-sm": "rounded-card-sm",
  panel: "rounded-panel",
};

const cardPad: Record<CardPad, string> = {
  none: "",
  sm: "p-6",
  md: "p-7 sm:p-8",
  lg: "p-6 sm:p-10 lg:p-13",
};

export function Card({
  as: Tag = "div",
  variant = "default",
  pad = "md",
  radius,
  className = "",
  children,
}: {
  as?: ElementType;
  variant?: CardVariant;
  pad?: CardPad;
  /** Defaults to `panel` for lavender, `card` for every other variant. */
  radius?: CardRadius;
  className?: string;
  children: ReactNode;
}) {
  const shape =
    cardRadius[radius ?? (variant === "lavender" ? "panel" : "card")];

  return (
    <Tag
      className={`${shape} ${cardVariant[variant]} ${cardPad[pad]} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------- Badge */

/** The little label that sits on the edge of a card ("Aanbevolen"). Position
 *  it from the card: `className="absolute -top-3.5 left-1/2 -translate-x-1/2"`. */
export function Badge({
  tone = "amber",
  className = "",
  children,
}: {
  tone?: "amber" | "lavender";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-4 py-1.5 text-[0.78125rem] font-bold ${
        tone === "amber" ? "bg-amber text-ink" : "bg-lavender text-violet-dark"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- LogoMark */

/**
 * Three steps rising to the right, ending in a coral dot. The client's own
 * mark, drawn exactly as the export draws it (design-spec 3.1).
 */
export function LogoMark({
  size = 30,
  tone = "violet",
  className = "",
}: {
  size?: number;
  /** `light` is the path on an ink surface; the dot stays coral in both. */
  tone?: "violet" | "light";
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 44 44"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 36 L16 36 L16 26 L26 26 L26 16 L36 16 L36 8"
        stroke={tone === "light" ? "#8f75ff" : "#6d4aff"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <circle cx="36" cy="8" fill="#ff6b4a" r="4.5" />
    </svg>
  );
}

/**
 * The name. On paper the second half is violet, on ink the whole word is paper:
 * the client writes it that way in the nav and in the footer.
 */
export function Wordmark({
  tone = "duo",
  className = "",
}: {
  tone?: "duo" | "paper";
  className?: string;
}) {
  return (
    <span
      className={`font-display font-bold tracking-[-0.02em] ${
        tone === "paper" ? "text-paper" : "text-ink"
      } ${className}`}
    >
      studiekeuze
      {tone === "duo" ? <span className="text-violet">advies</span> : "advies"}
    </span>
  );
}

/* ----------------------------------------------------------------- CtaBand */

export type CtaLink = { href: string; label: string };

/**
 * The closing band of a page: the mark, two lines of heading, one sentence and
 * up to two buttons. The second line is the violet one.
 *
 * `primary` IS OPTIONAL, AND THE RULE FOR LEAVING IT OUT IS DISTANCE.
 * /veelgestelde-vragen and /ervaringen put this band directly above a
 * `ContactSection`, which carries the same invitation, the same three steps
 * and, word for word, the same two buttons: two closings within one screen,
 * asking the reader twice. There the band keeps its own words and gives up its
 * buttons. Where a "Lees ook" block stands between the two (the level pages,
 * the situation pages, an article) the button is a shortcut past that block
 * and it stays.
 */
export function CtaBand({
  accent,
  className = "",
  id,
  mark = false,
  primary,
  secondary,
  text,
  title,
}: {
  /** The second line of the heading, printed in violet. */
  accent?: ReactNode;
  className?: string;
  id?: string;
  /** The logo above the heading. The client uses it on the home page only. */
  mark?: boolean;
  /** Leave it out on a page whose `ContactSection` carries the buttons. */
  primary?: CtaLink;
  /** Ignored without a `primary`: there is no second button on its own. */
  secondary?: CtaLink;
  text?: ReactNode;
  title: ReactNode;
}) {
  return (
    <Section className={className} id={id} space="close">
      <Container className="text-center">
        {mark ? <LogoMark className="mx-auto mb-4" size={46} /> : null}

        <h2 className="text-h2-lg font-bold">
          {title}
          {accent ? <span className="block text-violet">{accent}</span> : null}
        </h2>

        {text ? (
          <p className="mt-4 mx-auto max-w-[29rem] text-muted">{text}</p>
        ) : null}

        {primary ? (
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button
              className="max-[420px]:w-full"
              href={primary.href}
              size="lg"
            >
              {primary.label}
            </Button>
            {secondary ? (
              <Button
                className="max-[420px]:w-full"
                href={secondary.href}
                size="lg"
                variant="outline"
              >
                {secondary.label}
              </Button>
            ) : null}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- PageIndex */

export type Jump = { href: string; label: string };

/**
 * The "Op deze pagina" index of Hero A (design-spec 6.2). One list in two
 * shapes: a paper card with 44px hairline rows from lg, a row of lavender
 * pills below it. One piece of markup for both, so a screen reader hears every
 * link once, and so a jump link is never duplicated in the DOM.
 *
 * It lives here because six pages carry it and three of them had written the
 * same twenty-five lines: the three level pages, the three situation pages,
 * /studiekeuzetraject, /veelgestelde-vragen and the city pages.
 */
export function PageIndex({
  items,
  className = "",
  label = "Op deze pagina",
  tone = "hairline",
}: {
  items: readonly Jump[];
  className?: string;
  /** The mono heading, and the accessible name of the nav. */
  label?: string;
  /** `ink` is the 1.5px rule a page with the ink accent draws around it. */
  tone?: "hairline" | "ink";
}) {
  return (
    <nav
      aria-label={label}
      className={`lg:rounded-card lg:bg-white lg:px-8 lg:py-7 ${
        tone === "ink"
          ? "lg:border-[1.5px] lg:border-ink"
          : "lg:border lg:border-hairline"
      } ${className}`}
    >
      <Eyebrow className="mb-3" size="sm">
        {label}
      </Eyebrow>

      <ul className="flex flex-wrap gap-2 lg:block">
        {items.map((item) => (
          <li
            className="lg:border-t lg:border-hairline lg:first:border-t-0"
            key={item.href}
          >
            <a
              className="inline-flex min-h-11 items-center rounded-full bg-lavender px-4 text-small font-bold text-violet-dark transition-colors duration-150 ease-out-quart hover:bg-violet hover:text-white lg:w-full lg:rounded-none lg:bg-transparent lg:px-0 lg:text-body lg:font-normal lg:text-ink lg:hover:bg-transparent lg:hover:text-violet"
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ---------------------------------------------------------------- PageHero */

/**
 * The way a page opens: a mono eyebrow, the title, one sentence, and whatever
 * the page adds under it (buttons, pills, an index card). `center` is the
 * Tarieven and Artikelen shape, `left` the shape of every other page.
 *
 * `aside` is the right-hand half of "Hero A": an index card, a fact card, a
 * map. From lg the hero becomes two columns and the aside stands beside the
 * title; below lg it follows underneath, where a reader meets it after the
 * sentence that says what the page is. Two pages hand-built this hero before
 * the slot existed, because PageHero renders its own Container.
 */
export function PageHero({
  align = "left",
  aside,
  children,
  className = "",
  eyebrow,
  lede,
  size = "page",
  title,
  titleClassName = "",
}: {
  align?: "left" | "center";
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
  eyebrow?: ReactNode;
  lede?: ReactNode;
  /** `hero` is the home page scale (58px), `page` every other page (50px). */
  size?: "hero" | "page";
  title: ReactNode;
  /** For the one title that needs a wider measure than the 19ch default. */
  titleClassName?: string;
}) {
  const centred = align === "center";

  const head = (
    <>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}

      {/* `titleClassName` REPLACES the measure, it does not stand beside it.
          Two `max-w-[...]` utilities in one string are ordered by Tailwind's own
          generation order and not by the order they are written, so a page that
          wants a wider title has to take the default one away. */}
      <h1
        className={`${size === "hero" ? "text-hero" : "text-h1"} font-bold ${
          centred ? "mx-auto" : ""
        } ${titleClassName || (centred ? "max-w-[22ch]" : "max-w-[19ch]")}`}
      >
        {title}
      </h1>

      {lede ? (
        <p
          className={`text-lead mt-5 max-w-[34rem] text-muted ${centred ? "mx-auto" : ""}`}
        >
          {lede}
        </p>
      ) : null}

      {children}
    </>
  );

  return (
    <header className={`pt-12 pb-10 lg:pt-18 lg:pb-12 ${className}`}>
      <Container className={centred ? "text-center" : ""}>
        {aside ? (
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
            <div>{head}</div>
            {aside}
          </div>
        ) : (
          head
        )}
      </Container>
    </header>
  );
}
