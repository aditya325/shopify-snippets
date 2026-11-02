const DESKTOP_MEDIA = "(min-width: 1024px)";
const GALLERY_MAIN_OPTIONS = {
  align: "start",
  loop: false,
  containScroll: "trimSnaps",
  duration: 18,
};
const GALLERY_RAIL_OPTIONS = {
  align: "center",
  loop: false,
  containScroll: "trimSnaps",
  dragFree: true,
  duration: 22,
  breakpoints: { [DESKTOP_MEDIA]: { active: false } },
};
const OFFER_COPIED_MS = 1600;
const DELIVERY_CHECK_DELAY_MS = 900;

const initGallery = (root) => {
  const viewport = root.querySelector("[data-gallery-viewport]");
  const slides = [...root.querySelectorAll(".product-gallery__slide")];
  if (!viewport || slides.length < 2) return;

  const main = window.EmblaCarousel(viewport, GALLERY_MAIN_OPTIONS);

  const rail = root.querySelector("[data-gallery-rail]");
  const thumbs = [...root.querySelectorAll("[data-gallery-thumb]")];
  const railEmbla = rail
    ? window.EmblaCarousel(rail, GALLERY_RAIL_OPTIONS)
    : null;

  const prevButton = root.querySelector("[data-gallery-prev]");
  const nextButton = root.querySelector("[data-gallery-next]");

  const syncArrows = () => {
    const canPrev = main.canScrollPrev();
    const canNext = main.canScrollNext();

    if (prevButton) {
      prevButton.disabled = !canPrev;
      prevButton.setAttribute("aria-hidden", canPrev ? "false" : "true");
    }

    if (nextButton) {
      nextButton.disabled = !canNext;
      nextButton.setAttribute("aria-hidden", canNext ? "false" : "true");
    }
  };

  const syncThumbs = () => {
    const selected = main.selectedScrollSnap();

    thumbs.forEach((thumb, index) => {
      if (index === selected) {
        thumb.setAttribute("aria-current", "true");
      } else {
        thumb.removeAttribute("aria-current");
      }
    });

    railEmbla?.scrollTo(selected);
  };

  const syncAll = () => {
    syncThumbs();
    syncArrows();
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => main.scrollTo(index));
  });

  prevButton?.addEventListener("click", () => main.scrollPrev());
  nextButton?.addEventListener("click", () => main.scrollNext());

  main.on("select", syncAll);
  main.on("reInit", syncAll);
  syncAll();
};

const shareProduct = async () => {
  const url = window.location.href;

  try {
    if (navigator.share) {
      await navigator.share({ title: document.title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
  } catch (error) {
    console.error("[product] share failed", error);
  }
};

const initDelivery = (root) => {
  const input = root.querySelector("[data-delivery-pincode]");
  const checkButton = root.querySelector("[data-delivery-check]");
  const inputState = root.querySelector("[data-delivery-input-state]");
  const checkedState = root.querySelector("[data-delivery-checked-state]");
  const output = root.querySelector("[data-delivery-pincode-out]");
  const changeButton = root.querySelector("[data-delivery-change]");
  const label = root.querySelector("[data-delivery-check-label]");
  const loader = root.querySelector("[data-delivery-check-loader]");
  if (!input || !checkButton || !inputState || !checkedState) return;

  const errorMessage = root.querySelector("[data-delivery-error]");
  let pending = false;

  const syncValidity = () => {
    checkButton.disabled = input.value.length !== 6 || pending;
  };

  const clearError = () => {
    if (errorMessage) errorMessage.hidden = true;
    input.removeAttribute("aria-invalid");
  };

  input.addEventListener("input", () => {
    const digits = input.value.replace(/\D/g, "").slice(0, 6);
    if (digits !== input.value) input.value = digits;
    syncValidity();
    clearError();
  });

  const submit = () => {
    if (pending) return;

    if (input.value.length !== 6) {
      if (errorMessage) errorMessage.hidden = false;
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }

    clearError();

    pending = true;
    checkButton.disabled = true;
    label?.classList.add("invisible");
    loader?.classList.replace("hidden", "grid");

    window.setTimeout(() => {
      if (output) output.textContent = input.value;
      inputState.hidden = true;
      checkedState.hidden = false;

      pending = false;
      label?.classList.remove("invisible");
      loader?.classList.replace("grid", "hidden");
      syncValidity();
    }, DELIVERY_CHECK_DELAY_MS);
  };

  checkButton.addEventListener("click", submit);

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    submit();
  });

  changeButton?.addEventListener("click", () => {
    checkedState.hidden = true;
    inputState.hidden = false;
    syncValidity();
    clearError();
    input.focus();
  });
};

const copyOfferCode = async (button, section) => {
  const { offerCode, offerCopied } = button.dataset;
  if (!offerCode || offerCopied === "true") return;

  try {
    const scratch = section.querySelector("[data-offer-clipboard]");

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(offerCode);
    } else if (scratch) {
      scratch.value = offerCode;
      scratch.select();
      document.execCommand("copy");
    }

    button.dataset.offerCopied = "true";
    window.setTimeout(() => {
      button.dataset.offerCopied = "false";
    }, OFFER_COPIED_MS);
  } catch (error) {
    console.error("[product] offer copy failed", error);
  }
};

