export function countCharacters(
  text: string
): { characters: number; words: number; lines: number } | null {
  if (!text) return null;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split(/\r?\n/).length;
  return { characters: text.length, words, lines };
}
