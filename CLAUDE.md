# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**themex** is a Shopify Online Store 2.0 theme built with Tailwind CSS v3.4 and vanilla JavaScript. No frontend frameworks — just Liquid, Tailwind utility classes, and plain JS with Web Components.

## Commands

```bash
# Development — run these two in separate terminals:
npm run dev          # Tailwind watch: src/input.css → assets/tailwind.css
npm run shopify      # Shopify theme dev server (shopify theme dev)

# Production build
npm run build:prod   # Minified Tailwind output

# Format
npx prettier --write .

# Docs board — roadmap, PRDs and delivery status in the browser. One per track.
npm run docs:view      # homepage   → http://localhost:4488
npm run docs:view:nav  # navigation → http://localhost:4489
```

There are no tests or linting commands configured.

**Use `npm run docs:view`, not the `shopify-theme-toolkit:docs-viewer` skill's own server.** `scripts/docs-viewer/` is a fork of that skill's assets. The upstream version reads delivery status from per-spec `## YYYY-MM-DD — N.M Title — ✅ Complete` headings, which this project does not use; the fork reads the `## PRD Tracker` tables in each track's `status-log.md` instead, so it understands the full status vocabulary (`Not Started` / `In Progress` / `Blocked` / `Done` / `Done with deviations`) and assembles each spec's status tab from every table that names it. Running the upstream server shows every spec as "Not started".

**Roadmaps are per-track**, one folder each under `docs/`, named `roadmap-<track>`: `docs/roadmap-homepage/` and `docs/roadmap-navigation/`. Each carries its own `README.md`, `status-log.md` and `DEFINITION-OF-DONE.md`. TDDs live together in `docs/tdds/`. A new track gets its own folder plus a `docs:view:<track>` script pointing `ROADMAP_DIR` at it.

## Architecture

### Build Pipeline

Tailwind CSS compiles `src/input.css` → `assets/tailwind.css`. Tailwind scans all `.liquid` files in layout/, templates/, sections/, snippets/, and blocks/ for class usage. No bundler (Vite/Webpack) — JS files in `assets/` are loaded directly.

### CSS Variables & Theming

`snippets/css-variables.liquid` outputs CSS custom properties from Shopify theme settings (fonts, colors). Tailwind references these via `extend` in `tailwind.config.js`:

- Colors: `--color-primary`, `--color-accent`, `--color-brand-yellow`, `--color-green-secondary`, `--color-green-dark`, `--color-foreground`, `--color-muted`, `--color-border`, `--color-background`, `--color-primary-foreground`, `--color-cream`, `--color-cream-alt`, `--color-error`, `--color-success`, `--color-sale`, `--color-rating`
- Fonts: `--font-primary--family`, `--font-secondary--family`

Use Tailwind classes like `text-primary`, `bg-background`, `font-secondary` — they resolve to these CSS variables at runtime.

### Breakpoints

Custom breakpoints override Tailwind defaults: `xs: 375px`, `sm: 430px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`.

These come from Global Standards §2 and are the project's canonical scale. The `css-standards` plugin skill prescribes a different scale (`xs: 360px`, `sm: 475px`) — the TDD wins here; do not "correct" these back.

### Spacing

Global Standards §5. The desktop rhythm engages at `lg` (1024px); below that the mobile rhythm applies.

| | Mobile (< 1024) | Desktop (≥ 1024) | How |
|---|---|---|---|
| Side padding | 20px | 60px | `.page-width` (automatic) |
| Vertical spacing | 24px | 32px | **margin** on the wrapper — see below |
| Internal gap | 20px | 24px | `gap-5 lg:gap-6` |

**Standard contained section** — vertical spacing is **margin on the section's outer wrapper**; `.page-width` goes on an inner element and supplies side padding, capping content at 1320px on a 1440px frame:

```liquid
<div class="section-name my-6 lg:my-8">
  <div class="page-width">
```

**Overriding side padding** for a §5 exception — append a `px-*` utility after `page-width`.

