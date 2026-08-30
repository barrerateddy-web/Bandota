(function () {
  "use strict";

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.from((scope || document).querySelectorAll(sel)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); }
  }

  /* ---------------------------------------------------------
     Nav: scroll state + mobile toggle + smooth anchor scroll
  --------------------------------------------------------- */
  function initNav() {
    var nav = $("[data-nav]");
    if (!nav) return;
    var toggle = $("[data-nav-toggle]", nav);
    var menu = $("[data-nav-menu]", nav);

    function onScroll() {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $$("a", menu).forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function setupSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 76;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navOffset,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ---------------------------------------------------------
     Mouse-reactive gradient (hero) — signature effect
  --------------------------------------------------------- */
  function initMouseGradient() {
    var el = $("[data-mouse-gradient]");
    if (!el || !fineHover) return;
    var raf = null, mx = 30, my = 30;

    function apply() {
      document.documentElement.style.setProperty("--mx", mx + "%");
      document.documentElement.style.setProperty("--my", my + "%");
      raf = null;
    }
    window.addEventListener("mousemove", function (e) {
      mx = (e.clientX / window.innerWidth) * 100;
      my = (e.clientY / window.innerHeight) * 100;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     Split text into lines (preserves <br> and inline <em>)
  --------------------------------------------------------- */
  function initSplitLines() {
    $$('[data-split="lines"]').forEach(function (el) {
      if (el.dataset.splitDone) return;
      el.dataset.splitDone = "1";

      var nodes = Array.from(el.childNodes);
      var lines = [[]];
      nodes.forEach(function (node) {
        if (node.nodeName === "BR") {
          lines.push([]);
        } else {
          lines[lines.length - 1].push(node);
        }
      });

      el.innerHTML = "";
      lines.forEach(function (lineNodes) {
        if (!lineNodes.length) return;
        var lineWrap = document.createElement("span");
        lineWrap.className = "split-line";
        var inner = document.createElement("span");
        lineNodes.forEach(function (n) { inner.appendChild(n.cloneNode(true)); });
        lineWrap.appendChild(inner);
        el.appendChild(lineWrap);
      });
    });
  }

  /* ---------------------------------------------------------
     Scroll reveal — IntersectionObserver + safety timeout
  --------------------------------------------------------- */
  function initReveals() {
    var targets = $$(".reveal");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });

    targets.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      targets.forEach(function (el) {
        if (!el.classList.contains("is-visible") && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ---------------------------------------------------------
     Count-up numbers for stats
  --------------------------------------------------------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count-to") || "0");
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduced) { el.textContent = target + suffix; return; }

    var duration = 1400;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCountUp() {
    var stats = $$("[data-count-to]");
    if (!stats.length) return;

    if (!("IntersectionObserver" in window)) {
      stats.forEach(animateCount);
      return;
    }

    var done = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !done) {
          done = true;
          stats.forEach(animateCount);
          io.disconnect();
        }
      });
    }, { threshold: 0.05 });

    var wrap = $("[data-stats]");
    if (wrap) io.observe(wrap);
  }

  /* ---------------------------------------------------------
     Contact form — demo submit (no backend wired)
  --------------------------------------------------------- */
  function initContactForm() {
    var form = $("[data-contact-form]");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      form.classList.add("is-sent");
    });
  }

  /* ---------------------------------------------------------
     Boot
  --------------------------------------------------------- */
  function boot() {
    safe(initNav, "initNav");
    safe(setupSmoothScroll, "setupSmoothScroll");
    safe(initMouseGradient, "initMouseGradient");
    safe(initSplitLines, "initSplitLines");
    safe(initReveals, "initReveals");
    safe(initCountUp, "initCountUp");
    safe(initContactForm, "initContactForm");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
