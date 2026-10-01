/* =============================================================
   Galería de videos — página Videos
   Cuadrícula con videos propios (no embeds de terceros): al pasar
   el cursor se reproduce en silencio la miniatura; al hacer clic se
   abre en grande sobre el fondo desenfocado, reproduciéndose de
   inmediato con sonido, con flechas para pasar al siguiente/anterior.
   ============================================================= */
(function () {
  "use strict";

  var grid = document.querySelector("[data-video-grid]");
  var lightbox = document.querySelector("[data-video-lightbox]");
  var items = window.VIDEO_GALLERY_DATA || [];
  if (!grid || !lightbox || !items.length) return;

  var stage = lightbox.querySelector("[data-lightbox-stage]");
  var counter = lightbox.querySelector("[data-lightbox-counter]");
  var closeBtn = lightbox.querySelector("[data-lightbox-close]");
  var prevBtn = lightbox.querySelector("[data-lightbox-prev]");
  var nextBtn = lightbox.querySelector("[data-lightbox-next]");
  var current = 0;

  /* -------- Cuadrícula: una tarjeta por video, con preview en hover -------- */
  items.forEach(function (item, i) {
    var card = document.createElement("button");
    card.type = "button";
    card.className = "video-grid-item";
    card.setAttribute("aria-label", "Reproducir: " + item.caption);

    var video = document.createElement("video");
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.poster = item.poster;
    video.src = item.video;

    var playIcon = document.createElement("span");
    playIcon.className = "video-grid-play";
    playIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,.35)" stroke="currentColor" stroke-width="1"/><path d="M10 8l6 4-6 4V8z"/></svg>';

    var caption = document.createElement("span");
    caption.className = "video-grid-caption";
    caption.textContent = item.caption;

    card.appendChild(video);
    card.appendChild(playIcon);
    card.appendChild(caption);

    card.addEventListener("mouseenter", function () {
      video.currentTime = 0;
      video.play().catch(function () { /* el navegador puede bloquear autoplay; no pasa nada */ });
    });
    card.addEventListener("mouseleave", function () {
      video.pause();
      video.currentTime = 0;
    });
    card.addEventListener("click", function () { open(i); });

    grid.appendChild(card);
  });

  var gridVideos = Array.from(grid.querySelectorAll("video"));

  /* -------- Lightbox: reproducción grande, inmediata, con sonido -------- */
  function render() {
    var item = items[current];
    stage.innerHTML = "";
    var video = document.createElement("video");
    video.src = item.video;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.className = "video-lightbox-video";
    stage.appendChild(video);

    var caption = document.createElement("p");
    caption.className = "video-lightbox-caption";
    caption.textContent = item.caption;
    stage.appendChild(caption);

    if (counter) counter.textContent = (current + 1) + " / " + items.length;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === items.length - 1;
  }

  function open(i) {
    gridVideos.forEach(function (v) { v.pause(); v.currentTime = 0; });
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
