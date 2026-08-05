"""
Generate docs/url-map.csv: one row per old URL, with the proposed new URL.

Reads the archive crawl at ../studiekeuzeadvies archive/meta/crawl.json and
applies the rules written down in docs/rebuild-review.md, section "The new URL
structure". Re-run it after you change a rule, or after you re-run crawl.py.

    python3 scripts/build-url-map.py

Every rule here is a starting point, not a decision. The keep / redirect / drop
column needs Search Console data before it is final. See todos.md, section 2.
"""

import csv
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
        return f"/artikelen/{path.strip('/').split('/')[-1]}", "redirect", "posts move under the hub"

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


if __name__ == "__main__":
    main()
