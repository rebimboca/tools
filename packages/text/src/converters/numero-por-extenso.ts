const UNITS = ["zero", "um", "dois", "tres", "quatro", "cinco", "seis", "sete", "oito", "nove"];
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

export function numberToWords(value: number): string | null {
  if (!Number.isInteger(value) || value < 0 || value > 999999) return null;
  if (value < 1000) return underThousand(value);
  const mil = Math.floor(value / 1000);
  const resto = value % 1000;
  const milPart = mil === 1 ? "mil" : `${underThousand(mil)} mil`;
  if (!resto) return milPart;
  return `${milPart} e ${underThousand(resto)}`;
}
