import type { UF } from "../utilitarios/tipos";

export interface CEPGerado {
  cep: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: UF;
}

const cidades: Array<{ cidade: string; estado: UF }> = [
  { cidade: "Sao Paulo", estado: "SP" },
  { cidade: "Rio de Janeiro", estado: "RJ" },
  { cidade: "Recife", estado: "PE" },
  { cidade: "Salvador", estado: "BA" }
];

function pickRandom<T>(items: readonly T[]): T | null {
  if (items.length === 0) return null;
  const index = Math.floor(Math.random() * items.length);
  return items[index] ?? null;
}

export function gerarCEP(opcoes?: {
  estado?: UF;
  cidade?: string;
  comPontuacao?: boolean;
}): CEPGerado | null {
  const candidatos = cidades.filter((c) => {
    if (opcoes?.estado && c.estado !== opcoes.estado) return false;
    if (opcoes?.cidade && c.cidade.toLowerCase() !== opcoes.cidade.toLowerCase()) return false;
    return true;
  });

  const universo: Array<{ cidade: string; estado: UF }> =
    candidatos.length > 0 ? candidatos : cidades;
  const escolhido: { cidade: string; estado: UF } | null = pickRandom(universo);
  if (!escolhido) return null;
  const raw = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");
  const cep = opcoes?.comPontuacao ? `${raw.slice(0, 5)}-${raw.slice(5)}` : raw;
  return {
    cep,
    endereco: "Rua Exemplo",
    bairro: "Centro",
    cidade: escolhido.cidade,
    estado: escolhido.estado
  };
}
