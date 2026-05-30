/**
 * Decodes a space-separated 8-bit binary string back into a plain text string.
 * Uses a UTF-8 byte stream, guaranteeing complete compatibility with multibyte
 * Unicode characters (such as emojis and diacritics).
 *
 * @param binary - The space-separated 8-bit binary string to decode.
 * @returns The decoded plain text string, or `null` if the input is invalid or null/empty.
 *
 * @see https://tools.ietf.org/html/rfc3629 - UTF-8, a transformation format of ISO 10646
 *
 * @example
 * ```ts
 * binaryDecode("01000001"); // "A"
 * binaryDecode("11000011 10100001"); // "á"
 * ```
 */
export function binaryDecode(binary: string): string | null {
  if (!binary) return null;

  const parts = binary.trim().split(/\s+/);
  if (parts.some((p) => !/^[01]{8}$/.test(p))) return null;

  try {
    const bytes = new Uint8Array(parts.map((p) => parseInt(p, 2)));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}
