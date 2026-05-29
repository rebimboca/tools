export interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
}

function clamp(v: number): number {
  return Math.min(255, Math.max(0, v));
}

export function colorPicker(input: {
  hex?: string;
  rgb?: { r: number; g: number; b: number };
}): ColorInfo | null {
  if (input.hex) {
    const clean = input.hex.replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return { hex: `#${clean.toUpperCase()}`, rgb: { r, g, b } };
  }

  if (input.rgb) {
    const r = clamp(input.rgb.r);
    const g = clamp(input.rgb.g);
    const b = clamp(input.rgb.b);
    const hex =
      `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
    return { hex, rgb: { r, g, b } };
  }

  return null;
}
