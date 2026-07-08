import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function page(message: string) {
  return new NextResponse(
    `<!doctype html>
<html lang="es">
  <head><meta charset="utf-8" /><title>Outdoor Patagonia</title></head>
  <body style="font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f5f1e8; color: #1f2a24;">
    <p style="font-size: 1.1rem;">${message}</p>
  </body>
</html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) return page("Falta el token de baja.");

  const admin = createAdminClient();
  const { error } = await admin
    .from("subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("unsubscribe_token", token);

  if (error) return page("No pudimos procesar la baja. Escribinos a info@outdoorpatagonia.com.");
  return page("Listo, te diste de baja del newsletter. Lamentamos verte ir 🌲");
}
