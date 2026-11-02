# Status Log — Amrutanjan Navigation Sprint

**Created:** 2026-08-16
**Roadmap:** `README.md`
**TDD:** `docs/tdds/amrutanjan-navigation-sprint.md` (v1.2) — **frozen, never edited**
**Amendments:** `deviations.md` — authoritative wherever it disagrees with the TDD
**Design extraction:** `.buildspace/artifacts/navigation/` — 17 frames, complete

---

## Progress

> **2026-08-16 — roadmap generated.** 15 PRDs across 5 phases. Nothing executed yet: 15 Not Started,
> 0 In Progress, 0 Blocked, 0 Done, 0 Done with deviations.
>
> Brainstorming produced **13 deviations from the TDD before a line of code was written** — full
> record in `deviations.md`. The largest is structural: Sprint §3.1's block model computes to ~134
> blocks against Shopify's hard cap of 50, so the design as specified could not have been built.
> Four of the six open flags (F1, F2, F4, F5) closed on measurement; F3 has a house default pending
> sign-off; F6 is mitigated by `sections.json`.
>
> **Reduced from 22 PRDs to 15** on review. The 22-PRD version split work that runs sequentially
> anyway — Categories from Shop By Need (they share a pane snippet), the bundle and press cards from
> the only panels that consume them, four admin-config tasks into four PRDs, and the bar restyle from
> its own sticky state. Nesting was removed entirely.

---

## How to use this log

Update the PRD Tracker as each PRD moves. Statuses: `Not Started` / `In Progress` / `Blocked` /
`Done` / `Done with deviations`. Anything that differs from the PRD as written goes in the Deviations
log below with a reason — never silently.

The Status column in `README.md` is a snapshot; **this file is authoritative**.

---

## PRD Tracker

### Phase 0 — Foundation & Data

| # | PRD | Depends on | Status | Date | Notes |
|---|-----|-----------|--------|------|-------|
| 1 | 0.1 shopify-data-foundation | — | Done with deviations | 2026-08-16 | D1–D4 · 16 collections (not 19) · 43 demo products added as new scope · 1 AC unverifiable, see below |
| 2 | 0.2 rail-icons | — | Done with deviations | 2026-08-16 | D6 · spike passed · 7 SVGs in Files · **3 of 7 ACs deferred to 2.2 — see below** |

### Phase 1 — Shared Components

| # | PRD | Depends on | Status | Date | Notes |
|---|-----|-----------|--------|------|-------|
| 3 | 1.1 product-card-hide-atc | — | Done with deviations | 2026-08-16 | D-8 closed · 38 cards byte-identical across **5 of 7** call sites |
| 4 | 1.2 subscribe-save-snippet | — | Done with deviations | 2026-08-16 | D5 · D-11 closed · homepage differs by 1 whitespace node · **card branch verified at 3.2: 4 of 5 ACs closed; form submit still unfired. Card measures 493 vs 482 — see D-64** |

### Phase 2 — Header Shell

| # | PRD | Depends on | Status | Date | Notes |
|---|-----|-----------|--------|------|-------|
| 5 | 2.1 header-bar | 0.1 | Done with deviations | 2026-08-16 | D-2/D-5/D-6/D-10/D-13 closed · sentinel approach failed, replaced · mobile geometry unverified |
| 6 | 2.2 mega-menu-shell-schema | 0.1, 0.2, 2.1 | Done with deviations | 2026-08-16 | D-1 confirmed as-built · D-26…D-32 raised · closes 0.2's 3 deferred ACs · panel visibility is 2.3's |
| 7 | 2.3 panel-behaviour | 2.2 | Done with deviations | 2026-08-16 | F3 confirmed as-built · D-33…D-38 · animations unobservable in a backgrounded tab |
| 8 | 2.4 mobile-drawer-shell | 2.1, 2.2 | Done with deviations | 2026-08-17 | F2/D-3 re-confirmed by measurement · D-39…D-47 · sliver + touch need a real device · **post-2.4 follow-up closed on devx sign-off: D-48…D-56** |

### Phase 3 — Panels

| # | PRD | Depends on | Status | Date | Notes |
|---|-----|-----------|--------|------|-------|
| 9 | 3.1 product-panels | 0.1, 0.2, 1.1, 2.2 | Done with deviations | 2026-08-17 | F1/D-4 confirmed as-built · D-48…D-57 · neither PRD-named file created — 2.2's snippets reused · **card height and panel heights still short of Figma** |
| 10 | 3.2 combo-panel | 0.1, 1.2, 2.2 | Done with deviations | 2026-08-17 | D-58…D-68 · `/compare` **PASS** both viewports · `nav:audit` **108/110** · `/assess` 0 critical, both Should Fix resolved · closes 4 of 1.2's 5 inherited ACs · **panel 617 not 605 — cause is 1.2's promo (D-64)** · featured no longer duplicates into rows (D-65) |
| 11 | 3.3 about-panel | 1.2, 2.2 | Done with deviations | 2026-08-18 | D-69…D-74 · **D-7 corrected, D-9 confirmed** · **D-64's cause corrected — a 0.4px text wrap, cheaply fixable** · `/compare` **PASS** · `nav:audit` **136/140** with 30 new About checks · mobile History unverified (no frame, D-72) · panels 617 / 651 per D-64 and D-71 |
| 12 | 3.4 media-panel | 0.1, 1.2, 2.2 | Done with deviations | 2026-08-18 | D-76…D-80 · **D-1 appended (`read_label`)** · D-64 confirmed on a 4th panel, D-66 on a 5th instance · `/compare` **PASS** (2 MINOR) · `nav:audit` **177/182** with 33 new Media checks · **`article-card` byte-identical, gated by SHA-256** · Blogs cards 287 vs 320 (D-76) · panels 617 vs 573 (D-64) |

### Phase 4 — Assembly & QA

| # | PRD | Depends on | Status | Date | Notes |
|---|-----|-----------|--------|------|-------|
| 13 | 4.1 editor-wiring | 3.1–3.4 | Done with deviations | 2026-08-18 | D-83 · most ACs superseded by D-81 · preset AC restated · utility links are placeholders |
| 14 | 4.2 accessibility-interaction | 2.3, 2.4, 4.1 | Done with deviations | 2026-08-18 | D-82 · axe clean ×4 contexts · AA target failure fixed · **screen-reader pass and gradient contrast still open** |
| 15 | 4.3 design-qa | 4.1, 4.2 | Blocked | 2026-08-18 | **Deferred by decision (D-84)** — content not final; findings recorded, F3 and tolerance carried |

---

### 1.1 regression record — 5 of 7 call sites measured

`snippets/product-card.liquid` gained `hide_add_to_cart` (default false). One file, 6 inserted lines.
Theme check 134 / 0, unchanged from baseline.

**38 product cards byte-identical**, before vs after:

| Call site | Probe | Cards |
|---|---|---|
| `collection.liquid` | `/collections/body-pain` | 6 |
| `search.liquid` | `/search?q=pain` | 18 |
| `featured-products.liquid` | `/` §`…__featured_products` | 4 |
| `tabbed-product-collection.liquid` | `/` §`…__bestsellers` | 8 |
| `recently-viewed-products.liquid` | Section Rendering API | 2 |

⚠️ **2 of 7 call sites were NOT measured** — `product-recommendations` (renders no section on a plain
load; its `recommendations.performed` guard is false and Shopify's async endpoint 404s on the dev
server) and `featured-collection` (referenced by no template, renders its empty state, 0 cards).
Neither passes `hide_add_to_cart`, so both take the same default-false branch the other five prove.
**That is a code-path argument, not a measurement.** PRD AC *"All 7 existing call sites render
byte-identically"* is **partially proven**. Accepted deliberately by the user during /plan.

**Noise was proven, not assumed.** `_sid` (search session) and the `event_observer.bootstrap` script
both vary between two captures of the *unmodified* file; `themeCityHash` changed because the theme
changed. A normalised control run produces byte-identical output on identical code, which is what
makes "zero diff" meaningful.

**Two checks not performed by the pipeline, recorded honestly:**
- The `hide_add_to_cart: true` path was **verified manually by the user**, not machine-measured —
  nothing in the theme passes the parameter yet, and wiring a consumer temporarily was declined.
- The **390px browser check did not run**: `resize_window` reported success but `window.innerWidth`
  stayed at 1470 and the layout never reflowed. Not load-bearing — the rendered HTML is byte-identical
  and no CSS changed — but not claimed as passed either. Desktop 1440 was verified.

**Still open — D-17.** `product-card.liquid:89-91` continues to hardcode `4.7★ / 132 reviews` and
never reads `custom.rating_value` / `custom.review_count`, which all 49 products now carry. Explicitly
out of scope for 1.1 by user decision; **unowned**. Visible on all 7 call sites and the future nav panels.

**Decision carried forward — no fixed card widths or heights.** User rule, superseding PRD 1.1's
"fixed 170px / 250px / 266px" bullet: the card takes whatever width its container gives it, per
CLAUDE.md's *"layout widths are derived, never declared."* 1.1 added no width or height utility.
**Consequence for 3.1:** risk **R-6** and the open item *"product row overflows its container"* both
assume a fixed 170px track is still an option. Under this rule it is not — 3.1 must resolve R-6 in the
derived direction.

### 1.2 record — subscribe-save snippet + metaobject registry

`snippets/subscribe-save.liquid` created (two branches behind one `layout` param);
`sections/subscribe-letter.liquid` body replaced by one `{% render %}` — **8 insertions, 52 deletions,
0 schema lines changed**. Theme check 135 / 0. `assets/tailwind.css` gained 47 lines, compiled by the
running watcher from the card's new arbitrary-value classes — a build artifact, not a hand edit.

**Metaobject registry** — both definitions `PUBLIC_READ`, `publishable` **disabled** (with it enabled,
a draft entry returns nil in Liquid).

| Type | Fields | Entries |
|---|---|---|
| `subscribe_save` | `heading`, `placeholder`, `button_label`, `benefits` (`list.metaobject_reference`) | `default` |
| `subscribe_save_benefit` | `title`, `subtitle`, `icon` (`file_reference`) | `free-delivery`, `save-extra-15`, `7-day-returns`, `cancel-anytime` |

Liquid access path: **`metaobjects.subscribe_save.default`**. Icons reuse the existing Files SVGs
(`free-delivery.svg`, `coupon-save.svg`, `7-day-return.svg`, `cancel.svg`).

⚠️ **Homepage output differs by exactly one newline — not byte-identical.** `{% doc %}` emits a
leading newline that whitespace control **cannot** strip (it is tag output, not literal text). Proven
by bisection: doc block removed → 0 delta; restored → +1 byte. The user chose to keep the doc block,
since the snippet has a 7-parameter two-layout interface worth documenting and the cost is one
insignificant whitespace text node between block elements — the parent is a plain block container, so
there is no layout or visual effect. **PRD AC "byte-identical" is scored "identical apart from one
whitespace node", not met.** Every snippet in this theme behaves this way; it only surfaced here
because 1.2 is the first refactor with a byte-exact baseline.

⚠️ **The `card` branch is built but completely unverified.** Nothing consumes `layout: 'card'` until
3.2, and the user declined wiring anything temporarily. **3.2 inherits these as acceptance criteria:**

- that `layout: 'card'` renders at all
- that **`metaobjects.subscribe_save.default` resolves in Liquid** — the definitions and entries are
  verified through the Admin API only. API existence is *not* Liquid resolution; 0.1's
  `bundle_contents` proved that gap matters
- that `benefits` iterate as entries rather than a string
- that the card's form submits

**Also carried forward:** the `band` branch still hardcodes `placeholder: 'Enter your email... '`
(trailing space included) because byte-identity requires it — that string predates this refactor. The
`card` branch has no hardcoded English.

**Manrope normalisation was a no-op** — Manrope appears nowhere in the theme; only two families ship.

**`/assess` → `/fix` cycle, 2026-08-16.** Verdict was NEEDS WORK: 0 critical, 4 Should Fix. One real
defect fixed, three deferred by user decision ("escapes only").

*Fixed:* `entry.heading`, `benefit.title` and `benefit.subtitle` were output **unescaped** while the
structurally identical `subline` two branches above was escaped. Three live fixture values contain a
bare `&` (`Subscribe & save 15%`, `Easy & hassle-free` ×2), so this emitted invalid HTML. Three
`| escape` filters added. **Root cause:** the card branch was written fresh against a visual spec while
the band branch was moved verbatim from reviewed code — a new branch beside a migrated one does not
inherit the migrated one's review history.

⚠️ A naive sweep would also have "fixed" `snippets/usp-item.liquid:27`, which outputs `usp_title`
unescaped. **That one is correct** — it is a `richtext` setting containing `<p>` tags, and escaping it
would print literal markup on the live homepage. Field types were checked against the metaobject
definitions before any edit.

The homepage byte gate was **re-measured after the fix**, not assumed: still delta +1 (the D-20
newline only). Theme check 135 / 0.

*Deferred, not fixed:*
- **D-22** — Space Grotesk 600 is never loaded, so the card headline renders at 700. Theme-wide and
  pre-existing; also affects `footer.liquid:73` and `tabbed-product-collection.liquid:47`
- **Five duplicated `newsletter-form` params** (`unique_id`, `tag`, `button_variant`, `form_class`,
  `toast_class`) hand-copied across both branches — the one place the snippet misses the PRD's "a copy
  change lands in one place" goal. A toast z-index change needs two edits in lock-step
- **Static gradient in an inline `style`** (`subscribe-save.liquid:89`) — deferred to 3.2/3.3/3.4

⚠️ **The three new `| escape` filters are themselves unverified in rendered output** — the card branch
renders nowhere until 3.2. Correct by field type and inspection, not by observation.

### 2.1 record — header bar and scroll state

5 theme files changed (`header-desktop`, `header-mobile`, `sections/header.liquid`, `base.css`,
`header-javascript.js`) plus the watcher-compiled `tailwind.css`. Theme check 135 / 0. Header verified
rendering on home, collection, product and search.

**Measured in-browser, not eyeballed:** desktop bar 110px / 60px padding / 100×100 circular logo with
shadow; labels DM Sans Medium 18px/27px `rgb(23,23,23)`; nav gap 40px; label↔chevron gap 8px; chevron
18×18; action icons 30/30/30 at 40px gap. Chevrons render on exactly `shop-by-need`, `categories`,
`combo`, `about`, `media` — **not** `offers` or `track-order`. Scroll round trip confirmed: white at
rest → translucent green with page content visible through the bar → white again, with **bar height
110px in both states**.

⚠️ **The plan's sentinel + IntersectionObserver could not work, and was replaced.** The sentinel sat
inside `.shopify-section-group-header-group`, which is `position: sticky` — so it was pinned with the
header and never left the viewport (proven: at `scrollY 900` it still intersected). Removing sticky
from the wrapper is not an option either, since the header's containing block would then be ~110px and
it would unstick immediately. Shipped instead as a **rAF-throttled scroll handler**, which the PRD
explicitly permits and which matches `collection.js:328-335`. The sentinel was deleted rather than left
as dead markup. **The "sentinel above the header" decision is therefore superseded — there is no
sentinel.**

⚠️ **Two global-ish changes worth knowing.** `base.css`'s `.shopify-section-group-header-group` now has
`background-color: transparent` instead of `var(--color-background)` — an **opaque wrapper would have
sat behind the translucent scrolled header**, compositing it against white instead of page content and
giving the blur nothing to blur. And the header renders on **every** template, so this file's rules are
site-wide.

**Setting registry** — all IDs under 25 chars per `section-standards`:
`header_menu` · `header_scroll_bg_desk` (default `rgba(70,110,46,0.3)`) · `header_scroll_bg_mob`
(default `rgba(70,110,46,0.2)`) · `header_locator_label` · `header_locator_link` ·
`header_consult_label` · `header_consult_link`. The last four are **declared only — 2.2 renders them**.
No section-level `logo` setting: `settings.logo` is already global and consumed by both snippets.

**The desktop scrolled value was absent from both the PRD and `design-context.md`** (which say only
"translucent green wash"). Measured from Figma `389:29164` as `rgba(70,110,46,0.3)` + `blur(22px)` —
note it differs from mobile's `0.2`. Second such gap in that extraction after D-21.

