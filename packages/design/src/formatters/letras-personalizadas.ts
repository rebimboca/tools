export function customLetters(text: string, styleMap: Record<string, string>): string | null {
  if (!text) return null;
  return text
    .split("")
    .map((c) => styleMap[c] ?? styleMap[c.toLowerCase()] ?? c)
    .join("");
}
