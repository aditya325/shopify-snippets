# Phase 3: Panels

## Purpose

Fill the five panes into the shell Phase 2 built. Every panel wires `rail_item` settings and renders
cards; none of them invents structure, chrome or behaviour.

Sprint §8 frames this correctly: five panels cover six content patterns — products, bundles, content
cards, an image, blog cards and press cards.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 3.1 | product-panels | PRD | Shop By Need + Categories — one shared pane snippet, richtext groups, product grids |
| 3.2 | combo-panel | PRD | Featured bundle card, popular bundle row, split pane with the subscribe promo |
| 3.3 | about-panel | PRD | Content cards and a single history thumbnail beside the subscribe promo |
| 3.4 | media-panel | PRD | press-card, plus both panes — Blogs via `article-card`, News via press-card |

**Four PRDs, not seven.** Shop By Need and Categories are the same component at different counts and
share one pane snippet, so they are one PRD. The new card components — bundle cards and press-card —
are each consumed by exactly one panel, so they are built inside that panel's PRD rather than
separately. That is a component boundary, not a work boundary.

## Shared Context

**Pane width is derived, not declared.** 2.2 switches the pane between 1068px and 684px based on
`show_subscribe_promo`. Shop By Need and Categories run full width with the promo off; Combo, About
and Media run split with a 352px promo at `x:1028`. No panel declares its own width.

**Panel heights all differ, and none are hardcoded.** Categories 495, Media 573 both, About Our Story
573, Combo 605, Shop By Need 637, About History 668. 2.3 measures at runtime precisely because of
this spread; verify the numbers at 4.3 rather than building to them.

**Only Shop By Need has rail icons**, verified against all 17 frames — which is why 2.2 requires an
unset `rail_icon` to leave no gap.

**Two Sprint §6 components are cancelled or already built.** The **history carousel does not ship**
(**D-7**) — approved scope is one thumbnail, and `389:24807` supports it: a single image, one caption,
one CTA, no arrows or dots. Those faint shapes either side are `decor-shape #D9D9D9`. That also
removes the search for a shared Embla init module, which does not exist (**D-9**) — homepage PRD 0.6
vendored the UMD files into `core-assets.liquid` but never built one.

**Two cards are reused untouched and must stay that way.** `snippets/product-card.liquid` gains only
the `hide_add_to_cart` prop from 1.1. `snippets/article-card.liquid` is used by the Blogs pane
completely unchanged per Sprint §6; it requires a caller-supplied `read_label`, which 3.4 exposes as a
setting rather than defaulting inside the card.

**F1 resolves in 3.1** (**D-4**). Sprint §2.2 records a `#EAB308` chip border. The measured chip
`389:22850` has fill `#fde047` and **no stroke at all** — and `#fde047` is a fourth yellow recorded
nowhere in the Sprint.

**Mobile is a distinct arrangement in three panels, not a reflow.** Combo turns the compact bundle
rows into a 2-up grid and splits the contents tick-list into two columns; Media renders Blogs 2-up but
stacks News full width; Shop By Need scrolls its trending links horizontally. Build these explicitly
rather than hoping the desktop layout wraps into them.

**Conventions.** New snippets carry a trimmed `{% doc %}` parameter list; all copy is
merchant-supplied, never hardcoded English; money renders through Shopify's money filter and needs
`flex-wrap` plus `whitespace-nowrap` because this store's format is long; the savings badge is derived
from price, never stored. **The TDD is never edited.**
