/**
 * Calcula um dígito verificador do CPF usando Módulo 11.
 *
 * @param base - Dígitos base sobre os quais calcular.
 * @param fator - Fator multiplicador inicial (10 para 1º DV, 11 para 2º DV).
 * @returns O dígito verificador calculado (0-9).
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
 * Gera um número de CPF (Cadastro de Pessoa Física) válido.
 *
 * O CPF é composto por 11 dígitos no formato XXX.XXX.XXX-XX:
 * - Posições 1-9: Número sequencial atribuído pela Receita Federal.
 * - Posições 10-11: Dígitos verificadores calculados pelo Módulo 11.
 *
 * O algoritmo multiplica os primeiros 9 dígitos por pesos decrescentes
 * de 10 a 2 para o 1º DV, e de 11 a 2 para o 2º DV.
 *
 * @param comMascara - Se `true`, retorna no formato "XXX.XXX.XXX-XX".
 *                     Se `false` (padrão), retorna apenas os 11 dígitos.
 * @returns String com o CPF gerado.
 *
 * @see https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/cadastros/cpf - Portal de Orientações do CPF (Receita Federal do Brasil)
 * @see https://www.macoratti.net/alg_cpf.htm - Algoritmo de geração do CPF

 *
 * @example
 * ```ts
 * gerarCPF();      // "52998224725"
 * gerarCPF(true);  // "529.982.247-25"
 * ```
 */
export function gerarCPF(comMascara = false): string {
  const base = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");
  const d1 = calcularDigito(base, 10);
  const d2 = calcularDigito(base + String(d1), 11);
  const cpf = base + String(d1) + String(d2);

  if (!comMascara) return cpf;

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
