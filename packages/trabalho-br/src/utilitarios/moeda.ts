/**
 * Formata um valor numérico em uma representação de moeda de acordo com a localidade.
 *
 * @param valor - O valor numérico a ser formatado.
 * @param moeda - O código da moeda de três letras (ISO 4217). Padrão: "BRL".
 * @param locale - A string da localidade baseada em BCP 47. Padrão: "pt-BR".
 * @returns A string formatada como moeda, ou `null` se o valor não for finito.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat - Intl.NumberFormat no MDN
 * @see https://www.six-group.com/en/products-services/financial-information/data-standards/iso-4217.html - SIX Group: Banco de Dados Oficial e Gratuito da ISO 4217 (Códigos de Moedas)
 *
 * @example
 * ```ts
 * formatarMoeda(1250.5); // "R$ 1.250,50"
 * ```
 */
export function formatarMoeda(valor: number, moeda = "BRL", locale = "pt-BR"): string | null {
  if (!Number.isFinite(valor)) return null;
  return new Intl.NumberFormat(locale, { style: "currency", currency: moeda }).format(valor);
}
