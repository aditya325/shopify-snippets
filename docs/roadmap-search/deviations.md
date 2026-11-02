# Deviations & Decisions — Amrutanjan Search Modal Sprint

**Created:** 2026-08-18
**TDD:** `docs/tdds/amrutanjan-search-sprint.md` (v1.0) — **frozen, never edited**
**Status:** authoritative wherever it disagrees with the TDD

Every row below was established **before any code was written**, during brainstorming, by reading the
existing implementation and verifying against the design extraction at `.buildspace/artifacts/search/`
and against Shopify's documentation. Each carries its evidence.

---

## Structural

| ID | Deviation | TDD said | Why |
|----|-----------|----------|-----|
| D-1 | All new settings are **global theme settings** in the existing `"Search"` group in `config/settings_schema.json` | §3.1 scopes every new setting to "Section" | The modal is `snippets/search-modal.liquid`, rendered from `sections/header.liquid:38`. Snippets cannot carry a `{% schema %}`, so section scope does not exist. Its five existing settings already live in the global `"Search"` group |
| D-2 | Browse by concern chips come from a **`link_list` setting** (`search_concern_menu` — prefixed during 1.1 execution per `section-standards`), edited in Content → Menus, capped at 6 | §3.1 specifies a repeatable `concern_chip` block with `chip_label` and `chip_url` | Blocks require a section. `sections/header.liquid` already declares five `mega-menu-*` block types against `max_blocks: 10`, so adding a sixth type would collide with the mega-menu budget and mix navigation config with search config. A `link_list` supplies label + URL natively — the same two fields §3.1 asked for. Precedent: `header.liquid:53`, `footer.liquid:345` |
| D-5 | Switched **to** the Predictive Search API — `/search/suggest` + `section_id`, using the already-present `sections/predictive-search.liquid`. `sections/search-modal-results.liquid` deleted | §3.2 says "Shopify predictive search" | The shipped code did *not* use predictive search: `assets/predictive-search.js:45` fetched `/search?q=…&section_id=search-modal-results` with the `search` Liquid object. A fully-written predictive-search section existed in the theme and was referenced by nothing. Cost of the switch: gives up the `/search` route's semantic-search capability on eligible plans |
| D-5R | ⚠️ **Reverses D-5, 2026-08-19.** Back to the `/search` route via Section Rendering API — new `sections/search-results.liquid` renders the D-4 product-card markup from the `search` object. `sections/predictive-search.liquid` retained by decision, now with no callers | — | D-5's stated cost was measured and rejected, closing the DoD sign-off row. Measured on this store: `/search/suggest` returns **0** products for `body pain`, `period cramps` and `something for a cold`; the `/search` route returns **7**, **10** and **5**. Predictive search AND-matches a fixed field list (`title`, `body`, `product_type`, `tag`, `vendor`, `variants.*`), so natural phrasing misses. ⚠️ The gain is the `/search` route's OR/partial matching, tag tokenisation and relevance ranking — **not** vector semantics: terms with no lexical anchor in the catalogue (`headache`, `fever`, `blocked nose`, `dehydrated`) still return 0 on both, so synonyms remain a Search & Discovery content task. Cache-safe: `q` is a Shopify-recognised param, so `/search?q=…&section_id=…` varies per query — unlike the custom `queries` param on `/`, which caused the recent-searches cache bug fixed the same day |

## Reuse claims that did not hold

| ID | Deviation | TDD said | Why |
|----|-----------|----------|-----|
| D-4 | Rendering `product-card` with Add to Cart in the typed results is **new work**, not reuse | §1 "Reused: product-card unchanged, with Add to Cart shown"; §4.4 "uses the existing themex flow unchanged" | The existing results markup is a flat link list with 56px thumbnails, no `product-card` and no Add to Cart anywhere. `snippets/product-card.liquid` does exist with a `hide_add_to_cart` parameter — it was simply never wired into search |
| D-3 | Recent-searches cap raised to 6 **and made merchant-configurable** via `recent_searches_limit`, passed to JS on a `data-*` attribute | §3.2 "Capped at 6 entries" | Code shipped `MAX_RECENT = 5` (`assets/search-recent-searches.js:3`). Configurability was requested during brainstorming. `assets/search-recent-searches.js` is a static asset and cannot read `settings.*`, so the value rides on the markup — which means that file changes, contrary to §1's assumption that recent searches were reused untouched |
| D-19 | Focus trap and focus-return are **new work** | §4.1 states both as requirements alongside behaviour that is "reused as is" | `assets/search-modal.js` focuses the input on open but never traps focus, and `closeModal` does not return focus to the trigger |
| D-15 | The loading spinner is removed and replaced by a fade at the house 250ms `ease-out` | §4.2 "A subtle fade while results resolve. No spinner" | The existing modal renders `icon-spinner` in `#predictive-search-loading`. No duration or easing is specified anywhere, and no design exists — the house value is a stated default, not an extracted one |
| D-14 | The backdrop reuses `bg-black/20 backdrop-blur-[6px]` from `sections/header.liquid:32` | §2.1 "#000000 at 20 percent opacity with a 6 px background blur" | An exact precedent already ships for the mega-menu. The existing modal was `bg-black/50` with no blur |

