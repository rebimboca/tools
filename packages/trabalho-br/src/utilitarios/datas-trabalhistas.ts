export function diasEntreDatas(inicio: Date, fim: Date): number | null {
  if (!(inicio instanceof Date) || !(fim instanceof Date)) return null;
  const diff = fim.getTime() - inicio.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
