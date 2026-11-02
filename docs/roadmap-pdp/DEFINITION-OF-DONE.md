# Definition of Done — Amrutanjan PDP Sprint

**Version:** 1.0
**Created:** 2026-08-21
**Type:** Project-level release gate
**Applies to:** The PDP sprint as a whole, once all 12 PRDs in `docs/roadmap-pdp/` are executed
**Revised:** 2026-08-24 — 1.7, 1.8 and 1.9 cut

---

## What this document is, and is not

This is a **release gate**, not a per-PRD checklist. Each PRD carries its own acceptance criteria and is
signed off on those. This document answers a different question: *once every PRD is executed, is the PDP
shippable?*

It exists to catch what per-PRD sign-off structurally cannot — cross-section inconsistency, token and
type drift, main-thread contention from ten sections' scripts, regressions on non-product templates, and
open items that were deferred one PRD at a time and never collected.

A criterion below is met only when it has been **verified**, not when it was intended. Record unverified
criteria as unverified.

---

## Scope and exclusions

### In scope
**Nine** sections assembled into `templates/product.json` — seven built by this sprint plus two reused:

- **Built:** main-product (gallery + buy box), product-details (tabs + lab report),
  frequently-bought-together, trust-strip, picked-just-for-you, certified, sticky-atc
- **Reused unchanged from the homepage:** `see-it-in-action`, `reviews` — placed by 2.1, modified by
  nothing. Both render as 50vh placeholder bands.

### Explicitly out of scope
- **Subscriptions** beyond an inert placeholder (D1 — the GoKwik/Razorpay stack is not an eligible gateway)
- **The write-a-review popup** (`544:28998` / `544:35969`) — excluded by decision
- **Clinically Proven Section** — `visible:false` on every mobile frame, no mobile design exists
- **Offer Banner and Breadcrumbs** — drawn and measured, but held to §1's section list
- **`external-ratings`** — the marketplace ratings strip. Cut 2026-08-24; no homepage section renders
  it and it is not built this sprint
- **Any modification to `see-it-in-action.liquid` or `reviews.liquid`** — no Quinn slot, no Judge.me
  wiring, no heading settings. They are placed as-is
- **Badges Grid** in the Description panel — `visible:false` in Figma
- **The add-all control** in FBT — hidden at two levels in the Figma ancestor chain
- **Judge.me integration itself** — 1.9 prepares one seam; wiring the app is a later sprint

---

## Release criteria

### 1. Design fidelity
- [ ] The **seven built** sections compared against `.buildspace/artifacts/pdp/screenshots/` at both
      breakpoints — 14 comparisons, none skipped, each recorded as match or as a deviation with a
      measured delta
- [ ] `see-it-in-action` and `reviews` recorded **once** as a known deviation — reused homepage
      placeholders, not built to their PDP frames — rather than compared
- [ ] Measurements verified by pixel scan of the Figma exports, not read off frames. PRD measurements in
      this repo have been wrong three times running
- [ ] Inter-section vertical gaps in the assembled page match the Figma section positions, with margin
      collapse accounted for
- [ ] No section renders `placeholder_svg_tag` output on the fixture product

### 2. Type and colour system
- [ ] The five-family question is resolved: each of DM Sans, Inter, Space Grotesk, Poppins and
      ES Rebond Grotesque either maps to a recorded theme variable or is an escalated decision
- [ ] No text renders as an unintended browser fallback
- [ ] Every colour with a token in `snippets/css-variables.liquid` resolves through that token
- [ ] `assets/base.css` contains only genuinely global CSS; section-specific CSS lives in section files
- [ ] `assets/tailwind.css` was built with `npm run build` (never `build:prod`), is unminified, and is
      byte-identical to a fresh out-of-tree build

### 3. Data model and merchant experience
- [ ] A merchant can publish a complete PDP by filling in **one product** in the admin, with no theme
      editor work per product (TDD §5)
- [ ] All 8 metaobject definitions and 12 product metafields exist, and the fixture product handle is
      recorded in `status-log.md`
- [ ] A tab whose backing metafield is empty renders neither a panel nor an orphan tab label
- [ ] Ingredient, step and FAQ counts follow metaobject entry counts — verified by adding an entry
- [ ] Reordering `block_order` in `templates/product.json` reorders the buy box with no code change
- [ ] Reordering sections in the template reorders the page with no code change

### 4. Behaviour — all twelve TDD §5 criteria
- [ ] Changing the size option updates the URL, the price and the submitted variant, and does **not**
      change the gallery
- [ ] The pincode field rejects non-digits and stops at six characters; the checked state shows the
      pincode, the date window and a working Change Pincode control