**Not verified — carried forward:**
- **Mobile rendered geometry.** `resize_window` reports success but `innerWidth` stays 1470 and the
  layout never reflows (same limitation as 1.1). Mobile CSS is confirmed correct, but the **rendered
  66px height and the absolutely-positioned logo's placement after `items-center` → `items-end`** are
  unverified. Plan risk R-B, still open — **4.3 or 2.4 should close it**
- Mobile scrolled background, live theme-editor setting changes, the add-a-child-to-Offers dynamic
  test, and a numeric CLS reading

**Testing lessons recorded for later PRDs:** `getComputedStyle()` via the browser tool reported white
for a `var()`-backed colour that was visibly rendering green — trust the render. And **programmatic
`window.scrollTo()` does not dispatch scroll events**, which made correct code look broken; use a real
wheel gesture.

## High blast radius

Three PRDs change files outside the header. Treat their regression criteria as the real deliverable.

| PRD | Touches | Consumers at risk |
|-----|---------|-------------------|
| 1.1 | `snippets/product-card.liquid` | `collection`, `search`, `product-recommendations`, `recently-viewed-products`, `featured-collection`, `featured-products`, `tabbed-product-collection` — **7 sections** |
| 1.2 | `sections/subscribe-letter.liquid` | The homepage. Schema must not change; output must be byte-identical |
| 2.1 | `sections/header.liquid` sticky behaviour | Every template. The announcement-bar interaction is homepage-specific |

---

## Handle & Decision Registry

Filled in by 0.1 and 4.1. Downstream PRDs wire against these, so nothing here may be guessed.

| Item | Value | Recorded by |
|------|-------|-------------|
| Metafield namespaces / keys / types | `custom.publisher` (Article, `single_line_text_field`) · `custom.bundle_contents` (Product, `list.single_line_text_field`) — both `PUBLIC_READ` | 0.1 |
| Collection handles → rail labels | **16, not 19** — full table below | 0.1 |
| Blog handles (Blogs, News & Events) | `blogs` · `news-events` | 0.1 |
| Menu handle | `navigation-main` (title "Navigation Main"), set on `sections/header-group.json` | 0.1 |
| Page handles | `our-story` · `history` · `track-order` | 0.1 |
| Overlapping-collection decision (shared or duplicated) | **Shared** — one collection per name, two rail entry points | 0.1 |
| Top-level menu order (panel frames vs scrolled frame) | **Panel frames** — … About · Media · Track Order | 0.1 |
| Icon naming convention | **`rail-icon-{handle}.svg`** — handles match the collection registry above. Full table below | 0.2 |
| Announcement-bar sentinel position | | 2.1 |
| Final block count | | 4.1 |

### Collection registry — 16 collections, 19 rail entries

Sharing the four duplicated names collapses 19 rail entries to 15 rail collections; `offers` is the
16th. All are **smart** collections — membership is derived, so panels stay correct as the catalogue
grows. Counts measured 2026-08-16.

| Handle | Title | Rail(s) | Rule | Products |
|---|---|---|---|---|
| `body-pain` | Body Pain | Shop By Need | `tag equals need-body-pain` | 6 |
| `period-care` | Period Care | Shop By Need | `tag equals need-period-care` | 6 |
| `recovery` | Recovery | Shop By Need | `tag equals need-recovery` | 7 |
| `rehydration` | Rehydration | Shop By Need · Categories | `tag equals rehydration` | 6 |
| `cold-congestion` | Cold & Congestion | Shop By Need · Categories | `tag equals cold-congestion` | 6 |
| `grooming` | Grooming | Shop By Need · Categories | `tag equals grooming` | 6 |
| `shop-all` | Shop All | Shop By Need · Categories | `tag equals shop-all` | 49 |
| `pain-relief` | Pain Relief | Categories | `tag equals cat-pain-relief` | 6 |
| `womens-care` | Women's Care | Categories | `tag equals cat-womens-care` | 6 |
| `desk-recovery-kit` | Desk Recovery Kit | Combo | `tag equals kit-desk-recovery` | 3 |
| `womens-comfort-kit` | Women's Comfort Kit | Combo | `tag equals kit-womens-comfort` | 3 |
| `family-wellness-kit` | Family Wellness Kit | Combo | `tag equals kit-family-wellness` | 3 |
| `travel-essential-kit` | Travel Essential Kit | Combo | `tag equals kit-travel-essential` | 3 |
| `summer-hydration-kit` | Summer Hydration Kit | Combo | `tag equals kit-summer-hydration` | 3 |
| `workout-recovery-kit` | Workout Recovery Kit | Combo | `tag equals kit-workout-recovery` | 3 |
| `offers` | Offers | Top level (no children) | `is_price_reduced is_set` | 22 |

### Tag taxonomy

One tag selects exactly one collection. Every product also carries `shop-all` and `test-data`.

- **Shared (both rails):** `cold-congestion` · `rehydration` · `grooming` · `shop-all`
- **Shop By Need only:** `need-body-pain` · `need-period-care` · `need-recovery`
- **Categories only:** `cat-pain-relief` · `cat-womens-care`
- **Combo:** `kit-desk-recovery` · `kit-womens-comfort` · `kit-family-wellness` · `kit-travel-essential` · `kit-summer-hydration` · `kit-workout-recovery`
- **Markers:** `bundle` (14 products) · `test-data` (**cleanup handle — selects every fixture product**)

`offers` is the one collection **not** tag-driven. Note its rule is `is_price_reduced is_set`, which
matches any product with `compare_at_price` set — Shopify offers no `compare_at > price` rule. It
returns 22 rather than the projected 21 for that reason.

### Rail icon registry — 7 icons, Shopify Files only

Delivered by 0.2 on 2026-08-16. **Shopify Files only — nothing was added to `assets/`, and no theme
file was changed.** Only the Shop By Need rail carries icons (D-12); Categories, Combo, About and
Media rails have none by design.

All 7 share `viewBox="0 0 18 18"`, `stroke="#466E2E"`, `stroke-width="1.3"`,
`stroke-linecap="round"`, `fill="none"`. Each is a `MediaImage`, `READY`, `image/svg+xml`, 18×18,
CDN-verified HTTP 200.

| Rail row | Figma node | Filename | Alt text | Bytes |
|---|---|---|---|---|
| Body Pain | `389:22811` | `rail-icon-body-pain.svg` | Body Pain rail icon | 1414 |
| Period Care | `389:22816` | `rail-icon-period-care.svg` | Period Care rail icon | 1076 |
| Rehydration | `389:22821` | `rail-icon-rehydration.svg` | Rehydration rail icon | 567 |
| Cold & Congestion | `389:22826` | `rail-icon-cold-congestion.svg` | Cold & Congestion rail icon | 1378 |
| Recovery | `389:22831` | `rail-icon-recovery.svg` | Recovery rail icon | 496 |
| Grooming | `389:22836` | `rail-icon-grooming.svg` | Grooming rail icon | 553 |
| Shop All | `389:22841` | `rail-icon-shop-all.svg` | Shop All rail icon | 992 |

Largest file is 1414 B — 35% of the 4KB budget. Shapes visually verified against
`figma-shop-by-need-desktop.png`: bolt · heart · droplet · wind · refresh · sun · bag.

⚠️ **Figma's bulk export returns icons in a scrambled order.** One `download_assets` call on the rail
container `389:22808` returns all 7, but its `svgAssets` array order does **not** match rail order —
rows 3–6 came back as `772/588/659/1470` against the true per-node `659/1470/588/770`. Taking that
array positionally would have put four icons on the wrong rail rows, invisible until design QA.
**Always export per node ID and take `svgAssets[0]`.** Also take `svgAssets`, never `export` — the
`export` payload is the whole mega-menu on a `#1E1E1E` background (3930 B vs 1506 B).

⚠️ **0.2 delivered the asset half only — 3 of 7 acceptance criteria are deferred, not met.**

| Acceptance criterion | Status |
|---|---|
| Spike run, result appended to D-12 | ✅ Met |
| 7 exported, optimised <4KB, uploaded | ✅ Met |
| `docs/tdds/amrutanjan-navigation-sprint.md` unchanged | ✅ Met |
| `asset_url` fallback ships if the spike failed | — N/A, spike passed |
| Renders at exactly 18×18 in desktop rail + mobile accordion | ✅ **Closed by 2.2** — desktop rail only; mobile accordion is 2.4 |
| Render path does not use `snippets/image.liquid` | ✅ **Closed by 2.2** — plain `<img>`, see D-19 |
| Rail row with no icon renders cleanly — no gap, no broken glyph | ✅ **Closed by 2.2** — measured, all 7 rows 54px with no icon |

`rail_icon` exists nowhere in the theme — no rail, no setting, no render path — so nothing could be
rendered or verified. **The PRD contradicts itself:** its Dependencies section assigns "the
`rail_icon` setting and its render path" to 2.2 as downstream work, while its acceptance criteria
demand render verification inside 0.2. Both cannot hold.

**2.2 must close these three**, not treat them as already satisfied. In particular the "no gap, no
broken glyph" case is the **default state on a fresh install** (see the `image_picker` note below),
not a rare edge case.

⚠️ **`image_picker` supports no `default`** and is not populated by presets
([input settings docs](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings)).
The rail therefore ships with **7 blank icons** on a fresh install. **This is a known 4.1 setup step,
not a defect** — someone must select all 7 in the theme editor before Shop By Need matches the design.
4.3 must not raise it as a fidelity defect.

### Menu — `navigation-main`

Top level: Shop By Need · Categories · Combo · Offers · About · Media · Track Order
Child counts: **7 / 6 / 6 / 0 / 2 / 2 / 0** — verified after a probe round-trip.
Every item is a typed `COLLECTION` / `PAGE` / `BLOG` item with a `resourceId`; no `HTTP` items and no
`/collections/all` placeholders. Offers and Track Order have zero children, so
`header-desktop.liquid:52` renders no chevron for them.

⚠️ Menu item **titles** are a coupling point: `sections/header.liquid`'s `mega_menu` block matches on
`menu_item` == the exact item title. Renaming a top-level item silently unbinds its block.

⚠️ **The schema default cannot be changed — Shopify rejects it.** `/assess` raised as a Should Fix
that `sections/header.liquid:29` still defaults `header_menu` to `main-menu`, so re-instantiating the
section from defaults would silently revert the nav. **The fix is not available.** Setting
`"default": "navigation-main"` makes the theme fail to upload:

> `Invalid schema: setting with id="header_menu" default is invalid`

Shopify only accepts a fixed set of handles as a `link_list` default (`main-menu`, `footer`); a custom
menu handle is refused. Reverted to `main-menu`; the live value in `sections/header-group.json` is
`navigation-main` and is the only place the handle can be set.

**`shopify theme check` does not catch this** — it reported 134 files / 0 offenses on the invalid
schema. Only the live upload validates `link_list` defaults. Do not treat a passing theme check as
proof a schema is valid.

**Residual risk stands, unmitigated:** if the header section is ever re-added from defaults it will
point at `main-menu`. **2.1 owns this** — it rebuilds the header and should either rename the menu to
a permitted default handle or guard the lookup in Liquid.

**Open risk — `offers` can empty itself.** It is a top-level, child-less item driven by
`is_price_reduced is_set`, so it self-maintains in *both* directions: if no product carries a
`compare_at_price`, it reaches zero products and the link lands on an empty collection page. It holds
22 today. Raised by `/assess`; **2.1 or 4.3 should decide** whether an empty Offers is acceptable or
needs a fallback.

---

## Deviations & Decisions Log

> **Full record lives in `deviations.md`** — evidence, resolution and owning PRD for each of D-1
> through D-13. New deviations found during execution are added **there** and cross-referenced here.

**2026-08-16 — 0.1 execution.** Five new deviations, D-14 to D-18, all recorded in `deviations.md`:

| # | Deviation | Why it matters |
|---|---|---|
| D-14 | 19 collections → **16** | Sharing the 4 duplicated rail names is the PRD's own decision 1, which contradicts its "all 19 collections exist" criterion |
| D-15 | **43 demo products created** — new scope | The store held 6 products against minimums of ≥6/≥5/≥3; the PRD assumed a catalogue that did not exist |
| D-16 | Decision-4 evidence corrected | It is 5 panel frames vs **2** (scrolled desktop **and** mobile drawer), not 5 vs 1. Outcome unchanged |
| D-17 | `product-card.liquid` ignores `rating_value` / `review_count` | Hardcodes 4.7★/132. Populating those metafields changes nothing on screen today |
| D-18 | Nothing renders `custom.publisher` yet | `article-card.liquid` never reads it; the press card arrives in 3.4 |

**`bundle_contents` iterates as an array — VERIFIED in Liquid 2026-08-16.** Initially reported
unverifiable (the storefront has `passwordProtection.enabled: true`), but a running
`shopify theme dev` server on `127.0.0.1:9292` bypasses that. A temporary
`templates/product.zzdebug.liquid` was rendered against `desk-worker-relief-pack`:

```
ZZTYPE=list.single_line_text_field   ZZSIZE=3   ZZFIRST=Back Pain Roll-On   ZZCLASS=ARRAY
ZZITEM[1]=Back Pain Roll-On  ZZITEM[2]=Joint & Muscle Spray  ZZITEM[3]=Cooling Recovery Patch
```

`size` returning **3** rather than a character count, and `first` returning an element rather than a
character, is the actual proof. Temp template deleted and `templateSuffix` reset to null; dev server
confirmed healthy afterwards. **All 28 acceptance criteria now met.**

---

## Blocker Log

*(none yet)*

### Standing risks

| ID | Item | Impact if it lands badly |
|----|------|--------------------------|
| R-1 | SVG may not be selectable in `image_picker` | 0.2 falls back to `asset_url`; schema shape unchanged either way |
| R-2 | Block count exceeds 30 at 4.1 | Something in 2.2 regressed to a per-item block; must be found before 4.3 |
| R-3 | 44×44 touch targets slip again | The homepage sprint shipped this unmet and unnoticed; 4.2 names it explicitly |
| R-4 | Desktop/mobile menu label conflict reintroduced at 4.1 | 4.3 raises false fidelity defects |
| R-5 | No agreed fidelity tolerance | 4.3 has no pass/fail line and cannot close |
| R-6 | Product card track built as a derived grid instead of a fixed 170px track | Cards compute to 168px on Shop By Need and stretch to 204px on Categories — neither matches the design |

---

## Documentation Obligations

> ⛔ **The TDD is frozen.** `docs/tdds/amrutanjan-navigation-sprint.md` stays at signed-off v1.2 and
> is **never** edited. Facts discovered during execution go to **this file**; departures from the TDD
> go to **`deviations.md`**.

| PRD | Owes | Goes to | Done |
|-----|------|---------|------|
| 0.1 | Namespaces, keys, types; 16 collection handles; 2 blog handles; menu handle; overlapping-collection decision | status-log | ☑ |
| 0.1 | Desktop/mobile label reconciliation (top level + Categories rail) | **deviations.md** (D-16) | ☑ |
| 0.2 | Icon naming convention | status-log | ☑ |
| 0.2 | SVG-in-`image_picker` spike result | **deviations.md** (D-12) | ☑ |
| **2.2** | **Close 0.2's 3 deferred ACs** — 18×18 render, no `image.liquid`, clean no-icon row | status-log | ☐ |
| 2.1 | Announcement-bar sentinel position | status-log | ☐ |
| 2.2 | As-built block schema | **deviations.md** (confirm D-1) | ☐ |
| 2.3 | F3 resolution — 250ms `ease-out` | **deviations.md** (Still open) | ☐ |
| 3.1 | Chip fill confirmed as built | **deviations.md** (confirm D-4) | ☐ |
| **3.2** | Savings chip derived, not stored; token mapping; 1.2 card branch result | status-log + **deviations.md** (D-58…D-67) | ☑ |
| **3.2** | Fourth product per kit collection, or featured from outside it | **4.1 / 0.1 data** (D-65) | ☐ |
| 3.3 | Carousel absent as built; mobile History unverified | **deviations.md** (D-7 corrected & confirmed, D-9 confirmed) + status-log | ☑ |
| 3.4 | Added `read_label` setting | **deviations.md** (append to D-1) | ☐ |
| 4.1 | Final block count; label decisions honoured | status-log | ☐ |
| 4.2 | Audit record; any accepted 44×44 shortfall | status-log + **deviations.md** | ☐ |
| 4.3 | Panel-border resolution; F3 sign-off; any new deviation | **deviations.md** | ☐ |
| 4.3 | Full comparison record, all sections both viewports | status-log | ☐ |

