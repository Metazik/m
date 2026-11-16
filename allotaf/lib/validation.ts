import { z } from "zod";

export const SECTORS = [
  ["plomberie", "Plomberie"],
  ["chauffage", "Chauffage"],
  ["hvac", "Climatisation / HVAC"],
  ["renovation", "Rénovation / bâtiment"],
  ["nettoyage", "Nettoyage"],
  ["services", "Autre entreprise de services"],
  ["autre", "Autre"],
] as const;

export const SERVICE_KEYS = [
  ["automatisation", "Automatisation IA"],
  ["site-web", "Site web"],
  ["marketing", "Marketing digital"],
  ["solution-metier", "Solution métier"],
  ["conseil", "Je ne sais pas encore"],
] as const;

export const BUDGETS = [
  ["moins-1000", "Moins de 1 000 €"],
  ["1000-3000", "1 000 € – 3 000 €"],
  ["3000-8000", "3 000 € – 8 000 €"],
  ["plus-8000", "Plus de 8 000 €"],
  ["inconnu", "Je ne sais pas encore"],
] as const;

export const TIMELINES = [
  ["urgent", "Dès que possible"],
  ["1-mois", "Dans le mois"],
  ["3-mois", "Dans les 3 mois"],
  ["reflexion", "Je me renseigne"],
] as const;

const values = <T extends readonly (readonly [string, string])[]>(list: T) =>
  list.map(([v]) => v) as unknown as [T[number][0], ...T[number][0][]];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `${max} caractères maximum.`)
    .optional()
    .transform((v) => (v ? v : undefined));

const phone = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => !v || /^[+\d][\d\s.\-()]{7,19}$/.test(v), "Numéro de téléphone invalide.");

const base = {
  name: z.string().trim().min(2, "Indiquez votre nom.").max(100),
  email: z.email("Adresse e-mail invalide.").trim().max(160),
  phone,
  consent: z.literal("on", { error: "Votre accord est nécessaire pour vous recontacter." }),
};

export const contactSchema = z.object({
  ...base,
  message: z
    .string()
    .trim()
    .min(10, "Décrivez votre demande en quelques mots.")
    .max(3000, "3 000 caractères maximum."),
});

export const quoteSchema = z.object({
  ...base,
  company: z.string().trim().min(2, "Indiquez le nom de votre entreprise.").max(120),
  city: optionalText(100),
  sector: z.enum(values(SECTORS), { error: "Choisissez votre secteur." }),
  services: z
    .array(z.enum(values(SERVICE_KEYS)))
    .min(1, "Choisissez au moins un besoin."),
  budget: z.enum(values(BUDGETS), { error: "Choisissez une fourchette." }),
  timeline: z.enum(values(TIMELINES), { error: "Choisissez un délai." }),
  message: z
    .string()
    .trim()
    .min(20, "Décrivez votre besoin en quelques phrases (20 caractères minimum).")
    .max(5000, "5 000 caractères maximum."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;
  /** Valeurs saisies, renvoyées pour ne rien perdre en cas d'erreur */
  values?: Record<string, string | string[]>;
};

export const labelOf = (
  list: readonly (readonly [string, string])[],
  value: string,
) => list.find(([v]) => v === value)?.[1] ?? value;
