import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections";
import { Section } from "@/components/ui";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez AlloTaf pour toute question sur l’automatisation IA, la création de site web ou le marketing digital.",
};

export default function ContactPage() {
  const { email, phone, whatsapp, city } = site.contact;
  const channels = [
    email && { icon: Mail, label: "E-mail", value: email, href: `mailto:${email}` },
    phone && { icon: Phone, label: "Téléphone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    whatsapp && { icon: MessageCircle, label: "WhatsApp", value: "Écrire sur WhatsApp", href: `https://wa.me/${whatsapp}` },
    city && { icon: MapPin, label: "Localisation", value: city },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre activité."
        text={`Une question, un projet, une simple curiosité : écrivez-nous. Nous répondons sous ${site.responseDelay}.`}
      />
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-8">
            {channels.length > 0 && (
              <ul className="space-y-4">
                {channels.map((c) => (
                  <li key={c.label} className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <c.icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs text-muted">{c.label}</span>
                      {c.href ? (
                        <a href={c.href} className="font-medium hover:text-accent">
                          {c.value}
                        </a>
                      ) : (
                        <span className="font-medium">{c.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="rounded-3xl bg-mist p-7">
              <h2 className="text-lg font-semibold tracking-tight">Vous avez un projet précis ?</h2>
              <p className="mt-2 leading-relaxed text-muted">
                Le formulaire de devis nous permet de préparer une réponse plus complète dès le premier échange.
              </p>
              <a href="/devis" className="mt-4 inline-block font-medium text-accent underline-offset-4 hover:underline">
                Demander un devis →
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-line p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
