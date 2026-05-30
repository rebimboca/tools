/**
 * Converte um texto em um slug amigável para URLs.
 *
 * Remove acentos, caracteres especiais, substitui espaços por hifens
 * e transforma todas as letras em minúsculas.
 *
 * @param texto - O texto original a ser convertido.
 * @returns O slug gerado, ou `null` se o texto de entrada for inválido ou vazio.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Slug - MDN Web Docs Glossary: Slug
 * @see https://datatracker.ietf.org/doc/html/rfc3986 - RFC 3986: Uniform Resource Identifier (URI): Generic Syntax

 *
 * @example
 * ```ts
 * toSlug("Olá Mundo! Tudo Bem?"); // "ola-mundo-tudo-bem"
 * toSlug("   Café com Leite... ");  // "cafe-com-leite"
 * ```
 */
export function toSlug(texto: string): string | null {
  if (typeof texto !== "string" || !texto.trim()) return null;

  return texto
    .normalize("NFD") // Decompõe caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres não alfanuméricos exceto espaços e hifens
    .trim()
    .replace(/\s+/g, "-") // Substitui múltiplos espaços por um único hífen
    .replace(/-+/g, "-"); // Substitui múltiplos hifens seguidos por um único hífen
}
