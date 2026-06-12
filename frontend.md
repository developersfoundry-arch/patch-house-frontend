# StrandsAtHome — Frontend Technical Documentation

A discreet, at-home hair patch service landing site for Delhi NCR. This document covers the architecture, conventions, and key implementation details of the frontend.

---

## 1. Tech Stack

| Layer           | Choice                                                |
| --------------- | ----------------------------------------------------- |
| Framework       | **TanStack Start v1** (React 19, SSR-ready)           |
| Router          | **TanStack Router** (file-based, type-safe)           |
| Build tool      | **Vite 8** + `@tailwindcss/vite` (Lightning CSS)      |
| Styling         | **Tailwind CSS v4** (CSS-first `@theme` tokens)       |
| UI primitives   | **shadcn/ui** on top of Radix UI                      |
| Icons           | **lucide-react**                                      |
| Data fetching   | **@tanstack/react-query** (wired into router ctx)     |
| Forms           | **react-hook-form** + **zod** + `@hookform/resolvers` |
| Notifications   | **sonner**                                            |
| Language        | **TypeScript** (strict mode)                          |
| Runtime target  | Edge / Cloudflare Workers (via TanStack Start)        |
| Package manager | **bun**                                               |

### Notable dev tooling

- `@lovable.dev/vite-tanstack-config` — preset Vite config
- ESLint 9 (flat config) + Prettier 3
- TanStack Router Vite plugin (auto-generates `src/routeTree.gen.ts`)

---

## 2. Project Structure

```
src/
├── assets/                  # Static images (hero, before/after pairs)
├── components/
│   ├── ui/                  # shadcn primitives (accordion, button, dialog…)
│   ├── before-after.tsx     # Draggable before/after comparison slider
│   ├── footer.tsx           # Site footer (dark section)
│   ├── navbar.tsx           # Sticky header w/ scroll-aware backdrop
│   ├── theme-switcher.tsx   # Sun/Moon toggle + useThemeMode() hook
│   └── whatsapp-fab.tsx     # Floating WhatsApp CTA (appears after scroll)
├── data/
│   └── content.ts           # All editable copy (BRAND, FAQ, PRICING, …)
├── hooks/
│   ├── use-mobile.tsx       # Viewport hook
│   └── use-reveal.ts        # IntersectionObserver scroll-reveal
├── lib/
│   ├── api/                 # createServerFn modules (*.functions.ts)
│   ├── config.server.ts     # Server-only config (env)
│   ├── error-capture.ts     # Global error capture wiring
│   ├── error-page.ts
│   ├── lovable-error-reporting.ts
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
├── routes/
│   ├── __root.tsx           # Root layout (HTML shell, providers, head)
│   ├── index.tsx            # "/" — landing page
│   ├── book.tsx             # "/book" — booking form
│   └── login.tsx            # "/login" — phone + OTP (mock)
├── routeTree.gen.ts         # AUTO-GENERATED — do not edit
├── router.tsx               # createRouter() factory
├── server.ts                # SSR entry
├── start.ts                 # TanStack Start bootstrap + global middleware
└── styles.css               # Tailwind v4 entry + design tokens
```

---

## 3. Routing

File-based via `src/routes/`. The TanStack Router Vite plugin regenerates `src/routeTree.gen.ts` automatically — **never hand-edit it**.

| File         | URL      | Notes                                        |
| ------------ | -------- | -------------------------------------------- |
| `__root.tsx` | —        | HTML shell, `<head>`, providers, `<Outlet/>` |
| `index.tsx`  | `/`      | Long-form landing page (hash anchors)        |
| `book.tsx`   | `/book`  | Form, validated with zod                     |
| `login.tsx`  | `/login` | Mock OTP flow → navigates to `/book`         |

### Conventions

- Every route exports `Route = createFileRoute("/path")({...})`.
- Each route defines its own `head()` with route-specific `title` + `description`.
- Navigation uses `<Link to="/path">` from `@tanstack/react-router` — **never** `<a href>` for internal navigation.
- Hash anchors (`#how`, `#results`, `#pricing`, `#faq`) are used **only** for in-page scroll within the long landing page. New shareable sections should become their own route file.

### Router setup (`src/router.tsx`)

```ts
const queryClient = new QueryClient();
createRouter({
  routeTree,
  context: { queryClient },
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
});
```

