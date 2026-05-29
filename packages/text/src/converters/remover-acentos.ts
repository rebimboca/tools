export function removeAccents(text: string): string | null {
  if (!text) return null;
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
