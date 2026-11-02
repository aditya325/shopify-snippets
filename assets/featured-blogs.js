const BLOGS_OPTIONS = {
  align: "start",
  loop: false,
  containScroll: "trimSnaps",
};

const initBlogsCarousel = (viewport) => {
  const embla = window.EmblaCarousel(viewport, BLOGS_OPTIONS);

  viewport.setAttribute("tabindex", "0");
  viewport.setAttribute("role", "group");
  viewport.setAttribute("aria-roledescription", "carousel");

  const { carouselLabel } = viewport.dataset;
  if (carouselLabel) viewport.setAttribute("aria-label", carouselLabel);

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      embla.scrollNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      embla.scrollPrev();
    }
  });
};

const initAllBlogsCarousels = (scope) => {
  if (!window.EmblaCarousel) return;

  for (const viewport of scope.querySelectorAll("[data-blogs-viewport]"))
    initBlogsCarousel(viewport);
};

document.addEventListener("DOMContentLoaded", () =>
  initAllBlogsCarousels(document),
);

document.addEventListener("shopify:section:load", (event) =>
  initAllBlogsCarousels(event.target),
);
