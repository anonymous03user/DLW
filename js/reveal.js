/* ============================================================
   reveal.js — the orchestrated page-load entrance.
   Each .reveal fades + rises as it enters the viewport. Above-fold
   elements are already intersecting on load, so they animate in
   immediately with their inline --i stagger. Degrades safely:
   no IntersectionObserver or reduced-motion -> everything shown.
   (`html.js` is set by a one-line inline head script so nothing
   flashes visible before this runs.)

   window.__reveal(el) lets render.js hand its JSON-built elements
   (offer cards, event rows, bio) to the same choreography, so the
   entrance system is total — it doesn't break where the client-
   editable content appears.
   ============================================================ */
(function () {
  "use strict";
  var els = [].slice.call(document.querySelectorAll(".reveal"));

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showAll() { els.forEach(function (el) { el.classList.add("in"); }); }

  if (reduce || !("IntersectionObserver" in window)) {
    showAll();
    /* dynamic elements: reveal instantly, at rest */
    window.__reveal = function (el) { el.classList.add("in"); };
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

  /* Anything already inside the first viewport joins the load
     choreography IMMEDIATELY (its --i stagger still plays). The -8%
     bottom margin is for scroll reveals only — leaving load-time
     elements in that dead band means they animate at some arbitrary
     later moment (e.g. when an auditor nudges the viewport), which is
     both janky and how text gets sampled mid-fade at sub-AA contrast. */
  els.forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      requestAnimationFrame(function () { el.classList.add("in"); });
    } else {
      io.observe(el);
    }
  });

  /* dynamic elements (render.js): join the same observer. The
     double-rAF lets the browser paint the hidden at-rest state first
     so the transition actually runs on insert. */
  window.__reveal = function (el) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { io.observe(el); });
    });
  };

  /* hard fallback: never leave anything NEAR THE VIEWPORT hidden.
     Scoped to ~1.5 screens so below-fold elements keep their entrance
     for when the reader actually scrolls to them (the observer still
     owns those; this only rescues a silently-broken observer). */
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.5) {
          el.classList.add("in");
        }
      });
    }, 2500);
  });
})();
