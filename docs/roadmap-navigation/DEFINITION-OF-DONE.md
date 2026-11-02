# Definition of Done — Amrutanjan Navigation Sprint

**Version:** 1.0
**Created:** 2026-08-16
**Type:** Project-level release gate
**Applies to:** The navigation sprint as a whole, once all 15 PRDs in `docs/roadmap-navigation/` are executed

---

## What this document is, and is not

This is a **release gate**, not a per-PRD checklist. Each PRD carries its own acceptance criteria
and is signed off on those. This document answers a different question: *once every PRD is
executed, is the header shippable?*

It exists to catch what per-PRD sign-off structurally cannot — cross-panel inconsistency, token
drift, block-budget exhaustion, regressions on the homepage and product pages, and open items that
were deferred one PRD at a time and never collected.

A criterion below is met only when it has been **verified**, not when it was intended.

---

## Scope and exclusions

### In scope

The 10 canonical sections in `.buildspace/artifacts/navigation/sections.json` — the header bar in
both resting and scrolled states, five mega-menu panels across seven pane variants, and the mobile
drawer at both levels — rendered from `sections/header.liquid` and `sections/header-group.json`.

### Explicitly excluded — not defects, do not raise at review

**Out of sprint scope** (Sprint §1): search behaviour beyond the icon, which belongs to the Search
screen; the announcement bar, which stays a homepage section until a site-wide requirement is
raised; the cart drawer, which is reused unchanged.

**Non-themeable Figma elements.** `Navigation Bar` (`389:28439`) is an iOS status-bar mock, the same
class of artefact the homepage sprint excluded as `108:10685`. Its 59px height must not be built —
Sprint §2.2 mistakenly records it as a header row. The 50×50 prototyping controls are `Toggle Button`
(`389:23288`, `389:24806`) on the desktop frames and `Main Container` (`389:28601`) on the mobile
frame. ⚠️ Do **not** exclude `389:28381`, which is named "Toggle Button" but is the 360×844 mobile
drawer panel itself — another instance of Sprint §7's F6 layer-naming problem.

**Hidden Figma layers** (`visible: false`): `Product Card` (`389:23216`, `389:28447`, `389:31175`),
`Bundle Banner Section` (`389:28487`), `Sticky Add to Cart (NEW)` (`389:28602`, `389:31417`).

**Approved deviations** — the full record is `deviations.md`, which is authoritative wherever it
disagrees with the TDD. The six that are design-visible at QA: the account icon ships; chevrons ship
in the scrolled state; the mobile bar is 66px; the drawer row is 52px; the chip is `#fde047` with no
stroke; About → History has no mobile design to compare against.

---

## 1. Completion

- [ ] All 15 PRDs are executed and their individual acceptance criteria signed off
- [ ] All five panels render populated on desktop and in the mobile drawer
- [ ] A fresh theme install from the preset reproduces the full menu — no empty shells
- [ ] No orphaned themex settings survive in `sections/header.liquid`; the boilerplate `mega_menu` block is gone

## 2. Block budget

- [ ] Total block count on the header section is recorded and **≤10**, against a platform cap of 50
- [ ] Exactly five block types exist, one per mega menu — **D-81 supersedes D-1's two-type model**
- [ ] Adding a rail row is a menu edit plus a metaobject entry and consumes no block at all
- [ ] No configured value was hardcoded into Liquid to save a block

## 3. Design fidelity

- [ ] All 8 desktop frames compared at 1440; all 9 mobile frames compared at 390 — 17 total
- [ ] Every difference classified: fixed, accepted deviation, or design error — none unclassified
- [ ] Six panel heights verified: Categories 495, Media 573 ×2, About 573, Combo 605, Shop By Need 637, About History 668
- [ ] Fidelity tolerance agreed and recorded **before** the comparison ran

## 4. Design system compliance

- [ ] Only Space Grotesk and DM Sans ship — no Inter, Manrope, or SF Pro declaration survives
- [ ] Every measured token resolved this sprint is live: nav label 18/27, mobile bar 66px, drawer row 52px, chip fill `#fde047`, rail active `#faf9f6` + 3px `#466e2e` inset, utility strip `16/64` + `0.5px #a3a3a3`
- [ ] `panel-border #A3A3A3` is either applied, or recorded as a deviation in `deviations.md` — not left unresolved
- [ ] No static width on any layout element; pane widths derive from `mega_show_promo`
- [ ] Non-utility CSS lives in `base.css` or a nav-scoped file; `src/input.css` contains directives only
- [ ] `assets/tailwind.css` is byte-identical to a fresh out-of-tree build

## 5. Content and schema

