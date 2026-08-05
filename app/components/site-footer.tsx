import Link from "next/link";
import { citiesWithCoach } from "../cities";
import { linkOnInk } from "../shell";
import { site } from "../site-config";
import type { NavItem } from "./site-header";

const homeLinks: NavItem[] = [
  { href: "#aanpak", label: "Waar sta jij nu?" },
  { href: "#coaches", label: "Je coach" },
  { href: "#contact", label: "Gratis intakegesprek" },
];

export function SiteFooter({ pageLinks = homeLinks }: { pageLinks?: NavItem[] }) {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid w-full max-w-[1240px] gap-x-16 gap-y-12 px-6 py-20 sm:px-10 md:grid-cols-3 lg:px-16">
        <div className="flex flex-col gap-4">
          <p className="text-eyebrow uppercase text-paper/70">Contact</p>
          <ul className="flex flex-col gap-2">
            <li>
              <a className={linkOnInk} href={site.phone.href}>
                {site.phone.display}
              </a>
            </li>
            <li>
              <a
                className={linkOnInk}
                href={site.whatsapp.href}
                rel="noreferrer noopener"
                target="_blank"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a className={linkOnInk} href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-eyebrow uppercase text-paper/70">Op deze pagina</p>
          <ul className="flex flex-col gap-2">
            {pageLinks.map((item) => (
              <li key={item.href}>
                <Link className={linkOnInk} href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-eyebrow uppercase text-paper/70">Locaties</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {citiesWithCoach.map((city) => (
              <li key={city.slug}>
                <Link className={linkOnInk} href={`/locaties/${city.slug}`}>
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="max-w-[38ch] text-paper/70">
            We noemen alleen steden waar echt een coach werkt.{" "}
            <Link className={linkOnInk} href="/locaties">
              Alle locaties
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <p className="mx-auto w-full max-w-[1240px] px-6 py-8 text-paper/70 sm:px-10 lg:px-16">
          {site.name}
        </p>
      </div>
    </footer>
  );
}
