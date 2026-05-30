/**
 * Truncates text to a specified maximum length, ensuring words are not cut in half
 * and appending a suffix.
 *
 * @param text - The string to truncate.
 * @param maxLength - Maximum allowed length including the suffix.
 * @param suffix - Suffix to append to the truncated string (default: "...").
 * @returns The truncated string, or the original text if it fits, or `null` if parameters are invalid.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow - CSS text-overflow (related concept)
 * @see https://www.unicode.org/charts/PDF/U2000.pdf - Unicode General Punctuation (Ellipsis U+2026 Specification)

 */
export function smartTruncate(text: string, maxLength: number, suffix = "..."): string | null {
  if (typeof text !== "string" || maxLength <= 0) return null;
  if (text.length <= maxLength) return text;

  const targetLength = maxLength - suffix.length;
  if (targetLength <= 0) return suffix.slice(0, maxLength);

  let truncated = text.slice(0, targetLength);

  // Find the last space to avoid cutting a word in half
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    truncated = truncated.slice(0, lastSpace);
  }

  // Remove trailing punctuation or spaces if any
  truncated = truncated.replace(/[\s,.;:!?]+$/, "");

  return truncated + suffix;
}
