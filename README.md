# Fernado George — Portfolio

Personal portfolio for a data scientist and AI engineer. Single-page React app built with Vite, Tailwind CSS and Framer Motion, deployed on Vercel.

## Develop

Requires Node `^20.19.0 || >=22.12.0`.

```sh
npm ci
npm run dev       # http://localhost:5173
npm run build     # lints (zero warnings allowed), builds to dist/, then pre-renders the page
npm run preview   # serve the production build
```

## Pre-rendering

`npm run build` finishes with `scripts/prerender.mjs`. It renders the app to HTML once and writes the result, plus the inlined stylesheet, into `dist/index.html`. Visitors see the page before any JavaScript runs, and `main.jsx` then hydrates that markup. The dev server skips this step.

Components therefore render twice: once in Node at build time, then in the browser. Keep browser-only values out of the first render so the two outputs match:

- No `window`, `document` or `matchMedia` during render. Read them in effects or event handlers.
- For values that must appear in the markup (the clock, the year, a media query), use `useBrowserValue` from `src/hooks/`. It renders a fallback at build time and the live value after hydration.

A mismatch shows up in the production build (`npm run build && npm run preview`) as a React hydration error in the console.

## Editing content

All copy lives in `src/constants/`. Components only handle layout.

- `index.js`: hero, projects, experience, education, skills, awards and contact details.
- `thesis.js`: figure data behind the Research charts and the hero graphic.

Documents such as the resume and case-study PDFs are served from `public/`.

## Images

Original photos live in `assets-src/` and are not deployed. After adding or replacing one, regenerate the responsive WebP variants:

```sh
node scripts/resize-images.mjs
```

Reference images by their original path (for example `/projects/cover.jpg`). `src/utils/image.js` maps that path to the generated `public/resized/` variants.

## Motion

- Framer Motion loads through `<LazyMotion strict>` in `App.jsx`: use `m.*` components, not `motion.*`. The animation features load in their own chunk after the first render.
- The hero headline and lede are the LCP elements, so they render visible on first paint. Simple entrances use CSS (`animate-rise`).
- Continuous motion (loops, scroll- or pointer-driven effects) animates only `transform` and `opacity`.
- Anything that loops for more than 5 seconds needs a pause control (WCAG 2.2.2). All motion respects `prefers-reduced-motion`, through `MotionConfig reducedMotion="user"` and the media query in `index.css`.

## Deployment

`vercel.json` pins the build command to `npm run build`, so the pre-render step always runs. It also sets the security headers (CSP, framing, `nosniff`, referrer policy) and long-lived caching for the hashed files in `/assets/`. If you add a third-party script, font or API, allow its origin in the CSP.

## Layout

```
src/
  components/        page sections (Hero, Work, Research, Experience, About, Recognition, Contact)
  components/charts/ interactive thesis figures
  components/ui/     shared primitives (Section, Dialog, Reveal, Icons)
  constants/         site content
  hooks/             active-section tracking, element sizing, pre-render-safe browser values
  entry-server.jsx   build-time render entry (see scripts/prerender.mjs)
```
