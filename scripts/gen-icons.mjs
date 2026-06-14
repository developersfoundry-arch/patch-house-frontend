/**
 * Zero-dependency PNG icon generator for PWA.
 * Uses only Node.js built-in `zlib` (Bun-compatible).
 * Produces: public/icon-192.png and public/icon-512.png
 *
 * Icon design: brand navy (#18213a) square background
 *              + brass/gold (#c9a752) ring centred — a "strand" motif.
 */
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

// Brand colors (matching CSS tokens)
const INK   = [24,  33,  58];   // oklch(0.22 0.045 250) ≈ #18213a
const BRASS = [201, 167, 82];   // oklch(0.76 0.10  75)  ≈ #c9a752

// ── Minimal PNG encoder ────────────────────────────────────────────────────

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const t   = Buffer.from(type, "ascii");
  const len = Buffer.allocUnsafe(4);
  len.writeUInt32BE(data.length);
  const combined = Buffer.concat([t, data]);
  const crcBuf   = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(combined));
  return Buffer.concat([len, t, data, crcBuf]);
}

function createPNG(size) {
  // IHDR — RGB (colour type 2)
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const cx = size / 2;
  const cy = size / 2;
  // Brass ring: outer 36 % radius, inner 20 % radius — safe zone for maskable icons
  const outerR = size * 0.36;
  const innerR = size * 0.20;

  // Raw scanlines: 0x00 filter byte + 3 bytes (RGB) per pixel
  const rowLen = 1 + size * 3;
  const raw    = Buffer.allocUnsafe(size * rowLen);

  for (let y = 0; y < size; y++) {
    raw[y * rowLen] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      const d   = Math.hypot(x - cx, y - cy);
      const [r, g, b] = (d <= outerR && d >= innerR) ? BRASS : INK;
      const off = y * rowLen + 1 + x * 3;
      raw[off] = r; raw[off + 1] = g; raw[off + 2] = b;
    }
  }

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(raw)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

mkdirSync("public", { recursive: true });
writeFileSync("public/icon-192.png", createPNG(192));
writeFileSync("public/icon-512.png", createPNG(512));
console.log("✓ public/icon-192.png (192 × 192)");
console.log("✓ public/icon-512.png (512 × 512)");
