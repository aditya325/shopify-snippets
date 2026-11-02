# Phase 1: Sections

## Purpose

Build the nine PDP sections this sprint constructs. Each is verified against its own Figma frame in
isolation here; cross-section behaviour is Phase 2's concern. Two — `main-product` and
`product-details` — are split across two PRDs each because their scope is materially larger than
anything the homepage sprint shipped; the other seven are one PRD apiece, matching this repo's proven
granularity of one PRD per section at roughly 110 lines.

**Three sections that appeared in earlier drafts of this phase are gone.** `see-it-in-action` and
`review-section` are **reused unchanged** from the homepage sprint — 2.1 places the existing
`sections/see-it-in-action.liquid` and `sections/reviews.liquid` in the product template and modifies
neither, so there is no PRD to write. `external-ratings` is **out of scope** by decision: no homepage
section renders it and it is not built this sprint.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 1.1 | main-product-gallery | PRD | Rewrites `sections/product.liquid`: shell, responsive two-column grid, desktop and mobile galleries |
| 1.2 | main-product-buy-box | PRD | Ten buy-box block types, variant switching, pincode estimate, offers scroller |
| 1.3 | product-details-tabs | PRD | Tab shell and all four panels: description, how-to-use, ingredients, FAQs |
| 1.4 | product-details-lab-report | PRD | Lab-report PDF modal with a mobile open-in-new-tab fallback |
| 1.5 | frequently-bought-together | PRD | Companion-product row; adds one passthrough parameter to the shared product card |
| 1.6 | trust-strip | PRD | Four-item claim strip; desktop copy set is canonical on both breakpoints |
| 1.10 | picked-just-for-you | PRD | Collection-sourced product carousel; supersedes themex `product-recommendations` |
| 1.11 | certified | PRD | Certification-mark row wired to the already-uploaded Shopify Files assets |
| 1.12 | sticky-atc | PRD | Fixed purchase bar, `IntersectionObserver`-driven, 87 desktop / 63 mobile |

**1.7, 1.8 and 1.9 were cut** — see the purpose note above. Their numbers are **not** reused: 1.10–1.12
were already referenced by executed PRDs and their carry-forward notes before the cut.

## Shared Context

**Design context is already extracted.** `.buildspace/artifacts/pdp/` holds 39 Figma screenshots at 2x,
`sections.json` with canonical names and node ids, complete node trees in `raw/specs/`, and
`assets-manifest.json` with 61 assets already uploaded to Shopify Files. Do not re-run `/figma` for
these sections.

**Two sections already exist as placeholders** and are reused as-is: `sections/see-it-in-action.liquid`
and `sections/reviews.liquid`, both 22-line `h-[50vh]` bands on `bg-[#466E2E1A]` from homepage
`phase-3-app-wrappers`. **No PRD in this phase touches either file.** 2.1 places them in the product
template; they render as the same placeholder bands the homepage shows.

**There is no shared Embla initialiser.** Homepage 0.6 vendored `embla-carousel.umd.js` and loads it
deferred and global from `snippets/core-assets.liquid:18`; the established pattern is a per-section
`DOMContentLoaded` script guarding on `window.EmblaCarousel`. Seven asset files already do this. Do not
invent a shared module.

**`snippets/product-card.liquid` is shared by ten consumers** — 8 sections plus `mega-menu-products`
and `search-modal` — and already renders a rating row with hard-coded values (`4.7`, `132`) and a
computed discount percentage. Homepage 2.4 modified it once and the status log flags that as a
cross-cutting risk. **1.5 is the only PRD that edits it**; 1.10 then consumes the card unchanged.

**Decisions taken during brainstorming, binding on these PRDs:**

- `sections/product.liquid` is rewritten in place rather than replaced by a new `main-product.liquid`.
- Trust-strip ships the **desktop** claim set on both breakpoints (OD1 closed by devx), which means
  GMP Compliant and Dermatologically Tested render at every viewport.
- The subscription option is **selectable but inert** with a notice reading "Subscriptions launching
  soon — this order will be one-time". It creates no selling plan and no cart property.
- Sticky bar builds to the dedicated frames: **87 desktop, 63 mobile** (OD3 closed).
- Offer Banner and Breadcrumbs are **out of scope**, holding to TDD §1's ten sections.
- `see-it-in-action` and `review-section` are **reused from the homepage with no wiring** — no Quinn
  slot, no Judge.me integration, no heading setting. 2.1 places them; nothing modifies them.
- `external-ratings` is **not built this sprint**.
- 2.2 design-qa owns documenting the Judge.me placeholder seam, which the cut review-section PRD
  previously held.

**Project rules that bite repeatedly here:** vertical spacing is margin on the wrapper, never `py-*`,
except that a section painting a background also takes padding for its interior. Layout widths are
derived (`flex-1`, `basis-[calc()]`), never declared. An unprefixed `px-*` overrides `.page-width` at
every width, so pair both breakpoints. Comments are one line or none. Rebuild Tailwind with
`npm run build`, never `build:prod`.
