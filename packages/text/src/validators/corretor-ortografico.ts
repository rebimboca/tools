const COMMON_FIXES: Record<string, string> = {
  // Missing accents
  nao: "não",
  voce: "você",
  tambem: "também",
  ate: "até",
  ideia: "ideia",
  e: "é", // simple lowercase standard correction when isolated
  so: "só",
  ja: "já",
  esta: "está",
  estao: "estão",
  sao: "são",
  principais: "principais",
  portugues: "português",

  // Internet slangs & abbreviations
  vc: "você",
  tbm: "também",
  tb: "também",
  pq: "porque",
  q: "que",
  mto: "muito",
  obg: "obrigado",
  blz: "beleza",
  kd: "cadê",
  fds: "fim de semana",
  msg: "mensagem",
  gnt: "gente",

  // Common spelling mistakes
  concerteza: "com certeza",
  derrepente: "de repente",
  agente: "a gente", // when used as pronoun
  paralizar: "paralisar",
  analizar: "analisar",
  excessao: "exceção",
  exceçao: "exceção",
  excessão: "exceção",
  pretencioso: "pretensioso",
  atraz: "atrás",
  quiz: "quis",
  frustado: "frustrado",
  beneficiente: "beneficente",
  compania: "companhia",
  privilegio: "privilégio",
  poblema: "problema",
  probrema: "problema"
};

/**
 * Corrects common spelling mistakes, missing diacritics, and internet abbreviations
 * in Portuguese texts using a highly optimized static dictionary mapping.
 *
 * @param text - The input text containing potential spelling mistakes or abbreviations.
 * @returns The corrected text, or `null` if the input is empty or invalid.
 *
 * @see https://www.academia.org.br/ - Academia Brasileira de Letras (Official Portuguese spelling reference)
 * @see https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/manual-de-redacao - Manual de Redação da Presidência da República
 *
 * @example
 * ```ts
 * correctSpelling("vc nao sabe tbm das msg pq kd ela");
 * // "você não sabe também das mensagem porque cadê ela" (approximate mapping)
 * ```
 */
export function correctSpelling(text: string): string | null {
  if (!text) return null;
  return text.replace(/\b\w+\b/g, (word) => {
    const lowerWord = word.toLowerCase();
    const replacement = COMMON_FIXES[lowerWord];
    if (replacement !== undefined) {
      // Preserve uppercase/capitalize formatting where appropriate
      if (word === word.toUpperCase() && word.length > 1) {
        return replacement.toUpperCase();
      }
      if (word[0] === word[0]?.toUpperCase()) {
        return replacement[0]?.toUpperCase() + replacement.slice(1);
      }
      return replacement;
    }
    return word;
  });
}
