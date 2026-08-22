import type { Metadata } from "next";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Badge,
  Button,
  Card,
  Check,
  Container,
  PageHero,
  Reveal,
  Section,
} from "@/app/components/ui";
import { extraGesprek, intakeIsFree, scan, traject } from "@/app/pricing";

/**
 * The price page of the client's design (docs/redesign/design-spec.md 4.8):
 * a centred hero, three cards, one soft invitation. No CTA band under it, and
 * no FAQ: the client closes this page with the lavender strip and so do we.
 *
 * THE PRICES ARE DECIDED (docs/decisions.md, 2026-08-20), so this is the one
 * page that may print a number. Everything else on it is a fact about what you
 * get, never a claim about how many people bought it: the client's "Meest
 * gekozen" badge is a sales claim we cannot prove, so it reads "Aanbevolen".
 *
 * WHERE THE BUTTONS GO. The traject button lands on /studiekeuzecoaches,
 * because a traject begins with one named coach and a free intake: "koop nu"
 * does not exist on this site. The scan button is the exception the client's
 * mail asked for (row TA2): it opens /studiekeuzescan, a form that reaches the
 * central mailbox, because a scan does not need you to pick a person first.
 * That splits decision 2026-08-15; app/central.ts says why.
 */
export const metadata: Metadata = {
  title: `Tarieven | StudieKeuzeScan ${scan.label}, StudieKeuzeTraject ${traject.label} | StudieKeuzeAdvies`,
  description: `${intakeIsFree} Daarna kies je: de StudieKeuzeScan voor ${scan.label} of het volledige traject met een vaste coach voor ${traject.label}.`,
  alternates: { canonical: "/tarieven" },
};

const intake = "/studiekeuzecoaches";

/** The shape of one price card: name, figure, sentence, checks, action. */
function PriceCard({
  action,
  badge,
  body,
  checks,
  figure,
  name,
  suffix,
  tone,
}: {
  action: React.ReactNode;
  badge?: React.ReactNode;
  body: string;
  checks: string[];
  figure: string;
  name: string;
  suffix: string;
  tone: "paper" | "ink" | "dashed";
}) {
  const onInk = tone === "ink";

  return (
    <Card
      className={`relative flex h-full flex-col gap-3.5 p-7 sm:px-8.5 sm:py-9 ${
        onInk ? "shadow-ink-card" : ""
      }`}
      pad="none"
      variant={tone === "ink" ? "indigo" : tone === "dashed" ? "dashed" : "default"}
    >
      {badge}

      <h2 className="text-title font-display font-bold">{name}</h2>

      <p className="text-price font-display font-bold">
        {figure}{" "}
        <span
          className={`text-card font-body font-normal ${
            onInk ? "text-lavender-ink" : "text-muted"
          }`}
        >
          {suffix}
        </span>
      </p>

      <p className={`text-card ${onInk ? "text-lavender-ink" : "text-muted"}`}>
        {body}
      </p>

      <ul className="text-card mt-1 flex flex-1 flex-col gap-2.5">
        {checks.map((check) => (
          <Check key={check} tone={onInk ? "amber" : "violet"}>
            {check}
          </Check>
        ))}
      </ul>

      <div className="mt-2">{action}</div>
    </Card>
  );
}

