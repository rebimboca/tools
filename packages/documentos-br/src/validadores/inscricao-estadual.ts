import { somenteDigitos } from "../utilitarios/somente-digitos";
import type { UF } from "../utilitarios/tipos";

/**
 * Valida matematicamente uma Inscrição Estadual (IE) de acordo com a UF especificada.
 * Atualmente implementa a validação completa de São Paulo (SP):
 * - SP possui 12 dígitos, validando as posições dos dígitos verificadores (9º e 12º) via Módulo 11.
 * Para as demais UFs, realiza a validação do comprimento estrutural básico (entre 8 e 14 dígitos).
 *
 * @param valor - O número da Inscrição Estadual a ser validado, com ou sem formatação.
 * @param estado - A sigla da Unidade da Federação correspondente à IE.
 * @returns Retorna true se a IE for matematicamente válida para o estado informado, false caso contrário.
 *
 * @see http://www.sintegra.gov.br/insc_est.html - Portal do SINTEGRA com regras de IE de todos os estados
 * @see http://www.sintegra.gov.br/Insc_Est_txt/sp.txt - Especificação técnica da IE do estado de São Paulo
 *
 * @example
 * ```ts
 * validarInscricaoEstadual("110042490114", "SP"); // true
 * ```
 */
export function validarInscricaoEstadual(valor: string, estado: UF): boolean {
  if (!valor) return false;

  const ie = somenteDigitos(valor);

  if (estado === "SP") {
    if (ie.length !== 12) return false;

    // Validação do 1º DV (posição 9)
    const pesos1 = [1, 3, 4, 5, 6, 7, 8, 10];
    let soma1 = 0;
    for (let i = 0; i < 8; i++) {
      soma1 += Number(ie[i]) * (pesos1[i] ?? 0);
    }
    const dv1Calculado = (soma1 % 11) % 10;
    const dv1Informado = Number(ie[8]);

    if (dv1Calculado !== dv1Informado) return false;

    // Validação do 2º DV (posição 12)
    const pesos2 = [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma2 = 0;
    for (let i = 0; i < 11; i++) {
      soma2 += Number(ie[i]) * (pesos2[i] ?? 0);
    }
    const dv2Calculado = (soma2 % 11) % 10;
    const dv2Informado = Number(ie[11]);

    return dv2Calculado === dv2Informado;
  }

  // Validação padrão para outros estados
  return ie.length >= 8 && ie.length <= 14;
}
