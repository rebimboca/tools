export function formatarMoeda(valor: number, moeda = "BRL", locale = "pt-BR"): string | null {
  if (!Number.isFinite(valor)) return null;
  return new Intl.NumberFormat(locale, { style: "currency", currency: moeda }).format(valor);
}
