**Amrutanjan, Cart Drawer Sprint**

World of Amrutanjan D2C Storefront | Shopify (themex base) | devx | August 2026 | v2.1

Every element in this document has its measured box, its tokens, its states and its data source stated together. All values were read from the approved Figma file; nothing is estimated.

**1\. Sprint Scope**

| Item | Decision |
| :---- | :---- |
| Deliverable | The cart drawer for desktop and mobile, including the empty state and the View all offers panel. |
| Panel width | 390 on both breakpoints, flush right. This is one component with one layout, not two. |
| Build basis | themex already implements all cart operations. This sprint revamps presentation. Cart mechanics are reused, not rewritten. See section 2\. |
| Checkout | Native Shopify checkout. GoKwik KwikCheckout is a later integration, out of scope here. |
| Excluded | Everything listed in section 10, each with the evidence that it is hidden in the file. |

**2\. Architecture and Reuse**

themex already implements the cart drawer and every cart operation in it. The following are reused as they exist and are not respecified in this document.

| Reused from themex | Note |
| :---- | :---- |
| Drawer open, close and mount | Including the header cart trigger. |
| All cart mutations | Add, change quantity, remove line, and the re-render that follows. |
| Quantity stepper behaviour | Including the trash to minus swap described in 5.5, which themex already implements. |
| Cart drawer re-render on cart change | The regions listed in 8.2 are re-rendered through the existing mechanism. |
| Recent cart state and drawer scroll handling | As currently implemented. |

Setting IDs are to be read from the existing theme and reused. Where this document names a setting, that name is a description of the required input, not an instruction to create a new ID when one already exists. Any new setting introduced by this sprint is marked NEW in its table.

Section and snippet naming follows the theme conventions already in use: kebab case files, render rather than include, BEM in base.css, data attribute hooks for JavaScript, and no inline script or style.

**3\. Frames Read**

| Frame | Size | Purpose |
| :---- | :---- | :---- |
| Cart Badge \- Once products are added to the cart | 1440 x 844 | Header cart icon with a count. No drawer. |
| Cart\_V2 \- If not applied any coupon | 1440 x 844 | Default drawer. Discount field empty, no coupon row. |
| Cart\_V2 \- Discount Applied | 1440 x 844 | Code applied. Coupon row present, scroll region shorter. |
| Full Cart View\_V2 | 390 x 1322 | Full drawer content at mobile width. Content reference. |
| View all offers | 390 x 844 | Coupon list panel. |
| Empty Cart | 1440 x 844 | Drawer with nothing in it. |

Layer names in this file are unreliable and must not be used to infer purpose. The rewards ladder and the recommended products rail are both named Voucher. The cart items list sits inside Vouchers and Milestones Container while the recommended rail and the summary sit inside Discounts Container. The empty state grid is named New Arrivals Section but is headed Popular picks to get you started. Two connectors in the ladder are named Green and Grey but carry the same fill. Everything below is mapped by content and by measurement.

**4\. Drawer Shell**

**4.1 Shell boxes**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Panel | 390 x 844, at x 1050 in the 1440 frame | Fill \#FFFFFF. Clips content. |
| Backdrop | Full viewport | Fill \#000000 at 20 percent. |
| Offer banner | 390 x 28, padding 6/20/6/20, gap 10 | Fill \#466E2E. Fixed. |
| Header | 390 x 54, padding 12/20/12/20, gap 10 | Fill \#FFFFFF. Fixed. |
| Scroll region | 390 x 680 default, 390 x 642 with a coupon applied, 390 x 1120 mobile. Padding 8/0/0/0 | Clips content. Scrolls. |
| Coupon row | 390 x 38, padding 8/22/8/22, gap 10 | Fill \#ECF0EA. Conditional, see 5.8. |
| Checkout footer | 390 x 82, padding 16/22/16/22, gap 32 | Fill \#FFFFFF. Sticky. |

Paddings are top / right / bottom / left. The scroll region is the only scrolling area. Its content in the default state measures 429 plus 687, totalling 1116 inside a 680 box, so it always scrolls on desktop.

**4.2 Shell states**

