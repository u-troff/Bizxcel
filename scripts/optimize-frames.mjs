import sharp from "sharp";
import { readdir, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const SRC = "/Users/utroff/Desktop/Bizxcel/public/frames";
const OUT_DESKTOP = "/Users/utroff/Desktop/Bizxcel/public/scroll-hero/frames";
const OUT_MOBILE = "/Users/utroff/Desktop/Bizxcel/public/scroll-hero/frames-mobile";

// ezgif padding is not guaranteed — sort by the numeric run in the filename.
const naturalKey = (name) => {
  const m = name.match(/(\d+)(?=\.\w+$)/);
  return m ? Number(m[1]) : Number.MAX_SAFE_INTEGER;
};

// The sequence is cut at frame 60, where the ledger is closed and set down. Later
// footage (spreadsheet, consultation form) is deliberately not shipped.
const LIMIT = 60;

const all = (await readdir(SRC))
  .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
  .sort((a, b) => naturalKey(a) - naturalKey(b) || a.localeCompare(b));

const files = all.slice(0, LIMIT);

console.log(`found ${all.length} frames, using ${files.length}; last=${files.at(-1)}`);

for (const dir of [OUT_DESKTOP, OUT_MOBILE]) {
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
}

const pad = (n) => String(n).padStart(3, "0");

// Desktop: every frame at 1600px wide.
await Promise.all(
  files.map((file, i) =>
    sharp(path.join(SRC, file))
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(path.join(OUT_DESKTOP, `frame-${pad(i + 1)}.webp`))
  )
);

// Mobile: every 2nd frame at 900px wide, always including the final frame.
const mobileIdx = files.map((_, i) => i).filter((i) => i % 2 === 0);
if (mobileIdx.at(-1) !== files.length - 1) mobileIdx.push(files.length - 1);

await Promise.all(
  mobileIdx.map((srcIndex, i) =>
    sharp(path.join(SRC, files[srcIndex]))
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 68, effort: 6 })
      .toFile(path.join(OUT_MOBILE, `frame-${pad(i + 1)}.webp`))
  )
);

// Poster = last frame, used for reduced-motion and as the canvas fallback.
await sharp(path.join(SRC, files.at(-1)))
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 80, effort: 6 })
  .toFile("/Users/utroff/Desktop/Bizxcel/public/scroll-hero/poster.webp");

// Measure from disk once every write has settled.
const report = async (label, dir) => {
  const names = await readdir(dir);
  const sizes = await Promise.all(names.map((n) => stat(path.join(dir, n)).then((s) => s.size)));
  const total = sizes.reduce((a, b) => a + b, 0);
  console.log(
    `${label}: ${names.length} frames, ${(total / 1024 / 1024).toFixed(1)}MB total, ` +
      `avg ${Math.round(total / names.length / 1024)}KB, max ${Math.round(Math.max(...sizes) / 1024)}KB`
  );
};

await report("desktop", OUT_DESKTOP);
await report("mobile ", OUT_MOBILE);
