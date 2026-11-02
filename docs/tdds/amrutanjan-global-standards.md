# Amrutanjan, Typography, Components and Standards

**Amrutanjan, Typography, Components and Standards**

World of Amrutanjan D2C Storefront | Shopify (themex base) | devx | July 2026 | v1.7

**1\. Purpose and Scope**

This document defines the global standards for the World of Amrutanjan Shopify storefront. It applies to every page. Each approved page additionally gets its own Sprint document with per-section schema contracts (Homepage Sprint v1.1 exists). All values here are extracted from the approved Homepage design (desktop 1440px, mobile 390px), July 2026\. Values are extracted, not estimated; anything not extractable is marked TBD with an owner. New global findings from future pages land here as a version bump, never in Sprint documents.

**2\. Stack and Development Principles**

| Principle | Standard |
| :---- | :---- |
| Base theme | themex, the devx in-house Shopify Online Store 2.0 boilerplate. Existing features (newsletter, filters, search, AJAX add to cart, cart drawer, menu) are reused, not rebuilt. |
| CSS | Tailwind v3.4 utility-first. Design tokens as CSS custom properties output by snippets/css-variables.liquid and consumed via the Tailwind config. Non-utility component styles in assets/base.css, BEM-inspired naming. No custom CSS. |
| JavaScript | Vanilla JS, no frameworks, no jQuery. Theme-authored code uses ES modules and Web Components. **Vendored third-party libraries load as UMD globals** (Embla `EmblaCarousel`/`EmblaCarouselAutoplay`, Idiomorph `Idiomorph`) — ESM cannot resolve relative imports against Shopify's hashed asset URLs without an import map (0.6, v1.4). DOM targeting via data-\* attributes, never class names. Cross-component communication via CustomEvent. |
| Development order | Mobile-first: the mobile design is the base spec, desktop is the enhancement layered on via breakpoints (xs 375, sm 430, md 768, lg 1024, xl 1280, 2xl 1536). |
| Content authoring | Everything merchant-visible is editable. Headings, titles, sublines, descriptions are richtext; plain text only for short labels. No hardcoded copy or images. Blocks never declare max limits. CTA is always a label \+ link pair. |
| Icons | Decorative arrows and chevrons are embedded in code as icon snippets. Merchant-supplied icons are SVGs uploaded to Shopify Files via image\_picker. |

**3\. Typography Tokens**

**3.1 Font Families**

| Family | Role | Weights used |
| :---- | :---- | :---- |
| Space Grotesk | Display and headings | Bold (Medium occurrences in Figma normalize to Bold per decision) |
| DM Sans | Body, labels, buttons, cards, everything else | Regular, Medium, SemiBold, Bold (other styles in file pending F2) |

Only these two families exist in build; every other family measured in Figma (Poppins, Inter, Manrope) is normalized to DM Sans, family swap only, size and weight preserved.

**Sourcing (v1.3, supersedes D4).** Both families are sourced from Shopify's font library via `font_picker`, **not** self-hosted WOFF2. Both were confirmed present in the published library with every weight the design requires — Space Grotesk `n3 n4 n5 n6 n7`, DM Sans `n1`–`n9`. Six faces ship: Space Grotesk 500 and 700; DM Sans 400, 500, 600 and 700. `font-display: swap` on all; only Space Grotesk 700 and DM Sans 400/600 are preloaded.

Space Grotesk 400 is deliberately not emitted — no instance uses it, and a 400 request resolves to the 500 face within the family. Space Grotesk 600 is not emitted either: every 600 instance is a heading that normalizes to Bold. The operative rule is **Space Grotesk ≥24px → 700, ≤18px → 500**.

⚠️ **Shopify's Space Grotesk has no italic variants** (normal weights only). Any component that uses italic markup on a Space Grotesk heading — notably the section-header smile underline, which marks words via richtext italics — must set `font-style: normal` on the marked span, or the browser will synthesize a faux oblique.

**3.2 Type Scale, Mobile (base)**

