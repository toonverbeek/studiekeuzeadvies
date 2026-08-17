import type { City, CityWithCoach, Point } from "../cities";
import { ConsentGate } from "./cookie-consent";

/**
 * The Google maps of this site. Two of them: one city on a city page, and the
 * work area on the home page. They share this file because they share the two
 * things that matter, and both of them were decided once, for both maps:
 *
 * ONE THING MUST STILL HAPPEN BEFORE LAUNCH:
 *
 * Set NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY (see .env.example). Without a key both
 * maps fall back to the old keyless embed endpoint. That endpoint works today,
 * but Google does not document or support it, so it can stop at any moment. It
 * is here so the pages are not empty while you get a key.
 *
 * THE COOKIE QUESTION IS ANSWERED (issue #10, 2026-08-15). A Google map sets
 * cookies of Google, so every iframe here is wrapped in ConsentGate and is not
 * in the DOM before the visitor says yes. Until then the same rectangle holds a
 * still block that says why the map is not there and offers the yes on the spot.
 *
 * Both maps stay on the server. They build the address, the zoom and the URL
 * here, and only the gate itself runs in the browser.
 */

/** The tint pulls Google's blue and green toward the paper and the ochre, so a
 *  map reads as part of the page and not as a pasted window. */
const tint = "[filter:grayscale(0.45)_sepia(0.3)_contrast(0.95)]";

/**
 * One frame for both states. The placeholder and the map get the same width,
 * the same aspect ratio and the same ochre line, so a band keeps its shape and
 * nothing under it moves when the map arrives. The caller owns the frame,
 * because the two maps sit in columns of a different width.
 *
 * BOTH FRAMES ARE SQUARE ON A TELEPHONE, AND THAT IS THE PLACEHOLDER TALKING,
 * NOT THE MAP. Measured on 2026-08-17: before a yes this rectangle has to hold
 * four or five lines of text plus a button, which is 260px at the narrowest
 * screen we can name (320px, so a 272px frame). A 4/3 box is 204px there, and
 * the button then hangs out of the paper onto the ochre. A square box is 272px
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
      // Paper under the text, because both bands are ochre and a sentence
      // belongs on paper. It is also the tone change that makes the block read
      // as a still frame waiting for the map, not as a hole in the page.
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

/** A map that names one place: `place` with a key, `q=` without one. */
function placeSrc(query: string, zoom: number) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const q = encodeURIComponent(query);

  return key
    ? `https://www.google.com/maps/embed/v1/place?key=${key}&q=${q}&zoom=${zoom}&language=nl&region=NL`
    : `https://maps.google.com/maps?q=${q}&z=${zoom}&hl=nl&output=embed`;
}

/** A map that names no place at all, only a piece of the country to look at:
 *  `view` with a key, `ll=` without one. Verified on 2026-08-17 that the
 *  keyless endpoint accepts `ll` with no `q` and answers with the same frame. */
function viewSrc(center: Point, zoom: number) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const ll = `${center.lat.toFixed(4)},${center.lng.toFixed(4)}`;

  return key
    ? `https://www.google.com/maps/embed/v1/view?key=${key}&center=${ll}&zoom=${zoom}&language=nl&region=NL`
    : `https://maps.google.com/maps?ll=${ll}&z=${zoom}&hl=nl&output=embed`;
}

/**
 * The map on a city page.
 *
 * No city has a confirmed address yet, so the map centres on the city itself.
 * The moment a room is fixed in app/cities.ts, the map moves to that address
 * and zooms in. Nothing here invents a building.
 */
export function CityMap({ city }: { city: City }) {
  const query = city.meeting
    ? `${city.meeting.street}, ${city.meeting.postcode} ${city.meeting.town}`
    : `${city.name}, Nederland`;
  const zoom = city.meeting ? 15 : 12;

  return (
    <GoogleMap
      frame="aspect-square w-full border border-ochre-line sm:aspect-[4/3] lg:aspect-[3/2]"
      reason={`Hier hoort een kaart van ${city.name}. Die komt van Google en zet cookies op je apparaat, dus we laden hem pas als jij het goedvindt.`}
      src={placeSrc(query, zoom)}
      title={`Kaart van ${city.name}`}
    />
  );
}

