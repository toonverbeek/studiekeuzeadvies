"""
Generate docs/url-map.csv and app/redirects.ts from the archive crawl.

Reads the archive crawl at ../studiekeuzeadvies archive/meta/crawl.json and
applies the rules written down in docs/rebuild-review.md, section "The new URL
structure". Re-run it after you change a rule, or after you re-run crawl.py.

    python3 scripts/build-url-map.py

Two files come out, and the second is built from the first:

1. docs/url-map.csv: one row per old URL, with the proposed new URL and a
   keep / redirect / drop / rebuild action.
2. app/redirects.ts: the rows with action=redirect, as a typed array that
   next.config.ts turns into permanent (308) redirects. Every target is checked
   against the routes that really exist in app/, so no redirect can land on a
   404. Where a target has no page yet, a fallback stands in. See
   docs/redirects.md.

Every rule here is a starting point, not a decision. The keep / redirect / drop
column needs Search Console data before it is final. See todos.md, section 2.
"""

import csv
import itertools
import json
import re
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SITEMAP_NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}loc"


def find_archive() -> Path:
    """
    The archive sits next to the repo. Walk up until we see it, so the script
    works from the checkout and from a worktree under .claude/worktrees/ alike.
    """
    for parent in [REPO, *REPO.parents]:
        candidate = parent.parent / "studiekeuzeadvies archive"
        if (candidate / "meta" / "crawl.json").exists():
            return candidate
    raise SystemExit("Cannot find '../studiekeuzeadvies archive'. See AGENTS.md.")


ARCHIVE = find_archive()


def to_path(url: str) -> str:
    return re.sub(r"^https?://(www\.)?studiekeuzeadvies\.nl", "", url)


def sitemap_paths(name: str) -> set[str]:
    tree = ET.parse(ARCHIVE / "meta" / name)
    return {to_path(loc.text) for loc in tree.getroot().iter(SITEMAP_NS)}


def classify(path: str, record: dict, attachments, posts, pages) -> str:
    if re.match(r"^/\d{4}(/|$)", path):
        return "date-archive"
    if path.startswith("/tag/"):
        return "tag"
    if path.startswith(("/category/", "/product-categorie/", "/product-tag/", "/merk/")):
        return "taxonomy"
    if path.startswith("/product/"):
        return "product"
    if path in ("/winkel/", "/winkelwagen/", "/afrekenen/", "/mijn-account/",
                "/mijn-account/lost-password/"):
        return "shop"
    if path in attachments:
        return "attachment"
    if path in posts:
        return "post"
    if path in pages:
        return "page"
    if record.get("status") != 200:
        return "dead"
    return "other"


# A city page whose slug does not follow /locaties/<stad>/.
CITY_SPECIAL = {
    "/bergen-op-zoom/": "bergen-op-zoom",
    "/bergen-op-zoom-2/": "bergen-op-zoom",
    "/gouda/": "gouda",
    "/zutphen/": "zutphen",
    "/deventer-2/": "deventer",
    "/locaties/arnhem-2/": "arnhem",
    "/locaties/studiekeuzeadvies-apeldoorn/": "apeldoorn",
}

