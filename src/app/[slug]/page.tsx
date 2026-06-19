import { notFound, permanentRedirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { toCategorySlug } from "@/lib/category";

export default async function ArticleRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("category")
    .eq("slug", slug)
    .eq("language", "es")
    .eq("status", "published")
    .single();

  if (!data) notFound();

  const catSlug = toCategorySlug(data.category ?? "");
  if (catSlug === "recursos-descargables") permanentRedirect("/");

  permanentRedirect(`/${catSlug}/${slug}`);
}
