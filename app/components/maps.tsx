import { type City, citiesWithCoach } from "../cities";
import { ConsentGate } from "./cookie-consent";
import { NlMap } from "./nl-map";

/**
 * The map of a city page. It can be drawn two ways, and which one you get
 * depends on a single environment variable. The home page draws the work area
 * itself, straight from app/components/nl-map.tsx, because it needs no key and
 * no gate.
 *
 * WITHOUT NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY, WHICH IS THE DEFAULT, the page
 * draws our own map: app/components/nl-map.tsx, an inline SVG built from a
 * projection we ran once, offline. It is first party, so it sets no cookie,
 * asks no consent question, costs no key and no request, and it is the map
 * language of the client's own design. It can also do the one thing the Google
 * embed never could: put a pin on every city where a coach works. Decision of
 * 2026-08-20 in docs/decisions.md.
 *
 * WITH A KEY the Google embed comes back as an enhancement, because a reader
 * who wants to know how far it is by bike wants streets, not a picture. That
 * one sets cookies of Google, so it stays inside ConsentGate and is not in the
 * DOM before the visitor says yes (issue #10, 2026-08-15). Until then the same
 * rectangle holds a still block that says why the map is not there and offers
 * the yes on the spot.
 *
 * WHAT IS GONE. The keyless `maps.google.com/maps?output=embed` endpoint that
 * this map used to fall back on. Google does not document or support it, so it
 * could stop on any morning, and an undocumented third party iframe behind a
 * cookie question was a poor deal for a picture we can draw ourselves. Gone
 * with it is `WorkAreaMap`, the overview map of the home page: the Maps Embed
 * API could not pin a list of cities, and our own map can, so the home page
 * calls `NlMap` directly and no longer needs a Google frame at all.
 *
 * The map stays on the server. It builds the address, the zoom and the URL
 * here, and only the consent gate itself runs in the browser.
 */

/** True when the Google embed may be used at all. */
const googleKey = () => process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

/** The frame the client draws around a map: a lavender panel with the map
 *  inset by 18px. Used by our own map; the Google frames keep their border. */
// The same string as /locaties and /studiekeuzecoaches, so one map has one
// frame on this site. `rounded-photo` is the 26px token this line used to
// write by hand. See the note in the review: a `frame` prop on NlMap would
// take the last two hand-written wrappers with it.
const panel = "rounded-photo bg-lavender p-3.5 shadow-map sm:p-[18px]";

/** The tint pulls Google's blue and green toward the paper, so a map reads as
 *  part of the page and not as a pasted window. */
const tint = "[filter:grayscale(0.45)_sepia(0.3)_contrast(0.95)]";

/**
 * One frame for both states. The placeholder and the map get the same width,
 * the same aspect ratio and the same hairline, so a band keeps its shape and
 * nothing under it moves when the map arrives. The caller owns the frame,
 * because the two maps sit in columns of a different width.
 *
 * BOTH FRAMES ARE SQUARE ON A TELEPHONE, AND THAT IS THE PLACEHOLDER TALKING,
 * NOT THE MAP. Measured on 2026-08-17: before a yes this rectangle has to hold
 * four or five lines of text plus a button, which is 260px at the narrowest
 * screen we can name (320px, so a 272px frame). A 4/3 box is 204px there, and
 * the button then hangs out of the paper onto the band. A square box is 272px
 * and the text fits, at every width, with no second height to jump between.
 */
function GoogleMap({
  agreeLabel = "Laat de kaart zien",
  frame,
  reason,
  src,
  title,
}: {
  agreeLabel?: string;
  frame: string;
  reason: string;
  src: string;
  title: string;
}) {
  return (
    <ConsentGate
      agreeLabel={agreeLabel}
      // Paper under the text, because a sentence belongs on paper. It is also
      // the tone change that makes the block read as a still frame waiting for
      // the map, not as a hole in the page.
      className={`${frame} bg-paper`}
      reason={reason}
    >
      <iframe
        className={`${frame} ${tint}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        title={title}
      />
    </ConsentGate>
  );
}

/** A Google map that names one place. Only called when there is a key. */
function placeSrc(key: string, query: string, zoom: number) {
  const q = encodeURIComponent(query);

  return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${q}&zoom=${zoom}&language=nl&region=NL`;
}

/**
 * The map on a city page.
 *
 * No city has a confirmed address yet, so the map centres on the city itself.
 * The moment a room is fixed in app/cities.ts, the map moves to that address
 * and zooms in. Nothing here invents a building.
 */
export function CityMap({ city }: { city: City }) {
  const key = googleKey();

  /*
   * OUR OWN MAP, AND WHAT IT SHOWS. This city, big, plus every other city where
   * a coach works, small and as a link. On a page for a city that has no coach
   * that second half is the whole point: the paragraph beside it says "kies een
   * stad hier in de buurt", and this is that sentence as a picture.
   *
   * No consent gate, because there is nothing to consent to.
   */
  if (!key) {
    const here = { name: city.name, at: city.at };
    const others = citiesWithCoach
      .filter((other) => other.slug !== city.slug)
      .map((other) => ({
        name: other.name,
        at: other.at,
        href: `/locaties/${other.slug}`,
      }));

    return (
      <div className={panel}>
        <NlMap
          cities={[...others, here]}
          highlight={city.name}
          title={`Kaart van Nederland met ${city.name} uitgelicht`}
        />
      </div>
    );
  }

  const query = city.meeting
    ? `${city.meeting.street}, ${city.meeting.postcode} ${city.meeting.town}`
    : `${city.name}, Nederland`;
  const zoom = city.meeting ? 15 : 12;

  return (
    <GoogleMap
      frame="aspect-square w-full border border-hairline sm:aspect-[4/3] lg:aspect-[3/2]"
      reason={`Hier hoort een kaart van ${city.name}. Die komt van Google en zet cookies op je apparaat, dus we laden hem pas als jij het goedvindt.`}
      src={placeSrc(key, query, zoom)}
      title={`Kaart van ${city.name}`}
    />
  );
}
