# Novedades (changelog para el lector)

**Regla fija: se hace sola al final de cada tarea que entregue un cambio visible para el lector.** La usuaria no tiene que pedirla. Si la entrada `esUltima` todavía es la versión en curso, los ítems se suman ahí. Si no, se arranca una versión nueva (confirmar el número con la usuaria). `version` en `package.json` tiene que acompañar (`1.6` → `"1.6.0"`). La edición de `novedades.ts` va en el mismo commit que el cambio. Las tareas que solo tienen cambios internos (ver "Nunca publicar" más abajo) no tocan novedades.

Cuando la usuaria dice **"actualiza novedades"** (o algo equivalente):

1. Correr `git log --oneline -30` para ver los commits desde la última versión publicada.
2. **Quedarse solo con lo que ve el lector.** Entra:
   - Páginas o secciones nuevas que el lector puede visitar
   - Mejoras de interfaz que el lector ve
   - Bugs arreglados que afectaban la lectura o la navegación
   - Funciones nuevas de contenido (buscador, mapas, quizzes, etc.)
3. **Nunca publicar** (se saltean del todo):
   - Cambios de auth, seguridad o sesión
   - Schema de la DB, migraciones, config de Supabase
   - Deploy, Vercel, env vars, infraestructura
   - Internos de scripts o herramientas de migración
   - Funciones que solo ve el admin
   - Optimizaciones de performance o de build sin efecto visible
4. Asignarle a cada ítem un `TipoCambio`: `"nuevo"` (función nueva), `"mejora"` (algo que se mejoró) o `"correccion"` (bug arreglado).
5. Escribir las descripciones en español argentino simple, desde el lado del lector: qué cambió *para él*, no qué cambió en el código.
6. Confirmar con la usuaria el número de versión nueva antes de escribir. Se sube el minor si hay funciones nuevas y el patch si son solo arreglos.
7. Editar `src/data/novedades.ts`: poner la entrada nueva al principio del array, marcarla con `esUltima: true` y sacarle `esUltima` a todas las demás.
8. La página `/novedades` se genera estática desde `src/data/novedades.ts`. No hace falta DB, CMS ni panel de admin.

**Ejemplo del filtro:** "feat: category pages" → función NUEVA que ve el lector ✓. "fix: generateStaticParams uses cookie-free Supabase client" → arreglo interno de build, se saltea ✗.
