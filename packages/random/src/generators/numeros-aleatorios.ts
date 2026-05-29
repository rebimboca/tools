export interface RandomOptions {
  amount: number;
  min: number;
  max: number;
  unique?: boolean;
  listOrder?: "asc" | "desc" | "none";
}

export function generateRandomNumbers(options: RandomOptions): number[] | null {
  const { amount, min, max, unique = false, listOrder = "none" } = options;
  if (amount < 1 || amount > 1000 || min > max) return null;
  const out: number[] = [];
  const seen = new Set<number>();
  while (out.length < amount) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    if (unique && seen.has(n)) continue;
    seen.add(n);
    out.push(n);
    if (unique && seen.size === max - min + 1 && out.length < amount) return null;
  }
  if (listOrder === "asc") out.sort((a, b) => a - b);
  if (listOrder === "desc") out.sort((a, b) => b - a);
  return out;
}
