import { gerarCNPJ, gerarInscricaoEstadual } from "@rebimboca/documentos-br";

import { ATIVIDADES } from "../dados/atividades";
import { NOMES_FANTASIA } from "../dados/nomes-fantasia";
import { RAZOES_SOCIAIS } from "../dados/razao-social";

type UF =
  | "AC"
  | "AL"
  | "AP"
  | "AM"
  | "BA"
  | "CE"
  | "DF"
  | "ES"
  | "GO"
  | "MA"
  | "MT"
  | "MS"
  | "MG"
  | "PA"
  | "PB"
  | "PR"
  | "PE"
  | "PI"
  | "RJ"
  | "RN"
  | "RS"
  | "RO"
  | "RR"
  | "SC"
  | "SP"
  | "SE"
  | "TO";

export interface EmpresaGerada {
  razaoSocial: string;
  nomeFantasia: string;
  atividade: string;
  cnpj: string;
  inscricaoEstadual: string;
}

export function gerarEmpresa(estado: UF = "SP"): EmpresaGerada {
  const razaoSocial =
    RAZOES_SOCIAIS[Math.floor(Math.random() * RAZOES_SOCIAIS.length)] ?? "Empresa Exemplo";
  const nomeFantasia =
    NOMES_FANTASIA[Math.floor(Math.random() * NOMES_FANTASIA.length)] ?? "Nome Exemplo";
  const atividade = ATIVIDADES[Math.floor(Math.random() * ATIVIDADES.length)] ?? "Servicos";

  return {
    razaoSocial,
    nomeFantasia,
    atividade,
    cnpj: gerarCNPJ(true),
    inscricaoEstadual: gerarInscricaoEstadual(estado)
  };
}