---

## DoD Threshold Tracker

`DEFINITION-OF-DONE.md` carries thresholds neither TDD defines. Fill these before 4.3 runs.

| Threshold | Value | Agreed by | Date |
|-----------|-------|-----------|------|
| Fidelity tolerance | **TBD** | | |
| WCAG level | AA (assumed) | | |
| Browser matrix | **TBD** | | |
| Touch target minimum | 44×44 CSS px | | |

---

### 2.2 record — mega-menu shell and block schema

**Shipped 2026-08-16.** 5 files created, 4 modified. `shopify theme check`: **141 files, 0 offences** —
and, unlike 2.1, the theme was confirmed to actually **upload and render** on the dev server, which is
the check that matters (theme check passed an invalid schema during 2.1).

**Block model — D-1 confirmed as-built.** Two kebab-case block types, `rail-item` (31 settings) and
`content-card` (4). A full build is **25 blocks** against Shopify's cap of **50 per section instance**,
re-verified on shopify.dev. All 25 are seeded in `sections/header-group.json`, because a section inside
a section group does **not** receive its `presets` — without seeding the schema renders an empty panel
and most acceptance criteria are unverifiable.

**Setting registry** — all IDs and labels under 25 chars per `section-standards`.
`rail-item`: `rail_parent` · `rail_menu_handle` · `rail_label` · `rail_icon` · `rail_panel_title` ·
`rail_pane_heading` · `rail_cta_label` · `rail_cta_link` · `rail_show_promo` · `rail_chip_color` ·
`rail_grp_a_heading/style/links` · `rail_grp_b_heading/style/links` · `rail_prod_collection` ·
`rail_prod_count` · `rail_bundle_coll` · `rail_bundle_count` · `rail_bundle_cta` · `rail_feat_product` ·
`rail_feat_heading` · `rail_feat_cta` · `rail_articles_blog` · `rail_press_blog` · `rail_post_count` ·
`rail_read_label` · `rail_history_image` · `rail_history_cap` · `rail_history_year`.
Everything from `rail_prod_collection` down is **declared only — Phase 3 renders it**.
`content-card`: `card_image` · `card_title` · `card_desc` · `card_link` — **declared only**.

**Measured in a real browser at 1470px** (panels un-hidden via devtools, since visibility is 2.3's):

| Property | Target | Measured |
|---|---|---|
| Header bar | 110px | **110** |
| Panel top | flush under the bar | **110** (Figma says 116 — see D-30) |
| Panel top hairline | 1px `#e5e5e5` | **1px rgb(229,229,229)** |
| Rail width | 220px | **220** |
| Rail row height / pitch | 54 / 54 | **54 / 54** |
| Active row | `#faf9f6` + inset 3px `#466e2e`, no divider | **rgb(250,249,246)**, **inset 3px rgb(70,110,46)**, divider absent |
| Inactive row divider | 1px `#e5e5e5` | **inset 0 -1px rgb(229,229,229)** |
| Pane, promo off | 1068px | **1068.0** |
| Pane, promo on | 684px + 352px at gap 32 | **684.0 + 352.0, gap 32.0** |
| Utility strip | 59px, padding 16/64, `0.5px #a3a3a3` | **59.5**, **16px 64px**, **0.5px rgb(163,163,163)** |
| Chip gap / link gap | 12 / 16 | **12.0 / 16.0** |
| Chip fill / padding / height | `#fde047`, 8×16, 33px | **rgb(253,224,71)**, **8px 16px**, **33** |
| Rail label | DM Sans 500 16/22, `-0.18px` | **"DM Sans" 500 16px/22px ls -0.18px** |

**Every width derives.** The row is `flex gap-8` with a 220px rail and a `flex-1 min-w-0` pane inside
`.page-width`; `subscribe-save.liquid`'s card brings its own 352px. No `w-[1068px]` or `w-[684px]`
exists anywhere in the source. The utility strip's 59px and the rail row's 54px are likewise padding +
content, not declared heights.

**CTA fallback proven by construction:** **21 See All buttons render and not one `rail_cta_link` is
set anywhere** — every URL resolved from the rail's collection or blog. The two About rails have
neither, and correctly render no CTA at all.

### Two bugs found by measuring, not by reading

**1. `border-b` broke the 54px pitch.** Rows measured **55px** — the 1px divider adds to the
border-box. Replaced with `shadow-[inset_0_-1px_0_0_#e5e5e5]`, which draws the divider without
occupying layout. A bonus: `aria-selected:shadow-[…]` overrides it, so the active row loses its
divider automatically instead of needing `border-b-transparent`.

**2. A Liquid comment inside an HTML tag welded the tag name.** Placing
`{%- comment -%}…{%- endcomment -%}` between `<button` and `class=` stripped the separating whitespace
and emitted **`<buttonclass="…">`** — an element named `buttonclass` with no class attribute at all.
Every rail row silently lost its styling. **Never put a whitespace-stripping Liquid tag inside an HTML
tag's attribute list.** Caught only because computed styles came back `none` after a change that
should have been inert.

### Deviations raised

**D-26** composite rail key (four child handles collide across two panels) · **D-27** undocumented
panel-top hairline · **D-28** underline is `#F4C430` not `#facc15` · **D-29** chips 12 / links 16, and
`[&_p]:contents` alone is insufficient for `<ul>` output · **D-30** Figma's 6px panel offset ·
**D-31** the rail's panel title · **D-32** Inter is not loaded, chips ship in DM Sans.

### Corrections to PRD 2.2's own text

- Its line reference `sections/header.liquid:32-83` for the boilerplate block was **stale** — 2.1 had
  moved it to 81-132.
- Its Constraint *"Richtext is sanitised by Shopify to `<p> <br> <strong> <b> <em> <i> <u> <span>
  <a>`"* **misattributes the source**: that list documents a schema's `default` attribute, not a
  runtime sanitisation whitelist, and it omits `<ul>`. See D-29.
- Its Constraint *"`rail_icon` bypasses `snippets/image.liquid`"* is the right call for the wrong
  reason — D-19 already proved `image.liquid` does not break SVG.

### Not verified — carried forward

- **The theme-editor orphan report.** `request.design_mode` gating is implemented and the live
  storefront correctly renders nothing, but **the warning has never been seen in the editor** — no
  orphaned `content-card` is seeded and the editor was not opened. AC unproven.
- **Block count read in the theme editor.** 25 is proven from `header-group.json` and from 23 rendered
  rail rows, not from the editor UI.
- **Live setting changes** (`rail_chip_color` updating the preview) — needs the theme editor.
- **Viewports other than 1470px.** `resize_window` still cannot reflow this environment (same
  limitation as 1.1 and 2.1), so the 1024px and 1280px rows of the plan's responsive tests are
  **unverified**. The layout is derived rather than declared, so it should hold — but that is an
  argument, not a measurement.
- **The 7 rail icons are all blank**, which is the correct fresh-install state (`image_picker` supports
  no `default`). The no-icon path is therefore fully verified; the **with**-icon path — including the
  18×18 render — is verified only by construction, not by a picked icon. 4.1 owns selecting them.

### 2.2 post-`/assess` corrections

`/assess` returned NEEDS WORK — 1 critical, 7 should-fix. All valid; all fixed. Full record in
`.buildspace/artifacts/mega-menu-shell/fix-log.md`.

**The one real architectural defect:** the panel iterated the **menu** and reverse-looked-up blocks,
while the requirement is to walk **`section.blocks` in order**. Both produce identical panes today
because `content-card` bodies are deferred to 3.2/3.3 — so the divergence was invisible. But a card's
pane membership *is* its block position, and a menu walk cannot consult block order, so **nothing in
the codebase knew which pane a card belonged to.** 3.2 would have inherited a rewrite. Now fixed: the
panel walks blocks in order and `snippets/mega-menu-pane.liquid` collects each pane's cards. Verified —
`about-our-story` reports 2 cards, `about-history` 0, 2 total across 23 panes.

The same root cause made the orphan warning incomplete: it counted only cards before the *first*
rail-item, missing cards under a rail bound to a deleted menu item. Detection now derives from the same
single walk, in `snippets/mega-menu-orphan-notice.liquid`, so the two can never disagree again.

**Also fixed:** the critical four-line comment in `mega-menu-group.liquid` (CLAUDE.md allows one line,
never more — the rationale lives in `plan.md`); empty panels no longer render; `max-lg:hidden` stops
the desktop panel applying below 1024px where 2.4's drawer owns the interaction; full tab/tabpanel
ARIA; `shopify_attributes` on the pane; `py-8` moved off `.page-width` onto the painted container;
`max_blocks: 30`; a `content-card` placement hint; `section_id` for the promo; and `rail_panel_title`
now reads the first **bound** rail-item rather than the first non-blank.

**Every geometric target was re-measured after the restructure and still holds** — 54px rows, 1068/684
panes, 220px rail, 59.5px strip, chips 12 / links 16. `shopify theme check`: **143 files, 0 offences**.
`sections/header-group.json` was restored byte-exact after the empty-panel test.

**Unchanged verification gaps:** the theme editor was never opened (orphan warning, block count, live
`chip_color`), only 1470px was measured, and the with-icon rail path is unobserved.

**Second `/assess` → second `/fix`.** 1 critical + 3 should-fix, all resolved. The critical was a
**regression introduced by the first fix pass**: passing `section.id` to the promo's newsletter form
gave all **ten** promo cards the same input `id`, breaking nine `<label for>` associations on every
page. `newsletter-form.liquid` documents that a *blank* `unique_id` is collision-proof precisely
because no id is invented — the first pass "fixed" the safe state. Now keyed per pane on
`panel_handle` + `child.handle`; verified 10 unique ids with every label resolving.

Also applied: the rail's active bar uses `rgb(var(--color-primary))` instead of a hex literal;
whitespace control on every `{% render %}` **outside** an HTML tag — the `{% unless %}` inside the
pane's attribute list is deliberately left unstripped, since stripping there is what produced the
`<buttonclass=` weld; and both new icons mark `size` optional (note: this diverges from all 21
pre-existing icon snippets, which mark it required).

A clean `npm run build` was needed — the Tailwind watcher's incremental rebuild had left a stale
`#466e2e` rule alongside the new token rule in `assets/tailwind.css`.

Two reported findings were correctly **rejected** rather than actioned: `info` on a `"type": "header"`
schema entry is documented on shopify.dev, and `w-[220px]` on the rail is what lets the pane derive
1068/684. A third — a claimed contradiction about the `subscribe_save` metaobject — was a wording
ambiguity in the fix log; the metaobject exists and all 10 cards render.

**Third `/assess` → PASS** (0 critical, 2 should-fix). Closed the one that mattered: two `rail-item`
blocks sharing a composite key emitted identical `mm-tab-*` / `mm-pane-*` ids, and duplicating a block
is one editor click. All ids now key on **`block.id`**, which Shopify guarantees unique — collision-proof
by construction rather than convention, and it re-hardens the pass-2 newsletter fix against the same
case. Verified by duplicating a block verbatim: 24 tabs / 24 panes / 10 newsletter inputs, all distinct,
every `aria-controls` resolving.

Also added a pointer in `deviations.md` mapping clarify's provisional **D-A/D-B/D-C** to the shipped
**D-27/D-28/D-29**. Declined the second should-fix — `info` notes on the 15 declared-only Phase 3
settings — as cosmetic; left recorded for 3.x/4.1.

**2.2 closes with three gaps explicitly unmet, not papered over:** the theme editor was never opened
(block count, orphan warning, live chip colour are code-proven only), only 1470px was measured, and the
with-icon rail path is unobserved.

---

### 2.3 record — panel open/close and rail switching

**Shipped 2026-08-16.** 1 file created, 6 modified. `shopify theme check`: **143 files, 0 offences**;
theme uploads and renders.

**Three of PRD 2.3's requirements were wrong, each corrected against a citation.** `Enter` on the
trigger would have broken the link (D-33); `aria-haspopup="true"`, shipped by 2.1, announces a menu
that does not exist (D-34); and the `hidden` attribute makes the height animation impossible, since a
`display: none` panel measures `scrollHeight: 0` (D-35). A fourth — the two-tap touch pattern — is
undocumented anywhere and was made redundant by the chevron button (D-37). 2.2's 23-tabs-in-tab-order
conformance defect is also closed (D-36).

**R-A cleared.** Splitting the trigger and making the nav full-height was the plan's top risk. Every
2.1 measurement re-taken and unchanged: bar 110, nav gap 40, label↔chevron gap 8, label 18/27 weight
500, chevron 18×18, logo 100×100. The `<li>` bottom now sits exactly on the bar's bottom edge, which is
what lets the underline anchor where the design puts it.

**Open/close round trip measured:** closed 1px / hidden / `inert` / `aria-expanded=false` / underline
opacity 0 → open **542px** / visible / not inert / `true` / underline **1** / chevron rotated 180° →
re-closed back to all of the first. **Keyboard:** exactly **one** tab stop across 7 rail rows, held
through arrow navigation; Arrow Up/Down/Left/Right wrap; Home/End jump; activation follows focus;
opening a second panel closes the first; `Escape` closes and restores focus to the trigger.

### The lesson worth carrying: a backgrounded tab freezes CSS transitions

Most of this build was spent chasing a bug that did not exist. The panel stayed 1px, the underline at
`opacity: 0` and the chevron unrotated — while every attribute and class toggle was provably correct.
Even an **inline** `height: 542px` rendered as 1px, which appeared to prove an `!important` override
that no stylesheet contained.

The cause was `document.visibilityState === "hidden"`. **Chrome does not advance CSS transitions in a
backgrounded tab**, so every transitioned property sits frozen at its start value — and all three
symptoms were transitioned properties. Forcing `transition: none !important` snapped height to 542px
and opacity to 1 in the same frame.

**Check `document.visibilityState` before diagnosing anything involving a transition.** To measure end
states, inject `transition: none !important`, measure, remove. This joins 2.1's two lessons —
`getComputedStyle()` can disagree with the render, and programmatic `scrollTo()` dispatches no scroll
events.

It also caused a wrong turn: mid-diagnosis the custom-property design was blamed and both files were
rewritten to set `panel.style.height` directly. That fixed nothing, and was **reverted** once the real
cause surfaced. The lesson is not "prefer the simpler mechanism" but **"do not change the design while
the diagnosis is unproven."**

### Not verified — carried forward

- **Every animation.** Start and end states are proven; the motion between them is not observable in
  this environment.
- **Hover and the 150ms grace delay** need real pointer movement across two elements.
- **`prefers-reduced-motion`** cannot be forced without CDP emulation.
- **The <1024px gate.** `resize_window` has failed to reflow this environment for four PRDs running.
  The `matchMedia` guard and `max-lg:hidden` are both present in source but unobserved.
- **Touch.** No coarse-pointer device available — though D-37 removed the need for any detection.
- **Rail-switch resizing** stays structurally correct but invisible: the panel is rail-dominated until
  Phase 3 fills the panes.

⚠️ **A latent 2.1 bug found, not fixed:** `header-javascript.js:5` returns from the whole
`DOMContentLoaded` callback when the mobile drawer is absent, which would also disable the rAF scroll
handler below it. 2.3's code sidesteps this by living in its own listener; the original is untouched
and still exposed.

### 2.3 post-`/assess` corrections

`/assess` returned NEEDS WORK — 1 Critical, 5 Should Fix. All valid, all fixed. Record in
`.buildspace/artifacts/panel-behaviour/fix-log.md`.

**The Critical was a convention missed, not an unknown.** The mega menu bound only on
`DOMContentLoaded`, with no `shopify:section:load` handler. `header` lives in `header-group.json`, so
every header setting change and every `rail-item` block edit in the theme editor re-renders the
section, replaces its nodes and destroys every listener — **no panel would open until a full reload**,
hitting exactly the merchant configuring this feature. Four assets here already implement the pattern
(`timeline.js:140`). Fixed by hoisting the block to module scope as `initMegaMenu(root)`, called from
both events, with a `data-mega-bound` guard, document-level listeners bound once so they cannot
accumulate, and state reset per init. `shopify:block:select` was added too, so selecting a rail-item
block opens its panel — which is what makes the block editor usable.

**The sharpest Should Fix:** `releaseHeight` waited on a `transitionend` that never fires when pre- and
post-swap heights are equal — which is *every* rail switch today, since all five panels are
rail-dominated. The panel stayed pinned at an explicit px height under `overflow: hidden` instead of
released to `auto`, defeating "a reflowing pane is not clipped" after the first rail hover, and leaking
a listener per switch. Fixed by short-circuiting to `auto` when the heights match — deliberately **not**
with a timeout, which would reintroduce the same implicit-timing assumption the transition encodes.

**Also:** the chevron and the panel were gated on different conditions, so a merchant could produce a
dead chevron with a dangling `aria-controls`; `sections/header.liquid` now computes `panelled_handles`
once and both consumers read it — one walk fewer than before, not one more. Focus safety moved into
`closePanel` so it holds on every close path. And `link.title` is escaped before it reaches an
`aria-label`.

**Everything re-measured** after the restructure: closed 1px/inert → open 542px/underline 1/chevron
180° → Escape closes with focus restored; one tab stop held through rail switching; 5 chevrons, 5
panels, 23 rail rows, 0 `aria-haspopup`, all `aria-controls` resolving. Unbinding a panel's blocks now
removes its chevron too. Three `shopify:section:load` dispatches left exactly 5 bound flags — no
double-binding. `shopify theme check`: **143 files, 0 offences**; `header-group.json` restored
byte-exact after the test.

⚠️ **The theme editor has still never been opened.** The Critical is verified by event dispatch and the
no-double-bind guarantee, not by a real editor re-render — the largest remaining gap across 2.2 and
2.3 both.

**Second `/assess` → second `/fix`.** 0 Critical, 3 Should Fix. The blocking item was **a regression
from the first fix pass**: `initMegaMenu` reset `megaOpenHandle`/`megaCloseTimer` *before* examining
`root`, while being wired to `shopify:section:load` — which fires for **every** section. Any unrelated
section re-rendering in the editor desynced the tracked state from the DOM, so `Escape` died and two
panels could be open at once, breaching AC 11. Pass 1 had applied "a section can be replaced many
times" to the *binding* but not to the *state reset* two lines above it. Fixed by collecting triggers
first and returning early when the root has none; verified against the exact sequence — unrelated
re-render leaves the handle intact, opening a second panel still closes the first, `Escape` works, and
a *header* re-render still rebinds.

**Also fixed, and it belonged to 2.1:** `header-javascript.js:5`'s early return aborted the whole
callback when the mobile drawer was absent, silently disabling 2.1's own rAF scroll handler. Surfaced
three times across logs without an owner. The scroll handler now has its own listener and guard;
verified with a real wheel gesture — at `scrollY: 500` the bar computes `rgba(70,110,46,0.3)`.

**Declined:** `w-[220px]` on the rail. This pass flagged it; **the 2.2 pass explicitly defended it**, on
the grounds that CLAUDE.md's rule targets columns that divide a container and the fixed rail is what
lets the pane derive 1068/684. Left on 2.2's reading, with the disagreement recorded rather than
quietly resolved. Also declined the larger repair that would delete `megaOpenHandle` and derive open
state from the DOM — better architecture, but a JS+CSS+Liquid change immediately after everything
measured green; the trade-off is written down in `fix-log.md`.

### Subscribe & Save card — collapsed gaps (user-reported, 2026-08-16)

**Symptom.** In the mega-menu promo slot the email input sat flush against the benefits list with no
space above it. Measured: **0px** between the benefits `<ul>` bottom and the form top. Figma has a
clear gap.

**Root cause.** `snippets/subscribe-save.liquid`'s card is `flex flex-col justify-between` and carried
**no `gap`**. Its height equalled its content height exactly (412px), so `space-between` had **zero
free space to distribute** and all three children packed tight. Figma's card is ~482px — roughly 70px
taller than its content — which is where its spacing comes from.

The general lesson: **spacing that depends on leftover space collapses the moment a container is
content-sized.** It looked correct in the homepage `band` layout and only broke in the mega-menu slot,
where the card is sized by its own content.

**Fix shipped.** `gap-[40.5px]` on the card container, the value measured from Figma. Expressing it
once on the container — rather than as a margin on the form — also closes the heading→benefits gap,
which had collapsed to 0 for the same reason.

**Verified in-browser:** heading→benefits **40.5px**, benefits→form **40.5px**, `p-6` padding intact at
24/24 top and bottom, in both the About and Combo panels. `shopify theme check`: 143 files, 0 offences.

**This closes the open item 2.2's `/compare` raised from the other direction** — *"the subscribe-save
promo card is 416px tall vs Figma's ~482px … sits at natural height beside an empty pane."* Same defect,
seen from the height side rather than the spacing side.

⚠️ **Card now measures 493px against Figma's ~482px — 11px over.** A uniform `gap` applies 40.5px to
both slots, whereas Figma's two gaps appear to differ (heading→benefits looks closer to ~29.5px). Left
as uniform deliberately; flagged for 4.3 if exact height matters to design QA.

**Ownership note:** the file belongs to **PRD 1.2**, but the defect is only visible in **2.2**'s promo
slot, and 3.2/3.3 will render the same card. Recorded here so the next consumer does not rediscover it.

---

## Theme editor verification — 2026-08-17

The theme editor had never been opened across 2.2 or 2.3, which left four acceptance criteria proven
only by code reading or synthetic event dispatch. **The user opened it and confirmed two.**

### ✅ Closed

**2.3 — `shopify:section:load` rebinding works under a real section re-render.** This was 2.3's
Critical: the mega menu bound only on `DOMContentLoaded`, so an editor re-render of the header
destroyed every listener and no panel would open until a full page reload. Our own verification could
only *dispatch* the event; a genuine editor re-render is the real test. **Panels open in the editor —
the fix holds.** This also retires the concern that the scoped-state-reset repair (pass 2) might
mis-handle the real re-render path.

**2.2 AC 9 — `rail_chip_color` updates the preview live.** Changing a rail item's Chip Color recolours
the chips without a reload, confirming the `--chip-bg` custom property is wired through
`mega-menu-group.liquid` correctly and is pane-scoped.

### ⏳ Still open — genuinely unverified, not assumed

**2.2 AC 2 — block count reads 25 in the editor.** 25 is proven from `sections/header-group.json` and
from 23 rendered rail rows, but **not from the editor's block list**. Low risk; simply not observed.

**2.2 AC 4 — the orphan warning appears in the editor.** The `request.design_mode` notice only fires
when a `content-card` has no owning pane. Nothing is seeded that way, so seeing it requires
deliberately dragging a card above every `rail-item` — which was not done. The storefront half (a card
with no pane renders nothing) **is** verified.

### Remaining unverifiable in this environment

Unchanged: animations (a backgrounded tab freezes CSS transitions), hover and the 150ms grace delay,
`prefers-reduced-motion`, the <1024px gate (`resize_window` has not reflowed this environment for four
PRDs), and touch (no coarse-pointer device).

---

### 2.4 record — mobile drawer shell

**Shipped 2026-08-17.** 2 files created, 7 modified. `shopify theme check`: **144 files, 0 offences**;
theme uploads and renders with zero Liquid errors.

**D-3 re-confirmed independently.** Root row pitch measures exactly **52** across all seven dividers,
refuting Sprint §2.2's 48 — the same conclusion D-3 reached, now from Figma node metadata and a pixel
scan rather than from the earlier extraction.

**Four PRD corrections, each with a citation.** The scroll-lock instruction spliced two incompatible
techniques (D-40); Figma draws a chevron on all seven root rows including two with nothing to push to
(D-39); `100vh` is `lvh` and clips behind the mobile toolbar (D-44); and the "same grouping helper 2.2
built" does not exist, because Liquid cannot return values (D-45). Three further measurement conflicts
were resolved: the backdrop is 20% not 50% black (D-41), the footer differs between frames (D-42), and
the chevron inset differs between node metadata and rendered ink (D-46).

**Desktop was re-measured, not assumed.** Two modified snippets are live on desktop. After the change:
utility strip still **59.5px / `16px 64px` / row**, promo wrapper and card still **352px**, panes still
**1068 / 684**, rail still **220 / 54**. The 352px moved onto the desktop pane rather than disappearing.

**Drawer measured** (`.menu-mobile` forced visible; every value below is fixed-px and
viewport-independent): panel **360**, backdrop **rgba(0,0,0,0.2)**, header **64**, root rows **52 ×7**,
subheader **52**, level-2 rows **50 ×6**, utility strip **110.5** in `column` direction, 5 push buttons
vs 2 plain links, 6 levels, 23 accordions. Full state round trip verified — open, push, back, close,
with focus returning to the hamburger and the body lock released.

### The lesson that did not transfer on its own

**`border-b` broke the row pitch again.** Root rows measured **53**, not 52 — the 1px divider adding to
the border-box. This is the *identical* defect 2.2 hit on the desktop rail (55 vs 54), fixed there the
same way. I reintroduced it in a new file three PRDs later. Recording it as a rule rather than an
anecdote: **a 1px divider on a fixed-height row must be an inset shadow, never a border.**

**A second finding worth keeping:** a filter expression in a `{% render %}` argument breaks
`theme check`'s parser. Passing `title: block.settings.rail_label | default: rail_child.title` produced
*"The variable 'rail_pane' is assigned but not used"* about a variable used two lines later — the
parser abandons the remaining arguments after a filtered one. I nearly filed it as a tool false
positive; checking the two existing capture→render call sites showed both use plain identifiers only.
Moving the filter into an `assign` took theme check from 1 offence to 0.

### Not verified — carried forward

- **The 30px page sliver** is the one geometric value that is viewport-dependent (`viewport − 360`) and
  needs a real 390px viewport.
- **Focus trap and Escape** are code-verified only; focus *return* to the hamburger was measured.
- **Real mobile.** `resize_window` has now failed to reflow this environment for **five** PRDs. All
  drawer measurements came from forcing `.menu-mobile` visible at 1470px — trustworthy for fixed-px
  values, worthless for anything viewport-relative, touch-driven or iOS-specific. R-D held exactly as
  predicted.
- **The iOS scroll-lock gap** (WebKit 240860 — pinch-zoom and open keyboard — plus iOS ≤18.x) is
  **accepted, not solved**, per D-40.
- **Transitions** never advance in a backgrounded tab, so the push/back slide and the accordion reveal
  are proven by end state, not motion. 2.3's lesson was applied immediately this time rather than
  costing a misdiagnosis.

### 2.4 `/compare` — a defect measurement could not have caught

The `/compare` run captured all 7 mobile frames then stalled before comparing; the captures were sound,
so the comparison was completed manually. Report: `.buildspace/artifacts/mobile-drawer-shell/comparison-report.md`.

**It found a real bug.** The first root row rendered **behind the drawer header** — "Shop By Need"
overlapping the logo — because `.drawer__level` was `position: absolute; inset: 0` inside the panel,
positioning from the panel's top edge rather than below the 64px header. Row dividers sat 12px high
throughout. Fixed with a `.drawer__levels` wrapper (`position: relative; flex: 1; overflow: hidden`)
that gives the levels a containing block below the header. After the fix, code dividers match Figma
**exactly**: 63 / 115 / 167 / 219 / 271 / 323 / 375 / 427, pitch 52 ×7 in both.

**Why `/execute`'s measurements missed it:** every row was the correct height — only their *origin* was
wrong. Height measurement cannot catch a positioning error. This is the clearest argument yet for
running `/compare` even when the geometry has already been measured.

### The bigger finding: mobile *is* verifiable

The compare script drives **Playwright at a real 390×844 viewport with `isMobile` and `hasTouch`** —
which `resize_window` has failed to provide for five PRDs. **The "mobile geometry unverifiable" caveat
carried through 2.1, 2.2, 2.3 and 2.4 was a limitation of the MCP browser tool, not of the project.**

That closed the one AC I had recorded as unverifiable: the **30px page sliver** measures 30.5 (panel
right edge 359.5 in a 390 frame), and the backdrop reads RGB(202,180,56) — exactly 0.8× the yellow hero
behind it, confirming 20% black at a real mobile viewport.

**Remaining differences are both deliberate:** the footer starts at 733 vs Figma's 738 (D-42 — we ship
the level-2 frame's 110/20 over the root frame's 106/18), and 5 chevrons vs Figma's 7 (D-39).

