import { createHmac } from "node:crypto";

/**
 * Generates an HMAC (Hash-based Message Authentication Code) of the input text.
 *
 * @param text - The input string to hash.
 * @param secret - The cryptographic key to use for HMAC.
 * @param algorithm - The hashing algorithm to use (e.g., 'sha256', 'sha512'). Defaults to 'sha256'.
 * @returns The HMAC hex digest, or `null` if text or secret is empty.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc2104 - RFC 2104: HMAC (IETF)
 */
export function encodeHMAC(
  text: string,
  secret: string,
  algorithm: string = "sha256"
): string | null {
  if (!text || !secret) return null;
  const hmac = createHmac(algorithm, secret);
  hmac.update(text);
  return hmac.digest("hex");
}
