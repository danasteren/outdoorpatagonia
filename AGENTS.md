<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:novedades-workflow -->
## Workflow: "actualiza novedades"

When the user says **"actualiza novedades"** (or equivalent phrasing):

1. Run `git log --oneline -30` to get recent commits since the last published version
2. **Filter strictly to user-visible changes only.** Include:
   - New pages or sections readers can visit
   - UI improvements visible to readers
   - Bug fixes that affected the reading/navigation experience
   - New content features (search, maps, quizzes, etc.)
3. **Never publish** (skip entirely):
   - Auth, security, or session changes
   - DB schema, migrations, Supabase config
   - Deployment, Vercel, env vars, infra
   - Script internals or migration tooling
   - Admin-only features
   - Performance/build optimizations with no visible effect
4. Map each item to a `TipoCambio`: `"nuevo"` (new feature), `"mejora"` (enhancement), `"correccion"` (bug fix)
5. Write descriptions in plain Argentine Spanish from the reader's perspective — what changed *for them*, not what changed in the code
6. Confirm the new version number with the user before writing (bump minor for feature releases, patch for fixes only)
7. Edit `src/data/novedades.ts`: prepend the new entry at the top of the array, set `esUltima: true` on it, remove `esUltima` from all other entries
8. The page `/novedades` is statically rendered from `src/data/novedades.ts` — no DB, no CMS, no admin panel needed

**Example mental filter:** "feat: category pages" → NUEVO user-visible feature ✓. "fix: generateStaticParams uses cookie-free Supabase client" → internal build fix, skip ✗.
<!-- END:novedades-workflow -->
