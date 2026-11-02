# Phase 2: Assembly & QA

## Purpose

Compose the nine sections into `templates/product.json` and verify the page as a whole — seven built in
Phase 1, plus `see-it-in-action` and `reviews` reused unchanged from the homepage. Phase 1 proved each
built section against its own Figma frame in isolation; this phase catches what per-section sign-off
structurally cannot — margin collapse between neighbours, token and type drift across sections,
main-thread contention from ten sections' scripts, and regressions on other templates caused by this
sprint's two shared-file edits.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 2.1 | product-template-assembly | PRD | Ten sections in design order; resolves the page's vertical rhythm as one decision |
| 2.2 | design-qa | PRD | Twenty Figma comparisons, font and colour audits, regression checks, sprint gate |

## Shared Context

**Margin collapse is the expected source of spacing defects.** Adjacent margins collapse to the larger
of the two and do not sum, so each section's own margin setting acts as a floor rather than a value.
This is already live between `hero-text` and `claims` on the homepage. The page rhythm is therefore
decided once in 2.1, not section by section in Phase 1.

**Two sections are placed, not built.** `sections/see-it-in-action.liquid` and `sections/reviews.liquid`
are reused exactly as the homepage has them — 50vh placeholder bands. They are not compared against
their PDP Figma frames, and `git diff` against HEAD must stay empty for both. `external-ratings` is not
built at all this sprint.

**Two shared files changed during Phase 1** and are the regression surface: `snippets/product-card.liquid`
(ten consumers, edited by 1.5) and `sections/product.liquid` (rewritten in place by 1.1). The two reused
placeholder sections are **not** a regression surface, because no PRD modifies them.

**2.2 inherits the Judge.me seam.** Three surfaces hold hard-coded rating data — `reviews.liquid`, the
`rating` block from 1.2, and `product-card.liquid:93-95`. Documenting them in one place moved to 2.2
when the review-section PRD was cut.

**Verification standard.** A criterion is met only when verified, not when intended; unverified
criteria are recorded as unverified. Assert the computed property, not the presence of an element —
presence-only checks have passed in this project while real defects shipped. Measure by pixel scan of
the Figma exports rather than reading numbers off frames; PRD measurements in this repo have been wrong
three times running. For calibration, the homepage sprint closed 33 of 33 tracker rows as `Done with deviations`
and none as plain `Done`.
