import { Card, Container, Pill, Reveal, Section } from "@/app/components/ui";
import { meetings } from "@/app/traject";

/**
 * The spine of the page: one lavender panel holding four white cards, one per
 * meeting (design-spec 3.12 and 4.2).
 *
 * Each card is three columns on a wide screen: the numeral, what you do in the
 * meeting, and what you do at home before the next one. The rhythm answers the
 * question the reader really has, which is how much work this is. The last
 * card has no homework, so its third column stands empty, exactly as the
 * client drew it.
 *
 * Responsive (ours, the client's export keeps three columns at 390px): one
 * column on a telephone with the numeral above the title, two from `sm` with
 * the home box under the text, three from `lg`.
 */
export function GesprekkenPanel() {
  return (
    <Section id="gesprekken" space="none" className="pb-12 lg:pb-18">
      <Container>
        <Card pad="lg" variant="lavender">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <h2 className="text-h2 max-w-[29rem] font-bold">
              Hoe ziet het traject eruit?
            </h2>
            {/* Row T2. */}
            <p className="text-small font-mono text-violet-dark">
              4 gesprekken · 2 online testen
            </p>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2.5">
            <li>
              <Pill tone="white">✓ Incl. persoonlijkheidstest</Pill>
            </li>
            <li>
              <Pill tone="white">✓ Incl. studie-interessetest</Pill>
            </li>
            {/* Row T3: "kopje toevoegen naast de twee testen". */}
            <li>
              <Pill tone="white">✓ Incl. rapportage</Pill>
            </li>
          </ul>

          <ol className="mt-9 flex flex-col gap-4">
            {meetings.map((meeting) => (
              <Reveal
                as="li"
                className="grid gap-x-6 gap-y-4 rounded-inner bg-white p-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:p-7 lg:grid-cols-[5rem_minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-x-7 lg:px-8"
                key={meeting.number}
              >
                {/* The list carries the order, so the numeral is decoration
                    and a screen reader does not read "nul vier". */}
                <span
                  aria-hidden="true"
                  className={`font-display text-[clamp(2rem,1.8rem+1vw,2.5rem)] leading-none font-bold tracking-[-0.03em] ${
                    meeting.homework === null ? "text-coral" : "text-violet"
                  }`}
                >
                  {meeting.number}
                </span>

                <div>
                  <h3 className="text-title font-bold">{meeting.title}</h3>
                  <p className="text-body mt-2 text-muted lg:text-card">{meeting.body}</p>
                </div>

                {/* ROW T5. The heading is the meeting's own now, because the
                    client gave the third and the fourth their own words. The
                    fourth has a heading and no body: after that meeting you
                    enrol, and "Daarna, inschrijven!" says the whole thing. The
                    party mark the client asked for is decoration, so it
                    carries `aria-hidden` and the heading reads on its own. */}
                <div className="rounded-row bg-paper p-5 sm:col-span-2 lg:col-span-1">
                  <p className="eyebrow text-eyebrow-sm text-coral-text">
                    {meeting.homeworkTitle}
                    {meeting.homework === null ? (
                      <span aria-hidden="true"> 🎉</span>
                    ) : null}
                  </p>
                  {meeting.homework ? (
                    <p className="text-card mt-1.5 text-muted lg:text-small">
                      {meeting.homework}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </ol>
        </Card>
      </Container>
    </Section>
  );
}
