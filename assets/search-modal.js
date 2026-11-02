document.addEventListener("DOMContentLoaded", () => {
  const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const TRANSITION = 250;

  const modalEl = () => document.getElementById("search-modal");
  const inputEl = () => document.getElementById("predictive-search-input");
  const defaultContentEl = () =>
    document.getElementById("search-default-content");
  const loadingEl = () => document.getElementById("predictive-search-loading");
  const resultsEl = () => document.getElementById("predictive-search-results");
  const panelEl = () => modalEl()?.querySelector("[data-search-panel]");
  const panelBodyEl = () =>
    modalEl()?.querySelector("[data-search-panel-body]");
  const clearButtonEl = () => modalEl()?.querySelector("[data-search-clear]");

  let previousActiveElement = null;
  let bodyObserver = null;
  let swapTimer = null;
  let releaseTimer = null;
  let closeTimer = null;
  let pendingCommit = null;

  const isOpen = () => modalEl()?.classList.contains("hidden") === false;

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cartDrawerIsOpen = () =>
    document.querySelector('cart-drawer[aria-hidden="false"]') !== null;

  const showDefaultContent = () =>
    window.searchRecentSearches?.renderRecentSearches();

  const syncClearButton = () => {
    clearButtonEl()?.classList.toggle(
      "hidden",
      (inputEl()?.value.length ?? 0) === 0,
    );
  };

  const stateContainer = (state) => {
    if (state === "results") return resultsEl();
    if (state === "loading") return loadingEl();
    return defaultContentEl();
  };

  const easeToNatural = () => {
    const panelBody = panelBodyEl();
    if (!panelBody || panelBody.style.height === "") return;

    const pinned = panelBody.style.height;
    panelBody.style.height = "auto";
    const target = panelBody.offsetHeight;
    panelBody.style.height = pinned;
    void panelBody.offsetHeight;
    panelBody.style.height = `${target}px`;

    releaseTimer = setTimeout(() => {
      panelBody.style.height = "";
    }, TRANSITION);
  };

  const flushPending = () => {
    if (!pendingCommit) return;
    clearTimeout(swapTimer);
    swapTimer = null;
    const commit = pendingCommit;
    pendingCommit = null;
    commit(true);
  };

  const setSearchState = (next) => {
    flushPending();

    const modal = modalEl();
    if (!modal) return;

    const current = modal.dataset.searchState;
    if (next === current) {
      easeToNatural();
      return;
    }

    clearTimeout(releaseTimer);

    const outgoing = stateContainer(current);
    const incoming = stateContainer(next);
    const instant = prefersReducedMotion();
    const panelBody = panelBodyEl();

    const commit = (flushed) => {
      pendingCommit = null;
      outgoing?.classList.add("hidden");
      if (incoming) {
        incoming.classList.remove("hidden");
        void incoming.offsetHeight;
        incoming.classList.remove("opacity-0");
      }
      modal.dataset.searchState = next;

      if (next === "default") showDefaultContent();

      if (!panelBody) return;

      if (instant) {
        panelBody.style.height = "";
        return;
      }

      if (flushed) return;

      easeToNatural();
    };

    if (instant || !panelBody) {
      commit(true);
      return;
    }

    panelBody.style.height = `${panelBody.offsetHeight}px`;
    outgoing?.classList.add("opacity-0");
    incoming?.classList.add("opacity-0");
    pendingCommit = commit;
    swapTimer = setTimeout(() => commit(false), TRANSITION);
  };

  const resetSearchState = () => {
    clearTimeout(swapTimer);
    clearTimeout(releaseTimer);
    swapTimer = null;
    releaseTimer = null;
    pendingCommit = null;

    const panelBody = panelBodyEl();
    if (panelBody) panelBody.style.height = "";

    const input = inputEl();
    if (input) input.value = "";
    syncClearButton();

    const results = resultsEl();
    if (results) {
      results.classList.add("hidden");
      results.classList.remove("opacity-0");
      results.innerHTML = "";
    }

    const loading = loadingEl();
    loading?.classList.add("hidden");
    loading?.classList.remove("opacity-0");

    defaultContentEl()?.classList.remove("hidden", "opacity-0");

    const modal = modalEl();
    if (modal) modal.dataset.searchState = "default";
  };

  const observeScrollLock = () => {
    bodyObserver?.disconnect();
    bodyObserver = new MutationObserver(() => {
      if (isOpen() && !document.body.classList.contains("overflow-hidden")) {
        document.body.classList.add("overflow-hidden");
      }
    });
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
  };

  const openModal = () => {
    const modal = modalEl();
    if (!modal) return;

    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
      resetSearchState();
    }

    previousActiveElement = document.activeElement;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
    inputEl()?.focus({ preventScroll: true });

    showDefaultContent();
    observeScrollLock();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.remove("opacity-0");
        modal.classList.add("opacity-100");
        panelEl()?.classList.remove("translate-y-4", "opacity-0");
        panelEl()?.classList.add("translate-y-0", "opacity-100");
      });
    });
  };

  const closeModal = () => {
    const modal = modalEl();
    if (!modal) return;

    if (closeTimer !== null) clearTimeout(closeTimer);

    modal.classList.remove("opacity-100");
    modal.classList.add("opacity-0");
    panelEl()?.classList.remove("translate-y-0", "opacity-100");
    panelEl()?.classList.add("translate-y-4", "opacity-0");

    closeTimer = setTimeout(() => {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("overflow-hidden");
      resetSearchState();
      bodyObserver?.disconnect();
      bodyObserver = null;
      previousActiveElement?.focus?.();
      previousActiveElement = null;
      closeTimer = null;
    }, TRANSITION);
  };

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    if (event.target.closest(".search-trigger")) {
      event.preventDefault();
      openModal();
      return;
    }

    if (event.target.closest("[data-search-close]")) {
      closeModal();
      return;
    }

    if (event.target.closest("[data-search-clear]")) {
      const input = inputEl();
      if (!input) return;
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
      return;
    }

    const modal = modalEl();
    if (!modal || !isOpen() || !modal.contains(event.target)) return;

    if (!event.target.closest("[data-search-panel]")) {
      closeModal();
      return;
    }

    if (
      event.target.closest("[data-search-bar]") &&
      !event.target.closest("button")
    ) {
      inputEl()?.focus();
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target === inputEl()) syncClearButton();
  });

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault();
      if (isOpen()) closeModal();
      else openModal();
      return;
    }

    const modal = modalEl();
    if (!modal || !isOpen()) return;

    if (event.key === "Escape" && !cartDrawerIsOpen()) {
      closeModal();
      return;
    }

    if (event.key !== "Tab" || !modal.contains(event.target)) return;

    const focusable = [...modal.querySelectorAll(FOCUSABLE)].filter(
      (element) => element.offsetParent !== null,
    );

    if (focusable.length === 0) return;

    if (focusable.length === 1) {
      event.preventDefault();
      focusable[0].focus();
      return;
    }

    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("shopify:section:load", (event) => {
    if (!event.target.querySelector("#search-modal")) return;

    clearTimeout(swapTimer);
    clearTimeout(releaseTimer);
    clearTimeout(closeTimer);
    swapTimer = null;
    releaseTimer = null;
    closeTimer = null;
    pendingCommit = null;
    previousActiveElement = null;
    bodyObserver?.disconnect();
    bodyObserver = null;
    document.body.classList.remove("overflow-hidden");
  });

  window.searchModal = {
    open: openModal,
    close: closeModal,
    showDefaultContent,
    setSearchState,
  };
});