/*
 * THE OVERVIEW MAP CARRIES NO MARKERS, AND THAT IS A LIMIT, NOT A CHOICE. The
 * Maps Embed API can show one place (`place`) or one view (`view`). It cannot
 * take a list of our cities and pin them. The alternatives were worse: `search`
 * puts the competitors of a text query on our own home page, and the Static
 * Maps API draws real pins but returns a picture, and only with a key, so today
 * it would show nothing at all.
 *
 * So this map does the one job it can do well: it shows which part of the
 * country we are in. Google prints the city names itself at this zoom, and the
 * list of names next to the map is the legend. When the work area changes, the
 * frame follows it, because it is worked out from the cities below.
 */

/**
 * The smallest frame we ship: the map fills a single column on a 390px
 * telephone, so 340 pixels wide. The height is the 4/3 one and not the square
 * one it really gets there, which makes the fit a little too careful on
 * purpose: the zoom then does not depend on which aspect ratio a breakpoint
 * happened to pick. Fit to this and no city falls off the map on any screen.
 */
const narrowestMap = { width: 340, height: 255 };

/** Empty space around the outer cities, so a name is not cut by the edge. */
const breathingRoom = 1.35;

/** A whole country at 6, a city and its ring at 10. The maximum also answers
 *  the one city case, where the cities span nothing and any zoom "fits". */
const zoomRange = { min: 6, max: 10 };

/**
 * Where to point the overview map, worked out from the cities themselves.
 *
 * Web Mercator: at zoom z the world is 256 * 2^z pixels wide, so one pixel is
 * 360 / (256 * 2^z) degrees of longitude anywhere on the map, and cos(latitude)
 * times that in degrees of latitude. Take the widest zoom that still fits the
 * spread of the cities inside the narrowest frame we ship.
 *
 * The centre is the middle of the box around the cities. The true Mercator
 * middle sits a few pixels off that, and at this size a few pixels is nothing.
 */
function workAreaFrame(points: Point[]) {
  const lats = points.map((point) => point.lat);
  const lngs = points.map((point) => point.lng);

  const center = {
    lat: (Math.min(...lats) + Math.max(...lats)) / 2,
    lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
  };

  const spanLat = (Math.max(...lats) - Math.min(...lats)) * breathingRoom;
  const spanLng = (Math.max(...lngs) - Math.min(...lngs)) * breathingRoom;
  const shrink = Math.cos((center.lat * Math.PI) / 180);

  for (let zoom = zoomRange.max; zoom > zoomRange.min; zoom--) {
    const perPixel = 360 / (256 * 2 ** zoom);

    if (
      spanLng <= perPixel * narrowestMap.width &&
      spanLat <= perPixel * shrink * narrowestMap.height
    ) {
      return { center, zoom };
    }
  }

  return { center, zoom: zoomRange.min };
}

/** The map on the home page: the part of the country where a coach works. */
export function WorkAreaMap({ cities }: { cities: CityWithCoach[] }) {
  if (cities.length === 0) return null;

  const { center, zoom } = workAreaFrame(cities.map((city) => city.at));

  return (
    <GoogleMap
      // This map sits under the paragraph, in the same column, so it takes the
      // shape of that column: a little narrower than the line length of the
      // text above it, and never wider. Without the cap a tablet would give a
      // full width 4/3 map half a screen of height.
      frame="aspect-square w-full max-w-[26rem] border border-ochre-line sm:aspect-[4/3] lg:aspect-[3/2] lg:max-w-[32rem]"
      reason="Hier hoort een kaart van het gebied waar we werken. Die komt van Google en zet cookies op je apparaat, dus we laden hem pas als jij het goedvindt."
      src={viewSrc(center, zoom)}
      title="Kaart van het gebied waar onze coaches werken"
    />
  );
}
