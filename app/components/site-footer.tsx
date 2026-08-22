import Link from "next/link";
import { showSamenwerken, site } from "../site-config";
import { LogoMark, Wordmark } from "./ui";

type FooterColumn = { heading: string; links: { href: string; label: string }[] };

/**
 * The client's four column footer, with every link pointed at a route that
 * exists in this repo (design-spec 3.3).
 *
 * WHAT THE CLIENT'S MAIL CHANGED HERE (rows H15, H16 and W1):
 *  - "Keuzecheck herstarters" is now "StudieKeuzeScan", and it opens the block
 *    on the traject page that explains the scan, not the tarieven page;
 *  - "Extra ondersteuning" is gone. The page it pointed at stays where it is;
 *    only the footer link went, as asked;
 *  - "Contactformulier" is a link again, and it goes to /contact. It read
 *    "Kies je coach" while there was no central mailbox; the client named one
 *    (`centralInbox` in app/site-config.ts), so the contact page exists and
 *    this link says what the client's own footer says;
 *  - "Decanen" and "Scholen" stand under "Voor wie" and both open
 *    /samenwerken. The client asked for the page AND asked for it to be off at
 *    launch, so `showSamenwerken` decides whether these two rows are printed;
 *  - "Word coach" is "Sluit je aan als coach".
 *
 * "Algemene voorwaarden" and "Privacy" are still out: neither page exists yet.
 * They come back the day the client delivers the text.
 */
const columns: FooterColumn[] = [
  {
    heading: "Aanbod",
    links: [
      { href: "/studiekeuzetraject", label: "Het StudieKeuzeTraject" },
      {
        href: "/studiekeuzetraject#studiekeuzescan",
        label: "StudieKeuzeScan",
      },
      { href: "/tarieven", label: "Tarieven" },
    ],
  },
  {
    heading: "Voor wie",
    links: [
      { href: "/eerste-studiekeuze", label: "Scholieren" },
      { href: "/verkeerde-studiekeuze", label: "Studenten" },
      { href: "/voor-wie", label: "Ouders" },
      ...(showSamenwerken
        ? [
            { href: "/samenwerken", label: "Decanen" },
            { href: "/samenwerken", label: "Scholen" },
          ]
        : []),
    ],
  },
  {
    heading: "Contact",
    links: [
      { href: "/contact", label: "Contactformulier" },
      { href: "/locaties", label: "Locaties" },
      { href: "/coach-worden", label: "Sluit je aan als coach" },
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
          <span>© 2026 {site.name}</span>
        </p>
      </div>
    </footer>
  );
}
