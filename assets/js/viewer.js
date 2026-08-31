/**
 * Powers dashboard.html — reads ?id= from the URL, looks it up in
 * DASHBOARDS, and embeds the dashboard's own HTML file in an iframe
 * inside the site's shared chrome (back link, title, open-standalone link).
 */
(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const dashboard = DASHBOARDS.find((d) => d.id === id);

  const titleEl = document.querySelector("[data-viewer-title]");
  const descEl = document.querySelector("[data-viewer-desc]");
  const frameWrap = document.querySelector("[data-frame-wrap]");
  const openNewEl = document.querySelector("[data-viewer-open-new]");

  if (!dashboard) {
    document.title = "Dashboard not found";
    if (titleEl) titleEl.textContent = "Dashboard not found";
    if (descEl) descEl.textContent = "";
    if (openNewEl) openNewEl.style.display = "none";
    if (frameWrap) {
      frameWrap.innerHTML = "";
      const missing = document.createElement("div");
      missing.className = "viewer-missing";

      const p1 = document.createElement("p");
      p1.append("We couldn't find a dashboard with id \"");
      const strong = document.createElement("strong");
      strong.textContent = id || "";
      p1.append(strong, "\".");

      const p2 = document.createElement("p");
      const link = document.createElement("a");
      link.href = "index.html";
      link.textContent = "← Back to the portfolio";
      p2.appendChild(link);

      missing.append(p1, p2);
      frameWrap.appendChild(missing);
    }
    return;
  }

  document.title = dashboard.title + " · Dashboard Portfolio";
  if (titleEl) titleEl.textContent = dashboard.title;
  if (descEl) descEl.textContent = dashboard.description || "";
  if (openNewEl) openNewEl.href = dashboard.path;

  if (frameWrap) {
    const iframe = document.createElement("iframe");
    iframe.src = dashboard.path;
    iframe.title = dashboard.title;
    iframe.loading = "eager";
    frameWrap.appendChild(iframe);
  }
})();
