const BOUGHT_DESKTOP_MEDIA = '(min-width: 1024px)';
const BOUGHT_A11Y_ATTRIBUTES = ['tabindex', 'role', 'aria-roledescription', 'aria-label'];
const BOUGHT_OPTIONS = {
  align: 'start',
  loop: false,
  containScroll: 'trimSnaps',
  slidesToScroll: 2,
};
const BOUGHT_DESKTOP_SCROLL = 4;

const initBoughtCarousel = (root) => {
  if (!window.EmblaCarousel) return;
  if (root.dataset.embla === 'ready') return;

  const desktopStatic = root.dataset.desktopStatic !== 'false';
  const desktopOverride = desktopStatic
    ? { active: false }
    : { slidesToScroll: BOUGHT_DESKTOP_SCROLL };
  const options = { ...BOUGHT_OPTIONS, breakpoints: { [BOUGHT_DESKTOP_MEDIA]: desktopOverride } };

  const embla = window.EmblaCarousel(root, options);

  const rails = {
    mobile: root.parentElement.querySelector('[data-bought-dots="mobile"]'),
    desktop: root.parentElement.querySelector('[data-bought-dots="desktop"]'),
  };
  const allDots = [...root.parentElement.querySelectorAll('[data-bought-dot]')];

  const isDesktop = () => window.matchMedia(BOUGHT_DESKTOP_MEDIA).matches;
  const isActive = () => !(desktopStatic && isDesktop());

  const activeDots = () => {
    const rail = isDesktop() ? rails.desktop : rails.mobile;
    return rail ? [...rail.querySelectorAll('[data-bought-dot]')] : [];
  };

  const warnOnSnapMismatch = () => {
    const dots = activeDots();
    if (!isActive() || dots.length === 0) return;

    const snapCount = embla.scrollSnapList().length;
    if (dots.length !== snapCount) {
      console.warn(`[bought-together] ${dots.length} dots against ${snapCount} snaps`);
    }
  };

  const syncDots = () => {
    const selected = embla.selectedScrollSnap();
    for (const dot of allDots) dot.removeAttribute('aria-current');
    const dots = activeDots();
    if (dots[selected]) dots[selected].setAttribute('aria-current', 'true');
  };

  const syncAccessibility = () => {
    if (!isActive()) {
      for (const attribute of BOUGHT_A11Y_ATTRIBUTES) root.removeAttribute(attribute);
      return;
    }

    root.setAttribute('tabindex', '0');
    root.setAttribute('role', 'group');
    root.setAttribute('aria-roledescription', 'carousel');

    const { carouselLabel } = root.dataset;
    if (carouselLabel) root.setAttribute('aria-label', carouselLabel);
  };

  for (const rail of Object.values(rails)) {
    if (!rail) continue;
    [...rail.querySelectorAll('[data-bought-dot]')].forEach((dot, index) => {
      dot.disabled = false;
      dot.addEventListener('click', () => embla.scrollTo(index));
    });
  }

  root.addEventListener('keydown', (event) => {
    if (!isActive()) return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      embla.scrollNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      embla.scrollPrev();
    }
  });

  embla.on('select', syncDots);
  embla.on('reInit', syncDots);
  embla.on('reInit', syncAccessibility);
  embla.on('reInit', warnOnSnapMismatch);
  syncDots();
  syncAccessibility();
  warnOnSnapMismatch();

  root.dataset.embla = 'ready';
};

const initAllBoughtCarousels = (scope) => {
  for (const root of scope.querySelectorAll('[data-bought-carousel]')) initBoughtCarousel(root);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initAllBoughtCarousels(document));
} else {
  initAllBoughtCarousels(document);
}

document.addEventListener('shopify:section:load', (event) => initAllBoughtCarousels(event.target));
