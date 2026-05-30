/**
 * Gera uma cor HEX aleatória.
 *
 * @returns A string da cor HEX (ex: "#A3F412").
 */
export function gerarCorAleatoria(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Gera uma paleta de cores HEX aleatórias.
 *
 * @param quantidade - O número de cores na paleta (padrão 5).
 * @returns Um array com as strings das cores HEX.
 */
export function gerarPaletaAleatoria(quantidade: number = 5): string[] {
  return Array.from({ length: Math.max(1, quantidade) }, () => gerarCorAleatoria());
}
