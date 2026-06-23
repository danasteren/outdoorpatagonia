import { headers } from "next/headers";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { HeaderShell, type AuthUser } from "./HeaderShell";


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

  return <HeaderShell lang={lang} user={authUser} />;
}
