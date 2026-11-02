const DRAWER_TRANSITION = 300;
const DRAWER_DESKTOP_QUERY = '(min-width: 1024px)';
const DRAWER_FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

let drawerIsOpen = false;
let drawerLevel = 'root';
let drawerPrevFocus = null;
let drawerTrapHandler = null;

const drawerRoot = () => document.querySelector('[data-drawer]');
const drawerPanel = () => document.querySelector('[data-drawer-panel]');
const drawerTrigger = () => document.getElementById('mobile-menu-trigger');
const drawerBar = () => document.getElementById('mobile-header');
const drawerLevelEl = (handle) => document.querySelector(`[data-drawer-level="${handle}"]`);

const drawerReleaseTrap = () => {
  const panel = drawerPanel();

  if (drawerTrapHandler && panel) panel.removeEventListener('keydown', drawerTrapHandler);
  drawerTrapHandler = null;
};

const drawerTrapFocus = () => {
  const panel = drawerPanel();

  if (!panel) return;

  drawerReleaseTrap();

  drawerTrapHandler = (event) => {
    if (event.key !== 'Tab') return;

    const activeLevel = panel.querySelector(
      drawerLevel === 'root' ? '[data-drawer-level="root"]' : `[data-drawer-level="${drawerLevel}"]`
    );
    const focusable = [...panel.querySelectorAll(DRAWER_FOCUSABLE)].filter(
      (element) =>
        element.offsetParent !== null &&
        (!element.closest('[data-drawer-level]') || element.closest('[data-drawer-level]') === activeLevel)
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  panel.addEventListener('keydown', drawerTrapHandler);
};

const drawerShowLevel = (handle) => {
  const target = drawerLevelEl(handle);
  const root = drawerRoot();

  if (!target || !root) return;

  target.hidden = false;
  drawerLevel = handle;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.classList.add('drawer__level--active');
      root.classList.add('drawer--pushed');
      target.querySelector('[data-drawer-back]')?.focus({ preventScroll: true });
    });
  });
};

const drawerShowRoot = () => {
  const root = drawerRoot();
  const current = drawerLevel === 'root' ? null : drawerLevelEl(drawerLevel);
  const previous = drawerLevel;

  if (!root) return;

  root.classList.remove('drawer--pushed');
  current?.classList.remove('drawer__level--active');
  drawerLevel = 'root';

  setTimeout(() => {
    if (current && !current.classList.contains('drawer__level--active')) current.hidden = true;
  }, DRAWER_TRANSITION);

  document.querySelector(`[data-drawer-push="${previous}"]`)?.focus({ preventScroll: true });
};

const drawerClose = () => {
  const root = drawerRoot();

  if (!root || !drawerIsOpen) return;

  drawerIsOpen = false;
  root.classList.remove('drawer--open');
  root.setAttribute('aria-hidden', 'true');
  drawerTrigger()?.setAttribute('aria-expanded', 'false');
  drawerBar()?.classList.remove('menu-open');
  drawerReleaseTrap();

  setTimeout(() => {
    if (drawerIsOpen) return;

    root.hidden = true;
    document.body.classList.remove('overflow-hidden');

    const current = drawerLevel === 'root' ? null : drawerLevelEl(drawerLevel);

    root.classList.remove('drawer--pushed');
    current?.classList.remove('drawer__level--active');
    if (current) current.hidden = true;
    drawerLevel = 'root';
  }, DRAWER_TRANSITION);

  drawerPrevFocus?.focus({ preventScroll: true });
  drawerPrevFocus = null;
};

const drawerOpen = () => {
  const root = drawerRoot();

  if (!root || drawerIsOpen) return;

  drawerIsOpen = true;
  drawerPrevFocus = drawerTrigger();
  root.hidden = false;
  root.setAttribute('aria-hidden', 'false');
  drawerTrigger()?.setAttribute('aria-expanded', 'true');
  drawerBar()?.classList.add('menu-open');
  document.body.classList.add('overflow-hidden');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.add('drawer--open');
      drawerTrapFocus();
    });
  });
};

const initMobileDrawer = (root = document) => {
  const drawer = root.querySelector ? root.querySelector('[data-drawer]') : null;
  const trigger = document.getElementById('mobile-menu-trigger');

  if (!drawer || !trigger) return;
  if (drawer.dataset.drawerBound === 'true') return;

  drawer.dataset.drawerBound = 'true';
  drawerIsOpen = false;
  drawerLevel = 'root';
  document.body.classList.remove('overflow-hidden');
  drawerReleaseTrap();

  trigger.addEventListener('click', () => {
    if (drawerIsOpen) {
      drawerClose();
    } else {
      drawerOpen();
    }
  });

  drawer.addEventListener('click', (event) => {
    const { target } = event;

    if (target.closest('[data-drawer-close]')) {
      drawerClose();
      return;
    }

    if (target.closest('[data-drawer-back]')) {
      drawerShowRoot();
      return;
    }

    const push = target.closest('[data-drawer-push]');

    if (push) drawerShowLevel(push.dataset.drawerPush);
  });
};

