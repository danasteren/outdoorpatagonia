import { createClient } from "@supabase/supabase-js";

export type AhoraPost = {
  id: string;
  media_type: "photo" | "video";
  media_url: string;
  caption: string | null;
  location_text: string | null;
  published_at: string;
};

function client() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getLatestAhoraPost(): Promise<AhoraPost | null> {
  try {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data } = await client()
      .from("ahora_posts")
      .select("*")
      .gt("published_at", cutoff)
      .order("published_at", { ascending: false })
      .limit(1)
      .returns<AhoraPost[]>();
    return data?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function getAhoraArchive(limit = 60): Promise<AhoraPost[]> {
  try {
    const { data } = await client()
      .from("ahora_posts")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(limit)
      .returns<AhoraPost[]>();
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getAhoraPostById(id: string): Promise<AhoraPost | null> {
  try {
    const { data } = await client()
      .from("ahora_posts")
      .select("*")
      .eq("id", id)
      .maybeSingle<AhoraPost>();
    return data ?? null;
  } catch {
    return null;
  }
}
