import { calculateModulo11 } from "@rebimboca/shared";

/**
 * Estrutura de uma conta bancária gerada.
 */
export interface ContaBancariaGerada {
  agencia: string;
  conta: string;
  digito: string;
  contaCompleta: string;
}

const gerarDigitos = (tamanho: number): string =>
  Array.from({ length: tamanho }, () => Math.floor(Math.random() * 10)).join("");

/**
 * Gera uma conta bancária fictícia com dígito verificador Módulo 11.
 *
 * A conta gerada inclui agência (4 dígitos), conta (8 dígitos por padrão)
 * e dígito verificador calculado pelo algoritmo Módulo 11.
 *
 * O dígito verificador percorre os dígitos da direita para a esquerda com pesos
 * de 2 a 9, conforme padrão bancário brasileiro.
 *
 * @param agencia - Número da agência (4 dígitos). Gerado aleatoriamente se omitido.
 * @param tamanhoConta - Quantidade de dígitos da conta (padrão: 8).
 * @returns Objeto com agência, conta, dígito e formato completo "agência/conta-dígito".
 *
 * @see https://www.bcb.gov.br/estabilidadefinanceira/cedulacheque - Manual de Normas de Contas e Dígito Verificador Módulo 11 (Banco Central do Brasil)
 *
 * @example
 * ```ts
 * gerarContaBancaria();           // { agencia: "1234", conta: "56789012", digito: "3", ... }
 * gerarContaBancaria("0001", 6);  // { agencia: "0001", conta: "123456", digito: "7", ... }
 * ```
 */
export function gerarContaBancaria(
  agencia = gerarDigitos(4),
  tamanhoConta = 8
): ContaBancariaGerada {
  const conta = gerarDigitos(tamanhoConta);
  const digito = calculateModulo11(conta);

  return {
    agencia,
    conta,
    digito,
    contaCompleta: `${agencia}/${conta}-${digito}`
  };
}
