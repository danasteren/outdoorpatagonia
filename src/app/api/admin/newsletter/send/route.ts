import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendNewsletterBatch } from "@/lib/newsletter/send";

const ADMIN_EMAIL = "danasteren@gmail.com";
const TEST_EMAIL = "info@outdoorpatagonia.com";

type SendBody = {
  subject: string;
  body: string;
  mode: "test" | "broadcast";
};

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { subject, body, mode }: SendBody = await request.json();

  if (!subject || !body || !mode) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const admin = createAdminClient();

  if (mode === "test") {
    const { data: testSubscriber } = await admin
      .from("subscribers")
      .select("email, unsubscribe_token")
      .eq("email", TEST_EMAIL)
      .maybeSingle();

    if (!testSubscriber) {
      return NextResponse.json(
        { error: `${TEST_EMAIL} no está en la tabla subscribers` },
        { status: 400 }
      );
    }

    await sendNewsletterBatch({
      subject,
      bodyText: body,
      recipients: [
        { email: testSubscriber.email, unsubscribeToken: testSubscriber.unsubscribe_token },
      ],
    });

    return NextResponse.json({ sent: 1 });
  }

  const { data: activeSubscribers, error } = await admin
    .from("subscribers")
    .select("email, unsubscribe_token")
    .is("unsubscribed_at", null);

  if (error) {
    return NextResponse.json({ error: "No pudimos leer los suscriptores" }, { status: 500 });
  }

  const recipients = (activeSubscribers ?? []).map((s) => ({
    email: s.email,
    unsubscribeToken: s.unsubscribe_token,
  }));

  await sendNewsletterBatch({ subject, bodyText: body, recipients });

  return NextResponse.json({ sent: recipients.length });
}
