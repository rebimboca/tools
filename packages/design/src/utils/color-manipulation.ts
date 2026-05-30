/**
 * Lightens a hex color by a given percentage.
 *
 * @param hex - The hex color code (e.g., "#ff0000" or "ff0000").
 * @param percent - The percentage to lighten the color (0-100).
 * @returns The lightened hex color code.
 */
export function lighten(hex: string, percent: number): string {
  return adjustColor(hex, percent);
}

/**
 * Darkens a hex color by a given percentage.
 *
 * @param hex - The hex color code (e.g., "#ff0000" or "ff0000").
 * @param percent - The percentage to darken the color (0-100).
 * @returns The darkened hex color code.
 */
export function darken(hex: string, percent: number): string {
  return adjustColor(hex, -percent);
}

function adjustColor(hex: string, percent: number): string {
  let hexCode = hex.replace(/^#/, "");
  if (hexCode.length === 3) {
    hexCode = hexCode
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(hexCode, 16);
  const amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let B = ((num >> 8) & 0x00ff) + amt;
  let G = (num & 0x0000ff) + amt;

  R = Math.max(0, Math.min(255, R));
  B = Math.max(0, Math.min(255, B));
  G = Math.max(0, Math.min(255, G));

  return "#" + (G | (B << 8) | (R << 16)).toString(16).padStart(6, "0");
}
