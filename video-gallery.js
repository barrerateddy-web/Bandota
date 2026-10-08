/* =============================================================
   Galería de videos — página Videos
   Carrete horizontal: el video activo queda al centro reproduciéndose,
   los demás se ven a los lados desvanecidos (100% en el centro, 10%
   en los extremos). Deslizar o usar las flechas mueve el carrete —
   el video que ya pasó queda hacia la izquierda. El video central
   tiene sonido/like/compartir; los que están a los lados son solo
   vista previa.
   ============================================================= */
(function () {
  "use strict";

  var items = window.VIDEO_GALLERY_DATA || [];
  var scroller = document.querySelector("[data-reel-scroller]");
  var prevBtn = document.querySelector("[data-reel-prev]");
  var nextBtn = document.querySelector("[data-reel-next]");
  if (!scroller || !items.length) return;

  var globalMuted = true;
  var likes = {};
  try { likes = JSON.parse(localStorage.getItem("bandota_likes") || "{}"); } catch (e) { /* ignore */ }

  var ICONS = {
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-6.7-4.3-9.3-8.1C.7 10 1.4 6.3 4.6 4.9c2.3-1 4.8-.2 6.2 1.6l1.2 1.5 1.2-1.5c1.4-1.8 3.9-2.6 6.2-1.6 3.2 1.4 3.9 5.1 1.9 8C18.7 16.7 12 21 12 21z"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="10.6" x2="15.4" y2="6.4"/><line x1="8.6" y1="13.4" x2="15.4" y2="17.6"/></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/><path d="M18.5 5.5a9 9 0 010 13"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0012.04 2m0 1.67c2.21 0 4.29.86 5.85 2.42a8.23 8.23 0 012.42 5.82c0 4.55-3.71 8.25-8.27 8.25a8.3 8.3 0 01-4.21-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.26-4.4c0-4.55 3.71-8.23 8.26-8.23"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1"/><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>'
  };

  function shareUrlFor(id) {
    return location.origin + location.pathname.replace(/[^/]*$/, "") + "videos.html#video-" + id;
  }

  function buildReel(item, isClone) {
    var reel = document.createElement("div");
    reel.className = "reel";
    if (isClone) {
      reel.classList.add("reel-clone");
    } else {
      reel.id = "video-" + item.id;
    }

    var video = document.createElement("video");
    video.src = item.video;
    video.poster = item.poster;
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.addEventListener("ended", function () {
      if (reel === activeCard) goNext();
    });

    var muteBtn = document.createElement("button");
    muteBtn.type = "button";
    muteBtn.className = "reel-mute";
    muteBtn.setAttribute("aria-label", "Activar o silenciar sonido");
    muteBtn.innerHTML = ICONS.mute;
    muteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      globalMuted = !globalMuted;
      scroller.querySelectorAll("video").forEach(function (v) { v.muted = globalMuted; });
      scroller.querySelectorAll(".reel-mute").forEach(function (b) { b.innerHTML = globalMuted ? ICONS.mute : ICONS.sound; });
    });

    var caption = document.createElement("p");
    caption.className = "reel-caption";
    caption.textContent = item.caption;

    var actions = document.createElement("div");
    actions.className = "reel-actions";

    var likeBtn = document.createElement("button");
    likeBtn.type = "button";
    likeBtn.className = "reel-action";
    if (likes[item.id]) likeBtn.classList.add("is-liked");
    likeBtn.setAttribute("aria-label", "Me gusta");
    likeBtn.innerHTML = '<span class="reel-action-icon">' + ICONS.heart + '</span><span class="reel-action-label">Me gusta</span>';
    likeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      likes[item.id] = !likes[item.id];
      likeBtn.classList.toggle("is-liked", !!likes[item.id]);
      try { localStorage.setItem("bandota_likes", JSON.stringify(likes)); } catch (err) { /* ignore */ }
    });

    var shareBtn = document.createElement("button");
    shareBtn.type = "button";
    shareBtn.className = "reel-action";
    shareBtn.setAttribute("aria-label", "Compartir");
    shareBtn.innerHTML = '<span class="reel-action-icon">' + ICONS.share + '</span><span class="reel-action-label">Compartir</span>';

    var shareMenu = document.createElement("div");
    shareMenu.className = "reel-share-menu";
    var url = shareUrlFor(item.id);
    shareMenu.innerHTML =
      '<button type="button" data-wa>' + ICONS.whatsapp + " WhatsApp</button>" +
      '<button type="button" data-copy>' + ICONS.link + " Copiar link</button>";

    shareBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (navigator.share) {
        navigator.share({ title: "LA BANDOTA", text: item.caption, url: url }).catch(function () { /* cancelado */ });
      } else {
        scroller.querySelectorAll(".reel-share-menu.is-open").forEach(function (m) { if (m !== shareMenu) m.classList.remove("is-open"); });
        shareMenu.classList.toggle("is-open");
      }
    });
    shareMenu.querySelector("[data-wa]").addEventListener("click", function (e) {
      e.stopPropagation();
      window.open("https://wa.me/?text=" + encodeURIComponent(item.caption + " " + url), "_blank", "noopener");
      shareMenu.classList.remove("is-open");
    });
    shareMenu.querySelector("[data-copy]").addEventListener("click", function (e) {
      e.stopPropagation();
      if (navigator.clipboard) navigator.clipboard.writeText(url).catch(function () { /* ignore */ });
      shareMenu.classList.remove("is-open");
    });

    actions.appendChild(likeBtn);
    actions.appendChild(shareBtn);

    reel.appendChild(video);
    reel.appendChild(muteBtn);
    reel.appendChild(caption);
    reel.appendChild(actions);
    reel.appendChild(shareMenu);

    reel.addEventListener("click", function (e) {
      if (e.target.closest(".reel-actions") || e.target.closest(".reel-mute") || e.target.closest(".reel-share-menu")) return;
      if (!reel.classList.contains("is-active")) {
        scrollCardIntoView(reel);
        return;
      }
      if (video.paused) video.play().catch(function () { /* ignore */ }); else video.pause();
    });

    return reel;
  }

  items.forEach(function (item) {
    scroller.appendChild(buildReel(item, false));
  });

  var N = items.length;
  function itemAt(i) { return items[((i % N) + N) % N]; }

  // Bucle infinito: se clonan los 2 videos finales antes del primero y
  // los 2 iniciales después del último. Así la fila de 5 siempre tiene
  // vecinos de verdad en los extremos (penúltimo·último·PRIMERO·2do·3ro,
  // y así sucesivamente) y nunca se "acaba" — ver loopTargetIndex más abajo,
  // que reubica el scroll sin que se note en cuanto se entra a una zona clonada.
  var REAL_OFFSET = 2;
  scroller.insertBefore(buildReel(itemAt(N - 1), true), scroller.firstChild);
  scroller.insertBefore(buildReel(itemAt(N - 2), true), scroller.firstChild);
  scroller.appendChild(buildReel(itemAt(0), true));
  scroller.appendChild(buildReel(itemAt(1), true));

  var cards = Array.from(scroller.children);
  var videos = cards.map(function (c) { return c.querySelector("video"); });
  var activeCard = null;

  function setActive(card) {
    if (card === activeCard) return;
    if (activeCard) {
      activeCard.classList.remove("is-active");
      var prevVideo = activeCard.querySelector("video");
      prevVideo.pause();
    }
    activeCard = card;
    card.classList.add("is-active");
    var video = card.querySelector("video");
    video.muted = globalMuted;
    video.play().catch(function () { /* ignore */ });
  }

  // Opacidad/escala fijas según la posición respecto al video activo
  // (-2 ... +2 = 5 videos visibles): 20% · 50% · 100% · 50% · 30%.
  // El activo (0) crece por encima de su tamaño base (ver .reel en
  // styles.css, que deja la altura más corta para darle ese margen)
  // para que se note mucho más que los demás.
  var OPACITY_BY_OFFSET = { "-2": 0.2, "-1": 0.5, "0": 1, "1": 0.5, "2": 0.3 };
  var SCALE_BY_OFFSET = { "-2": 0.82, "-1": 0.92, "0": 1.17, "1": 0.92, "2": 0.86 };
  var FAR_OPACITY = 0.08;
  var FAR_SCALE = 0.78;

  function updateCarousel() {
    var rect = scroller.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var closestIndex = 0;
    var closestDist = Infinity;

    cards.forEach(function (card, i) {
      var cardRect = card.getBoundingClientRect();
      var cardCenter = cardRect.left + cardRect.width / 2;
      var dist = Math.abs(cardCenter - centerX);
      if (dist < closestDist) { closestDist = dist; closestIndex = i; }
    });

    cards.forEach(function (card, i) {
      var offset = i - closestIndex;
      var opacity = OPACITY_BY_OFFSET[offset];
      var scale = SCALE_BY_OFFSET[offset];
      card.style.opacity = (opacity === undefined ? FAR_OPACITY : opacity).toFixed(3);
      card.style.transform = "scale(" + (scale === undefined ? FAR_SCALE : scale).toFixed(3) + ")";
    });

    setActive(cards[closestIndex]);
  }

  function scrollCardIntoView(card, behavior) {
    var targetLeft = card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2;
    scroller.scrollTo({ left: targetLeft, behavior: behavior || "smooth" });
  }

  // Mapea un card-clon (índice en `cards`) al card real equivalente,
  // para saltar el scroll ahí apenas se detiene — sin animación, así
  // el salto no se percibe y el carrete puede girar sin fin.
  function loopTargetIndex(idx) {
    if (idx === 0) return N;             // clon del penúltimo -> real
    if (idx === 1) return N + 1;         // clon del último -> real
    if (idx === cards.length - 2) return REAL_OFFSET;       // clon del 1ro -> real
    if (idx === cards.length - 1) return REAL_OFFSET + 1;   // clon del 2do -> real
    return -1;
  }

  function maybeLoopReset() {
    var idx = cards.indexOf(activeCard);
    var targetIdx = loopTargetIndex(idx);
    if (targetIdx === -1) return;

    var cloneCard = cards[idx];
    var targetCard = cards[targetIdx];
    var cloneVideo = cloneCard.querySelector("video");
    var targetVideo = targetCard.querySelector("video");
    var delta = targetCard.offsetLeft - cloneCard.offsetLeft;

    scroller.scrollLeft += delta;
    if (cloneVideo && targetVideo) targetVideo.currentTime = cloneVideo.currentTime || 0;
    updateCarousel();
  }

  var ticking = false;
  var resetTimer = null;
  scroller.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () { updateCarousel(); ticking = false; });
    }
    clearTimeout(resetTimer);
    resetTimer = setTimeout(maybeLoopReset, 140);
  });
  window.addEventListener("resize", updateCarousel);

  function goPrev() {
    var idx = cards.indexOf(activeCard);
    if (idx > 0) scrollCardIntoView(cards[idx - 1]);
  }
  function goNext() {
    var idx = cards.indexOf(activeCard);
    if (idx < cards.length - 1) scrollCardIntoView(cards[idx + 1]);
  }

  if (prevBtn) prevBtn.addEventListener("click", goPrev);
  if (nextBtn) nextBtn.addEventListener("click", goNext);

  var startCard = cards[REAL_OFFSET] || cards[0];
  if (location.hash.indexOf("#video-") === 0) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) startCard = target;
  }
  requestAnimationFrame(function () {
    scrollCardIntoView(startCard, "auto");
    updateCarousel();
  });
})();
