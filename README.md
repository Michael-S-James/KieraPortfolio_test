# Dashboard Portfolio

A minimal, static GitHub Pages site for hosting a portfolio of HTML dashboards
(built in a Tableau-style layout). No backend, no build step, no database —
everything is plain HTML/CSS/JS.

## Structure

```
index.html                        Portfolio landing page (gallery of cards)
dashboard.html                    Shared viewer chrome (embeds a dashboard in an iframe)
assets/
  css/
    variables.css                 Design tokens (colors, spacing, type) — edit here to re-theme
    style.css                     Site layout & components
  js/
    dashboards-data.js            THE REGISTRY — add a dashboard by editing this file
    gallery.js                    Renders the card grid + search/tag filters on index.html
    viewer.js                     Powers dashboard.html
    theme.js                      Light/dark toggle
dashboards/
  template/index.html             Starter scaffold — copy this for a new dashboard
  sample-sales-overview/index.html  Worked example with real charts
coffee-blog/index.html            Previous site content, preserved as-is
```

## Adding a new dashboard

1. Copy `dashboards/template/` to a new folder, e.g. `dashboards/q3-marketing/`.
2. Build your dashboard in that folder's `index.html`. Keep it self-contained
   (its own `<style>`/`<script>`) so it works both standalone and embedded.
3. Add one entry to `assets/js/dashboards-data.js`:

   ```js
   {
     id: "q3-marketing",
     title: "Q3 Marketing Performance",
     description: "Campaign spend, leads, and conversion by channel.",
     tags: ["Marketing"],
     path: "dashboards/q3-marketing/index.html",
     color: "#eb6834",
     updated: "2026-09-15",
   }
   ```

4. That's it — no other file changes needed. The dashboard appears in the
   gallery, is searchable and filterable by tag, and opens through the shared
   viewer chrome at `dashboard.html?id=q3-marketing` (or standalone by linking
   directly to its `path`).

## Design system

Colors, spacing, and type live as CSS custom properties in
`assets/css/variables.css`, with a light/dark pair for every token (the OS
`prefers-color-scheme` is honored automatically; the header's theme button
lets a visitor override it, persisted in `localStorage`). Individual
dashboards are self-contained and declare their own local copy of the
chart-relevant tokens (see the `<style>` block in `dashboards/template/`) so
they render correctly even when opened outside the portfolio shell.

## Running locally

Dashboards are loaded into cards and the viewer's iframe via relative paths,
and the gallery script reads a local JS data file — both work fine from the
`file://` protocol, so you can just open `index.html` directly in a browser.
If you later switch `dashboards-data.js` to a fetched JSON file, you'll need
a local server instead, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, under **Pages**, set the source to the `master`
   (or `main`) branch, root folder.
3. The site publishes at `https://<username>.github.io/<repo>/`.

`.nojekyll` is included so GitHub Pages serves files as-is (no Jekyll
processing), which matters if any future dashboard folder starts with an
underscore.