### 2.4 post-`/assess` corrections

`/assess` returned **PASS** — 0 Critical, 3 Should Fix, all 15 ACs met. The three were edge cases, all
fixed. Record: `.buildspace/artifacts/mobile-drawer-shell/fix-log.md`.

They shared one root cause: **state outliving the DOM or timing context it was set from.** (1) A
theme-editor rebind reset the open flag but left `overflow-hidden` on `<body>` — the `data-drawer-bound`
guard cannot reach it because the body class lives outside the replaced section DOM, stranding a
merchant with an unscrollable preview. (2) The focus trap filtered on `offsetParent !== null`, but a
level hidden by `translateX(-100%)` still has one — so Tab reached 7 off-screen root rows. (3) The
re-hide timeout tested the global level rather than the captured element, so a push within 300ms of a
back leaked the departing level for the session.

All three verified with **Playwright at 390×844 / `isMobile` / `hasTouch`**: body unlocked after a
simulated rebind; focusable count 33 → 26, the difference being exactly the 7 off-screen rows; and a
back→push at 80ms leaving the departing level correctly hidden.

**Two reported findings were refuted rather than actioned**, both worth keeping. A claimed stale
Tailwind build was a grep-escaping error — Tailwind escapes `[`, `]` **and** `#`, and this trap has now
produced three false alarms in one sprint. And a claimed 44px level-2 row omitted `accordion.liquid`'s
`h-6` icon wrapper; the suggested `py-4` would have produced 56px and **introduced** the very bug that
was fixed during `/execute`.

`shopify theme check`: **144 files, 0 offences.** Phase 2 complete — 2.1, 2.2, 2.3 and 2.4 all
`Done with deviations`, D-1…D-47 recorded, TDD untouched.

### 2.4 — six user-reported fixes (2026-08-17)

| # | Reported | Root cause | Fix | Verified |
|---|---|---|---|---|
| 1 | Drawer subheader read "I need help with…" | `drawer-panel.liquid` used `rail_panel_title` — correct for the **desktop rail**, wrong here. Figma's mobile subheader is the **menu item title** | Use `link.title`; the whole `panel_title` walk was dead code and was removed | All 5 subheaders now read Shop By Need / Categories / Combo / About / Media |
| 2 | Accordion content touching the row above and below | `content_class` had `px-5 pb-5` but **no top padding** | `px-5 pt-5 pb-4`, matching Figma (content +20, row bottom 16) | Padding `20px 20px 16px 20px`; gaps measured **20** above, **16** below |
| 3 | Push transition glitchy and too fast; back was smooth | Push removed `hidden` and added the active class after a single forced reflow. Back was smooth because both elements were already rendered — the asymmetry was the tell | Double-`requestAnimationFrame`, the idiom already used by `drawerOpen` and three other files here | Transform samples **360 → 238 → 94 → 16 → 0**, a real ease-out curve |
| 4 | Scrolled header background capped at 1440px on wide screens | `.menu-desktop` carried both `.page-width` **and** the background, so the paint was capped with the content | Split: `.menu-desktop` is full-bleed and carries the background; an inner `.page-width` caps the content. CLAUDE.md's documented full-bleed pattern | At 1920px: carrier **1920**, content **1440**, scrolled bg `rgba(70,110,46,0.3)` spanning the viewport |
| 5 | Utility strip misaligned on wide screens | Strip used a bare `px-16`, so it hugged the viewport edge while panel content centred at max-1440 | Inner `mx-auto max-w-[1440px] px-16` wrapper for the horizontal orientation only | Rail x **300**, strip link x **304** — the 4px offset Figma specifies (60 vs 64) |
| 6 | Rail icons never referenced | `header-group.json` seeded no `rail_icon`; 0.2 had uploaded the files but nothing pointed at them | All 7 Shop By Need blocks reference `shopify://shop_images/rail-icon-{handle}.svg` | 7 icons render at **18×18**; rail row still **54px** |

