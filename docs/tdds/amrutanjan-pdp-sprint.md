**Amrutanjan, Product Detail Page Sprint**

World of Amrutanjan D2C Storefront | Shopify (themex base) | devx | August 2026 | v1.1

Version note. Every dimension and string in v1.0 was re-verified against the Figma file in a three-pass check. That check found four errors, which are corrected here and listed in section 9\. Values in this version have each been read twice from the file.

**1\. Sprint Scope**

This sprint builds the product detail page for desktop (1440 px) and mobile (390 px). Every dimension, colour and string quoted in this document was read out of the approved Figma file; nothing is estimated. Where the design does not carry a value, it is marked TBD against an owner rather than filled in with a guess.

| Item | Decision |
| :---- | :---- |
| In scope | Ten sections: main-product, product-details, frequently-bought-together, trust-strip, see-it-in-action, external-ratings, review-section, picked-just-for-you, certified and sticky-atc. All states drawn in the design, on both breakpoints. |
| Data approach | All product-varying content is held on the product itself, through metafields that point at metaobjects. Template and section settings define layout, order and content that is identical across every product. A merchant editing one product never touches theme settings. |
| Excluded, subscriptions | The purchase option area is built as a visual placeholder only. No selling plan, no subscription widget, no recurring logic. Tracked as D1; the stack decision is still open. |
| Excluded, review popup | The write-a-review popup is out of scope for this sprint by decision. |
| Excluded, Clinically Proven | A Clinically Proven Section exists in the design (mobile 390x309) but is set to hidden and is out of scope by decision. |
| Reused | product-card snippet unchanged apart from one new prop for the FBT placement. Global Standards for all type, colour and spacing tokens. themex image.liquid picture snippet, AJAX cart drawer, Embla carousel already vendored into assets. |

**2\. Template Composition and Section Order**

Sections are ordered in the template, not hard-wired. The two breakpoints render the same section list; the difference is internal layout, plus one structural difference in how the gallery and buy box nest.

**2.1 Measured mobile inventory (390 px)**

Read directly from the mobile frame, in document order with measured heights. This is the authoritative order for both breakpoints.

| Order | Frame in design | Measured size | Maps to |
| :---- | :---- | :---- | :---- |
| 1 | Gallery | 390 x 378 | main-product, media column |
| 2 | Container | 390 x 1149 | main-product, buy box |
| 3 | Product Details | 390 x 985 | product-details |
| 4 | Frequently Bought Together | 390 x 412 | frequently-bought-together |
| 5 | Trust Strip | 390 x 120 | trust-strip |
| 6 | Section (unnamed in design) | 390 x 676 | see-it-in-action, confirmed against the desktop frame name |
| 7 | User Rating Section | 390 x 181 | external-ratings |
| 8 | Review Section | 390 x 851 | review-section |
| 9 | Picked Just for You container | 390 x 432 | picked-just-for-you |
| 10 | Certified Section | 390 x 134 | certified |
| 11 | Sticky Add to Cart (hidden in design) | 390 x 64 | sticky-atc, rendered conditionally |

**2.2 Measured desktop inventory (1440 px)**

Read from the PDP \- Desktop frame, which is 1440 x 7349\. Paddings are given as top / right / bottom / left with the auto layout gap.

| Order | Frame in design | Measured size | Padding and gap |
| :---- | :---- | :---- | :---- |
| 1 | Mobile Menu (header) | 1440 x 110 | 0/60/0/60 g0 |
| 2 | Offer Banner | 1440 x 28 | 2/20/2/20 g10 |
| 3 | Breadcrumbs Section | 1440 x 36 | 10/20/10/20 g10 |
| 4 | Gallery (media plus buy box) | 1440 x 1238 | 0/0/0/0 g0 |
| 5 | Product Details (tabbed area) | 1440 x 2190 | 0/0/0/0 g0 |
| 6 | Frequently Bought Together | 1440 x 588 | 52/60/52/60 g12 |
| 7 | Trust Strip | 1440 x 162 | 32/0/32/0 g0 |
| 8 | See It In Action Section | 1440 x 751 | 52/60/52/60 g24 |
| 9 | Review Section | 1440 x 938 | 52/60/52/60 g24 |
| 10 | Picked Just For You Section | 1440 x 559 | 0/60/0/60 g10 |
| 11 | Certified Section | 1440 x 196 | 32/60/44/60 g24 |
| 12 | Clinically Proven Section (hidden) | 1440 x 372 | 24/60/52/60 g24 |
| 13 | Footer | 1440 x 553 | 0/20/20/20 g10 |
| 14 | Sticky Add to Cart (hidden here) | 1440 x 64 | 12/16/12/16 g12 |

Content width on desktop is 1320, being 1440 less the 60 side padding on each side. Every inner container measured 1320 wide, which confirms the content column.

**2.3 Structural differences between breakpoints**

The two breakpoints do not render an identical section list. There are two real differences and both affect the build.

