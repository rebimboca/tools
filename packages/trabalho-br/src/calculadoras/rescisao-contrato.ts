export interface RescisaoEntrada {
  salario: number;
  mesesTrabalhadosNoAno: number;
  diasAvisoPrevio?: number;
}

export interface RescisaoResultado {
  saldoSalario: number;
  decimoTerceiroProporcional: number;
  avisoPrevio: number;
  totalBruto: number;
}

/**
 * Calcula a rescisão de contrato trabalhista fictícia com base nas regras básicas da CLT.
 *
 * Estima o saldo de salário, décimo terceiro proporcional e aviso prévio indenizado.
 *
 * @param entrada - Dados de entrada para o cálculo de rescisão.
 * @returns Um objeto contendo os valores calculados discriminados, ou `null` se os dados forem inválidos.
 *
 * @see http://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm - Consolidação das Leis do Trabalho (CLT) no Portal do Planalto
 * @see http://www.planalto.gov.br/ccivil_03/leis/l4090.htm - Lei do 13º Salário (Gratificação Natalina)
 *
 * @example
 * ```ts
 * calcularRescisaoContrato({ salario: 3000, mesesTrabalhadosNoAno: 6, diasAvisoPrevio: 30 });
 * // { saldoSalario: 3000, decimoTerceiroProporcional: 1500, avisoPrevio: 3000, totalBruto: 7500 }
 * ```
 */
export function calcularRescisaoContrato(entrada: RescisaoEntrada): RescisaoResultado | null {
  if (
    entrada.salario <= 0 ||
    entrada.mesesTrabalhadosNoAno < 0 ||
    entrada.mesesTrabalhadosNoAno > 12
  )
    return null;
  const saldoSalario = entrada.salario;
  const decimoTerceiroProporcional = (entrada.salario / 12) * entrada.mesesTrabalhadosNoAno;
  const avisoPrevio = (entrada.salario / 30) * (entrada.diasAvisoPrevio ?? 30);
  const totalBruto = saldoSalario + decimoTerceiroProporcional + avisoPrevio;
  return { saldoSalario, decimoTerceiroProporcional, avisoPrevio, totalBruto };
}
