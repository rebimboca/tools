import {
  formatarCEP,
  formatarCNPJ,
  formatarCPF,
  formatarPIS,
  formatarRENAVAM,
  formatarTituloEleitor
} from "./formatadores";

export type TipoDocumento =
  | "CPF"
  | "CNPJ"
  | "CEP"
  | "PIS"
  | "RENAVAM"
  | "TituloEleitor"
  | "Desconhecido";

/**
 * Automatically identifies the probable type of a Brazilian document based on its length and formatting.
 * Note: this is a heuristic identifier. For strict validation, use the specific validator.
 *
 * @param documento - The string of the document (with or without punctuation).
 * @returns The probable document type.
 */
export function identificarDocumento(documento: string): TipoDocumento {
  const digits = documento.replace(/\D/g, "");

  if (digits.length === 8) return "CEP";
  if (digits.length === 12) return "TituloEleitor";
  if (digits.length === 14) return "CNPJ";

  if (digits.length === 11) {
    // Basic heuristic:
    // If it has standard CPF format (XXX.XXX.XXX-XX), it's likely CPF.
    if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(documento)) return "CPF";
    // If it has standard PIS format (XXX.XXXXX.XX-X), it's likely PIS.
    if (/^\d{3}\.\d{5}\.\d{2}-\d{1}$/.test(documento)) return "PIS";

    // Default fallback for 11 digits if no mask is present
    return "CPF";
  }

  return "Desconhecido";
}

/**
 * Automatically formats a document by heuristically identifying it.
 *
 * @param documento - The raw document string
 * @returns The formatted document, or the original string if type is unknown.
 */
export function formatarDocumento(documento: string): string {
  const tipo = identificarDocumento(documento);
  const digits = documento.replace(/\D/g, "");

  switch (tipo) {
    case "CPF":
      return formatarCPF(digits) || documento;
    case "CNPJ":
      return formatarCNPJ(digits) || documento;
    case "CEP":
      return formatarCEP(digits) || documento;
    case "PIS":
      return formatarPIS(digits) || documento;
    case "RENAVAM":
      return formatarRENAVAM(digits) || documento;
    case "TituloEleitor":
      return formatarTituloEleitor(digits) || documento;
    case "Desconhecido":
      return documento;
  }
}