- [ ] Structure comes from Shopify navigation — grepping the header Liquid finds no hardcoded menu label
- [ ] Adding a menu item adds it to the nav with no code change — **true only since D-81**; the block model required a matching block per row
- [ ] Chevrons render only on items with panel content; Offers and Track Order have none
- [ ] Content cards are fields on the About story row entry and cannot detach from their row (**D-81**)
- [ ] Every CTA resolves through its row's `cta_target` reference, or `cta_blog` for Media (**D-81**)
- [ ] The savings badge is derived from price and absent when there is no saving
- [ ] All copy is merchant-supplied; no hardcoded English strings in any new snippet

## 6. Behaviour

- [ ] Panels open on hover and close on mouse-out of both trigger and panel, with an animated height
- [ ] A diagonal cursor path from trigger to panel does not close it
- [ ] Rail switching resizes smoothly without collapsing to zero
- [ ] Panes are pre-rendered and toggled — no network request fires on open (verified in DevTools)
- [ ] Only one panel is open at a time
- [ ] The header is in normal flow at `scrollY === 0` and sticky after, with **zero** layout shift
- [ ] The drawer overlays at 360px, pushes to level 2 with a working back control, and restores scroll position

## 7. Accessibility

- [ ] Full keyboard pass through all 5 panels and both drawer levels — no trap, nothing unreachable
- [ ] `Escape` closes any panel or the drawer and restores focus to the correct trigger
- [ ] `aria-expanded` correct on all 5 chevroned triggers; closed panels absent from the tab order
- [ ] Every icon-only control has an accessible name
- [ ] Interactive targets ≥44×44 CSS px, **or** the shortfall is recorded as an accepted deviation with a reason
- [ ] Visible focus indicator in both resting and scrolled states
- [ ] `prefers-reduced-motion: reduce` disables panel, drawer and background transitions
- [ ] Contrast passes AA, including white on the subscribe gradient's lightest stop
- [ ] Screen-reader pass recorded on ≥1 desktop and ≥1 mobile combination

## 8. Performance

- [ ] No unthrottled scroll listener ships
- [ ] The header adds no render-blocking request; header JS stays `defer`
- [ ] CLS attributable to the header is 0 on first scroll
- [ ] Panel images are lazy-loaded except those above the fold

## 9. Regression — outside the header

- [ ] All seven `product-card` call sites render byte-identically to before 1.1
- [ ] `sections/subscribe-letter.liquid` renders byte-identically to before 1.2, with an unchanged schema
- [ ] `snippets/article-card.liquid` is byte-identical to before this sprint
- [ ] Homepage, collection, product, search and blog templates show no header regression
- [ ] The cart drawer still opens from the header on both viewports

## 10. Build and tooling state

- [ ] Theme check passes with no new offences
- [ ] `npm run build` produces an unminified `assets/tailwind.css` with no watcher running
- [ ] No console errors or warnings from header JS on any template

## 11. Documentation

- [ ] `docs/tdds/amrutanjan-navigation-sprint.md` is **byte-identical** to its signed-off v1.2 state — the TDD is frozen and was never edited
- [ ] `deviations.md` carries all 13 pre-execution deviations plus every one found during execution, each with evidence and an owning PRD
- [ ] Every "Still open" item in `deviations.md` is either closed or explicitly carried forward with an owner
- [ ] `status-log.md` carries a per-PRD record, the handle and decision registry, and the full 4.3 comparison record

---

## Open Items Register

Collected here so they are not lost between PRDs. None may be silently dropped.

| ID | Item | Owner | Must close before |
|----|------|-------|-------------------|
| F3 | Panel animation duration and easing — house default 250ms `ease-out` pending sign-off | designer | **carried — 4.3 deferred (D-84)** |
| — | ~~`panel-border #A3A3A3`~~ | **Closed by D-84** — applied as a 0.5px inset top border on the utility strip; panel hairline is `#e5e5e5` per D-27 | — |
| — | SVG in `image_picker` — spike result, or fall back to `asset_url` | devx | 0.2 |
| — | Fidelity tolerance — undefined by either TDD | devx / Amrutanjan | **carried — 4.3 deferred (D-84)** |
| — | Desktop vs mobile menu labels — Combo/Bundles, Media/Blogs, Categories rail | devx / designer | 0.1 |
| — | ~~44×44 touch targets~~ | **Closed by D-82** — AA failure (18px chevrons) fixed; AAA shortfall measured and accepted per control | — |
| — | ~~Shared vs duplicated collections for the 4 labels appearing in two rails~~ | **Closed by D-81** — duplicated, via separate row definitions | — |

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Designer | | | |
| Amrutanjan | | | |
