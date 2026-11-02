const CartStore = {
  state: null,
  pendingOps: 0,

  _subscribers: [],
  _initPromise: null,
  _moneyFormat: null,
  _pendingAdds: 0,

  pendingBasisCents: 0,

  // ratio of the last server total to its own subtotal, so a percentage code keeps scaling while
  // a projection is in flight; 1 when nothing is applied, which makes the projection exact
  _discountRatio: 1,

  _notify() {
    for (const fn of this._subscribers) fn(this.state, this.pendingOps);
  },

  // the checkout total used to be written only from a server payload, so it sat a whole round trip
  // behind the tracker, which reads projected quantities — the two could never agree mid-flight
  _project() {
    if (!this.state) return;
    const items = this.state.items ?? [];
    const subtotal =
      items.reduce((sum, i) => sum + i.final_price * i.quantity, 0) +
      this.pendingBasisCents;
    this.state.original_total_price =
      items.reduce((sum, i) => sum + i.original_price * i.quantity, 0) +
      this.pendingBasisCents;
    this.state.items_subtotal_price = subtotal;
    this.state.total_price = Math.round(subtotal * this._discountRatio);
    this.reconcile(this.state);
  },

  _captureDiscountRatio(serverCartData) {
    const subtotal = serverCartData?.items_subtotal_price ?? 0;
    this._discountRatio =
      subtotal > 0 ? serverCartData.total_price / subtotal : 1;
  },

  init() {
    if (this._initPromise) return this._initPromise;
    this._initPromise = CartAPI.get()
      .then((data) => {
        this.state = data;
        this._notify();
      })
      .catch((error) => {
        console.error("[CartStore] init failed:", error);
        this._initPromise = null;
      });
    return this._initPromise;
  },

  optimistic(key, newQty) {
    const itemIndex = this.state.items.findIndex((item) => item.key === key);
    if (itemIndex === -1) return () => { };

    const item = this.state.items[itemIndex];
    const priorItems = JSON.parse(JSON.stringify(this.state.items));
    const priorItemCount = this.state.item_count;
    const priorTotals = {
      total_price: this.state.total_price,
      original_total_price: this.state.original_total_price,
      items_subtotal_price: this.state.items_subtotal_price,
    };
    const qtyDelta = newQty - item.quantity;

    item.quantity = newQty;
    item.final_line_price = newQty * item.final_price;
    this.state.item_count = Math.max(0, this.state.item_count + qtyDelta);
    this.pendingOps++;
    this._project();
    this._notify();

    return () => {
      this.state.items = priorItems;
      this.state.item_count = priorItemCount;
      Object.assign(this.state, priorTotals);
    };
  },

  confirm(serverCartData) {
    this._captureDiscountRatio(serverCartData);
    this.state = serverCartData;
    this.reconcile(serverCartData);
    this.pendingOps = Math.max(0, this.pendingOps - 1);
    this._notify();
  },

  confirmBatch(serverCartData, count) {
    this._captureDiscountRatio(serverCartData);
    this.state = serverCartData;
    this.reconcile(serverCartData);
    this.pendingOps = Math.max(0, this.pendingOps - count);
    this._notify();
  },

  rollback(rollbackFn) {
    rollbackFn();
    this.pendingOps = Math.max(0, this.pendingOps - 1);
    this._notify();
  },

  sync(serverCartData) {
    this._captureDiscountRatio(serverCartData);
    this.state = serverCartData;
    this.reconcile(serverCartData);
    this._notify();
  },

  settlePendingOp() {
    this.pendingOps = Math.max(0, this.pendingOps - 1);
    this._notify();
  },

  patchQty(key, newQty) {
    if (!this.state) return;
    const item = this.state.items.find((i) => i.key === key);
    if (!item) return;
    const delta = newQty - item.quantity;
    if (delta === 0) return;
    item.quantity = newQty;
    item.final_line_price = newQty * item.final_price;
    this.state.item_count = Math.max(0, this.state.item_count + delta);
    this._project();
    this._notify();
  },

  addPending(extraBasisCents = 0) {
    this.pendingBasisCents += extraBasisCents;
    if (this.state) {
      this.state = { ...this.state, item_count: this.state.item_count + 1 };
      this._project();
    }
    this.pendingOps++;
    this._pendingAdds++;
    this._notify();
  },

  addConfirm(cartData) {
    this.pendingBasisCents = 0;
    this.state = cartData;
    this.reconcile(cartData);
    this.pendingOps = Math.max(0, this.pendingOps - 1);
    this._pendingAdds = Math.max(0, this._pendingAdds - 1);
    this._notify();
  },

  addRollback() {
    this.pendingBasisCents = 0;
    if (this.state) {
      this.state = {
        ...this.state,
        item_count: Math.max(0, this.state.item_count - 1),
      };
      this.reconcile(this.state);
    }
    this.pendingOps = Math.max(0, this.pendingOps - 1);
    this._pendingAdds = Math.max(0, this._pendingAdds - 1);
    this._notify();
  },

  subscribe(fn) {
    this._subscribers.push(fn);
    fn(this.state, this.pendingOps);
    return () => {
      this._subscribers = this._subscribers.filter((s) => s !== fn);
    };
  },

  lineCompareText(compareEl, item, qty) {
    const unit = Number(compareEl.dataset.compareAtUnit) || item.original_price;
    return this.formatMoney(unit * qty);
  },

  formatMoney(cents) {
    if (!this._moneyFormat) {
      try {
        const el = document.getElementById("shop-money-format");
        this._moneyFormat =
          JSON.parse(el?.textContent ?? "{}").money_format ?? "{{amount}}";
      } catch (_) {
        this._moneyFormat = "{{amount}}";
      }
    }
    const fmt = this._moneyFormat;
    const value = cents / 100;

    const group = (str, sep) => str.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    const strip = (out) => out.replace(/ /g, "");

    if (fmt.includes("{{amount_no_decimals_with_comma_separator}}")) {
      return strip(
        fmt.replace(
          "{{amount_no_decimals_with_comma_separator}}",
          group(String(Math.round(value)), "."),
        ),
      );
    }
    if (fmt.includes("{{amount_with_comma_separator}}")) {
      const [int, dec] = value.toFixed(2).split(".");
      const amount =
        dec === "00" ? group(int, ".") : `${group(int, ".")},${dec}`;
      return strip(fmt.replace("{{amount_with_comma_separator}}", amount));
    }
    if (fmt.includes("{{amount_no_decimals}}")) {
      return strip(
        fmt.replace(
          "{{amount_no_decimals}}",
          group(String(Math.round(value)), ","),
        ),
      );
    }
    const [int, dec] = value.toFixed(2).split(".");
    const amount = dec === "00" ? group(int, ",") : `${group(int, ",")}.${dec}`;
    return strip(fmt.replace("{{amount}}", amount));
  },

  reconcile(serverCartData) {
    const { item_count, total_price } = serverCartData;

    for (const el of document.querySelectorAll("[data-cart-count]")) {
      if (el.textContent !== String(item_count)) el.textContent = item_count;
    }

    const totalFormatted = this.formatMoney(total_price);
    for (const el of document.querySelectorAll("[data-cart-total]")) {
      if (el.textContent !== totalFormatted) el.textContent = totalFormatted;
    }
  },
};

window.CartStore = CartStore;
