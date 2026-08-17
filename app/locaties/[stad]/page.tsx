import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cityCopy, citySlugs, getCity, otherCitiesWithCoach } from "@/app/cities";
import { CityMap } from "@/app/components/maps";
import { ContactSection } from "@/app/components/contact-section";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader, type NavItem } from "@/app/components/site-header";
import { button, linkOnOchre, linkOnPaper, shell } from "@/app/shell";
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
  };
}

export default async function CityPage(props: PageProps<"/locaties/[stad]">) {
  const { stad } = await props.params;
  const city = getCity(stad);
  if (!city) notFound();

  const copy = cityCopy(city);
  const elsewhere = otherCitiesWithCoach(city.slug);

  const nav: NavItem[] = [
    { href: "#coach", label: city.coach ? "Coach" : "Coach gezocht" },
    { href: "#traject", label: "Traject" },
    { href: "/locaties", label: "Locaties" },
    { href: "/artikelen", label: "Artikelen" },
    { href: "#contact", label: "Contact" },
  ];

  const jumps: NavItem[] = [
    { href: "#coach", label: city.coach ? `Je coach in ${city.name}` : "Hier zoeken we een coach" },
    { href: "#traject", label: "Als je voor het eerst kiest" },
    { href: "#traject-stoppen", label: "Als je bent gestopt" },
    { href: "#afspreken", label: city.coach ? "Waar we afspreken" : "Hoe het dan gaat" },
    { href: "#contact", label: "Gratis intakegesprek" },
  ];

  return (
    <>
      <SiteHeader homeHref="/" nav={nav} />

      <main id="top">
        {/* The city name is the loud word. 37 pages, 37 different silhouettes. */}
        <section className="bg-ochre text-ink">
          <div className={`${shell} pb-14 md:pb-20`}>
            <nav aria-label="Kruimelpad" className="pt-16 sm:pt-24">
              <ol className="text-eyebrow flex flex-wrap items-baseline gap-x-3 uppercase">
                <li>
                  <Link
                    className="underline decoration-ink/30 decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink"
                    href="/locaties"
                  >
                    Locaties
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{city.name}</li>
              </ol>
            </nav>

            <h1 className="mt-6">
              <span className="text-title block font-medium">
                Studiekeuzeadvies in
              </span>
              <span className="text-display mt-1 block font-extrabold break-words">
                {city.name}
              </span>
            </h1>

            <div className="mt-12 grid items-start gap-x-16 gap-y-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
              <div className="flex flex-col items-start gap-8">
                <p className="text-lead max-w-[52ch]">{copy.intro}</p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a className={button} href="#contact">
                    Plan een gratis intakegesprek
                  </a>
                  <a className={linkOnOchre} href="#traject">
                    Eerst lezen hoe het werkt
                  </a>
                </div>
              </div>

              {/* An index, not decoration. Overview first is a requirement for
                  the readers named in PRODUCT.md, not a style choice. */}
              <nav aria-label="Op deze pagina">
                <p className="text-eyebrow border-t border-ochre-line pt-4 uppercase">
                  Op deze pagina
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {jumps.map((item) => (
                    <li key={item.href}>
                      <a className={linkOnOchre} href={item.href}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* All trust comes from one person with a face and a region. */}
        <section className="bg-paper-shade" id="coach">
          <div className={`${shell} py-20 md:py-28`}>
            {city.coach ? (
              <div className="grid items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
                <Image
                  alt={city.coach.portraitAlt}
                  className="w-full max-w-[340px]"
                  placeholder="blur"
                  priority
                  sizes="(max-width: 1024px) 100vw, 340px"
                  src={city.coach.portrait!}
                />

                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <p className="text-eyebrow text-ink-soft uppercase">
                      Je coach in {city.name}
                    </p>
                    <h2 className="text-section font-extrabold">
                      {city.coach.name}
                    </h2>
                  </div>
                  <p className="text-lead max-w-[52ch]">{city.coach.intro}</p>
                  <dl className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-hairline pt-6">
                    <dt className="text-eyebrow text-ink-soft uppercase">
                      Werkgebied
                    </dt>
                    <dd className="max-w-[46ch]">{city.region}</dd>
                  </dl>

                  {/* Most readers land here from a search for their own city,
                      not by way of /locaties, so this is the only place they
                      meet the coach. Three sentences is a handshake, not a
                      history, and the way to the rest of it belongs here. */}
                  <p>
                    <Link
                      className={linkOnPaper}
                      href={`/studiekeuzecoaches#${city.coach.slug}`}
                    >
                      Lees meer over {city.coach.name}
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
                <h2 className="text-section font-extrabold">
                  In {city.name} zoeken we een coach
                </h2>
                <div className="flex flex-col items-start gap-8">
                  <p className="text-lead max-w-[58ch]">
                    Deze pagina heeft nog geen naam en geen gezicht. Dat laten we
                    liever zo tot er echt iemand staat. Je kunt wel beginnen: de
                    gesprekken kunnen online, en in de steden hieronder werkt wel
                    een coach.
                  </p>
                  {elsewhere.length > 0 && (
                    <ul className="flex flex-wrap gap-x-10 gap-y-3">
                      {elsewhere.map((other) => (
                        <li className="text-title font-bold" key={other.slug}>
                          <Link
                            className="underline decoration-ochre-line decoration-2 underline-offset-4 transition-colors duration-150 ease-out-quart hover:decoration-ink"
                            href={`/locaties/${other.slug}`}
                          >
                            {other.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* The invitation to a coach only stands here while there is
                      an address behind it. It named hallo@studiekeuzeadvies.nl,
                      and that mailbox is cancelled (issue #7), so it sent a
                      coach to a bounce. Fill `coachRecruitmentInbox` in
                      app/site-config.ts and this block comes back as it was. */}
                  {coachRecruitmentInbox && (
                    <p className="max-w-[58ch] border-t border-hairline pt-6">
                      Werk je zelf als studiekeuzecoach in {city.region}? Dan
                      horen we graag van je. Mail naar{" "}
                      <a
                        className={linkOnPaper}
                        href={`mailto:${coachRecruitmentInbox}`}
                      >
                        {coachRecruitmentInbox}
                      </a>
                      .
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* The reading zone. Long text always on the lightest paper. */}
        <section className="bg-paper" id="traject">
          <div className={`${shell} py-8 md:py-12`}>
            <ul>
              <li className="grid gap-x-16 gap-y-5 border-t border-hairline py-12 md:py-16 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
                <h2 className="text-section font-extrabold">
                  Je eerste studiekeuze
                </h2>
                <div className="flex max-w-[62ch] flex-col gap-5">
                  {copy.firstChoice.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                  <p>
                    <Link className={linkOnPaper} href="/studiekeuzetraject">
                      Lees precies wat je in die vier gesprekken doet
                    </Link>
                  </p>
                </div>
              </li>

              <li
                className="grid gap-x-16 gap-y-5 border-t border-hairline py-12 md:py-16 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]"
                id="traject-stoppen"
              >
                <h2 className="text-section font-extrabold">
                  Verkeerde studiekeuze gemaakt?
                </h2>
                <div className="flex max-w-[62ch] flex-col gap-5">
                  {copy.wrongChoice.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                  <p>
                    <a className={linkOnPaper} href="#contact">
                      Bespreek je situatie in een gratis gesprek
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* This band is on every city page, also on a page without a coach. It
            answers the practical question, and it keeps the ochre from
            disappearing for the length of the whole read. */}
        <section className="bg-ochre text-ink" id="afspreken">
          <div className={`${shell} py-14 md:py-16`}>
            {/* The right column starts on the same line as the form below it:
                half the container, plus the 4rem inner gutter. The contact
                section splits the page at the centre, so this band must use
                that same line or the two ochre blocks look off by 60px. */}
            <div className="grid gap-y-10 lg:grid-cols-[calc(50%+4rem)_minmax(0,1fr)]">
              <div className="flex flex-col gap-6">
                <h2 className="text-section max-w-[20rem] font-extrabold">
                  {city.coach ? "Waar spreken we af?" : "Dan doen we het online"}
                </h2>
                {city.coach && city.meeting && (
                  <address className="text-title font-bold not-italic">
                    {city.meeting.street}
                    <br />
                    {city.meeting.postcode} {city.meeting.town}
                  </address>
                )}
                <p className="text-lead max-w-[46ch]">
                  {!city.coach
                    ? "De gesprekken gaan dan via videobellen. Dat werkt beter dan je denkt: je zit thuis, je bent geen reistijd kwijt, en je kunt tussendoor rustig nadenken. Wil je toch iemand in het echt spreken? Vraag het ons, dan kijken we of een coach uit een buurstad tijd heeft."
                    : city.meeting
                      ? `Je bent welkom in ${city.meeting.town}. Liever online? Dat kan ook, en voor sommige gesprekken werkt een scherm ertussen zelfs beter.`
                      : `We spreken af in ${city.name}, op een plek die we samen kiezen. Meestal een rustige ruimte in het centrum, dicht bij het station. Liever online? Dat kan ook, en voor sommige gesprekken werkt een scherm ertussen zelfs beter.`}
                </p>
              </div>

              {city.coach && <CityMap city={city} />}
            </div>
          </div>
        </section>

        <ContactSection city={city.name} />
      </main>

      <SiteFooter
        pageLinks={[
          { href: "#coach", label: city.coach ? "De coach" : "Coach gezocht" },
          { href: "#traject", label: "Het traject" },
          { href: "#contact", label: "Gratis intakegesprek" },
        ]}
      />
    </>
  );
}
