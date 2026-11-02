document.addEventListener("DOMContentLoaded", () => {
  if (!window.EmblaCarousel || !window.EmblaCarouselAutoplay) return;

  const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
  const DEFAULT_DELAY = 4000;
  const CAROUSEL_OPTIONS = {
    loop: true,
    align: "start",
  };

  const initAnnouncementBar = (root) => {
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

    window.EmblaCarousel(root, CAROUSEL_OPTIONS, [autoplay]);
  };

  const roots = document.querySelectorAll(".announcement-bar__carousel");
  for (const root of roots) initAnnouncementBar(root);
});
