"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/components/ui";

export const inputClass =
  "block w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-red-500";

export function Field({
  label,
  name,
  error,
  hint,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string[];
  hint?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-medium">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Facultatif</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      <FieldError id={`${name}-error`} error={error} />
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string[] }) {
  if (!error?.length) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-600">
      {error[0]}
    </p>
  );
}

export function errorProps(name: string, errors?: Record<string, string[] | undefined>) {
  const has = !!errors?.[name]?.length;
  return {
    id: name,
    name,
    "aria-invalid": has || undefined,
    "aria-describedby": has ? `${name}-error` : undefined,
  } as const;
}

/** Champs anti-spam : un piège invisible et l'heure d'affichage du formulaire. */
export function SpamGuard() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.value = String(Date.now());
  }, []);
  return (
    <>
      <input ref={ref} type="hidden" name="_t" defaultValue="" />
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label>
          Ne pas remplir
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}

export function Consent({ error, defaultChecked }: { error?: string[]; defaultChecked?: boolean }) {
  return (
    <div>
      <label className="flex gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent)]"
        />
        <span>
          J’accepte qu’AlloTaf utilise ces informations pour me recontacter au sujet de ma demande.
          Voir la{" "}
          <a href="/confidentialite" className="text-ink underline underline-offset-2">
            politique de confidentialité
          </a>
          .
        </span>
      </label>
      <FieldError id="consent-error" error={error} />
    </div>
  );
}

export function FormAlert({ status, message }: { status: string; message?: string }) {
  if (status !== "error" || !message) return null;
  return (
    <p role="alert" className={cx("rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700")}>
      {message}
    </p>
  );
}
