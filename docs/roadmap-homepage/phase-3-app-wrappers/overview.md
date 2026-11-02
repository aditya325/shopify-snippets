# Phase 3: App Wrappers

## Purpose

Build the two sections whose content is rendered entirely by third-party apps. The theme
supplies only the section wrapper, the standard header, spacing and the app block mount point;
the app supplies everything inside it.

Both are gated on merchant app installs that have not happened yet, so this phase can float to
the end of the schedule without blocking any other work.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 3.1 | see-it-in-action | PRD | Sprint §4.14 — Quinn shoppable video (D3) |
| 3.2 | reviews | PRD | Sprint §4.15 — Judge.me reviews widget (D2) |

## Shared Context

**Both PRDs have the same shape.** A section with a richtext heading (underline-enabled via 1.3),
measured padding, and an `app` block for the widget mount. Neither section owns any content
rendering.

**Acceptance criteria cannot include "matches Figma."** The app renders the interior, and
neither app is installed, so its real output is unknown at build time. Acceptance is written
against the **wrapper only** — heading, underline, padding, mount point, deferred script
loading. This is a deliberate limitation, not an oversight.

**The written-gap rule is binding.** Sprint §4.14 and §4.15 both state that any visual gap
between the app's rendering and the Figma design is **flagged in writing before sprint review,
never silently absorbed**. Each PRD carries this as an acceptance criterion: once the app is
installed, produce a written comparison against the Figma frames.

**D2 has reach beyond this phase.** Judge.me also supplies the rating badge inside
`snippets/product-card.liquid` (1.5). The card ships that as a guarded no-op. When D2 lands,
both 3.2 and the card's rating row need enabling — 3.2's PRD owns the wrapper, but the card fix
belongs to 1.5 and should be revisited in the same pass.

**Third-party script performance.** Global Standards §7 requires app scripts to be deferred and
main-thread-audited before launch. That audit is owned by 5.2 performance-pass, but each wrapper
must load its app block without introducing render-blocking script tags.

**Typography alignment.** Judge.me widget names are Manrope SemiBold 13 in Figma and normalize
to DM Sans SemiBold 13 "via widget CSS where possible" (Sprint §2.1). Where the app does not
permit CSS overrides, that is a gap to flag in writing rather than fight.
