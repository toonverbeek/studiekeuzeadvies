import type { Metadata } from "next";
import { Alegreya_Sans } from "next/font/google";
import { CookieConsentBar } from "./components/cookie-consent";
import "./globals.css";

/* One warm humanist sans at every size. DESIGN.md bans the reflex defaults
   (Inter, DM Sans, Plus Jakarta, Outfit, IBM Plex Sans) and the Dutch education
   defaults (Poppins, Nunito). Alegreya Sans has calligraphic roots, a true italic,
   and a heavy weight strong enough to carry the display line. */
const alegreyaSans = Alegreya_Sans({
  variable: "--font-alegreya-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
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
    <html lang="nl" className={`${alegreyaSans.variable} h-full antialiased`}>
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
