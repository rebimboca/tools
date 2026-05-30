/**
 * Valida se uma string é uma URL absoluta válida.
 *
 * Tenta analisar a string usando o construtor nativo `URL` do JavaScript,
 * suportando esquemas padrão (http, https, ftp, etc.).
 *
 * @param url - A string contendo a URL a ser validada.
 * @param protocols - Lista opcional de protocolos permitidos (ex: ["http", "https"]).
 * @returns `true` se for uma URL válida e pertencer aos protocolos definidos, `false` caso contrário.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/URL - Construtor URL no MDN
 * @see https://tools.ietf.org/html/rfc3986 - RFC 3986: Uniform Resource Identifier (URI)
 *
 * @example
 * ```ts
 * isValidUrl("https://rebimboca.tools");           // true
 * isValidUrl("ftp://files.example.com", ["https"]); // false
 * isValidUrl("invalid-url");                       // false
 * ```
 */
export function isValidUrl(url: string, protocols?: string[]): boolean {
  if (typeof url !== "string") return false;

  try {
    const parsed = new URL(url);
    if (protocols && protocols.length > 0) {
      const protocolName = parsed.protocol.replace(":", "");
      return protocols.includes(protocolName);
    }
    return true;
  } catch {
    return false;
  }
}
