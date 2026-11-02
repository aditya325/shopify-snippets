**Amrutanjan, Navigation Sprint**

World of Amrutanjan D2C Storefront | Shopify (themex base) | devx | August 2026 | v1.2

**1\. Sprint Scope**

This sprint builds the site wide header and navigation from the approved design: the desktop header bar, the mega menu with its five panels, the mobile drawer, the sticky scrolled state and the utility strip. Every value in this document is extracted from the approved design (desktop 1440 px, mobile 390 px); nothing is estimated. Anything not extractable is marked TBD with an owner. The mobile design is the base spec, desktop is the enhancement.

| Item | Decision |
| :---- | :---- |
| In scope | Header bar, five mega menu panels (Shop By Need, Categories, Combo, About, Media), mobile drawer with the same content, sticky scrolled state, utility strip, and the new components those panels need. |
| Supersedes | The Homepage Sprint recorded the header as styling only and out of scope. That exclusion is now replaced by this document, which owns the header. |
| Base | themex boilerplate header, restyled to the design. Menu structure comes from Shopify navigation. Cart uses the existing themex cart drawer, unchanged. |
| Excluded | Search behaviour beyond the icon, which belongs to the Search screen and is built after this sprint. Customer accounts, which do not appear in the design. The announcement bar, which stays as the homepage section until a site wide requirement is raised. |
| Reused | product-card, with Add to Cart hidden through a prop rather than a new variant. article-card, unchanged, for the Blogs panel. Subscribe and Save, extracted into a shared snippet; the existing homepage section is not modified. |
| New components | press-card, featured bundle card, popular bundle row, content card, history carousel, and the header chevron icon. |

**2\. Standards and Tokens**

Anything already defined in Global Standards is used as is and is not restated here. Only values specific to navigation are recorded below.

**2.1 Taken from Global Standards, unchanged**

* Families: Space Grotesk for headings, DM Sans for everything else. Weights Regular, Medium, SemiBold, Bold.

* Colours: \#466E2E primary, \#FACC15 brand yellow, \#F4C430 accent, \#2A7A50 secondary green, \#113422 footer green, \#171717 text, \#737373 secondary text, \#E5E5E5 borders, and the banner colours.

* The active menu item underline uses the accent \#F4C430, measured at 4 px on desktop, so it needs no new token.

* Page side padding 60 desktop and 20 mobile, matching the standard container.

* The normalisation rule still applies. This section still contains Manrope SemiBold 14 and 16, Inter Medium 14, Inter Bold 10 and 14, DM Sans Black 24 and DM Sans ExtraBold 16\. All are built as DM Sans in the nearest agreed weight, family swap only, size preserved. A single Space Grotesk Bold 320 node is treated as an artifact and ignored.

**2.2 Navigation specific tokens (measured)**

| Token | Value | Where measured |
| :---- | :---- | :---- |
| nav-label | DM Sans Medium 18 | Top level menu labels, desktop. See F4. |
| header-height | 110 px desktop | Header bar. Mobile is a 59 px status row plus a 66 px header row. |
| nav-item-gap | 40 px | Between top level menu labels |
| panel-padding | 32 px top and bottom, 60 px sides | Mega menu content container |
| panel-gap | 32 px | Between rail and content pane |
| rail-width | 220 px | Left rail in every panel |
| pane-width | 1068 px, or 684 px with a 352 px promo beside it | Full width pane in Shop By Need and Categories; split pane in Combo, About and Media |
| utility-strip | 59 px tall, padding 16 and 64, link gap 32 | Strip at the base of every panel |
| panel-border | \#A3A3A3 | Outer border of the dropdown container, all panels |
| rail-active-bg | \#FAF9F6 | Selected rail row background |
| combo-accent | \#1E5631 | Bundle price and View Details links, and the featured bundle border |
| muted-text | \#666666 | Bundle contents list and struck original price |
| decor-shape | \#D9D9D9 | Peeking shapes behind the history carousel and the bundle image |
| chip-border | \#EAB308 | Borders on lifestyle chips and small icon tiles. See F1. |
| drawer-width | 360 px over a 390 px viewport | Mobile drawer, leaving a 30 px sliver of page visible |
| drawer-subheader | 52 px tall, padding 14 and 20, gap 16 | Back button and current level title |
| drawer-row | 48 px tall, padding 14 and 20 | Menu rows. See F2. |
| drawer-footer | padding 20, gap 16 | Utility strip pinned to the base of the drawer. See F2. |

**3\. Data Model**