export default function TarievenPage() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <PageHero
          align="center"
          eyebrow="Tarieven"
          lede="Het intakegesprek is altijd gratis en verplicht je tot niets. Daarna kies je wat bij je situatie past."
          title="Heldere tarieven, geen verrassingen"
          /* The client's title stands on one line at 1280; the primitive holds
             a centred h1 to 22ch, which breaks it in two. */
          titleClassName="max-w-[36ch]"
        />

        <Section className="pt-2 pb-14 lg:pb-18" space="none">
          <Container>
            <Reveal className="grid gap-6 pt-4 lg:grid-cols-3 lg:gap-[22px]">
              {/* ROWS TA1 and TA2. The rapportage is now a fourth tick, and
                  the button is the client's own label on the client's own
                  destination: a form, not a coach. */}
              <PriceCard
                action={
                  <Button
                    className="w-full"
                    href="/studiekeuzescan"
                    variant="outline"
                  >
                    Boek hier je StudieKeuzeScan
                  </Button>
                }
                body="Snel inzicht: je maakt de tests en bespreekt de uitkomsten in één gesprek met een coach."
                checks={[
                  "Persoonlijkheidstest",
                  "Studie-interessetest",
                  "Rapportage",
                  "Eén begeleidend gesprek over de uitkomsten",
                ]}
                figure={scan.label}
                name="StudieKeuzeScan"
                suffix="eenmalig"
                tone="paper"
              />

              <PriceCard
                action={
                  <Button className="w-full shadow-none" href={intake}>
                    Plan gratis intake bij een coach
                  </Button>
                }
                badge={
                  <Badge className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    Aanbevolen
                  </Badge>
                }
                body="Het volledige traject: vier gesprekken met één vaste coach, van eerste twijfel tot definitieve keuze."
                /* ROW TA3: "+ rapportage" behind the tests, and the home
                   work line spelled out in full. */
                checks={[
                  "Vier 1-op-1 gesprekken met je eigen coach",
                  "Persoonlijkheidstest en studie-interessetest + rapportage",
                  "Opdrachten voor thuis, elk gesprek bouwt voort op het vorige gesprek",
                  "Op locatie bij jou in de buurt of online",
                ]}
                figure={traject.label}
                name="StudieKeuzeTraject"
                suffix="compleet traject"
                tone="ink"
              />

              <PriceCard
                /* ROW TA6. Not a button, and now it does not look like one
                   either: the client wrote "NB. Dit moet geen link zijn, enkel
                   tekst", and a bordered pill under two real buttons reads as a
                   third button. So the ring is gone and the line is a line. */
                action={
                  <p className="text-card w-full text-center font-bold text-ink">
                    Bij te boeken na afloop van het StudieKeuzeTraject of de
                    StudieKeuzeScan bij je coach
                  </p>
                }
                badge={
                  <Badge
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2"
                    tone="lavender"
                  >
                    Aanvullend
                  </Badge>
                }
                /* ROW TA5, the client's own two sentences. */
                body="Mocht je behoefte hebben aan een extra gesprek, dat kan. Dit is geen los product, maar een aanvulling op het traject of de scan."
                checks={[
                  "1-op-1 met je eigen coach",
                  "Alleen ná de StudieKeuzeScan of het StudieKeuzeTraject",
                  "Op locatie of online",
                ]}
                figure={extraGesprek.label}
                name="Extra coaching"
                suffix="per gesprek"
                tone="dashed"
              />
            </Reveal>
          </Container>
        </Section>

        {/* The closing band of this page. The client uses the lavender strip
            here and not the big CTA band, so the page ends quietly. */}
        <Section space="close">
          <Container>
            <Reveal className="flex flex-wrap items-center justify-between gap-x-8 gap-y-7 rounded-card bg-lavender p-7 sm:px-11 sm:py-10">
              <div className="max-w-[36rem]">
                <h2 className="text-title-lg font-display font-bold">
                  Eerst weten of het bij je past?
                </h2>
                {/* ROW TA7. Only the last sentence changed: the client
                    answers "scan of traject?" on the telephone, before the
                    intake, and not inside it. */}
                <p className="text-card mt-2.5 text-muted">
                  Begin met het gratis intakegesprek. Je vertelt wat er speelt,
                  wij vertellen hoe we kunnen helpen. Daarna zeg je gewoon nee
                  als het niet klopt. Twijfel je tussen de scan en het traject?
                  Dat kan telefonisch besproken worden voorafgaand aan de
                  intake.
                </p>
              </div>

              <Button className="max-[420px]:w-full" href={intake} size="lg">
                Kom in contact met een coach
              </Button>
            </Reveal>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
