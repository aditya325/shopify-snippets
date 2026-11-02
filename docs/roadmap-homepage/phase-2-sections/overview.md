# Phase 2: Sections

## Purpose

Build the thirteen custom homepage sections defined in Sprint §4. Each is an independent
Online Store 2.0 section with its own `{% schema %}`, blocks and presets, composed from the
shared components delivered in Phase 1.

The footer is the fourteenth custom section but lives in Phase 4 with the header, because both
belong to section groups rather than the homepage template.

## Sub-Phases

Numbered in **dependency order** — execution order matches the numbering.

| # | Name | Type | Description |
|---|------|------|-------------|
| 2.1 | hero-text | PRD | Sprint §4.3 — full-bleed richtext strip; simplest section, only needs 1.3 |
| 2.2 | claims | PRD | Sprint §4.13 — Trusted By Millions stats row |
| 2.3 | shop-by-category | PRD | Sprint §4.6 — Recovery Starts Here; 5-col desktop, 3+2 mobile |
| 2.4 | shop-by-lifestyle | PRD | Sprint §4.9 — lifestyle cards on a gradient wash |
| 2.5 | announcement-banner | PRD | Sprint §4.11 — thin offer strip; first Embla consumer |
| 2.6 | media-carousel | PRD | Sprint §4.8 — upselling banners |
| 2.7 | featured-discounts | PRD | Sprint §4.2 — discount banner blocks |
| 2.8 | hero-banner | PRD | Sprint §4.1 — LCP-critical; overwrites the existing themex section |
| 2.9 | subscribe-letter | PRD | Sprint §4.7 — Subscribe & Save band; needs 1.4 |
| 2.10 | timeline | PRD | Sprint §4.12 — About Us band with IntersectionObserver progress line |
| 2.11 | tabbed-product-collection | PRD | Sprint §4.4 — Bestseller tabs; needs 1.5 |
| 2.12 | featured-products | PRD | Sprint §4.10 — Curated wellness bundles; needs 1.5 + 0.6 |
| 2.13 | featured-blogs | PRD | Sprint §4.16 — Wellness Simplified; needs 1.6 |

## Shared Context

**Every section in this phase shares the same skeleton.** A `{% schema %}` with a `presets`
entry so it is addable in the theme editor, section-level `margin_top` / `margin_bottom`
range settings, the 1.3 section-header snippet where a heading exists, and the 0.3 spacing
wrapper or an explicit measured exception.

**Design source.** Figma extraction is complete at `.buildspace/artifacts/home-page/` — 34
screenshots at 2x, `sections.json` with node IDs for both viewports, and a 3,640-line
`design-context.md` carrying per-section layout, typography, colour, border, shadow and spacing
tables plus full element trees. Every PRD references its own node IDs. **Re-running `/figma` is
not required** unless a design changes.

**Mobile-first.** The 390px mobile frame is the base spec; desktop is the enhancement layered
on at `md:` and above. Per-section padding follows the measured Figma values, not a normalised
scale — Global Standards §5.2 is explicit that the scattered mobile side paddings are as
designed.

**Media rules, applied identically everywhere.** Video beats image whenever both are set;
poster comes from `video.preview_image`; video is muted, `playsinline`, looped and
lazy-initialised near the viewport. Images render through `snippets/image.liquid` as `<picture>`
with separate desktop and mobile sources — never CSS background images. Everything below the
fold is `loading="lazy"` + `decoding="async"`.

**Authoring rules.** Nothing merchant-visible is hardcoded. Headings, titles and sublines are
richtext; plain text only for short labels. Blocks never declare `max_blocks`. Every CTA is a
label + link pair. Decorative arrows and chevrons come from 1.1; merchant icons come through
`image_picker`.

**Carousel rules.** 0.6 vendors Embla and loads it globally; that is all it does. Each of the
five carousel sections then owns a **complete, standalone JS file** — its own init, its own
teardown where it needs one, its own dots where it has them. Nothing is shared between them
beyond the library globals `EmblaCarousel` and `EmblaCarouselAutoplay`.

Sections boot on `DOMContentLoaded` and match their root by class selector. Autoplay uses the
vendored plugin — never `setInterval`, which cannot pause on hover or focus and never resets
after a manual swipe.

**Layer names lie.** Several Figma layers carry stale names from source components — the
hero-text strip's text nodes are named "Trusted Relief Title" though the content is "We're
building a healthier India", and the desktop header layer is called "Mobile Menu". Trust the
Sprint section names and the rendered content, not the layer names.
