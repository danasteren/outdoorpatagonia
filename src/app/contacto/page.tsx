import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto — Outdoor Patagonia",
  description:
    "¿Tenés una consulta, sugerencia o propuesta? Escribinos a Outdoor Patagonia.",
  alternates: { canonical: "https://outdoorpatagonia.com/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-terracotta)] mb-2">
        Contacto
      </p>
      <h1
        className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Nos interesa tu opinión
      </h1>
      <p className="text-muted-foreground mb-10 leading-relaxed">
        ¿Tenés una consulta, sugerencia o propuesta de colaboración? Mandanos un mensaje y te
        respondemos a la brevedad.
      </p>

      <a
        href="mailto:info@outdoorpatagonia.com"
        className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-border hover:border-[var(--color-teal)] hover:shadow-lg transition-all duration-200 group"
      >
        <Mail
          size={20}
          className="text-[var(--color-teal)] group-hover:scale-110 transition-transform"
        />
        <span className="font-medium text-foreground">info@outdoorpatagonia.com</span>
      </a>
    </div>
  );
}
