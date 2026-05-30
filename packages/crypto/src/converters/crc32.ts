/**
 * Pre-computed CRC-32 lookup table (IEEE 802.3 polynomial 0xEDB88320).
 *
 * Each entry represents the CRC remainder for a single byte value (0-255),
 * computed using the reflected (LSB-first) algorithm.
 *
 * @see https://www.itu.int/rec/T-REC-V.42 - ITU-T Recommendation V.42: Error-correcting procedures for DCEs (Annex A: CRC-32)
 */
const TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return c >>> 0;
});

/**
 * Calculates the CRC-32 checksum of the input text.
 *
 * CRC-32 (Cyclic Redundancy Check, 32-bit) is a non-cryptographic hash
 * function used for error detection in data transmission and storage
 * (ZIP files, Ethernet frames, PNG images, etc.).
 *
 * Returns the checksum as an 8-character lowercase hexadecimal string.
 *
 * @param text - The input string to checksum. Returns `null` if empty.
 * @returns The CRC-32 hex string (8 characters), or `null` if input is empty.
 *
 * @see https://www.itu.int/rec/T-REC-V.42 - ITU-T Recommendation V.42 (Annex A: CRC-32 Specification)
 * @see https://reveng.sourceforge.io/crc-catalogue/all.htm#crc.cat.crc-32-iso-hdlc

 *
 * @example
 * ```ts
 * calculateCRC32("abc");   // "352441c2"
 * calculateCRC32("hello"); // "3610a686"
 * ```
 */
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
