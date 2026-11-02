document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "themex-recent-searches";
  const DEFAULT_LIMIT = 6;

  const sectionEl = () => document.getElementById("recent-searches-section");
  const listEl = () => document.getElementById("recent-searches-list");
  const templateEl = () =>
    document.getElementById("recent-search-chip-template");
  const searchInputEl = () =>
    document.getElementById("predictive-search-input");

  const recentLimit = () => {
    const parsed = Number.parseInt(sectionEl()?.dataset.recentLimit ?? "", 10);
    return Number.isNaN(parsed) ? DEFAULT_LIMIT : parsed;
  };

  const getRecentSearches = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
      console.warn("Recent searches: unreadable storage", error);
      return [];
    }
  };

  const saveRecentSearch = (query) => {
    const trimmed = query?.trim();
    if (!trimmed) return;

    const lowered = trimmed.toLowerCase();
    const searches = getRecentSearches().filter(
      (entry) =>
        entry.toLowerCase() !== lowered &&
        !lowered.includes(entry.toLowerCase()),
    );

    searches.unshift(trimmed);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(searches.slice(0, recentLimit())),
    );
  };

  const buildChip = (entry, searchUrl) => {
    const chip = templateEl()?.content.firstElementChild?.cloneNode(true);
    if (!chip) return null;

    chip.href = `${searchUrl}?q=${encodeURIComponent(entry)}`;
    chip.dataset.query = entry;

    const label = chip.querySelector("span");
    if (label) label.textContent = entry;

    return chip;
  };

  const renderRecentSearches = () => {
    const section = sectionEl();
    const list = listEl();
    if (!section || !list) return;

    list.replaceChildren();

    const searchUrl = section.dataset.searchUrl || "/search";
    const chips = getRecentSearches()
      .slice(0, recentLimit())
      .map((entry) => buildChip(entry, searchUrl))
      .filter(Boolean);

    if (chips.length === 0) {
      section.classList.add("hidden");
      return;
    }

    list.append(...chips);
    section.classList.remove("hidden");
  };

  const clearRecentSearches = () => {
    localStorage.removeItem(STORAGE_KEY);
    renderRecentSearches();
  };

  const trackSearch = (query) => {
    if (!query?.trim()) return;
    saveRecentSearch(query.trim());
  };

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const chip = event.target.closest("#recent-searches-list [data-query]");
    if (chip) {
      const input = searchInputEl();
      if (!input) return;
      event.preventDefault();
      input.value = chip.dataset.query;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      return;
    }

    if (event.target.closest("#clear-recent-searches")) clearRecentSearches();
  });

  window.searchRecentSearches = {
    getRecentSearches,
    saveRecentSearch,
    trackSearch,
    renderRecentSearches,
  };
});