| Difference | What the file actually shows |
| :---- | :---- |
| Gallery and buy box nesting | On mobile these are two separate top-level frames, Gallery (390 x 378\) then Container (390 x 1149). On desktop both sit inside one Gallery frame (1440 x 1238\) as a two-column layout. Nesting only, same content. Both resolve to one main-product section with a responsive grid. |
| External ratings placement | On mobile the ratings strip is its own top-level frame, User Rating Section (390 x 181), and mobile Review Section has only two children. On desktop there is no separate frame; the strip sits inside Review Section as a child named User Rating (1320 x 114), alongside Review Container (1320 x 200\) and Review List Container (1320 x 472). So the strip is top-level on mobile only. |

Build consequence. The strip is still built as its own section, per decision, which is the more flexible outcome. But that decision is not supported by the desktop file, only by the mobile file, and the desktop layout will need the section to sit flush against review-section with no gap between them so it reads as one block, matching the desktop design.

Mobile paddings on the two main-product frames: Gallery uses 10 top, 20 sides, 0 bottom with a 10 gap. Container uses 24 top, 20 sides, 40 bottom with a 32 gap between its stacked groups.

**3\. Data Model**

One rule governs the whole page. Content that differs per product lives on the product. Content that is identical on every product lives in section settings. The merchant experience this produces is a single product page in the Shopify admin where every tab, ingredient, offer and step is filled in, with no theme editing at all.

The pattern for every rich content group is the same. A metaobject definition holds the shape of one entry. A product metafield of type metaobject reference, or list of metaobject references, points at the entries for that product. The section setting then names which metafield to read, so the same section can be reused if the key ever changes. All **metafield** namespaces are custom — but **metaobject types carry no namespace at all**, which is the framing error that produced the `custom.<type>` notation corrected in §3.1. Not every group needs a metaobject either: `product_description` was collapsed to two plain metafields because its content was 1:1 with the product.

**3.1 Metaobject definitions**

Correction against v1.1, applied by PRD 0.1 on 2026-08-22. **Metaobject types carry no namespace.** A metaobject `type` is a bare handle and Liquid addresses it as `metaobjects.<type>`, so the `custom.` prefix written below in v1.1 was never literal. The store's ten pre-existing definitions confirm it (`subscribe_save`, `mega_menu_link`). Types are listed here as created. Field order is the admin form order.

| Metaobject | Type | Fields | Used by |
| :---- | :---- | :---- | :---- |
| Helps With | helps\_with | label (single\_line\_text\_field, required), icon (file\_reference) | main-product, Helps with row |
| Offer | offer | title (single\_line\_text\_field, required), description (single\_line\_text\_field), code (single\_line\_text\_field), icon (file\_reference) | main-product, Available Offers |
| Free Gift | free\_gift | title (single\_line\_text\_field, required), description (single\_line\_text\_field), image (file\_reference) | main-product, free gift strip |
| How To Use | how\_to\_use | name (single\_line\_text\_field, required), steps (list.metaobject\_reference → how\_to\_use\_step), banner\_image (file\_reference) | product-details, How to use tab |
| How To Use Step | how\_to\_use\_step | step\_number (single\_line\_text\_field), step\_name (single\_line\_text\_field, required), title (single\_line\_text\_field), description (multi\_line\_text\_field), image (file\_reference) | Nested inside How To Use |
| Ingredient | ingredient | title (single\_line\_text\_field, required), description (multi\_line\_text\_field), image (file\_reference) | product-details, Ingredients tab |
| FAQ | faq | question (single\_line\_text\_field, required), answer (rich\_text\_field) | product-details, FAQs tab |

Three further corrections applied by 0.1:

- **Product Description is no longer a metaobject.** v1.1 gave it no fields at all, and it held only an eyebrow and two images 1:1 with the product — pure indirection costing the merchant a create-entry-then-link round trip. It is now two plain product metafields, `custom.description_eyebrow` and `custom.description_media`. Seven metaobject definitions exist, not eight.
- **How To Use gained a `name` field.** v1.1 gave the type no text field, so entries would have carried autogenerated display names in the admin. Every `mega_menu_*` definition in this store carries a `name` field for exactly this reason.
- **Helps With field order inverted** to `label` then `icon`, so the admin form leads with the label and `displayNameKey` resolves to it.

Every definition sets `displayNameKey` explicitly — `label`, `title`, `name`, `step_name`, `question` — and `access.storefront: PUBLIC_READ`. Note that PUBLIC_READ is **not** required for Liquid, which reads metaobjects regardless; it is set only so a future Storefront-API or headless read is not blocked. The eight `mega_menu_*` definitions are `NONE` and render in Liquid today.

**3.2 Product metafields**

