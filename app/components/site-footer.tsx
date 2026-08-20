import Link from "next/link";
import { LogoMark, Wordmark } from "./ui";

type FooterColumn = { heading: string; links: { href: string; label: string }[] };

/**
 * The client's four column footer, with every link pointed at a route that
 * exists in this repo (design-spec 3.3).
 *
 * Two labels differ from the client's export, and both for the same reason:
 * a link has to say what the click does.
 *  - "Contactformulier" became "Kies je coach". There is no central contact
 *    point (decision 2026-08-15, issue #7), and the client's link went to one
 *    coach's own form. The Coaches page is where a reader picks the person
 *    they will write to.
 *  - "Decanen" is gone. No page on this site speaks to a decaan, and a footer
 *    link to a page that does not answer is worse than no link.
 * "Algemene voorwaarden" and "Privacy" are gone for the same reason: neither
 * page exists yet. They come back the day the client delivers the text.
 */
const columns: FooterColumn[] = [
  {
    heading: "Aanbod",
    links: [
      { href: "/studiekeuzetraject", label: "Het studiekeuzetraject" },
      { href: "/verkeerde-studiekeuze", label: "Verkeerde studiekeuze" },
      { href: "/studiekeuze-met-add-adhd", label: "Extra ondersteuning" },
      { href: "/tarieven", label: "Tarieven" },
    ],
  },
  {
    heading: "Voor wie",
    links: [
      { href: "/eerste-studiekeuze", label: "Scholieren" },
      { href: "/verkeerde-studiekeuze", label: "Studenten" },
      { href: "/voor-wie", label: "Ouders" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { href: "/studiekeuzecoaches", label: "Kies je coach" },
      { href: "/locaties", label: "Locaties" },
      { href: "/coach-worden", label: "Word coach" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-lavender-ink">
      <div className="mx-auto grid w-full max-w-shell gap-8 px-6 pt-12 pb-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:px-12 lg:pt-13">
        <div>
          <Link className="flex items-center gap-2.5" href="/">
            <LogoMark size={26} tone="light" />
            <Wordmark className="text-[1.125rem]" tone="paper" />
          </Link>
          <p className="mt-3.5 max-w-[19rem] text-small">
            Wij geven scholieren, studenten en hun ouders het vertrouwen om de
            juiste studiekeuze te maken.
          </p>
        </div>

        {columns.map((column) => (
          <nav aria-label={column.heading} key={column.heading}>
            <h2 className="font-display text-[0.8125rem] font-semibold text-paper">
              {column.heading}
            </h2>
            <ul className="mt-1 flex flex-col">
              {column.links.map((link) => (
                <li key={`${column.heading}-${link.href}-${link.label}`}>
                  <Link
                    className="flex min-h-11 items-center text-small hover:text-paper"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto w-full max-w-shell px-6 sm:px-8 lg:px-12">
        <p className="flex flex-wrap gap-2 border-t border-hairline-ink pt-5 pb-8 text-micro">
          <span>© 2026 StudiekeuzeAdvies</span>
        </p>
      </div>
    </footer>
  );
}
