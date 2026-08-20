#!/usr/bin/env python3
"""Unpack a Claude Design export into plain HTML.

The client designs in Claude Design and exports one `*.dc.html` file per page.
Each file is a bundle: the page itself sits as a JSON string in a
`<script type="__bundler/template">`, and every font, image and script sits
base64-encoded (and usually gzip-compressed) in a `__bundler/manifest`. A
browser unpacks it on load. Nothing else can read it.

This script writes, for every bundle, a folder with:

- `index.html`, the page with every asset reference rewritten to `assets/`;
- `bundle.json`, the manifest as a table of uuid, file name and mime type;
- `assets/`, the images and any nested page (an iframe the page embeds).

Fonts, React, three.js and d3 are not written out, unless `--all` is given.
They are third-party libraries we do not commit; the page names the fonts and
the `ext_resources` in `bundle.json` name the CDN scripts.

Usage:
    python3 scripts/unpack-client-export.py <export dir> [<output dir>] [--all]

The committed reference lives in `docs/redesign/client/`. It was made from
`website-export-v2` (received 2026-08-20) with the defaults.
"""

import base64
import glob
import gzip
import json
import mimetypes
import os
import re
import sys

EXT = {
    "text/javascript": "js",
    "application/javascript": "js",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "font/woff2": "woff2",
    "text/html": "html",
    "text/css": "css",
}

KEEP_MIMES = ("image/", "text/html")


def slug(name: str) -> str:
    s = re.sub(r"\.dc\.html$|\.html$", "", name).lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def block(source: str, kind: str):
    m = re.search(
        r'<script type="__bundler/%s">(.*?)</script>' % re.escape(kind), source, re.S
    )
    return m.group(1).strip() if m else None


def unpack(path: str, out: str, keep_all: bool) -> str:
    source = open(path, encoding="utf-8").read()
    manifest = json.loads(block(source, "manifest") or "{}")
    ext_resources = json.loads(block(source, "ext_resources") or "[]")
    page_order = json.loads(block(source, "page_order") or "[]")
    template = json.loads(block(source, "template") or '""')

    folder = os.path.join(out, slug(os.path.basename(path)))
    os.makedirs(os.path.join(folder, "assets"), exist_ok=True)
    ext_by_uuid = {e["uuid"]: e["id"] for e in ext_resources}

    names = {}
    for uuid, entry in manifest.items():
        mime = entry.get("mime", "")
        ext = EXT.get(mime) or (mimetypes.guess_extension(mime) or ".bin").lstrip(".")
        if uuid in page_order:
            ext = "html"
            mime = "text/html"
        if uuid in ext_by_uuid:
            fname = "ext-" + re.sub(
                r"[^a-z0-9.]+", "-", ext_by_uuid[uuid].split("/")[-1].lower()
            )
        else:
            fname = f"{uuid}.{ext}"
        names[uuid] = {"file": fname, "mime": mime}
        if not keep_all and not mime.startswith(KEEP_MIMES):
            continue
        data = base64.b64decode(entry["data"])
        if str(entry.get("compressed")) == "True":
            data = gzip.decompress(data)
        open(os.path.join(folder, "assets", fname), "wb").write(data)

    # A nested page refers to the same uuids, so rewrite it as well.
    for uuid in page_order:
        p = os.path.join(folder, "assets", names[uuid]["file"])
        text = open(p, encoding="utf-8", errors="replace").read()
        for u, n in names.items():
            text = text.replace(u, n["file"])
        open(p, "w", encoding="utf-8").write(text)

    html = template
    for u, n in names.items():
        html = html.replace(f"about:blank#{u}", f"assets/{n['file']}")
        html = html.replace(u, f"assets/{n['file']}")
    open(os.path.join(folder, "index.html"), "w", encoding="utf-8").write(html)

    json.dump(
        {
            "source": os.path.basename(path),
            "ext_resources": ext_resources,
            "page_order": page_order,
            "assets": names,
        },
        open(os.path.join(folder, "bundle.json"), "w"),
        indent=1,
    )
    images = sum(1 for n in names.values() if n["mime"].startswith("image/"))
    return f"{slug(os.path.basename(path)):28} <- {os.path.basename(path):32} html={len(html):6} images={images} nested={page_order}"


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    keep_all = "--all" in sys.argv
    if not args:
        sys.exit(__doc__)
    src = args[0]
    out = args[1] if len(args) > 1 else "docs/redesign/client"
    for path in sorted(glob.glob(os.path.join(src, "*.html"))):
        print(unpack(path, out, keep_all))
    notes = os.path.join(src, "GESPREK.md")
    if os.path.exists(notes):
        os.makedirs(out, exist_ok=True)
        open(os.path.join(out, "GESPREK.md"), "w").write(open(notes).read())


if __name__ == "__main__":
    main()
