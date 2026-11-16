"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ButtonLink, Container, cx } from "./ui";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/solutions" ? pathname === href : pathname.startsWith(href);

  return (
    <>
    <header
      className={cx(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line bg-white/90 backdrop-blur-md"
          : "border-transparent bg-white",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="AlloTaf, retour à l’accueil" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx(
                    "rounded-full px-3 py-2 text-sm transition-colors",
                    isActive(item.href)
                      ? "text-ink"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <ButtonLink href="/devis">Demander un devis</ButtonLink>
          </span>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>
    </header>

      {open && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-line bg-white lg:hidden"
        >
          <Container className="py-6">
            <ul className="flex flex-col">
              {[{ href: "/", label: "Accueil" }, ...nav].map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex py-4 text-lg font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/devis"
              size="lg"
              arrow
              className="mt-8 w-full"
              onClick={() => setOpen(false)}
            >
              Demander un devis
            </ButtonLink>
          </Container>
        </div>
      )}
    </>
  );
}
