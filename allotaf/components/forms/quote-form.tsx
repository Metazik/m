"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitQuote } from "@/app/actions";
import {
  BUDGETS,
  SECTORS,
  SERVICE_KEYS,
  TIMELINES,
  type FormState,
} from "@/lib/validation";
import { buttonClass, cx } from "@/components/ui";
import {
  Consent,
  Field,
  FieldError,
  FormAlert,
  SpamGuard,
  errorProps,
  inputClass,
} from "./fields";

const initial: FormState = { status: "idle" };

function Fieldset({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={step > 1 ? "border-t border-line pt-8" : undefined}>
      <fieldset className="min-w-0">
        <legend className="float-left mb-6 flex w-full items-center gap-3 text-lg font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-mono text-xs text-white">
            {step}
          </span>
          {title}
        </legend>
        <div className="clear-both space-y-5">{children}</div>
      </fieldset>
    </div>
  );
}

export function QuoteForm({
  defaultService,
  responseDelay,
}: {
  defaultService?: string;
  responseDelay: string;
}) {
  const [state, action, pending] = useActionState(submitQuote, initial);
  const v = (k: string) => (state.values?.[k] as string | undefined) ?? undefined;
  const selected = (state.values?.services as string[] | undefined) ??
    (defaultService ? [defaultService] : []);

  if (state.status === "success") {
    return (
      <div role="status" className="py-4">
        <CheckCircle2 className="h-12 w-12 text-accent" strokeWidth={1.5} aria-hidden />
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">
          Merci, votre demande est bien reçue.
        </h2>
        <p className="mt-3 text-muted">
          Voici la suite :
        </p>
        <ol className="mt-6 space-y-4">
          {[
            `Nous étudions votre demande et revenons vers vous sous ${responseDelay}.`,
            "Nous convenons d’un court échange pour préciser votre besoin.",
            "Vous recevez une proposition écrite, claire et sans engagement.",
          ].map((t, i) => (
            <li key={t} className="flex gap-4">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <form action={action} className="relative space-y-8" noValidate>
      <SpamGuard />
      <FormAlert status={state.status} message={state.message} />

      <Fieldset step={1} title="Vos coordonnées">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nom et prénom" name="name" error={state.errors?.name}>
            <input {...errorProps("name", state.errors)} autoComplete="name" required defaultValue={v("name")} className={inputClass} />
          </Field>
          <Field label="Téléphone" name="phone" optional error={state.errors?.phone}>
            <input {...errorProps("phone", state.errors)} type="tel" autoComplete="tel" defaultValue={v("phone")} className={inputClass} />
          </Field>
        </div>
        <Field label="E-mail" name="email" error={state.errors?.email}>
          <input {...errorProps("email", state.errors)} type="email" autoComplete="email" required defaultValue={v("email")} className={inputClass} />
        </Field>
      </Fieldset>

      <Fieldset step={2} title="Votre entreprise">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nom de l’entreprise" name="company" error={state.errors?.company}>
            <input {...errorProps("company", state.errors)} autoComplete="organization" required defaultValue={v("company")} className={inputClass} />
          </Field>
          <Field label="Ville" name="city" optional error={state.errors?.city}>
            <input {...errorProps("city", state.errors)} autoComplete="address-level2" defaultValue={v("city")} className={inputClass} />
          </Field>
        </div>
        <Field label="Secteur d’activité" name="sector" error={state.errors?.sector}>
          <select {...errorProps("sector", state.errors)} required defaultValue={v("sector") ?? ""} className={inputClass}>
            <option value="" disabled>
              Choisir…
            </option>
            {SECTORS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </Fieldset>

      <Fieldset step={3} title="Votre besoin">
        <div>
          <p className="mb-3 text-sm font-medium" id="services-label">
            Qu’est-ce qui vous intéresse ?{" "}
            <span className="font-normal text-muted">Plusieurs choix possibles</span>
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="services-label">
            {SERVICE_KEYS.map(([value, label]) => (
              <label key={value} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="services"
                  value={value}
                  defaultChecked={selected.includes(value)}
                  className="peer sr-only"
                />
                <span
                  className={cx(
                    "inline-flex h-10 items-center rounded-full border border-line px-4 text-sm transition-colors",
                    "peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white",
                    "peer-focus-visible:ring-4 peer-focus-visible:ring-accent/25 hover:border-ink",
                  )}
                >
                  {label}
                </span>
              </label>
            ))}
          </div>
          <FieldError id="services-error" error={state.errors?.services} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Budget envisagé" name="budget" error={state.errors?.budget}>
            <select {...errorProps("budget", state.errors)} required defaultValue={v("budget") ?? ""} className={inputClass}>
              <option value="" disabled>
                Choisir…
              </option>
              {BUDGETS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Délai souhaité" name="timeline" error={state.errors?.timeline}>
            <select {...errorProps("timeline", state.errors)} required defaultValue={v("timeline") ?? ""} className={inputClass}>
              <option value="" disabled>
                Choisir…
              </option>
              {TIMELINES.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label="Décrivez votre projet"
          name="message"
          hint="Ce qui vous prend du temps aujourd’hui, les outils que vous utilisez, ce que vous aimeriez obtenir."
          error={state.errors?.message}
        >
          <textarea {...errorProps("message", state.errors)} rows={6} required defaultValue={v("message")} className={inputClass} />
        </Field>
      </Fieldset>

      <div className="space-y-6 border-t border-line pt-8">
        <Consent error={state.errors?.consent} defaultChecked={v("consent") === "on"} />
        <button type="submit" disabled={pending} className={buttonClass("primary", "lg") + " w-full"}>
          {pending ? "Envoi en cours…" : "Envoyer ma demande de devis"}
        </button>
        <p className="text-center text-xs text-muted">
          Gratuit et sans engagement. Vos informations ne sont jamais revendues.
        </p>
      </div>
    </form>
  );
}
