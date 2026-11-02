# Status Log — Amrutanjan Search Modal Sprint

**Created:** 2026-08-18
**Roadmap:** `README.md`
**TDD:** `docs/tdds/amrutanjan-search-sprint.md` (v1.0) — **frozen, never edited**
**Amendments:** `deviations.md` — authoritative wherever it disagrees with the TDD
**Gate:** `DEFINITION-OF-DONE.md`
**Design extraction:** `.buildspace/artifacts/search/` — 6 frames, complete

Living document. Update it as each PRD moves, not in a batch at the end — the value here is the record of
what actually happened, which nobody can reconstruct afterwards.

---

## Progress

> **2026-08-18 — 1.1 complete.** Recounted from the tracker: **7 Not Started, 0 In Progress, 0 Blocked,
> 0 Done, 1 Done with deviations.**
>
> `/clarify` → `/plan` → `/execute` → `/assess` all ran. `/assess` returned **PASS**: 0 Critical,
> 3 Should Fix (2 applied, 1 escalated and then applied on devx's call), 7 observations. `/compare` was
> skipped deliberately — this PRD changes no markup structure, class or CSS, so there is nothing to
> compare against Figma.
>
> **10 files changed: 6 modified, 3 deleted, +89/−290.** Theme check **156 files / 0 offenses** — the new
> baseline for 1.2. It was 158 before; deleting two `.liquid` files drops the count, and two ACs that
> asserted 158 were wrong when written.
>
> **Four setting IDs did not ship as the TDD proposed.** `popular_products_collection` is 27 characters
> against `section-standards`' under-25 cap, so it shipped as `popular_collection` (P-1). `/assess` then
> found `recent_heading`, `concern_heading` and `concern_menu` carried no feature context, which the same
> standard forbids — devx chose to prefix them to `search_recent_heading`, `search_concern_heading` and
> `search_concern_menu` while nothing consumed them and no stored value existed. Both renames are
> corrected across all six doc locations; **the TDD is byte-identical and was never edited.**
>
> **The handover note was wrong and is now fixed.** D-6 said the rename orphaned the stored Popular
> Products collection. `config/settings_data.json` holds **24 keys in `current`, not one of them a search
> setting, and no presets** — so nothing was orphaned, because nothing was ever set. The merchant
> **assigns** the collection for the first time. Corrected in `deviations.md`, `DEFINITION-OF-DONE.md`,
> the 1.1 PRD and `phase-1-foundation/overview.md`.
>
> **`assets/tailwind.css` did change, against the plan's prediction.** No class string was edited, but
> deleting three files removed class *usages* and Tailwind's output follows usage — 270 bytes of
> now-dead rules. A live `npm run dev` watcher had not detected the deletions, so the committed CSS was
> stale rather than self-correcting. Rebuilt with `npm run build`; verified byte-identical to a fresh
> out-of-tree build.
>
> **☑ Schema upload verified 2026-08-18** — devx confirms the `"Search"` group renders in the theme
> editor. Shopify accepting the schema clears the three platform rules theme check cannot catch: the
> `<p>`-wrapped `richtext` default on `no_results_text`, and the absent `default` keys on the `url`
> and `link_list` settings. R-2 closed.
>
> **☑ R-1 closed 2026-08-18 — the rename did not empty the loop.** Devx assigned a collection and
> confirmed in the theme editor that Popular Products renders real products, and that
> `popular_products_count` changes the rendered count. This was the sprint's highest-risk item: a
> rename that empties a `for` loop throws nothing and passes theme check
> (`roadmap-homepage/status-log.md:800` records that shipping a broken store). Verified as **rendered
> output**, not by grep. The working count also confirms dropping `| default: 6` did not silently clamp.
>
> **Devx observed the group still uses the inline mini-card, not `product-card`. That is correct and
> expected** — clarify Scope Decision 1 repointed that markup rather than deleting it, so the group
> keeps rendering through 1.2, 2.1, 2.2 and 3.1. Replacing it with `snippets/product-card.liquid` is
> **3.2's** deliverable, and plan File Spec 2 listed it as an explicit non-goal here.
>
> **All 1.1 gates are closed. Nothing carried forward except the two items in the rows below**
> (the 3.1 `MAX_RECENT` trap, and the two out-of-scope 25-char IDs in `Product card`). Theme check and JSON parsing both pass, but neither proves Shopify accepts the schema —
> `roadmap-homepage/status-log.md:812` records theme check passing 131/0 on a schema the platform then
> rejected.

> **2026-08-18 — roadmap generated.** 8 PRDs across 4 phases. Nothing executed yet: 8 Not Started,
> 0 In Progress, 0 Blocked, 0 Done, 0 Done with deviations.
>
> Brainstorming produced **22 deviations from the TDD before a line of code was written** — full record in
> `deviations.md`. Three are structural: the modal is a snippet and cannot carry section-scoped settings or
> `concern_chip` blocks (D-1, D-2); the typed results were never `product-card` and have no Add to Cart, so
> §1's "reuse product-card unchanged" describes new work (D-4); and the shipped code did not use predictive
> search at all, while a complete, unreferenced `sections/predictive-search.liquid` sat in the theme (D-5).
>
> Two flags closed without any change. F3's proposed 2-character minimum and 300 ms debounce are already
> implemented in `assets/predictive-search.js`. F1's two greys are both already in use — `#999` on the
> compare-at price, `rgba(33,33,33,0.1)` on the mobile underline. D1, the dependency the TDD called "the one
> that unblocks everything else", was closed by reading the ten existing search files.
>
> **Reduced from 12 PRDs to 8** on review. The 12-PRD version split the desktop and mobile shells into
> separate PRDs, which was wrong — they are one responsive markup pass in one file. It also split the two
> chip groups from each other and the three secondary result groups from the empty states, all of which run
> sequentially in the same file anyway. What stayed separate: the API switch (it carries the D-24 gate), the
> focus and keyboard work (it is JS, and folding a focus trap into a styling PRD is how focus traps get
> skipped), and the product results grid (it is where D-24 materialises).
>
> **One hard gate stands.** D-24 — whether predictive-search product objects expose `metafields.custom.*` —
> is answered by a smoke test at the front of 1.2 and gates 4.1.

---

> **2026-08-19 — 1.2 complete. The sprint's one hard gate is closed.** Recounted from the tracker:
> **6 Not Started, 0 In Progress, 0 Blocked, 0 Done, 2 Done with deviations.**
>
> **D-24 resolved POSITIVE** — full verdict above. Predictive-search product objects expose every accessor
> `product-card` transitively needs, so **4.1 requires no fallback**: no tag-syncing, no reduced card. The
> decisive evidence was a real custom focal point `49.9537% 42.179%` on `radiator_image`, which a stubbed
> object could not produce.
>
> **The probe was widened beyond what the PRD specified, and it mattered.** The PRD asked for "one
> metafield". Devx asked for *all* the data `product-card` uses, which surfaced that `product-card:266`
> hands `card_product` to `add-to-cart-button`, which reads `id`, `variants` and
> `selected_or_first_available_variant` — **three accessors `product-card` itself never touches.** All three
> resolve. Had they not, Add to Cart would have rendered correctly and failed silently on click in both 3.2
> and 4.1, a failure class neither PRD's acceptance criteria would have caught.
>
> **`/assess` PASS** — 0 Critical, 1 Should Fix (applied), 6 observations. Theme check **155 files / 0
> offenses**, the new baseline: 156 − 1 deleted `.liquid`. `tailwind.css` unchanged, confirming the plan's
> measured prediction that a deletion would not shrink it this time — the opposite of 1.1's D-E1.
>
> **Three PRD discrepancies found before coding.** Its "remove the hardcoded caps of 10" named the wrong
> file (the caps were in the deleted `search-modal-results.liquid`); `has_results` had to be extended to
> collections or a collection-only query renders "no results" while discarding what matched; and
> `options[prefix]=last` had to be dropped rather than carried over, being a `/search` parameter that risks
> a 422 on `/search/suggest`.
>
> **Two rationales proven rather than asserted.** The B1 trap was tested against the exact silent failure it
> would cause (`resources[type]=collection` → Collections group, not "no results"). And D-7's `each` vs
> `all` was measured: at `limit=2`, `each` returns 4 items across 3 groups, `all` returns 2 across 2.
>
> **Carried forward:** three runtime behaviours curl cannot observe — debounce firing one request per
> window, superseded requests showing as cancelled, and a sub-2-character query firing nothing. All three
> are untouched code paths (the JS diff is 3 lines, verified), and **2.2 owns the focus/keyboard work in the
> same file** and will exercise them.

---

> **2026-08-19 — 2.1 complete. The modal shell now renders at design fidelity on both breakpoints.**
> Recounted from the tracker: **5 Not Started, 0 In Progress, 0 Blocked, 0 Done, 3 Done with deviations.**
>
> **Pipeline:** `/clarify` → `/plan` → `/execute` → `/compare` ×2 → `/assess` ×2. `/compare` iteration 2
> **PASS**; `/assess` round 2 **0 Critical** with every `clarify.md` requirement Met. Theme check **155 / 0**.
> 4 files changed, +263/−102. No CSS file was created and `sections/header.liquid` is byte-identical.
>
> 🔴 **The biggest risk was a notation trap, and it was caught before a line was written.**
> `design-context.md` records Figma padding in a Tailwind-*looking* shorthand, and this project overrides
> `spacing.18` to **72px**. A literal `px-18` on the mobile search bar would have been **4× too wide**;
> `px-40` would have been 160px, `h-48` 192px. A conversion table went into `plan.md` and the rendered
> output was checked against it — bar padding measures 40px, panel padding 18px.
>
> **Two design values were measured off the exports that exist in neither the PRD nor `design-context.md`.**
> The close control has a `bg-white/20` fill — a crisp luminance step from a flat 204.0 to a flat 214.0 at
> exactly frame x1330, giving α = (214−204)/(255−204) ≈ 20%. Built as written it would have been an
> invisible hit area over a blurred photo. And the mobile vertical inset measures **20px in both states**,
> not the PRD's `py-18`/`p-5` split — two independent hard-edge anchors agree, and the PRD's 18 has no
> extraction source at all.
>
> **`/compare` found one real defect: a search icon the design does not have.** Verified independently —
> in all four frames the placeholder starts *at* the padding edge (desktop x160.5 vs a 160 edge, mobile
> x18.5 vs 18). Removing it moved the inset 70px → 40px desktop and 48px → 18px mobile.
>
> **`/assess` round 1 found a defect at a viewport the build could not reach.** The close control was
> clipped between **1280 and 1307px** — 14px cut at 1280, a 30px hit area against DoD §7's 44px. Caused by
> deriving the 54px offset from the 1440 frame without checking it against `xl`, where the width rule
> changes. 1280 was one of the required measurement widths, and the browser window could not be resized
> below `screen.width`. **The one unmeasured acceptance width was the one that failed.**
>
> **Round 2 found a defect created by round 1's own fix.** Cancelling the close timer also skipped every
> state reset, because the reset lived inside the timer callback — so a reopen within 250ms re-showed the
> stale query. It also caught `input.focus()` inside a double `requestAnimationFrame`, which severs the
> iOS gesture chain and would have raised **no soft keyboard** on the mobile takeover.
>
> ⚠️ **No round-3 `/assess` was run.** FP-8, FP-9 and FP-10 were fixed after round 2 and verified directly
> in the browser — fast/slow reopen produce identical clean state, and `activeElement` is the input with no
> `await`. If a third pass is wanted, this row can move.
>
> **Carried forward:** the `shopify:section:load` re-init is **unowned** and spans three JS files; focus
> trap, focus return and `aria-modal` are 2.2 by design, so **DoD §7 is knowingly unmet** until then.

---

> **2026-08-19 — 2.2 complete. Phase 2 is finished; the modal shell and its interaction contract both ship.**
> Recounted from the tracker: **4 Not Started, 0 In Progress, 0 Blocked, 0 Done, 4 Done with deviations.**
>
> **Three `/assess` rounds, each finding something real.** Round 1: 2 Critical. Round 2: 1 Critical.
> Round 3: 1 Critical — and that one was **latent**, invisible to every browser check. Theme check
> **155 / 0** throughout; 4 files, +230/−38.
>
> 🔴 **The round-3 Critical is the finding of this sprint.** 2.2 added Tailwind's *unnamed* `group` to the
> modal root, but the same snippet already carries a `group` / `group-hover:scale-105` pair on the
> popular-product card, and the compiled rule binds to **any** `.group` ancestor. The modal root spans the
> viewport, so every product image would have sat permanently at 105%. It did not reproduce because
> `settings.popular_collection` is **unset** — so it would have surfaced the moment a merchant assigns that
> collection, **which is 1.1's outstanding handover item**. Fixed with a named `group/search`.
>
> **An acceptance criterion turned out never to have been implemented.** "Clearing the input restores the
> default groups with Recent Search re-rendered" — `showDefaultContent()` was only ever called from
> `openModal`, so the list went stale for the whole session. The clarify recorded that
> `showDefaultContent()` calls `renderRecentSearches()`, which is true, but never checked **when**. Now
> called on every return to the default state.
>
> **A focus trap shipped over invisible focus.** `assets/base.css` had exactly one focus rule
> (`.button:focus-visible`), no modal control carried `.button`, and 2.1's markup had stripped the input's
> outline. Cycling keyboard users through controls they cannot see is worse than no trap. Rings added to
> Clear and both close controls; **the input deliberately has none** on devx's call — the caret is the cue
> and the design draws no ring there.
>
> ⚠️ **The same defect shape appeared four times in this sprint** — 2.1's FP-8, 2.2's D-E1, round 2's
> Critical, and round 3's early-return snap. Every one was *a short-circuit path skipping logic parked on
> the main path*. The `patterns-learned.md` entry existed and was not enough: the fourth instance landed in
> a PRD whose own risk register named the coupling.
>
> **Verification was split, and the split is worth recording.** Class lists, attributes, DOM structure,
> focus order, timer lifecycle and end states were all machine-verified here. **Animated values were not** —
> the automated tab is `document.hidden`, so `requestAnimationFrame` is paused and CSS transitions never
> advance. Proof: the modal root still carried `opacity-0` 800ms after `open()`. Devx ran the six
> animation, §4.4 and reduced-motion checks in a foregrounded browser and confirmed them.
>
> **Also added on devx's request:** clicking anywhere in the search bar focuses the input, with the Clear
> and close buttons excluded.

---

> **2026-08-19 — 3.1 complete. The first content groups render into the shell.** Recounted from the
> tracker: **3 Not Started, 0 In Progress, 0 Blocked, 0 Done, 5 Done with deviations.**
>
> `/compare` **PASS** at iteration 2; `/assess` **0 Critical**, 3 Should Fix all applied. Theme check
> **159 files / 0 offenses** — up from 155 for four new snippets. 4 files created, 5 modified.
>
> **Two chip types collapsed into one primitive.** Once the height is declared and the label centred, the
> only differences are the desktop radius and the flex/basis pair — so `snippets/search-chip.liquid` serves
> both, with literal classes inside an `{% if %}` because a Liquid-interpolated class emits no CSS at all.
>
> 🔴 **The PRD's own Approach would have failed its own acceptance criterion.** It said to replace the
> `MAX_RECENT` constant — but that constant is used *only when saving*, while the renderer sends every
> stored entry. "Setting the limit to 3 renders at most 3 chips" would have rendered 5 for every returning
> user. The limit now applies on **save and render**: verified at 3 rendered from 5 stored, with all 5 still
> in `localStorage`.
>
> **Two of the PRD's stated references did not exist.** Its hover/focus guidance pointed at "the mega-menu
> rail — a border-colour shift plus the theme focus ring": the rail has **no hover state** (it styles
> `aria-selected`), and the only `focus-visible` convention in the theme was the one 2.2 added the day
> before. The real house idiom is `[@media(hover:hover)]:hover:` from `mega-menu-group.liquid`.
>
> **Three trap classes were caught before writing code, and two more after.** Before: the Figma-padding
> notation trap, the `base.css:38` inherited `letter-spacing` that would have put every label 0.16px off,
> and Liquid-interpolated Tailwind classes. After: `border-border` is `#E5E7EB`, **not** the design's
> `#d4d4d4` — a third search-specific grey; and `search-recent-searches.js` only ever *removes* `hidden`,
> never adds `flex`, so both containers needed `flex` present or their `flex-col` and `gap` were inert.
>
> ⚠️ **Four acceptance criteria are still unverified, and this is the reason to read this row carefully.**
> `search_concern_menu` is unset, so the concern group has **never rendered through Liquid**. Both
> `/compare` and `/assess` fell back to a CSS-level probe built from the shipped class string — which is
> precisely how compare iteration 2 produced a **false MISMATCH**, because its probe held a stale hardcoded
> copy of that string. Assigning a menu closes all four and is a prerequisite for 3.2.

