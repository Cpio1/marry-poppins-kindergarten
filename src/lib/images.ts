import fs from "node:fs";
import path from "node:path";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif|svg)$/i;

const LOGO_NAMES = ["logo"];
const HERO_NAMES = ["main-page", "main", "hero"];
const ABOUT_NAMES = ["about"];

export type SiteImage = { src: string; width: number; height: number };

/** Реальный размер изображения из заголовка файла (JPEG / PNG / WebP / GIF / SVG). */
function readSize(buf: Buffer, file: string): { width: number; height: number } | null {
  if (/\.svg$/i.test(file)) {
    const head = buf.toString("utf8", 0, 2000);
    const vb = head.match(/viewBox=["']\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/);
    if (vb) return { width: Math.round(+vb[1]), height: Math.round(+vb[2]) };
    const w = head.match(/\swidth=["']([\d.]+)/);
    const h = head.match(/\sheight=["']([\d.]+)/);
    return w && h ? { width: Math.round(+w[1]), height: Math.round(+h[1]) } : null;
  }
  if (buf.length < 30) return null;
  if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (buf.toString("ascii", 0, 3) === "GIF") return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
    return null;
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSOF) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}

function loadImages(): SiteImage[] {
  let files: string[];
  try {
    files = fs.readdirSync(IMAGES_DIR).filter((f) => IMAGE_EXT.test(f));
  } catch {
    return [];
  }
  return files
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .flatMap((file) => {
      const size = readSize(fs.readFileSync(path.join(IMAGES_DIR, file)), file);
      return size ? [{ src: `/images/${encodeURIComponent(file)}`, ...size }] : [];
    });
}

const baseName = (img: SiteImage) =>
  decodeURIComponent(path.basename(img.src)).replace(IMAGE_EXT, "").toLowerCase();

const findByName = (all: SiteImage[], names: string[]) =>
  names.map((n) => all.find((img) => baseName(img) === n)).find(Boolean) ?? null;

/**
 * Изображения из public/images:
 *  - logo.*                     — логотип
 *  - main-page.* / main.* / hero.* — главное фото
 *  - about.*                    — фото для раздела «О садике» (необязательно)
 *  - остальные                  — галерея (по имени файла)
 */
export function getSiteImages() {
  const all = loadImages();
  const logo = findByName(all, LOGO_NAMES);
  const hero = findByName(all, HERO_NAMES);
  const aboutOwn = findByName(all, ABOUT_NAMES);
  const gallery = all.filter((img) => img !== logo && img !== hero && img !== aboutOwn);
  // Если отдельного about.* нет — берём первое фото галереи (оно остаётся и в галерее)
  const about = aboutOwn ?? gallery[0] ?? null;

  return { logo, hero, about, gallery };
}
