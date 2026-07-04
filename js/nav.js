/* ============================================================
   nav.js — mobile menu toggle, current-page marker, year stamp.
   ============================================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* Mobile menu */
    var toggle = document.querySelector(".site-header__toggle");
    var nav = document.getElementById("site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        nav.classList.toggle("is-open", !open);
        document.body.classList.toggle("nav-open", !open);
      });
      /* Close with Escape, returning focus to the button */
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
          toggle.setAttribute("aria-expanded", "false");
          nav.classList.remove("is-open");
          document.body.classList.remove("nav-open");
          toggle.focus();
        }
      });
    }

    /* Mark the current page in the nav */
    var here = location.pathname.replace(/\/$/, "") || "/index.html";
    if (here === "/") here = "/index.html";
    document.querySelectorAll(".site-header__nav a[href]").forEach(function (a) {
      var target = a.getAttribute("href").split("#")[0];
      if (target === here || (target === "/" && here === "/index.html")) {
        a.setAttribute("aria-current", "page");
      }
    });

    /* Footer year */
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
