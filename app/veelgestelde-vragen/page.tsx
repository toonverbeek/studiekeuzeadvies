import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/app/components/contact-section";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader, type NavItem } from "@/app/components/site-header";
import { questions } from "@/app/faq";
import { button, linkOnOchre, linkOnPaper, readingRow, shell } from "@/app/shell";

// The old title, word for word, hyphen and all. This page had 182 inbound
// links on the old site and the old URL redirects here, so the title stays.
export const metadata: Metadata = {
  title: "Veelgestelde vragen - StudieKeuzeAdvies",
  description:
    "Wat is een studiekeuzetraject, hoe lang duurt het, wie is je coach en waar spreek je af? De vragen die we het vaakst krijgen, met het antwoord eronder.",
  alternates: { canonical: "/veelgestelde-vragen" },
};

const nav: NavItem[] = [
  { href: "/studiekeuzetraject", label: "Het traject" },
  { href: "/studiekeuzecoaches", label: "Coaches" },
  { href: "/locaties", label: "Locaties" },
  { href: "/artikelen", label: "Artikelen" },
  { href: "#contact", label: "Contact" },
];

/**
 * EVERY ANSWER IS OPEN. No accordion, no <details>, nothing that hides a line
 * a reader came for. Two reasons, and both are in PRODUCT.md. Choosers with
 * ADD, ADHD or autism are a named user group and they need overview more than
 * interaction. And the second reader of this page is a parent who scans for one
 * answer: on an open page the browser's own find works, and eight closed rows
 * hide the words they search for.
 *
 * The index in the poster is the map. It repeats every question, so the reader
 * still gets the overview an accordion is usually built for.
 */
export default function FaqPage() {
  return (
    <>
      <SiteHeader homeHref="/" nav={nav} />

      <main id="top">
        <section className="bg-ochre text-ink">
          <div className={`${shell} pb-16 md:pb-20`}>
            <p className="text-eyebrow pt-16 uppercase sm:pt-24">
              Antwoorden op één pagina
            </p>

            {/* "Veelgestelde" is one word of twelve letters. At the display
                size it runs past the gutter on a small telephone, so the loud
                step starts at sm, as on the coaches page. */}
            <h1 className="text-headline sm:text-display mt-5 max-w-[14ch] font-extrabold">
              Veelgestelde vragen
            </h1>

            <div className="mt-12 grid items-start gap-x-16 gap-y-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
              <div className="flex flex-col items-start gap-6">
                <p className="text-lead max-w-[52ch]">
                  Hieronder staan de vragen die we het vaakst krijgen, van
                  studiekiezers en van ouders. Alle antwoorden staan open op deze
                  pagina: je hoeft nergens op te klikken en niets uit te vouwen.
                </p>
                <p className="max-w-[58ch]">
                  Staat je vraag er niet bij? Stel hem gerust. Kies je stad, dan
                  zie je wie daar werkt, en je vraagt het aan die coach zelf.
                </p>

                {/* The button used to say "Plan een gratis intakegesprek" and
                    jump to #contact. Nothing was broken there, and that was the
                    problem: this page cannot name a coach, so #contact shows the
                    route ("kies je stad") and not a form. The label promised a
                    step that the destination does not take. It names the first
                    real step now, and it goes where that step happens. */}
                <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link className={button} href="/locaties">
                    Kies je stad
                  </Link>
                  <Link className={linkOnOchre} href="/studiekeuzetraject">
                    Lees hoe het traject werkt
                  </Link>
                </div>
              </div>

              {/* The index, and on this page it is the whole list. A reader who
                  came for one answer jumps; a reader who came for the overview
                  has it before the first word of body text. */}
              <nav aria-label="Op deze pagina">
                <p className="text-eyebrow border-t border-ochre-line pt-4 uppercase">
                  Op deze pagina
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {questions.map((item) => (
                    <li key={item.id}>
                      <a className={linkOnOchre} href={`#${item.id}`}>
                        {item.question}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* The reading zone. The question sits in the column that holds a
            heading on every other page of this site, so the answers start on
            the same line here as they do there. */}
        <section className="bg-paper">
          <div className={`${shell} py-8 md:py-12`}>
            <ul className="border-b border-hairline">
              {questions.map((item) => (
                <li
                  className={`${readingRow} border-t border-hairline py-10 md:py-14`}
                  id={item.id}
                  key={item.id}
                >
                  <h2 className="text-title font-bold">{item.question}</h2>

                  <div className="flex max-w-[62ch] flex-col gap-5">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}

                    {item.links.length > 0 && (
                      <div className="flex flex-wrap gap-x-8 gap-y-2">
                        {item.links.map((link) => (
                          <Link
                            className={linkOnPaper}
                            href={link.href}
                            key={link.href}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The answers have been given, so now the offer may come. Not before.
            A short band, not a full section: without its button this block is
            the sentence that hands over to the offer under it, and a full
            section of padding left a hole between the two. */}
        <section className="bg-ochre text-ink" id="vraag">
          <div className={`${shell} py-14 md:py-16`}>
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
              <h2 className="text-section font-extrabold">
                Staat je vraag er niet bij?
              </h2>
              {/* No button here any more. It said "Plan een gratis
                  intakegesprek" and it landed on the section directly below,
                  which cannot plan one: this page knows no city, so it shows
                  the three steps to a coach instead. Two calls to action within
                  one screen, and the loud one promised the most and delivered
                  the least. The section below is the offer; this block is the
                  sentence that hands over to it. */}
              <div className="flex flex-col items-start gap-8">
                <p className="text-lead max-w-[52ch]">
                  Stel hem dan aan de coach in jouw stad. Dat kan in het
                  intakegesprek: je vertelt wat er speelt, wij leggen uit hoe een
                  traject werkt. Het kost je niets en je zegt daarna gewoon nee
                  als het niet klopt.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      {/* Four of the eight, not all eight. The footer is a way back, not a
          second index: the one in the poster is the index. */}
      <SiteFooter
        pageLinks={[
          { href: "#wat-is-het", label: "Wat houdt StudieKeuzeAdvies in?" },
          { href: "#hoe-lang", label: "Hoe lang duurt een traject?" },
          { href: "#je-coach", label: "Wie is mijn coach?" },
          // Was "Gratis intakegesprek", which is not what the section does on a
          // page that knows no city. It names the route, like /locaties does.
          { href: "#contact", label: "Zo vraag je een gesprek aan" },
        ]}
      />
    </>
  );
}
