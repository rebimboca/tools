import { gerarCNPJ, gerarInscricaoEstadual } from "@rebimboca/documentos-br";
import type { UF } from "@rebimboca/shared";

import { ATIVIDADES } from "../dados/atividades";
import { NOMES_FANTASIA } from "../dados/nomes-fantasia";
import { RAZOES_SOCIAIS } from "../dados/razao-social";

export interface EmpresaGerada {
  razaoSocial: string;
  nomeFantasia: string;
  atividade: string;
  cnpj: string;
  inscricaoEstadual: string;
}

/**
 * Gera dados cadastrais fictícios e válidos para uma pessoa jurídica brasileira.
 * Integra a geração de CNPJ e de Inscrição Estadual (IE) com base nas regras da UF informada.
 *
 * @param estado - A Unidade Federativa (UF) para a qual gerar a Inscrição Estadual. Padrão: "SP".
 * @returns Objeto contendo Razão Social, Nome Fantasia, Atividade Econômica, CNPJ e IE.
 *
 * @see http://www.sintegra.gov.br/ - Diretrizes SINTEGRA para Inscrições Estaduais de contribuintes
 *
 * @example
 * ```ts
 * const empresa = gerarEmpresa("SP");
 * console.log(empresa.inscricaoEstadual); // Retorna IE de SP formatada/calculada matematicamente.
 * ```
 */
export function gerarEmpresa(estado: UF = "SP"): EmpresaGerada {
  const razaoSocial =
    RAZOES_SOCIAIS[Math.floor(Math.random() * RAZOES_SOCIAIS.length)] ?? "Empresa Exemplo LTDA";
  const nomeFantasia =
    NOMES_FANTASIA[Math.floor(Math.random() * NOMES_FANTASIA.length)] ?? "Nome Fantasia Exemplo";
  const atividade =
    ATIVIDADES[Math.floor(Math.random() * ATIVIDADES.length)] ?? "Comércio de Peças";

  return {
    razaoSocial,
    nomeFantasia,
    atividade,
    cnpj: gerarCNPJ(true),
    inscricaoEstadual: gerarInscricaoEstadual(estado)
  };
}
