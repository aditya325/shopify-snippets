# Amrutanjan Search Modal — Roadmap

**Generated:** 2026-08-18
**Total phases:** 4
**Total PRDs:** 8

## Overview

Revamp the search modal on the `themex` Shopify Online Store 2.0 theme: the default state with its three
content groups, the typed state with predictive results, and the loading, no-results and cleared
behaviours — on desktop and mobile.

Source document: `docs/tdds/amrutanjan-search-sprint.md` (v1.0). Design extraction — 6 screenshots at 2×,
canonical section names and measured values — is at `.buildspace/artifacts/search/`. Re-running `/figma`
is not required unless a design changes.

This is a **revamp of an existing implementation**, not a new build. Roughly 1,000 lines of search code
already ship across ten files, and reading it changed the sprint materially: 22 deviations from the TDD
were established before a line of code was written, recorded in `deviations.md`, which is authoritative
wherever it disagrees with the TDD. The largest are that the modal is a snippet and so cannot carry
section-scoped settings or `concern_chip` blocks (D-1, D-2); that the typed results were never
`product-card` and have no Add to Cart, so §1's "reuse" is new work (D-4); and that the shipped code did
not use predictive search at all, while a fully-written predictive-search section sat in the theme
referenced by nothing (D-5).

**Excluded:** the search results page, its filter rail, sort and infinite scroll — the PLP sprint, per
§1 and §4.5. View All links to it unstyled, which is expected. Its design context is already extracted
alongside the modal's at `.buildspace/artifacts/search/`.

## Phase Tree

```
1. Foundation
   1.1  Search settings & code retirement ..... [PRD]   D1 closed · critical path
   1.2  Predictive Search API switch .......... [PRD]   D-24 smoke test gates 4.1

2. Modal Shell
   2.1  Modal shell, responsive ............... [PRD]   D-8 width · D-22 offset
   2.2  Focus, keyboard & transitions ......... [PRD]   D-15 fade · D-19 focus trap

3. Default State
   3.1  Chip groups ........................... [PRD]   D-2, D-3, D-18 · F4
   3.2  Popular Products group ................ [PRD]   product-card unchanged

4. Typed State
   4.1  Product results grid .................. [PRD]   gated on D-24
   4.2  Secondary groups & empty states ....... [PRD]   D-11, D-16 · F2
```

## Execution Order

PRDs run **one at a time** through the pipeline. The Depends On column records the true constraints.
1.1 → 1.2 and 2.1 → 2.2 are sequential because each pair edits `snippets/search-modal.liquid`; 4.1 → 4.2
are sequential because both rewrite branches of `sections/predictive-search.liquid`.

| Order | PRD | Path | Depends On | Can Parallel With | Status |
|-------|-----|------|------------|-------------------|--------|
| 1 | 1.1 search-settings-and-retirement | `phase-1-foundation/1.1-search-settings-and-retirement.md` | None | — | Done with deviations |
| 2 | 1.2 predictive-search-api-switch | `phase-1-foundation/1.2-predictive-search-api-switch.md` | #1 | — | Done with deviations |
| 3 | 2.1 modal-shell-responsive | `phase-2-modal-shell/2.1-modal-shell-responsive.md` | #1 | #2 | Done with deviations |
| 4 | 2.2 focus-keyboard-transitions | `phase-2-modal-shell/2.2-focus-keyboard-transitions.md` | #3 | #5 | Done with deviations |
| 5 | 3.1 chip-groups | `phase-3-default-state/3.1-chip-groups.md` | #1, #3 | #4 | Done with deviations |
| 6 | 3.2 popular-products-group | `phase-3-default-state/3.2-popular-products-group.md` | #5 | — | Done with deviations |
| 7 | 4.1 product-results-grid | `phase-4-typed-state/4.1-product-results-grid.md` | #2, #3 | — | Done with deviations |
| 8 | 4.2 secondary-groups-and-empty-states | `phase-4-typed-state/4.2-secondary-groups-and-empty-states.md` | #7 | — | Not Started |

**One hard gate:** 1.2 records whether predictive-search product objects expose `metafields.custom.*`.
`product-card` reads six of them. If the answer is no, 4.1 must stop for a decision rather than shipping
cards with empty badge and category regions — see D-24 in `deviations.md`.

## How to Use This Roadmap

Each `.md` file marked [PRD] is a self-contained specification. Hand any PRD to a developer or AI
development pipeline — it contains full context, requirements, approach, and acceptance criteria.

PRDs with a Design Reference section (2.1, 3.1, 3.2, 4.1, 4.2) point at frames already extracted to
`.buildspace/artifacts/search/`, so start at `/clarify` rather than `/figma`:

```
/clarify {PRD path} → /plan → /execute → /compare → /assess
```

1.1, 1.2 and 2.2 have no design — 2.2's loading fade is built to house convention per D-15. For those:

```
/clarify {PRD path} → /plan → /execute → /assess
```

**Start here:** `phase-1-foundation/1.1-search-settings-and-retirement.md`

**Read first:** `deviations.md` — 22 deviations were established before execution, and it overrides the
TDD wherever the two disagree.

**Board:** `npm run docs:view:search` → http://localhost:4490
