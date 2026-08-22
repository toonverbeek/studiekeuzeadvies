import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { Button, Container, PageHero } from "./components/ui";

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <PageHero
          eyebrow="404"
          lede="Misschien klopt het adres niet meer, of is de pagina verhuisd. Ga terug naar het begin, of kijk waar een coach bij jou in de buurt werkt."
          size="hero"
          title="Deze pagina bestaat niet"
        />

        <Container className="pb-16 lg:pb-24">
          <div className="flex flex-wrap gap-3">
            <Button className="max-[420px]:w-full" href="/" size="lg">
              Naar de homepagina
            </Button>
            <Button
              className="max-[420px]:w-full"
              href="/locaties"
              size="lg"
              variant="outline"
            >
              Alle locaties
            </Button>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