- [ ] The delivery window renders from the two section settings, changeable with no deploy
- [ ] The sticky bar is absent on load, appears only once the primary Add to Cart leaves the viewport,
      hides when the footer appears, and animates in both directions
- [ ] Each FBT card adds its own product independently; no add-all control exists anywhere
- [ ] Only one FAQ answer is open at a time
- [ ] The lab report opens in a modal; the URL does not change and the page does not navigate
- [ ] The offers row scrolls horizontally with snap and each card comes to rest aligned
- [ ] `purchase_options` creates **no** selling plan, no subscription and no cart property — verified by
      inspecting `/cart.js` after selecting it and adding to cart
- [ ] Add to Cart opens the existing cart drawer with no change to drawer behaviour
- [ ] Buy Now reaches checkout directly, bypassing the drawer
- [ ] Sticky-bar Add to Cart and buy-box Add to Cart submit through the same code path

### 5. Regression — the shared surfaces this sprint touched
- [ ] `snippets/product-card.liquid` renders correctly on **all ten** consumers — verified per consumer,
      not inferred from one
- [ ] Non-product templates are unaffected by the in-place rewrite of `sections/product.liquid`
- [ ] Removal of the themex `collapsible` block broke no other template
- [ ] Removal of `product-recommendations` from `templates/product.json` broke no other template
- [ ] `git diff HEAD` is **empty** for `sections/see-it-in-action.liquid` and `sections/reviews.liquid` —
      this sprint places them, it does not touch them
- [ ] `config/settings_data.json` was never written while `shopify theme dev` was running

### 6. Accessibility
- [ ] Gallery, tabs, FAQ accordion, offers scroller, sticky bar and lab-report modal are fully keyboard
      operable with visible focus
- [ ] Tabs are a real tablist with arrow-key navigation; inactive panels are outside the tab order
- [ ] The lab-report modal traps focus while open and restores it to its trigger on close
- [ ] The sticky bar is `aria-hidden` and unreachable by keyboard while hidden
- [ ] The inert subscription notice is announced to assistive tech, not visual-only
- [ ] Decorative elements — the gallery rings, trust-strip icons — are `aria-hidden`
- [ ] Every certification logo has either meaningful `alt` or an explicit empty `alt`, never a filename
- [ ] Animations respect `prefers-reduced-motion: reduce`

### 7. Performance and robustness
- [ ] The main gallery image does **not** carry `loading="lazy"`; every below-fold image does
- [ ] Main-thread blocking measured and recorded; no section script executes before it is needed
- [ ] No two sections bind the same `data-*` hook — verified by grep across sections and assets
- [ ] The assembled page loads with **zero** console errors and zero warnings at both breakpoints
- [ ] No cumulative layout shift when the sticky bar appears
- [ ] With `embla-carousel.umd.js` blocked, every carousel section degrades to a scrollable row
- [ ] No horizontal page scroll at 320, 375, 390, 768, 1024, 1440 and 1920px
- [ ] A product with **all** PDP metafields empty renders without error
- [ ] A product with exactly one image renders the gallery without arrows, thumbs or JS error
- [ ] `theme check` passes with no new offenses against the pre-sprint baseline — noting that
      `theme check` does not validate schema defaults or metafield existence, so it is not sufficient evidence

### 8. Documentation and open items
- [ ] A single seam document names all three Judge.me placeholder surfaces — `reviews.liquid`, the
      `rating` block from 1.2, and `product-card.liquid:93-95` — and what each needs when the app lands
- [ ] `docs/roadmap-pdp/deviations.md` lists every open D/OD/F item with owner and current state
- [ ] `docs/roadmap-pdp/status-log.md` carries a final row per PRD and an explicit sprint verdict
- [ ] The seven TDD corrections recorded in `status-log.md` are applied to
      `docs/tdds/amrutanjan-pdp-sprint.md`, or explicitly deferred
- [ ] The two corrections TDD §8 owes to earlier documents are made: the Homepage TDD's
      single-variant claim, and the erroneous 29 July 2026 extraction date in the Homepage TDD and
      Global Standards
- [ ] The stale D-number comments in `see-it-in-action.liquid` and `reviews.liquid` are corrected
- [ ] The trust-strip divergence from the mobile Figma frame is recorded, including the compliance
      caution raised and overruled

---

## Sign-off

The sprint is done when every box above is either checked or carries a written, accepted explanation for
why it is not. An unchecked box with no explanation is an open defect, not an oversight.

| Role | Name | Date | Verdict |
|------|------|------|---------|
| Build | | | |
| Design QA | | | |
| Client | | | |
