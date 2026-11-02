**Amrutanjan, Search Modal Sprint**

World of Amrutanjan D2C Storefront | Shopify (themex base) | devx | August 2026 | v1.0

**1\. Sprint Scope**

This sprint builds the search modal in both its states, default and typed, for desktop and mobile. It is a revamp of the search already present in themex rather than a new section, so the existing behaviour is kept and only the presentation and content groups change. Every value in this document is extracted from the approved design (desktop 1440 px, mobile 390 px); nothing is estimated. Anything not extractable is marked TBD with an owner.

| Item | Decision |
| :---- | :---- |
| In scope | The modal itself: trigger from the header search icon, default state with its content groups, typed state with predictive results, loading, no results and clear behaviour, on both breakpoints. |
| Approach | Revamp the existing themex search. No new section is created. Existing behaviour is reused as is, including recent searches and add to cart from a result card. |
| Excluded | The search results page, its filter rail, sort and infinite scroll. All of that is picked up with the PLP sprint, since the two share the same grid and filtering system. The View All control in this sprint links to that page. |
| Reused | product-card unchanged, with Add to Cart shown. Global Standards tokens for type and colour. themex recent search storage and its add to cart flow. |
| Discarded | A Trending search group exists in the desktop design but its container is set to hidden, and its width matches the mobile layout rather than desktop. Confirmed as discarded, so it is not built. |

**2\. Search Specific Tokens (measured)**

Anything already defined in Global Standards is used as is and is not restated. Typography across the modal stays within the standard ramp. Only values specific to the modal are recorded here.

**2.1 Desktop**

| Element | Value |
| :---- | :---- |
| Backdrop | \#000000 at 20 percent opacity with a 6 px background blur, so the page behind is blurred, not only dimmed |
| Close control | 44 x 44, radius 12, sits outside the panel at the top right. Icon 15 x 15 |
| Search bar | 1200 x 60, radius 20, padding 6 top and bottom, 40 sides. Inner row 1120 x 48 |
| Default panel | 1200 x 741, radius 20, padding 18 top and bottom, 40 sides |
| Group stack | 1120 wide, 24 gap between groups. Each group heading is an icon 20 x 20 plus a title, 12 gap |
| Recent search chips | 42 tall, radius 30, padding 9 top and bottom, 10 sides |
| Concern items | 273 x 42, radius 20, padding 10, 10 gap between items |
| Product cards | 265 x 459, radius 20, 20 gap, four across |
| Typed panel | 1200 x 551\. Results row 1120 x 457, four cards 265 x 457, 20 gap |
| View All button | 1120 x 48, radius 12, label plus an 18 x 18 arrow |

**2.2 Mobile**

| Element | Value |
| :---- | :---- |
| Pattern | A full screen takeover, not an overlay panel. The site header stays in place and the modal fills the screen from below it |
| Search row | 390 x 58, padding 10 top, 18 sides. Inner row 354 x 48 |
| Clear control | 24 x 24, appears inside the input once a query is present |
| Default content | Padding 18 top and bottom, 20 sides. Groups stacked 350 wide with 24 gap |
| Typed content | Padding 20\. Two columns, each 170 wide, 10 gap, rows of two |
| View All button | 350 x 41, radius 8 |

**2.3 Colour note**

Two greys appear in the modal that are not in Global Standards: \#999999 and \#212121. Both are low volume and sit close to existing greys. They are recorded here as search specific rather than promoted to the standards document. See F1.

**3\. Content and Settings**

The modal reuses the existing themex search settings. Only the two new content groups need fields. Setting IDs below are proposed in snake\_case per themex convention. The exact IDs of the existing themex search settings must be read from the theme before build, since they are not visible from the design. See D1.

**3.1 New settings**

| Setting or block | Setting ID | Schema type | Notes |
| :---- | :---- | :---- | :---- |
| Section | popular\_products\_collection | collection | Source for the Popular Products group |
| Section | popular\_products\_count | range | Default 4, matching the design on both breakpoints |
| Section | concern\_heading | text | Default Browse by concern |
| Section | recent\_heading | text | Default Recent Search |
| Section | popular\_heading | text | Default Popular Products |
| Section | no\_results\_text | richtext | Default Sorry, no results found. |
| Section | no\_results\_cta\_label | text | Default Shop All |
| Section | no\_results\_cta\_link | url | Points at the Shop All collection. See D2 |
| concern\_chip block | chip\_label | text | One block per concern chip |
| concern\_chip block | chip\_url | url | Destination for the chip |

