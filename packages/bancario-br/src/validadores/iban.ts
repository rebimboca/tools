/**
 * Valida um código IBAN (International Bank Account Number) em conformidade com a ISO 13616.
 *
 * Suporta a validação geral de formato e dígito verificador internacional (Módulo 97),
 * bem como regras específicas para o formato de IBAN brasileiro (29 caracteres, iniciando com "BR").
 *
 * @param iban - O código IBAN a ser validado.
 * @returns `true` se o IBAN for estrutural e matematicamente válido, `false` caso contrário.
 *
 * @see https://www.swift.com/standards/data-standards/iban - SWIFT IBAN Registry (Official ISO 13616 Registrar and Database)
 * @see https://www.bcb.gov.br/estabilidadefinanceira/iban - Regras do IBAN no Banco Central do Brasil
 *
 * @example
 * ```ts
 * isValidIban("BR123456789012345678901234567"); // true (se passar no mod 97)
 * ```
 */
export function isValidIban(iban: string): boolean {
  if (typeof iban !== "string") return false;

  // Remove espaços e converte para maiúsculas
  const cleanIban = iban.replace(/\s+/g, "").toUpperCase();

  // O IBAN deve ter entre 14 e 34 caracteres
  if (cleanIban.length < 14 || cleanIban.length > 34) return false;

  // Validação específica para o Brasil (ISO 13616 / Banco Central do Brasil)
  // O IBAN brasileiro tem tamanho fixo de 29 caracteres e inicia com "BR"
  if (cleanIban.startsWith("BR") && cleanIban.length !== 29) {
    return false;
  }

  // Rearranja: move os primeiros 4 caracteres para o fim
  const rearranged = cleanIban.slice(4) + cleanIban.slice(0, 4);

  // Converte letras para números (A = 10, B = 11, ..., Z = 35)
  let numericString = "";
  for (let i = 0; i < rearranged.length; i += 1) {
    const code = rearranged.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      // Letra A-Z
      numericString += (code - 55).toString();
    } else if (code >= 48 && code <= 57) {
      // Dígito 0-9
      numericString += rearranged[i];
    } else {
      // Caractere inválido
      return false;
    }
  }

  // Modulo 97 de um número arbitrariamente grande (usando BigInt ou loop de divisão)
  try {
    const value = BigInt(numericString);
    return value % 97n === 1n;
  } catch {
    // Se o ambiente não suportar BigInt (improvável no es2022), fazemos por blocos
    let checksum = 0;
    for (let i = 0; i < numericString.length; i += 7) {
      const chunk = checksum.toString() + numericString.slice(i, i + 7);
      checksum = parseInt(chunk, 10) % 97;
    }
    return checksum === 1;
  }
}
