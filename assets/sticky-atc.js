const STICKY_ATC_BAR = '[data-sticky-atc]';
const STICKY_ATC_PRIMARY = '[data-primary-atc]';
const STICKY_ATC_FOOTER = 'footer.footer';
const STICKY_ATC_PRICE = '[data-sticky-price]';
const STICKY_ATC_COMPARE = '[data-sticky-compare]';

let stickyAtcPrimaryObserver = null;
let stickyAtcFooterObserver = null;
let stickyAtcUnsubscribe = null;
let stickyAtcPrimaryInView = true;
let stickyAtcFooterInView = false;

const syncStickyAtc = (bar) => {
  const visible = !stickyAtcPrimaryInView && !stickyAtcFooterInView;

  bar.dataset.stickyVisible = visible ? 'true' : 'false';
  bar.setAttribute('aria-hidden', visible ? 'false' : 'true');
};

const updateStickyAtcPrice = (bar, variant) => {
  const priceEl = bar.querySelector(STICKY_ATC_PRICE);
  const compareEl = bar.querySelector(STICKY_ATC_COMPARE);

  if (priceEl) priceEl.textContent = variant.price_formatted;
  if (!compareEl) return;

  const hasComparePrice = variant.compare_at_price > variant.price;

  if (hasComparePrice) compareEl.textContent = variant.compare_at_price_formatted;
  compareEl.hidden = !hasComparePrice;
};

const initStickyAtc = () => {
  stickyAtcPrimaryObserver?.disconnect();
  stickyAtcFooterObserver?.disconnect();
  stickyAtcUnsubscribe?.();
  stickyAtcPrimaryObserver = null;
  stickyAtcFooterObserver = null;
  stickyAtcUnsubscribe = null;
  stickyAtcPrimaryInView = true;
  stickyAtcFooterInView = false;

  const bar = document.querySelector(STICKY_ATC_BAR);
  if (!bar || bar.dataset.designMode === 'true') return;

  if (typeof subscribe !== 'undefined' && typeof PUB_SUB_EVENTS !== 'undefined') {
    stickyAtcUnsubscribe = subscribe(PUB_SUB_EVENTS.variantChange, (data) => {
      if (data.productId !== bar.dataset.productId || !data.variant) return;
      updateStickyAtcPrice(bar, data.variant);
    });
  }

  const primaryButton = document.querySelector(STICKY_ATC_PRIMARY);
  if (!primaryButton) return;

  stickyAtcPrimaryObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) stickyAtcPrimaryInView = entry.isIntersecting;
    syncStickyAtc(bar);
  });
  stickyAtcPrimaryObserver.observe(primaryButton);

  const footer = document.querySelector(STICKY_ATC_FOOTER);
  if (!footer) return;

  stickyAtcFooterObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) stickyAtcFooterInView = entry.isIntersecting;
    syncStickyAtc(bar);
  });
  stickyAtcFooterObserver.observe(footer);
};

document.addEventListener('DOMContentLoaded', initStickyAtc);
document.addEventListener('shopify:section:load', initStickyAtc);
