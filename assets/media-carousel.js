document.addEventListener("DOMContentLoaded", () => {
  if (!window.EmblaCarousel) return;

  const DESKTOP_MEDIA = "(min-width: 1024px)";
  const CAROUSEL_OPTIONS = {
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  };

  const initMediaCarousel = (root) => {
    const desktopStatic = root.dataset.desktopStatic !== "false";
    const options = desktopStatic
      ? {
          ...CAROUSEL_OPTIONS,
          breakpoints: { [DESKTOP_MEDIA]: { active: false } },
        }
      : { ...CAROUSEL_OPTIONS };
    const embla = window.EmblaCarousel(root, options);

    const dots = [...root.querySelectorAll("[data-media-dot]")];

    const syncDots = () => {
      const selected = embla.selectedScrollSnap();
      dots.forEach((dot, index) => {
        if (index === selected) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => embla.scrollTo(index));
    });

    embla.on("select", syncDots);
    embla.on("reInit", syncDots);
    syncDots();
  };

  const roots = document.querySelectorAll(".media-carousel__carousel");
  for (const root of roots) initMediaCarousel(root);
});
