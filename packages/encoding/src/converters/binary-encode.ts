/**
 * Encodes a text string into an 8-bit binary string representation separated by spaces.
 * Uses a UTF-8 byte stream, guaranteeing complete compatibility with multibyte
 * Unicode characters (such as emojis and diacritics).
 *
 * @param text - The plain text string to encode.
 * @returns The space-separated 8-bit binary string, or `null` if the input is null/empty/undefined.
 *
 * @see https://tools.ietf.org/html/rfc3629 - UTF-8, a transformation format of ISO 10646
 *
 * @example
 * ```ts
 * binaryEncode("A"); // "01000001"
 * binaryEncode("á"); // "11000011 10100001"
 * ```
 */
export function binaryEncode(text: string): string | null {
  if (!text) return null;

  const bytes = new TextEncoder().encode(text);
  return Array.from(bytes)
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join(" ");
}
