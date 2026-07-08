import type { Metadata } from "next";
import { ScrollText } from "lucide-react";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Outdoor Patagonia",
  description: "Términos y condiciones de uso del sitio Outdoor Patagonia.",
  alternates: { canonical: "https://outdoorpatagonia.com/terminos" },
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        icon={ScrollText}
        eyebrow="Legal"
        title="Términos y Condiciones"
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Términos" }]}
        tone="muted"
      />
      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-8">
        <p>
          Bienvenido a <strong>Outdoor Patagonia</strong>. Al usar este sitio, aceptás cumplir con
          los siguientes términos.
        </p>

        <section>
          <h2 className="text-lg font-semibold mb-3">Uso del sitio</h2>
          <p>
            Podés usar este sitio para fines personales y no comerciales, siempre que respetes estos
            términos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Propiedad intelectual</h2>
          <p>
            Todo el contenido de este sitio —textos, fotografías, gráficos y logos— es propiedad de
            Outdoor Patagonia y está protegido por leyes de propiedad intelectual. Queda prohibida
            su reproducción sin autorización expresa.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Limitación de responsabilidad</h2>
          <p>
            Outdoor Patagonia no se hace responsable por daños derivados del uso de este sitio o de
            información publicada en él. El contenido es de carácter informativo y no reemplaza el
            asesoramiento profesional.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Enlaces externos</h2>
          <p>
            Este sitio puede contener enlaces a sitios de terceros. No nos hacemos responsables del
            contenido ni las prácticas de privacidad de esos sitios.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Modificaciones</h2>
          <p>
            Podemos actualizar estos términos en cualquier momento. Los cambios son efectivos desde
            su publicación en este sitio.
          </p>
        </section>

        <p>
          ¿Tenés alguna pregunta?{" "}
          <a
            href="mailto:info@outdoorpatagonia.com"
            className="text-[var(--color-teal)] hover:underline"
          >
            Escribinos
          </a>
          .
        </p>
        </div>
      </div>
    </div>
  );
}
