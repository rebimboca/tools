/**
 * Mapa de caracteres HTML especiais para suas entidades correspondentes.
 * Previne ataques XSS e garante exibição correta em contextos HTML.
 */
const HTML_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Escapa caracteres especiais de HTML em uma string.
 *
 * Converte os 5 caracteres com significado especial em HTML (&, <, >, ", ')
 * para suas entidades correspondentes, prevenindo injeção de HTML/XSS.
 *
 * @param text - Texto a ser escapado. Retorna `null` se vazio ou falsy.
 * @returns O texto com caracteres HTML escapados, ou `null` se a entrada for inválida.
 *
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
 *
 * @example
 * ```ts
 * escapeHtml('<script>alert("xss")</script>');
 * // "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
 *
 * escapeHtml(""); // null
 * ```
 */
export function escapeHtml(text: string): string | null {
  if (!text) return null;
  return text.replace(/[&<>"']/g, (char) => HTML_MAP[char] ?? char);
}
