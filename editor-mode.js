/* =============================================================
   Modo edición — LA BANDOTA
   -------------------------------------------------------------
   Se activa agregando ?edit=1 al final del link de cualquier
   página (ej. servicios.html?edit=1). Los textos marcados con
   data-edit-id quedan editables con un clic; el botón "Guardar
   cambios" escribe el cambio directo en GitHub usando un token
   de acceso personal guardado solo en este navegador.

   No requiere backend propio: usa la API de GitHub directamente
   desde el navegador (Contents API), autenticada con un token de
   acceso personal de solo lectura/escritura sobre este repositorio.
   ============================================================= */
(function () {
  "use strict";

  var OWNER = "barrerateddy-web";
  var REPO = "Bandota";
  var BRANCH = "main";
  var TOKEN_KEY = "bandota_gh_token";

  var params = new URLSearchParams(location.search);
  if (params.get("edit") !== "1") return;

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.from((scope || document).querySelectorAll(sel)); }

  /* -------- UTF-8 safe base64 helpers (GitHub API needs base64; á/é/ó/ñ must survive) -------- */
  function utf8ToBase64(str) {
    var bytes = new TextEncoder().encode(str);
    var binary = "";
    bytes.forEach(function (b) { binary += String.fromCharCode(b); });
    return btoa(binary);
  }
  function base64ToUtf8(b64) {
    var binary = atob(b64.replace(/\n/g, ""));
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder("utf-8").decode(bytes);
  }

  /* -------- Replace one editable region inside the raw source text -------- */
  function replaceEditableRegion(sourceText, editId, tagName, newInnerHtml) {
    var marker = 'data-edit-id="' + editId + '"';
    var markerPos = sourceText.indexOf(marker);
    if (markerPos === -1) throw new Error('No se encontró data-edit-id="' + editId + '" en el archivo fuente.');
    var openTagEnd = sourceText.indexOf(">", markerPos);
    if (openTagEnd === -1) throw new Error("Etiqueta de apertura malformada para " + editId);
    var closeTag = "</" + tagName.toLowerCase() + ">";
    var closeTagPos = sourceText.indexOf(closeTag, openTagEnd);
    if (closeTagPos === -1) throw new Error("No se encontró el cierre " + closeTag + " para " + editId);
    return sourceText.slice(0, openTagEnd + 1) + newInnerHtml + sourceText.slice(closeTagPos);
  }

  /* -------- GitHub Contents API -------- */
  function ghHeaders(token) {
    return {
      "Authorization": "Bearer " + token,
      "Accept": "application/vnd.github+json"
    };
  }

  function getFile(path, token) {
    var url = "https://api.github.com/repos/" + OWNER + "/" + REPO + "/contents/" + path + "?ref=" + BRANCH + "&t=" + Date.now();
    return fetch(url, { headers: ghHeaders(token) }).then(function (res) {
      if (!res.ok) return res.json().then(function (j) { throw new Error("No se pudo leer el archivo (" + res.status + "): " + (j.message || "")); });
      return res.json();
    });
  }

  function putFile(path, token, content, sha, message) {
    var url = "https://api.github.com/repos/" + OWNER + "/" + REPO + "/contents/" + path;
    return fetch(url, {
      method: "PUT",
      headers: Object.assign({ "Content-Type": "application/json" }, ghHeaders(token)),
      body: JSON.stringify({ message: message, content: content, sha: sha, branch: BRANCH })
    }).then(function (res) {
      if (!res.ok) return res.json().then(function (j) { throw new Error("No se pudo guardar (" + res.status + "): " + (j.message || "")); });
      return res.json();
    });
  }

  /* -------- Editor UI -------- */
  function buildPanel() {
    var panel = document.createElement("div");
    panel.id = "editor-mode-panel";
    panel.innerHTML =
      '<div class="editor-mode-row" data-editor-token-row>' +
        '<input type="password" placeholder="Pega tu token de GitHub" data-editor-token-input>' +
        '<button type="button" data-editor-token-save>Guardar token</button>' +
      "</div>" +
      '<div class="editor-mode-row" data-editor-actions-row hidden>' +
        '<span data-editor-status>Modo edición activo — haz clic en cualquier texto resaltado para cambiarlo.</span>' +
        '<button type="button" data-editor-save class="editor-mode-save">Guardar cambios</button>' +
        '<button type="button" data-editor-forget-token>Olvidar token</button>' +
        '<a href="?" data-editor-exit>Salir</a>' +
      "</div>";
    document.body.appendChild(panel);
    return panel;
  }

  function initEditableElements() {
    var originals = new Map();
    $$("[data-edit-id]").forEach(function (el) {
      el.setAttribute("contenteditable", "plaintext-only");
      el.classList.add("is-editable");
      originals.set(el, el.innerHTML);
    });
    return originals;
  }

  function collectChanges(originals) {
    var changes = [];
    originals.forEach(function (originalHtml, el) {
      if (el.innerHTML !== originalHtml) {
        changes.push({ id: el.getAttribute("data-edit-id"), tag: el.tagName, html: el.innerHTML });
      }
    });
    return changes;
  }

  function setStatus(panel, text, isError) {
    var statusEl = $("[data-editor-status]", panel);
    statusEl.textContent = text;
    statusEl.style.color = isError ? "#e0524f" : "";
  }

  function boot() {
    var panel = buildPanel();
    var tokenRow = $("[data-editor-token-row]", panel);
    var actionsRow = $("[data-editor-actions-row]", panel);
    var tokenInput = $("[data-editor-token-input]", panel);

    var savedToken = null;
    try { savedToken = localStorage.getItem(TOKEN_KEY); } catch (e) { /* ignore */ }

    function showActionsMode() {
      tokenRow.hidden = true;
      actionsRow.hidden = false;
    }
    if (savedToken) showActionsMode();

    $("[data-editor-token-save]", panel).addEventListener("click", function () {
      var val = tokenInput.value.trim();
      if (!val) return;
      try { localStorage.setItem(TOKEN_KEY, val); } catch (e) { /* ignore */ }
      showActionsMode();
    });

    $("[data-editor-forget-token]", panel).addEventListener("click", function () {
      try { localStorage.removeItem(TOKEN_KEY); } catch (e) { /* ignore */ }
      tokenInput.value = "";
      tokenRow.hidden = false;
      actionsRow.hidden = true;
    });

    var originals = initEditableElements();

    $("[data-editor-save]", panel).addEventListener("click", function () {
      var token;
      try { token = localStorage.getItem(TOKEN_KEY); } catch (e) { token = null; }
      if (!token) { setStatus(panel, "Falta el token — pégalo arriba primero.", true); tokenRow.hidden = false; return; }

      var changes = collectChanges(originals);
      if (!changes.length) { setStatus(panel, "No hay cambios para guardar."); return; }

      var path = document.body.getAttribute("data-repo-path");
      if (!path) { setStatus(panel, "Esta página no tiene configurada su ruta de archivo (data-repo-path).", true); return; }

      var saveBtn = $("[data-editor-save]", panel);
      saveBtn.disabled = true;
      setStatus(panel, "Guardando " + changes.length + " cambio(s)…");

      getFile(path, token).then(function (file) {
        var text = base64ToUtf8(file.content);
        changes.forEach(function (ch) {
          text = replaceEditableRegion(text, ch.id, ch.tag, ch.html);
        });
        var newContent = utf8ToBase64(text);
        var message = "Editar texto vía modo edición (" + path + ")";
        return putFile(path, token, newContent, file.sha, message);
      }).then(function () {
        setStatus(panel, "✓ Guardado. La página se actualizará en la web en menos de un minuto.");
        originals = initEditableElements();
        saveBtn.disabled = false;
      }).catch(function (err) {
        setStatus(panel, err.message || "Ocurrió un error al guardar.", true);
        saveBtn.disabled = false;
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
