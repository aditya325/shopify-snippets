const PICKED_DESKTOP_MEDIA = "(min-width: 1024px)";
const PICKED_A11Y_ATTRIBUTES = [
  "tabindex",
  "role",
  "aria-roledescription",
  "aria-label",
];
const PICKED_OPTIONS = {
  align: "start",
  loop: false,
  containScroll: "trimSnaps",
  slidesToScroll: 2,
};
const PICKED_DESKTOP_SCROLL = 4;

const initPickedCarousel = (root) => {
  if (!window.EmblaCarousel) return;
  if (root.dataset.embla === "ready") return;

  const desktopStatic = root.dataset.desktopStatic !== "false";
  const desktopOverride = desktopStatic
    ? { active: false }
    : { slidesToScroll: PICKED_DESKTOP_SCROLL };
  const options = {
    ...PICKED_OPTIONS,
    breakpoints: { [PICKED_DESKTOP_MEDIA]: desktopOverride },
  };

  const embla = window.EmblaCarousel(root, options);

  const rails = {
    mobile: root.parentElement.querySelector('[data-picked-dots="mobile"]'),
    desktop: root.parentElement.querySelector('[data-picked-dots="desktop"]'),
  };
  const allDots = [...root.parentElement.querySelectorAll("[data-picked-dot]")];

  const isDesktop = () => window.matchMedia(PICKED_DESKTOP_MEDIA).matches;
  const isActive = () => !(desktopStatic && isDesktop());

  const activeDots = () => {
    const rail = isDesktop() ? rails.desktop : rails.mobile;
    return rail ? [...rail.querySelectorAll("[data-picked-dot]")] : [];
  };

  const warnOnSnapMismatch = () => {
    const dots = activeDots();
    if (!isActive() || dots.length === 0) return;

    const snapCount = embla.scrollSnapList().length;
    if (dots.length !== snapCount) {
      console.warn(
        `[picked-just-for-you] ${dots.length} dots against ${snapCount} snaps`,
      );
    }
  };

  const syncDots = () => {
    const selected = embla.selectedScrollSnap();
    for (const dot of allDots) dot.removeAttribute("aria-current");
    const dots = activeDots();
    if (dots[selected]) dots[selected].setAttribute("aria-current", "true");
  };

  const syncAccessibility = () => {
    if (!isActive()) {
      for (const attribute of PICKED_A11Y_ATTRIBUTES)
        root.removeAttribute(attribute);
      return;
    }

    root.setAttribute("tabindex", "0");
    root.setAttribute("role", "group");
    root.setAttribute("aria-roledescription", "carousel");

    const { carouselLabel } = root.dataset;
    if (carouselLabel) root.setAttribute("aria-label", carouselLabel);
  };

  for (const rail of Object.values(rails)) {
    if (!rail) continue;
    [...rail.querySelectorAll("[data-picked-dot]")].forEach((dot, index) => {
      dot.disabled = false;
      dot.addEventListener("click", () => embla.scrollTo(index));
    });
  }

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

  embla.on("select", syncDots);
  embla.on("reInit", syncDots);
  embla.on("reInit", syncAccessibility);
  embla.on("reInit", warnOnSnapMismatch);
  syncDots();
  syncAccessibility();
  warnOnSnapMismatch();

  root.dataset.embla = "ready";
};

const initAllPickedCarousels = (scope) => {
  for (const root of scope.querySelectorAll("[data-picked-carousel]"))
    initPickedCarousel(root);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () =>
    initAllPickedCarousels(document),
  );
} else {
  initAllPickedCarousels(document);
}

document.addEventListener("shopify:section:load", (event) =>
  initAllPickedCarousels(event.target),
);
