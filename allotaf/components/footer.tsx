import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "./ui";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  const { email, phone, city } = site.contact;
  return (
    <footer className="bg-ink text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo dark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-dark">
            {site.tagline} Agence digitale et d’automatisation, pilotée en
            France, avec une équipe de production au Maroc.
          </p>
          {(email || phone || city) && (
            <ul className="mt-6 space-y-1.5 text-sm text-muted-dark">
              {email && (
                <li>
                  <a className="hover:text-white" href={`mailto:${email}`}>
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a className="hover:text-white" href={`tel:${phone.replace(/\s/g, "")}`}>
                    {phone}
                  </a>
                </li>
              )}
              {city && <li>{city}</li>}
            </ul>
          )}
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-dark">
            Solutions
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="text-white/80 hover:text-white" href={`/solutions/${s.slug}`}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-dark">
            AlloTaf
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ["/a-propos", "À propos"],
              ["/contact", "Contact"],
              ["/devis", "Demande de devis"],
              ["/mentions-legales", "Mentions légales"],
              ["/confidentialite", "Politique de confidentialité"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link className="text-white/80 hover:text-white" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-ink-line py-6 text-xs text-muted-dark sm:flex-row sm:justify-between">
        <p>© {year} AlloTaf. Tous droits réservés.</p>
        <p>France · Maroc</p>
      </Container>
    </footer>
  );
}
