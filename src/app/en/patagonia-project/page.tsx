import type { Metadata } from "next";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Support Outdoor Patagonia",
  description:
    "Outdoor Patagonia is an independent platform exploring the culture, nature, gastronomy, flora and fauna of Patagonia. Your support helps us keep growing.",
  alternates: {
    canonical: "https://outdoorpatagonia.com/en/patagonia-project",
    languages: { es: "https://outdoorpatagonia.com/proyecto-patagonia" },
  },
};

export default function PatagoniaProjectPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-terracotta)] mb-2">
        The project
      </p>
      <h1
        className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Support Outdoor Patagonia
      </h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-8">
        <p>
          At <strong>Outdoor Patagonia</strong>, we explore and share the majesty of Chilean and
          Argentine Patagonia — its culture, nature, gastronomy, flora, fauna and much more. Our
          goal is to offer content that inspires and connects people from around the world with this
          unique region.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-3">Our mission</h2>
          <p>
            We are dedicated to <strong>discovering, sharing and preserving the richness of Patagonia</strong>{" "}
            through articles, photographs, guides and experiences that explore every corner of its
            geography and traditions. We want to inspire curiosity and respect for this territory,
            and share its essence with people from all over the world.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">With your support, we strengthen Outdoor Patagonia</h2>
          <p>
            Outdoor Patagonia has grown as an independent platform without sponsors, sharing the
            beauty and diversity of Patagonia freely and accessibly. With your donation, we can
            continue:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>
              <strong>Exploring more places</strong> to document their culture and landscape.
            </li>
            <li>
              <strong>Producing detailed, high-quality content</strong> so more people can discover
              Patagonia.
            </li>
            <li>
              <strong>Promoting respect for nature</strong> and the preservation of fragile
              ecosystems.
            </li>
            <li>
              <strong>Supporting community projects</strong> that foster local development and the
              sharing of knowledge.
            </li>
          </ul>
          <p className="mt-4">
            Every contribution, however small, makes a big difference: it helps us cover research
            trips, photography and video equipment, and writing and editing time. This way, we can
            keep our content available to all nature lovers and adventurers at heart.
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
            Support the project
          </a>
        </div>
      </div>
    </div>
  );
}