| State | What renders |
| :---- | :---- |
| Populated, no discount applied | Banner, header, scroll region at 680, footer at 82\. No coupon row. |
| Populated, discount applied | Coupon row inserted between the scroll region and the footer. Scroll region drops to 642 so the panel height is unchanged. Footer area reads 120 overall. |
| Empty | Banner, header, scroll region at 680 holding the empty state, footer at 82 with the Start Shopping button. No coupon row, no summary, no ladder. |
| Offers panel | Banner and header unchanged. Content region 390 x 456 with padding 8/20/0/20, holding the full coupon list. No footer. |

**5\. Component Contracts**

One subsection per component. Each gives the measured box, the tokens, the states and the data source. Type styles are stated after the family normalisation in section 6\.

**5.1 Offer banner**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Container | 390 x 28, padding 6/20/6/20, gap 10 | Fill \#466E2E |
| Message | \- | DM Sans Medium 12, \#FFFFFF |
| Separator | \- | DM Sans Light 12, \#FFFFFF |

Three messages read from the file: Easy 7-day return, Express Delivery, and Free delivery over Rs 499\. Different frames captured different messages in the same slot, so this rotates rather than showing three fixed items.

| Block | Settings |  |
| :---- | :---- | :---- |
| message | text |  |
| **Setting ID** | **Type** | **Purpose** |
| rotation\_interval | range | NEW. Seconds between messages. |

Padding differs across frames, 6/20/6/20 in the mobile full view and the discount applied frame against 6/22/6/41 elsewhere. The mobile full view is the content reference, so 6/20/6/20 is built. Recorded as F1.

**5.2 Header**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Container | 390 x 54, padding 12/20/12/20, gap 10 | Fill \#FFFFFF |
| Title block | 101 x 26, gap 8 | \- |
| Title text | 69 x 26 | Space Grotesk Medium 18, \#171717. Reads My Cart. |
| Count badge | 24 x 24 | DM Sans Regular 14, \#171717 |
| Close button | 30 x 30, icon frame 30 x 30 with 10 padding | \- |

The count badge shows total quantity, not the number of lines. It reads 0 in the empty state.

**5.3 Milestone tracker**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Outer container | 374 x 124, gap 14 | Radius 15, stroke \#466E2E at 2 |
| Message strip | 374 x 28 | Fill \#466E2E at 20 percent. Text DM Sans SemiBold 12, \#466E2E. |
| Tracker | 374 x 82 | \- |
| Progress row | 354 x 36, offset x 10 | \- |
| Milestone badge | 36 x 36, at x 20, 159 and 298 | Fill \#FACC15 at 20 percent, stroke \#FACC15 at 1\. Padlock icon 18 x 18, three vectors stroked \#FACC15 at 1.2. |
| Connector | 103 x 3, at x 56 and 195 | Fill \#FACC15 at 40 percent |
| Numbers row | 354 x 31, offset x 10, y 41 | Columns 52 wide at x 10, 151 and 292 |
| Milestone description | \- | DM Sans Bold 12, \#466E2E. Reads Buy for 499\. |
| Milestone gifts | \- | DM Sans SemiBold 10, \#466E2E. Reads 10% OFF. |

Message read from the file: Add 1 more product to unlock 10% OFF at Rs 499\. Milestones read: Buy for 499 with 10% OFF, Buy for 699 with 15% OFF, Buy for 999 with 20% OFF.

**States**

The file draws every milestone identically, all locked, so it carries no reached state. The two connectors are named Connector 1 Green and Connector 2 Grey while carrying the same fill, which indicates the intended distinction. The reached treatment below follows from that and is approved.

| Element | Reached | Not reached |
| :---- | :---- | :---- |
| Connector leading to the badge | \#466E2E solid | \#FACC15 at 40 percent |
| Badge fill | \#466E2E at 20 percent | \#FACC15 at 20 percent |
| Badge stroke | \#466E2E at 1 | \#FACC15 at 1 |
| Badge icon | Unlocked or tick icon, asset required, see D2 | Padlock as drawn |
| Description and gifts text | \#466E2E | \#466E2E, unchanged |

**Transition**

