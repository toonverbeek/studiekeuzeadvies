import Link from "next/link";
import { SiteNav, type NavItem } from "./site-nav";
import { LogoMark, Wordmark } from "./ui";

export type { NavItem };

/**
 * The nav of the client's design: mark, wordmark, seven links, one dark pill.
 * Sticky on paper at 0.9 alpha with a blur behind it and a hairline under it,
 * so a page slides beneath the bar instead of behind a solid block.
 *
 * The list is the same on every page (design-spec 3.2), so it lives here and
 * not in a prop: seven links that differ per page are seven chances for a page
 * to forget one.
 *
 * No telephone number stands in this nav, and none may come back. There is no
 * central number to print (issue #7): a reader picks a coach, sees who they
 * are, and writes to that person. The pill is that road.
 */
const nav: NavItem[] = [
  { href: "/studiekeuzetraject", label: "Het traject" },
  { href: "/voor-wie", label: "Voor wie" },
  { href: "/studiekeuzecoaches", label: "Coaches" },
  { href: "/artikelen", label: "Artikelen" },
  { href: "/tarieven", label: "Tarieven" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/coach-worden", label: "Word coach" },
];

const intakeCta: NavItem = {
  href: "/studiekeuzecoaches",
  label: "Plan gratis intake",
};

export function SiteHeader({
  /** A coach page points the pill at its own form; Word coach at its own. */
  cta = intakeCta,
}: {
  cta?: NavItem;
} = {}) {
  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-paper/90 backdrop-blur-[10px]">
      {/* Full width, like the client's nav: the bar spans the window and only
          the sections inside the page are held to 1160px. */}
      <div className="flex items-center gap-4 px-5 py-3.5 sm:px-7">
        <Link
          aria-label="StudiekeuzeAdvies, naar de homepagina"
          className="flex shrink-0 items-center gap-2.5"
          href="/"
        >
          <LogoMark className="h-6.5 w-6.5 sm:h-7.5 sm:w-7.5" />
          <Wordmark className="text-[1.125rem] sm:text-[1.25rem]" />
        </Link>

        <SiteNav cta={cta} items={nav} />
      </div>
    </header>
  );
}