Group heading icons are 20 x 20 and ship as SVG snippets in code, in line with the convention used elsewhere in the project. They are not merchant uploaded.

**3.2 Content sources**

| Group | Source | Notes |
| :---- | :---- | :---- |
| Recent Search | themex existing recent search | Stored in the browser by themex, so it is per device and per browser. Capped at 6 entries, the newest first |
| Browse by concern | concern\_chip blocks | Manual label and URL per chip, unlimited by convention. Four in the design |
| Popular Products | popular\_products\_collection | product-card unchanged, Add to Cart shown |
| Typed results, products | Shopify predictive search | product-card unchanged, four in the design |
| Typed results, other types | Shopify predictive search | Collections, pages and articles render as a grouped list of links styled to the site. Not drawn in the design, see F2 |

**4\. Behaviour**

**4.1 Opening and closing**

* Opens from the header search icon on both breakpoints.

* Closes on the close control, on Escape, and on a click on the backdrop.

* Focus moves into the input on open and returns to the search icon on close. Focus is trapped inside the modal while it is open.

* Desktop renders as an overlay panel over a blurred backdrop. Mobile renders as a full screen takeover below the site header.

**4.2 States**

| State | What shows |
| :---- | :---- |
| Default | The two content groups in order: Recent Search, then Browse by concern, then Popular Products. Recent Search is omitted when there is no history |
| Loading | A subtle fade while results resolve. No spinner and no layout jump |
| Typed, with results | The default groups are replaced by the results and the View All control |
| Typed, no results | Sorry, no results found, plus a Shop All button linking to the Shop All collection |
| Cleared | A cross appears in the input once a query is present. Clearing the query returns the modal to its default state |

**4.3 Input**

Recommendation, not yet confirmed by the designer: results begin after two characters, with a 300 ms debounce so a fast typist does not fire a request per keystroke. Both values are set in one place so they can be tuned after launch. See F3.

**4.4 Add to cart from a result**

Add to Cart on a result card uses the existing themex flow unchanged, which opens the cart drawer. The modal stays open behind the drawer, so a customer can add several items in one search session without repeating the query.

**4.5 View All**

View All submits the current query to the search results page. That page is built in the PLP sprint, so during this sprint the control links to a page that is not yet styled. This is expected and is not a defect.

**5\. Dependencies and Open Items**

| ID | Item | Blocks |
| :---- | :---- | :---- |
| D1 | Read the existing themex search implementation and record its real setting IDs, storage key and markup before build, so this document can be completed rather than duplicating what already exists | Whole sprint |
| D2 | Confirm the Shop All collection URL used by the no results button | No results state |
| D3 | Concern chip labels and destinations supplied | Browse by concern group |
| D4 | Collection selected for Popular Products | Popular Products group |
| F1 | The modal introduces \#999999 and \#212121, which sit close to existing greys in Global Standards. Confirm whether they should resolve to an existing grey. | Colour cleanup only |
| F2 | The design only draws product results. Collections, pages and articles will render as a grouped link list styled to the site. Please review once built. | Predictive results |
| F3 | Minimum characters and debounce are not specified in the design. Two characters and 300 ms are proposed. | Input behaviour |
| F4 | No hover or focus states are drawn for the chips or concern items. | Desktop polish |

**6\. Summary**

* The modal is a revamp of the existing themex search, not a new section, so recent searches and add to cart are reused rather than rebuilt.

* Desktop is an overlay panel over a blurred backdrop; mobile is a full screen takeover below the header.

* Default state shows Recent Search, Browse by concern and Popular Products; typing replaces all three with results and a View All control.

* Only two content groups need new settings, a collection for Popular Products and chip blocks for Browse by concern.

* Four dependencies and four flags. D1, reading the existing themex search, is the one that unblocks everything else.