A fresh `QueryClient` per request keeps SSR safe.

---

## 4. Design System

### 4.1 Tokens (`src/styles.css`)

Tailwind v4 — no `tailwind.config.js`. All design tokens live in `src/styles.css` under `:root` and are exposed to Tailwind via `@theme inline { … }`.

**Brand palette (Navy Trust + Warm Gold):**

| Token             | Role                                     |
| ----------------- | ---------------------------------------- |
| `--ink`           | Deep navy (primary text / dark bg)       |
| `--ink-soft`      | Slightly lifted navy                     |
| `--cream`         | Off-white (light bg / dark-section text) |
| `--cream-soft`    | Tinted ivory                             |
| `--brass`         | Warm gold accent                         |
| `--brass-soft`    | Hover variant                            |
| `--slate-muted`   | Secondary copy                           |
| `--dark-glow-a/b` | Radial glow accents in dark sections     |

All shadcn semantic tokens (`--background`, `--foreground`, `--primary`, `--card`, `--border`, `--ring`, …) are mapped to these brand tokens, so shadcn components inherit the theme automatically.

### 4.2 Fonts

- **Display:** Fraunces (serif, variable) — `font-display`
- **Body:** Inter — `font-sans`

Loaded via `<link rel="stylesheet">` in `__root.tsx` head (never `@import` a URL in CSS — Lightning CSS would break the build).

### 4.3 Dark sections + light/dark mode

Two visual surfaces are used across the page:

- **Light/cream surface** (default) — `bg-cream`, `text-ink`.
- **Dark navy surface** — wrap a section in `className="section-dark grain"`.

`.section-dark` flips the local CSS-variable scope so descendants automatically use the dark palette (`--background: var(--ink)`, `--foreground: var(--cream)`, etc.) and paints two radial glows for atmosphere.

**Light-mode override (`data-mode="light"` on `<html>`):**

