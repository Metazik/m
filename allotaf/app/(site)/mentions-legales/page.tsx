import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales", robots: { index: false } };

const todo = (v: string | null) =>
  v ?? <span className="rounded bg-amber-100 px-1.5 text-amber-900">[à compléter]</span>;

export default function LegalPage() {
  const l = site.legal;
  return (
    <Section>
      <article className="mx-auto max-w-3xl space-y-8 leading-relaxed text-ink/85 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
        <h1 className="text-4xl font-semibold tracking-tight text-ink">Mentions légales</h1>
        <h2>Éditeur du site</h2>
        <p>
          Raison sociale : {todo(l.companyName)}
          <br />
          Forme juridique : {todo(l.legalForm)}
          <br />
          SIRET : {todo(l.siret)}
          <br />
          Adresse : {todo(l.address)}
          <br />
          E-mail : {todo(site.contact.email)}
          <br />
          Directeur de la publication : {todo(l.publicationDirector)}
        </p>
        <h2>Hébergement</h2>
        <p>{l.host}</p>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus de ce site (textes, visuels, logo) est la propriété d’AlloTaf, sauf
          mention contraire. Toute reproduction sans autorisation est interdite.
        </p>
        <h2>Données personnelles</h2>
        <p>
          Le traitement des données collectées via ce site est décrit dans la{" "}
          <a className="text-accent underline" href="/confidentialite">
            politique de confidentialité
          </a>
          .
        </p>
      </article>
    </Section>
  );
}
