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

### Prefer canonical spacing/size tokens over arbitrary values

Tailwind v4's spacing scale lets you write any multiple of `0.25rem` (4px) as a numeric token — `h-50` is `200px`, `max-w-67.5` is `270px`, `w-45` is `180px`. The repo's ESLint setup has the `suggestCanonicalClasses` rule turned on, so it will warn whenever you write `h-[200px]` instead of `h-50` or `max-w-[270px]` instead of `max-w-67.5`. Reach for arbitrary values (`h-[160px]`, `text-[8px]`, `w-[70%]`) only when the value isn't on the 4px grid (or isn't a length at all, like `%` widths or sub-px font sizes).

## Component patterns

Three component buckets — keep them separate:

- `src/app/components/ui/` — generic primitives and layout chrome (`Button`, `Accordion`, `StepList`, `PageHeader`, `TopHeader`, `Copyright`). Reusable across pages.
- `src/app/components/landing/` — section components for the `/` route (`Banner`, `Stats`, `CompoundMarquee`, `Questions`, `Process`, `Supply`).
- `src/app/components/application/` — section components for the `/application` route (`ApplicationSection`, `WhatNext`, `SupplyChain`, `StatsBoard`, `FAQs`). Nested routes get nested buckets: `/application/confirm` has its sections in `components/application/confirm/` (`SuccessApplication`, `FAQs`, `SeeYou`). Some sections are parallel-but-distinct to their landing equivalents (e.g. `landing/Stats` vs `application/StatsBoard`) — do not consolidate; the copy and layout differ per route.

When a route gets its own section components, give it its own bucket under `components/` matching the route path (`/application/confirm` → `components/application/confirm/`), rather than mixing them into `landing/`. The exception is `/application/disqualified`: it's a single full-bleed view with no sub-sections, so its component (`DisqualifiedView.tsx`) is colocated directly in the route folder (`src/app/application/disqualified/`) instead of getting its own `components/application/disqualified/` bucket.

### Class composition

