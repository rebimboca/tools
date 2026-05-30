/**
 * Calculates a check digit using the Modulo 11 algorithm.
 *
 * Modulo 11 is widely used in Brazilian banking and fiscal documents.
 * The calculation traverses the digits from right to left, multiplying each
 * by ascending weights from 2 to 9 (resetting to 2 after reaching 9).
 * The digit is obtained by subtracting the remainder of the sum divided by 11 from 11.
 *
 * Special rules:
 * - If the result is 10, returns "X" (banking convention).
 * - If the result is 11, returns "0".
 *
 * @param digits - String containing only digits to calculate the check digit for.
 * @returns The check digit as a string ("0"-"9" or "X").
 *
 * @see https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/cadastros/cpf - Cadastro de Pessoas Físicas (CPF) e Algoritmo Módulo 11 na Receita Federal do Brasil
 *
 * @example
 * ```ts
 * calculateModulo11("12345678"); // "2" (example)
 * ```
 */
export const calculateModulo11 = (digits: string): string => {
  let weight = 2;
  let sum = 0;

  for (let i = digits.length - 1; i >= 0; i -= 1) {
    sum += Number(digits[i]) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }

  const remainder = sum % 11;
  const digit = 11 - remainder;

  if (digit === 10) return "X";
  if (digit === 11) return "0";
  return String(digit);
};
