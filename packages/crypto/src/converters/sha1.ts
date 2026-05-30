import { createHash } from "node:crypto";

/**
 * Generates a SHA-1 hash of the input text.
 *
 * SHA-1 (Secure Hash Algorithm 1) produces a 40-character hexadecimal digest.
 * It is considered cryptographically weak (collision attacks demonstrated in 2017)
 * and should NOT be used for security. Suitable for legacy compatibility and checksums.
 *
 * @param text - The input string to hash. Returns `null` if empty.
 * @returns The SHA-1 hex digest (40 characters), or `null` if input is empty.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc3174 - RFC 3174: US Secure Hash Algorithm 1 (SHA1)
 *
 * @example
 * ```ts
 * encodeSHA1("abc"); // "a9993e364706816aba3e25717850c26c9cd0d89d"
 * ```
 */
export function encodeSHA1(text: string): string | null {
  if (!text) return null;
  const hash = createHash("sha1");
  hash.update(text);
  return hash.digest("hex");
}
