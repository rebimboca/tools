/**
 * Decodes a percent-encoded URL string back into plain text.
 *
 * @param value - The URL-encoded string to decode.
 * @returns The decoded string, or `null` if input is empty or malformed.
 *
 * @see https://tools.ietf.org/html/rfc3986 - RFC 3986: Uniform Resource Identifier (URI)
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
 */
export function urlDecode(value: string): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}
