import Link from "next/link";
import { novedades } from "@/data/novedades";
import { NewsletterForm } from "@/components/NewsletterForm";

// Textos y links del footer. Las páginas que no existen en inglés llevan a la versión en español.
const T = {
  es: {
    home: "/",
    newsletterTitle: "Recibí novedades de la Patagonia",
    newsletterText: "Un email de vez en cuando, nada de spam.",
    tagline: "Guía de naturaleza, flora, fauna, arqueología, astronomía y mucho más del sur de Argentina y Chile.",
    madeIn: "Hecho en la Patagonia",
    explore: "Explorar",
    project: "Proyecto",
    site: "Sitio",
    legal: "Legal",
    exploreLinks: [
      { href: "/articulos", label: "Artículos" },
      { href: "/recursos-viaje-patagonia", label: "Recursos de viaje" },
      { href: "/mapa", label: "Mapa" },
      { href: "/arqueologia", label: "Arqueología" },
      { href: "/astronomia", label: "Astronomía" },
    ],
    projectLinks: [
      { href: "/proyecto-patagonia", label: "Sobre nosotros" },
      { href: "/operadores", label: "Operadores" },
      { href: "/contacto", label: "Contacto" },
    ],
    whatsNew: "Novedades",
    privacy: { href: "/privacidad", label: "Privacidad" },
    terms: { href: "/terminos", label: "Términos de uso", short: "Términos" },
    rights: "Todos los derechos reservados.",
  },
  en: {
    home: "/en",
    newsletterTitle: "Get news from Patagonia",
    newsletterText: "An email every now and then, no spam.",
    tagline: "A guide to the nature, flora, fauna, archaeology, astronomy and much more of southern Argentina and Chile.",
    madeIn: "Made in Patagonia",
    explore: "Explore",
    project: "Project",
    site: "Site",
    legal: "Legal",
    exploreLinks: [
      { href: "/en", label: "Articles" },
      { href: "/en/resources-traveling-patagonia", label: "Travel resources" },
      { href: "/en/guides", label: "Travel guides" },
      { href: "/mapa", label: "Map" },
      { href: "/astronomia", label: "Astronomy" },
    ],
    projectLinks: [
      { href: "/en/patagonia-project", label: "About us" },
      { href: "/operadores", label: "Tour operators" },
      { href: "/en/contact", label: "Contact" },
    ],
    whatsNew: "What's new",
    privacy: { href: "/en/privacy", label: "Privacy" },
    terms: { href: "/en/terms", label: "Terms of use", short: "Terms" },
    rights: "All rights reserved.",
  },
};

export function Footer({ lang = "es" }: { lang?: "es" | "en" }) {
  const ultimaVersion = novedades.find((v) => v.esUltima);
  const t = T[lang];

  return (
    <footer className="bg-[var(--color-forest)] text-[var(--color-cream)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-10 mb-10 border-b border-[var(--color-cream)]/10">
          <div>
            <p className="font-semibold text-[var(--color-cream)]">
              {t.newsletterTitle}
            </p>
            <p className="text-sm text-[var(--color-cream)]/60 mt-0.5">
              {t.newsletterText}
            </p>
          </div>
          <NewsletterForm lang={lang} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4 max-w-xs">
            <Link href={t.home} className="flex items-center">
              <img
                src="/brand/op_03.svg"
                alt="Outdoor Patagonia"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-[var(--color-cream)]/60">
              {t.tagline}
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-teal-light)]/50">
              {t.madeIn}
            </p>
          </div>

          {/* Explorar */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-teal-light)]">
              {t.explore}
            </span>
            <nav className="flex flex-col gap-2.5 text-sm text-[var(--color-cream)]/60">
              {t.exploreLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="hover:text-[var(--color-cream)] transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Proyecto */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-teal-light)]">
              {t.project}
            </span>
            <nav className="flex flex-col gap-2.5 text-sm text-[var(--color-cream)]/60">
              {t.projectLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="hover:text-[var(--color-cream)] transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Novedades */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-teal-light)]">
              {t.site}
            </span>
            <nav className="flex flex-col gap-2.5 text-sm text-[var(--color-cream)]/60">
              <Link
                href="/novedades"
                className="hover:text-[var(--color-cream)] transition-colors flex items-center gap-2"
              >
                {t.whatsNew}
                {ultimaVersion && (
                  <span className="text-[9px] font-bold bg-[var(--color-teal-light)]/20 text-[var(--color-teal-light)] px-1.5 py-0.5 rounded">
                    V{ultimaVersion.numero}
                  </span>
                )}
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-teal-light)]">
              {t.legal}
            </span>
            <nav className="flex flex-col gap-2.5 text-sm text-[var(--color-cream)]/60">
              <Link href={t.privacy.href} className="hover:text-[var(--color-cream)] transition-colors">
                {t.privacy.label}
              </Link>
              <Link href={t.terms.href} className="hover:text-[var(--color-cream)] transition-colors">
                {t.terms.label}
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--color-cream)]/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-[var(--color-cream)]/35">
          <span>© 2023-{new Date().getFullYear()} Outdoor Patagonia. {t.rights}</span>
          <div className="flex gap-4">
            <Link href={t.privacy.href} className="hover:text-[var(--color-cream)]/60 transition-colors">
              {t.privacy.label}
            </Link>
            <Link href={t.terms.href} className="hover:text-[var(--color-cream)]/60 transition-colors">
              {t.terms.short}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
