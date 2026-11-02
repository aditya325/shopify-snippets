# Definition of Done — Amrutanjan Homepage Sprint

**Version:** 1.0
**Created:** 2026-08-07
**Type:** Project-level release gate
**Applies to:** The homepage sprint as a whole, once all 32 PRDs in `docs/roadmap-homepage/` are executed

---

## What this document is, and is not

This is a **release gate**, not a per-PRD checklist. Each PRD carries its own acceptance
criteria and is signed off on those. This document answers a different question: *once every
PRD is executed, is the homepage shippable?*

It exists to catch what per-PRD sign-off structurally cannot — cross-section inconsistency,
token drift, main-thread contention, regressions on non-homepage templates, and open items that
were deferred one PRD at a time and never collected.

A criterion below is met only when it has been **verified**, not when it was intended.

---

## Scope and exclusions

### In scope
The 17 sections in `.buildspace/artifacts/home-page/sections.json` — 15 body sections plus
header and footer — assembled into `templates/index.json`, `config/header-group.json` and
`config/footer-group.json`.

### Explicitly excluded — not defects, do not raise at review

**App-dependent items** (excluded by decision, 2026-08-07):

| ID | Item | Consequence |
|----|------|-------------|
| D2 | Judge.me not installed | `reviews` section passes on wrapper-only criteria. ~~the rating row in `product-card` ships as a guarded no-op~~ **AMENDED 2026-08-11 (devx, 1.5 `/fix`): `product-card` ships a HARDCODED PLACEHOLDER rating row** (`4.7` / `132`, partial-fill stars) behind the `card_rating_is_placeholder` flag, `aria-hidden` so fabricated data is not announced. ⚠️ Violates Sprint §3 "never hardcoded" while present, and **needs a go/no-go before production**. 3.2 replaces the data source and removes the flag |
| D3 | Quinn not installed | `see-it-in-action` passes on wrapper-only criteria |
| OD1 | No wishlist app selected | Wishlist icon on `product-card` ships inert, per Sprint §4.5 |

**Hidden Figma layers** (`visible: false`, excluded by decision): `Product Card` (108:11416),
`Ticker` (108:11488), `Reorder Section` (108:12064), `Section` (108:12616),
`Sticky Add to Cart (NEW)` (108:11045).

**Non-themeable Figma elements**: `Toggle Button` (108:12651 / 108:11044) is a prototyping
control. `Navigation Bar` (108:10685) is an iOS status-bar mock — it is the sole source of the
`SF Pro Text 17px` style and `#18181B` colour in the extraction's global inventories, and both
must be ignored.

---

## 1. Completion

- [ ] All 32 PRDs in `docs/roadmap-homepage/` are executed and their individual acceptance criteria signed off
- [ ] `templates/index.json` contains all 15 body sections plus both app wrappers in the Figma order
- [ ] Header and footer render from `header-group.json` / `footer-group.json`
- [ ] Every section has default settings and blocks — a fresh install shows a coherent page, not empty shells
- [ ] No orphaned themex settings survive in any section entry

## 2. Design fidelity

- [ ] All 17 sections compared against their Figma screenshots at **both** 390 and 1440, results recorded per section
- [ ] Section order is identical between viewports
- [ ] Every measured per-section padding value matches, including the documented §5 exceptions (8px hero mobile, 16px shop-by-category mobile, 72px announcement-banner desktop, 44px featured-blogs mobile, full-bleed on hero-text / timeline / featured-blogs)
- [ ] **TBD-1 — fidelity tolerance is undefined.** See Open Items.

## 3. Design system compliance

- [ ] Computed styles across the rendered page contain **only Space Grotesk and DM Sans**. No Poppins, Inter, Manrope, Lato or SF Pro Text.
- [ ] Type scale matches Global Standards §3.2/§3.3 at both viewports
- [ ] Rendered colours match the Global Standards §4 palette
- [ ] Every heading that supports it renders the smile underline from the single shared asset — no duplicated SVG
- [ ] One shared `button.liquid` renders every button on the page; no bespoke button markup
- [ ] One shared `product-card.liquid` and one `article-card.liquid`; no forked copies
- [ ] **Hover states match the F3 resolution** (see §3a)
- [ ] `--underline-color` white variant renders on the hero

### 3a. Hover states (F3 — resolved 2026-08-07)