| Owner | Namespace and key | Type | Liquid access |
| :---- | :---- | :---- | :---- |
| Product | custom.helps\_with | list.metaobject\_reference | product.metafields.custom.helps\_with |
| Product | custom.offers | list.metaobject\_reference | product.metafields.custom.offers |
| Product | custom.free\_gift | metaobject\_reference | product.metafields.custom.free\_gift |
| Product | custom.description\_eyebrow | single\_line\_text\_field | product.metafields.custom.description\_eyebrow |
| Product | custom.description\_media | list.file\_reference | product.metafields.custom.description\_media |
| Product | custom.how\_to\_use | metaobject\_reference | product.metafields.custom.how\_to\_use |
| Product | custom.pro\_tip | single\_line\_text\_field | product.metafields.custom.pro\_tip |
| Product | custom.ingredients | list.metaobject\_reference | product.metafields.custom.ingredients |
| Product | custom.faqs | list.metaobject\_reference | product.metafields.custom.faqs |
| Product | custom.lab\_report | file\_reference | product.metafields.custom.lab\_report |
| Product | custom.product\_badge | single\_line\_text\_field | product.metafields.custom.product\_badge |
| Product | custom.category\_label | single\_line\_text\_field | product.metafields.custom.category\_label |
| Product | custom.highlight\_text | single\_line\_text\_field | product.metafields.custom.highlight\_text |

Corrections against v1.1, applied by PRD 0.1 on 2026-08-22 after reading the live store:

- **`custom.badge` was wrong and was never created.** The key the theme actually ships and reads is **`custom.product_badge`** (`snippets/product-card.liquid:54`). Corrected in the table above.
- **"The last three already exist from the homepage sprint" understated the count by nine.** **Twelve** `custom` product metafield definitions existed before this sprint: the six homepage card keys (`product_badge`, `category_label`, `highlight_color`, `highlight_text`, `card_image`, `radiator_image`) plus **`bundle_contents`, `concerns`, `format`, `benefits`, `size_pack`, `offer_value`** from the search sprint. The theme reads **eight** of the twelve: the six card keys, plus `bundle_contents` (`snippets/bundle-card-featured.liquid:34`) and `concerns` (`snippets/concern-bar.liquid`). The four unread ones are `format`, `benefits`, `size_pack` and `offer_value`.
- **Two further keys are populated with no definition at all.** `custom.rating_value` and `custom.review_count` carry values on all 49 products but have no metafield definition. Relevant to 1.9, which inherits the hard-coded 4.7/132 in the card.
- **`custom.offer_value` is not `custom.offers`.** The pre-existing `offer_value` is a `list.single_line_text_field` of choices, populated on ~30 products, and is untouched by this sprint.

After 0.1 the product carries **22** `custom` metafield definitions: the 12 above plus the 10 created here. Pinned order is the 10 PDP keys at 1–10 and the 6 card keys at 11–16.

Pro tip is a plain text field on the product rather than a field inside the How To Use metaobject, by decision, so that a merchant can change the tip without opening the metaobject entry.

Ingredients and FAQs are lists of metaobject references, so the rendered count follows the number of entries. There is no fixed row count in any definition — verified by adding a fifth entry to each and reading the count back in Liquid. Note one platform ceiling the design never approaches: **Liquid caps `list.metaobject_reference` iteration at 50 entries**, an undocumented for-loop cap, so "no fixed row count" holds below 50.

`custom.lab_report` deliberately carries **no** `file_type_options` validation. That validation accepts only `Image` and `Video`, so any restriction would reject the PDF it exists to hold.

**4\. Section Contracts**

**4.1 main-product**

The largest section on the page. Two columns on desktop, stacked on mobile. Blocks define the order of the buy box so the merchant can reorder or remove groups per template.

**Section settings**

| Setting ID | Type | Purpose |
| :---- | :---- | :---- |
| enable\_share | checkbox | Shows the share control. Uses the browser native share sheet where available, with a copy link fallback. |
| enable\_wishlist | checkbox | Renders the wishlist control as a placeholder. Flits is not integrated yet, tracked as D2. |
| thumbnail\_count\_desktop | range | How many thumbnails are visible before the gallery scrolls. |
| delivery\_min\_days | range | Lower bound of the delivery estimate. Default 3\. |
| delivery\_max\_days | range | Upper bound of the delivery estimate. Default 5\. |
| free\_gift\_message | richtext | Static message shown beside the free gift. Identical on every product, so it lives here, not on the product. |

**Block types**

| Block | Purpose | Settings |
| :---- | :---- | :---- |
| title | Badge, category label, product title, size or variant label | None. All content is read from the product and its metafields. |
| rating | Rating figure and review count | rating\_value (text), review\_count (text). Hard-coded by decision until Judge.me is wired, tracked as D3. |
| price | Price, compare at price, saving | None. Saving is derived from price against compare at price, never entered. |
| variant\_picker | Size selector | None. Renders the product's option values. |
| purchase\_options | Subscription placeholder | placeholder\_label (text). Visual only, see D1. |
| helps\_with | Icon and label row | metafield\_key (text, default helps\_with), heading (text) |
| offers | Available Offers, horizontal scroller | metafield\_key (text, default offers), heading (text) |
| delivery | Pincode field and estimate | heading (text), subtext (text) |
| buy\_buttons | Add to Cart and Buy Now | show\_buy\_now (checkbox) |
| free\_gift | Free gift strip | metafield\_key (text, default free\_gift) |

