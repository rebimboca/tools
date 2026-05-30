import { somenteDigitos } from "../utilitarios/somente-digitos";

/**
 * Calcula um dígito verificador do CPF usando Módulo 11.
 *
 * @param base - Dígitos base sobre os quais calcular.
 * @param fator - Fator multiplicador inicial.
 * @returns Dígito verificador (0-9).
 */
const calcularDigito = (base: string, fator: number): number => {
  let total = 0;

  for (const caractere of base) {
    total += Number(caractere) * fator;
    fator -= 1;
  }

  const modulo = total % 11;
  return modulo < 2 ? 0 : 11 - modulo;
};

/**
 * Valida um número de CPF verificando os dígitos verificadores.
 *
 * O CPF (Cadastro de Pessoa Física) é composto por 11 dígitos.
 * A validação calcula os 2 dígitos verificadores usando Módulo 11
 * e compara com os dígitos informados.
 *
 * Rejeita CPFs com todos os dígitos iguais (ex: 111.111.111-11).
 *
 * Não consulta a base da Receita Federal — apenas valida integridade matemática.
 *
 * @param entrada - CPF a validar, podendo conter pontuação (pontos e traço).
 * @returns `true` se o CPF é matematicamente válido, `false` caso contrário.
 *
 * @see https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/cadastros/cpf - Portal de Orientações do CPF (Receita Federal do Brasil)
 * @see https://www.macoratti.net/alg_cpf.htm - Algoritmo de validação do CPF

 *
 * @example
 * ```ts
 * validarCPF("529.982.247-25"); // true
 * validarCPF("111.111.111-11"); // false
 * validarCPF("12345678900");    // false
 * ```
 */
export function validarCPF(entrada: string): boolean {
  const cpf = somenteDigitos(entrada);

  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const d1 = calcularDigito(cpf.slice(0, 9), 10);
  const d2 = calcularDigito(cpf.slice(0, 9) + String(d1), 11);

  return cpf === cpf.slice(0, 9) + String(d1) + String(d2);
}
