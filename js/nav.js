/* ============================================================
   nav.js — mobile menu toggle, current-page marker, year stamp,
   header scroll shadow. The open mobile menu is a proper layer:
   Escape closes it, tapping the scrim closes it, and Tab is
   contained inside it (toggle + links) until it closes.
   ============================================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* Mobile menu */
    var toggle = document.querySelector(".site-header__toggle");
    var nav = document.getElementById("site-nav");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Menu");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    }

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
      });

      /* Close with Escape, returning focus to the button */
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
          setOpen(false);
          toggle.focus();
        }
      });

      /* Keep Tab inside the open menu (toggle + its links) so the
         keyboard can't wander into the scroll-locked page behind it */
      document.addEventListener("keydown", function (e) {
        if (e.key !== "Tab" || !nav.classList.contains("is-open")) return;
        var items = [toggle].concat([].slice.call(nav.querySelectorAll("a[href]")));
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      });

      /* Tap the scrim (anywhere outside the header) to close */
      document.addEventListener("click", function (e) {
        if (nav.classList.contains("is-open") && !e.target.closest(".site-header")) {
          setOpen(false);
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

    /* Header shadow once the page scrolls (passive: never blocks scroll) */
    var header = document.querySelector(".site-header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 4);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* Footer year */
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
