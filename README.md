# KG Dev Studio

Marketing website for **KG Dev Studio**: web development, business automation, monitoring systems and custom web apps.

It is a plain static site with no framework, no build step and no npm packages (about 107 KB of source). Open `index.html` in a browser, or upload the folder to any static host.

## Tech stack

### Core languages
- **HTML5**: single-page layout with four views (Home, Packages, Projects, Contact).
- **CSS3**: custom properties, Grid and Flexbox, `@keyframes` animations, media queries.
- **Vanilla JavaScript (ES5-style)**: no libraries or frameworks.

### CSS features
- Custom properties for colour and font tokens, with light and dark themes
- Grid and Flexbox layouts
- `@keyframes` animations (icons, flowcharts, dashboard, marquee, pulses)
- `@media` queries for responsive breakpoints, `prefers-color-scheme` and `prefers-reduced-motion`
- `backdrop-filter`, `mask-image`, gradients
- `env(safe-area-inset-*)` for phone notches

### Browser APIs used
- **Canvas 2D**: animated network in the hero
- **IntersectionObserver**: scroll reveal, counters, and starting animations only when visible
- **MutationObserver**: scroll reveal for content rendered later
- **requestAnimationFrame**: counters and canvas
- **localStorage**: remembers the light/dark choice
- **matchMedia**: reads theme and reduced-motion settings
- **History `replaceState`**: keeps the page hash in sync
- **SVG**: icons, flowchart connectors and the donut ring, drawn by JavaScript

### Third-party services
- **Google Fonts**: Sora (headings), Manrope (body), Caveat (script accents), each with a system-font fallback
- **Formspree**: receives quote form submissions (no backend needed)
- **WhatsApp (`wa.me`) and Facebook links**: floating contact buttons

### Hosting
Any static host works: Vercel, Netlify, GitHub Pages or Cloudflare Pages.

## Project structure

```
kg-dev-studio/
├── index.html
├── README.md
├── assets/
│   ├── img-1.png          logo
│   └── img-2.jpg          hero image
├── css/
│   ├── styles.css         tokens, layout, base components
│   ├── components.css     small shared components
│   ├── animations.css     reveal, header and floating-button animations
│   ├── tech.css           hero, stats, marquee, animated service icons, process steps
│   ├── cases.css          automation case-study cards
│   ├── flows.css          animated workflow flowcharts
│   └── dashboard.css      animated dashboard walkthrough
└── js/
    ├── data.js            packages, projects and case studies (edit content here)
    ├── icons.js           animated SVG service icons and project visuals
    ├── app.js             views, packages, projects, contact form, theme
    ├── effects.js         scroll reveal, header, mobile menu, canvas, counters
    ├── flows.js           flowchart player (Power Automate flows and shell scripts)
    └── dashboard.js       Power BI dashboard walkthrough (sample data)
```

## Editing content

- **Packages, projects and automation case studies:** `js/data.js`
- **Flowchart steps and branches:** `js/flows.js` (the `CH` object)
- **Dashboard sample data:** `js/dashboard.js`
- **Colours and fonts:** the `:root` variables at the top of `css/styles.css`

## Before launch

- Replace the placeholder WhatsApp number (`639000000000`) in `index.html`.
- The dashboard section uses illustrative sample data. Only swap in real names or figures if you have permission to show them.
