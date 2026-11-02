
# Amrutanjan, Homepage Sprint

**Amrutanjan, Homepage Sprint**

World of Amrutanjan D2C Storefront | Shopify (themex base) | devx | July 2026 | v1.8

**1\. Sprint Scope**

This sprint builds the approved Homepage design (desktop 1440px, mobile 390px). Every value in this document is extracted from the approved design; nothing is estimated. Anything not extractable is marked TBD with an owner. The mobile design is the base spec, desktop is the enhancement. Global rules live in the Global Standards document (v1.7); section 2 summarizes the ones this sprint relies on.

| Item | Decision |
| :---- | :---- |
| In scope | 14 custom sections, 2 app-rendered section wrappers (Quinn, Judge.me), product-card and article-card snippets, smile-underline utility, Embla carousel library (vendored). |
| Header | Not in this sprint. themex boilerplate header restyled to match Figma: desktop logo left, menus center, search and cart icons right; mobile hamburger left, logo center, search and cart right. Menu from Shopify navigation. No schema investment. |
| Excluded | Delivery tracking and payment gateway (Marketing scope). Wishlist function pending app selection (OD1). Floating toggle button pending confirmation (OD4). |
| Base theme | themex (devx in-house boilerplate): Tailwind v3.4, vanilla JS Web Components, CSS variables from theme settings, picture-tag image.liquid, newsletter.liquid, AJAX cart drawer. Existing add-to-cart flow is not modified. |
| Catalog assumption | Single-variant products only, per Amrutanjan catalog decision. |

**2\. Global Decisions Used by This Sprint**

**2.1 Typography**

Only two families are used in build: Space Grotesk (display and headings) and DM Sans (everything else). Both sourced from Shopify's font library via `font_picker`, font-display swap, preload above-the-fold weights only (D4 — resolved, see section 6). Every text still set in another family in Figma is normalized in build, family swap only, size and weight preserved unless listed.

| Token | Desktop | Mobile |
| :---- | :---- | :---- |
| Hero heading | Space Grotesk Bold 56 | Space Grotesk Bold 32 |
| Section heading (normalized Bold everywhere) | Space Grotesk Bold 34 | Space Grotesk Bold 24 |
| Hero strip text (hero-text section) | Space Grotesk Bold 38 | Space Grotesk Bold 26 |
| Offer number (featured-discounts) | Space Grotesk Bold 42 | Space Grotesk Bold 32 |
| Subheading / card title | DM Sans SemiBold 18 | DM Sans SemiBold 16 |
| Body | DM Sans Regular 14 | DM Sans Regular 12 |

Normalization rules (measured in Figma, normalized in build):

| Where (measured) | Figma value | Build value |
| :---- | :---- | :---- |
| Section headings: Subscribe & Save (Medium 32 D), About Us (Medium 34 D), Wellness Simplified (Medium 34 D), Bestseller mobile (Medium 24\) | Space Grotesk Medium | Space Grotesk Bold 34 (D) / 24 (M) |
| Product card: product name | Poppins Medium 16 | DM Sans Medium 16 |
| Product card: Add to Cart | Poppins SemiBold 14 | DM Sans SemiBold 14 |
| Product card: sale price | Inter Bold 16 | DM Sans Bold 16 |
| featured-discounts: Shop Now pill | Inter Bold 12 (D) / 10 (M) | DM Sans Bold 12 / 10 |
| claims: plus glyph | Inter Medium 36 (D) / 26 (M) | DM Sans Medium 36 / 26 |
| Reviews widget names | Manrope SemiBold 13 | DM Sans SemiBold 13 (via widget CSS where possible) |
| featured-blogs: Read link (M) | Manrope SemiBold 14 | DM Sans SemiBold 14 |
| footer: subscribe disclaimer | Lato Medium 12 (D) / 10 (M) | DM Sans Medium 12 / 10 |

**2.2 Color Palette (extracted)**

| Role | Value |
| :---- | :---- |
| Primary green (buttons, links) | \#466E2E |
| Brand yellow (hero background) | \#FACC15 |
| Accent yellow (badges, accent CTA, underline) | \#F4C430 |
| Secondary green (strokes, badges border) | \#2A7A50 |
| Footer dark green | \#113422 |
| Text primary / secondary | \#171717 / \#737373 (\#525252, \#404040 supporting) |
| Discount banner colors | \#00949E teal, \#E6790F orange, \#0094D1 blue, \#D93807 red (discount %) |
| Cream backgrounds | \#FEF9EA, \#FAF8F4 |
| Rating orange | \#FF9C05 |

