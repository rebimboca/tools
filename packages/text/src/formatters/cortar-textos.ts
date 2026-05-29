export function truncateText(text: string, limit: number): string | null {
  if (!text || limit < 1) return null;
  return text.length <= limit ? text : `${text.slice(0, limit)}...`;
}
