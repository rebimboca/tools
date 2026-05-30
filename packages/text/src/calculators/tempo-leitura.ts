/**
 * Calculates the estimated reading time for a given text.
 * The average reading speed is assumed to be 200 words per minute.
 *
 * @param text - The text to analyze.
 * @param wordsPerMinute - Optional custom words per minute rate (default is 200).
 * @returns The estimated reading time in minutes (rounded up to nearest minute).
 */
export function readingTime(text: string, wordsPerMinute: number = 200): number {
  if (!text) return 0;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  if (words === 0) return 0;
  return Math.ceil(words / wordsPerMinute);
}