⚠️ **An unprefixed `px-*` overrides `.page-width` at every width, not just mobile.** Tailwind emits `.px-5` outside any media query, and media queries add no specificity — so a bare `px-2` yields 8px on desktop too. Always pair the two breakpoints, or use a `lg:`-only override when just the desktop value differs:

```liquid
<section class="page-width px-2 lg:px-5">   {%- comment -%} 8px mobile, 20px desktop {%- endcomment -%}
<section class="page-width px-2.5 lg:px-15"> {%- comment -%} 10px mobile, standard 60px desktop {%- endcomment -%}
<section class="page-width lg:px-18">        {%- comment -%} standard 20px mobile, 72px desktop {%- endcomment -%}
```

Value → utility lookup. Read it as a dictionary, not a prescription: pick the mobile value and the desktop value your section needs, then compose them as above.

| §5 value | Unprefixed | With `lg:` |
|---|---|---|
| 8px | `px-2` | `lg:px-2` |
| 10px | `px-2.5` | `lg:px-2.5` |
| 16px | `px-4` | `lg:px-4` |
| 20px | `px-5` | `lg:px-5` |
| 60px | `px-15` | `lg:px-15` |
| 72px | `px-18` | `lg:px-18` |

Vertical exceptions carry no such hazard — `.page-width` sets no vertical padding, so an asymmetric value (44px bottom, featured-blogs mobile) simply applies. Express it as `mb-11` on the wrapper per the rule below, or as `pb-11` on the painted element if the section has a background.

**Full-bleed** — omit `.page-width` entirely; there is no residual padding to clear. For a full-bleed background with contained content, put `.page-width` on an inner wrapper, not the outer element. Applies to hero-text, timeline and the featured-blogs wrapper.

### Vertical spacing — margin, not padding

**Spacing between sections is always `margin`, on the section's outer wrapper.** Never `py-*` on the section, and never vertical padding on the `.page-width` element. Established by `sections/hero-text.liquid` and `sections/claims.liquid`; every new section follows it.

**A section that paints a background also takes `padding` — and only that section does.** Margin falls *outside* the painted box, so a background section needs padding to give the paint something to fill. Without it the coloured band collapses to the content height. Such a section carries **both**: margin for its separation from neighbours, padding for its painted interior.

| Section paints a background? | Vertical spacing | Painted interior |
|---|---|---|
| No — e.g. `claims`, `hero-text` | `margin` on the wrapper | — (padding stays 0) |
| Yes — e.g. `announcement-banner`, `footer`, `timeline`, `hero-banner` | `margin` on the wrapper | `padding` on the element carrying the background |

The measured Figma value is the *painted interior* for a background section, and the *margin* for a section without one. Figma models all of it as frame padding, so read a `Measured padding:` line in a PRD as a measurement, not as an instruction to use the CSS `padding` property.

**Merchant-controlled vertical spacing** — emit custom properties from a `style` attribute on the wrapper and consume them with `var()` on that same element. Schema uses `type: range`, `min: 0`, `max: 100`, `unit: "px"`, with the default set to the section's measured §5 value. Name the settings for the property they actually set — `margin_top` / `margin_bottom`, not `padding_*`.

A `range` yields one value across all viewports, so a section needing the responsive 24/32 split declares **four** ranges — a mobile pair and a desktop pair — consumed by breakpoint-scoped utilities. `sections/claims.liquid` is the reference:

```liquid
<div
  class="claims mb-[var(--claims-bottom-mobile)] mt-[var(--claims-top-mobile)] lg:mb-[var(--claims-bottom-desktop)] lg:mt-[var(--claims-top-desktop)]"
  style="--claims-top-mobile: {{ section.settings.claims_top_mobile }}px; …"
>
```

Spell `bottom` out — 24 settings across the theme use `_bottom_` against 2 using `_bot_`.

Write the arbitrary value as `mt-[var(--x)]` — **no `length:` typehint.** Tailwind infers the type and warns that the hint is unnecessary.

