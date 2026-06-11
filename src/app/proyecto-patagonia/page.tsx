import type { Metadata } from "next";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Apoya Outdoor Patagonia",
  description:
    "Outdoor Patagonia es una plataforma independiente que explora la cultura, naturaleza, gastronomía, flora y fauna de la Patagonia. Con tu aporte seguimos creciendo.",
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
        Apoya Outdoor Patagonia
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
          <h2 className="text-xl font-semibold mb-4">Con tu aporte, fortalecemos Outdoor Patagonia</h2>
          <p>
            Outdoor Patagonia ha crecido como una plataforma independiente y sin patrocinadores,
            compartiendo la belleza y diversidad de la Patagonia de manera libre y accesible. Con tu
            donación, podemos seguir:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>
              <strong>Recorriendo más lugares</strong> para documentar su cultura y paisaje.
            </li>
            <li>
              <strong>Produciendo contenido detallado</strong> y de alta calidad para que más gente
              descubra la Patagonia.
            </li>
            <li>
              <strong>Promoviendo el respeto por la naturaleza</strong> y la preservación de
              ecosistemas frágiles.
            </li>
            <li>
              <strong>Impulsando proyectos comunitarios</strong> que apoyen el desarrollo local y la
              divulgación de conocimientos.
            </li>
          </ul>
          <p className="mt-4">
            Cada aporte, por pequeño que sea, hace una gran diferencia: nos ayuda a costear viajes
            de investigación, equipo para fotografías y videos, y tiempo de redacción y edición. De
            esta manera, podemos mantener el contenido a disposición de todos los amantes de la
            naturaleza y aventureros de corazón.
          </p>
        </section>

        <div className="flex justify-center pt-4">
          <a
            href="https://ko-fi.com/outdoorpatagonia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--color-terracotta)] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <Heart size={20} />
            Apoyar el proyecto
          </a>
        </div>
      </div>
    </div>
  );
}
