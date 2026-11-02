const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOAST_DURATION = 4000;
const STORAGE_KEY = "newsletter:submitted";

class NewsletterForm extends HTMLElement {
  connectedCallback() {
    this.emailInput = this.querySelector("[data-newsletter-email]");
    this.submitButton = this.querySelector("[data-newsletter-submit]");
    this.toast = this.querySelector("[data-newsletter-toast]");
    this.toastMessage = this.querySelector("[data-newsletter-toast-message]");
    this.endpoint = this.dataset.action ?? "/contact";
    this.tag =
      this.querySelector('input[name="contact[tags]"]')?.value ?? "newsletter";

    if (
      !this.emailInput ||
      !this.submitButton ||
      !this.toast ||
      !this.toastMessage
    ) {
      return;
    }

    if (this.listenersBound) return;
    this.listenersBound = true;

    this.addEventListener("click", (event) => {
      if (!event.target.closest("[data-newsletter-submit]")) return;
      this.handleSubmit();
    });

    this.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      if (!event.target.closest("[data-newsletter-email]")) return;
      event.preventDefault();
      this.handleSubmit();
    });

    this.addEventListener("input", (event) => {
      if (!event.target.closest("[data-newsletter-email]")) return;
      if (
        this.toast.classList.contains("is-visible") &&
        EMAIL_REGEX.test(this.emailInput.value.trim())
      ) {
        this.hideToast();
      }
    });
  }

  disconnectedCallback() {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }
  }

  // Keyed per email + tag so the same address cannot re-subscribe to the same list.
  submissionKey(email) {
    return `${this.tag}:${email.toLowerCase()}`;
  }

  readSubmitted() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(stored) ? stored : [];
    } catch (error) {
      console.error("[newsletter] could not read stored submissions", error);
      return [];
    }
  }

  rememberSubmitted(key) {
    try {
      const submitted = this.readSubmitted();
      if (submitted.includes(key)) return;
      submitted.push(key);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submitted));
    } catch (error) {
      console.error("[newsletter] could not persist submission", error);
    }
  }

  showToast(message, isSuccess) {
    if (this.toastTimeout) clearTimeout(this.toastTimeout);

    this.toast.classList.remove(
      "newsletter-form__toast--success",
      "newsletter-form__toast--error",
    );
    this.toast.classList.add(
      "is-visible",
      isSuccess
        ? "newsletter-form__toast--success"
        : "newsletter-form__toast--error",
    );

    // Set after the region is visible — aria-live ignores mutations while display: none.
    this.toastMessage.textContent = message;

    this.toastTimeout = setTimeout(() => this.hideToast(), TOAST_DURATION);
  }

  hideToast() {
    this.toast.classList.remove(
      "is-visible",
      "newsletter-form__toast--success",
      "newsletter-form__toast--error",
    );

    // Cleared so re-showing an identical message still counts as a mutation.
    this.toastMessage.textContent = "";
  }

  setLoading(isLoading) {
    this.submitButton.disabled = isLoading;
    this.submitButton.classList.toggle("is-loading", isLoading);
  }

  async handleSubmit() {
    // setLoading disables the button, but the Enter-key path bypasses it entirely.
    if (this.isSubmitting) return;

    const email = this.emailInput.value.trim();

    if (!email) {
      this.showToast("Please enter your email address.", false);
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      this.showToast("Please enter a valid email address.", false);
      return;
    }

    const key = this.submissionKey(email);
    if (this.readSubmitted().includes(key)) {
      this.showToast("You are already subscribed with this email.", true);
      return;
    }

    this.hideToast();
    this.isSubmitting = true;
    this.setLoading(true);

    // Must be urlencoded — a FormData body sends multipart and /contact rejects it 400.
    const body = new URLSearchParams();
    for (const input of this.querySelectorAll("input[name]")) {
      body.append(input.name, input.value);
    }

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        body,
        headers: {
          Accept: "text/html, application/xhtml+xml",
          "X-Requested-With": "XMLHttpRequest",
        },
        redirect: "manual",
      });

      if (
        response.type === "opaqueredirect" ||
        response.status === 302 ||
        response.status === 303
      ) {
        this.rememberSubmitted(key);
        this.showToast("Thank you for subscribing!", true);
        this.emailInput.value = "";
      } else if (response.ok) {
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, "text/html");
        const errorEl = doc.querySelector(
          ".errors, .form-error, [data-form-error], .error",
        );

        if (errorEl) {
          this.showToast(
            errorEl.textContent.trim() || "Something went wrong.",
            false,
          );
        } else {
          this.rememberSubmitted(key);
          this.showToast("Thank you for subscribing!", true);
          this.emailInput.value = "";
        }
      } else if (response.status === 429) {
        this.showToast(
          "Too many requests. Please wait a moment and try again.",
          false,
        );
      } else {
        this.showToast("Something went wrong. Please try again.", false);
      }
    } catch (error) {
      console.error("[newsletter] submission failed", error);
      this.showToast("An error occurred. Please try again.", false);
    } finally {
      this.isSubmitting = false;
      this.setLoading(false);
    }
  }
}

if (!customElements.get("newsletter-form")) {
  customElements.define("newsletter-form", NewsletterForm);
}
