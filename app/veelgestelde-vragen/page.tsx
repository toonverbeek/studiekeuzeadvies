import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/app/components/contact-section";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Container,
  CtaBand,
  Eyebrow,
  PageIndex,
  readingRow,
  Reveal,
} from "@/app/components/ui";
import { questions } from "@/app/faq";

/**
 * On this page the index IS the page: every question, in order, before the
 * first word of an answer. A reader who came for one answer jumps; a reader
 * who came for the overview has it in one screen (decision 2026-08-05: the
 * answers stand open and nothing hides behind a control).
 */
const jumps = questions.map((item) => ({
  href: `#${item.id}`,
  label: item.question,
}));

// The old title, word for word, hyphen and all. This page had 182 inbound
// links on the old site and the old URL redirects here, so the title stays.
export const metadata: Metadata = {
  title: "Veelgestelde vragen - StudieKeuzeAdvies",
  description:
    "Wat is een studiekeuzetraject, wat kost het, hoe lang duurt het, wie is je coach en waar spreek je af? De vragen die we het vaakst krijgen, met het antwoord eronder.",
  alternates: { canonical: "/veelgestelde-vragen" },
};


/**
 * EVERY ANSWER IS OPEN. No accordion, no <details>, nothing that hides a line
 * a reader came for. Two reasons, and both are in PRODUCT.md. Choosers with
 * ADD, ADHD or autism are a named user group and they need overview more than
 * interaction. And the second reader of this page is a parent who scans for one
 * answer: on an open page the browser's own find works, and nine closed rows
 * hide the words they search for.
 *
 * The index card in the hero is the map. It repeats every question, so the
 * reader still gets the overview an accordion is usually built for.
 *
 * The questions are h2 at the tarieven-CTA scale (24px), not at the section
 * scale: nine 36px headings under each other shout, and the answer is what the
 * reader came for.
 */
export default function FaqPage() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <header className="pt-10 pb-12 lg:pt-16 lg:pb-16">
          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)] lg:gap-14">
              <div>
                <Eyebrow className="mb-4">Antwoorden op één pagina</Eyebrow>

                {/* "Veelgestelde" is one word of twelve letters, so the h1 may
                    break inside it rather than run past the gutter. */}
                <h1 className="text-h1 max-w-[14ch] font-bold [overflow-wrap:anywhere]">
                  Veelgestelde vragen
                </h1>

                <p className="text-lead mt-5 max-w-[34rem] text-muted">
                  Hieronder staan de vragen die we het vaakst krijgen, van
                  studiekiezers en van ouders. Alle antwoorden staan open op deze
                  pagina: je hoeft nergens op te klikken en niets uit te vouwen.
                </p>
                <p className="mt-4 max-w-[34rem] text-muted">
                  Staat je vraag er niet bij? Stel hem gerust. Kies je stad, dan
                  zie je wie daar werkt, en je vraagt het aan die coach zelf.
                </p>

                {/* The button used to say "Plan een gratis intakegesprek" and
                    jump to #contact. Nothing was broken there, and that was the
                    problem: this page cannot name a coach, so #contact shows the
                    route ("kies je stad") and not a form. The label names the
                    first real step now, and it goes where that step happens. */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    className="max-[420px]:w-full"
                    href="/locaties"
                    size="lg"
                  >
                    Kies je stad
                  </Button>
                  <Button
                    className="max-[420px]:w-full"
                    href="/studiekeuzetraject"
                    size="lg"
                    variant="outline"
                  >
                    Lees hoe het traject werkt
                  </Button>
                </div>
              </div>

              {/* The index, and on this page it is the whole list. A reader who
                  came for one answer jumps; a reader who came for the overview
                  has it before the first word of body text. */}
              <PageIndex items={jumps} />
            </div>
          </Container>
        </header>

        {/* The reading zone. The question sits in the column that holds a
            heading on every other page of this site, so the answers start on
            the same line here as they do there. */}
        <Container as="section">
          <ul className="border-b border-hairline">
            {questions.map((item) => (
              <li
                className="border-t border-hairline"
                id={item.id}
                key={item.id}
              >
                <Reveal className={`${readingRow} py-10 md:py-14`}>
                  <h2 className="text-title-lg font-bold">{item.question}</h2>

                  <div className="flex max-w-[62ch] flex-col gap-5 text-muted-read">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}

                    {item.links.length > 0 && (
                      <div className="flex flex-wrap gap-x-3 gap-y-2">
                        {item.links.map((link) => (
                          <Link
                            className="inline-flex min-h-11 items-center rounded-full bg-lavender px-5 text-small font-bold text-violet-dark transition-colors duration-150 ease-out-quart hover:bg-violet hover:text-white"
                            href={link.href}
                            key={link.href}
                          >
                            {link.label} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>

        {/* The answers have been given, so now the offer may come. Not before.
            The band names this page's own question, not the generic invitation
            of the section under it, so the two do not say the same words twice
            within one screen. */}
        <CtaBand
          accent="Stel hem in het intakegesprek."
          className="pt-14 lg:pt-20"
          id="vraag"
          text="Je vertelt wat er speelt, wij leggen uit hoe een traject werkt. Het kost je niets en je zegt daarna gewoon nee als het niet klopt."
          title="Staat je vraag er niet bij?"
        />

        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
