import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendNewsletterBatch } from "@/lib/email";

const ADMIN_EMAIL = "danasteren@gmail.com";
const SITE_URL = "https://outdoorpatagonia.com";

type PublishBody = {
  path: string;
  publicUrl: string;
  media_type: "photo" | "video";
  caption?: string;
  location_text?: string;
};

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

async function notifySubscribers(admin: ReturnType<typeof createAdminClient>, postId: string) {
  try {
    const { data: activeSubscribers } = await admin
      .from("subscribers")
      .select("email, unsubscribe_token")
      .is("unsubscribed_at", null);

    const recipients = (activeSubscribers ?? []).map((s) => ({
      email: s.email,
      unsubscribeToken: s.unsubscribe_token,
    }));

    for (const batch of chunk(recipients, 100)) {
      await sendNewsletterBatch({
        subject: "📸 Nuevo momento en Patagonia",
        bodyText: `Dana acaba de compartir algo nuevo desde la Patagonia. Dura 24hs, no te lo pierdas:\n\n${SITE_URL}/ahora/${postId}`,
        recipients: batch,
      });
    }
  } catch (err) {
    // El aviso por newsletter nunca debe tirar abajo la publicación en sí.
    console.error("No se pudo notificar el nuevo momento por newsletter", err);
  }
}

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

  await notifySubscribers(admin, data.id);

  return NextResponse.json({ id: data.id });
}
