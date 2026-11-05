class BackToTop extends HTMLElement {
  connectedCallback() {
    this.button = this.querySelector('[data-back-to-top-button]');
    if (!this.button) return;

    this.button.addEventListener('click', this.handleClick);
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleScroll, { passive: true });
    this.syncVisibility();
  }

  disconnectedCallback() {
    this.button?.removeEventListener('click', this.handleClick);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  handleScroll = () => {
    this.syncVisibility();
  };

  syncVisibility = () => {
    const isVisible = window.scrollY > window.innerHeight;
    this.classList.toggle('back-to-top--visible', isVisible);
    this.dataset.backToTopVisible = String(isVisible);
    this.setAttribute('aria-hidden', String(!isVisible));
    if (this.button) {
      this.button.disabled = !isVisible;
      this.button.tabIndex = isVisible ? 0 : -1;
    }
  };

  handleClick = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
  };
}

if (!customElements.get('back-to-top')) {
  customElements.define('back-to-top', BackToTop);
}
