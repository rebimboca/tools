export interface CharacterInfo {
  char: string;
  codePoint: number;
  hex: string;
}

/**
 * Returns detailed Unicode information for each character in a string.
 *
 * @param value - The string to inspect.
 * @returns Array of character info objects, or `null` if empty.
 *
 * @see https://unicode.org/charts/ - Unicode Character Charts
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
 */
export function characterInfo(value: string): CharacterInfo[] | null {
  if (!value) return null;
  return Array.from(value).map((char) => {
    const codePoint = char.codePointAt(0) ?? 0;
    return { char, codePoint, hex: `U+${codePoint.toString(16).toUpperCase()}` };
  });
}
