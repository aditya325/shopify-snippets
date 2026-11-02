# Definition of Done — Amrutanjan Search Modal Sprint

**Version:** 1.0
**Created:** 2026-08-18
**Type:** Project-level release gate
**Applies to:** The search sprint as a whole, once all 8 PRDs in `docs/roadmap-search/` are executed

---

## What this document is, and is not

This is a **release gate**, not a per-PRD checklist. Each PRD carries its own acceptance criteria and is
signed off on those. This document answers a different question: *once every PRD is executed, is the search
modal shippable?*

It exists to catch what per-PRD sign-off structurally cannot — inconsistency between the default and typed
states, token drift against the navigation track, regressions on the eight other `product-card` call sites,
and open items that were deferred one PRD at a time and never collected.

A criterion below is met only when it has been **verified**, not when it was intended.

---

## Scope and exclusions

### In scope

The modal in both states on both breakpoints, per `.buildspace/artifacts/search/sections.json` — the
`search` frame (default state) and the `searched-product` frame (typed state), desktop 1440 and mobile 390,
rendered from `snippets/search-modal.liquid` and `sections/predictive-search.liquid` via
`sections/header.liquid`.

### Explicitly excluded — not defects, do not raise at review

**Out of sprint scope** (Sprint §1, §4.5): the search results page, its filter rail, sort and infinite
scroll. View All links to an unstyled page and that is expected. The `search-plp` frames in
`.buildspace/artifacts/search/` were extracted for the PLP sprint and must not be built here.

**Non-themeable Figma elements.** `Navigation Bar` (`463:39656`, `463:39786`, `463:40297`) is an iOS
status-bar mock, the same class of artefact the homepage and navigation sprints excluded. Its 59px height
must not be built. `Toggle Button` (`463:38188`, `463:39643`, `463:40437`) is a 50×50 prototyping control.

**Hidden Figma layers** (`hidden="true"`), all verified against the node tree: four 350×113
`Suggestion List` nodes (`463:37518`, `463:38201`, `463:38220`, `463:39754`); `Close Button`
(`463:37513`, `463:39747`); `Product Card` (`463:39790`, `463:38854`).

The first three `Suggestion List` nodes are the discarded Trending group with high confidence — they sit
in *desktop* frames at 350px wide, exactly matching Sprint §1's "its width matches the mobile layout
rather than desktop". `463:39754` is in a mobile frame where 350 is the normal width, so its identity is
inferred, not established. Either way all four are hidden and none is built.

`Bundle Banner Section` (`463:38893`, `463:40344`) and `Sticky Add to Cart (NEW)` (`463:39644`,
`463:40285`, `463:40438`) are also hidden, but they appear only in the PLP frames, which are already
excluded wholesale above.

**Approved deviations** — the full record is `deviations.md`, which is authoritative wherever it disagrees
with the TDD. The six that are design-visible at QA: the panel is a percentage below 1280 rather than 1200
at every width (D-8); panel heights are max-heights, so the panel is shorter than 741 when Recent Search is
absent (D-8); concern chips cap at 6 (D-18); the mobile header offset is measured, not 117px (D-22); the
loading fade and no-results state have no design reference (D-15, D-16); collections appear as a fourth
result group that appears in no frame (D-11).

---

## 1. Completion

- [ ] All 8 PRDs are executed and their individual acceptance criteria signed off
- [ ] Default state renders all three groups; typed state renders products plus every matching secondary group
- [ ] A fresh theme install reproduces the modal with no empty shells — every group either populates or is absent
- [ ] No orphaned themex search settings survive; `grep -rn "trending_collections\|best_sellers_\|recently_viewed"` is clean outside `settings_data.json` and `docs/`
- [ ] `sections/search-modal-results.liquid`, `snippets/search-modal-recently-viewed.liquid` and `assets/search-recently-viewed.js` are deleted

## 2. The D-24 gate

- [ ] The metafield verdict from 1.2 is recorded in `status-log.md` with its evidence
- [ ] If metafields resolve: typed result cards render badge, category, highlight and card image with **real content**, asserted per property — not merely present as elements
- [ ] If they do not: the fallback was decided, recorded as a deviation, and executed — no cards shipped with empty badge and category regions
- [ ] The non-indexing limitation is communicated to Amrutanjan: queries cannot match metafield values

## 3. Design fidelity

- [ ] Both desktop frames compared at 1440 and both mobile frames at 390 — 4 comparisons
- [ ] Every difference classified: fixed, accepted deviation, or design error — none unclassified
- [ ] Measured values verified live: search bar radius 20 / `px-40 py-6` / inner row 48; panel radius 20 / `px-40 py-18`; group gap 24; recent chips 42 tall radius 30 desktop and 26 mobile; concern items 42 radius 20; mobile content column 350 in a 390 viewport; cards 265×459 desktop and 170 mobile; View All radius 12 desktop with an 18px arrow and radius 8 mobile with none
- [ ] Card widths are **derived** — no `w-[265px]` or `w-[170px]` anywhere
- [ ] Fidelity tolerance agreed and recorded **before** the comparison ran

## 4. Design system compliance

- [ ] Only Space Grotesk and DM Sans ship — no third family is declared anywhere in the modal. The design's only Lato nodes are in the excluded PLP price filter, so none should reach this sprint at all
- [ ] The two search-specific greys are used where measured and nowhere else: `#999` compare-at price, `rgba(33,33,33,0.1)` mobile underline (F1)
- [ ] The backdrop is the same `bg-black/20 backdrop-blur-[6px]` pair as the mega-menu — search and navigation do not diverge
- [ ] Transition timing matches the navigation track's 250ms `ease-out`; no second house timing was introduced
- [ ] Hover and focus states follow the mega-menu rail pattern (D-17)
- [ ] No static width on any layout element
- [ ] Non-utility CSS lives in `base.css` or a search-scoped file; `src/input.css` contains directives only
- [ ] `assets/tailwind.css` is byte-identical to a fresh out-of-tree build

