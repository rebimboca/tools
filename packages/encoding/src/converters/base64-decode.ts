export function base64Decode(base64: string): string | null {
  if (!base64) return null;
  try {
    return Buffer.from(base64, "base64").toString("utf8");
  } catch {
    return null;
  }
}
