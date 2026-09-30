/* =============================================================
   Galería de videos — página Videos
   Cuadrícula tipo perfil de Instagram: clic en una miniatura abre
   el video en grande, con flechas para pasar al siguiente/anterior.
   ============================================================= */
(function () {
  "use strict";

  var grid = document.querySelector("[data-video-grid]");
  var lightbox = document.querySelector("[data-video-lightbox]");
  if (!grid || !lightbox) return;

  var items = Array.from(grid.querySelectorAll("[data-shortcode]"));

  items.forEach(function (el) {
    var img = el.querySelector("img");
    if (img) img.addEventListener("error", function () { el.classList.add("is-fallback"); }, { once: true });
  });

  var stage = lightbox.querySelector("[data-lightbox-stage]");
  var counter = lightbox.querySelector("[data-lightbox-counter]");
  var closeBtn = lightbox.querySelector("[data-lightbox-close]");
  var prevBtn = lightbox.querySelector("[data-lightbox-prev]");
  var nextBtn = lightbox.querySelector("[data-lightbox-next]");
  var current = 0;

  function processEmbeds(attemptsLeft) {
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    } else if (attemptsLeft > 0) {
      setTimeout(function () { processEmbeds(attemptsLeft - 1); }, 400);
    }
  }

  function render() {
    var shortcode = items[current].getAttribute("data-shortcode");
    stage.innerHTML =
      '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/' + shortcode + '/" data-instgrm-version="14">' +
      '<a href="https://www.instagram.com/p/' + shortcode + '/" target="_blank" rel="noopener">Ver esta publicación en Instagram</a>' +
      "</blockquote>";
    processEmbeds(10);
    if (counter) counter.textContent = (current + 1) + " / " + items.length;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === items.length - 1;
  }

  function open(i) {
    current = i;
    render();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.hidden = true;
    stage.innerHTML = "";
    document.body.style.overflow = "";
  }

  items.forEach(function (el, i) {
    el.addEventListener("click", function () { open(i); });
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) close(); });

  prevBtn.addEventListener("click", function () {
    if (current === 0) return;
    current -= 1;
    render();
  });
  nextBtn.addEventListener("click", function () {
    if (current === items.length - 1) return;
    current += 1;
    render();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft" && current > 0) { current -= 1; render(); }
    if (e.key === "ArrowRight" && current < items.length - 1) { current += 1; render(); }
  });
})();
