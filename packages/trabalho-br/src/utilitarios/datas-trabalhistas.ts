/**
 * Calcula a diferença em dias inteiros entre duas datas.
 *
 * @param inicio - A data inicial.
 * @param fim - A data final.
 * @returns A quantidade de dias de diferença, ou `null` se os parâmetros forem inválidos.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date - Objeto Date no MDN
 *
 * @example
 * ```ts
 * diasEntreDatas(new Date("2026-05-01"), new Date("2026-05-10")); // 9
 * ```
 */
export function diasEntreDatas(inicio: Date, fim: Date): number | null {
  if (!(inicio instanceof Date) || !(fim instanceof Date)) return null;
  const diff = fim.getTime() - inicio.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