# Every page that is not a city page, mapped by hand.
PAGE_MAP = {
    "/": ("/", "keep"),
    "/home/": ("/", "redirect"),
    "/index/": ("/", "redirect"),

    # The offer.
    "/studiekeuzetraject/": ("/studiekeuzetraject", "keep"),
    "/studiekeuze-traject/": ("/studiekeuzetraject", "redirect"),
    "/studiekeuzetest/": ("/studiekeuzetraject", "redirect"),
    "/online-studiekeuzeadvies/": ("/studiekeuzetraject", "redirect"),
    "/gratis-studiekeuzetraject/": ("/studiekeuzetraject", "redirect"),
    "/keuzegids/": ("/studiekeuzetraject", "redirect"),
    "/onze-methode/": ("/onze-methode", "rebuild"),
    "/onze-methode/talentfocus-keuzegids/": ("/onze-methode", "redirect"),
    "/tarieven/": ("/tarieven", "rebuild"),
    "/onze-diensten-en-producten/": ("/tarieven", "redirect"),
    "/studiekeuze-tarieven-2/": ("/tarieven", "redirect"),

    # The doors.
    "/eerste-studiekeuze/": ("/eerste-studiekeuze", "keep"),
    "/verkeerde-studiekeuze/": ("/verkeerde-studiekeuze", "keep"),
    "/opnieuw-een-studiekeuze-maken/": ("/verkeerde-studiekeuze", "redirect"),
    "/studiekeuze-met-add-adhd/": ("/studiekeuze-met-add-adhd", "rebuild"),
    "/hbo-opleiding-kiezen/": ("/hbo-opleiding-kiezen", "rebuild"),
    "/mbo-opleiding-kiezen/": ("/mbo-opleiding-kiezen", "rebuild"),
    "/wo-opleiding-kiezen/": ("/wo-opleiding-kiezen", "rebuild"),

    # The people.
    "/studiekeuzecoaches/": ("/studiekeuzecoaches", "keep"),
    "/janneke-van-den-brand/": ("/studiekeuzecoaches/janneke-van-den-brand", "redirect"),
    "/aart-smit/": ("/studiekeuzecoaches/aart-smit", "redirect"),
    "/angelina-muller/": ("/studiekeuzecoaches/angelina-muller", "redirect"),

    # The places.
    "/locaties/": ("/locaties", "keep"),

    # The company.
    "/over-ons/": ("/over-ons", "rebuild"),
    "/over-ons/veelgestelde-vragen/": ("/veelgestelde-vragen", "redirect"),
    "/ervaringen/": ("/ervaringen", "rebuild"),
    "/contact/": ("/contact", "rebuild"),
    "/vacatures/": ("/coach-worden", "redirect"),
    "/vacature-keuzecoach/": ("/coach-worden", "redirect"),
    "/vacature-keuzecoach-zwolle/": ("/coach-worden", "redirect"),
    "/vacature-keuzecoach-dordrecht/": ("/coach-worden", "redirect"),

    # Form landings.
    "/bedankpagina-aanvraag-studiekeuzeadvies/": ("/bedankt", "redirect"),
    "/bedankpagina-vrijblijvend-intakegesprek-inplannen/": ("/bedankt", "redirect"),
    "/bedankpagina-evaluatie-studiekeuzetraject/": ("", "drop"),
    "/evaluatie-studiekeuzetraject/": ("", "drop"),

    # Dead ends on the old site.
    "/assessment-op-school/": ("", "drop"),
    "/stedelijkgymnasium/": ("", "drop"),
    "/quiz/": ("", "drop"),
    "/quiz-gezondheid-aarde-en-milieu/": ("", "drop"),
    "/quiz-recht-bestuur-maatschappij/": ("", "drop"),
    "/quiz-techniek/": ("", "drop"),
}


def city_slug(path: str) -> str | None:
    if path in CITY_SPECIAL:
        return CITY_SPECIAL[path]
    match = re.match(r"^/locaties/([^/]+)/$", path)
    return match.group(1) if match else None


def resolve(path: str, record: dict, records: dict) -> tuple[str, str, str]:
    kind = record["kind"]

    # A URL the old site already redirects. There are 22 of them and they carry
    # link value from two or three rebrands ago, so they must survive the move.
    # Follow the old hop, then let the target's own rule decide where it lands:
    # that way a legacy redirect can never point somewhere the target does not.
    target = record.get("redirects_to")
    if target and target != path and target in records:
        # PAGE_MAP is where a decision is written down by hand, so it beats the
        # hop the old site happens to make. One row needs this, and todos.md
        # section 4 asks for it by name: /vacature-keuzecoach-dordrecht/ lands on
        # / on the old site, which is what WordPress does with a deleted vacancy,
        # not a choice. Its two sisters both go to /vacatures/. The reader on
        # that URL is a coach who looks for work, and the home page speaks to a
        # study chooser, so intent wins over the old hop.
        if path in PAGE_MAP:
            new, action = PAGE_MAP[path]
            return new, action, f"our own rule; the old site sends this to {target}"
        new, _, _ = resolve(target, records[target], records)
        return new, "redirect", f"the old site already redirects this to {target}"

    if kind == "date-archive":
        return "", "drop", "noindex on the old site"
    if kind == "dead":
        return "", "drop", "already 404 on the old site"
    if kind == "tag":
        return "/artikelen", "redirect", "the tag pages collapse into the hub"
    if kind == "taxonomy":
        if path.startswith("/category/"):
            return "/artikelen", "redirect", ""
        return "/tarieven", "redirect", "shop taxonomy; revisit with the price decision"
    if kind in ("product", "shop"):
        return "/tarieven", "redirect", "the price decision is open"
    if kind == "post":
        # DECIDED 2026-08-15: an article keeps its old root URL. An earlier
        # version of this line moved every post to /artikelen/<slug>, and
        # docs/rebuild-review.md section 5 still proposes that. It is the one URL
        # change that costs a redirect hop on the pages that rank, and
        # app/[artikel]/page.tsx already serves an article at /<slug>, so the
        # move buys nothing. /artikelen stays as the index page.
        # The action is "keep", not "redirect": the address does not change, and
        # a redirect from a URL to itself is a loop. A "keep" row is still work,
        # the article has to be imported into app/articles.ts. See
        # docs/redirects.md, "The articles".
        return f"/{path.strip('/').split('/')[-1]}", "keep", "the article keeps its root URL"

    if kind == "page":
        slug = city_slug(path)
        if slug:
            action = "keep" if path == f"/locaties/{slug}/" else "redirect"
            return f"/locaties/{slug}", action, ""
        if path in PAGE_MAP:
            new, action = PAGE_MAP[path]
            return new, action, ""
        return "", "REVIEW", "no rule yet"

    if kind == "attachment":
        parent = "/" + "/".join(path.strip("/").split("/")[:-1])
        parent = parent if parent.endswith("/") else parent + "/"
        parent = "/" if parent == "//" else parent
        if parent in records:
            new, _, _ = resolve(parent, records[parent], records)
            return new or "/", "redirect", "attachment to its parent"
        return "/", "redirect", "attachment, parent not crawled"

    if path in PAGE_MAP:
        new, action = PAGE_MAP[path]
        return new, action, ""
    return "", "REVIEW", "unclassified"


