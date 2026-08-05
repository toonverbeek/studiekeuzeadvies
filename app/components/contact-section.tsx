import { linkOnOchre } from "../shell";
import { site } from "../site-config";
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
 * Two zones that meet edge to edge: the invitation on ochre, the form on paper.
 * Not a card. Pass a city and the invitation becomes local.
 */
export function ContactSection({ city }: { city?: string }) {
  return (
    <section className="grid lg:grid-cols-2" id="contact">
      <div className="bg-ochre text-ink">
        <div
          className={`flex h-full w-full flex-col gap-8 px-6 py-20 sm:px-10 lg:pr-16 ${gutterLeft}`}
        >
          <h2 className="text-section max-w-[16ch] font-extrabold">
            {city
              ? `Begin met een gesprek in ${city}. Het kost je niets.`
              : "Begin met een gesprek. Het kost je niets."}
          </h2>
          <p className="text-lead max-w-[46ch]">
            In het intakegesprek vertel je wat er speelt en leggen we uit hoe een
            traject werkt. Daarna beslis jij, zonder haast.
          </p>
          <p className="max-w-[46ch]">
            Liever meteen iemand spreken? Bel{" "}
            <a className={linkOnOchre} href={site.phone.href}>
              {site.phone.display}
            </a>{" "}
            of stuur een bericht via{" "}
            <a
              className={linkOnOchre}
              href={site.whatsapp.href}
              rel="noreferrer noopener"
              target="_blank"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
      </div>

      <div className="bg-paper">
        <div
          className={`w-full max-w-[46rem] px-6 py-20 sm:px-10 lg:max-w-none lg:pl-16 ${gutterRight}`}
        >
          <IntakeForm />
        </div>
      </div>
    </section>
  );
}