Correction against v1.0. An action\_buttons block was listed here in error. The Action Buttons Row measures 1320 x 57 and sits inside the Product Details tabbed area, in the Description panel, not in the buy box. It is specified in section 4.2.

**Behaviour**

| Area | Specification |
| :---- | :---- |
| Gallery, desktop | Embla carousel, already vendored into assets, initialised through the shared data-attribute module. No CDN. Thumbnails sit alongside the main image and drive the active slide. |
| Gallery, mobile | Main image is a swipeable Embla carousel. Thumbnails render as their own carousel underneath. Arrows on the thumbnail carousel appear only when the thumbnail count exceeds what fits, and the previous or next arrow is disabled at each respective end. |
| Variant change | Updates the URL with the variant parameter, updates price and compare at price, and sets the variant that Add to Cart submits. The gallery does not change, because the option is size, not appearance. No other content is variant specific. |
| Add to Cart | AJAX, opens the themex cart drawer. No change to existing drawer behaviour. |
| Buy Now | Submits straight to checkout, bypassing the cart drawer. |
| Pincode | Input accepts digits only and is capped at six characters. On submit the block switches to the checked state: Delivering to {pincode}, Estimated Delivery by {min} \- {max}, and a Change Pincode control that returns to the input. Estimate only, no courier lookup, see F2. |
| Delivery estimate rule | Rendered in Liquid as today plus delivery\_min\_days to today plus delivery\_max\_days, formatted as short month and day, matching the design string Aug 2 \- Aug 5\. Defaults 3 and 5\. Both bounds are section settings so the window can be changed without a deploy. |
| Offers scroller | Horizontal overflow scroll with scroll snap, so each offer card lands cleanly. No arrows are drawn in the design. |
| Share | Native share sheet through the Web Share API, falling back to copy link where the API is unavailable. |

**4.2 product-details**

The tabbed content area below the buy box. It is one content area with switchable panels, not separate pages and not separate URLs. Content width 1320 on desktop; the mobile frame is 390 x 985\.

**Measured internal structure**

Each tab frame contains a Product Details Tab strip of 1440 x 73 holding four Tab children, followed by a Benefits Section that is the panel body. The overall height changes per tab because the panel content changes, which is expected and not a design inconsistency.

| Tab state | Section height | Panel (Benefits Section) | Panel contents measured |
| :---- | :---- | :---- | :---- |
| Description (default) | 1440 x 2190 | 1440 x 2117 | Frame 1320 x 198, Container 1320 x 140, Badges Grid 1320 x 200 (hidden), Action Buttons Row 1320 x 57 |
| How to use | 1440 x 629 | 1440 x 556 | Steps Row 1320 x 400, Pro-Tip Banner 1320 x 60 |
| Ingredients | 1440 x 560 | 1440 x 487 | ingredients-grid 1320 x 411 |
| FAQs | 1440 x 493 | 1440 x 420 | Section 1320 x 344 |

Tab widths shift by roughly ten pixels between states because the active tab carries a wider active treatment. The fourth tab measures 62 to 64 wide, which is the FAQs label.

Two items inside the Description panel need calling out. Badges Grid (1320 x 200\) is set to hidden and is excluded. Action Buttons Row (1320 x 57\) is present in the Description panel only, not in the other three, and this is where the lab report control lives.

**Section settings**

| Setting ID | Type | Purpose |
| :---- | :---- | :---- |
| heading | richtext | Optional heading above the tab strip. |
| show\_description | checkbox | Renders the Description tab. |
| show\_how\_to\_use | checkbox | Renders the How to use tab. |
| show\_ingredients | checkbox | Renders the Ingredients tab. |
| show\_faqs | checkbox | Renders the FAQs tab. |
| label\_description | text | Tab label. Default Description. |
| label\_how\_to\_use | text | Tab label. Default How to use. |
| label\_ingredients | text | Tab label. Default Ingredients. Note the design spells this Ingrediants; confirmed as a typo and corrected in the build. |
| label\_faqs | text | Tab label. Default FAQs. |

**Measured panel content**

| Tab | Measured structure | Content read from design |
| :---- | :---- | :---- |
| Description | Body copy area | Copy comes from the native product description. Supporting media and the eyebrow are **two plain product metafields**, `custom.description_media` and `custom.description_eyebrow` — the `product_description` metaobject this row originally described was never created (§3.1, correction 5). |
| How to use | Steps Row 1320 x 400 plus Pro-Tip Banner 1320 x 60 | Three steps: 01 PREPARE, Take a small amount; 02 APPLY, Apply on affected area; 03 RECOVER, Massage gently. Banner reads Pro Tip: For best results, use 2-3 times a day. |
| Ingredients | ingredients-grid 1320 x 411 | Four entries: Menthol, Camphor, Eucalyptus Oil, Turpentine Oil, each with a description. |
| FAQs | Section 1320 x 344 | Real questions include how long delivery takes, how Subscribe and Save works, whether an order can be cancelled, and whether products are safe for daily use. Four further rows read only the literal words Headline text and are hidden placeholder scaffolding, excluded by decision. |

