/**
 * Shared shape of the intake form. This file must stay free of "use server":
 * a server module may only export async functions, so the types, the initial
 * state, and the option list live here and are imported by both sides.
 */

export type IntakeField =
  | "naam"
  | "email"
  | "telefoon"
  | "situatie"
  | "bericht"
  | "voor";

/**
 * The five things the form can be, and every one of them says something
 * different to the reader.
 *
 * - `idle`: nothing sent yet.
 * - `sent`: the mail was accepted by the provider. This is the only state that
 *   may promise an answer.
 * - `invalid`: the reader has to change something. `errors` says what.
 * - `not-configured`: we cannot send at all, because the site has no mail key.
 *   Nothing the reader did, and nothing they can fix by trying again.
 * - `provider-error`: the provider refused the message or did not answer.
 *
 * The last two look the same to a reader and are kept apart anyway, because
 * only one of them is worth an alert to whoever runs the site. Both carry
 * `fallbackAddress`, and the form turns that into a mailto, so a request is
 * never a dead end.
 */
export type IntakeStatus =
  | "idle"
  | "sent"
  | "invalid"
  | "not-configured"
  | "provider-error";

export type IntakeState = {
  status: IntakeStatus;
  message: string;
  /**
   * Where the reader can write themselves when we could not send. The coach's
   * own address when there is one, otherwise the archive address. null means we
   * have no address at all to offer, and then the form may not print a mailto.
   * It is data and not a sentence, because the form owns the sentence.
   */
  fallbackAddress: string | null;
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
  fallbackAddress: null,
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
 * The two fields that keep a bot out, used by this form and by the coach
 * application form in app/application.ts.
 *
 * NO CAPTCHA, ON PURPOSE. A captcha is a third party, a consent question and a
 * wall in front of a sixteen year old who is already nervous about writing to
 * us. These two cost nothing and stop the scripted traffic that a small site
 * actually gets:
 *
 * - `honeypot` is a field a person never sees and never fills. Anything in it
 *   means a robot walked the form. It has to be hidden with CSS and not with
 *   `type="hidden"`, carry `tabIndex={-1}`, `autoComplete="off"` and
 *   `aria-hidden`, so no keyboard and no screen reader ever lands on it.
 * - `renderedAt` holds the moment the form was drawn. A person needs longer
 *   than `minimumSeconds` to read the fields and type an answer; a script does
 *   not wait at all.
 *
 * A caught request gets the SAME confirmation a real one gets. Telling a bot it
 * was caught is telling whoever wrote it what to change.
 */
export const spamGuard = {
  honeypot: "website",
  renderedAt: "t",
  minimumSeconds: 3,
} as const;

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

export function situatieLabel(value: string): string {
  return situaties.find((s) => s.value === value)?.label ?? value;
}
