export interface RandomOptions {
  amount: number;
  min: number;
  max: number;
  unique?: boolean;
  listOrder?: "asc" | "desc" | "none";
}

/**
 * Generates an array of random integers within a specified range.
 * Supports uniqueness guarantee and sorting order.
 * Prevents infinite loops by validating unique constraints against range size
 * (Pigeonhole Principle).
 *
 * @param options - Configuration for the random number generation.
 * @returns Array of random numbers, or `null` if the options are invalid.
 *
 * @see https://mathworld.wolfram.com/DirichletsBoxPrinciple.html - Dirichlet's Box (Pigeonhole) Principle (Wolfram MathWorld)
 *
 * @example
 * ```ts
 * generateRandomNumbers({ amount: 5, min: 1, max: 10, unique: true }); // [3, 9, 1, 5, 8]
 * ```
 */
export function generateRandomNumbers(options: RandomOptions): number[] | null {
  if (!options) return null;
  const { amount, min, max, unique = false, listOrder = "none" } = options;

  if (amount < 1 || amount > 1000 || min > max) return null;

  // Prevent infinite loops by checking if amount exceeds available unique integers
  const universe = max - min + 1;
  if (unique && amount > universe) return null;

  const out: number[] = [];
  const seen = new Set<number>();

  while (out.length < amount) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    if (unique && seen.has(n)) continue;
    seen.add(n);
    out.push(n);
  }

  if (listOrder === "asc") out.sort((a, b) => a - b);
  if (listOrder === "desc") out.sort((a, b) => b - a);

  return out;
}
