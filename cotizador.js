(function () {
  "use strict";

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.from((scope || document).querySelectorAll(sel)); };

  var COMPANY_WHATSAPP = "573044777225";

  /* Paste here the URL you get after deploying the Google Apps Script backend
     (see /apps-script/cotizador-backend.gs.txt for the code + deployment steps).
     Empty by default — until it's set, the quote still works, it just skips the
     automatic Calendar/Meet booking and Sheets logging. */
  var COTIZADOR_WEBHOOK_URL = "";

  var BUSINESS_HOURS = { startHour: 9, endHour: 19, slotMinutes: 30, daysAhead: 14, excludeWeekday0: true };
  var BOGOTA_UTC_OFFSET_MINUTES = -5 * 60;

  function formatCOP(value) {
    return "$" + Math.round(value).toLocaleString("es-CO") + " COP";
  }

  function initCotizador() {
    var root = $("[data-cotizador]");
    if (!root || !window.COTIZADOR_DATA) return;

    var data = window.COTIZADOR_DATA;
    var state = {
      formatoId: null,
      packId: null,
      servicios: new Set(),
      fecha: null,   // "YYYY-MM-DD"
      hora: null,    // "HH:MM"
      nombre: "",
      whatsapp: "",
      ciudad: ""
    };

    var ofertaEl = $("[data-cotizador-oferta]", root);
    var formatosEl = $("[data-cotizador-formatos]", root);
    var packsEl = $("[data-cotizador-packs]", root);
    var serviciosEl = $("[data-cotizador-servicios]", root);
    var fechasEl = $("[data-cotizador-fechas]", root);
    var horasEl = $("[data-cotizador-horas]", root);
    var nombreInput = $("[data-cotizador-nombre]", root);
    var whatsappInput = $("[data-cotizador-whatsapp]", root);
    var ciudadInput = $("[data-cotizador-ciudad]", root);
    var submitBtn = $("[data-cotizador-submit]", root);
    var noteEl = $("[data-cotizador-note]", root);
    var successEl = $("[data-cotizador-success]", root);
    var errorEl = $("[data-cotizador-error]", root);

    /* -------- Left column: read-only listing of the real offer -------- */
    function renderOferta() {
      if (!ofertaEl) return;
      var html = "";

      html += '<div class="cotizador-oferta-block">';
      html += '<p class="cotizador-oferta-label">Formatos</p>';
      html += '<div class="format-grid">';
      data.formatos.forEach(function (f) {
        html += (
          '<div class="format-card">' +
            '<span class="format-size">' + f.resumen + '</span>' +
            '<h3>' + f.nombre + '</h3>' +
            '<p>' + f.descripcion + '</p>' +
            '<p class="format-duracion">' + f.duracion + '</p>' +
          '</div>'
        );
      });
      html += '</div></div>';

      html += '<div class="cotizador-oferta-block">';
      html += '<p class="cotizador-oferta-label">Servicios adicionales</p>';
      html += '<div class="format-grid">';
      data.servicios.forEach(function (s) {
        html += (
          '<div class="format-card">' +
            '<h3>' + s.nombre + '</h3>' +
            '<p>' + s.descripcion + '</p>' +
            '<p class="format-duracion">' + s.duracion + '</p>' +
          '</div>'
        );
      });
      html += '</div></div>';

      html += '<div class="cotizador-oferta-block">';
      html += '<p class="cotizador-oferta-label">Packs (cóctel + cena + banda)</p>';
      html += '<div class="format-grid">';
      data.packs.forEach(function (p) {
        html += (
          '<div class="format-card">' +
            '<h3>' + p.nombre + '</h3>' +
            '<p>' + p.descripcion + '</p>' +
          '</div>'
        );
      });
      html += '</div></div>';

      ofertaEl.innerHTML = html;
    }

    /* -------- Right column: selectable module -------- */
    function findFormato(id) { return data.formatos.find(function (f) { return f.id === id; }); }
    function findPack(id) { return data.packs.find(function (p) { return p.id === id; }); }
    function findServicio(id) { return data.servicios.find(function (s) { return s.id === id; }); }

    function optionCardHtml(id, nombre, descripcion, isActive) {
      return (
        '<button type="button" class="cotizador-option' + (isActive ? " is-selected" : "") + '" data-cotizador-value="' + id + '">' +
          '<span class="cotizador-option-name">' + nombre + '</span>' +
          '<span class="cotizador-option-desc">' + descripcion + '</span>' +
        '</button>'
      );
    }

    function renderFormatos() {
      formatosEl.innerHTML = data.formatos.map(function (f) {
        return optionCardHtml(f.id, f.nombre, f.resumen, state.formatoId === f.id);
      }).join("");
    }
    function renderPacks() {
      packsEl.innerHTML = data.packs.map(function (p) {
        return optionCardHtml(p.id, p.nombre, "Formato + cóctel + cena", state.packId === p.id);
      }).join("");
    }
    function renderServicios() {
      serviciosEl.innerHTML = data.servicios.map(function (s) {
        return optionCardHtml(s.id, s.nombre, s.duracion, state.servicios.has(s.id));
      }).join("");
    }

    function onFormatoClick(id) {
      state.formatoId = (state.formatoId === id) ? null : id;
      if (state.formatoId) state.packId = null;
      renderFormatos();
      renderPacks();
    }
    function onPackClick(id) {
      state.packId = (state.packId === id) ? null : id;
      if (state.packId) state.formatoId = null;
      renderFormatos();
      renderPacks();
    }
    function onServicioClick(id) {
      if (state.servicios.has(id)) state.servicios.delete(id); else state.servicios.add(id);
      renderServicios();
    }

    /* -------- Date / time picker (Bogotá business hours) -------- */
    function pad2(n) { return n < 10 ? "0" + n : "" + n; }
    function isoDate(d) { return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()); }
    function dayLabel(d) {
      return d.toLocaleDateString("es-CO", { weekday: "short", day: "numeric", month: "short" });
    }

    function renderFechas() {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var html = "";
      for (var i = 0; i < BUSINESS_HOURS.daysAhead; i++) {
        var d = new Date(today);
        d.setDate(d.getDate() + i);
        if (BUSINESS_HOURS.excludeWeekday0 && d.getDay() === 0) continue;
        var iso = isoDate(d);
        var isActive = state.fecha === iso;
        html += (
          '<button type="button" class="cotizador-day' + (isActive ? " is-selected" : "") + '" data-cotizador-fecha-value="' + iso + '">' +
            dayLabel(d) +
          '</button>'
        );
      }
      fechasEl.innerHTML = html;
    }

    function renderHoras() {
      if (!state.fecha) { horasEl.innerHTML = ""; return; }
      var now = new Date();
      var isToday = isoDate(now) === state.fecha;
      var nowMinutes = now.getHours() * 60 + now.getMinutes();

      var html = "";
      var totalMinutesStart = BUSINESS_HOURS.startHour * 60;
      var totalMinutesEnd = BUSINESS_HOURS.endHour * 60;
      for (var m = totalMinutesStart; m < totalMinutesEnd; m += BUSINESS_HOURS.slotMinutes) {
        if (isToday && m <= nowMinutes + 60) continue; // at least 1h notice
        var hh = pad2(Math.floor(m / 60));
        var mm = pad2(m % 60);
        var hora = hh + ":" + mm;
        var isActive = state.hora === hora;
        html += '<button type="button" class="cotizador-slot' + (isActive ? " is-selected" : "") + '" data-cotizador-hora-value="' + hora + '">' + hora + '</button>';
      }
      horasEl.innerHTML = html || '<p class="cotizador-no-slots">No quedan horarios ese día — elige otra fecha.</p>';
    }

    function onFechaClick(iso) {
      state.fecha = iso;
      state.hora = null;
      renderFechas();
      renderHoras();
    }
    function onHoraClick(hora) {
      state.hora = hora;
      renderHoras();
    }

    /* -------- Quote calculation -------- */
    function buildItems() {
      var items = [];
      if (state.packId) {
        var p = findPack(state.packId);
        if (p) items.push({ nombre: p.nombre, detalle: p.descripcion, valor: p.valor });
      } else if (state.formatoId) {
        var f = findFormato(state.formatoId);
        if (f) items.push({ nombre: f.nombre, detalle: f.resumen + " · " + f.duracion, valor: f.valor });
      }
      state.servicios.forEach(function (id) {
        var s = findServicio(id);
        if (s) items.push({ nombre: s.nombre, detalle: s.duracion, valor: s.valor });
      });
      return items;
    }
    function sumItems(items) {
      return items.reduce(function (acc, it) { return acc + it.valor; }, 0);
    }

    /* -------- WhatsApp message -------- */
    function buildMessage(items, total, meetInfo) {
      var lines = [];
      lines.push("Solicitud de cotización — LA BANDOTA (Bodas)");
      if (state.nombre) lines.push("Novios: " + state.nombre);
      if (state.ciudad) lines.push("Ciudad del evento: " + state.ciudad);
      lines.push("");
      lines.push("Selección:");
      items.forEach(function (it) {
        lines.push("• " + it.nombre + " — " + it.detalle);
      });
      lines.push("");
      lines.push("Total estimado: " + formatCOP(total));
      lines.push("");
      if (state.fecha && state.hora) {
        lines.push("Videollamada solicitada: " + state.fecha + " a las " + state.hora + " (hora Colombia)");
      }
      if (meetInfo && meetInfo.meetLink) {
        lines.push("Link de Meet (confirmado): " + meetInfo.meetLink);
      } else if (state.fecha && state.hora) {
        lines.push("(Te confirmamos el link de Meet por este mismo chat)");
      }
      lines.push("");
      lines.push("Te acabo de enviar por acá el PDF con el detalle formal de la cotización.");
      return lines.join("\n");
    }

    /* -------- Branded PDF -------- */
    function webpToPngDataUrl(url) {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function () {
          try {
            var canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            canvas.getContext("2d").drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
          } catch (e) { reject(e); }
        };
        img.onerror = reject;
        img.src = url;
      });
    }

    function generarPDF(items, total, meetInfo) {
      if (!window.jspdf || !window.jspdf.jsPDF) return Promise.resolve(null);
      var jsPDF = window.jspdf.jsPDF;
      var doc = new jsPDF({ unit: "pt", format: "a4" });
      var pageWidth = doc.internal.pageSize.getWidth();
      var margin = 48;
      var y = margin;

      var inkColor = [16, 11, 9];
      var accentColor = [193, 123, 46];
      var muteColor = [120, 110, 100];

      function drawHeader() {
        doc.setFillColor(inkColor[0], inkColor[1], inkColor[2]);
        doc.rect(0, 0, pageWidth, 110, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("LA BANDOTA", margin, 50);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(220, 190, 150);
        doc.text("Cotización de servicio — Bodas", margin, 70);
        doc.setTextColor(200, 190, 180);
        doc.setFontSize(9);
        doc.text("director@bandota.com  ·  +57 304 477 7225", margin, 88);
      }

      return webpToPngDataUrl("assets/img/logo-bandota-nav.webp").catch(function () { return null; }).then(function (logoDataUrl) {
        drawHeader();
        if (logoDataUrl) {
          try { doc.addImage(logoDataUrl, "PNG", pageWidth - margin - 70, 24, 70, 40); } catch (e) { /* ignore */ }
        }

        y = 140;
        doc.setTextColor(inkColor[0], inkColor[1], inkColor[2]);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text("Datos del evento", margin, y);
        y += 20;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10.5);
        doc.setTextColor(60, 50, 45);
        if (state.nombre) { doc.text("Novios: " + state.nombre, margin, y); y += 16; }
        if (state.ciudad) { doc.text("Ciudad del evento: " + state.ciudad, margin, y); y += 16; }
        if (state.fecha && state.hora) { doc.text("Videollamada: " + state.fecha + " a las " + state.hora + " (hora Colombia)", margin, y); y += 16; }
        if (meetInfo && meetInfo.meetLink) { doc.text("Link de Meet: " + meetInfo.meetLink, margin, y); y += 16; }
        y += 10;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(inkColor[0], inkColor[1], inkColor[2]);
        doc.text("Detalle de la cotización", margin, y);
        y += 10;
        doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.line(margin, y, pageWidth - margin, y);
        y += 22;

        items.forEach(function (it) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(inkColor[0], inkColor[1], inkColor[2]);
          doc.text(it.nombre, margin, y);
          doc.text(formatCOP(it.valor), pageWidth - margin, y, { align: "right" });
          y += 15;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(muteColor[0], muteColor[1], muteColor[2]);
          doc.text(it.detalle, margin, y);
          y += 22;
        });

        y += 6;
        doc.setDrawColor(200, 190, 180);
        doc.line(margin, y, pageWidth - margin, y);
        y += 24;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.text("Total estimado", margin, y);
        doc.text(formatCOP(total), pageWidth - margin, y, { align: "right" });
        y += 40;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(muteColor[0], muteColor[1], muteColor[2]);
        doc.text("Cotización preliminar, sujeta a confirmación de fecha y disponibilidad. Válida por 15 días.", margin, y, { maxWidth: pageWidth - margin * 2 });

        var fileName = "Cotizacion-LaBandota-" + (state.nombre ? state.nombre.replace(/[^a-z0-9]+/gi, "-") : "Boda") + ".pdf";
        doc.save(fileName);
        return true;
      });
    }

    /* -------- Backend (Calendar + Meet + Sheets), best-effort with timeout -------- */
    function solicitarAgendamiento(items, total) {
      if (!COTIZADOR_WEBHOOK_URL) return Promise.resolve(null);

      var payload = {
        tipo: "cotizacion-bodas",
        nombre: state.nombre,
        whatsapp: state.whatsapp,
        ciudad: state.ciudad,
        fecha: state.fecha,
        hora: state.hora,
        utcOffsetMinutes: BOGOTA_UTC_OFFSET_MINUTES,
        items: items,
        total: total,
        ts: new Date().toISOString()
      };

      var controller = (typeof AbortController !== "undefined") ? new AbortController() : null;
      var timeoutId = setTimeout(function () { if (controller) controller.abort(); }, 9000);

      return fetch(COTIZADOR_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        signal: controller ? controller.signal : undefined
      }).then(function (res) { return res.json(); })
        .then(function (json) { clearTimeout(timeoutId); return json && json.ok ? json : null; })
        .catch(function () { clearTimeout(timeoutId); return null; });
    }

    /* -------- Submit -------- */
    function showError(msg) {
      if (!errorEl) return;
      errorEl.textContent = msg;
      errorEl.hidden = false;
    }
    function clearError() {
      if (errorEl) errorEl.hidden = true;
    }

    function onSubmit() {
      clearError();
      state.nombre = nombreInput.value.trim();
      state.whatsapp = whatsappInput.value.trim();
      state.ciudad = ciudadInput.value.trim();

      if (!state.formatoId && !state.packId) { showError("Elige un formato o un pack para continuar."); return; }
      if (!state.nombre) { showError("Cuéntanos los nombres de los novios."); nombreInput.focus(); return; }
      if (!state.whatsapp) { showError("Necesitamos tu WhatsApp para enviarte la cotización."); whatsappInput.focus(); return; }
      if (!state.fecha || !state.hora) { showError("Elige fecha y hora para la videollamada."); return; }

      var items = buildItems();
      var total = sumItems(items);

      submitBtn.disabled = true;
      submitBtn.textContent = "Agendando…";

      solicitarAgendamiento(items, total).then(function (meetInfo) {
        return generarPDF(items, total, meetInfo).catch(function () { return null; }).then(function () {
          var whatsappPhone = onlyDigits(state.whatsapp);
          var message = buildMessage(items, total, meetInfo);
          window.open("https://wa.me/" + COMPANY_WHATSAPP + "?text=" + encodeURIComponent(message), "_blank", "noopener");

          if (successEl) {
            successEl.hidden = false;
            successEl.textContent = "¡Listo! Descargamos tu cotización en PDF y abrimos WhatsApp con el resumen" + (meetInfo && meetInfo.meetLink ? " y tu link de Meet." : ". Te confirmamos el link de la videollamada por ese mismo chat.");
          }
          submitBtn.disabled = false;
          submitBtn.textContent = "Cotizar y agendar";
        });
      });
    }

    function onlyDigits(str) { return (str || "").replace(/[^0-9]/g, ""); }

    /* -------- Wire up -------- */
    renderOferta();
    renderFormatos();
    renderPacks();
    renderServicios();
    renderFechas();
    renderHoras();

    formatosEl.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cotizador-value]");
      if (btn) onFormatoClick(btn.dataset.cotizadorValue);
    });
    packsEl.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cotizador-value]");
      if (btn) onPackClick(btn.dataset.cotizadorValue);
    });
    serviciosEl.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cotizador-value]");
      if (btn) onServicioClick(btn.dataset.cotizadorValue);
    });
    fechasEl.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cotizador-fecha-value]");
      if (btn) onFechaClick(btn.dataset.cotizadorFechaValue);
    });
    horasEl.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cotizador-hora-value]");
      if (btn) onHoraClick(btn.dataset.cotizadorHoraValue);
    });
    submitBtn.addEventListener("click", onSubmit);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCotizador);
  } else {
    initCotizador();
  }
})();
