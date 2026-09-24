# Fernado George — Portfolio

Personal portfolio for a data scientist and AI engineer. Single-page React app built with Vite, Tailwind CSS and Framer Motion, deployed on Vercel.

## Develop

Requires Node `^20.19.0 || >=22.12.0`.

```sh
npm ci
npm run dev       # http://localhost:5173
npm run build     # lints (zero warnings allowed), then builds to dist/
npm run preview   # serve the production build
```

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

## Layout

```
src/
  components/        page sections (Hero, Work, Research, Experience, About, Recognition, Contact)
  components/charts/ interactive thesis figures
  components/ui/     shared primitives (Section, Dialog, Reveal, Icons)
  constants/         site content
  hooks/             active-section tracking, element sizing
```
