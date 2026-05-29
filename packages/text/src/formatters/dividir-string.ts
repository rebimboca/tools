export function splitString(text: string, separator: string): string[] | null {
  if (!text || !separator) return null;
  return text.split(separator);
}
