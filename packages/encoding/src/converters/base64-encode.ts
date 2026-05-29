export function base64Encode(text: string): string | null {
  if (!text) return null;
  return Buffer.from(text, "utf8").toString("base64");
}
