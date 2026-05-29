const HTML_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

export function textToHtml(text: string): string | null {
  if (!text) return null;
  return text.replace(/[&<>"']/g, (char) => HTML_MAP[char] ?? char);
}
