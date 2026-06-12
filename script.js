// ==========================================================================
//  Theme toggle (dark / light) + language toggle (EN / 中文)
//  Plain vanilla JS, no dependencies. Preferences persist in localStorage.
// ==========================================================================

(function () {
  var root = document.documentElement;

  // ---------- Theme ----------
  var themeIcon = document.querySelector("#theme-toggle i");

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    } else {
      root.removeAttribute("data-theme");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  }

  // Sync the icon with whatever the pre-paint inline script already applied.
  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });

  // Follow system changes only when the user hasn't picked a theme manually.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (!localStorage.getItem("theme")) applyTheme(e.matches ? "dark" : "light");
  });

  // ---------- Language ----------
  // Every translatable element carries data-en and/or data-zh attributes.
  var langNodes = document.querySelectorAll("[data-en], [data-zh]");

  function applyLang(lang) {
    root.setAttribute("lang", lang);
    root.setAttribute("data-lang", lang);
    langNodes.forEach(function (node) {
      var text = node.getAttribute("data-" + lang);
      if (text !== null) node.textContent = text;
    });
  }

  applyLang(localStorage.getItem("lang") || "en");

  document.getElementById("lang-toggle").addEventListener("click", function () {
    var next = root.getAttribute("data-lang") === "zh" ? "en" : "zh";
    localStorage.setItem("lang", next);
    applyLang(next);
  });
})();
