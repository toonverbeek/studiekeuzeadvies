"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { requestIntake } from "../actions";
import {
  bereikbaar,
  intakeInitialState,
  situaties,
  spamGuard,
  voorkeuren,
} from "../intake";

/**
 * The intake card of the client's design (design-spec 3.19): an indigo card
 * with paper fields, one violet pill to submit, and a confirmation that
 * replaces the whole card.
 *
 * The form always knows where it sends to, because there is no central mailbox
 * to fall back on (issue #7).
 *
 * `route` is the encoded destination of app/intake.ts and it travels in a
 * hidden field. `coachName` is the same destination in words, for the reader.
 * They are two props and not one, because the server may not believe the words
 * and the reader cannot read the slug. `coachName` is required and nullable on
 * purpose: a page that cannot name a reader has to say so out loud.
 *
 * THE FIELDS ARE THE CLIENT'S, WITH ONE SUBSTITUTION. The client's card asks
 * for a name, an e-mail, "voor wie is de intake", a preference (online or in
 * the city) and a message. The first two are the same here, and the preference
 * is the `voorkeur` select below. "Voor wie" becomes the `situatie` select,
 * because that is the field `requestIntake` validates and mails, and its four
 * options carry the same answer (one of them is "Ik ben ouder of verzorger").
 * The message is the one the client's own mail took off the card; see below.
 *
 * WHAT THE CLIENT'S MAIL CHANGED (rows P2 and P3):
 *  - "Waar loop je tegenaan?" is gone. It was the one open question on the
 *    card and the client asked for it to go. A reader now says what is going
 *    on in the intake conversation itself, which is what that conversation is
 *    for, and the form is four short rows instead of a small essay;
 *  - "Hoe kunnen we je bereiken?" is new, and WhatsApp is one of the three
 *    answers. The telephone field came back with it, because two of the three
 *    channels cannot work without a number. It is optional for the third, and
 *    app/actions.ts is what decides that, not this file.
 */

/** Paper field on the ink card. 17px: the reading floor of PRODUCT.md, and
 *  anything from 16px up also stops iOS zooming the page on focus. */
const fieldBase =
  "w-full min-h-12 rounded-field border border-transparent bg-paper px-4 py-3 text-body text-ink transition-colors duration-150 ease-out-quart placeholder:text-muted aria-invalid:border-coral";

const labelBase = "text-[0.8125rem] font-semibold text-lavender-ink";

const errorBase = "text-[0.8125rem] text-coral-soft";

