"use server";

import {
  type ApplicationState,
  achtergronden,
  achtergrondLabel,
  applicationInitialState,
  cvExtensions,
  cvMaxBytes,
  cvMaxLabel,
  cvTypes,
} from "./application";
import {
  type CentralField,
  type CentralState,
  centralInitialState,
  getCentralTopic,
} from "./central";
import { getCity } from "./cities";
import { type Coach, getCoach } from "./coaches";
import {
  bereikbaar,
  bereikLabel,
  bereikNeedsPhone,
  decodeIntakeRoute,
  intakeInitialState,
  type IntakeRoute,
  type IntakeState,
  situaties,
  situatieLabel,
  voorkeuren,
  voorkeurLabel,
  spamGuard,
} from "./intake";
import {
  archiveInbox,
  type MailAttachment,
  type MailFailure,
  sendMail,
} from "./lib/mail";
import {
  centralInbox,
  coachApplicationInbox,
  unassignedIntakeInbox,
} from "./site-config";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

/**
 * How long a request may sit in a mailbox, written into every message.
 *
 * This is the third box of issue #21, and it is the one that a line of code
 * can carry. An intake request names a person, usually between 16 and 22, and
 * one of the four situations is a health statement. It may not live in a
 * freelancer's mailbox forever because nobody agreed on when to delete it.
 *
 * THIRTY DAYS IS OUR PROPOSAL, NOT A SIGNED POLICY, and the sentence says so.
 * It sits at the bottom of every mail so it reaches the only person who can
 * act on it, on the day they can act on it. Change the number here and every
 * message changes with it.
 */
const RETENTION_LINE =
  "Bewaartermijn: verwijder deze aanvraag uiterlijk 30 dagen nadat het contact is afgerond. Dit is voorgesteld beleid dat de klant nog moet bevestigen.";

/**
 * The two hidden fields of `spamGuard`, checked. true means "do not deliver".
 *
 * The time check is deliberately generous. Three seconds is quicker than any
 * person can read four labels and type a name, and it is an eternity to a
 * script. A missing or unparsable timestamp is NOT treated as a bot: a reader
 * with an extension that strips hidden inputs would otherwise be silently
 * dropped, and losing a real request is the one thing this whole file exists to
 * prevent.
 */
function looksAutomated(formData: FormData): boolean {
  if (String(formData.get(spamGuard.honeypot) ?? "").trim() !== "") return true;

  const renderedAt = Number(formData.get(spamGuard.renderedAt));
  if (!Number.isFinite(renderedAt) || renderedAt <= 0) return false;

  return Date.now() - renderedAt < spamGuard.minimumSeconds * 1000;
}

/**
 * The longest a field may be.
 *
 * Nothing on this site asks for an essay, and no field was bounded at all: a
 * script could post megabytes into a body, or a newline into a value that ends
 * up in the subject line. The provider then refuses the message and the reader
 * is told "We konden je aanvraag niet versturen", which hides a bot behind an
 * outage. The caps are far above anything a person types.
 */
const MAX_SHORT = 200;
const MAX_LONG = 5000;

const TOO_LONG_SHORT = "Dit is te lang. Houd het kort.";
const TOO_LONG_MESSAGE = "Dit bericht is te lang. Vat het samen in het kort.";

/**
 * A subject line is one line. A carriage return or a newline in a value that
 * is interpolated into it is a header injection, so both become a space.
 */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

/**
 * Where one request goes, after the hidden field has been checked against real
 * data. `coach` is null for a city that has no coach yet: that is a valid
 * request, it only has a different destination.
 */
type IntakeDestination = {
  coach: Coach | null;
  /** The city the reader came from, when the route named one. */
  cityName: string | null;
};

/**
 * The form carries a slug through the browser, so it is a claim, not a fact.
 * Everything here is looked up in app/coaches.ts and app/cities.ts, and an
 * unknown slug returns null. Nothing is delivered on the word of a form field.
 *
 * A city route is resolved to the coach of that city, not to a stored name, so
 * a request follows the roster instead of a copy of it.
 */