**2.3 Spacing (extracted)**

Desktop: side padding 60px standard (1320px content), vertical padding 32px top and bottom, internal gap 24px. Exceptions as measured: Hero and Discount and Footer sides 20px, Offer Banner sides 72px, About Us and Wellness Simplified and hero-text full bleed. Mobile: side padding 20px standard, vertical 24px, gap 20px. Exceptions: Hero and Shop by Concern sides 8px, Subscribe & Save and Upselling and Footer sides 10px, Shop By Category sides 16px, Wellness Simplified bottom 44px, full-bleed rows 0\. Per-section measured padding appears in each schema lead below and is followed as-is per Figma.

**Amended 2026-08-11 (from 2.2) — vertical spacing is implemented as `margin`, not `padding`.** Every measurement in this section is what Figma models, and Figma models all spacing as frame padding. In code, the space *between* sections is `margin` on the section's outer wrapper. A section that paints a background (colour, gradient or image) additionally takes `padding` on the painted element, because margin falls outside the painted box and the band would otherwise collapse to the content height — such a section carries both. Merchant settings are named `margin_top` / `margin_bottom`. See CLAUDE.md §5 for the reference implementation (`sections/claims.liquid`) and the margin-collapse warning.

**2.4 Smile Underline Utility (shared)**

A single arc vector is used across the design (identical shape reused at 72 to 175px widths). Implementation: merchants mark word(s) with italic in any richtext heading; the heading element carries a custom class (has-smile-underline); CSS targets the em **and i** elements inside it and draws the curve on an ::after pseudo-element via CSS mask with preserveAspectRatio none so it stretches to the marked span width. Color from \--underline-color custom property, default \#F4C430, overridable per section. The marked span is display inline-block so the combination wraps to a new line as one unit. The tabbed-product-collection active tab state reuses the same asset via a class, no italic marker needed. Extracted SVG path:

M0.21 0.98 C0.21 0.98 32.06 7.98 67.69 7.98 C103.33 7.98 138.21 0.98 138.21 0.98 (viewBox 0 0 139 9, stroke-width 2\)

**Stroke (1.3, 2026-08-11).** 2px at 19 of the 20 instances; shop-by-category desktop measures 3px and is **not** reproduced — one shared asset, per 1.3's single-asset constraint. Arc bbox height also varies across the design (4 to 9px, mode 7); the shipped box is a flat 9px because under a CSS mask the painted stroke scales with box height, and 9px is the only value that renders 2px. See Global Standards §6.2 for the full set of built values.

⚠️ **Colour correction.** The earlier statement "white on the mobile hero banner" was unfounded and is withdrawn — the mobile hero (Figma `108:10713`) has **no arc at all**, and all 20 arc instances in the approved design are \#F4C430. The \--underline-color override ships and is verified, but no section currently uses a non-default colour.

**2.5 Buttons (measured)**

| Variant | Style (measured) | Radius (measured) |
| :---- | :---- | :---- |
| Primary solid | \#466E2E fill, white text, DM Sans SemiBold 16 (D) / 14 (M) | Hero: 12 (D), 6 (M). Card Add to Cart: 10 at h44, 6 at h36 to 40\. See F1. |
| Secondary outline | transparent, 1px \#466E2E stroke, green text, DM Sans SemiBold | View All: 20 (D), 12 (M). View All Tips: 12 (both). See F1. |
| Banner pill (Shop Now) | white fill, banner-colored text, radius 20, h31 (D) / h28 (M) | 20 |
| Accent CTA (Read Our Story) | \#F4C430 fill, dark text | 20 (D), 6 (M). See F1. |
| Product badge (New / Bestseller) | \#F4C430 fill, DM Sans Medium 12, green text, no stroke | 8 |

**F1 resolved (1.2, 2026-08-10) — as-designed per placement.** Radii are built exactly as measured above; they are not normalized to one value per variant. **The badge's previously specified `0.5px #2A7A50` stroke has been removed** — the measured design extraction contains no such stroke on the badge at any instance, and the only 0.5px stroke in that area is `#F4C430` on the product-card container.

