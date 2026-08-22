import type { Metadata } from "next";
import { CentralForm } from "@/app/components/central-form";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { Container, PageHero, Section } from "@/app/components/ui";
import { getCentralTopic } from "@/app/central";
import { centralInbox } from "@/app/site-config";

/**
 * The contact page the client asked for in row H15.
 *
 * IT DID NOT EXIST UNTIL THIS MAIL, and it could not. "Contactformulier" in the
 * footer pointed at one coach's own form while there was no central address to
 * answer at (decision 2026-08-15, issue #7). The client named one in the first
 * ten lines of their mail, so the page has a mailbox behind it and the footer
 * link says what the client's own footer says.
 *
 * The text is the client's, shortened nowhere and split into three paragraphs
 * because it asks three separate things of a reader: a question, a complaint,
 * and "twijfel je of je vraag wel bij ons past".
 */

export const metadata: Metadata = {
  title: "Contact | StudieKeuzeAdvies",
  description:
    "Een vraag, een opmerking of een klacht? Stuur ons een bericht via het contactformulier of mail naar info@studiekeuzeadvies.nl. Je hoort binnen twee werkdagen van ons.",
  alternates: { canonical: "/contact" },
};

const paragraphs = [
  "Heb je een vraag? Wil je meer weten over onze StudieKeuzeTrajecten, heb je een opmerking of wil je iets met ons delen? Stuur ons gerust een bericht via het contactformulier hieronder. Een van onze coaches neemt binnen twee werkdagen contact met je op.",
  "Heb je een klacht? Ook dan horen we graag van je. We nemen je bericht serieus en zoeken samen naar een passende oplossing.",
  "Twijfel je of je vraag wel bij ons past? Gewoon insturen. We denken graag met je mee.",
];

export default function ContactPage() {
  const topic = getCentralTopic("contact");
  if (!topic) throw new Error("Het onderwerp 'contact' ontbreekt in app/central.ts.");

  return (
    <>
      <SiteHeader />

      <main id="top">
        <PageHero
          eyebrow="Contact"
          lede="Stuur ons een bericht, dan pakt een van de coaches het op."
          title="Neem contact met ons op."
        />

        <Section space="md">
          <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
            <div className="flex flex-col gap-5">
              {paragraphs.map((text) => (
                <p className="text-lead max-w-[52ch] text-muted-read" key={text}>
                  {text}
                </p>
              ))}

              {/* The address is printed as well as posted to. A reader who
                  would rather use their own mail client should not have to
                  fill in a form to find it. */}
              <p className="text-card mt-2 border-t border-hairline pt-5 text-muted">
                Liever zelf mailen? Dat kan naar{" "}
                <a
                  className="font-semibold text-violet underline underline-offset-4 hover:no-underline"
                  href={`mailto:${centralInbox}`}
                >
                  {centralInbox}
                </a>
                .
              </p>
            </div>

            <CentralForm topic={topic} />
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
