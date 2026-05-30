/**
 * Calcula o dígito verificador de um RENAVAM usando Módulo 11.
 *
 * Percorre os dígitos da direita para a esquerda, multiplicando por
 * pesos crescentes de 2 a 9 (reiniciando em 2 ao chegar a 9).
 * O dígito é 11 - (soma % 11). Se >= 10, usa 0.
 *
 * @param base - 10 primeiros dígitos do RENAVAM.
 * @returns O dígito verificador (0-9).
 */
const calcRenavam = (base: string): number => {
  const digits = base.padStart(11, "0").split("").map(Number);
  let mult = 2;
  let sum = 0;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    sum += (digits[i] ?? 0) * mult;
    mult = mult === 9 ? 2 : mult + 1;
  }
  const mod = sum % 11;
  const d = 11 - mod;
  return d >= 10 ? 0 : d;
};

/**
 * Gera um número de RENAVAM (Registro Nacional de Veículos Automotores) válido.
 *
 * O RENAVAM possui 11 dígitos:
 * - Posições 1-10: Número sequencial.
 * - Posição 11: Dígito verificador (Módulo 11).
 *
 * @returns String de 11 dígitos representando um RENAVAM válido.
 *
 * @example
 * ```ts
 * gerarRENAVAM(); // "12345678901" (exemplo)
 * ```
 */
export function gerarRENAVAM(): string {
  const base = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join("");
  return `${base}${calcRenavam(base)}`;
}

/**
 * Valida um número de RENAVAM verificando o dígito verificador.
 *
 * @param valor - RENAVAM a validar, podendo conter pontuação.
 * @returns `true` se o dígito verificador é consistente.
 *
 * @example
 * ```ts
 * validarRENAVAM("12345678901"); // true (se gerado corretamente)
 * ```
 */
export function validarRENAVAM(valor: string): boolean {
  const r = valor.replace(/\D/g, "");
  if (r.length !== 11) return false;
  return Number(r[10]) === calcRenavam(r.slice(0, 10));
}