Progress animates. The connector fill and its filled width transition smoothly rather than snapping when a milestone is crossed. Badge fill and stroke transition with it. No jerk on cart update.

**Settings**

| Block | Settings |  |
| :---- | :---- | :---- |
| milestone | threshold (number), reward\_label (text), gift\_product (product). All NEW. |  |
| **Setting ID** | **Type** | **Purpose** |
| show\_tracker | checkbox | NEW. Renders the tracker. |
| progress\_message | text | NEW. Templated, see 9.3. |

**5.4 Cart line**

A single component instance in the file, named Cart Items, 350 x 72 with a 24 gap. It has two forms, a standard line and a gift line. Lines are separated by a divider of 350 x 1 filled \#DBD2C0.

**Standard line**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Row | 350 x 72, gap 24 | \- |
| Product info | 262 x 72, gap 12 | \- |
| Image | 72 x 72 | Radius 12\. Background stroke \#E5E5E5 at 0.5. |
| Info container | 178 x 71, gap 18 | \- |
| Name and description | 178 x 37, gap 2 | \- |
| Category | 65 x 15 | Space Grotesk Medium 10, colour per category. Uppercased by text transform; the stored value is lower case. |
| Product name | 178 x 20 | DM Sans Medium 14, \#171717. One line, truncated with an ellipsis. |
| Price and discount | 178 x 16, gap 8 | \- |
| Current price | 27 x 16 | DM Sans Regular 12, \#171717 |
| Original price | 25 x 16 | DM Sans Regular 10, \#737373. Struck through. |
| Discount icon | 14 x 14 | \- |
| Discount text | 35 x 16 | DM Sans Regular 10, \#466E2E. Reads 20%Off. |
| Quantity controller | 64 x 72, gap 24 | See 5.5. |

**Gift line**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Product info | 286 x 72, gap 12 | Wider, because there is no stepper. |
| Info container | 202 x 37, gap 18 | Name and description only. |
| Product name | 202 x 20 | DM Sans Medium 14, \#171717. Not truncated. |
| Price block | Absent | There is no price row at all on a gift line. |
| Quantity controller | 40 x 72, gap 24 | \- |
| Free pill | 40 x 24, padding 0/12/0/12 | Fill \#FACC15 at 20 percent. Text DM Sans Medium 10, \#171717, reading Free. |

A variant row exists in the component but is only populated on the excluded placeholder lines. It is built and renders when the line has a variant to show.

No settings. Content comes from the cart line item, the product, and the category colour metafield established in the homepage sprint.

**5.5 Quantity stepper**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Controls | 64 x 24 | Radius 6, stroke \#E5E5E5 at 0.5 |
| Left control | 24 x 24 | Trash icon 9 x 10 at quantity 1\. Minus at quantity 2 or more. |
| Quantity | 16 x 24, padding 4 | DM Sans Regular 12, \#171717 |
| Right control | 24 x 24 | Plus |

There is no minus drawn in the file; the left control is a trash icon. At quantity 2 or more it becomes a minus, and at quantity 1 it reverts to the trash icon. themex already implements this, so it is reused rather than rebuilt.

**5.6 Discount code row**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Group | 390 x 202, padding 20/22/20/22, gap 16 | \- |
| Group heading | \- | Space Grotesk Regular 16, \#171717. Reads Apply discount code. |
| See all | \- | DM Sans SemiBold 14, \#466E2E |
| Input row | 346 x 44 | Radius 12, stroke \#E5E5E5 at 1 |
| Placeholder | \- | DM Sans Regular 14, \#737373. Reads Enter Your Discount Code or Gift Card. |
| Action | \- | DM Sans SemiBold 14, \#466E2E. Uppercased by text transform; stored value is lower case. |
| **State** | **Renders** |  |
| Empty | Placeholder text and an apply action. |  |
| Applied | The entered code in place of the placeholder, and a remove action. Drawn with AM699. |  |

The two Cart\_V2 frames are these two states of the same field, not two different carts.