- `cn()` lives at `src/lib/utils.ts` (alias: `@/lib/utils`). It's `clsx` + `tailwind-merge` — use it for any component that accepts a passthrough `className`, so users can override variants cleanly (last-wins for conflicting Tailwind classes).
- Components with variants use **`tailwind-variants`** (`tv()`), with `cn()` running over the `tv()` output to merge in the user's `className`. See `Button.tsx` for the canonical pattern: `tv()` for the variant matrix, `cn(button({ variant, size }), className)` at the render site, `VariantProps<typeof button>` for type inference.
- For stateful interactive primitives (collapse/expand, tabs, etc.), see `Accordion.tsx`: `"use client"`, local `useState`, `AnimatePresence` + `motion.div` animating `height: 0 ↔ "auto"` with `overflow-hidden` on the wrapper. ARIA wiring (`aria-expanded`, `aria-controls`, `aria-labelledby`, `role="region"`) belongs on the primitive, not the consumer.
- For hover-only interactive primitives (no toggle state — just visual reactions to pointer), stay a server component and use Tailwind's `group` + `group-hover:*` + `transition-colors duration-N`. See `StepList.tsx`: the row is a `group`, the number inside swaps from `text-beige-primary` to `text-black` on `group-hover:`. No JS shipped.
- For in-page anchor navigation (a button that scrolls to a section by `id`), use Next.js `useRouter().push("#id")` from `next/navigation` — not `document.getElementById(...).scrollIntoView()`. Globals `:root` and `*` set `scroll-behavior: smooth` so the navigation animates. See `landing/Banner.tsx` scrolling to `#questions` on `landing/Questions`. Keep the `<Button>` primitive (don't swap to `<Link>`) so the variant/size system stays consistent.
- For primitives that need to render differently on light vs dark backgrounds, take a `theme: "dark" | "light"` prop and switch the asset path on it (don't ship two components). See `PageHeader.tsx`: a single `theme` prop maps to `/logo-{theme}.png` — the light variant is used by `DisqualifiedView` over the dark background image; the dark variant is the default for cream/beige pages. Maintain matching `logo-dark.png` / `logo-light.png` (or equivalent) pairs in `public/`.
- `StepList.tsx` is a numbered-list primitive (used by `application/confirm/FAQs`). It's responsive by design: number column shrinks (`w-14 lg:w-24`), number font scales (`text-5xl lg:text-7xl`), title scales (`text-lg lg:text-2xl`), and gap shrinks (`gap-4 lg:gap-8`). When passing `icon` props, scale them the same way at the call site (e.g. `className="size-9 lg:size-12"`). `icon` is a plain `ReactNode`, typically a `lucide-react` icon element passed directly (e.g. `<CircleCheck />`) — there's no central icon registry.

### Branded gradient-card pattern

Brand callout sections with a linear-gradient background and a decorative image follow a shared shape — `landing/Supply`, `application/SupplyChain`, `application/confirm/SeeYou`. The card is `relative w-full max-w-300 rounded-* pl-* pr-*` with the gradient applied via inline `style={{ backgroundImage: "linear-gradient(...)" }}`, an absolutely-positioned `<Image>` on one side, and a text column on the opposite side. The image renders on **both mobile and desktop** — the card never collapses to a text-only layout. Conventions:

- Image container is `absolute {left|right}-0 bottom-0 w-{N} h-{N}` on mobile (narrow tall slot, e.g. `w-45 h-44`) and `lg:w-125 lg:h-auto` on desktop (wide, in-flow height). The image inside is `w-full h-full object-cover object-{top|right-top} lg:h-auto` — mobile crops to fill the tall narrow container via `object-cover` (use `object-top` / `object-right-top` to keep the subject visible); desktop's `lg:h-auto` restores natural aspect.
- Card uses asymmetric padding to reserve a column for the image (`pl-25 pr-4 lg:pl-105 lg:pr-16` when image is on the left, mirrored when on the right). `min-h` is desktop-only (`lg:min-h-72`) — mobile lets content + the image container's height drive card height.
- **Clipping**: when the image must extend above the card (head poking out, `SeeYou`), keep the card overflow-visible and put `overflow-hidden rounded-br-3xl` (or `-bl-`) on the image container so its corner matches the card. When the image must stay inside the rounded card (`Supply`, `SupplyChain`), put `overflow-hidden lg:overflow-visible` on the **card** itself so mobile clips and desktop allows the natural overflow.
- Text alignment is the SAME on mobile and desktop (`text-end` or `text-left`) — the side-image layout pushes mobile text to one side, so don't center-on-mobile. Body copy uses `ml-auto`/`mr-auto` + an explicit `w-[N%]` to keep the line length inside the narrowed text column.
- Mobile text sizes are noticeably smaller than the stacked-two-column pattern (heading `text-2xl`, body can go as small as `text-[8px]`) because the text column is only ~50-60% of the card width.

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

- `src/app/layout.tsx` is the root layout. It loads the two fonts (Google Sans Flex + local Awesome Serif), exposes them as CSS variables on `<html>`, and renders `<MetaPixel />` + `<TopHeader />` plus a `<main className="mt-10 lg:mt-20 max-w-lvw overflow-x-clip lg:max-w-400 w-full mx-auto">` that wraps `{children}` and `<Copyright />`. The `Copyright` footer is rendered inside `<main>`, not as a sibling — keep it that way so it inherits the centered max-width container.
- Routes live directly under `src/app/`: `/` is `page.tsx`, `/application` is `application/page.tsx`, `/application/confirm` is `application/confirm/page.tsx`, `/application/disqualified` is `application/disqualified/page.tsx`. Each route composes section components from its own bucket plus shared chrome from `components/ui/`. Branching that used to be done via a `?status=` query param dispatcher is now just separate static routes — prefer a dedicated route over query-param branching for distinct page states.
- **`searchParams` is async in Next.js 16** — server-component pages receive `searchParams: Promise<{ [key: string]: string | string[] | undefined }>` and must `await` it. No current route reads `searchParams`, but reach for this (rather than a `"use client"` page calling `useSearchParams`) if a future route needs to branch on a query param — it keeps the page server-rendered.
- `public/` holds static assets served at `/`. Prefer `next/image` with intrinsic `width`/`height` props (real source dimensions) plus `className="w-... h-auto"` for display sizing — Next.js needs intrinsic dimensions to prevent CLS and to pick the right optimized variant.
- For bespoke gradients that don't match `bg-beige-gradient` (which is the 90deg `#F2D6A2 → #A87C3D` brand gradient), apply an inline `style={{ backgroundImage: "linear-gradient(...)" }}` rather than adding one-off Tailwind classes or new `@utility` declarations. See `Supply.tsx` for a 225deg variant.
- **Full-bleed pages** (a sub-page that wants to break out of the `<main className="mt-10 lg:mt-20 max-w-400 ...">` chrome) use a flow-layered pattern, not `position: fixed`. See `DisqualifiedView.tsx`: a `relative` section with **responsive** negative margins (`-mt-10 lg:-mt-20 -mb-16 lg:-mb-32`) to bleed past the layout's top offset and bottom Copyright padding (both of which are responsive), the bg `<Image>` swaps layout mode by viewport (see next bullet), and a content layer that mirror-swaps with it. Don't use `fixed inset-0` for backgrounds: it scroll-pins the bg and was rejected for this page. The bg image scrolls with the page like any other element.
- **Dual-source bg for full-bleed full-screen pages** (`DisqualifiedView.tsx`): a portrait mobile bg and a landscape/square desktop bg are different enough that one `<Image>` with responsive overrides can't serve both. Render two `<Image>` elements with different `src` — mobile source `block lg:hidden`, desktop source `hidden lg:block` — and put `absolute inset-0 w-full h-full object-cover` on both so each fills the section in its own viewport. Section uses `min-h-screen` for true full-screen plus `bg-black` (or matching dark color) so any uncovered slivers blend in. Content overlay stays the mirror-swap pattern: `relative lg:absolute lg:inset-0` with `min-h-screen lg:min-h-0` so mobile's relative-flow content also fills the viewport.

## Meta Pixel + Conversions API tracking

Conversion tracking is split across three files that must stay in sync:

- `src/app/components/analytics/MetaPixel.tsx` — rendered once, in `layout.tsx`. Injects the `fbq` snippet (gated on `NEXT_PUBLIC_META_PIXEL_ID`; renders nothing if unset) and fires `PageView` on every page, plus a `<noscript>` fallback `<img>` pixel.
- `src/app/components/analytics/TrackEvent.tsx` — a `"use client"`, render-nothing component dropped near the top of a page to declare which Meta standard event that page represents, e.g. `<TrackEvent event="Lead" />` on `/application`, `<TrackEvent event="Schedule" />` on `/application/confirm`. On mount it generates one `eventId` (`crypto.randomUUID()`), fires `fbq('track', event, {}, { eventID })` client-side, and `POST`s the same `event`/`eventId` to `/api/meta-capi` — the shared `eventId` is what lets Meta dedupe the browser pixel hit against the server-side CAPI hit for the same conversion. A `useRef` guard ensures it only fires once per mount.
- `src/app/api/meta-capi/route.ts` — server route handler that forwards the event to the Meta Graph API CAPI endpoint using `META_CAPI_DATASET_ID` + `META_CAPI_ACCESS_TOKEN` (returns 500 if either is unset). It re-derives `client_ip_address`/`client_user_agent` from request headers and `fbp`/`fbc` from cookies for user-data matching.

The event name is allowlisted in two places that must be updated together when adding a new tracked conversion: the `ALLOWED_EVENTS` set in `route.ts` and the `MetaStandardEvent` union type in `TrackEvent.tsx`.

## Responsive conventions

Mobile and tablet share the same styling — desktop is the divergent breakpoint. Use `lg:` (1024px) as the desktop-only modifier; everything below `lg:` is "mobile/tablet" and uses the base (un-prefixed) classes. This is a deliberate choice: the brand designs collapse from a wide two-column / horizontal layout to a single-column stack, and there is no separate tablet variant. Avoid `md:` for layout changes — use only `lg:` so tablet renders identically to mobile.

Section spacing pattern: landing sections use `my-16 lg:my-24` so vertical rhythm tightens on small screens. Most sections also need `px-6 lg:px-0` so they don't run to the edge of small viewports. Hide marketing `<br />`s on small screens via a wrapper: `<span className="hidden lg:inline"><br /></span>` (Tailwind's display utilities don't reliably affect `<br>` directly).

### Stacked two-column section skeleton

Two-column "text + image-placeholder/list" sections (`landing/Questions`, `application/ApplicationSection`, `application/confirm/FAQs`, `application/FAQs`) all follow the same responsive skeleton — reuse this shape when adding new sections of the same shape rather than reinventing the breakpoints:

```tsx
<div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-300 gap-8 lg:gap-16">
  <motion.div variants={slideInLeft} className="shrink text-center lg:text-left">
    {/* heading + body — text-4xl lg:text-7xl-or-8xl, mt-4 lg:mt-6 between heading and body */}
  </motion.div>

  <motion.div
    variants={slideInRight}
    className="w-full lg:w-auto lg:min-w-125 lg:shrink-0 lg:grow aspect-4/3 bg-gray-400 rounded-md"
  />
</div>
```

Key rules:
- Right column gets `w-full lg:w-auto` so it spans the full mobile width but reverts to flex-grow behavior on desktop. Without `lg:w-auto`, `w-full` plus `shrink-0` overflows the row on desktop (this was a real bug).
- All flex/grow/shrink utilities on the right column scope to `lg:` — on mobile it's just a stacked block.
- Text column gets `text-center lg:text-left`; any inner element that uses `ml-auto` on desktop must scope it with `lg:ml-auto` and add `mx-auto` for the mobile centered case.

### Tailwind border-b ↔ border-b-0 gotcha

Tailwind utilities for the same property are sorted by the framework, not by source order in `className`. When `border-b-0` and `border-b` both apply to one element (e.g. `border-b lg:border-b-0` plus `lg:border-b`), the `-0` variant generally wins regardless of class order — silently killing the border. Hit in `Stats.tsx` / `StatsBoard.tsx` when laying out a 2×2 grid that collapses to a single column: the obvious "border-b on mobile, remove on lg, then add back lg:border-b for top row" composes into a conflict. Gate the classes via a single conditional so only one is emitted per state:

```tsx
${isTopRow ? "border-b" : !isLast ? "border-b lg:border-b-0" : ""}
```

Don't try to additively layer them. Same gotcha applies to any pair of Tailwind utilities that touch the same CSS property at different specificity (e.g. `text-base lg:text-base` vs `lg:text-lg`).

### Short mobile dividers between stacked items

When a 2×N grid collapses to a single column (`landing/Stats`, `application/StatsBoard`) or a row of equal items stacks vertically (`landing/Process`, `application/WhatNext`), the dividers between items shouldn't run edge-to-edge on mobile — they're shorter and centered. Render them as absolutely-positioned `<div>` elements inside each item, **not** as `border-b` / `border-y` utilities:

```tsx
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-[70%] bg-[#858585] lg:hidden" />
```

- The item needs `relative` so the absolute divider anchors to it.
- Use `h-px` for thin (Stats-style) dividers, `h-0.5` for thicker (Process/WhatNext-style) dividers — pick to match the original `border-b` / `border-y-2` widths.
- Divider width depends on the parent column width, **not** a fixed value. `Stats` / `StatsBoard` use `w-[70%]` because each item is full-width. `Process` / `WhatNext` use `w-[30%]` because their items sit inside a narrow `max-w-67.5` (270px) column that contains an icon + label row — a 70% divider there spans almost the whole label. Pick the percentage so the divider looks visually centered under the content stack, not edge-to-edge.
- For the middle item of a 3-item row that stacks vertically (needs dividers above *and* below), render two divs — `top-0` and `bottom-0` — each `lg:hidden`.
- Desktop full-length borders use the original `lg:border-b` / `lg:border-r` / `lg:border-x-2` utilities, applied conditionally to the correct items. Both layers coexist: the `lg:hidden` divs only render below `lg:`, the `lg:border-*` classes only render at `lg:`.
- Don't use `after:` pseudo-elements with `lg:after:hidden` for this — pseudo display overrides are flaky in this stack, and pseudo-elements can't be conditionally omitted per-item the way a JSX div can.
