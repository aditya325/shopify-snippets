# Deviations — Amrutanjan Navigation Sprint

**Created:** 2026-08-16
**Amends:** `docs/tdds/amrutanjan-navigation-sprint.md` (v1.2) — which is **not** edited
**Roadmap:** `README.md` · **Execution record:** `status-log.md`

---

## What this document is

**The TDD is frozen. This file is the amendment record.**

Every point below is a place where the build departs from the navigation TDD. The TDD is not
edited — it stays as the signed-off v1.2 document. When the two disagree, **this file wins** and
the PRD named in each entry is the implementation of record.

Nothing here is a proposal. All 13 were established before execution began: measured against the
Figma extraction at `.buildspace/artifacts/navigation/`, read out of live code, or confirmed as a
scope decision by the client. Each entry states its evidence so it can be re-checked rather than
taken on trust.

**Anything discovered during execution gets appended here**, not merged into the TDD, and is
recorded in `status-log.md` at the same time.

---

## Index

> **Provisional letters from PRD 2.2's clarify round.** `clarify.md` raised three findings as
> **D-A**, **D-B** and **D-C** before numbers were assigned. They shipped as **D-27** (panel-top
> hairline), **D-28** (underline is `#F4C430`) and **D-29** (chips 12 / links 16). The letters appear
> nowhere else — search the numbers.


| # | Deviation | Type | TDD section | Owner PRD |
|---|-----------|------|-------------|-----------|
| D-1 | Block model exceeds Shopify's 50-block cap | Structural | §3.1, §3.2 | 2.2 |
| D-2 | Mobile header is 66px, not 59 + 66 | Measurement | §2.2 | 2.1 |
| D-3 | Drawer row is 52px, not 48 | Measurement (F2) | §2.2 | 2.4 |
| D-4 | Chip is `#fde047` fill, no border | Measurement (F1) | §2.2 | 3.1 |
| D-5 | Nav label is 18/27 | Measurement (F4) | §2.2, §7 | 2.1 |
| D-6 | Account icon ships | Scope decision | §1 | 2.1 |
| D-7 | History carousel cancelled | Scope decision | §5.4, §6, §7 | 3.3 |
| D-8 | `product-card` has no Add-to-Cart prop | Missing prerequisite | §6 | 1.1 |
| D-9 | No shared Embla init module exists | Missing prerequisite | §6 | 3.3 |
| D-10 | Chevron icon already exists | Already built | §6 | 2.1 |
| D-11 | Subscribe extraction rewrites the section body | Spec cannot hold literally | §1, §6 | 1.2 |
| D-12 | Only 7 rail icons exist, not 23 | Measurement | §3.2 | 0.2 |
| D-13 | Chevrons ship in the scrolled state | Design oversight | §4.3 | 2.1 |
| D-14 | 19 collections is 16; the PRD contradicts itself | Spec conflict | PRD 0.1 §B | 0.1 |
| D-15 | 43 demo products created — new scope | Missing prerequisite | PRD 0.1 §B | 0.1 |
| D-16 | Decision 4's evidence was wrong; outcome stands | Measurement | PRD 0.1 §4 | 0.1 → 2.4 |
| D-17 | `product-card` ignores `rating_value` / `review_count` | Already broken | §6 | 1.1 |
| D-18 | Nothing renders `custom.publisher` | Not yet built | §5.5 | 3.4 |
| D-19 | `image.liquid` does not break SVG; PRD 0.2's constraint is false | Spec error | PRD 0.2 | 0.2 → 2.2 |
| D-20 | `{% doc %}` emits an unstrippable newline; byte-identity vs liquid-standards | Platform constraint | PRD 1.2 | 1.2 (all future extractions) |
| D-21 | Card gradient is 3-stop, not 5; `design-context.md` is wrong | Measurement error | PRD 1.2 | 1.2 → 3.2/3.3/3.4 |
| D-22 | Space Grotesk 600 is never loaded; `font-semibold` renders at 700 | Already broken | §2.1 | unowned — theme-wide |
| D-23 | Sticky-wrapper defeats a sentinel; rAF throttle shipped instead | Platform constraint | PRD 2.1 | 2.1 |
| D-24 | No shrink-on-scroll; scrolled bar stays 110px vs Figma's 80px | Scope decision | PRD 2.1 | 2.1 → 4.3 |
| D-25 | `backdrop-filter` on the header traps the fixed mobile drawer | Platform constraint | PRD 2.1 | 2.1 |
| D-26 | `menu_handle` alone collides; rail key must be `rail_parent` + `rail_menu_handle` | Spec error | §3.1, §3.2 | 2.2 |
| D-27 | Undocumented 1px `#e5e5e5` hairline at the panel top edge | Measurement gap | §2.2 | 2.2 |
| D-28 | Active nav underline is `#F4C430`, not `design-context.md`'s `#facc15` | Measurement error | §2.2 | 2.2 → 2.3 |
| D-29 | Chips gap 12, links gap 16 — the PRD's single `gap 12` is wrong | Measurement error | §3.3 | 2.2 |
| D-30 | Figma puts the panel at y=116 under a 110px header; we render flush | Measurement gap | §2.2 | 2.2 |
| D-31 | The rail has a panel title the PRD never mentions | Missing requirement | §3.2 | 2.2 |
| D-32 | Chips are Inter 500 in Figma; Inter is not loaded by the theme | Missing prerequisite | §2.1 | 2.2 |
| D-33 | Trigger split into `<a>` + chevron `<button>`; PRD's "Enter opens" would break the link | Spec error | §4.1 | 2.3 |
| D-34 | `aria-haspopup="true"` removed — it means "menu" and the container is not one | Already broken | §4.1 | 2.3 |
| D-35 | `hidden` replaced by `visibility: hidden` + `inert`; `hidden` measures `scrollHeight: 0` | Platform constraint | §4.1 | 2.3 |
| D-36 | Roving tabindex added — 2.2 shipped 23 tabs all in the tab order | Already broken | §3.2 | 2.3 |
| D-37 | Two-tap touch pattern dropped — undocumented, and the chevron button makes it redundant | Spec error | §4.1 | 2.3 |
| D-38 | `js-standards` forbids `element.style.*`; a measured height needs one custom property | Standards conflict | §6 | 2.3 |
| D-39 | Figma draws a chevron on all 7 drawer root rows; only the 5 that push ship | Design oversight | §4.4 | 2.4 |
| D-40 | PRD's scroll lock splices two techniques; `overflow:hidden` only, no restore, no `padding-right` | Spec error | §4.4 | 2.4 |
| D-41 | Drawer backdrop is ~20% black; the old drawer used `bg-black/50` | Measurement | §2.2 | 2.4 |
| D-42 | Drawer footer is 110/padding 20 on level-2 but 106/18 on root; ship 110/20 | Measurement conflict | §2.2 | 2.4 |
| D-43 | Promo card made fluid; the 352px moved onto the desktop pane | Structural | §5.6 | 2.4 |
| D-44 | `100vh` is `lvh` and clips behind the mobile toolbar; use `100dvh` | Platform constraint | §4.4 | 2.4 |
| D-45 | No reusable grouping helper exists; Liquid cannot return values | Spec error | §4.4 | 2.4 |
| D-46 | Chevron inset: node metadata says 2px, rendered ink says 20px; raster wins | Measurement conflict | §2.2 | 2.4 |
| D-47 | `accordion.liquid` hardcoded a 12px chevron; optional `icon_size` added | Missing prerequisite | §6 | 2.4 |

---

## D-1 — The block model exceeds Shopify's 50-block cap

**TDD §3.1** defines ten block types: `rail_item`, `link_group`, `link_item`, `products`,
`bundle_featured`, `bundle_list`, `content_card`, `articles`, `press`, `history_slide`.

