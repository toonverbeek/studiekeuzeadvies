/**
 * Shared shape of the intake form. This file must stay free of "use server":
 * a server module may only export async functions, so the types, the initial
 * state, and the option list live here and are imported by both sides.
 */

export type IntakeField = "naam" | "email" | "telefoon" | "situatie";

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
  };
};

export const intakeInitialState: IntakeState = {
  status: "idle",
  message: "",
  errors: {},
  values: { naam: "", email: "", telefoon: "", situatie: "", bericht: "" },
};

export const situaties = [
  { value: "eerste-keuze", label: "Ik kies voor het eerst een studie" },
  { value: "twijfel", label: "Ik twijfel of ik ben gestopt" },
  { value: "extra-hulp", label: "Ik heb ADD, ADHD of autisme" },
  { value: "ouder", label: "Ik ben ouder of verzorger" },
] as const;
