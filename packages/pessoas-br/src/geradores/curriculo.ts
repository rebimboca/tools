export interface CurriculoEntrada {
  nome: string;
  email: string;
  resumo?: string;
  experiencias?: string[];
  formacao?: string[];
}

export function gerarCurriculo(dados: CurriculoEntrada): string | null {
  if (!dados.nome || !dados.email) return null;
  return [
    `Nome: ${dados.nome}`,
    `Email: ${dados.email}`,
    dados.resumo ? `Resumo: ${dados.resumo}` : "",
    dados.experiencias?.length ? `Experiencias:\n- ${dados.experiencias.join("\n- ")}` : "",
    dados.formacao?.length ? `Formacao:\n- ${dados.formacao.join("\n- ")}` : ""
  ]
    .filter(Boolean)
    .join("\n\n");
}
