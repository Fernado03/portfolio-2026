// Runs after `vite build`: renders <App /> to HTML once and writes it into dist/index.html, so the
// page paints before any JavaScript runs; main.jsx then hydrates it. The stylesheet is inlined too,
// since it is the only other request that blocks that first paint.
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = `${root}dist`;
const ssrOut = `${root}node_modules/.cache/prerender`;

await build({
    root,
    logLevel: "warn",
    build: { ssr: "src/entry-server.jsx", outDir: ssrOut, emptyOutDir: true, copyPublicDir: false },
});
const { render } = await import(pathToFileURL(`${ssrOut}/entry-server.js`).href);

const file = `${dist}/index.html`;
let html = fs.readFileSync(file, "utf8");

const placeholder = '<div id="root"></div>';
if (!html.includes(placeholder)) throw new Error(`prerender: ${placeholder} not found in dist/index.html`);
html = html.replace(placeholder, `<div id="root">${render()}</div>`);

const link = html.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (!link) throw new Error("prerender: stylesheet link not found in dist/index.html");
const css = fs.readFileSync(`${dist}${link[1]}`, "utf8");
if (css.includes("</style")) throw new Error("prerender: stylesheet cannot be inlined safely");
html = html.replace(link[0], () => `<style>${css}</style>`);

fs.writeFileSync(file, html);
console.log(`prerender: wrote dist/index.html (${(html.length / 1024).toFixed(1)} kB)`);
