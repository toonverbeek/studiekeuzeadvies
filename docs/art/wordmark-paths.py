"""Prints the two path definitions of public/wordmark.svg.

The wordmark is the site name in Bricolage Grotesque Bold, converted to
outlines, so it draws the same where no webfont is loaded (an <img> that points
at an SVG loads no font of ours). "studiekeuze" is one path in ink, "advies" is
the second one in violet, exactly as the client's nav writes the name.

It needs one package and one font file, neither of them in this repo:

  python3 -m venv .venv && .venv/bin/pip install fonttools
  curl -sL -o /tmp/bricolage-bold.ttf \
    "$(curl -sH 'User-Agent: Mozilla/4.0' \
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700' \
      | sed -n 's/.*url(\\([^)]*\\)).*/\\1/p')"
  BRICOLAGE_BOLD=/tmp/bricolage-bold.ttf .venv/bin/python docs/art/wordmark-paths.py

The font is fetched and not committed for the same reason the old Alegreya
build fetched its own: a licensed binary in the repo is a licence question on
every clone, and next/font already downloads the same family for the site.

Kerning is not applied. The name is seventeen lowercase letters of one width
class, Bricolage kerns none of those pairs, and the output was compared against
the browser at 200px before this line was written.
"""

import os
import sys

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont

TTF = os.environ.get("BRICOLAGE_BOLD")
if not TTF:
    sys.exit("Set BRICOLAGE_BOLD to the Bricolage Grotesque Bold ttf. See the docstring.")

WORD_INK = "studiekeuze"
WORD_VIOLET = "advies"

font = TTFont(TTF)
upem = font["head"].unitsPerEm
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
hmtx = font["hmtx"]

EM = 100.0  # one em is 100 units in the file, so the numbers read easily
scale = EM / upem


def run(text, x):
    """Draws `text` starting at pen position `x`. Returns the path and the new x."""
    pen = SVGPathPen(glyphs, ntos=lambda v: f"{v:.1f}")
    for char in text:
        name = cmap[ord(char)]
        # y is flipped: font space rises, SVG space falls.
        pen.moveTo  # noqa: B018  (SVGPathPen has no transform of its own)
        from fontTools.pens.transformPen import TransformPen

        tp = TransformPen(pen, (scale, 0, 0, -scale, x, EM * 0.78))
        glyphs[name].draw(tp)
        x += hmtx[name][0] * scale
    return pen.getCommands(), x


ink, x = run(WORD_INK, 0.0)
violet, x = run(WORD_VIOLET, x)

print(f"width: {x:.1f}")
print()
print("ink:", ink)
print()
print("violet:", violet)
