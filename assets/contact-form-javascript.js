const SUBMIT_MIN_MS = 1000;

const REQUEST_HEADERS = {
  Accept: 'text/html, application/xhtml+xml',
  'X-Requested-With': 'XMLHttpRequest',
};

const ERROR_SELECTOR = '.errors, .form-error, [data-form-error], .error';

const stopEvent = (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();
};

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

class ContactForm extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    this.submitButton = this.querySelector('[data-contact-submit]');
    this.fields = this.querySelector('[data-contact-fields]');
    this.ctaIdle = this.querySelector('[data-contact-idle]');
    this.ctaSent = this.querySelector('[data-contact-sent]');
    this.errorPanel = this.querySelector('[data-contact-error]');

    if (!this.form || !this.submitButton || !this.fields || !this.ctaIdle || !this.ctaSent) return;

    this.isSubmitting = false;
    this.submitButton.type = 'button';

    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.submitButton.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeydown);
    this.fields.addEventListener('input', this.handleInput);
    this.fields.addEventListener('change', this.handleInput);
    this.form.addEventListener('submit', stopEvent, true);
  }

  disconnectedCallback() {
    this.submitButton?.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeydown);
    this.fields?.removeEventListener('input', this.handleInput);
    this.fields?.removeEventListener('change', this.handleInput);
    this.form?.removeEventListener('submit', stopEvent, true);
  }

  handleClick(event) {
    event.preventDefault();
    this.handleSubmit();
  }

  handleKeydown(event) {
    if (event.key !== 'Enter') return;
    if (event.target.closest('textarea')) return;
    if (event.target.closest('contact-select')) return;
    if (!event.target.closest('[data-contact-fields]')) return;
    event.preventDefault();
    this.handleSubmit();
  }

  handleInput(event) {
    this.showSent(false);
    event.target.setCustomValidity?.('');
  }

  applyPatternMessages() {
    for (const control of this.fields.querySelectorAll('[data-error-message]')) {
      control.setCustomValidity('');
      if (control.validity.patternMismatch) control.setCustomValidity(control.dataset.errorMessage);
    }
  }

  trimValues() {
    for (const control of this.fields.querySelectorAll('input, textarea')) {
      control.value = control.value.trim();
    }
  }

  showSent(isSent) {
    this.ctaIdle.hidden = isSent;
    this.ctaSent.hidden = !isSent;
  }

  setLoading(isLoading) {
    this.submitButton.classList.toggle('is-loading', isLoading);
    this.submitButton.disabled = isLoading;
  }

  async postForm() {
    const body = new URLSearchParams();
    for (const control of this.form.querySelectorAll('[name]')) {
      body.append(control.name, control.value);
    }

    const response = await fetch(this.form.action, {
      method: 'POST',
      body,
      headers: REQUEST_HEADERS,
      redirect: 'manual',
    });

    if (response.type === 'opaqueredirect' || response.status === 302 || response.status === 303) {
      return true;
    }

    if (!response.ok) return false;

    const parsed = new DOMParser().parseFromString(await response.text(), 'text/html');
    return parsed.querySelector(ERROR_SELECTOR) === null;
  }

  async handleSubmit() {
    if (this.isSubmitting) return;

    this.trimValues();
    this.applyPatternMessages();

    if (!this.form.checkValidity()) {
      this.form.reportValidity();
      return;
    }

    this.isSubmitting = true;
    this.errorPanel?.setAttribute('hidden', '');
    this.showSent(false);
    this.setLoading(true);

    const [isSent] = await Promise.all([this.postForm().catch(() => false), sleep(SUBMIT_MIN_MS)]);

    this.setLoading(false);
    this.isSubmitting = false;

    if (!isSent) {
      this.errorPanel?.removeAttribute('hidden');
      return;
    }

    this.form.reset();
    this.showSent(true);
  }
}

if (!customElements.get('contact-form')) {
  customElements.define('contact-form', ContactForm);
}
// APG select-only combobox: focus stays on the button and aria-activedescendant marks the active option,
// so no focus is moved into the list and none has to be handed back.
const TYPEAHEAD_RESET_MS = 500;

