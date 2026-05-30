import { createHash } from "node:crypto";

/**
 * Generates a SHA-512 hash of the input text.
 *
 * SHA-512 (Secure Hash Algorithm 512-bit) is part of the SHA-2 family
 * and produces a 128-character hexadecimal digest. It provides stronger
 * collision resistance than SHA-256 at the cost of a larger output.
 *
 * @param text - The input string to hash. Returns `null` if empty.
 * @returns The SHA-512 hex digest (128 characters), or `null` if input is empty.
 *
 * @see https://csrc.nist.gov/publications/detail/fips/180/4/final - FIPS 180-4: Secure Hash Standard (NIST)
 *
 * @example
 * ```ts
 * encodeSHA512("abc"); // "ddaf35a193617aba..."
 * ```
 */
export function encodeSHA512(text: string): string | null {
  if (!text) return null;
  const hash = createHash("sha512");
  hash.update(text);
  return hash.digest("hex");
}