function resolveDestination(route: IntakeRoute): IntakeDestination | null {
  if (route.kind === "coach") {
    const coach = getCoach(route.slug);
    if (!coach) return null;
    // A stand-in cannot answer, so a stand-in is not a destination. The
    // request takes the "nog geen coach" road instead: the honest
    // confirmation, and delivery to a mailbox a person really reads. The line
    // disappears by itself the day isPlaceholder becomes false.
    return coach.isPlaceholder
      ? { coach: null, cityName: coach.town }
      : { coach, cityName: null };
  }

  const city = getCity(route.slug);
  if (!city) return null;
  const coach = city.coach?.isPlaceholder ? null : city.coach;
  return { coach, cityName: city.name };
}

/**
 * Turning a failed send into something a reader can act on.
 *
 * Both failures read the same on the page, and the address is the point of
 * both: a request that cannot be posted becomes a request the reader can mail
 * themselves, in one tap, without retyping anything they can remember. The
 * sentence is here and the address is data, so the form can make it a link.
 */
function undeliverable(reason: MailFailure) {
  return reason === "not-configured" || reason === "no-recipient"
    ? ("not-configured" as const)
    : ("provider-error" as const);
}

const UNDELIVERABLE_MESSAGE = "We konden je aanvraag niet versturen.";

