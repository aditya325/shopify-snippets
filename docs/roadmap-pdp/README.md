# Amrutanjan PDP Sprint — Roadmap

**Generated:** 2026-08-21
**Source TDD:** `docs/tdds/amrutanjan-pdp-sprint.md` (v1.1)
**Total phases:** 3
**Total PRDs:** 12

## Overview

Builds the Amrutanjan product detail page for desktop (1440px) and mobile (390px) on the themex Shopify
theme — **seven** sections built here, plus `see-it-in-action` and `reviews` reused unchanged from the
homepage sprint, on both breakpoints. Product-varying content lives
on the product as metafields pointing at metaobjects; section settings hold only layout and content
identical on every product. The target merchant experience is a single product page in the Shopify admin
where every tab, ingredient, offer and step is filled in, with no theme editing per product.

Excluded by decision: **`external-ratings`** (the marketplace ratings strip — no homepage section renders
it and it is not built this sprint), subscriptions beyond an inert placeholder (D1, the current
GoKwik/Razorpay stack cannot support them), the write-a-review popup, the Clinically Proven section
(hidden in Figma, and no mobile design exists for it), and the Offer Banner and Breadcrumbs.

**`see-it-in-action` and `reviews` are placed, not built.** The existing homepage placeholder sections
are added to `templates/product.json` unchanged — no Quinn slot, no Judge.me wiring, no heading setting.
Both render as the 50vh green bands the homepage already shows. No PRD modifies either file.

## Phase Tree

```
0. Foundation
   0.1 pdp-data-model ..................... [PRD]

1. Sections
   1.1  main-product-gallery .............. [PRD]  ✅
   1.2  main-product-buy-box .............. [PRD]  ✅
   1.3  product-details-tabs .............. [PRD]  ✅
   1.4  product-details-lab-report ........ [PRD]  ✅
   1.5  frequently-bought-together ........ [PRD]  ✅
   1.6  trust-strip ....................... [PRD]  ✅
   1.10 picked-just-for-you ............... [PRD]
   1.11 certified ......................... [PRD]
   1.12 sticky-atc ........................ [PRD]

   1.7 see-it-in-action  — CUT, reused from homepage, placed by 2.1
   1.8 external-ratings  — CUT, out of scope this sprint
   1.9 review-section    — CUT, reused from homepage, placed by 2.1

   Numbering keeps its gaps on purpose: 1.10–1.12 were already referenced by
   executed PRDs and their carry-forward notes before 1.7–1.9 were cut.

2. Assembly & QA
   2.1 product-template-assembly .......... [PRD]
   2.2 design-qa .......................... [PRD]
```

## Execution Order

| Order | PRD | Path | Depends On | Can Parallel With | Status |
|-------|-----|------|------------|-------------------|--------|
| 1 | pdp-data-model | `phase-0-foundation/0.1-pdp-data-model.md` | None | — | ✅ Done with deviations |
| 2 | main-product-gallery | `phase-1-sections/1.1-main-product-gallery.md` | None | — | ✅ Done with deviations |
| 3 | main-product-buy-box | `phase-1-sections/1.2-main-product-buy-box.md` | #1, #2 | — | ✅ Done with deviations |
| 4 | product-details-tabs | `phase-1-sections/1.3-product-details-tabs.md` | #1 | — | ✅ Done with deviations |
| 5 | product-details-lab-report | `phase-1-sections/1.4-product-details-lab-report.md` | #1, #4 | — | ✅ Done with deviations |
| 6 | frequently-bought-together | `phase-1-sections/1.5-frequently-bought-together.md` | None | — | ✅ Done with deviations |
| 7 | trust-strip | `phase-1-sections/1.6-trust-strip.md` | None | — | ✅ Done with deviations |
| 8 | picked-just-for-you | `phase-1-sections/1.10-picked-just-for-you.md` | #6 | #9, #10 | **Not Started** |
| 9 | certified | `phase-1-sections/1.11-certified.md` | None | #8, #10 | **Not Started** |
| 10 | sticky-atc | `phase-1-sections/1.12-sticky-atc.md` | #3 | #8, #9 | **Not Started** |
| 11 | product-template-assembly | `phase-2-assembly-qa/2.1-product-template-assembly.md` | #1–#10 | — | **Not Started** |
| 12 | design-qa | `phase-2-assembly-qa/2.2-design-qa.md` | #11 | — | **Not Started** |

> Statuses mirror `status-log.md`, which is the source of truth. #8, #9 and #10 have all their
> dependencies met and can run **in parallel right now**.

### Why this order

**Seven of twelve are already done** — 0.1 through 1.6, all `Done with deviations`. What remains is
three sections plus assembly and QA.

**#8, #9 and #10 are unblocked and mutually independent.** `picked-just-for-you` needed 1.5 for the
shared-card edit (done), `sticky-atc` needed 1.2 for the primary Add to Cart button and the
`variant:change` channel (done), and `certified` never had a dependency. Run all three at once.

**#11 comes last because margin collapse is a page-level property.** Adjacent margins collapse to the
larger of the two rather than summing, so the inter-section rhythm cannot be settled section by section.

