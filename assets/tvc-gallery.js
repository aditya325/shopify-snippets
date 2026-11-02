class TvcVideoCard extends HTMLElement {
  userPaused = false;

  connectedCallback() {
    this.video = this.querySelector("video");
    this.toggleButton = this.querySelector("[data-tvc-toggle]");

    if (!this.video || !this.toggleButton) return;

    this.toggleButton.addEventListener("click", this.handleToggle);
    this.video.addEventListener("play", this.syncState);
    this.video.addEventListener("pause", this.syncState);
    this.syncState();
  }

  disconnectedCallback() {
    this.toggleButton?.removeEventListener("click", this.handleToggle);
    this.video?.removeEventListener("play", this.syncState);
    this.video?.removeEventListener("pause", this.syncState);
  }

  handleToggle = () => {
    if (this.video.paused) {
      this.userPaused = false;
      this.video.play().catch(() => this.syncState());
    } else {
      this.userPaused = true;
      this.video.pause();
    }
  };

  syncState = () => {
    const isPlaying = !this.video.paused;
    const { playLabel, pauseLabel } = this.toggleButton.dataset;

    this.toggleButton.dataset.playing = String(isPlaying);
    this.toggleButton.setAttribute(
      "aria-label",
      isPlaying ? pauseLabel : playLabel,
    );
  };

  suspend = () => this.video?.pause();

  resume = () => {
    if (this.userPaused) return;
    this.video?.play().catch(() => {});
  };
}

class TvcVideoFilters extends HTMLElement {
  connectedCallback() {
    this.chips = [...this.querySelectorAll("[data-tvc-filter]")];
    this.cards = [...this.querySelectorAll("tvc-video-card")];
    this.emptyState = this.querySelector("[data-tvc-empty]");

    if (!this.chips.length || !this.cards.length) return;

    this.addEventListener("click", this.handleClick);

    const activeChip = this.chips.find(
      (chip) => chip.getAttribute("aria-pressed") === "true",
    );
    if (activeChip?.dataset.tvcFilter) this.applyFilter(activeChip);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }

  handleClick = (event) => {
    const chip = event.target.closest("[data-tvc-filter]");
    if (chip) this.applyFilter(chip);
  };

  applyFilter = (activeChip) => {
    const { tvcFilter } = activeChip.dataset;

    for (const chip of this.chips) {
      chip.setAttribute("aria-pressed", String(chip === activeChip));
    }

    let visibleCount = 0;

    for (const card of this.cards) {
      const isVisible = !tvcFilter || card.dataset.tvcCategory === tvcFilter;

      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
        card.resume?.();
      } else {
        card.suspend?.();
      }
    }

    if (this.emptyState) this.emptyState.hidden = visibleCount > 0;
  };
}

if (!customElements.get("tvc-video-card")) {
  customElements.define("tvc-video-card", TvcVideoCard);
}

if (!customElements.get("tvc-video-filters")) {
  customElements.define("tvc-video-filters", TvcVideoFilters);
}
