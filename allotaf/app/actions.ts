"use server";

import { z } from "zod";
import { contactSchema, quoteSchema, type FormState } from "@/lib/validation";
import { saveLead } from "@/lib/leads";

/** Délai minimal entre l'affichage et l'envoi : les robots remplissent instantanément. */
const MIN_FILL_MS = 2500;

function isSpam(formData: FormData) {
  if (formData.get("website")) return true; // champ piège invisible
  const started = Number(formData.get("_t"));
  return Number.isFinite(started) && started > 0 && Date.now() - started < MIN_FILL_MS;
}

function snapshot(formData: FormData) {
  const values: Record<string, string | string[]> = {};
  for (const key of new Set(formData.keys())) {
    if (key.startsWith("$") || key === "_t" || key === "website") continue;
    const all = formData.getAll(key).map(String);
    values[key] = key === "services" ? all : all[0];
  }
  return values;
}

const fakeSuccess: FormState = {
  status: "success",
  message: "Merci, votre message a bien été envoyé.",
};

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isSpam(formData)) return fakeSuccess;

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
    consent: formData.get("consent") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs sont à corriger.",
      errors: z.flattenError(parsed.error).fieldErrors,
      values: snapshot(formData),
    };
  }

  try {
    const { consent: _c, ...data } = parsed.data;
    void _c;
    await saveLead({ kind: "contact", ...data }, String(formData.get("_source") ?? "contact"));
  } catch (err) {
    console.error("[allotaf] submitContact", err);
    return {
      status: "error",
      message: "Une erreur technique est survenue. Merci de réessayer dans un instant.",
      values: snapshot(formData),
    };
  }

  return {
    status: "success",
    message: "Merci ! Votre message a bien été envoyé. Nous revenons vers vous rapidement.",
  };
}

export async function submitQuote(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isSpam(formData)) return fakeSuccess;

  const parsed = quoteSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    company: formData.get("company"),
    city: formData.get("city") || undefined,
    sector: formData.get("sector") || undefined,
    services: formData.getAll("services"),
    budget: formData.get("budget") || undefined,
    timeline: formData.get("timeline") || undefined,
    message: formData.get("message"),
    consent: formData.get("consent") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs sont à corriger.",
      errors: z.flattenError(parsed.error).fieldErrors,
      values: snapshot(formData),
    };
  }

  try {
    const { consent: _c, ...data } = parsed.data;
    void _c;
    await saveLead({ kind: "devis", ...data }, "devis");
  } catch (err) {
    console.error("[allotaf] submitQuote", err);
    return {
      status: "error",
      message: "Une erreur technique est survenue. Merci de réessayer dans un instant.",
      values: snapshot(formData),
    };
  }

  return {
    status: "success",
    message: "Votre demande de devis a bien été envoyée.",
  };
}
