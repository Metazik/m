import { ButtonLink, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-xl py-10 text-center">
        <p className="font-mono text-sm text-accent">Erreur 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Cette page n’existe pas.</h1>
        <p className="mt-4 text-muted">Elle a peut-être été déplacée. Revenez à l’accueil pour continuer.</p>
        <ButtonLink href="/" className="mt-8" arrow>
          Retour à l’accueil
        </ButtonLink>
      </div>
    </Section>
  );
}
