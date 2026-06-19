import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Outdoor Patagonia",
  description:
    "Outdoor Patagonia es una plataforma independiente que explora la cultura, naturaleza, gastronomía, flora y fauna de la Patagonia argentina y chilena.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/proyecto-patagonia",
    languages: { en: "https://outdoorpatagonia.com/en/patagonia-project" },
  },
};

export default function ProyectoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-terracotta)] mb-2">
        El proyecto
      </p>
      <h1
        className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Sobre Outdoor Patagonia
      </h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-8">
        <p>
          En <strong>Outdoor Patagonia</strong>, exploramos y compartimos la majestuosidad de la
          Patagonia chilena y argentina, destacando su cultura, naturaleza, gastronomía, flora,
          fauna y mucho más. Nuestro objetivo es ofrecer contenido que inspire y conecte a personas
          de todo el mundo con esta región única.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-3">Nuestra misión</h2>
          <p>
            Nos dedicamos a <strong>descubrir, difundir y preservar la riqueza de la Patagonia</strong>{" "}
            mediante artículos, fotografías, guías y experiencias que exploran cada rincón de su
            geografía y sus tradiciones. Queremos inspirar la curiosidad y el respeto por este
            territorio, y compartir su esencia con personas de todas partes del mundo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">¿Sos operador turístico?</h2>
          <p>
            Si ofrecés servicios en la Patagonia — trekking, kayak, cabalgatas, excursiones, alojamiento u
            otras experiencias — podés sumar tu empresa al directorio de Outdoor Patagonia y llegar a
            viajeros que ya están planeando su viaje.
          </p>
        </section>

        <div className="flex justify-center pt-4">
          <Link
            href="/operadores"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--color-terracotta)] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Ver directorio de operadores
          </Link>
        </div>
      </div>
    </div>
  );
}