## Settings and counts

| ID | Deviation | TDD said | Why |
|----|-----------|----------|-----|
| D-6 | Setting IDs renamed: `popular_collection`, `popular_products_count` (`range` 1–12, default 4), `popular_heading` (`text`) | §3.1 proposes `popular_products_collection`; the code shipped `best_sellers_products`, `best_sellers_products_limit` (`number`, default 10), `best_sellers_products_heading` (`richtext`) | Chosen so the document and the code agree. ⚠️ **Amended during 1.1 execution (P-1):** the TDD's `popular_products_collection` is **27 characters** and `section-standards` caps setting IDs at under 25, so it shipped as **`popular_collection`** (18). The TDD is frozen and was not edited; this row is the authority. ⚠️ **Second correction:** the stated cost was wrong — the rename orphaned **nothing**, because `config/settings_data.json` held no value for any search setting. See the Still-open row. Max raised from the TDD's unstated bound to 12 by decision |
| D-7 | `search_results_count` is a `range` 1–10, **default 10**, passed as `resources[limit]` with `resources[limit_scope]=each`. No caps in Liquid — the existing hardcoded caps of 10 on articles and pages are removed | §3.2 "four in the design" | No hardcoded caps was an explicit decision. 10 is the platform ceiling on `resources[limit]`, not a preference. `limit_scope` must be set to `each` — its default of `all` shares one limit across all four resource types and would starve the product grid |
| D-9 | Trending removed, along with `trending_collections` and `trending_collections_heading` | §1 confirms Trending discarded | The TDD discarded the group but not its two settings or its markup, both of which shipped |
| D-10 | Recently Viewed removed entirely — `snippets/search-modal-recently-viewed.liquid`, `assets/search-recently-viewed.js` (140 lines) and its script tag | Not mentioned | Present in code, absent from both the design and the TDD |
| D-21 | The `#clear-recent-searches` control is **retained** | Not mentioned | Exists in code with a `search.clear_history` locale string and appears nowhere in the design. Removing it would leave no way to clear recent searches |
| D-20 | The ⌘K / Ctrl+K shortcut is **retained** | Not mentioned | Existing behaviour, and §1 says existing behaviour is reused as is |
| D-23 | `no_results_text` supersedes the `search.no_results_html` locale string; copy is merchant-configurable, defaulting to the TDD's "Sorry, no results found." | §3.1 adds the setting; the locale string already existed | Two sources for one string. The TDD's copy carries no query term, where the locale string did — the term is dropped by decision |

## Layout

| ID | Deviation | TDD said | Why |
|----|-----------|----------|-----|
| D-8 | Panel width is a **percentage below 1280** and **fixed 1200px from `xl` (1280) up**. The measured heights become `max-height` with internal scroll | §2.1 "Default panel 1200 x 741"; "Typed panel 1200 x 551" | The design exists at one width only (1440). A declared 1200 overflows a 1024 viewport by 176px, and 1024 is where this theme's desktop layout engages. CLAUDE.md forbids declared layout widths; the 1200 above `xl` is an approved container ceiling, not a card width. The heights are mockup outcomes — §4.2 omits Recent Search when there is no history, so content genuinely varies |
| D-18 | Desktop concern chips capped at **6** | §3.2 "unlimited by convention. Four in the design" | A single `flex-1` row degrades past 6 — at 8 chips each is 131px. A `link_list` lets the merchant add any number, so the cap is enforced in Liquid |
| D-22 | The mobile takeover's header offset is **measured at runtime** and applied via a CSS custom property | §2.2 "the modal fills the screen from below it" | The header is `sticky top-0` with `min-h-[66px]` — not a fixed height — and no `--header-height` variable exists. The design's own header instances disagree: 58px in both modal frames, 66px in the PLP frame; the theme ships 66. So 117px (59 + 58) is not a valid offset |