**Behaviour**

| Area | Specification |
| :---- | :---- |
| Tab switching | Panels swap in place. No page load, no URL change. A tab whose backing metafield is empty is not rendered at all, so an incomplete product never shows an empty panel. |
| FAQ accordion | One item open at a time. Opening a second closes the first. |
| Row counts | Every panel repeats over its metaobject list. There is no fixed count for steps, ingredients or questions — below the platform ceiling of **50**, where Liquid stops iterating a `list.metaobject_reference` (§3.2). |
| Action Buttons Row | Rendered inside the Description panel only, measured 1320 x 57\. Holds the lab report control. |
| Lab report modal | Opens in a modal over the page. It does not navigate away and the URL does not change. The modal embeds the PDF held in the lab report metafield; the report layout drawn in Figma is a placeholder for the PDF contents and is not built as markup. Measured desktop modal 620 x 660 with a 34 x 34 close control over a 1440 x 844 scrim. Measured mobile modal 370 x 510 with the same 34 x 34 close control over a 390 x 844 scrim. See F3 for the mobile inline-PDF caveat. |

**4.3 frequently-bought-together**

Measured 390 x 412 on mobile with 24 top and bottom padding, 20 side padding and a 12 gap, and 1440 x 588 on desktop with 52 top and bottom padding, 60 side padding and a 12 gap. Background fill re-verified as \#466E2E at 20 percent. Heading reads Complete your pain-relief kit.

| Setting ID | Type | Purpose |
| :---- | :---- | :---- |
| heading | richtext | Section heading. Richtext so a word can be italicised for the curved underline utility. |
| products | product\_list | The companion products shown as cards. |

Cards are the existing product-card snippet with a prop that moves the price inside the button, matching the design string Add @325 399\. Each card adds independently.

The add-all control is confirmed excluded. Re-verified by walking the ancestor chain of the Add all text node: the text node itself is not visible, and its parent frame is also not visible. Recorded verbatim as Add all 3:false inside Frame:true inside Frame:false. So it is hidden at two levels and is not built.

One scope caution. The FBT cards in the design also carry a rating row reading 4.7 with 132 Reviews and a discount percentage reading (20%) alongside a struck price. If those are not already props on the existing product-card, this is more than the single price-in-button prop assumed above. Tracked as OD2 so the card work is not under-scoped.

**4.4 trust-strip**

Measured 390 x 120 on mobile with 24 top and bottom padding and no side padding, and 1440 x 162 on desktop with 32 top and bottom padding and no side padding.

Correction against v1.0. The item labels were quoted from the mobile frame only. On re-check the two breakpoints carry different copy, four items each.

| Breakpoint | Item labels read from the file |
| :---- | :---- |
| Mobile (390) | ISO Certified, Ayush Approved, Fast Acting, 130+ Years |
| Desktop (1440) | ISO Certified, GMP Compliant, AYUSH Approved, Dermatologically Tested |

Only the first item matches, and even there the casing of AYUSH differs. Two of the four labels are entirely different claims. A single repeatable block list cannot render two different sets, so this needs a decision on which set is canonical before build. Tracked as OD1. Note that GMP Compliant and Dermatologically Tested are regulatory claims, so the choice is not purely editorial.

| Block | Settings |
| :---- | :---- |
| item | icon (image\_picker), label (text) |

Repeatable blocks rather than four fixed slots, so the count can change without code.

**4.5 see-it-in-action**

Measured 390 x 676 on mobile with 24 top and bottom padding, 20 left padding and a 20 gap, and 1440 x 751 on desktop with 52 top and bottom padding, 60 side padding and a 24 gap.

F1 from v1.0 is now closed. The mobile frame is named only Section, but the desktop frame carries the explicit name See It In Action Section in exactly the same position, between Trust Strip and Review Section. The mapping is confirmed by the file rather than inferred from position.

Shoppable video is delivered by the Quinn app, so the section is a container and heading only; the media and its interactions are managed inside Quinn.

| Setting ID | Type | Purpose |
| :---- | :---- | :---- |
| heading | richtext | Section heading. |

**4.6 external-ratings**

Built as its own section by decision. Measured 390 x 181 on mobile as a top-level frame named User Rating Section, with 24 top padding, 20 side padding and a 12 gap. On desktop it is not a top-level frame; it is a child of Review Section named User Rating, measured 1320 x 114\. See section 2.3.

Heading read from the file, present on both breakpoints: Reviewed and Trusted Across the Internet.

Three entries, identical on both breakpoints, each pairing a rating with a bracketed rating count and a review count: 4 with (7.1k+) and 150+ Reviews, 4.1 with (6.8k+) and 200+ Reviews, and 4 with (700+) and 150+ Reviews.