**On (6):** all 7 files were confirmed present in Shopify Files (`READY`, 18×18, `image/svg+xml`) before
referencing them. This closes the last of 0.2's deferred work — the icons now render on the desktop
rail. **The drawer's level-2 rows remain label-only**, which matches the Figma mobile frames (first ink
at x≈21, the label position, with no icon band). Raise it if the drawer should show them too.

**On (4):** the background moved to `.menu-desktop`, **not** to `.header` — putting a `backdrop-filter`
on the header would re-trap the fixed mobile drawer, which is D-25.

`shopify theme check`: **144 files, 0 offences.** Desktop re-verified after (4) and (5): panes
1068/684, rail 220/54, promo 352, strip content aligned.

### Header hides when the footer is in view (user request, 2026-08-17)

**Requirement.** When the footer enters the viewport the header should stop being sticky and not be
visible.

**Implementation.** An `IntersectionObserver` on `footer.footer` sets `data-header-hidden` on
`#main-header`; `assets/base.css` fades it out with `opacity: 0; visibility: hidden`. Bound on both
`DOMContentLoaded` and `shopify:section:load`, so a footer re-render in the theme editor re-observes
the new node.

⚠️ **Deliberately not a `transform`.** Translating the header out would be the obvious way to animate
it, but a transform on `.header` creates a containing block for its `position: fixed` descendants —
which would trap the mobile drawer. That is the same failure D-25 recorded for `backdrop-filter`.
`opacity`/`visibility` achieves the same result with no containing block; verified
`getComputedStyle(header).transform === 'none'`.

**Two guards, both verified:**

- **`window.scrollY > 0`.** On a short page the footer is in view at rest. Without this guard the
  header would hide on load with no way to scroll it back, stranding the user with no navigation.
  Verified on `/pages/track-order` — footer in view, document not scrollable, header stays **visible**.
- **`!drawerIsOpen`.** The header is not hidden while the mobile drawer is open. Body scroll is locked
  then, so the footer cannot enter view, but the guard makes the invariant explicit rather than
  incidental.

Any open mega panel is closed when the header hides.

**Verified at 1440×900:** top → visible · scrollY 1200 → sticky and visible · scrollY 6025 with the
footer confirmed in view → `data-header-hidden="true"`, opacity 0, visibility hidden · back to 1200 →
visible again.

**Known consequence:** at the very bottom of a long page the hamburger and nav are unreachable, which
is the requested behaviour. Scrolling up any amount restores them.

`shopify theme check`: **144 files, 0 offences.**

### Drawer promo card — two fixes (user-reported, 2026-08-17)

**1. The card repeated inside every accordion.** `drawer-panel.liquid` rendered it inside each rail's
captured pane whenever `rail_show_promo` was set — and Combo has that on all six rails, so the level
showed **six** cards. The promo belongs to the level, not to a rail.

**Fix:** compute `level_has_promo` once per level (any *bound* rail asking for it), render the card a
single time after the accordion list, still inside the scrollable body and above the pinned utility
strip. Keyed `drawer-{link.handle}` so it cannot collide with the desktop panel's `mm-{block.id}`.

**Verified:** Combo / About / Media each render exactly **1** card, **0** inside an accordion, and
`afterLastAccordion: true`. Shop By Need and Categories render none, which is correct — no rail on
those levels sets the flag.

**2. The Subscribe button overflowed the card.** A flex item with `flex-1` keeps `min-width: auto`, so
the email input could not shrink below its intrinsic size and pushed the button past the card's right
edge. Added `min-w-0` to the input and `shrink-0` to the button.

**Verified:** email **152** + gap **10** + button **110** = **272**, exactly the card's 320 minus its
24px padding each side. Button right edge 316 against the card's 340 — `overflowPx: -24`.

**Note on the measurement:** the first check reported the input at 0px wide. That was the selector
picking up the form's hidden `form_type` field, not the email input — worth flagging because it looked
like a new bug and was not.

`shopify theme check`: **144 files, 0 offences.**

### Drawer push transition — the real cause (correcting an earlier entry)

**The earlier fix was incomplete.** The six-fix pass recorded the glitchy push as solved by switching to
a double-`requestAnimationFrame`. That change was correct and necessary, but it was **not** the cause of
what the user was seeing, and the symptom persisted.

**Actual root cause — measured.** On push, `drawerShowLevel` called `.focus()` on the incoming level's
back button while that level was still translated **360px off-screen**. `.drawer__levels` was
`overflow: hidden`, and **an overflow-hidden element is still a scroll container**, so the browser
scrolled it horizontally to bring the focused button into view. Instrumented at 16ms after the click:

| t | transform | `.drawer__levels` scrollLeft |
|---|---|---|
| 16ms | 360 | **210** |
| 100ms | 232 | 210 |
| 200ms | 171 | 171 |
| settled | 0 | 0 |

The level was yanked 210px left on the first frame, so it *appeared* already 58% of the way in — the
"too fast". Scroll then tracked the transform down as the browser kept the focused element in view.
Back was smooth because it focuses a button already on screen.

**Fix.** `focus({ preventScroll: true })` on every drawer focus call, plus `overflow: clip` instead of
`hidden` on `.drawer__levels` — `clip` is not a scroll container at all, so focus can never scroll it.

**Verified symmetric.** `scrollLeft` stays 0 in both directions, and the curves now mirror:
push travels 41% / 72% / 96% at 80 / 160 / 240ms against back's 39% / 74% / 96%.

**Worth carrying forward:** `.focus()` scrolls its target into view, and that fights any in-flight
transform on an off-screen element. Use `preventScroll: true` whenever focusing inside an animating or
off-screen container.

### Typography and spacing audit vs Figma (user-requested, 2026-08-17)

Full spec re-extracted from Figma node metadata and diffed against rendered computed styles at 1440
and 390. `design-context.md` was treated as secondary — it disagreed with the nodes in four places.

**Fixed — systematic:** `assets/base.css:38` sets `body { letter-spacing: 0.01em }`, which computes to
**0.16px** and inherits as an **absolute** length, so every nav element without explicit tracking got
0.16px regardless of its own font size. It was hitting the rail title, section titles, chips, utility
labels, drawer root rows, the subheader, accordion rows and benefit titles. Scoped
`letter-spacing: normal` onto `.mega-menu` and `.drawer`; the four values Figma does specify (−0.18,
−0.16, −0.2, −0.28) are explicit utilities and still win.

**Fixed — the card is two different cards.** It had one spec for both contexts. Figma authors them
separately (`389:23655` desktop, `389:30773` mobile):

| | Desktop | Mobile |
|---|---|---|
| Padding | 24 | **18** |
| Radius | 20 | **15** |
| Gap | 40.5 (computed by `space-between`) | **20** (authored) |
| Heading | 30/43 | **28**/43 |
| Input + button radius | 8 | **6** |

Mobile now measures **320 × 397**, matching Figma's 320 × 397 exactly.

**Fixed — three more mismatches the node read surfaced:**
- Desktop "See All" label was DM Sans 600 16/24 −0.32; Figma (`389:23197`) is **DM Sans 700 20/30
  −0.4px**. Height 50 and radius 12 were already right.
- Drawer subheader was 18px; Figma (`389:30006`) is **Space Grotesk 500 16/24**. `design-context`'s
  18px is the style on `389:28386`, an **empty text node** that never renders.
- Mobile CTA is **320 × 38** (`389:30126`), not the desktop 1068 × 50.

**D-22 closed.** `snippets/css-variables.liquid` never loaded Space Grotesk 600, so every
`font-semibold` on the primary face was synthesised. Added `font_primary_600`; the page now emits
three real faces (500 / 600 / 700) and `document.fonts.check('600 30px "Space Grotesk"')` returns true.
This was flagged as unowned/theme-wide back in 2.1.

**Still open — a 1px font-metric difference.** The desktop card measures **493** against Figma's
**450**, entirely from the heading wrapping to two lines. Measured cause: "Subscribe & Save 15%" needs
**305px** and the card's content box is **304px** — it misses by exactly one pixel at identical spec
values (Space Grotesk 600, 30px, −0.2px, capitalize). Loading the real 600 face did **not** change it,
so synthesised bold was not the cause. Mobile is unaffected (28px in a 284px box fits, hence the exact
397). Options are to accept the wrap, force `lg:whitespace-nowrap` (risking overflow on a longer
merchant heading), or nudge tracking — none is free.

**Confirmed already correct:** card list gap 18, row gap 16, tile 46 at radius 6, icon 24, form gap 10,
input h40 `16px 13px` border `rgba(255,255,255,.36)`, button h40 `14px 22px`, headline −0.2px, rail
title Space Grotesk 500 16/24, rail row DM Sans 500 16/22 −0.18, section titles 16/24, chip `8px 16px`
radius 100px height 33, trending link DM Sans 600 14/21 −0.16, root row DM Sans 500 16/24, level-2 row
14px, utility label DM Sans 500 14/20, utility circle 27, utility icon 16.

🔴 **Benefit title — I broke a passing acceptance criterion and have reverted it.** Figma node
`389:23667` and `design-context.md:224` both say **Manrope** SemiBold 600. §2.1 normalisation maps
every Manrope to **DM Sans, family swap only, size and weight preserved** — and that rule is already
written in three places: the frozen TDD (`amrutanjan-navigation-sprint.md:32`), the sprint DoD (line
78), and PRD 1.2's own AC (`1.2-subscribe-save-snippet.md:99` — *"No Manrope declaration ships —
benefit titles are DM Sans SemiBold 16"*). 1.2 shipped it correctly as `font-secondary`.

During the typography audit I asked whether to keep DM Sans or load Manrope. That was the wrong
question — the rule already answered it, and I should have cited §2.1 instead of asking. On the reply
*"it's space grotesk, not manrope"* I switched the class to `font-primary`, which silently failed
1.2's AC. **Reverted to `font-secondary`.**

Rendered at 1440 after the revert: heading **Space Grotesk 600 30/43**, benefit title **DM Sans 600
16/24**, benefit sub **DM Sans 400 14/20**. `document.fonts.check('600 16px "DM Sans"')` → **true**,
so the SemiBold is a real face. **Zero Manrope nodes** on the page.

**The Inter half of the same rule was already correct** — the lifestyle chips render `font-secondary`,
so no change was needed there. A page-wide family sweep returns only Space Grotesk and DM Sans;
`GTStandard-M` also appears but is injected by the `shopify theme dev` preview bar and exists nowhere
in `assets/ snippets/ sections/ layout/ config/ src/`, so it does not ship. DoD line 78 holds.

**Carry-forward:** a font family named in Figma is an *input* to §2.1, never the shipped value. Check
the normalisation table before reading a family off a node.

`shopify theme check`: **144 files, 0 offences.**

---

## 2026-08-17 — Header layout-width audit (devx-reported)

devx flagged `w-[352px] shrink-0` in `mega-menu-pane.liquid` and asked for the whole header to be
cross-checked: *"We have to manage by flex and grids."* A declared width on a layout element violates
CLAUDE.md's **"layout widths are derived, never declared"** rule.

**Audited every header file** for `w-[..px]`, `w-N`, `basis-[..]`, `min-w`/`max-w`. **Three
violations, all layout, all mine** — recorded as **D-48**, **D-49**, **D-50**:

| File | Was | Now |
|---|---|---|
| `mega-menu-rail.liquid:27` | `w-[220px] shrink-0` | `min-w-0 flex-[55]` |
| `mega-menu-panel.liquid:29` | `flex-1` | `min-w-0 flex-[267]` |
| `mega-menu-pane.liquid:59` | `flex-1` | `min-w-0 flex-[171]` |
| `mega-menu-pane.liquid:93` | `w-[352px] shrink-0` | `min-w-0 flex-[88]` |
| `nav-utility-strip.liquid:18` | `max-w-[1440px] … px-16` | `page-width … w-full` |
| `mobile-drawer.css:27` | `width: 360px` | `calc(100% - 30px)` / `max-width: 360px` |

The gaps subtract exactly, so the ratios are whole numbers rather than approximations —
1320 − 32 = 4×(55+267) and 1068 − 32 = 4×(171+88). Measured after the change: **220 / 1068 / 684 /
352** at 1440, scaling to **192.7 / 935.3 / 596.4 / 306.9** at 1280. Nothing moved at the design
viewport; the geometry now tracks the container instead of restating one measurement.

**A second defect fell out of the same audit.** The utility strip's hand-rolled container used **64px**
padding where `.page-width` uses 60, so its items sat 4px inside every other row in the panel. Same
area as devx's earlier "utility bar starting from left" report. Both the first utility item and the
first rail row now measure `left: 60`.

**13 further `w-*` sites were left alone** — logos, icons, cart badges, utility circles, benefit tiles.
The rule explicitly exempts intrinsically-sized elements, and these are not layout.

⚠️ **`w-full` on the utility strip is load-bearing.** `.mega-menu__utility` is `display: flex`, so a
bare `.page-width` child sizes to content — it measured 475px at x=482 before `w-full` went back on.
Caught by measuring; the class change alone looked correct in the diff.

**Tailwind rebuild required** — `flex-[55]`, `flex-[267]`, `flex-[171]`, `flex-[88]` are new arbitrary
classes. Confirmed emitted as `flex: 55` etc. in `assets/tailwind.css`. *(First grep for them reported
NOT FOUND on a bad pattern, not a bad build — the build was fine.)*

`shopify theme check`: **144 files, 0 offences.**

---

## 2026-08-17 — `/assess` on 2.4: one real defect, two false positives

Three findings came back at "Should Fix". **One was real.**

**Real — D-51, unescaped merchant strings.** `link.title` rendered raw on the drawer root rows. The
sweep it prompted found the gap was wider than reported: **12 unescaped sites** against one escaped.
The `shop.name` sites inside `alt=` and `aria-label=` are the actual defect — a quote in the shop name
terminates the attribute. All 12 now carry `| escape`. Rendered at 390: 7 root rows correct,
`alt="Amrutanjan"`, no double-escaping.

**False positive 1 — "promo card placement diverges from the plan."** It does, and deliberately. The
plan put the promo inside each rail item's captured pane; devx reported the result — *"it is on menu
level not sub menu level, it should come below"* — and Combo rendering **six** cards. The current
once-per-level placement is the fix for that report, recorded at line 1031 of this log.

**False positive 2 — "subheader is 16px where the spec says 18, with no recorded deviation."**
Recorded at line 1115. `design-context`'s 18px is the style on `389:28386`, an **empty text node that
never renders**; the node that does render (`389:30006`) is Space Grotesk 500 **16/24**.

**Both false positives share one cause: the agent read `clarify.md` and `plan.md` but not this log.**
Those two documents are now stale against five rounds of devx-reported fixes, and an assessment scored
purely against them will keep re-raising settled decisions. Worth passing the status log into `/assess`
in future, or accepting that plan-divergence findings need checking against the log before acting.

Also worth noting the agent could not verify AC #5 ("exactly 5 push rows") from code, calling it
content-dependent. It was measured during 2.4 — **5 buttons / 2 plain links** — and is recorded above.

**Main `/assess`: PASS** — 0 critical, **16 of 16** acceptance criteria met, 1 Should Fix.

**The Should Fix is accepted, not fixed — D-52.** The body scroll lock has no refcount across
`cart-drawer.js`, `collection.js`, `search-modal.js` and `header-javascript.js` (14 sites). devx's
call: *"when a drawer is opened the whole space will be overlayed by its overlay so user can't open
any other drawer"* — the two-overlay state is unreachable through the UI. No code changed.

