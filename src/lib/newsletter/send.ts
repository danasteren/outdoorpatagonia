import { Resend } from "resend";
import {
  renderNewsletterEmail,
  renderNewContentEmail,
  renderFireAlertEmail,
  renderVolcanoAlertEmail,
  type EmailContent,
} from "@/lib/newsletter/templates";

const FROM = "Outdoor Patagonia <info@outdoorpatagonia.com>";
const SITE_URL = "https://outdoorpatagonia.com";

export type Recipient = { email: string; unsubscribeToken: string };

// Resend batch send: máximo 100 emails por llamada, cada uno con su propio
// destinatario/link de baja — así no exponemos la lista completa en un `to`
// compartido y cada uno tiene su token real.
async function sendBatch({
  subject,
  recipients,
  buildContent,
}: {
  subject: string;
  recipients: Recipient[];
  buildContent: (unsubscribeUrl: string) => EmailContent;
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
    const { html, text } = buildContent(unsubscribeUrl);
    return {
      from: FROM,
      to: email,
      subject,
      html,
      text,
      headers: { "List-Unsubscribe": `<${unsubscribeUrl}>` },
    };
  });

  const { error } = await resend.batch.send(emails);
  if (error) throw new Error(error.message);
}

export async function sendNewsletterBatch({
  subject,
  bodyText,
  recipients,
}: {
  subject: string;
  bodyText: string;
  recipients: Recipient[];
}) {
  return sendBatch({
    subject,
    recipients,
    buildContent: (unsubscribeUrl) => renderNewsletterEmail({ subject, bodyText, unsubscribeUrl }),
  });
}

export async function sendNewContentAlertBatch({
  title,
  excerpt,
  url,
  category,
  recipients,
}: {
  title: string;
  excerpt: string;
  url: string;
  category?: string;
  recipients: Recipient[];
}) {
  return sendBatch({
    subject: `Nuevo en Outdoor Patagonia: ${title}`,
    recipients,
    buildContent: (unsubscribeUrl) =>
      renderNewContentEmail({ title, excerpt, url, category, unsubscribeUrl }),
  });
}

export async function sendFireAlertBatch({
  count,
  lastDate,
  mapUrl,
  recipients,
}: {
  count: number;
  lastDate: string;
  mapUrl: string;
  recipients: Recipient[];
}) {
  return sendBatch({
    subject: `🔥 ${count} foco${count === 1 ? "" : "s"} de calor activo${count === 1 ? "" : "s"} en Patagonia`,
    recipients,
    buildContent: (unsubscribeUrl) =>
      renderFireAlertEmail({ count, lastDate, mapUrl, unsubscribeUrl }),
  });
}

export async function sendVolcanoAlertBatch({
  nombre,
  nivel,
  fechaPost,
  detailUrl,
  recipients,
}: {
  nombre: string;
  nivel: "Verde" | "Amarillo" | "Naranja" | "Rojo";
  fechaPost: string | null;
  detailUrl: string;
  recipients: Recipient[];
}) {
  return sendBatch({
    subject: `Volcán ${nombre}: alerta ${nivel}`,
    recipients,
    buildContent: (unsubscribeUrl) =>
      renderVolcanoAlertEmail({ nombre, nivel, fechaPost, detailUrl, unsubscribeUrl }),
  });
}
