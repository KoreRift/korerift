// ottimizza-uploads.mjs
// Ridimensiona e comprime le immagini caricate dall'editor (public/uploads/).
// Gira AUTOMATICAMENTE durante il deploy (GitHub Actions), prima del build,
// cosi le immagini online sono leggere anche se un collaboratore ne carica una pesante.
// Si puo lanciare anche a mano:  npm run ottimizza-uploads
//
// Mantiene SEMPRE lo stesso nome/estensione del file (per non rompere i link nei contenuti).
// Riscrive il file solo se il risultato e piu piccolo dell'originale.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const DIR = "public/uploads";
const MAX_WIDTH = 1280; // larghezza massima (le card/guide non hanno bisogno di piu)
const JPG_QUALITY = 80;
const WEBP_QUALITY = 80;
const PNG_QUALITY = 80;

const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// Elenca ricorsivamente i file in una cartella (vuoto se non esiste).
async function walk(dir) {
  let out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out; // cartella inesistente: niente da fare
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out = out.concat(await walk(p));
    else out.push(p);
  }
  return out;
}

let optimized = 0;
let savedKB = 0;

for (const file of await walk(DIR)) {
  const ext = extname(file).toLowerCase();
  if (!EXTS.has(ext)) continue;

  const input = await readFile(file);
  const before = input.length;

  let img = sharp(input, { failOn: "none" }).rotate(); // rotate(): rispetta l'orientamento EXIF
  const meta = await img.metadata();
  if (meta.width && meta.width > MAX_WIDTH) img = img.resize({ width: MAX_WIDTH });

  if (ext === ".png") img = img.png({ compressionLevel: 9, palette: true, quality: PNG_QUALITY });
  else if (ext === ".webp") img = img.webp({ quality: WEBP_QUALITY });
  else img = img.jpeg({ quality: JPG_QUALITY, mozjpeg: true });

  const output = await img.toBuffer();

  // Riscrive solo se conviene davvero (evita perdite di qualita inutili su file gia ottimi).
  if (output.length < before * 0.95) {
    await writeFile(file, output);
    const kb = Math.round((before - output.length) / 1024);
    savedKB += kb;
    optimized++;
    console.log(`  ${file}: ${Math.round(before / 1024)}KB -> ${Math.round(output.length / 1024)}KB`);
  }
}

console.log(`[uploads] Ottimizzate ${optimized} immagini, risparmiati ${savedKB} KB.`);
