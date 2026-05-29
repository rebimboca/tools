export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isPositiveInt(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) > 0;
}
