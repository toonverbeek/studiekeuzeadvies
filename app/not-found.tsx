import Link from "next/link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader, type NavItem } from "./components/site-header";
import { shell } from "./shell";

const nav: NavItem[] = [
  { href: "/#aanpak", label: "Aanpak" },
  { href: "/studiekeuzecoaches", label: "Coaches" },
  { href: "/locaties", label: "Locaties" },
  { href: "/#contact", label: "Contact" },
];

const link =
  "font-medium underline decoration-ink/40 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink";

export default function NotFound() {
  return (
    <>
      <SiteHeader homeHref="/" nav={nav} />

      <main id="top">
        <section className="bg-ochre text-ink">
          <div className={`${shell} pb-20 md:pb-28`}>
            <p className="text-eyebrow pt-16 uppercase sm:pt-24">404</p>

            <h1 className="text-display mt-5 max-w-[14ch] font-extrabold">
              Deze pagina bestaat niet
            </h1>

            <p className="text-lead mt-10 max-w-[52ch]">
              Misschien klopt het adres niet meer, of is de pagina verhuisd. Ga
              terug naar het begin, of kijk waar een coach bij jou in de buurt
              werkt.
            </p>

            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <Link className={link} href="/">
                Naar de homepagina
              </Link>
              <Link className={link} href="/locaties">
                Alle locaties
              </Link>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter
        pageLinks={[
          { href: "/#aanpak", label: "Waar sta jij nu?" },
          { href: "/studiekeuzecoaches", label: "De coaches" },
          { href: "/#contact", label: "Begin met een gesprek" },
        ]}
      />
    </>
  );
}
