import { createHash } from "node:crypto";

export function encodeSHA1(text: string): string | null {
  if (!text) return null;
  const hash = createHash("sha1");
  hash.update(text);
  return hash.digest("hex");
}
