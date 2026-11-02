document.addEventListener("DOMContentLoaded", () => {
  const SORT_ROOT = "[data-facet-sort]";
  const OPEN_CLASSES = ["visible", "translate-y-0", "opacity-100"];
  const SHUT_CLASSES = ["invisible", "-translate-y-1", "opacity-0"];

  const rootOf = (el) => el.closest(SORT_ROOT);
  const menuOf = (root) => root?.querySelector("[data-facet-sort-menu]");
  const toggleOf = (root) => root?.querySelector("[data-facet-sort-toggle]");

  const setMenu = (root, open) => {
    const menu = menuOf(root);
    if (!menu) return;
    menu.classList.remove(...(open ? SHUT_CLASSES : OPEN_CLASSES));
    menu.classList.add(...(open ? OPEN_CLASSES : SHUT_CLASSES));
    toggleOf(root)?.setAttribute("aria-expanded", open ? "true" : "false");
  };

  const closeAll = (except) => {
    for (const root of document.querySelectorAll(SORT_ROOT)) {
      if (root !== except) setMenu(root, false);
    }
  };

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const showMore = event.target.closest("[data-filter-show-more]");
    if (showMore) {
      const group = showMore.closest(".search-filter-group");
      const extras = group?.querySelectorAll("[data-filter-value-extra]") ?? [];
      const expanded = showMore.getAttribute("aria-expanded") === "true";

      for (const extra of extras) extra.classList.toggle("hidden", expanded);
      showMore.setAttribute("aria-expanded", expanded ? "false" : "true");
      showMore.querySelector("[data-filter-show-more-label]").textContent =
        showMore.dataset[expanded ? "labelMore" : "labelLess"] ??
        (expanded ? "Show more" : "Show less");
      showMore
        .querySelector("[data-unfold-more]")
        ?.classList.toggle("hidden", !expanded);
      showMore
        .querySelector("[data-unfold-less]")
        ?.classList.toggle("hidden", expanded);
      return;
    }

    const toggle = event.target.closest("[data-facet-sort-toggle]");
    if (toggle) {
      const root = rootOf(toggle);
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      closeAll(root);
      setMenu(root, !isOpen);
      return;
    }

    const option = event.target.closest("[data-facet-sort-option]");
    if (option) {
      const root = rootOf(option);
      const select = root?.querySelector("[data-collection-sort]");
      const label = root?.querySelector("[data-facet-sort-label]");

      if (select && select.value !== option.dataset.value) {
        select.value = option.dataset.value;
        if (label) label.textContent = option.dataset.label ?? "";
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }

      closeAll();
      return;
    }

    if (!event.target.closest(SORT_ROOT)) closeAll();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAll();
  });

  const SENTINEL = "[data-facet-load-more]";
  let loading = false;

  const productsRoot = () => document.querySelector("[data-collection-products]");
  const sentinel = () => document.querySelector(SENTINEL);

  const hidePager = () => {
    if (!sentinel()) return;
    document
      .querySelectorAll("[data-facet-pagination]")
      .forEach((nav) => nav.classList.add("hidden"));
  };

  const appendNextPage = async () => {
    const node = sentinel();
    const grid = productsRoot()?.querySelector("[data-facet-grid]");
    const section = document.querySelector("[data-collection-section]");
    if (loading || !node || !grid || !section) return;

    const nextUrl = node.dataset.nextUrl;
    if (!nextUrl) return;

    loading = true;
    node.querySelector("[data-facet-load-more-spinner]")?.classList.remove("hidden");

    try {
      const url = new URL(nextUrl, window.location.origin);
      url.searchParams.set("sections", section.dataset.sectionId);

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error("Failed to fetch next page");

      const html = (await response.json())[section.dataset.sectionId];
      const doc = new DOMParser().parseFromString(html, "text/html");
      const incoming = doc.querySelector("[data-facet-grid]");
      if (!incoming) throw new Error("No grid in the fetched page");

      grid.append(...incoming.children);

      const nextSentinel = doc.querySelector(SENTINEL);
      if (nextSentinel) {
        node.dataset.nextUrl = nextSentinel.dataset.nextUrl;
      } else {
        node.remove();
      }
    } catch (error) {
      console.error("Infinite loading failed", error);
    } finally {
      loading = false;
      sentinel()
        ?.querySelector("[data-facet-load-more-spinner]")
        ?.classList.add("hidden");
      observeSentinel();
    }
  };

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) appendNextPage();
    },
    { rootMargin: "400px 0px" },
  );

  function observeSentinel() {
    io.disconnect();
    const node = sentinel();
    if (node) io.observe(node);
  }


  const products = productsRoot();
  if (products) {
    new MutationObserver(() => {
      hidePager();
      observeSentinel();
    }).observe(products, { childList: true, subtree: true });
  }

  hidePager();
  observeSentinel();

  const SHEET_PANELS = "[data-filter-panel][data-sheet], [data-sort-panel]";

  let drag = null;

  const closeSheetOf = (panel) => {

    panel.querySelector("[data-filter-close], [data-sort-close]")?.click();
  };

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (!(event.target instanceof Element)) return;
      const handle = event.target.closest("[data-sheet-handle]");
      if (!handle) return;
      const panel = handle.closest(SHEET_PANELS);
      if (!panel) return;

      drag = { panel, startY: event.clientY, moved: 0 };
      panel.style.setProperty("transition", "none");
      handle.setPointerCapture?.(event.pointerId);
    },
    { passive: true },
  );

  document.addEventListener(
    "pointermove",
    (event) => {
      if (!drag) return;
      drag.moved = Math.max(0, event.clientY - drag.startY);
      drag.panel.style.setProperty("transform", `translateY(${drag.moved}px)`);
    },
    { passive: true },
  );

  const endDrag = () => {
    if (!drag) return;
    const { panel, moved } = drag;
    drag = null;

    panel.style.removeProperty("transition");
    panel.style.removeProperty("transform");


    if (moved > panel.getBoundingClientRect().height / 4) closeSheetOf(panel);
  };

  document.addEventListener("pointerup", endDrag);
  document.addEventListener("pointercancel", endDrag);
});
