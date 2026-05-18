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
- **React 19.2.4**. The App Router uses React canary built-in regardless of the pinned version. Use React 19's ref-as-prop (`ComponentPropsWithRef<...>`) — no `forwardRef`.
- **Tailwind CSS v4** via `@tailwindcss/postcss`. There is no `tailwind.config.*` — theme tokens are declared in CSS via `@theme { ... }` inside `src/app/globals.css`, and Tailwind is loaded with `@import "tailwindcss";`. Don't add a JS config file; extend the theme in CSS.
- **TypeScript** strict, with path alias `@/*` → `./src/*`.

## Design system (in `src/app/globals.css`)

The whole design surface is declared in one file. When adding tokens, utilities, or keyframes, edit this file rather than introducing new ones.

- **Color tokens** (`@theme inline`): `beige-primary` (#F2D6A2), `beige-secondary` (#FFF1D9), `beige-deep` (#A87C3D). Each works across all Tailwind color utilities (`bg-*`, `text-*`, `border-*`, `ring-*`, `bg-*/50`, etc).
- **Font tokens**: `font-sans` is wired to **Google Sans Flex** (loaded via `next/font/google` in `layout.tsx`, with the `opsz` axis enabled). `font-awesome-serif` is a local variable font under `src/app/fonts/` loaded via `next/font/local`.
- **Custom @utility classes**: `bg-beige-gradient` and `text-beige-gradient` apply the `#F2D6A2 → #A87C3D` linear gradient. `text-beige-gradient` handles `background-clip: text` + transparent color in a single class for gradient text.
- **Custom animation**: `animate-marquee` (used by `CompoundMarquee`). The marquee assumes you render its content **twice** so `translateX(-50%)` loops seamlessly.

### Tailwind v4 keyframes gotcha

Custom `@keyframes` **must live inside a `@theme` block** alongside the matching `--animate-*` token. Defining them at the top level can fail to register the animation utility. This file has a dedicated `@theme { @keyframes ... }` block for `marquee` for that reason — follow the same pattern for any new custom animation.

## Component patterns

Three component buckets — keep them separate:

- `src/app/components/ui/` — generic primitives and layout chrome (`Button`, `Accordion`, `PageHeader`, `TopHeader`, `Copyright`). Reusable across pages.
- `src/app/components/landing/` — section components for the `/` route (`Banner`, `Stats`, `CompoundMarquee`, `Questions`, `Process`, `Supply`).
- `src/app/components/application/` — section components for the `/application` route (`ApplicationSection`, `WhatNext`, `SupplyChain`, `StatsBoard`, `FAQs`). Some sections are parallel-but-distinct to their landing equivalents (e.g. `landing/Stats` vs `application/StatsBoard`) — do not consolidate; the copy and layout differ per route.

When a route gets its own section components, give it its own bucket under `components/` matching the route name, rather than mixing them into `landing/`.

### Class composition

- `cn()` lives at `src/lib/utils.ts` (alias: `@/lib/utils`). It's `clsx` + `tailwind-merge` — use it for any component that accepts a passthrough `className`, so users can override variants cleanly (last-wins for conflicting Tailwind classes).
- Components with variants use **`tailwind-variants`** (`tv()`), with `cn()` running over the `tv()` output to merge in the user's `className`. See `Button.tsx` for the canonical pattern: `tv()` for the variant matrix, `cn(button({ variant, size }), className)` at the render site, `VariantProps<typeof button>` for type inference.
- For stateful interactive primitives (collapse/expand, tabs, etc.), see `Accordion.tsx`: `"use client"`, local `useState`, `AnimatePresence` + `motion.div` animating `height: 0 ↔ "auto"` with `overflow-hidden` on the wrapper. ARIA wiring (`aria-expanded`, `aria-controls`, `aria-labelledby`, `role="region"`) belongs on the primitive, not the consumer.

### Server vs client components

App Router defaults to server components — keep them server-rendered unless the component **must** be client-side. Concretely:

- Any component using **framer-motion** must be `"use client"` (it depends on React hooks and intersection-observer APIs).
- Components with `useState`, `useEffect`, browser APIs, or DOM event handlers must be `"use client"`.
- Everything else (presentational primitives, layout shells, marketing copy) stays as a server component — no directive, zero JS shipped for it.

### Framer Motion conventions

- For scroll-triggered entrances, use `whileInView` with `viewport={{ once: true, amount: 0.2–0.4 }}` so the animation runs both on initial-paint-in-view and on scroll-into-view.
- For on-load-only animations (elements always at the top of the page, like `PageHeader`), use `animate` with a small `delay`.
- For grids/lists of children that should stagger, put `staggerChildren` on a parent variant and a per-child `variants` definition. To give each child a different starting offset, use a function variant + the `custom` prop (see `Stats.tsx` for the corner-offset pattern).
- Not every section animates. `TopHeader` is intentionally a static server component — the top promo strip should appear with the initial paint, not animate in. Treat sticky/global chrome as the exception when "animate everything."

## Layout

- `src/app/layout.tsx` is the root layout. It loads the two fonts (Google Sans Flex + local Awesome Serif), exposes them as CSS variables on `<html>`, and renders `<TopHeader />` plus a `<main className="mt-20 max-w-400 w-full mx-auto">` that wraps `{children}` and `<Copyright />`. The `Copyright` footer is rendered inside `<main>`, not as a sibling — keep it that way so it inherits the centered max-width container.
- Routes live directly under `src/app/`: `/` is `page.tsx`, `/application` is `application/page.tsx`. Each route composes section components from its own bucket (`components/landing/` for `/`, `components/application/` for `/application`) plus shared chrome from `components/ui/`.
- `public/` holds static assets served at `/`. Prefer `next/image` with intrinsic `width`/`height` props (real source dimensions) plus `className="w-... h-auto"` for display sizing — Next.js needs intrinsic dimensions to prevent CLS and to pick the right optimized variant.
- For bespoke gradients that don't match `bg-beige-gradient` (which is the 90deg `#F2D6A2 → #A87C3D` brand gradient), apply an inline `style={{ backgroundImage: "linear-gradient(...)" }}` rather than adding one-off Tailwind classes or new `@utility` declarations. See `Supply.tsx` for a 225deg variant.