**5.7 Coupon card**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Card | 368 x 68 | Radius 4\. Ticket shape: a dark green tab on each side with rotated text, a light body, and a dashed divider. |
| Side tab text | \- | DM Sans Regular 10, \#FFFFFF, rotated. Reads 20% OFF. |
| Code | \- | Space Grotesk Medium 14, \#171717. Reads ENDYEARSALE. |
| Description | \- | DM Sans Regular 12, \#737373. Reads Get extra 20% discount on your order. |
| Action | \- | DM Sans SemiBold 14, \#466E2E, uppercased. |

The ticket silhouette with rotated side tabs and a dashed edge is the most involved piece of CSS in this sprint. It is built as a single reusable snippet used in both the drawer and the offers panel. Three cards render in the drawer and six in the panel.

**5.8 Auto applied coupon row**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Row | 390 x 38, padding 8/22/8/22, gap 10 | Fill \#ECF0EA |
| Count | \- | DM Sans Regular 12, \#466E2E. Reads 2 offers applied. |
| Chip | 128 x 22 and 94 x 22, padding 3 | Radius 4, fill \#466E2E at 30 percent. Label DM Sans SemiBold 12, \#466E2E. |

Conditional on at least one discount being applied. Present on both breakpoints in that state, absent otherwise and absent in the empty state. This is a state difference, not a breakpoint difference. One chip per applied discount; codes drawn are WELCOME50 and AM699. Two codes shown together is consistent with the stacking rule in 9.2.

No settings. It renders from the discounts applied to the cart.

**5.9 Price summary**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Group | 356 x 184, padding 0/0/20/0, gap 10 | \- |
| Heading | \- | Space Grotesk Regular 14, \#171717. Reads Price details with a bracketed count. |
| **Row** | **Source** |  |
| Total MRP | Calculated from compare at price. |  |
| Discount On MRP | The discount applied. |  |
| Coupon Discount | Shown if any. |  |
| Total Amount | The subtotal. |  |

Four rows. The Delivery Fee row drawn in the file is removed by decision. Figures render with no decimals and no trailing zeroes, per section 9.4.

The numbers drawn in the file do not reconcile and do not change between the two coupon states. Confirmed as design negligence, so the rows above are the specification and the drawn figures are not.

**5.10 Recommended products**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Container | 376 x 301, padding 10/10/10/10, gap 16 | Radius 12, stroke \#466E2E at 1 |
| Heading | \- | Space Grotesk Regular 16, \#171717. Reads recommended Products. |
| See all | \- | DM Sans SemiBold 14, \#466E2E |
| Card control | \- | DM Sans SemiBold 14, \#FFFFFF. Reads Buy. |

Four cards, each with a category label, a product title and a Buy control. The control reads Buy here and Add to Cart in the empty state, which is intentional.

**5.11 Checkout footer**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Container | 390 x 82, padding 16/22/16/22, gap 32 | Fill \#FFFFFF. Sticky. |
| Button | 346 x 50, padding 15/12/15/12 | Radius 12, fill \#466E2E |
| Label row | 162 x 20, gap 6 | \- |
| Primary label | \- | DM Sans SemiBold 16, \#FFFFFF. Reads Checkout with the total. |
| Struck figure | \- | DM Sans Regular 14, \#FFFFFF |

With the coupon row present the footer area measures 120 overall. In the empty state the button label reads Start Shopping followed by an arrow glyph. Submits to native Shopify checkout.

**5.12 Empty state**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Hero | 358 x 206, gap 20 | \- |
| Illustration | 140 x 140 | Asset required, see D3. |
| Message group | 358 x 56, gap 8 | \- |
| Heading | \- | Space Grotesk Bold 22, \#1A1A1A. Reads Your cart is feeling a little empty. |
| Message | \- | DM Sans Regular 14, \#6B7280. Reads Let's find something that feels right for you. |
| Discovery area | 358 x 780, padding 24/0/24/0, gap 10 | \- |
| Grid heading | 358 x 24, gap 4 | Space Grotesk Regular 16, \#171717. Reads Popular picks to get you started. |
| Grid | 358 x 698, gap 10 | Two columns of 174 x 698, gap 10 |
| Card | 174 x 352 | See below |

**Empty state card**

