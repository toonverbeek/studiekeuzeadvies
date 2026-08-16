"use server";

import { getCity } from "./cities";
import { type Coach, getCoach } from "./coaches";
import {
  decodeIntakeRoute,
  intakeInitialState,
  type IntakeRoute,
  type IntakeState,
  situaties,
} from "./intake";
import { unassignedIntakeInbox } from "./site-config";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

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
    return coach ? { coach, cityName: null } : null;
  }

  const city = getCity(route.slug);
  return city ? { coach: city.coach, cityName: city.name } : null;
}

export async function requestIntake(
  _prev: IntakeState,
  formData: FormData,
): Promise<IntakeState> {
  const values = {
    naam: String(formData.get("naam") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    telefoon: String(formData.get("telefoon") ?? "").trim(),
    situatie: String(formData.get("situatie") ?? "").trim(),
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

  const route = decodeIntakeRoute(values.voor);
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
      status: "error",
      message: "Er ontbreekt nog iets. Kijk hieronder wat je moet aanvullen.",
      errors,
      values,
    };
  }

  /*
   * The delivery route, and the whole of it: the coach of this city, or the
   * inbox for a city where no coach works yet. Both are null today, so nothing
   * arrives anywhere. That is one blocker in todos.md, not a bug in this file,
   * and the site must not go live while it stands.
   *
   * The warning names the person the request was meant for. A log line that
   * only says "not sent" hides which desk missed the request.
   *
   * IT DOES NOT LOG THE SUBMISSION. The form asks for a name, an e-mail, a
   * telephone number and what the person is struggling with, and one of the
   * four situations is "ik heb ADD, ADHD of autisme". Most of the people who
   * fill this in are between 16 and 22. Writing that to the runtime log copies
   * personal data, some of it health data, to a third place that nobody reads
   * and nobody empties. The route is enough to tell which desk missed it.
   */
  const inbox = destination.coach?.email ?? unassignedIntakeInbox;
  const meantFor = destination.coach
    ? destination.coach.name
    : `nog geen coach in ${destination.cityName ?? "deze stad"}`;

  console.warn(
    `[intake] Aanvraag ontvangen maar NIET verstuurd. Bedoeld voor: ${meantFor}. ` +
      `Adres: ${inbox ?? "nog niet bekend"}. De inhoud staat bewust niet in dit log.`,
  );

  /*
   * WHAT THIS MESSAGE MAY SAY. Nothing is delivered, so it may not promise an
   * answer, a channel or a moment. It says what is true: the form was filled in
   * correctly, and it is not on its way yet. The day `Coach.email` holds an
   * address, this text becomes a promise we can keep and it should be rewritten
   * to make it, because "we cannot send it yet" is a bad thing to read once it
   * is no longer true.
   */
  return {
    status: "success",
    message: destination.coach
      ? `Bedankt. Je aanvraag is voor ${destination.coach.name}, maar we kunnen hem nog niet versturen: de site is nog niet open. Probeer het opnieuw zodra hij live staat.`
      : "Bedankt. Hier werkt nog geen vaste coach, en we kunnen je aanvraag nog niet versturen: de site is nog niet open. Probeer het opnieuw zodra hij live staat.",
    errors: {},
    values: intakeInitialState.values,
  };
}
