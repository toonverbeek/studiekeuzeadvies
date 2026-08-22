/**
 * The forms that reach the central mailbox.
 *
 * WHY THIS FILE EXISTS. The client's mail asks for four new forms and gives
 * every one of them the same destination: "info@ = info@studiekeuzeadvies.nl;
 * het emailadres waar we straks allemaal bij moeten kunnen en waar alle
 * centrale vragen op binnen moeten komen." They differ only in what they ask
 * and what the reader is told afterwards, so they are one form with four
 * topics and not four copies of the same two hundred lines.
 *
 *   contact      /contact            row H15
 *   samenwerken  /samenwerken        row H16, behind `showSamenwerken`
 *   scan         /studiekeuzescan    rows T7 and TA2
 *   online       /online-begeleiding row C4
 *
 * AN INTAKE IS NOT IN HERE, AND THAT IS THE WHOLE SPLIT. An intake goes to the
 * coach the reader picked and to nobody else; app/intake.ts and `requestIntake`
 * own that road. Everything a coach does not own goes here.
 *
 * Like app/intake.ts, this file must stay free of "use server": a server module
 * may only export async functions, and both sides import these types.
 */

export type CentralField =
  | "naam"
  | "school"
  | "functie"
  | "email"
  | "telefoon"
  | "bericht";

export type CentralStatus =
  | "idle"
  | "sent"
  | "invalid"
  | "not-configured"
  | "provider-error";

export type CentralState = {
  status: CentralStatus;
  message: string;
  /** Where the reader may write themselves when we could not send. */
  fallbackAddress: string | null;
  errors: Partial<Record<CentralField | "onderwerp", string>>;
  values: Record<CentralField, string> & { onderwerp: string };
};

export const centralInitialState: CentralState = {
  status: "idle",
  message: "",
  fallbackAddress: null,
  errors: {},
  values: {
    naam: "",
    school: "",
    functie: "",
    email: "",
    telefoon: "",
    bericht: "",
    onderwerp: "",
  },
};

/** One of the four forms: which rows it draws, and what it says. */
export type CentralTopic = {
  /** Travels in a hidden field, and is looked up again on the server. */
  key: string;
  /** The heading of the card. */
  title: string;
  /** The sentence above the first field. */
  lede: string;
  /** The words on the button. */
  submit: string;
  /** The subject line of the mail this form sends. */
  subject: string;
  /** The rows, in the order they are drawn. */
  fields: readonly CentralField[];
  /** The rows a reader may not leave empty. */
  required: readonly CentralField[];
  /** The label above the message box, which differs per topic. */
  berichtLabel: string;
  /** What the reader is told once the provider accepted the message. */
  confirmation: string;
};

/**
 * TWO WORKING DAYS IS THE PROMISE, and it is written once. It is the client's
 * own promise, from the contact text in their mail ("Een van onze coaches
 * neemt binnen twee werkdagen contact met je op") and from Janneke's page in
 * the archive. If a coach cannot keep it, this line changes and all four
 * confirmations change with it.
 */
const withinTwoDays = "Je hoort binnen twee werkdagen van ons.";

export const centralTopics: readonly CentralTopic[] = [
  {
    key: "contact",
    title: "Stuur ons een bericht",
    lede: "Je bericht komt binnen op info@studiekeuzeadvies.nl, waar alle vijf de coaches bij kunnen.",
    submit: "Verstuur je bericht",
    subject: "Contactformulier",
    fields: ["naam", "email", "telefoon", "bericht"],
    required: ["naam", "email", "bericht"],
    berichtLabel: "Je vraag of bericht",
    confirmation: `Bedankt, we hebben je bericht. ${withinTwoDays}`,
  },
  {
    key: "samenwerken",
    title: "Neem contact op over een samenwerking",
    lede: "Vertel kort om welke school en welke leerlingen het gaat, dan denken we mee over wat past.",
    submit: "Verstuur je aanvraag",
    subject: "Samenwerken (school of decaan)",
    fields: ["naam", "school", "functie", "email", "telefoon", "bericht"],
    required: ["naam", "school", "functie", "email", "telefoon"],
    berichtLabel: "Bericht",
    confirmation: `Bedankt, we hebben je aanvraag. ${withinTwoDays}`,
  },
  {
    key: "scan",
    title: "Boek hier je StudieKeuzeScan",
    lede: "Laat je gegevens achter, dan koppelen we je aan een coach en plannen we de online sessie.",
    submit: "Boek de StudieKeuzeScan",
    subject: "Aanmelding StudieKeuzeScan",
    fields: ["naam", "email", "telefoon", "bericht"],
    required: ["naam", "email"],
    berichtLabel: "Iets wat we moeten weten?",
    confirmation: `Bedankt, je aanmelding voor de StudieKeuzeScan staat bij ons. ${withinTwoDays}`,
  },
  {
    key: "online",
    title: "Vraag online begeleiding aan",
    lede: "Woon je niet in de buurt van een van onze steden? Het hele traject kan ook via video.",
    submit: "Vraag online begeleiding aan",
    subject: "Aanvraag online begeleiding",
    fields: ["naam", "email", "telefoon", "bericht"],
    required: ["naam", "email"],
    berichtLabel: "Waar woon je, en wat wil je weten?",
    confirmation: `Bedankt, we hebben je aanvraag. ${withinTwoDays}`,
  },
] as const;

/**
 * One topic by key, or undefined. The key crosses the browser in a hidden
 * field, so the server looks it up here before it believes a word of it. It
 * mirrors `getCoach` in app/coaches.ts for the same reason.
 */
export function getCentralTopic(key: string): CentralTopic | undefined {
  return centralTopics.find((topic) => topic.key === key);
}

/** The label above one row, and whether it says the row may stay empty. */
export function centralFieldLabel(
  topic: CentralTopic,
  field: CentralField,
): string {
  const labels: Record<CentralField, string> = {
    naam: "Je naam",
    school: "School",
    functie: "Functie",
    email: "E-mailadres",
    telefoon: "Telefoonnummer",
    bericht: topic.berichtLabel,
  };

  return labels[field];
}
