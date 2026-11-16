import type { Metadata } from "next";
import { CheckList, CtaBand, MethodSection, PageHero, ServiceIcon } from "@/components/sections";
import { ButtonLink, Section } from "@/components/ui";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Nos solutions",
  description:
    "Automatisation IA, sites web professionnels, marketing digital et solutions métier pour les artisans et PME françaises.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos solutions"
        title="Quatre spécialités pour faire gagner du temps à votre entreprise."
        text="Nous ne proposons pas cinquante services. Nous nous concentrons sur ce qui a un impact direct sur le quotidien des artisans et des PME de services."
      >
        <ButtonLink href="/devis" size="lg" arrow>
          Demander un devis
        </ButtonLink>
      </PageHero>

      <Section>
        <div className="space-y-6">
          {services.map((s, i) => (
            <article
              key={s.slug}
              className="grid grid-cols-1 gap-8 rounded-3xl border border-line p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14"
            >
              <div>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <ServiceIcon name={s.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </div>
                <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">{s.name}</h2>
                <p className="mt-3 text-lg leading-relaxed text-muted">{s.short}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={`/solutions/${s.slug}`} variant="secondary" arrow>
                    Découvrir
                  </ButtonLink>
                  <ButtonLink href={`/devis?service=${s.key}`}>Demander un devis</ButtonLink>
                </div>
              </div>
              <div className="rounded-2xl bg-mist p-6 sm:p-8">
                <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  Ce que nous mettons en place
                </p>
                <CheckList items={s.deliverables.map((d) => d.title)} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <MethodSection tone="mist" />
      <CtaBand title="Vous ne savez pas par où commencer ?" text="Décrivez votre situation, nous vous indiquerons la solution la plus utile pour vous, même si c’est la plus simple." />
    </>
  );
}
