# BoardBased

Stack: **React + TypeScript + Vite (SWC)**, **Tailwind v4** via `@tailwindcss/vite`, **React Router** (minimal).

## Dev
```bash
npm install
npm run dev
```
Dev server binds to **127.0.0.1:8082** (see `vite.config.ts`).

## Env
Create `.env` from `.env.example`:
```
VITE_API_BASE=
VITE_SITE_URL=http://127.0.0.1:8082
```

## Structure
```
src/
  app/            # router, app wiring
  components/     # shared UI
  pages/          # routes: Home, Crawl, Detail, Settings
  lib/            # small libs (config, helpers)
  styles/         # Tailwind entry
```

## Notes
- Navbar placeholder is in `src/components/layout/Shell.tsx` — replace the comment with your Navbar later.

Generated: 2025-09-30T17:34:31.386091Z
