# Amrutanjan Navigation — Roadmap

**Generated:** 2026-08-16
**Total phases:** 5
**Total PRDs:** 15

## Overview

Build the site-wide header and navigation on the `themex` Shopify Online Store 2.0 theme: the desktop
header bar, five mega-menu panels, the mobile drawer, the sticky scrolled state and the utility strip.

Source document: `docs/tdds/amrutanjan-navigation-sprint.md` (v1.2). Design extraction — 17
screenshots at 2×, canonical section names and measured values — is at
`.buildspace/artifacts/navigation/`. Re-running `/figma` is not required unless a design changes.

This sprint **supersedes** the Homepage Sprint's "header is styling only, out of scope" exclusion. The
homepage roadmap at `docs/roadmap-homepage/` is complete (33 PRDs) and stays frozen; this roadmap
cross-references it by path wherever navigation touches its output.

Mobile is the base spec; desktop is the enhancement. Only two font families ship (Space Grotesk, DM
Sans); Inter, Manrope and the stray DM Sans weights normalize per Sprint §2.1.

## Phase Tree

```
0. Foundation & Data
   0.1  Shopify data foundation ................ [PRD]   D1–D4 · critical path
   0.2  Rail icons ............................. [PRD]   D6 · 7 icons

1. Shared Components
   1.1  product-card — hide Add to Cart ........ [PRD]   7 live call sites
   1.2  subscribe-save shared snippet .......... [PRD]   D5

2. Header Shell
   2.1  Header bar + sticky state .............. [PRD]   F4
   2.2  Mega-menu shell + block schema ......... [PRD]   the block model
   2.3  Panel behaviour ........................ [PRD]   F3
   2.4  Mobile drawer shell .................... [PRD]   F2

3. Panels
   3.1  Product panels (Shop By Need + Categories) ... [PRD]   F1
   3.2  Combo panel ............................ [PRD]   + 2 new cards
   3.3  About panel ............................ [PRD]   carousel cancelled
   3.4  Media panel ............................ [PRD]   + press-card

4. Assembly & QA
   4.1  Editor wiring & default content ........ [PRD]
   4.2  Accessibility & interaction pass ....... [PRD]
   4.3  Design QA .............................. [PRD]
```

## Execution Order

PRDs run **one at a time** through the pipeline. This is the recommended sequence; the Depends On
column records the true constraints, so 0.2, 1.1 and 1.2 may be moved earlier or later freely.

| Order | PRD | Path | Depends On | Status |
|-------|-----|------|------------|--------|
| 1 | Shopify data foundation | `phase-0-foundation-data/0.1-shopify-data-foundation.md` | None | Not Started |
| 2 | Rail icons | `phase-0-foundation-data/0.2-rail-icons.md` | None | Not Started |
| 3 | product-card hide ATC | `phase-1-shared-components/1.1-product-card-hide-atc.md` | None | Not Started |
| 4 | subscribe-save snippet | `phase-1-shared-components/1.2-subscribe-save-snippet.md` | None | Not Started |
| 5 | Header bar + sticky | `phase-2-header-shell/2.1-header-bar.md` | #1 | Not Started |
| 6 | Mega-menu shell + schema | `phase-2-header-shell/2.2-mega-menu-shell-schema.md` | #1, #2, #5 | Not Started |
| 7 | Panel behaviour | `phase-2-header-shell/2.3-panel-behaviour.md` | #6 | Not Started |
| 8 | Mobile drawer shell | `phase-2-header-shell/2.4-mobile-drawer-shell.md` | #5, #6 | Not Started |
| 9 | Product panels | `phase-3-panels/3.1-product-panels.md` | #1, #2, #3, #6 | Not Started |
| 10 | Combo panel | `phase-3-panels/3.2-combo-panel.md` | #1, #4, #6 | Not Started |
| 11 | About panel | `phase-3-panels/3.3-about-panel.md` | #4, #6 | Not Started |
| 12 | Media panel | `phase-3-panels/3.4-media-panel.md` | #1, #4, #6 | Not Started |
| 13 | Editor wiring | `phase-4-assembly-qa/4.1-editor-wiring.md` | #9–#12 | Done with deviations |
| 14 | Accessibility pass | `phase-4-assembly-qa/4.2-accessibility-interaction.md` | #7, #8, #13 | Done with deviations |
| 15 | Design QA | `phase-4-assembly-qa/4.3-design-qa.md` | #13, #14 | Blocked — deferred (D-84) |

### Critical path

`0.1 data → 2.1 bar → 2.2 schema → 3.1–3.4 panels → 4.1 wiring → 4.2 a11y → 4.3 QA`

**0.1 gates almost everything.** The menu drives the bar, the shell and the drawer; the collections
drive every product pane; the metafields drive the bundle and press cards. Start there.

