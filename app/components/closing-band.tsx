import { CtaBand } from "./ui";

/**
 * The band that closes /studiekeuzetraject and /voor-wie.
 *
 * IT IS ONE COMPONENT BECAUSE THE CLIENT WROTE ONE BLOCK TWICE. Rows T8 and V3
 * of their mail are the same four lines, word for word, once under "HET
 * TRAJECT" and once under "VOOR WIE". Two copies of a text a client will edit
 * again is two chances to edit only one of them, so it is written here once.
 *
 * WHAT THE MAIL CHANGED:
 *  - the one-liner is "Begin met een intakegesprek. Het is vrijblijvend";
 *  - the sentence under it is the client's own;
 *  - "Kies je stad" pointed at /locaties. The client wants the coaches page:
 *    "De 'kies je stad' link verwijst nu naar de verkeerde pagina, moet naar
 *    pagina 'coaches'";
 *  - "Bekijk alle coaches" is gone, so the band has one button.
 *
 * An intake still ends at one named coach, so the button is the road to a
 * person and not to a form. app/central.ts says which forms are not.
 */
export function ClosingBand({ id = "intake" }: { id?: string }) {
  return (
    <CtaBand
      accent="Het is vrijblijvend."
      id={id}
      primary={{ href: "/studiekeuzecoaches", label: "Kies je coach" }}
      text="In het intakegesprek maken we kennis, leggen we uit hoe we werken en beslis je of het traject bij je past."
      title="Begin met een intakegesprek."
    />
  );
}
