const BUNDLES_DESKTOP_MEDIA = "(min-width: 1024px)";
const BUNDLES_A11Y_ATTRIBUTES = [
  "tabindex",
  "role",
  "aria-roledescription",
  "aria-label",
];
const BUNDLES_OPTIONS = {
  align: "start",
  loop: false,
  containScroll: "trimSnaps",
};

const initBundlesCarousel = (slider) => {
  const viewport = slider.querySelector("[data-bundles-viewport]");
  if (!viewport) return;

  const desktopStatic = viewport.dataset.desktopStatic !== "false";
  const options = desktopStatic
    ? {
      ...BUNDLES_OPTIONS,
      breakpoints: { [BUNDLES_DESKTOP_MEDIA]: { active: false } },
    }
    : { ...BUNDLES_OPTIONS };
  const embla = window.EmblaCarousel(viewport, options);

  const dotsWrapper = slider.querySelector("[data-bundles-dots]");
  const dots = [...slider.querySelectorAll("[data-bundles-dot]")];

  const isActive = () =>
    desktopStatic ? !window.matchMedia(BUNDLES_DESKTOP_MEDIA).matches : true;

  const syncDots = () => {
    const snapCount = embla.scrollSnapList().length;
    const selected = embla.selectedScrollSnap();

    if (dotsWrapper) dotsWrapper.hidden = snapCount <= 1;

    dots.forEach((dot, index) => {
      dot.hidden = index >= snapCount;
      if (index === selected) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const syncAccessibility = () => {
    if (!isActive()) {
      for (const attribute of BUNDLES_A11Y_ATTRIBUTES)
        viewport.removeAttribute(attribute);
      return;
    }

    viewport.setAttribute("tabindex", "0");
    viewport.setAttribute("role", "group");
    viewport.setAttribute("aria-roledescription", "carousel");

    const { carouselLabel } = viewport.dataset;
    if (carouselLabel) viewport.setAttribute("aria-label", carouselLabel);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => embla.scrollTo(index));
  });

  viewport.addEventListener("keydown", (event) => {
    if (!isActive()) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      embla.scrollNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      embla.scrollPrev();
    }
  });

  embla.on("select", syncDots);
  embla.on("reInit", () => {
    syncAccessibility();
    syncDots();
  });

  syncAccessibility();
  syncDots();
};

const initAllBundlesCarousels = (scope) => {
  if (!window.EmblaCarousel) return;

  for (const slider of scope.querySelectorAll("[data-bundles-slider]"))
    initBundlesCarousel(slider);
};

document.addEventListener("DOMContentLoaded", () =>
  initAllBundlesCarousels(document),
);

document.addEventListener("shopify:section:load", (event) =>
  initAllBundlesCarousels(event.target),
);