- `section-dark` blocks invert: `--cream` is re-pointed to `--ink`, surface becomes soft ivory, text becomes navy. Existing `text-cream` / `bg-ink` utility classes Just Work without component rewrites.
- The `.grain` noise overlay is disabled (it muddies pale surfaces).
- A scoped rule in `styles.css` re-tints the **navbar** in light mode (since the navbar isn't `.section-dark`):
  ```css
  :root[data-mode="light"] header [class*="text-cream"] {
    color: var(--ink);
  }
  :root[data-mode="light"] header [class*="bg-ink"] {
    background-color: oklch(0.97 0.008 90 / 0.85) !important;
  }
  ```

### 4.4 Theme switcher

`src/components/theme-switcher.tsx` exports two things:

```ts
useThemeMode()              // initializes mode from localStorage on mount
<ThemeSwitcher />           // Sun/Moon button (renders inline)
```

- Persisted in `localStorage` under key `sah-mode`.
- Mode toggling sets/removes `data-mode="light"` on `<html>`.
- The `<ThemeSwitcher />` button is mounted **inside the navbar** (both desktop and mobile clusters) — not as a floating FAB.
- `useThemeMode()` is also called once from `RootComponent` so the saved mode is applied on first paint of every route, even routes that don't render the navbar.

### 4.5 Reusable visual utilities

| Class                  | Purpose                                                |
| ---------------------- | ------------------------------------------------------ |
| `.section-dark`        | Flip a section to the dark surface palette             |
| `.grain`               | Subtle SVG noise overlay (auto-disabled in light mode) |
| `.brass-rule`          | Gold horizontal accent line                            |
| `.reveal` / `.in-view` | Scroll-triggered fade-up animation                     |
| `.reveal-delay-1..4`   | Staggered reveal delays                                |
| `.pulse-ring`          | Looping pulse aura (used by WhatsApp FAB)              |

### 4.6 Token rules

- **Never** hardcode colors in components (`text-white`, `bg-[#1a1a2e]`, etc.). Always use semantic Tailwind classes that map to tokens (`text-cream`, `bg-ink`, `text-brass`, `text-foreground`, `bg-background`, …).
- New colors must be added in `styles.css` and mapped under `@theme inline` before they can be used as Tailwind utilities.

---

## 5. Components

### 5.1 `Navbar` (`components/navbar.tsx`)

- Sticky header, transparent at top → adds blurred dark backdrop after 20px scroll.
- Desktop nav: in-page hash links + Login + "Book Home Visit" CTA + `<ThemeSwitcher />`.
- Mobile: hamburger drawer, with `<ThemeSwitcher />` next to the menu button.

### 5.2 `BeforeAfter` (`components/before-after.tsx`)

Custom draggable comparison slider — no external library.

- Two absolutely-positioned `<img>` layers (after as base, before clipped via `clipPath: inset(0 X% 0 0)`).
- Pointer/touch handlers update a `pos` state (0–100).
- Keyboard accessible: the handle is a `role="slider"` button with `aria-valuenow`; ←/→ keys nudge by 4%.
- Both images use `object-cover object-top` so headshots stay framed identically — keep both source images at the same aspect ratio and crop for fair comparison.

### 5.3 `WhatsAppFab` (`components/whatsapp-fab.tsx`)

- Fixed bottom-right FAB that appears after `scrollY > 600`.
- Animated `.pulse-ring` aura.
- Uses `waLink()` from `data/content.ts` so number + message are centralized.

### 5.4 `Footer` (`components/footer.tsx`)

Dark section (`.section-dark grain`) with brand block, service-area cities, quick links, and contact CTAs.

### 5.5 `ui/*` (shadcn primitives)

Standard shadcn components (accordion, button, card, dialog, dropdown-menu, form, input, …). Style tokens come from `:root` + `@theme inline` mappings; do not restyle these components with hardcoded colors.

---

## 6. Hooks

### `useReveal<T>()`

IntersectionObserver-based scroll-in animation. Usage:

```tsx
const r = useReveal();
<div ref={r.ref} className={r.className}>
  …
</div>;
```

Returns `className="reveal in-view"` once the element crosses 15% visibility, then disconnects. Pair with `.reveal-delay-{1..4}` for stagger. Respects `prefers-reduced-motion` (animation disabled).

### `useThemeMode()`

See §4.4. Reads `sah-mode` from localStorage, applies `data-mode` to `<html>`, exposes `{ mode, toggle }`.

### `useIsMobile()` (`hooks/use-mobile.tsx`)

shadcn helper — viewport breakpoint listener.

---

## 7. Content Layer (`src/data/content.ts`)

All editable site copy is centralized here:

- `BRAND` — name, WhatsApp number, default message, service-area cities.
- `waLink(msg?)` — builds a `https://wa.me/<number>?text=<encoded>` URL.
- `TRUST`, `PROBLEMS`, `STEPS`, `COMPARISON`, `PRICING`, `TESTIMONIALS`, `FAQ`.
- `BEFORE_AFTER` — imports paired before/after JPGs from `src/assets/`.

**Editing convention:** non-developers (or future agents) should be able to update most marketing copy here without touching JSX. The landing page consumes these arrays via `.map()`.

---

## 8. Pages

### 8.1 `/` — Landing (`routes/index.tsx`)

Long-form scroll page composed of in-file section components:

1. **Hero** — `.section-dark`, animated headline, dual CTAs (book + WhatsApp), trust bullets.
2. **Problem** — three pain-point cards (icons from lucide).
3. **Results** — `<BeforeAfter />` with thumbnail switcher (`useState` for active index).
4. **How** — 4-step process grid with staggered reveals.
5. **Compare** — clinic vs. StrandsAtHome two-column.
6. **Pricing** — 3 plans, middle one `featured` (gold ring + scale).
7. **Testimonials** — horizontal snap-scroll on mobile, grid on desktop.
8. **FAQ** — shadcn `<Accordion>` driven from `FAQ[]`.
9. **FinalCta** — closing dark section.

Each section uses `useReveal()` for fade-in.

### 8.2 `/book` (`routes/book.tsx`)

- `react-hook-form` + `zod` schema (name, 10-digit phone, city select, address, date ≥ today, slot, concern, optional notes).
- On submit, currently shows a confirmation panel with a WhatsApp deep-link prefilled with the submitted summary (no backend persistence yet).
- Field/label styling centralized in `fieldCls` / `labelCls` consts.

### 8.3 `/login` (`routes/login.tsx`)

- Two-step state machine (`"phone" | "otp"`), no backend — successful OTP just navigates to `/book`.
- To wire real auth later: replace the `submitPhone`/`submitOtp` handlers with calls into the auth provider; gate `/book` behind a `_authenticated` layout if needed.

---

## 9. Root Layout (`src/routes/__root.tsx`)

Responsibilities:

- Declares the HTML shell via `shellComponent: RootShell` (`<html><head><HeadContent/></head><body>{children}<Scripts/></body></html>`).
- Default `<head>` meta (title, description, OG/Twitter), font preconnect, and stylesheet `<link>`s.
- `notFoundComponent` — branded 404 page.
- `errorComponent` — branded error page; the retry button calls **both** `router.invalidate()` and `reset()` so the loader actually re-runs (per TanStack guidance).
- `RootComponent` wraps `<Outlet />` in `<QueryClientProvider>` and calls `useThemeMode()` once so the persisted mode is applied on every route.

> The `<Outlet />` MUST stay in `RootComponent` — removing it breaks every child route.

---

## 10. SSR / Server Boundaries

- `src/server.ts` — SSR handler (auto-managed by TanStack Start; do not create `entry-client.tsx`/`entry-server.tsx`).
- `src/start.ts` — bootstrap; place for global `functionMiddleware` if/when server functions are added.
- Server functions live in `src/lib/api/*.functions.ts` and use `createServerFn` from `@tanstack/react-start`. None are required by the current pages.
- `process.env.*` is server-only. Public values must use `import.meta.env.VITE_*`.

---

## 11. Coding Conventions

- **Imports:** absolute paths via `@/*` (e.g. `@/components/navbar`).
- **JSX class composition:** use `cn()` from `@/lib/utils` when conditionally merging Tailwind classes (handles conflicts via `tailwind-merge`).
- **Forms:** always `react-hook-form` + `zodResolver`; never uncontrolled ad-hoc form state.
- **Toasts:** import `toast` from `sonner` — no legacy `useToast` on this stack.
- **Icons:** import named exports from `lucide-react`, size with `h-X w-X`, color via `text-*` tokens.
- **No `react-router-dom`.** Always `@tanstack/react-router`.
- **No `<a href>` for internal navigation** (breaks preloading + type safety) — use `<Link>`.
- **No new files in `src/pages/`** — that's a different framework's convention; routes belong in `src/routes/`.

---

## 12. Accessibility

- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<ol>`, `<figure>/<figcaption>`, `<blockquote>`.
- Single `<h1>` on the landing page (hero); section headings use `<h2>`/`<h3>`.
- BeforeAfter handle: `role="slider"`, `aria-valuemin/max/now`, arrow-key support.
- All interactive elements have visible focus (Radix primitives + brand-aware `--ring`).
- WhatsApp / Menu / Theme buttons have `aria-label`s.
- `prefers-reduced-motion` disables reveal + pulse animations.

---

## 13. SEO

- Each route sets its own `<title>` and `<meta name="description">` via `head()`.
- Root provides default OG / Twitter tags.
- Add per-route `og:image` at leaf routes only (root-level OG image would override children).
- Smooth-scroll enabled globally (`html { scroll-behavior: smooth }`).

---

## 14. Adding Things

### A new marketing section that should be SEO-indexable

1. Create `src/routes/<name>.tsx` with its own `head()`.
2. Link to it via `<Link to="/<name>">` from the navbar.
3. Do **not** add it as another hash anchor on `/`.

### A new color or design token

1. Add `--my-token` to `:root` in `src/styles.css`.
2. Register it under `@theme inline` so Tailwind generates utilities (e.g. `--color-my-token: var(--my-token)` → `bg-my-token`).
3. If it needs a light-mode variant, add an override under `:root[data-mode="light"]`.

### A new dark section

Wrap with `className="section-dark grain"` — token flipping is automatic.

### A backend

Enable Lovable Cloud first, then add server functions under `src/lib/api/*.functions.ts` and call them from components via `useServerFn` + TanStack Query.

---

## 15. Known Caveats / TODOs

- `BRAND.whatsappNumber` is a placeholder (`919999999999`) — replace before launch.
- `/book` and `/login` are UI-only; wire to a backend (Lovable Cloud / Supabase Auth) when ready.
- Before/after photos are placeholder JPGs in `src/assets/` — swap with consented client images at the same aspect ratio and head framing.
- No analytics / tag manager wired in yet.
