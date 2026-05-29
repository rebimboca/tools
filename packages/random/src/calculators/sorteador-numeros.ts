export function pickNumbers(start: number, end: number, amount = 1): number[] | null {
  if (!Number.isInteger(start) || !Number.isInteger(end) || !Number.isInteger(amount)) return null;
  if (amount < 1 || start > end) return null;
  const universe = end - start + 1;
  if (amount > universe) return null;

  const out: number[] = [];
  const seen = new Set<number>();
  while (out.length < amount) {
    const n = Math.floor(Math.random() * universe) + start;
    if (seen.has(n)) continue;
    seen.add(n);
    out.push(n);
  }
  return out;
}
