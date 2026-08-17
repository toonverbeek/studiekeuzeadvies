/**
 * The few texts and settings that no single page owns: the site name, the inbox
 * for a city without a coach, the hero image and the two legacy quotes. They are
 * collected in one file so nothing fake can hide inside a component, and so a
 * value that is still a stand-in is visible in one place.
 *
 * This file used to say that every value in it must be replaced before the site
 * goes live. That is no longer true of all of them, and the comment above each
 * export now says what its own state is. See issue #9.
 *
 * See the "Inherited Content and Open Questions" section of PRODUCT.md.
 */

/**
 * Only the name is left here. The telephone number, the WhatsApp number and the
 * central mailbox are gone on purpose: the client decided there is no central
 * sign-up point. A reader picks a city, sees who works there, and writes to that
 * coach. See issue #7. The address of a coach lives on the coach, in
 * app/coaches.ts, because that is the only place where it can be true.
 */
export const site = {
  name: "StudieKeuzeAdvies",
} as const;

/** Who answers a request from a city where no coach works yet.
 * TODO: the client still has to decide this internally. null on purpose: an
 * invented address is worse than none, and null forces every caller to handle it. */
export const unassignedIntakeInbox: string | null = null;

/**
 * Where a coach writes who wants to open a city. PRODUCT.md names the coach as
 * the third user, so this invitation has to exist somewhere.
 * TODO: the same undecided question as `unassignedIntakeInbox`, and the same
 * answer while it is open. It held hallo@studiekeuzeadvies.nl, and that mailbox
 * is cancelled with the seller's tenant (issue #7), so a coach who wrote there
 * got a bounce. null now, and every caller hides its own block while it is null:
 * no invitation is better than an invitation to nowhere. Fill it, and the block
 * on a city page without a coach comes back by itself. The page that this really
 * needs is `/coach-worden`, which is blocked on the client. See todos.md.
 */
export const coachRecruitmentInbox: string | null = null;

/**
 * The image at the top of the home page. public/images/hero-gesprek.jpg IS
 * GENERATED, AND IT MAY GO LIVE, because it shows a scene and not a person.
 * Decision by Toon, 13 August 2026, issue #9. Until then the hero was a
 * generated face under "Je vaste coach, bij jou in de buurt", and that caption
 * is what turned a picture into a claim about somebody who does not exist.
 *
 * THE RULE, WRITTEN OUT SO NOBODY HAS TO GUESS:
 * - the home page hero may be a generated scene, because it names nobody;
 * - it gets no name and no caption that claims a person. The caption below
 *   describes the traject, and it must keep doing that;
 * - hero only. Never on /studiekeuzecoaches and never on a city page;
 * - A REAL COACH ALWAYS GETS THEIR OWN REAL PHOTO. public/images/coach-janneke.jpg
 *   is one of those: it comes from the old-site archive, and the rights to that
 *   archive are bought;
 * - THE FIVE GENERATED PORTRAITS IN app/coaches.ts STILL MAY NOT GO LIVE. They
 *   belong to coaches who do not exist yet, and `isPlaceholder` is the field
 *   that decides that, not this comment.
 *
 * The alt text sits next to the caption because both describe the same file. It
 * says what is in the frame and it names nobody, for the same reason.
 */
export const heroImage = {
  caption: "Vier gesprekken, een vaste coach, en alle tijd om te kiezen",
  alt: "Een vrouw en twee tieners zitten samen aan een lichte houten tafel, gebogen over een vel papier waar de vrouw met een pen iets aanwijst. Daarnaast ligt een open schrift. Het daglicht komt van een raam links.",
} as const;

/* The cities live in app/cities.ts, together with the page content per city. */

/**
 * These two quotes come from the old site (/ervaringen/ and the old home page).
 * They may stay: the rights to the archive are bought. The names stay first name
 * and age, as the old site had them.
 *
 * They live here and not in app/stories.ts because two places would drift.
 * app/stories.ts imports them and puts them first on /ervaringen, in front of
 * the eight from the archive. The home page keeps these two and no more: they
 * are the only two with a real completion date, and the other eight can only be
 * dated by the year they stood on the old site. The link under them sends a
 * reader who wants more to /ervaringen, where all ten stand.
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
