// Arma los índices de las guías de destino a partir de los archivos sueltos.
// Corre solo antes de `npm run dev` y `npm run build` (predev / prebuild en package.json).
//
//   src/lib/destinos/guias/<slug>.ts   → src/lib/destinos/guias.generated.ts   (GUIAS)
//   src/lib/destinos/legacy/<slug>.ts  → src/lib/destinos/legacy.generated.ts  (LEGACY_TO_GUIDE)
//
// Los .generated.ts no se versionan: así cada guía nueva es un archivo propio y dos PR de
// contenido nunca editan la misma lista. Uso manual: `node scripts/gen-destinos.mjs`.

import fs from "node:fs"
import path from "node:path"

const DIR = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "src", "lib", "destinos")

function slugsIn(sub) {
  const dir = path.join(DIR, sub)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".ts") && !f.startsWith("."))
    .map((f) => f.slice(0, -3))
    .sort()
}

function write(file, content) {
  const target = path.join(DIR, file)
  if (fs.existsSync(target) && fs.readFileSync(target, "utf8") === content) return
  fs.writeFileSync(target, content)
}

const HEADER = "// Generado por scripts/gen-destinos.mjs. No editar ni versionar.\n\n"

const guias = slugsIn("guias")
write(
  "guias.generated.ts",
  HEADER +
    `import type { DestinoEntry } from "@/lib/destinos/types"\n` +
    guias.map((s, i) => `import g${i} from "./guias/${s}"\n`).join("") +
    `\nexport const GUIAS: DestinoEntry[] = [${guias.map((_, i) => `g${i}`).join(", ")}]\n`,
)

// Sin imports de contenido: este índice lo carga proxy.ts en cada request.
const legacy = slugsIn("legacy")
write(
  "legacy.generated.ts",
  HEADER +
    legacy.map((s, i) => `import l${i} from "./legacy/${s}"\n`).join("") +
    `\nexport const LEGACY_TO_GUIDE: Record<string, string> = { ${legacy.map((_, i) => `...l${i}`).join(", ")} }\n`,
)

console.log(`gen-destinos: ${guias.length} guías, ${legacy.length} con redirecciones`)
