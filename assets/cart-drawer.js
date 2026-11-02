const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
const TRANSITION_DURATION = 300;

class CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.previousActiveElement = null;
    this.isOpen = false;
    this.focusTrapHandler = null;
    this._checkoutPending = false;
    this._checkoutUrl = "";
    this._unsubscribe = null;
    this._pendingQty = new Map();
    this._inFlightQty = new Set();
    this._flushTimer = null;
    this._mutationChain = Promise.resolve();
    this._queuedMutations = 0;
    this._executingMutations = 0;
    this._offerBannerEmbla = null;
    this._cartScrollTop = 0;
    this._discountRequestPending = false;
    this._resyncPending = false;
    this._giftReconciling = false;
    this._giftSettleTimer = null;
    this._paintHandle = null;
  }

  _cartSettled(ownMutations = 0) {
    return (
      this._pendingQty.size === 0 &&
      this._flushTimer === null &&
      this._queuedMutations === 0 &&
      this._executingMutations - ownMutations <= 0
    );
  }

  _scheduleGiftReconcile() {
    clearTimeout(this._giftSettleTimer);
    this._giftSettleTimer = setTimeout(() => {
      this._giftSettleTimer = null;
      this._reconcileGift();
    }, 350);
  }

  // several writers can touch cart state in one tick; painting each time is what let the badges,
  // the connector fill and the banner show different generations of the same cart
  _schedulePaint() {
    if (this._paintHandle !== null) return;
    this._paintHandle = requestAnimationFrame(() => {
      this._paintHandle = null;
      this.updateMilestones();
    });
  }

  connectedCallback() {
    this.overlay = this.querySelector("[data-cart-overlay]");
    this.panel = this.querySelector("[data-cart-panel]");
    this._checkoutUrl =
      this.querySelector("[data-cart-checkout]")?.dataset.checkoutUrl ?? "";

    this.overlay?.addEventListener("click", () => this.close());

    this.addEventListener("click", (event) => {
      if (event.target.closest("[data-cart-close]")) this.close();
    });

    this.handleKeydown = (event) => {
      if (event.key === "Escape" && this.isOpen) this.close();
    };
    document.addEventListener("keydown", this.handleKeydown);

    this.handleCartTrigger = (event) => {
      if (event.target.closest("[data-cart-trigger]")) {
        event.preventDefault();
        this.open();
      }
    };
    document.addEventListener("click", this.handleCartTrigger);

    this.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-cart-checkout]");
      if (!btn) return;
      if (CartStore.pendingOps > 0) {
        this._checkoutPending = true;
        const spinner = this.querySelector("[data-checkout-spinner]");
        btn.disabled = true;
        if (spinner) spinner.hidden = false;
      } else {
        window.location.href = this._checkoutUrl;
      }
    });

    this.addEventListener("click", (event) => this._handleQtyRemove(event));
    this.addEventListener("click", (event) => this._handleCouponClick(event));

    this.addEventListener("input", (event) => {
      if (!event.target.matches("[data-discount-input]")) return;
      this._hideDiscountError();
      this._syncApplyButton();
    });

    this.addEventListener("keydown", (event) => {
      if (
        event.key !== "Enter" ||
        !event.target.matches("[data-discount-input]")
      )
        return;
      event.preventDefault();
      this._applyDiscountCode(event.target.value.trim());
    });

    this._unsubscribe = CartStore.subscribe(this._onStoreChange.bind(this));
    CartStore.init();

    this._initOfferBanner();
  }

  _initOfferBanner() {
    if (!window.EmblaCarousel || !window.EmblaCarouselAutoplay) {
      // This file loads before the Embla scripts, so retry once every deferred script has run.
      document.addEventListener(
        "DOMContentLoaded",
        () => this._initOfferBanner(),
        { once: true },
      );
      return;
    }

    const viewport = this.querySelector(".cart-offer-banner__carousel");
    if (!viewport) return;

    const delay = Number(viewport.dataset.autoplayDelay) || 4000;
    const autoplay = window.EmblaCarouselAutoplay({
      delay,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
      stopOnFocusIn: true,
      breakpoints: { "(prefers-reduced-motion: reduce)": { active: false } },
    });

    this._offerBannerEmbla = window.EmblaCarousel(
      viewport,
      { loop: true, align: "start" },
      [autoplay],
    );
  }

  _handleCouponClick(event) {
    if (event.target.closest("[data-cart-offers-open]")) {
      this._openOffersPanel();
      return;
    }

    if (event.target.closest("[data-cart-offers-back]")) {
      this._closeOffersPanel();
      return;
    }

    if (event.target.closest("[data-discount-apply]")) {
      const input = this.querySelector("[data-discount-input]");
      this._applyDiscountCode(input?.value?.trim());
      return;
    }

    const couponBtn = event.target.closest("[data-coupon-apply]");
    if (couponBtn) {
      this._applyDiscountCode(couponBtn.dataset.couponCode);
      return;
    }

    const chipRemoveBtn = event.target.closest("[data-discount-remove-chip]");
    if (chipRemoveBtn) {
      this._removeDiscountCode(chipRemoveBtn.dataset.discountCode);
    }
  }

  _openOffersPanel() {
    const contentEl = this.querySelector("[data-cart-content]");
    this._cartScrollTop = contentEl?.scrollTop ?? 0;
    this.dataset.cartState = "offers";
  }

  _closeOffersPanel() {
    this.dataset.cartState = "cart";
    requestAnimationFrame(() => {
      const contentEl = this.querySelector("[data-cart-content]");
      if (contentEl) contentEl.scrollTop = this._cartScrollTop;
    });
  }

  _currentAppliedCodes() {
    return (CartStore.state?.discount_codes ?? [])
      .filter((discountCode) => discountCode.applicable)
      .map((discountCode) => discountCode.code);
  }

  async _applyDiscountCode(code) {
    if (!code || this._discountRequestPending) return;

    const openedFromOffers = this.dataset.cartState === "offers";

    if (this._currentAppliedCodes().includes(code)) {
      this._showDiscountError("duplicateMessage");
      if (openedFromOffers) this._closeOffersPanel();
      return;
    }

    const sectionId = this.dataset.sectionId;
    const sections = sectionId ? [sectionId] : [];
    const codes = [...this._currentAppliedCodes(), code];

    this._setDiscountBusy(true);
    try {
      const data = await CartAPI.update(
        { discount: codes.join(",") },
        sections,
      );
      const result = data.discount_codes?.find(
        (discountCode) => discountCode.code === code,
      );

      if (result?.applicable) {
        CartStore.confirm(data);
        this._reassertPendingQty();
        if (sectionId && data.sections?.[sectionId])
          this._morphSection(data.sections[sectionId]);
        this._clearDiscountInput();
        return;
      }

      const cleanupCodes = this._currentAppliedCodes();
      const cleanupData = await CartAPI.update(
        { discount: cleanupCodes.join(",") },
        sections,
      );
      CartStore.confirm(cleanupData);
      this._reassertPendingQty();
      if (sectionId && cleanupData.sections?.[sectionId])
        this._morphSection(cleanupData.sections[sectionId]);
      this._showDiscountError();
    } catch (error) {
      console.error("[CartDrawer] apply discount failed:", error);
      this.showError(error?.description || error?.message || null);
    } finally {
      this._setDiscountBusy(false);
      if (openedFromOffers) this._closeOffersPanel();
    }
  }

  async _removeDiscountCode(code) {
    if (!code || this._discountRequestPending) return;

    const sectionId = this.dataset.sectionId;
    const sections = sectionId ? [sectionId] : [];
    const codes = this._currentAppliedCodes().filter(
      (appliedCode) => appliedCode !== code,
    );

    this._setDiscountBusy(true);
    try {
      const data = await CartAPI.update(
        { discount: codes.join(",") },
        sections,
      );
      CartStore.confirm(data);
      this._reassertPendingQty();
      if (sectionId && data.sections?.[sectionId])
        this._morphSection(data.sections[sectionId]);
    } catch (error) {
      console.error("[CartDrawer] remove discount failed:", error);
      this.showError(error?.description || error?.message || null);
    } finally {
      this._setDiscountBusy(false);
    }
  }

  _setDiscountBusy(isBusy) {
    this._discountRequestPending = isBusy;

    const overlay = this.querySelector("[data-cart-drawer-loading]");
    const input = this.querySelector("[data-discount-input]");

    if (overlay) overlay.hidden = !isBusy;
    if (input) input.disabled = isBusy;
    this._syncApplyButton();

    for (const btn of this.querySelectorAll("[data-coupon-apply]")) {
      btn.disabled = isBusy || btn.hasAttribute("data-coupon-applied");
    }
    for (const btn of this.querySelectorAll("[data-discount-remove-chip]"))
      btn.disabled = isBusy;
  }

  _syncApplyButton() {
    const input = this.querySelector("[data-discount-input]");
    const applyBtn = this.querySelector("[data-discount-apply]");

    if (applyBtn)
      applyBtn.disabled = this._discountRequestPending || !input?.value.trim();
  }

  _clearDiscountInput() {
    const input = this.querySelector("[data-discount-input]");
    const errorEl = this.querySelector("[data-discount-error]");

    if (input) input.value = "";
    if (errorEl) errorEl.hidden = true;
    this._syncApplyButton();
  }

  _showDiscountError(messageKey = "errorMessage") {
    const errorEl = this.querySelector("[data-discount-error]");
    if (!errorEl) return;
    errorEl.textContent =
      errorEl.dataset[messageKey] ?? errorEl.dataset.errorMessage ?? "";
    errorEl.hidden = false;
  }

  _hideDiscountError() {
    const errorEl = this.querySelector("[data-discount-error]");
    if (errorEl) errorEl.hidden = true;
  }

  disconnectedCallback() {
    clearTimeout(this._giftSettleTimer);
    if (this._paintHandle !== null) cancelAnimationFrame(this._paintHandle);
    this._unsubscribe?.();
    this._offerBannerEmbla?.destroy();
    document.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("click", this.handleCartTrigger);
    this.removeTrapFocus();
  }

  open() {
    this.previousActiveElement = document.activeElement;
    this.hidden = false;
    this.isOpen = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.overlay?.classList.remove("opacity-0");
        this.overlay?.classList.add("opacity-100");
        this.panel?.classList.remove("translate-x-full");
        this.panel?.classList.add("translate-x-0");
        document.body.classList.add("overflow-hidden");
        this.setAttribute("aria-hidden", "false");
        this.trapFocus();
      });
    });
  }

  close() {
    this.isOpen = false;
    this.removeTrapFocus();
    this.overlay?.classList.remove("opacity-100");
    this.overlay?.classList.add("opacity-0");
    this.panel?.classList.remove("translate-x-0");
    this.panel?.classList.add("translate-x-full");
    document.body.classList.remove("overflow-hidden");
    this.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      this.hidden = true;
      this.previousActiveElement?.focus();
    }, TRANSITION_DURATION);
  }

  trapFocus() {
    const focusable = [...this.panel.querySelectorAll(FOCUSABLE_SELECTORS)];
    if (!focusable.length) return;

    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    firstFocusable.focus();
    this.removeTrapFocus();

    this.focusTrapHandler = (event) => {
      if (event.key !== "Tab") return;
      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    };
    this.panel.addEventListener("keydown", this.focusTrapHandler);
  }

  removeTrapFocus() {
    if (this.focusTrapHandler && this.panel) {
      this.panel.removeEventListener("keydown", this.focusTrapHandler);
      this.focusTrapHandler = null;
    }
  }

  _handleQtyRemove(event) {
    const minusBtn = event.target.closest("[data-quantity-minus]");
    const plusBtn = event.target.closest("[data-quantity-plus]");
    if (!minusBtn && !plusBtn) return;

    const btn = minusBtn ?? plusBtn;
    const row = btn.closest("[data-item-key]");
    if (!row) return;
    const key = row.dataset.itemKey;

    const input = row.querySelector("[data-cart-line-qty]");
    if (!input) return;

    // _pendingQty is the shopper's own unflushed intent, so it outranks the input — which any
    // section morph or store re-render could have reset to a server value from before this click
    const currentQty =
      this._pendingQty.get(key)?.finalQty ?? parseInt(input.value, 10);
    if (!Number.isFinite(currentQty)) return;

    if (minusBtn && currentQty === 1) {
      this._handleRemove(key);
      return;
    }

    const delta = plusBtn ? 1 : -1;
    const newQty = currentQty + delta;
    if (newQty < 1 || newQty > 99) return;

    this._handleQtyChange(key, newQty);
  }

  _handleQtyChange(key, newQty) {
    if (!CartStore.state) return;

    if (!this._pendingQty.has(key) && !this._storeItem(key)) return;

    if (this._pendingQty.has(key)) {
      this._pendingQty.get(key).finalQty = newQty;
      CartStore.patchQty(key, newQty);
    } else {
      const stateRollback = CartStore.optimistic(key, newQty);
      this._pendingQty.set(key, { stateRollback, finalQty: newQty });
    }

    const row = this.querySelector(`[data-item-key="${key}"]`);
    if (!row) return;

    const input = row.querySelector("[data-cart-line-qty]");
    if (input) input.value = newQty;

    const item = CartStore.state?.items?.find((i) => i.key === key);
    if (item) {
      const priceEl = row.querySelector("[data-cart-line-price]");
      if (priceEl)
        priceEl.textContent = CartStore.formatMoney(newQty * item.final_price);

      const compareEl = row.querySelector("[data-cart-line-compare-price]");
      if (compareEl)
        compareEl.textContent = CartStore.lineCompareText(
          compareEl,
          item,
          newQty,
        );
    }

    const minusBtnEl = row.querySelector("[data-quantity-minus]");
    if (minusBtnEl) {
      const deleteIcon = minusBtnEl.querySelector("[data-icon-delete]");
      const minusIcon = minusBtnEl.querySelector("[data-icon-minus]");
      if (deleteIcon) deleteIcon.hidden = newQty !== 1;
      if (minusIcon) minusIcon.hidden = newQty === 1;
      const label =
        newQty === 1
          ? minusBtnEl.dataset.labelRemove
          : minusBtnEl.dataset.labelDecrease;
      if (label) minusBtnEl.setAttribute("aria-label", label);
    }

    this._schedulePaint();

    this._scheduleFlush();
  }

  _reassertPendingQty() {
    const intent = new Map();
    for (const snapshot of this._inFlightQty) {
      for (const [key, { finalQty }] of snapshot) intent.set(key, finalQty);
    }
    for (const [key, { finalQty }] of this._pendingQty)
      intent.set(key, finalQty);
    for (const [key, finalQty] of intent) CartStore.patchQty(key, finalQty);
  }

  _milestoneBasis(extraCents = 0) {
    const items = CartStore.state?.items ?? [];
    return (
      items
        .filter((i) => !i.properties?._free_gift)
        .reduce((sum, i) => sum + i.original_price * i.quantity, 0) +
      CartStore.pendingBasisCents +
      extraCents
    );
  }

  updateMilestones(extraCents = 0) {
    const tracker = this.querySelector("[data-milestone-tracker]");
    if (!tracker || !CartStore.state) return;

    const basis = this._milestoneBasis(extraCents);
    const badges = [...tracker.querySelectorAll("[data-milestone-badge]")];

    let nextThreshold = 0;
    let nextReward = "";
    for (const badge of badges) {
      const threshold = Number(badge.dataset.threshold);
      const reached = basis >= threshold;
      badge.dataset.reached = String(reached);
      if (!reached && (nextThreshold === 0 || threshold < nextThreshold)) {
        nextThreshold = threshold;
        nextReward = badge.dataset.reward ?? "";
      }
    }

    for (const connector of tracker.querySelectorAll(
      "[data-milestone-connector]",
    )) {
      const lower = Number(connector.dataset.lower);
      const upper = Number(connector.dataset.upper);
      const span = upper - lower;
      let fill = 0;
      if (basis >= upper) fill = 100;
      else if (span > 0 && basis > lower)
        fill = Math.round(((basis - lower) * 100) / span);
      connector.firstElementChild?.style.setProperty(
        "--milestone-fill",
        `${fill}%`,
      );
    }

    const messageEl = tracker.querySelector("[data-milestone-message]");
    if (!messageEl) return;
    if (nextThreshold === 0) {
      messageEl.textContent = tracker.dataset.completeMessage ?? "";
      return;
    }
    messageEl.textContent = (tracker.dataset.progressTemplate ?? "")
      .replace("[shortfall]", CartStore.formatMoney(nextThreshold - basis))
      .replace("[reward]", nextReward)
      .replace("[threshold]", CartStore.formatMoney(nextThreshold));
  }

  _earnedBadge() {
    const tracker = this.querySelector("[data-milestone-tracker]");
    if (!tracker) return null;

    const basis = this._milestoneBasis();
    let earned = null;

    for (const badge of tracker.querySelectorAll("[data-milestone-badge]")) {
      const threshold = Number(badge.dataset.threshold);
      if (!badge.dataset.giftVariant || basis < threshold) continue;
      if (!earned || threshold > Number(earned.dataset.threshold)) {
        earned = badge;
      }
    }

    return earned;
  }

  _giftDiff() {
    const badge = this._earnedBadge();
    const giftLines = (CartStore.state?.items ?? []).filter(
      (item) => item.properties?._free_gift,
    );

    const keep = badge
      ? giftLines.find(
        (item) => String(item.variant_id) === badge.dataset.giftVariant,
      )
      : null;
    const stale = giftLines.filter((item) => item !== keep);
    const toAdd = badge && !keep ? badge : null;

    return stale.length || toAdd ? { stale, toAdd } : null;
  }


  _reconcileGift() {
    if (this._giftReconciling || !CartStore.state) return;
    if (!this._cartSettled()) {
      this._scheduleGiftReconcile();
      return;
    }
    if (!this._giftDiff()) return;

    this._giftReconciling = true;
    this._queuedMutations++;
    this._mutationChain = this._mutationChain.then(async () => {
      this._queuedMutations--;
      this._executingMutations++;
      try {
        if (!this._cartSettled(1)) return;
        const diff = this._giftDiff();
        if (diff) await this._applyGiftChanges(diff);
      } catch (error) {
        console.error("[CartDrawer] gift reconcile failed:", error);
      } finally {
        this._executingMutations--;
        this._giftReconciling = false;
      }
    });
  }

  _buildOptimisticGift(badge) {
    const template = this.querySelector(
      `[data-gift-row="${badge.dataset.giftVariant}"]`,
    );
    return template?.content?.firstElementChild?.cloneNode(true) ?? null;
  }

  async _applyGiftChanges({ stale, toAdd }) {
    const sectionId = this.dataset.sectionId;
    const sections = sectionId ? [sectionId] : [];
    const linesEl = this.querySelector("[data-cart-content]");
    let data = null;

    const collapsing = stale
      .map((item) => {
        const row = this.querySelector(`[data-item-key="${item.key}"]`);
        const wrapper = row?.closest("[data-cart-line-row]");
        return wrapper ? this._collapseAndRemove(wrapper) : null;
      })
      .filter(Boolean);

    let optimisticEl = null;
    if (toAdd) {
      optimisticEl = this._buildOptimisticGift(toAdd);
      if (optimisticEl && linesEl) {
        optimisticEl.classList.add("animate-pulse");
        const trackerEl = linesEl.querySelector("[data-milestone-tracker]");
        const firstRowEl = linesEl.querySelector("[data-cart-line-row]");
        if (firstRowEl) firstRowEl.before(optimisticEl);
        else if (trackerEl) trackerEl.after(optimisticEl);
        else linesEl.prepend(optimisticEl);
      }
    }

    try {
      for (const item of stale) {
        data = await CartAPI.changeByKey(item.key, 0, sections);
        CartStore.sync(data);
        this._reassertPendingQty();
      }

      if (toAdd) {
        const formData = new FormData();
        formData.append("id", toAdd.dataset.giftVariant);
        formData.append("quantity", "1");
        formData.append(
          "properties[_free_gift]",
          String(toAdd.dataset.threshold),
        );
        const addData = await CartAPI.add(formData, sections);
        if (addData.sections) data = addData;
        CartStore.sync(await CartAPI.get());
        this._reassertPendingQty();
      }
    } finally {
      await Promise.all(collapsing.map((c) => c.done));
      optimisticEl?.remove();
    }

    if (data && sectionId && data.sections?.[sectionId]) {
      this._morphSection(data.sections[sectionId], {
        ownMutations: 1,
        ownGift: true,
      });
    }
    this._schedulePaint();
  }

  _collapseAndRemove(el) {
    if (!el?.isConnected) return { done: Promise.resolve(), cancel: () => { } };

    let settle;
    const done = new Promise((resolve) => {
      settle = resolve;
    });
    const remove = () => {
      el.remove();
      settle();
    };

    el.classList.add("is-removing");
    el.addEventListener("animationend", remove, { once: true });
    const timer = setTimeout(remove, 500);

    return {
      done,
      cancel: () => {
        clearTimeout(timer);
        el.removeEventListener("animationend", remove);
        el.classList.remove("is-removing");
        settle();
      },
    };
  }


  _morphSection(
    sectionHtml,
    { force = false, ownMutations = 0, ownGift = false } = {},
  ) {
    if (!force && this._hasPendingIntent(ownMutations, ownGift)) return;

    const doc = new DOMParser().parseFromString(sectionHtml, "text/html");

    const newItemsEl = doc.querySelector("[data-cart-items]");
    const existingItemsEl = this.querySelector("[data-cart-items]");
    if (newItemsEl && existingItemsEl) {
      Idiomorph.morph(existingItemsEl, newItemsEl, { morphStyle: "outerHTML" });
    }

    const newFooterEl = doc.querySelector("[data-cart-footer]");
    const existingFooterEl = this.querySelector("[data-cart-footer]");
    if (newFooterEl && existingFooterEl) {
      Idiomorph.morph(existingFooterEl, newFooterEl, {
        morphStyle: "outerHTML",
      });
    }
  }

  _hasPendingIntent(ownMutations = 0, ownGift = false) {
    return (
      this._pendingQty.size > 0 ||
      this._flushTimer !== null ||
      this._queuedMutations > 0 ||
      this._executingMutations - ownMutations > 0 ||
      (this._giftReconciling && !ownGift)
    );
  }

  _scheduleFlush() {
    clearTimeout(this._flushTimer);
    this._flushTimer = setTimeout(() => this._flush(), 250);
  }

  _flush() {
    this._flushTimer = null;
    if (this._pendingQty.size === 0) return;

    const snapshot = new Map(this._pendingQty);
    this._pendingQty.clear();
    this._inFlightQty.add(snapshot);

    this._queuedMutations++;
    this._mutationChain = this._mutationChain.then(() => {
      this._queuedMutations--;
      return this._executeMutation(snapshot);
    });
  }

  async _executeMutation(snapshot) {
    const sectionId = this.dataset.sectionId;
    const sections = sectionId ? [sectionId] : [];

    const updates = {};
    for (const [key, { finalQty }] of snapshot) updates[key] = finalQty;

    this._executingMutations++;
    try {
      const data = await CartAPI.update({ updates }, sections);

      if (sectionId && data.sections?.[sectionId]) {
        this._morphSection(data.sections[sectionId], { ownMutations: 1 });
      }

      CartStore.confirmBatch(data, snapshot.size);
      this._reassertPendingQty();
    } catch (error) {
      const apiMessage = error?.description || error?.message || null;
      for (const [key, { stateRollback }] of snapshot) {
        CartStore.rollback(stateRollback);
        const item = CartStore.state?.items?.find((i) => i.key === key);
        if (item) {
          const row = this.querySelector(`[data-item-key="${key}"]`);
          if (row) {
            const input = row.querySelector("[data-cart-line-qty]");
            if (input) input.value = item.quantity;
            const priceEl = row.querySelector("[data-cart-line-price]");
            if (priceEl)
              priceEl.textContent = CartStore.formatMoney(
                item.quantity * item.final_price,
              );
            const compareEl = row.querySelector(
              "[data-cart-line-compare-price]",
            );
            if (compareEl)
              compareEl.textContent = CartStore.lineCompareText(
                compareEl,
                item,
                item.quantity,
              );
            const minusBtnEl = row.querySelector("[data-quantity-minus]");
            if (minusBtnEl) {
              const deleteIcon = minusBtnEl.querySelector("[data-icon-delete]");
              const minusIcon = minusBtnEl.querySelector("[data-icon-minus]");
              if (deleteIcon) deleteIcon.hidden = item.quantity !== 1;
              if (minusIcon) minusIcon.hidden = item.quantity === 1;
              const lbl =
                item.quantity === 1
                  ? minusBtnEl.dataset.labelRemove
                  : minusBtnEl.dataset.labelDecrease;
              if (lbl) minusBtnEl.setAttribute("aria-label", lbl);
            }
          }
        }
        this._showLineError(key, apiMessage);
      }
    } finally {
      this._inFlightQty.delete(snapshot);
      this._executingMutations--;
    }
  }

  _storeItem(key) {
    const item = CartStore.state?.items?.find((i) => i.key === key);
    if (!item) this._resync();
    return item ?? null;
  }

  async _resync() {
    if (this._resyncPending) return;
    this._resyncPending = true;
    const sectionId = this.dataset.sectionId;
    const sections = sectionId ? [sectionId] : [];
    try {
      const data = await CartAPI.update({ updates: {} }, sections);
      CartStore.sync(data);
      this._reassertPendingQty();
      if (sectionId && data.sections?.[sectionId]) {
        this._morphSection(data.sections[sectionId], { force: true });
      }
      this._schedulePaint();
    } catch (error) {
      console.error("[CartDrawer] resync failed:", error);
    } finally {
      this._resyncPending = false;
    }
  }

  _handleRemove(key) {
    if (!CartStore.state) return;

    const row = this.querySelector(`[data-item-key="${key}"]`);
    if (!row) return;

    if (!this._storeItem(key)) return;

    clearTimeout(this._flushTimer);
    this._flushTimer = null;
    for (const [, pendingData] of this._pendingQty) {
      CartStore.rollback(pendingData.stateRollback);
    }
    this._pendingQty.clear();

    const parent = row.parentElement;
    const rowWrapper = parent?.children.length === 1 ? parent : row;
    const rowWrapperParent = rowWrapper.parentElement;
    const rowWrapperNextSibling = rowWrapper.nextSibling;
    const collapse = this._collapseAndRemove(rowWrapper);
    const restoreRow = () => {
      collapse.cancel();
      if (rowWrapperParent && !rowWrapper.isConnected) {
        const ref =
          rowWrapperNextSibling?.parentNode === rowWrapperParent
            ? rowWrapperNextSibling
            : null;
        rowWrapperParent.insertBefore(rowWrapper, ref);
      }
    };

    const stateRollback = CartStore.optimistic(key, 0);

    this._schedulePaint();

    const sectionId = this.dataset.sectionId;
    const sections = sectionId ? [sectionId] : [];

    const showLoader = this._queuedMutations + this._executingMutations > 0;
    if (showLoader) this.panel?.classList.add("cart-loading");

    this._queuedMutations++;
    this._mutationChain = this._mutationChain.then(async () => {
      this._queuedMutations--;
      this._executingMutations++;
      try {
        const stillPresent = (CartStore.state?.items ?? []).some(
          (item) => item.key === key,
        );

        if (!stillPresent) {
          restoreRow();
          CartStore.rollback(stateRollback);
          this._resync();
          return;
        }

        const data = await CartAPI.changeByKey(key, 0, sections);
        await collapse.done;
        if (sectionId && data.sections?.[sectionId]) {
          this._morphSection(data.sections[sectionId], { ownMutations: 1 });
        }
        CartStore.confirm(data);
        this._reassertPendingQty();
      } catch (error) {
        console.error("[CartDrawer] remove failed:", error);
        restoreRow();
        CartStore.rollback(stateRollback);
        this._showLineError(key, error?.description || error?.message || null);
      } finally {
        this._executingMutations--;
        if (showLoader) this.panel?.classList.remove("cart-loading");
      }
    });
  }

  showError(message) {
    const errEl = this.querySelector("[data-cart-error]");
    if (!errEl) return;
    errEl.textContent = message;
    errEl.hidden = false;
    setTimeout(() => {
      errEl.hidden = true;
    }, 4000);
  }

  _showLineError(key, message = null) {
    const row = this.querySelector(`[data-item-key="${key}"]`);
    const errEl = row?.querySelector("[data-cart-line-error]");
    if (!errEl) return;
    errEl.textContent = message ?? errEl.dataset.errorMessage;
    errEl.hidden = false;
    setTimeout(() => {
      errEl.hidden = true;
    }, 3000);
  }

  _onStoreChange(state, pendingOps) {
    if (!state) return;

    const checkoutBtn = this.querySelector("[data-cart-checkout]");
    const spinnerEl = this.querySelector("[data-checkout-spinner]");

    if (checkoutBtn && pendingOps === 0) {
      checkoutBtn.disabled = false;
      checkoutBtn.removeAttribute("aria-disabled");
      checkoutBtn.removeAttribute("aria-busy");
      if (spinnerEl) spinnerEl.hidden = true;

      if (this._checkoutPending) {
        this._checkoutPending = false;
        window.location.href = this._checkoutUrl;
      }
    }

    const isEmpty = state.item_count === 0;

    if (pendingOps === 0 || (isEmpty && CartStore._pendingAdds === 0)) {
      const itemsEl = this.querySelector("[data-cart-items]");
      const emptyEl = this.querySelector("[data-cart-empty]");
      const checkoutActionsEl = this.querySelector(
        "[data-cart-checkout-actions]",
      );
      const emptyCtaEl = this.querySelector("[data-cart-empty-cta]");

      if (itemsEl) itemsEl.hidden = isEmpty;
      if (emptyEl) emptyEl.hidden = !isEmpty;
      if (checkoutActionsEl) checkoutActionsEl.hidden = isEmpty;
      if (emptyCtaEl) emptyCtaEl.hidden = !isEmpty;
    }

    this._schedulePaint();
    this._scheduleGiftReconcile();

    const headerCount = this.querySelector("[data-cart-header-count]");
    if (headerCount) {
      headerCount.textContent = state.item_count;
    }

    for (const el of document.querySelectorAll("[data-cart-count]")) {
      el.textContent = state.item_count;
      el.hidden = isEmpty;
    }

    for (const totalEl of this.querySelectorAll("[data-cart-total]")) {
      totalEl.classList.toggle("animate-pulse", pendingOps > 0);
    }
  }
}

if (!customElements.get("cart-drawer")) {
  customElements.define("cart-drawer", CartDrawer);
}
