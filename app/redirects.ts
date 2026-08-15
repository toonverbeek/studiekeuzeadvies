/**
 * Every old URL of the WordPress site, and where it lands on this one.
 *
 * GENERATED FILE. Do not edit it by hand: `python3 scripts/build-url-map.py`
 * writes it from `docs/url-map.csv`, which resolves all 522 old URLs of the
 * archive. Change a rule in the script, or a decision in the map, and run the
 * script again. `next.config.ts` imports this array and makes every row a
 * permanent redirect, so Next answers with a 308 and the search engines move
 * the ranking to the new address. The old site goes offline in September 2026.
 *
 * The table lives here and not in `next.config.ts` because it is 346 rows
 * long, and a config file that is mostly data is a config file nobody reads.
 *
 * **A source carries no trailing slash, and it still matches one.** Every old
 * URL ends in a slash. Next puts its own redirect, `/:path+/` to `/:path+`, in
 * front of this table whenever `trailingSlash` is false, which is the default
 * and what this site uses. So `/oude-pagina/` first loses its slash with a 308
 * and then matches the row below. A source written *with* a slash would never
 * be reached. It costs the old URLs one extra hop, which is the price of the
 * normalisation and is the same on Vercel. See `docs/redirects.md`.
 *
 * **A row with a `waits for` comment is temporary.** The target in
 * `docs/url-map.csv` has no page yet, so the redirect lands on the nearest page
 * that does exist. Build the page, run the script again, and the fallback goes
 * away by itself. `docs/redirects.md` lists every target that is waiting.
 */

export type LegacyRedirect = {
  /** The old path, without its trailing slash. */
  source: string;
  /** A path on this site that exists today. Never a 404. */
  destination: string;
};

