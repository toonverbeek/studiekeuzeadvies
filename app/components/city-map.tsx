import type { City } from "../cities";

/**
 * A Google map for a city page.
 *
 * TWO THINGS MUST HAPPEN BEFORE LAUNCH:
 *
 * 1. Set NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY (see .env.example). Without a key
 *    this falls back to the old keyless embed endpoint. That endpoint works
 *    today, but Google does not document or support it, so it can stop at any
 *    moment. It is here so the page is not empty while you get a key.
 *
 * 2. A Google map sets cookies. The site needs a consent banner, and this
 *    iframe must not load before the visitor agrees.
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

  return (
    <iframe
      // The tint pulls Google's blue and green toward the paper and the ochre,
      // so the map reads as part of this page and not as a pasted window.
      className="aspect-[4/3] w-full border border-ochre-line [filter:grayscale(0.45)_sepia(0.3)_contrast(0.95)] lg:aspect-[3/2]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={src}
      title={`Kaart van ${city.name}`}
    />
  );
}
