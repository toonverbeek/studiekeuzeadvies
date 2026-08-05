"use server";

import { intakeInitialState, situaties, type IntakeState } from "./intake";
import { site } from "./site-config";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

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

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Er ontbreekt nog iets. Kijk hieronder wat je moet aanvullen.",
      errors,
      values,
    };
  }

  // TODO: nothing is delivered yet. Wire this to the mailbox in site-config.ts
  // (or to a form service) before the site goes live. Until then a real request
  // would be lost, so this page must not be published.
  console.warn(
    `[intake] Aanvraag ontvangen maar NIET verstuurd. Doel: ${site.email}`,
    values,
  );

  return {
    status: "success",
    message:
      "Je aanvraag staat genoteerd. We bellen of mailen je binnen één werkdag om een gratis intakegesprek in te plannen.",
    errors: {},
    values: intakeInitialState.values,
  };
}
