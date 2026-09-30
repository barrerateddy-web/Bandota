/* =============================================================
   Pasarela de videos — página Videos
   Carrusel horizontal: cada clic hace salir el video actual y
   entrar el siguiente/anterior, de izquierda a derecha.
   ============================================================= */
(function () {
  "use strict";

  var root = document.querySelector("[data-video-runway]");
  if (!root) return;

  var track = root.querySelector("[data-runway-track]");
  var slides = Array.from(track.children);
  var prevBtn = root.querySelector("[data-runway-prev]");
  var nextBtn = root.querySelector("[data-runway-next]");
  var counter = document.querySelector("[data-runway-counter]");
  var index = 0;

  function render() {
    track.style.transform = "translateX(-" + (index * 100) + "%)";
    if (counter) counter.textContent = (index + 1) + " / " + slides.length;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;
  }

  prevBtn.addEventListener("click", function () {
    if (index === 0) return;
    index -= 1;
    render();
  });

  nextBtn.addEventListener("click", function () {
    if (index === slides.length - 1) return;
    index += 1;
    render();
  });

  render();
})();
