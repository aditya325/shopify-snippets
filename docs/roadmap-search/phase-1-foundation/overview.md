# Phase 1: Foundation

## Purpose

Bring the theme's search settings and plumbing to their final shape before any styling begins. Every
later PRD either reads a setting defined here or renders the response wired up here, which is why this
phase is the critical path — and why the metafield smoke test in 1.2 sits at the front of the sprint
rather than being discovered inside Phase 4.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 1.1 | search-settings-and-retirement | PRD | The `"Search"` settings group in final shape; Trending and Recently Viewed deleted from code, settings and locales |
| 1.2 | predictive-search-api-switch | PRD | Rewire to `/search/suggest` + `section_id` through the already-built `sections/predictive-search.liquid`; verify metafield exposure |

## Shared Context

**The modal is a snippet, not a section.** `snippets/search-modal.liquid` is rendered from
`sections/header.liquid:38`, so it has no `{% schema %}` of its own. Every setting therefore lives in the
global `"Search"` group in `config/settings_schema.json`, and Sprint §3.1's section-scoped settings and
`concern_chip` blocks are unavailable — see D-1 and D-2 in `deviations.md`.

**What already exists and is reused.** `assets/search-modal.js` (open/close/Escape/⌘K),
`assets/search-recent-searches.js` (storage key `themex-recent-searches`, dedupe, substring removal,
clear control), `assets/predictive-search.js` (2-character minimum, 300 ms debounce, `AbortController`),
and `sections/recent-searches.liquid`. Sprint §4.3's F3 is already satisfied by shipped code.

**What is deleted.** Trending (Sprint §1 confirms discarded, with two dead settings),
Recently Viewed (in neither design nor TDD), and `sections/search-modal-results.liquid` (orphaned by the
API switch).

**Both PRDs edit `snippets/search-modal.liquid`,** which is why they run sequentially rather than in
parallel.

**Setting IDs are renamed** (D-6, amended by 1.1's P-1), which would orphan any stored `best_sellers_*` values in
`config/settings_data.json`. ⚠️ **Corrected 2026-08-18:** no such values existed, so nothing was orphaned — one first-time **assignment** in admin after deploy is expected; that file is written by
the theme editor and must not be hand-edited.
