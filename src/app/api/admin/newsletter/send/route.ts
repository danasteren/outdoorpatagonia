import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendNewsletterBatch } from "@/lib/newsletter/send";

const ADMIN_EMAIL = "danasteren@gmail.com";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { subject, bodyText }: { subject?: string; bodyText?: string } = await request.json();

  if (!subject?.trim() || !bodyText?.trim()) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: subscribers, error } = await admin
    .from("subscribers")
    .select("email, unsubscribe_token")
    .is("unsubscribed_at", null);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const recipients = (subscribers ?? []).map((s) => ({
    email: s.email as string,
    unsubscribeToken: s.unsubscribe_token as string,
  }));

  try {
    for (let i = 0; i < recipients.length; i += 100) {
      await sendNewsletterBatch({
        subject,
        bodyText,
        recipients: recipients.slice(i, i + 100),
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al enviar la campaña";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, sentCount: recipients.length });
}
