import type { UF } from "../utilitarios/tipos";

/**
 * Gera uma Inscrição Estadual (IE) válida para o estado de São Paulo (SP) ou uma sequência numérica
 * estruturalmente correspondente para outros estados.
 * A Inscrição Estadual de SP é composta por 12 dígitos, com dígitos verificadores nas posições 9 e 12:
 * - 1º DV (posição 9): Pesos 1, 3, 4, 5, 6, 7, 8, 10 aplicados aos 8 primeiros dígitos. O DV é o resto % 10.
 * - 2º DV (posição 12): Pesos 3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2 aplicados aos 11 dígitos iniciais. O DV é o resto % 10.
 *
 * @param estado - A sigla da Unidade da Federação brasileira (ex: "SP", "RJ", etc.).
 * @returns Retorna uma string contendo apenas dígitos numéricos representando a Inscrição Estadual.
 *
 * @see http://www.sintegra.gov.br/insc_est.html - Portal do SINTEGRA com regras de IE de todos os estados
 * @see http://www.sintegra.gov.br/Insc_Est_txt/sp.txt - Especificação técnica da IE do estado de São Paulo
 *
 * @example
 * ```ts
 * gerarInscricaoEstadual("SP"); // ex: "110042490114"
 * ```
 */
export function gerarInscricaoEstadual(estado: UF): string {
  if (estado === "SP") {
    // Gera os 8 primeiros dígitos aleatórios
    const base = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");

    // Pesos do primeiro DV: 1, 3, 4, 5, 6, 7, 8, 10
    const pesos1 = [1, 3, 4, 5, 6, 7, 8, 10];
    let soma1 = 0;
    for (let i = 0; i < 8; i++) {
      soma1 += Number(base[i]) * (pesos1[i] ?? 0);
    }
    const dv1 = (soma1 % 11) % 10;

    // Gera o 10º e 11º dígito aleatoriamente
    const d10 = String(Math.floor(Math.random() * 10));
    const d11 = String(Math.floor(Math.random() * 10));

    // Monta base parcial para o 2º DV: base + dv1 + d10 + d11
    const base2 = base + String(dv1) + d10 + d11;

    // Pesos do segundo DV: 3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2
    const pesos2 = [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma2 = 0;
    for (let i = 0; i < 11; i++) {
      soma2 += Number(base2[i]) * (pesos2[i] ?? 0);
    }
    const dv2 = (soma2 % 11) % 10;

    return base2 + String(dv2);
  }

  // Fallback genérico para outros estados (geralmente entre 8 e 14 dígitos, retornamos 12 por consistência)
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join("");
}
