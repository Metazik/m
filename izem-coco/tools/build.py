#!/usr/bin/env python3
"""Construit izem-coco/index.html à partir de tools/source.html.

- Si assets/logo.jpg et assets/boite.png existent : conversion en WebP
  (largeur max 800 px) puis intégration en base64.
- Sinon : utilisation des visuels SVG provisoires du dossier tools/.

Usage : python3 izem-coco/tools/build.py
"""
import base64, io, re, sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
RACINE = ICI.parent
ASSETS = RACINE / "assets"


def webp_data_uri(chemin, qualite, transparent):
    from PIL import Image
    im = Image.open(chemin)
    im = im.convert("RGBA" if transparent else "RGB")
    if transparent:
        # recadre les bords transparents pour que la boîte occupe tout le cadre
        bbox = im.getchannel("A").getbbox()
        if bbox:
            im = im.crop(bbox)
    if im.width > 800:
        im = im.resize((800, round(im.height * 800 / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=qualite, method=6)
    b = buf.getvalue()
    return "data:image/webp;base64," + base64.b64encode(b).decode(), im.size, len(b)


def svg_data_uri(chemin):
    svg = re.sub(r">\s+<", "><", chemin.read_text(encoding="utf-8").strip())
    m = re.search(r'viewBox="0 0 (\d+) (\d+)"', svg)
    w, h = int(m.group(1)), int(m.group(2))
    return "data:image/svg+xml;base64," + base64.b64encode(svg.encode()).decode(), (800, round(800 * h / w)), len(svg)


def image(nom, svg, qualite, transparent):
    for ext in ([".png", ".webp"] if transparent else [".jpg", ".jpeg", ".png", ".webp"]):
        p = ASSETS / (nom + ext)
        if p.exists():
            uri, taille, poids = webp_data_uri(p, qualite, transparent)
            print(f"  {p.name} -> WebP {taille[0]}x{taille[1]}, {poids/1024:.1f} Ko")
            return uri, taille
    uri, taille, poids = svg_data_uri(ICI / svg)
    print(f"  {nom} introuvable dans assets/ -> visuel provisoire {svg}")
    return uri, taille


def main():
    html = (ICI / "source.html").read_text(encoding="utf-8")
    logo, _ = image("logo", "placeholder-logo.svg", 78, False)
    boite, (bw, bh) = image("boite", "placeholder-boite.svg", 80, True)
    html = html.replace("__LOGO__", logo).replace("__BOITE__", boite)
    html = html.replace('width="800" height="__BOITE_H__"', f'width="{bw}" height="{bh}"')
    sortie = RACINE / "index.html"
    sortie.write_text(html, encoding="utf-8")
    print(f"index.html : {len(html.encode())/1024:.1f} Ko")


if __name__ == "__main__":
    sys.exit(main())