## How to Use This Roadmap

Each `.md` file marked [PRD] is a self-contained specification with full context, requirements,
approach and acceptance criteria.

**Design context is already extracted — do not re-run `/figma`.** `.buildspace/artifacts/pdp/` holds
39 screenshots at 2x, `sections.json` with canonical names and node ids, complete node trees in
`raw/specs/`, and `assets-manifest.json` with 61 assets already uploaded to Shopify Files. Each PRD's
Design Reference section names the exact node ids and spec files it needs.

So the pipeline for every PRD here is:

```
/clarify <prd-path> → /plan → /execute → /compare → /assess
```

**Start here:** `docs/roadmap-pdp/phase-0-foundation/0.1-pdp-data-model.md`

**Not every section needs a PRD.** `see-it-in-action` and `reviews` are reused from the homepage and
placed by 2.1; `external-ratings` is not built. Nine of the design's ten sections reach the template.

## Open items carried into the sprint

| ID | Item | Status entering the sprint |
|----|------|----------------------------|
| D1 | Subscription mechanism | **Open.** Vendor enquiries pending. `purchase_options` ships selectable-but-inert with a notice. |
| D2 | Flits wishlist | **Open.** Control ships as a placeholder. |
| D3 | Judge.me not wired | **Open.** `reviews` ships as the homepage placeholder. 2.2 documents the three hard-coded rating surfaces as one seam. |
| D4 | picked-just-for-you collection | **Open.** Setting ships unset; merchant configuration, not a blocker. |
| D5 | Certification marks | **Partly resolved.** Alt text **closed** by 1.11 — set from the words each mark displays (FSSAI, Ministry of AYUSH, GMP, Cruelty Free, ISO 9001:2015). **Production artwork still open:** the Figma logos are placeholders, proven by a Shutterstock watermark in the cruelty-free source. The five re-exported files in Shopify Files are placeholder-derived and need licensed replacements before launch. |
| OD1 | Trust-strip copy conflict | **Closed** — desktop set canonical on both breakpoints, per devx. Two regulatory claims ship as drawn. |
| OD2 | FBT card scope | **Closed** — the card already renders rating and discount, and `add-to-cart-button` already accepts `show_price`. One passthrough parameter. |
| OD3 | Sticky bar height | **Closed** — dedicated frames authoritative, 87 desktop / 63 mobile. |
| F2 | Delivery estimate is display-only | Noted risk. Not a serviceability check. |
| F3 | Inline PDF unreliable on iOS Safari | 1.4 ships an open-in-new-tab action alongside the embed. |
| F4 | Hover/focus states unspecified | Follow Global Standards. |
| F7 | Tab panel height jump | **Closed by 1.3.** Height animates via a forced reflow (not rAF, which never fires in a backgrounded tab) and snaps under `prefers-reduced-motion`. |
| OQ-1 | Description benefit cards not modelled | **Closed by 1.3.** New `benefit` metaobject + `custom.description_benefits`, with the icon as a `choices`-validated snippet name. |
| OQ-2 | `step_number` is hand-typed busywork | **Closed by 1.3.** Field kept; blank falls back to a zero-padded `forloop.index`, so the `how_to_use.steps` validation did not need re-pointing. |
| OQ-5 | Duplicate metaobject entries | **Closed by 1.3 — the duplicates are forced.** `list.metaobject_reference` rejects a repeated GID, so they cannot be collapsed. |

## Corrections this roadmap makes to the TDD

Found by verifying the TDD's claims against the codebase rather than accepting them:

1. **§3.2 names the reused badge key `custom.badge`.** The theme reads **`custom.product_badge`**
   (`snippets/product-card.liquid:54`). Corrected in 0.1.
2. **§3.2 says three metafields are reused from homepage.** **Twelve** `custom` product metafield
   definitions existed before this sprint, not three and not the six first recorded here — the six
   homepage card keys plus `bundle_contents`, `concerns`, `format`, `benefits`, `size_pack` and
   `offer_value` from the search sprint. Eight of the twelve are read by the theme. Corrected
   2026-08-22 by 0.1, which also found `rating_value` and `review_count` populated on all 49
   products with no definition at all.
3. **§4.1 and §4.8 reference a "shared data-attribute module" for Embla.** No such module exists.
   Homepage 0.6 only vendored the UMD files; the established pattern is per-section JS.
4. **§1 lists see-it-in-action and review-section as sections to build.** Both already exist as
   placeholders from homepage `phase-3-app-wrappers`, and both are also used by the homepage. This
   sprint reuses them unchanged rather than building either.
5. **OD2 assumes the card may not support rating or discount.** It supports both already.
6. **§1's "Reused" row omits** `accordion.liquid` + `accordion.js` (which already implements the
   one-open-at-a-time rule via `data-single-open`), `variant-selector`, `product-form`,
   `add-to-cart-button`, `breadcrumbs`, `drawer-panel` and `search-modal`.
7. **D-numbers collide across sprints.** Homepage's D2/D3 are Judge.me/Quinn; this sprint's are
   Flits/Judge.me — and both stale numbers are written into live section comments.