Structure comes from Shopify navigation and content comes from ordered blocks in the header section. This keeps links where merchants expect them and keeps the panels editable with live preview in the theme editor.

* Top level items and their children come from the linked Shopify menu. Adding a menu item adds it to the nav automatically.

* A chevron renders automatically on any top level item that has panel content, and rotates on open. Items without content, currently Offers and Track Order, render as plain links with no chevron.

* Blocks are ordered. A rail-item block starts a new pane and every content block after it belongs to that pane until the next rail-item block. Only rail-item carries the menu keys, so no other block needs handle matching.

* The ordering rule is an acceptance criterion, not a footnote. A content block with no preceding rail-item is not rendered and is reported in the theme editor.

**3.1 Block types**

Setting IDs are snake\_case per themex convention. Block type strings are the values used in the schema.

| Block type | Purpose | Used by |
| :---- | :---- | :---- |
| rail\_item | Starts a pane and defines its rail row | Every panel |
| link\_group | A headed group of manual links | Shop By Need |
| link\_item | One manual link inside the preceding group | Shop By Need |
| products | Product grid in the pane | Shop By Need, Categories |
| bundle\_featured | Combo of the month | Combo |
| bundle\_list | Popular bundles list | Combo |
| content\_card | One About card | About, Our Story |
| articles | Blog cards | Media, Blogs |
| press | News and events cards | Media, News and Events |
| history\_slide | One history carousel slide | About, History |

**3.2 Block settings**

| Block type | Setting ID | Schema type | Notes |
| :---- | :---- | :---- | :---- |
| rail\_item | menu\_handle | text | Handle of the top level menu item this pane belongs to |
| rail\_item | rail\_label | text | Row label in the left rail |
| rail\_item | rail\_icon | image\_picker | SVG, one per rail row |
| rail\_item | pane\_heading | richtext | Heading above the pane content, per rail |
| rail\_item | cta\_label | text | See All, Read More, Check All, Check History |
| rail\_item | cta\_link | url | Optional. Falls back to the collection URL, see below |
| rail\_item | show\_subscribe\_promo | checkbox | Renders the shared subscribe snippet beside the pane |
| link\_group | group\_heading | richtext | For example Shop by Lifestyle, Trending Relief |
| link\_group | group\_style | select | Options: chips, links |
| link\_item | link\_label | text | Chip or link label |
| link\_item | link\_url | url | Destination |
| products | product\_collection | collection | Collection for this rail item |
| products | products\_count | range | Default 6, the design shows 6 on Shop By Need and 5 on Categories |
| bundle\_featured | featured\_heading | richtext | For example Combo of the month |
| bundle\_featured | featured\_product | product | Merchant nominates the bundle product |
| bundle\_featured | featured\_cta\_label | text | Button on the featured bundle |
| bundle\_list | list\_heading | richtext | For example Popular bundles |
| bundle\_list | bundle\_collection | collection | Collection for this rail item |
| bundle\_list | bundles\_count | range | Default 3 |
| bundle\_list | bundle\_cta\_label | text | Row link label, View Details in the design |
| content\_card | card\_image | image\_picker |  |
| content\_card | card\_title | richtext |  |
| content\_card | card\_description | richtext |  |
| content\_card | card\_link | url | Optional, makes the card clickable |
| articles | articles\_blog | blog | Blog to pull articles from |
| articles | articles\_count | range | Default 3 |
| press | press\_blog | blog | News blog to pull articles from |
| press | press\_count | range | Default 3 |
| history\_slide | slide\_image | image\_picker |  |
| history\_slide | slide\_caption | text | For example The Origin |
| history\_slide | slide\_year | text | For example 1940 |

CTA link behaviour: when cta\_link is empty and the pane contains a products or bundle\_list block, the CTA falls back to that collection URL. This keeps See All correct without the merchant retyping it.

**3.3 Section settings**

| Setting ID | Schema type | Notes |
| :---- | :---- | :---- |
| main\_menu | link\_list | Drives top level items and rail rows |
| logo | image\_picker | Falls back to the theme logo setting when empty |
| store\_locator\_label | text | Utility strip, same on every panel |
| store\_locator\_link | url |  |
| consultation\_label | text | Utility strip, same on every panel |
| consultation\_link | url |  |
| scrolled\_background\_color | color | Applied once the header becomes sticky, see 4.3 |

**3.4 Metafields**

A metafield is identified by its owner resource, a namespace and a key. Namespace is custom throughout, matching the definitions already created for the homepage. The Liquid column gives the exact path to use in code.

