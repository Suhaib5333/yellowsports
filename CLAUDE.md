# Yellow Sports 23 - Project Guidelines

## Overview
Sports retail website for a Bahrain-based store (Yellow Sports 23). React SPA with bilingual EN/AR support, premium animations, and dark theme with yellow accents.

## Tech Stack
- **Framework**: React 19 + TypeScript
- **Build**: Vite 5 with `@vitejs/plugin-react`
- **Styling**: Tailwind CSS 4.2 (via `@tailwindcss/vite` plugin)
- **Animations**: Framer Motion 12 + GSAP 3.14 (scroll triggers)
- **Smooth Scroll**: Lenis 1.3
- **Routing**: React Router DOM 7
- **Components**: Radix UI primitives, CVA, clsx
- **Package Manager**: Bun

## Design System
- **Primary Color**: `#FFE020` (bright yellow)
- **Background**: `#0A0A0A` (near black)
- **Text**: `#F5F5F0` (off-white)
- **Display Font**: Bebas Neue (headings)
- **Body Font**: DM Sans
- **Arabic Font**: Noto Sans Arabic
- **Theme**: Dark mode only, glass morphism effects

## Project Structure
```
src/
  components/       # Reusable UI components
    ui/             # Primitive UI components (liquid-glass-button)
  pages/            # Route pages (Home, Products)
  hooks/            # Custom hooks (useSmoothScroll)
  i18n/             # Language context + translation JSONs (en.json, ar.json)
  lib/              # Utilities (animations.ts, utils.ts)
  assets/
    images/         # Product & store photos
    logos/           # Brand logo
```

## Routes
- `/` — Landing page (Hero, About, ProductsCTA, Contact, Footer)
- `/products` — Product gallery with category filtering

## Conventions
- All text must use i18n translation keys via `useLanguage()` hook — no hardcoded strings
- RTL support required for all new components (check `isRTL` from context)
- Animations: use presets from `src/lib/animations.ts` for Framer Motion
- GSAP used for scroll-triggered effects (parallax, pinning, scale)
- Lenis for smooth scrolling (via `useSmoothScroll` hook in page components)
- Respect `prefers-reduced-motion` in all animations
- Mobile breakpoint at `lg` (1024px)
- WhatsApp integration: +973 3633 4237

## SEO
- **Domain**: yellowsports23.com
- **SEO Package**: `@dr.pogodin/react-helmet` via `HelmetProvider` in main.tsx
- **Per-page SEO**: `src/components/SEO.tsx` — bilingual meta tags, OG, Twitter, canonical
- **Structured Data**: JSON-LD in index.html (SportingGoodsStore, WebSite, BreadcrumbList)
- **Static SEO files**: `public/robots.txt`, `public/sitemap.xml`, `public/manifest.json`
- **Noscript fallback**: Full store info in `<noscript>` block for crawlers
- **Social**: Instagram @yellow_sports_23, TikTok @yellow_sports_23
- **Location**: Building 221a, Road 77, Isa Town, Bahrain (26.1697, 50.5477)
- **Hours**: 10AM–10PM daily

## Frontend Design Tools Installed
- UI UX Pro Max (uipro) - initialized
- Frontend Design plugin - global
- context7 MCP - for library docs
- Spline MCP - for 3D scenes
- GSAP + Lenis already in dependencies
- Framer Motion for component animations

## Scripts
```bash
bun run dev      # Start dev server
bun run build    # Production build
bun run preview  # Preview production build
bun run lint     # ESLint
```
