"""Generate the RT. identity from shared vector geometry.

Authoring utility only: requires Python and Pillow, not used by the site or CI.
The committed assets are standalone and do not require fonts or remote services.
"""

from pathlib import Path
import io
import struct

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
BACKGROUND = "#101815"
FOREGROUND = "#F0EEE6"
CANVAS = 64
SCALE = 16

R_OUTER = [
    ("M", 8, 46), ("L", 8, 18), ("L", 18, 18),
    ("C", 25, 18, 29, 22, 29, 28),
    ("C", 29, 33, 26, 36, 22, 37),
    ("L", 31, 46), ("L", 24, 46), ("L", 16, 38),
    ("L", 14, 38), ("L", 14, 46), ("Z",),
]
R_COUNTER = [
    ("M", 14, 24), ("L", 14, 32), ("L", 18, 32),
    ("C", 21, 32, 23, 31, 23, 28),
    ("C", 23, 25, 21, 24, 18, 24), ("Z",),
]
T_SHAPE = [
    ("M", 30, 18), ("L", 49, 18), ("L", 49, 24),
    ("L", 42, 24), ("L", 42, 46), ("L", 36, 46),
    ("L", 36, 24), ("L", 30, 24), ("Z",),
]


def svg_path(commands):
    return " ".join(command[0] + " ".join(map(str, command[1:])) for command in commands)


def flatten(commands):
    """Sample cubic curves; PNG and SVG share the same outline coordinates."""
    points = []
    current = (0, 0)
    for command in commands:
        if command[0] in ("M", "L"):
            current = command[1:]
            points.append(current)
        elif command[0] == "C":
            start = current
            first = command[1:3]
            second = command[3:5]
            end = command[5:7]
            for step in range(1, 33):
                t = step / 32
                u = 1 - t
                points.append(tuple(
                    u**3 * start[axis] + 3 * u**2 * t * first[axis]
                    + 3 * u * t**2 * second[axis] + t**3 * end[axis]
                    for axis in (0, 1)
                ))
            current = end
    return [(x * SCALE, y * SCALE) for x, y in points]


def generate():
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <title>RT. — Rémi Tilmant</title>
  <rect width="64" height="64" fill="{BACKGROUND}"/>
  <g fill="{FOREGROUND}">
    <path fill-rule="evenodd" d="{svg_path(R_OUTER + R_COUNTER)}"/>
    <path d="{svg_path(T_SHAPE)}"/>
    <path d="M52 40h6v6h-6z"/>
  </g>
</svg>
'''
    (PUBLIC / "favicon.svg").write_text(svg, encoding="utf-8", newline="\n")
    master = Image.new("RGB", (CANVAS * SCALE, CANVAS * SCALE), BACKGROUND)
    draw = ImageDraw.Draw(master)
    draw.polygon(flatten(R_OUTER), fill=FOREGROUND)
    draw.polygon(flatten(R_COUNTER), fill=BACKGROUND)
    draw.polygon(flatten(T_SHAPE), fill=FOREGROUND)
    draw.rectangle((52 * SCALE, 40 * SCALE, 58 * SCALE - 1, 46 * SCALE - 1), fill=FOREGROUND)
    icons = {}
    for size in (16, 32, 48, 96, 180):
        icon = master.resize((size, size), Image.Resampling.LANCZOS)
        filename = "apple-touch-icon.png" if size == 180 else f"favicon-{size}x{size}.png"
        icon.save(PUBLIC / filename, optimize=True)
        icons[size] = icon

    # Explicit ICO entries preserve each raster size instead of relying on a viewer to resize.
    entries = []
    payloads = []
    offset = 6 + 16 * 3
    for size in (16, 32, 48):
        stream = io.BytesIO()
        icons[size].save(stream, format="PNG")
        payload = stream.getvalue()
        entries.append(struct.pack("<BBBBHHII", size, size, 0, 0, 1, 24, len(payload), offset))
        payloads.append(payload)
        offset += len(payload)
    (PUBLIC / "favicon.ico").write_bytes(struct.pack("<HHH", 0, 1, 3) + b"".join(entries + payloads))

    # Local review sheet; deliberately outside public/ and ignored by Git.
    sheet = Image.new("RGB", (760, 330), "#F0EEE6")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default(size=15)
    draw.text((28, 20), "RT. / favicon - native sizes", fill=BACKGROUND, font=font)
    for size, x in ((16, 30), (32, 120), (48, 220), (96, 340), (180, 520)):
        sheet.paste(icons[size], (x, 65))
        draw.text((x, 255), f"{size} x {size}", fill=BACKGROUND, font=font)
    sheet.save(ROOT / "preview-v2-favicons.png")
    print("Generated standalone SVG, PNG (16/32/48/96), ICO (16/32/48) and Apple icon (180).")


if __name__ == "__main__":
    generate()