**A standing trap re-checked and proven clean, not assumed clean.** `/assess` warned that a
`transform`/`filter`/`contain` on `.header` would become the containing block for the fixed drawer
(the D-25 class). Checking it surfaced that `base.css:113` **already applies
`backdrop-filter: blur(22px)`** to `.menu-desktop` when scrolled. Measured under real scroll: the mega
panel's `offsetParent` stays `.header` in both states, anchored at top **110** (= header bottom) at
full **1440**. Safe — but only because `mega-menu-panel` renders at `sections/header.liquid:43`, a
**sibling** of `header-desktop` (line 36), so it sits outside the blurred element. That render order is
load-bearing and nothing in the file says so.

`shopify theme check`: **144 files, 0 offences.**


---

## 2026-08-17 — Phase 2 closed on devx sign-off

**Phase 2 — Header Shell is complete.** All four PRDs (2.1, 2.2, 2.3, 2.4) are `Done with deviations`.
devx confirmed the remaining items directly: *"collection-filter is working fine"* and *"Its fine now"*
on the mega-menu backdrop. Nothing in Phase 2 is left open for code.

### Post-2.4 follow-up, all landed after the PRD itself closed

| Deviation | What changed |
|---|---|
| D-48 | Header layout columns derive from `flex` ratios instead of declaring `w-[220px]` / `w-[352px]` |
| D-49 | Utility strip used `.page-width` instead of a hand-rolled copy at 64px, closing a 4px misalignment |
| D-50 | Drawer panel width derives from the viewport — the 30px sliver is now what stays constant |
| D-51 | 12 merchant strings escaped; the `alt=` / `aria-label=` cases could break the attribute outright |
| D-52 | Body scroll-lock refcount — **accepted, not fixed**, on devx's overlay reasoning |
| D-53 | `mega-menu.css` and `mobile-drawer.css` deleted; 14 of 16 rules became Tailwind, 2 moved to `base.css` |
| D-54 | Tailwind turns `_` into a space in arbitrary variants — BEM names need `\_\_` |
| D-55 | Drawer sub-menu accordions are single-open via `data-single-open` on the container |
| D-56 | Mega-menu backdrop overlay, `#00000033` + `blur(6px)` |

### Carried into Phase 3 — not defects, but live constraints

- 🔴 **No postcss config**, so `autoprefixer` never runs and the compiled CSS has **zero** webkit
  prefixes. Any `backdrop-filter`/`mask` must be hand-prefixed in `base.css`, as D-56 was.
- ⚠️ **`position: fixed` inside `.header` is one CSS property from breaking** (D-25). Verified clean
  today *only* because `mega-menu-panel` renders at `sections/header.liquid:43` — a **sibling** of
  `header-desktop`, so it sits outside the `backdrop-filter` that `.menu-desktop` carries when
  scrolled. That render order is load-bearing and nothing in the file marks it.
- ⚠️ **The buildspace artifacts are stale.** `plan.md` and `execution-log.md` no longer describe the
  shipped drawer; `deviations.md` and this log are authoritative. An `/assess` scored only against the
  plan produced two false positives — see the entry above.
- **Still unverified anywhere:** real-device touch, iOS Safari, and the 44×44 targets that 4.2 owns.
  Every measurement in this sprint came from Playwright, not hardware.

**Phase 3 (3.1–3.4) remains `Not Started`** and is unblocked. `shopify theme check`: **144 files,
0 offences.**

---

## 2026-08-17 — 3.1 Product Panels — Done with deviations

Shop By Need and Categories render their product grids. **Marked `Done with deviations`, not `Done`** —
the vocabulary every other completed row uses, and two measured values are still short of Figma.

### Smaller than the PRD implied

**Neither file the PRD's Expected Output named was created.** Both jobs had already shipped in 2.2:
`mega-menu-group.liquid` *is* the PRD's `nav-link-group.liquid` and matched 3.1's spec line for line
(chips `gap-3`/`px-4 py-2`/`#fde047`; links 14/21/−0.16 underlined; `--color-primary` = `#466E2E`).
The pane already had heading, groups and CTA. **Only the grid was missing.** Building the named files
would have forked a second pane snippet, which the PRD's own Constraints forbid.

**Files:** `mega-menu-products.liquid` and `icon-x-circle.liquid` created; `mega-menu-pane.liquid`,
`drawer-panel.liquid`, `product-card.liquid`, `accordion.liquid`, `mega-menu-group.liquid`,
`nav-utility-strip.liquid`, `header-mobile.liquid`, `header-group.json` modified.

### Verified against Figma, not against prose

`389:23289` **confirmed the PRD's 170 × 266**, and 637/495, gap 12 and the 12px overflow. The PRD's
numbers held up — unusual for this sprint.

But the pane's vertical gaps are **not uniform**: Shop By Need runs 32/24/24 and Categories 16/16
against the `gap-8` that shipped in 2.2. A groups wrapper plus a conditional pane gap lands both
exactly — **514** and **372**.

### Deviations raised

| | |
|---|---|
| **D-48** | header columns derive from flex ratios instead of `w-[220px]`/`w-[352px]` |
| **D-49** | ~~utility strip `.page-width`~~ — **raised in error, reverted at D-57's sibling**; Figma puts the rail at x60 and the strip at x**64** |
| **D-50** | drawer panel width derives from the viewport; the 30px sliver is what stays constant |
| **D-51** | 12 merchant strings escaped — the `alt=`/`aria-label=` cases could break the attribute |
| **D-52** | body scroll-lock refcount — **accepted, not fixed**, on devx's overlay reasoning |
| **D-53** | `mega-menu.css` + `mobile-drawer.css` deleted; 14 of 16 rules became Tailwind |
| **D-54** | Tailwind turns `_` into a space in arbitrary variants — BEM needs `\_\_` |
| **D-55** | drawer accordions single-open via `data-single-open` on the container |
| **D-56** | mega-menu backdrop, `#00000033` + `blur(6px)` |
| **D-57** | card width derives; the declared-170 exception withdrawn |

### devx-reported defects, all fixed and measured

| Reported | Cause | Now |
|---|---|---|
| Cards uneven height | wrapper stretched, card didn't fill it | `h-full` — one height, bottoms aligned |
| Last card cut, no scroll | `overflow-hidden` reproduced the clip | scrolls; `.scrollbar-hide` per the homepage pattern |
| Price shown | Figma's card body (`389:22890`) has **no** price row | `hide_price: true` |
| Title 2 lines pushed the subline down | `line-clamp-2` let titles be 1 or 2 lines | title reserves `min-h-[42px]` |
| Mobile header broken | **my error** — `items-end` from a spec line that only holds with its 50px clusters | reverted to centred |
| No rail icons in the drawer | never rendered | 20px icon, 12px gap, row **48** |
| Trending wrapped | shared desktop values | scrolls, gap **20**, one line |
| Gaps 12 not 10 | shared desktop values | chips **10**, products **10**, card **155** |
| Mobile 2-col grid | wrapping grid | 2 visible + swipe |

**The root cause of that cluster: mobile and desktop genuinely differ** — chips 10/12, trending 20/16,
products 10/12 — and my first audit compared desktop values only, so it reported "matches" when the
mobile nodes said otherwise. They are responsive pairs now.

### `product-card` — refactored twice

The mega menu renders the card at 170px while the viewport is 1440, so every `lg:` upgrade fired. The
first fix parameterised all 18 `lg:` fragments — provably safe (12/12 byte-identical) but 34 lines of
`assign` for one idea. devx rejected it. **The second fix is devx's own suggestion and is better**: 13
BEM hooks on the card, and the whole variant is one `card_class` string at the call site.
`product-card.liquid` now differs from HEAD by **16 added class names and nothing else**.

Byte-identity no longer applies — hook classes legitimately change the HTML — so the regression was
re-run on the property that matters: **geometry identical on 12/12 page cards**.

### Still open

- 🔴 **Card 274.3 against Figma's 250 / 266**; panels **662.3 / 522.3** against 637 / 495
- ⚠️ **Shop By Need shows the eyebrow** where Figma hides it (`389:22891`) — devx chose to keep it;
  worth ~16px of the gap
- ⚠️ **Drawer chevrons point right**, Figma points down — 2.4 chose right for push nav, signed off
- ⚠️ **AC 11 unexercisable** — no bound collection holds fewer than 5 products, so `limit > size`
  never ran. The inverse is proven (5 from a 6-product collection)
- **`scripts/nav-audit/` is gitignored** (`.gitignore:12`), so the 90-check harness lives only in the
  working copy. Same treatment as `scripts/docs-viewer/`; raising it, not changing it

`shopify theme check`: **147 files, 0 offences.** `npm run nav:audit`: **90 checked, 90 ok.**

---

## 2026-08-17 — 3.2 Combo Panel — Done with deviations

Four snippets created, six files modified. `shopify theme check`: **151 files, 0 offences.**
`npm run nav:audit`: **110 checked, 108 ok, 2 delta, 0 not found.** `/compare`: **PASS**, both viewports,
one iteration, no `/fix`.

**Created** — `bundle-card-featured.liquid`, `bundle-row.liquid`, `mega-menu-pane-bundles.liquid`,
`icon-check-circle.liquid`. All three PRD-named files exist, unlike 3.1 where none did.
**Modified** — `mega-menu-pane.liquid` and `drawer-panel.liquid` (one identical render call each),
`sections/header.liquid` (`rail_bundle_count` default 4→3), `sections/header-group.json` (six `cmb-*`
blocks wired), `locales/en.default.json` (two keys).

### One responsive DOM, no `layout` parameter

`mega-menu-products.liquid` takes `layout: 'track' | 'grid'` to serve both viewports. The bundle pane
does not need it: `header-mobile.liquid:11` is `lg:hidden` and `mega-menu-panel.liquid:20` is
`max-lg:hidden`, so unprefixed utilities are only ever *seen* below 1024 and `lg:` only above it. Both
call sites make the **same** render call. "Desktop and mobile cannot drift" becomes structural rather
than convention-enforced.

Three differences that look structural are breakpoint-expressible, which is what makes this work:

- **Contents list** — two column groups always. Mobile `flex-row justify-between` gives the two-column
  tick-list; `lg:flex-col lg:gap-2` stacks them, and because the outer gap equals each column's own gap,
  all items land in one evenly-spaced 8px column. Split at `ceil(n/2)`, so 4 → [1,2][3,4] matching Figma.
- **Chip alignment** — `justify-between lg:justify-start`. Mobile pushes the chip right (Figma
  `389:30985` ends flush at 292); desktop packs it 4px after the title (`389:23413` at x214 of 318).
- **Row track** — mobile `flex overflow-x-auto`, desktop `lg:flex-col lg:overflow-x-visible`.

### Measured at 1440, real hover, 4-entry fixture

| | Figma | Built |
|---|---|---|
| rail / pane / promo | 220 / 684 / 352 | **220 / 684 / 352** |
| featured card / rows / gap | 350 / 322 / 12 | **350 / 322 / 12** |
| featured card height | 376 | **376.87** |
| card body height | 178 | **178** |
| pane-main natural | 482 | **482.87** |
| rows | 3 equal | equal, `flex: 1 1 0%` |

`flex-[175]` / `flex-[161]` over `gap-3` derives 350.0 / 322.0 exactly inside the 684 pane — the
derive-don't-declare rule paying off, and it scales proportionally when the promo is off.

### Two defects that only measurement could catch

**`aspect-ratio` was silently defeated.** First measurement returned media 348×**320**, ratio 1.087
against the intended 1.768, making the card 471 tall instead of 376. `min-height: auto` on a column flex
item let the `<picture>` at natural height outgrow the aspect box. Fixed with `product-card__media`'s
pattern — `relative shrink-0 overflow-hidden` on the box, `absolute inset-0` on the image.

**The class was present and applied the whole time.** `lg:aspect-[350/198]` was in the compiled CSS and
on the element; only measuring the box caught it. This is the third time in this sprint a presence check
would have passed a real defect.

**The featured bundle duplicated into the rows** — see **D-65**. Every `rail_feat_product` is a member of
its own `rail_bundle_coll`, so all six panes rendered the same bundle as both card and row. `/compare`
passed it (different fixture data in the mock); `nav:audit`'s `featured excluded from rows` check caught
it. Fixed. Consequence: three-product kits now yield **two** rows, not Figma's three — **0.1 needs a
fourth product per kit**, or the featured product must come from outside the collection. **Raised for 4.1.**

### A plan assumption that was wrong

The plan called `lg:shrink` load-bearing, claiming `shrink-0` would outrank `lg:flex-1`. The compiled
output disproves it: `.shrink-0` sits at line 1590, `.lg\:flex-1` at 4093 — Tailwind emits **every** `lg:`
variant after **all** base utilities, so `lg:flex-1`'s shorthand already wins. Class and its inaccurate
comment removed; computed `flex-shrink` on a desktop row slot measures **1**.

The CLAUDE.md hazard is real but points the other way: it concerns an unprefixed utility beating a
**different stylesheet's** media query (`base.css`'s `.page-width`), not Tailwind's own variant ordering.

### 1.2's inherited ACs — 4 of 5 closed

The `layout: 'card'` branch had never rendered anywhere. It renders at **both** the mega-menu and drawer
call sites. `metaobjects.subscribe_save.default` **resolves in Liquid** (heading output
`Subscribe &amp; save 15%`); `benefits` iterate as **4 entries**, not a string; 1.2's three `| escape`
filters are observed correct for the first time.

⚠️ **"the card's form submits" remains unverified.** Markup is complete — a `<newsletter-form>` custom
element with `data-action="/contact"`, hidden `form_type=customer` / `utf8` / `contact[tags]`, and a
`required` email input; there is deliberately no native `<form>`. **No submission was fired:** it writes a
real contact record to the live store. devx chose to leave it unverified rather than create test data.

### How the two unfixturable ACs were proven

No bundle product lacks `bundle_contents` and none lacks a saving, so "chip absent" and "no list" had no
fixture. Proven against **rendered DOM** via a temporary `templates/index.zzbundle.liquid` reached with
`?view=zzbundle` — **no store data was mutated**, and the template was deleted (confirmed absent). This
is the `?view=` variant of 0.1's `product.zzdebug.liquid` technique, and it needs no admin change at all.

Liquid selected the fixture itself: **`advanced-pain-relief-patch`** (price 17900, compare-at nil, no
metafield) → no `__chip` element, no `__list`, no `__col`, no "Save" text. My first guess, `pain-balm`,
was **wrong** — it does carry a compare-at price (₹159→₹129), so its chip was correct; the initial FAIL
was a bad fixture, not a defect.

Also proven in the same pass: chip percentage **identical to `product-card`'s arithmetic** (both 25% for
`desk-worker-relief-pack` in one render), `rail_bundle_count: 2` → exactly 2 rows, and all three empty
states leaving no container.

### Escaping has live fixtures now

Three real values exercise it: `Joint &amp; Muscle Spray`, `Neck &amp; Shoulder Comfort Pack`,
`Women&#39;s Monthly Essentials`. D-51's class of bug would have surfaced immediately.

### Facts discovered

- **The store's money format is `₹ 399`**, not the "Rs. 1,499" both the clarify doc and
  `product-card.liquid`'s own doc block assume. The space between symbol and number means
  `whitespace-nowrap` is still genuinely load-bearing.
- **`#466e2e` is `color_primary` and `#f4c430` is `color_accent`** — see D-61. The chip fill was an open
  question at /clarify and is simply the accent token.
- **`nav:audit`'s 3.2 checks were pre-written against different class names** (`.bundle-card`,
  `.bundle-card__contents`, `.mega-menu__bundle-rows`). 13 checks were silently reporting *not found*.
  `scripts/nav-audit/spec.json` selectors were updated to the as-built BEM names (which follow the
  filenames per css-standards), converting 13 blanks into real assertions — and that is how D-65 was
  found. The contents checks use `childSel: "li"`, which prompted the tick rows to become a real
  `<ul>`/`<li>` list, matching `subscribe-save.liquid`'s benefits markup.
  ⚠️ `scripts/nav-audit/` is **gitignored**, so this spec fix lives only in the working copy.
