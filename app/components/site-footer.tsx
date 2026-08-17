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
        {/* This column carried a telephone number, a WhatsApp link and one
            mailbox. All three are gone (issue #7): there is no central point to
            write to. The column keeps its name and its place, because the
            footer is where a reader looks for it, and it answers the question
            instead of leaving them to hunt for a number that is not there.

            The grid keeps its three columns, so nothing goes ragged: this one
            sentence carries the weight the three links used to carry.

            The FAQ link stays here. Answer before you offer: the questions we
            are asked most are one click away from every page, before anybody
            has to write to anyone. */}
        <div className="flex flex-col gap-4">
          <p className="text-eyebrow uppercase text-paper/70">Contact</p>
          <p className="max-w-[38ch] text-paper/70">
            Je schrijft rechtstreeks naar de coach in jouw stad.{" "}
            <Link className={linkOnInk} href="/locaties">
              Kies je stad
            </Link>
            , dan zie je wie daar werkt.
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              <Link className={linkOnInk} href="/veelgestelde-vragen">
                Veelgestelde vragen
              </Link>
            </li>
            {/* /ervaringen has 182 inbound links behind it and it is in the
                sitemap, but nothing on the site linked to it. The menu is full
                at five items, so the footer is the way in, next to the FAQ:
                both answer a question before anybody has to write to anyone. */}
            <li>
              <Link className={linkOnInk} href="/ervaringen">
                Ervaringen van studiekiezers
              </Link>
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
