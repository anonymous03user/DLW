/* ============================================================
   render.js — the whole "self-editable" layer.
   Reads the small JSON files in /data and fills marked spots:

     <div data-announcement>            first active announcement
     <div data-offerings>               offering cards (home)
     <ol  data-events data-limit="3">   upcoming dates (past auto-hidden)
     <div data-bio>                     short bio + monogram/headshot
     <span data-site="email">           any field from site.json
     <a   data-site-href="booking_url"> href from site.json

   Everything is plain DOM building (textContent, no innerHTML),
   so nothing in the data files can inject markup.
   ============================================================ */

(function () {
  "use strict";

  function fetchJSON(path) {
    return fetch(path).then(function (r) {
      if (!r.ok) throw new Error(path + " " + r.status);
      return r.json();
    });
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  /* Hand a built element to the page's entrance choreography
     (reveal.js), with a small per-item stagger. Falls back to
     "just show it" if reveal.js isn't there. */
  function reveal(node, i) {
    node.classList.add("reveal");
    if (i) node.style.setProperty("--i", String(i));
    if (window.__reveal) window.__reveal(node);
    else node.classList.add("in");
  }

  /* ---------- site.json — header/footer/contact spots ---------- */
  function applySite(site) {
    document.querySelectorAll("[data-site]").forEach(function (node) {
      var key = node.getAttribute("data-site");
      if (site[key]) node.textContent = site[key];
    });
    document.querySelectorAll("[data-site-href]").forEach(function (node) {
      var key = node.getAttribute("data-site-href");
      if (!site[key]) return;
      if (key === "email") node.href = "mailto:" + site[key];
      else node.href = site[key];
    });
  }

  /* ---------- announcements.json — the home banner ---------- */
  function renderAnnouncement(data) {
    var spot = document.querySelector("[data-announcement]");
    if (!spot) return;
    var live = (data.announcements || []).filter(function (a) { return a.active; })[0];
    if (!live) { spot.hidden = true; return; }
    var inner = el("p", "announce__text", live.text + " ");
    if (live.url && live.link_label) {
      var link = el("a", "announce__link", live.link_label);
      link.href = live.url;
      inner.appendChild(link);
    }
    spot.appendChild(inner);
    /* No entrance animation here, deliberately: the chip lands AFTER a
       fetch, above the fold, into height-reserved space. Fading it in
       would mean above-fold text at blended (sub-AA) contrast whenever
       anything samples the page mid-fade; appearing at rest is quieter. */
    spot.hidden = false;
  }

  /* ---------- offerings.json — home cards ---------- */
  function renderOfferings(data) {
    var spot = document.querySelector("[data-offerings]");
    if (!spot) return;
    var items = (data.offerings || []).slice().sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });
    items.forEach(function (o, idx) {
      /* a real link when there's a destination; a plain card otherwise
         (no focusable href="#" dead-ends for keyboard users) */
      var card = el(o.url ? "a" : "div", "offer-card");
      if (o.url) card.href = o.url;
      /* "featured": true in offerings.json makes this the full-width
         lead card of the 1 + 3 editorial composition */
      if (o.featured) card.classList.add("offer-card--featured");
      var num = el("span", "offer-card__num", (idx < 9 ? "0" : "") + (idx + 1));
      num.setAttribute("aria-hidden", "true"); /* decorative index mark */
      card.appendChild(num);
      card.appendChild(el("h3", "offer-card__title", o.title));
      card.appendChild(el("p", "offer-card__summary", o.summary));
      card.appendChild(el("span", "offer-card__cta", (o.cta || "Learn more") + " →"));
      spot.appendChild(card);
      reveal(card, idx);
    });
  }

  /* ---------- events.json — upcoming dates ---------- */
  function renderEvents(data) {
    document.querySelectorAll("[data-events]").forEach(function (spot) {
      var limit = parseInt(spot.getAttribute("data-limit") || "0", 10);
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var upcoming = (data.events || [])
        .filter(function (e) { return new Date(e.date + "T23:59:59") >= today; })
        .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      if (limit > 0) upcoming = upcoming.slice(0, limit);

      if (!upcoming.length) {
        var empty = el("li", "event-row event-row--empty",
          "No dates are on the calendar right now. New retreats and talks are announced here first.");
        spot.appendChild(empty);
        reveal(empty);
        return;
      }
      var fmt = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
      upcoming.forEach(function (e, idx) {
        var row = el("li", "event-row");
        var when = el("div", "event-row__when");
        when.appendChild(el("span", "event-row__date", fmt.format(new Date(e.date + "T12:00:00"))));
        if (e.time) when.appendChild(el("span", "event-row__time", e.time));
        var what = el("div", "event-row__what");
        var title = el("h3", "event-row__title", e.title);
        if (e.tentative) {
          var flag = el("span", "event-row__flag", "Date to be confirmed");
          title.appendChild(flag);
        }
        what.appendChild(title);
        what.appendChild(el("p", "event-row__meta",
          [e.type, e.venue, e.city].filter(Boolean).join(" · ")));
        if (e.price) what.appendChild(el("p", "event-row__price", e.price));
        var act = el("div", "event-row__action");
        if (e.url) {
          var btn = el("a", "btn btn--ghost", e.action || "Details");
          btn.href = e.url;
          act.appendChild(btn);
        }
        row.appendChild(when); row.appendChild(what); row.appendChild(act);
        spot.appendChild(row);
        reveal(row, idx);
      });
    });
  }

  /* ---------- bio.json — the short official bio ---------- */
  function renderBio(data) {
    var spot = document.querySelector("[data-bio]");
    if (!spot) return;
    var figure = el("div", "bio-card__figure");
    if (data.headshot) {
      /* the chapel-window arch, echoing the story image's frame */
      figure.classList.add("bio-card__figure--arch");
      var img = document.createElement("img");
      img.src = data.headshot;
      img.alt = "Portrait of " + (data.name || "Dr. Leslie Wells");
      img.loading = "lazy";
      img.width = 480; img.height = 600;
      figure.appendChild(img);
    } else {
      /* No headshot set: the olive-framed LW monogram treatment. */
      figure.classList.add("bio-card__figure--monogram");
      figure.appendChild(el("span", "bio-card__monogram", "LW"));
      figure.appendChild(el("span", "bio-card__mark-name", data.name || "Dr. Leslie Wells"));
    }
    var body = el("div", "bio-card__body");
    body.appendChild(el("p", "bio-card__roles", data.roles || ""));
    body.appendChild(el("p", "bio-card__short", data.short || ""));
    var more = el("a", "bio-card__more", "Read her story →");
    more.href = "/story.html";
    body.appendChild(more);
    spot.appendChild(figure);
    spot.appendChild(body);
    reveal(figure);
    reveal(body, 1);
  }

  /* ---------- boot: fetch only what the page asks for ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    fetchJSON("/data/site.json").then(applySite).catch(function () {});
    if (document.querySelector("[data-announcement]"))
      fetchJSON("/data/announcements.json").then(renderAnnouncement).catch(function () {});
    if (document.querySelector("[data-offerings]"))
      fetchJSON("/data/offerings.json").then(renderOfferings).catch(function () {});
    if (document.querySelector("[data-events]"))
      fetchJSON("/data/events.json").then(renderEvents).catch(function () {});
    if (document.querySelector("[data-bio]"))
      fetchJSON("/data/bio.json").then(renderBio).catch(function () {});
  });
})();