- `templates/index.zzbundle.liquid` and `scripts/nav-audit/spec.json.bak` are build artefacts; the
  former was deleted, the latter is a backup of the pre-rename spec.

### Still open

- 🔴 **Panel 617 against 605** — cause is 1.2's promo card at 493 vs 482 (**D-64**). Affects 3.3 and 3.4
  identically. **4.3 to resolve.**
- 🔴 **Two rows where Figma shows three** — three-product kits (**D-65**). Needs a data change at 0.1 or
  a merchant choice. **4.1.**
- ⚠️ **Featured media ~1px short** at both viewports (**D-66**) — CSS border box model vs Figma's
  overlapping stroke; compensating would make card height worse.
- ⚠️ **`rail_feat_cta` and `rail_feat_heading` are dead settings** (**D-58**). 4.1's block audit.
- ⚠️ **Mobile Combo diverges from its frame in four accepted ways** (**D-63**). 4.3 to rule on whether
  the frame or the shared drawer behaviour is authoritative.
- ⚠️ **Form submit unfired** — awaiting devx.
- 🔴 **`scripts/` is entirely untracked.** `.gitignore:12` is a bare `scripts/` and `git ls-files scripts/`
  returns **zero** files, yet `package.json` exposes `nav:audit`, `docs:view` and `docs:view:nav` and
  CLAUDE.md documents `npm run docs:view` as required. **A fresh clone can run none of them.** 3.1 raised
  this and chose not to act; **D-65 is the first concrete cost** — the untracked `nav-audit` harness caught
  a duplication defect that `/compare` had passed. The sprint's regression net is one `git clean -fdx` from
  gone. Awaiting devx.

### 3.2 `/assess` — NEEDS WORK, both Should Fix items resolved

0 Critical · 2 Should Fix (**both fixed**) · 1 AC not met (**D-64**, upstream) · 1 inherited AC unverified
(form submit, devx's choice) · 5 Observations. The two items `/assess` called blocking were already
devx-decided and logged, not open work.

1. **`bundle-row.liquid`'s `{% doc %}` marked `row_cta_label` required** while the code treats it as
   optional. The doc was the wrong half — now `[row_cta_label]`. Proven: no label → 2 rows, 0 links.
2. **The collection was walked twice**, in header code running on every page load, and
   container-existence and row-count consulted different values. `rail_bundle_count: 0` was where they
   disagreed, leaving an empty `.mega-menu__bundles-list` (reachable only by direct JSON edit; the schema
   floor is 1). Collapsed to a single `capture` pass, so the two cannot disagree by construction.

Re-verified after the refactor: theme check **151 / 0**, `nav:audit` **108/110 unchanged**, all six panes
2 rows with no duplicates. `/assess` also independently confirmed the D-65 exclusion has no off-by-one
when the featured product is not a collection member, that `header-javascript.js` binds both
`shopify:section:load` and `shopify:block:select` so the theme editor survives, and that
`accordion.liquid:69` outputs `{{ content }}` unescaped — which is what makes the drawer's capture path
work at all.

### 3.2 — featured card was not clickable (devx report, fixed)

**D-68.** A regression from D-58: removing the CTA to match Figma removed the card's only route to the
product. The three small `bundle-row` cards each had a stretched link; the large "Combo of the month" card
— the merchant's nominated product — had none. **Neither `/compare` nor `nav:audit` tests clickability,
so both passed it.** A third case of a check that verifies geometry and markup but not behaviour.

Fixed by moving the title to an `<a>` with `after:absolute after:inset-0` over a `relative` root — the
stretched-link pattern `product-card.liquid` and `bundle-row.liquid` already use. No visible button, so
D-58 stands and the design is unchanged.

Hit-tested rather than presence-checked: `elementFromPoint` over the image, body, a tick label, the chip
and the title all resolve to `A.bundle-card-featured__title` with the right product URL. Confirms the
`absolute inset-0` image does not block the pseudo-element — the media's child paints before the title's
positioned `::after` in tree order, so no `z-index` is needed.

⚠️ **End-to-end mouse click unreproducible through synthetic input** — the panel is hover-driven and a
scripted click opens it on mouse-move then closes it on mouse-down, the same limitation `/compare`
documented. Hit target proven at the exact clicked coordinate; backdrop is `pointer-events-none`.
**Worth one confirming click with a real mouse.**

---

## 2026-08-18 — 3.3 About Panel — Done with deviations

Two snippets created, five files modified. `shopify theme check`: **153 files, 0 offences.**
`npm run nav:audit`: **140 checked, 136 ok, 4 delta, 0 not found** — up from 110 checks, because About had
**no audit coverage at all** before this PRD. `/compare`: **PASS** both viewports, one iteration, no `/fix`.

**Created** — `nav-content-card.liquid`, `mega-menu-pane-about.liquid`. Both PRD-named files exist.
**Modified** — `mega-menu-pane.liquid` and `drawer-panel.liquid` (one identical render call each, plus the
duplicate-heading condition), `sections/header-group.json` (four About blocks), and
`scripts/nav-audit/{run.mjs,spec.json}` (3 openers, 3 scenarios, **30 checks**).

### The richtext clamp — unprecedented here, and proven by measurement

`card_desc` is richtext, so its text sits inside its own `<p>` and a wrapper `line-clamp-4` would not clip
it. Neither existing clamp in the theme (`article-card.liquid:88`, `search.liquid:130`) clamps richtext.

`[&_p]:contents` — the flattening `mega-menu-group.liquid:15` already uses — makes the wrapper own the
line boxes, so **one** clamp spans **any** number of paragraphs with **one** ellipsis. `base.css:18-24`
zeroes all margins, so the box lands on exact multiples of the line height:

| Card | Paragraphs | Desktop | Mobile | Clamped |
|---|---|---|---|---|
| long copy | 1 | **84** (4 × 21) | **64** (4 × 16) | yes |
| short copy | 1 | **21** (one line) | **16** | **no** |
| two paragraphs | 2 | **84** | 64 | yes (desktop) |

Short copy at 21px is the proof that it reserves no empty space, and the two-paragraph card reaching the
same 84px with a single ellipsis is the specific case the technique exists for. A screenshot of the clamped
box shows **four lines ending in an ellipsis**.

⚠️ **`getComputedStyle().display` reports `flow-root`, not `-webkit-box`,** even though the compiled rule
is correct. Nothing in the theme sets `flow-root` — a Chromium serialization quirk. Behaviour was confirmed
by measuring the box and viewing the render, never by reading the class. Recorded so nobody "fixes" it.

### Measured

Desktop Our Story: pane 684, promo 352, rail 2 rows, cards **332** each at **20px** gap on one row, body
padding 16 / gap 8, description 84, Read More 684. Type asserted, not eyeballed:
title `DM Sans 600 16/22 -0.18px`, description `DM Sans 400 14/21 -0.16px`.

Desktop History: photo **594 × 390**, gap **4**, caption `Space Grotesk 500 18/27`, year
`Space Grotesk 700 320/320 -12px` — all exact.

Mobile: card 320, media 140, padding 14, gap 4, description **64**, cards stack in 2 rows at **10px**,
title `DM Sans 600 14/21 -0.16px`, description `DM Sans 400 12/16 -0.12px`.

Pane content: Our Story **450.8** against Figma's 450 ✅. History **527** against 545 — see **D-71**.

### Three defects, one of them mine to own

**The plan's audit opener was wrong.** It specified *clicking* `[data-rail-row="history"]`.
`header-javascript.js:399-400` binds **`mouseenter` and `focus` only**, so the click was a no-op: the
History pane stayed `hidden`, all five of its checks read "selector not found", and `pane main width`
passed against the *Our Story* pane. **A wrong opener is indistinguishable from missing markup** — the
elements had been rendering correctly the whole time, confirmed by grepping the raw HTML. Fixed with
`hover()`, which `/compare` showed is better than `focus()`: it also sets `aria-selected`, so the active
rail bar renders, whereas focus paints a Chromium focus ring and leaves the row unselected.

**An empty content-card left an empty flex slot.** `nav-content-card` correctly rendered nothing for a
fully blank block, but the pane wrapped **every** block in a `lg:flex-1` slot — so the blank one claimed a
share of the row as a visible gap. Fixed by capturing each card and emitting the slot only when non-blank;
the same single-source-of-truth shape 3.2's `/assess` asked for. Proven with a temporary blank block:
**3 cards, 3 slots.**

**D-64's recorded cause was wrong, and correcting it is the most valuable thing this PRD produced.** The
promo is 493 rather than 450 because the heading overflows its container by **0.4px** at
`lg:text-[30px]` (304.4 against 304.0 available) and wraps to two lines, adding exactly 43px. That 43px is
the entire panel overshoot on **both** panels built so far. At 450 the content would drive both panes and
Combo would land on **605** and Our Story on **574** — Figma exactly. devx chose to leave the code and
correct the record, so 4.3 inherits a one-utility fix instead of a geometry mystery.

### Facts discovered

- **`data-content-cards` on `mega-menu-pane.liquid:64` is dead** — nothing in any `.js` or `.liquid` reads
  it. 2.2 counted cards while deferring the render. The counting walk is now redundant alongside the pane
  snippet's own collecting walk. Both left in place, out of scope, **flagged for 4.1**.
- **The orphan-notice AC was already met by 2.2.** `mega-menu-orphan-notice.liquid` renders from
  `sections/header.liquid:39`, is `request.design_mode`-gated, and derives its count from the *same* single
  walk as the renderer, so warning and render cannot disagree. 3.3 only confirmed it.
- **Richtext is never escaped anywhere in this theme** (`usp-item.liquid:27`, `mega-menu-group.liquid:15`,
  `announcement.liquid:10`, `section-header.liquid`). `card_desc` ships raw; every text/textarea sibling is
  escaped. Verified in output: no literal `&lt;p&gt;`, a real `<p>` inside the description.
- **The About mobile frame validates two of 3.2's D-63 decisions** — it shows both the promo and the CTA
  on mobile, confirming the Combo frame was the outlier rather than the shared drawer behaviour.
- `category-card.liquid` shares `card_image` / `card_title` / `card_link` setting *names* with
  `content-card` but is the homepage shop-by-category tile. Coincidence, not a reuse candidate.
- **Prettier was not run.** `prettier-plugin-tailwindcss` is installed but no prettier config file exists,
  so the class-sorting plugin would not load and running it would churn unrelated files.

### Still open

- 🔴 **Panels 617 (Our Story) and 651 (History) against Figma's 573 and 668.** Two distinct causes, both
  recorded: **D-64** (the 0.4px heading wrap, cheaply fixable, 1.2's file) and **D-71** (Decision 3's
  photo-drives-height inversion, deliberate, 18px, visually undetectable). **4.3 to rule on both.**
- ⚠️ **Mobile History is unverified** — no Figma frame exists, and the year at 150px, caption at 16/24 and
  side padding at 21px are all proportional inventions (**D-72**). 4.3 must not score them as defects.
  ⚠️ **One of them was a defect devx had to report (2026-08-18): the photo completely covered the year on
  mobile.** The root shipped with `lg:px-[45px]` only, and that side padding *is* the mechanism exposing the
  numeral — `w-full` photo over an `absolute inset-0` year layer. Fixed with `px-[21px] lg:px-[45px]`.
  **The lesson is the gap that let it ship:** the `mobile / about expanded` scenario had **no History checks
  at all**, because there was no Figma frame to source expectations from — so the absence of a design became
  the absence of any check. Now guarded by a `mobile / about-history expanded` scenario asserting the
  *relationship* (year layer 320 > photo 278, padding 21) rather than Figma values. **145 checks, 141 ok.**
- ⚠️ **`decor-shape #D9D9D9` has no consumer anywhere** (**D-73**). Retire the token or amend D-59.
- ✅ **Closed 2026-08-18 — the real Figma images are now in Shopify Files.** devx reported all three About
  images as not matching. Extracted from Figma, composed where needed, uploaded via
  `stagedUploadsCreate` → `fileCreate`, and wired: `nav-about-founder.jpg` (653×357),
  `nav-about-logo.png` (664×396, the logo composed on a `#faf9f6` canvas at Figma's own
  47.29% / 79.29% proportions) and `nav-about-origin.jpg` (1344×768). All three **READY**, no collision
  renaming. `rail_history_year` moved 1893 → **1940** to match, since the 1893 pairing rationale went with
  the old asset. Card 2's copy now matches card 1, as Figma shows identical copy in both.
  This also confirms `/compare`'s reading that card 1's washed-out look was the **asset**
  (`about-us-background.png`), not the code — the real founder photo is correctly exposed. Details in
  **D-70** and **D-74**. `nav:audit` re-run after the change: **136/140, unchanged.**
  ⚠️ Node exports could not be used directly — exporting `389:23625`/`389:23636` bakes in the parent card's
  border and rounded corners. Raw image **fills** were used, identified **visually**, because
  `389:23625`'s fill list still carries the bundle-card product shot from the Figma duplication (D-7).
- ⚠️ **`data-content-cards` and the redundant `card_count` walk** — 4.1 cleanup.
- ✅ **History made clickable (devx report, 2026-08-18) — D-75.** The whole block is now an `<a>`; only the
  Check History button was a route before. Two failed intermediate states are recorded there because both
  *looked* correct: a caption-stretched pseudo-element that left the photo inert (the caption's own
  `relative` trapped it), and an accessible name that read "The Origin The Origin" once photo and caption
  shared one anchor. Both found by hit-testing and name computation, not by checking markup. Guarded by new
  `tag` / `href` audit props.
- ⚠️ **`nav:audit` is mildly flaky — re-run before believing a "not found" burst.** Openers use fixed
  `waitForTimeout` values, so a slow first request against `shopify theme dev` can miss the panel opening
  and report a whole scenario as "selector not found". Observed once at 138 ok / 7 not found, with two
  immediate re-runs both giving **149 checked · 145 ok · 4 delta · 0 not found** on identical code. A
  *delta* is trustworthy; a *not-found burst* should be re-run. Also note 3.3's own lesson (execution-log
  F-1): a wrong opener produces exactly the same "not found" signature as missing markup.
- ✅ **Photo→caption gap resolved.** A hand-added `md:gap-4` on the history root had pushed the desktop gap to
  16px against Figma's 4px (`md` is 768px, so it applied on desktop; mobile still measured 4). devx removed
  it, restoring 4px at every width. The audit expectation was deliberately **not** moved to make the check
  pass — the delta stood until the code was corrected.
- 🔴 **`scripts/` remains entirely untracked** (`.gitignore:12`). This PRD added 3 openers and 30 audit
  checks that a fresh clone cannot run. Raised at 3.1, again after 3.2's `/assess`, and now carrying more
  weight. Awaiting devx.

---

## 2026-08-18 — 3.4 Media Panel — Done with deviations

**Phase 3 is complete.** Two snippets created, seven files touched. `shopify theme check`: **155 files,
0 offences.** `npm run nav:audit`: **182 checked, 177 ok, 5 delta, 0 not found** — up from 149, because
Media had **no audit coverage at all** before this PRD (+33 checks). `/compare`: **PASS**, two MINORs, one
iteration, no `/fix`.

**Created** — `press-card.liquid`, `mega-menu-pane-media.liquid`. Both PRD-named files exist.
**Modified** — `mega-menu-pane.liquid` and `drawer-panel.liquid` (one identical render call each, **no
change to the D-69 heading condition**), `sections/header-group.json`, `scripts/nav-audit/{run.mjs,spec.json}`
(4 openers, 4 scenarios, 33 checks), and **D-1 in `deviations.md`** — the `read_label` note the PRD required.

### `article-card` byte-identity was a gate, not a formality

Sprint §6 forbids modifying it, and it also ships to `sections/featured-blogs.liquid` and
`sections/blog.liquid`. A SHA-256 was captured **before** the build and re-checked after, alongside an empty
`git diff --name-only`. Both clean. This is why D-76 accepts a 33px card-height shortfall rather than
reshaping the card from the wrapper.

### The PRD's structural rules, asserted rather than inspected

