import { NOMES } from "../dados/nomes";
import { SOBRENOMES } from "../dados/sobrenomes";

/**
 * Gera um ou mais nomes completos brasileiros aleatórios.
 *
 * Combina nomes e sobrenomes populares de forma aleatória.
 *
 * @param quantidade - Quantidade de nomes a gerar (1-200). Padrão: 1.
 * @returns Array de nomes gerados, ou `null` se a quantidade for inválida.
 *
 * @see https://censo2010.ibge.gov.br/nomes/ - Nomes no Brasil (IBGE Censo 2010)
 *
 * @example
 * ```ts
 * gerarNomes(3); // ["Ana Silva", "Bruno Santos", "Carlos Oliveira"]
 * ```
 */
export function gerarNomes(quantidade = 1): string[] | null {
  if (quantidade < 1 || quantidade > 200) return null;
  return Array.from(
    { length: quantidade },
    () =>
      `${NOMES[Math.floor(Math.random() * NOMES.length)]} ${SOBRENOMES[Math.floor(Math.random() * SOBRENOMES.length)]}`
  );
}
