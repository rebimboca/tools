/**
 * Checks if a value is a non-empty string.
 *
 * @param value - The value to verify.
 * @returns True if the value is a string and has at least one non-whitespace character, false otherwise.
 *
 * @see https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates - TypeScript Type Predicates
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Checks if a value is a positive integer (greater than zero).
 *
 * @param value - The value to verify.
 * @returns True if the value is an integer greater than zero, false otherwise.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger - Number.isInteger on MDN
 */
export function isPositiveInt(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) > 0;
}
