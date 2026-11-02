# Phase 2: Modal Shell

## Purpose

Build the modal's container and its interaction contract with no content in it. Isolating the shell from
the content groups means the responsive width rule, the max-height scroll behaviour and the runtime
header offset are all verified against an empty panel — before content can mask a layout fault. The
accessibility work is kept as its own PRD because it is JavaScript rather than markup, and folding a
focus trap into a styling pass is how focus traps get skipped.

## Sub-Phases

| # | Name | Type | Description |
|---|------|------|-------------|
| 2.1 | modal-shell-responsive | PRD | Desktop overlay panel and mobile full-screen takeover in one responsive pass — backdrop, close control, search bar, panel, width and height rules |
| 2.2 | focus-keyboard-transitions | PRD | Focus trap and return, three close routes, ⌘K, loading fade, cleared → default transition |

## Shared Context

**Two patterns, one markup.** Desktop is an overlay panel over a blurred backdrop; mobile is a full-screen
takeover below the site header. They differ in layout but share every element, so both are built in a
single responsive pass with breakpoint utilities rather than two branches.

**The width rule** (D-8): a percentage below 1280, fixed 1200px from `xl` up. A declared 1200 overflows a
1024 viewport by 176px, and 1024 is where this theme's desktop layout engages. The measured heights —
741 default, 551 typed — become `max-height` with internal scroll, because Sprint §4.2 omits Recent Search
when there is no history, so panel content genuinely varies.

**The header is not a fixed height.** `sections/header.liquid:17` is `sticky top-0 z-50`, mobile is
`min-h-[66px]`, desktop `lg:h-[110px]`, and no `--header-height` variable exists. The mobile offset is
measured at runtime. The design's 58px header instance is contradicted by its own PLP frame (66px) and by
the theme (66px), so 117px is not a valid offset (D-22).

**Reuse, do not re-derive.** Sprint §2.1's backdrop — `#000000` at 20% with a 6px blur — already ships at
`sections/header.liquid:32` as `bg-black/20 backdrop-blur-[6px]` for the mega-menu. Use the same pair, and
the same 250ms `ease-out` house transition, so search and navigation agree.

**The modal is `z-[60]` above the `z-50` header,** so it already covers the header on desktop as the design
shows. Nothing in this phase needs to change that.