| Owner | Namespace and key | Type | Liquid access |
| :---- | :---- | :---- | :---- |
| Article | custom.publisher | single\_line\_text\_field | article.metafields.custom.publisher |
| Product | custom.bundle\_contents | list.single\_line\_text\_field | product.metafields.custom.bundle\_contents |

Only these two are new. The press card publisher is the outlet name, for example Times of India. The bundle contents list is the set of items making up a bundle, one entry per line.

Reused from the Homepage Sprint, already defined, no new work: custom.product\_badge, custom.category\_label, custom.highlight\_color, custom.highlight\_text and custom.card\_image on the product, and custom.read\_time on the article.

The featured bundle savings badge is not a metafield. It is calculated in Liquid from the bundle product price against its compare at price, the same arithmetic already used for the discount figure on the product card, so it can never drift from the real price. The badge is hidden when compare at price is not greater than price.

**4\. Behaviour**

**4.1 Opening and closing, desktop**

* The panel opens on hover of a top level item and closes on mouse out of both the item and the panel.

* Open and close animate the panel height, growing from 0 to its natural height and shrinking back to 0\. No instant show or hide.

* Because panel height varies per pane, height is measured at runtime rather than hardcoded, so switching rail items resizes smoothly.

* Keyboard and touch users get a click or focus equivalent, since hover alone is not reachable for them. Duration and easing are TBD with the designer (F3).

* Motion respects prefers-reduced-motion, falling back to an immediate change.

**4.2 Rail switching**

Hovering or focusing a rail row swaps the pane content. The selected row carries the \#FAF9F6 background and a green left bar. Panes are rendered in the markup and toggled, not fetched, so switching is instant and the whole menu is available without JavaScript requests.

**4.3 Scrolled state**

At the top of the page the header is solid and sits in normal flow. Once the page scrolls the header becomes sticky and its background changes to the translucent green shown in the design, over the page content. The exact background value comes from the scrolled background colour setting, defaulting to the measured design value.

Flag: the scrolled design frame was not updated with the chevrons and still shows plain labels. Confirmed as a design oversight, so the built header keeps chevrons in every state, including scrolled.

**4.4 Mobile drawer**

* The drawer is 360 px wide over a 390 px viewport, so a sliver of the page stays visible behind it, and it overlays rather than pushes.

* Content is identical to desktop and driven by the same blocks. Only the rendering differs: rail rows become an accordion list, and the pane content appears in the expanded row.

* A subheader carries a back control and the current level title, so deeper levels are reachable without losing position.

* The utility strip pins to the base of the drawer.

**5\. Panel Contracts**

One subsection per panel, in menu order. Each lists the blocks that build it and where the content comes from.

**5.1 Shop By Need**

Rail of need states. Pane carries two manual link groups then a product grid, with a See All button below. Pane is full width at 1068 px, with no promo panel.

| Element | Source | Notes |
| :---- | :---- | :---- |
| Rail row | Menu child link | Icon and pane heading from the rail-item block. |
| Lifestyle chips | link-group set to chips, then link-item blocks | Manual label and URL per chip. Chip border uses \#EAB308, see F1. |
| Trending links | link-group set to text links, then link-item blocks | Manual label and URL per link. |
| Product cards | products block | Collection per rail item. product-card with Add to Cart hidden by prop. |
| See All | rail-item CTA | Falls back to the collection URL when the link is empty. |

**5.2 Categories**

Rail of categories. Pane is a product grid with a heading and a See All button. Same full width pane as Shop By Need.

| Element | Source | Notes |
| :---- | :---- | :---- |
| Rail row | Menu child link | Icon and pane heading from the rail-item block. |
| Product cards | products block | Collection per rail item, default 5 in the design. |
| See All | rail-item CTA | Falls back to the collection URL. |

**5.3 Combo**

Rail of bundle kits. Pane splits into a featured bundle and a list of popular bundles, with the subscribe promo beside it.

| Element | Source | Notes |
| :---- | :---- | :---- |
| Featured bundle | bundle-featured block | Merchant picks the product. Image, title and price come from the product. |
| Contents list | product.metafields.custom.bundle\_contents | The items making up the bundle, rendered as a list. See D1. |
| Savings badge | Derived | Calculated from price against compare at price. No metafield, no merchant entry. Hidden when there is no saving. |
| Popular bundles | bundle-list block | Products from the rail item collection. Name and price from the product, View Details links to the product. |
| Subscribe promo | rail-item checkbox | Renders the shared Subscribe and Save snippet. |

