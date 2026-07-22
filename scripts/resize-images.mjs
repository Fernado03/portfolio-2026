// One-off: generate responsive image variants into public/resized/
// Usage: node scripts/resize-images.mjs
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const PUB = path.resolve("public");
const OUT = path.join(PUB, "resized");

// target widths per asset class
const jobs = [
  // project covers: displayed ~540-550px → 800w + 400w
  { dir: "projects", widths: [800, 400], quality: 78 },
  // about photos: displayed ~344-450px → 700w + 350w
  { dir: "about", widths: [700, 350], quality: 78 },
  // awards photo: displayed as 57px thumb + FYP award block ~200px → 400w
  { dir: "awards", widths: [400], quality: 78 },
  // skill icons: displayed 32px → 96w (3x for retina)
  { dir: "skills", widths: [96], quality: 85 },
];

const results = [];
for (const job of jobs) {
  const srcDir = path.join(PUB, job.dir);
  const outDir = path.join(OUT, job.dir);
  await mkdir(outDir, { recursive: true });
  const files = (await readdir(srcDir)).filter(f => /\.(jpe?g|png)$/i.test(f));
  for (const f of files) {
    const src = path.join(srcDir, f);
    const origKb = Math.round((await stat(src)).size / 1024);
    const base = f.replace(/\.(jpe?g|png)$/i, "");
    for (const w of job.widths) {
      const outName = `${base}-${w}w.webp`;
      const out = path.join(outDir, outName);
      const info = await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: job.quality })
        .toFile(out);
      results.push({ file: `${job.dir}/${outName}`, origKb, newKb: Math.round(info.size / 1024) });
    }
  }
}

const totalOrig = results.reduce((a, r) => a + r.origKb, 0);
const totalNew = results.reduce((a, r) => a + r.newKb, 0);
console.log(`variants: ${results.length}`);
console.log(`original set ~${totalOrig}KB (counted per variant) → new webp ~${totalNew}KB`);
results.slice(0, 6).forEach(r => console.log(`  ${r.file}: ${r.origKb}→${r.newKb}KB`));
