# Amrutanjan Homepage — Roadmap

**Generated:** 2026-08-07
**Total phases:** 6
**Total PRDs:** 32

## Overview

Build the approved Amrutanjan homepage (desktop 1440px, mobile 390px) on the `themex` Shopify
Online Store 2.0 boilerplate. Scope is 14 custom sections, 2 app-rendered section wrappers, a
shared product-card and article-card, the smile-underline utility and vendored Embla, plus a
restyle of the existing header.

Source documents: `docs/tdds/amrutanjan-global-standards.md` (v1.2) and
`docs/tdds/amrutanjan-homepage-sprint.md` (v1.1). Design extraction — 34 screenshots, canonical
section names and 3,640 lines of measured values — is at `.buildspace/artifacts/home-page/`.

Mobile is the base spec; desktop is the enhancement. Only two font families ship (Space Grotesk,
DM Sans); everything else normalizes to DM Sans.

## Phase Tree

```
0. Foundation & Unblock
   0.1  Breakpoint alignment ................... [PRD]
   0.2  Colour tokens .......................... [PRD]
   0.3  Spacing tokens ......................... [PRD]
   0.4  Typography ............................. [PRD]
   0.5  Metafield definitions .................. [PRD]
   0.6  Embla setup ............................ [PRD]

1. Shared Components
   1.1  Icon set ............................... [PRD]
   1.2  Button snippet ......................... [PRD]
   1.3  Section header + smile underline ....... [PRD]
   1.4  Newsletter snippet extraction .......... [PRD]
   1.5  Product card ........................... [PRD]
   1.6  Article card ........................... [PRD]

2. Sections
   2.1  hero-text .............................. [PRD]
   2.2  claims ................................. [PRD]
   2.3  shop-by-category ....................... [PRD]
   2.4  shop-by-lifestyle ...................... [PRD]
   2.5  announcement-banner .................... [PRD]
   2.6  media-carousel ......................... [PRD]
   2.7  featured-discounts ..................... [PRD]
   2.8  hero-banner ............................ [PRD]
   2.9  subscribe-letter ....................... [PRD]
   2.10 timeline ............................... [PRD]
   2.11 tabbed-product-collection .............. [PRD]
   2.12 featured-products ...................... [PRD]
   2.13 featured-blogs ......................... [PRD]

3. App Wrappers
   3.1  see-it-in-action (Quinn) ............... [PRD]
   3.2  reviews (Judge.me) ..................... [PRD]

4. Chrome
   4.1  Header restyle ......................... [PRD]
   4.2  Footer ................................. [PRD]

5. Assembly & QA
   5.1  Homepage assembly ...................... [PRD]
   5.2  Performance pass ....................... [PRD]
   5.3  Design QA .............................. [PRD]
```

## Execution Order

| Order | PRD | Path | Depends On | Can Parallel With | Status |
|-------|-----|------|------------|-------------------|--------|
| 1 | Breakpoint alignment | `phase-0-foundation/0.1-breakpoint-alignment.md` | None | #2, #4, #5, #6 | Not Started |
| 2 | Colour tokens | `phase-0-foundation/0.2-colour-tokens.md` | None | #1, #4, #5, #6 | Not Started |
| 3 | Spacing tokens | `phase-0-foundation/0.3-spacing-tokens.md` | #1 | #4, #5, #6 | Not Started |
| 4 | Typography | `phase-0-foundation/0.4-typography.md` | None | #1, #2, #5, #6 | Not Started |
| 5 | Metafield definitions | `phase-0-foundation/0.5-metafield-definitions.md` | None | #1, #2, #4, #6 | Not Started |
| 6 | Embla setup | `phase-0-foundation/0.6-embla-carousel-module.md` | None | #1, #2, #4, #5 | Not Started |
| 7 | Icon set | `phase-1-shared-components/1.1-icon-set.md` | None | #3, #4, #5, #6 | Not Started |
| 8 | Button snippet | `phase-1-shared-components/1.2-button-snippet.md` | #2, #4, #7 | #9, #10 | Not Started |
| 9 | Section header + smile underline | `phase-1-shared-components/1.3-section-header-smile-underline.md` | #2, #3, #4 | #8, #10 | Not Started |
| 10 | Newsletter snippet extraction | `phase-1-shared-components/1.4-newsletter-snippet-extraction.md` | #2, #4, #8 | #11, #12 | Not Started |
| 11 | Product card | `phase-1-shared-components/1.5-product-card.md` | #2, #4, #5, #7, #8 | #10, #12 | Not Started |
| 12 | Article card | `phase-1-shared-components/1.6-article-card.md` | #2, #4, #5, #7 | #10, #11 | Not Started |
| 13 | hero-text | `phase-2-sections/2.1-hero-text.md` | #3, #4, #9 | #14 | Not Started |
| 14 | claims | `phase-2-sections/2.2-claims.md` | #2, #3, #4, #9 | #13, #15, #16 | Not Started |
| 15 | shop-by-category | `phase-2-sections/2.3-shop-by-category.md` | #7, #9 | #14, #16 | Not Started |
| 16 | shop-by-lifestyle | `phase-2-sections/2.4-shop-by-lifestyle.md` | #7, #9 | #14, #15 | Not Started |
| 17 | announcement-banner | `phase-2-sections/2.5-announcement-banner.md` | #6 | — (sets the carousel file shape) | Not Started |
| 18 | media-carousel | `phase-2-sections/2.6-media-carousel.md` | #6, #17 | #19 | Not Started |
| 19 | featured-discounts | `phase-2-sections/2.7-featured-discounts.md` | #6, #7, #8, #17 | #18 | Not Started |
| 20 | hero-banner | `phase-2-sections/2.8-hero-banner.md` | #6, #7, #8, #9, #17 | #21, #22 | Not Started |
| 21 | subscribe-letter | `phase-2-sections/2.9-subscribe-letter.md` | #9, #10 | #20, #22 | Not Started |
| 22 | timeline | `phase-2-sections/2.10-timeline.md` | #7, #8, #9 | #20, #21 | Not Started |
| 23 | tabbed-product-collection | `phase-2-sections/2.11-tabbed-product-collection.md` | #8, #9, #11 | #24, #25 | Not Started |
| 24 | featured-products | `phase-2-sections/2.12-featured-products.md` | #6, #9, #11 | #23, #25 | Not Started |
| 25 | featured-blogs | `phase-2-sections/2.13-featured-blogs.md` | #8, #9, #12, #16 | #23, #24 | Not Started |
| 26 | Header restyle | `phase-4-chrome/4.1-header-restyle.md` | #1, #2, #3, #4, #7 | #27 | Not Started |
| 27 | Footer | `phase-4-chrome/4.2-footer.md` | #7, #8, #10 | #26 | Not Started |
| 28 | see-it-in-action (Quinn) | `phase-3-app-wrappers/3.1-see-it-in-action.md` | #9, **D3** | #29 | Not Started |
| 29 | reviews (Judge.me) | `phase-3-app-wrappers/3.2-reviews.md` | #9, #11, **D2** | #28 | Not Started |
| 30 | Homepage assembly | `phase-5-assembly-qa/5.1-homepage-assembly.md` | #13–#29 | — | Not Started |
| 31 | Performance pass | `phase-5-assembly-qa/5.2-performance-pass.md` | #30 | — | Not Started |
| 32 | Design QA | `phase-5-assembly-qa/5.3-design-qa.md` | #30, #31 | — | Not Started |

