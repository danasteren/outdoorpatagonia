import { Resend } from "resend";

const FROM = "Outdoor Patagonia <info@outdoorpatagonia.com>";
const ADMIN_NOTIFY_EMAIL = "danasteren@gmail.com";

export async function sendReplyEmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY no está configurada");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject,
    text: body,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function sendContactNotificationEmail({
  nombre,
  email,
  asunto,
  mensaje,
}: {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY no está configurada");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: FROM,
    to: ADMIN_NOTIFY_EMAIL,
    replyTo: email,
    subject: `📬 Nuevo mensaje de contacto: ${asunto}`,
    text: `${nombre} (${email}) escribió:\n\n${mensaje}\n\nRespondé desde /admin: https://outdoorpatagonia.com/admin`,
  });

  if (error) {
    throw new Error(error.message);
  }
}
