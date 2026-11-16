"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitContact } from "@/app/actions";
import type { FormState } from "@/lib/validation";
import { buttonClass } from "@/components/ui";
import { Consent, Field, FormAlert, SpamGuard, errorProps, inputClass } from "./fields";

const initial: FormState = { status: "idle" };

export function ContactForm({ source = "contact" }: { source?: string }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const v = (k: string) => (state.values?.[k] as string | undefined) ?? undefined;

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <CheckCircle2 className="h-10 w-10 text-accent" strokeWidth={1.6} aria-hidden />
        <p className="text-xl font-semibold tracking-tight">Message envoyé</p>
        <p className="text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="relative space-y-5" noValidate>
      <SpamGuard />
      <input type="hidden" name="_source" value={source} />
      <FormAlert status={state.status} message={state.message} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" name="name" error={state.errors?.name}>
          <input {...errorProps("name", state.errors)} autoComplete="name" required defaultValue={v("name")} className={inputClass} />
        </Field>
        <Field label="Téléphone" name="phone" optional error={state.errors?.phone}>
          <input {...errorProps("phone", state.errors)} type="tel" autoComplete="tel" defaultValue={v("phone")} className={inputClass} />
        </Field>
      </div>
      <Field label="E-mail" name="email" error={state.errors?.email}>
        <input {...errorProps("email", state.errors)} type="email" autoComplete="email" required defaultValue={v("email")} className={inputClass} />
      </Field>
      <Field label="Votre message" name="message" error={state.errors?.message}>
        <textarea {...errorProps("message", state.errors)} rows={5} required defaultValue={v("message")} className={inputClass} />
      </Field>
      <Consent error={state.errors?.consent} defaultChecked={v("consent") === "on"} />
      <button type="submit" disabled={pending} className={buttonClass("primary", "lg") + " w-full sm:w-auto"}>
        {pending ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}
