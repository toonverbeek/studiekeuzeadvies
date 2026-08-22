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
 * Every button lands on /studiekeuzecoaches, because that is where a reader
 * meets the person who reads their request. There is no central contact point
 * (decision 2026-08-15), so "koop nu" does not exist on this site: you pick a
 * coach and the intake is free.
 */
export const metadata: Metadata = {
  title: `Tarieven | Studiekeuzescan ${scan.label}, studiekeuzetraject ${traject.label} | StudieKeuzeAdvies`,
  description: `${intakeIsFree} Daarna kies je: de studiekeuzescan voor ${scan.label} of het volledige traject met een vaste coach voor ${traject.label}.`,
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
              <PriceCard
                action={
                  <Button className="w-full" href={intake} variant="outline">
                    Kies een coach voor de scan
                  </Button>
                }
                body="Snel inzicht: je maakt de tests en bespreekt de uitkomsten in één gesprek met een coach."
                checks={[
                  "Persoonlijkheidstest",
                  "Studie-interessetest",
                  "Eén begeleidend gesprek over de uitkomsten",
                ]}
                figure={scan.label}
                name="Studiekeuzescan"
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
                checks={[
                  "Vier 1-op-1 gesprekken met je eigen coach",
                  "Persoonlijkheidstest en studie-interessetest",
                  "Opdrachten voor thuis, elk gesprek bouwt verder",
                  "Op locatie bij jou in de buurt of online",
                ]}
                figure={traject.label}
                name="Studiekeuzetraject"
                suffix="compleet traject"
                tone="ink"
              />

              <PriceCard
                /* Not a button: there is nothing to click. Extra coaching is
                   not a product you can buy on its own, so the slot says what
                   it is instead of pretending to be an action. */
                action={
                  <p className="text-card flex min-h-11 w-full items-center justify-center rounded-full border-[1.5px] border-ink px-5 text-center font-bold text-ink">
                    Bij te boeken na scan of traject
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
                body="Geen los product, maar een aanvulling: een extra gesprek kan alleen als je eerst de scan of het traject hebt gedaan."
                checks={[
                  "1-op-1 met je eigen coach",
                  "Alleen ná de scan of het traject",
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
                <p className="text-card mt-2.5 text-muted">
                  Begin met het gratis intakegesprek. Je vertelt wat er speelt,
                  wij vertellen hoe we kunnen helpen. Daarna zeg je gewoon nee
                  als het niet klopt. Twijfel je tussen de scan en het traject?
                  Dat bespreek je in de intake.
                </p>
              </div>

              <Button className="max-[420px]:w-full" href={intake} size="lg">
                Plan gratis intake bij een coach
              </Button>
            </Reveal>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
