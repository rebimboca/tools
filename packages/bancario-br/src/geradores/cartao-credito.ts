import { onlyDigits } from "@rebimboca/shared";
import { BandeiraCartao, CARD_LENGTHS, CARD_PREFIXES } from "../tipos";

/**
 * Estrutura de um cartão de crédito gerado.
 */
export interface CartaoCreditoGerado {
  numero: string;
  mascarado: string;
  bandeira: BandeiraCartao;
  dataValidade: string;
}

const gerarDigitos = (tamanho: number): string =>
  Array.from({ length: tamanho }, () => Math.floor(Math.random() * 10)).join("");

/**
 * Calcula o dígito verificador de um cartão de crédito usando o algoritmo de Luhn.
 *
 * O algoritmo de Luhn (Módulo 10) é o padrão ISO/IEC 7812 para validação de
 * números de cartão de crédito. Percorre os dígitos da direita para a esquerda,
 * dobrando os dígitos em posições alternadas e subtraindo 9 se o resultado > 9.
 *
 * @param numeroParcial - Dígitos do cartão sem o dígito verificador.
 * @returns O dígito verificador (0-9).
 *
 * @see https://www.geeksforgeeks.org/luhn-algorithm/ - Algoritmo Luhn Módulo 10 (Validação de Cartão de Crédito)
 */
const calcularDigitoLuhn = (numeroParcial: string): number => {
  const digitos = numeroParcial.split("").map(Number).reverse();
  let soma = 0;
  for (let i = 0; i < digitos.length; i += 1) {
    let valor = digitos[i] ?? 0;
    if (i % 2 === 0) {
      valor *= 2;
      if (valor > 9) valor -= 9;
    }
    soma += valor;
  }
  return (10 - (soma % 10)) % 10;
};

/**
 * Gera um número de cartão de crédito válido pelo algoritmo de Luhn.
 *
 * Suporta múltiplas bandeiras: Visa, Mastercard, American Express, Elo, Hipercard.
 * O número gerado possui 16 dígitos (15 para Amex) e passa na validação Luhn.
 *
 * @param bandeira - Bandeira do cartão: "visa", "mastercard", "amex", "elo", "hipercard".
 *                   Padrão: "visa".
 * @returns Objeto com número, versão mascarada (com espaços), data de validade e nome da bandeira.
 *
 * @see https://stripe.com/docs/payments/cards - Stripe: Padrões de Bandeiras e Faixas de BIN de Cartão
 *
 * @example
 * ```ts
 * gerarCartaoCredito();             // { numero: "4539...", bandeira: "visa", ... }
 * gerarCartaoCredito("mastercard"); // { numero: "5312...", bandeira: "mastercard", ... }
 * ```
 */
export function gerarCartaoCredito(bandeira: BandeiraCartao = "visa"): CartaoCreditoGerado {
  const normalizado = bandeira.toLowerCase() as BandeiraCartao;
  const prefixos = CARD_PREFIXES[normalizado] ?? CARD_PREFIXES["visa"];
  const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)]!;
  const totalLength = CARD_LENGTHS[normalizado];

  const base = `${prefixo}${gerarDigitos(totalLength - 1 - prefixo.length)}`;
  const digito = calcularDigitoLuhn(base);
  const numero = `${base}${digito}`;

  // Gera data de validade entre 2 e 5 anos a partir de agora
  const hoje = new Date();
  const anoValidade = hoje.getFullYear() + Math.floor(Math.random() * 4) + 2;
  const mesValidade = String(hoje.getMonth() + 1).padStart(2, "0");
  const dataValidade = `${mesValidade}/${anoValidade.toString().slice(-2)}`;

  return {
    numero,
    mascarado: numero.replace(/(\d{4})(?=\d)/g, "$1 "),
    bandeira: normalizado,
    dataValidade
  };
}
