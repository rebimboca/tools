import { gerarCPF } from "@rebimboca/documentos-br";
import { gerarCEP } from "@rebimboca/documentos-br";

import { PROFISSOES } from "../dados/profissoes";
import { gerarNomes } from "./nomes";

export interface PessoaGerada {
  nome: string;
  cpf: string;
  cep: string;
  cidade: string;
  estado: string;
  profissao: string;
  email: string;
}

export function gerarPessoa(): PessoaGerada | null {
  const nome = gerarNomes(1)?.[0];
  const local = gerarCEP();
  if (!nome || !local) return null;
  const slug = nome.toLowerCase().replace(/\s+/g, ".");
  return {
    nome,
    cpf: gerarCPF(true),
    cep: local.cep,
    cidade: local.cidade,
    estado: local.estado,
    profissao: PROFISSOES[Math.floor(Math.random() * PROFISSOES.length)] ?? "Profissional",
    email: `${slug}@exemplo.com`
  };
}

export function gerarPessoas(quantidade: number): PessoaGerada[] | null {
  if (quantidade < 1 || quantidade > 30) return null;
  const out: PessoaGerada[] = [];
  for (let i = 0; i < quantidade; i += 1) {
    const p = gerarPessoa();
    if (!p) return null;
    out.push(p);
  }
  return out;
}
