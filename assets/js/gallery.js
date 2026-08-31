/**
 * Renders the dashboard gallery on index.html from DASHBOARDS
 * (assets/js/dashboards-data.js). Adding a dashboard only requires
 * editing that data file — this renderer needs no changes.
 */
(function () {
  const gallery = document.querySelector("[data-gallery]");
  const searchInput = document.querySelector("[data-search]");
  const tagContainer = document.querySelector("[data-tag-filters]");
  if (!gallery) return;

  let activeTag = null;

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function initials(title) {
    return title
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
  }

  function cardHtml(d) {
    const thumb = d.thumbnail
      ? `<img src="${escapeHtml(d.thumbnail)}" alt="" loading="lazy">`
      : initials(d.title);

    const tags = (d.tags || [])
      .map((t) => `<span class="pill">${escapeHtml(t)}</span>`)
      .join("");

    const updated = d.updated
      ? `<span class="card-updated">Updated ${escapeHtml(d.updated)}</span>`
      : "";

    return `
      <article class="card">
        <div class="card-thumb" style="--thumb-color:${escapeHtml(d.color || "#2a78d6")}">
          ${d.thumbnail ? thumb : `<span>${escapeHtml(thumb)}</span>`}
        </div>
        <div class="card-body">
          <h3><a href="dashboard.html?id=${encodeURIComponent(d.id)}">${escapeHtml(d.title)}</a></h3>
          <p class="card-desc">${escapeHtml(d.description || "")}</p>
          ${tags || updated ? `<div class="card-tags">${tags}${updated}</div>` : ""}
          <div class="card-footer">
            <a class="btn-open" href="dashboard.html?id=${encodeURIComponent(d.id)}">View dashboard →</a>
            <a class="link-standalone" href="${escapeHtml(d.path)}" target="_blank" rel="noopener">Open standalone ↗</a>
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    const query = (searchInput?.value || "").trim().toLowerCase();

    const filtered = DASHBOARDS.filter((d) => {
      const matchesTag = !activeTag || (d.tags || []).includes(activeTag);
      const haystack = [d.title, d.description, ...(d.tags || [])]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      return matchesTag && matchesQuery;
    });

    gallery.innerHTML = filtered.length
      ? filtered.map(cardHtml).join("")
      : `<p class="empty-state">No dashboards match your search.</p>`;
  }

  function renderTagFilters() {
    if (!tagContainer) return;
    const tags = Array.from(
      new Set(DASHBOARDS.flatMap((d) => d.tags || []))
    ).sort();

    tagContainer.innerHTML = tags
      .map(
        (t) =>
          `<button type="button" class="tag-chip" data-tag="${escapeHtml(t)}" aria-pressed="false">${escapeHtml(t)}</button>`
      )
      .join("");

    tagContainer.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-tag]");
      if (!btn) return;
      const tag = btn.getAttribute("data-tag");
      activeTag = activeTag === tag ? null : tag;
      tagContainer
        .querySelectorAll("[data-tag]")
        .forEach((el) =>
          el.setAttribute(
            "aria-pressed",
            el.getAttribute("data-tag") === activeTag ? "true" : "false"
          )
        );
      render();
    });
  }

  searchInput?.addEventListener("input", render);

  renderTagFilters();
  render();
})();
