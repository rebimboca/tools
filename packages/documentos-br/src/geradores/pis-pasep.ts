/**
 * Calcula o dígito verificador de um PIS/PASEP.
 *
 * Utiliza Módulo 11 com pesos fixos: 3,2,9,8,7,6,5,4,3,2.
 * Se o resultado for 10 ou 11, o dígito é 0.
 *
 * @param base - 10 primeiros dígitos do PIS/PASEP.
 * @returns O dígito verificador (0-9).
 */
const calcPis = (base: string): number => {
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const total = base.split("").reduce((acc, c, i) => acc + Number(c) * (weights[i] ?? 0), 0);
  const d = 11 - (total % 11);
  return d === 10 || d === 11 ? 0 : d;
};

/**
 * Gera um número de PIS/PASEP válido.
 *
 * O PIS (Programa de Integração Social) / PASEP (Programa de Formação do
 * Patrimônio do Servidor Público) possui 11 dígitos:
 * - Posições 1-10: Número sequencial.
 * - Posição 11: Dígito verificador (Módulo 11).
 *
 * @param comPontuacao - Se `true`, formata como "XXX.XXXXX.XX-X".
 * @returns String de 11 dígitos representando um PIS/PASEP válido.
 *
 * @example
 * ```ts
 * gerarPISPASEP();      // "12345678901"
 * gerarPISPASEP(true);  // "123.45678.90-1"
 * ```
 */
export function gerarPISPASEP(comPontuacao = false): string {
  const base = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join("");
  const pis = `${base}${calcPis(base)}`;
  if (!comPontuacao) return pis;
  return pis.replace(/(\d{3})(\d{5})(\d{2})(\d)/, "$1.$2.$3-$4");
}

/**
 * Valida um número de PIS/PASEP verificando o dígito verificador.
 *
 * @param valor - PIS/PASEP a validar, podendo conter pontuação.
 * @returns `true` se o dígito verificador é consistente.
 *
 * @example
 * ```ts
 * validarPISPASEP("123.45678.90-1"); // true (se gerado corretamente)
 * ```
 */
export function validarPISPASEP(valor: string): boolean {
  const pis = valor.replace(/\D/g, "");
  if (pis.length !== 11) return false;
  return Number(pis[10]) === calcPis(pis.slice(0, 10));
}