| Part | Measured | Style |
| :---- | :---- | :---- |
| Category | \- | Space Grotesk Medium 10, colour per category, uppercased |
| Title | \- | DM Sans SemiBold 14, \#171717 |
| Highlight | \- | DM Sans Medium 12, same colour as the category |
| Rating value | \- | DM Sans Medium 12, \#404040, with a star row |
| Review count | \- | DM Sans Regular 10, \#737373 |
| Price | \- | DM Sans Bold 16, \#171717 |
| Compare at price | \- | DM Sans Medium 12, \#999999, struck through |
| Discount percentage | \- | DM Sans SemiBold 10, \#D93807, bracketed |
| Button | Full card width | Fill \#466E2E, label DM Sans SemiBold 14, \#FFFFFF, reads Add to Cart with a leading plus |

The card in the file carries a wishlist heart. There is no wishlist in the cart drawer, so it is not built. The rest reuses the existing product-card snippet with Add to Cart shown.

Hero plus discovery area total 986 inside the 680 scroll region, so the empty state scrolls in the same way the populated cart does.

**5.13 View all offers panel**

Reuses the drawer shell: the same 390 x 28 banner and 390 x 54 header, with a content region of 390 x 456 at padding 8/20/0/20 holding six coupon cards. It is a second view inside the same drawer, not a separate modal, and it renders the same coupon source without the drawer limit.

**6\. Tokens**

**6.1 Family normalisation**

The cart designs use five families. Global Standards allows two. Per decision the extras are replaced at the same size and weight.

| In the file | Where | Built as |
| :---- | :---- | :---- |
| Manrope | Milestone tracker micro labels and the hidden cards row | DM Sans, same size and weight |
| Montserrat | The See all control | DM Sans, same size and weight |
| Jost | Placeholder lines and the hidden alternative footer, both excluded | Not built |

**6.2 Colour**

| Value | Used for |
| :---- | :---- |
| \#466E2E | Offer banner fill, primary button fill, category label, tracker text, tracker reached state, percentage off tag, See all, coupon row text and chip text, recommended container stroke |
| \#466E2E at 30 percent | Coupon chip fill |
| \#466E2E at 20 percent | Tracker message strip, tracker reached badge fill |
| \#FACC15 | Tracker badge stroke and padlock icon, not reached |
| \#FACC15 at 40 percent | Tracker connector, not reached |
| \#FACC15 at 20 percent | Tracker badge fill not reached, and the Free pill on a gift line |
| \#ECF0EA | Auto applied coupon row background |
| \#FFFFFF | Panel, header, footer, button labels, coupon side tab text |
| \#000000 at 20 percent | Backdrop |
| \#171717 | Primary text |
| \#1A1A1A | Empty state heading |
| \#737373 | Secondary text: original price, placeholder, coupon description, review count |
| \#6B7280 | Empty state message |
| \#999999 | Empty state compare at price |
| \#404040 | Empty state rating value |
| \#D93807 | Empty state discount percentage |
| \#DBD2C0 | Divider between cart lines |
| \#E5E5E5 | Borders at 0.5 and 1 |

Per decision, \#4A6741 resolves to \#466E2E, and See all resolves to \#466E2E rather than the \#F95948 drawn in the file. Category colours are per category from the existing colour metafield; values read are \#466E2E, \#00949E, \#E6790F, \#0094D1 and \#EAB308, and the card highlight line takes the same colour as its category.

**6.3 Radius and stroke**

| Radius | Applied to |
| :---- | :---- |
| 4 | Coupon chip, coupon card |
| 6 | Quantity stepper controls |
| 12 | Product image, discount code input row, recommended container, primary button |
| 15 | Milestone tracker container |
| **Stroke** | **Applied to** |
| 0.5 | Product image background, quantity stepper controls, both \#E5E5E5 |
| 1 | Discount code input row \#E5E5E5, recommended container \#466E2E, tracker badge \#FACC15 or \#466E2E |
| 1.2 | Padlock icon vectors \#FACC15 |
| 2 | Milestone tracker container \#466E2E |

**7\. Data Model**

Resolved. No either or choices remain. Namespace is custom throughout, consistent with the homepage, navigation and PDP sprints.

