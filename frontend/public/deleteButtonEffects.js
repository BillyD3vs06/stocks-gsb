function activateDeleteButton(button) {
  if (!button || button.dataset.warningActive === "true") {
    return;
  }

  button.dataset.warningActive = "true";
  button.dataset.originalText = button.dataset.originalText || button.textContent.trim();
  button.textContent = `${button.dataset.originalText}!`;
  button.classList.add("is-warning");
}

function resetDeleteButton(button) {
  if (!button || button.dataset.warningActive !== "true") {
    return;
  }

  button.dataset.warningActive = "false";
  button.textContent = button.dataset.originalText || "Delete.";
  button.classList.remove("is-warning");
}

document.addEventListener("mouseover", (event) => {
  const button = event.target.closest(".newsDelete");

  if (!button) {
    return;
  }

  activateDeleteButton(button);
});

document.addEventListener("mouseout", (event) => {
  const button = event.target.closest(".newsDelete");

  if (!button) {
    return;
  }

  if (button.contains(event.relatedTarget)) {
    return;
  }

  resetDeleteButton(button);
});

document.addEventListener("focusin", (event) => {
  const button = event.target.closest(".newsDelete");

  if (!button) {
    return;
  }

  activateDeleteButton(button);
});

document.addEventListener("focusout", (event) => {
  const button = event.target.closest(".newsDelete");

  if (!button) {
    return;
  }

  resetDeleteButton(button);
});
