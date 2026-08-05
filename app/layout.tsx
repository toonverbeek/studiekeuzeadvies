import type { Metadata } from "next";
import { Alegreya_Sans } from "next/font/google";
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
  // canonical host must stay the one Google already knows.
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
      </body>
    </html>
  );
}
