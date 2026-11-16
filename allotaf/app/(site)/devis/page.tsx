import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/ui";
import { Eyebrow } from "@/components/ui";
import { CheckList } from "@/components/sections";
import { QuoteForm } from "@/components/forms/quote-form";
import { QuoteFormFromUrl } from "./quote-form-from-url";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Demande de devis",
  description: "Demandez un devis gratuit et sans engagement pour votre projet d’automatisation, de site web ou de marketing digital.",
};

export default function QuotePage() {
  return (
    <Section className="!pt-12 sm:!pt-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Demande de devis</Eyebrow>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Parlez-nous de votre projet.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Trois minutes suffisent. Plus votre description est précise, plus notre réponse sera utile.
          </p>
          <div className="mt-10 rounded-3xl bg-ink p-7 text-white">
            <CheckList
              dark
              items={[
                "Devis gratuit et sans engagement",
                `Réponse sous ${site.responseDelay}`,
                "Proposition écrite, prix clair",
                "Données utilisées uniquement pour vous répondre",
              ]}
            />
          </div>
        </aside>
        <div className="rounded-3xl border border-line p-6 sm:p-10">
          <Suspense fallback={<QuoteForm responseDelay={site.responseDelay} />}>
            <QuoteFormFromUrl responseDelay={site.responseDelay} />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
