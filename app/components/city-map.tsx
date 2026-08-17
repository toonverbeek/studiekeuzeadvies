import type { City } from "../cities";
import { ConsentGate } from "./cookie-consent";

/**
 * A Google map for a city page.
 *
 * ONE THING MUST STILL HAPPEN BEFORE LAUNCH:
 *
 * Set NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY (see .env.example). Without a key this
 * falls back to the old keyless embed endpoint. That endpoint works today, but
 * Google does not document or support it, so it can stop at any moment. It is
 * here so the page is not empty while you get a key.
 *
 * THE COOKIE QUESTION IS ANSWERED (issue #10, 2026-08-15). A Google map sets
 * cookies of Google, so the iframe is wrapped in ConsentGate and is not in the
 * DOM before the visitor says yes. Until then the same rectangle holds a still
 * block that says why the map is not there and offers the yes on the spot.
 *
 * This component stays on the server. It builds the address, the zoom and the
 * URL here, and only the gate itself runs in the browser.
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

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const src = key
    ? `https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(query)}&zoom=${zoom}&language=nl&region=NL`
    : `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&hl=nl&output=embed`;

  // One frame for both states. The placeholder and the map get the same width,
  // the same aspect ratio and the same ochre line, so the band keeps its shape
  // and nothing under it moves when the map arrives.
  const frame = "aspect-[4/3] w-full border border-ochre-line lg:aspect-[3/2]";

  return (
    <ConsentGate
      agreeLabel="Laat de kaart zien"
      // Paper under the text, because this band is ochre and a sentence belongs
      // on paper. It is also the tone change that makes the block read as a
      // still frame waiting for the map, not as a hole in the page.
      className={`${frame} bg-paper`}
      reason={`Hier hoort een kaart van ${city.name}. Die komt van Google en zet cookies op je apparaat, dus we laden hem pas als jij het goedvindt.`}
    >
      <iframe
        // The tint pulls Google's blue and green toward the paper and the ochre,
        // so the map reads as part of this page and not as a pasted window.
        className={`${frame} [filter:grayscale(0.45)_sepia(0.3)_contrast(0.95)]`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        title={`Kaart van ${city.name}`}
      />
    </ConsentGate>
  );
}
