/**
 * Removes all non-numeric characters from a string.
 *
 * Commonly used to normalize Brazilian documents (CPF, CNPJ, PIS, etc.)
 * that may contain dots, dashes, slashes and other formatting characters.
 *
 * @param value - Input string that may contain letters, punctuation and spaces.
 * @returns A new string containing only digits (0-9).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions - Regular Expressions in JavaScript
 *
 * @example
 * ```ts
 * onlyDigits("123.456.789-09"); // "12345678909"
 * onlyDigits("ABC");            // ""
 * ```
 */
export const onlyDigits = (value: string): string => value.replace(/\D/g, "");
