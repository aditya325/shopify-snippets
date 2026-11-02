# Cart Drawer — Product Requirements Document
**Client:** Amrutanjan &nbsp;|&nbsp; **Platform:** Shopify &nbsp;|&nbsp; **Owner:** Raj Gandhi, devx &nbsp;|&nbsp; **Status:** Draft v1

---

## 1. Purpose

Rebuild the Amrutanjan cart drawer to support tiered spend-based discounting, configurable free-gift logic, a flexible coupon system (auto + manual), curated offer visibility, and per-product cross-sell — all manageable by the client through Shopify admin without developer involvement after initial build.

Reference: attached cart snapshots (`My Cart` drawer, `Full Cart View_V2`, `View all offers` panel).

---

## 2. Scope

In scope: cart drawer UI/UX, milestone discount system, free-gift logic, coupon apply/remove behavior, offer-ticket display, recommended products, price breakdown, sticky behavior.

Out of scope (not covered by this PRD): PDP, checkout page itself (post-cart), post-purchase upsells.

---

## 3. UI Requirements

### 3.1 Layout
- One cart drawer design, used identically on mobile and desktop — no separate desktop-only or mobile-only layout. Differences are purely responsive (spacing/column count) and open direction (below), not structural.
- **Desktop:** cart drawer slides in from the right edge of the screen and overlays the page.
- **Mobile:** cart drawer slides up from the bottom of the screen (bottom-sheet style) and overlays the page. The cart-open trigger (icon) sits in the top-right corner of the mobile header.

### 3.2 Sticky elements
- The **Checkout button** and the **"X offers applied" strip** are both pinned to the bottom of the cart drawer and remain visible at all times, regardless of scroll position within the drawer body.
- The announcement bar and milestone progress bar are pinned to the top of the drawer (do not scroll with line items).

### 3.3 Drawer structure (top → bottom)
1. Announcement bar
2. Header — "My Cart", item-count badge, close (X)
3. Milestone progress bar + dynamic incentive copy
4. Cart line items (scrollable region)
5. "Apply Discount Code" input + "See All" link to offers panel
6. Featured discount ticket(s) (inline, e.g. `ENDYEARSALE`)
7. Recommended Products (horizontal scroll)
8. Price Details breakdown
9. **[Sticky footer]** Offers-applied strip + Checkout button

### 3.4 Line item display
- Image, category eyebrow label (e.g. `PAIN RELIEF`, `CONGESTION`), product name (truncate with ellipsis if it overflows one line).
- **Paid item:** discounted price, struck-through MRP, and a "X% Off" badge where a product-level discount applies. Where a coupon-driven price applies instead (e.g. `WELCOME10`), show the applied coupon as a small tag next to the price instead of a generic % badge.
- **Free/gift item:** price area replaced with a "Free" tag (yellow, per snapshot). No quantity stepper, no delete icon — free items are system-managed, not user-editable.
- **Paid item controls:** delete (trash) icon, quantity stepper (− / number / +).

### 3.5 Milestone progress bar
- 3 tier nodes (fixed count for this build), each showing: rupee threshold, discount %, and a state icon — achieved (filled circle + check), locked (outline + lock icon). Connecting line fills proportionally as tiers are achieved.
- Copy above the bar is dynamic:
  - Below all tiers: "Add ₹[X] more to unlock [Y]% OFF at ₹[threshold]" (always references the *next* locked tier).
  - All tiers achieved: replace with the completion message "You've unlocked the maximum discount 🎉" (stored as an editable string, not hardcoded).

### 3.6 Offers-applied strip (sticky)
- Label: "[N] offers applied" — **N always equals the exact count of currently active discounts/coupons**, full stop. (The reference snapshot's "2 offers applied" next to 3 visible chips was a horizontal-scroll artifact in that screenshot, not a spec — the strip must never show a count that doesn't match the chips actually present.)
- One chip per active discount/coupon, horizontally scrollable if it overflows.
- **Auto-applied codes** (e.g. `WELCOME10`): chip has no remove (X) control — customer cannot remove an eligibility-based automatic discount.
- **Manually-applied codes** (e.g. `AM699`): chip has an (X) to remove; removing it also reverts the "Apply Discount Code" field/button back to its pre-applied state.