| Setting ID | Type | Purpose |
| :---- | :---- | :---- |
| heading | richtext | Section heading. Default Reviewed and Trusted Across the Internet. |
| **Block** | **Settings** |  |
| rating | logo (image\_picker), rating\_value (text), rating\_count (text), review\_count (text) |  |

Values and logos are static by decision. This strip does not query any review platform API. Because desktop draws it inside the review block, the section must sit flush against review-section on desktop with no separating gap.

**4.7 review-section**

Measured 390 x 851 on mobile with 24 top padding, 16 side padding and a 24 gap, and 1440 x 938 on desktop with 52 top and bottom padding, 60 side padding and a 24 gap.

| Breakpoint | Children measured |
| :---- | :---- |
| Mobile | Review Container 358 x 301, Review List Container 358 x 502\. Two children only, because the ratings strip is a separate top-level section on mobile. |
| Desktop | User Rating 1320 x 114, Review Container 1320 x 200, Review List Container 1320 x 472\. Three children, the first being the ratings strip specified in 4.6. |

Content read from the summary area: heading Rating & Reviews, aggregate 4.5 out of 5, Based on 345 ratings, a five-bar distribution reading 160, 12, 4, 36 and 40, and a Write a review control.

| Setting ID | Type | Purpose |
| :---- | :---- | :---- |
| heading | richtext | Section heading. Default Rating & Reviews. |

The summary and the list are both rendered by the Judge.me app, so the aggregate and the distribution come from live review data, not from settings. The theme provides the section wrapper, heading and app block placement only. The Write a review control is supplied by Judge.me; its popup is out of scope for this sprint.

**4.8 picked-just-for-you**

Measured 390 x 432 on mobile with 24 top padding and a 10 gap, and 1440 x 559 on desktop with 60 side padding, no vertical padding and a 10 gap. A product carousel using the existing product-card snippet and the shared Embla initialiser.

| Setting ID | Type | Purpose |
| :---- | :---- | :---- |
| heading | richtext | Section heading. |
| collection | collection | Source of the recommended products. |
| product\_count | range | How many products render. |

Sourced from a merchant-selected collection rather than the Shopify recommendations endpoint, which keeps the output predictable and avoids an empty rail on a low-traffic catalogue.

**4.9 certified**

Measured 390 x 134 on mobile with 24 top padding, 20 side padding, 32 bottom padding and a 30 gap, and 1440 x 196 on desktop with 32 top padding, 60 side padding, 44 bottom padding and a 24 gap. A row of certification marks.

| Block | Settings |
| :---- | :---- |
| logo | image (image\_picker), alt\_label (text) |

**4.10 sticky-atc**

The design carries this in two places, and they disagree. In the base PDP frames it is present but hidden, named Sticky Add to Cart (NEW), measured 1440 x 64 on desktop and 390 x 64 on mobile with 12 vertical and 16 horizontal padding. In the two dedicated frames, Sticky A2C \- Desktop and Sticky A2C \- Mobile, it is visible and named Sticky ATC, measured 1440 x 87 with 18 vertical and 60 horizontal padding on desktop, and 390 x 63 with 12 vertical and 16 horizontal padding and a 12 gap on mobile.

The dedicated frames are treated as authoritative, because they are the frames drawn to show this state. So the build target is 87 tall on desktop and 63 tall on mobile. The 64 tall copies in the base frames are stale placeholders. Recorded as OD3 for confirmation, since a 23 pixel difference on desktop is a visible one.

| Breakpoint | Contents read from design |
| :---- | :---- |
| Desktop | Product title, price 199, compare at price 255, a quantity stepper, Add to Cart |
| Mobile | Product title, price 199, compare at price 255, Add to Cart. No quantity stepper, confirmed intentional. |

**Visibility rule**

* Shown only while the primary Add to Cart button in main-product is out of the viewport.

* Hidden again whenever the footer enters the viewport, so it never overlaps footer content.

* Both directions animate. Nothing appears or disappears instantly.

* Implemented with an IntersectionObserver on the primary button and on the footer, not on scroll position, so it stays correct at any viewport height.

**5\. Acceptance Criteria**

* A merchant can publish a complete PDP by filling in one product in the admin. No theme editor work is needed per product.

* A tab whose backing metafield is empty does not render. No empty panels, no orphan tab labels.

* Ingredient, step and FAQ counts follow the number of metaobject entries, up to the 50-entry Liquid iteration cap (§3.2). Changing the count requires no code change.

* Changing the size option updates the URL, the price and the variant that Add to Cart submits, and does not change the gallery.

* The pincode field rejects non-digits and stops at six characters. The checked state shows the pincode, the date window and a working Change Pincode control.

* The delivery window renders from the two section settings, so changing them changes the dates with no deploy.

* The sticky bar is absent on load, appears only once the primary Add to Cart has scrolled out of view, disappears when the footer appears, and transitions in both directions.

* Each FBT card adds its own product independently. No checkbox and no add-all control exists anywhere in the built section.

* Only one FAQ answer is open at any time.

* The lab report opens in a modal over the page. The URL does not change and the page does not navigate.

