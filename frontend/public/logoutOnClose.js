const suppressLogoutKey = "suppressLogoutOnClose";

function markNavigationIntent() {
  sessionStorage.setItem(suppressLogoutKey, "true");
}

function clearNavigationIntent() {
  sessionStorage.removeItem(suppressLogoutKey);
}

window.addEventListener("pageshow", clearNavigationIntent);

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (!link) {
    return;
  }

  if (link.target === "_blank" || link.hasAttribute("download")) {
    return;
  }

  markNavigationIntent();
});

document.addEventListener("submit", () => {
  markNavigationIntent();
});

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (event.key === "F5" || ((event.ctrlKey || event.metaKey) && key === "r")) {
    markNavigationIntent();
  }
});

window.addEventListener("pagehide", () => {
  if (sessionStorage.getItem(suppressLogoutKey) === "true") {
    return;
  }

  navigator.sendBeacon("logout.php");
});
