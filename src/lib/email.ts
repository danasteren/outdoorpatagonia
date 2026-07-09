import { Resend } from "resend";

const FROM = "Outdoor Patagonia <info@outdoorpatagonia.com>";
const SITE_URL = "https://outdoorpatagonia.com";

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

function bodyTextToHtml(bodyText: string): string {
  return bodyText
    .trim()
    .split(/\n{2,}/)
    .map(
      (paragraph) =>
        `<p style="margin:0 0 16px;">${paragraph
          .split("\n")
          .map((line) => line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"))
          .join("<br/>")}</p>`
    )
    .join("\n")
}

function renderNewsletterHtml({
  subject,
  bodyText,
  unsubscribeUrl,
}: {
  subject: string;
  bodyText: string;
  unsubscribeUrl: string;
}): string {
  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#f5f0e8;font-family:system-ui,sans-serif;color:#1a3a2a;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#4b9492;font-weight:600;margin:0 0 24px;">
        Outdoor Patagonia
      </p>
      <h1 style="font-size:20px;margin:0 0 20px;">${subject}</h1>
      ${bodyTextToHtml(bodyText)}
      <hr style="border:none;border-top:1px solid rgba(26,58,42,0.15);margin:32px 0 16px;" />
      <p style="font-size:12px;color:rgba(26,58,42,0.5);margin:0;">
        Recibiste este email porque te suscribiste en outdoorpatagonia.com.
        <a href="${unsubscribeUrl}" style="color:#4b9492;">Darme de baja</a>
      </p>
    </div>
  </body>
</html>`
}

export async function sendNewsletterBatch({
  subject,
  bodyText,
  recipients,
}: {
  subject: string;
  bodyText: string;
  recipients: { email: string; unsubscribeToken: string }[];
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY no está configurada");
  }
  if (recipients.length === 0) return;
  if (recipients.length > 100) {
    throw new Error("Resend batch send soporta máximo 100 destinatarios por llamada");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const emails = recipients.map(({ email, unsubscribeToken }) => {
    const unsubscribeUrl = `${SITE_URL}/newsletter/baja?token=${unsubscribeToken}`;
    return {
      from: FROM,
      to: email,
      subject,
      html: renderNewsletterHtml({ subject, bodyText, unsubscribeUrl }),
      text: `${bodyText}\n\nDarte de baja: ${unsubscribeUrl}`,
      headers: { "List-Unsubscribe": `<${unsubscribeUrl}>` },
    };
  });

  const { error } = await resend.batch.send(emails);

  if (error) {
    throw new Error(error.message);
  }
}
