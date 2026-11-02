const FOUNDER_OPTIONS = {
  align: 'start',
  loop: true,
  containScroll: false,
};

const FOUNDER_BODY_VAR = '--founder-body-max';

const expandFounderBody = (body) => {
  body.removeAttribute('data-clamped');
  body.style.setProperty(FOUNDER_BODY_VAR, `${body.scrollHeight}px`);
};

const collapseFounderBody = (body) => {
  const restoreClamp = (event) => {
    if (event.propertyName !== 'max-height') return;
    body.setAttribute('data-clamped', 'true');
    body.style.removeProperty(FOUNDER_BODY_VAR);
  };

  body.addEventListener('transitionend', restoreClamp, { once: true });
  body.style.setProperty(FOUNDER_BODY_VAR, '');
};

const setFounderExpanded = (slide, trigger, isExpanded) => {
  const body = slide.querySelector('[data-founder-body]');

  slide.dataset.expanded = isExpanded ? 'true' : 'false';
  trigger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  trigger.textContent = isExpanded ? trigger.dataset.labelLess : trigger.dataset.labelMore;

  if (!body) return;
  if (isExpanded) expandFounderBody(body);
  else collapseFounderBody(body);
};

const initFounderReadMore = (root) => {
  for (const trigger of root.querySelectorAll('[data-founder-toggle]')) {
    if (trigger.dataset.founderBound === 'true') continue;

    const slide = trigger.closest('[data-founder-slide]');
    if (!slide) continue;

    trigger.dataset.founderBound = 'true';
    trigger.addEventListener('click', () => {
      setFounderExpanded(slide, trigger, trigger.getAttribute('aria-expanded') !== 'true');
    });
  }
};

const initFounderCarousel = (root) => {
  initFounderReadMore(root);

  const viewport = root.querySelector('[data-founder-viewport]');
  if (!viewport || !window.EmblaCarousel) return;
  if (viewport.dataset.embla === 'ready') return;

  const controls = root.querySelector('[data-founder-controls]');

  if (root.querySelectorAll('[data-founder-slide]').length < 2) {
    if (controls) controls.hidden = true;
    return;
  }

  const embla = window.EmblaCarousel(viewport, FOUNDER_OPTIONS);
  viewport.dataset.embla = 'ready';

  root.querySelector('[data-founder-prev]')?.addEventListener('click', () => embla.scrollPrev());
  root.querySelector('[data-founder-next]')?.addEventListener('click', () => embla.scrollNext());
};

const initAllFounderCarousels = (scope) => {
  for (const root of scope.querySelectorAll('[data-founder-root]')) initFounderCarousel(root);
};

document.addEventListener('DOMContentLoaded', () => initAllFounderCarousels(document));
document.addEventListener('shopify:section:load', (event) => initAllFounderCarousels(event.target));