export function IntakeForm({
  coachName,
  route,
  place = null,
  title,
  lede,
  helper,
  className = "",
}: {
  coachName: string | null;
  route: string;
  /** The town the coach works in, for "online of in Amsterdam?". Without it
   *  the question says "op locatie". */
  place?: string | null;
  /** The heading of the card. A coach page names the coach in it. */
  title?: string;
  /** The sentence under the heading. */
  lede?: string;
  /** The small line under the button. Leave it out and nothing is promised. */
  helper?: string;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(
    requestIntake,
    intakeInitialState,
  );
  const id = useId();
  const renderedAt = useRef<HTMLInputElement>(null);

  /*
   * The moment the form became usable, which is what the server measures
   * against. It is written here and not during render on purpose: the server
   * and the browser would put a different number in the HTML, and React would
   * call that a hydration error. A reader without JavaScript sends an empty
   * value, and app/actions.ts treats "no timestamp" as a person, never as a
   * robot: losing one real request is worse than passing one robot.
   */
  useEffect(() => {
    if (renderedAt.current) renderedAt.current.value = String(Date.now());
  }, []);

  const field = (name: string) => `${id}-${name}`;
  const errorId = (name: string) => `${id}-${name}-error`;

  const cardBase = `rounded-card bg-ink p-7 text-paper shadow-ink-form sm:p-8 ${className}`;

  /* The confirmation replaces the card, as the client draws it: a violet disc
     with a check, the title, and the sentence the server action wrote. Only
     that state may say what happens next, so the text comes from there. */
  if (state.status === "sent") {
    return (
      <div aria-live="polite" className={cardBase}>
        <div className="py-4 text-center">
          <span
            aria-hidden="true"
            className="mx-auto flex h-13.5 w-13.5 items-center justify-center rounded-full bg-violet text-2xl text-white"
          >
            ✓
          </span>
          <p className="text-title mt-4 font-display font-bold">
            Aanvraag verstuurd
          </p>
          <p className="text-card mt-2.5 text-lavender-ink">{state.message}</p>
        </div>
      </div>
    );
  }

  const undeliverable =
    state.status === "not-configured" || state.status === "provider-error";

  return (
    <form action={formAction} className={cardBase} noValidate>
      <h2 className="text-title font-display font-bold">
        {title ??
          (coachName
            ? `Plan je gratis intake bij ${coachName}`
            : "Plan je gratis intake")}
      </h2>

      {/* Who reads this. It stands above the first field on purpose: a reader
          may write something they have told nobody, so they must know who
          opens it before they start typing. */}
      <p className="text-small mt-2 text-lavender-ink">
        {lede ??
          (coachName
            ? `${coachName} leest wat je hier invult. Vrijblijvend kennismaken, je beslist daarna pas of je start.`
            : "Hier werkt nog geen vaste coach. We zoeken iemand bij jou in de buurt en je hoort van ons.")}
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {/* THE ONE THING THIS BLOCK MUST DO IS GIVE THE READER A WAY THROUGH.
            Whether we have no mail key or the provider fell over is our problem
            and not theirs, so both say the same and both hand over an address.
            Everything they typed is still in the fields below it. */}
        {undeliverable && (
          <p
            className="rounded-field border border-coral-soft/60 px-4 py-3 text-[0.8125rem] text-coral-soft"
            role="alert"
          >
            {state.message}{" "}
            {state.fallbackAddress ? (
              <>
                Mail{" "}
                <a
                  className="font-semibold underline underline-offset-4"
                  href={`mailto:${state.fallbackAddress}?subject=${encodeURIComponent("Aanvraag gratis intake")}`}
                >
                  {state.fallbackAddress}
                </a>{" "}
                direct, dan pakken we het daar op.
              </>
            ) : (
              "Probeer het later opnieuw."
            )}
          </p>
        )}

        {state.status === "invalid" && (
          <p className={errorBase} role="alert">
            {state.message}
          </p>
        )}

        <input defaultValue={route} name="voor" type="hidden" />
        {state.errors.voor && <p className={errorBase}>{state.errors.voor}</p>}

        {/* The two fields of `spamGuard`. The first is a trap: it is off screen
            instead of `type="hidden"`, because a robot fills what it can see in
            the HTML and a person can reach neither. The second is the clock. */}
        <div aria-hidden="true" className="sr-only">
          <label htmlFor={field(spamGuard.honeypot)}>
            Laat dit veld leeg
            <input
              autoComplete="off"
              defaultValue=""
              id={field(spamGuard.honeypot)}
              name={spamGuard.honeypot}
              tabIndex={-1}
              type="text"
            />
          </label>
        </div>
        <input
          defaultValue=""
          name={spamGuard.renderedAt}
          ref={renderedAt}
          type="hidden"
        />

        <div className="flex flex-col gap-1.5">
          <label className={labelBase} htmlFor={field("naam")}>
            Je naam
          </label>
          <input
            aria-describedby={state.errors.naam ? errorId("naam") : undefined}
            aria-invalid={Boolean(state.errors.naam)}
            autoComplete="name"
            className={fieldBase}
            defaultValue={state.values.naam}
            id={field("naam")}
            name="naam"
            placeholder="Naam"
            type="text"
          />
          {state.errors.naam && (
            <p className={errorBase} id={errorId("naam")}>
              {state.errors.naam}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelBase} htmlFor={field("email")}>
            E-mailadres
          </label>
          <input
            aria-describedby={state.errors.email ? errorId("email") : undefined}
            aria-invalid={Boolean(state.errors.email)}
            autoComplete="email"
            className={fieldBase}
            defaultValue={state.values.email}
            id={field("email")}
            inputMode="email"
            name="email"
            placeholder="E-mailadres"
            type="email"
          />
          {state.errors.email && (
            <p className={errorBase} id={errorId("email")}>
              {state.errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelBase} htmlFor={field("situatie")}>
            Voor wie is de intake?
          </label>
          <div className="relative">
            <select
              aria-describedby={
                state.errors.situatie ? errorId("situatie") : undefined
              }
              aria-invalid={Boolean(state.errors.situatie)}
              className={`${fieldBase} appearance-none pr-11`}
              defaultValue={state.values.situatie}
              id={field("situatie")}
              name="situatie"
            >
              <option value="">Kies wat op jou past</option>
              {situaties.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink"
              fill="none"
              height="8"
              viewBox="0 0 14 8"
              width="14"
            >
              <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.75" />
            </svg>
          </div>
          {state.errors.situatie && (
            <p className={errorBase} id={errorId("situatie")}>
              {state.errors.situatie}
            </p>
          )}
        </div>

        {/* The client's second question, and this mail does not touch it:
            row P2 removed "Waar loop je tegenaan?" and nothing else. It is
            optional, and the town comes from the page the card stands on. */}
        <div className="flex flex-col gap-1.5">
          <label className={labelBase} htmlFor={field("voorkeur")}>
            Voorkeur: online of {place ? `in ${place}` : "op locatie"}?
          </label>
          <div className="relative">
            <select
              aria-describedby={
                state.errors.voorkeur ? errorId("voorkeur") : undefined
              }
              aria-invalid={Boolean(state.errors.voorkeur)}
              className={`${fieldBase} appearance-none pr-11`}
              defaultValue={state.values.voorkeur}
              id={field("voorkeur")}
              name="voorkeur"
            >
              <option value="">Kies wat je liever hebt</option>
              {voorkeuren.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label(place)}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink"
              fill="none"
              height="8"
              viewBox="0 0 14 8"
              width="14"
            >
              <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.75" />
            </svg>
          </div>
          {state.errors.voorkeur && (
            <p className={errorBase} id={errorId("voorkeur")}>
              {state.errors.voorkeur}
            </p>
          )}
        </div>

        {/* ROW P3. Radios and not a select: three options that a reader has
            to weigh read better open than folded, and the third one is the
            reason this block exists. */}
        <fieldset className="flex flex-col gap-1.5">
          <legend className={`${labelBase} mb-1.5`}>
            Hoe kunnen we je bereiken?
          </legend>
          <div className="flex flex-wrap gap-2">
            {bereikbaar.map((option) => (
              <label
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-field bg-paper px-4 py-2.5 text-body text-ink has-checked:ring-2 has-checked:ring-violet"
                htmlFor={field(`bereik-${option.value}`)}
                key={option.value}
              >
                <input
                  className="accent-violet"
                  defaultChecked={state.values.bereik === option.value}
                  id={field(`bereik-${option.value}`)}
                  name="bereik"
                  type="radio"
                  value={option.value}
                />
                {option.label}
              </label>
            ))}
          </div>
          {state.errors.bereik && (
            <p className={errorBase}>{state.errors.bereik}</p>
          )}
        </fieldset>

        {/* The number is always in the page and never revealed by script: a
            reader without JavaScript must be able to pick "Via WhatsApp" and
            still have somewhere to type the number. The label says when it is
            needed, and the server enforces it. */}
        <div className="flex flex-col gap-1.5">
          <label className={labelBase} htmlFor={field("telefoon")}>
            Telefoonnummer{" "}
            <span className="font-normal">
              (nodig als je gebeld of geappt wilt worden)
            </span>
          </label>
          <input
            aria-describedby={
              state.errors.telefoon ? errorId("telefoon") : undefined
            }
            aria-invalid={Boolean(state.errors.telefoon)}
            autoComplete="tel"
            className={fieldBase}
            defaultValue={state.values.telefoon}
            id={field("telefoon")}
            inputMode="tel"
            name="telefoon"
            placeholder="06 12345678"
            type="tel"
          />
          {state.errors.telefoon && (
            <p className={errorBase} id={errorId("telefoon")}>
              {state.errors.telefoon}
            </p>
          )}
        </div>

        {/* One button, and nothing next to it. WhatsApp is a choice in the
            block above and not a link here: a link needs a number, and a
            number belongs to a coach. */}
        <button
          className="mt-1 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-violet px-6 py-4 text-card font-bold text-white shadow-violet-strong transition-colors duration-150 ease-out-quart hover:bg-violet-dark disabled:cursor-not-allowed disabled:opacity-70"
          disabled={pending}
          type="submit"
        >
          {pending ? "Bezig met versturen" : "Vraag gratis intake aan"}
        </button>

        {helper ? (
          <p className="text-micro text-center text-lavender-ink">{helper}</p>
        ) : null}

        <p className="text-micro text-lavender-ink">
          We gebruiken je gegevens alleen voor dit gesprek. Je zit nergens aan
          vast.
        </p>
      </div>
    </form>
  );
}
