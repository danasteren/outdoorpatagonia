import { createClient } from "@/lib/supabase/server";
import type { Operator } from "./types";

export async function getAllOperators(): Promise<Operator[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("operators")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("[operators] getAllOperators:", error.message);
    return [];
  }
  return (data ?? []) as Operator[];
}

export async function getOperatorBySlug(slug: string): Promise<Operator | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("operators")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Operator;
}
