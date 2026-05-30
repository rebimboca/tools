/**
 * Formata um CPF com a máscara padrão XXX.XXX.XXX-XX.
 *
 * @param cpf - String de 11 dígitos (com ou sem formatação prévia).
 * @returns CPF formatado ou `null` se o input não tiver 11 dígitos.
 *
 * @example
 * ```ts
 * formatarCPF("12345678909"); // "123.456.789-09"
 * ```
 */
export function formatarCPF(cpf: string): string | null {
  const d = cpf.replace(/\D/g, "");
  if (d.length !== 11) return null;
  return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

/**
 * Formata um CNPJ com a máscara padrão XX.XXX.XXX/XXXX-XX.
 *
 * @param cnpj - String de 14 dígitos (com ou sem formatação prévia).
 * @returns CNPJ formatado ou `null` se o input não tiver 14 dígitos.
 *
 * @example
 * ```ts
 * formatarCNPJ("11222333000181"); // "11.222.333/0001-81"
 * ```
 */
export function formatarCNPJ(cnpj: string): string | null {
  const d = cnpj.replace(/\D/g, "");
  if (d.length !== 14) return null;
  return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

/**
 * Formata um CEP com a máscara padrão XXXXX-XXX.
 *
 * @param cep - String de 8 dígitos (com ou sem formatação prévia).
 * @returns CEP formatado ou `null` se o input não tiver 8 dígitos.
 *
 * @example
 * ```ts
 * formatarCEP("01310100"); // "01310-100"
 * ```
 */
export function formatarCEP(cep: string): string | null {
  const d = cep.replace(/\D/g, "");
  if (d.length !== 8) return null;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

/**
 * Formata um PIS/PASEP com a máscara padrão XXX.XXXXX.XX-X.
 *
 * @param pis - String de 11 dígitos (com ou sem formatação prévia).
 * @returns PIS formatado ou `null` se o input não tiver 11 dígitos.
 *
 * @example
 * ```ts
 * formatarPIS("12345678901"); // "123.45678.90-1"
 * ```
 */
export function formatarPIS(pis: string): string | null {
  const d = pis.replace(/\D/g, "");
  if (d.length !== 11) return null;
  return d.replace(/(\d{3})(\d{5})(\d{2})(\d)/, "$1.$2.$3-$4");
}

/**
 * Formata um RG com a máscara padrão XX.XXX.XXX-X.
 *
 * @param rg - String de 9 caracteres (dígitos + possível X no final).
 * @returns RG formatado ou `null` se o input for inválido.
 *
 * @example
 * ```ts
 * formatarRG("123456789"); // "12.345.678-9"
 * formatarRG("12345678X"); // "12.345.678-X"
 * ```
 */
export function formatarRG(rg: string): string | null {
  const d = rg.replace(/[.-]/g, "").toUpperCase();
  if (!/^[0-9]{8}[0-9X]$/.test(d)) return null;
  return d.replace(/(\d{2})(\d{3})(\d{3})([\dX])/, "$1.$2.$3-$4");
}

/**
 * Formata um RENAVAM com a máscara padrão XXXXXXXXXXX (sem pontuação padrão).
 *
 * @param renavam - String de 11 dígitos.
 * @returns RENAVAM formatado (11 dígitos com zero-pad) ou `null` se inválido.
 *
 * @example
 * ```ts
 * formatarRENAVAM("12345678901"); // "12345678901"
 * ```
 */
export function formatarRENAVAM(renavam: string): string | null {
  const d = renavam.replace(/\D/g, "");
  if (d.length !== 11) return null;
  return d;
}

/**
 * Formata um Título de Eleitor com a máscara padrão XXXX XXXX XXXX.
 *
 * @param titulo - String de 12 dígitos (com ou sem formatação prévia).
 * @returns Título de Eleitor formatado ou `null` se o input não tiver 12 dígitos.
 *
 * @example
 * ```ts
 * formatarTituloEleitor("123456789012"); // "1234 5678 9012"
 * ```
 */
export function formatarTituloEleitor(titulo: string): string | null {
  const d = titulo.replace(/\D/g, "");
  if (d.length !== 12) return null;
  return `${d.slice(0, 4)} ${d.slice(4, 8)} ${d.slice(8, 12)}`;
}

/**
 * Formata uma Inscrição Estadual (IE) no padrão geral de São Paulo NNN.NNN.NNN.NNN
 * ou mantém sem formatação para outros estados que possuem regras de comprimentos diversos.
 *
 * @param ie - String de dígitos da IE.
 * @param estado - Sigla da UF do estado emissor.
 * @returns IE formatada ou a própria string original se não houver máscara aplicável.
 *
 * @example
 * ```ts
 * formatarInscricaoEstadual("110042490114", "SP"); // "110.042.490.114"
 * ```
 */
export function formatarInscricaoEstadual(ie: string, estado: string): string | null {
  const d = ie.replace(/\D/g, "");
  if (estado.toUpperCase() === "SP" && d.length === 12) {
    return d.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1.$2.$3-$4");
  }
  return ie;
}