## 5. Content and schema

- [ ] The `"Search"` group contains exactly its 11 settings and uploads without a schema error — verified by an actual push, not theme-check alone
- [ ] Adding a menu item to `concern_menu` adds a chip with no code change; a 9-item menu renders 6
- [ ] Changing `recent_searches_limit`, `popular_products_count` or `search_results_count` changes the rendered count with no code change
- [ ] Every heading and both no-results strings are merchant-supplied; no hardcoded English string in any new snippet
- [ ] Group heading icons ship as SVG snippets in code, not merchant-uploaded (Sprint §3.1)
- [ ] With every optional setting unset, the modal renders without an empty heading or a dead link anywhere

## 6. Behaviour

- [ ] Opens from the header search icon on both breakpoints, and via ⌘K / Ctrl+K
- [ ] Closes on the control, on Escape, and on a backdrop click — each verified separately
- [ ] Typing replaces all three default groups; clearing restores them with Recent Search re-rendered
- [ ] One request per debounce window; superseded requests show as cancelled in DevTools
- [ ] A query under 2 characters fires no request
- [ ] `resources[limit_scope]=each` is on every request — verified in the Network panel, not inferred from code
- [ ] Add to Cart from a result opens the cart drawer with the modal still open behind it; two consecutive adds both succeed
- [ ] Zero results shows the configured copy and CTA, with View All hidden
- [ ] View All carries the current query to `routes.search_url`
- [ ] No layout jump between default, loading, results and no-results
- [ ] Recent Search is absent, not empty, when there is no history

## 7. Accessibility

- [ ] Focus is trapped while open — Tab and Shift+Tab cycle within, nothing behind the modal is reachable
- [ ] Focus returns to the header search icon on close, from all three close routes
- [ ] Full keyboard pass on both breakpoints — no trap, nothing unreachable
- [ ] Every icon-only control has an accessible name — close, clear, wishlist, Add to Cart
- [ ] `role="dialog"`, `aria-hidden` and the accessible name are correct in both states
- [ ] Interactive targets ≥44×44 CSS px, **or** the shortfall is recorded as an accepted deviation with a reason
- [ ] Visible focus indicator on every focusable element, including chips
- [ ] `prefers-reduced-motion: reduce` disables the open, close and content-swap transitions
- [ ] Contrast passes AA, including white on `#466e2e` and the category eyebrow colours
- [ ] Screen-reader pass recorded on ≥1 desktop and ≥1 mobile combination, including the results-updated announcement

## 8. Performance

- [ ] `body` scroll is locked while open and restored on close, including after Escape
- [ ] Search JS stays `defer`; the modal adds no render-blocking request
- [ ] CLS attributable to opening the modal is 0
- [ ] All modal images are lazy-loaded — nothing here is above the fold
- [ ] No unthrottled resize listener ships from the header-offset measurement (D-22)

## 9. Regression — outside the modal

- [ ] All eight other `product-card` call sites render byte-identically to before this sprint
- [ ] `snippets/product-card.liquid` is byte-identical to before this sprint
- [ ] `sections/header.liquid` mega-menu behaviour is unaffected — five block types intact, `max_blocks: 10` unchanged
- [ ] The mega-menu backdrop still works; sharing its utility pair did not couple the two
- [ ] Homepage, collection, product, search and blog templates show no regression
- [ ] The cart drawer still opens from the header on both viewports

## 10. Build and tooling state

- [ ] Theme check passes with no new offences
- [ ] `npm run build` produces an unminified `assets/tailwind.css` with no watcher running
- [ ] No console errors or warnings from search JS on any template
- [ ] `npm run docs:view:search` serves this roadmap with all 8 PRDs showing their real status

## 11. Documentation

- [ ] `docs/tdds/amrutanjan-search-sprint.md` is **byte-identical** to its signed-off v1.0 state — the TDD is frozen and was never edited
- [ ] `deviations.md` carries all 22 pre-execution deviations plus every one found during execution, each with evidence and an owning PRD
- [ ] Every "Still open" item in `deviations.md` is either closed or explicitly carried forward with an owner
- [ ] `status-log.md` carries a per-PRD record and the D-24 verdict

---

## Open Items Register

Collected here so they are not lost between PRDs. None may be silently dropped.

| ID | Item | Owner | Must close before |
|----|------|-------|-------------------|
| D-24 | Metafield exposure on predictive-search product objects — smoke test at the front of 1.2 | devx | 4.1 |
| F2 | Review the three secondary result groups (collections, pages, articles) — widened from two by D-11 | designer | sign-off |
| F4 | Hover and focus states for chips and concern items — house pattern applied per D-17 | designer | sign-off |
| — | No-results and loading states — no design exists, built to the design system (D-16) | designer | sign-off |
| — | Metafields are not indexed, so queries cannot match metafield values. Decide whether tag-syncing is wanted | devx / Amrutanjan | sign-off |
| — | One admin **assignment** of the Popular Products collection after deploy. ⚠️ **Corrected 2026-08-18 during 1.1:** the D-6 rename orphaned nothing — `config/settings_data.json` held no value for any search setting (24 keys in `current`, none search-related, no presets), so the collection was never set. The merchant assigns it for the first time; there is nothing to re-select | devx | deploy |
| — | Fidelity tolerance — undefined by the TDD, as it was on the navigation track | devx / Amrutanjan | design QA |
| — | Whether giving up the `/search` route's semantic search (D-5) is acceptable to Amrutanjan | devx / Amrutanjan | sign-off |

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Designer | | | |
| Amrutanjan | | | |
