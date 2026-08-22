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

export const site = {
  /**
   * The brand as it is written in running text.
   *
   * It read "StudiekeuzeAdvies" until the client's mail of 21 August 2026
   * (docs/redesign/client-feedback.md, row A1): "Alle 'studiekeuze...' moet met
   * hoofdletters S K". The three inner capitals now hold everywhere, in running
   * text and in a `<title>`, and the same rule made StudieKeuzeCoach,
   * StudieKeuzeTraject and StudieKeuzeScan.
   */
  name: "StudieKeuzeAdvies",
} as const;

/**
 * THE CENTRAL MAILBOX, AND WHY IT IS BACK.
 *
 * Decision 2026-08-15 (issue #7) said there is no central sign-up point: a
 * reader picks a city, sees who works there and writes to that coach. The
 * client's mail of 21 August 2026 reverses that in its own opening line:
 * "info@ = info@studiekeuzeadvies.nl; het emailadres waar we straks allemaal
 * bij moeten kunnen en waar alle centrale vragen op binnen moeten komen."
 *
 * THE SPLIT THAT SURVIVED THE REVERSAL, because the client kept it themselves:
 *
 *   an intake        goes to the coach the reader picked, and to nobody else.
 *                    `email` on the coach in app/coaches.ts is that route, and
 *                    it is still null for all five (question Q9).
 *   everything else  goes here: a question, a complaint, a StudieKeuzeScan
 *                    booking, an online request, a school that wants to work
 *                    with us, somebody who wants to join as a coach.
 *
 * So this address is printed on a page, and it therefore has to be a mailbox
 * that answers. The client named it, so it is theirs to stand behind.
 */
export const centralInbox = "info@studiekeuzeadvies.nl";

/** Who answers a request from a city where no coach works yet. The central
 *  mailbox, since the client named one. */
export const unassignedIntakeInbox: string | null = centralInbox;

/**
 * Where a coach writes who wants to open a city. PRODUCT.md names the coach as
 * the third user, so this invitation has to exist somewhere. It was null while
 * there was no central mailbox, and every caller hid its own block; now that
 * the client named one, the invitation can stand again.
 */
export const coachRecruitmentInbox: string | null = centralInbox;

/**
 * Whether /samenwerken is a page or a 404, and whether the footer offers it.
 *
 * The client asked for the page and asked for it to be switched off at launch,
 * in the same breath: "Is het mogelijk om deze linkjes (decanen en scholen) en
 * dus de pagina Samenwerken bij de lancering nog even 'uit' te zetten? We willen
 * eerst opstarten." So the page is finished and this flag is the switch. Turn it
 * true and the route builds and the two footer links appear; nothing else has to
 * change. See docs/redesign/client-feedback.md, row H16.
 */
export const showSamenwerken = false;

/**
 * Where a filled-in application from `/coach-worden` is delivered.
 *
 * IT IS NOT `coachRecruitmentInbox` ABOVE, AND THE DIFFERENCE MATTERS. That one
 * is an address we PRINT on a page, so it may not be a stand-in and it may not
 * be a mailbox that bounces: it stays null until the client names one. This one
 * is a destination the server writes to, and it is never shown to a reader, so
 * the archive address is a perfectly good answer while the client decides.
 *
 * The order is: an inbox the client set, then MAIL_ARCHIVE, then null. Null
 * means the form still renders and still says something honest, because
 * `applyAsCoach` in app/actions.ts answers `not-configured` and the card offers
 * no mailto it cannot honour. See issues #20 and #44.
 *
 * COACH_APPLICATION_INBOX has no NEXT_PUBLIC_ prefix on purpose. Nothing in the
 * browser needs it, and an address in a client bundle is an address a scraper
 * gets for free.
 */
export const coachApplicationInbox: string | null =
  process.env.COACH_APPLICATION_INBOX?.trim() ||
  process.env.MAIL_ARCHIVE?.trim() ||
  null;

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
 * - A REAL COACH ALWAYS GETS THEIR OWN REAL PHOTO. All four portraits in
 *   app/coaches.ts are now the coaches' own photographs, sent by them and taken
 *   from the client's Drive. The five generated stand-ins are deleted, and so is
 *   the question they raised.
 *
 * The client asked for photographs only, and in colour (row A3). This one is
 * still a generated scene, and it is the last one on the site. See
 * docs/redesign/client-feedback.md, question Q2.
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
