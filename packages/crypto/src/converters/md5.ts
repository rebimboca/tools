import { createHash } from "node:crypto";

/**
 * Generates an MD5 hash of the input text.
 *
 * MD5 (Message-Digest Algorithm 5) produces a 32-character hexadecimal digest.
 * It is fast but cryptographically broken — do NOT use for security purposes.
 * Suitable for checksums, cache keys, and non-security data fingerprinting.
 *
 * @param text - The input string to hash. Returns `null` if empty.
 * @returns The MD5 hex digest (32 characters), or `null` if input is empty.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc1321 - RFC 1321: The MD5 Message-Digest Algorithm
 *
 * @example
 * ```ts
 * encodeMD5("abc"); // "900150983cd24fb0d6963f7d28e17f72"
 * ```
 */
export function encodeMD5(text: string): string | null {
  if (!text) return null;
  const hash = createHash("md5");
  hash.update(text);
  return hash.digest("hex");
}
