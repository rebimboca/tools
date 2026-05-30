import { calcularDVCertidao, TIPO_CODIGO, type TipoCertidao } from "../geradores/certidoes";
import { somenteDigitos } from "../utilitarios/somente-digitos";

/**
 * Valida um número de matrícula de certidão do Registro Civil brasileiro (padrão CNJ com 32 dígitos).
 * Verifica se o número possui exatamente 32 dígitos e se os dígitos verificadores finais (posições 31 e 32)
 * são consistentes com os 30 dígitos iniciais via algoritmo de Módulo 11.
 * Opcionalmente, valida se o dígito do tipo (posição 15) corresponde ao tipo de certidão informado (Nascimento = 1, Casamento = 2, Óbito = 4).
 *
 * @param valor - O número da matrícula a ser validada, com ou sem formatação.
 * @param tipo - O tipo esperado da certidão ("nascimento", "casamento" ou "obito") para validação cruzada.
 * @returns Retorna true se a certidão for válida estrutural e matematicamente, false caso contrário.
 *
 * @example
 * ```ts
 * validarCertidao("10494201552020100001001000000101", "nascimento"); // true
 * ```
 */
export function validarCertidao(valor: string, tipo?: TipoCertidao): boolean {
  if (!valor) return false;

  const v = somenteDigitos(valor);
  if (v.length !== 32) return false;

  if (tipo) {
    const esperado = TIPO_CODIGO[tipo];
    if (v[14] !== esperado) return false;
  }

  const base = v.slice(0, 30);
  const dvEsperado = calcularDVCertidao(base);
  return v.slice(30, 32) === dvEsperado;
}
