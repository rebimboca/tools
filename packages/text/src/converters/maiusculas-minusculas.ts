export function toUpperCase(text: string): string | null {
  if (!text) return null;
  return text.toUpperCase();
}

export function toLowerCase(text: string): string | null {
  if (!text) return null;
  return text.toLowerCase();
}

export function toTitleCase(
  text: string,
  ignoreShorterThan = 0,
  ignoreWords: string[] = []
): string | null {
  if (!text) return null;
  const ignored = new Set(ignoreWords.map((w) => w.toLowerCase()));
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => {
      if (word.length <= ignoreShorterThan || ignored.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
