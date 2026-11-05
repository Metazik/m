# Izem Coco — site vitrine + commande

- `../index.html` (racine du dépôt) : la page finale, autonome, publiée par GitHub Pages sur izem.store.
- `tools/source.html` : la page source à modifier (textes, styles, prix).
- `tools/build.py` : régénère `index.html` à la racine.

## Mettre les vraies images
1. Dépose `assets/logo.jpg` (lion doré, fond noir) et `assets/boite.png` (boîte 1 kg, fond transparent).
2. Lance `python3 izem-coco/tools/build.py` (Pillow requis : `pip install pillow`).
   Les images sont converties en WebP (800 px max) et intégrées en base64.
   Sans ces fichiers, des visuels provisoires sont utilisés.

## À régler dans `tools/source.html`
- `PRIX_UNITAIRE` (haut du script) : prix d'une boîte en DH. Vide = prix masqué.
- Pixel Meta : bloc commenté « PIXEL META » dans le `<head>`.