# ---------------------------------------------------------------------------
# The redirect table. Second output: app/redirects.ts, built from the rows above
# ---------------------------------------------------------------------------

# The file extensions next.config.ts lists in pageExtensions.
PAGE_FILES = {"page.ts", "page.tsx", "page.mdx"}

# A dynamic segment is only a real route for the slugs its data file holds.
# app/[artikel]/page.tsx serves an article at /<slug>, but only the articles in
# app/articles.ts exist today; the rest are still to import. Same for a city.
DYNAMIC_SEGMENTS = {
    "[artikel]": "app/articles.ts",
    "[stad]": "app/cities.ts",
}

# The fallback ladder. No redirect may land on a 404, and many targets in the
# map are pages nobody has written yet, so a target that does not exist falls
# back to the nearest page that does. Every line here is temporary: when the
# page appears, this script drops the fallback by itself on the next run.
FALLBACKS = {
    "/tarieven": "/studiekeuzetraject",       # the price is not decided yet
    "/onze-methode": "/studiekeuzetraject",   # blocked, see todos.md section 7
    "/coach-worden": "/studiekeuzecoaches",   # needs the answer for a freelance coach
    "/vacatures": "/studiekeuzecoaches",
    "/bedankt": "/",
}


def slugs_in(data_file: str) -> set[str]:
    """Read the slug of every entry in a data file like app/articles.ts."""
    text = (REPO / data_file).read_text()
    found = set(re.findall(r'^\s*slug:\s*"([^"]+)"', text, re.MULTILINE))
    if not found:
        raise SystemExit(f"No slugs found in {data_file}. Did the shape change?")
    return found


def app_routes() -> set[str]:
    """
    Every route a visitor can really reach today, read from the app directory.
    A dynamic segment is expanded with the slugs of its data file, so a city
    without an entry in app/cities.ts is not a route and cannot be a target.

    A route counts only when its page is on disk, so the ladder never trusts a
    promise. /ervaringen was the one exception while this table was written,
    because it was being built at the same time. Its page landed first, so the
    exception is gone.
    """
    routes = set()
    for page in (REPO / "app").rglob("page.*"):
        if page.name not in PAGE_FILES:
            continue
        segments = []
        for segment in page.relative_to(REPO / "app").parent.parts:
            if segment.startswith("(") and segment.endswith(")"):
                continue  # a route group is not part of the URL
            if segment.startswith("["):
                if segment not in DYNAMIC_SEGMENTS:
                    # Fail loudly. A route this script cannot expand is a route
                    # the ladder would quietly redirect away from.
                    raise SystemExit(f"Unknown dynamic segment {segment} in {page}")
                segments.append(sorted(slugs_in(DYNAMIC_SEGMENTS[segment])))
                continue
            segments.append([segment])
        for combination in itertools.product(*segments):
            routes.add("/" + "/".join(combination))
    return routes


def landing(target: str, routes: set[str], article_slugs: set[str]) -> tuple[str, str]:
    """
    Where a redirect really lands, and the target it stands in for.

    Returns (destination, waiting_for). `waiting_for` is empty when the target
    exists, and holds the target itself when a fallback was needed.
    """
    if target in routes:
        return target, ""
    if target in FALLBACKS:
        return FALLBACKS[target], target
    if target.startswith("/studiekeuzecoaches/"):
        return "/studiekeuzecoaches", target  # no page per coach yet, only an anchor
    if target.startswith("/locaties/"):
        return "/locaties", target            # a city without a coach has no page
    if target.startswith("/artikelen/") or target.strip("/") in article_slugs:
        return "/artikelen", target           # the article is not imported yet
    return "/", target


