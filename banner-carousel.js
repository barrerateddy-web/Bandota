/* =============================================================
   Carrusel de banners — Home
   Crossfade automático entre slides. Autoplay cada 5s, pausa al
   pasar el mouse, navegación por puntos.
   ============================================================= */
(function () {
  "use strict";

  var root = document.querySelector("[data-banner-carousel]");
  if (!root) return;

  var slides = Array.from(root.querySelectorAll(".banner-slide"));
  var dotsWrap = root.querySelector(".banner-carousel-dots");
  if (slides.length < 2) return;

  var current = 0;
  var intervalMs = 5000;
  var timer = null;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dots = slides.map(function (_, i) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", "Ir al banner " + (i + 1));
    btn.addEventListener("click", function () { goTo(i); resetTimer(); });
    dotsWrap.appendChild(btn);
    return btn;
  });

  function render() {
    slides.forEach(function (slide, i) { slide.classList.toggle("is-active", i === current); });
    dots.forEach(function (dot, i) { dot.classList.toggle("is-active", i === current); });
  }

  function goTo(i) {
    current = (i + slides.length) % slides.length;
    render();
  }

  function next() { goTo(current + 1); }

  function resetTimer() {
    if (timer) clearInterval(timer);
    if (reduceMotion) return;
    timer = setInterval(next, intervalMs);
  }

  render();
  resetTimer();

  root.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
  root.addEventListener("mouseleave", resetTimer);
})();
