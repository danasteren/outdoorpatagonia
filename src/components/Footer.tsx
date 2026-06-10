import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-forest)] text-[var(--color-cream)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
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
          </div>

          {/* Links */}
          <div className="flex gap-12 flex-wrap">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-teal-light)]">
                Explorar
              </span>
              <nav className="flex flex-col gap-2.5 text-sm text-[var(--color-cream)]/60">
                <Link href="/" className="hover:text-[var(--color-cream)] transition-colors">
                  Artículos
                </Link>
                <Link href="/contacto" className="hover:text-[var(--color-cream)] transition-colors">
                  Contacto
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-teal-light)]">
                Proyecto
              </span>
              <nav className="flex flex-col gap-2.5 text-sm text-[var(--color-cream)]/60">
                <Link href="/privacidad" className="hover:text-[var(--color-cream)] transition-colors">
                  Privacidad
                </Link>
                <Link href="/terminos" className="hover:text-[var(--color-cream)] transition-colors">
                  Términos
                </Link>
              </nav>
            </div>
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
