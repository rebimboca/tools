const HTML_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

/**
 * Escapes special HTML characters in a string to prevent XSS injection.
 *
 * @param text - The text to escape.
 * @returns The HTML-escaped string, or `null` if input is empty.
 *
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html - OWASP XSS Prevention
 */
export function textToHtml(text: string): string | null {
  if (!text) return null;
  return text.replace(/[&<>"']/g, (char) => HTML_MAP[char] ?? char);
}