---

> **2026-08-19 — 3.2 complete. Phase 3 is finished; the default state renders all three groups.** Recounted
> from the tracker: **2 Not Started, 0 In Progress, 0 Blocked, 0 Done, 6 Done with deviations.**
>
> `/compare` **PASS** (desktop MINOR, mobile MINOR, no code defect); `/assess` **PASS**, 0 Critical, 1 Should
> Fix applied. Theme check **160 files / 0 offenses**. 1 file created, 3 modified. `product-card.liquid`
> untouched, so its seven other call sites are unaffected.
>
> 🔴 **The PRD omitted the one parameter the whole design depends on.** It never mentions
> `show_featured_image`, whose default `true` takes the non-radiator branch — no rings, wrong image
> treatment, and **not one of its acceptance criteria would have caught it.** Found at clarify by reading
> `product-card.liquid`'s branch conditions rather than its parameter list.
>
> **Grid, not flex — because the PRD's own criteria were mutually exclusive.** "Count 3 redistributes to fill
> 1120" and "count 1 does not stretch" cannot both hold: whatever inflates 3 cards to 373px inflates 1 card
> to 1120px. `grid-cols-2 … lg:grid-cols-4` holds every card at its design width, wraps above four for free,
> and was measured constant at **1, 2, 3, 4 and 12 cards**. The user chose it; the PRD's wording is superseded.
>
> **One class fixed the card geometry.** `product-card__media` is `aspect-[315/226]`, which yields 190px on a
> 265px card against the design's 226px. A single unprefixed `[&_.product-card\_\_media]:aspect-[265/226]`
> on `card_class` corrects both breakpoints — no `lg:` pair needed, because the snippet's aspect has no `lg:`
> variant to collide with. Aspect beat a pinned height on evidence: the panel is `lg:w-[83.333%]` below `xl`,
> so at 1024 the cards derive 178px and a pinned 226px would have been **50% too tall**.
> ⚠️ **REVERSED 2026-08-19 — see the closing entry.** The override was removed at the user's instruction;
> search cards now use `product-card`'s native `315 / 226`. The reasoning above stands as the reasoning of
> the day, but the class it describes no longer exists.
>
> 🔴 **My rings verification was presence-only, and `/compare` caught what it missed.** My probe asserted
> `!!querySelector('.product-card__radiator')` — that the wrapper *element* exists — and reported "Rings
> render on all three cards." `/compare` looked at the pixels and found a photograph. Widening the metafield
> query from 4 products to 49 confirmed it: **43 of 49 point `radiator_image` at `radiator-card-image.png`
> (1536×813)**; only 6 hold the real `radiator-ring-1…4.png` (270×138, matching both the design and
> `product-card`'s own render hint). **The first 4 I sampled were 4 of those 6**, which nearly produced a
> confident rebuttal of a correct finding. Third occurrence of the `assert-the-property-not-presence` trap.
>
> **Two environmental limits, one new.** `resize_window` now reports success while changing nothing —
> `innerWidth` stays 1470 and `outerWidth` reads **0** — and an iframe at 390px loads cross-origin, so its
> document is unreadable. Mobile geometry was therefore handed to `/compare`, which measured it exactly and
> **closed R-2**: the plan's derived ~145px was right (143.27 actual) and the ~148px screenshot estimate was
> the loose one. Add to Cart opening the cart drawer remains user-verifiable only — `cartDrawer.open()` is
> rAF-gated and the automated tab is `document.hidden`.
>
> ⚠️ **Open, and not a code item: the `radiator_image` data.** 43 products need the metafield repointed, and
> which of the four ring variants each should get is a merchandising call. The image is served at 270×138, so
> a 1536×813 source is squashed nearly 2:1 **everywhere `product-card` draws a radiator**, not only in search.

---

> **2026-08-19 — 4.1 complete. Typed results render the shared card; one spec left in the sprint.** Recounted
> from the tracker: **1 Not Started, 0 In Progress, 0 Blocked, 0 Done, 7 Done with deviations.**
>
> `/compare` **PASS** — desktop **MATCH**, mobile **MATCH**. `/assess` **PASS** with **0 Critical and 0 Should
> Fix**, the only spec this sprint that needed no fixes applied. Theme check **160 files / 0 offenses**.
> One file modified, 43 lines → 17. `product-card.liquid` **byte-identical to HEAD**.
>
> **The gate that opened the sprint is spent.** D-24 was resolved POSITIVE on 2026-08-18, so this PRD's
> "stop and raise it" fallback branch — tag-syncing metafields or a reduced card — never triggered. The
> tracker note that still read `Gated on D-24` was corrected the same day this shipped.
>
> 🔴 **The PRD's stated approach would have broken at the shipped default.** It specified `flex` + `flex-1`
> while also saying to "lift that structure rather than inventing a second one" from 3.2 — and 3.2 shipped
> **grid**. The two instructions contradict, and following the literal one matters: `search_results_count`
> defaults to **10**, where `flex-1` gives ten ~92px cards. `/compare` swept 1/2/3/4/10 cells and card width
> held at exactly 265px desktop and 170px mobile at every count.
>
> 🔴 **R-2 resolved as a false alarm — and the way it was flagged is why.** `clarify.md` recorded a possible
> ~25px card-height gap (design 457/459 vs 3.2's measured 432.1) as **cause unestablished**, naming content
> line counts as one of two candidates. Cards here measure **459.28px against the design's 457** — within
> 2px. The 432.1 was content-dependent, not systemic. **No `card_class` height override was needed**;
> asserting the gap was real would have produced a wrong fix inside a snippet shared with seven call sites.
> ⚠️ **The 459.28 figure is superseded** — measured *with* the media override, which was removed later the
> same day. Result cards now measure **423.4px**. The finding itself holds: the gap was never systemic.
>
> **The one real risk was the Add to Cart wiring, and it is confirmed, not reasoned.** Results are injected
> as HTML, so `<product-form>` had to upgrade on insertion. Driving the real pipeline — set the value,
> dispatch `input`, let the debounce and `/search/suggest` run — gave **4/4 forms upgraded with submit
> handlers attached**. Only the drawer-open itself is unverifiable here (`cartDrawer.open()` is rAF-gated).
>
> **Every card field asserted by value, not by element presence** — the criterion demanded it, and this is
> the sprint's recurring trap. Badges `New`/`Bestseller`×3; eyebrows `PAIN RELIEF`×3/`CONGESTION`; four
> distinct titles and highlights; prices with real compare-at and discount (`₹129 ₹159 (19%)`), one product
> genuinely having none. Only the rating is uniform — see below.
>
> ⚠️ **A new accessibility item, caused by this diff and owned by nobody.** `#predictive-search-results`
> carries `aria-live="polite"` with no `aria-atomic` and no summary pattern. Before this PRD each result
> announced as a title and a price; now each announces badge, eyebrow, title, highlight, rating, price,
> compare-at, discount, wishlist and "Add to cart" — up to **ten** products, re-spoken on every debounced
> keystroke. Verified against `HEAD`. The live region is 2.x's, so this is not a defect *in* 4.1, but 4.1
> multiplied the payload, and it passed both agents' checklists because the criterion technically holds and
> the diff never touches the live region. **Logged, not fixed** — the remedy changes announcement behaviour
> in 2.1's markup, which is a decision, not a repair.

---

> **2026-08-19 — two post-pipeline design reversals, at the user's instruction.** Tracker counts unchanged:
> **1 Not Started, 0 In Progress, 0 Blocked, 0 Done, 7 Done with deviations.** Neither change went through
> `/clarify` → `/plan` → `/compare` → `/assess`; both were direct instructions after 4.1 shipped. Theme check
> **160 files / 0 offenses**, `assets/tailwind.css` byte-identical to a fresh build, `product-card.liquid`
> still unmodified.
>
> **1. The search-only card sizing is gone.** *"The product card size should be the normal ones only. Don't
> style it separately for Search."* The `[&_.product-card\_\_media]:aspect-[265/226]` override was removed
> from **both** call sites — `snippets/search-modal.liquid` (3.2) and `sections/predictive-search.liquid`
> (4.1) — and the now-unused rule dropped out of the compiled CSS.
>
> | | With override | Native |
> |---|---|---|
> | Media aspect | `265 / 226` | **`315 / 226`** |
> | Media height @ 265px card | 225.14 | **189.41** |
> | Card height — default state | 432.1 | **396.4** |
> | Card height — typed state | 459.28 | **423.4** |
>
> Confirmed consistent with the rest of the theme: the 8 visible non-mega-menu cards on the homepage compute
> `315 / 226` at 315px wide with 225.28px media — the same ratio search now uses. The only remaining media
> override in the theme is `mega-menu-products`' deliberate `170 / 156` for its compact cells.
>
> ⚠️ **Cost, stated plainly:** the Figma frames measure the media box at 226px on a 265px card, so search
> cards are now **~36px shorter than the design** in both states. The `/compare` PASSes for 3.2 and 4.1 were
> earned *with* that override and **no longer describe the shipped code** — re-running either would report the
> media height as a mismatch. Accepted trade: one card that behaves identically everywhere beats pixel parity
> on one surface.
>
> **2. The modal covers the header on mobile.** *"In mobile it is coming below the header, it should come over
> the header."* The root went from `inset-x-0 bottom-0 top-[var(--search-header-offset)] … lg:top-0` to plain
> **`inset-0`**.
>
> **The z-order was already right** — modal `z-[60]` over the header's `sticky z-50`. The fault was purely
> positional: the root was offset by the header's measured height. Verified at 1470px: modal `top: 0`,
> `position: fixed`, fully covering a 110px header, and a hit test at the centre of the header's search
> trigger returns an element **inside** the modal. The `lg:hidden` close button remains the way out, which
> matters now that the header's own controls sit underneath.
>
> **The dead code behind it was removed too.** `--search-header-offset` had exactly one consumer, so once the
> class went, `search-modal.js`'s `setHeaderOffset()` writer, its `requestAnimationFrame` throttle, the
> `window` resize listener and the `headerEl` query that existed only to feed them were all landmines — 20
> lines, self-contained, deleted. That also drops a resize listener from every page load, and **retires 2.1's
> documented `js-standards` exception** for `style.setProperty`: the theme no longer styles via JS anywhere in
> the search feature.
>
> ⚠️ **This also departs from the design ref.** `design-context.md` records the mobile search bar starting at
> **y 117**, below the nav bar and mobile menu — the header is visible in the Figma frame, and that is what
> 2.1 built. A mobile `/compare` on 2.1, 3.1, 3.2 or 4.1 will now report a ~117px vertical offset for this
> reason, not a regression.
>
> 🔴 **Still unverified at a mobile viewport.** `resize_window` has been inert all session — it reports success
> while `innerWidth` stays 1470 and `outerWidth` reads 0 — and a 390px iframe is cross-origin. Both changes
> were verified at 1470px only. The positioning is width-independent (`inset-0`, no breakpoint variants) and
> the aspect is a single unprefixed class, so neither has a plausible mobile-only failure mode — but **neither
> has been seen on a phone.** Along with Add to Cart opening the cart drawer, this needs a human before it
> reaches anyone.

---

## How to use this log

Update the PRD Tracker as each PRD moves. Statuses: `Not Started` / `In Progress` / `Blocked` / `Done` /
`Done with deviations`. Anything that differs from the PRD as written goes in the Deviations log below with
a reason — never silently.

The Status column in `README.md` is a snapshot; **this file is authoritative**.

---

## PRD Tracker

### Phase 1 — Foundation

| # | PRD | Depends on | Status | Date | Notes |
|---|-----|-----------|--------|------|-------|
| 1 | 1.1 search-settings-and-retirement | — | Done with deviations | 2026-08-18 | `/assess` **PASS** (0 Critical). Schema upload, Popular Products render and the count cap all verified in the theme editor by devx. 13 deviation rows below |
| 2 | 1.2 predictive-search-api-switch | 1.1 | Done with deviations | 2026-08-19 | **D-24 CLOSED POSITIVE** — all 14 accessors resolve. `/assess` PASS. 3 runtime checks carried to 2.2 |

### Phase 2 — Modal Shell

| # | PRD | Depends on | Status | Date | Notes |
|---|-----|-----------|--------|------|-------|
| 3 | 2.1 modal-shell-responsive | 1.1 | Done with deviations | 2026-08-19 | `/compare` **PASS** (iter 2), `/assess` round 2 **0 Critical**. 3 post-round-2 fixes self-verified, no round 3 |
| 4 | 2.2 focus-keyboard-transitions | 2.1 | Done with deviations | 2026-08-19 | `/assess` ×3 — the third found a **latent Critical** live testing could not reach. Browser pass confirmed by devx |

### Phase 3 — Default State

| # | PRD | Depends on | Status | Date | Notes |
|---|-----|-----------|--------|------|-------|
| 5 | 3.1 chip-groups | 1.1, 2.1 | Done with deviations | 2026-08-19 | `/compare` **PASS** (iter 2), `/assess` **0 Critical**. ⚠️ **4 criteria unverified — `search_concern_menu` is unset**, so the concern group's Liquid loop has never run |
| 6 | 3.2 popular-products-group | 3.1 | Done with deviations | 2026-08-19 | `/compare` **PASS**, `/assess` **PASS**, 0 Critical. ⚠️ **The rings criterion is unmet in rendered output — store data, not code:** 43 of 49 products point `custom.radiator_image` at a 1536×813 photo |

### Phase 4 — Typed State

| # | PRD | Depends on | Status | Date | Notes |
|---|-----|-----------|--------|------|-------|
| 7 | 4.1 product-results-grid | 1.2, 2.1 | Done with deviations | 2026-08-19 | D-24 gate **CLEARED** (14/14 accessors, verdict below) — no fallback needed. `/compare` **PASS** (desktop MATCH, mobile MATCH), `/assess` **PASS** — **0 Critical, 0 Should Fix**, the first spec this sprint needing no fixes. ⚠️ Rating knowingly hardcoded; ⚠️ `aria-live` verbosity newly unowned |
| 8 | 4.2 secondary-groups-and-empty-states | 4.1 | Not Started | — | — |

---

## D-24 Verdict — RESOLVED POSITIVE (2026-08-18)

**The gate the TDD called "the one that unblocks everything else" is closed. 4.1 is unblocked.**

Predictive-search product objects expose **every** accessor `snippets/product-card.liquid` depends on,
transitively including the three that `snippets/add-to-cart-button.liquid` needs. Verified by rendering a
temporary probe in `sections/predictive-search.liquid` and requesting the endpoint directly; the probe was
deleted immediately after.

**Method.** `shopify theme dev` on `127.0.0.1:9292` — the live storefront redirects to `/password`, so it
cannot be curled. Two queries, `HTTP 200` both, **4 products each**:

```
GET http://127.0.0.1:9292/search/suggest
  ?q=electro   (and q=pain)
  &resources[type]=product
  &resources[limit]=4
  &resources[limit_scope]=each
  &section_id=predictive-search
```

**Result: 14 of 14 accessors resolved with real values on all 8 products.**

| Group | Accessor | Verdict | Sample |
|---|---|---|---|
| scalar | `title` | ✅ | `Electro+ Hydration Tablets` |
| scalar | `url` | ✅ | `/products/electro-hydration-tablets?_pos=1&_psq=electro&…` |
| scalar | `price` | ✅ | `18900` |
| scalar | `compare_at_price` | ✅ | `12500` / `6900` / `15900`; blank on 5 of 8 — those products genuinely have none |
| scalar | `featured_image.src` | ✅ | `files/electro-ors-combo.png` |
| metafield `single_line_text_field` | `product_badge.value` | ✅ | `New`, `Bestseller` |
| metafield `single_line_text_field` | `category_label.value` | ✅ | `REHYDRATION`, `PAIN RELIEF` |
| metafield `single_line_text_field` | `highlight_text.value` | ✅ | `Drop, dissolve, rehydrate` |
| metafield `color` | `highlight_color.value` | ✅ | `#00949E`, `#E6790F` |
| metafield `file_reference` | `card_image.value.src` | ✅ | `files/joint-muscle-combo.png` |
| metafield `file_reference` | `card_image.value.alt` | ✅ | `Post-Gym Recovery Pack` |
| metafield `file_reference` | `card_image.value.presentation.focal_point` | ✅ | `50.0% 50.0%` |
| metafield `file_reference` | `radiator_image.value.presentation.focal_point` | ✅ | **`49.9537% 42.179%`** |
| ATC | `id` | ✅ | `7721384771671` |
| ATC | `variants.size` / `variants.first.id` | ✅ | `1` / `44098319974487` |
| ATC | `selected_or_first_available_variant.id` / `.available` | ✅ | `44098319974487` / `true` |

**The decisive evidence is the focal point `49.9537% 42.179%`** — a real custom value, not the `50.0% 50.0%`
default. A reduced or stubbed product object could not produce it. The `file_reference` metafields resolve
to full `MediaImage` objects, three levels deep, which is exactly what `product-card.liquid:74` and its
three `image` renders consume.

**Consequences for 4.1:** the D-24 fallback plans — tag-syncing metafield values, or shipping a reduced
card — are **not needed**. `product-card` can render at full fidelity in the typed results. The `/plan`
concern that Add to Cart would silently ship without a variant id is also closed: `variants` and
`selected_or_first_available_variant` both resolve.

⚠️ **Unchanged platform limit, not affected by this verdict.** Predictive search does not *index*
metafields — rendering them works, but a query matching a `highlight_text` value will never hit. Products
are searchable on `body`, `product_type`, `tag`, `title`, `variants.barcode`, `variants.sku`,
`variants.title`, `vendor`; collections on `title` only. Still owed to Amrutanjan as a communication item.

---

## Deviations & Decisions Log

Rows are keyed by PRD number so the docs board can assemble each spec's tab from every table that names
it. The 22 pre-execution deviations live in `deviations.md`; this table records what is found **during**
execution. Add rows as they happen.

| PRD | Deviation or decision | Why |
|-----|----------------------|-----|
| 3.2 · 4.1 | 🔴 **REVERSAL — the search-only card sizing was removed** | *"The product card size should be the normal ones only. Don't style it separately for Search."* The `[&_.product-card\_\_media]:aspect-[265/226]` override deleted from **both** call sites; media returns to the snippet's native `315 / 226` — **189.41px** on a 265px card, not 225.14. Confirmed matching the 8 visible homepage cards. ⚠️ Cards are now **~36px shorter than Figma**, and 3.2's and 4.1's `/compare` PASSes no longer describe the shipped code. **Did not go through the pipeline** |
| 2.1 | 🔴 **REVERSAL — the modal now covers the header on mobile** | *"In mobile it is coming below the header, it should come over the header."* Root went from `top-[var(--search-header-offset)] … lg:top-0` to plain `inset-0`. The z-order was **already** right (`z-[60]` over the header's `sticky z-50`) — the fault was positional. ⚠️ Departs from the design ref, which puts the mobile search bar at **y 117** with the header visible. **Did not go through the pipeline** |
| 2.1 | **2.1's `js-standards` exception is retired** | With the class gone, `--search-header-offset` had no consumer, so `setHeaderOffset()`, its `requestAnimationFrame` throttle, the `window` resize listener and the `headerEl` query feeding them were all dead — 20 self-contained lines, deleted. Drops a resize listener from every page load, and the search feature no longer styles via JS anywhere |
| — | 🔴 **Both reversals are unverified at a mobile viewport** | `resize_window` has been inert all session (reports success, `innerWidth` stays 1470, `outerWidth` reads 0) and a 390px iframe is cross-origin. Verified at **1470px only**. Neither has a plausible mobile-only failure mode — `inset-0` carries no breakpoint variant and the aspect is one unprefixed class — but **neither has been seen on a phone.** Needs a human, alongside Add to Cart opening the cart drawer |
| 4.1 | 🔴 **Grid, not the PRD's `flex` + `flex-1`** | The PRD names `flex` while also saying to lift 3.2's structure — which is `grid`. `search_results_count` defaults to **10**, where `flex-1` yields ten ~92px cards. `/compare` held card width at 265/170 across 1/2/3/4/10 cells |
| 4.1 | **`sr-only` heading instead of the visible one** | The typed frame has no visible group label, but removing it outright would leave the grid unlabelled inside a live `role="dialog"` — and 4.2 adds three more groups below it. **User decision.** Follows `newsletter-form.liquid:91`, the theme's existing `sr-only` precedent. Verified rendering as an `h3` at 1×1px |
| 4.1 | **`search_results_count` default left at 10 against a design showing 4** | **User decision:** the panel scrolls, and the merchant controls the value. Consequence: the shipped default renders 3 desktop rows, so any parity capture must lower it first — a capture precondition, not a code item |
| 4.1 | ⚠️ **REVERSED 2026-08-19** — **Card geometry and `card_class` lifted verbatim from 3.2** | `design-context.md:247` records the results row as "1120 wide, 4 cards × 265px, gap 20px — **same as section 1**". Measured geometry reused, not re-derived. The single unprefixed `[&_.product-card\_\_media]:aspect-[265/226]` is correct at both widths because the design's two frames share one ratio (265/226 = 1.1726, 170/145 = 1.1724) |
| 4.1 | 🔴 **UNMET by decision — the star rating** | `product-card.liquid:93-95` hardcodes `4.7` / `132` with `card_rating_is_placeholder = true`, reading neither `custom.rating_value` nor `custom.review_count`, both of which hold real varied data (4.6/98, 4.5/76, 4.8/210). **User decision: leave it** — the Figma frame shows the same placeholder, so matching the design and reading the metafields are mutually exclusive. Still needs its own PRD |
| 4.1 | **`verify-integration.mjs` `section-registered` FAIL not fixed** | `sections/predictive-search.liquid` is reachable only via the Section Rendering API (`section_id=predictive-search`, built at `predictive-search.js:30`), is unreferenced at HEAD too, and says so in its own first line. **Adding a template reference to satisfy the checker would render an empty section onto a live page** — the fix would be the bug |
| 4.1 | **`mb-2.5` (10px) is currently inert** | Chosen from `design-context.md:250`'s card-row → CTA gap. It **collapses** against the View All anchor's `mt-3` to **12px** — adjacent block siblings, nothing between them. 4.2 owns that control and must set the gap rather than assume 10px is in place |
| 4.1 | **Casing and wishlist divergences carried forward, not fixed** | The ATC reads "Add to cart" against the design's "Add to Cart", and the heart renders where the typed frame omits it. Both live in `product-card.liquid`, which ships untouched to keep the seven other call sites byte-identical. The heart is 3.2's accepted *"figma negligence"* decision |
| — | ⚠️ **NEW and unowned: the `aria-live` region now announces whole product cards** | `#predictive-search-results` is `aria-live="polite"` with no `aria-atomic` and no summary pattern. This diff took the per-result payload from title-plus-price to ten fields including "Add to cart", ×10 products, re-spoken per debounced keystroke. Verified against HEAD. **Not a defect in 4.1** — the region is 2.x's — but 4.1 caused the regression and it passed both agents because the criterion technically holds. Joins the layering and `shopify:section:load` items |
| — | **A plan assertion was wrong and the build caught it rather than mis-editing** | TODO 4 asserted the products branch held **one** `h-14 w-14`; it held **two** — the `featured_image` case and the `icon-cart` fallback. The replacement script aborted on the assertion instead of replacing the wrong range. Cheap guards on text-anchored edits pay for themselves |
| — | ⚠️ **`/compare` reported the radiator metafield as "unset"; it is set to the wrong asset** | Corrected by direct query: the two affected products point `custom.radiator_image` at `radiator-card-image.png` (**1536×813**), while the two correct ones hold `radiator-ring-1/2.png` (270×138). Same 43-of-49 blocker `popular-products-group` raised. **The distinction matters** — "unset" implies populating a blank field, the truth is repointing an existing one |
| 4.2 | ⚠️ **Handover: three things wait on 4.2** | The View All CTA is still the placeholder bordered anchor and is the largest visual delta at both breakpoints; the collections and articles branches still carry the `h-14 w-14` thumbnail treatment (lines **51** and **85**); and the card-row → CTA gap must be set by 4.2, not inherited |
| 3.2 | 🔴 **`show_featured_image: false` added — the PRD never mentions it** | Its default `true` takes `product-card`'s non-radiator branch: no rings, wrong image treatment, and **no acceptance criterion in the PRD would have caught it.** The single highest-impact omission across six PRDs |
| 3.2 | **CSS Grid, not the PRD's flex track** | Only a fixed column count satisfies every count case at once: derives 170/265 exactly, aligns rows, wraps above four, and holds a single card at column width. `flex-1` cannot express "wrap above four" — without a basis all cards land on one row and shrink; with `grow` + basis, 3 cards inflate to 373px and 1 card to 1120px. CLAUDE.md names `grid-cols-N` alongside `flex-1` as approved derivation |
| 3.2 | 🔴 **The PRD's count-3 criterion is superseded** | "Redistribute to fill 1120" and "count 1 does not stretch" are mutually exclusive. **User decision: hold 265px with an empty fourth slot.** Measured constant at 1/2/3/4/12 cards |
| 3.2 | **Desktop is no longer unconditionally "one row"** | Above four cards the grid wraps. 12 cells measured as 3 rows of 4 at 265px with no panel or document overflow. The setting allows 1–12 and at 12 a single row would have given 75px cards |
| 3.2 | ⚠️ **REVERSED 2026-08-19** — **Media geometry corrected by one unprefixed `card_class` variant** | `aspect-[315/226]` gives 190px on a 265px card against the design's 226. `[&_.product-card\_\_media]:aspect-[265/226]` needs **no `lg:` pair** — the pairing hazard applies only where an unprefixed utility collides with the snippet's own `lg:`, and the aspect has no `lg:` variant. Verified compiled at `tailwind.css:5209`, a (0,2,0) descendant selector outranking the element's own (0,1,0) |
| 3.2 | **Aspect ratio, not a pinned height** | The panel is `lg:w-[83.333%]` below `xl`, so desktop card width is **not** constant: at 1024 four cards derive 178px, where a pinned `h-[226px]` would be 50% too tall. `/compare`'s width sweep confirmed 150.38px media at 1024 — cramped, proportional, not broken. Closes R-4 |
| 3.2 | **Guard collapsed from a nested pair to one condition** | The existing code assigned to a local then re-tested it. ⚠️ `/assess` noted that **Liquid evaluates `and` right-to-left**, so the `!= blank` test does not shield the `.products.size` access beside it — safe here only because Liquid returns nil rather than raising. Do not copy the idiom where the right operand is not nil-safe |
| 3.2 | **Overlay divergence accepted, not chased** | The design shows badge-only on desktop and heart-only on mobile; `product-card` renders the heart unconditionally and the badge whenever the metafield is set, which all products have. **User decision: "No change, its figma negligence."** Confirmed present in the build; `/compare` flags it and it is not a defect |
| 3.2 | **Mobile card radius stays 12px against the design's 15px** | Same reason — it lives in `product-card.liquid`, which ships untouched to keep the other seven call sites byte-identical |
| 3.2 | **`icon-box` geometry is authored, not extracted** | `.buildspace/artifacts/` holds zero SVG files and `design-context.md` records only bounding boxes — the `icon-set` PRD established that path data cannot be recovered from the existing extraction. `icon-clock` and `icon-grid` were authored the same way in 3.1. Declared as approximate; not claimed to match Figma |
| 3.2 | **`/assess` Should Fix applied — `if`/`elsif` → `case`/`when`** | liquid-standards prescribes `case`/`when` over a long chain, and `button.liquid:85-107` is the house precedent. `/assess` scoped it to 3.1 as the chain's author; **fixed here instead, because 3.2 is what made it three branches** and 4.2 will extend it again. Zero behaviour change |
| 3.2 | 🔴 **UNMET criterion — rings do not render, and no theme change fixes it** | **43 of 49 products point `custom.radiator_image` at `radiator-card-image.png` (1536×813)** instead of the 270×138 ring asset. The radiator branch is verifiably active — wrapper at 85.7% of the media box, bottom-anchored, two decoded images per card. Store data. `/fix` was deliberately not invoked: it would either change nothing or invite a disguising crop that regresses the verified geometry into the other seven call sites |
| — | ⚠️ **A presence check is not a property check — third occurrence** | My rings probe asserted the radiator *wrapper element* exists and I reported "rings render"; `/compare` looked at pixels and found a photograph. My clarify-stage metafield query had the same flaw (`if value else '-'`), reporting "12/12 carry all four metafields" — true, and irrelevant. **The 4 products I sampled were 4 of the only 6 correct ones**, so the narrow check actively argued against a correct finding |
| — | ⚠️ **`resize_window` is now inert — a new environmental limit** | It reports success while `innerWidth` stays at 1470 and `outerWidth` reads **0**; an iframe at 390px loads cross-origin so its document is unreadable. Resizing worked in earlier PRDs. Mobile geometry must go to `/compare`, which captures at its own viewport |
| — | **`git status` does not prove a shared snippet's other call sites are unaffected** | The compiled-CSS diff does. This rebuild dropped `.hover\:border-primary:hover`; its only remaining textual match, `search-chip.liquid`, uses the distinct `[@media(hover:hover)]:hover:border-primary`, still compiled |
| 4.1 | ⚠️ **Handover: this group's grid geometry is the one to reuse** | `grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-5` plus the `card_class` aspect override, both measured. 4.1 also replaces `sections/predictive-search.liquid`'s own card markup, which does **not** use `product-card` today |
| 3.1 | 🔴 **The recent-searches limit now applies on render as well as save** | `MAX_RECENT` was used only in `saveRecentSearch`'s slice; the renderer sent every stored entry. The PRD's Approach — "replacing the module-level constant" — would have failed its own criterion for every returning user. Verified: 3 rendered from 5 stored, all 5 retained |
| 3.1 | **One chip primitive with a variant flag**, not two near-copies | With the height declared and the label centred, only the desktop radius and the flex/basis pair differ. Variant classes are **literal strings inside `{% if %}`** — a class built from a Liquid variable emits no CSS |
| 3.1 | **Chips declare `h-[42px]`** and centre their label | The stated 42px height, the stated paddings and the Body-2 token were mutually contradictory: 42 implies line-height 20 for concern chips, 22 for recent, while the token says 24. Declaring the height matches what the design states for both. ⚠️ My clarify's first derivation of this was wrong and was corrected |
| 3.1 | **Chip border is the literal `#d4d4d4`, not `border-border`** | `color_border` is **`#E5E7EB`** — visibly lighter. Makes `#d4d4d4` a **third** search-specific grey alongside F1's `#999` and `rgba(33,33,33,0.1)`. Recorded as search-specific, not promoted to Global Standards |
| 3.1 | **Both chip groups wrap (`flex flex-wrap`) on both breakpoints** | `design-context.md` records a 6-column desktop grid and a 2-column mobile grid, but its own recorded mobile widths are **internally inconsistent** — 159 + 10 + 191 = 360 in a 350px column. Content-sized chips wrapping resolves it. Mobile two-per-row comes from `basis-[calc(50%-5px)]`, since `flex-1` under `flex-wrap` would put every chip on one row |
| 3.1 | **Hover/focus follows a different reference than the PRD names** | The PRD's "mega-menu rail — border-colour shift plus the theme focus ring" does not exist: the rail styles `aria-selected`, not hover, and the only `focus-visible` convention was 2.2's, one day old. Ships as a border shift guarded by `[@media(hover:hover)]` (the real idiom, from `mega-menu-group.liquid`) plus 2.2's outline. **Both undrawn — D-17/F4, needs designer sign-off** |
| 3.1 | **Two containers needed `flex` the plan did not specify** | `search-recent-searches.js` only ever removes `hidden`; it never adds `flex`. `hidden flex-col gap-3` would have had inert `flex-col` and `gap`. Relies on the cascade order re-confirmed here: `.block` at `tailwind.css:1090`, `.flex` at `:1102`, `.hidden` at `:1122` |
| 3.1 | **`/compare` Critical — `lg:basis-auto` defeated equal division** | `.lg\:flex-1` sets `flex: 1 1 0%`; `.lg\:basis-auto` reset `flex-basis: auto` 28 lines later in the same media block. A **zero basis is what makes `flex-grow` divide equally**, so chips grew from content width — 274/227/294/295 against Figma's four at 272.5. I added `basis-auto` to reset the mobile basis without registering that `flex-1` already zeroes it. Fixed to `lg:basis-0`; verified 272.5 × 4 |
| 3.1 | **`/assess` A-1 — the chip had no width ceiling, violating my own stated edge case** | `clarify.md:158` requires a long label to "wrap or ellipsise without breaking the row"; the chip shipped `whitespace-nowrap` with no `max-w`. Recent chips carry **unbounded user input**. Fixed with `max-w-full` plus `truncate` on an inner span — `text-overflow` needs a block container, so `truncate` on the `inline-flex` anchor would not have ellipsised. Verified with a 190-character label: fits, ellipsised, nothing overflows |
| 3.1 | **`/assess` A-2 — heading restored to a real heading element; chip containers deliberately left as divs** | `<h3>` → `<span>` was a genuine regression inside a live `role="dialog"`, in the primitive **3.2 inherits** — now `<{{ heading_level }}>` following `section-header.liquid:85`. The `ul`/`li` half was **diverged from with evidence**: the theme's two existing chip-like wrapping lists (`active-filters.liquid:33`, `mega-menu-group.liquid`) both use plain divs with zero `ul`/`li`, and restoring it would force variant sizing onto the `<li>` |
| 3.1 | **`/assess` A-3 — the doc promised an icon key the code did not branch on** | `{% doc %}` advertised `'clock', 'grid' or 'box'` with only two branches, so 3.2 passing `box` would have silently rendered no icon. `box` removed; 3.2 adds the icon and its branch together |
| 3.1 | **`selectors.json` selector corrected from the plan** | The plan said `.search-modal-content`; **2.1 renamed that to `[data-search-panel]`** on an `/assess` Critical and the plan carried the stale value forward |
| 3.1 | ⚠️ **4 acceptance criteria unverified — `search_concern_menu` is unset** | The concern group's Liquid loop has never executed. Unverified: chips rendering from the menu, the 6-item cap, in-situ flex behaviour, and the `icon-grid` heading. Both `/compare` and `/assess` used a CSS-level probe instead. **Environment gap, not a code defect** — assigning a menu closes all four and is a prerequisite for 3.2 |
| — | ⚠️ **A probe that duplicates the code under test verifies the duplicate** | `/compare` iteration 2 reported a **false MISMATCH** with the exact pre-fix numbers, because its synthetic probe held a hardcoded copy of the chip class string frozen at `lg:basis-auto`. **My own verification had the identical flaw** and only gave the right answer because I copied the string after fixing. Probes must read the class from the snippet at runtime |
| 3.2 | ⚠️ **Handover: `search-group-heading.liquid` is ready to reuse** | Takes `heading_icon` (`clock` / `grid`), `heading_title`, optional `heading_level` (default h3). 3.2 adds an `icon-box` snippet **and** its `{% elsif %}` branch — the doc no longer promises `box` until both exist |
| 2.2 | 🔴 **B-1 (Critical) — the bare `group` class captured the product card's `group-hover`** | The modal root took Tailwind's unnamed `group`; `.group:hover .group-hover\:scale-105` binds to any `.group` ancestor and the root spans the viewport, so every popular-product image would sit at 105%. **Latent** — `popular_collection` is unset, so no browser check could have caught it. Fixed with `group/search`; syntax verified against a throwaway config before shipping |
| 2.2 | 🔴 **A-2 (Critical) — no visible focus indicator anywhere in the modal** | `base.css` had one focus rule, `.button:focus-visible`, and no modal control carries `.button`; 2.1 had stripped the input's outline. A focus trap over invisible focus is worse than no trap. `focus-visible` rings added to Clear and both closes |
| 2.2 | **The search input deliberately has NO focus ring** — devx's call | The caret is the focus cue and the design draws no ring on the bar. Icon and text buttons keep theirs, so DoD §7 is still met for the controls that need it |
| 2.2 | 🔴 **B-3 — "Recent Search re-rendered on clear" was never implemented** | An explicit acceptance criterion. `showDefaultContent()` was called only from `openModal`; `trackSearch()` writes to localStorage on every search, so the list went stale mid-session. Now called whenever the incoming state is `default` |
| 2.2 | **A-1 (Critical) — the flush released the height pin, so the panel snapped** | `commit(true)` cleared `panelBody.style.height` *after* the container swap, so the re-pin read the new content's height. Root cause: the `flushed` flag was correct for the state logic and reused for the height logic, where the right behaviour is the opposite. A flushed commit now preserves the pin |
| 2.2 | ⚠️ **D-E1 / A-1 / B-2 — the same short-circuit defect shape, four times this sprint** | 2.1's FP-8, D-E1 (cancelling a timer skipped the state reset), round 2's Critical, and B-2 (the `next === current` early return snapped instead of easing). Each time a short-circuit skipped logic parked on the main path. **`patterns-learned.md` needs strengthening** — the fourth landed in a PRD whose own R-2 named the coupling |
| 2.2 | **A third focus-trap copy ships**, following `header-javascript.js`'s shape | `cart-drawer.js` computes focusables once with no visibility filter and would go stale as results inject; the navigation drawer recomputes per Tab and filters on `offsetParent`. Verified by injecting a focusable while open and Tabbing to it without reopening. **Triplication still needs an owner** |
| 2.2 | **Escape now defers to an open cart drawer** | Both handlers are on `document`, so one press was closing **both** layers. The search modal bails when `cart-drawer[aria-hidden="false"]` matches — an attribute query rather than reading another component's internals |
| 2.2 | **The `body` scroll lock is re-asserted by a `MutationObserver`** | Five components toggle `overflow-hidden` as a shared boolean; `cart-drawer.js:95` released it on close while the search modal was still open. Narrow fix; **the underlying race is unfixed** |
| 2.2 | **A-3…A-6, B-4 — five smaller defects** | The incoming container never faded in (`remove hidden` and `remove opacity-0` in one style recalc); results were blanked mid-fade; the loading state lost its centring when `showLoading` stopped adding `flex`; a double close orphaned a timer able to tear down a *reopened* modal; and no `aria-live` existed, so the retained loading paragraph announced nothing |
| 2.2 | **Clicking anywhere in the search bar focuses the input** — devx's request | A `data-search-bar` click handler with `cursor-text`, excluding the Clear and close buttons so they keep their own behaviour. Not in the PRD |
| 2.2 | **`data-search-panel-body` added** — a hook the plan did not name | The plan identified the panel body only as "the element carrying `lg:max-h-[741px]`". JS must target it and CLAUDE.md requires `data-*` |
| 2.2 | **`panel.style.height` written from JS during the swap** — the D-E1 exception, second instance | The incoming content's height is a runtime measurement with no CSS expression. Every other value stays in markup, driven by one `data-search-state` attribute |
| 2.2 | ⚠️ **Animated values were never machine-verified** | The automated browser tab is `document.hidden`, so rAF is paused and transitions never advance — proven by the modal root still carrying `opacity-0` 800ms after `open()`. Devx verified the six animation, §4.4 and reduced-motion checks in a foregrounded browser |
| 2.2 | **The PRD's constraint naming `.search-modal-close` as a live hook is stale** | 2.1 converted it to `[data-search-close]` on a `/assess` Critical |
| — | ⚠️ **Unowned, and now two items: layering** | `aria-modal="true"` hides the cart drawer from assistive tech during the §4.4 stacked-dialog sequence this PRD requires — removing it would undo an explicit requirement. Same root as the `body` scroll-lock refcount. **Both belong to one cross-cutting layering PRD** |
| — | ⚠️ **Still unowned after four PRDs: `shopify:section:load` re-init** | Search JS goes inert in the theme editor after any header edit, across `search-modal.js`, `predictive-search.js` and `search-recent-searches.js`. Raised at 1.2, 2.1 and 2.2 |
| 2.1 | 🔴 **The spacing notation trap** — `design-context.md`'s Tailwind-looking tokens are raw px, and `spacing.18` is overridden to **72px** in this project | A literal `px-18` on the mobile bar would have been 4× too wide; `px-40`→160px, `h-48`→192px, `py-10`→40px. Only `p-5` coincides. Conversion table in `plan.md`; rendered output verified at 40px / 18px |
| 2.1 | **Close control ships `bg-white/20`** — a value in neither the PRD nor `design-context.md` | Measured from the export: a crisp step from flat 204.0 to flat 214.0 at exactly frame x1330, zero gradient. α = (214−204)/(255−204) ≈ 20%. Without it the 44×44 control is invisible against the blurred backdrop and 'radius 12' describes a shape never drawn |
| 2.1 | **Mobile vertical inset is 20px in both states**, not the PRD's `py-18` / `p-5` split | Two independent hard-edge anchors: default 20.5±0.5 via the group-title icon box, typed 20.0 exactly via the card border. `design-context.md:213` records only the *side* inset, so the 18 has no extraction source. **Replaces an acceptance criterion** |
| 2.1 | **No CSS file created** — all Tailwind. Departs from the PRD's Expected Output ⚠️ (the `top-[var(--search-header-offset)]` example cited below was removed 2026-08-19) | Everything is expressible as a utility, including `top-[var(--search-header-offset)]`. Follows the homepage 1.5 precedent where a 248-line `base.css` block was reversed to all-Tailwind and shipped ~1.2 KB smaller. `sections/header.liquid` untouched — no stylesheet link needed |
| 2.1 | **Both breakpoints ship clear *and* close** — devx's call; clear is a text button, mobile gains a close icon | Resolves R-2: the design gives mobile only a clear icon and the takeover starts *below* the header, so with no Escape key and no backdrop it would have been undismissable. Confirmed against the exports — the default mobile row has **zero** ink on the right. **Needs designer sign-off with F2/F4** |
| 2.1 | **Panel gained `xl:max-w-[calc(100vw-120px)]`**, amending Scope Decision 5 | `/assess` round 1: the close control was clipped between 1280 and 1307px — 14px cut at 1280, a 30px hit area vs DoD §7's 44px, with `body` scroll-locked so nothing brings it back. Root cause: D-8's fixed 1200 and P-6's 54px offset were decided independently. The cap is inert above a 1320 viewport, so 1440/1536 keep the designed 1200px |
| 2.1 | **`.search-modal-content` / `.search-modal-close` → `[data-search-panel]` / `[data-search-close]`** | CLAUDE.md forbids class names as JS hooks; zero CSS rules targeted either. ⚠️ **They were pre-existing at HEAD** — `/assess` called them 'introduced by this feature', which is wrong; 2.1 preserved them per P-3 and added a second. The rename's real risk was silently breaking backdrop-click, so inside-click-keeps-open and backdrop-click-closes were both tested |
| 2.1 | **`closeModal`'s 250ms timer is now cancellable** | No `clearTimeout` existed, so reopening inside 250ms let the pending timer re-hide the modal and clear the input. Pre-existing in shape; 2.1 changed the value from 300 to 250, so it was in scope |
| 2.1 | **FP-8 — the timer fix skipped the state reset. A regression introduced by the fix above** | The whole reset lived *inside* the timer callback, so cancelling the timer skipped it and a fast reopen re-showed the stale query. Root cause: `closeModal` conflated a visual commit that must wait for the fade with a state reset unrelated to animation timing. Fixed by extracting `resetSearchState()` and calling it from both paths. Verified: 60ms and 500ms reopens give identical clean state |
| 2.1 | **FP-9 — `input.focus()` moved out of the double `requestAnimationFrame`** | Inside the rAFs it severs the user-gesture chain, and iOS Safari raises the soft keyboard only for a synchronous `focus()`. The mobile takeover would have focused the input with **no keyboard** — on the breakpoint where typing is the point. The rAFs are needed for the class mutations, not for focus |
| 2.1 | **Open/close transitions moved 300ms → 250ms `ease-out`** | The PRD never states a duration, but DoD §4 requires the navigation track's house timing and forbids a second one. `sections/header.liquid:32` supplied the exact string, including `motion-reduce:transition-none` |
| 2.1 | **`search.placeholder` changed and `search.clear` added** — `locales/en.default.json` is not in the PRD's Expected Output | The design requires 'Search by product name'. ⚠️ The key is shared with `sections/search.liquid:22`, the **out-of-scope** search results page, which inherits the new text — a deliberate, approved touch. `accessibility.clear` was planned then **dropped**: a text button's visible label is its accessible name |
| 2.1 | ⚠️ **REVERSED 2026-08-19** — **`style.setProperty` for `--search-header-offset`** — a documented `js-standards` exception | The rule forbids styling via JS. The value is the header's runtime height: it cannot be a class, cannot come from Liquid, and no CSS feature reads another element's height here. D-22 mandates exactly this mechanism. Writing a custom property is passing data, not applying a style |
| 2.1 | ⚠️ **The plugin's `capture-sections.js` cannot see this modal** — returns `NOT_VISIBLE` | The shell is `hidden` on load and the script has no open step. Both `/compare` runs used a modal-aware wrapper that clicks `.search-trigger` first. **3.1, 3.2, 4.1 and 4.2 all render into this same modal and will each hit it** |
| 2.2 | ⚠️ **The 551px typed max-height is deferred here** | One panel element cannot switch ceilings without knowing the active state. 741 is applied; applying 551 unconditionally would clip the default state by 190px. Needs 2.2's state machinery |
| 2.2 | ⚠️ **DoD §7 is knowingly unmet** — no focus trap, no focus return, no `aria-modal` | Assigned to 2.2 by `clarify.md:216,225` and `plan.md:270`. Recorded so it is not read as a 2.1 omission |
| — | ⚠️ **Unowned: no `shopify:section:load` re-init** | Search JS goes inert in the theme editor after any header edit. The fault spans `search-modal.js`, `predictive-search.js` and `search-recent-searches.js`, while the same section's `header-javascript.js` re-inits in three places. **Needs one scoping decision, not a patch folded into a shell PRD** |
| 1.2 | **D-24 CLOSED POSITIVE** — all 14 accessors resolve on predictive-search product objects | Full verdict above with method, URLs and a per-accessor table. Closes `deviations.md`'s D-24. 4.1 needs no fallback |
| 1.2 | **The probe was widened from 1 metafield to all 14 accessors**, on devx's instruction | The PRD specified one field. Widening surfaced the three `add-to-cart-button` accessors `product-card` never touches — whose failure mode is a button that renders fine and fails silently on click. A metafields-only probe would have missed the class entirely |
| 1.2 | **PRD Discrepancy 1 — "remove the hardcoded caps of 10 on articles and pages" named the wrong file** | `sections/predictive-search.liquid` has no `limit` anywhere; the caps were `articles_shown < 10` / `pages_shown < 10` in `sections/search-modal-results.liquid:91,129`, which this PRD **deletes**. The requirement was satisfied by the deletion; no edit existed. The Expected Output line was wrong |
| 1.2 | **PRD Discrepancy 2 — `has_results` had to be extended to collections** | It was computed from products/articles/pages only. Adding a collections loop without touching it means a collection-only query takes the `has_results == false` branch and renders "no results" **while discarding the collections that matched**. The PRD implied but never stated it. Verified fixed by testing the exact failure |
| 1.2 | **PRD Discrepancy 3 — `options[prefix]=last` dropped, not carried over** | A `/search` route parameter, absent from the Predictive Search API reference, which returns **422** on an invalid parameter. Carrying it forward as "existing behaviour" would have risked every request |
| 1.2 | **Two locale keys added** — `search.collections`, `search.collection` — not in the PRD's Expected Output | The section renders group headings from locale keys and none existed for collections; without them the heading renders `translation missing:`. **`collections.products_count` was rejected** — it exists but is `"{{ count }} products"` with no plural forms, so it renders "1 products" |
| 1.2 | **Group order is products → collections → articles → pages** | Minimal diff — no existing group moved. Final ordering of the three secondary groups is **4.2's** call, under designer review F2 |
| 1.2 | **New markup escapes `collection.title`; the three existing group titles remain unescaped** | `liquid-standards` requires escaping and new code follows standards even where neighbours do not. The three pre-existing ones are 4.2's to rewrite. ⚠️ Leaves a knowing inconsistency in one file until then |
| 1.2 | **The stale 7-line header comment collapsed to one line** (`/assess` Should Fix) | It named three result groups; this PRD added a fourth. The multi-line form was pre-existing and violates CLAUDE.md, but the *staleness* was caused here. Collapsed rather than deleted so the load-bearing why survives — it explains why the section has no preset and sits in no template, which `verify-integration` flags every run |
| 1.2 | **D-E1 — the dev server was already running; I neither started nor stopped it** | `npm run shopify` hit `EADDRINUSE`; devx's `shopify theme dev` (PID 10897) was already up, authenticated and serving local files. Used it. TODO 8's shutdown was deliberately skipped — stopping a process devx started is not mine to do. ⚠️ **Still running**; 2.1 will want it |
| 1.2 | **D-E2 — "all four resource types in one response" is Partially Met.** Content limit, not code | The store has exactly 4 pages — Contact, Our Story, History, Track Order — sharing no vocabulary with the product/collection/article catalogue. 15 queries tried; best was three groups at once. Each type was verified individually, pages included, and the four group blocks are independent sequential `{%- if X.size > 0 -%}` conditionals with no shared state, so four-at-once is structurally identical to three. **Adding a page like "Pain Relief Guide" would close it** — a content change, not made |
| 1.2 | **D-E3 — `verify-integration.mjs` reports FAILs that are correct to ignore** | Two are the deliberately deleted file (the script has no concept of deletion); one is `section-registered` on `predictive-search.liquid`, which is API-rendered only and **must** stay out of every template. Independently confirmed by `/assess`. Do not "fix" by adding a template reference or a preset |
| 2.2 | ⚠️ **Three runtime behaviours in `assets/predictive-search.js` are unverified** | Debounce firing one request per 300 ms window, superseded requests showing as cancelled, and a sub-2-character query firing nothing. curl cannot observe them. All three are code paths 1.2 did not touch — the JS diff is 3 lines, verified — so risk is low. **2.2 works in this file and should confirm them** |
| 4.2 | ⚠️ **Three secondary result groups share near-identical markup** | Collections, Articles and Pages differ only in their thumbnail accessor, title and item label. Extracting a shared snippet was **deliberately deferred** — 4.2 owns these groups, F2 is still open, and no design exists, so extracting now risks parameterising the wrong axis. Also fix the escaping inconsistency then |
| — | ⚠️ **`snippets/product-card.liquid` hardcodes the star rating** | `:93-96` sets `card_rating_is_placeholder = true`, `card_rating_value = 4.7`, `card_rating_count = 132` as literals and reads **neither** the `rating_value` nor `review_count` metafield — both of which exist on products. So every card shows 4.7 / 132. Found while enumerating dependencies for the D-24 probe. **Out of scope for the search sprint; needs an owning PRD** |
| 1.1 | **P-1 — `popular_products_collection` → `popular_collection`** (27 → 18 chars) | `section-standards` caps setting IDs at **under** 25 characters and the TDD's proposed name is 27. Project precedent: `roadmap-homepage/status-log.md:757` records `/assess` flagging setting-ID naming as a Should Fix, and 1.6's log established that standards outrank the plan on ID naming. Amends D-6. Corrected in 6 doc locations; TDD frozen |
| 1.1 | **Three IDs prefixed: `search_recent_heading`, `search_concern_heading`, `search_concern_menu`** | Raised by `/assess` as Should Fix #1 — `recent_heading` / `concern_heading` / `concern_menu` carry no feature context, which `section-standards` "Setting IDs" forbids since Shopify flattens all theme settings into one namespace. Not covered by any approved deviation: the plan's "global IDs carry no `search_` prefix" was a Codebase Context *observation*. Devx chose to fix it now — nothing consumed them and `settings_data.json` held no value, so the rename orphaned nothing. Deferring past 3.1 would have cost a consumer edit |
| 1.1 | **`best_sellers_*` markup repointed, not deleted** — beyond the PRD's Expected Output | Clarify Scope Decision 1. The PRD renames the three IDs but its Expected Output never mentions the markup consuming them, so the group would have silently blanked and AC #5 would have failed. Repointing keeps Popular Products rendering through 1.2, 2.1, 2.2 and 3.1; 3.2 replaces the markup |
| 1.1 | **`sections/recently-viewed-products.liquid` deleted** — a 4th file, beyond the PRD's Expected Output | Clarify Scope Decision 2. Its sole reference repo-wide was `assets/search-recently-viewed.js:85`; in no template, no section group, no preset. It also matched the PRD's own AC #5 grep, which could not pass while it existed |
| 1.1 | **`snippets/get-url-param.liquid` comment reworded** — beyond the PRD's Expected Output | Clarify Scope Decision 3. Its line 29 comment named `recently-viewed`, matching AC #5's grep. The snippet itself survives — `sections/recent-searches.liquid:5` still renders it |
| 1.1 | **`assets/search-modal.js:12` dead call removed** — a 6th file, invisible to the PRD's own grep | Clarify Finding 1. It called `window.searchRecentlyViewed?.renderRecentlyViewedProducts()`, a global defined in a deleted file. AC #5's pattern is `recently_viewed`/`recently-viewed`; the identifier is camelCase `searchRecentlyViewed`, so the grep structurally could not catch it, and optional chaining meant it failed silently |
| 1.1 | **D-E1 — `assets/tailwind.css` rebuilt**, against the plan's byte-identical-to-HEAD criterion | Deleting files removes class *usages*, and Tailwind's output is usage-driven — 270 bytes of dead rules (`aspect-[4/5]`, `flex-[0_0_45%]`, `w-1/2`, `w-3/4`, a 430px block). DoD §4 requires byte-identical to a **fresh out-of-tree build**, which outranks the plan. A live watcher had not detected the deletions |
| 1.1 | **D-E2 — theme check baseline is now 156 files**, not 158 | Two of the three deleted files are `.liquid`. 0 offenses is the criterion; the count is not. Two ACs asserting 158 were wrong when written and have been corrected |
| 1.1 | **D-E3 — the over-limit-ID survey used the wrong operator** | `section-standards` says **under** 25, so 25 itself violates. A `> 25` survey found 3 offenders when there were 5: `discount_badge_text_color` and `sold_out_badge_text_color` are both exactly 25, pre-existing in the `Product card` group. **Out of scope here — open for a later PRD** |
| 1.1 | **A-1 — `assign limit` indirection inlined** (`/assess` Should Fix #2) | Single-use indirection on a line this PRD had already edited, and `limit` is the `for` tag's own keyword, so `limit: limit` read as a tautology. P-2 renamed `best_sellers` on the adjacent line for exactly this `liquid-standards` rule, so one standard had been applied inconsistently inside one diff |
| 1.1 | **A-2 — the orphaned-value handover note was factually wrong** | `config/settings_data.json` holds 24 keys in `current`, none a search setting, and no presets. Nothing was orphaned because nothing was ever set. "Re-select" sent the merchant looking for a value that does not exist; corrected to "assign" in 4 files |
| 3.1 | ⚠️ **`recent_searches_limit` vs `MAX_RECENT` — handover trap** | `recent_searches_limit` defaults to 6 across 1–10; `assets/search-recent-searches.js:3` hardcodes `const MAX_RECENT = 5`. Harmless today, since nothing reads the setting. **Whoever wires it in 3.1 must delete `MAX_RECENT` in the same change**, or the merchant's value is silently clipped to 5 |
| 1.2 | ⚠️ **`sections/search-modal-results.liquid` still uses `search.no_results_html`** | Recorded so 4.2 does not delete that locale key. It has three call sites, and `sections/search.liquid:44` is the **search results page — explicitly out of sprint scope**. D-23 supersedes the string in the modal only; the key must never be deleted |

---

## Blocker Log

| PRD | Blocked by | Owner | Raised | Cleared |
|-----|-----------|-------|--------|---------|
