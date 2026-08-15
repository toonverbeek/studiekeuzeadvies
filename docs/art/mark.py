"""Working file. Shapes text with HarfBuzz and turns it into SVG path data.

Why: the wordmark must BE the site's type, not a hand copy of it that drifts.
Everything is read from the same Alegreya Sans that app/layout.tsx serves, and
HarfBuzz does the shaping, so the kerning matches what a browser does.

All coordinates come back in font units (1000 to the em for this family) unless
you pass a scale. y is flipped, so the result is SVG y-down.
"""
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.misc.transform import Transform
import uharfbuzz as hb

TTF = "/tmp/AlegreyaSans-Bold.ttf"

# app/globals.css keeps these in OKLCH. docs/art/oklch.py resolves them to sRGB,
# which is what an SVG in a browser tab and a PNG in a chat app both need.
INK, OCHRE, PAPER = "#1f1a0f", "#e5ad33", "#f6f3ed"

_font = TTFont(TTF)
upem = _font["head"].unitsPerEm
_gs = _font.getGlyphSet()

with open(TTF, "rb") as _fh:
    _blob = _fh.read()
_hb_font = hb.Font(hb.Face(_blob))


def num(v, n=2):
    """Short decimal. Keeps the generated path readable and the file small."""
    s = f"{round(v, n):.{n}f}".rstrip("0").rstrip(".")
    return "0" if s in ("", "-0") else s


def shape(text):
    """[(glyph_name, x_offset_in_font_units)], plus the total advance."""
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(_hb_font, buf, {"kern": True, "liga": True})
    out, x = [], 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        out.append((_hb_font.get_glyph_name(info.codepoint), x + pos.x_offset))
        x += pos.x_advance
    return out, x


def _each(text, scale, dx, dy):
    for name, xoff in shape(text)[0]:
        yield name, Transform(scale, 0, 0, -scale, dx + xoff * scale, dy)


def path_for(text, scale=1.0, dx=0.0, dy=0.0):
    """SVG path data for `text`, baseline at y = dy."""
    parts = []
    for name, t in _each(text, scale, dx, dy):
        pen = SVGPathPen(_gs, ntos=num)
        _gs[name].draw(TransformPen(pen, t))
        d = pen.getCommands()
        if d:
            parts.append(d)
    return " ".join(parts)


def bbox(text, scale=1.0, dx=0.0, dy=0.0):
    """Tight ink box (x0, y0, x1, y1) of the same drawing."""
    xs, ys = [], []
    for name, t in _each(text, scale, dx, dy):
        bp = BoundsPen(_gs)
        _gs[name].draw(TransformPen(bp, t))
        if bp.bounds:
            xs += [bp.bounds[0], bp.bounds[2]]
            ys += [bp.bounds[1], bp.bounds[3]]
    return min(xs), min(ys), max(xs), max(ys)
