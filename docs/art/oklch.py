"""OKLCH -> sRGB hex. The design tokens in app/globals.css are OKLCH, but an
SVG that must render in a browser tab, a WhatsApp preview and a Pillow raster
needs one plain hex. This script is the single place where that conversion
happens, so every mark uses the same numbers as the site."""
import math

M1 = [[0.8189330101, 0.3618667424, -0.1288597137],
      [0.0329845436, 0.9293118715, 0.0361456387],
      [0.0482003018, 0.2643662691, 0.6338517070]]
M2 = [[0.2104542553, 0.7936177850, -0.0040720468],
      [1.9779984951, -2.4285922050, 0.4505937099],
      [0.0259040371, 0.7827717662, -0.8086757660]]
XYZ_RGB = [[3.2409699419, -1.5373831776, -0.4986107603],
           [-0.9692436363, 1.8759675015, 0.0415550574],
           [0.0556300797, -0.2039769589, 1.0569715142]]

def mul(m, v):
    return [sum(m[i][j] * v[j] for j in range(3)) for i in range(3)]

def inv3(m):
    a, b, c = m[0]; d, e, f = m[1]; g, h, i = m[2]
    det = a*(e*i-f*h) - b*(d*i-f*g) + c*(d*h-e*g)
    return [[(e*i-f*h)/det, (c*h-b*i)/det, (b*f-c*e)/det],
            [(f*g-d*i)/det, (a*i-c*g)/det, (c*d-a*f)/det],
            [(d*h-e*g)/det, (b*g-a*h)/det, (a*e-b*d)/det]]

M1i, M2i = inv3(M1), inv3(M2)

def oklch_to_rgb(L, C, H):
    a = C * math.cos(math.radians(H))
    b = C * math.sin(math.radians(H))
    lms = mul(M2i, [L, a, b])
    xyz = mul(M1i, [x**3 for x in lms])
    lin = mul(XYZ_RGB, xyz)
    out = []
    clipped = False
    for v in lin:
        if v < -1e-4 or v > 1 + 1e-4:
            clipped = True
        v = min(1.0, max(0.0, v))
        s = 12.92*v if v <= 0.0031308 else 1.055*v**(1/2.4) - 0.055
        out.append(round(s*255))
    return out, clipped

def hexof(L, C, H):
    (r, g, b), clipped = oklch_to_rgb(L, C, H)
    return "#%02x%02x%02x" % (r, g, b), clipped

TOKENS = {
    "ochre":       (0.780, 0.145, 82),
    "ochre-deep":  (0.580, 0.125, 74),
    "ochre-line":  (0.700, 0.110, 80),
    "paper":       (0.965, 0.008, 82),
    "paper-shade": (0.935, 0.011, 82),
    "ink":         (0.220, 0.021, 82),
    "ink-soft":    (0.420, 0.020, 82),
    "hairline":    (0.840, 0.013, 82),
}

def relative_luminance(hx):
    r, g, b = (int(hx[i:i+2], 16)/255 for i in (1, 3, 5))
    f = lambda v: v/12.92 if v <= 0.04045 else ((v+0.055)/1.055)**2.4
    return 0.2126*f(r) + 0.7152*f(g) + 0.0722*f(b)

def contrast(a, b):
    la, lb = relative_luminance(a), relative_luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi+0.05)/(lo+0.05)

if __name__ == "__main__":
    hexes = {}
    for name, (L, C, H) in TOKENS.items():
        hx, clipped = hexof(L, C, H)
        hexes[name] = hx
        print(f"{name:12s} {hx}  {'CLIPPED' if clipped else 'in gamut'}")
    print()
    print("ink on ochre :", round(contrast(hexes['ink'], hexes['ochre']), 2))
    print("ink on paper :", round(contrast(hexes['ink'], hexes['paper']), 2))
    print("paper on ink :", round(contrast(hexes['paper'], hexes['ink']), 2))
    print("ochre-deep on paper:", round(contrast(hexes['ochre-deep'], hexes['paper']), 2))