class ContactSelect extends HTMLElement {
  connectedCallback() {
    this.select = this.querySelector('[data-contact-select]');
    this.button = this.querySelector('[data-contact-select-button]');
    this.menu = this.querySelector('[data-contact-select-menu]');
    this.label = this.querySelector('[data-contact-select-label]');
    this.options = [...this.querySelectorAll('[data-contact-select-option]')];

    if (!this.select || !this.button || !this.menu || !this.label || this.options.length === 0) return;

    this.isOpen = false;
    this.activeIndex = -1;
    this.typed = '';
    // Tailwind scans .liquid only, so state classes reach JS through data attributes rather than literals
    this.openClasses = this.menu.dataset.openClass.split(' ');
    this.shutClasses = this.menu.dataset.shutClass.split(' ');

    // the native control only steps aside once the replacement is proven to be running
    this.select.classList.add('sr-only');
    this.select.setAttribute('tabindex', '-1');
    this.select.setAttribute('aria-hidden', 'true');
    this.button.hidden = false;
    this.menu.hidden = false;

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onButtonKeydown = this.onButtonKeydown.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
    this.onDocumentPointer = this.onDocumentPointer.bind(this);
    this.onFocusOut = this.onFocusOut.bind(this);
    this.onFormReset = this.onFormReset.bind(this);

    this.button.addEventListener('click', this.onButtonClick);
    this.button.addEventListener('keydown', this.onButtonKeydown);
    this.menu.addEventListener('click', this.onOptionClick);
    this.addEventListener('focusout', this.onFocusOut);
    document.addEventListener('pointerdown', this.onDocumentPointer);
    this.select.form?.addEventListener('reset', this.onFormReset);

    this.syncFromSelect();
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onDocumentPointer);
    this.select?.form?.removeEventListener('reset', this.onFormReset);
  }

  // reset fires before the controls take their defaults, so the re-sync waits a tick
  onFormReset() {
    setTimeout(() => {
      this.setOpen(false);
      this.syncFromSelect();
    });
  }

  get selectedIndex() {
    return this.options.findIndex((o) => o.dataset.value === this.select.value);
  }

  syncFromSelect() {
    const index = this.selectedIndex;
    for (const [i, option] of this.options.entries()) {
      option.setAttribute('aria-selected', i === index ? 'true' : 'false');
    }
    const chosen = this.options[index];
    this.label.textContent = chosen ? chosen.dataset.value : this.select.options[0].textContent.trim();
    this.button.classList.toggle('text-muted', !chosen);
    this.button.classList.toggle('text-foreground', Boolean(chosen));
  }

  setOpen(isOpen) {
    this.isOpen = isOpen;
    this.menu.classList.remove(...(isOpen ? this.shutClasses : this.openClasses));
    this.menu.classList.add(...(isOpen ? this.openClasses : this.shutClasses));
    this.button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
      this.setActive(this.selectedIndex === -1 ? 0 : this.selectedIndex);
    } else {
      this.activeIndex = -1;
      this.button.removeAttribute('aria-activedescendant');
      for (const option of this.options) delete option.dataset.active;
    }
  }

  setActive(index) {
    this.activeIndex = Math.max(0, Math.min(index, this.options.length - 1));
    for (const [i, option] of this.options.entries()) {
      if (i === this.activeIndex) {
        option.dataset.active = 'true';
        option.scrollIntoView({ block: 'nearest' });
      } else {
        delete option.dataset.active;
      }
    }
    this.button.setAttribute('aria-activedescendant', this.options[this.activeIndex].id);
  }

  commit(index) {
    const option = this.options[index];
    if (!option) return;
    this.select.value = option.dataset.value;
    this.syncFromSelect();
    // bubbles so the parent form sees a real change, exactly as the native control would emit
    this.select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  onButtonClick() {
    this.setOpen(!this.isOpen);
  }

  onOptionClick(event) {
    const option = event.target.closest('[data-contact-select-option]');
    if (!option) return;
    this.commit(this.options.indexOf(option));
    this.setOpen(false);
    this.button.focus();
  }

  onDocumentPointer(event) {
    if (this.isOpen && !this.contains(event.target)) this.setOpen(false);
  }

  // Tab out closes the list; without this it stays open over the next field
  onFocusOut(event) {
    if (!this.contains(event.relatedTarget)) this.setOpen(false);
  }

  matchTyped(key) {
    clearTimeout(this.typedTimer);
    this.typed += key.toLowerCase();
    this.typedTimer = setTimeout(() => {
      this.typed = '';
    }, TYPEAHEAD_RESET_MS);
    const hit = this.options.findIndex((o) => o.dataset.value.toLowerCase().startsWith(this.typed));
    if (hit === -1) return;
    if (this.isOpen) this.setActive(hit);
    else this.commit(hit);
  }

  onButtonKeydown(event) {
    const { key } = event;

    if (key === 'Escape') {
      if (this.isOpen) event.stopPropagation();
      this.setOpen(false);
      return;
    }

    if (key === 'Tab') {
      this.setOpen(false);
      return;
    }

    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      if (this.isOpen) {
        this.commit(this.activeIndex);
        this.setOpen(false);
      } else {
        this.setOpen(true);
      }
      return;
    }

    if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Home' || key === 'End') {
      event.preventDefault();
      if (!this.isOpen) {
        this.setOpen(true);
        return;
      }
      if (key === 'Home') this.setActive(0);
      else if (key === 'End') this.setActive(this.options.length - 1);
      else this.setActive(this.activeIndex + (key === 'ArrowDown' ? 1 : -1));
      return;
    }

    if (key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      this.matchTyped(key);
    }
  }
}

if (!customElements.get('contact-select')) {
  customElements.define('contact-select', ContactSelect);
}

