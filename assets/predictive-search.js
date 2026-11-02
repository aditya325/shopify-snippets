document.addEventListener("DOMContentLoaded", () => {
  const SEARCH_INPUT_ID = "predictive-search-input";
  const MIN_QUERY_LENGTH = 2;
  const DEBOUNCE_DELAY = 300;

  const inputEl = () => document.getElementById(SEARCH_INPUT_ID);
  const resultsEl = () => document.getElementById("predictive-search-results");

  let debounceTimer = null;
  let abortController = null;

  const setState = (state) => window.searchModal?.setSearchState(state);

  const performSearch = async (query) => {
    const input = inputEl();
    if (!input) return;

    abortController?.abort();
    abortController = new AbortController();
    const { signal } = abortController;

    setState("loading");

    const root = window.Shopify?.routes?.root || "/";
    const { sectionId } = input.dataset;
    const url = `${root}search?q=${encodeURIComponent(query)}&type=product&options[prefix]=last&section_id=${sectionId}`;

    try {
      const response = await fetch(url, { signal });

      if (!response.ok) throw new Error("Search failed");

      const doc = new DOMParser().parseFromString(
        await response.text(),
        "text/html",
      );
      const sectionContent = doc.getElementById("search-results-content");

      if (signal.aborted) return;

      const current = inputEl()?.value.trim() ?? "";

      if (current !== query) {
        if (current.length < MIN_QUERY_LENGTH) setState("default");
        return;
      }

      const container = resultsEl();
      if (!container) return;

      if (!sectionContent) {
        container.innerHTML = "";
        setState("default");
        return;
      }

      container.innerHTML = sectionContent.innerHTML;

      if (sectionContent.dataset.hasResults === "true") {
        window.searchRecentSearches?.trackSearch(query);
      }

      setState("results");
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Predictive search failed", error);
      const container = resultsEl();
      if (container) container.innerHTML = "";
      setState("default");
    }
  };

  document.addEventListener("input", (event) => {
    if (event.target.id !== SEARCH_INPUT_ID) return;

    const query = event.target.value.trim();
    clearTimeout(debounceTimer);

    if (query.length < MIN_QUERY_LENGTH) {
      abortController?.abort();
      setState("default");
      return;
    }

    debounceTimer = setTimeout(() => performSearch(query), DEBOUNCE_DELAY);
  });

  document.addEventListener("keydown", (event) => {
    if (event.target.id !== SEARCH_INPUT_ID || event.key !== "Enter") return;

    const entered = event.target.value.trim();
    if (!entered) return;

    window.searchRecentSearches?.trackSearch(entered);

    const root = window.Shopify?.routes?.root || "/";
    window.location.href = `${root}search?q=${encodeURIComponent(entered)}&type=product`;
  });
});
