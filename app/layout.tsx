import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Figtree,
  IBM_Plex_Mono,
} from "next/font/google";
import { CookieConsentBar } from "./components/cookie-consent";
import "./globals.css";

/* Three families, each with one job (docs/redesign/design-spec.md, 2.1).
   Bricolage Grotesque is the voice: every heading, numeral and price. Figtree
   is the sentence: everything a reader reads. IBM Plex Mono is the label: the
   small uppercase lines above a heading, the dates, the meta rows.
   latin-ext is in every subset because Dutch copy carries ï, ë and é, and a
   name like Fatima el Amrani or a city like Zürich must not fall back. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  // The variable font covers 200 to 800; the design uses 600 and 700, and the
  // range keeps a heavier or lighter step available without a second file.
  weight: "variable",
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  // The domain was bought together with the content and the rankings, so the
  // canonical host must stay the one Google already knows. Which host is that?
  // Counted over the whole archive (html, markdown and meta) on 2026-08-15:
  // 146356 links write https://www, 18 write the http www form, and not one
  // writes the bare host. So www is the host Google indexed, and www is what
  // every canonical, every sitemap entry and every Open Graph URL of this site
  // must say. This is measured, not chosen, and it is settled: nobody has to
  // count again. next.config.ts and docs/redirects.md print the same three
  // numbers, and the redirect that sends the bare host to www lives there.
  metadataBase: new URL("https://www.studiekeuzeadvies.nl"),
  title: "Professionele hulp bij studiekeuze | StudieKeuzeAdvies",
  description:
    "Weet je niet welke studie bij je past, of ben je gestopt en zoek je een nieuwe richting? Je krijgt een vaste coach bij jou in de buurt. Het intakegesprek is gratis.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${bricolage.variable} ${figtree.variable} ${plexMono.variable} h-full antialiased`}
      lang="nl"
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {children}
        {/* Last child of the body on purpose. The bar is sticky, so the footer
            keeps its place, the keyboard reaches the bar after the footer and
            not in front of it, and at the end of the page the bar parks under
            the footer instead of covering the last links. It renders nothing
            once the visitor has answered. */}
        <CookieConsentBar />
      </body>
    </html>
  );
}
