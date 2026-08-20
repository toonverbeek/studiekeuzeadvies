import {
  Button,
  Card,
  Container,
  Eyebrow,
  Reveal,
  Section,
} from "@/app/components/ui";
import { scanPrice, scanSteps } from "@/app/traject";

/**
 * The short road, next to the long one (design-spec 4.2, "KeuzeScan").
 *
 * Two things differ from the client's export, and both on purpose:
 *  - the product is called "Studiekeuzescan" here, the name /tarieven and the
 *    home page print. The client wrote "KeuzeScan" on this page only, and one
 *    product with two names is a defect a reader pays for;
 *  - the price stands on the page. It is the client's own price, and the
 *    parent reading over the chooser's shoulder should not have to leave the
 *    page to learn what the cheaper road costs.
 *
 * The card is white on paper with a hairline, at panel radius: it is the one
 * surface on this page that is neither lavender nor ink, which is how a
 * side road should read.
 */
export function ScanPanel() {
  return (
    <Section className="pb-12 lg:pb-18" id="studiekeuzescan" space="none">
      <Container>
        <Card
          as={Reveal}
          className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:gap-13 lg:px-14 lg:py-13"
          pad="none"
          radius="panel"
        >
          <div>
            <Eyebrow className="mb-3.5" color="coral">
              Liever een korte verkenning?
            </Eyebrow>

            <h2 className="text-h3 font-bold">
              Snel inzicht met de Studiekeuzescan
            </h2>

            <p className="mt-4 text-muted">
              De Studiekeuzescan is een kort traject voor wie snel inzicht wil
              in welke studie past. Je maakt dezelfde twee testen als in het
              volledige traject: de persoonlijkheidstest en de interessetest.
            </p>
            <p className="mt-3.5 text-muted">
              Daarna heb je één online sessie met een studiekeuzecoach. Je
              bespreekt samen de resultaten, voor je uitgewerkt in een
              overzichtelijke matrix, krijgt toelichting op je antwoorden en
              denkt na over vervolgstappen. Ideaal als je snel duidelijkheid
              wilt of behoefte hebt aan een eerste verkenning van je
              mogelijkheden.
            </p>

            <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-h3 font-display font-bold">
                {scanPrice}
              </span>
              <span className="text-small text-muted">
                eenmalig, beide testen en de sessie inbegrepen
              </span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button href="/studiekeuzecoaches" variant="dark">
                Kies een coach voor de scan
              </Button>
              <Button href="/tarieven" variant="ghost">
                Bekijk tarieven →
              </Button>
            </div>
          </div>

          <div className="rounded-inner border border-hairline bg-paper p-6 sm:p-8">
            <Eyebrow as="h3" size="sm">
              Zo werkt de scan
            </Eyebrow>

            <ol className="mt-4 flex flex-col gap-4.5">
              {scanSteps.map((step) => (
                <li className="flex gap-4" key={step.number}>
                  {/* The list numbers itself for a screen reader; this is the
                      same number drawn large. */}
                  <span
                    aria-hidden="true"
                    className={`text-title font-display font-bold ${
                      step.number === "3" ? "text-coral" : "text-violet"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h4 className="text-card font-display leading-snug font-semibold">
                      {step.title}
                    </h4>
                    <p className="text-card mt-1 text-muted lg:text-small">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="text-card mt-4.5 border-t border-hairline pt-3.5 text-muted">
              Wil je daarna toch volledige begeleiding? Dan stap je over op het
              studiekeuzetraject.
            </p>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
