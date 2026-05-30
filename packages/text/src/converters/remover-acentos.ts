/**
 * Removes diacritical marks (accents) from a string using Unicode NFD normalization.
 *
 * @param text - The accented string to normalize.
 * @returns The string without accents, or `null` if input is empty.
 *
 * @see https://unicode.org/reports/tr15/ - Unicode Normalization Forms (UAX #15)
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
 */
export function removeAccents(text: string): string | null {
  if (!text) return null;
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
