const COMMON_FIXES: Record<string, string> = {
  nao: "não",
  voce: "você",
  tambem: "também",
  ate: "até",
  ideia: "ideia"
};

export function correctSpelling(text: string): string | null {
  if (!text) return null;
  return text.replace(/\b\w+\b/g, (w) => COMMON_FIXES[w.toLowerCase()] ?? w);
}
