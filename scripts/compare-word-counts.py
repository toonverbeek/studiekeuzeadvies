"""
Compare the body length of a new page with the same page on the old site.

Both sides are counted the same way: the chrome (menu, footer, intake form) is
subtracted, so the number is the words a reader actually reads. Run `npm run
build` first, because this reads the prerendered HTML.

    python3 scripts/compare-word-counts.py

Why this matters: the cleaning takes real text off every page. The old numbers
are what ranks today, so a page that loses half its body is a page to watch in
Search Console after the move. This is a thermometer, not a target.
"""

import json
import re
from html.parser import HTMLParser
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent


def find_archive() -> Path:
    """The archive sits next to the repo. Works from a worktree too."""
    for parent in [REPO, *REPO.parents]:
        candidate = parent.parent / "studiekeuzeadvies archive"
        if (candidate / "meta" / "crawl.json").exists():
            return candidate
    raise SystemExit("Cannot find '../studiekeuzeadvies archive'. See AGENTS.md.")


def find_build() -> Path:
    """
    The prerendered HTML of the last `npm run build`. A worktree has no
    node_modules of its own, so fall back to the build in the main checkout.
    """
    for parent in [REPO, *REPO.parents]:
        candidate = parent / ".next" / "server" / "app"
        if candidate.is_dir():
            return candidate
    raise SystemExit("No build found. Run `npm run build` first.")


ARCHIVE = find_archive()
BUILD = find_build()

# The crawl counted the old menu and footer on every page: about 118 words.
OLD_CHROME = 118

# new route -> old path in the archive
PAIRS = {
    "index": "/",
    "studiekeuzetraject": "/studiekeuzetraject/",
    "studiekeuzecoaches": "/studiekeuzecoaches/",
    "eerste-studiekeuze": "/eerste-studiekeuze/",
    "verkeerde-studiekeuze": "/verkeerde-studiekeuze/",
    "locaties": "/locaties/",
    "locaties/utrecht": "/locaties/utrecht/",
    "locaties/amersfoort": "/locaties/amersfoort/",
    "locaties/bergen-op-zoom": "/bergen-op-zoom/",
    "artikel-aanmelden-studies": "/artikel-aanmelden-studies/",
    "de-1-februariregeling": "/de-1-februariregeling/",
    "gestopt-met-je-studie-blijf-niet-stilzitten": "/gestopt-met-je-studie-blijf-niet-stilzitten/",
}


class Text(HTMLParser):
    """Visible text only: script, style, head and the chrome are skipped."""

    SKIP = {"script", "style", "head", "title", "noscript", "svg", "header", "footer"}

    def __init__(self) -> None:
        super().__init__()
        self.depth = 0
        self.parts: list[str] = []

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self.depth += 1

    def handle_endtag(self, tag):
        if tag in self.SKIP and self.depth:
            self.depth -= 1

    def handle_data(self, data):
        if not self.depth:
            self.parts.append(data)

    def words(self) -> int:
        return len(re.findall(r"\S+", " ".join(self.parts)))


def new_words(route: str) -> int | None:
    path = BUILD / f"{route}.html"
    if not path.exists():
        return None
    parser = Text()
    parser.feed(path.read_text(encoding="utf8"))
    return parser.words()


def main() -> None:
    crawl = json.load(open(ARCHIVE / "meta" / "crawl.json"))
    old = {}
    for url, record in crawl.items():
        path = re.sub(r"^https?://(www\.)?studiekeuzeadvies\.nl", "", url)
        old[path] = max(0, record.get("words", 0) - OLD_CHROME)

    print(f"{'page':46} {'old':>6} {'new':>6} {'change':>8}")
    print("-" * 70)
    for route, old_path in PAIRS.items():
        new = new_words(route)
        before = old.get(old_path)
        if new is None or before is None:
            print(f"{route:46} {'-':>6} {'-':>6} {'not built':>8}")
            continue
        change = f"{(new - before) / before * 100:+.0f}%" if before else "n/a"
        print(f"/{route:45} {before:6d} {new:6d} {change:>8}")


if __name__ == "__main__":
    main()
