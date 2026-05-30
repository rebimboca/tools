/**
 * Decodes a hexadecimal string back to its original text.
 *
 * @param hex - The hex string to decode.
 * @returns The decoded text.
 */
export function hexDecode(hex: string): string {
  if (!hex) return "";
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}