⚠️ **Adjacent margins collapse to the larger of the two; they do not sum.** A section with `margin-top: 24px` below one with `margin-bottom: 32px` yields **32px**, not 56px, and its own setting becomes a floor rather than a value. This is live today between `hero-text` and `claims`. Decide the page's inter-section rhythm as a whole at 5.1, not section by section.

**Cascade dependency** — these overrides work because `snippets/core-assets.liquid` loads `base.css` *before* `tailwind.css`. `.page-width` sets the logical `padding-inline`; Tailwind's `px-*` sets the physical `padding-left` / `padding-right`. Logical and physical properties cascade together, and both selectors are a single class — identical specificity — so nothing but source order separates them. Reversing those two lines silently breaks every override above. This is also why an unprefixed `px-*` beats `.page-width`'s `@media (min-width: 1024px)` rule: media queries contribute no specificity.

Use `base.css` only for global common CSS, if not then create section specific css files and load it in the section.

### Layout widths are derived, never declared

**No static fixed width on a layout element.** A card, column or slide in a row gets its width from the
layout, not from a `w-*` utility: `flex-1` (or `grid-cols-N`) where the container's width is divided, and
`flex-basis` where it is not — `basis-[calc(100%/2.2)]` for a 2.2-slide carousel. Set the **gap** and let
the width follow.

This is a fidelity rule, not just a tidiness one. Figma reports a *computed* width; declaring that number
hardcodes one block count. `shop-by-lifestyle` desktop is five cards in 1320px — `flex-1` with
`gap-[17.5px]` derives exactly 250.0px, matching Figma at five blocks *and* staying correct at three or
seven. `w-[250px]` matches at five and breaks everywhere else.

```liquid
<div class="flex gap-2.5 lg:gap-[17.5px]">
  <div class="basis-[calc(100%/2.2)] shrink-0 lg:flex-1 lg:basis-auto">
```

Intrinsically-sized elements — icons, avatars, logos — are not layout and may declare a width.

### Money output — always strip the currency space

This store's `moneyFormat` is `₹ {{amount}}`, with a literal space. Every price therefore renders as
`₹ 199` unless the space is removed, and the designs always draw `₹199`.

**Append `| replace: ' ', ''` to every money filter.** Pair it with `money_without_trailing_zeros`
unless a surface genuinely wants `.00`. Established by `snippets/product-card.liquid`; the PDP follows it.

```liquid
{{- current_variant.price | money_without_trailing_zeros | replace: ' ', '' -}}
```

⚠️ **Fix the JSON and `data-*` attributes too, not just the visible markup.** A price that JS rewrites
is only as good as the string JS reads. `snippets/variant-selector.liquid` emits `price_formatted` /
`compare_at_price_formatted` into a `<script type="application/json">` block, and `assets/product.js`
writes those straight into the price element on `variant:change` — so an unstripped value there puts the
space back the moment a shopper switches variant, even though the first paint looked right. Same for
`data-product-price`, which `assets/product-form.js` uses as the fallback for `price_formatted`; keep
the two in the same format or the button text changes shape depending on which one wins.

Grep the files you touched before calling it done — theme-wide the command is noisy, so scope it:

```bash
grep -rn "money" sections/product.liquid snippets/pdp-*.liquid | grep -v "replace: ' ', ''"
```

**Not everything takes the strip.** `money_without_currency` (structured data in `meta-tags.liquid`,
facet range bounds) has no symbol to separate, and `shop.money_format` in `global-variables.liquid` is
the raw pattern JS interpolates — stripping either is wrong. The rule is for *displayed* prices only.

**The convention is not applied theme-wide yet.** Only `product-card` and the PDP strip the space today.
Cart, cart drawer, cart line items, customer order/account, `bundle-row`, `add-to-cart-button` and
`selling-plan-selector` all still render `₹ 199`. Fix them opportunistically when working in those files
— do not assume a price elsewhere is already correct.

### JavaScript

Vanilla JS in `assets/`. Two patterns:
1. **Web Components** — `product-form.js`, `cart-drawer.js` use `customElements.define()`
2. **DOMContentLoaded scripts** — `product.js`, `header-javascript.js`, `collection.js`, etc.

