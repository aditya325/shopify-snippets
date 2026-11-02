# Phase 1: Shared Components

## Purpose

Change two components the homepage sprint already shipped, so the mega menu can reuse them instead of
duplicating them. Both are small in code and large in blast radius — between them they touch a
snippet rendered from seven sections and a section rendered on the homepage.

Neither depends on Phase 0, so both can run before it, after it, or alongside.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 1.1 | product-card-hide-atc | PRD | Add the `hide_add_to_cart` prop Sprint §6 assumes already exists |
| 1.2 | subscribe-save-snippet | PRD | Extract Subscribe & Save into a shared snippet with band and card layouts (D5) |

These stay separate despite being small. Bundling either into a panel PRD would mean a
shared-component regression gets assessed as a footnote to panel work — which is how the homepage
sprint shipped a hardcoded placeholder rating row inside `product-card`.

## Shared Context

**Sprint §6 assumes work that has not been done.** It describes product-card as reused "with Add to
Cart hidden through a prop" and Subscribe and Save as simply "extracted into a shared snippet". Both
read as no-ops and neither is — see **D-8** and **D-11** in `deviations.md`:

- `snippets/product-card.liquid:261` renders `add-to-cart-button` unconditionally. Its parameters are
  `show_featured_image`, `hide_price`, `lazy_load` and `card_class` — there is no prop to pass.
- `sections/subscribe-letter.liquid` is a 305-line section with no extractable snippet, and the menu
  promo is a different layout, not the same markup in a narrower box.

**The product-card blast radius is 7 call sites**, verified by grep — two more than the homepage
sprint recorded: `collection`, `search`, `product-recommendations`, `recently-viewed-products`,
`featured-collection`, `featured-products` and `tabbed-product-collection`. All keep their Add to
Cart button, so the new parameter must default to `false` and every one needs a regression check. The
deliverable of 1.1 is mostly proof that nothing else moved.

**Subscribe & Save is two layouts.** Measured differences between the homepage band and the menu
card: the card has no logo, no "On your monthly essentials" subtitle, stacks its four benefits 4×1 at
`gap 18` instead of a 2×2 grid, and sits in a 352px column with `radius 20`, `padding 24` and a
five-stop radial gradient. Sprint §1's "the existing homepage section is not modified" cannot hold
literally — extraction rewrites its body. Read it as *schema and rendered output unchanged*, which is
1.2's acceptance gate.

**Normalisation applies here.** The card's benefit titles are Manrope SemiBold 16 in the design and
ship as **DM Sans SemiBold 16** per Sprint §2.1 — family swap only, size preserved. Only two families
ship across the whole theme.

**Conventions.** `{% render %}` not `{% include %}`; `{% doc %}` blocks are a bare parameter list
following the trimmed convention; non-utility CSS goes to `assets/base.css` or a section-scoped file,
never `src/input.css`; `assets/tailwind.css` is generated and never hand-edited. **The TDD is never
edited.**
