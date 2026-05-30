import type { UF } from "../utilitarios/tipos";

/**
 * Mapeamento das Unidades da Federação brasileiras (UF) para os seus respectivos códigos eleitorais
 * de dois dígitos conforme o padrão estabelecido pelo Tribunal Superior Eleitoral (TSE).
 *
 * @see https://www.tse.jus.br/
 */
const CODIGOS_UF: Record<UF, string> = {
  AC: "24",
  AL: "17",
  AP: "25",
  AM: "22",
  BA: "05",
  CE: "07",
  DF: "20",
  ES: "14",
  GO: "10",
  MA: "11",
  MT: "18",
  MS: "19",
  MG: "02",
  PA: "13",
  PB: "12",
  PR: "06",
  PE: "08",
  PI: "15",
  RJ: "03",
  RN: "16",
  RS: "04",
  RO: "23",
  RR: "26",
  SC: "09",
  SP: "01",
  SE: "21",
  TO: "27"
};

/**
 * Gera um número de Título de Eleitor matematicamente válido para uma determinada Unidade da Federação.
 * O número do título é composto de 12 dígitos, estruturado em:
 * - 8 dígitos: Número sequencial gerado aleatoriamente.
 * - 2 dígitos: Código do estado (UF) de emissão (ex: SP = "01", MG = "02").
 * - 2 dígitos: Dígitos Verificadores (DV1 na posição 11, DV2 na posição 12) calculados via Módulo 11,
 *   incluindo o tratamento de exceções (resto 0 resulta em DV 1 para os estados SP e MG).
 *
 * @param estado - A sigla da Unidade da Federação brasileira (ex: "SP", "RJ", etc.).
 * @returns Um número de Título de Eleitor válido com 12 dígitos numéricos.
 *
 * @see https://www.ghiorzi.org/controbr.htm - Regras detalhadas de Módulo 11 e exceções para SP e MG
 * @see https://cadcobol.com.br/tabela_estados_titulo_eleitor.htm - Códigos de UF oficiais do TSE
 *
 * @example
 * ```ts
 * gerarTituloEleitor("SP"); // ex: "530948120140"
 * ```
 */
export function gerarTituloEleitor(estado: UF): string {
  const codigoUF = CODIGOS_UF[estado] || "01";

  // Gera 8 dígitos sequenciais aleatórios
  const base = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");

  // Cálculo do primeiro DV (11º dígito)
  // Multiplica os 8 dígitos sequenciais pelos pesos de 2 a 9
  let soma1 = 0;
  for (let i = 0; i < 8; i++) {
    soma1 += Number(base[i]) * (2 + i);
  }
  const resto1 = soma1 % 11;
  let dv1 = resto1;
  if (resto1 === 10) {
    dv1 = 0;
  } else if (resto1 === 0) {
    dv1 = codigoUF === "01" || codigoUF === "02" ? 1 : 0;
  }

  // Cálculo do segundo DV (12º dígito)
  // Multiplica os 2 dígitos da UF e o primeiro DV pelos pesos 7, 8 e 9
  const seqUF = codigoUF + String(dv1);
  let soma2 = 0;
  soma2 += Number(seqUF[0]) * 7;
  soma2 += Number(seqUF[1]) * 8;
  soma2 += Number(seqUF[2]) * 9;

  const resto2 = soma2 % 11;
  let dv2 = resto2;
  if (resto2 === 10) {
    dv2 = 0;
  } else if (resto2 === 0) {
    dv2 = codigoUF === "01" || codigoUF === "02" ? 1 : 0;
  }

  return base + codigoUF + String(dv1) + String(dv2);
}
