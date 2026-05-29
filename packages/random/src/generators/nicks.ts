const PART_A = ["neo", "dark", "ultra", "pixel", "cyber", "bravo", "ghost", "storm"];
const PART_B = ["fox", "lion", "hawk", "byte", "nova", "drake", "wolf", "zero"];

export function generateNicks(amount = 1): string[] | null {
  if (amount < 1 || amount > 200) return null;
  return Array.from(
    { length: amount },
    () =>
      `${PART_A[Math.floor(Math.random() * PART_A.length)]}_${PART_B[Math.floor(Math.random() * PART_B.length)]}`
  );
}
