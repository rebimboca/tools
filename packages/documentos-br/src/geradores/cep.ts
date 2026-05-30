import type { UF } from "../utilitarios/tipos";

/**
 * Estrutura de um CEP gerado com dados de localização.
 */
export interface CEPGerado {
  cep: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: UF;
}

/**
 * Faixas de CEP oficiais dos Correios por estado brasileiro.
 *
 * Cada estado possui um ou mais ranges de CEP atribuídos.
 * Os CEPs gerados respeitam esses ranges, garantindo que o CEP
 * corresponda ao estado informado.
 *
 * @see https://buscacepinter.correios.com.br
 */
const FAIXAS_CEP: Record<string, Array<[number, number]>> = {
  SP: [[1000000, 19999999]],
  RJ: [[20000000, 28999999]],
  ES: [[29000000, 29999999]],
  MG: [[30000000, 39999999]],
  BA: [[40000000, 48999999]],
  SE: [[49000000, 49999999]],
  PE: [[50000000, 56999999]],
  AL: [[57000000, 57999999]],
  PB: [[58000000, 58999999]],
  RN: [[59000000, 59999999]],
  CE: [[60000000, 63999999]],
  PI: [[64000000, 64999999]],
  MA: [[65000000, 65999999]],
  PA: [[66000000, 68899999]],
  AP: [[68900000, 68999999]],
  AM: [
    [69000000, 69299999],
    [69400000, 69899999]
  ],
  RR: [[69300000, 69399999]],
  AC: [[69900000, 69999999]],
  DF: [[70000000, 73699999]],
  GO: [
    [72800000, 72999999],
    [73700000, 76799999]
  ],
  RO: [[76800000, 76999999]],
  TO: [[77000000, 77999999]],
  MT: [[78000000, 78899999]],
  MS: [[79000000, 79999999]],
  PR: [[80000000, 87999999]],
  SC: [[88000000, 89999999]],
  RS: [[90000000, 99999999]]
};

/**
 * Base de cidades por estado para dados mais realistas na geração de CEP.
 */
const CIDADES: Record<string, Array<{ cidade: string; bairro: string; endereco: string }>> = {
  SP: [
    { cidade: "Sao Paulo", bairro: "Centro", endereco: "Rua da Consolacao" },
    { cidade: "Campinas", bairro: "Cambui", endereco: "Avenida Norte-Sul" },
    { cidade: "Santos", bairro: "Gonzaga", endereco: "Avenida Ana Costa" },
    { cidade: "Ribeirao Preto", bairro: "Centro", endereco: "Rua General Osorio" }
  ],
  RJ: [
    { cidade: "Rio de Janeiro", bairro: "Copacabana", endereco: "Rua Barata Ribeiro" },
    { cidade: "Niteroi", bairro: "Icarai", endereco: "Rua Moreira Cesar" },
    { cidade: "Petropolis", bairro: "Centro", endereco: "Rua do Imperador" }
  ],
  MG: [
    { cidade: "Belo Horizonte", bairro: "Savassi", endereco: "Rua Pernambuco" },
    { cidade: "Uberlandia", bairro: "Centro", endereco: "Avenida Afonso Pena" }
  ],
  RS: [
    { cidade: "Porto Alegre", bairro: "Moinhos de Vento", endereco: "Rua Padre Chagas" },
    { cidade: "Caxias do Sul", bairro: "Centro", endereco: "Rua Sinimbu" }
  ],
  PR: [
    { cidade: "Curitiba", bairro: "Batel", endereco: "Avenida do Batel" },
    { cidade: "Londrina", bairro: "Centro", endereco: "Rua Sergipe" }
  ],
  BA: [
    { cidade: "Salvador", bairro: "Barra", endereco: "Avenida Sete de Setembro" },
    { cidade: "Feira de Santana", bairro: "Centro", endereco: "Rua Conselheiro Franco" }
  ],
  PE: [
    { cidade: "Recife", bairro: "Boa Viagem", endereco: "Avenida Boa Viagem" },
    { cidade: "Olinda", bairro: "Casa Caiada", endereco: "Rua do Sol" }
  ],
  CE: [{ cidade: "Fortaleza", bairro: "Meireles", endereco: "Avenida Beira Mar" }],
  SC: [
    { cidade: "Florianopolis", bairro: "Centro", endereco: "Rua Felipe Schmidt" },
    { cidade: "Joinville", bairro: "Centro", endereco: "Rua do Principe" }
  ],
  GO: [{ cidade: "Goiania", bairro: "Setor Bueno", endereco: "Avenida T-63" }],
  DF: [{ cidade: "Brasilia", bairro: "Asa Sul", endereco: "SQS 308" }],
  PA: [{ cidade: "Belem", bairro: "Nazare", endereco: "Avenida Nazare" }],
  AM: [{ cidade: "Manaus", bairro: "Centro", endereco: "Avenida Eduardo Ribeiro" }],
  MA: [{ cidade: "Sao Luis", bairro: "Centro", endereco: "Rua Grande" }],
  MT: [{ cidade: "Cuiaba", bairro: "Centro", endereco: "Avenida Historiador Rubens de Mendonca" }],
  MS: [{ cidade: "Campo Grande", bairro: "Centro", endereco: "Rua 14 de Julho" }],
  PB: [{ cidade: "Joao Pessoa", bairro: "Manaira", endereco: "Avenida Governador Flavio Ribeiro" }],
  PI: [{ cidade: "Teresina", bairro: "Centro", endereco: "Rua Alvaro Mendes" }],
  RN: [{ cidade: "Natal", bairro: "Ponta Negra", endereco: "Avenida Engenheiro Roberto Freire" }],
  AL: [{ cidade: "Maceio", bairro: "Pajucara", endereco: "Rua Jangadeiros Alagoanos" }],
  SE: [{ cidade: "Aracaju", bairro: "Centro", endereco: "Rua Laranjeiras" }],
  TO: [{ cidade: "Palmas", bairro: "Plano Diretor Sul", endereco: "Quadra 104 Sul" }],
  RO: [{ cidade: "Porto Velho", bairro: "Centro", endereco: "Avenida Sete de Setembro" }],
  AC: [{ cidade: "Rio Branco", bairro: "Centro", endereco: "Rua Benjamin Constant" }],
  RR: [{ cidade: "Boa Vista", bairro: "Centro", endereco: "Avenida Ville Roy" }],
  AP: [{ cidade: "Macapa", bairro: "Centro", endereco: "Rua Candido Mendes" }],
  ES: [{ cidade: "Vitoria", bairro: "Praia do Canto", endereco: "Rua Aleixo Netto" }]
};

