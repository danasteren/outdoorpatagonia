"use client";

import { usePathname } from "next/navigation";

// Oculta a sus hijos en las rutas indicadas. Lee la ruta en el cliente porque
// el layout no se vuelve a renderizar en las navegaciones con <Link>.
export function HideOnPaths({ paths, children }: { paths: string[]; children: React.ReactNode }) {
  const pathname = usePathname();
  return paths.includes(pathname) ? null : children;
}
