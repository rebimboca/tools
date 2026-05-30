const MD5_REGEX = /^[a-f0-9]{32}$/i;
const SHA1_REGEX = /^[a-f0-9]{40}$/i;
const SHA256_REGEX = /^[a-f0-9]{64}$/i;
const SHA512_REGEX = /^[a-f0-9]{128}$/i;

/**
 * Checks if a string is a valid MD5 hash.
 *
 * @param value - The string to check.
 * @returns `true` if the string matches the MD5 hex format, `false` otherwise.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc1321 - RFC 1321: The MD5 Message-Digest Algorithm
 * @see https://csrc.nist.gov/publications/detail/fips/180/4/final - FIPS 180-4: Secure Hash Standard (NIST)
 */
export function isMD5(value: string): boolean {
  if (typeof value !== "string") return false;
  return MD5_REGEX.test(value);
}

/**
 * Checks if a string is a valid SHA-1 hash.
 *
 * @param value - The string to check.
 * @returns `true` if the string matches the SHA-1 hex format, `false` otherwise.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc3174 - RFC 3174: US Secure Hash Algorithm 1 (SHA1)
 */
export function isSHA1(value: string): boolean {
  if (typeof value !== "string") return false;
  return SHA1_REGEX.test(value);
}

/**
 * Checks if a string is a valid SHA-256 hash.
 *
 * @param value - The string to check.
 * @returns `true` if the string matches the SHA-256 hex format, `false` otherwise.
 *
 * @see https://csrc.nist.gov/publications/detail/fips/180/4/final - FIPS 180-4: Secure Hash Standard (NIST)
 */
export function isSHA256(value: string): boolean {
  if (typeof value !== "string") return false;
  return SHA256_REGEX.test(value);
}

/**
 * Checks if a string is a valid SHA-512 hash.
 *
 * @param value - The string to check.
 * @returns `true` if the string matches the SHA-512 hex format, `false` otherwise.
 *
 * @see https://csrc.nist.gov/publications/detail/fips/180/4/final - FIPS 180-4: Secure Hash Standard (NIST)
 */
export function isSHA512(value: string): boolean {
  if (typeof value !== "string") return false;
  return SHA512_REGEX.test(value);
}

/**
 * Valida um valor de hash de acordo com o algoritmo especificado.
 *
 * Oferece uma interface unificada para verificar strings no formato hexadecimal
 * de MD5, SHA-1, SHA-256 e SHA-512.
 *
 * @param value - A string contendo o hash hexadecimal a ser verificado.
 * @param type - O algoritmo de hash ("md5" | "sha1" | "sha256" | "sha512").
 * @returns `true` se o hash for compatível com o formato do algoritmo, `false` caso contrário.
 *
 * @see https://csrc.nist.gov/publications/detail/fips/180/4/final - FIPS 180-4: Secure Hash Standard (NIST)

 *
 * @example
 * ```ts
 * validateHash("098f6bcd4621d373cade4e832627b4f6", "md5"); // true
 * validateHash("invalid-hash", "sha256");                 // false
 * ```
 */
export function validateHash(value: string, type: "md5" | "sha1" | "sha256" | "sha512"): boolean {
  switch (type) {
    case "md5":
      return isMD5(value);
    case "sha1":
      return isSHA1(value);
    case "sha256":
      return isSHA256(value);
    case "sha512":
      return isSHA512(value);
    default:
      return false;
  }
}
