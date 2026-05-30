import { gerarCPF } from "@rebimboca/documentos-br";
import { gerarCEP } from "@rebimboca/documentos-br";
import type { UF } from "@rebimboca/shared";

import { PROFISSOES } from "../dados/profissoes";
import { gerarNomes } from "./nomes";

export interface PessoaGerada {
  nome: string;
  cpf: string;
  cep: string;
  cidade: string;
  estado: UF;
  profissao: string;
  email: string;
}

const EMAIL_DOMAINS = [
  "gmail.com",
  "outlook.com",
  "yahoo.com.br",
  "hotmail.com",
  "uol.com.br",
  "bol.com.br"
];

/**
 * Gera os dados mockados de uma pessoa física brasileira de forma realista.
 * Integra-se aos geradores de CPF, CEP e base de dados demográficos do IBGE.
 *
 * @param opcoes - Opções opcionais para restringir a localidade da pessoa gerada.
 * @param opcoes.estado - UF de preferência da pessoa física.
 * @returns Objeto contendo os dados demográficos e de contato gerados, ou `null`.
 *
 * @see https://censo2022.ibge.gov.br/ - Referência Demográfica IBGE para distribuição populacional
 *
 * @example
 * ```ts
 * const pessoa = gerarPessoa({ estado: "SP" });
 * console.log(pessoa?.nome); // "Ana Silva"
 * console.log(pessoa?.email); // "ana.silva@gmail.com"
 * ```
 */
export function gerarPessoa(opcoes?: { estado?: UF }): PessoaGerada | null {
  const nome = gerarNomes(1)?.[0];
  const local = gerarCEP(opcoes?.estado ? { estado: opcoes.estado } : undefined);
  if (!nome || !local) return null;

  const cleanNome = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const slug = cleanNome.toLowerCase().replace(/\s+/g, ".");
  const domain = EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)] ?? "gmail.com";

  return {
    nome,
    cpf: gerarCPF(true),
    cep: local.cep,
    cidade: local.cidade,
    estado: local.estado,
    profissao: PROFISSOES[Math.floor(Math.random() * PROFISSOES.length)] ?? "Desenvolvedor",
    email: `${slug}@${domain}`
  };
}

/**
 * Gera um lote/array com múltiplos cadastros de pessoas físicas brasileiras.
 *
 * @param quantidade - Quantidade de registros a gerar (1 a 30).
 * @param estado - Limita a geração ao estado da federação (UF) fornecido.
 * @returns Array de PessoaGerada ou `null` se os parâmetros forem inválidos.
 *
 * @example
 * ```ts
 * const lote = gerarPessoas(5, "RJ");
 * ```
 */
export function gerarPessoas(quantidade: number, estado?: UF): PessoaGerada[] | null {
  if (quantidade < 1 || quantidade > 30) return null;
  const out: PessoaGerada[] = [];
  for (let i = 0; i < quantidade; i += 1) {
    const p = gerarPessoa({ estado });
    if (!p) return null;
    out.push(p);
  }
  return out;
}
