# Phase 0: Foundation

## Purpose

Establish the store-side data model the PDP reads from. Every section that renders per-product content
is blocked until these definitions exist, because a Liquid lookup against an undefined metafield returns
`blank` and the section silently renders nothing. This phase is one PRD rather than homepage's six,
because the design-token, breakpoint, typography and Embla foundations it needed were all shipped by the
homepage sprint and are inherited unchanged.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 0.1 | pdp-data-model | PRD | 8 metaobject definitions, 9 new product metafields, 1 fixture product, and a correction to the TDD's badge key |

## Shared Context

All definitions use the `custom` namespace. The pattern throughout: a metaobject definition holds the
shape of one entry; a product metafield of type `metaobject_reference` or `list.metaobject_reference`
points at that product's entries; a section setting names which metafield to read, so the same section
survives a key rename.

Two ordering facts govern this phase. `how_to_use_step` must be created before `how_to_use`, because
`how_to_use.steps` references it and Shopify rejects a reference to an undefined type. And all eight
metaobject definitions must precede the metafield definitions that point at them.

Six product-scoped `custom.*` keys already exist from the homepage sprint and are reused unchanged:
`product_badge`, `category_label`, `highlight_text`, `highlight_color`, `card_image`, `radiator_image`.
Note the TDD names the first of these `custom.badge`, which is wrong — the theme reads
`custom.product_badge`.

These definitions are store state, not theme code. They do not travel with a theme push and git does
not capture them, so `status-log.md` is the only record that they exist and which product is the fixture.
