(function () {
  "use strict";

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.from((scope || document).querySelectorAll(sel)); };

  var COMPANY_WHATSAPP = "573044777225";
  var COMPANY_EMAIL = "barrerateddy@gmail.com";
  var STORAGE_KEY = "bandota_repertorio_v1";

  /* Optional: paste a deployed Google Apps Script Web App URL here to also log
     every submission to a spreadsheet on your end. Leave empty to disable —
     nothing breaks either way, the WhatsApp/email flow works regardless. */
  var SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbydJ1u-sqbPocp4NE1g_oKuIfx7HF4K_a-3IxrC8qCSLEAnqzh6Ku7puNmyvAbn-XHT/exec";

  function slug(str) {
    return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-");
  }

  function spotifyUrl(song) {
    if (song.spotify) return song.spotify;
    return "https://open.spotify.com/search/" + encodeURIComponent(song.title + " " + song.artist);
  }
  function youtubeUrl(song) {
    if (song.youtube) return song.youtube;
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(song.title + " " + song.artist);
  }
  function spotifyTrackId(url) {
    var m = /track\/([a-zA-Z0-9]+)/.exec(url || "");
    return m ? m[1] : null;
  }

  function initRepertorioSelector() {
    var root = $("[data-repertorio]");
    if (!root || !window.REPERTORIO_DATA) return;

    var data = window.REPERTORIO_DATA;
    var selected = new Map();  // songId -> { song, catLabel, subLabel }  ("quiero esta")
    var priority = new Set();  // songId subset of selected             ("imprescindible")
    var blocked = new Map();   // songId -> { song, catLabel, subLabel }  ("no tocar")

    var sidebarEl = $("[data-rep-sidebar]", root);
    var contentEl = $("[data-rep-content]", root);
    var searchInput = $("[data-rep-search]", root);
    var resetLink = $("[data-rep-reset]", root);
    var emptyEl = $("[data-rep-empty]", root);
    var bar = $("[data-rep-bar]", root);
    var barCount = $("[data-rep-bar-count]", root);
    var barBtn = $("[data-rep-bar-btn]", root);

    var activeCatId = data.length ? data[0].id : null;

    var modalOverlay = $("[data-rep-modal]");
    var modalClose = $("[data-rep-modal-close]", modalOverlay);
    var modalSummary = $("[data-rep-modal-summary]", modalOverlay);
    var modalForm = $("[data-rep-modal-form]", modalOverlay);
    var namesInput = $("[data-rep-names]", modalOverlay);
    var dateInput = $("[data-rep-date]", modalOverlay);
    var plannerEmailInput = $("[data-rep-planner-email]", modalOverlay);
    var plannerPhoneInput = $("[data-rep-planner-phone]", modalOverlay);
    var waBtn = $("[data-rep-send-wa]", modalOverlay);
    var waPlannerBtn = $("[data-rep-send-wa-planner]", modalOverlay);
    var emailBtn = $("[data-rep-send-email]", modalOverlay);
    var copyBtn = $("[data-rep-copy]", modalOverlay);
    var successEl = $("[data-rep-modal-success]", modalOverlay);
    var successTextEl = $("[data-rep-modal-success-text]", modalOverlay);
    var successCloseBtn = $("[data-rep-modal-success-close]", modalOverlay);

    /* -------- Song id -------- */
    function songId(catId, subId, title) {
      return catId + ":" + subId + ":" + slug(title);
    }

    function findSongById(id) {
      for (var i = 0; i < data.length; i++) {
        var cat = data[i];
        for (var j = 0; j < cat.subgenres.length; j++) {
          var sub = cat.subgenres[j];
          for (var k = 0; k < sub.songs.length; k++) {
            if (songId(cat.id, sub.id, sub.songs[k].title) === id) {
              return { song: sub.songs[k], catLabel: cat.label, subLabel: sub.label };
            }
          }
        }
      }
      return null;
    }

    /* -------- Selection rules (select / priority / block are mutually consistent) -------- */
    function selectSong(id) {
      var entry = findSongById(id);
      if (!entry) return;
      blocked.delete(id);
      selected.set(id, entry);
    }
    function unselectSong(id) {
      selected.delete(id);
      priority.delete(id);
    }
    function toggleStar(id) {
      if (!selected.has(id)) selectSong(id);
      if (priority.has(id)) priority.delete(id); else priority.add(id);
    }
    function toggleBlock(id) {
      if (blocked.has(id)) {
        blocked.delete(id);
      } else {
        unselectSong(id);
        var entry = findSongById(id);
        if (entry) blocked.set(id, entry);
      }
    }

    /* -------- Render sidebar (ARIA tablist so it works with keyboard/screen readers) -------- */
    function renderSidebar() {
      sidebarEl.setAttribute("role", "tablist");
      sidebarEl.setAttribute("aria-orientation", "vertical");
      contentEl.setAttribute("role", "tabpanel");

      sidebarEl.innerHTML = data.map(function (cat, i) {
        var count = cat.subgenres.reduce(function (n, sub) { return n + sub.songs.length; }, 0);
        var isActive = i === 0;
        return (
          '<button type="button" id="rep-tab-' + cat.id + '" role="tab" aria-selected="' + isActive + '" tabindex="' + (isActive ? "0" : "-1") + '"' +
            ' class="rep-sidebar-btn' + (isActive ? " is-active" : "") + '" data-rep-cat="' + cat.id + '">' +
            cat.label +
            '<span class="rep-sidebar-count">' + count + " canciones</span>" +
          "</button>"
        );
      }).join("");
    }

    /* Arrow-key navigation between sidebar tabs, following the standard tablist pattern */
    function onSidebarKeydown(e) {
      if (["ArrowDown", "ArrowUp", "Home", "End"].indexOf(e.key) === -1) return;
      var btns = $$(".rep-sidebar-btn", sidebarEl);
      var currentIndex = btns.indexOf(document.activeElement);
      if (currentIndex === -1) return;
      e.preventDefault();
      var nextIndex = currentIndex;
      if (e.key === "ArrowDown") nextIndex = (currentIndex + 1) % btns.length;
      else if (e.key === "ArrowUp") nextIndex = (currentIndex - 1 + btns.length) % btns.length;
      else if (e.key === "Home") nextIndex = 0;
      else if (e.key === "End") nextIndex = btns.length - 1;

      searchInput.value = "";
      showCategory(btns[nextIndex].dataset.repCat);
      $(".rep-sidebar-btn.is-active", sidebarEl).focus();
    }

    function songRowHtml(id, song) {
      var isSelected = selected.has(id);
      var isPriority = priority.has(id);
      var isBlocked = blocked.has(id);
      var hasPreview = !!song.spotify;
      var rowClasses = "rep-song-row" +
        (isSelected ? " is-selected" : "") +
        (isPriority ? " is-priority" : "") +
        (isBlocked ? " is-blocked" : "");

      return (
        '<div class="' + rowClasses + '">' +
          '<label class="rep-song-check">' +
            '<input type="checkbox" data-rep-checkbox value="' + id + '"' + (isSelected ? " checked" : "") + '>' +
            '<span class="rep-song-info">' +
              '<span class="rep-song-title">' + song.title + "</span>" +
              '<span class="rep-song-artist">' + song.artist + "</span>" +
            "</span>" +
          "</label>" +
          '<div class="rep-song-actions">' +
            (hasPreview ? '<button type="button" class="rep-icon-btn rep-icon-preview" data-rep-preview value="' + id + '" aria-label="Escuchar preview" title="Escuchar 30 segundos">&#9654;</button>' : "") +
            '<button type="button" class="rep-icon-btn rep-icon-star' + (isPriority ? " is-active" : "") + '" data-rep-star value="' + id + '" aria-label="Marcar como imprescindible" title="Imprescindible — no puede faltar">&#9733;</button>' +
            '<button type="button" class="rep-icon-btn rep-icon-block' + (isBlocked ? " is-active" : "") + '" data-rep-block value="' + id + '" aria-label="No tocar esta canción" title="No tocar esta canción">&#128683;</button>' +
            '<span class="rep-song-links">' +
              '<a href="' + spotifyUrl(song) + '" target="_blank" rel="noopener">Spotify</a>' +
              '<a href="' + youtubeUrl(song) + '" target="_blank" rel="noopener">YouTube</a>' +
            "</span>" +
          "</div>" +
          '<div class="rep-preview" data-rep-preview-embed hidden></div>' +
        "</div>"
      );
    }

    /* -------- Show one category's subgenres + songs in the content pane -------- */
    function showCategory(catId) {
      var cat = data.find(function (c) { return c.id === catId; });
      if (!cat) return;
      activeCatId = catId;

      $$(".rep-sidebar-btn", sidebarEl).forEach(function (btn) {
        var isActive = btn.dataset.repCat === catId;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-selected", String(isActive));
        btn.setAttribute("tabindex", isActive ? "0" : "-1");
      });
      contentEl.setAttribute("aria-labelledby", "rep-tab-" + catId);

      var html = cat.subgenres.map(function (sub) {
        var rowsHtml = sub.songs.map(function (song) {
          return songRowHtml(songId(cat.id, sub.id, song.title), song);
        }).join("");
        var count = sub.songs.length;
        return (
          '<details class="rep-subgenre-acc">' +
            '<summary class="rep-subgenre-summary">' +
              '<span class="rep-subgenre-name">' + sub.label + "</span>" +
              '<span class="rep-subgenre-meta">' + count + (count === 1 ? " canción" : " canciones") + "</span>" +
              '<span class="rep-subgenre-icon" aria-hidden="true"></span>' +
            "</summary>" +
            '<div class="rep-song-list">' + rowsHtml + "</div>" +
          "</details>"
        );
      }).join("");

      contentEl.innerHTML = html;
      contentEl.appendChild(emptyEl);
      emptyEl.hidden = true;
      contentEl.scrollTop = 0;
    }

    /* -------- Search (flat results across all categories) -------- */
    function renderSearch(query) {
      var q = query.trim().toLowerCase();
      if (!q) {
        showCategory(activeCatId);
        return;
      }

      var matches = [];
      data.forEach(function (cat) {
        cat.subgenres.forEach(function (sub) {
          sub.songs.forEach(function (song) {
            if ((song.title + " " + song.artist).toLowerCase().indexOf(q) !== -1) {
              matches.push({ cat: cat, sub: sub, song: song });
            }
          });
        });
      });

      if (!matches.length) {
        contentEl.innerHTML = "";
        contentEl.appendChild(emptyEl);
        emptyEl.hidden = false;
        return;
      }

      var rowsHtml = matches.map(function (m) {
        var id = songId(m.cat.id, m.sub.id, m.song.title);
        return (
          '<div class="rep-subgenre-title rep-search-tag">' + m.cat.label + " · " + m.sub.label + "</div>" +
          songRowHtml(id, m.song)
        );
      }).join("");

      contentEl.innerHTML = '<div class="rep-song-list">' + rowsHtml + "</div>";
      contentEl.appendChild(emptyEl);
      emptyEl.hidden = true;
      contentEl.scrollTop = 0;
    }

    /* -------- Sidebar navigation -------- */
    function onSidebarClick(e) {
      var btn = e.target.closest("[data-rep-cat]");
      if (!btn) return;
      searchInput.value = "";
      showCategory(btn.dataset.repCat);
    }

    /* -------- Row interactions (delegated on the content pane) -------- */
    function onContentChange(e) {
      var cb = e.target.closest("[data-rep-checkbox]");
      if (!cb) return;
      var id = cb.value;
      if (cb.checked) selectSong(id); else unselectSong(id);
      refreshRow(id);
      updateBar();
      saveState();
    }

    function onContentClick(e) {
      var starBtn = e.target.closest("[data-rep-star]");
      var blockBtn = e.target.closest("[data-rep-block]");
      var previewBtn = e.target.closest("[data-rep-preview]");

      if (starBtn) {
        toggleStar(starBtn.value);
        refreshRow(starBtn.value);
        updateBar();
        saveState();
        return;
      }
      if (blockBtn) {
        toggleBlock(blockBtn.value);
        refreshRow(blockBtn.value);
        updateBar();
        saveState();
        return;
      }
      if (previewBtn) {
        togglePreview(previewBtn);
      }
    }

    // re-render just one row in place so state (selected/priority/blocked classes, checkbox) stays in sync
    function refreshRow(id) {
      $$('[data-rep-checkbox][value="' + id + '"]', contentEl).forEach(function (cb) {
        var oldRow = cb.closest(".rep-song-row");
        if (!oldRow) return;
        var entry = findSongById(id);
        if (!entry) return;
        var temp = document.createElement("div");
        temp.innerHTML = songRowHtml(id, entry.song);
        oldRow.replaceWith(temp.firstElementChild);
      });
    }

    function togglePreview(btn) {
      var id = btn.value;
      var row = btn.closest(".rep-song-row");
      var embed = row.querySelector("[data-rep-preview-embed]");
      var isOpen = embed && !embed.hidden;

      // only one preview plays at a time
      $$("[data-rep-preview-embed]", contentEl).forEach(function (el) { el.hidden = true; el.innerHTML = ""; });
      $$(".rep-icon-preview.is-active", contentEl).forEach(function (b) { b.classList.remove("is-active"); });

      if (isOpen) return;

      var entry = findSongById(id);
      var trackId = entry && spotifyTrackId(entry.song.spotify);
      if (!trackId) return;
      embed.innerHTML = '<iframe src="https://open.spotify.com/embed/track/' + trackId + '?utm_source=generator&theme=0" width="100%" height="80" frameborder="0" allow="autoplay; encrypted-media" loading="lazy"></iframe>';
      embed.hidden = false;
      btn.classList.add("is-active");
    }

    /* -------- Floating bar -------- */
    function updateBar() {
      var count = selected.size;
      var hasAny = count > 0 || blocked.size > 0;
      bar.classList.toggle("is-visible", hasAny);
      resetLink.hidden = !hasAny;

      var parts = [];
      if (count > 0) parts.push(count === 1 ? "1 canción seleccionada" : count + " canciones seleccionadas");
      if (priority.size > 0) parts.push(priority.size + " ★ imprescindible" + (priority.size === 1 ? "" : "s"));
      if (blocked.size > 0) parts.push(blocked.size + " no tocar");
      barCount.textContent = parts.join(" · ");
    }

    /* -------- localStorage persistence -------- */
    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          selected: Array.from(selected.keys()),
          priority: Array.from(priority),
          blocked: Array.from(blocked.keys()),
          names: namesInput.value,
          date: dateInput.value,
          plannerEmail: plannerEmailInput.value,
          plannerPhone: plannerPhoneInput.value
        }));
      } catch (e) { /* private mode / quota exceeded — selection just won't persist */ }
    }

    function loadState() {
      var raw;
      try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { return; }
      if (!raw) return;
      var state;
      try { state = JSON.parse(raw); } catch (e) { return; }

      (state.selected || []).forEach(function (id) { selectSong(id); });
      (state.priority || []).forEach(function (id) { if (selected.has(id)) priority.add(id); });
      (state.blocked || []).forEach(function (id) {
        var entry = findSongById(id);
        if (entry) blocked.set(id, entry);
      });
      if (state.names) namesInput.value = state.names;
      if (state.date) dateInput.value = state.date;
      if (state.plannerEmail) plannerEmailInput.value = state.plannerEmail;
      if (state.plannerPhone) plannerPhoneInput.value = state.plannerPhone;
    }

    function clearAll() {
      if (!window.confirm("¿Borrar toda tu selección y empezar de nuevo?")) return;
      selected.clear();
      priority.clear();
      blocked.clear();
      namesInput.value = "";
      dateInput.value = "";
      plannerEmailInput.value = "";
      plannerPhoneInput.value = "";
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
      updateBar();
      searchInput.value = "";
      showCategory(activeCatId);
    }

    /* -------- Message building -------- */
    function buildMessage(names, date) {
      var lines = [];
      lines.push("Selección de repertorio — LA BANDOTA");
      if (names) lines.push("Novios: " + names);
      if (date) lines.push("Fecha de la boda: " + date);
      lines.push("");

      var priorityEntries = [];
      var normalByCat = new Map();
      selected.forEach(function (entry, id) {
        if (priority.has(id)) {
          priorityEntries.push(entry);
        } else {
          var key = entry.catLabel;
          if (!normalByCat.has(key)) normalByCat.set(key, new Map());
          var bySub = normalByCat.get(key);
          if (!bySub.has(entry.subLabel)) bySub.set(entry.subLabel, []);
          bySub.get(entry.subLabel).push(entry.song);
        }
      });

      if (priorityEntries.length) {
        lines.push("★ IMPRESCINDIBLES — no pueden faltar ★");
        priorityEntries.forEach(function (entry) {
          lines.push("• " + entry.song.title + " — " + entry.song.artist);
          lines.push("  Spotify: " + spotifyUrl(entry.song));
          lines.push("  YouTube: " + youtubeUrl(entry.song));
        });
        lines.push("");
      }

      normalByCat.forEach(function (bySub, catLabel) {
        lines.push("— " + catLabel.toUpperCase() + " —");
        bySub.forEach(function (songs, subLabel) {
          lines.push(subLabel + ":");
          songs.forEach(function (song) {
            lines.push("• " + song.title + " — " + song.artist);
            lines.push("  Spotify: " + spotifyUrl(song));
            lines.push("  YouTube: " + youtubeUrl(song));
          });
        });
        lines.push("");
      });

      if (blocked.size) {
        lines.push("🚫 NO TOCAR — por favor evitar estas 🚫");
        blocked.forEach(function (entry) {
          lines.push("• " + entry.song.title + " — " + entry.song.artist);
        });
        lines.push("");
      }

      lines.push("Total seleccionadas: " + selected.size + (priority.size ? " (" + priority.size + " imprescindibles)" : ""));
      return lines.join("\n");
    }

    /* -------- Modal -------- */
    function renderModalSummary() {
      var rows = [];
      priority.forEach(function (id) {
        var entry = selected.get(id);
        if (entry) rows.push({ id: id, entry: entry, tag: "★ " });
      });
      selected.forEach(function (entry, id) {
        if (!priority.has(id)) rows.push({ id: id, entry: entry, tag: "" });
      });
      blocked.forEach(function (entry, id) {
        rows.push({ id: id, entry: entry, tag: "🚫 ", isBlocked: true });
      });

      if (!rows.length) {
        modalSummary.innerHTML = '<li class="rep-modal-summary-empty">Aún no has seleccionado canciones.</li>';
        return;
      }

      modalSummary.innerHTML = rows.map(function (row) {
        return (
          '<li' + (row.isBlocked ? ' class="is-blocked"' : "") + '>' +
            "<span>" + row.tag + row.entry.song.title + ' — <span class="rep-modal-summary-artist">' + row.entry.song.artist + "</span></span>" +
            '<button type="button" class="rep-modal-summary-remove" data-rep-remove="' + row.id + '" aria-label="Quitar">&times;</button>' +
          "</li>"
        );
      }).join("");
    }

    function onSummaryRemove(e) {
      var btn = e.target.closest("[data-rep-remove]");
      if (!btn) return;
      var id = btn.dataset.repRemove;
      unselectSong(id);
      blocked.delete(id);
      saveState();
      updateBar();
      renderModalSummary();
      var liveCb = $('[data-rep-checkbox][value="' + id + '"]', contentEl);
      if (liveCb) refreshRow(id);
    }

    function openModal() {
      modalForm.hidden = false;
      successEl.hidden = true;
      renderModalSummary();
      waPlannerBtn.hidden = !plannerPhoneInput.value.trim();
      modalOverlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function closeModal() {
      modalOverlay.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    function currentNamesDate() {
      return { names: namesInput.value.trim(), date: dateInput.value };
    }

    function onlyDigits(str) {
      return (str || "").replace(/[^0-9]/g, "");
    }

    function logToSheet(payload) {
      if (!SHEETS_WEBHOOK_URL) return;
      try {
        fetch(SHEETS_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(payload)
        }).catch(function () { /* best-effort logging only, never blocks the real send */ });
      } catch (e) { /* ignore */ }
    }

    function showSuccess(text) {
      modalForm.hidden = true;
      successTextEl.textContent = text;
      successEl.hidden = false;
    }

    function handleSend(e) {
      e.preventDefault();
      if (!namesInput.value.trim()) {
        namesInput.reportValidity();
        return;
      }
      var nd = currentNamesDate();
      var message = buildMessage(nd.names, nd.date);
      var target = e.submitter;
      saveState();

      if (target === waBtn) {
        window.open("https://wa.me/" + COMPANY_WHATSAPP + "?text=" + encodeURIComponent(message), "_blank", "noopener");
        logToSheet({ type: "whatsapp-bandota", names: nd.names, date: nd.date, total: selected.size, priority: priority.size, blocked: blocked.size, message: message, ts: new Date().toISOString() });
        showSuccess("Se abrió WhatsApp con tu selección lista para LA BANDOTA. Confirma el envío allá.");
      } else if (target === waPlannerBtn) {
        var plannerPhone = onlyDigits(plannerPhoneInput.value);
        if (!plannerPhone) { plannerPhoneInput.reportValidity(); return; }
        window.open("https://wa.me/" + plannerPhone + "?text=" + encodeURIComponent(message), "_blank", "noopener");
        logToSheet({ type: "whatsapp-planner", names: nd.names, date: nd.date, total: selected.size, priority: priority.size, blocked: blocked.size, message: message, ts: new Date().toISOString() });
        showSuccess("Se abrió WhatsApp con tu selección lista para tu wedding planner. Confirma el envío allá.");
      } else if (target === emailBtn) {
        var params = ["subject=" + encodeURIComponent("Selección de repertorio — " + (nd.names || "Boda LA BANDOTA"))];
        if (plannerEmailInput.value.trim()) params.push("cc=" + encodeURIComponent(plannerEmailInput.value.trim()));
        params.push("body=" + encodeURIComponent(message));
        window.location.href = "mailto:" + COMPANY_EMAIL + "?" + params.join("&");
        logToSheet({ type: "email", names: nd.names, date: nd.date, total: selected.size, priority: priority.size, blocked: blocked.size, message: message, ts: new Date().toISOString() });
        showSuccess("Se abrió tu programa de correo con la selección lista. Confirma el envío desde ahí.");
      } else if (target === copyBtn) {
        copySelection(message);
      }
    }

    function copySelection(message) {
      var done = function () {
        var original = copyBtn.textContent;
        copyBtn.textContent = "¡Copiado!";
        setTimeout(function () { copyBtn.textContent = original; }, 1800);
      };
      var fallbackCopy = function () {
        var textarea = document.createElement("textarea");
        textarea.value = message;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* clipboard unavailable in this browser */ }
        document.body.removeChild(textarea);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message).then(done).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    }

    plannerPhoneInput.addEventListener("input", function () {
      waPlannerBtn.hidden = !plannerPhoneInput.value.trim();
      saveState();
    });
    [namesInput, dateInput, plannerEmailInput].forEach(function (input) {
      input.addEventListener("input", saveState);
    });

    /* -------- Wire up -------- */
    loadState();
    renderSidebar();
    showCategory(activeCatId);
    updateBar();
    sidebarEl.addEventListener("click", onSidebarClick);
    sidebarEl.addEventListener("keydown", onSidebarKeydown);
    contentEl.addEventListener("change", onContentChange);
    contentEl.addEventListener("click", onContentClick);
    searchInput.addEventListener("input", function () { renderSearch(searchInput.value); });
    resetLink.addEventListener("click", clearAll);
    barBtn.addEventListener("click", openModal);
    modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", function (e) { if (e.target === modalOverlay) closeModal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modalOverlay.classList.contains("is-open")) closeModal(); });
    modalForm.addEventListener("submit", handleSend);
    modalSummary.addEventListener("click", onSummaryRemove);
    successCloseBtn.addEventListener("click", closeModal);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRepertorioSelector);
  } else {
    initRepertorioSelector();
  }
})();
