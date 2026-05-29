export interface CharacterInfo {
  char: string;
  codePoint: number;
  hex: string;
}

export function characterInfo(value: string): CharacterInfo[] | null {
  if (!value) return null;
  return Array.from(value).map((char) => {
    const codePoint = char.codePointAt(0) ?? 0;
    return { char, codePoint, hex: `U+${codePoint.toString(16).toUpperCase()}` };
  });
}
