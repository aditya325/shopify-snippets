# Phase 1: Shared Components

## Purpose

Build the six reusable pieces that the thirteen sections in Phase 2 and the footer in Phase 4
all render. Every one of these is used by three or more downstream PRDs, so getting the
contracts right here removes the largest source of rework later.

Two of the six are **rewrites of existing themex files**, not new work, and one of those has
five live call sites outside the homepage.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 1.1 | icon-set | PRD | Design-specific arrow and chevron snippets; audit the 15 existing `icon-*` snippets |
| 1.2 | button-snippet | PRD | One snippet, five variants; resolves F1 as-designed per placement |
| 1.3 | section-header-smile-underline | PRD | Shared heading snippet plus the masked-SVG arc utility |
| 1.4 | newsletter-snippet-extraction | PRD | Refactor `sections/newsletter.liquid` into a renderable snippet |
| 1.5 | product-card | PRD | Rewrite `snippets/product-card.liquid` to the Sprint §4.5 contract |
| 1.6 | article-card | PRD | Rewrite `snippets/article-card.liquid` to the Sprint §4.16 contract |

## Shared Context

**Verified starting state.** `snippets/` already contains 48 files, including 15 `icon-*`
snippets (`icon-arrow-left`, `icon-arrow-right`, `icon-chevron-down/left/right`, `icon-cart`,
`icon-search`, `icon-close`, `icon-plus`, `icon-minus`, `icon-checkmark`, `icon-account`,
`icon-hamburger`, `icon-filter`, `icon-discount`, `icon-spinner`), plus `product-card.liquid`
(103 lines), `article-card.liquid`, `product-badge.liquid` and `image.liquid`.

**The product-card blast radius.** `snippets/product-card.liquid` is rendered from five
sections: `collection.liquid`, `search.liquid`, `product-recommendations.liquid`,
`recently-viewed-products.liquid` and `featured-collection.liquid`. All five pass only
`card_product` (one also passes `lazy_load`). The approved decision is to **overwrite in
place** — which is what Global Standards §6.3 wants, one card everywhere — so every new
parameter must default safely and those four pages need regression checks.

**The newsletter is a section, not a snippet.** Sprint §4.7 and §4.17 both say subscribe-letter
and footer "reuse themex newsletter.liquid", but `sections/newsletter.liquid` is a section and
a section cannot be rendered inside another section. 1.4 exists to resolve this and is a hard
prerequisite for 2.9 and 4.2.

**Open items landing here.** F1 (button radii) is resolved in 1.2 as **as-designed per
placement** — every value is already measured in Sprint §2.5, and that is one of the two
options F1 offers. **F3 (hover states) is also resolved** (2026-08-07): an inverse fill/text
swap at 150ms ease with a 1px stroke present in every state so nothing reflows; cards get no
hover. 1.2 implements it and corrects Global Standards §6.1 and Sprint §5, which still carry
the old "no hover ships" wording. OD1 (wishlist app) stays open; 1.5 ships the icon inert per
Sprint §4.5. D2 (Judge.me) blocks the card's rating row, which ships as a guarded no-op.

**Conventions.** Vanilla JS Web Components with `customElements.get()` guards; DOM targeting
via `data-*` attributes; `{% render %}` not `{% include %}`; non-utility CSS in
`assets/base.css`; icons embedded in code, merchant-supplied icons via `image_picker`.
