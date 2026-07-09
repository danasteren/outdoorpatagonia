import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function page(body: string) {
  return new NextResponse(
    `<!doctype html>
<html lang="es">
  <head><meta charset="utf-8" /><title>Outdoor Patagonia</title></head>
  <body style="font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f5f1e8; color: #1f2a24; text-align: center;">
    ${body}
  </body>
</html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

function message(text: string) {
  return page(`<p style="font-size: 1.1rem;">${text}</p>`);
}

// El GET solo muestra una confirmación: muchos clientes de correo corporativos
// (Safe Links, Proofpoint, Mimecast) precargan automáticamente los links de un
// email, así que dar de baja directo en el GET daría de baja gente sin que
// nadie haya tocado nada. La baja real sólo ocurre en el POST.
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) return message("Falta el token de baja.");

  return page(`
    <form method="post" style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
      <input type="hidden" name="token" value="${token}" />
      <p style="font-size: 1.1rem; margin: 0;">¿Confirmás que querés darte de baja del newsletter?</p>
      <button type="submit" style="font: inherit; padding: 0.6rem 1.4rem; border-radius: 0.6rem; border: none; background: #4b9492; color: #f5f0e8; cursor: pointer;">
        Confirmar baja
      </button>
    </form>
  `);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const token = formData.get("token")?.toString();
  if (!token) return message("Falta el token de baja.");

  const admin = createAdminClient();
  const { error } = await admin
    .from("subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("unsubscribe_token", token);

  if (error) return message("No pudimos procesar la baja. Escribinos a info@outdoorpatagonia.com.");
  return message("Listo, te diste de baja del newsletter. Lamentamos verte ir 🌲");
}
