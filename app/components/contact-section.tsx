import Link from "next/link";
import { cities } from "../cities";
import { encodeIntakeRoute } from "../intake";
import { IntakeForm } from "./intake-form";
import { Button, Card, Container, linkOnSoft, Section } from "./ui";

/**
 * The city is passed as a name, not as a slug, because that is what the callers
 * have in hand and it is what the heading prints. The slug and the coach are
 * looked up here, so a page never has to know how a request is routed.
 */
function findCity(name: string) {
  const wanted = name.trim().toLowerCase();
  return cities.find((city) => city.name.toLowerCase() === wanted);
}

/** The three steps of the route, for every page that does not know a city. */
const steps = [
  "Kies de stad waar je begeleiding wilt.",
  "Lees wie daar werkt, en waar die coach goed in is.",
  "Vraag bij die coach een gratis intakegesprek aan.",
];

/**
 * The closing panel of every page that is not the home page: the invitation on
 * the left, the answer on the right, both inside one lavender panel at 28px
 * (design-spec 6.2). It was two zones meeting edge to edge in the old ochre
 * system, held in place with two `max(4rem, calc(...))` gutters that guessed at
 * the shell; the panel does the same job with the shell's own Container.
 *
 * The shape follows the city, because there is no central sign-up point any
 * more (issue #7). A request must end at a person, so only a page that knows
 * which person shows a form:
 *
 *   city with a coach  the coach is named and the form goes to that city.
 *   city without one   no form. The reader is sent to a city nearby.
 *   no city            no form. The reader picks a city first.
 *
 * The prop stays a plain city name, so every caller keeps working unchanged.
 *
 * WHAT A LINK TO THIS SECTION MAY SAY. Every heading below is also the promise
 * that the link making the jump has to keep, and for a year they did not match:
 * about twenty buttons said "Plan een gratis intakegesprek" and landed here on
 * a page with no form. The link worked, so nothing looked broken. The rule:
 *
 *   a form is here      "Plan gratis intake bij <naam>", the name of the coach
 *                       the form goes to. Only a city page or a coach page can
 *                       say this, because only they know that name.
 *   no form, no city    "Begin met een gesprek", the first three words of the
 *                       heading this section then carries.
 *   a city, no coach    "Zoek een coach in de buurt", because that is what the
 *                       heading says and what the reader can do next.
 *
 * Change a heading here and the labels that point at it change with it.
 */
export function ContactSection({ city }: { city?: string }) {
  const known = city ? findCity(city) : undefined;
  const coach = known?.coach ?? null;

  return (
    <Section id="contact" space="lg">
      <Container>
        <Card
          className="grid gap-10 lg:grid-cols-2 lg:gap-14"
          pad="lg"
          variant="lavender"
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-h2 max-w-[16ch] font-bold">
              {coach
                ? `Begin met een gesprek met ${coach.name}. Het kost je niets.`
                : city
                  ? "Zoek een coach bij jou in de buurt."
                  : "Begin met een gesprek. Het kost je niets."}
            </h2>

            {coach ? (
              <>
                <p className="text-lead max-w-[42ch]">
                  In het intakegesprek vertel je wat er speelt en leggen we uit
                  hoe een traject werkt. Daarna beslis jij, zonder haast.
                </p>
                <p className="max-w-[42ch]">
                  Wil je eerst lezen wie {coach.name} is? Dat staat{" "}
                  <Link
                    className={linkOnSoft}
                    href={`/studiekeuzecoaches/${coach.slug}`}
                  >
                    op de pagina van {coach.name}
                  </Link>
                  .
                </p>
              </>
            ) : (
              <>
                <p className="text-lead max-w-[42ch]">
                  {city
                    ? `In ${city} werkt op dit moment geen coach. Kies een stad hier in de buurt, dan zie je wie daar werkt. Online kan ook.`
                    : "Je vraagt een gesprek aan bij de coach in jouw stad. Niet bij een centraal punt, maar bij de persoon die je straks spreekt."}
                </p>
                <p className="max-w-[42ch]">
                  Het eerste gesprek is gratis, en daarna beslis jij.
                </p>
              </>
            )}
          </div>

          {known && coach ? (
            <IntakeForm
              coachName={coach.name}
              helper={`${coach.name} neemt binnen twee werkdagen contact op.`}
              lede={`Vrijblijvend kennismaken, online of in ${known.name}. ${coach.name} leest zelf wat je invult, en je beslist daarna pas of je start.`}
              route={encodeIntakeRoute({ kind: "stad", slug: known.slug })}
              title={`Plan je gratis intake bij ${coach.name}`}
            />
          ) : (
            /* No form here, and that is the point of issue #7. A form on a page
               that cannot name a reader is a central sign-up point, and the
               client removed that. So this half shows the way instead. */
            <div className="flex flex-col gap-8">
              <ol className="border-b border-chip-border">
                {steps.map((step, index) => (
                  <li
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-chip-border py-5"
                    key={step}
                  >
                    <span aria-hidden="true" className="font-bold text-violet">
                      {index + 1}.
                    </span>
                    <span className="max-w-[42ch]">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="flex flex-wrap gap-3">
                <Button className="max-[420px]:w-full" href="/locaties">
                  Kies je stad
                </Button>
                <Button
                  className="max-[420px]:w-full"
                  href="/studiekeuzecoaches"
                  variant="outline"
                >
                  Of bekijk eerst alle coaches
                </Button>
              </div>
            </div>
          )}
        </Card>
      </Container>
    </Section>
  );
}
