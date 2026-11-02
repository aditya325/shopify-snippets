# Phase 5: Assembly & QA

## Purpose

Compose the finished sections into the homepage template, then verify the page as a whole rather
than section by section. Everything here is cross-cutting — problems that only appear when
sixteen sections share one page, one main thread and one set of tokens.

This phase cannot start until Phases 2 and 4 are complete, and 5.3 is the last gate before
sprint review.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 5.1 | homepage-assembly | PRD | Replace `templates/index.json`, set section order and default content |
| 5.2 | performance-pass | PRD | LCP, preload, lazy loading, third-party main-thread audit, Lighthouse gate |
| 5.3 | design-qa | PRD | Figma comparison across 34 screenshots, accessibility, cross-browser |

## Shared Context

**Section order** follows the Figma frame order, which both viewports share:

```
header (header-group)
1  hero-banner              9   featured-products
2  featured-discounts       10  announcement-banner
3  hero-text                11  timeline
4  tabbed-product-collection 12  claims
5  shop-by-category         13  see-it-in-action   (app)
6  subscribe-letter         14  reviews            (app)
7  media-carousel           15  featured-blogs
8  shop-by-lifestyle
footer (footer-group)
```

**`templates/index.json` is still themex demo content** — `hero-banner` with themex settings,
`featured_collection`, and `newsletter`. 5.1 replaces it entirely. The old `hero-banner` entry
references the section that 2.8 overwrites, so the two must be consistent.

**Verification assets already exist.** `.buildspace/artifacts/home-page/` holds 34 Figma
screenshots at 2x (17 desktop, 17 mobile), `sections.json` with canonical names and node IDs for
both viewports, and `design-context.md` with measured values. 5.3 compares built output against
these directly — the pipeline's `/compare` step reads `sections.json` for its naming.

**Known coverage gaps carried into QA.** Two sections (3.1, 3.2) render app content that cannot
be compared to Figma until D2/D3 land; their gap reviews are owned by those PRDs, but 5.3 must
confirm the reviews exist rather than silently passing. Five Figma layers are hidden and
excluded by decision (`Product Card`, `Ticker`, `Reorder Section`, `Section` 108:12616,
`Sticky Add to Cart`) — 5.3 must not flag their absence as a defect.

**The performance gate.** Global Standards §7 names Lighthouse mobile as the per-section
performance gate but states **no threshold**. 5.2 must establish one before it can pass or fail
anything.

**Testing tooling exists but is unwired.** `@playwright/test` and `@axe-core/playwright` are in
`devDependencies` with no config and no specs anywhere in the repo. 5.3 decides whether to wire
them or verify manually.
