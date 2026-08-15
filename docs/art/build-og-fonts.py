"""Working file for issue #8. Subsets Alegreya Sans for app/opengraph-image.tsx.

Why subset: next/og bundles the font with the route and the bundle has to stay
under 500 KB. The full family is 260 KB per weight. Why not subset to only the
letters in today's sentence: the copy will change, and a share image that
breaks on the next edit is a trap. The set below is every letter, digit and
mark a Dutch sentence can need.

Run:  /tmp/skavenv/bin/python docs/art/build-og-fonts.py
"""
import os
from fontTools import subset

ROOT = "/Users/toon/Dev/studiekeuzeadvies.nl"
OUT = os.path.join(ROOT, "app/fonts")

CHARS = (
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "abcdefghijklmnopqrstuvwxyz"
    "0123456789"
    " .,:;!?'\"()[]/&%+=@*#"
    "‘’“”–«»€"
    "àáâäçèéêë"
    "ìíîïñòóôö"
    "ùúûüÿĲĳ"
    "ÀÁÂÄÇÈÉÊË"
    "ÍÎÏÑÓÔÖÚÜ"
)

for weight, src in (("Bold", "/tmp/AlegreyaSans-Bold.ttf"),
                    ("Regular", "/tmp/AlegreyaSans-Regular.ttf")):
    dst = os.path.join(OUT, f"AlegreyaSans-{weight}-subset.ttf")
    subset.main([
        src,
        f"--text={CHARS}",
        # kern and liga keep the shaping identical to the browser; name and the
        # OFL notice must survive, because the licence travels with the font.
        "--layout-features=kern,liga,calt",
        "--name-IDs=*",
        "--no-hinting",
        "--desubroutinize",
        f"--output-file={dst}",
    ])
    print(f"{os.path.basename(dst):40s} {os.path.getsize(dst)/1024:6.1f} KB")
