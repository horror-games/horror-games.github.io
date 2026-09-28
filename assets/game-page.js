(function () {
  var frame = document.getElementById("gameFrame");
  var loader = document.getElementById("playerLoader");
  var shell = document.getElementById("playerShell");
  var fullscreenButton = document.getElementById("fullscreenButton");
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");

  function hideLoader() {
    if (loader) loader.classList.add("is-hidden");
  }

  if (frame) {
    frame.addEventListener("load", hideLoader);
    window.setTimeout(hideLoader, 8000);
  }

  if (fullscreenButton && shell) {
    fullscreenButton.addEventListener("click", function () {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (shell.requestFullscreen) shell.requestFullscreen();
    });
  }

  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    mainNav.classList.remove("is-open");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );
      mainNav.classList.toggle("is-open", !isOpen);
    });
    mainNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".header-inner")) closeMenu();
    });
  }
})();
