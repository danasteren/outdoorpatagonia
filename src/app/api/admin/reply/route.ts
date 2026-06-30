import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendReplyEmail } from "@/lib/email";

const ADMIN_EMAIL = "danasteren@gmail.com";

type ReplyBody = {
  source: "contact" | "operator";
  id: string;
  to: string;
  subject: string;
  body: string;
};

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { source, id, to, subject, body }: ReplyBody = await request.json();

  if (!source || !id || !to || !subject || !body) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  try {
    await sendReplyEmail({ to, subject, body });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al enviar el email";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const admin = createAdminClient();
  const table = source === "contact" ? "contact_messages" : "operator_applications";
  await admin.from(table).update({ replied_at: new Date().toISOString() }).eq("id", id);

  return NextResponse.json({ ok: true });
}
