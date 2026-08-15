/**
 * Shared shape of the intake form. This file must stay free of "use server":
 * a server module may only export async functions, so the types, the initial
 * state, and the option list live here and are imported by both sides.
 */

export type IntakeField = "naam" | "email" | "telefoon" | "situatie" | "voor";

export type IntakeState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<IntakeField, string>>;
  values: {
    naam: string;
    email: string;
    telefoon: string;
    situatie: string;
    bericht: string;
    /** Where the request must go. See `IntakeRoute` below. */
    voor: string;
  };
};

export const intakeInitialState: IntakeState = {
  status: "idle",
  message: "",
  errors: {},
  values: {
    naam: "",
    email: "",
    telefoon: "",
    situatie: "",
    bericht: "",
    voor: "",
  },
};

/**
 * Who a request is for. There is no central mailbox any more (issue #7), so a
 * request that does not name a destination cannot be delivered at all. The form
 * carries this in a hidden field and the server resolves it to one address.
 *
 * Two kinds, because a page knows one of two things. A coach page knows the
 * person. A city page knows the place, and the place is the better answer: if
 * the coach of that city changes, the request still arrives at the right desk.
 *
 * It is one string, not two fields, so a half filled route cannot exist. The
 * value crosses the browser, so the server trusts nothing: it decodes the
 * string and then looks the slug up in real data. See app/actions.ts.
 */
export type IntakeRoute =
  | { kind: "coach"; slug: string }
  | { kind: "stad"; slug: string };

export function encodeIntakeRoute(route: IntakeRoute): string {
  return `${route.kind}:${route.slug}`;
}

export function decodeIntakeRoute(value: string): IntakeRoute | null {
  const separator = value.indexOf(":");
  if (separator < 1) return null;

  const kind = value.slice(0, separator);
  const slug = value.slice(separator + 1);
  if (!slug) return null;
  if (kind === "coach" || kind === "stad") return { kind, slug };

  return null;
}

export const situaties = [
  { value: "eerste-keuze", label: "Ik kies voor het eerst een studie" },
  { value: "twijfel", label: "Ik twijfel of ik ben gestopt" },
  { value: "extra-hulp", label: "Ik heb ADD, ADHD of autisme" },
  { value: "ouder", label: "Ik ben ouder of verzorger" },
] as const;
