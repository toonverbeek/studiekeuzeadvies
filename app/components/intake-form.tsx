"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { requestIntake } from "../actions";
import { intakeInitialState, situaties } from "../intake";

const fieldBase =
  "w-full border border-hairline bg-paper-shade px-4 py-3 text-body text-ink transition-colors duration-150 ease-out-quart placeholder:text-ink-soft hover:border-ink-soft";

/**
 * The form always knows where it sends to, because there is no central mailbox
 * to fall back on (issue #7).
 *
 * `route` is the encoded destination of app/intake.ts and it travels in a
 * hidden field. `coachName` is the same destination in words, for the reader.
 * They are two props and not one, because the server may not believe the words
 * and the reader cannot read the slug. `coachName` is required and nullable on
 * purpose: a page that cannot name a reader has to say so out loud.
 */
export function IntakeForm({
  coachName,
  route,
}: {
  coachName: string | null;
  route: string;
}) {
  const [state, formAction, pending] = useActionState(
    requestIntake,
    intakeInitialState,
  );
  const id = useId();

  const field = (name: string) => `${id}-${name}`;
  const errorId = (name: string) => `${id}-${name}-error`;

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-6" aria-live="polite">
        <p className="text-lead font-medium">{state.message}</p>
        <p className="max-w-[60ch] text-ink-soft">
          Wil je vast lezen wat een traject kost en hoe lang het duurt? Dat
          staat bij de{" "}
          <Link
            className="font-medium text-ink underline underline-offset-4"
            href="/veelgestelde-vragen"
          >
            veelgestelde vragen
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      {state.status === "error" && (
        <p
          className="border border-error px-4 py-3 text-error"
          role="alert"
        >
          {state.message}
        </p>
      )}

      {/* Who reads this. It is the first line of the form on purpose: a reader
          may write something they have told nobody, so they must know who opens
          it before they start typing. No promise about when an answer comes:
          this file cannot keep one. */}
      <input defaultValue={route} name="voor" type="hidden" />
      <p className="max-w-[60ch]">
        {coachName ? (
          <>
            <span className="font-medium">{coachName}</span> leest wat je hier
            invult.
          </>
        ) : (
          "Hier werkt nog geen vaste coach. We zoeken iemand bij jou in de buurt en je hoort van ons."
        )}
      </p>
      {state.errors.voor && <p className="text-error">{state.errors.voor}</p>}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-eyebrow uppercase" htmlFor={field("naam")}>
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
            type="text"
          />
          {state.errors.naam && (
            <p className="text-error" id={errorId("naam")}>
              {state.errors.naam}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-eyebrow uppercase" htmlFor={field("email")}>
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
            type="email"
          />
          {state.errors.email && (
            <p className="text-error" id={errorId("email")}>
              {state.errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-eyebrow uppercase" htmlFor={field("telefoon")}>
            Telefoon <span className="normal-case tracking-normal text-ink-soft">(mag je leeg laten)</span>
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
            type="tel"
          />
          {state.errors.telefoon && (
            <p className="text-error" id={errorId("telefoon")}>
              {state.errors.telefoon}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-eyebrow uppercase" htmlFor={field("situatie")}>
            Wat past bij jou?
          </label>
          <div className="relative">
            <select
              aria-describedby={
                state.errors.situatie ? errorId("situatie") : undefined
              }
              aria-invalid={Boolean(state.errors.situatie)}
              className={`${fieldBase} appearance-none pr-12`}
              defaultValue={state.values.situatie}
              id={field("situatie")}
              name="situatie"
            >
              <option value="">Kies je situatie</option>
              {situaties.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
              fill="none"
              height="10"
              viewBox="0 0 16 10"
              width="16"
            >
              <path
                d="M1 1l7 7 7-7"
                stroke="currentColor"
                strokeWidth="1.75"
              />
            </svg>
          </div>
          {state.errors.situatie && (
            <p className="text-error" id={errorId("situatie")}>
              {state.errors.situatie}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-eyebrow uppercase" htmlFor={field("bericht")}>
          Waar loop je tegenaan?{" "}
          <span className="normal-case tracking-normal text-ink-soft">(mag je leeg laten)</span>
        </label>
        <textarea
          className={`${fieldBase} resize-y`}
          defaultValue={state.values.bericht}
          id={field("bericht")}
          name="bericht"
          rows={4}
        />
      </div>

      {/* One button, and nothing next to it. The WhatsApp link that stood here
          went to one central number, and that number is gone. */}
      <div>
        <button
          className="bg-ink px-8 py-4 text-eyebrow uppercase text-paper transition-colors duration-150 ease-out-quart hover:bg-ochre-deep disabled:cursor-not-allowed disabled:opacity-70"
          disabled={pending}
          type="submit"
        >
          {pending ? "Bezig met versturen" : "Vraag een gratis intake aan"}
        </button>
      </div>

      <p className="max-w-[60ch] text-ink-soft">
        We gebruiken je gegevens alleen om contact met je op te nemen over dit
        gesprek. Je zit nergens aan vast.
      </p>
    </form>
  );
}