**5.4 About**

Two rail rows. Our Story shows manual content cards; History shows an image carousel. Both sit beside the subscribe promo.

| Element | Source | Notes |
| :---- | :---- | :---- |
| Our Story cards | content-card blocks | Manual image, title and description. Two in the design, unlimited by convention. |
| Read More | rail-item CTA | Full width button below the cards. |
| History slides | history-slide blocks | Manual image, caption and year. Rendered as an Embla carousel with peeking slides either side. |
| Check History | rail-item CTA | Full width button below the carousel. |
| Subscribe promo | rail-item checkbox | Shared snippet. |

**5.5 Media**

Two rail rows. Blogs reuses the homepage article card; News and Events uses the new press card. Both sit beside the subscribe promo.

| Element | Source | Notes |
| :---- | :---- | :---- |
| Blog cards | articles block | Shopify articles from the selected blog. article-card reused unchanged. |
| Press cards | press block | Shopify articles from the news blog. Publisher from article.metafields.custom.publisher, see D1. |
| Date | Article published date | Derived, no entry needed. |
| Check All | rail-item CTA | Full width button below the cards. |
| Subscribe promo | rail-item checkbox | Shared snippet. |

**6\. Components**

| Component | Status | Notes |
| :---- | :---- | :---- |
| product-card | Reused | Add to Cart hidden through a prop. No new variant, no duplicated markup. |
| article-card | Reused | Unchanged from the homepage featured-blogs section. |
| subscribe-save snippet | New, shared | Markup extracted so both the homepage section and the menu render it. The homepage section keeps its current schema and is not modified. |
| press-card | New | Publisher, date, title, Read More link. Image above the text, no badge. |
| featured bundle card | New | Image, title, savings badge, contents list, CTA. |
| popular bundle row | New | Name, price, View Details link. |
| content card | New | Image, title, description. In the design these are built on the bundle card with price and Add Bundle layers hidden; built clean here. |
| history carousel | New | Embla, peeking slides, caption and year per slide. Reuses the shared Embla init module. |
| chevron icon | New | SVG snippet in code, rotates on open. Rendered automatically when a menu item has panel content. |

**7\. Dependencies and Open Items**

| ID | Item | Blocks |
| :---- | :---- | :---- |
| D1 | Create the two metafield definitions per section 3.4: custom.publisher on the article, custom.bundle\_contents on the product | Press cards, featured bundle |
| D2 | Blogs created and populated for Blogs and for News and Events | Media panel |
| D3 | Collections created per rail item across Shop By Need, Categories and Combo | Product and bundle panes |
| D4 | Shopify navigation menu built to match the designed structure | Whole header |
| D5 | Subscribe and Save markup extracted into a shared snippet | Combo, About and Media panels |
| D6 | Rail icons supplied, one per rail item | Rail rows |
| D7 | History carousel images and captions supplied | About History pane |
| F1 | Chip and icon tile borders use \#EAB308, which sits very close to the accent \#F4C430 and the brand yellow \#FACC15. Confirm whether this is intentional or should resolve to the accent. | Chip styling |
| F2 | Mobile drawer rows measure 48, 50 and 53 px across frames and the footer strip padding is 18 in some frames and 20 in others. Confirm one value for each. | Drawer spacing |
| F3 | Open and close animation duration and easing are not specified in the design. Provide values or approve a house default. | Panel motion |
| F4 | The nav label is DM Sans Medium 18 here and was recorded as Medium 16 on the homepage header. Confirm 18 as the single value. | Header typography |
| F5 | A single \#FFB300 fill appears once in the Categories panel and matches nothing else. Confirm it is accidental. | Nothing, cosmetic |
| F6 | Layer naming across this section is unreliable, with panels duplicated rather than componentised, for example the News rail heading still named Bundle category. Worth a tidy pass before the next handover. | Nothing, hygiene |

**8\. Summary**

* The header becomes real scope in this sprint and supersedes the styling only exclusion carried in the Homepage Sprint.

* Structure comes from Shopify navigation; panel content comes from ordered blocks where only rail-item carries the menu keys, so nothing else needs handle matching.

* Five panels cover six content patterns: products, bundles, content cards, an image carousel, blog cards and press cards.

* product-card and article-card are reused as they are, and Subscribe and Save becomes a shared snippet without touching the homepage section.

* Seven dependencies and six flags; F1 chip yellow and F2 drawer spacing are the two most likely to affect build.

