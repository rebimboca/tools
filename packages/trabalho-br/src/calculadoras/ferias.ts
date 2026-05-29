export interface FeriasEntrada {
  salarioBase: number;
  diasFerias: number;
  abonoPecuniario?: boolean;
}

export interface FeriasResultado {
  valorFerias: number;
  adicionalUmTerco: number;
  totalBruto: number;
}

export function calcularFerias(entrada: FeriasEntrada): FeriasResultado | null {
  if (entrada.salarioBase <= 0 || entrada.diasFerias < 1 || entrada.diasFerias > 30) return null;
  const valorFerias = (entrada.salarioBase / 30) * entrada.diasFerias;
  const adicionalUmTerco = valorFerias / 3;
  const totalBruto = valorFerias + adicionalUmTerco;
  return { valorFerias, adicionalUmTerco, totalBruto };
}
