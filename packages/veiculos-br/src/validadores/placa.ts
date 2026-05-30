/**
 * Valida se uma string é uma placa de veículo brasileira válida (padrão tradicional ou Mercosul).
 *
 * @param placa - A string contendo a placa a ser validada.
 * @returns true se a placa for válida sob um dos dois formatos oficiais, false caso contrário.
 *
 * @see https://www.gov.br/infraestrutura/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao7802019.pdf - Resolução do PIV Mercosul Contran
 *
 * @example
 * ```ts
 * validarPlacaVeiculo("ABC1D23"); // true
 * validarPlacaVeiculo("ABC-1234"); // true
 * validarPlacaVeiculo("ABC123A"); // false
 * ```
 */
export function validarPlacaVeiculo(placa: string): boolean {
  if (!placa) return false;

  // Clean layout removing spacing or hyphens
  const clean = placa.replace(/[\s-]/g, "").toUpperCase();

  // 1. Traditional format: 3 letters followed by 4 digits (e.g. AAA9999)
  const regexAntigo = /^[A-Z]{3}\d{4}$/;

  // 2. Mercosul format: 3 letters, 1 digit, 1 letter, 2 digits (e.g. AAA9A99)
  const regexMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/;

  return regexAntigo.test(clean) || regexMercosul.test(clean);
}
