const NAMES = ["Ana", "Bruno", "Carlos", "Diana", "Eduardo", "Fernanda", "Gabriel", "Helena"];

export function generateNames(amount = 1): string[] | null {
  if (amount < 1 || amount > 200) return null;
  return Array.from({ length: amount }, () => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    return name ?? "Anon";
  });
}
