# Phase 3: Default State

## Purpose

Build the three content groups the modal shows before anything is typed: Recent Search, Browse by concern
and Popular Products. This phase and Phase 4 are the two mutually exclusive states of the modal —
Sprint §4.2 has typing *replace* all three of these — so they share the card grid geometry and nothing
else, and they fail independently.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 3.1 | chip-groups | PRD | Shared group-heading and chip primitives; Recent Search with a configurable limit; Browse by concern from a navigation menu |
| 3.2 | popular-products-group | PRD | The shared `product-card` in a derived-width grid, four across desktop and two columns mobile |

## Shared Context

**Group order and rhythm.** Recent Search, then Browse by concern, then Popular Products, with a 24px gap
between groups on both breakpoints. Every group heading is a 20×20 icon plus a title at Space Grotesk
Medium 20px `#171717`, 12px gap — extracted into `snippets/search-group-heading.liquid` in 3.1 and reused
by 3.2 and again by 4.2.

**Icons ship as SVG snippets in code,** not merchant-uploaded, per Sprint §3.1.

**Content sources.** Recent Search comes from `localStorage` under `themex-recent-searches` rendered
through the Section Rendering API — reused as built, with only its hardcoded `MAX_RECENT = 5` replaced by
`recent_searches_limit` passed on a `data-*` attribute (D-3). Browse by concern comes from a `link_list`
setting edited in Content → Menus, capped at 6 rendered chips (D-2, D-18). Popular Products comes from
`popular_collection` limited by `popular_products_count`.

**Widths derive, never declare.** Chip widths come from content; card widths come from `flex-1` plus the
gap — 265px at four cards in 1120 desktop, 170px at two columns in 350 mobile. The Figma numbers are
outcomes to verify against, not values to write.

**`product-card` ships unchanged.** It is shared with eight other call sites and already renders the exact
card the design shows, driven by `custom.*` metafields.

**Hover and focus states are undrawn** (F4, D-17). They follow the mega-menu rail's house pattern so the
two systems agree, and that is recorded as a deviation rather than presented as extracted.
