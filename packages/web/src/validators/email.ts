const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Valida se uma string é um endereço de e-mail válido.
 *
 * Realiza uma verificação baseada no padrão de expressão regular padrão (compatível com a RFC 5322).
 *
 * @param email - A string contendo o e-mail a ser validado.
 * @returns `true` se o formato do e-mail for válido, `false` caso contrário.
 *
 * @see https://emailregex.com/ - Coleção de Regex padrão para validação de e-mail
 * @see https://tools.ietf.org/html/rfc5322 - RFC 5322 Internet Message Format (Seção 3.4.1)
 *
 * @example
 * ```ts
 * isValidEmail("contato@rebimboca.com.br"); // true
 * isValidEmail("invalido@com");             // false
 * ```
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  return EMAIL_REGEX.test(email);
}
