import { Bell, CalendarCheck, FileText, MessageCircle } from "lucide-react";

/**
 * Visuel d'illustration : un scénario d'automatisation type.
 * Ce ne sont PAS des données réelles — le libellé « Exemple de scénario » l'indique.
 */
const steps = [
  {
    icon: MessageCircle,
    label: "Nouvelle demande",
    detail: "Formulaire du site · 21:47",
    tag: "Reçue",
  },
  {
    icon: Bell,
    label: "Réponse envoyée au client",
    detail: "Demande de photo et d’adresse",
    tag: "Automatique",
  },
  {
    icon: FileText,
    label: "Demande qualifiée",
    detail: "Fuite · Urgence haute",
    tag: "Triée",
  },
  {
    icon: CalendarCheck,
    label: "Rappel programmé",
    detail: "Demain, 8:00",
    tag: "Planifié",
  },
];

export function FlowDemo() {
  return (
    <figure className="relative w-full rounded-3xl border border-ink-line bg-ink-soft/80 p-5 shadow-2xl shadow-black/40 backdrop-blur sm:p-6">
      <figcaption className="mb-5 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-dark">
          Exemple de scénario
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-dark">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" aria-hidden />
          Automatisation active
        </span>
      </figcaption>
      <ol className="relative space-y-3">
        <span
          className="absolute top-6 bottom-6 left-[1.6rem] w-px bg-gradient-to-b from-accent/70 via-ink-line to-ink-line"
          aria-hidden
        />
        {steps.map((s, i) => (
          <li
            key={s.label}
            className="relative flex animate-rise items-center gap-4 rounded-2xl border border-ink-line bg-ink p-3.5"
            style={{ animationDelay: `${200 + i * 140}ms` }}
          >
            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-soft text-white ring-1 ring-ink-line">
              <s.icon className="h-[18px] w-[18px]" strokeWidth={1.7} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-white">
                {s.label}
              </span>
              <span className="block truncate text-xs text-muted-dark">{s.detail}</span>
            </span>
            <span
              className={
                "shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider " +
                (i === 1 ? "bg-accent text-white" : "bg-ink-soft text-muted-dark ring-1 ring-ink-line")
              }
            >
              {s.tag}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