**Reality.** Shopify caps a section at **50 blocks**
([theme limits](https://shopify.dev/docs/storefronts/themes/architecture/limits)). Across the
design's 23 rail rows, §3.1's model computes to roughly **134** — Shop By Need alone reaches ~91.
The design as specified could not be built in one section.

**Resolution.** Two changes bring it to ~25:

1. Chips and trending links become **`richtext` settings** holding multiple `<a>` tags rather than
   `link_group` / `link_item` blocks. Shopify's `richtext` supports `<a>` with href and gives
   merchants a link button, so each line carries its own URL. Removes ~63 blocks.
2. Every **one-picker-per-rail** pane — `products`, `bundle_list`, `articles`, `press`,
   `bundle_featured` — becomes a setting on `rail_item` rather than its own block type. None of
   them repeat within a pane, so none needed to be blocks.

Two block types survive: **`rail_item` (×23)** and **`content_card` (×2)**. The §3 ordering rule is
unchanged and still governs `content_card`.

**Cost.** Merchants lose the `url` picker for chips and trending links — richtext's link button is
a free-text field. Accepted: chips are uniform and carry no per-item settings, and a `chip_color`
setting on `rail_item` covers the whole group.

**Owner:** 2.2 · **Verified:** Shopify docs + block count from the design's rail rows

### As-built — confirmed 2026-08-16 by 2.2

The model shipped exactly as resolved above, with one addition forced by **D-26**.

| | Planned | Shipped |
|---|---|---|
| Block types | 2 | **2** — `rail-item`, `content-card` (kebab-case, per repo convention) |
| Blocks in a full build | ~25 | **25** — 23 `rail-item` + 2 `content-card` |
| `rail-item` settings | ~29 | **31** (the extra two are `rail_parent` per D-26 and `rail_panel_title` per D-31) |
| `content-card` settings | 4 | **4** |

Shopify's cap is **50 blocks per section instance**, re-verified on shopify.dev during 2.2 — and it
counts merchant-addable blocks, which is exactly this case. 25 leaves 100% headroom. There is **no
documented cap** on block types per schema or on settings per block type; the only real ceiling is
256 KB for the whole section file, which `sections/header.liquid` does not approach.

⚠️ **One premise of this deviation was overstated.** D-1 says richtext is safe because Shopify
sanitises it to a nine-tag list. That list documents what may appear in a schema's **`default`
attribute** — shopify.dev does not describe it as a runtime sanitisation whitelist, and it **omits
`<ul>`**, which richtext's bullet-list button emits. Rendering richtext unescaped is still correct and
is what this theme already does, but see D-29 for the layout consequence.

### Appended at 3.4 — `rail_read_label` is a 32nd `rail-item` setting

2.2 added **`rail_read_label`** (`text`, default `"Read More"`) beyond the ~29 the TDD implies, taking
`rail-item` to **32 settings**. It exists because `snippets/article-card.liquid` requires a
caller-supplied `read_label` with **no default of its own**, and Sprint §6 forbids modifying that card —
so the Media panel's Blogs pane has to source the string from somewhere. A rail-level setting was chosen
over hardcoding "Read" inside the pane, matching how `featured-blogs.liquid:47-50` and `blog.liquid:14`
already pass it from a section setting.

3.4 is the first and only consumer. The block count is unchanged at **25**, so the 50-block cap and the
256 KB section ceiling are both untouched.

The PRD required this note; it is recorded here rather than in the TDD, which stays frozen.

---

## D-2 — Mobile header is 66px, not "59 px status row plus 66 px header row"

**TDD §2.2** records `header-height` as "110 px desktop. Mobile is a 59 px status row plus a 66 px
header row."

**Reality.** The 59px node is `389:28439 Navigation Bar`, whose only child is an instance named
`Navigation Bar Background` — an **iOS device status bar in the mock**, not a header row. The
scrolled mobile frame `389:31160` places the header instance at y=0 with nothing above it.

Corroborated by the project's own prior work: `docs/roadmap-homepage/DEFINITION-OF-DONE.md` already excludes
node `108:10685` from the homepage extraction as "an iOS status-bar mock", the same artefact class.

**Resolution.** The mobile header is **66px**: `padding-inline: 20px`, `padding-bottom: 8px`,
bottom-aligned, 58px logo, 24px icons at `gap: 20px`. Building the 59px row would ship a defect.

**Owner:** 2.1 · **Verified:** `389:28439`, `389:31160`, homepage DoD

---

## D-3 — Drawer row is 52px, not 48 (closes F2)

**TDD §2.2** gives `drawer-row` as "48 px tall, padding 14 and 20". **§7 F2** asks for one value,
noting rows measure 48, 50 and 53 across frames.

**Reality.** Measured row `389:28390` is `padding: 14px 20px` around a label with a 24px
line-height. 14 + 24 + 14 = **52**. §2.2's stated height contradicts the padding in its own row.

**Resolution.** 52px. **F2 closed.**

**Owner:** 2.4 · **Verified:** `389:28390`

---

## D-4 — Chips are `#fde047` fill with no border (closes F1)

**TDD §2.2** records `chip-border #EAB308` for "borders on lifestyle chips and small icon tiles".
**§7 F1** asks whether that yellow is intentional given its closeness to `#F4C430` and `#FACC15`.

**Reality.** The measured chip `389:22850` carries `background: #fde047`, `border-radius: 100px`,
`padding: 8px 16px` — and **no stroke at all**. `#fde047` is a **fourth yellow**, recorded nowhere
in §2.1 or §2.2, so the chip's actual fill token was missing from the TDD entirely.

**Resolution.** Chip fill is `#fde047`, exposed as a `chip_color` setting defaulting to that value.
The `#EAB308` border does not ship. **F1 closed.**

**Owner:** 3.1 · **Verified:** `389:22850`

---

## D-5 — Nav label is DM Sans Medium 18/27 (closes F4)

**TDD §2.2** gives `nav-label` as DM Sans Medium 18. **§7 F4** asks to confirm 18 against the
homepage's recorded 16.

**Reality.** Header instance `389:23215` measures **18px / 27px line-height**, `#171717`. The TDD is
right — but this is a **live change**, not a confirmation: `snippets/header-desktop.liquid:47`
currently ships `text-[16px]/[24px]`.

**Resolution.** 18/27. **F4 closed.**

**Owner:** 2.1 · **Verified:** `389:23215`, `header-desktop.liquid:47`

---

## D-6 — The account icon ships

**TDD §1** excludes "Customer accounts, which do not appear in the design."

**Reality.** The icon ships today at `snippets/header-desktop.liquid:182` and the drawer link at
`snippets/header-mobile.liquid:170`.

**Resolution.** Client decision, 2026-08-16: the account icon **stays** on both viewports. Its
absence from the design is Figma negligence, not a requirement. Not a defect at design QA.

**Owner:** 2.1 · **Source:** client decision

---

## D-7 — The history carousel is cancelled

**TDD §5.4** specifies "an Embla carousel with peeking slides either side", **§6** lists a history
carousel component, **§3.1** defines a `history_slide` block, and **§7 D7** requires carousel
imagery.

**Reality.** Client decision, 2026-08-16: **one timeline thumbnail**. The desktop frame `389:24807`
supports this — a single image, the caption "The Origin", one "Check History" CTA, with no arrows
and no dots. The faint shapes either side are `decor-shape #D9D9D9`, decoration rather than peeking
slides.

**Resolution.** No carousel, no Embla dependency, no `history_slide` block. History becomes
`history_image` + `history_caption` + `history_year` on `rail_item`. D7 reduces to one image.

**Owner:** 3.3 · **Source:** client decision, corroborated by `389:24807`

### ✅ Confirmed as built at 3.3 — with one correction

The cancellation itself is confirmed: no carousel, no Embla reference, no `history_slide` block type,
grep-verified across every file 3.3 touched. History is `rail_history_image` + `rail_history_cap` +
`rail_history_year` exactly as resolved.

⛔ **But the sentence above — "The faint shapes either side are `decor-shape #D9D9D9`, decoration rather
than peeking slides" — is wrong.** Node `389:24825` is a **text node named "Giant Year Number"**, sitting
in a frame named "Milestone-1930":

```
Space Grotesk Bold · 320px · tracking -12px · rgba(0,0,0,0.05) · centred · content "1940"
```

It is 1280px wide inside a 524px wrapper, so it overflows and is clipped to the 684 column with the photo
covering its middle. The "shapes" either side are the **shoulders of the numerals**. Two consequences:

- **`rail_history_year` is a live setting, not decoration-adjacent.** It supplies this numeral.
- The colour is `rgba(0,0,0,0.05)` — shipped as `text-black/5` — **not** the `decor-shape` token. See
  **D-73**: that token now has no consumer anywhere in the sprint.

The frame is named 1930 while the text reads 1940 — stale layer names, as design-context.md warns.

---

## D-8 — `product-card` has no Add-to-Cart prop

**TDD §6** describes product-card as reused "with Add to Cart hidden through a prop rather than a
new variant", written as though the prop exists.

**Reality.** `snippets/product-card.liquid:261` renders `{% render 'add-to-cart-button' %}`
**unconditionally**. The snippet's only parameters are `show_featured_image`, `hide_price`,
`lazy_load` and `card_class`.

The prop must be built, and the snippet has **7 live call sites** — verified by grep:
`collection`, `search`, `product-recommendations`, `recently-viewed-products`,
`featured-collection`, `featured-products`, `tabbed-product-collection`. All keep their button.

**Resolution.** 1.1 adds `hide_add_to_cart`, defaulting to `false`. Its deliverable is mostly
regression proof across those seven sections.

**Owner:** 1.1 · **Verified:** `product-card.liquid:261`, grep of call sites

### Closed 2026-08-16 by 1.1 — with one correction to the PRD's stated approach

`hide_add_to_cart` ships, defaulting to false. 6 inserted lines in `snippets/product-card.liquid`,
no other file touched, theme check 134 / 0.

⚠️ **PRD 1.1's Approach said *"wrap the render at line 261 in an `unless`"* — that would have failed
the PRD's own AC #3** (*"no trailing margin, gap or reserved height remains"*). The button's wrapper
`<div class="relative z-[4] mt-auto">` is a flex child of a `gap-2.5 lg:gap-3.5` column. Leaving it
empty still emits the parent's gap — **0.625rem = 10px mobile, 0.875rem = 14px desktop**, both
confirmed in `assets/tailwind.css`. **The `unless` must wrap the whole wrapper**, so one flex child
remains and no gap is emitted. This also answers the PRD's own open question about a stray `mt-*`:
it is `mt-auto`, on the wrapper.

**Whitespace control is asymmetric, deliberately.** `{% unless … -%}` / `{%- endunless %}` rather than
symmetric `{%- … -%}`. Symmetric stripping deletes the newline + indent before the wrapper and changes
the rendered bytes, breaking the byte-identical criterion. The opening tag's own indent substitutes
for the wrapper's. Proven by zero diff.

**Regression: 5 of 7 call sites measured**, 38 cards byte-identical. `product-recommendations` and
`featured-collection` are structurally unreachable on the dev server and are covered by code-path
equivalence only — see `status-log.md`.

---

## D-9 — No shared Embla init module exists

**TDD §6** says the history carousel "Reuses the shared Embla init module."

**Reality.** No such module exists. Homepage PRD 0.6 vendored `embla-carousel.umd.js` and the
autoplay plugin into `snippets/core-assets.liquid:18-19`; every carousel section ships its own JS
calling `window.EmblaCarousel` directly — `featured-blogs.js`, `featured-discounts.js`,
`featured-products.js`.

**Resolution.** Moot for this sprint once D-7 removes the only carousel. Recorded so §6's claim is
not trusted by a future sprint.

**Owner:** 3.3 · **Verified:** `core-assets.liquid:18-19`, `assets/*.js`

### ✅ Confirmed as built at 3.3

Nothing in `nav-content-card.liquid`, `mega-menu-pane-about.liquid`, `mega-menu-pane.liquid`,
`drawer-panel.liquid`, `sections/header.liquid` or `sections/header-group.json` references `Embla`,
`EmblaCarousel` or `history_slide`. The About panel ships **no JavaScript at all** — it is static content,
and `header-javascript.js` already owns every panel interaction. No shared init module was needed because
no carousel exists.

---

## D-10 — The chevron icon already exists

**TDD §6** lists "chevron icon" as a new component.

**Reality.** `snippets/icon-chevron-down.liquid` ships and is already rendered at
`snippets/header-desktop.liquid:54`.

**Resolution.** Reuse. No new icon snippet. `snippets/accordion.liquid` is likewise already
available for the drawer's level-2 rail rows.

**Owner:** 2.1 · **Verified:** `snippets/`, `header-desktop.liquid:54`

---

## D-11 — The subscribe extraction rewrites the section body

**TDD §1** says Subscribe and Save is "extracted into a shared snippet; the existing homepage
section is not modified", repeated in **§6** and **§7 D5**.

**Reality.** Two problems. Extracting markup **necessarily** edits
`sections/subscribe-letter.liquid` (305 lines) — the section must render the snippet. And the two
renders are different layouts, not the same markup in a narrower box:

| | Homepage band | Menu card (`389:23655`) |
|---|---|---|
| Shape | wide 2-column band | 352px column, `radius 20`, `padding 24` |
| Logo | yes | **no** |
| Subtitle | "On your monthly essentials" | **none** |
| Benefits | 2 × 2 grid | 4 × 1 stack, `gap 18` |

**Resolution.** Read §1 as *schema and rendered output unchanged*, which is 1.2's acceptance gate —
the section's `{% schema %}` is untouched and its DOM must be byte-identical before and after. The
snippet takes a `layout: 'band' | 'card'` parameter.

**Owner:** 1.2 · **Verified:** `sections/subscribe-letter.liquid`, `389:23655`

### Closed 2026-08-16 by 1.2 — with three corrections

`snippets/subscribe-save.liquid` ships with `layout: 'band' | 'card'`. The section's schema is
untouched (0 schema lines changed) and its body is one `{% render %}`.

**Correction 1 — the PRD's band description was incomplete.** It described band as "logo, subtitle,
2×2 benefit grid". The real section also carries background video (desktop + mobile), background
image (desktop + mobile), a merchant-editable gradient, four margin ranges driving CSS custom
properties, and a `page-width` wrapper. Taken literally, *"body replaced by a `{% render %}`"* would
have forced ~14 parameters the card never uses. **Resolution:** the section keeps its outer wrapper,
media and painted box; the snippet owns `.subscribe-letter__grid` and inward. Band needs 5 params.

**Correction 2 — "the benefit rows are identical between layouts" is false.** Band rows come from
`snippets/usp-item.liquid`, which reads `block.settings.*` and `block.shopify_attributes` with **no
blank guard on `block` itself**. Handed a metaobject, every `block.settings.*` resolves to nil and its
internal `!= blank` guards silently suppress all three fields — rendering an **empty tile, no error**.
`usp-item` is out of scope, so the card carries its own row markup. What the layouts genuinely share
is the `newsletter-form` call and the headline → benefits → form order.

**Correction 3 — content source changed to a metaobject.** Per user decision the card's copy comes
from the `subscribe_save` metaobject, not section settings or blocks, so it costs **zero section
blocks** — protecting the ~25-of-50 budget D-1 exists to defend. The homepage keeps its settings and
`usp-item` blocks untouched, which is what preserves the schema and the output.

---

## D-20 — `{% doc %}` emits an unstrippable newline, so byte-identity and liquid-standards conflict

**PRD 1.2 AC** requires the homepage `subscribe-letter` DOM to be byte-identical after the refactor.
**`liquid-standards`** requires every snippet to carry a `{% doc %}` block.

**Reality.** `{% doc %}` emits **one leading newline that whitespace control cannot remove** — it is
tag output, not literal template text, so neither `{%- liquid` nor `{%- if … -%}` strips it. Proven by
bisection against a raw byte-exact baseline (8145 bytes, stable across two captures):

| Snippet state | Delta |
|---|---|
| With `{% doc %}` | **+1 byte** |
| `{% doc %}` removed | **0 — byte-identical** |
| `{% doc %}` restored | +1 byte |

The single difference is a newline between `>` and `<div class="subscribe-letter__grid">`.

**Resolution.** The user chose to **keep the doc block**. The snippet has a 7-parameter, two-layout
interface that needs documenting, and the cost is one insignificant whitespace text node between block
elements — the parent `.subscribe-letter__card` is a plain block container, so there is no layout or
visual effect. **AC "byte-identical" is scored "identical apart from one whitespace node", not met.**

**Applies to every future snippet extraction in this theme**, not just 1.2 — any refactor that moves
existing markup into a new snippet will shift output by one newline. Do not treat that as a
regression, and do not delete a `{% doc %}` block to chase a byte count.

**Owner:** 1.2 · **Verified:** bisection on the dev server, 2026-08-16

---

## D-21 — the card gradient is 3-stop, not 5; `design-context.md` is wrong

**PRD 1.2** specifies a **five-stop** radial gradient
(`#f4c430 → #b3a42f 21% → #92942f 32% → #72832f 42% → #466e2e 77%`) and makes it an acceptance
criterion. It inherited that from **`design-context.md:216`**, which records five stops.

**Reality.** The actual Figma fill has **three** stops. Confirmed by the user extracting it directly
from the file. The authoritative value, used verbatim in the card branch:

```css
background: radial-gradient(135.51% 688.23% at -26.7% -28.57%, #F4C430 0%, #72842F 42.43%, #466E2E 77.41%);
```

Two details deliberately preserved, so nobody "corrects" them later: `#72842F` (not `#72832F`, which
is what both the homepage default and the extraction say), and stops at `42.43%` / `77.41%` rather
than `42%` / `77%`.

**Consequence beyond 1.2.** `design-context.md` also drives **3.2, 3.3 and 3.4**. One of its measured
values is now known wrong, so its other values should be spot-checked against Figma rather than
trusted outright.

**Owner:** 1.2 · **Verified:** user extraction from `389:23655`, 2026-08-16

---

## D-12 — Only 7 rail icons exist, not 23

**TDD §3.2** gives every `rail_item` a `rail_icon`, and **§7 D6** asks for "rail icons supplied, one
per rail item" — implying 23.

**Reality.** Measured across all 17 frames, **only the Shop By Need rail renders icons** — 7, at
18px. The Categories, Combo, About and Media rails carry labels only.

**Resolution.** Seven icons. `rail_icon` stays optional in the schema, and an unset icon must leave
no gap. Separately, `image_picker` + SVG is **unproven** — Shopify's documented theme image formats
are JPEG, Progressive JPEG, PNG, GIF, HEIC and WebP, and SVG cannot pass `image_url` transforms.
0.5 opens with a spike and carries an `asset_url` fallback.

**Owner:** 0.2 · **Verified:** all 17 frames in the extraction; Shopify image format docs

### Spike result — appended 2026-08-16 by 0.2: **SVG in `image_picker` WORKS**

The spike ran twice, and the second run is the stronger evidence.

**1. Direct test.** An 18px SVG uploaded to Shopify Files via `stagedUploadsCreate` → POST →
`fileCreate` came back as `__typename: MediaImage`, `fileStatus: READY`, `mimeType: image/svg+xml`,
`width: 18`, `height: 18`, with a working CDN URL — **not** a `GenericFile`. Since `image_picker`
enumerates MediaImage files, SVG is selectable. Test file deleted.

**2. Already in production in this theme** — this closes the "editor UI not visually confirmed"
caveat outright. Three live settings are declared `"type": "image_picker"` and hold SVG values:

| Setting | File | Stored value |
|---|---|---|
| `usp_icon` | `sections/footer.liquid` | `shopify://shop_images/footer-usp-free-shipping.svg` |
| `social_icon` | `sections/footer.liquid` | `shopify://shop_images/footer-social-instagram.svg` |
| `discount_leaf_image` | `sections/featured-discounts.liquid` | `shopify://shop_images/leaf.svg` |

`shopify://shop_images/…` is exactly the format an `image_picker` stores. A merchant could not have
set these unless the picker listed SVGs. **The `asset_url` fallback was never needed and was not
built.** All 7 icons ship in Shopify Files only.

**Delivered:** 7 icons, `rail-icon-{handle}.svg`, registry in `status-log.md`. Zero theme files
changed — nothing in `assets/`.

**New constraint discovered, carried to 4.1:** `image_picker` supports no `default` and is not
populated by presets, so the rail ships with 7 blank icons until a merchant picks them.

---

## D-13 — Chevrons ship in the scrolled state

**TDD §4.3** flags that "the scrolled design frame was not updated with the chevrons and still shows
plain labels", and confirms it as a design oversight.

**Reality.** Confirmed against `389:29163` — the scrolled desktop frame shows plain labels.

**Resolution.** The built header keeps chevrons in **every** state, including scrolled. Not a defect
at design QA. Carried here rather than left as a TDD footnote so 4.3 has it in one place with the
other five approved deviations.

**Owner:** 2.1 · **Source:** TDD §4.3, verified against `389:29163`

---

## D-14 — 19 collections is 16 (and the PRD contradicts itself)

**PRD 0.1 §B** requires "19 total" collections and its acceptance criteria say "All 19 collections
exist." **Its own decision 1** recommends sharing the four names that appear in both the Shop By Need
and Categories rails — Cold & Congestion, Rehydration, Grooming, Shop All.

**Reality.** Both cannot hold. 7 + 6 + 6 = 19 *rail entries*; sharing the four duplicates collapses
them to **15 distinct collections**. The new `offers` collection makes **16**.

**Resolution.** 16 collections presenting 19 rail entries. Decision 1 stands as recommended. Any
downstream check that counts 19 collection records will fail incorrectly — count rail entries instead.

**Owner:** 0.1 · **Source:** PRD 0.1 §B vs its own Approach §1, arithmetic verified against the live store

---

## D-15 — 43 demo products were created; the PRD assumed a catalogue that did not exist

**PRD 0.1 §B** sets minimums of ≥6 (Shop By Need), ≥5 (Categories) and ≥3 bundle products (Combo),
and scopes no product creation.

**Reality.** The store held **6 products total**, all tagged `test-data`, all with an empty
`productType`. The minimums were unreachable, and with one shared tag nothing could drive a smart
collection at all. Satisfying the numbers by putting all 6 into every collection would have made
every rail render identical cards.

**Resolution.** A tag taxonomy was defined and **43 products created** (33 single, 10 bundle),
bringing the catalogue to 49. Product creation is therefore new scope inside 0.1. Every fixture
product carries `test-data`, so the whole set is selectable and removable in one filtered query.

The count rose from a ~30 estimate at /clarify because each rail was given a distinct product set —
heavy tag overlap would have made Shop By Need and Categories near-identical, defeating the purpose.

**Owner:** 0.1 · **Source:** live store query, 2026-08-16

---

## D-16 — Decision 4's evidence was wrong; the outcome stands

**PRD 0.1 Approach §4** recommends the panel frames' top-level order "since five frames agree against
one, and the scrolled frame is already known to be stale."

**Reality.** Verified by pixel scan of the extraction, **two** frames disagree with the panel frames,
not one:

- `figma-nav-scrolled-desktop.png` — `… About · Track Order · Media` (the known-stale frame)
- **`figma-drawer-root-mobile.png` (`389:28380`) — `… About · Track Order · Blogs`**, and it is the
  *only* mobile root frame, not a stale duplicate

So it is five panel frames against two.

**Resolution.** The order chosen is unchanged — **Shop By Need · Categories · Combo · Offers · About ·
Media · Track Order**, as built in `navigation-main`. Only the justification is corrected: it rests on
the panel frames being the frames the panels are built from, not on an uncontested 5-to-1 majority.

**Also recorded:** the mobile drawer frame renders a chevron on **all seven** rows, including Offers
and Track Order, which PRD 0.1 §D requires to have zero children and therefore no chevron. The design
is self-inconsistent here. 0.1 set the child counts to zero; **2.4 owns the rendering consequence**,
and 4.3 should not raise it as a fresh fidelity defect.

**Owner:** 0.1 (data) → 2.4 (rendering) · **Source:** `.buildspace/artifacts/navigation/screenshots/`

---

## D-17 — `product-card.liquid` ignores `rating_value` and `review_count`

**Expectation.** New products were to carry `custom.rating_value` and `custom.review_count` "for
`product-card` parity" with the six homepage products.

**Reality.** `snippets/product-card.liquid:89-91` hardcodes `card_rating_value = 4.7` and
`card_rating_count = 132` for **every** product and never reads either metafield. Neither has a
metafield definition either — they exist only as untyped values.

**Resolution.** All 49 products carry both, matching the existing six, but **the values change nothing
on screen** under current code. No claim of rating fidelity may rest on them until the snippet is
fixed. Not fixed here — `product-card.liquid` is 1.1's file and has 7 live call sites.

**Owner:** unassigned — flag for 1.1 · **Source:** `snippets/product-card.liquid:89-91`

---

## D-18 — nothing renders `custom.publisher`

**PRD 0.1 §C** requires each News & Events article to carry `custom.publisher`, and
`design-context.md:206` describes a green publication name on the press card.

**Reality.** `snippets/article-card.liquid` reads only `category_label`,
`category_background_color`, `category_text_color` and `read_time`. There is no publisher markup
anywhere in the theme.

**Resolution.** The definition and all three values are in place — correct forward-looking data work.
The press card that consumes them is built in **3.4**. Consequently 0.1's edge case "press card must
not print an empty green line" could not be tested, because no such markup exists yet.

**Owner:** 3.4 · **Source:** `snippets/article-card.liquid`

---

## D-19 — `snippets/image.liquid` does **not** break SVG; PRD 0.2's constraint is false

**PRD 0.2 Approach** states: *"Because `image_url` cannot transform an SVG, the rail renders a plain
`<img>`. Do **not** route it through `snippets/image.liquid`, which builds a `<picture>` with WebP
srcsets and **will produce broken output**."* The same claim seeds the PRD's Constraints list.

**Reality.** `snippets/image.liquid` has no SVG guard — it applies `image_url: format: 'webp'`
unconditionally (lines 68, 86, 105, 120-124) — and the homepage and footer already push SVGs through
it in production. Rendered from the dev server:

```html
<img src="/cdn/shop/files/leaf.svg?format=webp&quality=80&v=1786548592&width=1440" width="64" height="64">
```

Fetched against the CDN:

| URL | HTTP | Content-Type | Bytes |
|---|---|---|---|
| `leaf.svg?format=webp&quality=80&width=1440` | 200 | `image/svg+xml` | **621** |
| `leaf.svg` (untransformed) | 200 | `image/svg+xml` | **621** |
| `footer-usp-free-shipping.svg?format=webp&width=80` | 200 | `image/svg+xml` | 311 |

**Byte-identical.** Shopify silently ignores transform parameters on SVG and serves the original. The
first half of the PRD's claim is right — `image_url` cannot transform an SVG — but the conclusion is
wrong: it degrades gracefully, and the output is not broken.

**Resolution.** A plain `<img>` remains the correct render path for an 18px rail icon, but the reason
is **needless markup overhead**, not breakage: `image.liquid` would emit multiple `<source>` elements
whose srcsets are all the same URL, plus a meaningless `responsive_widths`. **2.2 must not be told
`image.liquid` breaks SVG** — that is false, and would misinform anyone re-weighing the trade-off.

Useful detail for 2.2: `image.liquid` emits `width`/`height` from the image's **intrinsic** size.
These icons are intrinsically 18×18, so it would emit `width="18" height="18"` naturally.

**Owner:** 0.2 (finding) → 2.2 (render path) · **Verified:** dev-server render + CDN fetches, 2026-08-16

---

## D-22 — Space Grotesk 600 is never loaded, so `font-semibold` renders at 700

**Design** specifies the Subscribe & Save card headline as **Space Grotesk 600** (`design-context.md`
§Subscribe & Save banner), and PRD 1.2 carries it as a requirement.

**Reality.** `snippets/css-variables.liquid` builds **only two** primary faces:

```
12:  assign font_primary_500 = font_primary | font_modify: 'weight', '500' …
13:  assign font_primary_700 = font_primary | font_modify: 'weight', '700' …
22:  {{ font_primary_500 | font_face: font_display: 'swap' }}
23:  {{ font_primary_700 | font_face: font_display: 'swap' }}
```

There is no `font_primary_600`. The configured family is `space_grotesk_n4`
(`config/settings_data.json:3`). With no 600 face available, CSS font matching substitutes **upward to
700**, so any `font-primary font-semibold` element renders heavier than specified.

**Not introduced by 1.2 — this is theme-wide.** Three call sites combine the two utilities:

- `sections/tabbed-product-collection.liquid:47`
- `sections/footer.liquid:73`
- `snippets/subscribe-save.liquid:92` (the 1.2 card headline)

The first two ship on the live homepage today and have the same substitution.

**Resolution — deferred, and deliberately not fixed in 1.2.** The fix is one line in
`css-variables.liquid` (add `font_primary_600` and emit its `font_face`), but that is a global file:
it changes primary-font rendering for every section using `font-semibold`, adds a font request to
every page, and is far outside 1.2's blast radius. Space Grotesk does offer a 600 in Shopify's font
library, so the gap is closable whenever typography is next owned.

⚠️ **4.3 must not raise this as a new fidelity defect against the mega-menu** — it predates the
navigation sprint and affects the homepage identically. Whoever fixes it should re-check all three
call sites, since two of them may have been visually signed off at the substituted weight.

**Owner:** unowned — raise at 4.3 or whenever typography is next touched
**Verified:** `css-variables.liquid:12-13, 22-23`, `settings_data.json:3`, and the three call sites, 2026-08-16

---

## D-23 — a sentinel inside the sticky header group can never trigger; rAF throttle shipped

**PRD 2.1** prefers *"a zero-height sentinel before the header plus `IntersectionObserver` over a
scroll listener"*, and the plan specified exactly that.

**Reality.** `assets/base.css` makes `.shopify-section-group-header-group` `position: sticky`. Any
sentinel rendered by `sections/header.liquid` therefore sits **inside a sticky container**, is pinned
along with the header, and never leaves the viewport. Proven empirically: at `scrollY 900` the sentinel
still intersected and the state attribute never flipped.

Removing sticky from the wrapper does not rescue it — the header's containing block would then be only
~110px tall, so `position: sticky` on the header would release almost immediately.

**Resolution.** A `requestAnimationFrame`-throttled `scroll` handler, which PRD 2.1 explicitly permits
(*"`IntersectionObserver` **or** a throttle"*) and which matches the rAF precedent at
`assets/collection.js:328-335`. The handler coalesces to one callback per frame, so the AC *"no
unthrottled scroll listener ships"* is met. The sentinel was deleted rather than left as dead markup.

⚠️ **The "sentinel above the header" decision recorded for 2.1 is superseded — there is no sentinel.**
Any later PRD wanting scroll-position detection in the header should reuse this handler, not
reintroduce a sentinel.

**Owner:** 2.1 · **Verified:** in-browser, 2026-08-16

---

## D-24 — the header does not shrink on scroll

**Figma** gives two different bars: resting `389:23215` is **110px with a 100px logo**; scrolled
`389:29164` is **80px with a 60px logo**. PRD 2.1 never mentions the change and states *"zero layout
shift"* as an acceptance criterion.

**Resolution.** User decision at /clarify: **background change only**. The bar stays 110px with a
100px logo in both states; only the background and backdrop-filter change.

⚠️ **4.3 will see a scrolled desktop bar 30px taller than the design, with a logo 40px larger. This is
accepted scope, not a defect.** If the shrink is ever wanted, note that it does not actually threaten
CLS — the header is `position: sticky` and thus out of flow once stuck, so resizing it would not reflow
page content.

**Owner:** 2.1 · **Source:** clarify Decision 1, from measured Figma values

---

## D-25 — `backdrop-filter` on the header root trapped the fixed mobile drawer

**Symptom.** With the scrolled state active on mobile, opening the menu drawer rendered it transparent
and mis-sized — page content showed straight through it. At the top of the page it was fine.

**Cause.** `backdrop-filter` makes an element a **containing block for `position: fixed` descendants**,
exactly as `transform` and `filter` do. `snippets/header-mobile.liquid`'s drawer is
`fixed inset-0 z-50` and lives **inside** `<header>`. The moment `data-header-scrolled="true"` applied
`backdrop-filter: blur(22px)` to the header root, the drawer stopped resolving against the viewport
and was confined to the header's 66px box. Unscrolled there is no `backdrop-filter`, which is why the
bug only appeared after scrolling.

**Resolution.** The blur never goes on the header root. The scrolled background and blur are applied to
the **bars** — `.menu-desktop` and `.menu-mobile__bar` — which are **siblings** of the drawer, not
ancestors (verified: balanced div nesting between them). The header root instead becomes
`background-color: transparent` when scrolled, so the translucent bars composite against page content.
A new `.menu-mobile__bar` class was added purely as the styling hook.

⚠️ **Applies to any future header effect.** Adding `transform`, `filter` or `backdrop-filter` to
`<header>` — or to `.shopify-section-group-header-group` — will break the drawer the same way. Put such
effects on the bars.

**Owner:** 2.1 · **Verified:** in-browser; `headerBackdrop: none`, `barBackdrop: blur(22px)`, 2026-08-16

---

## D-26 — `menu_handle` alone cannot identify a rail; the key must be composite

**PRD 2.2:39** keys `rail_item` on a single `menu_handle` matched against the menu.

**Reality.** Queried live from `navigation-main` and confirmed by rendering `link.handle` on the dev
server: **four child titles are duplicated across two parents.**

| Child handle | Under `shop-by-need` | Under `categories` |
|---|---|---|
| `cold-congestion` | ✓ | ✓ |
| `rehydration` | ✓ | ✓ |
| `grooming` | ✓ | ✓ |
| `shop-all` | ✓ | ✓ |

`link.handle` is handleized from the title, so all four collide. Keying on `menu_handle` alone would
bind each of those blocks into **both** panels — and the panels genuinely differ, since only the Shop
By Need rail carries icons (D-12).

**Resolution.** A composite key. `rail_parent` holds the top-level handle, `rail_menu_handle` the
child handle; a block binds only when **both** match. Costs one `text` setting, keeps the build at 25
blocks, and survives menu reordering. Verified in-browser: 23 rail rows render, each in exactly one
panel.

**Owner:** 2.2 · **Verified:** Admin GraphQL + `link.handle` dumped from the dev server, 2026-08-16

---

## D-27 — an undocumented 1px `#e5e5e5` hairline sits at the panel top edge

**Neither** `design-context.md` nor PRD 2.2 mentions any border on the panel container.

**Reality.** Measured on all five desktop panel screenshots at 2×: a **1px `rgb(229,229,229)`
hairline, full-bleed `x:0→1440`, at `y=116`** — the panel's top edge. No antialiasing; the colour is
exact. The active nav underline paints **over** it and replaces it across its own x-span.

**Resolution.** Shipped as `border-t border-[#e5e5e5]` on `.mega-menu`. Verified in-browser:
`borderTopWidth: 1px`, `borderTopColor: rgb(229, 229, 229)`.

**This also partly resolves the `panel-border #A3A3A3` open item.** There is no `#a3a3a3` border on
the dropdown container — `#a3a3a3` appears only as the utility strip's `0.5px` top border, exactly as
the extraction suspected. The container's border is `#e5e5e5` and 1px.

**Owner:** 2.2 · **Verified:** pixel scan of 5 frames + in-browser computed style, 2026-08-16

---

## D-28 — the active nav underline is `#F4C430`, not `#facc15`

**`design-context.md:25` and `:65`** give the active top-level underline as `#facc15`.

**Reality.** Measured on **all seven** desktop frames: `rgb(244,196,48)` = **`#F4C430`**, with no
antialiasing on any edge. `#FACC15` is `(250,204,21)` — off by 6/8/27 per channel, far beyond PNG
rounding. This is the **third** confirmed measurement error in that extraction, after D-21 and the
missing desktop scrolled background.

Geometry, for 2.3: the underline is **3px** tall at `y:114→117` on six frames and **4px** at
`y:113→117` on `figma-shop-by-need-desktop.png` — a real difference in the export, not antialiasing.
Its bottom edge is flush with the hairline's bottom in every frame.

**Resolution.** `config/settings_data.json` already carries the correct value as
**`color_accent: #F4C430`**. `color_brand_yellow` is `#facc15` and is **the wrong token for this
panel** — do not reach for `--color-brand-yellow`. Nothing has shipped wrong: the underline is 2.3's
to build and does not exist yet.

**Owner:** 2.2 (finding) → 2.3 (render) · **Verified:** pixel scan of 7 frames, 2026-08-16

---

## D-29 — chips and links do not share a gap

**PRD 2.2:58 and :103** treat `group_a_style: chips | links` as one wrapper at `gap 12`.

**Reality.** Two independent sources agree. Figma node metadata: the lifestyle tabs run `0→118` with
the next at `130` (**gap 12**), while the trending items sit at `0 / 71 / 199 / 322` against widths
`55 / 112 / 107` (**gap 16**). `design-context.md:132` says the same. A single `gap-3` would render
the links variant 4px tight.

**Resolution.** `gap-3` (12px) for `chips`, `gap-4` (16px) for `links`, branched inside
`snippets/mega-menu-group.liquid`. Verified in-browser: chip gap **12.0**, link gap **16.0**.

**Related — the PRD's `[&_p]:contents` is insufficient.** Richtext's editor exposes a bullet-list
button whose output is `<ul><li><a>`, which `[&_p]:contents` never reaches, producing exactly the
vertical stacking the PRD warns about. Shipped as `[&_p]:contents [&_ul]:contents [&_li]:contents`.

**Owner:** 2.2 · **Verified:** Figma node metadata + in-browser measurement, 2026-08-16

---

## D-30 — Figma places the panel 6px below a 110px header; we render flush

**PRD 2.2:42** requires the panel to open at **y=116**.

**Reality.** In the panel frames the header instance (`389:23215`) is **1440 × 110** — matching what
2.1 shipped — while `MegaMenuDropdown` (`389:22804`) starts at **y=116**. Independently confirmed by
pixel scan: the nav icons and labels centre on **y=55.0**, exactly half of 110. So the header really
is 110px and Figma leaves a **6px gap**, not a taller bar. The band is not empty — it carries a faint
upward-fading shadow (252–254 against 255) and, in the active item's x-range, the underline.

**Resolution.** The panel is positioned `top-full` against the sticky `<header>`, so it sits **flush
at y=110**. Declaring `top-[116px]` would hardcode one header height and break the moment 4.3 revisits
the bar. Verified in-browser: `headerH: 110`, `panelY: 110`.

**Not carried:** the 6px shadow band. It is a ~1.2% darkening over 6px and neither the PRD nor
`design-context.md` mentions it. If 4.3 wants it, it is a `shadow-[0_-2px_6px_rgba(0,0,0,0.02)]` on
`.mega-menu`.

**Owner:** 2.2 · **Verified:** Figma node metadata + pixel scan + in-browser, 2026-08-16

---

## D-31 — the rail has a panel title the PRD never mentions

**PRD 2.2** lists no heading for the rail; its `rail_item` settings jump straight to `rail_label`.

**Reality.** Figma node `389:22807` — "Help Section Title", 136 × 24 — sits above the rail rows at
`y:0`, with the rows container starting at `y:40` (24px title + 16px gap).
`design-context.md:38,103` confirms the face as **Space Grotesk 500 · 16/24 `#171717`** and names all
five strings: **"I need help with…" · "Categories" · "Everyday Combo" · "About" · "Media"**.

Three of those do not match their menu item's title (`Shop By Need`, `Combo`, `Media` → About is the
menu item `About`), so **the title cannot be derived from the menu** — it needs a setting.

**Resolution.** A `rail_panel_title` text setting on `rail-item`, read from the **first bound
rail-item of each panel** and ignored on the rest. This avoids a third block type, which would have
pushed the build to 30 blocks — the ceiling in the PRD's own acceptance criterion.

**Owner:** 2.2 · **Verified:** Figma node metadata + in-browser ("Everyday Combo" renders), 2026-08-16

---

## D-32 — chips are Inter in Figma; Inter is not loaded by this theme

**`design-context.md:40,126`** gives the lifestyle pill label as **Inter 500 14px**, and names four
families in play across the nav: DM Sans, Space Grotesk, Inter and Manrope.

**Reality.** `snippets/css-variables.liquid` loads exactly two families — `type_primary_font`
(Space Grotesk) at weights 500/700 and `type_secondary_font` (DM Sans) at 400/500/600/700. There is no
Inter and no Manrope, and the theme exposes only `--font-primary--family` and
`--font-secondary--family`. Adding a third webfont for five chips is not justified.

**Resolution.** Chips render in **DM Sans 500 14px** (`font-secondary font-medium`), matching every
other body string in the panel.

**Not a D-22 case.** D-22 concerns Space Grotesk **600**, which is genuinely unloaded. Everything this
panel uses — Space Grotesk 500 for headings, DM Sans 500 for labels and chips, DM Sans 600 for
trending links — **is** loaded and renders at the intended weight. Verified in-browser: the rail label
computes to `"DM Sans" 500 16px/22px ls -0.18px`.

**Owner:** 2.2 · **Verified:** `css-variables.liquid` + in-browser computed style, 2026-08-16

---

## D-33 — the trigger splits into a link and a chevron button

**PRD 2.3:97** requires `Enter`/`Space` on the trigger to open the panel. 2.1 shipped the trigger as an
`<a href>` carrying `aria-expanded`.

**Reality.** W3C WAI Fly-out Menus tutorial: *"For situations when the parent menu item needs to carry
out a function, such as linking to a web page, a separate button can be added to the parent item, to
open and close the submenu."* Both APG disclosure-navigation examples do exactly that — `<a href>`
beside `<button aria-expanded aria-controls aria-label>`, never merged. Swallowing `Enter` on a link
removes keyboard users' access to a page mouse users can reach by clicking.

**Resolution.** The chevron becomes a sibling `<button>` carrying `aria-expanded`, `aria-controls` and
an `aria-label` from the new `accessibility.submenu` key ("More Shop By Need pages", matching the APG
example's wording). The `<a>` keeps its `href` and is never intercepted. Costs 5 extra tab stops.

**Owner:** 2.3 · **Verified:** 5 buttons rendered; label click navigates, chevron click toggles

---

## D-34 — `aria-haspopup="true"` announced a menu that does not exist

**2.1 shipped it** on all five chevroned links (`header-desktop.liquid:40`).

**Reality.** MDN: *"`true`: The popup is a menu"* and *"Make sure the role of the element that serves as
the container for the popup content is a `menu`, `listbox`, `tree`, `grid`, or `dialog` and that the
value of `aria-haspopup` matches the role of the popup container."* Our panel is a `<div>` holding a
tablist — none of the five. Neither APG disclosure example uses `aria-haspopup` at all.

**Resolution.** Removed. It also committed us to menu keyboard semantics we do not implement.

**Owner:** 2.3 · **Verified:** `aria-haspopup` appears nowhere in the rendered page

---

## D-35 — the `hidden` attribute made the height animation impossible

**PRD 2.3:57** requires animating to the measured `scrollHeight`. 2.2 shipped panels with the `hidden`
attribute, and `base.css:4` enforces `[hidden] { display: none !important }`.

**Reality, measured:** a panel carrying `hidden` reports **`scrollHeight: 0`**. A `display: none`
element generates no box to interpolate.

**Resolution.** Panels close via `visibility: hidden` + the `inert` attribute. MDN documents
`visibility: hidden` as removing the element from the accessibility tree *and* preventing focus, while
remaining animatable; `inert` (Baseline since April 2023) adds click and find-in-page suppression.
**Panes keep `hidden`** — they swap instantly and must never animate, so `[hidden]` stays load-bearing.

`inert` is a first for this codebase — zero prior occurrences in any `.liquid`, `.js` or `.css`.

**Owner:** 2.3 · **Verified:** closed panel is `inert`, `visibility: hidden`, height 1px; open is 542px

---

## D-36 — 23 rail tabs were all in the tab order

**2.2 shipped** `role="tablist"` / `role="tab"` / `role="tabpanel"` with full `aria-controls` wiring,
but every one of the 23 rail buttons sat in the natural tab order.

**Reality.** APG *Developing a Keyboard Interface*: *"the tab sequence should include only one focusable
element of a composite UI component"*, and *"set `tabindex="0"` on the element that will initially be
included in the tab sequence and set `tabindex="-1"` on all other focusable elements it contains."*
APG Tabs makes Left/Right **required** and Home/End optional.

**Resolution.** Roving tabindex, with `ArrowLeft`/`ArrowRight` **and** `ArrowUp`/`ArrowDown` — the
latter because APG assigns them to tablists with `aria-orientation="vertical"`, which ours is. Home/End
included. Activation is automatic on focus, which APG endorses *"as long as… all panel content is
present in the DOM"* — every pane is pre-rendered, so it qualifies.

**Owner:** 2.3 · **Verified:** exactly 1 tab stop, before and after arrow navigation; wrapping confirmed

---

## D-37 — the two-tap touch pattern is undocumented and now unnecessary

**PRD 2.3:64-66** requires that on touch the first tap opens and the second navigates, detected via
`pointer: coarse`.

**Reality.** Searched w3.org, MDN and web.dev: the two-tap pattern appears in **none** of them. It is an
industry convention, not a standard. Separately, MDN documents that `pointer` reports only the
**primary** input device — a touchscreen laptop reports `fine` — so `any-pointer: coarse` would be
needed to catch hybrids.

**Resolution.** Dropped entirely. D-33's chevron button makes it moot: a touch user taps the chevron to
open and the label to navigate. No pointer detection, no user-agent sniffing, no two-tap state machine
ships.

**Owner:** 2.3 · **Verified:** by construction — no pointer query exists in the shipped JS

---

## D-38 — a runtime-measured height cannot be a CSS class

**`js-standards`** states: *"No `element.style.*` — CSS classes toggled instead"* and *"NO Styling via
JavaScript."*

**Reality.** The panel height is measured at runtime and differs per panel and per pane, so it cannot
be enumerated as a static class. The repo already contains two escape hatches: `accordion.js:19` assigns
`content.style.maxHeight` directly, and `collection.js:74` uses `style.setProperty`.

**Resolution.** JS sets exactly **one** CSS custom property — `--mega-menu-height` via `setProperty` —
and toggles classes for every other state. CSS consumes it with `var()`. This is CLAUDE.md's documented
convention for dynamic values and is deliberately *not* `accordion.js`'s raw layout-property
assignment. The shipped file contains a single `.style.` occurrence.

**Owner:** 2.3 · **Verified:** `grep` — 1 `.style.` and 1 `setProperty`, the same line

---

## D-39 — Figma draws a chevron on all seven drawer root rows

**Reality.** Verified by pixel scan: an identical 10x6 chevron stroke at x 326-335.5, vertically
centred, in **every** root row — including Offers and Track Order, which have no children in
`navigation-main` and therefore no level-2 page to push to.

**Resolution.** Ship **5** chevrons, on the rows that actually push, matching desktop. A chevron that
pushes to an empty page is a broken affordance. Same class as D-13, and the same call 2.1 made.

**Owner:** 2.4 · **Verified:** 5 `<button data-drawer-push>` vs 2 plain `<a>` in the rendered page

---

## D-40 — the PRD's scroll lock splices two incompatible techniques

**PRD 2.4:65-66** says *"use `overflow: hidden` plus a compensating `padding-right` for the scrollbar,
and restore the exact scroll position on close."*

**Reality.** MDN: with `overflow: hidden` *"the element is a scroll container… the hidden overflow
content can be scrolled into view."* It removes the scrolling **UI**, not the offset — so there is
nothing to restore. Scroll save/restore belongs exclusively to `position: fixed; top: -scrollY`.
Separately, MDN on `scrollbar-gutter`: with overlay scrollbars *"no space is reserved for it"* — iOS
Safari and Android Chrome use overlay scrollbars, so a mobile drawer has no layout shift to compensate.

**Resolution.** `document.body.classList.add('overflow-hidden')` and nothing else, matching
`cart-drawer.js`. No restore, no `padding-right`.

**Accepted residual risk.** WebKit closed the classic iOS hole in Safari 26.4, but **bug 240860 is
still open** — scrolling escapes when the visual viewport is smaller than the layout viewport, i.e. on
pinch-zoom and while the software keyboard is open. iOS <=18.x retains the original hole entirely.

**Owner:** 2.4 · **Verified:** MDN + WebKit bug tracker; body lock/unlock confirmed in-browser

---

## D-41 — the drawer backdrop is ~20% black, not 50%

The drawer that shipped before this PRD used `bg-black/50`. Pixel scan of the 30px sliver reads
**RGB(204,204,204)** over white = **20% black**.

**Resolution.** `rgba(0, 0, 0, 0.2)`. **Owner:** 2.4 · **Verified:** computed style

---

## D-42 — the drawer footer height disagrees between frames

Node metadata: root frame `389:28427` is **106px** with 18px padding; level-2 frame `389:30152` is
**110px** with 20px padding. Link pitch is 43 in both.

**Resolution.** Ship **110 / padding 20** — the PRD says 20 and the level-2 frame agrees; the root
frame is the outlier. Measured 110.5 (the half-pixel is the `0.5px` top border).

**Owner:** 2.4 · **Verified:** Figma node metadata for both frames + computed height

---

## D-43 — the promo card became fluid

`subscribe-save.liquid` shipped `w-[352px] shrink-0`. Measured in the drawer, the card is **~320px**
(360 panel − 20px padding each side). A fixed 352 would overflow by 32 and `shrink-0` would prevent it
adapting.

**Resolution.** The card is `w-full`; the **352px moved onto the desktop pane's promo slot** in
`mega-menu-pane.liquid`. One shared snippet, correct in both contexts. Desktop re-measured at 352.

**Owner:** 2.4 (file belongs to 1.2; 3.2/3.3 also consume it) · **Verified:** desktop 352 after the change

---

## D-44 — `100vh` clips behind the mobile toolbar

MDN: *"`vh` is equivalent to `lvh`"* — the **large** viewport. A `100vh` drawer's bottom edge sits
behind the Safari toolbar precisely when the toolbar is visible, which is when the drawer opens.
`svh`/`lvh`/`dvh` are Baseline widely available since 2025-06-05.

**Resolution.** `height: 100dvh` with a preceding `height: 100vh` fallback line.

**Note:** `assets/base.css` also sets `body { min-height: 100vh }` — pre-existing, unrelated to the
drawer, and deliberately not changed here.

**Owner:** 2.4 · **Verified:** MDN

---

## D-45 — no reusable grouping helper exists

**PRD 2.4:54-56** assumes *"the same grouping helper 2.2 built, so nothing is duplicated."*

**Reality.** Liquid snippets cannot return values, so 2.2's block walk lives **inside** the markup of
`mega-menu-panel.liquid`, which emits desktop-specific structure. There is no helper to call.

**Resolution.** `drawer-panel.liquid` performs its own walk — a fourth occurrence, consistent with the
three that already exist (`header.liquid`, `mega-menu-panel.liquid`, `mega-menu-rail.liquid`). What
*is* genuinely reused: `mega-menu-group.liquid`, `button.liquid`, `subscribe-save.liquid`,
`nav-utility-strip.liquid`, `accordion.liquid` and the icon snippets. `panelled_handles` is reused
rather than recomputed.

**Owner:** 2.4 · **Verified:** by construction

---

## D-46 — chevron inset: node metadata and rendered ink disagree

Node metadata places `chevron-right` at x=340 in a 360px panel — a **2px** right inset. The rendered
ink sits at **x 326-335.5**, consistent with an 18px box at a **20px** inset, matching the label's 20px
left inset and the expanded row's own chevron.

**Resolution.** Ship 20px. The raster is what renders; the metadata frame is mis-positioned.

**Owner:** 2.4 · **Verified:** pixel scan of all 7 root rows

---

## D-47 — `accordion.liquid` hardcoded a 12px chevron

The `chevron` branch rendered `icon-chevron-down` at `size: 12`; the drawer design needs 18.

**Resolution.** Optional `icon_size` param, **default 12** so existing behaviour is unchanged. Safe
because the `chevron` branch had exactly two call sites: `collection-filters.liquid` (which uses
`plus-minus`) and the drawer this PRD replaces.

**Owner:** 2.4 · **Verified:** grep of all call sites before the change

---

## D-48 — header layout columns declared their widths instead of deriving them

`mega-menu-rail.liquid` carried `w-[220px] shrink-0` and `mega-menu-pane.liquid` carried
`w-[352px] shrink-0` on the promo slot. Both are the Figma *computed* width of a column inside a
divided row, which CLAUDE.md's "layout widths are derived, never declared" rule forbids — the value
hardcodes one panel geometry and stops tracking the container.

**Resolution.** Proportional `flex-grow` on the children, containers untouched. The gaps subtract
exactly, so the ratios reduce to whole numbers and reproduce Figma without stating a pixel:

| Level | Free space | Ratio | Result at 1440 |
|---|---|---|---|
| rail : panes | 1320 − 32 = 1288 = 4×322 | `flex-[55]` : `flex-[267]` | 220 : 1068 |
| main : promo | 1068 − 32 = 1036 = 4×259 | `flex-[171]` : `flex-[88]` | 684 : 352 |

`flex-[N]` compiles to `flex: N`, i.e. `grow N / shrink 1 / basis 0%`, so each track takes its share
of the free space after gaps. `min-w-0` on all four replaces the old `shrink-0` — it stops
`min-width: auto` letting content push a column past its share, which is what the fixed width was
really doing.

**Owner:** post-2.4 audit · **Verified:** measured 220/1068/684/352 at 1440 and proportional
(192.7/935.3/596.4/306.9) at 1280

---

## D-49 — the utility strip hand-rolled `.page-width` with the wrong numbers

`nav-utility-strip.liquid` built its horizontal container as
`mx-auto flex w-full max-w-[1440px] items-center gap-8 px-16`. That is `.page-width` re-implemented at
**64px** padding instead of 60, giving a 1312px content box against every other panel row's 1320 — the
utility items sat **4px inside** the rail and panes.

**Resolution.** `page-width flex w-full items-center gap-8`. `w-full` is load-bearing: the outer
`.mega-menu__utility` is `display: flex`, so without it the `.page-width` child sizes to content
(measured 475px, offset to x=482) instead of spanning the row.

**Owner:** post-2.4 audit · **Verified:** first utility item and first rail row both measure
`left: 60` at 1440 and 1280

---

## D-50 — drawer panel width now derives from the viewport

`mobile-drawer.css` set `width: 360px`. PRD 2.4 AC #1 asks for a 360px panel leaving a **30px sliver**
at 390 — but a fixed panel makes the *sliver* the variable, and it collapsed to 15px at 375.

**Resolution.** `width: calc(100% - 30px); max-width: 360px` — the 30px tap-out target is what stays
constant, capped at the design's 360.

| Viewport | Panel | Sliver |
|---|---|---|
| 375 | 345 | **30** |
| 390 | **360** | **30** |
| 430 | **360** | 70 |

The design viewport is unchanged, so the drawer promo card still measures **320 × 397** at 390.

**Owner:** post-2.4 audit · **Verified:** measured at 375 / 390 / 430 with the drawer actually opened

---

## D-51 — merchant strings rendered unescaped in the header

`/assess` found `link.title` output raw on the drawer root rows. A full sweep showed the gap was wider:
**12 unescaped sites** against exactly one escaped (`drawer-panel.liquid:38`, written in 2.4) — so the
feature contradicted itself.

Two classes, with different severity:

| Class | Sites | Effect |
|---|---|---|
| `link.title` in text | `header-mobile:135,143` · `header-desktop:45` | `&` renders as a broken entity |
| `shop.name` in `alt=` / `aria-label=` | `header-mobile:30,36,97,102` · `header-desktop:17,23` | a `"` **terminates the attribute** |
| `shop.name` in text | `header-mobile:42,108` · `header-desktop:29` | entity only |

The attribute cases are the real defect: `alt="{{ shop.name }}"` with a shop name containing a quote
closes the attribute early and the remainder parses as stray attributes.

**Resolution.** `| escape` on all 12, per liquid-standards. Most `shop.name` sites are 2.1's header
bar rather than 2.2–2.4 code; devx chose the wider scope explicitly.

**Owner:** post-2.4 audit · **Verified:** rendered at 390 — 7 root rows read correctly,
`aria-label="Amrutanjan - Home"`, `alt="Amrutanjan"`, no `&amp;amp;` anywhere (no double-escaping);
theme check 144 files / 0 offences

---

## D-52 — body scroll lock has no refcount · **accepted, not fixed**

Four scripts add and remove `overflow-hidden` on `document.body` with no shared counter — 14 sites:
`cart-drawer.js` (81, 95), `collection.js` (192, 217, 261, 446, 462, 522, 568), `search-modal.js`
(20, 44), `header-javascript.js` (112, 137, 157). Whichever overlay releases first unlocks scroll for
every other one still open.

**Accepted by devx.** An open drawer covers the viewport with its own overlay, so a shopper cannot
reach a second drawer to open one — the two-overlay state is not reachable through the UI. Three of
the four files predate this sprint; the drawer joins the pattern rather than creating it.

**Residual, in the record for completeness rather than as a counter-argument:** the one path the
overlay reasoning does not cover is programmatic, not user-driven — `header-javascript.js:157` sits
after `drawer.dataset.drawerBound = 'true'` in the rebind path, so a `shopify:section:load` on the
header releases the lock unconditionally. That is theme-editor only, merchant-facing, and clears on
the next open/close cycle.

**Owner:** accepted risk, devx · **Verified:** collision confirmed by grep across all 4 files; no code
changed

---

## D-53 — `mega-menu.css` and `mobile-drawer.css` folded into Tailwind + `base.css`

devx asked why the two files existed at all. **CLAUDE.md points both ways** and the sprint followed the
wrong half: Architecture says *"create section specific css files and load it in the section"*, while
Key Files says of `base.css` *"all custom component styles … Any non-Tailwind CSS goes here."*
Resolved in favour of `base.css`.

**14 of 16 rules became Tailwind utilities.** The JS toggles classes, so JS-driven state was expressed
with arbitrary variants rather than by changing the JS:

| Rule kind | Utility |
|---|---|
| parent state → child | `[.drawer--open_&]:opacity-100`, `[.drawer--pushed_&]:-translate-x-full`, `[.nav-trigger--open_&]:rotate-180` |
| own state | `[&.mega-menu--open]:visible`, `[&.mega-menu--open]:h-[var(--mega-menu-height,auto)]` |
| reduced motion | `motion-reduce:transition-none` |

**Two rules stayed as CSS, in `base.css`:**
1. The mega panel's `transition: height 250ms ease-out, visibility 0s linear 250ms` (and the open
   state's `0s`) — a **per-property delay**. Expressible only as an unreadable arbitrary string, and it
   is the mechanism 2.3 spent most of its build getting right.
2. `.header .drawer__panel { height: 100vh; height: 100dvh }` — a **fallback pair** needs two
   declarations of one property; class order in the attribute does not control emitted CSS order.

Files deleted, both `stylesheet_tag` loads removed from `sections/header.liquid`.

**Owner:** post-2.4 audit · **Verified:** desktop transition reproduced exactly
(`height 0.25s 0s, visibility 0s 0.25s`), panel 0→543px, underline `rgb(244,196,48)`, chevron
`rotate(180deg)`, rail/panes still 220/1068; drawer closed −360 → open 0 → pushed root −360 / level 0 →
back 0, panel 360×844, `motion-reduce` yields `transition-property: none`

---

## D-54 — Tailwind turns `_` into a space inside arbitrary variants

`[&.drawer__level--active]:translate-x-0` compiled to
`.…:translate-x-0.drawer level--active` — the BEM `__` became a **descendant combinator**, so the
active drawer level never un-translated and sat at `translateX(+360)`.

**Resolution.** Escape literal underscores: `[&.drawer\_\_level--active]:translate-x-0`, which emits
`….drawer__level--active`. The project's other three variants are unaffected because their underscores
*are* intended as combinators (`[.drawer--open_&]`).

**Why it matters beyond this fix:** the broken form is still *valid CSS* and Tailwind reports no error,
so it fails silently. This is the fourth Tailwind escaping trap in this sprint after `[`, `]` and `#`.
**A BEM class name inside an arbitrary variant always needs `\_\_`.**

**Owner:** post-2.4 audit · **Verified:** emitted selector now ends `.drawer__level--active`; pushed
level measures `translateX(0)`

---

## D-55 — drawer sub-menu accordions are single-open (devx request)

devx: *"In the Mobile, in sub menu accordions I want only one accordion to be opened at a time, right
now all can get opened."*

**`accordion.js` is shared**, and its other caller is `collection-filters.liquid`, where multiple-open
is correct — all four filter accordions ship `default_open: true`. So single-open is **opt-in**, never
global.

**Resolution — `data-single-open` on the container.** One attribute on the level's existing
`.drawer__body`; `accordion.js` closes the other open accordions inside
`accordion.parentElement.closest('[data-single-open]')` before opening one. Each level already has its
own `.drawer__body`, so levels are independent for free.

**`accordion.liquid` is untouched** — no new param, no new attribute, nothing added to the shared
snippet's interface. A first pass threaded a `group` param through the snippet onto every accordion;
devx flagged it as over-engineering and was right, since the container already supplies the scope.

The click handler duplicated the whole open/close body, so it was extracted into `setAccordionState`
and is now shared with the close path. Closing a sibling is guarded on `aria-expanded === 'true'` —
without it, `toggleFocusable` would re-stash `data-originalTabindex` on already-closed rows and lose
the original values.

**`data-single-open="true"` has no browser support** — it is a plain custom data attribute, so the
name is arbitrary and the JS cost is identical either way. The genuinely native mechanism is
`<details name="group">`, which makes several `<details>` mutually exclusive with **zero JS** (Baseline
late 2024: Chrome/Edge 120, Safari 17.2, Firefox 130). **Not adopted**: `accordion.liquid` is
button + div, so switching would also change `collection-filters.liquid`, and the `max-height`
transition would need `::details-content` with `interpolate-size`, which is Chrome-only today.

**Owner:** devx request, post-2.4 · **Verified — drawer, at runtime, 390:** 5 `[data-single-open]`
containers (one per level); Shop By Need's 7 accordions — tap #0 → `[0]`; tap #2 → `[2]`; tap #1 →
`[1]`; tap #1 again → `[]`. Never more than one. A second level opened independently. Zero page errors;
theme check 144 files / 0 offences.

**Verified — filters.** `data-single-open` occurs in exactly **one** place (`drawer-panel.liquid:45`),
`closest()` walks ancestors only, and the collection filters do not render inside the drawer, so they
cannot match and keep multi-open. A runtime re-check was blocked mid-session by the `shopify theme dev`
server returning **401 on every route**; **devx confirmed collection filters work correctly**.

---

## D-56 — mega-menu backdrop overlay (devx request)

devx: a backdrop on the open mega menu, `background: #00000033`, `backdrop-filter: blur(6px)`.

**Placement is the whole design.** The element is a **sibling after `</header>`**, not a child:
`.header` is `z-50`, the backdrop `z-40`, so the header *and* its panels stay above and unblurred while
page content below is dimmed. Being a sibling also keeps it clear of the D-25 trap —
`backdrop-filter` creates a containing block only for an element's **own descendants**, and this one
has none, so it cannot capture the fixed drawer or the absolute panel.

`pointer-events-none` throughout: the mega menu closes on `mouseleave`, so the backdrop must never
intercept. `max-lg:hidden` because the mega menu is desktop-only. Toggled by
`megaSetBackdrop()` from `megaOpenPanel`/`megaClosePanel`; the close path is guarded on
`megaOpenHandle === null` so switching between panels does not flash it off.

🔴 **`-webkit-backdrop-filter` had to be hand-written in `base.css`.** `autoprefixer` is in
`devDependencies` but **there is no postcss config**, so `npx tailwindcss` never runs it — the compiled
CSS contains **zero** webkit prefixes. Unprefixed `backdrop-filter` needs Safari 18+; older Safari and
all iOS below it would have shown no blur at all. `base.css:112` already hand-prefixes the header blur
for the same reason, so this follows the established pattern rather than adding a build step.

**Owner:** devx request, post-2.4 · **Verified** at 1440: closed → `opacity: 0`; open →
`opacity: 1`, `background: rgba(0, 0, 0, 0.2)` (= `#00000033`), `backdrop-filter: blur(6px)`,
`z-index: 40` against the header's 50, `position: fixed` at 1440×900 from y=0, `pointer-events: none`;
closes on mouse-away; `display: none` at 390. Zero page errors; theme check 144 files / 0 offences.
Screenshot confirms content behind is dimmed and blurred while header and panel stay crisp

---

## Still open

Not deviations — unresolved items that may become deviations. Tracked in
`DEFINITION-OF-DONE.md` §Open Items Register.

| Item | Status | Closes at |
|------|--------|-----------|
| **F3** — panel animation duration and easing | **Confirmed as-built by 2.3 — 250ms `ease-out`**, in `assets/mega-menu.css`. Still pending designer sign-off | 4.3 |
| **`panel-border #A3A3A3`** (§2.2) | **Unconfirmed.** Extraction found it only as a `0.5px` top border on the utility strip, not as an outer border on the dropdown container. Measure or strike | 4.3 |
| ~~**SVG in `image_picker`**~~ | **Closed 2026-08-16 by 0.2 — it works.** Proven twice: a test upload returned a `READY` `MediaImage` (`image/svg+xml`, 18×18), and three live `image_picker` settings in this theme already hold `shopify://shop_images/*.svg` values. The `asset_url` fallback was never needed. See D-12 | — |
| ~~**Desktop vs mobile menu labels**~~ | **Closed 2026-08-16 by 0.1.** Desktop labels win — `Combo`, `Media`, and the desktop Categories rail (Pain Relief · Women's Care · Cold & Congestion · Rehydration · Grooming · Shop All). Built into `navigation-main` | — |
| ~~**Top-level order contradicts itself**~~ | **Closed 2026-08-16 by 0.1** — see **D-16**. Panel frames' order won, but the evidence is 5 frames vs **2**, not 5 vs 1: the mobile drawer root agrees with the scrolled frame | — |
| **Product row overflows its container** | Shop By Need's six 170px cards on a 182px pitch end at 1080px inside a 1068px container — a 12px overflow. Categories' five end at 898px, leaving 170px trailing. The row is a fixed-width track, not a grid dividing the pane. Reproduce or resolve, and record which | 3.1 → 4.3 |
| **Fidelity tolerance** | Undefined by either TDD. Design QA has no pass/fail line without it | 4.3 |
| **44×44 touch targets** | Shipped unmet and unnoticed on the homepage sprint. Must not repeat silently | 4.2 |

**F5** (a stray `#FFB300` in the Categories panel) closes as accidental and cosmetic. **F6**
(unreliable Figma layer naming) is mitigated rather than fixed — three frames in this section are
misnamed, and `.buildspace/artifacts/navigation/sections.json` carries corrected names and is
authoritative over the layer tree.

## D-57 — mega-menu card width derives; the 170px exception is withdrawn

3.1 authorised a **declared 170px** card width as an exception to derive-don't-declare, reasoning that
Figma's desktop track does not divide its container: 6 × 170 + 5 × 12 = **1080** inside a **1068** pane.
That was faithful to Figma but left a 12px overflow that devx read as a defect twice — first as a
clipped card, then as a scrollbar.

**devx's decision:** derive the width so six fit exactly, and scroll only when a merchant asks for more
than six.

`w-[calc((100%-60px)/6)]` — the pane split into six slots less five 12px gaps.

| Cards | Each | Track | Behaviour |
|---|---|---|---|
| 5 (Categories) | **168** | 888 | fits, no stretch — `shrink-0` is load-bearing |
| 6 (Shop By Need) | **168** | **1068** | fits exactly, no scroll |
| 8 (proved with a temporary count) | **168** | **1428** | overflows, scrolls by 360 |

**Cost, stated plainly:** cards are **168**, not Figma's 170, and the 12px overflow Figma draws is gone.
The exception in PRD 3.1 ("Do not implement this as `flex-1`") no longer applies — this is not `flex-1`,
which would have stretched Categories' five to 204; it is a fixed slot width that happens to be derived.

**A knock-on the 2px caused.** At 168 the content box is 148 and the rating row spilled onto a second
line — cluster 83 + gap 2 + reviews 63 = 148 against 148, lost to sub-pixel rounding — adding 16px to
every card. Figma **truncates** the review count instead (`(132 Rev…)` in `389:28710`), so the row is
now `flex-nowrap` with the count set to ellipsis. Card 292.3 → **274.3**.

**Owner:** devx request, post-3.1 · **Verified:** 168 at both counts, exact 1068 fit at six, scroll
proven at eight, rating on one line; guarded by three new `nav:audit` checks

## D-58 — the featured bundle card ships without its CTA and price row

PRD 3.2's requirements and TDD §7 both list a **CTA** on the featured card ("Image, title, savings
badge, contents list, CTA"), and 2.2 shipped `rail_feat_cta` to label it. TDD §5 line 217 also says
"Image, title and **price** come from the product."

Neither appears in either Figma frame. The reason is explicit in the file: node **`389:23432`** — the
frame holding the price row *and* the Add-to-cart button — is `hidden="true"` on desktop, and the mobile
card has no equivalent frame at all. The design deliberately suppresses both.

**devx's decision:** match Figma. `bundle-card-featured.liquid` renders no CTA and no price row.

**Cost:** `rail_feat_cta` is now a **dead setting** — nothing consumes it. 4.1 should remove it or
repurpose it. `rail_feat_heading` is dead for the same reason: the pane heading comes from
`rail_pane_heading`, so 3.2 never reads it.

**Owner:** devx decision at /clarify · **Verified:** no CTA or price element in the rendered card on
either viewport

## D-59 — no decor shape behind the bundle image

PRD 3.2's Approach directs a `decor-shape #D9D9D9` shape "peeking behind the bundle image", built as a
sibling rather than a background. TDD §2.2 scopes that token to "the history carousel **and** the bundle
image".

Both Combo frames were checked at node level. The image fills the card edge to edge — desktop
`389:23409` is 350×198 at x0/y0, mobile `389:30981` is 320×240 at x0/y0 — with no sibling shape in the
subtree. Building one would have produced either an invisible element or a difference from the design.

**devx's decision:** skip it. The token stays live for **3.3**'s history carousel, which is the other
half of its TDD scope.

**Owner:** devx decision at /clarify · **Verified:** node inspection of both frames

## D-60 — mobile bundle rows scroll; they are not a 2-up grid

PRD 3.2 says the mobile featured card "stacks above a **2-up** row of the compact bundle cards". Figma's
mobile container `389:31006` is exactly **320 = 155 + 10 + 155** — two cards, no third.

**devx's decision:** it is a 2-up **scroll track**, not a grid. All rows render; two are visible and the
remainder scrolls. Implemented with the values already in `mega-menu-products.liquid:44-45`
(`gap-2.5` + `w-[calc((100%-10px)/2)] shrink-0` in an `overflow-x-auto` flex track) so the two tracks
cannot diverge.

With the current data this is moot — see **D-65**, which leaves only two eligible rows — but the
capability is there for collections that hold more.

**Owner:** devx decision at /clarify · **Verified:** `/compare` at 390 measured slots 155/155,
`scrollWidth 485` against `clientWidth 320`

## D-61 — three of the PRD's hexes are existing theme tokens, and one of them was wrong

PRD 3.2 states the featured card's title is `#1E5631`. **Figma says `#466e2e`.** `#1E5631` is the card's
**border**. Following the PRD would have shipped the wrong colour on the most prominent text in the pane.

Resolved against `config/settings_data.json` rather than hard-coding:

| Figma hex | Theme token | Used as | Used for |
|---|---|---|---|
| `#466e2e` | `color_primary` | `text-primary` | featured title, check icon |
| `#f4c430` | `color_accent` | `bg-accent` | savings chip fill |
| `#171717` | `color_foreground` | `text-foreground` | chip label |

The chip fill being `color_accent` also settles an open question from /clarify — TDD §2.2 lists `#fde047`
and `#facc15`, and the badge is neither.

Three hexes stay literal because the nearest token is a **different colour**, and must not be "tidied"
into one: `#1e5631` (vs `color_green_dark` `#113422`), `#666666` (vs `color_muted` `#737373`), `#e0e0e0`
(vs `color_border` `#E5E7EB`, and distinct again from the mega menu's own `#e5e5e5`). The bundle row's
name is pure `#000`, not `color_foreground`.

**Owner:** 3.2 · **Verified:** rendered colours match the Figma node fills

## D-62 — the bundle price ships at 700; DM Sans 800 is not loaded

Figma sets the row price in **DM Sans ExtraBold (800)**. `snippets/css-variables.liquid:16-19` loads the
secondary family at **400/500/600/700 only**, so an 800 would be synthesised or silently fall back —
the same failure as **D-22** (Space Grotesk 600 never loaded, renders at 700).

Shipped as `font-bold` (700). Adding an 800 face is a theme-wide font-loading change and an extra
request for one element, and Shopify's DM Sans may not offer 800 at all; D-22 was deferred on the same
reasoning.

Every other weight in this pane is available: 600 title / View Details / mobile chip, 400 contents,
700 row name and desktop chip, Space Grotesk 500 pane heading.

**Owner:** 3.2, same family as D-22 · **Verified:** font-face list read from `css-variables.liquid`

## D-63 — mobile Combo follows the shared code, not its own frame, in four places

Figma's mobile Combo frame omits four things the shared drawer code renders. All four were put to devx
and all four were accepted rather than special-cased, because `drawer-panel.liquid` is 2.4-owned and
serves every panel.

| Item | Figma Combo frame | Built | Why accepted |
|---|---|---|---|
| First accordion row | "Everyday Bundles" (a 7th row) | **"Desk Recovery Kit"** | Desktop rail must read the kit name; one `rail_label` serves both. Consistent with 0.1's label decision (D-16). Closes **R-4** |
| See All | absent | **present** | Every other panel's mobile design shows it; one `rail_cta_label` serves both |
| Subscribe & Save | absent | **present** | 2.4 renders it per level; also gave a second site for verifying 1.2's card branch |
| Pane heading | absent | **"Combo of the month"** | `drawer-panel.liquid:77-81` renders `rail_pane_heading`, and Categories' mobile frame *does* show its heading ("Featured Products") — so Combo's frame is the outlier |

The pane-heading row is the only one traceable to a 3.2 change: setting `rail_pane_heading` on the six
`cmb-*` blocks is what made it appear in the drawer.

**Owner:** devx decisions at /clarify and post-/compare · **Verified:** all four observed in the
rendered drawer · **4.3 to rule on** whether the Combo frame or the shared behaviour is authoritative

## D-64 — the panel measures 617, not 605, and the cause is 1.2's promo card

PRD 3.2's acceptance criterion is a 605px panel. Built: **617**. The bundle content is **not** the cause.

`.mega-menu__pane` is a flex row with default stretch alignment, so the pane takes the height of its
tallest child. Measured on the 4-entry fixture (`womens-comfort-kit`):

| | Figma | Built |
|---|---|---|
| pane-main natural | 482 | **482.87** ✅ |
| `subscribe-save--card` promo | 482 | **493** ❌ |
| → pane / container / panel | 482 / 546 / **605** | 493 / 557 / **617** |

```
promo 493  >  pane-main 482.87   →  pane 493  →  container 32+493+32  →  panel 557+59 = 617
```

With the promo at Figma's 482 the panel lands on **605 exactly**. `/compare` independently confirmed the
symptom, and also found the promo's heading wrapping to two lines ("Subscribe & Save" / "15%") where
Figma keeps one.

This is `subscribe-save.liquid`'s `card` branch — shipped **unverified** at 1.2 ("nothing consumes
`layout: 'card'` until 3.2"), and 3.2 is its first consumer. **devx's decision: log it, do not fix it
inside 3.2.** It affects 3.3 and 3.4's panels identically.

**Owner:** 1.2, surfaced by 3.2 · **Verified:** measured in-browser at 1440 and again by `/compare` ·
**4.3 to resolve**

### ⚠️ Cause corrected at 3.3 — it is a 0.4px text overflow, not inherent geometry

The entry above treats the promo's 493px as a property of the card. It is not. `subscribe-save.liquid:92`
sets the heading to `text-[28px]/[43px] lg:text-[30px]`. Measured in-browser at 1440:

| | value |
|---|---|
| available width inside the 352px card | **304.0px** |
| "Subscribe & save 15%" rendered at 30px | **304.4px** |
| resulting heading height | **86px** (2 × 43) instead of 43 |
| resulting promo height | **493** instead of **450** |

**A 0.4px overflow wraps the heading and adds exactly 43px.** That 43px is the whole of the panel
overshoot on both panels built so far:

| Panel | pane content | promo today | panel today | promo at 450 | Figma |
|---|---|---|---|---|---|
| Combo | 482.87 | 493 | **617** | content drives → **~605** | **605** |
| About / Our Story | 450.8 | 493 | **617** | content drives → **~574** | **573** |

So the acceptance criterion is **cheaply reachable**, not structurally blocked. At 28px the heading
measures 283.8px and fits with room to spare; `lg:whitespace-nowrap` keeps Figma's 30px and puts the
0.4px inside the card's 24px padding. Note Figma's own heading node is **305 × 43** — one line at 30px —
so the design is itself ~1px wider than its container permits once CSS wrapping applies.

Desktop-only: the heading fits one line in the 320px drawer, where the base 28px applies.

**devx's decision at 3.3: leave the code alone, correct the record.** Plan R-c's "cannot hit 573" is true
today but not inherent. 4.3 now has the exact fix rather than a geometry mystery.

**Owner:** 1.2 · **Cause verified at 3.3:** heading width probed at 30/28/26/24/22/20px against the
measured 304px available; `oneLineWouldBe` computed as **450**, matching Figma exactly

### Confirmed on a fourth panel at 3.4

Both Media panels measure **617** against Figma's **573**. Figma's promo is **450** and *taller* than either
pane's content (News 442, Blogs 426), so in the design the promo legitimately drives the panel height —
573 = 32 + 450 + 32 + 59. The built promo is 493, and 493 − 450 = **43**, the same wrap.

The affected set is now **Combo (605), About/Our Story (573), Media Blogs (573), Media News (573)** — every
panel that shows the promo. One utility corrects all four. `/compare` reached the same conclusion
independently at both 3.3 and 3.4.

## D-65 — the featured bundle is excluded from the popular rows, so a three-product kit yields two rows

Not a PRD requirement, and initially shipped wrong. Each `rail_feat_product` is a **member of its own
`rail_bundle_coll`**, so the first build rendered the featured bundle twice — once as the card and again
as a row. All six panes were affected (e.g. "Desk Worker Relief Pack" as both). `/compare` did not catch
it because its mock uses different fixture data; `nav:audit`'s `featured excluded from rows` check did,
expecting **2** and finding **3**.

Fixed: the row loop skips the featured product, and the eligible count is computed before the guard so
an all-featured collection renders no empty track.

**The consequence is a data limitation, not a code one.** Figma shows 1 featured + **3** distinct rows,
which needs **4** products per kit. Every kit holds **3**, so each pane now shows **2** rows. `nav:audit`
already encodes `expect: 2` on both viewports, so the harness had reasoned this through against the real
catalogue.

To reach Figma's three rows, **0.1 must add a fourth product to each of the six kit collections**, or
the merchant must nominate a featured product from outside the collection. Raised for 4.1.

**Owner:** 3.2 · **Verified:** no duplicate title in any of the six panes; `nav:audit` 2/2 both viewports

## D-66 — the featured media is ~1px short: CSS borders inset where a Figma stroke overlaps

`nav:audit` reports the only two remaining deltas in the pane:

| | Figma | Built | Δ |
|---|---|---|---|
| desktop media height | 198 | **196.9** | −1.1 |
| mobile media height | 240 | **238.5** | −1.5 |

Figma draws the image at the card's full width (350 / 320) with the 1px stroke **overlapping** it. A CSS
`border` sits outside the content box, so the aspect box is 348 / 318 wide and its derived height falls
short by the same ratio.

**Not compensated, deliberately.** Widening the ratio to `aspect-[348/198]` would make the media exactly
198 but push card height to **378** against Figma's 376 — worse than the current **376.87**, and card
height is what cascades into the panel. `assets/base.css`'s inset-shadow trick (used on the rail rows
for exactly this reason) does not work here either: an inset shadow paints beneath child content, so the
full-bleed image would cover it.

Accepted as sub-pixel. Card height passes at both viewports (376.87 / 334.5 against 376 / 334).

**Owner:** 3.2 · **Verified:** `nav:audit` 108/110, both remaining deltas this cause

### A fifth instance at 3.4 — press-card height, where the content is provably exact

`desktop / media-news · card height` reads **338** against Figma's **336**. Every internal metric matches
the design exactly:

| | Figma | built |
|---|---|---|
| media | 160 | **160** |
| body | 176 | **176** |
| head | 119 | **119** |
| title | 90 | **90** |
| Read More | 21 | **21** |
| **content total** | **336** | **336** ✅ |

The +2 is the 1px top and bottom `border`, which in CSS sits **outside** the content box while Figma's
stroke overlaps the frame. This is the clearest demonstration of D-66's cause yet: the content is
bit-for-bit correct and only the border accounting differs.

**The expectation was deliberately left at Figma's 336** rather than raised to 338, consistent with the
other four, and the check carries a `$comment` forbidding both a change to 338 and any attempt to shrink
content to compensate.

## D-67 — the check icon renders at 1.3px stroke; there is no 1.2px rung

Figma's `check-circle` (`389:23417`) strokes at **1.2px**. `assets/base.css` owns icon stroke weight
through `.icon` (1.3px default) plus `icon--stroke-hairline` 0.92 / `--thin` 1 / `--medium` 1.6 /
`--bold` 2. There is no 1.2 rung.

Following the codebase pattern, `icon-check-circle.liquid` omits `stroke-width` entirely and inherits
the **1.3px** default — the closest rung (Δ0.1 against `--thin`'s Δ0.2). Adding a rung to `base.css` for
one icon was not justified.

The glyph itself is the exported asset, not the existing `icon-checkmark.liquid`, which is a bare
polyline check — a different shape.

**Owner:** 3.2 · **Verified:** rendered at 12px mobile / 14px desktop

## D-68 — the featured card had no link at all; the title now carries a stretched one

Reported by devx after `/assess`: **the featured card was not clickable.**

A real defect, and a direct consequence of **D-58**. Removing the CTA to match Figma removed the card's
*only* route to the product without replacing the affordance. The result was incoherent — the three small
`bundle-row` cards each had a stretched link, while the large "Combo of the month" card, which is the
merchant's nominated product, could not be reached at all. Neither `/compare` nor `nav:audit` tests
clickability, so both passed it.

Fixed without altering the design: the title becomes an `<a>` carrying
`after:absolute after:inset-0` over a `relative` card root — the same stretched-link pattern already used
by `product-card.liquid` (title link) and `bundle-row.liquid`. No visible button is added, so D-58 stands.

Verified by hit-testing, not by presence. `document.elementFromPoint` at the centre of the image, the body,
a tick-list label, the savings chip and the title all resolve to
`A.bundle-card-featured__title → /products/desk-worker-relief-pack`. This also confirms the image does not
block it: the media's `absolute inset-0` child paints *before* the title's positioned `::after` in tree
order, so the pseudo-element sits above it without needing a `z-index`.

⚠️ **An end-to-end mouse click could not be reproduced through synthetic input.** The panel is hover-driven,
and a scripted click opens it on mouse-move then closes it on mouse-down — the identical limitation
`/compare` hit ("`hover()` is the only correct action"). The hit target is proven correct at the exact
clicked coordinate, and the backdrop is `pointer-events-none` at opacity 0, so nothing intercepts. **Worth
one confirming click with a real mouse.**

**Owner:** 3.2, regression from D-58 · **Verified:** `<a href>` on all six panes with correct product URLs;
hit target correct across the whole card; theme check 151/0; `nav:audit` 108/110 unchanged

## D-69 — the drawer suppresses a pane heading that duplicates its accordion row label

2.2 gives every rail-item both `rail_label` and `rail_pane_heading`, and `drawer-panel.liquid` rendered
the heading whenever it was set. On Combo the two differ ("Desk Recovery Kit" vs "Combo of the month"), so
**D-63** accepted the extra heading as a divergence from that one Figma frame.

**On About they are the same string** — `rail_label: "Our Story"` with `rail_pane_heading: "Our Story"`,
and likewise "History". Unconditional rendering therefore printed each label **twice**, which the mobile
frame `389:30722` clearly does not.

**Resolution.** The heading now renders only when it differs from the row label. One condition in
`drawer-panel.liquid`, no schema or content change. This **narrows D-63 rather than reversing it** — the
accepted Combo behaviour is untouched.

Both halves were verified in one render, because the condition is shared 2.4-owned code and a regression
would have silently removed 3.2's heading: **About renders zero pane headings; Combo still renders
"Combo of the month" six times.**

**Owner:** devx decision at 3.3 /clarify · **Verified:** rendered drawer output, both levels

## D-70 — content-card images are `object-cover`; a logo must be composed on its canvas

Figma's two Our Story cards use **different image fits**. Card 1 (`389:23625`) is a full-bleed cover
photo. Card 2 (`389:23636`) holds the brand logo *inset and centred* — `w-[47.29%]`, `h-[79.29%]`,
positioned — inside the `#faf9f6` box.

The `content-card` block has only `card_image`. Reproducing both would need a fit setting on the **one
repeating block type** 2.2 worked to keep minimal and 4.1 must audit.

**devx's decision:** `object-cover` throughout. A logo is supplied pre-composed on a cream canvas at the
right aspect, which is effectively what the Figma asset is.

**Cost, stated plainly:** a bare square logo dropped into `card_image` will crop.

### Resolved 2026-08-18 — the real Figma assets are now in Shopify Files

devx reported all three About images as not matching. The Figma artwork was extracted, composed where
needed, and uploaded, so the decision is now **demonstrated rather than worked around**:

| File | Source | Size |
|---|---|---|
| `nav-about-founder.jpg` | raw image fill of `389:23625` | 653 × 357 |
| `nav-about-logo.png` | logo fill of `389:23636`, **composed** on a `#faf9f6` canvas at Figma's own proportions — 314 × 314 at 2×, offset left 174 / top 40 (`w-[47.29%]`, `h-[79.29%]`, `left-[26.27%]`, `top-[10.11%]`) | 664 × 396 |
| `nav-about-origin.jpg` | raw image fill of `389:24827` | 1344 × 768 |

The logo file **is** the "pre-composed cream canvas" this deviation calls for, so `object-cover` renders it
exactly as Figma draws it with no fit setting and no crop.

⚠️ **The node exports could not be used directly.** Exporting `389:23625` / `389:23636` bakes in the parent
card's green 1px border and rounded corners, which would have doubled the border inside a card that draws
its own. The **raw image fills** were used instead. Node `389:23625`'s fill list also still contains the
bundle-card product shot — a leftover of the Figma duplication noted in D-7 — so the fills were identified
visually rather than by array order (cf. D-12's scrambled-order lesson).

⚠️ **`card-about-us` is no longer imageless**, so the shipped fixture no longer *demonstrates* the
text-only path. That acceptance criterion **was verified during /execute** (media element absent from the
DOM, and a fully blank card rendering nothing with no leftover slot) — it is proven, just not permanently
on display. Its description now matches card 1, as Figma shows identical copy in both.

**Owner:** devx decision at 3.3 /clarify, assets supplied 2026-08-18 · **Verified:** all three render from
the new refs; stale `about-us-background.png` / `about-us-milestone-1893.png` refs gone; screenshots match
Figma on both panes

## D-71 — History is 651px, not Figma's 668: the photo drives height, not the year

Figma builds the milestone block with the **year in flow** (a 408px line box at 320px) and the photo
absolutely positioned over it. Reproduced literally, a merchant clearing `rail_history_year` would
collapse the block and **hide the photo entirely**.

**devx's decision:** invert it. The photo sits in flow and drives height; the year occupies an
`absolute inset-0` layer behind it.

| | Figma | Built |
|---|---|---|
| milestone block | 408 + 4 + 27 = **439** | 390 + 4 + 27 = **421** |
| pane content | 545 | **527** |
| panel | 668 | **651** |

The 18px delta is exactly **408 − 390**. `/compare` reports it visually undetectable.

**The robustness it buys is real and was measured:** with `rail_history_year` removed, the photo stayed
**594 × 390**, the caption still rendered, and pane content stayed at **527** — no collapse, no change.

Three details make the inversion work and must not be "tidied": `absolute inset-0` resolves against the
**padding box**, so the year still centres on the full 684 column despite `lg:px-[45px]`;
`overflow-hidden` sits on the **year layer**, not the root, so the photo's `0 16px 16px` drop shadow is
not clipped; and the photo and caption carry `relative` to paint above the year.

**Owner:** devx decision at 3.3 /clarify · **Verified:** measured at 1440 with and without a year

## D-72 — mobile History has no design, and two of its values are invented

`389:30722` contains Our Story only. **No mobile History frame exists** — design-context.md records this,
and the PRD requires it be flagged rather than treated as a fidelity defect.

Built to the drawer with the desktop values scaled proportionally:

| | desktop (designed) | mobile (invented) |
|---|---|---|
| year numeral | 320px / `tracking-[-12px]` | **150px / `tracking-[-6px]`** (320 × 320/684 ≈ 150) |
| caption | 18/27 | **16/24** |

Photo aspect, radius and shadow carry over unchanged. **4.3 must not score these two as defects** — there
is nothing to compare them against.

### ⚠️ A third invented value, added 2026-08-18 after devx reported the year invisible on mobile

The history root shipped with `lg:px-[45px]` only. **That side padding is the entire mechanism that exposes
the year either side of the photo** — the photo is `w-full`, the year layer is `absolute inset-0`, so with no
padding below `lg` the photo covered the numeral completely. Desktop showed 45px of it each side; mobile
showed none.

Fixed with `px-[21px] lg:px-[45px]` — 21px is desktop's 45/684 ≈ 6.58% applied to the ~320px drawer content,
so the exposure is proportionally the same. **This is a third invented mobile value**, alongside the year
size and caption type.

**Why it shipped:** D-72 already recorded that the mobile year *size* was invented, but nobody asked whether
the year was *visible at all*, and the `mobile / about expanded` audit scenario carried **no History checks**
— precisely because no Figma frame exists to source expectations from. The absence of a design became an
absence of any check.

**Now guarded.** A new `mobile / about-history expanded` scenario asserts the **relationship** rather than
Figma values: year layer 320 wide, photo 278, side padding 21. If the padding ever disappears again the
photo becomes 320 and two checks fail immediately.

**Owner:** 3.3 · **Source:** absence of a Figma frame · **Defect reported by devx 2026-08-18, fixed and
regression-guarded**

## D-73 — `decor-shape #D9D9D9` now has no consumer anywhere in the sprint

TDD §2.2 scopes the token to "the peeking shapes behind the history carousel and the bundle image".

- **D-59** (3.2) skipped it on the bundle image, because both Combo frames show the photo edge-to-edge
  with no sibling shape, and explicitly deferred the token to "3.3's history carousel".
- **D-7** cancelled that carousel, and the flanking marks turn out to be a year numeral at
  `rgba(0,0,0,0.05)` — see D-7's correction.

So both halves of its TDD scope are gone. **The token is used nowhere.** Either retire it or amend D-59's
deferral, so a future sprint does not go looking for its consumer.

**Owner:** 3.3 · **Verified:** no `#D9D9D9` / `#d9d9d9` in any theme file

## D-74 — the History fixture year is 1893, not Figma's 1940

Figma's numeral reads **1940**. No 1940 asset exists; the store holds
`about-us-milestone-1893/1993/2003/2026.png`.

Shipped as **1893** with `about-us-milestone-1893.png` — the pairing lifted from the homepage `timeline`
section's own `milestone_1893` block, so photo and year are a genuine pair, and 1893 matches the brand
mark's "Since 1893".

**This is merchant content, not a design deviation** — the year is a `text` setting. Recorded so 4.3 does
not raise it, and so 4.1 knows the fixture was chosen rather than inherited.

### Superseded 2026-08-18 — now **1940**, matching Figma

The 1893 choice rested entirely on it pairing with `about-us-milestone-1893.png`. That image has been
replaced by Figma's own photo (`nav-about-origin.jpg`, see D-70), so the pairing rationale is void and the
year now reads **1940** exactly as `389:24825` does. **This deviation is closed** — the built numeral and
photo both match the design.

Trivially reversible if devx prefers the founding year on the brand mark: `rail_history_year` is a plain
`text` setting on `abt-history`.

**Owner:** 3.3 · **Verified:** rendered numeral reads 1940; `templates/index.json` `timeline` blocks no
longer referenced by the About panel

## D-75 — the History block is a link; only the CTA button was clickable before

Reported by devx 2026-08-18: **"This History should be clickable."**

The same defect class as **D-68**. History shipped with the photo, caption and year all inert — the only
route through was the "Check History" button rendered by the caller — while every card in the sibling
Our Story pane carried a stretched link. Inconsistent, and the photo is the obvious thing to click.

**Resolution.** The whole block is now the anchor: `.mega-menu__about-history` renders as `<a href>` when a
link is available and as `<div>` when not, with the inner content built in a `capture` so the two branches
cannot drift. Target is the pane's own `cta_url`, so History and its Check History button always agree —
which required threading a new `history_link` param through both call sites.

⚠️ **The first attempt did not work, and looked like it had.** A stretched
`after:absolute after:inset-0` was put on the caption, mirroring `nav-content-card`. The `<a>` rendered,
the href was right, and the caption was clickable — but **the photo was not**, because the caption class
already carried `relative` (added so it paints above the year layer), so the pseudo-element resolved
against the *caption* rather than the block root. `nav-content-card` works only because its title has no
`relative`. Caught by hit-testing `document.elementFromPoint` over the photo centre, not by checking that
an `<a>` existed.

⚠️ **Wrapping the block also duplicated the accessible name.** With the photo and caption inside one
anchor, the photo's `alt="The Origin"` and the caption both contributed: the computed name was
**"The Origin The Origin"**. Fixed by treating the photo as decorative — `alt=""` when a caption is
present, falling back to the year only when there is no caption. The year layer already carries
`aria-hidden="true"` so the numeral never joins the name. Verified name: **"The Origin"**.

**Now guarded.** Two new audit props (`tag`, `href`, both compared exactly) and four checks across the two
History scenarios assert the block is an `A` pointing at the CTA URL, on desktop and mobile. Presence of a
link is no longer taken on trust.

**Owner:** 3.3, reported by devx · **Verified:** photo, caption and block corner all resolve to
`/pages/our-story` at 1440 and 390; accessible name "The Origin"; `nav:audit` 149 checked / 144 ok

## D-76 — Blogs cards render 287px against Figma's 320, because `article-card` is frozen

Figma's desktop Blogs card is **217.333 × 320** (aspect 0.679). `snippets/article-card.liquid` hardcodes
`lg:aspect-[318/420]` (0.757), which at 217.333 wide yields **287**. Sprint §6 requires that card
**unchanged** — it also ships to the homepage `featured-blogs` section and the blog template.

**devx's decision: accept 287.** No wrapper override either, though one was available and precedented:
`mega-menu-products.liquid` reshapes `product-card` for the mega menu with arbitrary variants
(`[&_.product-card\_\_media]:…`), which score (0,2,0) and outrank the card's own `lg:` at (0,1,0). That was
considered and rejected in favour of the most literal reading of "unchanged".

**Cost, end to end:** pane content is **393** where Figma is 426 — the arithmetic is
24 + 16 + **287** + 16 + 50 against 24 + 16 + **320** + 16 + 50. Panel height is unaffected either way,
because the promo drives it (see D-64).

Mobile needs nothing: Figma's 156 × 215.5 (0.7238) matches `aspect-[180/249]` (0.7229) to within 0.3px.

**`article-card` byte-identity was verified as a gate, not assumed** — SHA-256 captured before the build
and re-checked after, plus an empty `git diff --name-only`.

**Owner:** devx decision at 3.4 /clarify · **Verified:** `nav:audit` `desktop / media-blogs · card height`
expects 287 with a `$comment` forbidding a change to 320

## D-77 — the press-card headline clamps at 3 lines; Figma sets no clamp

Figma's headline wraps freely — 3 lines in cards 1 and 2 (`389:26014` h90 = 3 × 30), 2 in card 3
(`389:26036` h60). No truncation.

Shipped with **`line-clamp-3`**. The row is `items-stretch` and Read More is bottom-pinned, so an unclamped
4-or-more-line headline would grow **all three cards** and the panel with them. Clamping at 3 reproduces
every state the design actually shows while bounding the worst case, and `article-card` sets the precedent
(`line-clamp-2 lg:line-clamp-1`).

**Cost:** a headline over 3 lines is truncated with an ellipsis where Figma would show it in full. The three
live `news-events` titles all render at exactly 3 lines, so nothing is currently clipped.

**Owner:** 3.4 · **Verified:** `titleLines` measured as 3/3/3; Read More baseline identical at 487 across
all three cards

## D-78 — `med-news-events` was wired to the wrong blog setting

2.2 shipped a dedicated **`rail_press_blog`**, and both `mega-menu-pane.liquid:22-27` and
`drawer-panel.liquid:60-72` chain it in the CTA fallback. But `sections/header-group.json` set
`med-news-events` with **`rail_articles_blog: "news-events"`** and had no `rail_press_blog` key at all — so
2.2's setting was dead and both Media rows looked identical to the pane, leaving nothing to dispatch on.

**Resolution.** `med-news-events` now sets `rail_press_blog: "news-events"`. The pane infers its variant
from which blog setting is populated — the same dispatch `mega-menu-pane-bundles` and
`mega-menu-pane-about` use — and no new setting was needed.

**Owner:** 2.2 wiring, fixed at 3.4 · **Verified:** Blogs pane renders 3 `article-card`s and **0**
`.mega-menu__news` containers; News pane renders 3 `press-card`s and **0** `.mega-menu__blogs` containers

## D-79 — mobile News shows a "News" heading Figma does not have

**D-69** suppresses the drawer's pane heading only when it **equals** the accordion row label. On Media:

| block | `rail_label` | `rail_pane_heading` | drawer heading | Figma mobile |
|---|---|---|---|---|
| `med-blogs` | Blogs | Blogs | **suppressed** ✅ | none ✅ |
| `med-news-events` | News & Events | **News** | **rendered** | **none** ❌ |

Both mobile frames place content 20px below the row label with no heading node.

**devx's decision: accept and log.** The alternatives were worse — setting the heading to "News & Events"
would lose the "News" heading Figma explicitly shows on desktop, and dropping headings from the drawer
entirely would reverse D-69 and strip "Combo of the month" from mobile Combo.

This is the **fourth** member of the D-63 / D-69 family, alongside mobile See All, the mobile promo, and
mobile Combo's heading. **4.3 should rule on the family as a whole rather than case by case.**

**Owner:** devx decision at 3.4 /plan · **Verified** by scoped DOM query, which also confirmed D-69 intact:
media `["News"]`, combo 6 × "Combo of the month", about `[]`

## D-80 — mobile Blogs is a 2-up scroll track, not a wrapping grid

Figma's mobile `Blog List` (`389:30290`) is exactly **320 = 156 + 8 + 156** — two cards. The blog holds
three and `rail_post_count` is 3, so a wrapping `grid-cols-2` would leave a half-width orphan on a second
row.

Shipped as a horizontal scroll track: two visible, the third reachable by scroll. This is **D-60's Combo
resolution applied unchanged**, and matches `mega-menu-products.liquid:44-45`. The only difference is the
gap — **8px** here against Combo's 10px.

**Owner:** 3.4, following D-60 · **Verified:** slot width 156, gap 8, and `scrolls: true`

## D-81 — the block model is replaced by metaobject-backed rows; D-1 is superseded

**D-1 resolved** the TDD's ten block types down to two, because §3.1's model computed to ~134 blocks
against Shopify's cap of 50. The cap is real and the arithmetic was right. The conclusion was not:
"too many blocks" was a signal that this content does not belong in section blocks at all, and
compressing it instead produced a single `rail-item` type carrying **30 settings across 23 instances**.
Each panel used 5–12 of them; the rest were shown to every merchant regardless. No row was
identifiable in the editor sidebar, and `rail_panel_title` — a panel-level value stored on 23
row-level blocks, its own `info` reading *"Read from the first rail item in each panel. Ignored on
the rest."* — is the structural tell that the model was missing a level.

**Shipped.** Structure stays in section settings; row content moves to metaobjects.

| | Before | After |
|---|---|---|
| Block types | 1 `rail-item` + 1 `content-card` | 5, one per mega menu |
| Blocks | 25 | 5 |
| Settings per block | 30 | 3 |
| Hand-typed handles | 28 | 5 |
| Metaobject definitions | 0 | 8 (32 entries) |

Rows come from the menu; each row's content is the metaobject entry whose handle matches the child
link's handle. The block type hardcodes which definition it reads, so the platform — not merchant
discipline — prevents a Media row landing in the Combo panel.

**Resolved by construction, not worked around:**

- **D-26** (`menu_handle` alone collides) — five row definitions namespace the four handles that sit
  under two parents. No composite key.
- **D-45** (no reusable grouping helper; Liquid cannot return values) — `mega-menu-row-map.liquid`
  captures `definitions|types` as a string, which desktop and mobile both split. A capture is the
  return value Liquid otherwise lacks.

**Two settings were found dead** — `rail_feat_heading` and `rail_feat_cta` were declared in the schema
and read by no code.

**Verified against the store, not assumed:**

- Menu-item and metaobject handles both auto-generate from the same label, including the apostrophe
  and ampersand cases (`womens-care`, `cold-congestion`, `news-events`).
- **Both the `link` and `url` field types reject relative paths** — *"Value cannot have an empty
  scheme (protocol)"*. Every link in the model is therefore a reference, never a URL string, so no
  domain is baked into content.
- **There is no `blog_reference` type.** Media rows hold curated `list.article_reference` entries and
  a `cta_blog` handle resolved through `blogs[handle].url`.
- SVG rail icons **do** resolve as image drops (`media_type=image`, `width=18`), so `image_url` is
  unchanged. A pre-execution warning that they would degrade to generic files was wrong.
- `rich_text_field` needs `| metafield_tag`; it wraps output in a div, so `[&>div]:contents` was added
  or `line-clamp-4` would have had nothing to span.
- A `list.article_reference` **does not expose `.size`** in Liquid — emptiness is testable only via
  the capture.

**Cost accepted.** Nav content leaves version control and the theme editor loses live preview for row
content. Rows shared between Shop By Need and Categories stay entered twice, since their layouts
differ. Zero label, order or new-child drift: all 23 menu child titles already matched their
`rail_label`, and menu order already matched `block_order`.

**Owner:** post-sprint refactor, no PRD · **Verified:** `nav:audit` 182 checked / 177 ok / 5 delta /
**0 not found**, identical to the pre-refactor baseline with no `spec.json` change; theme check clean;
and a browser invariant pass proving every `aria-controls` resolves inside its own panel across all 23
rows — the failure class `nav:audit` cannot see, because a missing selector does not fail that run.

## D-82 — 44×44 is AAA, not AA; the AA failure is fixed and the AAA shortfall is accepted

**PRD 4.2 requires** interactive targets to meet **44×44 CSS px**, and the Open Items Register carries
44×44 as an item that "must not repeat silently" after it went unresolved on the homepage sprint.

**44×44 is WCAG 2.5.5 Target Size, Level AAA.** The Level **AA** criterion is 2.5.8 Target Size
(Minimum) at **24×24**, with an explicit exception for a target "in a sentence or block of text".
The sprint's own target is therefore stricter than the AA bar the rest of the Definition of Done is
written against (§7 says "Contrast passes AA").

**Measured, then fixed.** One control failed **AA**: the five chevron trigger buttons at **18×34** —
18 is under 24 on the horizontal axis.

| Control | Was | Now | Method |
|---|---|---|---|
| Chevron triggers ×5 | 18×34 | **24×44** | pseudo hit expander |
| Search · Account · Cart | 30×30 | **44×44** | pseudo hit expander |
| Drawer close | 24×24 | **44×44** | pseudo hit expander |
| Drawer logo | 40×40 | **44×44** | pseudo hit expander |

Expanders are absolutely positioned `::before` boxes, so they add hit area without participating in
layout. Verified: header bar `1440x110`, the Combo nav item `578,0 88x110`, chevrons at
`362/520/648/859/977` and icons at `1210/1280/1350` are **identical before and after** the change.
Icon gaps are 40px, so 44px hit areas leave 26px clear and cannot overlap. Chevrons were taken to 24
wide rather than 44 deliberately: a 44px-wide hit area centred on an 18px chevron would extend 13px
over its own nav label and steal those clicks.

**Accepted shortfall against AAA.** Every remaining control clears AA and is left as designed:

| Control | Size | Why accepted |
|---|---|---|
| Top-level nav links | ~119×**43** | 1px under AAA; the 43px box is Figma's 18/27 label plus `py-2`. Forcing 44 changes a measured value for one pixel |
| Chips | ~115×**33** | Clears AA. 44px tall would break the measured chip geometry (D-4, `#fde047`, 12/16 gaps) |
| Trending links | ~130×**21** | **Exempt under 2.5.8** — inline text links in a block of text |
| Utility strip links | ~124×**27** | Clears AA. The strip is 16/64 with a 0.5px top border (measured); 44px tall would break it |
| Subscribe button | 110×**40** | Clears AA. Inside the promo card, whose geometry is measured |

Card-level targets that *look* small are **not**: product cards, article cards, press cards, the
featured combo card, the About content cards and the bundle rows all carry a stretched
`after:absolute after:inset-0` link, so the effective target is the whole card. An audit measuring
`getBoundingClientRect()` on the anchor reports the text box and produces ~40 false positives — the
first run of this audit did exactly that.

**Owner:** 4.2 · **Verified:** `@axe-core/playwright` reports **zero violations** in four contexts —
header at rest, an open panel, the mobile bar and the open drawer. Also verified: `aria-expanded`
correct on all five triggers and absent on Offers and Track Order; all five closed panels `inert`,
sealing 214 focusables out of the tab order; every icon-only control named; `Enter` opens, `Escape`
closes and restores focus to its trigger; `prefers-reduced-motion` resolves `transition-property:
none` on both the panel and the cards.

⚠️ **Not verified — a screen-reader pass.** §7 of the Definition of Done requires one on ≥1 desktop
and ≥1 mobile combination. Nothing here substitutes for it.

## D-83 — PRD 4.1's acceptance criteria are superseded by D-81; one cannot pass as written

**4.1 was written against the block model D-81 replaced.** Its criteria are recorded here as met,
superseded or restated rather than silently ticked.

| 4.1 acceptance criterion | Outcome |
|---|---|
| 23 `rail_item` and 2 `content_card` blocks configured and rendering | **Superseded.** 5 blocks + 32 metaobject entries |
| Total block count recorded and ≤30 | **Met** — 5, recorded in D-81 |
| Every rail item resolves to a live collection, blog or image; no broken references | **Met** — every reference resolved at seed time and re-checked in Liquid |
| `show_subscribe_promo` on for Combo, About and Media only | **Met** as `mega_show_promo`, matching the previous configuration exactly |
| Utility strip renders both links with working destinations on every panel | **Met** — 22 anchors (5 panels + 5 drawer levels + drawer root × 2 links), 0 inert spans. ⚠️ Both point at `/pages/contact` as placeholders; the real pages do not exist |
| Dragging a `content_card` above its `rail_item` triggers the editor warning and stops it rendering | **Superseded.** Cards are fields on the About story row and cannot detach. The orphan notice was repurposed to warn on an unbound Menu Item Handle, and was **confirmed firing** in the editor |
| A fresh theme install from the preset reproduces the full menu | **Cannot pass as written** — see below |
| All five panels and the mobile drawer render populated at 390 and 1440 | **Met** |
| Recorded label decisions from 0.1 honoured | **Met** — the menu carries the desktop labels |
| The TDD is unchanged | **Met** |

**Why the preset criterion cannot pass.** The preset now carries the section settings and all five
blocks, including `header_menu: navigation-main` — so a fresh install reproduces the *structure*: five
correctly-bound panels, the chevrons, the utility strip. It cannot reproduce the *content*, because
row content lives in metaobjects, which are shop data rather than theme data. On the same shop the
menu renders complete; on a different shop it renders five empty panels until the definitions and
entries are seeded.

This is the direct consequence of the trade-off accepted in D-81 — nav content leaving version
control — not a defect. The criterion should be read as **"a fresh install reproduces the full menu
structure, and its content on a seeded shop."**

**Also void.** The `status-log.md` note that the rail ships with **7 blank icons** on a fresh install
(recorded as a known 4.1 setup step, with an instruction that 4.3 must not raise it) no longer
applies: icons are `file_reference` fields on the row entries and are seeded with them.

**Owner:** 4.1 · **Verified:** 22 utility anchors and 0 spans in the rendered document; preset settings
and 5 preset blocks present in the schema; orphan notice confirmed by the client in the theme editor

## D-84 — 4.3 deferred by decision; the panel-height gap is measured and traced to 0.4px of text metrics

**PRD 4.3 (design QA, the release gate) is not being run.** Deferred by client decision on 2026-08-18,
because the content it would compare is not final: five of six Combo rows still carry packshot
photography rather than the design's lifestyle shots, both utility strip links are placeholders
pointing at `/pages/contact`, and the store's demo products differ throughout from the design's mock
products. A 17-frame classification today would record "content pending" for most differences and need
re-running.

The findings below were produced while deciding that, and are recorded so they survive the deferral.

### Panel heights — measured for the first time, and the cause is a single one

`nav-audit`'s 182 checks assert component values but **never a whole-panel height**, so these were
never checked:

| Panel | Figma | Built | Δ | Tallest child |
|---|---|---|---|---|
| Shop By Need | 637 | 662.3 | +25.3 | pane content |
| Categories | 495 | 504.3 | +9.3 | pane content |
| Combo | 605 | 617 | +12 | promo card |
| About | 573 | 617 | **+44** | promo card |
| Media | 573 | 617 | **+44** | promo card |
| About → History | 668 | 651 | −17 | pane content |

`.mega-menu__pane` is a flex row with default stretch, so the panel takes its tallest child. All three
promo panels land on `64 + 493 + 59 = 617` regardless of their own content — this extends **D-64**,
which recorded the same cause for Combo alone before About and Media existed.

### The 44px traces to 0.4px

The promo heading *"Subscribe & save 15%"* needs **304.4px** on one line. The card's content box is
**304px**. It overflows by **0.4px**, wraps to a second line, and adds exactly one line-height of 43px —
taking the card from 450 to 493 and the panel from 573 to 617.

Everything upstream is correct: the card is 352px wide as D-43 specifies, padding is 24, and the type is
Space Grotesk 600 at 30px with `-0.2px` tracking. **D-22 is not implicated** — Space Grotesk 500, 600
and 700 all report `loaded` in `document.fonts`. This is a sub-pixel disagreement between Figma's text
measurement and the browser's, not a build error.

**Not fixed, deliberately.** Closing 0.4px means changing a measured design value — tightening tracking,
shaving padding or dropping the font size — and it would re-break the moment anyone edits that heading,
which is merchant content on the `subscribe_save` metaobject. The least-bad fix, if it is ever wanted,
is tracking `-0.2px` → `-0.3px`, worth about 2px of headroom.

### `panel-border #A3A3A3` — closed

Measured: it **is** applied, as a `0.5px` inset top border on the utility strip
(`rgb(163,163,163) 0px 0.5px 0px 0px inset`). The panel's own top hairline is `#e5e5e5` per **D-27**.
The register's "found only on the utility strip — measure or log" is answered: correct as built.

### Still unexplained

Shop By Need (+25.3), Categories (+9.3) and About → History (−17) have no promo card and are driven by
their own pane content. Whether that is demo-data difference or real drift is unresolved and needs 4.3.

**Owner:** deferred from 4.3 · **Verified:** panel and column heights measured in-browser at 1440;
one-line text width measured in situ with a nowrap clone; `document.fonts` inspected for Space Grotesk
