// Taxi view: reveals the button that opens the full-screen dialog and hides
// the plain-text fallback. Without JavaScript only the fallback is shown.
(function () {
  var button = document.querySelector("[data-taxi-open]");
  var dialog = document.getElementById("taxi-view");
  if (!button || !dialog || typeof dialog.showModal !== "function") {
    return;
  }

  document.querySelectorAll("[data-taxi-fallback]").forEach(function (el) {
    el.hidden = true;
  });
  button.hidden = false;
  button.addEventListener("click", function () {
    dialog.showModal();
  });
  // A native modal dialog closes with the Escape key.
})();