Transition is **150ms ease**, on `background-color` and `color` for the button variants and on
`opacity` for the banner pill. Nothing else animates. Stroke is present at 1px in every state so
nothing reflows on hover.

| Variant | Default | Hover |
|---|---|---|
| Primary | fill `#466E2E`, white text, 1px `#466E2E` stroke | transparent fill, `#466E2E` text, 1px `#466E2E` stroke |
| Secondary | transparent fill, `#466E2E` text, 1px `#466E2E` stroke | fill `#466E2E`, white text, 1px `#466E2E` stroke |
| Accent | fill `#F4C430`, dark text, 1px `#F4C430` stroke | transparent fill, `#F4C430` text, 1px `#F4C430` stroke |
| Banner pill | white fill, banner-coloured text | no colour change; `opacity: 0.9` on **block** hover |
| Product badge | — | none (not interactive) |
| Cards (all 5 clickable types) | — | **none** |

- [ ] No button reflows or shifts on hover
- [ ] Cards have no hover state
- [ ] Focus-visible is present and passes contrast on every interactive element — independent of hover

## 4. Content and schema

- [ ] No hardcoded merchant-visible copy or images anywhere
- [ ] Headings, titles, sublines and descriptions are `richtext`; plain text only for short labels
- [ ] Every new section declares a `presets` entry and is addable from the theme editor
- [ ] No section declares `max_blocks`
- [ ] Every CTA is a label + link pair
- [ ] Decorative arrows and chevrons come from icon snippets; merchant icons come via `image_picker`
- [ ] **Empty states verified**: a product with zero metafields, a collection with zero products, an article with no `read_time`, a block with no image, a section with zero blocks — each renders cleanly with no empty elements or stray separators

## 5. Behaviour

- [ ] All five Embla carousels use the globals vendored by 0.6; each section owns its own standalone carousel JS with no shared module, base class or helper
- [ ] No carousel uses `setInterval` for autoplay — the vendored plugin is used, with hover and focus pause
- [ ] **N instances of any repeated component initialise exactly once** (Global Standards §6.4 — verified by instrumentation, not inspection)
- [ ] Breakpoint-conditional carousels tear down fully when crossing to desktop, leaving no transform
- [ ] Conditional-on-count carousels stay inert at or below their threshold
- [ ] Video takes priority over image in every section where both fields exist; poster renders from `video.preview_image`
- [ ] Add to Cart works via the existing themex AJAX flow and opens the cart drawer
- [ ] **Both newsletter instances** (subscribe-letter and footer) submit independently on the same page
- [ ] Autoplay carousels pause on hover and focus, and respect `prefers-reduced-motion`
- [ ] The timeline animation respects `prefers-reduced-motion` and does not re-fire on scroll

## 6. Performance

- [ ] Exactly one image is `loading="eager"` with `fetchpriority="high"`, and it is the measured LCP element
- [ ] Every below-fold image is `loading="lazy"` with `decoding="async"`
- [ ] No CSS background images are used for content anywhere
- [ ] Every preloaded font weight is actually used; no preload targets a variant `font_modify` returned `nil` for
- [ ] ~~Carousel JS does not load on pages with no carousel~~ — **inverted by decision 2026-08-10.** Embla + autoplay load globally from `core-assets.liquid` (~20 KB on every page). Section JS still loads per-section. Global Standards §7 carries a recorded exception.
- [ ] **TBD-2 — Lighthouse mobile threshold is undefined.** See Open Items.

## 7. Accessibility

- [ ] Every interactive element is keyboard-reachable with visible focus
- [ ] Carousels and tabs expose correct ARIA semantics and current position
- [ ] Exactly one `<h1>` on the page; heading hierarchy is sensible below it
- [ ] All content images have meaningful alt text; decorative images have `alt=""`
- [ ] No nested anchors on any whole-card link
- [ ] **TBD-3 — WCAG conformance level is undefined.** See Open Items.

## 8. Cross-browser

- [ ] **TBD-4 — browser support matrix is undefined.** See Open Items.

## 9. Regression — non-homepage templates

This sprint modifies files rendered well beyond the homepage. None of the following may regress.

