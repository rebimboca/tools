export function urlEncode(value: string): string | null {
  if (!value) return null;
  return encodeURIComponent(value);
}
