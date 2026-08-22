/**
 * Shared shape of the "word coach" application form, the third user of
 * PRODUCT.md. Same split as app/intake.ts and for the same reason: a module
 * with "use server" may only export async functions, so the types and the
 * option list live here and both sides import them.
 *
 * WHERE IT GOES. Not to a coach, but to whoever runs the network:
 * `coachApplicationInbox` in app/site-config.ts. That address falls back to
 * MAIL_ARCHIVE, so an application is never delivered nowhere while the client
 * decides on a real mailbox (issues #20 and #44).
 *
 * WHAT IT IS NOT. It is not an intake. Nobody here is choosing a study, no
 * option on it is a health statement, and the retention question of issue #21
 * is a different one. Keeping the two apart keeps the intake rules from being
 * copied onto a form that does not need them, and the other way round.
 */

/** The fields that hold text, so the form can hand them back after a mistake. */
export type ApplicationValueField =
  | "naam"
  | "email"
  | "telefoon"
  | "regio"
  | "achtergrond"
  | "motivatie";

/**
 * Everything that can carry an error message, which is the text fields plus the
 * CV. The CV is not in the list above on purpose: a browser will not let a page
 * put a file back into a file input, for good reason, so there is nothing to
 * hand back and the form says so instead.
 */
export type ApplicationField = ApplicationValueField | "cv";

/** The same five states as the intake form, and they mean the same things.
 *  See the comment on `IntakeStatus` in app/intake.ts. */
export type ApplicationStatus =
  | "idle"
  | "sent"
  | "invalid"
  | "not-configured"
  | "provider-error";

export type ApplicationState = {
  status: ApplicationStatus;
  message: string;
  /** The address to write to when we could not send. null when we have none. */
  fallbackAddress: string | null;
  errors: Partial<Record<ApplicationField, string>>;
  values: Record<ApplicationValueField, string>;
};

export const applicationInitialState: ApplicationState = {
  status: "idle",
  message: "",
  fallbackAddress: null,
  errors: {},
  values: {
    naam: "",
    email: "",
    telefoon: "",
    regio: "",
    achtergrond: "",
    motivatie: "",
  },
};

/**
 * The CV, row W2 of the client's mail: "CV moet meegestuurd kunnen worden, is
 * dat mogelijk om dit als bijlage toe te voegen in het contactformulier?" Yes.
 * It travels as an attachment on the application mail and is never stored.
 *
 * IT IS OPTIONAL. The client asked that a CV *can* be sent, not that one must
 * be. Somebody who reads this page on a telephone in the evening has their CV
 * on a laptop, and a required file field would turn a warm applicant into a
 * closed tab.
 *
 * WHAT IS ALLOWED. PDF and Word, because those are what a CV is, and because a
 * mailbox that accepts anything is a mailbox that receives everything. The
 * extension is checked as well as the type: a browser can send an empty or a
 * wrong `type` for a .docx, and the extension is what the reader chose.
 */
export const cvMaxBytes = 5 * 1024 * 1024;

/** For the `accept` attribute, so the file picker filters. Not a guarantee. */
export const cvAccept = ".pdf,.doc,.docx";

export const cvExtensions = [".pdf", ".doc", ".docx"] as const;

export const cvTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

/** "5 MB", for a label. One place, so the text cannot drift from the check. */
export const cvMaxLabel = `${Math.round(cvMaxBytes / (1024 * 1024))} MB`;

/** The client's own four options, from the word-coach page of their design. */
export const achtergronden = [
  { value: "coach", label: "Coach of loopbaanbegeleider" },
  { value: "onderwijs", label: "Decaan of mentor in het onderwijs" },
  { value: "psycholoog", label: "Psycholoog of orthopedagoog" },
  { value: "anders", label: "Anders" },
] as const;

export function achtergrondLabel(value: string): string {
  return achtergronden.find((a) => a.value === value)?.label ?? value;
}

/** The same two hidden fields the intake form uses. Written down once, in
 *  app/intake.ts, and re-exported here so a coach form does not have to import
 *  from a file about study choice to know what to call its honeypot. */
export { spamGuard } from "./intake";
