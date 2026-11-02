# Amrutanjan Cart Drawer — Roadmap

**Generated:** 2026-08-31
**Total phases:** 5
**Total PRDs:** 8

## Overview

A presentation revamp of the existing cart drawer for the World of Amrutanjan D2C storefront. `themex` already implements all cart mechanics (open/close, mutations, quantity stepper, re-render, scroll handling) — this track rebuilds the drawer's markup and styling to match the approved Figma file across 6 states: populated (no coupon), populated (coupon applied), empty, the full mobile cart view, the "View all offers" panel, and the header cart badge. Full spec: `docs/tdds/amrutanjan-cart-drawer-sprint.md`.

## Phase Tree

```
0. Foundation
   0.1 Cart Schema & Content ................... [PRD]
1. Shell
   1.1 Drawer Shell & Header Badge .............. [PRD]
2. Components
   2.1 Coupon System & Offers Panel ............. [PRD]
   2.2 Cart Line Item ............................ [PRD]
   2.3 Milestone Tracker ......................... [PRD]
   2.4 Price Summary & Recommended Products ..... [PRD]
3. Alternate States
   3.1 Empty State ............................... [PRD]
4. Assembly & QA
   4.1 Cart Drawer Assembly & QA ................. [PRD]
```

## Execution Order

| Order | PRD | Path | Depends On | Can Parallel With | Status |
|-------|-----|------|------------|-------------------|--------|
| 1 | 0.1 cart-schema-and-content | phase-0-foundation/0.1-cart-schema-and-content.md | None | — | Not Started |
| 2 | 1.1 drawer-shell-and-header-badge | phase-1-shell/1.1-drawer-shell-and-header-badge.md | 0.1 | — | Not Started |
| 3 | 2.1 coupon-system-and-offers-panel | phase-2-components/2.1-coupon-system-and-offers-panel.md | 0.1, 1.1 | 2.2, 2.3, 2.4, 3.1* | Not Started |
| 3 | 2.2 cart-line-item | phase-2-components/2.2-cart-line-item.md | 1.1 | 2.1, 2.3, 2.4, 3.1* | Not Started |
| 3 | 2.3 milestone-tracker | phase-2-components/2.3-milestone-tracker.md | 0.1, 1.1 | 2.1, 2.2, 2.4, 3.1* | Not Started |
| 3 | 2.4 price-summary-and-recommended | phase-2-components/2.4-price-summary-and-recommended.md | 0.1, 1.1 | 2.1, 2.2, 2.3 | Not Started |
| 3 | 3.1 empty-state | phase-3-alternate-states/3.1-empty-state.md | 0.1, 1.1, 2.4 | 2.1, 2.2, 2.3 | Not Started |
| 4 | 4.1 cart-drawer-assembly-and-qa | phase-4-assembly-qa/4.1-cart-drawer-assembly-and-qa.md | 1.1, 2.1, 2.2, 2.3, 2.4, 3.1 | — | Not Started |

\* 3.1 also depends on 2.4's card-partial convention, so it should land after 2.4 within the step-3 group even though both are nominally parallel.

## How to Use This Roadmap

Each `.md` file marked `[PRD]` is a self-contained specification. Hand any PRD to your development pipeline — it contains full context, requirements, approach, and acceptance criteria.

For PRDs with a Design Reference section:
`/figma [URLs from the PRD]` → `/clarify [PRD path]` → `/plan` → `/execute` → `/compare` → `/assess`

For PRDs without a design (0.1 only):
`/clarify [PRD path]` → `/plan` → `/execute` → `/assess`

**Start here:** `docs/roadmap-cart-drawer/phase-0-foundation/0.1-cart-schema-and-content.md`
