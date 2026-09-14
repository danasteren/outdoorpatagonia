import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { renderNewsletterEmail } from "@/lib/newsletter/templates";

const ADMIN_EMAIL = "danasteren@gmail.com";
const FROM = "Outdoor Patagonia <info@outdoorpatagonia.com>";

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
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY no está configurada" }, { status: 500 });
  }

  const { html, text } = renderNewsletterEmail({
    subject,
    bodyText,
    unsubscribeUrl: "https://outdoorpatagonia.com/newsletter/baja?token=preview",
  });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[PRUEBA] ${subject}`,
    html,
    text,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
