"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { applyAsCoach } from "../actions";
import {
  achtergronden,
  applicationInitialState,
  cvAccept,
  cvMaxLabel,
  spamGuard,
} from "../application";

/**
 * "Meld je aan als coach", the ink card of design-spec 3.19 in its word-coach
 * field set. It is the intake card of app/components/intake-form.tsx in shape
 * and in behaviour, and a different form underneath: an application goes to
 * whoever runs the network, not to a coach, so it posts to `applyAsCoach`.
 *
 * IT CANNOT DELIVER TODAY. `coachApplicationInbox` is null and MAIL_ARCHIVE is
 * unset, so a real submission ends in the "we could not send" state with no
 * address to fall back on. That is the honest failure and it is deliberate: a
 * false confirmation is how an application is lost quietly. Setting
 * COACH_APPLICATION_INBOX or MAIL_ARCHIVE makes the whole flow work. Reported
 * in sharedNeeds; issues #20 and #44.
 */

/** Paper field on the ink card. 17px: the reading floor of PRODUCT.md, and
 *  anything from 16px up also stops iOS zooming the page on focus. */
const fieldBase =
  "w-full min-h-12 rounded-field border border-transparent bg-paper px-4 py-3 text-body text-ink transition-colors duration-150 ease-out-quart placeholder:text-muted aria-invalid:border-coral";

const labelBase = "text-[0.8125rem] font-semibold text-lavender-ink";

const errorBase = "text-[0.8125rem] text-coral-soft";

/** The file row. A browser paints its own button here, and the two it paints
 *  are grey-on-grey and blue-on-white, neither of which belongs on an ink card.
 *  So the input keeps its own button and it is dressed: paper pill, ink text. */
const fileBase =
  "w-full rounded-field bg-paper px-4 py-3 text-body text-ink file:mr-3.5 file:cursor-pointer file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-1.5 file:text-[0.8125rem] file:font-bold file:text-paper";

export function CoachApplicationForm({ className = "" }: { className?: string }) {
  const [state, formAction, pending] = useActionState(
    applyAsCoach,
    applicationInitialState,
  );
  const id = useId();
  const renderedAt = useRef<HTMLInputElement>(null);

  /* Written after render, never during it: the server and the browser would
     put a different number in the HTML and React would call that a hydration
     error. No timestamp counts as a person, never as a robot. */
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
            Aanmelding verstuurd
          </p>
          <p className="text-card mt-2.5 text-lavender-ink">{state.message}</p>
        </div>
      </div>
    );
  }

  const undeliverable =
    state.status === "not-configured" || state.status === "provider-error";

  return (
    <form
      action={formAction}
      className={cardBase}
      /* ROW W2. Without this a browser posts the name of the file and not the
         file, and the CV would arrive as the word "cv.pdf". */
      encType="multipart/form-data"
      noValidate
    >
      <h2 className="text-title font-display font-bold">Meld je aan als coach</h2>
      <p className="text-small mt-2 text-lavender-ink">
        Vrijblijvend: we plannen eerst een kennismakingsgesprek.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {/* Our problem, not theirs, so it hands over a way through. Everything
            they typed is still in the fields below it. */}
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
                  href={`mailto:${state.fallbackAddress}?subject=${encodeURIComponent("Aanmelding als StudieKeuzeCoach")}`}
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

        {/* The two fields of `spamGuard`. The first is a trap: off screen, so a
            robot fills what it reads in the HTML and a person reaches neither.
            The second is the clock. */}
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
          <label className={labelBase} htmlFor={field("regio")}>
            Gewenste stad of regio
          </label>
          <input
            aria-describedby={state.errors.regio ? errorId("regio") : undefined}
            aria-invalid={Boolean(state.errors.regio)}
            className={fieldBase}
            defaultValue={state.values.regio}
            id={field("regio")}
            name="regio"
            placeholder="Gewenste stad of regio"
            type="text"
          />
          {state.errors.regio && (
            <p className={errorBase} id={errorId("regio")}>
              {state.errors.regio}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelBase} htmlFor={field("achtergrond")}>
            Je achtergrond
          </label>
          <div className="relative">
            <select
              aria-describedby={
                state.errors.achtergrond ? errorId("achtergrond") : undefined
              }
              aria-invalid={Boolean(state.errors.achtergrond)}
              className={`${fieldBase} appearance-none pr-11`}
              defaultValue={state.values.achtergrond}
              id={field("achtergrond")}
              name="achtergrond"
            >
              <option value="">Kies wat het beste past</option>
              {achtergronden.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
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
          {state.errors.achtergrond && (
            <p className={errorBase} id={errorId("achtergrond")}>
              {state.errors.achtergrond}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelBase} htmlFor={field("motivatie")}>
            Vertel kort iets over jezelf en je ervaring
          </label>
          <textarea
            aria-describedby={
              state.errors.motivatie ? errorId("motivatie") : undefined
            }
            aria-invalid={Boolean(state.errors.motivatie)}
            className={`${fieldBase} resize-y`}
            defaultValue={state.values.motivatie}
            id={field("motivatie")}
            name="motivatie"
            placeholder="Vertel kort iets over jezelf en je ervaring"
            rows={4}
          />
          {state.errors.motivatie && (
            <p className={errorBase} id={errorId("motivatie")}>
              {state.errors.motivatie}
            </p>
          )}
        </div>

        {/* ROW W2, the CV. Optional, so the label says so before the file
            picker opens, and it names the two things that can go wrong before
            they go wrong: what fits, and how big. */}
        <div className="flex flex-col gap-1.5">
          <label className={labelBase} htmlFor={field("cv")}>
            Je cv <span className="font-normal">(optioneel)</span>
          </label>
          <input
            accept={cvAccept}
            aria-describedby={
              state.errors.cv ? errorId("cv") : `${id}-cv-hint`
            }
            aria-invalid={Boolean(state.errors.cv)}
            className={fileBase}
            id={field("cv")}
            name="cv"
            type="file"
          />
          {state.errors.cv ? (
            <p className={errorBase} id={errorId("cv")}>
              {state.errors.cv}
            </p>
          ) : (
            <p className="text-micro text-lavender-ink" id={`${id}-cv-hint`}>
              PDF of Word, maximaal {cvMaxLabel}.
              {state.status === "invalid"
                ? " Kies je bestand opnieuw: een browser mag het niet voor je onthouden."
                : ""}
            </p>
          )}
        </div>

        <button
          className="mt-1 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-violet px-6 py-4 text-card font-bold text-white shadow-violet-strong transition-colors duration-150 ease-out-quart hover:bg-violet-dark disabled:cursor-not-allowed disabled:opacity-70"
          disabled={pending}
          type="submit"
        >
          {pending ? "Bezig met versturen" : "Verstuur aanmelding"}
        </button>

        <p className="text-micro text-center text-lavender-ink">
          We reageren binnen een week.
        </p>
      </div>
    </form>
  );
}