HEADER = '''/**
 * Every old URL of the WordPress site, and where it lands on this one.
 *
 * GENERATED FILE. Do not edit it by hand: `python3 scripts/build-url-map.py`
 * writes it from `docs/url-map.csv`, which resolves all {total} old URLs of the
 * archive. Change a rule in the script, or a decision in the map, and run the
 * script again. `next.config.ts` imports this array and makes every row a
 * permanent redirect, so Next answers with a 308 and the search engines move
 * the ranking to the new address. The old site goes offline in September 2026.
 *
 * The table lives here and not in `next.config.ts` because it is {count} rows
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

export type LegacyRedirect = {{
  /** The old path, without its trailing slash. */
  source: string;
  /** A path on this site that exists today. Never a 404. */
  destination: string;
}};

export const legacyRedirects: LegacyRedirect[] = [
'''


def write_redirects(rows: list[dict]) -> None:
    routes = app_routes()
    article_slugs = {row["old"].strip("/") for row in rows if row["kind"] == "post"}
    redirects = [row for row in rows if row["action"] == "redirect"]

    lines = []
    waiting = Counter()
    for row in sorted(redirects, key=lambda r: r["old"]):
        source = row["old"].rstrip("/")
        destination, waits_for = landing(row["new"], routes, article_slugs)
        comment = f" // waits for {waits_for}" if waits_for else ""
        lines.append(f'  {{ source: "{source}", destination: "{destination}" }},{comment}')
        if waits_for:
            waiting[waits_for] += 1

    out = REPO / "app" / "redirects.ts"
    header = HEADER.format(total=len(rows), count=len(redirects))
    out.write_text(header + "\n".join(lines) + "\n];\n")

    print(f"\n{len(redirects)} redirects written to {out.relative_to(REPO)}")
    print(f"  {len(redirects) - sum(waiting.values()):4d}  land on their own target")
    print(f"  {sum(waiting.values()):4d}  land on a fallback:")
    for target, count in sorted(waiting.items()):
        print(f"        {count:4d}  {target}")


def main() -> None:
    crawl = json.load(open(ARCHIVE / "meta" / "crawl.json"))
    inbound = json.load(open(ARCHIVE / "meta" / "editorial_inbound.json"))
    attachments = sitemap_paths("attachment-sitemap.xml")
    posts = sitemap_paths("post-sitemap.xml")
    pages = sitemap_paths("page-sitemap.xml")

    records = {}
    for url, record in crawl.items():
        path = to_path(url)
        final = to_path(record.get("final") or url)
        records[path] = {
            "kind": classify(path, record, attachments, posts, pages),
            "redirects_to": final if record.get("redirected") else None,
            "status": record.get("status"),
            "h1": record.get("h1", ""),
            # The crawl counts the menu and the footer too: about 118 words of
            # chrome on every page. Anything near 120 is an empty page.
            "real_words": max(0, record.get("words", 0) - 118),
            "inbound": inbound.get(url, 0),
        }

    rows = []
    for path in sorted(records):
        record = records[path]
        new, action, note = resolve(path, record, records)
        # A redirect from a URL to itself is a loop, and next.config.ts would
        # serve it as one. It happens when the old site redirects a URL to
        # another URL that we send back to where we started:
        # /locaties/gouda/ -> /gouda/ on the old site, and /gouda/ -> /locaties/gouda
        # here. The address does not change, so the row is a keep.
        if action == "redirect" and new == path.rstrip("/"):
            action = "keep"
            note = f"the new URL is the old URL; {note}" if note else "the new URL is the old URL"
        rows.append({
            "old": path,
            "kind": record["kind"],
            "status": record["status"],
            "real_words": record["real_words"],
            "editorial_inbound": record["inbound"],
            "h1": record["h1"],
            "new": new,
            "action": action,
            "note": note,
        })

    out = REPO / "docs" / "url-map.csv"
    with open(out, "w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)

    print(f"{len(rows)} rows written to {out.relative_to(REPO)}")
    for action, count in Counter(r["action"] for r in rows).most_common():
        print(f"  {count:4d}  {action}")
    unresolved = [r["old"] for r in rows if r["action"] == "REVIEW"]
    if unresolved:
        print("\nNo rule yet:")
        for path in unresolved:
            print(f"  {path}")

    write_redirects(rows)


if __name__ == "__main__":
    main()
