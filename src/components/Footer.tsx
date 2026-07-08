import Link from "next/link";
import { novedades } from "@/data/novedades";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  const ultimaVersion = novedades.find((v) => v.esUltima);

  return (
    <footer className="bg-[var(--color-forest)] text-[var(--color-cream)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-10 mb-10 border-b border-[var(--color-cream)]/10">
          <div>
            <p className="font-semibold text-[var(--color-cream)]">
              Recibí novedades de la Patagonia
            </p>
            <p className="text-sm text-[var(--color-cream)]/60 mt-0.5">
              Un email de vez en cuando, nada de spam.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4 max-w-xs">
            <Link href="/" className="flex items-center">
              <img
                src="/brand/op_03.svg"
                alt="Outdoor Patagonia"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-[var(--color-cream)]/60">
              Guía de naturaleza, cultura e historias del sur de Argentina y Chile.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-teal-light)]/50">
              Hecho en la Patagonia
            </p>
          </div>

          {/* Explorar */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-teal-light)]">
              Explorar
            </span>
            <nav className="flex flex-col gap-2.5 text-sm text-[var(--color-cream)]/60">
              <Link href="/articulos" className="hover:text-[var(--color-cream)] transition-colors">
                Artículos
              </Link>
              <Link
                href="/recursos-viaje-patagonia"
                className="hover:text-[var(--color-cream)] transition-colors"
              >
                Recursos de viaje
              </Link>
              <Link
                href="/mapa"
                className="hover:text-[var(--color-cream)] transition-colors"
              >
                Mapa
              </Link>
              <Link
                href="/arqueologia"
                className="hover:text-[var(--color-cream)] transition-colors"
              >
                Arqueología
              </Link>
              <Link
                href="/astronomia"
                className="hover:text-[var(--color-cream)] transition-colors"
              >
                Astronomía
              </Link>
            </nav>
          </div>

          {/* Proyecto */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-teal-light)]">
              Proyecto
            </span>
            <nav className="flex flex-col gap-2.5 text-sm text-[var(--color-cream)]/60">
              <Link
                href="/proyecto-patagonia"
                className="hover:text-[var(--color-cream)] transition-colors"
              >
                Sobre nosotros
              </Link>
              <Link
                href="/operadores"
                className="hover:text-[var(--color-cream)] transition-colors"
              >
                Operadores
              </Link>
              <Link
                href="/contacto"
                className="hover:text-[var(--color-cream)] transition-colors"
              >
                Contacto
              </Link>
            </nav>
          </div>

          {/* Novedades */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-teal-light)]">
              Sitio
            </span>
            <nav className="flex flex-col gap-2.5 text-sm text-[var(--color-cream)]/60">
              <Link
                href="/novedades"
                className="hover:text-[var(--color-cream)] transition-colors flex items-center gap-2"
              >
                Novedades
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
              Legal
            </span>
            <nav className="flex flex-col gap-2.5 text-sm text-[var(--color-cream)]/60">
              <Link
                href="/privacidad"
                className="hover:text-[var(--color-cream)] transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="hover:text-[var(--color-cream)] transition-colors"
              >
                Términos de uso
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--color-cream)]/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-[var(--color-cream)]/35">
          <span>© {new Date().getFullYear()} Outdoor Patagonia. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:text-[var(--color-cream)]/60 transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-[var(--color-cream)]/60 transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
