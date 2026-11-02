document.addEventListener("DOMContentLoaded", () => {
  if (!window.EmblaCarousel || !window.EmblaCarouselAutoplay) return;

  const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
  const DEFAULT_DELAY = 5000;
  const CAROUSEL_OPTIONS = {
    loop: true,
    align: "start",
  };

  const initHeroBanner = (root) => {
    const delay = Number(root.dataset.autoplayDelay) || DEFAULT_DELAY;
    const autoplay = window.EmblaCarouselAutoplay({
      delay,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
      stopOnFocusIn: true,
      breakpoints: {
        [REDUCED_MOTION]: { active: false },
      },
    });

    const embla = window.EmblaCarousel(root, CAROUSEL_OPTIONS, [autoplay]);
    const dots = [...root.querySelectorAll("[data-hero-dot]")];

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

  const roots = document.querySelectorAll(".hero-banner__carousel");
  for (const root of roots) initHeroBanner(root);
});
