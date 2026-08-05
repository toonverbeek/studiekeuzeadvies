/**
 * Every value here is a stand-in that must be replaced before the site goes live.
 * They are collected in one file so nothing fake can hide inside a component.
 *
 * See the "Inherited Content and Open Questions" section of PRODUCT.md.
 */

export const site = {
  name: "StudieKeuzeAdvies",

  // TODO: replace. The 088 number on the old site belongs to Qompas / Lyceo.
  phone: { display: "088 - 000 00 00", href: "tel:+31880000000" },

  // TODO: replace with the WhatsApp Business number.
  whatsapp: {
    display: "WhatsApp",
    href: "https://wa.me/31600000000",
  },

  // TODO: replace with the mailbox that must receive the intake requests.
  email: "hallo@studiekeuzeadvies.nl",
} as const;

/**
 * TODO: no coach is confirmed yet.
 *
 * public/images/coach-placeholder.png and coach-placeholder-2.png are GENERATED
 * PLACEHOLDERS of people who do not exist. They must not go live. The portraits in
 * the old-site archive cannot be used either: those are identifiable people who
 * worked for the seller, and portrait rights stay with them, not with the domain.
 */
export const coach = {
  caption: "Je vaste coach, bij jou in de buurt",
  isPlaceholder: true,
} as const;

/* The cities live in app/cities.ts, together with the page content per city. */

/**
 * TODO: these two quotes come from the old site (/ervaringen/ and the old home page).
 * They belong to the seller and to the people who gave them. Keep them off the live
 * site until you have written permission, or replace them with new quotes.
 */
export const legacyQuotes = [
  {
    quote:
      "StudieKeuzeAdvies heeft mij erg op weg geholpen naar een studiekeuze! De lessen waren heel gezellig en nog belangrijker, ook heel leerzaam. Mijn coach oordeelde niet over iets wat ik zei en had vooral veel interesse.",
    person: "Ger, 18 jaar",
    meta: "traject afgerond in november 2023",
  },
  {
    quote:
      "Het is fijn om zo'n traject te doorlopen omdat je via deze weg zeker kan weten wat je graag wil en welke mogelijkheden er zijn. Verder wist mijn coach goed wat zij deed. Mijn coach wist veel en was super lief en begripvol.",
    person: "Moya, 22 jaar",
    meta: "traject afgerond in maart 2024",
  },
] as const;
