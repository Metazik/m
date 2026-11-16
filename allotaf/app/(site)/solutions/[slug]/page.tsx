import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckList, CtaBand, MethodSection, PageHero, ServiceGrid } from "@/components/sections";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { getService, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: service.metaTitle, description: service.metaDescription };
}

export default async function ServicePage({ params }: PageProps<"/solutions/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <PageHero eyebrow={service.name} title={service.heroTitle} text={service.heroText}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/devis?service=${service.key}`} size="lg" arrow>
            Demander un devis
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="ghost-dark">
            Poser une question
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Vous reconnaissez-vous ?"
            title="Les situations que nous réglons."
          />
          <ul className="divide-y divide-line border-y border-line">
            {service.pains.map((p) => (
              <li key={p} className="py-5 text-lg leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading eyebrow="Ce que nous mettons en place" title="Concrètement, nous livrons :" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.deliverables.map((d) => (
            <div key={d.title} className="rounded-3xl border border-line bg-white p-7">
              <h3 className="text-lg font-semibold tracking-tight">{d.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{d.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Exemples d’application"
          title="Ce que cela peut donner dans votre métier."
          text="Des exemples de mise en place possibles, à adapter à votre organisation."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {service.useCases.map((u) => (
            <div key={u.trade} className="rounded-3xl bg-ink p-7 text-white">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-light">{u.trade}</p>
              <p className="mt-4 leading-relaxed text-white/85">{u.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-3xl border border-line p-8 sm:p-10">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">Ce que vous y gagnez</p>
          <CheckList items={service.outcomes} />
        </div>
      </Section>

      <MethodSection tone="mist" />

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Questions fréquentes" title="Vos questions, nos réponses." />
          <div className="divide-y divide-line border-y border-line">
            {service.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-2xl leading-none text-muted transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading eyebrow="Nos autres solutions" title="Elles se combinent entre elles." />
        <div className="mt-12">
          <ServiceGrid exclude={service.slug} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
