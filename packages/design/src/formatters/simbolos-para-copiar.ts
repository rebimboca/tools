const SYMBOLS: Record<string, string[]> = {
  geral: ["★", "☆", "✓", "✔", "✕", "✖", "→", "←", "↑", "↓"],
  moedas: ["$", "€", "£", "¥", "₿", "₽", "₹"],
  matematico: ["∞", "≈", "≠", "≤", "≥", "±", "∑", "√"]
};

export function symbolsToCopy(category = "geral"): string[] | null {
  return SYMBOLS[category] ?? null;
}
