/**
 * Coordonnées et réglages publics d'AlloTaf.
 * Laisser une valeur à `null` la masque sur le site (et l'affiche « à compléter »
 * dans les mentions légales). Ne jamais mettre de secret ici : ce fichier est public.
 */
export const site = {
  name: "AlloTaf",
  brand: "ALLOTAF",
  tagline: "L’intelligence artificielle au service de votre entreprise.",
  description:
    "AlloTaf accompagne les entreprises françaises dans leur transformation digitale grâce à l’intelligence artificielle, l’automatisation et des solutions numériques accessibles.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    email: null as string | null, // ex. "contact@allotaf.fr"
    phone: null as string | null, // ex. "+33 6 00 00 00 00"
    whatsapp: null as string | null, // ex. "33600000000" (format international, sans +)
    city: null as string | null, // ex. "Lyon"
  },
  /** Délai de réponse affiché après une demande. Modifiable librement. */
  responseDelay: "48 h ouvrées",
  legal: {
    companyName: null as string | null,
    legalForm: null as string | null, // ex. "Micro-entreprise", "SASU"
    siret: null as string | null,
    address: null as string | null,
    publicationDirector: null as string | null,
    host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  },
} as const;

export const nav = [
  { href: "/solutions", label: "Nos solutions" },
  { href: "/solutions/automatisation-ia", label: "Automatisation IA" },
  { href: "/solutions/sites-web", label: "Sites web" },
  { href: "/solutions/marketing-digital", label: "Marketing digital" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;
