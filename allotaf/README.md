# AlloTaf — site et espace de pilotage

AlloTaf est une agence digitale et d’automatisation IA entre la France et le Maroc.
Ce dossier contient le site public et, à partir de la phase 3, l’espace administrateur (CRM).

Stack : Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4 et Zod.
Supabase arrive en phase 3.

## Démarrer en local

```bash
cd allotaf
npm install
cp .env.example .env.local   # facultatif en mode démo
npm run dev                  # http://localhost:3000
```

Autres commandes : `npm run build`, `npm start`, `npm run lint`.

Pour les tests de fumée Playwright, lancez d'abord `npm run build && npm start`,
puis, dans un second terminal : `node tests/smoke.cjs`.
Ils vérifient les pages, le responsive mobile et desktop, le menu mobile et les deux formulaires.

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil : problèmes résolus, 4 spécialités, méthode, avantages, contact, appel à l'action |
| `/solutions` | Vue d’ensemble des 4 spécialités |
| `/solutions/automatisation-ia` | Automatisation IA |
| `/solutions/sites-web` | Création de sites web |
| `/solutions/marketing-digital` | Marketing digital |
| `/solutions/solutions-metier` | Solutions métier |
| `/a-propos` | Modèle France–Maroc, engagements, cibles |
| `/contact` | Formulaire court et coordonnées |
| `/devis` | Formulaire de devis complet (`?service=site-web` pré-coche un besoin) |
| `/mentions-legales`, `/confidentialite` | Pages légales, à compléter |

## Où modifier quoi

- **Coordonnées, délai de réponse, mentions légales** : `lib/site.ts`. Une valeur `null` est masquée sur le site.
- **Textes des 4 spécialités** : `lib/services.ts`, qui alimente les pages services, les cartes et le pied de page.
- **Couleurs et typographie** : `app/globals.css`, bloc `@theme` (accent `#3b5bff`).
- **Champs et listes du formulaire de devis** : `lib/validation.ts`.

## Formulaires

- La validation est faite côté serveur (Zod) et les messages d’erreur sont en français. Les saisies sont conservées en cas d’erreur.
- Anti-spam : un champ piège invisible et un délai minimal de remplissage. Il n'y a ni captcha ni service externe.
- Enregistrement :
  - **Mode démo (actuel)** : les demandes vont dans `.data/leads.json`, un fichier ignoré par Git.
  - Sur un hébergeur en lecture seule, elles sont écrites dans les logs du serveur.
  - **Phase 3** : les demandes seront enregistrées dans Supabase.
- Si `RESEND_API_KEY` et `NOTIFY_EMAIL` sont définis, chaque demande vous est envoyée par e-mail.

## Règles de contenu

Le site ne contient ni client, ni témoignage, ni chiffre, ni certification inventés.
Le visuel de l’accueil est explicitement étiqueté « Exemple de scénario ».
