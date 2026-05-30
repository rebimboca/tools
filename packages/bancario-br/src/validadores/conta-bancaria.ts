import { calculateModulo11, onlyDigits } from "@rebimboca/shared";

/**
 * Valida uma conta bancária verificando o dígito verificador Módulo 11.
 *
 * @param conta - Número da conta (apenas dígitos ou com pontuação).
 * @param digito - Dígito verificador informado.
 * @returns `true` se o dígito é consistente com a conta.
 *
 * @see https://www.bcb.gov.br/estabilidadefinanceira/cedulacheque - Manual de Normas de Contas e Dígito Verificador Módulo 11 (Banco Central do Brasil)
 *
 * @example
 * ```ts
 * validarContaBancaria("56789012", "3"); // true
 * ```
 */
export function validarContaBancaria(conta: string, digito: string): boolean {
  const contaNormalizada = onlyDigits(conta);
  const digitoNormalizado = digito.trim().toUpperCase();

  if (!contaNormalizada || !digitoNormalizado) return false;

  return calculateModulo11(contaNormalizada) === digitoNormalizado;
}
