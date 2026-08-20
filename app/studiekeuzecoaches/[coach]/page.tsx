import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { coaches, getCoach } from "@/app/coaches";
import { IntakeForm } from "@/app/components/intake-form";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Container,
  Eyebrow,
  Pill,
  Reveal,
} from "@/app/components/ui";
import { encodeIntakeRoute } from "@/app/intake";
import { getProfile, type ProfileBlock } from "./profiles";

/**
 * One coach, at full length, with their own intake form beside the text.
 *
 * This is the page every other page points at: the roster names a person, a
 * city page names a person, and both send the reader here to decide whether
 * they want to sit opposite this one. So the form on this page is the only one
 * on the site that already knows its destination before the reader types
 * anything (issue #7): `voor` carries `coach:<slug>`.
 *
 * The long text lives in ./profiles.ts, keyed by slug. The facts (name, town,
 * region, portrait) come from app/coaches.ts, which is the roster and is owned
 * elsewhere.
 */

/** The six people of the roster, and nobody else. An unknown slug is a 404. */
export function generateStaticParams() {
  return coaches.map((coach) => ({ coach: coach.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/studiekeuzecoaches/[coach]">,
): Promise<Metadata> {
  const coach = getCoach((await props.params).coach);
  if (!coach) return {};

  const profile = getProfile(coach);

  return {
    title: `${profile.fullName}, studiekeuzecoach in ${coach.town} | StudieKeuzeAdvies`,
    description: profile.description,
    alternates: { canonical: `/studiekeuzecoaches/${coach.slug}` },
    /*
     * A stand-in is not a person, so their page may not be offered to a search
     * engine even by accident. The launch gate is the domain switch and not the
     * build (decision 2026-08-16), so this is the cheapest guard that costs
     * nobody a merge: it disappears the day `isPlaceholder` becomes false.
     */
    robots: coach.isPlaceholder ? { index: false, follow: false } : undefined,
  };
}

/** The reading column: paragraphs, one violet line, and the two boxes. */
function Block({ block }: { block: ProfileBlock }) {
  switch (block.kind) {
    case "p":
      return <p className="text-read text-muted-read">{block.text}</p>;

    case "accent":
      return (
        <p className="text-title-lg font-display font-bold text-violet">
          {block.text}
        </p>
      );

    case "note":
      return (
        <div className="rounded-box border border-hairline border-l-4 border-l-amber bg-white p-6 sm:px-7">
          <h2 className="text-body font-display font-bold">{block.title}</h2>
          <p className="text-card mt-2 leading-[1.7] text-muted-read">
            {block.text}
          </p>
        </div>
      );

    case "area":
      return (
        <div className="rounded-box bg-lavender p-6 sm:px-7">
          <h2 className="text-body font-display font-bold">{block.title}</h2>
          <p className="text-card mt-2 leading-[1.7] text-muted-read">
            {block.text}
          </p>
        </div>
      );
  }
}

export default async function CoachProfilePage(
  props: PageProps<"/studiekeuzecoaches/[coach]">,
) {
  const coach = getCoach((await props.params).coach);
  if (!coach) notFound();

  const profile = getProfile(coach);

  return (
    <>
      {/* The pill in the bar goes to the form on this page, not to the roster:
          the reader is already standing in front of the person. */}
      <SiteHeader cta={{ href: "#intake", label: "Plan gratis intake" }} />

      <main>
        <Container className="pt-8 pb-14 lg:pt-12 lg:pb-20">
          <Link
            className="text-small inline-flex min-h-11 items-center font-semibold text-violet hover:text-violet-dark"
            href="/studiekeuzecoaches"
          >
            ← Alle coaches
          </Link>

          {/* A stand-in must be visible to us and invisible to a visitor. This
              block is compiled out of the production bundle by the constant
              folding of `process.env.NODE_ENV`, so it can never ship. */}
          {process.env.NODE_ENV !== "production" && coach.isPlaceholder ? (
            <p className="rounded-box mt-6 border-[1.5px] border-dashed border-chip-border bg-amber-tint px-5 py-4 text-card text-amber-ink">
              <strong className="font-bold">Alleen in ontwikkeling:</strong>{" "}
              {coach.name} bestaat niet. De naam, het verhaal en de foto zijn
              stand-ins (<code>isPlaceholder</code> in app/coaches.ts), en deze
              pagina mag niet live voordat een echte coach hier staat.
            </p>
          ) : null}

          {/*
           * One grid for the whole page, so the form can sit beside the story
           * on a wide screen and directly under the hero on a telephone
           * without being written twice.
           *
           *   lg:  [ hero text   ] [ portrait ]
           *        [ story       ] [ form, sticky ]
           *   sm:  hero text, portrait, form, story, in that order.
           *
           * The reader on a telephone came for the form, so it stands above a
           * thousand words instead of under them.
           */}
          <div className="mt-6 grid items-start gap-x-14 gap-y-10 lg:mt-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)]">
            <Reveal className="lg:col-start-1 lg:row-start-1">
              <Eyebrow>{profile.eyebrow}</Eyebrow>

              <h1 className="text-h1 mt-3.5 font-bold">{profile.heading}</h1>

              <p className="text-lead mt-4 max-w-[35rem] text-muted">
                {profile.lede}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {profile.pills.map((pill) => (
                  <Pill key={pill.label} size="sm" tone={pill.tone}>
                    {pill.label}
                  </Pill>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  className="max-[420px]:w-full"
                  href="#intake"
                  size="lg"
                >
                  Plan gratis intake bij {coach.name}
                </Button>
                <Button
                  className="max-[420px]:w-full"
                  href="/studiekeuzetraject"
                  size="lg"
                  variant="outline"
                >
                  Zo werkt het traject
                </Button>
              </div>
            </Reveal>

            <Reveal className="relative lg:col-start-2 lg:row-start-1">
              {coach.portrait ? (
                <>
                  <Image
                    alt={coach.portraitAlt}
                    className="rounded-photo aspect-4/5 w-full max-w-[17.5rem] object-cover shadow-portrait sm:max-w-[20rem] lg:max-w-none"
                    placeholder="blur"
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 280px"
                    src={coach.portrait}
                  />
                  {/* Over the photo where the photo is wide enough to carry it,
                      under it on a telephone, where a line of text on a 280px
                      picture covers a face. */}
                  <p className="text-small mt-3 font-semibold sm:absolute sm:bottom-5 sm:left-5 sm:mt-0 sm:max-w-[calc(100%-2.5rem)] sm:rounded-row sm:bg-paper/95 sm:px-4.5 sm:py-3 sm:backdrop-blur-[6px]">
                    {profile.caption}
                  </p>
                </>
              ) : (
                <p className="rounded-photo border border-photo-line bg-white p-6 text-card text-muted">
                  {coach.name} heeft nog geen foto gestuurd. Je ziet elkaar in
                  het intakegesprek.
                </p>
              )}
            </Reveal>

            {/*
             * Sticky needs a cell that is as tall as the story next to it, so
             * the wrapper stretches and the card inside it slides.
             *
             * IT ONLY STICKS ON A TALL ENOUGH WINDOW. The card is about 730px
             * high, and a pinned element that does not fit is an element whose
             * submit button cannot be scrolled into view: the reader would have
             * to reach the end of a thousand words before the button came back.
             * So the query asks for the width AND the height, and on a short
             * laptop the card simply scrolls with the page.
             */}
            <div
              className="lg:col-start-2 lg:row-start-2 lg:self-stretch"
              id="intake"
            >
              <IntakeForm
                className="[@media(min-width:1024px)_and_(min-height:860px)]:sticky [@media(min-width:1024px)_and_(min-height:860px)]:top-24"
                coachName={coach.name}
                helper={
                  coach.responseTime
                    ? `${coach.name} neemt ${coach.responseTime} contact op.`
                    : `${coach.name} neemt contact met je op.`
                }
                lede={profile.formLede}
                route={encodeIntakeRoute({ kind: "coach", slug: coach.slug })}
                title={profile.formTitle}
              />
            </div>

            <div className="flex flex-col gap-4.5 lg:col-start-1 lg:row-start-2">
              {profile.blocks.map((block, index) => (
                <Block block={block} key={index} />
              ))}

              <p className="text-card mt-2 text-muted">
                Werkt {coach.name} niet bij jou in de buurt?{" "}
                <Link
                  className="font-bold text-violet underline decoration-violet/40 decoration-2 underline-offset-4"
                  href="/studiekeuzecoaches"
                >
                  Bekijk wie waar werkt
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
