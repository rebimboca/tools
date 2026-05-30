/**
 * Generates a URL pointing to a QR code image for the given text.
 *
 * @param text - The content to encode in the QR code.
 * @param size - The image size in pixels (64–1024). Default: 256.
 * @returns The QR code image URL, or `null` if input is invalid.
 *
 * @see https://www.qrcode.com/en/ - Denso Wave QR Code Official Website (Inventors of QR Code)
 */
export function generateQrCode(text: string, size = 256): string | null {
  if (!text || size < 64 || size > 1024) return null;
  const safe = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${safe}`;
}
