export interface AvatarOptions {
  initials: string;
  fontScale?: number; // Sizing multiplier (e.g. 0.3 for 30% of height)
}

export interface GradientOptions {
  startColor: string;
  endColor: string;
  angle?: number; // Sizing angle in degrees (e.g. 45)
}

export interface GenerateImageOptions {
  width: number;
  height: number;
  text?: string;
  background?: string;
  color?: string;
  avatar?: AvatarOptions;
  gradient?: GradientOptions;
}

function escapeXml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generates an SVG placeholder or avatar image as a data-URI.
 * Supports linear gradients, text centering, font scaling, and complete XSS protection.
 *
 * @param options - Configuration for the SVG generator.
 * @returns Fully encoded SVG data-URI, or `null` if dimensions are invalid.
 *
 * @see https://www.w3.org/Graphics/SVG/ - SVG W3C reference specification
 * @see https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html - XML XSS protection references
 *
 * @example
 * ```ts
 * generateImage({ width: 200, height: 200, avatar: { initials: "JD" } });
 * generateImage({
 *   width: 400,
 *   height: 250,
 *   gradient: { startColor: "#ff007f", endColor: "#7f00ff" }
 * });
 * ```
 */
export function generateImage(options: GenerateImageOptions): string | null {
  if (!options || options.width < 1 || options.height < 1) return null;

  const bg = options.background ?? "#f2f2f2";
  const color = options.color ?? "#222222";

  let fillAttr = `fill="${escapeXml(bg)}"`;
  let defsBlock = "";

  // 1. Linear Gradient Background
  if (options.gradient) {
    const grad = options.gradient;
    const start = escapeXml(grad.startColor);
    const end = escapeXml(grad.endColor);
    const angle = grad.angle ?? 45;

    // Convert angle to normalized coordinates
    const rad = (angle * Math.PI) / 180;
    const x1 = Math.round(50 - Math.cos(rad) * 50);
    const y1 = Math.round(50 + Math.sin(rad) * 50);
    const x2 = Math.round(50 + Math.cos(rad) * 50);
    const y2 = Math.round(50 - Math.sin(rad) * 50);

    defsBlock = `
      <defs>
        <linearGradient id="image_grad" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
    `.trim();

    fillAttr = 'fill="url(#image_grad)"';
  }

  // 2. Text or Avatar Initials Sizing
  let text = options.text ?? `${options.width}x${options.height}`;
  let fontSize = 18;

  if (options.avatar) {
    text = options.avatar.initials.toUpperCase();
    const scale = options.avatar.fontScale ?? 0.35;
    // Base size on the smaller dimension to prevent overflow
    fontSize = Math.round(Math.min(options.width, options.height) * scale);
  } else {
    // Basic scaling for placeholder texts
    fontSize = Math.round(Math.min(options.width, options.height) * 0.12);
    if (fontSize < 12) fontSize = 12;
    if (fontSize > 48) fontSize = 48;
  }

  const cleanText = escapeXml(text);
  const cleanColor = escapeXml(color);

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${options.width}" height="${options.height}">`,
    defsBlock ? `  ${defsBlock}` : "",
    `  <rect width="100%" height="100%" ${fillAttr}/>`,
    `  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${cleanColor}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="bold">${cleanText}</text>`,
    `</svg>`
  ]
    .filter(Boolean)
    .join("\n");

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
