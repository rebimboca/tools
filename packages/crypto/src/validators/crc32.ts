const TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return c >>> 0;
});

export function calculateCRC32(text: string): string | null {
  if (!text) return null;
  let crc = 0xffffffff;
  for (let i = 0; i < text.length; i += 1) {
    const byte = text.charCodeAt(i);
    const tableValue = TABLE[(crc ^ byte) & 0xff] ?? 0;
    crc = tableValue ^ (crc >>> 8);
  }
  return ((crc ^ 0xffffffff) >>> 0).toString(16).padStart(8, "0");
}