document.addEventListener('DOMContentLoaded', () => initMobileDrawer());

document.addEventListener('shopify:section:load', (event) => initMobileDrawer(event.target));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && drawerIsOpen) drawerClose();
});

window.matchMedia(DRAWER_DESKTOP_QUERY).addEventListener('change', (event) => {
  if (event.matches && drawerIsOpen) drawerClose();
});

document.addEventListener('DOMContentLoaded', () => {
  const mainHeader = document.getElementById('main-header');

  if (!mainHeader) return;

  let scrollTicking = false;

  const syncScrolledState = () => {
    mainHeader.dataset.headerScrolled = window.scrollY > 0 ? 'true' : 'false';
    scrollTicking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(syncScrolledState);
    },
    { passive: true }
  );

  syncScrolledState();
});

const MEGA_CLOSE_DELAY = 150;
const MEGA_DESKTOP_QUERY = '(min-width: 1024px)';
const MEGA_REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const MEGA_PREV_KEYS = ['ArrowLeft', 'ArrowUp'];
const MEGA_NEXT_KEYS = ['ArrowRight', 'ArrowDown'];
const megaReleaseHandlers = new WeakMap();

let megaOpenHandle = null;
let megaCloseTimer = null;

const megaIsDesktop = () => window.matchMedia(MEGA_DESKTOP_QUERY).matches;
const megaPrefersReduced = () => window.matchMedia(MEGA_REDUCED_QUERY).matches;
const megaPanelFor = (handle) => document.querySelector(`[data-mega-panel="${handle}"]`);
const megaItemFor = (handle) => document.querySelector(`[data-nav-item="${handle}"]`);
const megaTriggerFor = (handle) => document.querySelector(`[data-mega-trigger="${handle}"]`);
const megaSetHeight = (panel, value) => panel.style.setProperty('--mega-menu-height', value);
const megaSetBackdrop = (isOpen) => document.querySelector('[data-mega-backdrop]')?.setAttribute('data-open', isOpen);
const megaRailRows = (panel) => [...panel.querySelectorAll('[data-rail-row]')];

const megaCancelClose = () => {
  if (megaCloseTimer === null) return;
  clearTimeout(megaCloseTimer);
  megaCloseTimer = null;
};

const megaReleaseHeight = (panel) => {
  const previous = megaReleaseHandlers.get(panel);

  if (previous) panel.removeEventListener('transitionend', previous);

  const onEnd = (event) => {
    if (event.propertyName !== 'height') return;
    panel.removeEventListener('transitionend', onEnd);
    megaReleaseHandlers.delete(panel);
    if (panel.classList.contains('mega-menu--open')) megaSetHeight(panel, 'auto');
  };

  panel.addEventListener('transitionend', onEnd);
  megaReleaseHandlers.set(panel, onEnd);
};

const megaClosePanel = (handle) => {
  const panel = megaPanelFor(handle);

  if (!panel) return;

  const heldFocus = panel.contains(document.activeElement);

  megaSetHeight(panel, `${panel.getBoundingClientRect().height}px`);
  void panel.offsetHeight;

  panel.classList.remove('mega-menu--open');
  panel.inert = true;
  megaItemFor(handle)?.classList.remove('nav-trigger--open');
  megaTriggerFor(handle)?.setAttribute('aria-expanded', 'false');

  if (megaOpenHandle === handle) megaOpenHandle = null;
  if (megaOpenHandle === null) megaSetBackdrop(false);
  if (heldFocus) megaTriggerFor(handle)?.focus();
};

const megaOpenPanel = (handle) => {
  if (!megaIsDesktop()) return;

  const panel = megaPanelFor(handle);

  if (!panel || megaOpenHandle === handle) return;
  if (megaOpenHandle !== null) megaClosePanel(megaOpenHandle);

  megaCancelClose();
  panel.inert = false;

  const target = panel.scrollHeight;

  megaSetHeight(panel, `${target}px`);
  panel.classList.add('mega-menu--open');
  megaItemFor(handle)?.classList.add('nav-trigger--open');
  megaTriggerFor(handle)?.setAttribute('aria-expanded', 'true');
  megaOpenHandle = handle;
  megaSetBackdrop(true);

  if (megaPrefersReduced()) {
    megaSetHeight(panel, 'auto');
  } else {
    megaReleaseHeight(panel);
  }
};

const megaScheduleClose = (handle) => {
  if (megaPanelFor(handle)?.contains(document.activeElement)) return;

  megaCancelClose();
  megaCloseTimer = setTimeout(() => {
    megaCloseTimer = null;
    megaClosePanel(handle);
  }, MEGA_CLOSE_DELAY);
};

