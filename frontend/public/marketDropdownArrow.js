function closeMarketDropdownArrows() {
  document.querySelectorAll(".market_select_wrap.is-open").forEach((wrap) => {
    wrap.classList.remove("is-open");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const wraps = document.querySelectorAll(".market_select_wrap");

  wraps.forEach((wrap) => {
    const select = wrap.querySelector("select");

    if (!select) {
      return;
    }

    select.addEventListener("mousedown", () => {
      const isAlreadyOpen = wrap.classList.contains("is-open");
      closeMarketDropdownArrows();

      if (!isAlreadyOpen) {
        wrap.classList.add("is-open");
      }
    });

    select.addEventListener("keydown", (event) => {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
        closeMarketDropdownArrows();
        wrap.classList.add("is-open");
      }

      if (event.key === "Escape") {
        wrap.classList.remove("is-open");
      }
    });

    select.addEventListener("change", () => {
      wrap.classList.remove("is-open");
    });

    select.addEventListener("blur", () => {
      window.setTimeout(() => {
        wrap.classList.remove("is-open");
      }, 120);
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".market_select_wrap")) {
      closeMarketDropdownArrows();
    }
  });
});
