import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-forest)] text-[var(--color-cream)] flex flex-col items-center justify-center px-6 text-center gap-6">
      <Compass size={40} strokeWidth={1} className="text-[var(--color-teal-light)] opacity-60" />
      <p className="text-sm uppercase tracking-widest text-[var(--color-teal-light)] font-medium">
        404
      </p>
      <h1
        className="text-4xl md:text-5xl font-bold"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Página no encontrada
      </h1>
      <p className="text-[var(--color-teal-light)] max-w-sm">
        Es posible que este artículo haya sido movido o ya no exista.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-cream)] border border-[var(--color-teal)] px-5 py-2.5 rounded-sm hover:bg-[var(--color-teal)] transition-colors"
      >
        <ArrowLeft size={15} strokeWidth={1.5} />
        Volver al inicio
      </Link>
    </div>
  );
}
