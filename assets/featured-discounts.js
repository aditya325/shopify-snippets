document.addEventListener("DOMContentLoaded", () => {
  if (!window.EmblaCarousel) return;

  const DESKTOP_MEDIA = "(min-width: 1024px)";
  const A11Y_ATTRIBUTES = [
    "tabindex",
    "role",
    "aria-roledescription",
    "aria-label",
  ];
  const CAROUSEL_OPTIONS = {
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    breakpoints: { [DESKTOP_MEDIA]: { active: false } },
  };

  const initDiscountCarousel = (root) => {
    const embla = window.EmblaCarousel(root, CAROUSEL_OPTIONS);

    const isActive = () => !window.matchMedia(DESKTOP_MEDIA).matches;

    const syncAccessibility = () => {
      if (!isActive()) {
        for (const attribute of A11Y_ATTRIBUTES)
          root.removeAttribute(attribute);
        return;
      }

      root.setAttribute("tabindex", "0");
      root.setAttribute("role", "group");
      root.setAttribute("aria-roledescription", "carousel");

      const { carouselLabel } = root.dataset;
      if (carouselLabel) root.setAttribute("aria-label", carouselLabel);
    };

    root.addEventListener("keydown", (event) => {
      if (!isActive()) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        embla.scrollNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        embla.scrollPrev();
      }
    });

    embla.on("reInit", syncAccessibility);
    syncAccessibility();
  };

  const roots = document.querySelectorAll(".featured-discounts__carousel");
  for (const root of roots) initDiscountCarousel(root);
});