const megaSelectRow = (panel, row) => {
  if (row.getAttribute('aria-selected') === 'true') return;
  if (!document.getElementById(row.getAttribute('aria-controls'))) return;

  const current = panel.getBoundingClientRect().height;

  for (const sibling of megaRailRows(panel)) {
    const selected = sibling === row;
    sibling.setAttribute('aria-selected', selected ? 'true' : 'false');
    sibling.setAttribute('tabindex', selected ? '0' : '-1');
    document.getElementById(sibling.getAttribute('aria-controls'))?.toggleAttribute('hidden', !selected);
  }

  if (!panel.classList.contains('mega-menu--open')) return;

  megaSetHeight(panel, 'auto');

  const next = panel.getBoundingClientRect().height;

  if (next === current || megaPrefersReduced()) return;

  megaSetHeight(panel, `${current}px`);
  void panel.offsetHeight;
  megaSetHeight(panel, `${next}px`);
  megaReleaseHeight(panel);
};

const megaMoveRailFocus = (panel, from, offset) => {
  const rows = megaRailRows(panel);
  const index = rows.indexOf(from);

  if (index === -1) return;

  rows[(index + offset + rows.length) % rows.length].focus();
};

const initMegaMenu = (root = document) => {
  const triggers = [...root.querySelectorAll('[data-mega-trigger]')];

  if (triggers.length === 0) return;

  megaCancelClose();
  megaOpenHandle = null;

  for (const trigger of triggers) {
    if (trigger.dataset.megaBound === 'true') continue;
    trigger.dataset.megaBound = 'true';

    const { megaTrigger: handle } = trigger.dataset;
    const panel = megaPanelFor(handle);
    const item = megaItemFor(handle);

    if (!panel || !item) continue;

    trigger.addEventListener('click', (event) => {
      if (megaOpenHandle === handle) {
        megaClosePanel(handle);
        return;
      }

      megaOpenPanel(handle);

      if (event.detail === 0) {
        panel.querySelector('[data-rail-row][aria-selected="true"]')?.focus();
      }
    });

    item.addEventListener('mouseenter', () => {
      megaCancelClose();
      megaOpenPanel(handle);
    });

    item.addEventListener('mouseleave', () => megaScheduleClose(handle));
    panel.addEventListener('mouseenter', megaCancelClose);
    panel.addEventListener('mouseleave', () => megaScheduleClose(handle));

    for (const row of megaRailRows(panel)) {
      row.addEventListener('mouseenter', () => megaSelectRow(panel, row));
      row.addEventListener('focus', () => megaSelectRow(panel, row));
      row.addEventListener('keydown', (event) => {
        const { key } = event;

        if (MEGA_NEXT_KEYS.includes(key)) {
          megaMoveRailFocus(panel, row, 1);
        } else if (MEGA_PREV_KEYS.includes(key)) {
          megaMoveRailFocus(panel, row, -1);
        } else if (key === 'Home') {
          megaRailRows(panel)[0]?.focus();
        } else if (key === 'End') {
          megaRailRows(panel).at(-1)?.focus();
        } else {
          return;
        }

        event.preventDefault();
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => initMegaMenu());

document.addEventListener('shopify:section:load', (event) => initMegaMenu(event.target));

document.addEventListener('shopify:block:select', (event) => {
  const panel = event.target.closest('[data-mega-panel]');

  if (!panel) return;

  megaOpenPanel(panel.dataset.megaPanel);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || megaOpenHandle === null) return;

  const handle = megaOpenHandle;

  megaClosePanel(handle);
  megaTriggerFor(handle)?.focus();
});

window.matchMedia(MEGA_DESKTOP_QUERY).addEventListener('change', (event) => {
  if (!event.matches && megaOpenHandle !== null) megaClosePanel(megaOpenHandle);
});

let headerFooterObserver = null;
let headerFooterInView = false;

const syncHeaderHidden = () => {
  const header = document.getElementById('main-header');

  if (!header) return;

  const hide = headerFooterInView && window.scrollY > 0 && !drawerIsOpen;

  header.dataset.headerHidden = hide ? 'true' : 'false';

  if (hide && megaOpenHandle !== null) megaClosePanel(megaOpenHandle);
};

const initHeaderFooterHide = () => {
  const footer = document.querySelector('footer.footer');

  if (!footer || !document.getElementById('main-header')) return;

  headerFooterObserver?.disconnect();
  headerFooterObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) headerFooterInView = entry.isIntersecting;
    syncHeaderHidden();
  });

  headerFooterObserver.observe(footer);
};

document.addEventListener('DOMContentLoaded', initHeaderFooterHide);

document.addEventListener('shopify:section:load', initHeaderFooterHide);