export const legacyRedirects: LegacyRedirect[] = [
  { source: "/aart-smit", destination: "/studiekeuzecoaches" }, // waits for /studiekeuzecoaches/aart-smit
  { source: "/afrekenen", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/amersfoort", destination: "/locaties/amersfoort" },
  { source: "/amsterdam", destination: "/locaties/amsterdam" },
  { source: "/angelina-muller", destination: "/studiekeuzecoaches" }, // waits for /studiekeuzecoaches/angelina-muller
  { source: "/bedankpagina-aanvraag-studiekeuzeadvies", destination: "/" }, // waits for /bedankt
  { source: "/bedankpagina-vrijblijvend-intakegesprek-inplannen", destination: "/" }, // waits for /bedankt
  { source: "/bergen-op-zoom-2", destination: "/locaties/bergen-op-zoom" },
  { source: "/bergen-op-zoom", destination: "/locaties/bergen-op-zoom" },
  { source: "/breda", destination: "/locaties" }, // waits for /locaties/breda
  { source: "/bussum", destination: "/locaties" }, // waits for /locaties/bussum
  { source: "/category", destination: "/artikelen" },
  { source: "/category/blog", destination: "/artikelen" },
  { source: "/category/nieuws", destination: "/artikelen" },
  { source: "/deventer-2", destination: "/locaties" }, // waits for /locaties/deventer
  { source: "/eerste-studiekeuze/covers", destination: "/eerste-studiekeuze" },
  { source: "/eerste-studiekeuze/covers2", destination: "/eerste-studiekeuze" },
  { source: "/eerste-studiekeuze/microsoftteams-image-2", destination: "/eerste-studiekeuze" },
  { source: "/eerste-studiekeuze/microsoftteams-image", destination: "/eerste-studiekeuze" },
  { source: "/eerste-studiekeuze/orja091-aangepast-2", destination: "/eerste-studiekeuze" },
  { source: "/eerste-studiekeuze/qompas-logo-fc-blauw-rood-payoff", destination: "/eerste-studiekeuze" },
  { source: "/eerste-studiekeuze/qompas-logo-rgb-blauw-rood-payoff", destination: "/eerste-studiekeuze" },
  { source: "/enschede", destination: "/locaties" }, // waits for /locaties/enschede
  { source: "/gouda", destination: "/locaties" }, // waits for /locaties/gouda
  { source: "/gratis-studiekeuzetraject", destination: "/studiekeuzetraject" },
  { source: "/groningen", destination: "/locaties" }, // waits for /locaties/groningen
  { source: "/home", destination: "/" },
  { source: "/home/banner", destination: "/" },
  { source: "/home/boekenblauwblur", destination: "/" },
  { source: "/home/college-tutor-with-student", destination: "/" },
  { source: "/home/confused-student-studying-in-a-coffee-shop", destination: "/" },
  { source: "/home/cover-banner", destination: "/" },
  { source: "/home/high-school-student-working-in-library-after-classes-using-laptop", destination: "/" },
  { source: "/home/informatics-min", destination: "/" },
  { source: "/home/meisje-krullen-240x413", destination: "/" },
  { source: "/home/mockup-ska-talententest-klein", destination: "/" },
  { source: "/home/orja091-klein-2", destination: "/" },
  { source: "/home/orja091_", destination: "/" },
  { source: "/home/portrait-of-pretty-brunette-woman-with-long-hair", destination: "/" },
  { source: "/home/prestatiedruk-240x413", destination: "/" },
  { source: "/home/regionblur", destination: "/" },
  { source: "/home/rsz_adult-business-meeting-business-people-1438072", destination: "/" },
  { source: "/home/rsz_christin-hume-505823-unsplash", destination: "/" },
  { source: "/home/rsz_neonbrand-618320-unsplash", destination: "/" },
  { source: "/home/scholieren-kijken-elkaar-aan", destination: "/" },
  { source: "/home/ska-banner", destination: "/" },
  { source: "/home/smartheads1", destination: "/" },
  { source: "/home/stocksy_txp70132e42tuf200_medium_2542961-2-3", destination: "/" },
  { source: "/home/stress-plaatje-spiegel-1", destination: "/" },
  { source: "/home/studiekeuzeadvies1-1", destination: "/" },
  { source: "/home/studiekeuzeadvies1", destination: "/" },
  { source: "/home/thinking-woman-in-front-of-blackboard-with-question-marks", destination: "/" },
  { source: "/home/two-students-learning-helping-each-other", destination: "/" },
  { source: "/janneke-van-den-brand", destination: "/studiekeuzecoaches" }, // waits for /studiekeuzecoaches/janneke-van-den-brand
  { source: "/keuzegids", destination: "/studiekeuzetraject" },
  { source: "/keuzegids/home-keuzegids", destination: "/studiekeuzetraject" },
  { source: "/leiden", destination: "/locaties" }, // waits for /locaties/leiden
  { source: "/locaties/amersfoort/mirjam-260x300", destination: "/locaties/amersfoort" },
  { source: "/locaties/amsterdam/amsterdam", destination: "/locaties/amsterdam" },
  { source: "/locaties/amsterdam/img_0943", destination: "/locaties/amsterdam" },
  { source: "/locaties/arnhem-2", destination: "/locaties" }, // waits for /locaties/arnhem
  { source: "/locaties/breda/angelina-en-renata", destination: "/locaties" }, // waits for /locaties/breda
  { source: "/locaties/bussum/img_2795", destination: "/locaties" }, // waits for /locaties/bussum
  { source: "/locaties/de-melkfabriek-bruinevisstraat-32-4611hj-bergen-op-zoom", destination: "/locaties" },
  { source: "/locaties/enschede/monique-kock", destination: "/locaties" }, // waits for /locaties/enschede
  { source: "/locaties/enschede/schermafbeelding-2022-02-08-om-09-30-07", destination: "/locaties" }, // waits for /locaties/enschede
  { source: "/locaties/groningen/pieter-jpg", destination: "/locaties" }, // waits for /locaties/groningen
  { source: "/locaties/leiden/silvia", destination: "/locaties" }, // waits for /locaties/leiden
  { source: "/locaties/logo-2", destination: "/locaties" },
  { source: "/locaties/maastricht/schermafbeelding-2021-10-28-om-12-04-32", destination: "/locaties" }, // waits for /locaties/maastricht
  { source: "/locaties/p-j-oudweg-4-1314-ch-almere", destination: "/locaties" },
  { source: "/locaties/roosendaal/angelina-muller-1", destination: "/locaties" }, // waits for /locaties/roosendaal
  { source: "/locaties/singel-331-3311-hl-dordrecht", destination: "/locaties" },
  { source: "/locaties/sittard/lisa-2", destination: "/locaties" }, // waits for /locaties/sittard
  { source: "/locaties/student-getting-help-from-tutor-in-library", destination: "/locaties" },
  { source: "/locaties/studiekeuzeadvies-apeldoorn", destination: "/locaties" }, // waits for /locaties/apeldoorn
  { source: "/locaties/utrecht/b-m", destination: "/locaties/utrecht" },
  { source: "/locaties/utrechtseweg-7-3811-na-amersfoort", destination: "/locaties" },
  { source: "/locaties/van-baerlestraat-13-1071-al-amsterdam", destination: "/locaties" },
  { source: "/locaties/wassenaar/download-14", destination: "/locaties" }, // waits for /locaties/wassenaar
  { source: "/locaties/wassenaar/silvia-200x300", destination: "/locaties" }, // waits for /locaties/wassenaar
  { source: "/locaties/zwolle/ilse-froukje", destination: "/locaties" }, // waits for /locaties/zwolle
  { source: "/locaties/zwolle/ilse-van-den-belt", destination: "/locaties" }, // waits for /locaties/zwolle
  { source: "/maastricht", destination: "/locaties" }, // waits for /locaties/maastricht
  { source: "/merk/keuzegids", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/merk/qompas", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/merk/studiekeuzeadvies", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/mijn-account", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/mijn-account/lost-password", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/online-studiekeuzeadvies", destination: "/studiekeuzetraject" },
  { source: "/online-studiekeuzeadvies/orja091-2-1", destination: "/studiekeuzetraject" },
  { source: "/online-studiekeuzeadvies/orja091-2-2", destination: "/studiekeuzetraject" },
  { source: "/online-studiekeuzeadvies/orja091-2", destination: "/studiekeuzetraject" },
  { source: "/online-studiekeuzeadvies/orja091-klein", destination: "/studiekeuzetraject" },
  { source: "/onze-diensten-en-producten", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/onze-diensten-en-producten/meisje-krullen-270x767", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/onze-diensten-en-producten/meisje-schrijft-met-potlood-in-schrift", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/onze-diensten-en-producten/shutterstock_1498298075-1", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/onze-methode/pattern-2", destination: "/studiekeuzetraject" }, // waits for /onze-methode
  { source: "/onze-methode/scholieren-kijken-elkaar-aan-c", destination: "/studiekeuzetraject" }, // waits for /onze-methode
  { source: "/onze-methode/talentfocus-keuzegids", destination: "/studiekeuzetraject" }, // waits for /onze-methode
  { source: "/opnieuw-een-studiekeuze-maken", destination: "/verkeerde-studiekeuze" },
  { source: "/opnieuw-een-studiekeuze-maken/meisje-met-koptelefoon-en-rugzak", destination: "/verkeerde-studiekeuze" },
  { source: "/over-ons/two-students-doing-homework-at-home-2", destination: "/" }, // waits for /over-ons
  { source: "/over-ons/veelgestelde-vragen", destination: "/veelgestelde-vragen" },
  { source: "/product-categorie", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product-categorie/hbo-wo", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product-categorie/mbo", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product-categorie/testen-met-gesprek", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product-categorie/testen-zonder-gesprek", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product-categorie/traject-zonder-gesprekken", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product-tag", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product-tag/hbo-wo", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product-tag/mbo", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product-tag/testen-met-gesprek", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product-tag/testen-zonder-gesprek", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product-tag/traject-zonder-gesprekken", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product/studiekeuzeadvies-keuzecheck-hbo-wo-met-gesprek", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product/studiekeuzeadvies-keuzecheck-hbo-wo-zonder-gesprek", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product/studiekeuzeadvies-keuzecheck-mbo-met-gesprek", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product/studiekeuzeadvies-keuzecheck-mbo-zonder-gesprek", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product/studiekeuzeadvies-traject-hbo-wo-zonder-gesprekken-opnieuw-kiezer", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product/studiekeuzeadvies-traject-hbo-wo-zonder-gesprekken", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product/studiekeuzeadvies-traject-mbo-zonder-gesprekken-opnieuw-kiezer", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/product/studiekeuzeadvies-traject-mbo-zonder-gesprekken", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/roosendaal", destination: "/locaties" }, // waits for /locaties/roosendaal
  { source: "/sittard", destination: "/locaties" }, // waits for /locaties/sittard
  { source: "/studiekeuze-met-add-adhd/studiekeuze-add-adhd", destination: "/studiekeuze-met-add-adhd" },
  { source: "/studiekeuze-tarieven-2", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/studiekeuze-traject", destination: "/studiekeuzetraject" },
  { source: "/studiekeuze", destination: "/studiekeuze-met-add-adhd" },
  { source: "/studiekeuzecoaches/171024-004-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/afbeelding1", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/alicia-2-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/astrid", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/charlie-ramsaran", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/christel-jpg", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/christel-kerssens", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-angelina", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-barbara-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-barbara", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-christel-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-christel", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-froukje-2-0", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-froukje", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-gabrielle", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-laura", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-madeleine", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-melissa", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-patricia-v", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-patty-2-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-patty-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/coach-renata-1", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/download-15", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/fabienne-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/floris", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/foto-zwart-wit", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/francine-coach-rotterdam", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/hester-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/ilse-marijn", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/img_27951", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/jamie-van-aert-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/janneke", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/jessica-wolter-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/jessica-wolter", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/josette", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-almere", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-amsterdam", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-breda", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-den-haag", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-eindhoven", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-enschede", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-groningen", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-leeuwarden", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-leiden", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-maastricht", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-nijmegen", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-rotterdam", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-utrecht", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kc-zwolle", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kelly-brick", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kim-ter-horst-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/kleiner-ska", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/laura-coach-tilburg", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/laura-wierda", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/lieke-coach-utrecht-amersfoort-hilversum-min", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/liesbeth-brocken", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/lisa-2-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/lyceo-foto", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/maryvonne", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/merel-musa-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/merel-musa", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/mirjam-schmidt-erftemeijer-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/mirjam-schmidt-erftemeijer", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/mirjam", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/mirren-coach-utrecht-hilversum-amersfoort", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/myrthe", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-10", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-11", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-12", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-13", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-14", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-15", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-3-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-3", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-4-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-4-3", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-4", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-5", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-6-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-6", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-7", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-8", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project-9", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/new-project", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/peggy", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/portret-astrid", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/processed-with-vsco-with-b1-preset", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/processed-with-vsco-with-b5-preset-2", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/processed-with-vsco-with-b5-preset-3", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/processed-with-vsco-with-b5-preset-4", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/processed-with-vsco-with-b5-preset-5", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/processed-with-vsco-with-b5-preset-6", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/processed-with-vsco-with-b5-preset-7", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/processed-with-vsco-with-b5-preset", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/profielfoto-1", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/rowan", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/rsz_christel_kerssens", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/ruth-noordzij", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/schermafbeelding-2021-10-28-om-11-34-29", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/selina", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/sem-ska", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/trinke", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzecoaches/zw-foto-tamara", destination: "/studiekeuzecoaches" },
  { source: "/studiekeuzetest", destination: "/studiekeuzetraject" },
  { source: "/studiekeuzetraject/opzet-1-v1", destination: "/studiekeuzetraject" },
  { source: "/studiekeuzetraject/rawpixel-577482-unsplash", destination: "/studiekeuzetraject" },
  { source: "/studiekeuzetraject/rsz_neonbrand-618320-unsplash-2", destination: "/studiekeuzetraject" },
  { source: "/studiekeuzetraject/stressed-schoolgirl-studying-in-classroom", destination: "/studiekeuzetraject" },
  { source: "/studiekeuzetraject/tim-gouw-68319-unsplash", destination: "/studiekeuzetraject" },
  { source: "/tag", destination: "/artikelen" },
  { source: "/tag/1-mei", destination: "/artikelen" },
  { source: "/tag/afweging", destination: "/artikelen" },
  { source: "/tag/baankansen", destination: "/artikelen" },
  { source: "/tag/begindatum", destination: "/artikelen" },
  { source: "/tag/belgie", destination: "/artikelen" },
  { source: "/tag/beperkt-plaatsen", destination: "/artikelen" },
  { source: "/tag/beurs", destination: "/artikelen" },
  { source: "/tag/bindend-studieadvies", destination: "/artikelen" },
  { source: "/tag/buitenland", destination: "/artikelen" },
  { source: "/tag/centrale-loting", destination: "/artikelen" },
  { source: "/tag/deadline", destination: "/artikelen" },
  { source: "/tag/decentrale-loting", destination: "/artikelen" },
  { source: "/tag/decentrale-selectie", destination: "/artikelen" },
  { source: "/tag/deeltijd", destination: "/artikelen" },
  { source: "/tag/duaal", destination: "/artikelen" },
  { source: "/tag/duo", destination: "/artikelen" },
  { source: "/tag/eerstejaarsstress", destination: "/artikelen" },
  { source: "/tag/februari", destination: "/artikelen" },
  { source: "/tag/geen-match", destination: "/artikelen" },
  { source: "/tag/gevolgen", destination: "/artikelen" },
  { source: "/tag/gift", destination: "/artikelen" },
  { source: "/tag/goede-start-studie", destination: "/artikelen" },
  { source: "/tag/halvering-collegegeld", destination: "/artikelen" },
  { source: "/tag/havo", destination: "/artikelen" },
  { source: "/tag/hogeschool", destination: "/artikelen" },
  { source: "/tag/inschrijven", destination: "/artikelen" },
  { source: "/tag/introductieweek", destination: "/artikelen" },
  { source: "/tag/kamers", destination: "/artikelen" },
  { source: "/tag/korte-termijn", destination: "/artikelen" },
  { source: "/tag/leenstelsel", destination: "/artikelen" },
  { source: "/tag/leuk-en-nuttig", destination: "/artikelen" },
  { source: "/tag/matching", destination: "/artikelen" },
  { source: "/tag/mbo", destination: "/artikelen" },
  { source: "/tag/meelopen", destination: "/artikelen" },
  { source: "/tag/motivatie", destination: "/artikelen" },
  { source: "/tag/particuliere-opleiding", destination: "/artikelen" },
  { source: "/tag/persoonlijkheid", destination: "/artikelen" },
  { source: "/tag/rente", destination: "/artikelen" },
  { source: "/tag/scholier", destination: "/artikelen" },
  { source: "/tag/startsalaris", destination: "/artikelen" },
  { source: "/tag/stoppen", destination: "/artikelen" },
  { source: "/tag/student", destination: "/artikelen" },
  { source: "/tag/studentenstad", destination: "/artikelen" },
  { source: "/tag/studentenvereniging", destination: "/artikelen" },
  { source: "/tag/studeren-tijdens-corona", destination: "/artikelen" },
  { source: "/tag/studeren", destination: "/artikelen" },
  { source: "/tag/studie", destination: "/artikelen" },
  { source: "/tag/studiefinanciering", destination: "/artikelen" },
  { source: "/tag/studiekeuze-veranderen", destination: "/artikelen" },
  { source: "/tag/studiekeuze", destination: "/artikelen" },
  { source: "/tag/studiekeuzeadvies", destination: "/artikelen" },
  { source: "/tag/studiekeuzecheck", destination: "/artikelen" },
  { source: "/tag/studieloopbaancoach", destination: "/artikelen" },
  { source: "/tag/studieperspectief", destination: "/artikelen" },
  { source: "/tag/studieschuld", destination: "/artikelen" },
  { source: "/tag/studiestart", destination: "/artikelen" },
  { source: "/tag/studievereniging", destination: "/artikelen" },
  { source: "/tag/switchen", destination: "/artikelen" },
  { source: "/tag/tentamens", destination: "/artikelen" },
  { source: "/tag/thuis-studeren", destination: "/artikelen" },
  { source: "/tag/tips-voor-thuistuderen", destination: "/artikelen" },
  { source: "/tag/tussenjaar", destination: "/artikelen" },
  { source: "/tag/twijfel", destination: "/artikelen" },
  { source: "/tag/uitgeloot", destination: "/artikelen" },
  { source: "/tag/uitschrijven", destination: "/artikelen" },
  { source: "/tag/universiteit", destination: "/artikelen" },
  { source: "/tag/verschillen", destination: "/artikelen" },
  { source: "/tag/vmbo", destination: "/artikelen" },
  { source: "/tag/voltijd", destination: "/artikelen" },
  { source: "/tag/voor-en-nadelen", destination: "/artikelen" },
  { source: "/tag/voorbereiden", destination: "/artikelen" },
  { source: "/tag/voorbereiding", destination: "/artikelen" },
  { source: "/tag/wat-nu", destination: "/artikelen" },
  { source: "/tarieven/schermafbeelding-2014-12-29-om-09-51-07", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/tarieven/schermafbeelding-2014-12-29-om-09-53-53", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/tarieven/schermafbeelding-2014-12-29-om-11-38-38", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/tarieven/tarievenska", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/tarieven/unnamed-1", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/tarieven/unnamed-2", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/tarieven/unnamed", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/utrecht", destination: "/locaties/utrecht" },
  { source: "/vacature-keuzecoach-dordrecht", destination: "/studiekeuzecoaches" }, // waits for /coach-worden
  { source: "/vacature-keuzecoach-zwolle", destination: "/studiekeuzecoaches" }, // waits for /coach-worden
  { source: "/vacature-keuzecoach", destination: "/studiekeuzecoaches" }, // waits for /coach-worden
  { source: "/vacatures", destination: "/studiekeuzecoaches" }, // waits for /coach-worden
  { source: "/van-studie-wisselen/foto1-2", destination: "/artikelen" }, // waits for /van-studie-wisselen
  { source: "/van-studie-wisselen/foto1", destination: "/artikelen" }, // waits for /van-studie-wisselen
  { source: "/van-studie-wisselen/foto2-2", destination: "/artikelen" }, // waits for /van-studie-wisselen
  { source: "/van-studie-wisselen/foto2", destination: "/artikelen" }, // waits for /van-studie-wisselen
  { source: "/van-studie-wisselen/foto3-2", destination: "/artikelen" }, // waits for /van-studie-wisselen
  { source: "/van-studie-wisselen/foto3", destination: "/artikelen" }, // waits for /van-studie-wisselen
  { source: "/van-studie-wisselen/foto4-2", destination: "/artikelen" }, // waits for /van-studie-wisselen
  { source: "/van-studie-wisselen/foto4", destination: "/artikelen" }, // waits for /van-studie-wisselen
  { source: "/van-studie-wisselen/foto5-2", destination: "/artikelen" }, // waits for /van-studie-wisselen
  { source: "/van-studie-wisselen/foto5", destination: "/artikelen" }, // waits for /van-studie-wisselen
  { source: "/verkeerde-studiekeuze/pattern", destination: "/verkeerde-studiekeuze" },
  { source: "/voor-1-mei-inschrijven", destination: "/artikel-aanmelden-studies" },
  { source: "/wassenaar", destination: "/locaties" }, // waits for /locaties/wassenaar
  { source: "/wat-betekent-het-leenstelsel-concreet-voor-jou/olympus-digital-camera", destination: "/artikelen" }, // waits for /wat-betekent-het-leenstelsel-concreet-voor-jou
  { source: "/winkel", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/winkelwagen", destination: "/studiekeuzetraject" }, // waits for /tarieven
  { source: "/zutphen", destination: "/locaties" }, // waits for /locaties/zutphen
  { source: "/zwolle", destination: "/locaties" }, // waits for /locaties/zwolle
];