| Token | Value | Used for |
| :---- | :---- | :---- |
| hero-heading | Space Grotesk Bold 32 | Hero slide heading |
| section-heading | Space Grotesk Bold 24 | Every section heading |
| strip-heading | Space Grotesk Bold 26 | Full-width text strip (hero-text section) |
| offer-display | Space Grotesk Bold 32 | Offer numbers (50% OFF) |
| subheading | DM Sans SemiBold 16 | Card titles, subheadings |
| body | DM Sans Regular 12 | Body and description text |
| label | DM Sans Medium/SemiBold 10 to 14 | Badges, prices, buttons, meta text |

**3.3 Type Scale, Desktop**

| Token | Value | Used for |
| :---- | :---- | :---- |
| hero-heading | Space Grotesk Bold 56 | Hero slide heading |
| section-heading | Space Grotesk Bold 34 | Every section heading |
| strip-heading | Space Grotesk Bold 38 | Full-width text strip (hero-text section) |
| offer-display | Space Grotesk Bold 42 | Offer numbers (50% OFF) |
| subheading | DM Sans SemiBold 18 | Card titles, subheadings |
| body | DM Sans Regular 14 | Body and description text |
| label | DM Sans Medium/SemiBold 11 to 16 | Badges, prices, buttons, meta text |

Flag F2 (open, designer): the Figma file still contains DM Sans ExtraBold (mobile View All), ExtraLight, Light, and a 9pt Regular optical variant. Build assumes the four weights in 3.1 until answered.

**4\. Color Tokens (extracted)**

| Token | Value | Role |
| :---- | :---- | :---- |
| \--color-primary | \#466E2E | Primary green: buttons, links, active states |
| \--color-brand-yellow | \#FACC15 | Hero background yellow |
| \--color-accent | \#F4C430 | Accent yellow: badges, accent CTA, smile underline default |
| \--color-green-secondary | \#2A7A50 | Strokes, badge borders |
| \--color-green-dark | \#113422 | Footer background |
| \--color-text | \#171717 | Primary text |
| \--color-text-muted | \#737373 | Secondary text (\#525252, \#404040 supporting greys) |
| \--color-cream | \#FEF9EA / \#FAF8F4 | Cream section backgrounds |
| \--color-sale | \#D93807 | Discount percentage |
| \--color-rating | \#FF9C05 | Rating stars |
| banner set | \#00949E / \#E6790F / \#0094D1 | Discount banner text colors (merchant-set per block) |

**5\. Spacing System (measured)**

**5.1 Desktop**

| Token | Value | Where measured |
| :---- | :---- | :---- |
| section-padding-x | 60px | Standard sections (1320px content on 1440\) |
| section-padding-y | 32px | Standard top and bottom |
| section-gap | 24px | Standard internal gap |
| Exceptions | 20px sides | Hero, Discount, Footer |
| Exceptions | 72px sides | Announcement banner |
| Exceptions | full bleed | hero-text, timeline (About Us), featured-blogs wrapper |

**5.2 Mobile**

| Token | Value | Where measured |
| :---- | :---- | :---- |
| section-padding-x | 20px | Standard sections |
| section-padding-y | 24px | Standard top and bottom |
| section-gap | 20px | Standard internal gap |
| Exceptions | 8px sides | Hero, featured-discounts |
| Exceptions | 10px sides | subscribe-letter, media-carousel, Footer |
| Exceptions | 16px sides | shop-by-category |
| Exceptions | 44px bottom | featured-blogs |

Per-section values are followed as measured in Figma (recorded in each Sprint schema lead). The scattered mobile side paddings are as designed; any future normalization is a designer decision, not a build decision.

**6\. Component System**

**6.1 Buttons**

One button snippet with variants, shipped as `snippets/button.liquid` (1.2).

