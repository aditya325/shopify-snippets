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
  };

  const initLifestyleCarousel = (root) => {
    const desktopStatic = root.dataset.desktopStatic !== "false";
    const options = desktopStatic
      ? {
          ...CAROUSEL_OPTIONS,
          breakpoints: { [DESKTOP_MEDIA]: { active: false } },
        }
      : { ...CAROUSEL_OPTIONS };
    const embla = window.EmblaCarousel(root, options);

    const isActive = () =>
      desktopStatic ? !window.matchMedia(DESKTOP_MEDIA).matches : true;

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

  const roots = document.querySelectorAll(".shop-by-lifestyle__carousel");
  for (const root of roots) initLifestyleCarousel(root);
});
