import {
  Clock,
  Handshake,
  MapPin,
  PhoneMissed,
  Repeat,
  ShieldCheck,
  Target,
  Wallet,
  FileStack,
  Smartphone,
} from "lucide-react";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { CtaBand, MethodSection, ServiceGrid } from "@/components/sections";
import { FlowDemo } from "@/components/flow-demo";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/lib/site";

const problems = [
  {
    icon: PhoneMissed,
    title: "Des demandes perdues",
    text: "Appels manqués en intervention, messages lus trop tard : des clients partent chez un concurrent.",
  },
  {
    icon: FileStack,
    title: "L’administratif déborde",
    text: "Devis, relances, factures, ressaisies : le soir et le week-end y passent.",
  },
  {
    icon: Smartphone,
    title: "Une présence en ligne faible",
    text: "Pas de site, ou un site daté, et des réseaux sociaux qui ne sont jamais alimentés.",
  },
  {
    icon: Repeat,
    title: "Des outils qui ne se parlent pas",
    text: "Carnet, tableur, WhatsApp, e-mails : l’information est partout et nulle part.",
  },
];

const advantages = [
  {
    icon: Target,
    title: "Des solutions concrètes",
    text: "Nous partons de vos problèmes réels, pas d’une technologie à vendre.",
  },
  {
    icon: Wallet,
    title: "Un budget maîtrisé",
    text: "Des devis écrits, des outils à faible coût de fonctionnement, pas d’abonnement imposé.",
  },
  {
    icon: Handshake,
    title: "Un interlocuteur unique",
    text: "Un seul contact, francophone, qui suit votre projet du premier appel à la mise en service.",
  },
  {
    icon: Clock,
    title: "Du temps gagné",
    text: "Chaque projet vise un objectif simple : vous libérer des tâches qui n’ont pas besoin de vous.",
  },
  {
    icon: ShieldCheck,
    title: "Vos données protégées",
    text: "Principes du RGPD appliqués, accès limités, aucune donnée revendue.",
  },
  {
    icon: MapPin,
    title: "France et Maroc",
    text: "Pilotage commercial en France, production au Maroc, fuseaux horaires proches.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent/25 blur-[120px]"
          aria-hidden
        />
        <Container className="relative grid grid-cols-1 items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:py-32">
          <div className="animate-rise">
            <Eyebrow dark>Agence IA & digitale · France — Maroc</Eyebrow>
            <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
              Votre entreprise mérite de travailler{" "}
              <span className="text-accent">plus intelligemment.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-dark sm:text-xl">
              {site.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/solutions" size="lg" arrow>
                Découvrir nos solutions
              </ButtonLink>
              <ButtonLink href="/devis" size="lg" variant="ghost-dark">
                Demander un devis
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-muted-dark">
              Devis gratuit et sans engagement · Réponse sous {site.responseDelay}
            </p>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <FlowDemo />
          </div>
        </Container>
      </section>

      {/* PROBLÈMES */}
      <Section>
        <SectionHeading
          eyebrow="Ce que nous résolvons"
          title="Vous êtes excellent dans votre métier. Le reste vous prend trop de temps."
          text="Artisans, plombiers, chauffagistes, entreprises de rénovation, de nettoyage ou de services : ces situations vous parlent ?"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <div key={p.title} className="rounded-3xl border border-line p-7">
              <p.icon className="h-6 w-6 text-accent" strokeWidth={1.6} aria-hidden />
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SPÉCIALITÉS */}
      <Section tone="mist">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Nos spécialités"
            title="Quatre expertises, un seul objectif : votre efficacité."
          />
          <ButtonLink href="/solutions" variant="secondary" arrow className="self-start md:self-auto">
            Toutes nos solutions
          </ButtonLink>
        </div>
        <div className="mt-14">
          <ServiceGrid />
        </div>
      </Section>

      {/* MÉTHODE */}
      <MethodSection />

      {/* AVANTAGES */}
      <Section tone="dark">
        <SectionHeading
          dark
          eyebrow="Pourquoi AlloTaf"
          title="Pensé pour les PME, pas pour les grands groupes."
          text="Pas de projet surdimensionné ni de jargon : des outils utiles, livrés rapidement, à un prix lisible."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <div key={a.title} className="bg-ink p-8">
              <a.icon className="h-6 w-6 text-accent" strokeWidth={1.6} aria-hidden />
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-dark">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Une question ? Écrivez-nous."
              text={`Quelques lignes suffisent. Nous vous répondons sous ${site.responseDelay}, sans engagement.`}
            />
            <p className="mt-8 text-muted">
              Vous avez déjà un projet précis ?{" "}
              <a href="/devis" className="font-medium text-accent underline-offset-4 hover:underline">
                Demandez directement un devis
              </a>
              .
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
