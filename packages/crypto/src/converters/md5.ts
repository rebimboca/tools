import { createHash } from "node:crypto";

export function encodeMD5(text: string): string | null {
  if (!text) return null;
  const hash = createHash("md5");
  hash.update(text);
  return hash.digest("hex");
}
