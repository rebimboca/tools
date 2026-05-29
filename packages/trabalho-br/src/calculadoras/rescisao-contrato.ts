export interface RescisaoEntrada {
  salario: number;
  mesesTrabalhadosNoAno: number;
  diasAvisoPrevio?: number;
}

export interface RescisaoResultado {
  saldoSalario: number;
  decimoTerceiroProporcional: number;
  avisoPrevio: number;
  totalBruto: number;
}

export function calcularRescisaoContrato(entrada: RescisaoEntrada): RescisaoResultado | null {
  if (
    entrada.salario <= 0 ||
    entrada.mesesTrabalhadosNoAno < 0 ||
    entrada.mesesTrabalhadosNoAno > 12
  )
    return null;
  const saldoSalario = entrada.salario;
  const decimoTerceiroProporcional = (entrada.salario / 12) * entrada.mesesTrabalhadosNoAno;
  const avisoPrevio = (entrada.salario / 30) * (entrada.diasAvisoPrevio ?? 30);
  const totalBruto = saldoSalario + decimoTerceiroProporcional + avisoPrevio;
  return { saldoSalario, decimoTerceiroProporcional, avisoPrevio, totalBruto };
}
