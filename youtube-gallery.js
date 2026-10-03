/* =============================================================
   Carrete de YouTube — página Videos
   Un video destacado (grande) + miniaturas de los demás debajo.
   Clic en una miniatura: ese video pasa a destacado, y el que
   estaba destacado baja al grupo de miniaturas.
   ============================================================= */
(function () {
  "use strict";

  var state = (window.YOUTUBE_GALLERY_DATA || []).slice();
  var featuredBox = document.querySelector("[data-yt-featured]");
  var thumbsRow = document.querySelector("[data-yt-thumbs]");
  var caption = document.querySelector("[data-yt-caption]");
  if (!featuredBox || !thumbsRow || !state.length) return;

  function embedUrl(id, autoplay) {
    return "https://www.youtube-nocookie.com/embed/" + id + (autoplay ? "?autoplay=1" : "");
  }

  function renderFeatured(autoplay) {
    var item = state[0];
    var iframe = document.createElement("iframe");
    iframe.src = embedUrl(item.id, autoplay);
    iframe.title = item.title + " — Teddy & LA BANDOTA";
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    featuredBox.innerHTML = "";
    featuredBox.appendChild(iframe);
    if (caption) caption.textContent = "Video destacado — " + item.title;
  }

  function renderThumbs() {
    thumbsRow.innerHTML = "";
    state.slice(1).forEach(function (item, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "yt-thumb";
      btn.setAttribute("aria-label", "Reproducir: " + item.title);
      btn.innerHTML =
        '<img src="https://img.youtube.com/vi/' + item.id + '/hqdefault.jpg" alt="" loading="lazy" />' +
        '<span class="yt-thumb-play"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,.35)" stroke="currentColor" stroke-width="1"/><path d="M10 8l6 4-6 4V8z"/></svg></span>';
      btn.addEventListener("click", function () {
        var realIndex = i + 1;
        var temp = state[0];
        state[0] = state[realIndex];
        state[realIndex] = temp;
        renderFeatured(true);
        renderThumbs();
      });
      thumbsRow.appendChild(btn);
    });
  }

  renderFeatured(false);
  renderThumbs();
})();
