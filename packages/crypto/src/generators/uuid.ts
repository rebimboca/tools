import { randomUUID } from "node:crypto";

/**
 * Generates a random UUID version 4.
 *
 * @returns A standard string representation of a UUID v4.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc4122 - RFC 4122: A Universally Unique IDentifier (UUID) URN Namespace
 */
export function generateUUID(): string {
  return randomUUID();
}
