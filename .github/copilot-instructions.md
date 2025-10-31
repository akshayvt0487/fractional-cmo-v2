## Purpose
Short, actionable guidance for AI coding agents working in this repository. Focus on the app router, admin protection pattern, integrations, build/dev commands, and TypeScript path aliases.

## Big picture
- Framework: Next.js (App Router, `app/` directory). Root layout uses `app/layout.tsx` and wraps the app with `app/providers.tsx`.
- Admin area: `app/admin/*` is a protected, client-side layout. See `app/admin/layout.tsx` — it uses `next-auth` `useSession()` on the client and redirects non-admin users to `/admin/login`.
- CMS: Sanity studio is colocated in `/studio` with its own `package.json` and scripts (`cd studio && npm run dev`). The frontend consumes Sanity via `next-sanity`.
- Integrations: Appwrite, NextAuth, nodemailer and other integrations live under `src/integrations` or `src/lib`. Check `package.json` for installed SDKs. Supabase was removed from this project; prefer Appwrite-related code under `src/integrations/appwrite` or `src/integrations`.
- Styling: Tailwind + PostCSS are used (`postcss.config.js`, Tailwind classes throughout). Global styles and theme provider are in `app/globals.css` and `app/providers.tsx`.

## Key files to reference
- `package.json` — dev/build/start/lint scripts (dev uses `next dev --turbopack`).
- `tsconfig.json` — important path aliases: `@/*`, `@/components/*`, `@/lib/*`, etc. Use these aliases when adding imports.
- `app/layout.tsx` and `app/providers.tsx` — entry/Providers for the app.
- `app/admin/layout.tsx` — admin auth & layout pattern (client component, `useSession`, `SidebarProvider`).
- `studio/package.json` and `studio/README.md` — Sanity studio commands and local dev workflow.
- `src/components/ui/*` and `src/components/admin/*` — common UI primitives and admin components.

## Project-specific patterns and conventions
- App Router first: prefer server components by default. Add `"use client"` only in components that use hooks/event handlers (see `app/admin/layout.tsx`).
- Admin protection: perform client-side session checks in `app/admin/layout.tsx`. When adding protected pages, follow the same redirect pattern.
- Sidebar/layout: The admin layout uses a `SidebarProvider` and `useSidebar` hook — coordinate layout margin transitions via CSS variables (see `AdminLayoutContent` in `app/admin/layout.tsx`).
- Path aliases: import using `@/...` instead of relative paths to keep imports stable (see `tsconfig.json`).
- Sanity studio: it's a separate app — changes to studio must be run from `/studio` and deployed separately from the Next app.

## Common workflows (commands)
- Local dev (frontend): `npm run dev` (root) — runs `next dev --turbopack`.
- Build: `npm run build` (root) — `next build --turbopack`.
- Start production locally: `npm run start` (root).
- Lint: `npm run lint`.
- Studio dev: `cd studio && npm run dev`.

## How AI agents should make edits
- Preserve Next.js App Router conventions: file locations and `layout.tsx` structure affect routing and nested layouts.
- When introducing state or hooks, create a client component (`"use client"`) and keep server components minimal for data fetching.
- Use existing providers (`app/providers.tsx`) for new global context rather than adding new top-level wrappers.
- Respect path aliases from `tsconfig.json` for imports.
- For admin changes, mimic the `app/admin/layout.tsx` auth check and redirect flow.

## Useful examples to copy/paste
- Import with alias: `import { AdminHeader } from '@/components/admin/AdminHeader'`
- Admin redirect pattern (see `app/admin/layout.tsx`): check `useSession()`, `status`, `isAdmin`, and use `router.push('/admin/login')` for unauthorized users.

## Notes & gotchas
- There are no automated tests in the repo root; run manual checks when changing routing or auth paths.
- The project uses Next 15 and Turbopack by default — if Turbopack causes issues, developers may try the standard Next dev mode, but do not change root scripts without confirming with maintainers.

If anything here is unclear or you want more depth (examples for adding a feature, or templates for new pages/components), tell me which area to expand.