`snippets/button.liquid` owns colour and the always-on stroke per variant, and height, radius, padding and type per **named size**. **Superseded 2026-08-11 (1.2 extension):** this paragraph previously said height, radius, padding and type are "passed per call site via `class_name`". Every measured placement above now has a size name — `xs` accent CTA, `sm` inline form submit, `md` card Add to Cart, `lg` hero primary, `xl` View All Tips, `2xl` View All, `pill` banner pill, `badge` product badge — and `class_name` carries only per-placement deltas. The full values live in the `.button--size-*` rules in `assets/base.css`; Global Standards 6.1 carries the caller-facing size table. The snippet's `{% doc %}` block was trimmed to a parameter list on 2026-08-11 and is no longer the source of truth. Section PRDs pass the size name for their placement, not a transcribed utility string.

**2.6 Media and Behavior Rules**

* Video fields are Shopify-hosted (schema type video). Video always takes priority over image when both are set. Poster attribute \= video.preview\_image so a frame paints before playback.

* Images render as picture elements (themex image.liquid) with separate desktop and mobile sources. No CSS background images anywhere; images are placed as img elements styled with object-fit and object-position.

* Carousels use Embla, vendored as static UMD files in assets (no CDN), loaded deferred and globally from core-assets.liquid. **No shared init module** (0.6, v1.4) — each carousel section owns a complete standalone JS file.

* Add to Cart is AJAX through the existing themex product-form flow and cart drawer, unchanged.

* Repeated sections and snippets: ES modules evaluate once per URL; behavior wrapped in custom elements with a customElements.get guard so N instances each initialize once.

* First hero slide image is the LCP candidate: eager, fetchpriority high, preloaded. Everything below the fold is loading lazy, decoding async.

**3\. Metafield and Data Definitions (D1)**

**D1 resolved (0.5, 2026-08-09).** The names below are final, not proposals — all definitions exist in the admin on `amrutanjan.myshopify.com` under namespace `custom`. All product-card data comes from these, never hardcoded.

**Amended (1.6, 2026-08-11).** The count is now **ten** — 0.5 closed with seven, and 1.6 added three article definitions (`category_label`, `category_background_color`, `category_text_color`) when the badge source changed. See the §4.16 note and the 1.6 Deviations rows in `status-log.md`.

| Owner | Definition | API type identifier | Used by |
| :---- | :---- | :---- | :---- |
| product | custom.product\_badge | `single_line_text_field` | product-card badge (New, Most Popular) |
| product | custom.category\_label | `single_line_text_field` | product-card category badge text (decided: plain text metafield) |
| product | custom.highlight\_color | `color` | One color driving both the category badge text color and the highlight text color, per decision. **One definition, two roles — do not add a second.** |
| product | custom.highlight\_text | `single_line_text_field` | product-card highlight line, 1-line clamp |
| product | custom.card\_image | `file_reference` | optional product card image variant (see product-card) |
| product | custom.radiator\_image | `file_reference` | **OD2 resolved:** radiator background rendered behind the card image, per-product |
| article | custom.read\_time | `single_line_text_field` | article-card read time |
| article | custom.category\_label | `single_line_text_field` | article-card badge text. Empty hides the badge entirely |
| article | custom.category\_background\_color | `color` | article-card badge background, rendered **solid** |
| article | custom.category\_text\_color | `color` | article-card badge text colour |

All seven are created with `access: { storefront: PUBLIC_READ }` and are pinned in the admin editor.

**`read_time` is `single_line_text_field`, not an integer.** The merchant enters the whole string verbatim (e.g. `4 min read`) and the theme renders it as-is with no formatting. Chosen for merchant control, accepting that nothing validates the wording — `4min` and `4 Min Read` can appear on adjacent cards. Converting to `number_integer` later would require editing every article's value.

**Pre-existing undefined metafields.** All 6 products already carry `custom.rating_value` (`number_decimal`) and `custom.review_count` (`number_integer`) as *values with no definition*, seeded outside this project. They hold the product-card rating data blocked by D2. Having no definition, they have no storefront access setting; **whether Liquid can read them is unverified** and 1.5 must establish it, creating definitions for these two keys if required.

**4\. Section Schemas**

One subsection per section, in page order. Field level: Section or Block. Derived means computed from Shopify objects, not a merchant field. Headings marked underline support the smile-underline italic marker (2.4).