| Content | Source | Rationale |
| :---- | :---- | :---- |
| Cart lines, quantities, prices, discounts | The cart object | Nothing authored. |
| Category label and its colour | Existing product metafields from the homepage sprint | Reused, not redefined. |
| Coupon cards, drawer and offers panel | Metaobject custom.offer, referenced by a section setting of type metaobject\_list | The PDP sprint already defines custom.offer with icon, title, description and code, which is exactly this shape. Reusing it avoids a second definition and lets one campaign entry serve the PDP and the cart. |
| Recommended products | Section setting of type product\_list | A short merchant curated list. No metaobject needed. |
| Empty state products | Section setting of type product\_list, with a collection setting as an alternative source | Per decision. |
| Milestone thresholds and rewards | Section blocks, one per milestone | Liquid cannot read automatic discount thresholds from the admin, so the tracker needs its own copy to draw milestones that have not been reached. See F5. |
| Empty state copy and illustration | Section settings | Identical on every visit. |

If cart coupons are intended to be independent of PDP offers, a separate definition is needed instead. Raised as OD2.

**7.1 New settings introduced by this sprint**

| Setting ID | Type | Purpose |
| :---- | :---- | :---- |
| offers\_list | metaobject\_list | Coupon cards. Points at custom.offer entries. |
| drawer\_coupon\_count | range | How many coupon cards show in the drawer before See all. Three are drawn. |
| recommended\_products | product\_list | The recommended rail. |
| recommended\_heading | text | Default recommended Products. |
| show\_tracker | checkbox | Renders the milestone tracker. |
| progress\_message | text | Templated progress message, see 9.3. |
| rotation\_interval | range | Offer banner rotation, in seconds. |
| empty\_heading | text | Default Your cart is feeling a little empty. |
| empty\_message | text | Default Let's find something that feels right for you. |
| empty\_illustration | image\_picker | The 140 x 140 illustration. |
| empty\_grid\_heading | text | Default Popular picks to get you started. |
| empty\_products | product\_list | Empty state grid. |
| empty\_collection | collection | Alternative source for the grid. |
| empty\_button\_label | text | Default Start Shopping. |
| empty\_button\_link | url | Destination of the empty state button. |

Block type milestone, with settings threshold as a number, reward\_label as text, and gift\_product as a product.

**8\. Behaviour and Lifecycle**

**8.1 Open, close and focus**

* Opens from the header cart control and after any successful add to cart, using the existing themex trigger.

* Closes on the close button, on backdrop click, and on Escape.

* Focus moves into the drawer on open and is trapped while open, returning to the trigger on close.

* Background scroll is locked while the drawer is open.

**8.2 Regions re-rendered on cart change**

Any cart mutation re-renders the following through the existing themex re-render. Nothing else needs to change.

| Region | Why |
| :---- | :---- |
| Header count badge | Total quantity changes. |
| Cart line list and dividers | Lines, quantities and prices change. |
| Milestone tracker | Reached state and the progress message depend on the subtotal after discounts. |
| Gift line presence | The gift is attached or detached by the rule in 9.3. |
| Auto applied coupon row | Appears, updates its chips, or disappears. |
| Price summary | All four rows. |
| Checkout footer | The total on the button. |
| Empty state | Swaps in when the cart reaches zero and out when the first line is added. |

**8.3 Interaction detail**

| Interaction | Behaviour |
| :---- | :---- |
| Quantity plus and minus | Uses the existing themex handler, including its debounce. Repeated taps must not queue duplicate requests. |
| Left control at quantity 1 | Removes the line. Renders as a trash icon. |
| Left control at quantity 2 or more | Decrements. Renders as a minus. |
| Apply code | Submits the entered code. On success the field switches to the applied state, the coupon row appears or updates, and the summary and footer re-render. See F2 for the mechanism note. |
| Remove code | Clears the applied discount, returns the field to its empty state, and removes the chip. The coupon row disappears if no discounts remain. |
| Invalid code | The field stays in its empty state and surfaces an inline message. No copy exists in the design, recorded as OD1. |
| Coupon card action | Applies that card's code through the same path as manual entry. |
| See all | Opens the offers panel in place inside the drawer. Returning restores the drawer without losing scroll position. |
| Buy and Add to Cart on cards | Adds the product and re-renders per 8.2, without closing the drawer. |
| Milestone crossing | The connector and badge transition smoothly, per 5.3. |
| Empty state transition | Removing the last line swaps the scroll region content and the footer label. The shell does not remount. |

