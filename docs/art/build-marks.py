"""Writes public/wordmark.svg, app/icon.svg, app/favicon.ico and
app/apple-icon.png from one source: Alegreya Sans Bold.

Re-run it if the mark ever changes, so the vector and the raster can never
disagree. It needs three packages and one font file that is not in this repo:

  python3 -m venv .venv && .venv/bin/pip install fonttools uharfbuzz pillow
  curl -L -o ~/AlegreyaSans-Bold.ttf \
    https://github.com/google/fonts/raw/main/ofl/alegreyasans/AlegreyaSans-Bold.ttf
  ALEGREYA_SANS_BOLD=~/AlegreyaSans-Bold.ttf .venv/bin/python docs/art/build-marks.py

docs/art/mark.py says why the font is fetched instead of committed. After a
run, LOOK at the four files before you trust them: `qlmanage -t -s 1200 -o .
app/icon.svg public/wordmark.svg` renders the two vectors, and the .ico is
worth opening at 16 pixels, which is the size that decides whether the mark
works at all.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mark import INK, OCHRE, TTF, bbox, num, path_for, upem  # noqa: E402
from PIL import Image, ImageDraw, ImageFont  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

WORDMARK = "StudieKeuzeAdvies"
INITIAL = "S"
# The S must survive 16 pixels. 0.78 of the tile was the largest step that kept
# both counters open when the 16 pixel frame was inspected on its own.
ICON_FIT = 0.78


def check(svg):
    """An SVG that does not parse renders as an error page, not as a mark, and
    a double hyphen inside an XML comment is enough to cause that. Ask the
    parser before writing the file, never after shipping it."""
    from xml.etree import ElementTree
    ElementTree.fromstring(svg)

# ---------------------------------------------------------------- wordmark ---
EM = 100.0                      # one em = 100 units, so the file reads easily
s = EM / upem
x0, y0, x1, y1 = bbox(WORDMARK, s)
w, h = x1 - x0, y1 - y0
d = path_for(WORDMARK, s, dx=-x0, dy=-y0)

svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {num(w)} {num(h)}" role="img" aria-label="StudieKeuzeAdvies">
  <title>StudieKeuzeAdvies</title>
  <!-- The site name in Alegreya Sans Bold, the one family this site uses, with
       the letters converted to paths so it draws the same where the webfont is
       not loaded. The three capitals keep the three words apart, and that is
       what carries the mark at small sizes. The ink is the ink token from
       app/globals.css, resolved from OKLCH to sRGB by docs/art/oklch.py;
       override `fill` for a paper version on a dark surface. The box is tight
       to the letters, so set a height and the width follows. -->
  <path fill="{INK}" d="{d}"/>
</svg>
"""
check(svg)
open(os.path.join(ROOT, "public/wordmark.svg"), "w").write(svg)
print(f"wordmark.svg  {w:.1f} x {h:.1f} units, ratio {w/h:.2f}, {len(svg)} bytes")

# -------------------------------------------------------------------- icon ---
TILE = 64.0
ix0, iy0, ix1, iy1 = bbox(INITIAL)
iw, ih = ix1 - ix0, iy1 - iy0
k = ICON_FIT * TILE / max(iw, ih)
dx = (TILE - iw * k) / 2 - ix0 * k
dy = (TILE - ih * k) / 2 - iy0 * k
di = path_for(INITIAL, k, dx=dx, dy=dy)

icon = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {num(TILE)} {num(TILE)}" role="img" aria-label="StudieKeuzeAdvies">
  <title>StudieKeuzeAdvies</title>
  <!-- A full wordmark turns to mud at 16 pixels, so the tab mark is the
       initial alone: ink on ochre, both from app/globals.css. The ochre runs
       edge to edge and the corners stay square, because every platform masks
       the shape it wants and a rounded corner would be masked twice. The S is
       Alegreya Sans Bold as paths at 78 percent of the tile, the largest step
       that keeps both counters open at 16 pixels. -->
  <rect width="{num(TILE)}" height="{num(TILE)}" fill="{OCHRE}"/>
  <path fill="{INK}" d="{di}"/>
</svg>
"""
check(icon)
open(os.path.join(ROOT, "app/icon.svg"), "w").write(icon)
print(f"icon.svg      {len(icon)} bytes")


# ------------------------------------------------------------- raster icon ---
def raster(px):
    """The same geometry as icon.svg, rasterised by FreeType from the same
    font file, so the .ico and the .svg cannot drift apart."""
    # RGBA, not RGB. Pillow writes each ICO frame as a PNG, and the ICO reader
    # in the Next.js image pipeline refuses a PNG frame that is not RGBA
    # ("The PNG is not in RGBA format"), so the build fails on app/favicon.ico.
    # The tile is opaque either way; only the channel count changes.
    tile = Image.new("RGBA", (px, px), OCHRE)
    dr = ImageDraw.Draw(tile)
    size = max(4, round(ICON_FIT * px * upem / max(iw, ih)))
    f = ImageFont.truetype(TTF, size)
    bb = dr.textbbox((0, 0), INITIAL, font=f)
    bw, bh = bb[2] - bb[0], bb[3] - bb[1]
    dr.text(((px - bw) / 2 - bb[0], (px - bh) / 2 - bb[1]), INITIAL, font=f, fill=INK)
    return tile


ICO_SIZES = [16, 32, 48, 64, 128, 256]
# Every size is drawn at its own size, never shrunk down from the 256. A 16
# pixel tile that FreeType drew at 16 pixels keeps the counters of the S open;
# the same tile resampled from 256 goes soft and the letter closes up.
frames = {p: raster(p) for p in ICO_SIZES}
frames[256].save(
    os.path.join(ROOT, "app/favicon.ico"),
    format="ICO",
    sizes=[(p, p) for p in ICO_SIZES],
    append_images=[frames[p] for p in ICO_SIZES if p != 256],
)
print("favicon.ico   sizes " + ", ".join(str(p) for p in ICO_SIZES))

raster(180).save(os.path.join(ROOT, "app/apple-icon.png"), format="PNG")
print("apple-icon.png 180x180")