const initBuyNow = (section) => {
  const buyNow = section.querySelector("[data-buy-now]");
  if (!buyNow) return;

  const quantityInput = section.querySelector(
    '[data-product-form] [name="quantity"]',
  );

  const rewrite = (variantId) => {
    const quantity = Math.max(
      1,
      parseInt(quantityInput?.value ?? "1", 10) || 1,
    );
    const base = buyNow.getAttribute("href").split("/cart/")[0];
    buyNow.setAttribute("href", `${base}/cart/${variantId}:${quantity}`);
  };

  const currentVariantId = () =>
    buyNow.getAttribute("href").split("/cart/")[1]?.split(":")[0];

  buyNow.addEventListener("click", (event) => {
    const variantId = currentVariantId();
    if (!variantId) return;

    event.preventDefault();
    rewrite(variantId);
    window.location.assign(buyNow.getAttribute("href"));
  });

  if (typeof subscribe === "undefined" || typeof PUB_SUB_EVENTS === "undefined")
    return;

  subscribe(PUB_SUB_EVENTS.variantChange, (data) => {
    if (!data.variant) return;
    rewrite(data.variant.id);
  });
};

const initPurchaseNotice = (section) => {
  const notice = section.querySelector("[data-purchase-notice]");
  const options = [...section.querySelectorAll("[data-purchase-option]")];
  if (!notice || options.length === 0) return;

  for (const option of options) {
    option.addEventListener("change", () => {
      notice.hidden = option.dataset.purchaseInert === undefined;
    });
  }
};

const initGiftBand = (section) => {
  const band = section.querySelector("[data-pdp-gift-band]");
  if (!band || typeof CartStore === "undefined") return;

  let tiers = [];
  try {
    tiers = JSON.parse(
      band.querySelector("[data-pdp-gift-tiers]")?.textContent ?? "[]",
    );
  } catch (error) {
    console.error("[product] gift tier data unreadable", error);
    return;
  }
  if (tiers.length === 0) return;

  const titleEl = band.querySelector("[data-pdp-gift-title]");
  const subtitleEl = band.querySelector("[data-pdp-gift-subtitle]");
  const counterEl = band.querySelector("[data-pdp-gift-counter]");

  const render = (state) => {
    if (!state) return;

    const basis =
      (state.items ?? [])
        .filter((item) => !item.properties?._free_gift)
        .reduce((sum, item) => sum + item.original_price * item.quantity, 0) +
      CartStore.pendingBasisCents;

    let next = null;
    let reachedCount = 0;
    for (const tier of tiers) {
      if (basis >= tier.threshold) reachedCount++;
      else if (!next || tier.threshold < next.threshold) next = tier;
    }

    band.hidden = !next;
    if (!next) return;

    if (titleEl) titleEl.textContent = next.title;

    if (subtitleEl) {
      subtitleEl.textContent = (band.dataset.subtitleTemplate ?? "")
        .replace("[shortfall]", CartStore.formatMoney(next.threshold - basis))
        .replace("[threshold]", CartStore.formatMoney(next.threshold));
    }

    if (counterEl) {
      counterEl.textContent = (band.dataset.counterTemplate ?? "")
        .replace("[reached]", String(reachedCount))
        .replace("[total]", String(tiers.length));
    }
  };

  CartStore.subscribe(render);
};

const initPriceSync = (section) => {
  if (typeof subscribe === "undefined" || typeof PUB_SUB_EVENTS === "undefined")
    return;
  if (!section.querySelector("variant-selector")) return;

  const { productId } = section.dataset;
  const priceEl = section.querySelector("[data-pdp-price]");
  const comparePriceEl = section.querySelector("[data-pdp-compare-price]");
  const discountEl = section.querySelector("[data-pdp-discount]");

  const updatePrice = (variant) => {
    if (!priceEl) return;

    priceEl.textContent = variant.price_formatted;

    if (comparePriceEl) {
      if (variant.compare_at_price > variant.price) {
        comparePriceEl.textContent = variant.compare_at_price_formatted;
        comparePriceEl.classList.remove("hidden");
      } else {
        comparePriceEl.classList.add("hidden");
      }
    }

    if (discountEl) {
      if (variant.compare_at_price > variant.price) {
        const discount = Math.round(
          ((variant.compare_at_price - variant.price) /
            variant.compare_at_price) *
            100,
        );
        discountEl.textContent = `(${discount}%)`;
        discountEl.classList.remove("hidden");
      } else {
        discountEl.classList.add("hidden");
      }
    }
  };

  const updateURL = (variant) => {
    const url = new URL(window.location);
    url.searchParams.set("variant", variant.id);
    window.history.replaceState({}, "", url);
  };

  subscribe(PUB_SUB_EVENTS.variantChange, (data) => {
    if (data.productId !== productId) return;

    if (!data.variant) {
      if (discountEl) discountEl.classList.add("hidden");
      return;
    }

    updatePrice(data.variant);
    updateURL(data.variant);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("[data-product-section]");
  if (!section) return;

  if (window.EmblaCarousel) {
    for (const root of section.querySelectorAll("[data-product-gallery]"))
      initGallery(root);
  }

  for (const button of section.querySelectorAll("[data-gallery-share]")) {
    button.addEventListener("click", shareProduct);
  }

  for (const root of section.querySelectorAll("[data-pdp-delivery]"))
    initDelivery(root);

  for (const button of section.querySelectorAll("[data-offer-copy]")) {
    button.addEventListener("click", () => copyOfferCode(button, section));
  }

  initBuyNow(section);
  initPurchaseNotice(section);
  initPriceSync(section);
  initGiftBand(section);
});
