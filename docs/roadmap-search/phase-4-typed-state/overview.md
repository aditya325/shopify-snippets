# Phase 4: Typed State

## Purpose

Build what the modal shows once a query is entered: the product results grid, the three secondary result
groups, the View All control and the no-results state. This phase carries the sprint's one unresolved
technical risk — whether predictive-search product objects expose the metafields `product-card` depends on
— which is why 1.2 answers that question before this phase is planned.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 4.1 | product-results-grid | PRD | Typed product results as `product-card` with Add to Cart, replacing the section's flat link list |
| 4.2 | secondary-groups-and-empty-states | PRD | Collections, pages and articles as grouped link lists; View All both breakpoints; no-results state |

## Shared Context

**One section holds all of this.** `sections/predictive-search.liquid` already exists, already uses the
`predictive_search` object, and was completely unwired until 1.2 connected it. Both PRDs rewrite branches
of that one file, which is why they run sequentially.

**The hard gate.** `product-card` reads six `custom.*` metafields. The Liquid reference types
`predictive_search.resources.products` as "array of `product`", which implies metafields resolve on the
`section_id` path, but no documentation confirms it. 1.2's smoke test is authoritative. If metafields are
unavailable, Sprint §1's "product-card unchanged" premise fails and 4.1 must stop for a decision — not
ship cards with empty badge and category regions (D-24).

**Separately: metafields are not indexed.** A query matching a `highlight_text` or `category_label` value
will not return that product. Searchable fields are author, body, product_type, tag, title,
variants.barcode/sku/title and vendor. This is a platform limit to communicate, not a defect to fix.

**Much of this phase is undesigned.** The Figma section has six frames and none draws a secondary result
group, a loading state or a no-results state. Collections are surface area added by decision (D-11) and
only became possible through the API switch. All of it is derived from the design system and from the
default-state groups, so the typed panel reads as one system — and all of it is recorded as deviation, not
extraction (D-16). Sprint §7's F2 review applies to every secondary group.

**Grid geometry is lifted from 3.2,** not reinvented: `flex` plus gap with `flex-1` children, deriving
265px at four cards desktop and 170px at two columns mobile.

**View All links to an unstyled page.** The search results page is out of scope per Sprint §1; §4.5 says
so explicitly. Its design context is already extracted at `.buildspace/artifacts/search/` for the PLP
sprint.
