const TIMELINE_STEP_FALLBACK = 2000;
const TIMELINE_HOLD_FALLBACK = 1500;
const TIMELINE_THRESHOLD = 0.25;
const TIMELINE_SLIDE_SETTLE = 600;
const TIMELINE_RESET_MS = 600;
const timelineRuns = new Map();

const clearTimelineTimers = (run) => {
  clearTimeout(run.timeoutId);
  clearTimeout(run.slideTimeoutId);
  cancelAnimationFrame(run.frameId);
};

const scrollTimelineTo = (run, left) => {
  clearTimeout(run.slideTimeoutId);
  run.sliding = true;
  run.scroller.scrollTo({ left, behavior: 'smooth' });
  run.slideTimeoutId = setTimeout(() => {
    run.sliding = false;
  }, TIMELINE_SLIDE_SETTLE);
};

const slideTimeline = (run) => {
  const maxLeft = run.scroller.scrollWidth - run.scroller.clientWidth;
  if (run.pitch <= 0 || run.scroller.scrollLeft >= maxLeft - 1) return;
  scrollTimelineTo(run, Math.min(run.scroller.scrollLeft + run.pitch, maxLeft));
};

const watchTimelineProgress = (run) => {
  if (run.sliding) return;
  if (run.fill.getBoundingClientRect().right > run.scroller.getBoundingClientRect().right) slideTimeline(run);
};

const revealMilestone = (run, index) => {
  const milestone = run.milestones[index];
  if (!milestone) return;

  const box = milestone.getBoundingClientRect();
  const view = run.scroller.getBoundingClientRect();
  if (box.left >= view.left - 1 && box.right <= view.right + 1) return;

  const centred = run.scroller.scrollLeft + box.left + box.width / 2 - (view.left + view.width / 2);
  scrollTimelineTo(run, centred);
};

const startTimelineCycle = (run) => {
  const { fill, dots, stepMs, holdMs, shouldLoop } = run;

  run.pitch = dots[1].getBoundingClientRect().left - dots[0].getBoundingClientRect().left;
  run.sliding = false;

  fill.classList.remove('is-resetting', 'is-running');
  void fill.offsetWidth;
  fill.classList.add('is-running');
  dots[0].classList.add('is-active');

  let index = 0;
  const advance = () => {
    index++;

    if (index < dots.length) {
      dots[index].classList.add('is-active');
      revealMilestone(run, index);
      run.timeoutId = setTimeout(advance, stepMs);
      return;
    }

    if (shouldLoop) run.timeoutId = setTimeout(() => resetTimelineCycle(run), holdMs);
  };

  run.timeoutId = setTimeout(advance, stepMs);
};

function resetTimelineCycle(run) {
  clearTimeout(run.slideTimeoutId);
  run.sliding = true;
  run.fill.classList.add('is-resetting');
  for (const dot of run.dots) dot.classList.remove('is-active');
  run.scroller.scrollTo({ left: 0, behavior: 'smooth' });
  run.timeoutId = setTimeout(() => startTimelineCycle(run), TIMELINE_RESET_MS);
}

const initTimeline = (root) => {
  const scroller = root.querySelector('[data-timeline-scroller]');
  const fill = root.querySelector('[data-timeline-fill]');
  const dots = [...root.querySelectorAll('[data-timeline-dot]')];
  const milestones = [...root.querySelectorAll('.timeline__milestone')];
  if (!scroller || !fill || dots.length < 2) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (const dot of dots) dot.classList.add('is-active');
    root.classList.add('is-visible');
    return;
  }

  const run = {
    scroller,
    fill,
    dots,
    milestones,
    stepMs: Number(root.dataset.timelineStep) || TIMELINE_STEP_FALLBACK,
    holdMs: Number(root.dataset.timelineHold) || TIMELINE_HOLD_FALLBACK,
    shouldLoop: root.dataset.timelineLoop === 'true',
    pitch: 0,
    sliding: false,
    timeoutId: 0,
    slideTimeoutId: 0,
    frameId: 0,
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        observer.disconnect();
        root.classList.add('is-visible');
        timelineRuns.set(root, run);
        startTimelineCycle(run);

        const tick = () => {
          watchTimelineProgress(run);
          run.frameId = requestAnimationFrame(tick);
        };
        run.frameId = requestAnimationFrame(tick);
      }
    },
    { threshold: TIMELINE_THRESHOLD },
  );

  observer.observe(root);
};

const initTimelines = (scope) => {
  for (const root of scope.querySelectorAll('.timeline')) initTimeline(root);
};

document.addEventListener('DOMContentLoaded', () => initTimelines(document));

document.addEventListener('shopify:section:load', (event) => initTimelines(event.target));

document.addEventListener('shopify:section:unload', (event) => {
  for (const [root, run] of timelineRuns) {
    if (!root.isConnected || event.target.contains(root)) {
      clearTimelineTimers(run);
      timelineRuns.delete(root);
    }
  }
});
