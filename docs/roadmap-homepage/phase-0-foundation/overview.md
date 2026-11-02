# Phase 0: Foundation & Unblock

## Purpose

Establish the design-token layer, typography plumbing, data definitions and carousel
infrastructure that every later phase inherits. This phase also closes six of the ten open
items carried in the TDDs (D1, D4, D5, OD2, F1, and partially F2), so that Phase 1 and
Phase 2 are not blocked on decisions.

Nothing in this phase renders anything merchant-visible. It is entirely config, tokens,
data definitions and one vendored library.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 0.1 | breakpoint-alignment | PRD | Align `tailwind.config.js` screens to Global Standards §2 (xs 375, sm 430) and regression-sweep the 29 existing themex sections |
| 0.2 | colour-tokens | PRD | Add the 9 missing Amrutanjan colour tokens across `settings_schema.json` → `css-variables.liquid` → `tailwind.config.js` |
| 0.3 | spacing-tokens | PRD | Section padding / gap utilities matching the measured values in Global Standards §5 |
| 0.4 | typography | PRD | Wire Space Grotesk + DM Sans through `font_picker`, verify weight coverage, preload above-the-fold |
| 0.5 | metafield-definitions | PRD | Create the 6 metafield definitions in Sprint §3 (D1) |
| 0.6 | embla-setup | PRD | Vendor Embla + autoplay into `assets/` and load them globally (D5). Each carousel section then writes its own standalone JS |

## Shared Context

**Verified starting state.** `themex` ships 29 sections, 48 snippets and a working AJAX cart
stack. `snippets/css-variables.liquid` emits colour custom properties as **space-separated RGB
triplets** via `color_extract`, which `tailwind.config.js` consumes as
`rgb(var(--color-x) / <alpha-value>)`. The TDDs express colours as hex — every token added in
0.2 must be converted to that triplet format or Tailwind's alpha modifier silently breaks.

**Three-file lockstep.** Adding any theme-settings-driven token requires edits to
`config/settings_schema.json` (the merchant control), `snippets/css-variables.liquid` (the CSS
custom property) and `tailwind.config.js` (the utility class). Missing one leaves a token that
looks defined but resolves to nothing.

**Font decision (supersedes D4) — RESOLVED 2026-08-08.**
Global Standards §3.1 and D4 originally specified self-hosted WOFF2 — now superseded.
Both families are sourced through `font_picker`. Global Standards is at v1.3 and D4 is
marked resolved.

The residual weight-coverage risk is closed. Shopify's published font library carries Space Grotesk
`n3 n4 n5 n6 n7` and DM Sans `n1`–`n9`, so every required weight is present and **no escalation back
to self-hosting is needed**. Six faces ship: Space Grotesk 500/700, DM Sans 400/500/600/700. The
runtime `font_modify` non-`nil` assertion remains owed to manual QA — every call carries a `default:`
guard, so a missing weight would fail silently rather than error.

**No custom CSS in `src/input.css`.** Per CLAUDE.md, that file holds Tailwind directives only.
Non-utility component styles belong in `assets/base.css`. `assets/tailwind.css` is generated
output and is never edited directly.

**Ordering.** 0.1 runs first because token utilities reference breakpoint names. 0.2, 0.4, 0.5
and 0.6 are mutually independent and can run in parallel. 0.3 depends on 0.1.
