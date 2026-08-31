/**
 * Light/dark theme toggle. Persists choice in localStorage as "site-theme"
 * ("light" | "dark"). Absence of a stored value means "follow OS setting",
 * matching the prefers-color-scheme rules in variables.css.
 */
(function () {
  const STORAGE_KEY = "site-theme";
  const root = document.documentElement;

  function apply(theme) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function currentEffectiveTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  apply(localStorage.getItem(STORAGE_KEY));

  function initToggle() {
    const btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;

    const sync = () => {
      const effective = currentEffectiveTheme();
      btn.textContent = effective === "dark" ? "☀︎" : "☾";
      btn.setAttribute(
        "aria-label",
        effective === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    };

    btn.addEventListener("click", () => {
      const next = currentEffectiveTheme() === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      apply(next);
      sync();
    });

    sync();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initToggle);
  } else {
    initToggle();
  }
})();