/**
 * Gera um CEP válido dentro da faixa oficial dos Correios para o estado informado.
 *
 * O CEP (Código de Endereçamento Postal) é composto por 8 dígitos.
 * Cada estado brasileiro possui uma ou mais faixas de CEP atribuídas.
 * A função gera um número aleatório dentro dessas faixas, acompanhado
 * de dados de localização (cidade, bairro, endereço) baseados no estado.
 *
 * @param opcoes - Opções de geração.
 * @param opcoes.estado - Filtra por estado. Se não informado, escolhe aleatoriamente.
 * @param opcoes.cidade - Filtra por cidade (case-insensitive).
 * @param opcoes.comPontuacao - Se `true`, formata como "XXXXX-XXX".
 * @returns Objeto com CEP e dados de localização, ou `null` se inválido.
 *
 * @example
 * ```ts
 * gerarCEP({ estado: "SP" });               // { cep: "01310100", cidade: "Sao Paulo", ... }
 * gerarCEP({ estado: "RJ", comPontuacao: true }); // { cep: "20040-020", ... }
 * ```
 */
export function gerarCEP(opcoes?: {
  estado?: UF;
  cidade?: string;
  comPontuacao?: boolean;
}): CEPGerado | null {
  // Determinar estado
  const estados = Object.keys(FAIXAS_CEP);
  const estado = opcoes?.estado ?? (estados[Math.floor(Math.random() * estados.length)] as UF);

  const faixas = FAIXAS_CEP[estado];
  if (!faixas || faixas.length === 0) return null;

  // Escolher faixa aleatória
  const faixa = faixas[Math.floor(Math.random() * faixas.length)];
  if (!faixa) return null;

  const [min, max] = faixa;
  const cepNum = min + Math.floor(Math.random() * (max - min + 1));
  const cepStr = String(cepNum).padStart(8, "0");

  // Dados de localização
  const cidadesEstado = CIDADES[estado] ?? [
    { cidade: "Cidade Exemplo", bairro: "Centro", endereco: "Rua Principal" }
  ];

  let candidatos = cidadesEstado;
  if (opcoes?.cidade) {
    const filtrados = cidadesEstado.filter(
      (c) => c.cidade.toLowerCase() === opcoes.cidade!.toLowerCase()
    );
    if (filtrados.length > 0) candidatos = filtrados;
  }

  const local = candidatos[Math.floor(Math.random() * candidatos.length)]!;

  const cep = opcoes?.comPontuacao ? `${cepStr.slice(0, 5)}-${cepStr.slice(5)}` : cepStr;

  return {
    cep,
    endereco: local.endereco,
    bairro: local.bairro,
    cidade: local.cidade,
    estado: estado
  };
}