- [ ] `product-card.liquid` renders correctly on **collection**, **search**, **product-recommendations**, **recently-viewed-products** and **featured-collection** — all five pass only `card_product`, so new parameters must default safely
- [ ] `article-card.liquid` renders correctly in `sections/blog.liquid`
- [ ] `sections/newsletter.liquid` still renders and submits after being refactored to use the shared snippet
- [ ] Header and footer render correctly on collection, product, cart, search, blog, article and all customer templates
- [ ] Breakpoint change (xs 480→375, sm 640→430) caused no visual regression on any pre-existing themex template

## 10. Build and tooling state

Per decision, these are **verified and recorded, not mandated**. A failing check here is
reported, not necessarily fixed.

- [ ] `npm run build:prod` completes; all dynamically-referenced Tailwind classes survive the production build
- [ ] `assets/tailwind.css` was regenerated, never hand-edited
- [ ] No custom CSS was added to `src/input.css` — component styles live in `assets/base.css`
- [ ] `shopify theme check` run and output recorded (CLI 3.92.1 available; no `.theme-check.yml` exists, so it runs on defaults)
- [ ] **Known gap, recorded not blocking:** `npx prettier --write .` formats **zero** `.liquid` files. `@shopify/prettier-plugin-liquid` is not installed and there is no `.prettierrc`, so `prettier-plugin-tailwindcss` does not load either. Liquid formatting is therefore unenforceable and rests on code review.
- [ ] **Known gap, recorded not blocking:** `@playwright/test` and `@axe-core/playwright` are in `devDependencies` with no config and no specs. Accessibility verification is manual unless wired.
- [ ] **Known gap, recorded not blocking:** no CI exists. Every gate above is run locally by a human.

## 11. Documentation

- [ ] Global Standards bumped to **v1.3**: §3.1 and D4 record font-picker sourcing rather than self-hosted WOFF2; §6.1 records the resolved hover pattern
- [ ] Sprint §2.1 gains the missing **Lato** row (footer disclaimer → DM Sans Medium 12 / 10)
- [ ] Sprint §3 records final metafield namespaces and keys, the `read_time` type, and the OD2 radiator decision
- [ ] Sprint §5 marks D1, D4, D5, OD2, F1, F2 and F3 resolved
- [ ] OD3 (timeline timing) and D6 (View All Tips URL) are recorded in Sprint §5 — both are absent from the current table
- [ ] Written gap reviews exist for `see-it-in-action` and `reviews`, **or** are recorded as outstanding pending D2/D3

---

## Open Items Register

The gate cannot be fully executed until TBD-1 through TBD-4 carry values. Each is genuinely
absent from both TDDs — none has been invented here.

| ID | Item | Why it is open | Owner | Blocks |
|----|------|----------------|-------|--------|
| **TBD-1** | Design fidelity tolerance | "Matches Figma" is used throughout both TDDs with no tolerance defined — pixel-exact, visually indistinguishable, or reviewer judgement? | devx + designer | §2 |
| **TBD-2** | Lighthouse mobile threshold | Global Standards §7 names Lighthouse mobile as the performance gate but states no score, and no LCP/CLS/TBT targets | devx + Amrutanjan | §6 |
| **TBD-3** | WCAG conformance level | Neither TDD names an accessibility standard. `@axe-core/playwright` is installed with no target. | Amrutanjan | §7 |
| **TBD-4** | Browser support matrix | Not stated anywhere in either document | Amrutanjan | §8 |

### Carried open items (excluded from this gate, tracked for release)

| ID | Item | Owner | Status |
|----|------|-------|--------|
| D2 | Judge.me install | Amrutanjan | Blocks the reviews widget and the product-card rating row on 5 templates |
| D3 | Quinn install | Amrutanjan | Blocks see-it-in-action content |
| OD1 | Wishlist app selection | Amrutanjan / devx | Icon ships inert |
| OD3 | Timeline step duration + loop | devx / designer | Mitigated — exposed as merchant settings in PRD 2.10 |
| D6 | View All Tips URL | Amrutanjan | Mitigated — exposed as a merchant setting in PRD 2.13 |

---

## Sign-off

The homepage is **done** when every unchecked box above is checked, TBD-1 through TBD-4 carry
agreed values, and every item in the carried-open table has a named owner and a written status.

Items excluded under *Scope and exclusions* do not block sign-off. Their absence is a recorded
decision, not an outstanding defect — but per Sprint §4.14 and §4.15, any visual gap they cause
is **flagged in writing before sprint review, never silently absorbed**.
