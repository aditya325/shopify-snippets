# Phase 2: Header Shell

## Purpose

Build the chrome every panel shares — the bar and its sticky state, the dropdown frame and its data
model, the panel behaviour, and the mobile drawer. Phase 3 fills panes into what this phase builds;
nothing in Phase 3 invents structure.

This is where the sprint's largest architectural decision lands: the block model in 2.2.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 2.1 | header-bar | PRD | 110px desktop / 66px mobile bar, 18px labels, conditional chevrons, scroll-triggered sticky state |
| 2.2 | mega-menu-shell-schema | PRD | The block schema, rail, pane frame and utility strip |
| 2.3 | panel-behaviour | PRD | Open/close animation, rail switching, keyboard, touch, reduced motion |
| 2.4 | mobile-drawer-shell | PRD | 360px drawer, two levels, block-driven |

The bar restyle and the sticky state are one PRD because they edit the same three files. The schema
stays separate from the behaviour because the block model is the biggest single decision in the
sprint, and merging it with all the JS makes one PRD that is hard to execute coherently.

## Shared Context

**The block model deviates from Sprint §3.1, and this is approved — D-1 in `deviations.md`.** Shopify
caps a section at [50 blocks](https://shopify.dev/docs/storefronts/themes/architecture/limits).
§3.1's ten block types across 23 rail rows computes to roughly **134** — the design could not be
built as specified. Two changes bring it to ~25:

1. Chips and trending links become **`richtext` settings** holding multiple `<a>` tags, not
   `link_group` / `link_item` blocks. This alone removes ~63 blocks.
2. Every one-picker-per-rail pane — `products`, `bundle_list`, `articles`, `press`,
   `bundle_featured` — becomes a setting on `rail_item` rather than its own block type.

Only `rail_item` (×23) and `content_card` (×2) survive as blocks. The §3 ordering rule is untouched
and still governs `content_card`.

**Richtext styling has one load-bearing trick.** Merchant markup cannot carry Tailwind classes, so
chips are styled with arbitrary variants on the wrapper. `[&_p]:contents` is essential — richtext
wraps each line in a block-level `<p>`, and `display: contents` promotes the anchors to direct flex
children so `flex-wrap` and `gap` apply. Without it, chips stack vertically.

**Three values in Sprint §2.2 are wrong and are corrected here.**

- **Mobile header is 66px** (**D-2**), not "a 59 px status row plus a 66 px header row". The 59px node
  `389:28439` is the phone's status bar in the mock — the scrolled frame `389:31160` has no such row.
- **Drawer row is 52px** (**D-3**), not 48. Measured `389:28390` is `padding: 14px 20px` around a 24px
  line-height label: 14 + 24 + 14. §2.2's own padding contradicts its height. **F2 closed.**
- **Nav label is 18/27** (**D-5**), confirming **F4**. Current code ships `text-[16px]/[24px]` at
  `header-desktop.liquid:47`, so this is a live change.

**Two things Sprint §6 lists as new already exist.** `snippets/icon-chevron-down.liquid` ships and is
already rendered at `header-desktop.liquid:54` (**D-10**). `snippets/accordion.liquid` ships and is
reusable for the drawer's level-2 rail rows.

**The account icon stays** (**D-6**) on both viewports, overriding Sprint §1's exclusion — its
absence from the design is a Figma oversight, confirmed by the client.

**F3 has no design source.** Panel open/close timing is resolved in 2.3 as a house default of **250ms
`ease-out`**, scaled up from the 150ms hover convention the homepage button snippet set. It needs
designer sign-off at 4.3.

**Conventions.** Vanilla JS extending `assets/header-javascript.js`, not new files; DOM targeting via
`data-*` attributes, never class names; panes are pre-rendered and toggled, never fetched (Sprint
§4.2); no static widths on layout elements. **The TDD is never edited.**