export async function requestIntake(
  _prev: IntakeState,
  formData: FormData,
): Promise<IntakeState> {
  const values = {
    naam: String(formData.get("naam") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    telefoon: String(formData.get("telefoon") ?? "").trim(),
    situatie: String(formData.get("situatie") ?? "").trim(),
    voorkeur: String(formData.get("voorkeur") ?? "").trim(),
    bereik: String(formData.get("bereik") ?? "").trim(),
    bericht: String(formData.get("bericht") ?? "").trim(),
    voor: String(formData.get("voor") ?? "").trim(),
  };

  const errors: IntakeState["errors"] = {};

  if (values.naam.length < 2) {
    errors.naam = "Vul je naam in, dan weten we hoe we je noemen.";
  }
  if (!isEmail(values.email)) {
    errors.email = "Dit e-mailadres klopt nog niet. Controleer het even.";
  }
  if (values.telefoon && values.telefoon.replace(/\D/g, "").length < 9) {
    errors.telefoon =
      "Dit nummer lijkt te kort. Laat het leeg als je liever mailt.";
  }
  if (!situaties.some((s) => s.value === values.situatie)) {
    errors.situatie = "Kies wat het beste bij je past.";
  }
  // Optional, so empty passes. Anything else has to be one of our three
  // values: the select cannot produce another, so another means a script.
  if (values.voorkeur && !voorkeuren.some((v) => v.value === values.voorkeur)) {
    errors.voorkeur = "Kies online, op locatie, of geen voorkeur.";
  }
  // Row P3. The channel decides whether the number is optional: a reader who
  // asks to be called or WhatsApped has to leave one, and a reader who picked
  // e-mail already gave us the only address we need.
  if (!bereikbaar.some((b) => b.value === values.bereik)) {
    errors.bereik = "Kies hoe we je mogen bereiken.";
  }
  if (bereikNeedsPhone(values.bereik) && !values.telefoon) {
    errors.telefoon =
      "Vul je nummer in, dan kunnen we je bellen of appen. Of kies e-mail hierboven.";
  }
  if (values.naam.length > MAX_SHORT) errors.naam = TOO_LONG_SHORT;
  if (values.email.length > MAX_SHORT) errors.email = TOO_LONG_SHORT;
  if (values.telefoon.length > MAX_SHORT) errors.telefoon = TOO_LONG_SHORT;
  if (values.bericht.length > MAX_LONG) errors.bericht = TOO_LONG_MESSAGE;

  const route =
    values.voor.length > MAX_SHORT ? null : decodeIntakeRoute(values.voor);
  const destination = route ? resolveDestination(route) : null;

  // A reader cannot repair this field, so the message sends them somewhere they
  // can: the list of cities. Without a destination there is nobody to write to,
  // so this stops the request instead of quietly sending it into the void.
  if (!destination) {
    errors.voor =
      "We kunnen niet zien voor wie dit bericht is. Kies je stad bij Locaties en verstuur het daar opnieuw.";
  }

  // `!destination` is here for the type checker as much as for the reader: the
  // error above already covers this case.
  if (!destination || Object.keys(errors).length > 0) {
    return {
      status: "invalid",
      message: "Er ontbreekt nog iets. Kijk hieronder wat je moet aanvullen.",
      fallbackAddress: null,
      errors,
      values,
    };
  }

  /*
   * THE DELIVERY ROUTE, AND WHY IT HAS THREE STEPS. The coach of this city is
   * the right desk. A city without a coach falls to the inbox for exactly that
   * case. And when neither exists, the archive address still catches it, so a
   * real request is never dropped because a field in app/coaches.ts is null.
   *
   * The archive address is also the cc on every message. Issue #17 asked for
   * this in one line: a request must not exist in only one place, because a
   * provider that 500s or a coach address that bounces then loses a lead worth
   * about seven hundred euro.
   */
  const meantFor = destination.coach
    ? destination.coach.name
    : `nog geen coach in ${destination.cityName ?? "deze stad"}`;

  /*
   * WHAT A READER IS TOLD WHEN IT WORKED. Only this state may say what happens
   * next, and it may say it because the provider accepted the message before
   * this line runs. Two working days is the client's own promise on their
   * Janneke page; it is written here, once, so no page can quietly make a
   * different one. If a coach cannot keep it, this sentence changes and every
   * page changes with it.
   */
  const sent: IntakeState = {
    status: "sent",
    message: destination.coach
      ? `Bedankt. Je aanvraag staat bij ${destination.coach.name}. Je krijgt binnen twee werkdagen antwoord, en dan plannen jullie samen het gratis intakegesprek.`
      : "Bedankt. Hier werkt nog geen vaste coach. We zoeken iemand bij jou in de buurt en je krijgt binnen twee werkdagen antwoord.",
    fallbackAddress: null,
    errors: {},
    values: intakeInitialState.values,
  };

  // A bot gets the confirmation and no mail. See `spamGuard` in app/intake.ts.
  if (looksAutomated(formData)) return sent;

  const archive = archiveInbox();
  const to = destination.coach?.email ?? unassignedIntakeInbox ?? archive;

  /*
   * THE SUBJECT NAMES NO SITUATION. Issue #21: one of the four options is
   * "ik heb ADD, ADHD of autisme", and a subject line is the part of a mail
   * that shows on a lock screen, in a notification and in every list a mailbox
   * ever draws. The situation is in the body, where opening it is a choice.
   *
   * IT STILL DOES NOT LOG THE SUBMISSION. The route is enough to tell which
   * desk missed a request; the answers are not ours to copy to a runtime log
   * that nobody reads and nobody empties.
   */
  const where = destination.cityName ? ` (${destination.cityName})` : "";
  const result = await sendMail({
    to: to ?? "",
    cc: archive,
    replyTo: values.email,
    subject: oneLine(`Nieuwe intake-aanvraag${where}: ${values.naam}`),
    text: [
      `Aanvraag voor: ${meantFor}`,
      "",
      `Naam:     ${values.naam}`,
      `E-mail:   ${values.email}`,
      `Telefoon: ${values.telefoon || "niet ingevuld"}`,
      `Situatie: ${situatieLabel(values.situatie)}`,
      `Voorkeur: ${
        values.voorkeur
          ? voorkeurLabel(
              values.voorkeur,
              destination.coach?.town ?? destination.cityName,
            )
          : "niet ingevuld"
      }`,
      `Bereiken: ${bereikLabel(values.bereik)}`,
      // There is no "Bericht:" block here any more. Row P2 of the client's
      // mail took the question off the card ("waar loop je tegenaan moet
      // eruit"), so there is nothing to print and an empty heading on every
      // mail is worse than no heading. `bericht` stays in the type: putting
      // the question back is then one field, not a migration.
      "",
      "Antwoorden gaat rechtstreeks naar de aanvrager.",
      RETENTION_LINE,
    ].join("\n"),
  });

  if (!result.ok) {
    console.error(
      `[intake] Niet verstuurd (${result.reason}). Bedoeld voor: ${meantFor}. De inhoud staat bewust niet in dit log.`,
    );

    return {
      status: undeliverable(result.reason),
      message: UNDELIVERABLE_MESSAGE,
      fallbackAddress: to ?? archive,
      errors: {},
      values,
    };
  }

  return sent;
}

/**
 * A file name a mail client can be handed.
 *
 * Three things happen to it. A line break or a slash goes, because either can
 * make a mail header say something the sender did not write. The stem is cut to
 * length, never the suffix: a .pdf that arrives called `cv` opens in nothing.
 * And the cut counts characters the way a person reads them, so it cannot land
 * in the middle of an emoji and leave half of one behind.
 */
function safeFilename(name: string): string {
  const clean = oneLine(name).replace(/[/\\]/g, "-");
  const dot = clean.lastIndexOf(".");
  const stem = dot > 0 ? clean.slice(0, dot) : clean;
  const suffix = dot > 0 ? clean.slice(dot) : "";
  const room = Math.max(1, 120 - suffix.length);
  const cut = [...stem].slice(0, room).join("");
  return `${cut}${suffix}`;
}

/**
 * Read the CV off the application form.
 *
 * It answers with exactly one of two things: an attachment, or a sentence for
 * the reader. No file at all is neither, because the CV is optional (see
 * app/application.ts). Nothing is written to disk: the bytes are read once,
 * encoded, and handed to the mailer.
 *
 * WHY THE EXTENSION AS WELL AS THE TYPE. A browser sends an empty or a wrong
 * `type` for a .docx often enough that a type-only check refuses real CVs, and
 * a type on its own is a claim the sender makes about their own file anyway.
 * Both have to look right.
 */
async function readCv(
  formData: FormData,
): Promise<{ attachment?: MailAttachment; error?: string }> {
  const file = formData.get("cv");

  if (!(file instanceof File) || file.size === 0) return {};

  if (file.size > cvMaxBytes) {
    return {
      error: `Dit bestand is groter dan ${cvMaxLabel}. Verklein het, of mail het ons apart.`,
    };
  }

  const name = file.name.toLowerCase();
  const extensionOk = cvExtensions.some((end) => name.endsWith(end));
  const typeOk = !file.type || cvTypes.some((type) => type === file.type);

  if (!extensionOk || !typeOk) {
    return { error: "Stuur je cv als PDF of Word-bestand." };
  }

  return {
    attachment: {
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      contentType: file.type || undefined,
      // The reader's own file name, minus anything that could confuse a mail
      // client about what kind of file it is looking at. The length cap takes
      // it out of the stem and never out of the suffix: a .pdf that arrives
      // called `cv` opens in nothing.
      filename: safeFilename(file.name),
    },
  };
}

/**
 * The other form on this site: somebody who wants to coach for us.
 *
 * Same skeleton as `requestIntake` and deliberately not shared with it. The two
 * forms have different fields, a different destination and a different privacy
 * question, and a shared "submit anything" helper would have to be told all
 * three anyway. What they do share is written down once: `spamGuard`,
 * `sendMail` and the sentence for an undeliverable request.
 */
export async function applyAsCoach(
  _prev: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  const values: ApplicationState["values"] = {
    naam: String(formData.get("naam") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    telefoon: String(formData.get("telefoon") ?? "").trim(),
    regio: String(formData.get("regio") ?? "").trim(),
    achtergrond: String(formData.get("achtergrond") ?? "").trim(),
    motivatie: String(formData.get("motivatie") ?? "").trim(),
  };

  const errors: ApplicationState["errors"] = {};

  if (values.naam.length < 2) {
    errors.naam = "Vul je naam in, dan weten we hoe we je noemen.";
  }
  if (!isEmail(values.email)) {
    errors.email = "Dit e-mailadres klopt nog niet. Controleer het even.";
  }
  if (values.telefoon && values.telefoon.replace(/\D/g, "").length < 9) {
    errors.telefoon =
      "Dit nummer lijkt te kort. Laat het leeg als je liever mailt.";
  }
  if (values.regio.length < 2) {
    errors.regio = "Noem de stad of de regio waar je wilt werken.";
  }
  if (!achtergronden.some((a) => a.value === values.achtergrond)) {
    errors.achtergrond = "Kies wat het beste bij je achtergrond past.";
  }
  if (values.motivatie.length < 20) {
    errors.motivatie =
      "Schrijf een paar zinnen over jezelf, dan weten we met wie we praten.";
  }

  // ROW W2, the CV. It is optional, so an empty field is not a mistake; a file
  // that is too big or of the wrong kind is, and it is said before anything is
  // sent. `readCv` returns the attachment or the sentence, never both.
  const cv = await readCv(formData);
  if (cv.error) errors.cv = cv.error;
  if (values.naam.length > MAX_SHORT) errors.naam = TOO_LONG_SHORT;
  if (values.email.length > MAX_SHORT) errors.email = TOO_LONG_SHORT;
  if (values.telefoon.length > MAX_SHORT) errors.telefoon = TOO_LONG_SHORT;
  if (values.regio.length > MAX_SHORT) errors.regio = TOO_LONG_SHORT;
  if (values.motivatie.length > MAX_LONG) errors.motivatie = TOO_LONG_MESSAGE;

  if (Object.keys(errors).length > 0) {
    return {
      status: "invalid",
      message: "Er ontbreekt nog iets. Kijk hieronder wat je moet aanvullen.",
      fallbackAddress: null,
      errors,
      values,
    };
  }

  const sent: ApplicationState = {
    status: "sent",
    message: `Bedankt ${values.naam}. We lezen je aanmelding en nemen binnen een week contact op voor een kennismakingsgesprek.`,
    fallbackAddress: null,
    errors: {},
    values: applicationInitialState.values,
  };

  // A bot gets the confirmation and no mail. See `spamGuard` in app/intake.ts.
  if (looksAutomated(formData)) return sent;

  const archive = archiveInbox();
  const to = coachApplicationInbox ?? archive;

  const result = await sendMail({
    to: to ?? "",
    cc: archive,
    replyTo: values.email,
    subject: oneLine(`Aanmelding coach (${values.regio}): ${values.naam}`),
    text: [
      `Naam:        ${values.naam}`,
      `E-mail:      ${values.email}`,
      `Telefoon:    ${values.telefoon || "niet ingevuld"}`,
      `Regio:       ${values.regio}`,
      `Achtergrond: ${achtergrondLabel(values.achtergrond)}`,
      `CV:          ${cv.attachment ? `bijgevoegd (${cv.attachment.filename})` : "niet meegestuurd"}`,
      "",
      "Motivatie:",
      values.motivatie,
      "",
      "Antwoorden gaat rechtstreeks naar de aanmelder.",
      RETENTION_LINE,
    ].join("\n"),
    ...(cv.attachment ? { attachments: [cv.attachment] } : {}),
  });

  if (!result.ok) {
    console.error(
      `[coach] Aanmelding niet verstuurd (${result.reason}). Regio: ${values.regio}. De inhoud staat bewust niet in dit log.`,
    );

    return {
      status: undeliverable(result.reason),
      message: "We konden je aanmelding niet versturen.",
      fallbackAddress: to ?? archive,
      errors: {},
      values,
    };
  }

  return sent;
}


/**
 * The four forms that reach the central mailbox: contact, samenwerken, the
 * StudieKeuzeScan and online begeleiding. See app/central.ts for which is
 * which and why they are one action.
 *
 * SAME SKELETON AS THE TWO ABOVE, AND SAME REASON FOR NOT SHARING MORE. What
 * these three actions have in common is already written once: `spamGuard`,
 * `sendMail`, `oneLine`, the length caps and `undeliverable`. What differs is
 * the destination and what a reader is told, and that is exactly the part a
 * shared helper would have to be told anyway.
 *
 * THE DESTINATION IS NOT A FIELD. `centralInbox` is a constant in
 * app/site-config.ts. The form carries only which topic it is, and that is
 * looked up here, so no posted value can redirect a message anywhere.
 */
export async function sendCentralRequest(
  _prev: CentralState,
  formData: FormData,
): Promise<CentralState> {
  const read = (name: string) => String(formData.get(name) ?? "").trim();

  const values: CentralState["values"] = {
    naam: read("naam"),
    school: read("school"),
    functie: read("functie"),
    email: read("email"),
    telefoon: read("telefoon"),
    bericht: read("bericht"),
    onderwerp: read("onderwerp"),
  };

  const topic =
    values.onderwerp.length > MAX_SHORT
      ? undefined
      : getCentralTopic(values.onderwerp);

  const errors: CentralState["errors"] = {};

  // A reader cannot repair this one, so it names a way round: every one of the
  // four forms is reachable from the footer.
  if (!topic) {
    errors.onderwerp =
      "We kunnen niet zien waar dit formulier over gaat. Ververs de pagina en probeer het opnieuw.";
  }

  const isRequired = (field: CentralField) =>
    topic ? topic.required.includes(field) : false;

  if (isRequired("naam") && values.naam.length < 2) {
    errors.naam = "Vul je naam in, dan weten we hoe we je noemen.";
  }
  if (isRequired("school") && values.school.length < 2) {
    errors.school = "Vul de naam van de school in.";
  }
  if (isRequired("functie") && values.functie.length < 2) {
    errors.functie = "Vul in wat je functie is, bijvoorbeeld decaan of mentor.";
  }
  if (isRequired("email") && !isEmail(values.email)) {
    errors.email = "Dit e-mailadres klopt nog niet. Controleer het even.";
  }
  if (isRequired("telefoon") && !values.telefoon) {
    errors.telefoon = "Vul een telefoonnummer in, dan kunnen we je bellen.";
  }
  if (values.telefoon && values.telefoon.replace(/\D/g, "").length < 9) {
    errors.telefoon = "Dit nummer lijkt te kort. Controleer het even.";
  }
  if (isRequired("bericht") && values.bericht.length < 2) {
    errors.bericht = "Schrijf kort op waar het over gaat.";
  }

  if (values.naam.length > MAX_SHORT) errors.naam = TOO_LONG_SHORT;
  if (values.school.length > MAX_SHORT) errors.school = TOO_LONG_SHORT;
  if (values.functie.length > MAX_SHORT) errors.functie = TOO_LONG_SHORT;
  if (values.email.length > MAX_SHORT) errors.email = TOO_LONG_SHORT;
  if (values.telefoon.length > MAX_SHORT) errors.telefoon = TOO_LONG_SHORT;
  if (values.bericht.length > MAX_LONG) errors.bericht = TOO_LONG_MESSAGE;

  if (!topic || Object.keys(errors).length > 0) {
    return {
      status: "invalid",
      message: "Er ontbreekt nog iets. Kijk hieronder wat je moet aanvullen.",
      fallbackAddress: null,
      errors,
      values,
    };
  }

  const sent: CentralState = {
    status: "sent",
    message: topic.confirmation,
    fallbackAddress: null,
    errors: {},
    values: centralInitialState.values,
  };

  // A bot gets the confirmation and no mail. See `spamGuard` in app/intake.ts.
  if (looksAutomated(formData)) return sent;

  const archive = archiveInbox();
  const to = centralInbox || archive;

  const result = await sendMail({
    to: to ?? "",
    cc: archive,
    replyTo: values.email,
    subject: oneLine(`${topic.subject}: ${values.naam}`),
    text: [
      `Formulier: ${topic.subject}`,
      "",
      ...topic.fields.map((field) => {
        const label = `${field[0].toUpperCase()}${field.slice(1)}:`.padEnd(11);
        return `${label}${values[field] || "niet ingevuld"}`;
      }),
      "",
      "Antwoorden gaat rechtstreeks naar de afzender.",
      RETENTION_LINE,
    ].join("\n"),
  });

  if (!result.ok) {
    console.error(
      `[${topic.key}] Niet verstuurd (${result.reason}). De inhoud staat bewust niet in dit log.`,
    );

    return {
      status: undeliverable(result.reason),
      message: "We konden je bericht niet versturen.",
      fallbackAddress: to ?? archive,
      errors: {},
      values,
    };
  }

  return sent;
}
