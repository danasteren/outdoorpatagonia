import { Resend } from "resend";

const FROM = "Outdoor Patagonia <info@outdoorpatagonia.com>";

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