Cross-component communication uses `CustomEvent` (e.g., `cart:refresh`). DOM selection uses `data-*` attributes (e.g., `data-product-price`, `data-cart-overlay`).

### Liquid Structure

- **Sections** (30): Self-contained with `{% schema %}` blocks. Each section owns its settings, blocks, and presets.
- **Snippets** (42): Reusable components rendered via `{% render %}`. Includes icon SVGs, cards (product/collection/article), form utilities, and the responsive `image.liquid`.
- **Templates** (15): JSON templates that compose sections. Located in `templates/`.
- **Layouts**: `theme.liquid` is the main layout. Section groups `header-group.json` and `footer-group.json` handle persistent header/footer.
- **Config**: `settings_schema.json` defines theme editor settings. `settings_data.json` stores current values.

### Key Files

- `src/input.css` — Tailwind entry point (directives only: `@tailwind base/components/utilities`). **NEVER add custom CSS here.**
- `assets/tailwind.css` — Compiled Tailwind output. **NEVER edit directly** — it is auto-generated from `src/input.css`.
- `assets/base.css` — CSS reset, `.page-width` utility, and **all custom component styles** (hamburger, cart states, variants, sliders, etc.). Any non-Tailwind CSS goes here.
- `snippets/css-variables.liquid` — Dynamic CSS custom properties from theme settings
- `snippets/meta-tags.liquid` — SEO, Open Graph, structured data
- `snippets/image.liquid` — Responsive `<picture>` element with WebP and srcset

### Conventions

- **File naming**: kebab-case for all files
- **CSS classes**: BEM-inspired naming in base.css, Tailwind utilities in Liquid templates
- **JS DOM targeting**: `data-*` attributes, never class names
- **Settings IDs**: snake_case (e.g., `type_primary_font`, `color_primary`)
- **Snippets**: use `{% render %}` (not `{% include %}`)
- **Images**: always use lazy loading (`loading="lazy"`) except above-the-fold


## Comments — one line, or none at all

**A code comment is one line. Never more.** If the explanation does not fit on one line, it does not belong
in the code — leave the comment out entirely and put the reasoning in the PRD, plan or status log instead.

- ✅ `{%- comment -%} max-lg: is load-bearing — :nth-child outranks lg:col-span-1 {%- endcomment -%}`
- ❌ A three-line `{% comment %}` block explaining the cascade in prose
- Inside `{% liquid %}` blocks use the `#` inline form, not `comment` / `endcomment`:
  `# A cleared colour setting returns blank, and var() needs a complete value`
- Comment the **why**, never the what. A comment restating the code earns its deletion.
- Prefer no comment. `sections/claims.liquid` and `snippets/claim-item.liquid` ship with almost none, and
  `snippets/article-card.liquid` puts its rationale in `{% doc %}` — follow those.
- Same rule in CSS and JS. `assets/base.css` has two multi-line why-comments at the top; they are
  grandfathered, not a precedent.

This is a hard rule, not a preference. Long comment blocks have been flagged in review more than once.


## Project Standards — MANDATORY

Coding standards are provided as **plugin skills** from the `shopify-theme-toolkit` plugin listed in the system prompt. They are NOT files on disk — they must be invoked using the **Skill tool** before writing any code.

**Before writing or modifying any file, invoke the relevant skill(s):**
- **`.liquid` files** → invoke `shopify-theme-toolkit:liquid-standards`
- **`.js` files** → invoke `shopify-theme-toolkit:js-standards`
- **CSS / Tailwind / styling** → invoke `shopify-theme-toolkit:css-standards`
- **Section files** → invoke `shopify-theme-toolkit:section-standards` (covers both file structure and schema standards)
- **New files / architecture decisions** → invoke `shopify-theme-toolkit:theme-architecture`

**This is non-negotiable.** Do not skip this step. Do not assume CLAUDE.md alone contains all standards. The plugin skills have detailed rules and checklists that must be followed.