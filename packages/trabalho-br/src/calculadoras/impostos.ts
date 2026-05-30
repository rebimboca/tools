/**
 * Calcula o desconto progressivo de INSS (Previdência Social) sobre o salário bruto.
 *
 * @param salarioBruto - O valor bruto do salário ou rendimento tributável.
 * @returns O valor do desconto de INSS arredondado para duas casas decimais.
 *
 * @see https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/tabelas-de-multiplicacao-e-aliquotas-progressivas - Tabelas de Contribuição Previdenciária Receita Federal
 *
 * @example
 * ```ts
 * calcularINSS(3000.00); // 263.06
 * ```
 */
export function calcularINSS(salarioBruto: number): number {
  if (salarioBruto <= 0) return 0;

  // Faixas progressivas de INSS para 2024/2025/2026
  const faixas = [
    { limite: 1412.00, aliquota: 0.075 },
    { limite: 2666.68, aliquota: 0.09 },
    { limite: 4000.03, aliquota: 0.12 },
    { limite: 7786.02, aliquota: 0.14 }
  ];

  let inss = 0;
  let baseAnterior = 0;

  for (const faixa of faixas) {
    if (salarioBruto > faixa.limite) {
      inss += (faixa.limite - baseAnterior) * faixa.aliquota;
      baseAnterior = faixa.limite;
    } else {
      inss += (salarioBruto - baseAnterior) * faixa.aliquota;
      baseAnterior = salarioBruto;
      break;
    }
  }

  // Teto de contribuição previdenciária aproximado
  const tetoINSS = 908.86;
  const inssCalculado = Math.min(inss, tetoINSS);

  return Math.round(inssCalculado * 100) / 100;
}

/**
 * Calcula o imposto de renda retido na fonte (IRRF) sobre a base tributável.
 *
 * @param salarioBruto - O salário bruto mensal.
 * @param descontoINSS - O valor já descontado de INSS sobre esse salário.
 * @param dependentes - O número de dependentes legais para dedução (R$ 189,59 por dependente). Padrão: 0.
 * @returns O valor do desconto de IRRF arredondado para duas casas decimais.
 *
 * @see https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/tabelas-de-multiplicacao-e-aliquotas-progressivas - Alíquotas Progressivas IRPF Receita Federal
 *
 * @example
 * ```ts
 * calcularIRRF(4500.00, 480.00, 1);
 * ```
 */
export function calcularIRRF(salarioBruto: number, descontoINSS: number, dependentes = 0): number {
  const baseCalculo = salarioBruto - descontoINSS - dependentes * 189.59;
  if (baseCalculo <= 2259.20) return 0;

  let aliquota = 0;
  let deducao = 0;

  if (baseCalculo <= 2826.65) {
    aliquota = 0.075;
    deducao = 169.44;
  } else if (baseCalculo <= 3751.05) {
    aliquota = 0.15;
    deducao = 381.44;
  } else if (baseCalculo <= 4664.68) {
    aliquota = 0.225;
    deducao = 662.77;
  } else {
    aliquota = 0.275;
    deducao = 896.00;
  }

  const irrf = baseCalculo * aliquota - deducao;
  return Math.round(Math.max(0, irrf) * 100) / 100;
}
