import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ADMIN_EMAIL = "danasteren@gmail.com";

type PublishBody = {
  path: string;
  publicUrl: string;
  media_type: "photo" | "video";
  caption?: string;
  location_text?: string;
};

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { publicUrl, media_type, caption, location_text }: PublishBody = await request.json();

  if (!publicUrl || !media_type) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("ahora_posts")
    .insert({
      media_type,
      media_url: publicUrl,
      caption: caption?.trim() || null,
      location_text: location_text?.trim() || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "No pudimos publicar el momento" }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/ahora");

  return NextResponse.json({ id: data.id });
}
