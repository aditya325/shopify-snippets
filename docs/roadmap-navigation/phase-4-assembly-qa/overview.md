# Phase 4: Assembly & QA

## Purpose

Populate the header with the designed content, make it operable for everyone, and compare it against
all 17 Figma frames. Three sequential gates — nothing here runs in parallel, because each needs the
previous one's output to audit.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 4.1 | editor-wiring | PRD | Configure 25 blocks, add a preset, verify the block count against the platform cap |
| 4.2 | accessibility-interaction | PRD | Keyboard, screen reader, touch targets, focus, reduced motion, contrast |
| 4.3 | design-qa | PRD | `/compare` against all 17 frames at 390 and 1440; classify every difference |

4.2 stays its own PRD rather than folding into 4.3. The homepage sprint shipped a 44×44 touch-target
criterion unmet and unnoticed, and its focus outline arrived only as an amendment — bundling
accessibility into design QA is exactly how that happens again.

## Shared Context

**4.1 is where the block-count architecture is proved.** Everything up to here treats ~25 blocks as a
calculation. 4.1 builds the real thing and counts it. If the total exceeds 30, something in 2.2's
model regressed to a per-item block and must be found before 4.3 — the platform cap is 50 and there
is no way to raise it.

**Six entries in `deviations.md` are design-visible and must not be logged as defects at 4.3:**

1. **D-6** — the account icon ships though the design omits it
2. **D-13** — chevrons ship in the scrolled state though `389:29163` shows plain labels
3. **D-2** — the mobile header is 66px, not the "59 + 66" in Sprint §2.2
4. **D-3** — the drawer row is 52px, not 48
5. **D-4** — the chip is `#fde047` fill with no border
6. **D-7** — About → History has no mobile frame; the drawer rendering is unverified, not wrong

**Two things are still genuinely open when this phase starts.** `panel-border #A3A3A3` (Sprint §2.2)
was never confirmed — extraction found it only as a `0.5px` top border on the utility strip, not as an
outer border on the dropdown container. 4.3 measures it and either applies it or logs a new deviation.
And **F3's animation timing** has no design source at all; 2.3 sets a house default of 250ms
`ease-out` which needs designer sign-off here.

**A known gap carries over from the homepage sprint.**
`docs/roadmap-homepage/phase-1-shared-components/1.2-button-snippet.md` records that a **44×44 touch target was
a stated criterion that never shipped**. The header's 18px chevrons and 24px mobile icons are the same
failure waiting to happen, which is why 4.2 names them explicitly. Where the target cannot be met
without breaking the design, record it in `deviations.md` rather than dropping it silently — that is
exactly how it went unnoticed last time.

**No fidelity tolerance exists.** Neither TDD defines one, and the homepage sprint's
`DEFINITION-OF-DONE.md` carries it as an open threshold. 4.3 cannot produce a pass/fail without one,
so it must be agreed before the comparison starts.

**Conventions.** `sections.json` in `.buildspace/artifacts/navigation/` is authoritative over Figma
layer names — three frames in this section are misnamed. Run `/compare` against the saved screenshots
rather than eyeballing; re-run 4.2's keyboard pass after any 4.3 fix that touches focus.
**`deviations.md` is authoritative over the TDD, and the TDD is never edited.**
