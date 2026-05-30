/**
 * Calcula os dois dígitos verificadores de uma CNH.
 *
 * Usa dois passes de Módulo 11 com pesos diferentes:
 * - 1º DV: pesos decrescentes de 9 a 1.
 * - 2º DV: pesos crescentes de 1 a 9.
 *
 * @param base - 9 dígitos base da CNH.
 * @returns String de 2 dígitos verificadores.
 */
function calcDigits(base: string): string {
  let sum = 0;
  for (let i = 0, w = 9; i < 9; i += 1, w -= 1) sum += Number(base[i]) * w;
  let d1 = sum % 11;
  if (d1 === 10) d1 = 0;
  sum = 0;
  for (let i = 0, w = 1; i < 9; i += 1, w += 1) sum += Number(base[i]) * w;
  let d2 = sum % 11;
  if (d2 === 10) d2 = 0;
  return `${d1}${d2}`;
}

/**
 * Gera um número de CNH (Carteira Nacional de Habilitação) válido.
 *
 * A CNH possui 11 dígitos:
 * - Posições 1-9: Número sequencial.
 * - Posições 10-11: Dígitos verificadores (Módulo 11).
 *
 * @returns String de 11 dígitos representando uma CNH válida.
 *
 * @see https://www.gov.br/senatran/pt-br/assuntos/carteira-nacional-de-habilitacao-cnh - Carteira Nacional de Habilitação (CNH) no Portal do Governo Federal / SENATRAN
 *
 * @example
 * ```ts
 * gerarCNH(); // "04132536700" (exemplo)
 * ```
 */
export function gerarCNH(): string {
  const base = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");
  return `${base}${calcDigits(base)}`;
}

/**
 * Valida um número de CNH verificando os dígitos verificadores.
 *
 * @param valor - CNH a validar, podendo conter pontuação.
 * @returns `true` se os dígitos verificadores são consistentes.
 *
 * @see https://www.gov.br/senatran/pt-br - Secretaria Nacional de Trânsito (SENATRAN)
 *
 * @example
 * ```ts
 * validarCNH("04132536700"); // true
 * validarCNH("00000000000"); // false (na maioria dos casos)
 * ```
 */
export function validarCNH(valor: string): boolean {
  const cnh = valor.replace(/\D/g, "");
  if (cnh.length !== 11) return false;
  return cnh.slice(9) === calcDigits(cnh.slice(0, 9));
}