## Deviations from the TDD

⛔ **The TDD is frozen.** `docs/tdds/amrutanjan-navigation-sprint.md` stays at signed-off v1.2 and is
**never** edited. **`deviations.md` is the amendment record** and wins wherever the two disagree —
read it before executing any PRD. The table below is an index; `deviations.md` carries the evidence,
the resolution and the owning PRD for each.

| D | Sprint says | Reality | Owner |
|---|-------------|---------|-------|
| 1 | §3.1 — 10 block types | ~134 blocks vs a **50-per-section cap**. Richtext links + folded pane settings → 2 block types, ~25 blocks | 2.2 |
| 2 | §2.2 — mobile header "59 px status row plus 66 px header row" | **66px**. The 59px node is the phone status bar in the mock | 2.1 |
| 3 | §2.2 — drawer row 48px | **52px** (14 + 24 + 14), contradicting §2.2's own padding figure. **F2** | 2.4 |
| 4 | §2.2 — chip border `#EAB308` | Fill **`#fde047`**, no stroke. A fourth yellow, unrecorded. **F1** | 3.1 |
| 5 | §2.2 / §7 F4 — nav label | **18/27** confirmed. Live code ships 16/24 | 2.1 |
| 6 | §1 — customer accounts excluded | **Account icon stays** — Figma negligence, not a requirement | 2.1 |
| 7 | §5.4/§6 — history Embla carousel with peeking slides | **One thumbnail.** No carousel, no `history_slide`, no Embla | 3.3 |
| 8 | §6 — product-card ATC "hidden through a prop" | **The prop does not exist.** 7 live call sites | 1.1 |
| 9 | §6 — "reuses the shared Embla init module" | **No such module exists.** Homepage 0.6 only vendored the UMD files | 3.3 |
| 10 | §6 — chevron icon is new | **Already ships** as `snippets/icon-chevron-down.liquid` | 2.1 |
| 11 | §1 — subscribe extracted, homepage "not modified" | Two different layouts; extraction rewrites the section body. Read as *schema and output unchanged* | 1.2 |
| 12 | §3.2 — `rail_icon` on every rail | **Only Shop By Need has icons** — 7, not 23 | 0.2 |
| 13 | §4.3 — scrolled frame shows plain labels | Design oversight; **chevrons ship in every state** | 2.1 |

## Open items

| ID | Item | Status | Where |
|----|------|--------|-------|
| F1 | Chip / icon tile border `#EAB308` | **Closed** — fill `#fde047`, no stroke | 3.1 |
| F2 | Drawer row 48 / 50 / 53 px | **Closed** — 52px | 2.4 |
| F3 | Panel animation duration and easing | **House default** 250ms `ease-out`; needs designer sign-off | 2.3 → 4.3 |
| F4 | Nav label 18 vs 16 | **Closed** — 18 | 2.1 |
| F5 | Stray `#FFB300` in Categories | **Closed** — accidental, ignored | — |
| F6 | Unreliable Figma layer naming | **Mitigated** — `sections.json` is authoritative | 3.4, 4.3 |
| — | `panel-border #A3A3A3` | **Unconfirmed** — found only on the utility strip. Measure or log | 4.3 |
| — | SVG in `image_picker` | **Unproven** — spike first, `asset_url` fallback defined | 0.2 |
| — | Fidelity tolerance | **Undefined by either TDD** — agree before 4.3 runs | 4.3 |
| — | Desktop vs mobile menu labels | Combo/Bundles, Media/Blogs, Categories rail — pick one set | 0.1 |
| — | Top-level order contradicts itself | Panel frames say `Media · Track Order`; scrolled frame says `Track Order · Media` | 0.1 |
| — | Product row overflows its container by 12px | Fixed 170px card track, not a grid dividing the pane | 3.1 → 4.3 |

## Tracking

| File | Role |
|------|------|
| `deviations.md` | **Amendment record.** Every departure from the frozen TDD, with evidence and an owning PRD. Authoritative over the TDD |
| `status-log.md` | **Execution record.** Per-PRD status, handles and decisions discovered during build, blockers, comparison record |
| `DEFINITION-OF-DONE.md` | **Release gate.** Applied once all 15 PRDs are executed |

The Status column above is a snapshot only; `status-log.md` is authoritative for progress.

## How to Use This Roadmap

Each `.md` marked [PRD] is self-contained — full context, requirements, approach and acceptance
criteria. Design extraction is **already complete** for all 17 frames.

For PRDs with a Design Reference section:

```
/clarify [PRD path] → /plan → /execute → /compare → /assess
```

For PRDs without a design (1.1, 2.3, 4.2):

```
/clarify [PRD path] → /plan → /execute → /assess
```

**Start here:** `docs/roadmap-navigation/phase-0-foundation-data/0.1-shopify-data-foundation.md`
