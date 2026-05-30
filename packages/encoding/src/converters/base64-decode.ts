/**
 * Decodes a Base64 encoded string back into a plain text string.
 * Supports full multibyte Unicode characters (such as emojis and diacritics)
 * across both Node.js and browser environments.
 *
 * @param base64 - The Base64 encoded string to decode.
 * @returns The decoded plain text string, or `null` if input is invalid or null/empty.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Base64 - MDN Base64 glossary reference
 * @see https://tools.ietf.org/html/rfc3629 - UTF-8, a transformation format of ISO 10646
 *
 * @example
 * ```ts
 * base64Decode("T2zDoSDim58="); // "Olá 🌟"
 * ```
 */
export function base64Decode(base64: string): string | null {
  if (!base64) return null;

  try {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(base64, "base64").toString("utf8");
    }

    // Browser fallback supporting UTF-8 multibyte strings safely
    const binString = globalThis.atob(base64);
    const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}
