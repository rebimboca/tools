export interface GenerateImageOptions {
  width: number;
  height: number;
  text?: string;
  background?: string;
  color?: string;
}

export function generateImage(options: GenerateImageOptions): string | null {
  if (options.width < 1 || options.height < 1) return null;
  const bg = options.background ?? "#f2f2f2";
  const color = options.color ?? "#222222";
  const text = options.text ?? `${options.width}x${options.height}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${options.width}" height="${options.height}"><rect width="100%" height="100%" fill="${bg}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${color}" font-family="Arial" font-size="18">${text}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