* The offers row scrolls horizontally with snap, and each card comes to rest aligned.

* The purchase option area renders as a visual placeholder and creates no selling plan, no subscription and no cart property.

**6\. Dependencies, Open Decisions and Flags**

D items block build. OD items need a decision from the client or the design team. F items are risks and observations that do not block.

| ID | Item | Blocks |
| :---- | :---- | :---- |
| D1 | Subscription mechanism unresolved. Shopify native subscriptions require an eligible gateway, and the current stack is GoKwik checkout with Razorpay, which is not eligible. Recurpay excludes India. Enquiries to Recurpay, GoKwik, Shopify and Razorpay are drafted and pending. | purchase\_options block beyond placeholder |
| D2 | Flits wishlist is not integrated. The control is built as a placeholder. | Wishlist control |
| D3 | Judge.me is not yet wired to the rating block, so the rating figure and review count are hard-coded section settings for now. | rating block |
| D4 | Confirm the collection that feeds picked-just-for-you. | picked-just-for-you |
| D5 | Certification marks and their alt text to be supplied as assets. | certified |
| OD1 | Trust strip copy differs between breakpoints. Mobile reads ISO Certified, Ayush Approved, Fast Acting, 130+ Years. Desktop reads ISO Certified, GMP Compliant, AYUSH Approved, Dermatologically Tested. Two of four labels are different claims, and GMP and Dermatologically Tested are regulatory ones. Decide which set is canonical. | trust-strip |
| OD2 | FBT cards carry a rating row (4.7, 132 Reviews) and a discount percentage (20%) in addition to the price-in-button treatment. Confirm whether the existing product-card already supports these, or whether the card work is larger than one prop. | frequently-bought-together |
| OD3 | Sticky bar height differs between the base frames (64) and the dedicated Sticky A2C frames (87 desktop, 63 mobile). Dedicated frames assumed authoritative. Confirm. | sticky-atc |
| F1 | Closed. The unnamed mobile frame at 390 x 676 is confirmed as see-it-in-action, because the desktop frame carries the explicit name See It In Action Section in the same position. No longer an inference. | Nothing, resolved |
| F2 | The delivery estimate is a display estimate only, computed from two settings. It is not a courier serviceability check and can therefore disagree with what actually happens at checkout. Recommend replacing with a real serviceability API later. | Nothing, noted risk |
| F3 | Inline PDF rendering inside a modal is unreliable on mobile browsers, particularly iOS Safari, which frequently refuses to display a PDF in an embedded frame. A download or open-in-new-tab fallback will be needed on small screens. Needs a decision on the fallback wording. | Lab report modal on mobile |
| F4 | The design does not specify hover or focus states for the thumbnail carousel, the offers cards or the tab strip. These will follow Global Standards. | Desktop polish |
| F5 | The Figma FAQ panel contains four placeholder rows reading Headline text plus a stray node named Slot. Confirmed as scaffolding and excluded by decision. | Nothing, recorded for traceability |
| F6 | The design spells the tab Ingrediants. Confirmed a designer typo and built as Ingredients. | Nothing, recorded |
| F7 | The Description panel is 2190 tall against 629, 560 and 493 for the other three tabs. The tabbed area will therefore jump in height on every tab change. The design does not specify whether the container animates its height or snaps. Recommend a height transition, matching the approach already agreed for the navigation panels. | product-details polish |

**7\. Verification Log**

Every value in v1.0 was re-read from the Figma file in three passes: a dimensional pass over both page inventories and the state frames, a desktop pass over section paddings, fills and content strings, and a targeted pass over the four tab panels and the disputed strings. The following were confirmed unchanged.

* All eleven mobile section sizes and every mobile padding and gap.

* Tab panel dimensions: Steps Row 1320 x 400, Pro-Tip Banner 1320 x 60, ingredients-grid 1320 x 411, FAQ Section 1320 x 344\.

* FBT background \#466E2E at 20 percent, and the heading Complete your pain-relief kit.

* The add-all control is hidden at two levels in the ancestor chain, so its exclusion is correct.

* External ratings values on both breakpoints: 4 (7.1k+) 150+ Reviews, 4.1 (6.8k+) 200+ Reviews, 4 (700+) 150+ Reviews.

* Desktop lab report modal 620 x 660 with a 34 x 34 close control; pincode block 628 x 156\.

* Clinically Proven is hidden on both breakpoints, so its exclusion is correct.

Four errors were found and are corrected in this version.

