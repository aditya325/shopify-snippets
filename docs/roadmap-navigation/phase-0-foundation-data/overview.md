# Phase 0: Foundation & Data

## Purpose

Build the Shopify-side data the header reads from. Sprint §7 lists D1–D7 as dependencies; all were
confirmed **unbuilt** during brainstorming, so they are scope, not external blockers.

This phase is the critical path. Nothing in Phase 2 or Phase 3 can be verified against real content
until 0.1 lands — the menu gates every panel and the collections gate every product pane.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 0.1 | shopify-data-foundation | PRD | Metafields, 19 collections, 2 blogs and the navigation menu (D1–D4) |
| 0.2 | rail-icons | PRD | 7 SVG icons — Shop By Need is the only rail that has them (D6) |

They are two PRDs, not five, because D1–D4 are the same kind of work: Shopify admin configuration,
no theme code, done in one sitting. 0.2 is separate because it is Figma export plus a verification
spike, not admin data entry.

## Shared Context

**Verified starting state.** The store already carries six metafield definitions under the `custom`
namespace from `docs/roadmap-homepage/phase-0-foundation/0.5-metafield-definitions.md` — `product_badge`,
`category_label`, `highlight_color`, `highlight_text`, `card_image` on the product, and `read_time`
on the article. 0.1 adds **two**, not eight. Namespace stays `custom`.

**D7 shrank to nothing.** Sprint §7 lists D7 as history carousel images and captions. Approved scope
is a single history thumbnail (**D-7** in `deviations.md`), so there is no carousel and no slide set
— D7 folds into 3.3 as one image and needs no work here.

**The rail icon count is 7, not 23** (**D-12**). Sprint §3.2 gives every `rail_item` a `rail_icon`,
implying one per rail row. Measured across all 17 frames, only the Shop By Need rail renders icons.
Do not produce icons nobody asked for.

**Three decisions must be made in 0.1, not deferred.** Whether the four collections appearing in two
rails are shared or duplicated; which top-level labels win when desktop says Combo/Media and mobile
says Bundles/Blogs; and which Categories rail labels win. One Shopify menu drives both viewports, so
one set must survive. The last two are departures from the design and need an entry in
`deviations.md` so 4.3 does not raise them as fidelity defects.

**SVG in `image_picker` is unproven.** Shopify's documented theme image formats are JPEG, Progressive
JPEG, PNG, GIF, HEIC and WebP; SVG is not among them and cannot pass `image_url` transforms. 0.2
opens with an empirical spike for exactly this reason and carries an `asset_url` fallback that leaves
the 2.2 schema unchanged either way.

**Conventions.** Admin work uses the Shopify admin UI or the Admin GraphQL API with `SHOPIFY_STORE`
and `SHOPIFY_ADMIN_TOKEN` from `.env`; scopes may need widening on the dev app first. Every handle
created here goes into the registry in `status-log.md`, because downstream PRDs wire settings against
them. **The TDD is never edited** — departures go to `deviations.md`.
