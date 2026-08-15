import Link from "next/link";
import { cities } from "../cities";
import { encodeIntakeRoute } from "../intake";
import { button, linkOnOchre, linkOnPaper } from "../shell";
import { IntakeForm } from "./intake-form";

/**
 * The gutter of the page shell, written as padding. The two zones below run from
 * edge to edge, so they cannot sit inside the shell, but their text must still
 * start on the same line as every other section. Centring a fixed box inside
 * each half does not do that: it drifts as the viewport changes.
 */
const gutterLeft = "lg:pl-[max(4rem,calc((100vw-1240px)/2+4rem))]";
const gutterRight = "lg:pr-[max(4rem,calc((100vw-1240px)/2+4rem))]";

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
 * Two zones that meet edge to edge: the invitation on ochre, the answer on
 * paper. Not a card.
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
 */
export function ContactSection({ city }: { city?: string }) {
  const known = city ? findCity(city) : undefined;
  const coach = known?.coach ?? null;

  return (
    <section className="grid lg:grid-cols-2" id="contact">
      <div className="bg-ochre text-ink">
        <div
          className={`flex h-full w-full flex-col gap-8 px-6 py-20 sm:px-10 lg:pr-16 ${gutterLeft}`}
        >
          <h2 className="text-section max-w-[16ch] font-extrabold">
            {coach
              ? `Begin met een gesprek met ${coach.name}. Het kost je niets.`
              : city
                ? "Zoek een coach bij jou in de buurt."
                : "Begin met een gesprek. Het kost je niets."}
          </h2>

          {coach ? (
            <>
              <p className="text-lead max-w-[46ch]">
                In het intakegesprek vertel je wat er speelt en leggen we uit
                hoe een traject werkt. Daarna beslis jij, zonder haast.
              </p>
              <p className="max-w-[46ch]">
                Wil je eerst lezen wie {coach.name} is? Dat staat{" "}
                <Link
                  className={linkOnOchre}
                  href={`/studiekeuzecoaches#${coach.slug}`}
                >
                  bij de coaches
                </Link>
                .
              </p>
            </>
          ) : (
            <>
              <p className="text-lead max-w-[46ch]">
                {city
                  ? `In ${city} werkt op dit moment geen coach. Kies een stad hier in de buurt, dan zie je wie daar werkt. Online kan ook.`
                  : "Je vraagt een gesprek aan bij de coach in jouw stad. Niet bij een centraal punt, maar bij de persoon die je straks spreekt."}
              </p>
              <p className="max-w-[46ch]">
                Het eerste gesprek is gratis, en daarna beslis jij.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="bg-paper">
        <div
          className={`w-full max-w-[46rem] px-6 py-20 sm:px-10 lg:max-w-none lg:pl-16 ${gutterRight}`}
        >
          {known && coach ? (
            <IntakeForm
              coachName={coach.name}
              route={encodeIntakeRoute({ kind: "stad", slug: known.slug })}
            />
          ) : (
            /* No form here, and that is the point of this ticket. A form on a
               page that cannot name a reader is a central sign-up point, and
               the client removed that. So this half shows the way instead. */
            <div className="flex flex-col gap-10">
              <ol className="border-b border-hairline">
                {steps.map((step, index) => (
                  <li
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-hairline py-5"
                    key={step}
                  >
                    <span className="text-ink-soft" aria-hidden="true">
                      {index + 1}.
                    </span>
                    <span className="max-w-[46ch]">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link className={button} href="/locaties">
                  Kies je stad
                </Link>
                <Link className={linkOnPaper} href="/studiekeuzecoaches">
                  Of bekijk eerst alle coaches
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