| Error in v1.0 | Correction |
| :---- | :---- |
| Trust strip labels given as ISO Certified, Ayush Approved, Fast Acting, 130+ Years | Those are the mobile labels only. Desktop reads ISO Certified, GMP Compliant, AYUSH Approved, Dermatologically Tested. The two breakpoints disagree, now raised as OD1. |
| Stated that both breakpoints render the same section list, and that the mobile file supports building external-ratings as a standalone section | Desktop has no separate ratings frame. It sits inside Review Section as User Rating, 1320 x 114\. The strip is top-level on mobile only. The build decision stands but the justification was overstated. |
| action\_buttons listed as a block in main-product | Action Buttons Row measures 1320 x 57 and sits in the Description panel of the tabbed area, not in the buy box. Moved to section 4.2. |
| Sticky bar described as hidden in the design frames, quoting 64 tall in one table and 87 tall in another | It is hidden in the base frames at 64 tall and visible in the dedicated Sticky A2C frames at 87 desktop and 63 mobile. v1.0 quoted both numbers without reconciling them. Dedicated frames taken as authoritative, raised as OD3. |

Values also added in this version that were absent from v1.0: the full desktop inventory with paddings, the desktop content width of 1320, the ratings strip heading Reviewed and Trusted Across the Internet, the review summary content, the per-tab section heights, the hidden Badges Grid, and the mobile lab report modal at 370 x 510\.

**Corrections to v1.1, applied by PRD 0.1 on 2026-08-22.** Eight claims in sections 3.1 and 3.2 did not survive a read of the live store and the Figma node tree. They are registered here so the count is not lost.

The first correction pass was scoped to §3.1 and §3.2 and therefore **missed five restatements of the same facts elsewhere in this document** — §3's intro (line 82), §4.2's Description row and Row-counts row, §5's row-counts bullet, and most seriously §9's summary, which restated "eight metaobject definitions … three of which already exist" verbatim. All five were reconciled on the same date. The lesson generalises: **when correcting a numbered claim in this TDD, grep the whole file for restatements before declaring it fixed** — a section-scoped pass cannot see a summary.

| \# | Claim in v1.1 | Correction |
| :---- | :---- | :---- |
| 1 | §3.2 reuses `custom.badge` | The theme reads **`custom.product_badge`** (`snippets/product-card.liquid:54`). `custom.badge` was never created. |
| 2 | §3.2 "the last three already exist from the homepage sprint" | **Twelve** `custom` product metafield definitions existed pre-sprint, not three. The nine unlisted are `highlight_color`, `card_image`, `radiator_image`, `bundle_contents`, `concerns`, `format`, `benefits`, `size_pack`, `offer_value`. |
| 3 | Not stated | `custom.rating_value` and `custom.review_count` are populated on all 49 products with **no definition at all**. |
| 4 | §3.1 names metaobjects `custom.<type>` | Metaobject types carry **no namespace**. The prefix was never literal. |
| 5 | §3.1 gives Product Description no fields | A definition cannot have zero fields. Replaced by two plain product metafields; **seven** metaobject definitions, not eight. |
| 6 | §3.1 gives How To Use no text field | Entries would have carried autogenerated admin display names. A required `name` field was added. |
| 7 | §3.2 "no fixed row count anywhere" | True only below **50** — Liquid caps `list.metaobject_reference` iteration at 50 entries. |
| 8 | Implied that Storefront API exposure is needed for Liquid | Liquid reads metaobjects regardless of `access.storefront`. PUBLIC_READ is set for future headless use only. |

**8\. Corrections to Earlier Documents**

Two items in previously issued documents are contradicted by this sprint and need a version bump.

| Document | Correction |
| :---- | :---- |
| Homepage Sprint TDD | The document states that products are single variant. That is wrong. Products carry size variants, which are exposed on the PDP. Product cards do not show a variant selector, which is what the homepage design actually shows. The statement should be narrowed to card behaviour rather than stated as a catalogue fact. |
| Homepage Sprint TDD and Global Standards | Both carry an extraction date of 29 July 2026 that I stated in error. It was not read from the file and should be removed or replaced with the real date. |

**9\. Summary**

* Ten sections. Every value re-read from the file in a three-pass verification, logged in section 7\.

* Product-varying content sits on the product as metafields pointing at metaobjects. Section settings hold only layout and content that is identical on every product.

* **Seven** metaobject definitions, and **thirteen** product metafields named in §3.2 — the **ten** created by PRD 0.1 plus **three** reused unchanged (`product_badge`, `category_label`, `highlight_text`). Store-wide the product now carries **22** `custom` metafield definitions: the **twelve** that already existed before this sprint, plus those ten.

  Corrected 2026-08-22 by PRD 0.1. The original line read *"Eight metaobject definitions and twelve product metafields, three of which already exist from the homepage sprint"* and was wrong on all three numbers: `product_description` is not a metaobject (§3.1 correction 5), §3.2 names thirteen keys rather than twelve, and twelve definitions pre-existed rather than three. See §7's correction register.

* The two breakpoints are not identical. Mobile has eleven content sections, desktop ten, because the ratings strip is nested inside the review block on desktop.

* Subscriptions are a placeholder only. The stack cannot support them today and the vendor question is still open.

* Five dependencies, three open decisions and seven flags. OD1, the conflicting trust strip claims, needs a human answer because two of them are regulatory. F3, inline PDF on mobile, is the one with a real chance of forcing a design change.

* Two corrections are owed to already-issued documents, listed in section 8\.