### Parallel groups

- **#1, #2, #4, #5, #6** — all of Phase 0 except spacing can run at once
- **#8, #9, #10** and then **#11, #12** — shared components split into two waves
- **#13–#16** — four sections needing only the section-header
- **#20, #21, #22** and **#23, #24, #25** — two more waves of three
- **#26, #27** — header and footer are independent of each other
- **#28, #29** — both blocked on merchant app installs; they can float anywhere after #9/#11

### External blockers

| ID | Item | Blocks | Owner |
|----|------|--------|-------|
| D2 | Judge.me installed | #29, plus the rating row inside #11 | Amrutanjan |
| D3 | Quinn installed | #28 | Amrutanjan |
| OD1 | Wishlist app selection | Wishlist icon in #11 (ships inert) | Amrutanjan / devx |
| OD3 | Timeline step duration + loop | #22 (or expose as settings) | devx / designer |
| D6 | View All Tips URL | #25 (or expose as setting) | Amrutanjan |

**F3 (hover states) is resolved** as of 2026-08-07 — inverse fill/text swap, 150ms ease,
1px stroke in every state. Full spec in `DEFINITION-OF-DONE.md` §3a and PRD 1.2. Global
Standards §6.1 and Sprint §5 still carry the old "no hover ships" wording and are corrected
as part of #8.

Seven of the original ten open items close inside the roadmap: D1 (#5), D4 (#4), D5 (#6),
OD2 (#5), F1 (#8, as-designed per placement), F2 (constrained by #4's weight spike) and
F3 (#8). D2, D3 and OD1 are app-dependent and **excluded from the Definition of Done**.

## Tracking

`status-log.md` is the live execution record — per-PRD status, a deviations and decisions log,
a blocker log, the TDD edits each PRD owes, and the four DoD thresholds. Update it as each PRD
moves. The Status column in the execution table above is a snapshot only; `status-log.md` is
authoritative.

## Definition of Done

`DEFINITION-OF-DONE.md` is the project-level release gate — the check applied once all 32 PRDs
are executed. It is deliberately separate from per-PRD acceptance criteria, and it carries four
open thresholds (fidelity tolerance, Lighthouse score, WCAG level, browser matrix) that neither
TDD defines and that must be filled in before the gate can be fully executed.

## How to Use This Roadmap

Each `.md` file marked [PRD] is a self-contained specification. Hand any PRD to a developer or
AI development pipeline — it contains full context, requirements, approach and acceptance
criteria.

Design extraction is **already complete** for all 17 sections at
`.buildspace/artifacts/home-page/`. Re-running `/figma` is not required unless a design changes.
For PRDs with a Design Reference section:

```
/clarify [PRD path] → /plan → /execute → /compare → /assess
```

For PRDs without a design (all of Phase 0, plus 1.4):

```
/clarify [PRD path] → /plan → /execute → /assess
```

**Start here:** `docs/roadmap-homepage/phase-0-foundation/0.1-breakpoint-alignment.md`