**F1 resolved (1.2, 2026-08-10) — as-designed per placement.** Corner radius is not normalized to one value per variant; every measured value is built as drawn. Measured values live in the Homepage Sprint 2.5 table and, in full per-placement form, in the `.button--size-*` rules in `assets/base.css` (previously in the snippet's `{% doc %}` block, trimmed 2026-08-11).

**A variant owns colour and the always-on stroke; a size owns height, radius, padding and type.** Both live in `assets/base.css` as `.button` / `.button--*` / `.button--size-*`; the snippet emits no Tailwind utilities of its own, so a caller's `class_name` can never collide with snippet output.

**Superseded (1.2 extension, 2026-08-11).** This paragraph previously read "height, radius, padding and type are supplied per call site through a `class_name` parameter, because the seven placements share no dimensional values." That is no longer true. Every measured placement now has a named size; `class_name` carries per-placement *deltas* on top of a size, not whole dimension sets. The reversal is recorded in the roadmap status log.

| `size` | Placement it reproduces | Height mobile / desktop |
| :---- | :---- | :---- |
| `xs` | Accent CTA | 34 / 50 |
| `sm` | Inline form submit | 36 / 36 |
| `md` | Card Add to Cart | 36 / 44 |
| `lg` | Hero primary CTA | 40 / 50 |
| `xl` | View All Tips | 41 / 50 |
| `2xl` | View All | 46 / 50 |
| `pill` | Banner pill | 28 / 31 |
| `badge` | Product badge | 30 / 30 |

`pill` and `badge` are sizes, not variant properties — a size is never baked into a variant, so those placements pass `variant: 'pill', size: 'pill'`. **The full per-placement values now live in `assets/base.css` as the `.button--size-*` rules, which are the source of truth** — the snippet's `{% doc %}` block was trimmed to a bare parameter list on 2026-08-11 and no longer carries them. The size table above is the caller-facing index.

⚠️ **An unprefixed utility in `class_name` overrides a size at every width, not just mobile** — Tailwind emits `.h-\[44px\]` outside any media query and media queries add no specificity. Overrides of a responsive property must pair both breakpoints (`h-[44px] lg:h-[50px]`). Type must be overridden as a set (`text-*` + `leading-*` + `tracking-*`) or not at all, or the placement inherits an unmeasured pairing.

**The snippet is also a button, not only a colour-and-stroke wrapper (1.2 extension, 2026-08-11).** It renders `type="submit"` / `"reset"`, a `disabled` state, a loading state, an icon in either position drawn from the 1.1 set, rich pre-captured `content` in place of the escaped `label`, and the a11y and form attributes interactive controls need (`aria-label`, `aria-controls`, `aria-expanded`, `aria-pressed`, `aria-describedby`, `aria-haspopup`, `id`, `name`, `title`, `target`/`rel`). A `variant: 'unstyled'` value emits `.button` alone, so a legacy surface can adopt the behaviour without inheriting design-system colour. Disabled and loading states are styled in `base.css` as `.button[disabled]` / `.button[aria-disabled='true']` / `.button.is-loading`, and the hover rules are guarded with a zero-specificity `:not(:where(...))` so a disabled button cannot still perform its fill swap.

| Variant | Style |
| :---- | :---- |
| Primary solid | \#466E2E fill, white text, 1px \#466E2E stroke, DM Sans SemiBold 16 (D) / 14 (M) |
| Secondary outline | Transparent fill, 1px \#466E2E stroke, green text, DM Sans SemiBold |
| Banner pill | White fill, per-block colored text, radius 20. Renders a non-interactive `span` |
| Accent CTA | \#F4C430 fill, dark text, 1px \#F4C430 stroke |
| Product badge | \#F4C430 fill, DM Sans Medium 12, green text, radius 8. No stroke. Renders a non-interactive `span` |

**Product badge stroke removed (1.2, 2026-08-10).** This table and Sprint 2.5 both previously specified a 0.5px \#2A7A50 stroke on the badge. The measured design extraction contains no such stroke on the badge at any instance; the only 0.5px stroke in that area is \#F4C430 on the product-card container. Built without it.

**6.1.1 Hover states (F3 resolved, 2026-08-10)**

Hover ships. The pattern is an inverse fill/text swap, 150ms ease, on `background-color` and `color` for the button variants and on `opacity` for the banner pill. Nothing else animates.

A **1px stroke is present in every state** on primary, secondary and accent — never added or removed on hover, so a button cannot reflow. At rest on primary and accent the stroke colour equals the fill colour, making it invisible until the fill goes transparent.

| Variant | Default | Hover |
| :---- | :---- | :---- |
| Primary | fill \#466E2E, white text, 1px \#466E2E stroke | transparent fill, \#466E2E text, 1px \#466E2E stroke |
| Secondary | transparent fill, \#466E2E text, 1px \#466E2E stroke | fill \#466E2E, white text, 1px \#466E2E stroke |
| Accent | fill \#F4C430, dark text, 1px \#F4C430 stroke | transparent fill, \#F4C430 text, 1px \#F4C430 stroke |
| Banner pill | white fill, banner-coloured text | no colour change; `opacity: 0.9` on **block** hover, owned by 2.7 |
| Product badge | \#F4C430 fill, green text | none — not interactive |

Cards get **no** hover state, in any section.

All hover rules and their transitions live inside a single `@media (hover: hover)` block so touch devices do not retain sticky states after a tap. 1.2 ships the pill's `opacity` transition only; the section that owns the block supplies the hover trigger and must place it inside the same media query.

**Focus styling ships (1.2 extension, 2026-08-11).** `.button:focus-visible` paints a 2px `--color-foreground` outline at `outline-offset: 2px` over a 4px `--color-primary-foreground` `box-shadow` halo, so the indicator reads on a cream section and on dark hero imagery alike. `outline` sits outside the border box, so the no-reflow rule above is unaffected. This closes the departure previously recorded here, which read "no custom focus styling ships (1.2)" and pointed at an open accessibility item.

**The 44×44 mobile touch target is still NOT met** at any placement — measured mobile heights are 34, 36, 36, 40, 41, 46, 28 and 30. Closing it means either changing measured heights or an overlay that intercepts clicks on adjacent elements, which is a per-placement design decision rather than a component one. It remains an open accessibility item in the roadmap status log.

**6.2 Section Header Pattern**

One shared section-header snippet (`snippets/section-header.liquid`): richtext heading (heading-section token) supporting the smile underline. Underline: merchants italicize word(s) in richtext; the heading element itself carries the has-smile-underline class; CSS draws the extracted arc SVG (viewBox 0 0 139 9, path M0.21 0.98 C0.21 0.98 32.06 7.98 67.69 7.98 C103.33 7.98 138.21 0.98 138.21 0.98, stroke-width 2\) on an ::after via CSS mask with preserveAspectRatio none, stretched to the span width, color from \--underline-color. Marked span is display inline-block so the combination wraps as one unit. CSS targets both `em` and `i` — Shopify's richtext permits either for italics.

Built values (1.3, 2026-08-11), measured on a real render at 390 and 1440:

* Arc box is **9px tall** with `bottom: -3px`, so the arc bottom sits 3px below the marked span's line box. One rule serves both viewports, because the span's box height equals the heading's inherited line-height (32px mobile / 47px desktop).
* Under a CSS mask the painted stroke equals `stroke-width × (boxHeight ÷ viewBoxHeight)` and is **independent of width**. 9px is therefore the only height that renders the specified 2px stroke; the modal 7px design bbox would render 1.5px. Verified at marked widths from 71px to 451px.
* `--underline-color` holds a **complete colour value** and is consumed with a `var()` fallback of `rgb(var(--color-accent))`. It is never declared at `:root`. A bare `var(--color-accent)` would be invalid — §4's colour properties are space-separated RGB triplets, not colours.
* Heading colour is set on `.has-smile-underline` in `base.css`, not as a Tailwind utility, so a caller's `text-*` class always wins on cascade order.

⚠️ **There is no white variant in the design.** The earlier claim that one "exists on hero" was unfounded: Figma node `108:10713` (the mobile hero this was attributed to) contains no arc vector anywhere in its subtree, and all 20 arc instances across the approved design are \#F4C430. The `--underline-color` override still ships and is verified working, because §-level dark backgrounds exist (about-us places the arc over a \#466E2E80 wash) — but no section currently needs white, and no acceptance criterion asserts one.

**6.3 Product Card**

One product-card snippet reused by every product grid and slider, product passed as prop with show\_featured\_image and hide\_price flags. Full contract in Homepage Sprint 4.5. Data via product metafields (badge, category label, highlight text, one shared color, optional card image) and Judge.me ratings. Sections rendering cards expose the Show product featured image in cards toggle.

**6.4 Carousels and Auto-advancing Strips**

All carousels are Embla, vendored as a static asset (no CDN), loaded deferred. **There is no shared init module** (0.6, v1.4): the library and its autoplay plugin load globally, and each carousel section owns a complete standalone JS file — no shared module, base class or helper. Slide width is CSS `flex-basis`, never an Embla option. The announcement banner is a slide-by-slide Embla carousel with a merchant speed setting, not a marquee. Repeated sections: ES modules evaluate once per URL and behavior is wrapped in custom elements with a customElements.get guard, so N instances each initialize once. This is an acceptance criterion.

**7\. Performance Standards**

* Images: picture elements with separate desktop and mobile sources (themex image.liquid), correct srcset widths, loading lazy \+ decoding async below the fold. No CSS background images; img elements styled with object-fit and object-position.

* LCP: first hero slide image eager, fetchpriority high, preloaded; subsequent slides lazy.

* Fonts: sourced from Shopify's font library via `font_picker` (v1.3, supersedes D4 — not self-hosted). Preload only above-the-fold weights (Space Grotesk 700, DM Sans 400/600), font-display swap. Font preloads are hand-written `<link>` tags carrying `crossorigin`, since `preload_tag` accepts only `asset_url`/`global_asset_url`/`shopify_asset_url`, never `font_url`.

* Video: Shopify-hosted, poster from video.preview\_image, muted \+ playsinline \+ loop, lazy-initialized near viewport. Video takes priority over image wherever both fields are set.

* Scripts: no render-blocking scripts; per-section modules loaded only where the section is present; third-party app scripts (Judge.me, Quinn) deferred and main-thread-audited before launch.

  * **Knowing exception (0.6, 2026-08-10, v1.4).** Embla core \+ autoplay (20,397 B) load globally from `snippets/core-assets.liquid`, including on pages with no carousel. Chosen over per-section loading by decision; section JS still loads per-section. The DoD criterion "carousel JS does not load on pages with no carousel" is struck, and 5.2 performance-pass measures and records the cost on a carousel-free page instead of asserting absence.

* Gate: Lighthouse mobile is the per-section performance gate.

**8\. Libraries**

| Library | Purpose | Notes |
| :---- | :---- | :---- |
| Embla Carousel | All carousels and the announcement banner | v8.6.0 core \+ autoplay plugin, vendored in assets as UMD, no CDN. Loaded globally from core-assets.liquid; **no shared init module** — per-section standalone JS |
| Judge.me (app) | Ratings and reviews | Card preview badge \+ reviews section widget |
| Quinn (app) | Shoppable video (see-it-in-action) | App-rendered, theme provides wrapper \+ header |
| No other runtime libraries |  | Anything new requires an OD decision first |

**9\. Summary**

* Two font families only: Space Grotesk Bold for headings, DM Sans for everything else; every stray family in Figma normalizes to DM Sans.

* Tokens: heading 34/24, body 14/12, padding-x 60/20, padding-y 32/24, gap 24/20 (desktop/mobile), colors per section 4\.

* One button snippet, one section-header snippet with the smile underline utility, one product card; Embla vendored for every carousel.

* Open flags carried from the Homepage Sprint: F1 button radii, F2 odd DM Sans weights, F3 hover states.

* This document is the single source of global truth; changes land here as version bumps, never only in chat or Sprint docs.
