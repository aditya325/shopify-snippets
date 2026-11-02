const DETAILS_ARROW_KEYS = {
  ArrowRight: 1,
  ArrowLeft: -1,
};

const DETAILS_REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const DETAILS_ANIMATING_CLASS = 'product-details__viewport--animating';
const DETAILS_ENTER_CLASS = 'product-details__panel--enter';
const DETAILS_TRANSITION_MS = 300;
const DETAILS_SETTLE_TIMERS = new WeakMap();

const settleDetailsHeight = (viewport) => {
  clearTimeout(DETAILS_SETTLE_TIMERS.get(viewport));
  DETAILS_SETTLE_TIMERS.delete(viewport);
  viewport.classList.remove(DETAILS_ANIMATING_CLASS);
  viewport.style.removeProperty('--details-panel-h');
};

const setDetailsTabState = (tabs, panels, index, moveFocus) => {
  tabs.forEach((tab, position) => {
    const isActive = position === index;
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    tab.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel, position) => {
    panel.hidden = position !== index;
  });

  if (moveFocus) tabs[index].focus({ preventScroll: true });
};

const playDetailsPanelEnter = (panel) => {
  // Removing and forcing a reflow restarts the animation when the same panel is reactivated
  panel.classList.remove(DETAILS_ENTER_CLASS);
  void panel.offsetWidth;
  panel.classList.add(DETAILS_ENTER_CLASS);
  panel.addEventListener('animationend', () => panel.classList.remove(DETAILS_ENTER_CLASS), { once: true });
};

const centreDetailsTab = (strip, tab) => {
  const stripBox = strip.getBoundingClientRect();
  const tabBox = tab.getBoundingClientRect();

  const tabCentre = strip.scrollLeft + (tabBox.left - stripBox.left) + tabBox.width / 2;
  const maxScroll = strip.scrollWidth - strip.clientWidth;
  const target = Math.max(0, Math.min(tabCentre - strip.clientWidth / 2, maxScroll));

  if (Math.abs(target - strip.scrollLeft) < 1) return;

  const behavior = window.matchMedia(DETAILS_REDUCED_MOTION).matches ? 'instant' : 'smooth';
  strip.scrollTo({ left: target, behavior });
};

const animateDetailsHeight = (viewport, fromHeight) => {
  const toHeight = viewport.offsetHeight;
  if (fromHeight === toHeight) return;

  const onEnd = (event) => {
    if (event.target !== viewport || event.propertyName !== 'height') return;
    settleDetailsHeight(viewport);
  };

  viewport.style.setProperty('--details-panel-h', `${fromHeight}px`);
  viewport.classList.add(DETAILS_ANIMATING_CLASS);

  void viewport.offsetHeight;

  viewport.addEventListener('transitionend', onEnd, { once: true });
  viewport.style.setProperty('--details-panel-h', `${toHeight}px`);

  DETAILS_SETTLE_TIMERS.set(
    viewport,
    setTimeout(() => settleDetailsHeight(viewport), DETAILS_TRANSITION_MS + 50)
  );
};

const activateDetailsTab = (root, tabs, panels, index, moveFocus) => {
  const viewport = root.querySelector('[data-details-viewport]');
  const strip = root.querySelector('[data-details-tabs]');

  if (viewport) {
    settleDetailsHeight(viewport);
  }

  const animate = viewport && !window.matchMedia(DETAILS_REDUCED_MOTION).matches;
  const fromHeight = animate ? viewport.offsetHeight : 0;

  setDetailsTabState(tabs, panels, index, moveFocus);

  if (animate) {
    playDetailsPanelEnter(panels[index]);
    animateDetailsHeight(viewport, fromHeight);
  }
  if (strip) centreDetailsTab(strip, tabs[index]);
};

const initProductDetails = (root) => {
  if (root.dataset.detailsInitialized === 'true') return;

  const tabs = [...root.querySelectorAll('[data-details-tab]')];
  const panels = [...root.querySelectorAll('[data-details-panel]')];
  if (tabs.length === 0 || tabs.length !== panels.length) return;

  root.dataset.detailsInitialized = 'true';

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateDetailsTab(root, tabs, panels, index, false));
  });

  root.querySelector('[data-details-tabs]')?.addEventListener('keydown', (event) => {
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;

    let next = null;
    if (event.key in DETAILS_ARROW_KEYS) {
      next = (current + DETAILS_ARROW_KEYS[event.key] + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = tabs.length - 1;
    }

    if (next === null) return;
    event.preventDefault();
    activateDetailsTab(root, tabs, panels, next, true);
  });
};

const initAllProductDetails = (scope) => {
  for (const root of scope.querySelectorAll('.product-details')) initProductDetails(root);
};

document.addEventListener('DOMContentLoaded', () => initAllProductDetails(document));

document.addEventListener('shopify:section:load', (event) => initAllProductDetails(event.target));