**8.4 Loading and failure**

No loading or failure states are drawn anywhere in the file. The theme's existing treatment is used: controls disable during an in flight request and the affected region shows the theme's standard pending state. A failed request leaves the cart visually unchanged and surfaces the theme's standard error treatment. Recorded as OD1 so the copy can be agreed rather than invented.

**9\. Discount and Reward Rules**

**9.1 Mechanism**

Rewards are Shopify automatic discounts. The theme does not create discounts; it reflects them and draws progress toward them.

**9.2 Stacking**

| Rule | Behaviour |
| :---- | :---- |
| Milestone against milestone | Never stack. One milestone discount applies. |
| Milestone against a coupon code | Stack. Both apply, and the coupon row shows a chip for each. |
| Configuration requirement | Stacking only works if the automatic discounts and the code discounts are set as combinable in Shopify's discount combinations settings. This is admin configuration, not theme work. See D1. |

**9.3 Progress and gifts**

| Rule | Behaviour |
| :---- | :---- |
| Progress basis | Subtotal after discounts. |
| Evaluation | Recalculated on every cart update. |
| Reached | A milestone is reached when the basis is greater than or equal to its threshold. Its badge and the connector leading to it take the reached treatment. |
| Above every milestone | All milestones render reached and every connector is filled. The progress message is suppressed, since there is nothing left to unlock. |
| Progress message | Templated with the shortfall to the next unreached milestone and that milestone's reward. Drawn as Add 1 more product to unlock 10% OFF at Rs 499\. Pluralisation of the item count is handled in the template. |
| Gift attach | A milestone carrying a gift product attaches it as a gift line when reached, added by theme JavaScript. |
| Gift detach | The gift line is removed when the cart falls below the threshold. |
| Gift trigger basis | Configurable per milestone, either cart value or item count. |
| Gift pricing | Implementation strategy to be agreed at execution, see D4. |

**9.4 Price formatting**

No decimals and no trailing zeroes, everywhere in the drawer, including the summary, the cart lines, the checkout button and the empty state cards.

**10\. Excluded, With Evidence**

Each of these is present in the file and is not built. The evidence column records why, so nobody re-adds them from a visual reading of the design.

| Item | Evidence |
| :---- | :---- |
| Cards Row, holding the Claimed and Upcoming labels and a gift product name against four 84 x 46 cards | The parent frame Cards Row is set to not visible, so these labels never render. They are not the tracker's states; the visible tracker carries no reached state, which is why the treatment in 5.3 is specified there. |
| Alternative footer, 400 x 136, with Total Savings, Total and Check out | Hidden frame. Excluded by decision in favour of the 82 tall footer. |
| Four cart lines carrying content from an unrelated cosmetics brand | All four frames inside the cart items list are set to not visible. They are the only lines that populate the variant row and the only ones using decimal prices. |
| Delivery Fee row in the price summary | Drawn and visible, removed by decision. |
| Wishlist heart on the empty state card, and a 24 x 24 icon frame in the cart line | No wishlist in the cart drawer by decision. The cart line icon does not render in any case. |
| Discount Badge, a 72 x 72 layer filled \#1F1F1F inside the product image group | Sits behind the image at the same size, so it never renders. Treated as a stray layer, not a badge. |
| A second See all node in the recommended products container | Set to not visible. |
| The trending and add all patterns from earlier sprints | Not present in the cart. Listed only to note that hidden layers have been checked rather than assumed. |

**11\. Acceptance Criteria**

* The drawer is 390 wide on both breakpoints, one component, right aligned, over a backdrop at 20 percent black.

* Banner and header are fixed, the scroll region is the only scrolling area, and the footer is sticky.

* The count badge shows total quantity and reads 0 when empty.

