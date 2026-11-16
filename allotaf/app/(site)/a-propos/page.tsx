import type { Metadata } from "next";
import { CheckList, CtaBand, PageHero } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "AlloTaf est une agence digitale et d’automatisation IA entre la France et le Maroc, dédiée aux artisans et aux PME de services.",
};

const values = [
  {
    title: "La clarté",
    text: "Des devis écrits, des délais annoncés, des explications sans jargon. Vous savez toujours ce que vous payez.",
  },
  {
    title: "L’utilité",
    text: "Nous ne vendons pas de technologie pour la technologie. Chaque outil doit vous faire gagner du temps ou des clients.",
  },
  {
    title: "La simplicité",
    text: "Une première version simple qui fonctionne vaut mieux qu’un grand projet qui n’aboutit pas.",
  },
  {
    title: "L’honnêteté",
    text: "Si une solution ne vous apporte rien, nous vous le disons. Même si cela signifie ne pas travailler ensemble.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Rendre l’intelligence artificielle utile aux entreprises de terrain."
        text="AlloTaf est née d’un constat simple : les outils numériques et l’IA font gagner un temps considérable, mais ils restent souvent réservés aux grandes entreprises. Nous voulons les rendre accessibles aux artisans et aux PME."
      />

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Notre modèle"
            title="Pilotage en France, production au Maroc."
          />
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              La relation client, le conseil et la gestion de projet sont assurés depuis la France.
              Vous avez un interlocuteur unique, francophone, qui connaît les contraintes des
              entreprises françaises.
            </p>
            <p>
              La production (développement, automatisation, création de contenus) est réalisée en
              interne ou par des professionnels indépendants basés au Maroc, sélectionnés pour
              leurs compétences et encadrés par nos soins.
            </p>
            <p>
              Ce modèle nous permet de proposer des prestations soignées à des tarifs adaptés aux
              PME, avec des fuseaux horaires proches et une communication en français.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading eyebrow="Nos engagements" title="Ce qui guide notre travail." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl border border-line bg-white p-8">
              <h3 className="text-xl font-semibold tracking-tight">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Pour qui"
            title="Les entreprises que nous accompagnons."
            text="Nous travaillons en priorité avec les entreprises de services qui passent leurs journées sur le terrain."
          />
          <div className="rounded-3xl bg-ink p-8 text-white sm:p-10">
            <CheckList
              dark
              items={[
                "Plombiers et chauffagistes",
                "Installateurs HVAC et climatisation",
                "Entreprises de rénovation et du bâtiment",
                "Entreprises de nettoyage",
                "Autres entreprises de services aux particuliers et aux professionnels",
              ]}
            />
          </div>
        </div>
      </Section>

      <CtaBand title="Faisons connaissance." />
    </>
  );
}
