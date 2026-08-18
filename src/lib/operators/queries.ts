import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Operator, OperatorAdmin } from "./types";

// Columnas públicas: nunca incluir price_monthly / featured_until / notes acá,
// esas solo se leen desde el panel admin (getAllOperatorsAdmin).
const PUBLIC_COLUMNS =
  "id, name, slug, description, location, region, categories, website, phone, email, logo_url, is_featured, created_at";

export async function getAllOperators(): Promise<Operator[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("operators")
    .select(PUBLIC_COLUMNS)
    .order("is_featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("[operators] getAllOperators:", error.message);
    return [];
  }
  return (data ?? []) as unknown as Operator[];
}

export async function getOperatorBySlug(slug: string): Promise<Operator | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("operators")
    .select(PUBLIC_COLUMNS)
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as unknown as Operator;
}

// Solo para el panel admin — incluye precio y vencimiento del listing destacado.
export async function getAllOperatorsAdmin(): Promise<OperatorAdmin[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("operators")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("[operators] getAllOperatorsAdmin:", error.message);
    return [];
  }
  return (data ?? []) as OperatorAdmin[];
}
