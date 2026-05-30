/**
 * Tipos e constantes centralizadas do pacote bancário-br.
 */

/** Código COMPE com 3 dígitos */
export type CodigoCompe = `${number}${number}${number}`;

/** Bandeiras de cartão de crédito suportadas */
export type BandeiraCartao = "visa" | "mastercard" | "amex" | "elo" | "hipercard";

/** Configurações de comprimento para cada bandeira */
export const CARD_LENGTHS: Record<BandeiraCartao, number> = {
  visa: 16,
  mastercard: 16,
  amex: 15,
  elo: 16,
  hipercard: 16
};

/** Prefixos de BIN (Bank Identification Number) para cada bandeira */
export const CARD_PREFIXES: Record<BandeiraCartao, readonly string[]> = {
  visa: ["4"],
  mastercard: ["51", "52", "53", "54", "55"],
  amex: ["34", "37"],
  elo: ["636368", "438935", "504175", "451416"],
  hipercard: ["606282"]
};

/** Bandeiras disponíveis */
export const BANDEIRAS_DISPONIVEIS = Object.keys(CARD_PREFIXES) as BandeiraCartao[];
