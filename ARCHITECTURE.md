# Yellow Sports 23 — Complete Architecture Reference

> **Purpose**: Exhaustive reference of every design decision, pattern, technique, and implementation detail in this project. Use as a template for future projects.

---

## Table of Contents

1. [Tech Stack & Dependencies](#1-tech-stack--dependencies)
2. [Design System](#2-design-system)
3. [Animation System](#3-animation-system)
4. [Component Architecture](#4-component-architecture)
5. [Page Architecture](#5-page-architecture)
6. [SEO Implementation](#6-seo-implementation)
7. [Internationalization (i18n)](#7-internationalization-i18n)
8. [Responsive Strategy](#8-responsive-strategy)
9. [Performance & Accessibility](#9-performance--accessibility)
10. [Project Structure](#10-project-structure)
11. [Build & Deployment](#11-build--deployment)
12. [Scroll & Navigation System](#12-scroll--navigation-system)
13. [ProductsCTA — Expanding Category Strips](#13-productscta--expanding-category-strips)
14. [CTA Strategy & Traffic Routing](#14-cta-strategy--traffic-routing)
15. [Contact Card Accent System](#15-contact-card-accent-system)
16. [Scroll Animation System](#16-scroll-animation-system)
17. [Mobile Optimization](#17-mobile-optimization)
18. [Social Links & Platforms](#18-social-links--platforms)
19. [Hero Background Treatment](#19-hero-background-treatment)

---

## 1. Tech Stack & Dependencies

### Core

| Tool             | Version | Role                                |
| ---------------- | ------- | ----------------------------------- |
| React            | 19.2.4  | UI framework                        |
| TypeScript       | 5.6.2   | Type safety                         |
| Vite             | 5.4.10  | Build tool (`@vitejs/plugin-react`) |
| React Router DOM | 7.13.2  | Client-side routing                 |
| Bun              | —       | Package manager & runtime           |

### Styling

| Tool          | Version | Role                                               |
| ------------- | ------- | -------------------------------------------------- |
| Tailwind CSS  | 4.2.2   | Utility-first CSS (via `@tailwindcss/vite` plugin) |
| Inline styles | —       | Fine-grained control for premium components        |

### Animation

| Tool          | Version | Role                                                |
| ------------- | ------- | --------------------------------------------------- |
| Framer Motion | 12.38.0 | Component animations, page transitions, gestures    |
| GSAP          | 3.14.2  | Scroll-triggered effects (parallax, pinning, scale) |
| Lenis         | 1.3.21  | Smooth scrolling                                    |

### UI Primitives

| Tool                           | Role                          |
| ------------------------------ | ----------------------------- |
| Radix UI                       | Accessible primitives         |
| CVA (class-variance-authority) | Component variant management  |
| clsx + tailwind-merge          | Conditional class composition |

### SEO

| Tool                     | Version | Role                                       |
| ------------------------ | ------- | ------------------------------------------ |
| @dr.pogodin/react-helmet | 3.1.1   | Per-page meta tags, OG, Twitter, canonical |

---

## 2. Design System

### 2.1 Color Palette

```
Brand Yellow:     #FFE020  (primary — used for CTAs, accents, highlights)
Yellow Dark:      #D4B800  (hover states)
Yellow Light:     #FFF176  (subtle accents)

Background:       #0A0A0A  (primary surface)
Background Dark:  #000000  (deepest)
Background Alt:   #111111  (section contrast)
Background Warm:  #0F0D00  (warm tint)

Section Backgrounds (alternating for depth):
  Hero fade:      → #0D0B06
  About:          #0D0B06  (warm charcoal, yellow undertone)
  Contact:        #100F0A  (lighter warm)
  Footer:         #050505  (deepest)

Text:             #F5F5F0  (primary — off-white)
Text Muted:       #9CA3AF  (secondary)

Platform Colors:
  WhatsApp:       #25D366
  Instagram:      #DD2A7B (gradient: #F58529 → #DD2A7B → #8134AF)
```

### 2.2 Typography

| Role                  | Font             | Weight  | Letter Spacing |
| --------------------- | ---------------- | ------- | -------------- |
| Display (EN headings) | Bebas Neue       | 400     | 0.03–0.06em    |
| Body (EN)             | DM Sans          | 300–700 | 0              |
| Arabic (all)          | Noto Sans Arabic | 300–700 | 0–0.04em       |

**Heading styles**: `text-transform: uppercase` for English, `none` for Arabic. Line-height: 1.05–1.15 for headings, 1.7 for body. Arabic line-height: 1.3–2.0 for readability.

**Font loading**: Google Fonts CDN with `display=swap`, preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`.

### 2.3 Selection & Scrollbar

```css
::selection { background: #FFE020; color: #0A0A0A; }
/* Scrollbar fully hidden — Lenis handles scroll UX */
::-webkit-scrollbar { display: none; width: 0; height: 0; }
html { scrollbar-width: none; -ms-overflow-style: none; }
```

### 2.4 Film Grain Texture

SVG-based procedural noise (`feTurbulence`, baseFrequency 0.85, 4 octaves). Applied as background-image at 180×180px repeat. Used on Hero, About, Contact, Footer at 0.025–0.035 opacity, `overlay` blend mode.

### 2.5 Yellow Ornament Motif

Reusable decorative element used in Hero, About, Contact, Footer, SectionDivider:

```
[— line —] ◆ [— line —]
```

- Lines: 1–2px height, #FFE020 (or lower opacity)
- Diamond: 4–6px, rotated 45°
- Total width: 56–72px
- RTL-aware: `flexDirection: row-reverse` when `isRTL`

---

## 3. Animation System

### 3.1 Easing Presets

```typescript
smooth: [0.22, 1, 0.36, 1]; // Standard deceleration (used everywhere)
bounce: [0.68, -0.55, 0.265, 1.55]; // Playful overshoot
snap: [0.5, 0, 0, 1]; // Sharp snap
```

**The `[0.22, 1, 0.36, 1]` ease is the signature curve** — used on nearly every entrance animation, scroll reveal, and hover transition throughout the site.

### 3.2 Spring Physics

```typescript
// Default natural spring — most entrance animations
springTransition:  { stiffness: 100, damping: 24, mass: 0.9 }

// Quick interactions — buttons, toggles
snappySpring:      { stiffness: 350, damping: 28, mass: 0.6 }

// Dramatic reveals — hero, large elements
slowSpring:        { stiffness: 50, damping: 20, mass: 1.2 }

// Reset after interaction — tilt/magnetic
tiltResetTransition: { stiffness: 200, damping: 20, mass: 0.5 }
```

### 3.3 Stagger Containers

| Name                   | Stagger | Delay | Use Case                 |
| ---------------------- | ------- | ----- | ------------------------ |
| `staggerContainer`     | 0.08s   | 0.15s | Standard section reveals |
| `staggerContainerSlow` | 0.15s   | 0.3s  | Dramatic hero sequences  |
| `staggerFast`          | 0.05s   | 0.1s  | Grid items, rapid lists  |

### 3.4 Core Animation Variants

| Variant          | Movement                      | Blur  | Transition  |
| ---------------- | ----------------------------- | ----- | ----------- |
| `fadeIn`         | —                             | 4px→0 | 0.6s smooth |
| `fadeUpItem`     | y: 30→0                       | 4px→0 | spring      |
| `slideUp`        | y: 20→0                       | 3px→0 | spring      |
| `slideDown`      | y: -20→0                      | 3px→0 | spring      |
| `zoomIn`         | scale: 0.9→1                  | 6px→0 | spring      |
| `scaleIn`        | scale: 0.8→1                  | 6px→0 | slowSpring  |
| `rotateIn`       | scale: 0.85→1, rotate: -6°→0° | 4px→0 | spring      |
| `slideFromLeft`  | x: -50→0                      | 4px→0 | spring      |
| `slideFromRight` | x: +50→0                      | 4px→0 | spring      |

### 3.5 Typography Animations

| Variant          | Movement                  | Effect                |
| ---------------- | ------------------------- | --------------------- |
| `charRevealItem` | y: 20→0, rotateX: -90°→0° | 3D flip per character |
| `wordRevealItem` | y: 40→0, rotateX: -45°→0° | Rise + tilt per word  |

### 3.6 Clip-Path Reveals

```typescript
clipRevealLeft:  inset(0 100% 0 0) → inset(0 0% 0 0)   // Wipe from left
clipRevealRight: inset(0 0 0 100%) → inset(0 0 0 0%)    // Wipe from right
```

### 3.7 Hover & Interaction Patterns

- **hoverLift**: y: -4px, shadow deepens (0 2px 8px → 0 12px 32px)
- **pulseGlow**: Yellow glow pulse, 2s infinite
- **magneticHover**: scale 1→1.05 hover, 0.97 tap
- **getMagneticValues()**: Cursor-distance-based pull (strength 0.3, deadzone support)
- **getTiltValues()**: 3D rotation from cursor position (max 15°)

### 3.8 GSAP Scroll Patterns

| Pattern                | Trigger              | Effect                        |
| ---------------------- | -------------------- | ----------------------------- |
| Hero card-stack        | top top → bottom top | scale 0.97, borderRadius 16px |
| Content parallax       | top top → bottom top | yPercent -12 to -15           |
| Image zoom             | top 85% → bottom 15% | scale 1.08→1                  |
| Image counter-parallax | top 85% → bottom 15% | scale 1.1→1, yPercent -4→4    |
| Pinning (ProductsCTA)  | top top → +=80%      | Pin section, parallax bg      |

### 3.9 Timing Reference

| Duration | Use                                 |
| -------- | ----------------------------------- |
| 0.3s     | Hover states, quick interactions    |
| 0.5s     | Border scales, underline reveals    |
| 0.6–0.7s | Standard entrance animations        |
| 0.8s     | Clip-path reveals                   |
| 1.1s     | Full reveals (map, images)          |
| 1.2s     | Lenis scroll duration, line reveals |
| 2.0s     | Pulse animations (infinite)         |
| 2.5s     | Hero background zoom                |

---

## 4. Component Architecture

### 4.1 Hero — Orchestrated Entrance

5-phase staggered entrance system (reduced-motion aware):

| Phase | Delay  | Content                                     |
| ----- | ------ | ------------------------------------------- |
| 1     | 100ms  | Background image zoom (1.06→1 scale)        |
| 2     | 400ms  | Brand label + yellow stripe ornament        |
| 3     | 750ms  | Two-line tagline with word-reveal animation |
| 4     | 1500ms | CTA buttons (primary + secondary row)       |
| 5     | 2200ms | Scroll indicator with bounce                |

**CTA Layout** — stacked with 50/50 secondary:

```
┌──────────────────────────────────┐
│       EXPLORE PRODUCTS    →      │  ← Full-width yellow (#FFE020)
└──────────────────────────────────┘
┌───────────────┐ ┌────────────────┐
│  View on Insta │ │ Order WhatsApp │  ← 50/50, platform colors
└───────────────┘ └────────────────┘
```

**Overlay stack** (bottom to top):

1. Background image (slight blur 2px, scale 1.04)
2. Linear gradient overlay (170deg, 0.9→0.72→0.95 opacity)
3. Radial vignette (transparent 25% → 0.6 at edges)
4. Film grain (0.035 opacity, overlay blend)
5. Content (z-10)
6. Bottom gradient fade (120px, to section below)

### 4.2 About — Split Layout

**Grid**: 45% image | 1fr text, 80px gap, centered alignment.

**Image column**:

- Main portrait: clip-path reveal from bottom, 3:4 aspect ratio, GSAP parallax zoom
- Accent overlay image: positioned absolute, offset into gap (-36px right, -48px bottom), 52% width
- Accent frame: 3px border matching bg color, inner 1px yellow border, deep shadow
- Yellow vertical accent line: 1px, 35% opacity, scaleY animation
- Caption badge: glass morphism (rgba(10,10,10,0.82), blur 8px, yellow border)

**Text column**:

- Label + ornament → Title (display font) → Description → Ornament divider → Stats row

**Animated counter**: easeOut cubic (`1 - (1-progress)^3`), 2000ms duration, triggered by inView.

### 4.3 Contact — Premium Two-Column

**Map column**:

- iframe with dark filter (`brightness(0.75) contrast(1.1) saturate(0.3)`)
- Accent frame treatment (matching About's image framing)
- Address badge overlay with glass morphism
- Yellow vertical accent line
- Full-width "Get Directions" yellow CTA below map

**Contact cards column**:

- Stack of 5 cards: WhatsApp (accent), Phone, Instagram, TikTok, Hours, Directions
- Accent cards: left yellow bar (2px), yellow icon circle, platform-tinted background
- Arrow indicators that shift on hover (RTL-aware)

### 4.4 Header — Dual Navigation

**Two separate navbars** controlled by CSS media queries:

- `nav-mobile`: flex layout, hamburger menu (< 1024px)
- `nav-desktop`: CSS grid 3-column layout (≥ 1024px)

**Scroll behavior**: `useScroll()` → `useMotionValueEvent` at 80px threshold triggers bg/blur/border transitions.

**Active section**: IntersectionObserver with `-40%` rootMargin on each section ID.

**Scroll progress bar**: `useSpring(scrollYProgress)` → `scaleX` transform, yellow with glow.

**Mobile overlay**: Full-screen with radial yellow glow, staggered nav items, language toggle.

### 4.5 WhatsApp Floating Button

- Fixed position bottom-right, z-50
- Green (#25D366) with pulse ring animation (2.5s infinite)
- Tooltip on hover: glass morphism with yellow accent dot
- Spring entrance with 2s delay
- RTL-aware tooltip position

### 4.6 Section Dividers

Animated yellow ornament between sections:

- Left line (gradient fade to yellow) + center diamond + right line
- scaleX animation from edges inward, diamond scales with delay
- Background color prop to match section below
- Responsive padding: `clamp(24px, 6vw, 40px)`

### 4.7 Footer — Centered Brand

Sections top to bottom:

1. Logo (64px, rounded, yellow border glow)
2. Brand name (display font, yellow, text-shadow glow)
3. Tagline (muted, small)
4. Yellow ornament
5. Nav links (uppercase, muted, yellow on hover)
6. Social icons (42px circles, platform-colored hover)
7. Divider line + copyright

---

## 5. Page Architecture

### 5.1 Home Page

```
<main>
  <SEO ... />
  <Hero />
  <About />
  <SectionDivider bg="#0D0B06" />
  <ProductsCTA />
  <SectionDivider bg="#100F0A" />
  <Contact />
  <SectionDivider bg="#050505" />
  <Footer />
</main>
```

### 5.2 Products Page

**Hero banner**: Parallax bg, cinematic overlays, word-reveal title, subtitle.

**Sticky filter bar**: Glass morphism, category buttons (yellow active state, muted inactive), no item counts.

**Editorial grid** (CSS Grid):

```css
grid-template-columns: repeat(4, 1fr);
grid-auto-rows: 280px;
grid-auto-flow: dense; /* Fill gaps automatically */
gap: 6px;
```

| Span        | Grid Effect         | Use Case         |
| ----------- | ------------------- | ---------------- |
| `featured`  | 2 cols × 2 rows     | Hero images      |
| `tall`      | 1 col × 2 rows      | Portrait images  |
| `wide`      | 2 cols × 1 row      | Landscape images |
| `panoramic` | Full width (1 / -1) | Closing image    |
| (default)   | 1 col × 1 row       | Standard items   |

**Product card hover effects**:

- Image zoom 1.02→1.12
- Animated yellow border trace (top + left edges)
- Gradient overlay with yellow tint
- Category badge slide-up with yellow dot indicator
- Corner glow + border outline

**Bottom CTA**: Two equal-width buttons (Instagram + WhatsApp) with platform-tinted transparent backgrounds.

**Responsive**: 4 cols → 3 cols (tablet) → 2 cols (mobile). Featured spans collapse on mobile.

### 5.3 404 Page

- Centered column, `#0A0A0A` bg
- Large "404" in display font with yellow glow
- Bilingual message
- Yellow CTA back to home
- `noindex, nofollow` meta

---

## 6. SEO Implementation

### 6.1 Static SEO (index.html)

**Meta tags**: title (bilingual, keyword-rich), description (160 chars EN+AR), keywords (30+ terms both languages), author, robots (`index, follow, max-image-preview:large`), theme-color, canonical, geo tags (region, placename, coordinates, ICBM).

**Open Graph**: type, site_name, title, description, url, image (with type/width/height/alt), locale + alternate.

**Twitter Card**: `summary_large_image`, site handle, title, description, image + alt.

**Apple/PWA**: apple-mobile-web-app-capable, status-bar-style (black-translucent), title, mobile-web-app-capable, format-detection.

**Hreflang**: `<link rel="alternate">` for en, ar, x-default.

### 6.2 Structured Data (JSON-LD)

Three blocks in index.html:

1. **SportingGoodsStore**: name/alternateName, description, url, logo, telephone, address (street, locality, region, country), geo coordinates, opening hours (7 days, 10:00–22:00), social links (Instagram, TikTok, WhatsApp), product catalog (5 categories), area served (Bahrain), currency (BHD), payment methods.

2. **WebSite**: name, alternateName, url, inLanguage [en, ar].

3. **BreadcrumbList**: Home → Products.

### 6.3 Per-Page SEO (React Helmet)

`HelmetProvider` wraps entire app in `main.tsx`. Reusable `SEO` component (`src/components/SEO.tsx`) accepts bilingual props and renders:

- `<html lang>` and `dir` attributes
- title, description, keywords, author, canonical
- Full OG suite (type, site_name, title, desc, url, image with type/size/alt, locale)
- Full Twitter card (card type, site, title, desc, image, alt)
- hreflang alternates (en, ar, x-default)

### 6.4 Static Files

| File                   | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `public/robots.txt`    | Allow all, disallow /assets/, sitemap reference          |
| `public/sitemap.xml`   | Both routes with lastmod, hreflang, changefreq, priority |
| `public/manifest.json` | PWA metadata (name, colors, icons, categories)           |

### 6.5 Noscript Fallback

Full store information in `<noscript>` block: name (EN + AR), description, address, phone link, hours, Instagram link, WhatsApp link. Styled with dark bg and yellow accents.

---

## 7. Internationalization (i18n)

### 7.1 Architecture

Context-based system with `LanguageProvider` wrapping the entire app.

**Storage**: `localStorage` key `ys-lang`, default `ar`.

**Hook**: `useLanguage()` returns `{ lang, t, toggleLanguage, isRTL }`.

**HTML updates**: On toggle, updates `document.documentElement.lang` and `dir` attributes.

### 7.2 RTL Patterns

Every component checks `isRTL` and adjusts:

- `flexDirection: row-reverse` for ornaments/labels
- `direction: rtl` for text blocks
- `transform: scaleX(-1)` for directional arrows
- `textAlign: right` for content blocks
- `order` property for grid column swapping (image/text)
- `[isRTL ? 'right' : 'left']` for absolute positioning
- Font family: `var(--font-arabic)` instead of `var(--font-display)` or `var(--font-sans)`
- Letter spacing: reduced (0.04em) for Arabic vs wider for English (0.2–0.35em)
- Text transform: `none` for Arabic vs `uppercase` for English
- Font weight: `700` for Arabic headings vs `400` for English (Bebas Neue is already bold)
- Line height: higher for Arabic (1.3–2.0) vs English (1.05–1.15)

### 7.3 Translation Keys

```
nav:          home, about, products, contact
hero:         tagline, cta, scroll
about:        title, subtitle, description, cta
productsCta:  title, subtitle, cta, whatsappCta
contact:      title, subtitle, reachOut, phone, whatsapp, email,
              instagram, tiktok, findUs, getDirections, hours, hoursValue
footer:       rights, tagline
products:     title, collection, subtitle, back, all, jerseys, trophies,
              collectibles, footballs, accessories, visitCta, whatsappCta,
              instaCta, items
```

---

## 8. Responsive Strategy

### 8.1 Breakpoints

| Name    | Width      | Nav          | Grid        |
| ------- | ---------- | ------------ | ----------- |
| Mobile  | < 769px    | Hamburger    | 1–2 columns |
| Tablet  | 769–1024px | Hamburger    | 2–3 columns |
| Desktop | ≥ 1024px   | Full nav bar | 4 columns   |

### 8.2 Responsive Techniques

- **CSS media queries** in `<style>` blocks within components (not Tailwind) for complex layouts
- **Tailwind** classes for simple responsive (padding, display, font sizes)
- **`clamp()`** for fluid typography: `clamp(2rem, 5vw, 5.5rem)` for headings
- **`clamp()`** for fluid spacing: `clamp(24px, 6vw, 40px)` for section padding
- Grid transitions: `grid-template-columns: 45% 1fr` → `1fr` on mobile
- Hidden elements: accent lines, overlapping images hidden on mobile
- Collapsed spans: featured (2×2) → (2×1) on mobile in product grid

### 8.3 Nav Visibility

```css
/* Mobile-first: hamburger visible */
.nav-mobile {
  display: flex !important;
}
.nav-desktop {
  display: none !important;
}

@media (min-width: 1024px) {
  .nav-mobile {
    display: none !important;
  }
  .nav-desktop {
    display: grid !important;
  }
}
```

---

## 9. Performance & Accessibility

### 9.1 Reduced Motion

Hero and About check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip GSAP/entrance animations. Phase system jumps to final state immediately.

Global CSS:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 9.2 Image Optimization

- Decorative images: `alt="" aria-hidden="true"`
- Content images: descriptive alt text, bilingual where needed
- Image filter on map: `brightness(0.75) contrast(1.1) saturate(0.3)` to match dark theme
- Loading: `loading="lazy"` on iframe embeds

### 9.3 Accessibility

- Semantic HTML: `<main>`, `<section>`, `<nav>`, `<footer>`, `<header>`
- Section IDs for anchor navigation
- `aria-label` on icon-only buttons and social links
- `aria-expanded` on hamburger menu
- Keyboard navigation: Escape closes mobile menu
- Focus-visible outlines on interactive elements
- External links: `rel="noopener noreferrer"`, `target="_blank"`

### 9.4 Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<!-- display=swap for FOUT over FOIT -->
```

---

## 10. Project Structure

```
yellowsports/
├── index.html              # Entry HTML with SEO, structured data, noscript
├── CLAUDE.md               # Project conventions & guidelines
├── ARCHITECTURE.md         # This file
├── vite.config.ts          # Vite + React + Tailwind plugins
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript config
├── public/
│   ├── logo.jpeg           # Brand logo (favicon, OG image, touch icon)
│   ├── robots.txt          # Crawler directives + sitemap reference
│   ├── sitemap.xml         # URL list with hreflang + lastmod
│   └── manifest.json       # PWA metadata
└── src/
    ├── main.tsx            # React mount + HelmetProvider
    ├── App.tsx             # BrowserRouter + Routes + ScrollToTop + scrollRestoration
    ├── index.css           # Tailwind imports, CSS variables, global styles
    ├── components/
    │   ├── Header.tsx      # Dual nav (mobile/desktop), scroll progress
    │   ├── Hero.tsx        # 5-phase entrance, CTA stack, GSAP parallax
    │   ├── About.tsx       # Split grid, image framing, stats counter
    │   ├── ProductsCTA.tsx # Expanding category strips (21st.dev pattern)
    │   ├── Contact.tsx     # Map + contact cards, glass morphism
    │   ├── Footer.tsx      # Brand center, nav, social, copyright
    │   ├── WhatsAppButton.tsx  # Floating CTA with pulse + tooltip
    │   ├── LanguageToggle.tsx  # EN/AR switch with flags
    │   ├── SectionDivider.tsx  # Animated yellow ornament separator
    │   └── SEO.tsx         # Per-page meta tags via Helmet
    ├── pages/
    │   ├── Home.tsx        # Section composition + SEO
    │   ├── Products.tsx    # Editorial grid, filtering, product cards
    │   └── NotFound.tsx    # 404 page (noindex)
    ├── hooks/
    │   └── useSmoothScroll.ts  # Lenis init + RAF loop + smoothScrollTo helper
    ├── i18n/
    │   ├── LanguageContext.tsx  # React context + localStorage persistence
    │   ├── en.json         # English translations
    │   └── ar.json         # Arabic translations
    ├── lib/
    │   ├── animations.ts   # All Framer Motion presets + helpers
    │   └── utils.ts        # Utility functions (cn, etc.)
    └── assets/
        ├── images/         # Product & store photos (15 JPEGs)
        └── logos/          # Brand logo
```

---

## 11. Build & Deployment

### Scripts

```bash
bun run dev      # Vite dev server with HMR
bun run build    # Production build (dist/)
bun run preview  # Preview production build locally
bun run lint     # ESLint
```

### Vite Config

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Domain & Hosting

- **Domain**: yellowsportsbh.com
- **Routing**: Client-side SPA (BrowserRouter) — host must serve index.html for all routes

### Contact & Social

| Channel     | Value                                     |
| ----------- | ----------------------------------------- |
| WhatsApp    | +973 3633 4237                            |
| Instagram   | @yellow_sports_23                         |
| TikTok      | @yellow_sports_23                         |
| Address     | Building 221a, Road 77, Isa Town, Bahrain |
| Coordinates | 26.1697°N, 50.5477°E                      |
| Hours       | 10AM–10PM daily                           |

---

## Appendix: Key Design Decisions

1. **Dark-only theme** — No light mode. Background alternates between warm darks (#0D0B06, #100F0A, #050505) for section separation.

2. **Inline styles over Tailwind** for premium components — Fine-grained control over animations, gradients, shadows. Tailwind used for quick utility classes.

3. **Film grain on every major section** — Adds analog texture, masks JPEG compression artifacts.

4. **Yellow ornament as consistent motif** — The diamond-line pattern ties all sections together visually.

5. **Glass morphism for interactive elements** — Backdrop blur + semi-transparent backgrounds on buttons, tooltips, badges, contact cards.

6. **Platform-colored social buttons** — Instagram gets its gradient, WhatsApp gets green, rather than forcing everything into the yellow brand palette.

7. **GSAP for scroll effects, Framer Motion for component animations** — GSAP handles scroll-linked effects (parallax, pinning) while Framer Motion handles entrance/exit/gesture animations. No overlap.

8. **`prefers-reduced-motion` respected** — GSAP effects and phase timers skip when enabled. CSS fallback disables all transitions.

9. **Bilingual-first architecture** — Every string through i18n, every layout RTL-tested, every font switchable. Arabic gets higher line-height, no uppercase, wider font weights.

10. **SEO for SPAs** — React Helmet for dynamic meta tags, JSON-LD structured data baked into index.html, noscript fallback with full content, robots.txt + sitemap.xml.

11. **No back button on Products page** — Users navigate via the persistent header instead of a redundant back arrow.

12. **Editorial product grid with dense auto-flow** — Mixed card sizes (featured, tall, wide, panoramic) with CSS Grid's `dense` flow to prevent gaps automatically.

13. **Section dividers between content blocks** — Animated yellow ornament separators with matching background colors for seamless transitions.

14. **Floating WhatsApp button with delayed entrance** — 2-second delay after page load prevents distraction during hero entrance sequence.

15. **Lenis-first scroll navigation** — All programmatic scrolling uses `lenis.scrollTo()` instead of native `scrollIntoView`, preventing conflicts when the user is mid-scroll.

16. **Expanding category strips on home** — 21st.dev-inspired hover-expanding vertical strips for product categories. 5 strips with `flex` transitions instead of a basic grid.

17. **Dual CTA strategy** — Instagram for browsing products, WhatsApp for ordering. Both accessible from Products page bottom.

18. **Hidden scrollbar** — Browser scrollbar fully hidden via CSS (`scrollbar-width: none`, `::-webkit-scrollbar { display: none }`). Lenis handles all scroll UX.

---

## 12. Scroll & Navigation System

### 12.1 Lenis Integration

Lenis smooth scroll is initialized in `AppContent` via `useSmoothScroll()`. The Lenis instance is stored on `window.__lenis` so any component can access it for programmatic scrolling.

```typescript
// hooks/useSmoothScroll.ts
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 2,
  infinite: false,
})
window.__lenis = lenis
```

### 12.2 smoothScrollTo Helper

All programmatic scrolling goes through `smoothScrollTo()` which:
1. Calls `lenis.stop()` to kill any in-progress scroll momentum
2. Waits one `requestAnimationFrame` for the stop to take effect
3. Calls `lenis.start()` to re-enable scrolling
4. Calls `lenis.scrollTo(el)` to scroll to the target

This prevents the bug where clicking a nav item while scrolling would be ignored because Lenis was still processing previous momentum.

```typescript
export function smoothScrollTo(el: HTMLElement) {
  const lenis = window.__lenis
  if (lenis) {
    lenis.stop()
    requestAnimationFrame(() => {
      lenis.start()
      lenis.scrollTo(el, { offset: 0, duration: 1.2 })
    })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
```

### 12.3 ScrollToTop Component

`App.tsx` includes a `ScrollToTop` component that resets scroll position on every route change:
- `window.scrollTo(0, 0)` — native reset
- `document.documentElement.scrollTop = 0` — backup
- `lenis.scrollTo(0, { immediate: true })` — Lenis reset (instant, no animation)

Additionally, `history.scrollRestoration = 'manual'` disables the browser's automatic scroll position restoration.

Products page also has a backup reset on mount with retry timeouts (50ms, 150ms) in case Lenis initializes after the first reset.

### 12.4 Cross-Page Navigation

When clicking a nav item from `/products` to scroll to a section on `/`:
1. `setActiveSection(id)` — immediate visual feedback (yellow highlight)
2. `navigate('/')` — route change
3. Retry loop (up to 15 attempts, 80ms apart) waits for the target section to mount in the DOM
4. Once found, calls `smoothScrollTo(el)` to scroll via Lenis

### 12.5 Active Section Detection

- **On home page**: `IntersectionObserver` with `-40% 0px -40% 0px` rootMargin on each section ID
- **On /products page**: "Products" nav item highlights automatically (fallback when `activeSection` is still default `'hero'`)
- **On click**: `setActiveSection(id)` called immediately for instant feedback before any scrolling occurs
- **Escape key**: Closes mobile menu overlay
- **Route change**: Auto-closes mobile menu

### 12.6 Scrollbar

Browser scrollbar fully hidden:
```css
::-webkit-scrollbar { display: none; width: 0; height: 0; }
html { scrollbar-width: none; -ms-overflow-style: none; }
```

Scroll progress is shown via a yellow progress bar at the bottom of the header (`useSpring(scrollYProgress)` → `scaleX` transform) that appears after 80px scroll.

---

## 13. ProductsCTA — Expanding Category Strips

### 13.1 Design (21st.dev Inspiration)

Inspired by 21st.dev's Image Gallery hover-expansion pattern. 5 vertical strips representing product categories, displayed side-by-side at 540px height on desktop.

### 13.2 States

| State | Flex Value | Visual |
|-------|-----------|--------|
| Default (no hover) | `flex: 1` | Equal width, vertical label centered |
| Active (hovered) | `flex: 4` | Expands wide, shows full info at bottom |
| Collapsed (sibling hovered) | `flex: 0.6` | Compresses narrow |

Transition: `0.7s cubic-bezier(0.22, 1, 0.36, 1)`

### 13.3 Strip Content

**Collapsed state**: Vertical text label (`writing-mode: vertical-rl`), index number in top corner (01–05), permanent gradient overlay.

**Expanded state**: Yellow dot + item count badge, large category name (Bebas Neue 36px), animated yellow underline, corner radial glow.

**Hover effects**: Image zoom 1.02→1.05, yellow accent line sweeps top + left edges, border highlight, gradient shift with yellow tint.

### 13.4 Mobile Fallback

On screens < 1024px, strips switch to a 2-col (mobile) / 3-col (tablet) grid of 3:4 aspect cards with permanent category labels. Desktop strips use `lg:!flex`, mobile grid uses `lg:!hidden`.

### 13.5 Centering

All layout uses explicit inline `marginLeft/marginRight: 'auto'` instead of Tailwind utility classes (which can conflict with RTL direction or Tailwind v4 class resolution). Container: `maxWidth: '1200px'`, strips: `maxWidth: '1100px'`.

---

## 14. CTA Strategy & Traffic Routing

### 14.1 Goal

Drive visitors to Instagram (to browse full product catalog) and WhatsApp (to place orders).

### 14.2 CTA Placement

| Location | Primary CTA | Secondary CTA |
|----------|-------------|---------------|
| Hero | Explore Products (scrolls to ProductsCTA) | Instagram + WhatsApp (50/50 row) |
| ProductsCTA (home) | View Some of Our Products → `/products` | — |
| Products page bottom | View More on Instagram (yellow) | Order via WhatsApp (green) |
| Contact section | WhatsApp CTA (green, full-width) | — |
| Floating button | WhatsApp (always visible) | — |

### 14.3 Platform Links

| Platform | Handle | URL |
|----------|--------|-----|
| Instagram | @yellow_sports_23 | instagram.com/yellow_sports_23/ |
| TikTok | @yellow_sports_23 | tiktok.com/@yellow_sports_23 |
| WhatsApp | +973 3633 4237 | wa.me/97336334237 |

### 14.4 Button Styling — Transparent Tinted Theme

Hero and Products page social buttons use a **transparent tinted ghost** style:

- **Instagram**: `rgba(221,42,123,0.06)` bg, `rgba(221,120,170,0.7)` text, `rgba(221,42,123,0.12)` border. Hover intensifies all values. No solid gradient.
- **WhatsApp**: `rgba(37,211,102,0.06)` bg, `rgba(37,211,102,0.6)` text, `rgba(37,211,102,0.12)` border. Hover intensifies.
- **Internal navigation**: solid `#FFE020` (brand yellow), dark text, arrow icon
- All buttons: `whileHover` scale 1.03, backdrop blur 8px, no glow shadows — dark and understated

Footer Instagram icon: fills with full Instagram gradient on hover (bg becomes `linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)`).

---

## 15. Contact Card Accent System

### 15.1 Architecture

Contact cards support per-platform accent theming via `accent` prop on `ContactItemData`:

```typescript
interface ContactItemData {
  key: string
  label: string
  value: string
  href: string
  icon: React.ReactNode
  accent?: 'whatsapp' | 'insta' | 'tiktok'
}
```

### 15.2 Color Map

```typescript
const colorMap = {
  whatsapp: { r: 37, g: 211, b: 102, hex: '#25D366', text: 'rgba(37,211,102,0.75)' },
  insta:    { r: 221, g: 42, b: 123, hex: '#DD2A7B', text: 'rgba(221,120,170,0.75)' },
  tiktok:   { r: 255, g: 255, b: 255, hex: '#F5F5F0', text: 'rgba(245,245,240,0.6)' },
}
```

### 15.3 Card Visual Treatment Per Accent

Each accented card gets:

| Element | WhatsApp | Instagram | TikTok | Default |
|---------|----------|-----------|--------|---------|
| Left bar | Solid green | Gradient (orange→pink→purple) | Solid white | None |
| Icon circle bg | Green 8% | Gradient 12% | White 8% | White 4% |
| Icon circle border | Green 18% | Pink 20% | White 18% | White 6% |
| Icon color | `#25D366` | `#DD2A7B` | `#F5F5F0` | Muted white |
| Value text | Green 75% | Pink 75% | White 60% | White |
| Hover border | Green 30% | Pink 30% | White 30% | Yellow 25% |
| Hover shadow | Green-tinted | Pink-tinted | Neutral | Yellow-tinted |

---

## 16. Scroll Animation System

### 16.1 New Animation Variants

Added to `lib/animations.ts`:

| Variant | Movement | 3D Effect | Blur | Duration |
|---------|----------|-----------|------|----------|
| `scrollReveal3D` | y: 40→0 | rotateX: -8°→0° | 6px→0 | 0.8s |
| `scrollRevealLeft` | x: -40→0 | rotateY: 6°→0° | 4px→0 | 0.7s |
| `scrollRevealRight` | x: 40→0 | rotateY: -6°→0° | 4px→0 | 0.7s |
| `scrollScaleUp` | y: 30→0, scale: 0.92→1 | — | 8px→0 | 0.9s |

### 16.2 3D Title Reveals

All major section titles (About, ProductsCTA, Contact) use `perspective: 800px` with `rotateX: -8` → `0` entrance animation. Creates a subtle "flipping toward camera" effect visible on both mobile and desktop.

### 16.3 GSAP Parallax Layers

| Section | Target | Speed | Direction | Scrub |
|---------|--------|-------|-----------|-------|
| About | Text column | ±4% yPercent | Vertical | 1.8 |
| About | Main image | 1.08→1 scale | Scale | 1.5 |
| About | Accent image | ±4% yPercent + 1.1→1 scale | Both | 2 |
| ProductsCTA | Mobile category cards | ±8-12% yPercent (alternating) | Vertical | 1.5 |
| Products | Grid cards (even) | ±3% yPercent | Vertical | 2 |
| Products | Grid cards (odd) | ∓3% yPercent | Vertical (opposite) | 2 |
| Hero | Content | -12 to -15% yPercent | Up | 1 |
| Hero | Background | +20% yPercent | Down | 1.2 |

The alternating parallax on product grid cards creates a subtle wave/depth effect on scroll — even columns move slightly faster than odd columns.

### 16.4 Contact Card 3D Entrance

Contact cards enter with `rotateX: -6` + blur, staggered by `index * 0.08s`. Creates a card-flip cascade effect visible on mobile scroll.

### 16.5 SectionDivider Diamond Spin

Diamond rotates from 135° to 45° during entrance (full 90° rotation), creating a satisfying spin-into-place effect.

### 16.6 Footer 3D Brand Reveal

Brand name enters with `rotateX: -10` + 4px blur, creating a subtle flip-up effect matching the section title pattern.

---

## 17. Mobile Optimization

### 17.1 Responsive Clamp Values

All hardcoded pixel paddings replaced with `clamp()` for fluid scaling:

| Element | Mobile Min | Preferred | Desktop Max |
|---------|-----------|-----------|-------------|
| Hero content padding top | 80px | 14vw | 100px |
| Hero content padding bottom | 90px | 16vw | 120px |
| Hero CTA button padding | 16px 28px | 3vw 8vw | 22px 52px |
| SectionDivider padding | 24px | 6vw | 40px |
| SectionDivider line width | 80px | 30vw | 180px |
| ProductsCTA CTA button | 16px 28px | 3vw 8vw | 20px 52px |
| Contact card padding | 14px 14px | 2.5vw 3vw | 18px 20px |
| Contact directions button | 14px 20px | 2.5vw 5vw | 16px 32px |
| About stats gap | 12px | 4vw | 24px |
| Products filter buttons | 6px 12px | 1.5vw 3vw | 8px 18px |

### 17.2 Small Mobile Breakpoints (≤420px)

Added media queries for very small screens:

- Products grid: `grid-auto-rows: 170px`, `gap: 3px`
- Products CTA buttons: stack vertically (`flex-direction: column`)
- Products filter bar: tighter gap (6px)
- Contact section: padding reduced to 48px 16px

### 17.3 ProductsCTA Mobile Cards

- Aspect ratio: `4/5` (was `3/4` — less tall, more content visible)
- Last card (accessories): `col-span-2` with `16/9` aspect ratio to fill the grid row
- Card info padding: `p-4` (was `p-5`)

### 17.4 Safe Area Support

```css
@supports (padding: max(0px)) {
  body {
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
}
```

### 17.5 Hidden Scrollbar

Browser scrollbar fully hidden. Lenis handles all scroll UX. Scroll progress shown via yellow progress bar in the header.

---

## 18. Social Links & Platforms

### 18.1 Platform Registry

| Platform | Handle | URL | Color |
|----------|--------|-----|-------|
| Instagram | @yellow_sports_23 | instagram.com/yellow_sports_23/ | `#DD2A7B` (gradient: `#F58529→#DD2A7B→#8134AF`) |
| TikTok | @yellow_sports_23 | tiktok.com/@yellow_sports_23 | White/neutral |
| WhatsApp | +973 3633 4237 | wa.me/97336334237 | `#25D366` |

### 18.2 Where Each Platform Appears

| Platform | Hero | Products CTA | Contact Cards | Footer Icons |
|----------|------|-------------|---------------|-------------|
| Instagram | ✅ Tinted ghost button | ✅ Tinted ghost button | ✅ Accent card (pink) | ✅ Gradient hover |
| TikTok | — | — | ✅ Accent card (white) | ✅ Yellow hover |
| WhatsApp | ✅ Tinted ghost button | ✅ Tinted ghost button | ✅ Accent card (green) | ✅ Yellow hover |

### 18.3 WhatsApp Floating Button

- Always visible (z-50), green solid bg
- Pulse ring animation (green, 2.5s infinite)
- Dark glass tooltip on hover with yellow accent dot
- RTL-aware positioning and tooltip direction

---

## 19. Hero Background Treatment

### 19.1 Image Pixelation Fix

The hero background image uses a multi-layer approach to mask JPEG compression artifacts:

1. **CSS blur**: `filter: blur(2px)` on the image container
2. **Scale compensation**: Inner `<img>` at `scale(1.04)` to prevent blur edges showing
3. **Heavy dark overlays**: 90% opacity top, 72% mid, 95% bottom (directional gradient at 170deg)
4. **Tight vignette**: Transparent at 25%, 60% opacity at edges
5. **Film grain**: SVG-based `feTurbulence` noise at 3.5% opacity, `overlay` blend mode

### 19.2 Overlay Stack (bottom to top)

```
1. Background image (blur 2px, scale 1.04)
2. Motion container (scale 1.06→1 entrance)
3. Linear gradient overlay (170deg, 0.9→0.72→0.95)
4. Radial vignette (transparent 25% → 0.6)
5. Film grain (0.035 opacity, overlay)
6. Content (z-10)
7. Bottom gradient fade (120px, to #0D0B06)
```