### 3.7 Discount code field
- Text input + "Apply" button. **Apply is disabled/greyed until the customer types a code** — it activates only once there's input.
- On success, button label switches to "Remove" (for manual codes) and the code appears in the offers-applied strip.
- "See All" link opens the full **All Offers** panel (back arrow, title, close X, scrollable list of offer cards with %-off ribbon, code name, short description, and an "Apply" action per card).

### 3.8 Recommended Products
- Horizontal scroll cards: "Bestseller" ribbon (where applicable), category label, product name, "Buy" (quick-add) button.

### 3.9 Price Details
- Line items: Total MRP, Discount on MRP, Coupon Discount, Delivery Fee, Total Amount.
- Section header shows item count as "Price Details (N Item)", where **N = number of distinct product lines in the cart** (free-gift lines included as their own line — a 3-product cart with 1 free gift shows "4 Items").
- **Delivery Fee logic:** the ₹499 free-delivery threshold is evaluated against the **post-discount total** (what the customer actually pays), not the original MRP subtotal. Delivery Fee = ₹0 once the discounted total ≥ ₹499; otherwise the configured flat fee applies.

---

## 4. Functional Requirements

### 4.1 Announcement bar
- Admin can configure **one or more** messages (repeating text block, each with optional link).
- **If exactly 1 message is configured:** display statically, no carousel/animation. (This is the go-live state.)
- **If 2+ messages are configured:** rotate automatically in a carousel, 4-second interval. Interval is a fixed value for v1, not a client-facing setting.
- This behavior must be automatic based on count — not a separate toggle the client has to remember to flip.

### 4.2 Milestone / tiered discount system
- Built on **native Shopify Functions / Automatic Discounts** — no third-party discounting app.
- 3 fixed tier slots. For each tier, admin configures: threshold amount (₹), and reward — either a percentage discount OR a specific free product (see 4.3), selectable per tier.
- Progress bar reads live cart subtotal against these thresholds; state updates in real time as items are added/removed.

### 4.3 Free-gift logic (dual trigger)
- A free gift can be granted through **either or both** of the following, independently configurable per campaign:
  1. **Milestone-triggered:** crossing a configured tier threshold grants a specific free product.
  2. **Coupon-triggered:** applying a specific discount code (e.g. `WELCOME10`) grants a specific free product.
- **Stacking behavior is admin-configurable, not fixed:** when a customer simultaneously qualifies for both a milestone-gift and a coupon-gift, the client sets — per campaign — whether the two **stack** (both gifts added) or the coupon-gift **replaces** the milestone-gift (only one added). This must be a setting the client can toggle in admin, not a hardcoded rule.
- Free gift line items always display per §3.4 (Free tag, no stepper, no delete).

### 4.4 Coupon system
- **Auto-applied codes** (e.g. `WELCOME10`): applied automatically when the customer meets eligibility (e.g. new customer) — no manual entry, no remove option.
- **Manual codes** (e.g. `AM699`): customer types the code, Apply button activates once text is entered, code applies on click, and can be removed via the (X) in the offers-applied strip or a "Remove" action on the input field.
- Both auto and manual codes can be active on the same order simultaneously.

### 4.5 Discount tickets (featured offers)
- Admin can select which discount codes/offers are surfaced as visible "tickets" in the main cart view — **maximum 5 visible inline**.
- Any additional configured offers beyond the visible 5 are accessible via the "See All" → **All Offers** panel, which can show more than 5.
- Each ticket links to a real, live Shopify discount code — no dummy/decorative tickets.

