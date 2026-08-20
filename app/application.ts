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

export type ApplicationField =
  | "naam"
  | "email"
  | "telefoon"
  | "regio"
  | "achtergrond"
  | "motivatie";

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
  values: Record<ApplicationField, string>;
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
