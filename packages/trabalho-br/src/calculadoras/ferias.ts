import { calcularINSS, calcularIRRF } from "./impostos";

export interface FeriasEntrada {
  salarioBase: number;
  diasFerias: number;
  abonoPecuniario?: boolean;
  dependentes?: number;
}

export interface FeriasResultado {
  valorFerias: number;
  adicionalUmTerco: number;
  valorAbono: number;
  adicionalUmTercoAbono: number;
  descontoINSS: number;
  descontoIRRF: number;
  totalBruto: number;
  totalLiquido: number;
}

/**
 * Calcula os valores de férias de um trabalhador sob o regime da CLT.
 * Suporta o cálculo de abono pecuniário (conversão em dinheiro de 1/3 do período de férias)
 * e o cálculo automático dos descontos progressivos oficiais de INSS e IRRF.
 *
 * Sob as regras da CLT, o abono pecuniário e seu respectivo adicional de 1/3 são isentos
 * de tributação (INSS e IRRF), incidindo tais descontos apenas sobre os dias de gozo e seu 1/3.
 *
 * @param entrada - Parâmetros de entrada contendo o salário, os dias de férias, abono pecuniário e dependentes.
 * @returns Um objeto estruturado contendo todos os proventos, descontos tributários e o total líquido, ou `null`.
 *
 * @see https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm - Consolidação das Leis do Trabalho (CLT) - Decreto-Lei Nº 5.452, Art. 143 (Abono Pecuniário)
 *
 * @example
 * ```ts
 * calcularFerias({ salarioBase: 3000.00, diasFerias: 20, abonoPecuniario: true });
 * ```
 */
export function calcularFerias(entrada: FeriasEntrada): FeriasResultado | null {
  if (!entrada || entrada.salarioBase <= 0 || entrada.diasFerias < 1 || entrada.diasFerias > 30) {
    return null;
  }

  // 1. Calcular proventos das férias (período de gozo)
  const valorFerias = (entrada.salarioBase / 30) * entrada.diasFerias;
  const adicionalUmTerco = valorFerias / 3;

  // 2. Calcular abono pecuniário (se habilitado)
  let valorAbono = 0;
  let adicionalUmTercoAbono = 0;

  if (entrada.abonoPecuniario) {
    // Sob a CLT, o limite do abono pecuniário é de 10 dias (1/3 de 30)
    // Se o usuário tira 'diasFerias' (ex: 20), o abono cobre o restante (ex: 10)
    const diasAbono = Math.max(0, 30 - entrada.diasFerias);
    valorAbono = (entrada.salarioBase / 30) * diasAbono;
    adicionalUmTercoAbono = valorAbono / 3;
  }

  // 3. Tributação (apenas os dias de férias e seu 1/3 são tributados)
  const baseTributavel = valorFerias + adicionalUmTerco;
  const descontoINSS = calcularINSS(baseTributavel);
  const descontoIRRF = calcularIRRF(baseTributavel, descontoINSS, entrada.dependentes ?? 0);

  const totalBruto = valorFerias + adicionalUmTerco + valorAbono + adicionalUmTercoAbono;
  const totalLiquido = totalBruto - descontoINSS - descontoIRRF;

  return {
    valorFerias: Math.round(valorFerias * 100) / 100,
    adicionalUmTerco: Math.round(adicionalUmTerco * 100) / 100,
    valorAbono: Math.round(valorAbono * 100) / 100,
    adicionalUmTercoAbono: Math.round(adicionalUmTercoAbono * 100) / 100,
    descontoINSS,
    descontoIRRF,
    totalBruto: Math.round(totalBruto * 100) / 100,
    totalLiquido: Math.round(totalLiquido * 100) / 100
  };
}
