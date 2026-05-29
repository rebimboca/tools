export function binaryEncode(text: string): string | null {
  if (!text) return null;
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}
