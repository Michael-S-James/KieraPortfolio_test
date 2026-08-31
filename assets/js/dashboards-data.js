/**
 * Dashboard registry.
 *
 * This is the single place you touch to add a new dashboard to the
 * portfolio — no other file needs to change.
 *
 * To add a dashboard:
 *   1. Drop your Tableau-style HTML file (or folder) under /dashboards/,
 *      e.g. /dashboards/my-new-dashboard/index.html
 *      (copy /dashboards/template/index.html as a starting point)
 *   2. Add one object to the DASHBOARDS array below.
 *   3. Done — it appears in the gallery, is searchable/filterable by tag,
 *      and opens in the site's viewer chrome automatically.
 *
 * Field reference:
 *   id          unique slug, used in the viewer URL (dashboard.html?id=...)
 *   title       display name shown on the card and viewer header
 *   description one or two sentences shown on the card
 *   tags        array of short category strings, used for filtering
 *   path        relative path to the dashboard's HTML file
 *   color       accent color (hex) for the card thumbnail; pick anything,
 *               it's purely decorative
 *   thumbnail   optional path to a real thumbnail image; if omitted, a
 *               colored placeholder using `color` is shown instead
 *   updated     "YYYY-MM-DD", shown on the card footer if present
 */

const DASHBOARDS = [
  {
    id: "sample-sales-overview",
    title: "Sales Performance Overview",
    description:
      "Sample dashboard demonstrating the Tableau-style template: KPI tiles, a trend line, and category breakdowns.",
    tags: ["Sample", "Sales"],
    path: "dashboards/sample-sales-overview/index.html",
    color: "#2a78d6",
    updated: "2026-08-31",
  },
];
