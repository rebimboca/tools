import { onlyDigits } from "@rebimboca/shared";

/**
 * Remove todos os caracteres não-numéricos de uma string, retornando apenas os dígitos (0 a 9).
 * Esta função é uma re-exportação de `onlyDigits` de `@rebimboca/shared` para fins de consistência de domínio.
 *
 * @param valor - A string de entrada que pode conter pontos, traços, espaços, etc.
 * @returns Uma nova string contendo apenas caracteres numéricos.
 *
 * @example
 * ```ts
 * somenteDigitos("123.456.789-10"); // "12345678910"
 * ```
 */
export const somenteDigitos = onlyDigits;
