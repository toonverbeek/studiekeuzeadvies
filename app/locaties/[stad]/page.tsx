import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cityCopy,
  citySlugs,
  getCity,
  otherCitiesWithCoach,
} from "@/app/cities";
import { ContactSection } from "@/app/components/contact-section";
import { CityMap } from "@/app/components/maps";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  Button,
  Container,
  Eyebrow,
  PageHero,
  PageIndex,
  Pill,
  Reveal,
  Section,
} from "@/app/components/ui";
import { coachRecruitmentInbox } from "@/app/site-config";

/** Every city is known at build time, so an unknown city is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return citySlugs.map((stad) => ({ stad }));
}

export async function generateMetadata(
  props: PageProps<"/locaties/[stad]">,
): Promise<Metadata> {
  const { stad } = await props.params;
  const city = getCity(stad);
  if (!city) return {};

  // The old title pattern is what ranks today. Keep it word for word.
  return {
    title: `Professionele hulp bij studiekeuze | ${city.name} | StudieKeuzeAdvies`,
    description: city.coach
      ? `Studiekeuzecoach in ${city.name}. Eén vaste coach die je helpt kiezen, of opnieuw kiezen. Het eerste gesprek is gratis.`
      : `Studiekeuzeadvies voor ${city.name}. We zoeken hier nog een coach. Online of in een stad in de buurt kun je wel terecht.`,
    alternates: { canonical: `/locaties/${city.slug}` },
    // A page about a person who does not exist is not offered to a search
    // engine. The same guard sits on the coach profile and in app/sitemap.ts;
    // all three disappear by themselves when isPlaceholder becomes false.
    robots: city.coach?.isPlaceholder ? { index: false, follow: false } : undefined,
  };
}

export default async function CityPage(props: PageProps<"/locaties/[stad]">) {
  const { stad } = await props.params;
  const city = getCity(stad);
  if (!city) notFound();

  const copy = cityCopy(city);
  const elsewhere = otherCitiesWithCoach(city.slug);
  const coach = city.coach;

  const jumps = [
    {
      href: "#coach",
      label: coach ? `Je coach in ${city.name}` : "Hier zoeken we een coach",
    },
    { href: "#traject", label: "Als je voor het eerst kiest" },
    { href: "#traject-stoppen", label: "Als je bent gestopt" },
    { href: "#afspreken", label: coach ? "Waar we afspreken" : "Hoe het dan gaat" },
  ];

  return (
    <>
      <SiteHeader />

      <main id="top">
        <PageHero
          eyebrow={
            <>
              <Link className="hover:text-violet" href="/locaties">
                Locaties
              </Link>{" "}
              <span aria-hidden="true">/</span>{" "}
              <span className="text-muted">{city.name}</span>
            </>
          }
          /* Hero A of the client's design: the index card stands beside the
             title from lg and follows under it below that (design-spec 6.2).
             It is an index and not decoration, because overview before detail
             is a requirement for the readers PRODUCT.md names. */
          aside={<PageIndex items={jumps} />}
          lede={copy.intro}
          title={
            <>
              {/* The trailing space is not decoration: without it a screen
                  reader runs the two lines together into one word. */}
              <span className="text-title block font-semibold">
                Studiekeuzeadvies in{" "}
              </span>
              <span className="block break-words">{city.name}</span>
            </>
          }
        >
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="#contact" size="lg">
              {coach
                ? `Plan gratis intake bij ${coach.name}`
                : "Zoek een coach in de buurt"}
            </Button>
            <Button href="#traject" size="lg" variant="outline">
              Eerst lezen hoe het werkt
            </Button>
          </div>

        </PageHero>

        {/* All trust comes from one person with a face and a region. */}
        <Section id="coach" space="md">
          <Container>
            {coach ? (
              <Reveal className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-14">
                <div className="flex flex-col items-start gap-5">
                  <Eyebrow>Je coach in {city.name}</Eyebrow>

                  <h2 className="text-h2 font-bold">{coach.name}</h2>

                  <ul className="flex flex-wrap gap-2.5">
                    <li>
                      <Pill size="sm">{city.name} en online</Pill>
                    </li>
                    {coach.specialties.slice(0, 2).map((item) => (
                      <li key={item}>
                        <Pill size="sm" tone="coral">
                          {item}
                        </Pill>
                      </li>
                    ))}
                  </ul>

                  <p className="text-lead max-w-[52ch] text-muted-read">
                    {coach.intro}
                  </p>

                  <dl className="flex w-full max-w-[52ch] flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-hairline pt-5">
                    <Eyebrow as="dt" color="muted" size="sm">
                      Werkgebied
                    </Eyebrow>
                    <dd className="text-card max-w-[46ch] text-muted">
                      {city.region}
                    </dd>
                  </dl>

                  {/* Most readers land here from a search for their own city,
                      not by way of /locaties, so this is the only place they
                      meet the coach. Three sentences is a handshake, not a
                      history, and the way to the rest of it belongs here. */}
                  <Button href={`/studiekeuzecoaches/${coach.slug}`}>
                    Maak kennis met {coach.name}
                  </Button>
                </div>

                {coach.portrait && (
                  <div className="relative w-full max-w-[340px]">
                    <Image
                      alt={coach.portraitAlt}
                      className="rounded-photo aspect-[4/5] w-full object-cover shadow-portrait"
                      placeholder="blur"
                      /* No priority: this portrait sits a full screen below
                         the fold on a telephone, and there is no image in the
                         hero of this page that it could be competing for. */
                      sizes="340px"
                      src={coach.portrait}
                    />
                    <p className="rounded-row mt-3 bg-paper/95 text-small font-semibold sm:absolute sm:bottom-5 sm:left-5 sm:mt-0 sm:px-4 sm:py-3 sm:backdrop-blur-[6px]">
                      {coach.name}, studiekeuzecoach in {city.name}
                    </p>
                  </div>
                )}
              </Reveal>
            ) : (
              <Reveal className="rounded-panel bg-lavender p-6 sm:p-10 lg:p-13">
                <h2 className="text-h2 max-w-[18ch] font-bold">
                  In {city.name} zoeken we een coach
                </h2>

                <p className="text-lead mt-5 max-w-[52ch] text-muted-read">
                  Deze pagina heeft nog geen naam en geen gezicht. Dat laten we
                  liever zo tot er echt iemand staat. Je kunt wel beginnen: de
                  gesprekken kunnen online, en in de steden hieronder werkt wel
                  een coach.
                </p>

                {elsewhere.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {elsewhere.map((other) => (
                      <li key={other.slug}>
                        <Button
                          href={`/locaties/${other.slug}`}
                          variant="outline"
                        >
                          {other.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* The invitation to a coach only stands here while there is an
                    address behind it. It named hallo@studiekeuzeadvies.nl, and
                    that mailbox is cancelled (issue #7), so it sent a coach to
                    a bounce. Fill `coachRecruitmentInbox` in app/site-config.ts
                    and this block comes back as it was. */}
                {coachRecruitmentInbox && (
                  <p className="mt-6 max-w-[52ch] border-t border-chip-border pt-5 text-muted">
                    Werk je zelf als studiekeuzecoach in {city.region}? Dan horen
                    we graag van je. Mail naar{" "}
                    <a
                      className="font-bold text-violet-dark underline decoration-violet/40 decoration-2 underline-offset-4"
                      href={`mailto:${coachRecruitmentInbox}`}
                    >
                      {coachRecruitmentInbox}
                    </a>
                    .
                  </p>
                )}
              </Reveal>
            )}
          </Container>
        </Section>

        {/* The reading zone. Long text always on the lightest paper. */}
        <Section id="traject" space="sm">
          <Container>
            <ul>
              <li className="grid gap-x-14 gap-y-5 border-t border-hairline py-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:py-14">
                <h2 className="text-h2 font-bold">Je eerste studiekeuze</h2>
                <div className="flex max-w-[62ch] flex-col gap-5">
                  {copy.firstChoice.map((paragraph) => (
                    <p className="text-read text-muted-read" key={paragraph.slice(0, 24)}>
                      {paragraph}
                    </p>
                  ))}
                  <p>
                    <Button href="/studiekeuzetraject" variant="ghost">
                      Lees precies wat je in die vier gesprekken doet →
                    </Button>
                  </p>
                </div>
              </li>

              <li
                className="grid gap-x-14 gap-y-5 border-t border-hairline py-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:py-14"
                id="traject-stoppen"
              >
                <h2 className="text-h2 font-bold">
                  Verkeerde studiekeuze gemaakt?
                </h2>
                <div className="flex max-w-[62ch] flex-col gap-5">
                  {copy.wrongChoice.map((paragraph) => (
                    <p className="text-read text-muted-read" key={paragraph.slice(0, 24)}>
                      {paragraph}
                    </p>
                  ))}
                  <p>
                    <Button href="#contact" variant="ghost">
                      {coach
                        ? "Bespreek je situatie in een gratis gesprek →"
                        : "Zoek een coach in de buurt →"}
                    </Button>
                  </p>
                </div>
              </li>
            </ul>
          </Container>
        </Section>

        {/* This block is on every city page, also on a page without a coach.
            The map frame is lavender, so the panel around it is white: two
            violet tints on top of each other read as one flat block. */}
        <Section id="afspreken" space="md">
          <Container>
            <Reveal className="rounded-panel grid items-center gap-8 border border-hairline bg-white p-6 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-13">
              <div className="flex flex-col gap-4">
                <h2 className="text-h4 max-w-[16ch] font-bold">
                  {coach ? "Waar spreken we af?" : "Dan doen we het online"}
                </h2>

                {coach && city.meeting && (
                  <address className="text-title font-bold not-italic">
                    {city.meeting.street}
                    <br />
                    {city.meeting.postcode} {city.meeting.town}
                  </address>
                )}

                <p className="max-w-[46ch] text-muted">
                  {!coach
                    ? "De gesprekken gaan dan via videobellen. Dat werkt beter dan je denkt: je zit thuis, je bent geen reistijd kwijt, en je kunt tussendoor rustig nadenken. Wil je toch iemand in het echt spreken? Vraag het ons, dan kijken we of een coach uit een buurstad tijd heeft."
                    : city.meeting
                      ? `Je bent welkom in ${city.meeting.town}. Liever online? Dat kan ook, en voor sommige gesprekken werkt een scherm ertussen zelfs beter.`
                      : `We spreken af in ${city.name}, op een plek die we samen kiezen. Meestal een rustige ruimte in het centrum, dicht bij het station. Liever online? Dat kan ook, en voor sommige gesprekken werkt een scherm ertussen zelfs beter.`}
                </p>
              </div>

              <CityMap city={city} />
            </Reveal>
          </Container>
        </Section>

        <ContactSection city={city.name} />
      </main>

      <SiteFooter />
    </>
  );
}
