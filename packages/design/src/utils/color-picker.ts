export interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

export interface ColorPickerInput {
  hex?: string;
  rgb?: { r: number; g: number; b: number };
  hsl?: { h: number; s: number; l: number };
}

function clamp(v: number, min = 0, max = 255): number {
  return Math.min(max, Math.max(min, v));
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = clamp(h, 0, 360) / 360;
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;
  let r = l;
  let g = l;
  let b = l;

  if (s !== 0) {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * Parses and converts colors bidirectionally between HEX, RGB, and HSL color spaces.
 * Supports normalization and bounds validation of coordinates.
 *
 * @param input - The input color data specifying hex, rgb, or hsl space coordinates.
 * @returns Comprehensive ColorInfo object containing all spaces, or `null` if the input is invalid.
 *
 * @see https://www.w3.org/TR/css-color-4/ - CSS Color Module Level 4 (Official W3C Specification)

 */
export function colorPicker(input: ColorPickerInput): ColorInfo | null {
  if (!input) return null;

  if (input.hex) {
    const clean = input.hex.replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return {
      hex: `#${clean.toUpperCase()}`,
      rgb: { r, g, b },
      hsl: rgbToHsl(r, g, b)
    };
  }

  if (input.rgb) {
    const r = clamp(input.rgb.r);
    const g = clamp(input.rgb.g);
    const b = clamp(input.rgb.b);
    const hex =
      `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
    return {
      hex,
      rgb: { r, g, b },
      hsl: rgbToHsl(r, g, b)
    };
  }

  if (input.hsl) {
    const { h, s, l } = input.hsl;
    const rgb = hslToRgb(h, s, l);
    const hex =
      `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`.toUpperCase();
    return {
      hex,
      rgb,
      hsl: { h: clamp(h, 0, 360), s: clamp(s, 0, 100), l: clamp(l, 0, 100) }
    };
  }

  return null;
}

/**
 * Calculates the relative luminance of an sRGB color.
 * Formula defined by WCAG 2.0.
 */
function getLuminance(r: number, g: number, b: number): number {
  const transform = (val: number) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  };
  const aR = transform(r / 255);
  const aG = transform(g / 255);
  const aB = transform(b / 255);
  return 0.2126 * aR + 0.7152 * aG + 0.0722 * aB;
}

/**
 * Calculates the contrast ratio between two HEX colors according to WCAG 2.0 standards.
 * Returns a ratio between 1 (no contrast) and 21 (maximum contrast, e.g. black and white).
 *
 * @param colorA - The first HEX color string (e.g. "#FFFFFF")
 * @param colorB - The second HEX color string (e.g. "#000000")
 * @returns The WCAG contrast ratio (rounded to 2 decimal places), or `null` if any input is invalid.
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html - WCAG 2.1 Contrast (Minimum)
 * @see https://www.w3.org/TR/WCAG20-TECHS/G17.html - WCAG 2.0 Luminance Contrast Ratio formula
 */
export function calculateContrastRatio(colorA: string, colorB: string): number | null {
  const pickerA = colorPicker({ hex: colorA });
  const pickerB = colorPicker({ hex: colorB });
  if (!pickerA || !pickerB) return null;

  const lumA = getLuminance(pickerA.rgb.r, pickerA.rgb.g, pickerA.rgb.b);
  const lumB = getLuminance(pickerB.rgb.r, pickerB.rgb.g, pickerB.rgb.b);

  const brightest = Math.max(lumA, lumB);
  const darkest = Math.min(lumA, lumB);

  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Math.round(ratio * 100) / 100;
}

/**
 * Generates harmonic color palettes based on a base HEX color.
 * Supported harmony types: complementary, analogous, triadic, and monochromatic.
 *
 * @param hexColor - The base HEX color string (e.g. "#FF0000").
 * @param type - The harmony scheme type.
 * @returns Array of hex color strings forming the palette, or `null` if input is invalid.
 *
 * @see https://www.w3.org/TR/css-color-4/ - CSS Color Module Level 4 (Official W3C Specification)

 */
export function generateHarmony(
  hexColor: string,
  type: "complementary" | "analogous" | "triadic" | "monochromatic"
): string[] | null {
  const color = colorPicker({ hex: hexColor });
  if (!color) return null;

  const { h, s, l } = color.hsl;
  const result: string[] = [];

  switch (type) {
    case "complementary": {
      const compH = (h + 180) % 360;
      const compColor = colorPicker({ hsl: { h: compH, s, l } });
      if (compColor) {
        result.push(color.hex, compColor.hex);
      }
      break;
    }
    case "analogous": {
      const h1 = (h + 30) % 360;
      const h2 = (h - 30 + 360) % 360;
      const c1 = colorPicker({ hsl: { h: h1, s, l } });
      const c2 = colorPicker({ hsl: { h: h2, s, l } });
      if (c1 && c2) {
        result.push(c2.hex, color.hex, c1.hex);
      }
      break;
    }
    case "triadic": {
      const h1 = (h + 120) % 360;
      const h2 = (h + 240) % 360;
      const c1 = colorPicker({ hsl: { h: h1, s, l } });
      const c2 = colorPicker({ hsl: { h: h2, s, l } });
      if (c1 && c2) {
        result.push(color.hex, c1.hex, c2.hex);
      }
      break;
    }
    case "monochromatic": {
      const l1 = Math.max(10, l - 30);
      const l2 = Math.max(20, l - 15);
      const l3 = Math.min(90, l + 15);
      const c1 = colorPicker({ hsl: { h, s, l: l1 } });
      const c2 = colorPicker({ hsl: { h, s, l: l2 } });
      const c3 = colorPicker({ hsl: { h, s, l: l3 } });

      const candidates = [c1, c2, color, c3];
      candidates.forEach((c) => {
        if (c && !result.includes(c.hex)) {
          result.push(c.hex);
        }
      });
      break;
    }
  }
  return result;
}

/**
 * Generates a CSS linear-gradient string from two HEX colors.
 *
 * @param colorA - The starting HEX color.
 * @param colorB - The ending HEX color.
 * @param angle - The gradient angle in degrees (default: 135).
 * @returns The CSS linear-gradient property value, or `null` if any input is invalid.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient - MDN linear-gradient()
 */
export function generateGradient(colorA: string, colorB: string, angle = 135): string | null {
  const pickerA = colorPicker({ hex: colorA });
  const pickerB = colorPicker({ hex: colorB });
  if (!pickerA || !pickerB) return null;

  return `linear-gradient(${angle}deg, ${pickerA.hex} 0%, ${pickerB.hex} 100%)`;
}
