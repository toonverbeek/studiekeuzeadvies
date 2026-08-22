"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { sendCentralRequest } from "../actions";
import {
  type CentralField,
  type CentralTopic,
  centralFieldLabel,
  centralInitialState,
} from "../central";
import { spamGuard } from "../intake";

/**
 * The card that four pages share: /contact, /samenwerken, /studiekeuzescan and
 * /online-begeleiding. It is the intake card of design-spec 3.19 with the rows
 * the topic asks for, so the four new pages look like the rest of the site
 * without four copies of the same file. See app/central.ts.
 *
 * IT IS NOT THE INTAKE CARD ITSELF. That one carries a destination, a
 * situation and a way to be reached, and it delivers to one coach. This one
 * carries a topic and delivers to the central mailbox. Merging them would mean
 * one component with two destinations, and a destination is the one thing on
 * this site that may never be a guess.
 */

/** Paper field on the ink card. 17px: the reading floor of PRODUCT.md, and
 *  anything from 16px up also stops iOS zooming the page on focus. */
const fieldBase =
  "w-full min-h-12 rounded-field border border-transparent bg-paper px-4 py-3 text-body text-ink transition-colors duration-150 ease-out-quart placeholder:text-muted aria-invalid:border-coral";

const labelBase = "text-[0.8125rem] font-semibold text-lavender-ink";

const errorBase = "text-[0.8125rem] text-coral-soft";

/** What the browser may fill in for the reader, per row. */
const autoFill: Record<CentralField, string | undefined> = {
  naam: "name",
  school: "organization",
  functie: "organization-title",
  email: "email",
  telefoon: "tel",
  bericht: undefined,
};

const inputType: Record<CentralField, string> = {
  naam: "text",
  school: "text",
  functie: "text",
  email: "email",
  telefoon: "tel",
  bericht: "text",
};

export function CentralForm({
  topic,
  className = "",
}: {
  topic: CentralTopic;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(
    sendCentralRequest,
    centralInitialState,
  );
  const id = useId();
  const renderedAt = useRef<HTMLInputElement>(null);

  /* The moment the form became usable, which is what the server measures
     against. Written after render, never during it: the server and the browser
     would otherwise put a different number in the HTML. See the same block in
     app/components/intake-form.tsx. */
  useEffect(() => {
    if (renderedAt.current) renderedAt.current.value = String(Date.now());
  }, []);

  const field = (name: string) => `${id}-${name}`;
  const errorId = (name: string) => `${id}-${name}-error`;

  const cardBase = `rounded-card bg-ink p-7 text-paper shadow-ink-form sm:p-8 ${className}`;

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
            Bericht verstuurd
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
      <h2 className="text-title font-display font-bold">{topic.title}</h2>

      <p className="text-small mt-2 text-lavender-ink">{topic.lede}</p>

      <div className="mt-5 flex flex-col gap-3">
        {/* Whether we have no mail key or the provider fell over is our problem
            and not the reader's, so both say the same and both hand over an
            address. Everything they typed is still in the fields below it. */}
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
                  href={`mailto:${state.fallbackAddress}?subject=${encodeURIComponent(topic.subject)}`}
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

        <input defaultValue={topic.key} name="onderwerp" type="hidden" />
        {state.errors.onderwerp && (
          <p className={errorBase}>{state.errors.onderwerp}</p>
        )}

        {/* The two fields of `spamGuard`, shared with the intake card. The
            first is a trap a person can neither see nor reach; the second is
            the clock. app/intake.ts says why there is no captcha. */}
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

        {topic.fields.map((name) => {
          const optional = !topic.required.includes(name);
          const error = state.errors[name];

          return (
            <div className="flex flex-col gap-1.5" key={name}>
              <label className={labelBase} htmlFor={field(name)}>
                {centralFieldLabel(topic, name)}{" "}
                {optional && (
                  <span className="font-normal">(mag je leeg laten)</span>
                )}
              </label>

              {name === "bericht" ? (
                <textarea
                  aria-describedby={error ? errorId(name) : undefined}
                  aria-invalid={error ? true : undefined}
                  className={`${fieldBase} resize-y`}
                  defaultValue={state.values[name]}
                  id={field(name)}
                  name={name}
                  rows={4}
                />
              ) : (
                <input
                  aria-describedby={error ? errorId(name) : undefined}
                  aria-invalid={Boolean(error)}
                  autoComplete={autoFill[name]}
                  className={fieldBase}
                  defaultValue={state.values[name]}
                  id={field(name)}
                  inputMode={
                    name === "email"
                      ? "email"
                      : name === "telefoon"
                        ? "tel"
                        : undefined
                  }
                  name={name}
                  type={inputType[name]}
                />
              )}

              {error && (
                <p className={errorBase} id={errorId(name)}>
                  {error}
                </p>
              )}
            </div>
          );
        })}

        <button
          className="mt-1 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-violet px-6 py-4 text-card font-bold text-white shadow-violet-strong transition-colors duration-150 ease-out-quart hover:bg-violet-dark disabled:cursor-not-allowed disabled:opacity-70"
          disabled={pending}
          type="submit"
        >
          {pending ? "Bezig met versturen" : topic.submit}
        </button>

        <p className="text-micro text-lavender-ink">
          We gebruiken je gegevens alleen om je bericht te beantwoorden. Je zit
          nergens aan vast.
        </p>
      </div>
    </form>
  );
}
