@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`, `pnpm-workspace.yaml` present).

- `pnpm dev` — start the Next.js dev server on http://localhost:3000
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — run ESLint (flat config in `eslint.config.mjs`)

No test runner is configured.

## Stack notes (versions ahead of common knowledge)

- **Next.js 16.2.6** with App Router (`src/app/`). The version note in `AGENTS.md` is load-bearing: APIs and conventions in this release may differ from older Next.js you've seen. Consult `node_modules/next/dist/docs/` (organized as `01-app/`, `02-pages/`, `03-architecture/`) before writing non-trivial framework code — there are agent hints embedded in those docs (e.g. `unstable_instant` for instant navigation).
- **React 19.2.4**. The App Router uses React canary built-in regardless of the pinned version.
- **Tailwind CSS v4** via `@tailwindcss/postcss`. There is no `tailwind.config.*` — theme tokens are declared in CSS via `@theme inline { ... }` inside `src/app/globals.css`, and Tailwind is loaded with `@import "tailwindcss";`. Don't add a JS config file; extend the theme in CSS.
- **TypeScript** strict, with path alias `@/*` → `./src/*`.

## Layout

- `src/app/layout.tsx` is the root layout; it wires the Geist/Geist Mono fonts via `next/font/google` as CSS variables and applies `h-full antialiased` + a flex column body. New pages live under `src/app/`.
- `public/` holds static assets served at `/`.
