import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Outdoor Patagonia",
  description: "Have a question or suggestion? Get in touch with Outdoor Patagonia.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/en/contact",
    languages: { es: "https://outdoorpatagonia.com/contacto" },
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-terracotta)] mb-2">
        Contact
      </p>
      <h1
        className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        We'd love to hear from you
      </h1>
      <p className="text-muted-foreground mb-10 leading-relaxed">
        Have a question, suggestion or collaboration proposal? Send us a message and we'll get back
        to you shortly.
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
