/* ============================================================
   reveal.js — the orchestrated page-load entrance.
   Each .reveal fades + rises as it enters the viewport. Above-fold
   elements are already intersecting on load, so they animate in
   immediately with their inline --i stagger. Degrades safely:
   no IntersectionObserver or reduced-motion -> everything shown.
   (`html.js` is set by a one-line inline head script so nothing
   flashes visible before this runs.)
   ============================================================ */
(function () {
  "use strict";
  var els = [].slice.call(document.querySelectorAll(".reveal"));
  if (!els.length) return;

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showAll() { els.forEach(function (el) { el.classList.add("in"); }); }

  if (reduce || !("IntersectionObserver" in window)) { showAll(); return; }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

  els.forEach(function (el) { io.observe(el); });

  /* hard fallback: never leave anything hidden */
  window.addEventListener("load", function () {
    setTimeout(function () {
      els.forEach(function (el) {
        if (!el.classList.contains("in")) el.classList.add("in");
      });
    }, 2500);
  });
})();
