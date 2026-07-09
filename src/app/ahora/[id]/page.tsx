import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, MapPin } from "lucide-react";
import { Section, PageShell } from "@/components/layout";
import { getAhoraPostById } from "@/lib/ahora";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getAhoraPostById(id);
  if (!post) return {};

  const description = post.caption ?? "Un momento compartido en vivo desde la Patagonia.";
  return {
    title: "Patagonia Ahora — momento en vivo",
    description,
    alternates: { canonical: `https://outdoorpatagonia.com/ahora/${id}` },
    openGraph: {
      title: "Patagonia Ahora",
      description,
      url: `https://outdoorpatagonia.com/ahora/${id}`,
      // Para video no hay forma de generar un poster sin transcodificar en
      // servidor, así que cae al og-image default del sitio.
      images: post.media_type === "photo" ? [{ url: post.media_url }] : undefined,
    },
  };
}

export default async function AhoraDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getAhoraPostById(id);
  if (!post) notFound();

  const jsonLd =
    post.media_type === "photo"
      ? {
          "@context": "https://schema.org",
          "@type": "ImageObject",
          contentUrl: post.media_url,
          description: post.caption ?? "Momento desde la Patagonia",
          uploadDate: post.published_at,
        }
      : {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          contentUrl: post.media_url,
          name: "Patagonia Ahora",
          description: post.caption ?? "Momento desde la Patagonia",
          uploadDate: post.published_at,
        };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section spacing="md">
        <PageShell>
          <Link
            href="/ahora"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-teal transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Patagonia Ahora
          </Link>

          <div className="rounded-2xl overflow-hidden border border-border bg-black max-w-2xl mx-auto">
            {post.media_type === "video" ? (
              <video src={post.media_url} controls playsInline className="w-full" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.media_url}
                alt={post.caption ?? "Momento desde la Patagonia"}
                className="w-full"
              />
            )}
          </div>

          <div className="max-w-2xl mx-auto mt-4">
            <h1 className="text-xl font-medium mb-2">
              {post.caption ?? "Un momento desde la Patagonia"}
            </h1>
            {post.location_text && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {post.location_text}
              </p>
            )}
          </div>
        </PageShell>
      </Section>
    </div>
  );
}
