import Link from "next/link";
import { shell } from "../shell";
import { site } from "../site-config";

export type NavItem = { href: string; label: string };

/** The home page links to its own sections. Other pages pass their own list. */
const homeNav: NavItem[] = [
  { href: "/studiekeuzetraject", label: "Het traject" },
  { href: "/studiekeuzecoaches", label: "Coaches" },
  { href: "/locaties", label: "Locaties" },
  { href: "/artikelen", label: "Artikelen" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader({
  homeHref = "#top",
  nav = homeNav,
}: {
  homeHref?: string;
  nav?: NavItem[];
}) {
  // The header carries its own ochre so it can live outside <main>. A <header>
  // inside <main> is not a banner landmark, and PRODUCT.md asks for real ones.
  return (
    <header className="bg-ochre text-ink">
      <div
        className={`${shell} flex flex-wrap items-baseline justify-between gap-x-10 gap-y-5 pt-8 sm:pt-10`}
      >
        <Link
          className="text-eyebrow uppercase transition-opacity duration-150 ease-out-quart hover:opacity-70"
          href={homeHref}
        >
          {site.name}
        </Link>

        <nav aria-label="Hoofdmenu">
          <ul className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                className="font-medium underline decoration-ink/40 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink"
                href={site.phone.href}
              >
                {site.phone.display}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
