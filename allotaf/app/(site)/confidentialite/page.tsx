import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Politique de confidentialité", robots: { index: false } };

export default function PrivacyPage() {
  const email = site.contact.email;
  return (
    <Section>
      <article className="mx-auto max-w-3xl space-y-5 leading-relaxed text-ink/85 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
        <h1 className="text-4xl font-semibold tracking-tight text-ink">Politique de confidentialité</h1>
        <p>
          Cette page explique quelles données AlloTaf collecte via ce site, pourquoi, et comment
          exercer vos droits conformément au Règlement général sur la protection des données (RGPD).
        </p>
        <h2>Données collectées</h2>
        <p>
          Via les formulaires de contact et de demande de devis : nom, e-mail, téléphone
          (facultatif), entreprise, ville, secteur d’activité, description du besoin, budget et
          délai indicatifs.
        </p>
        <h2>Finalité et base légale</h2>
        <p>
          Ces données servent uniquement à répondre à votre demande et à assurer le suivi
          commercial qui en découle. Le traitement repose sur votre consentement, exprimé en
          cochant la case prévue dans le formulaire.
        </p>
        <h2>Destinataires</h2>
        <p>
          Les données sont accessibles à AlloTaf et, le cas échéant, aux prestataires techniques
          nécessaires au fonctionnement du site (hébergement, base de données, envoi d’e-mails).
          Elles ne sont jamais vendues ni cédées à des tiers à des fins commerciales.
        </p>
        <h2>Durée de conservation</h2>
        <p>
          Les données d’un prospect sont conservées au maximum trois ans après le dernier contact,
          puis supprimées.
        </p>
        <h2>Vos droits</h2>
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation,
          d’opposition et de portabilité. Pour l’exercer, écrivez à{" "}
          {email ? (
            <a className="text-accent underline" href={`mailto:${email}`}>
              {email}
            </a>
          ) : (
            <span className="rounded bg-amber-100 px-1.5 text-amber-900">[e-mail à compléter]</span>
          )}
          . Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).
        </p>
        <h2>Cookies</h2>
        <p>Ce site n’utilise pas de cookies publicitaires ni de traceurs de mesure d’audience.</p>
      </article>
    </Section>
  );
}
