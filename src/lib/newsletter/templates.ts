// Templates de email para newsletter y alertas por correo.
// Puro HTML con estilos inline (los clientes de correo no soportan <style>/var()
// de forma confiable) — nada de dependencias de Resend acá, así se puede
// previsualizar/testear el HTML de forma aislada.

const BRAND = {
  forest: "#1a3a2a",
  teal: "#4b9492",
  tealLight: "#87cabf",
  cream: "#f5f0e8",
  terracotta: "#c8763a",
};

const NIVEL_COLOR: Record<"Verde" | "Amarillo" | "Naranja" | "Rojo", string> = {
  Verde: "#22c55e",
  Amarillo: "#facc15",
  Naranja: "#f97316",
  Rojo: "#ef4444",
};

export type EmailContent = { html: string; text: string };

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function paragraphsHtml(bodyText: string): string {
  return bodyText
    .trim()
    .split(/\n{2,}/)
    .map(
      (paragraph) =>
        `<p style="margin:0 0 16px;">${paragraph
          .split("\n")
          .map(escapeHtml)
          .join("<br/>")}</p>`
    )
    .join("\n");
}

function ctaButton(label: string, url: string): string {
  return `<a href="${url}" style="display:inline-block;margin:8px 0 4px;padding:10px 20px;border-radius:10px;background:${BRAND.teal};color:${BRAND.cream};font-weight:600;font-size:14px;text-decoration:none;">${escapeHtml(label)}</a>`;
}

function badge(label: string, color: string): string {
  return `<span style="display:inline-block;padding:3px 10px;border-radius:999px;background:${color}1a;color:${color};font-size:12px;font-weight:700;letter-spacing:0.02em;">${escapeHtml(label)}</span>`;
}

function renderShell({
  eyebrow,
  contentHtml,
  unsubscribeUrl,
}: {
  eyebrow: string;
  contentHtml: string;
  unsubscribeUrl: string;
}): string {
  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:${BRAND.cream};font-family:system-ui,sans-serif;color:${BRAND.forest};">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.teal};font-weight:600;margin:0 0 24px;">
        ${escapeHtml(eyebrow)}
      </p>
      ${contentHtml}
      <hr style="border:none;border-top:1px solid rgba(26,58,42,0.15);margin:32px 0 16px;" />
      <p style="font-size:12px;color:rgba(26,58,42,0.5);margin:0;">
        Recibiste este email porque te suscribiste en outdoorpatagonia.com.
        <a href="${unsubscribeUrl}" style="color:${BRAND.teal};">Darme de baja</a>
      </p>
    </div>
  </body>
</html>`;
}

function withUnsubscribe(text: string, unsubscribeUrl: string): string {
  return `${text}\n\nDarte de baja: ${unsubscribeUrl}`;
}

// ─── Newsletter general (editorial, redactado a mano) ─────────────────────────

export function renderNewsletterEmail({
  subject,
  bodyText,
  unsubscribeUrl,
}: {
  subject: string;
  bodyText: string;
  unsubscribeUrl: string;
}): EmailContent {
  const contentHtml = `
    <h1 style="font-size:20px;margin:0 0 20px;">${escapeHtml(subject)}</h1>
    ${paragraphsHtml(bodyText)}
  `;
  return {
    html: renderShell({ eyebrow: "Outdoor Patagonia", contentHtml, unsubscribeUrl }),
    text: withUnsubscribe(bodyText, unsubscribeUrl),
  };
}

// ─── Contenido nuevo (artículo, sendero o parque publicado) ───────────────────

export function renderNewContentEmail({
  title,
  excerpt,
  url,
  category,
  unsubscribeUrl,
}: {
  title: string;
  excerpt: string;
  url: string;
  category?: string;
  unsubscribeUrl: string;
}): EmailContent {
  const contentHtml = `
    ${category ? `<div style="margin-bottom:10px;">${badge(category, BRAND.teal)}</div>` : ""}
    <h1 style="font-size:20px;margin:0 0 12px;">${escapeHtml(title)}</h1>
    <p style="margin:0 0 20px;line-height:1.5;">${escapeHtml(excerpt)}</p>
    ${ctaButton("Leer en Outdoor Patagonia", url)}
  `;
  return {
    html: renderShell({ eyebrow: "Nuevo en Outdoor Patagonia", contentHtml, unsubscribeUrl }),
    text: withUnsubscribe(`${title}\n\n${excerpt}\n\n${url}`, unsubscribeUrl),
  };
}

// ─── Alerta de incendios (NASA FIRMS) ──────────────────────────────────────────

export function renderFireAlertEmail({
  count,
  lastDate,
  mapUrl,
  unsubscribeUrl,
}: {
  count: number;
  lastDate: string;
  mapUrl: string;
  unsubscribeUrl: string;
}): EmailContent {
  const contentHtml = `
    <div style="margin-bottom:10px;">${badge("🔥 Alerta de incendios", BRAND.terracotta)}</div>
    <h1 style="font-size:20px;margin:0 0 12px;">${count} foco${count === 1 ? "" : "s"} de calor activo${count === 1 ? "" : "s"} en Patagonia</h1>
    <p style="margin:0 0 20px;line-height:1.5;">
      Detectados por NASA FIRMS${lastDate ? `, última actualización ${escapeHtml(lastDate)}` : ""}.
      Mirá el mapa en vivo para ver la ubicación exacta.
    </p>
    ${ctaButton("Ver mapa de incendios", mapUrl)}
  `;
  return {
    html: renderShell({ eyebrow: "Outdoor Patagonia · Alertas", contentHtml, unsubscribeUrl }),
    text: withUnsubscribe(
      `${count} foco${count === 1 ? "" : "s"} de calor activo${count === 1 ? "" : "s"} en Patagonia.\n\n${mapUrl}`,
      unsubscribeUrl
    ),
  };
}

// ─── Actividad volcánica (SERNAGEOMIN) ─────────────────────────────────────────

export function renderVolcanoAlertEmail({
  nombre,
  nivel,
  fechaPost,
  detailUrl,
  unsubscribeUrl,
}: {
  nombre: string;
  nivel: "Verde" | "Amarillo" | "Naranja" | "Rojo";
  fechaPost: string | null;
  detailUrl: string;
  unsubscribeUrl: string;
}): EmailContent {
  const color = NIVEL_COLOR[nivel];
  const contentHtml = `
    <div style="margin-bottom:10px;">${badge(`Alerta ${nivel}`, color)}</div>
    <h1 style="font-size:20px;margin:0 0 12px;">Volcán ${escapeHtml(nombre)} cambió de nivel de alerta</h1>
    <p style="margin:0 0 20px;line-height:1.5;">
      SERNAGEOMIN elevó la alerta a <strong style="color:${color};">${nivel}</strong>${fechaPost ? ` el ${escapeHtml(fechaPost)}` : ""}.
    </p>
    ${ctaButton("Ver detalle del volcán", detailUrl)}
  `;
  return {
    html: renderShell({ eyebrow: "Outdoor Patagonia · Alertas", contentHtml, unsubscribeUrl }),
    text: withUnsubscribe(
      `Volcán ${nombre}: alerta ${nivel}${fechaPost ? ` (${fechaPost})` : ""}.\n\n${detailUrl}`,
      unsubscribeUrl
    ),
  };
}
