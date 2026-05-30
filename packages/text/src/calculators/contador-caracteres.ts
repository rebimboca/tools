/**
 * Counts characters, words, and lines in a string.
 *
 * @param text - The text to analyze.
 * @returns Object with character, word, and line counts, or `null` if empty.
 *
 * @see https://unicode.org/reports/tr29/ - Unicode Text Segmentation (UAX #29)
 */
export function countCharacters(
  text: string
): { characters: number; words: number; lines: number } | null {
  if (!text) return null;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split(/\r?\n/).length;
  return { characters: text.length, words, lines };
}
