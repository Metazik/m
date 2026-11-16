import Link from "next/link";
import {
  ArrowRight,
  Check,
  Globe,
  LayoutDashboard,
  Megaphone,
  Workflow,
} from "lucide-react";
import { ButtonLink, Eyebrow, Section, SectionHeading } from "./ui";
import { services, type Service } from "@/lib/services";
import { site } from "@/lib/site";

const icons = {
  workflow: Workflow,
  globe: Globe,
  megaphone: Megaphone,
  "layout-dashboard": LayoutDashboard,
} as const;

export function ServiceIcon({
  name,
  className,
}: {
  name: Service["icon"];
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden strokeWidth={1.6} />;
}

export function ServiceGrid({ exclude }: { exclude?: string }) {
  const list = services.filter((s) => s.slug !== exclude);
  return (
    <div
      className={
        "grid gap-px overflow-hidden rounded-3xl border border-line bg-line " +
        (list.length === 3 ? "lg:grid-cols-3" : "sm:grid-cols-2")
      }
    >
      {list.map((s, i) => (
        <Link
          key={s.slug}
          href={`/solutions/${s.slug}`}
          className="group relative flex flex-col bg-white p-8 transition-colors hover:bg-mist sm:p-10"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <ServiceIcon name={s.icon} className="h-6 w-6" />
            </span>
            <span className="font-mono text-xs text-muted">
              0{i + 1}
            </span>
          </div>
          <h3 className="mt-8 text-xl font-semibold tracking-tight">{s.name}</h3>
          <p className="mt-3 leading-relaxed text-muted">{s.short}</p>
          <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            En savoir plus
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>
      ))}
    </div>
  );
}

export const methodSteps = [
  {
    title: "Échange découverte",
    text: "Un appel de 30 minutes pour comprendre votre activité, vos outils et ce qui vous fait perdre du temps.",
  },
  {
    title: "Proposition claire",
    text: "Un devis écrit avec le périmètre, le planning et le prix. Pas de jargon, pas de surprise.",
  },
  {
    title: "Réalisation",
    text: "Nous construisons, vous validez à chaque étape. Un interlocuteur unique suit votre projet.",
  },
  {
    title: "Mise en service et suivi",
    text: "Nous vous formons, vérifions que tout fonctionne en conditions réelles et ajustons si besoin.",
  },
];

export function MethodSection({ tone = "light" }: { tone?: "light" | "mist" }) {
  return (
    <Section tone={tone} id="methode">
      <SectionHeading
        eyebrow="Notre méthode"
        title="Une démarche simple, en quatre étapes."
        text="Vous savez à chaque instant ce qui est fait, par qui, et pour quel prix."
      />
      <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {methodSteps.map((step, i) => (
          <li key={step.title} className="relative rounded-3xl border border-line bg-white p-7">
            <span className="font-mono text-sm text-accent">
              Étape {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function CheckList({
  items,
  dark,
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full " +
              (dark ? "bg-accent text-white" : "bg-accent-soft text-accent")
            }
          >
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
          <span className={dark ? "text-white/85" : "text-ink/85"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({
  title = "Parlons de votre entreprise.",
  text = `Décrivez votre besoin en quelques lignes. Nous revenons vers vous sous ${site.responseDelay} avec une première analyse, sans engagement.`,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Section tone="dark" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden />
      <div className="relative mx-auto max-w-3xl text-center">
        <Eyebrow dark>Devis gratuit</Eyebrow>
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-dark">
          {text}
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/devis" size="lg" arrow>
            Demander un devis
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="ghost-dark">
            Poser une question
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-3xl animate-rise">
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-dark sm:text-xl">
            {text}
          </p>
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>
    </section>
  );
}