**4.1 hero-banner**

Full-width Embla carousel, one block per slide, dot pagination per design, auto-advance every 5 seconds. Measured padding: desktop 8 top / 20 sides, mobile 8 top / 8 sides. Hero heading supports the white underline variant (2.4). Primary and secondary button arrows render from the icon snippet in code, not merchant fields. Measured button radius: 12 desktop, 6 mobile (F1).

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Desktop image | image\_picker | Block. Rendered with mobile image via picture tag. |
| Mobile image | image\_picker | Block. |
| Desktop video | video | Block. Priority over images; poster from video.preview\_image. |
| Mobile video | video | Block. Same rules. |
| Badge text | text | Block. Short label. |
| Badge text color | color | Block. |
| Badge background color | color | Block. |
| Heading | richtext | Block. Underline-enabled. |
| Description | richtext | Block. |
| Primary button label | text | Block. Arrow icon embedded in code. |
| Primary button link | url | Block. |
| Primary button background color | color | Block. |
| Primary button text color | color | Block. |
| Secondary button label | text | Block. Outline style per design (transparent fill, 1px \#466E2E stroke). |
| Secondary button link | url | Block. |
| Secondary button text color | color | Block. Stroke follows text color. |

**4.2 featured-discounts**

Blocks section. Desktop: blocks in a row, each flex-1, any block count self-adjusts. Mobile: Embla carousel at 1.3 slides per view. The whole block is one link; the CTA with embedded chevron icon is visual only inside it. Corner radius per design, measured at build. Measured padding: desktop 20 top / 20 sides / 32 bottom, gap 20; mobile 8 all sides, gap 8\.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Background color | color\_background | Block. Covers solid and gradient. |
| Background image | image\_picker | Block. Priority over background color. |
| Leaf image | image\_picker | Block. Decorative, positioned top right in code. |
| Category text | text | Block. |
| Discount title | richtext | Block. |
| Tagline | text | Block. |
| Button label | text | Block. Chevron embedded in code. |
| Button link | url | Block. Also the whole-block link target. |

**4.3 hero-text**

Single richtext strip (We're building a healthier India). Line breaks are authored in the richtext, never forced by a max-width. Measured padding: desktop 32 bottom, full-bleed sides; mobile 12 top / 24 bottom.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Tagline text | richtext | Section. Underline-enabled. |

**4.4 tabbed-product-collection**

Bestseller section. Tabs are generated from the selected collections, tab label \= collection title (derived). Active tab gets the smile underline via the shared asset class (`.smile-underline`, shipped and verified by 1.3 — it draws the arc on the element itself, no italic marker and no section-header call needed).

⚠️ **Scope deviation to inherit (1.3, 2026-08-11).** The design underlines only the **trailing word** of the active tab label — Figma's active tab reads "Just Dropped" at 221px with a 138px arc right-aligned to the label end, i.e. under "Dropped" alone. `.smile-underline` spans the **whole** tab element. Tab labels are derived collection titles, so no word-level marker is available and a class-only hook cannot know where to start. Matching the design exactly would require splitting the trailing word into its own element inside the tab. Accepted as-is unless design objects. Renders the first 4 products of the active collection through the product-card snippet. View All links to the active tab collection URL. Measured padding: desktop 32 / 60, gap 24; mobile 24 / 20, gap 20\.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Collections | collection\_list | Section. One tab per collection. |
| Show product featured image in cards | checkbox | Section. Drives the product-card image logic (4.5). |
| View All label | text | Section. Link is derived from the active collection. |

**4.5 product-card snippet (shared)**

One snippet reused by tabbed-product-collection and featured-products; product passed as prop, plus flags: show\_featured\_image, hide\_price. Single evaluation acceptance criterion applies (2.6). Fonts per normalization table (2.1).

| Element | Source | Notes |
| :---- | :---- | :---- |
| Badge | product custom.product\_badge | Style: \#F4C430 fill, radius 8, DM Sans Medium 12\. |
| Wishlist icon | app integration | Shipped inert until the wishlist app is selected (OD1). |
| Image | featured image or custom.card\_image | Toggle ON: featured image. Toggle OFF: card image, with the radiator background image rendered behind it; if a product has no card image, fall back to featured image with no radiator. **OD2 resolved: the radiator comes from per-product `custom.radiator_image` (`file_reference`), not a static theme asset.** ⚠ Undefined case for 1.5 to settle: `card_image` set but `radiator_image` unset — this could not arise under the static-asset option. |
| Category badge | custom.category\_label \+ custom.highlight\_color | Text and color both from product metafields, per decision. |
| Product title | derived (product.title) | 2-line clamp with ellipsis. |
| Highlight text | custom.highlight\_text \+ custom.highlight\_color | 1-line clamp with ellipsis. Same color metafield as category badge. |
| Rating | Judge.me preview badge | Blocked by D2. |
| Price | derived | Sale price \+ compare-at price slashed, shown only when compare-at \> price. Discount percent computed in Liquid, format (X%), color \#D93807. |
| Add to Cart | derived | AJAX via existing themex flow, single-variant products. |

**4.6 shop-by-category**

Recovery Starts Here. Desktop: 5-column grid. Mobile: two rows, 3 columns then 2 columns. Cards are fully clickable; arrow renders from the icon snippet. Measured padding: desktop 32 / 60, gap 24; mobile 24 / 16, gap 24\.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Section heading | richtext | Section. Underline-enabled. |
| Image | image\_picker | Block. |
| Video | video | Block. Priority over image; poster from preview\_image. |
| Card title | text | Block. |
| Background color | color | Block. |
| Text color | color | Block. |
| Link | url | Block. Whole card clickable. |

**4.7 subscribe-letter**

Subscribe & Save band. The email capture reuses themex newsletter.liquid. Background priority: video over image over gradient; video and image have separate desktop and mobile fields. Measured padding: desktop 32 bottom / 60 sides; mobile 24 bottom / 10 sides.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Title | richtext | Section. Underline-enabled. |
| Logo | image\_picker | Section. |
| Subline | text | Section. |
| Background gradient | color\_background | Section. |
| Background image desktop / mobile | image\_picker x2 | Section. Priority over gradient. |
| Background video desktop / mobile | video x2 | Section. Highest priority. |
| Icon | image\_picker | Block (USP row). |
| Title | richtext | Block. |
| Description | text | Block. |

**4.8 media-carousel**

Upselling banners. Mobile: Embla, 1 slide per view, dots overlaid on the blocks. Desktop: static flex row up to 3 blocks; more than 3 enables Embla at 3.2 slides per view. Measured padding: desktop 0 vertical / 60 sides, gap 20; mobile 0 vertical / 10 sides, gap 10\.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Image | image\_picker | Block. |
| Video | video | Block. Priority over image; poster from preview\_image. |

**4.9 shop-by-lifestyle**

Lifestyle cards with a configurable gradient wash behind the section. Cards fully clickable. Measured padding: desktop 32 / 60, gap 24; mobile 24 top / 20 sides, gap 24\.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Heading | richtext | Section. Underline-enabled. |
| Background gradient | color\_background | Section. |
| Image | image\_picker | Block. |
| Video | video | Block. Priority over image. |
| Card title | richtext | Block. |
| Subline | richtext | Block. |
| Link | url | Block. Whole card clickable. |

**4.10 featured-products**

Curated wellness bundles. Products from one collection through the product-card snippet (4.5). Exactly 4 rendered statically; more than 4 enables Embla at 4.2 slides per view on desktop with dots; mobile is always a dotted carousel. Price visibility is a section toggle (design hides price here). Measured padding: desktop 32 / 60, gap 24; mobile 24 / 20, gap 20\.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Heading | richtext | Section. Underline-enabled. |
| Collection | collection | Section. |
| Show price | checkbox | Section. Off per design for this placement. |
| Show product featured image in cards | checkbox | Section. Same logic as 4.4. |
| Background color | color | Section. |

**4.11 announcement-banner**

Thin offer strip. Slide-by-slide auto-advancing carousel (decided: not a marquee), advance interval from a section range setting. Measured padding: desktop 2 vertical / 72 sides; mobile 6 vertical / 10 sides.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Background color | color | Section. |
| Text color | color | Section. |
| Speed | range | Section. Auto-advance interval. |
| Text | richtext | Block. |
| Link | url | Block. Optional. |

**4.12 timeline**

About Us band (Our process since 1893), full bleed. A progress line animates smoothly from the first block to the last, time-based, starting when the section enters the viewport (IntersectionObserver). Per-step duration and loop behavior are OD3. Accent CTA measured: radius 20 h50 desktop, radius 6 h34 mobile (F1).

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Heading | richtext | Section. Underline-enabled. |
| Button label | text | Section. Arrow embedded in code. |
| Button link | url | Section. |
| Image | image\_picker | Block. |
| Timeline | text | Block. Year label (1893). |
| Label | text | Block. Product count text. |

**4.13 claims**

Trusted By Millions stats row. Plus glyph and dividers render in code. Measured padding: desktop 32 / 60, gap 160; mobile 24 / 20, gap 24\.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Heading | richtext | Section. Underline-enabled. |
| Claim title | text | Block. (Average ratings). |
| Claim value | text | Block. (4.8, 2M, 130). |
| Claim icon | image\_picker | Block. |

**4.14 see-it-in-action (app-rendered: Quinn)**

Rendered by the Quinn app (D3). The theme provides the section wrapper and the standard header (richtext heading with underline). Any visual gap between the app rendering and the Figma design is flagged in writing before sprint review, never silently absorbed.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Heading | richtext | Section. Underline-enabled. |
| App block | app | Section. Quinn widget mount. |

**4.15 reviews (app-rendered: Judge.me)**

Real People. Real Relief. Rendered by Judge.me (D2). Theme provides wrapper and header; widget typography aligned to DM Sans via widget CSS where the app allows. Same written design-gap review rule as 4.14.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Heading | richtext | Section. Underline-enabled. |
| App block | app | Section. Judge.me widget mount. |

**4.16 featured-blogs and article-card**

Wellness Simplified. Blocks pick individual articles, rendered through a new article-card snippet: badge \= `custom.category_label` metafield, image and title from the article, date from published\_at, read time from the article metafield (D1), Read label with embedded arrow linking to the article, whole card clickable. View All Tips links to a fixed URL per decision (D6). Measured padding: desktop 32 vertical, full-bleed sides; mobile 24 top / 44 bottom.

**Corrected (1.6, 2026-08-11).** Two statements above were wrong and are superseded:

- **Badge is not the derived blog title.** `article.blog` does not exist in Liquid — verified on a live render, where `{{ article.blog.title }}` returns empty. `article | json` exposes `blog_id` but Liquid cannot look up a blog by numeric ID, and `{% for b in blogs %}` iterates nothing, so the `blogs` global is handle-addressable only. The title *is* reachable via `article.url | split: '/blogs/' | last | split: '/' | first` → `blogs[handle].title`, but it was rejected on merit: the store has one blog ("News"), so a derived badge would read "News" on every card instead of the design's Relief / Wellness / Women's Care / Recovery. Badge text, background and text colour are now three article metafields (§3).
- **Title clamps to 1 line on desktop but 2 on mobile**, not 1 everywhere. The mobile frame (`108:11030`) shows two full lines at 14/21 in a 160px box; only desktop (`108:12632`) is a single clamped line.

The **Read label** in the field table below is a featured-blogs section setting. 1.6 also added the
same setting to the pre-existing `sections/blog.liquid` (id `blog_read_label`, default `Read`), so the
snippet needs no hardcoded fallback and neither caller can render an empty affordance.

Badge transparency: the Figma badges are 60% alpha (`#2A7A5099`), but the badge **ships solid**. Shopify's `color` metafield type rejects 8-digit hex (`Value must be a hex color code`), so alpha cannot be stored. `color_modify: 'alpha', 0.6` reproduces the measured value exactly and is the migration path if this is revisited, but hardcoding the alpha was declined.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Heading | richtext | Section. Underline-enabled. |
| Read label | text | Section. Applied to all cards. |
| Article | article | Block. One per card. |

**4.17 footer**

Footer with newsletter capture (themex newsletter.liquid) and four block types. Logo links to the homepage. Measured padding: desktop 20 sides / 20 bottom; mobile 10 sides / 10 bottom.

| Field | Schema type | Level and notes |
| :---- | :---- | :---- |
| Logo | image\_picker | Section. Links to /. |
| Footer description | richtext | Section. |
| Subscription label | text | Section. |
| Footer heading | richtext | Section. |
| Subline below field | richtext | Section. |
| Copyright text | richtext | Section. |
| Background color | color | Section. |
| Text color | color | Section. |
| USP block: icon \+ title | image\_picker \+ text | Block type 1\. Free shipping row. |
| Footer links block: menu | link\_list | Block type 2\. Column heading \= menu title (derived). |
| Social block: icon \+ link | image\_picker (SVG) \+ url | Block type 3\. |
| Policy block: label \+ link | text \+ url | Block type 4\. |

**5\. Dependencies and Open Items**

D items are sprint dependencies, OD items are decisions for devx or Amrutanjan, F items are designer questions answerable in one written sentence.

| ID | Item | Blocks |
| :---- | :---- | :---- |
| D1 | ~~Create metafield definitions per section 3 (5 product, 1 article)~~ **Resolved (0.5, 2026-08-09)** — **7** definitions live on `amrutanjan.myshopify.com`: **6 product** (the original 5 plus `radiator_image` from the OD2 decision) and **1 article**. **Amended (1.6, 2026-08-11): now 10** — 3 more article definitions for the card badge. All namespace `custom`, storefront-visible, pinned | product-card, featured-blogs |
| D2 | Judge.me installed and rating snippet integrated | product-card rating, reviews section |
| D3 | Quinn app installed and configured | see-it-in-action |
| D4 | ~~Space Grotesk and DM Sans WOFF2 files self-hosted in theme~~ **Resolved (0.4, v1.2)** — both families confirmed present in Shopify's font library with every required weight (Space Grotesk `n3`–`n7`, DM Sans `n1`–`n9`); sourced via `font_picker`. Self-hosting not required | all typography |
| D5 | ~~Embla vendored into assets with shared init module~~ **Resolved (0.6, 2026-08-10)** — v8.6.0 core \+ autoplay vendored as UMD in `assets/` (17,946 \+ 2,451 B), loaded deferred and globally from `core-assets.liquid`. **No shared init module**; each carousel section owns standalone JS | all carousels |
| OD1 | Wishlist app selection | product-card wishlist function (icon ships inert) |
| OD2 | ~~Radiator image source: static theme asset vs product metafield~~ **Resolved (0.5, 2026-08-09) — product metafield.** `custom.radiator_image`, `file_reference`, storefront-visible. Chosen over the static-asset recommendation; adds a sixth product definition and creates one undefined case for 1.5 (see 4.5) | product-card card-image variant |
| F1 | ~~Button corner radius varies in design: hero primary 12 (D) vs 6 (M); card Add to Cart 10 at h44 vs 6 at h36-40; View All 20 (D) vs 12 (M); accent CTA 20 (D) vs 6 (M). Confirm one radius per variant or confirm as-designed per placement.~~ **Resolved (1.2, 2026-08-10) — as-designed per placement.** Radii are not normalized; each placement ships its measured value, passed via `class_name`. See 2.5 | button component finalization |
| F2 | **Partially resolved (1.2, 2026-08-10) — ExtraBold ships.** Mobile View All is built at DM Sans **800** as measured, against this row's stated assumption of Regular / Medium / SemiBold / Bold. Note this applies to View All only; View All Tips mobile measures 600. ExtraLight, Light and the 9pt Regular optical variant remain unconfirmed | type ramp finalization |
| F3 | ~~Hover states for buttons and cards are not drawn in Figma. Provide or approve the house hover pattern.~~ **Resolved (1.2, 2026-08-10).** Inverse fill/text swap, 150ms ease, 1px stroke present in every state so nothing reflows; pill uses `opacity: 0.9` on block hover; cards get no hover. All rules inside `@media (hover: hover)`. Full pattern in Global Standards 6.1.1 | desktop polish |

**6\. Summary**

* 14 custom sections, 2 app wrappers, product-card and article-card snippets, all values extracted from the approved design; header is a restyle of the themex boilerplate only.

* Two font families only, Space Grotesk and DM Sans; all stray families and Medium headings normalize in build per the section 2.1 tables.

* Smile underline ships as one shared utility: richtext italic marker \+ wrapper class \+ masked SVG, color and wrapping rules fixed.

* Product data flows through 6 product metafields and Judge.me; category badge text is a plain text metafield, one color metafield drives badge and highlight, and the radiator background is per-product (OD2 resolved).

* 7 dependencies, 4 open decisions, 3 designer flags; F1 radius and OD1 wishlist app are the items most likely to touch build order.

