import Link from "next/link";
import type { Metadata } from "next";
import { Radio, MapPin } from "lucide-react";
import { Section, PageShell } from "@/components/layout";
import { getAhoraArchive } from "@/lib/ahora";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Patagonia Ahora — momentos en vivo desde el terreno",
  description:
    "Fotos y videos cortos que Dana comparte en vivo mientras recorre la Patagonia. Cada momento dura 24hs en la portada y después pasa al archivo.",
  alternates: { canonical: "https://outdoorpatagonia.com/ahora" },
  openGraph: {
    title: "Patagonia Ahora",
    description: "Momentos en vivo desde el terreno en la Patagonia.",
    url: "https://outdoorpatagonia.com/ahora",
  },
};

function timeAgo(dateStr: string): string {
  const hours = Math.floor((Date.now() - new Date(dateStr).getTime()) / 3_600_000);
  if (hours < 1) return "hace instantes";
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `hace ${days}d`;
}

export default async function AhoraPage() {
  const posts = await getAhoraArchive();
  const [current, ...archive] = posts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Patagonia Ahora",
    description:
      "Fotos y videos cortos compartidos en vivo desde distintos puntos de la Patagonia.",
    url: "https://outdoorpatagonia.com/ahora",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section spacing="lg" background="forest">
        <PageShell>
          <div className="flex items-center gap-2 mb-3">
            <Radio className="w-5 h-5 text-teal-light" />
            <p className="text-xs font-bold uppercase tracking-widest text-teal-light">
              En vivo desde el terreno
            </p>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Patagonia Ahora
          </h1>
          <p className="text-lg opacity-80 max-w-2xl">
            Cada foto o video dura 24hs acá y después pasa al archivo de abajo. Es lo que Dana
            está viendo ahora mismo, recorriendo la Patagonia.
          </p>
        </PageShell>
      </Section>

      {current && (
        <Section spacing="md">
          <PageShell>
            <div className="grid md:grid-cols-2 gap-6 rounded-2xl overflow-hidden border border-border">
              <div className="relative bg-black" style={{ aspectRatio: "4 / 3" }}>
                {current.media_type === "video" ? (
                  <video
                    src={current.media_url}
                    controls
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={current.media_url}
                    alt={current.caption ?? "Momento actual desde la Patagonia"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-6 flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-widest text-teal mb-3">
                  {timeAgo(current.published_at)}
                </p>
                {current.caption && (
                  <p className="text-xl font-medium leading-snug mb-2">{current.caption}</p>
                )}
                {current.location_text && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {current.location_text}
                  </p>
                )}
              </div>
            </div>
          </PageShell>
        </Section>
      )}

      <Section spacing="md" background="muted">
        <PageShell>
          <h2 className="text-lg font-semibold mb-4">Archivo de momentos</h2>
          {archive.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Todavía no hay momentos archivados. Volvé pronto.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {archive.map((post) => (
                <Link
                  key={post.id}
                  href={`/ahora/${post.id}`}
                  className="group relative rounded-xl overflow-hidden border border-border bg-black"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  {post.media_type === "video" ? (
                    <video
                      src={post.media_url}
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.media_url}
                      alt={post.caption ?? "Momento archivado"}
                      className="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                    />
                  )}
                  <span className="absolute bottom-1.5 right-1.5 text-[10px] font-medium text-white/90 bg-black/50 rounded px-1.5 py-0.5">
                    {timeAgo(post.published_at)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </PageShell>
      </Section>
    </div>
  );
}
