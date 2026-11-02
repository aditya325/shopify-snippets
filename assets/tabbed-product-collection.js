const TAB_PROD_KEYS = {
  ArrowRight: 1,
  ArrowLeft: -1,
};

const activateTab = (tabs, panels, index, moveFocus) => {
  tabs.forEach((tab, position) => {
    const isActive = position === index;
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    tab.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel, position) => {
    panel.hidden = position !== index;
  });

  if (moveFocus) tabs[index].focus();
};

const initTabbedProducts = (root) => {
  const tabs = [...root.querySelectorAll('[data-tab]')];
  const panels = [...root.querySelectorAll('[data-tab-panel]')];
  if (tabs.length < 2 || tabs.length !== panels.length) return;

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tabs, panels, index, false));
  });

  root.querySelector('[role="tablist"]')?.addEventListener('keydown', (event) => {
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;

    let next = null;
    if (event.key in TAB_PROD_KEYS) {
      next = (current + TAB_PROD_KEYS[event.key] + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = tabs.length - 1;
    }

    if (next === null) return;
    event.preventDefault();
    activateTab(tabs, panels, next, true);
  });
};

const initAllTabbedProducts = (scope) => {
  for (const root of scope.querySelectorAll('.tabbed-product-collection')) initTabbedProducts(root);
};

document.addEventListener('DOMContentLoaded', () => initAllTabbedProducts(document));

document.addEventListener('shopify:section:load', (event) => initAllTabbedProducts(event.target));
