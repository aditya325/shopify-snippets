const FAQ_DESKTOP_MEDIA = "(min-width: 1024px)";
const FAQ_CAROUSEL_OPTIONS = {
  align: "start",
  loop: false,
  containScroll: "trimSnaps",
  slidesToScroll: 3,
};

const initFaqCarousel = (root) => {
  const viewport = root.querySelector("[data-faq-tabs]");
  const dotsGroup = root.querySelector("[data-faq-dots]");
  const dots = [...root.querySelectorAll("[data-faq-dot]")];

  if (!viewport || !window.EmblaCarousel) return;

  const embla = window.EmblaCarousel(viewport, {
    ...FAQ_CAROUSEL_OPTIONS,
    breakpoints: { [FAQ_DESKTOP_MEDIA]: { active: false } },
  });

  const readPaging = () => {
    const overflow = embla.containerNode().scrollWidth - 1;
    const pageCount = Math.max(1, Math.ceil(overflow / viewport.clientWidth));

    return { snapCount: embla.scrollSnapList().length, pageCount };
  };

  const syncDots = () => {
    const { snapCount, pageCount } = readPaging();
    const progress =
      snapCount > 1 ? embla.selectedScrollSnap() / (snapCount - 1) : 0;
    const selected = Math.min(pageCount - 1, Math.floor(progress * pageCount));

    dotsGroup?.classList.toggle("hidden", pageCount < 2);

    dots.forEach((dot, index) => {
      dot.classList.toggle("hidden", index >= pageCount);

      if (index === selected) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const { snapCount, pageCount } = readPaging();
      const ratio = pageCount > 1 ? index / (pageCount - 1) : 0;

      embla.scrollTo(Math.round(ratio * (snapCount - 1)));
    });
  });

  embla.on("select", syncDots);
  embla.on("reInit", syncDots);
  syncDots();
};

const initFaqFilter = (root) => {
  const tabs = [...root.querySelectorAll("[data-faq-tab]")];
  const groups = [...root.querySelectorAll("[data-faq-group]")];
  const searchInput = root.querySelector("[data-faq-search]");
  const noResults = root.querySelector("[data-faq-no-results]");

  let activeIndex = tabs[0]?.dataset.faqIndex ?? null;
  let query = "";

  const applyState = () => {
    let matched = 0;

    for (const group of groups) {
      const { faqIndex } = group.dataset;
      const rows = group.querySelectorAll("[data-faq-row]");
      let groupMatched = 0;

      for (const row of rows) {
        const isMatch =
          query === "" || (row.dataset.faqQuestion ?? "").includes(query);
        row.classList.toggle("hidden", !isMatch);

        if (isMatch) groupMatched += 1;
      }

      const isVisible =
        query === ""
          ? activeIndex === null || activeIndex === faqIndex
          : groupMatched > 0;

      group.classList.toggle("hidden", !isVisible);

      if (isVisible) matched += groupMatched;
    }

    for (const tab of tabs) {
      tab.setAttribute(
        "aria-pressed",
        String(query === "" && tab.dataset.faqIndex === activeIndex),
      );
    }

    noResults?.classList.toggle("hidden", query === "" || matched > 0);
  };

  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      activeIndex = tab.dataset.faqIndex;
      query = "";

      if (searchInput) searchInput.value = "";

      applyState();
    });
  }

  searchInput?.addEventListener("input", () => {
    query = searchInput.value.trim().toLowerCase();

    applyState();
  });

  applyState();
};

const initFaqSection = (root) => {
  if (root.dataset.faqInitialized === "true") return;
  root.dataset.faqInitialized = "true";

  initFaqCarousel(root);
  initFaqFilter(root);
};

const initFaqSections = (scope) => {
  for (const root of scope.querySelectorAll("[data-faq-section]"))
    initFaqSection(root);
};

document.addEventListener("DOMContentLoaded", () => initFaqSections(document));
document.addEventListener("shopify:section:load", (event) =>
  initFaqSections(event.target),
);
