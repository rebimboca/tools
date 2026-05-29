export function generateQrCode(text: string, size = 256): string | null {
  if (!text || size < 64 || size > 1024) return null;
  const safe = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${safe}`;
}