## Undesigned surface area

| ID | Deviation | TDD said | Why |
|----|-----------|----------|-----|
| D-11 | **Collections added** as a fourth predictive result type | §3.2 lists "Collections, pages and articles" | Added by decision. Only possible on the Predictive Search API — the `/search` route accepts `product`, `page`, `article` only, so §3.2's collections requirement is unbuildable without D-5. Nothing in the design draws collections, so the treatment is derived from the design system. §7's F2 review applies |
| D-16 | The **no-results and loading states are built from scratch**, styled to the design system | §4.2 specifies both states | The Figma section contains exactly six frames — three screens × two viewports — and none draws a loading state or a no-results state. Confirmed by reading the section's children |
| D-17 | Chip and concern-item **hover and focus states** follow the mega-menu rail's house pattern | §7 F4 flags them as undrawn | Undrawn means invented. Following the navigation track's pattern keeps the two systems consistent rather than introducing a second convention |

## Flags closed without change

| ID | Resolution |
|----|-----------|
| F1 | **Closed.** Both greys are already in use: `#999` on the compare-at price in `snippets/product-card.liquid`, and `rgba(33,33,33,0.1)` — #212121 — on the mobile search-bar underline. Recorded as search-specific, not promoted to Global Standards, per §2.3 |
| F3 | **Closed on inspection.** The proposed 2-character minimum and 300 ms debounce are already implemented in `assets/predictive-search.js`. No change needed |
| D1 | **Closed.** Storage key `themex-recent-searches`; DOM ids `#search-modal`, `#predictive-search-input`, `#predictive-search-results`, `#predictive-search-loading`, `#search-default-content`, `.search-modal-close`, `.search-trigger`; existing settings `trending_collections`, `trending_collections_heading`, `best_sellers_products`, `best_sellers_products_heading`, `best_sellers_products_limit` |
| D2 | **Resolved by mechanism.** `no_results_cta_link` is a `url` setting, so the merchant picks the Shop All destination in admin. No code-side confirmation needed |
| D3 | **Resolved by mechanism.** Chip labels and destinations are menu items in Content → Menus (D-2), so this is admin content rather than a code blocker |
| D4 | **Resolved by mechanism.** `popular_collection` is a `collection` setting picked in admin |

---

## Still open

| ID | Item | Owner | Must close before |
|----|------|-------|-------------------|
| D-24 | ✅ **CLOSED 2026-08-18 — resolved POSITIVE.** Predictive-search product objects expose all 14 accessors `product-card` needs, including both `file_reference` metafields three levels deep (`.value.presentation.focal_point`) and the three accessors `add-to-cart-button` requires (`id`, `variants`, `selected_or_first_available_variant`). Decisive evidence: a real custom focal point `49.9537% 42.179%`, which a stubbed object could not produce. Full verdict with method and per-accessor evidence in `status-log.md`. **No fallback needed — 4.1 can render `product-card` at full fidelity** | devx | ~~4.1~~ closed |
| F2 | Review the three secondary result groups — collections, pages, articles — once built. Widened by D-11 from the TDD's original two | designer | sprint sign-off |
| F4 | Hover and focus states for chips and concern items — house pattern applied per D-17, pending sign-off | designer | sprint sign-off |
| — | The no-results and loading states have no design (D-16). Built to the design system, pending review | designer | sprint sign-off |
| — | Metafields are not indexed by predictive search, so queries cannot match `highlight_text`, `category_label` or any other metafield value. Communicate as a platform limit; decide whether tag-syncing is wanted | devx / Amrutanjan | sprint sign-off |
| — | One admin **assignment** of the Popular Products collection after deploy. ⚠️ **Corrected 2026-08-18 during 1.1:** the D-6 rename orphaned nothing — `config/settings_data.json` held no value for any search setting (24 keys in `current`, none search-related, no presets), so the collection was never set. The merchant assigns it for the first time; there is nothing to re-select | devx | deploy |
