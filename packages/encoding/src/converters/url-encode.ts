/**
 * Encodes a string for safe use in a URL using percent-encoding.
 *
 * @param value - The string to encode.
 * @returns The URL-encoded string, or `null` if input is empty.
 *
 * @see https://tools.ietf.org/html/rfc3986 - RFC 3986: Uniform Resource Identifier (URI)
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 */
export function urlEncode(value: string): string | null {
  if (!value) return null;
  return encodeURIComponent(value);
}
