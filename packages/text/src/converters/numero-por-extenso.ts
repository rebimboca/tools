const UNITS = ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
const TEENS = [
  "dez",
  "onze",
  "doze",
  "treze",
  "quatorze",
  "quinze",
  "dezesseis",
  "dezessete",
  "dezoito",
  "dezenove"
];
const TENS = [
  "",
  "",
  "vinte",
  "trinta",
  "quarenta",
  "cinquenta",
  "sessenta",
  "setenta",
  "oitenta",
  "noventa"
];
const HUNDREDS = [
  "",
  "cento",
  "duzentos",
  "trezentos",
  "quatrocentos",
  "quinhentos",
  "seiscentos",
  "setecentos",
  "oitocentos",
  "novecentos"
];

function underThousand(n: number): string {
  if (n === 0) return "";
  if (n < 10) return UNITS[n] ?? "";
  if (n < 20) return TEENS[n - 10] ?? "";
  if (n < 100) {
    const t = Math.floor(n / 10);
    const r = n % 10;
    const tens = TENS[t] ?? "";
    const units = UNITS[r] ?? "";
    return r ? `${tens} e ${units}` : tens;
  }
  if (n === 100) return "cem";
  const h = Math.floor(n / 100);
  const r = n % 100;
  const hundreds = HUNDREDS[h] ?? "";
  return r ? `${hundreds} e ${underThousand(r)}` : hundreds;
}

/**
 * Converts a positive integer into its corresponding written word representation in Portuguese.
 * Supports numbers from 0 up to 999,999,999,999 (billions).
 *
 * @param value - The integer value to convert.
 * @returns The Portuguese written word representation, or `null` if out of bounds or invalid.
 *
 * @see https://www.portugues.com.br/gramatica/numeros-por-extenso.html - Norma Gramatical de Escrita por Extenso
 *
 * @example
 * ```ts
 * numberToWords(1500); // "um mil e quinhentos" (or "mil e quinhentos")
 * numberToWords(1000000); // "um milhão"
 * ```
 */
export function numberToWords(value: number): string | null {
  if (value === undefined || value === null) return null;
  if (!Number.isInteger(value) || value < 0 || value > 999999999999) return null;
  if (value === 0) return "zero";

  if (value < 1000) return underThousand(value);

  const chunks: Array<{ value: number; singular: string; plural: string }> = [
    { value: 0, singular: "", plural: "" },
    { value: 0, singular: "mil", plural: "mil" },
    { value: 0, singular: "milhão", plural: "milhões" },
    { value: 0, singular: "bilhão", plural: "bilhões" }
  ];

  let temp = value;
  let chunkIdx = 0;
  while (temp > 0) {
    chunks[chunkIdx]!.value = temp % 1000;
    temp = Math.floor(temp / 1000);
    chunkIdx++;
  }

  const words: string[] = [];
  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i]!;
    if (chunk.value === 0) continue;

    const chunkStr = underThousand(chunk.value);
    if (i === 0) {
      words.push(chunkStr);
    } else if (i === 1) {
      if (chunk.value === 1) {
        words.push("mil");
      } else {
        words.push(`${chunkStr} mil`);
      }
    } else {
      const unit = chunk.value === 1 ? chunk.singular : chunk.plural;
      words.push(`${chunkStr} ${unit}`);
    }
  }

  if (words.length === 1) return words[0]!;

  return words.join(" e ");
}