### 4.6 Recommended products
- Recommendations are configured **per product**, keyed off the **last product added to cart** (i.e. when a new item is added, the recommendation rail refreshes to show that product's configured cross-sells).
- If the last-added product has **no configured recommendations**, fall back to a **global default set** (configured once, store-wide).
- Data source: per-product metafield (list of related products) + a single global fallback list (theme/app setting).

### 4.7 Quantity & line management
- Paid items: stepper (+/−) to adjust quantity; trash icon to remove entirely. Quantity changes re-evaluate milestone progress and any quantity-dependent discounts in real time.
- Free items: fixed at quantity 1, no stepper, no manual delete (removed automatically if the triggering condition — milestone or coupon — is no longer met).

---

## 5. Admin Configuration Requirements

The client needs to independently configure, without developer involvement:

| Area | Configurable by client |
|---|---|
| Announcement bar | Add/remove/reorder messages; carousel auto-enables at 2+ messages |
| Milestone tiers | Threshold ₹ and reward (% discount or free product) per tier, for all 3 tiers |
| Free gift rules | Map a milestone tier and/or a coupon code to a specific free product; set stacking behavior (stack both / coupon replaces milestone) when both are simultaneously eligible |
| Discount tickets | Choose which offers appear as tickets (max 5 inline) vs. "See All" only |
| Recommended products | Set recommended products per product; set the global fallback list |

---

## 6. User Stories

**Customer**
- As a customer, I can see each cart item's image, name, category, price, and any applicable discount at a glance.
- As a customer, I can increase or decrease the quantity of a paid item, or remove it entirely.
- As a customer, I cannot accidentally alter or remove a free gift item — it's clearly marked and locked.
- As a customer, I can see how much more I need to spend to unlock the next discount tier, and what that reward is.
- As a customer, I don't need a code to receive a milestone-based discount or gift — it applies automatically once I qualify.
- As a customer, I can type in a discount code and only get an active "Apply" button once I've entered something.
- As a customer, I can see exactly which offers are currently applied to my order, and remove any manually-entered one if I change my mind.
- As a customer, I can discover more available offers beyond what's shown by default, via "See All".
- As a customer, I see product recommendations relevant to what I just added, not generic/unrelated items.
- As a customer, I can see a full breakdown of my order cost before I check out.
- As a customer, I can always see my checkout button and applied offers, no matter how far I've scrolled.

**Client (Admin)**
- As the client, I can add a new announcement message without needing the carousel manually turned on.
- As the client, I can set or change milestone thresholds and rewards myself, without a dev ticket.
- As the client, I can decide whether a promotion grants a free gift via spend threshold, via coupon code, or both.
- As the client, I can control which offers are prominently shown in the cart versus tucked into "See All".
- As the client, I can set specific cross-sell products per product, and have a sensible default when I haven't.

---

## 7. Decisions Log

All ambiguities raised during drafting were resolved with Raj before this version — logged here for traceability, not as open items:

## 7. Acceptance Criteria (high-level)

- [ ] Cart layout is structurally identical on mobile and desktop.
- [ ] Checkout button and offers-applied strip remain visible at all scroll positions.
- [ ] Announcement bar shows no carousel behavior with exactly 1 message; rotates automatically with 2+.
- [ ] All 3 milestone tiers are configurable in admin (threshold + reward) without code changes.
- [ ] Milestone progress bar and incentive copy update live as cart contents change.
- [ ] Free gifts can be triggered by milestone, by coupon, or both, per admin configuration.
- [ ] Admin can set, per campaign, whether simultaneous milestone-gift + coupon-gift stack or the coupon-gift replaces the milestone-gift.
- [ ] Free gift line items have no stepper and no delete control.
- [ ] Auto-applied coupons show in the offers strip without a remove option; manual coupons show with one.
- [ ] Offers-applied strip count always exactly matches the number of chips shown.
- [ ] Discount code Apply button is disabled until text is entered.
- [ ] Admin can select up to 5 featured discount tickets; remainder appear only in "See All".
- [ ] Recommended products update based on last-added product, with a working global fallback.
- [ ] Price Details item count reflects distinct product lines (including gift lines).
- [ ] Delivery fee is waived once the post-discount total reaches ₹499, not the pre-discount subtotal.
