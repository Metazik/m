import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import {
  BUDGETS,
  SECTORS,
  SERVICE_KEYS,
  TIMELINES,
  labelOf,
  type ContactInput,
  type QuoteInput,
} from "./validation";

export type Lead =
  | ({ kind: "contact" } & Omit<ContactInput, "consent">)
  | ({ kind: "devis" } & Omit<QuoteInput, "consent">);

export type StoredLead = Lead & {
  id: string;
  createdAt: string;
  source: string;
};

/**
 * Enregistre une demande entrante.
 * Phase 2 (mode démo) : fichier local `.data/leads.json` (ignoré par Git).
 * Phase 3 : table Supabase `demandes` lorsque les clés sont configurées.
 */
export async function saveLead(lead: Lead, source: string): Promise<StoredLead> {
  const stored: StoredLead = {
    ...lead,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    source,
  };

  try {
    await appendToLocalFile(stored);
  } catch (err) {
    // Système de fichiers en lecture seule (ex. Vercel sans Supabase) :
    // la demande reste visible dans les logs du serveur pour ne pas être perdue.
    console.warn("[allotaf] Stockage local indisponible, demande journalisée :", err);
    console.info("[allotaf] DEMANDE", JSON.stringify(stored));
  }

  await notifyByEmail(stored).catch((err) =>
    console.error("[allotaf] Échec de la notification e-mail :", err),
  );

  return stored;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function appendToLocalFile(lead: StoredLead) {
  await mkdir(DATA_DIR, { recursive: true });
  let list: StoredLead[] = [];
  try {
    list = JSON.parse(await readFile(LEADS_FILE, "utf8"));
  } catch {
    list = [];
  }
  list.unshift(lead);
  await writeFile(LEADS_FILE, JSON.stringify(list, null, 2), "utf8");
}

export async function readLocalLeads(): Promise<StoredLead[]> {
  try {
    return JSON.parse(await readFile(LEADS_FILE, "utf8"));
  } catch {
    return [];
  }
}

/** Notification au fondateur via l'API Resend, uniquement si elle est configurée. */
async function notifyByEmail(lead: StoredLead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const from = process.env.RESEND_FROM ?? "AlloTaf <onboarding@resend.dev>";
  const subject =
    lead.kind === "devis"
      ? `Nouvelle demande de devis — ${lead.company}`
      : `Nouveau message — ${lead.name}`;

  const rows: [string, string | undefined][] = [
    ["Nom", lead.name],
    ["E-mail", lead.email],
    ["Téléphone", lead.phone],
  ];
  if (lead.kind === "devis") {
    rows.push(
      ["Entreprise", lead.company],
      ["Ville", lead.city],
      ["Secteur", labelOf(SECTORS, lead.sector)],
      ["Besoins", lead.services.map((s) => labelOf(SERVICE_KEYS, s)).join(", ")],
      ["Budget", labelOf(BUDGETS, lead.budget)],
      ["Délai", labelOf(TIMELINES, lead.timeline)],
    );
  }
  rows.push(["Page", lead.source]);

  const text =
    rows
      .filter(([, v]) => v)
      .map(([k, v]) => `${k} : ${v}`)
      .join("\n") + `\n\nMessage :\n${lead.message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], reply_to: lead.email, subject, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
