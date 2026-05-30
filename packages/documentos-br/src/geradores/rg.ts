/**
 * Gera um número de RG (Registro Geral) válido.
 *
 * O RG possui 9 caracteres (8 dígitos + 1 dígito verificador):
 * - Posições 1-8: Número sequencial.
 * - Posição 9: Dígito verificador (pode ser "X" se o módulo for 10).
 *
 * O DV é calculado somando cada dígito multiplicado por pesos crescentes
 * de 2 a 9, dividindo por 11 e usando o resto.
 *
 * @param comPontuacao - Se `true`, formata como "XX.XXX.XXX-X".
 * @returns String de 9 caracteres representando um RG válido.
 *
 * @example
 * ```ts
 * gerarRG();      // "123456789"
 * gerarRG(true);  // "12.345.678-9"
 * ```
 */
export function gerarRG(comPontuacao = false): string {
  const base = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");
  const sum = base.split("").reduce((acc, c, i) => acc + Number(c) * (2 + i), 0);
  const d = sum % 11;
  const digit = d === 10 ? "X" : String(d);
  const rg = `${base}${digit}`;
  if (!comPontuacao) return rg;
  return rg.replace(/(\d{2})(\d{3})(\d{3})([\dX])/, "$1.$2.$3-$4");
}

/**
 * Valida um número de RG verificando o dígito verificador.
 *
 * @param valor - RG a validar, podendo conter pontuação.
 * @returns `true` se o dígito verificador é consistente.
 *
 * @example
 * ```ts
 * validarRG("12.345.678-9"); // true (se gerado corretamente)
 * ```
 */
export function validarRG(valor: string): boolean {
  const rg = valor.replace(/\./g, "").replace(/-/g, "").toUpperCase();
  if (!/^[0-9]{8}[0-9X]$/.test(rg)) return false;
  const base = rg.slice(0, 8);
  const sum = base.split("").reduce((acc, c, i) => acc + Number(c) * (2 + i), 0);
  const d = sum % 11;
  const digit = d === 10 ? "X" : String(d);
  return rg[8] === digit;
}
