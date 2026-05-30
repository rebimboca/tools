import { onlyDigits } from "@rebimboca/shared";
import { BandeiraCartao, CARD_LENGTHS, CARD_PREFIXES } from "../tipos";

/**
 * Valida um número de cartão de crédito usando o algoritmo de Luhn (Módulo 10).
 *
 * Aceita cartões com 13 a 19 dígitos (cobrindo todas as bandeiras conhecidas).
 *
 * @param numero - Número do cartão, podendo conter espaços ou traços.
 * @returns `true` se o número passa na validação Luhn.
 *
 * @see https://www.geeksforgeeks.org/luhn-algorithm/ - Algoritmo Luhn Módulo 10 (Validação de Cartão de Crédito)
 *
 * @example
 * ```ts
 * validarCartaoCredito("4539 1234 5678 9012"); // true
 * ```
 */
export function validarCartaoCredito(numero: string): boolean {
  const digitos = onlyDigits(numero);
  if (digitos.length < 13 || digitos.length > 19) return false;

  let soma = 0;
  let dobrar = false;

  for (let i = digitos.length - 1; i >= 0; i -= 1) {
    let n = Number(digitos[i]);
    if (dobrar) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    soma += n;
    dobrar = !dobrar;
  }

  return soma % 10 === 0;
}

/**
 * Identifica a bandeira de um cartão de crédito pelo prefixo (BIN).
 *
 * @param numero - Número do cartão (mínimo 4 dígitos).
 * @returns Nome da bandeira ("visa", "mastercard", "amex", "elo", "hipercard")
 *          ou "desconhecida" se não identificada.
 *
 * @see https://stripe.com/docs/payments/cards - Stripe: Padrões de Bandeiras e Faixas de BIN de Cartão

 *
 * @example
 * ```ts
 * identificarBandeiraCartao("4539123456789012"); // "visa"
 * identificarBandeiraCartao("5312000000000000"); // "mastercard"
 * ```
 */
export function identificarBandeiraCartao(numero: string): BandeiraCartao | "desconhecida" {
  const digitos = onlyDigits(numero);
  for (const [bandeira, prefixos] of Object.entries(CARD_PREFIXES)) {
    for (const p of prefixos) {
      if (digitos.startsWith(p)) return bandeira as BandeiraCartao;
    }
  }
  return "desconhecida";
}

/**
 * Valida um cartão de crédito considerando bandeira, número de dígitos e Luhn.
 *
 * @param numero - Número do cartão (pode conter espaços ou traços).
 * @param bandeira - Bandeira esperada. Se fornecida, valida se bate com o prefixo.
 * @returns `true` se o cartão é válido.
 *
 * @example
 * ```ts
 * validarCartaoComBandeira("4539123456789012", "visa"); // true
 * validarCartaoComBandeira("5312000000000000", "amex"); // false (bandeira errada)
 * ```
 */
export function validarCartaoComBandeira(numero: string, bandeira?: BandeiraCartao): boolean {
  if (!validarCartaoCredito(numero)) return false;

  if (!bandeira) return true;

  const identificada = identificarBandeiraCartao(numero);
  if (identificada === "desconhecida") return false;

  return identificada === bandeira;
}
