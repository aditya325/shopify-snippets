document.addEventListener('DOMContentLoaded', () => {
  const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const TRANSITION = 250;
  const RENDER_MARGIN = '300px';
  const MAX_PIXEL_RATIO = 2;
  const RESIZE_DEBOUNCE = 200;

  const docs = new WeakMap();
  const visiblePages = new WeakMap();
  const renderTasks = new WeakMap();

  let openRoot = null;
  let previousActiveElement = null;
  let bodyObserver = null;
  let closeTimer = null;
  let resizeTimer = null;

  const panelOf = (root) => root.querySelector('[data-lab-report-panel]');
  const closeOf = (root) => root.querySelector('[data-lab-report-close]');
  const railOf = (root) => root.querySelector('[data-lab-report-rail]');
  const statusOf = (root) => root.querySelector('[data-lab-report-status]');
  const trackOf = (root) => root.querySelector('[data-lab-report-track]');
  const thumbOf = (root) => root.querySelector('[data-lab-report-thumb]');

  const searchModalIsOpen = () => document.getElementById('search-modal')?.getAttribute('aria-hidden') === 'false';

  const cartDrawerIsOpen = () => document.querySelector('cart-drawer[aria-hidden="false"]') !== null;

  const viewportFor = (page, targetHeight) => {
    const unscaled = page.getViewport({ scale: 1 });
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    return page.getViewport({ scale: (targetHeight * ratio) / unscaled.height });
  };

  const renderPage = (root, wrapper) => {
    const entry = docs.get(root);
    const rail = railOf(root);
    if (!entry?.pdf || !rail) return Promise.resolve(false);

    const targetHeight = rail.clientHeight;
    if (targetHeight === 0) return Promise.resolve(false);

    const canvas = wrapper.querySelector('[data-lab-report-canvas]');
    if (canvas.dataset.renderedAt === String(targetHeight)) return Promise.resolve(true);

    // pdf.js forbids two render() calls on one canvas; overlapping them corrupts the glyphs
    const active = renderTasks.get(wrapper);
    if (active) {
      if (active.height === targetHeight) return active.promise;
      active.task?.cancel();
    }

    const pageNumber = Number(wrapper.dataset.labReportPage);
    const record = { height: targetHeight, task: null };

    record.promise = (async () => {
      try {
        const page = await entry.pdf.getPage(pageNumber);
        const viewport = viewportFor(page, targetHeight);

        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);

        record.task = page.render({ canvasContext: canvas.getContext('2d'), viewport });
        await record.task.promise;
        canvas.dataset.renderedAt = String(targetHeight);
        return true;
      } catch (error) {
        if (error?.name !== 'RenderingCancelledException') {
          console.error(`[lab-report] page ${pageNumber} failed to render`, error);
        }
        return false;
      } finally {
        if (renderTasks.get(wrapper) === record) renderTasks.delete(wrapper);
      }
    })();

    renderTasks.set(wrapper, record);
    return record.promise;
  };

  const syncThumb = (root) => {
    const rail = railOf(root);
    const track = trackOf(root);
    const thumb = thumbOf(root);
    if (!rail || !track || !thumb) return;

    const overflow = rail.scrollWidth - rail.clientWidth;
    track.hidden = overflow <= 1;
    if (track.hidden) return;

    // The track is lg:hidden, so on desktop clientWidth is 0 and the maths below would be noise
    const trackWidth = track.clientWidth;
    if (trackWidth === 0) return;

    const width = Math.max(24, (rail.clientWidth / rail.scrollWidth) * trackWidth);
    const offset = (rail.scrollLeft / overflow) * (trackWidth - width);

    thumb.style.setProperty('--lab-thumb-w', `${Math.round(width)}px`);
    thumb.style.setProperty('--lab-thumb-x', `${Math.round(offset)}px`);
  };

  const buildPages = async (root, pdf) => {
    const rail = railOf(root);
    const template = root.querySelector('[data-lab-report-page-template]');
    if (!rail || !template) return false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const seen = visiblePages.get(root);
          if (entry.isIntersecting) {
            seen?.add(entry.target);
            renderPage(root, entry.target);
          } else {
            seen?.delete(entry.target);
          }
        }
      },
      { root: rail, rootMargin: RENDER_MARGIN }
    );

    visiblePages.set(root, new Set());

    const targetHeight = rail.clientHeight;
    let placeholder = null;
    if (targetHeight > 0) {
      const firstPage = await pdf.getPage(1);
      const viewport = viewportFor(firstPage, targetHeight);
      placeholder = { width: Math.round(viewport.width), height: Math.round(viewport.height) };
    }

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const wrapper = template.content.firstElementChild.cloneNode(true);
      wrapper.dataset.labReportPage = String(pageNumber);
      if (placeholder) {
        const canvas = wrapper.querySelector('[data-lab-report-canvas]');
        canvas.width = placeholder.width;
        canvas.height = placeholder.height;
      }
      rail.append(wrapper);
      observer.observe(wrapper);
    }

    docs.get(root).observer = observer;
    syncThumb(root);

    // IntersectionObserver never fires while the tab is hidden, so page 1 cannot depend on it
    const first = rail.firstElementChild;
    if (first) {
      visiblePages.get(root)?.add(first);
      const painted = await renderPage(root, first);
      syncThumb(root);
      return painted;
    }

    return false;
  };

  const loadReport = async (root) => {
    if (docs.has(root)) return;

    const status = statusOf(root);
    docs.set(root, {});

    try {
      const pdfjs = await import(root.dataset.pdfjsUrl);
      pdfjs.GlobalWorkerOptions.workerSrc = root.dataset.pdfjsWorker;

      const pdf = await pdfjs.getDocument(root.dataset.labReportSrc).promise;
      docs.get(root).pdf = pdf;

      const painted = await buildPages(root, pdf);
      if (!status) return;

      // Hiding the status on load rather than on paint would leave a silent blank rail
      if (painted) status.hidden = true;
      else status.textContent = status.dataset.errorText;
    } catch (error) {
      console.error('[lab-report] could not render the report', error);
      if (status) status.textContent = status.dataset.errorText;
    }
  };

  const observeScrollLock = () => {
    bodyObserver?.disconnect();
    bodyObserver = new MutationObserver(() => {
      if (openRoot && !document.body.classList.contains('overflow-hidden')) {
        document.body.classList.add('overflow-hidden');
      }
    });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  };

  const releaseScrollLock = () => {
    bodyObserver?.disconnect();
    bodyObserver = null;
    document.body.classList.remove('overflow-hidden');
  };

  const openModal = (trigger) => {
    const root = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!root || openRoot) return;

    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    openRoot = root;
    previousActiveElement = trigger;
    root.classList.remove('hidden');
    root.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden');
    observeScrollLock();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove('opacity-0');
        panelOf(root)?.classList.remove('translate-y-4', 'opacity-0');
      });
    });

    closeOf(root)?.focus({ preventScroll: true });
    loadReport(root);
  };

  const closeModal = () => {
    const root = openRoot;
    if (!root) return;

    openRoot = null;
    root.classList.add('opacity-0');
    panelOf(root)?.classList.add('translate-y-4', 'opacity-0');
    releaseScrollLock();

    if (closeTimer !== null) clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      root.classList.add('hidden');
      root.setAttribute('aria-hidden', 'true');
      closeTimer = null;
    }, TRANSITION);

    previousActiveElement?.setAttribute('aria-expanded', 'false');
    previousActiveElement?.focus({ preventScroll: true });
    previousActiveElement = null;
  };

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const trigger = event.target.closest('[data-lab-report-open]');
    if (trigger) {
      openModal(trigger);
      return;
    }

    if (event.target.closest('[data-lab-report-close]')) {
      closeModal();
      return;
    }

    if (!openRoot || !openRoot.contains(event.target)) return;
    if (!event.target.closest('[data-lab-report-panel]')) closeModal();
  });

  document.addEventListener(
    'scroll',
    (event) => {
      if (!openRoot || !(event.target instanceof Element)) return;
      if (event.target.matches('[data-lab-report-rail]')) syncThumb(openRoot);
    },
    true
  );

  window.addEventListener('resize', () => {
    if (!openRoot) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!openRoot) return;
      syncThumb(openRoot);
      for (const wrapper of visiblePages.get(openRoot) ?? []) renderPage(openRoot, wrapper);
    }, RESIZE_DEBOUNCE);
  });

  document.addEventListener('keydown', (event) => {
    const root = openRoot;
    if (!root) return;

    if (event.key === 'Escape') {
      // Either overlay can be opened while this dialog is open, and each owns Escape first
      if (searchModalIsOpen() || cartDrawerIsOpen()) return;
      closeModal();
      return;
    }

    if (event.key !== 'Tab' || !root.contains(event.target)) return;

    const panel = panelOf(root);
    if (!panel) return;

    const focusable = [...panel.querySelectorAll(FOCUSABLE)].filter((element) => element.offsetParent !== null);
    if (focusable.length === 0) return;

    if (focusable.length === 1) {
      event.preventDefault();
      focusable[0].focus();
      return;
    }

    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('shopify:section:load', (event) => {
    if (!event.target.querySelector('[data-lab-report-modal]')) return;

    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    clearTimeout(resizeTimer);
    openRoot = null;
    previousActiveElement = null;
    releaseScrollLock();
  });
});
