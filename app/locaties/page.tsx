import type { Metadata } from "next";
import Link from "next/link";
import { cities, citiesWithCoach } from "@/app/cities";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader, type NavItem } from "@/app/components/site-header";
import { linkOnPaper, shell } from "@/app/shell";

export const metadata: Metadata = {
  title: "Locaties | StudieKeuzeAdvies",
  description:
    "De steden waar een studiekeuzecoach werkt. Staat jouw stad er niet bij? Kijk wie er in de buurt werkt, en vraag het gesprek bij die coach aan.",
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
                  {/* Two links on one row, and they go to two different
                      questions: the city name answers "where", the coach name
                      answers "who". The name is the second link because a
                      reader scans the headings first.

                      "voor", not "ook voor": a work region already contains the
                      city itself, so "ook" made every line repeat its own
                      heading. It only became loud on a two-town region like
                      Amsterdam en Amstelveen. */}
                  <p className="text-ink-soft max-w-[62ch]">
                    <Link
                      className={`${linkOnPaper} text-ink`}
                      href={`/studiekeuzecoaches#${city.coach.slug}`}
                    >
                      {city.coach.name}
                    </Link>
                    , studiekeuzecoach voor {city.region}.
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
              {/* This block used to end at a central telephone number, and
                  next to it a button to the form on the home page. Both are
                  gone (issue #7). A request ends at a person, so this ends at
                  the coaches: you read who works closest to you and you ask
                  that person yourself. */}
              <div className="flex flex-col items-start gap-8">
                <p className="text-lead max-w-[58ch]">
                  Kijk dan wie er het dichtst bij jou werkt. Vaak zit er een
                  coach in een buurstad, en anders doen we het online. Je vraagt
                  het gesprek aan bij die coach zelf, dus je weet meteen wie je
                  straks spreekt.
                </p>
                <Link
                  className="bg-ink text-eyebrow text-paper px-8 py-4 uppercase transition-colors duration-150 ease-out-quart hover:bg-ochre-deep"
                  href="/studiekeuzecoaches"
                >
                  Bekijk de coaches
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* The third link used to be "Gratis intakegesprek" to /#contact. That
          section now sends a reader to /locaties to pick a city, so from this
          page it was a link that walked away and came straight back. It points
          at this page's own last section instead, under its own heading. */}
      <SiteFooter
        pageLinks={[
          { href: "/#aanpak", label: "Waar sta jij nu?" },
          { href: "/studiekeuzecoaches", label: "De coaches" },
          { href: "#contact", label: "Staat jouw stad er niet bij?" },
        ]}
      />
    </>
  );
}
