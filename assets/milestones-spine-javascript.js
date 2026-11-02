const SPINE_TRIGGER_LEAD = -0.25;
// mobile watches whole blocks, which are contiguous, so the roll lands mid-way through the clear band
const SPINE_TRIGGER_LEAD_MOBILE = 0.14;
const SPINE_DESKTOP = '(min-width: 1024px)';
const SPINE_RESIZE_MS = 150;
const spineRuns = new Map();

const settleDigit = (slot) => {
  const strip = slot.querySelector('[data-spine-strip]');
  const cells = [...strip.querySelectorAll('[data-spine-cell]')];
  const roll = strip.dataset.spineRoll;
  if (!roll) return;

  const incoming = roll === 'down' ? cells[2] : cells[0];

  strip.dataset.spineSettling = 'true';
  cells[1].textContent = incoming.textContent;
  delete strip.dataset.spineRoll;
  void strip.offsetHeight;
  delete strip.dataset.spineSettling;

  cells[0].textContent = '';
  cells[2].textContent = '';
};

const rollDigit = (slot, next, direction) => {
  settleDigit(slot);

  const strip = slot.querySelector('[data-spine-strip]');
  const cells = [...strip.querySelectorAll('[data-spine-cell]')];

  slot.dataset.spineDigitValue = next;
  if (cells[1].textContent.trim() === next) return;

  const incoming = direction === 'down' ? cells[2] : cells[0];
  incoming.textContent = next;

  void strip.offsetHeight;
  strip.dataset.spineRoll = direction;

  strip.addEventListener('transitionend', () => settleDigit(slot), { once: true });
};

const writeSpineYear = (run, year) => {
  if (!year || year === run.current) return;

  // one direction for the whole numeral, so the digits move together
  const direction = Number(year) >= Number(run.current) ? 'down' : 'up';
  run.current = year;

  for (const [index, slot] of run.slots.entries()) {
    const next = year[index] ?? '';
    if (next === (slot.dataset.spineDigitValue ?? '')) continue;
    rollDigit(slot, next, direction);
  }
};

const spineOverhang = (media) => {
  if (!media?.hasAttribute('data-spine-media')) return 0;

  const box = media.getBoundingClientRect().height;
  const frame = media.firstElementChild?.getBoundingClientRect().height ?? box;

  return frame > box ? (frame - box) / 2 : 0;
};

const spineTriggerLine = (run) => {
  const numeral = run.slots[0]?.getBoundingClientRect().height ?? 0;
  const isDesktop = window.matchMedia(SPINE_DESKTOP).matches;
  const lead = numeral * (isDesktop ? SPINE_TRIGGER_LEAD : SPINE_TRIGGER_LEAD_MOBILE);

  return Math.min(
    window.innerHeight / 2 + numeral / 2 + lead + spineOverhang(run.blocks[0]),
    window.innerHeight,
  );
};

const observeSpineRows = (run) => {
  run.observer?.disconnect();
  run.blocks = window.matchMedia(SPINE_DESKTOP).matches ? run.mediaRows : run.blockRows;
  run.lastMedia = run.blocks[run.blocks.length - 1];
  run.line = spineTriggerLine(run);

  run.observer = new IntersectionObserver(
    (entries) => {
      // contiguous blocks both touch a zero-height line at their shared edge, and entry order is not
      // guaranteed, so the lowest intersecting row wins — the one the line has just entered
      let incoming = null;

      for (const entry of entries) {
        if (entry.isIntersecting) {
          run.root.dataset.spineActive = 'true';
          if (!incoming || entry.boundingClientRect.top > incoming.boundingClientRect.top) {
            incoming = entry;
          }
          continue;
        }

        if (entry.target === run.lastMedia && entry.boundingClientRect.bottom < run.line) {
          delete run.root.dataset.spineActive;
        }
      }

      if (incoming) writeSpineYear(run, incoming.target.dataset.spineBlockYear);
    },
    { rootMargin: `-${run.line}px 0px -${window.innerHeight - run.line}px 0px`, threshold: 0 },
  );

  for (const block of run.blocks) run.observer.observe(block);
};

const initMilestonesSpine = (root) => {
  if (spineRuns.has(root)) return;

  const slots = [...root.querySelectorAll('[data-spine-digit]')];
  const media = [...root.querySelectorAll('[data-spine-media][data-spine-block-year]')];
  const blocks = media.length > 0
    ? media
    : [...root.querySelectorAll('[data-spine-block][data-spine-block-year]')];
  if (slots.length === 0 || blocks.length < 2) return;

  const blockRows = [...root.querySelectorAll('[data-spine-block][data-spine-block-year]')];

  const run = {
    root,
    slots,
    mediaRows: blocks,
    blockRows: blockRows.length > 0 ? blockRows : blocks,
    blocks,
    lastMedia: blocks[blocks.length - 1],
    current: slots.map((slot) => slot.dataset.spineDigitValue ?? '').join(''),
  };

  root.dataset.spineEnhanced = 'true';

  const leadIn = root.querySelector('[data-spine-lead-in]');

  observeSpineRows(run);

  const visibility = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) run.root.dataset.spineActive = 'true';
        else if (entry.boundingClientRect.top > window.innerHeight) delete run.root.dataset.spineActive;
      }
    },
    { threshold: 0 },
  );

  if (leadIn) visibility.observe(leadIn);
  run.visibility = visibility;

  spineRuns.set(root, run);
};

const destroyMilestonesSpine = (root) => {
  const run = spineRuns.get(root);
  if (!run) return;

  run.observer.disconnect();
  run.visibility?.disconnect();
  spineRuns.delete(root);
};

const initAllMilestonesSpines = (scope) => {
  for (const root of scope.querySelectorAll('[data-spine-root]')) initMilestonesSpine(root);
};

let spineResizeId = 0;

window.addEventListener('resize', () => {
  window.clearTimeout(spineResizeId);
  spineResizeId = window.setTimeout(() => {
    for (const run of spineRuns.values()) observeSpineRows(run);
  }, SPINE_RESIZE_MS);
});

document.addEventListener('DOMContentLoaded', () => initAllMilestonesSpines(document));

document.addEventListener('shopify:section:load', (event) => initAllMilestonesSpines(event.target));

document.addEventListener('shopify:section:unload', (event) => {
  for (const root of event.target.querySelectorAll('[data-spine-root]')) destroyMilestonesSpine(root);
});
