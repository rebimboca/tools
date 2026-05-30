/**
 * Encodes a string into its hexadecimal representation.
 *
 * @param text - The input string to encode.
 * @returns The hexadecimal encoded string.
 */
export function hexEncode(text: string): string {
  if (!text) return "";
  let hex = "";
  for (let i = 0; i < text.length; i++) {
    hex += text.charCodeAt(i).toString(16).padStart(2, "0");
  }
  return hex;
}
