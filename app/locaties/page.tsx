import type { Metadata } from "next";
import Link from "next/link";
import { cities, citiesWithCoach } from "@/app/cities";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader, type NavItem } from "@/app/components/site-header";
import { shell } from "@/app/shell";
import { site } from "@/app/site-config";

export const metadata: Metadata = {
  title: "Locaties | StudieKeuzeAdvies",
  description:
    "De steden waar een studiekeuzecoach werkt. Staat jouw stad er niet bij? Bel of app ons, dan kijken we samen wat er mogelijk is.",
  alternates: { canonical: "/locaties" },
};

const nav: NavItem[] = [
  { href: "/#aanpak", label: "Aanpak" },
  { href: "/studiekeuzecoaches", label: "Coaches" },
  { href: "/locaties", label: "Locaties" },
  { href: "/artikelen", label: "Artikelen" },
  { href: "#contact", label: "Contact" },
];

// The city name is the link. It must look like one before the pointer arrives.
const cityLink =
  "underline decoration-ochre-line decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink";

export default function LocationsPage() {
  const withoutCoach = cities.filter((city) => city.coach === null);

  return (
    <>
      <SiteHeader homeHref="/" nav={nav} />

      <main id="top">
        <section className="bg-ochre text-ink">
          <div className={`${shell} pb-14 md:pb-20`}>
            <p className="text-eyebrow pt-16 uppercase sm:pt-24">
              Een coach bij jou in de buurt
            </p>

            <h1 className="text-display mt-5 max-w-[10ch] font-extrabold">
              Locaties
            </h1>

            <p className="text-lead mt-10 max-w-[52ch]">
              We noemen alleen steden waar echt een coach werkt. Dat zijn er
              minder dan vroeger, en dat is met opzet. Een naam op een lijst
              helpt je niet, een mens wel.
            </p>
          </div>
        </section>

        <section className="bg-paper">
          <div className={`${shell} py-8 md:py-12`}>
            <ul className="border-b border-hairline">
              {citiesWithCoach.map((city) => (
                <li
                  className="grid gap-x-16 gap-y-2 border-t border-hairline py-8 md:py-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-baseline"
                  key={city.slug}
                >
                  <h2 className="text-title font-bold">
                    <Link className={cityLink} href={`/locaties/${city.slug}`}>
                      {city.name}
                    </Link>
                  </h2>
                  <p className="text-ink-soft max-w-[62ch]">
                    <span className="text-ink font-medium">
                      {city.coach?.name}
                    </span>
                    , studiekeuzecoach. Ook voor {city.region}.
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {withoutCoach.length > 0 && (
          <section className="bg-paper-shade">
            <div className={`${shell} py-16 md:py-20`}>
              <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
                <h2 className="text-title font-bold">Hier zoeken we nog</h2>
                <div className="flex flex-col gap-4">
                  <ul className="flex flex-wrap gap-x-8 gap-y-2">
                    {withoutCoach.map((city) => (
                      <li key={city.slug}>
                        <Link
                          className="font-medium underline decoration-ochre-line decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink"
                          href={`/locaties/${city.slug}`}
                        >
                          {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="max-w-[62ch]">
                    In deze steden werkt op dit moment geen coach. Online
                    begeleiding kan wel, en we zoeken hier actief iemand.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="bg-ochre text-ink" id="contact">
          <div className={`${shell} py-20 md:py-28`}>
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
              <h2 className="text-section font-extrabold">
                Staat jouw stad er niet bij?
              </h2>
              <div className="flex flex-col items-start gap-8">
                <p className="text-lead max-w-[58ch]">
                  Bel of app ons, dan kijken we samen wat er mogelijk is. Vaak
                  werkt een coach uit een buurstad, en anders doen we het
                  online. Ben je zelf coach en wil je een stad openen? Dan horen
                  we dat ook graag.
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link
                    className="bg-ink text-eyebrow text-paper px-8 py-4 uppercase transition-colors duration-150 ease-out-quart hover:bg-ochre-deep"
                    href="/#contact"
                  >
                    Stel je vraag
                  </Link>
                  <a
                    className="font-medium underline decoration-ink/40 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink"
                    href={site.phone.href}
                  >
                    {site.phone.display}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter
        pageLinks={[
          { href: "/#aanpak", label: "Waar sta jij nu?" },
          { href: "/studiekeuzecoaches", label: "De coaches" },
          { href: "/#contact", label: "Gratis intakegesprek" },
        ]}
      />
    </>
  );
}
