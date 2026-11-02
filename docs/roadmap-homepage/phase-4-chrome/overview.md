# Phase 4: Chrome

## Purpose

Deliver the two persistent page elements that live in Shopify **section groups** rather than the
homepage template — the header and the footer. Both appear on every page of the storefront, so
their blast radius is the whole site, not just the homepage.

They are grouped here rather than in Phase 2 because `header-group.json` and
`footer-group.json` are assembled separately from `templates/index.json`.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 4.1 | header-restyle | PRD | Restyle the existing themex header to match Figma — no schema investment |
| 4.2 | footer | PRD | Sprint §4.17 — full custom footer with four block types |

## Shared Context

**The two are asymmetric in scope, deliberately.** Sprint §1 puts the header explicitly out of
scope as a build: "themex boilerplate header restyled to match Figma… Menu from Shopify
navigation. **No schema investment.**" The footer, by contrast, is one of the 14 custom sections
with a complete field contract in §4.17.

**Existing header assets.** `sections/header.liquid` plus `snippets/header-desktop.liquid` and
`snippets/header-mobile.liquid` already exist, along with `assets/header-javascript.js` and
`config/header-group.json`. 4.1 restyles these; it does not rewrite them.

**Existing footer assets.** `sections/footer.liquid` and `config/footer-group.json` exist from
themex. 4.2 is a rewrite against the §4.17 contract, not a restyle.

**Figma layer naming trap.** The desktop header layer in Figma is named **`Mobile Menu`**
(`108:11415`) — it is the 1440px desktop nav bar, not a mobile menu. The actual mobile header is
`108:10688`. The frame `108:10685` named `Navigation Bar` is an **iOS status-bar mock** showing
"9:41" and is not a themeable element; it is the sole source of the `SF Pro Text 17px` style and
`#18181B` colour in the extraction's global inventories, and both should be ignored.

**Footer depends on 1.4.** Sprint §4.17 specifies the footer's newsletter capture reuses
`newsletter.liquid`, which is a section and cannot be nested. 1.4 extracts it to a snippet;
4.2 cannot start before that lands.

**Both are site-wide.** Any regression here affects collection, product, cart, search, blog and
customer templates — not just the homepage. Verification must cover more than `index.json`.