* Only Space Grotesk and DM Sans appear. No Manrope, Montserrat or Jost anywhere.

* Category labels and the code actions render uppercase by text transform, while the stored values stay lower case.

* A standard cart line truncates its title to one line with an ellipsis.

* A gift line renders no price row at all, and shows Free as a tinted pill in the quantity slot.

* The stepper left control is a trash icon at quantity 1 and a minus at quantity 2 or more.

* Repeated stepper taps do not queue duplicate cart requests.

* Milestones reached take the green treatment, milestones not reached keep the yellow padlock treatment, and the connector transition animates rather than snapping.

* When the cart exceeds every milestone, all render reached and the progress message is suppressed.

* Milestone discounts never stack with each other, and do stack with a coupon code.

* The coupon row appears only when at least one discount is applied, with one chip per discount, and the scroll region shrinks by 38 so the panel height is unchanged.

* The summary shows four rows. Delivery Fee does not appear.

* All prices render with no decimals and no trailing zeroes.

* Coupon cards come from custom.offer entries and no discount code is fetched from Shopify at runtime.

* See all opens the offers panel inside the drawer and returning preserves scroll position.

* Removing the last line swaps to the empty state without remounting the shell, and the footer label becomes Start Shopping.

* No wishlist control appears anywhere in the drawer.

* Escape closes the drawer, focus is trapped while open and returns to the trigger on close, and background scroll is locked.

* Nothing listed in section 10 appears in the built drawer.

**12\. Dependencies, Open Decisions and Flags**

D blocks build. OD needs a decision. F is a risk or observation that does not block.

| ID | Item | Blocks |
| :---- | :---- | :---- |
| D1 | Automatic discounts and code discounts must be set as combinable in Shopify's discount combinations settings for the stacking rule in 9.2 to hold. Admin configuration, not theme work. | Stacking behaviour |
| D2 | An unlocked or tick icon is required for the reached milestone badge. The file only contains the padlock. | Milestone reached state |
| D3 | The 140 x 140 empty state illustration to be supplied. | Empty state |
| D4 | Gift line pricing strategy to be agreed at execution, including behaviour if a customer removes the gift. | Gift line |
| D5 | Coupon campaign content to be authored as custom.offer entries. | Coupon cards |
| OD1 | No loading, failure or invalid code copy exists in the design. The theme's existing treatment is used; the wording needs agreeing. | Error and pending copy |
| OD2 | Cart coupon cards reuse the custom.offer metaobject defined in the PDP sprint, since the field shape is identical. Confirm this, or a separate store level definition is needed. | Coupon data source |
| F1 | The offer banner carries two different paddings across frames. The mobile full view value is built. | Recorded only |
| F2 | Applying a discount code from a drawer without a page reload should have its mechanism confirmed against current Shopify cart API behaviour at the start of build rather than assumed. | Apply code path |
| F3 | GoKwik replaces native checkout later. At that point the apply code row and the auto applied coupon row both need revisiting, and may become redundant if GoKwik owns coupon entry. | Later risk |
| F4 | The coupon ticket shape, with rotated side tabs and a dashed edge, is the highest effort styling in this sprint. Worth building first to de-risk. | Recorded only |
| F5 | Milestone thresholds exist both as section blocks and as automatic discounts in the admin. If they drift, the drawer promises a discount the customer will not receive. Recommend a review step whenever discounts change. | Ongoing risk |
| F6 | Near duplicate values remain after the confirmed consolidation: \#171717 against \#1A1A1A, and \#737373 against \#6B7280 and \#999999. Recommend resolving in Global Standards. | Recorded only |

**13\. Summary**

* One drawer at 390 wide for both breakpoints, with four shell states and thirteen component contracts.

* Cart mechanics come from themex and are not rewritten. Setting IDs are read from the existing theme.

* Coupons reuse the custom.offer metaobject already defined in the PDP sprint; product rails use product\_list settings.

* The milestone tracker's reached state is specified in 5.3 because the design does not draw one. It needs one icon asset.

* Five dependencies, two open decisions and six flags. D1, the discount combinations configuration, is the one that can make correct code behave wrongly.

