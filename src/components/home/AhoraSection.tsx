import Link from "next/link";
import { MapPin, ChevronRight, Radio } from "lucide-react";
import { Section, PageShell } from "@/components/layout";
import { getLatestAhoraPost } from "@/lib/ahora";

function timeAgo(dateStr: string): string {
  const minutes = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60_000);
  if (minutes < 2) return "ahora mismo";
  if (minutes < 60) return `hace ${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `hace ${hours}h`;
}

export async function AhoraSection() {
  const post = await getLatestAhoraPost();
  if (!post) return null;

  return (
    <Section spacing="sm" background="muted">
      <PageShell>
        <Link
          href={`/ahora/${post.id}`}
          className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border bg-card hover:border-teal transition-colors"
        >
          <div className="relative bg-black" style={{ aspectRatio: "4 / 3" }}>
            {post.media_type === "video" ? (
              <video
                src={post.media_url}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.media_url}
                alt={post.caption ?? "Momento desde la Patagonia"}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-teal-light)] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[var(--color-teal-light)]" />
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-teal flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" />
                Patagonia Ahora · {timeAgo(post.published_at)}
              </p>
            </div>
            {post.caption && (
              <p className="text-lg font-medium leading-snug mb-2">{post.caption}</p>
            )}
            {post.location_text && (
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {post.location_text}
              </p>
            )}
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal group-hover:gap-2 transition-all">
              Ver momento
              <ChevronRight size={15} />
            </span>
          </div>
        </Link>
      </PageShell>
    </Section>
  );
}
