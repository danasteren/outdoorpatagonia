import { headers } from "next/headers";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { toCategorySlug } from "@/lib/category";
import { HeaderShell, type AuthUser } from "./HeaderShell";
import type { SearchItem } from "@/lib/search/types";


export async function Header() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const lang = pathname.startsWith("/en") ? "en" : "es";

  const supabase = await createServerClient();
  const { data: { user: rawUser } } = await supabase.auth.getUser();

  const authUser: AuthUser = rawUser ? {
    name: (rawUser.user_metadata?.full_name as string | undefined) ?? rawUser.email ?? 'Usuario',
    email: rawUser.email ?? '',
    avatarUrl: (rawUser.user_metadata?.avatar_url as string | undefined) ?? null,
  } : null;

  const { data: articles } = await supabase
    .from('articles')
    .select('title, excerpt, category, slug')
    .eq('language', lang)
    .eq('status', 'published')

  const articleItems: SearchItem[] = (articles ?? []).map((a) => {
    const catSlug = a.category ? toCategorySlug(a.category) : ''
    return {
      type: 'articulo' as const,
      title: a.title,
      description: a.excerpt ?? '',
      href: lang === 'en' ? `/en/${catSlug}/${a.slug}` : `/${catSlug}/${a.slug}`,
      meta: a.category ?? undefined,
    }
  })

  return <HeaderShell lang={lang} user={authUser} articleItems={articleItems} />;
}