| Rule | Result |
|---|---|
| exactly one anchor per card | **1,1,1** on press-cards *and* on article-cards |
| Read More is not an anchor | `SPAN` ×3 |
| no category badge on press-card | `false` |
| card root is not itself a link | `ARTICLE` |
| equal heights, mixed headline lengths | Read More baseline **487 in all three** |
| date right-aligned with no publisher | `dateRight == metaRight`, unchanged at 204 |

The last one is the PRD's subtlest requirement. `justify-between` would have **left**-aligned the date once
the publisher was gone; `ml-auto` holds the right edge with one child or two. Proven against
`blogs/period-care-on-the-go`, which genuinely has no publisher — no store write needed.

### Two findings

**`base.css`'s `line-height: 1.6` leaks into every arbitrary `text-[Npx]`.** The plan flagged Figma's two
`leading-[normal]` values as un-pre-computable. The answer is that they must be **pinned**: Read More
rendered at 16 × 1.6 = **25.6** against Figma's 21, making the card 341 instead of 336. Fixed with
`text-[16px]/[21px]` and `text-[12px]/[16px]`. **Figma's `leading-[normal]` is not licence to omit a
line-height in this theme** — carry that to any future card work.

**Regex slicing produced three false positives; DOM queries corrected all three.** Scraping the rendered
HTML reported 4 article-cards inside the News pane, 2 anchors on the third card, and a badge on press-card.
All artifacts: the News pane and the media drawer level are the **last** of their kind, so slices bounded by
"the next sibling marker" ran to end-of-document and swallowed the homepage and every later drawer level.
**Bound a slice by a structural end marker, or query the DOM.** The audit's `countChildren`, which scopes to
the element, was correct throughout.

### `/compare`'s two MINORs — one fixed, one accepted

**Fixed: the Blogs read affordance said "Read More" where Figma shows "Read →".** `/compare` concluded the
setting "can't serve both panes" — that reasoning was wrong, and checking it was worthwhile.
`rail_read_label` is a **per-`rail-item`** setting, and `press-card` never reads it (it uses
`blog.read_more`). So `med-blogs` was corrected to **"Read"** with zero effect on News. It now also matches
the homepage's independent `blogs_read_label: "Read"`, which suggests "Read" is the project-wide intent.

**Accepted: mobile News shows a "News" heading Figma lacks** — **D-79**, the fourth member of the
D-63 / D-69 family.

### `/compare`'s O-2 investigated and NOT reproduced

`/compare` raised the rail-row hairline (`mega-menu-rail.liquid:52`) as a possible spec-vs-design conflict.
It is not one. `design-context.md:107` specifies "`border-bottom: 1px solid #e5e5e5` on every row **except
the active one**", and the build implements exactly that — `aria-selected:shadow-[…]` **replaces** the
divider rather than composing with it, because Tailwind shadow utilities override. With Media's two rows that
leaves no divider between the active row and its neighbour, which is what was pixel-scanned. **2.2's "met"
assessment stands; no change made.**

### Facts discovered

- **There are three blogs, not two.** `blogs` (3 articles), `news-events` (3), and an unreferenced **`news`**
  (4, all `test-`-prefixed) — live and published, almost certainly a homepage-sprint leftover. 0.1's "two
  blogs" is incomplete. **Raised for 4.1** to ignore or clean up.
- **`custom.publisher` is populated on all three `news-events` articles** — The Economic Times, The Hindu,
  Business Standard. D-18's "nothing renders it yet" was a theme-side statement, not a data gap.
- **All three `blogs` articles carry the full badge set and `read_time`**, so `article-card`'s badge renders
  from real metafields; and none has a publisher, which made `blogs` the no-publisher fixture at zero cost.
- **`locales/en.default.json` has no `date_formats` block**, so `| date: '%b %d'` — identical to
  `article-card:46` — is the only correct option. Confirmed empirically before building: the homepage renders
  "Aug 05".
- `blog.read_more` reads **"Read more"** while Figma shows "Read More", so press-card carries `capitalize` —
  the same mechanism Figma applies to its own See All button. No new locale key, no hardcoded English.

### Still open

- 🔴 **All four promo-bearing panels are 617 against Figma's 573/605** — **D-64**, one 0.4px heading wrap,
  now confirmed on a fourth panel by both `/compare` and this build. **This is the single highest-leverage
  fix left before 4.3: one utility corrects Combo, Our Story and both Media panels.**
- 🔴 **Blogs cards 287 vs 320** (**D-76**) — accepted; unfixable without touching `article-card`.
- ⚠️ **"A blog with 1 article renders 1 card"** is proven only as `posts_count: 1` → 1 card. No blog has
  fewer than 3 articles, so the **data-driven half is code-inspected, not measured.**
- ⚠️ **D-63 / D-69 now has four members** (mobile See All, mobile promo, mobile Combo heading, mobile News
  heading). **4.3 should rule on the family, not case by case.**
- ⚠️ **`decor-shape #D9D9D9` still has no consumer** (**D-73**).
- ⚠️ `data-content-cards` and `mega-menu-pane.liquid`'s redundant `card_count` walk — 4.1 cleanup.
- ⚠️ `rail_feat_cta` and `rail_feat_heading` remain dead settings (**D-58**) — 4.1's block audit.
- 🔴 **`scripts/` is still entirely untracked** (`.gitignore:12`). The harness is now **182 checks** across
  16 scenarios and a fresh clone can run none of it. Raised at 3.1, 3.2, 3.3 and now 3.4.

---

## 2026-08-18 — Mega-menu data model → metaobjects — Done with deviations

Not a PRD. A post-sprint refactor of the block model, agreed in review and recorded as **D-81**, which
supersedes **D-1** and resolves **D-26** and **D-45** by construction.

**Why.** One `rail-item` block type carried 30 settings across 23 instances; each panel used 5–12 and
the rest were shown anyway. Data entry was not reliably possible, and the same "which block belongs to
which link and child" resolution was reimplemented in 7 files because there was no first-class panel.

**Shipped.** 25 blocks → 5 (3 settings each). 8 metaobject definitions, 32 entries. 28 hand-typed
handles → 5. `presets` populated so a fresh install reproduces the menu.

### Definition and entry registry

| Definition | Entries |
|---|---|
| `mega_menu_need_row` | 7 |
| `mega_menu_category_row` | 6 |
| `mega_menu_combo_row` | 6 |
| `mega_menu_about_story` / `mega_menu_about_history` | 1 / 1 |
| `mega_menu_media_blogs` / `mega_menu_media_press` | 1 / 1 |
| `mega_menu_link` | 9 |

Seeded from `sections/header-group.json` so nothing was retyped. `publishable` left **off** on every
definition — with it enabled a draft entry returns nil in Liquid.

### Facts discovered

- **`nav:audit`'s exit code is not a sufficient gate.** `run.mjs:173` is
  `process.exit(fails.length ? 1 : 0)`; `missing` is never consulted and page errors never fail the
  run. A vanished selector — the exact symptom of an id collision — logs a yellow `?` and exits 0.
  **Read all four summary numbers.** The suite also asserts no text anywhere, so label drift is
  invisible to it.
- **The live theme has 0 header blocks.** `amrutanjan-shopify/main` still carries the pre-sprint
  header with only a `menu` setting; the navigation sprint has never been published. The feared
  "schema change drops live block settings" hazard did not exist.
- **Shopify validates block types against the schema on upload.** Reverting `header-group.json`
  without `header.liquid` produced *"Invalid value for type in block 'sbn-body-pain'"* and a 500 from
  the dev server. The two must move together.
- Zero label, order or new-child drift — all 23 menu child titles already matched `rail_label`, and
  menu order already matched `block_order`.
- `rail_feat_heading` and `rail_feat_cta` were **dead** — declared in the schema, read by no code.

### Two hazards designed against rather than discovered

- **Id collision.** Four child handles sit under two parents and every panel is in the document at
  once, so a bare-handle id would let `getElementById` resolve into the wrong panel — silently, since
  `header-javascript.js:324` guards with an early `return`. Ids are namespaced by parent and both
  derived from one `pair_key`. `data-rail-row` deliberately stays a bare handle: it is panel-scoped in
  JS, and `nav-audit` hovers it document-wide.
- **First-wins invariant.** JS never sets an initial selection. One walk over `link.links` now builds
  rail rows and panes together so `forloop.first` drives both, replacing two independent walks that
  agreed only by coincidence of matching filters.

### Verification

| Gate | Before | After |
|---|---|---|
| `nav:audit` | 182 / 177 ok / 5 delta / 0 not found | **identical**, no `spec.json` change |
| `shopify theme check` | — | 159 files, **0 offenses** |
| Browser invariants | — | no duplicate ids; every `aria-controls` resolves inside its own panel across all 23 rows; 1 selected / 1 tabbable / 1 visible pane per panel; keyboard roving intact |

The five deltas are pre-existing and unchanged. The browser invariant pass exists because `nav:audit`
structurally cannot see the collision class.

### Still open

- **Not committed** — the change sits in the working tree on `navigation`; the commit was declined.
- **Theme-editor pass not run.** `shopify_attributes` and `shopify:block:select` render nothing outside
  the editor, so selecting a block to open its panel, and the repurposed orphan notice, are unverified.
- **Admin-UI handle generation** was proven on the API path only; one manual entry should confirm it
  before a merchant creates rows by hand.
- The 5 "Shop by Lifestyle" chips still target `shop-all` — preserved deliberately so any audit delta
  is unambiguously a regression, not a content change.

---

## 2026-08-18 — `nav:audit` harness removed

`scripts/nav-audit/` and the `nav:audit` npm script were deleted at the client's request. The harness
was **gitignored** (`.gitignore:12` ignores `scripts/`), so it was never committed and there is no
history to restore it from — a copy of `run.mjs`, `spec.json` and `README.md` was taken outside the
repo before deletion.

Every earlier reference to `nav:audit` in this log and in `deviations.md` is left untouched: those are
records of what was verified at the time and remain accurate. The command they name no longer exists.

**What goes unguarded from here.** The suite was 182 checks across 16 scenarios — all five panels at
1440 and 390 — asserting heights, gaps, fonts, child counts and scroll behaviour against Figma-derived
numbers with node ids. Its own README records why it existed: five defects shipped on 2026-08-17
because the audit before it compared rendered values against desktop-first prose instead of numbers.
Mobile chip gap, trending gap, product gap, missing rail icons and wrap-instead-of-scroll all had that
one cause. Nothing now re-checks those numbers automatically.

`@axe-core/playwright` and `@playwright/test` are left in `devDependencies` — the harness was their only
consumer in the repo, but they are still useful for ad-hoc browser checks.

---

## 2026-08-18 — 4.2 Accessibility — Done with deviations

Executed against the metaobject-backed header. Recorded as **D-82**; closes the Open Items Register's
44×44 row.

### Verified

| Check | Result |
|---|---|
| `@axe-core/playwright` | **0 violations** in 4 contexts — header at rest, open panel, mobile bar, open drawer |
| `aria-expanded` | correct on all 5 triggers; absent on Offers and Track Order |
| Closed panels in tab order | all 5 `inert`, sealing **214** focusables |
| Accessible names | every icon-only control named |
| Keyboard | `Enter` opens, `Escape` closes and restores focus to its trigger |
| Roving tabindex | arrows, `Home`, `End` traverse the rail correctly |
| `prefers-reduced-motion` | `transition-property: none` on both the panel and the cards |
| Target sizes | one **AA** failure found and fixed; AAA shortfall accepted per control (D-82) |

### Two audit errors worth remembering

The first run reported **61 findings**; the real count is 36, and none of the difference was a code
defect — the audit itself was wrong twice:

- **Stretched links measure their text box.** `getBoundingClientRect()` on an anchor whose hit area
  comes from `after:absolute after:inset-0` returns the text, not the card. That produced ~40 false
  target-size failures. The check now walks to the nearest positioned ancestor.
- **`transition-none` zeroes `transition-property`, not `transition-duration`.** Reading
  `transitionDuration` under `prefers-reduced-motion` returns `0.3s` and looks like a failure while
  the transition is in fact disabled. Assert on `transition-property`.

Both are instances of the standing lesson: assert the property that actually governs the behaviour.

### Still open

- **Screen-reader pass** — §7 requires one on ≥1 desktop and ≥1 mobile combination. Not done; nothing
  automated substitutes for it.
- **Contrast** — §7 requires AA measured, including white on the subscribe gradient's lightest stop.
  axe found no contrast violations in the header, but it cannot evaluate text over a gradient, so the
  gradient case is unverified.
- The a11y audit script lives in the session scratchpad, not the repo (`scripts/` is gitignored).

---

## 2026-08-18 — 4.1 Editor Wiring — Done with deviations

Recorded as **D-83**. The PRD was written against the block model **D-81** replaced, so most of its
criteria are superseded rather than executed; D-83 records each one as met, superseded or restated.

**Done in this pass:**

- **Utility strip links wired.** `header_locator_link` and `header_consult_link` were unset, so
  `nav-utility-strip.liquid` rendered `<span>` rather than `<a>` — inert on all five panels, both
  drawer levels and the drawer root. Now **22 anchors, 0 spans**. ⚠️ Both point at `/pages/contact`
  as placeholders; `store-locator` and `consultation` pages do not exist.
- **Preset completed.** It had no `settings` block at all, so a fresh install would have reverted to
  inert utility links *and* bound the header to `main-menu` (Home / Catalog / Contact, no panels)
  instead of `navigation-main`. It now carries `header_menu` and both utility links alongside the
  five blocks.
- **Orphan notice confirmed working** in the theme editor by the client, and its wording corrected —
  it referenced "Parent Handle", a label renamed to "Menu Item Handle".

**Decisions recorded:**

| Decision | Rationale |
|---|---|
| Utility links point at an existing page rather than their semantic URL | `/pages/store-locator` and `/pages/consultation` would 404, and a broken link would land as a defect in 4.3 |
| The preset reproduces structure, not content | Row content is shop data under D-81. On a seeded shop the menu renders complete; elsewhere five empty panels |
| The "7 blank icons on a fresh install" note is void | Icons are `file_reference` fields on the row entries and seed with them |

**Still open:** two of the three theme-editor behaviours remain unverified — selecting a mega-menu
block should open its panel, and deleting one should remove its panel and chevron. Only the orphan
notice has been exercised.

---

## 2026-08-18 — verification harnesses removed; recorded figures are not reproducible

Both navigation verification harnesses were deleted at the client's request. `scripts/` is gitignored
(`.gitignore:12`), so neither was ever committed and **neither can be restored from git history.**

| Removed | What it asserted |
|---|---|
| `scripts/nav-audit/` + `npm run nav:audit` | 182 checks across 16 scenarios — widths, heights, gaps, paddings, fonts, child counts and scroll behaviour, each against a Figma node id, at 1440 and 390. Last run: **182 checked · 181 ok · 1 delta · 0 not found** |
| `scripts/nav-pixels/` + `npm run nav:pixels` | Whole-frame pixel comparison against the 17 Figma PNGs, plus a `--baseline` regression mode verified deterministic at **0.00%** across all 16 frames |

`scripts/docs-viewer/` was deliberately kept — `npm run docs:view` still works — but it carries the same
exposure: gitignored, no history, no backup.

### What this means for the record

Several deviations cite results from these harnesses as their evidence:

- **D-81** — "`nav:audit` 182 checked / 177 ok / 5 delta / 0 not found, identical to the pre-refactor
  baseline"
- **D-82** — target sizes and axe results, and the layout-shift proof for the hit expanders
- **D-84** — the six panel heights, the promo card column breakdown and the 304.4-vs-304px measurement

**Those figures were measured and are accurate as recorded. They are no longer reproducible.** Anyone
re-verifying them must rebuild the measurement first. Treat the numbers as a point-in-time record, not
as a check that can be re-run at sign-off.

### What is now unguarded

Nothing automatically compares the built header to Figma. In particular there is no longer a check on:

- the six panel heights, the one gap that produced D-84
- `press-card` height 338 vs Figma 336 — the last surviving `nav:audit` delta, still unfixed
- any regression in geometry, colour, copy or imagery from future edits

The 17 Figma frames remain at `.buildspace/artifacts/navigation/screenshots/` if a comparison is ever
rebuilt.
