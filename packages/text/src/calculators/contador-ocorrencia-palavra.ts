export function countWordOccurrences(text: string, target: string): number | null {
  if (!text || !target) return null;
  const regex = new RegExp(target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return (text.match(regex) ?? []).length;
}
