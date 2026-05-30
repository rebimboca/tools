import { createHash } from "node:crypto";

/**
 * Generates a SHA-256 hash of the input text.
 *
 * SHA-256 (Secure Hash Algorithm 256-bit) is part of the SHA-2 family
 * and produces a 64-character hexadecimal digest. It is widely used for
 * data integrity verification, digital signatures, and password hashing.
 *
 * @param text - The input string to hash. Returns `null` if empty.
 * @returns The SHA-256 hex digest (64 characters), or `null` if input is empty.
 *
 * @see https://csrc.nist.gov/publications/detail/fips/180/4/final - FIPS 180-4: Secure Hash Standard (NIST)
 *
 * @example
 * ```ts
 * encodeSHA256("abc"); // "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
 * ```
 */
export function encodeSHA256(text: string): string | null {
  if (!text) return null;
  const hash = createHash("sha256");
  hash.update(text);
  return hash.digest("hex");
}
