/**
 * Encodes a text string into a Base64 encoded string.
 * Supports full multibyte Unicode characters (such as emojis and diacritics)
 * across both Node.js and browser environments.
 *
 * @param text - The plain text string to encode.
 * @returns The Base64 encoded string, or `null` if the input is null/empty/undefined.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Base64 - MDN Base64 glossary reference
 * @see https://tools.ietf.org/html/rfc3629 - UTF-8, a transformation format of ISO 10646
 *
 * @example
 * ```ts
 * base64Encode("Olá 🌟"); // "T2zDoSDim58="
 * ```
 */
export function base64Encode(text: string): string | null {
  if (!text) return null;

  if (typeof Buffer !== "undefined") {
    return Buffer.from(text, "utf8").toString("base64");
  }

  // Browser fallback supporting UTF-8 multibyte strings safely
  const bytes = new TextEncoder().encode(text);
  const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return globalThis.btoa(binString);
}
