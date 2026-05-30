import { CodigoCompe } from "../tipos";

/**
 * Normaliza um código COMPE para 3 dígitos.
 * Retorna `null` quando o valor não representa um código válido.
 */
export function normalizarCodigoCompe(codigo: string | number): CodigoCompe | null {
  const somenteDigitos = String(codigo).trim();
  if (!/^\d{1,3}$/.test(somenteDigitos)) return null;
  return somenteDigitos.padStart(3, "0") as CodigoCompe;
}
