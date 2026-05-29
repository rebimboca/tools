const calcularDigito = (base: string, fator: number): number => {
  let total = 0;

  for (const caractere of base) {
    total += Number(caractere) * fator;
    fator -= 1;
  }

  const modulo = total % 11;
  return modulo < 2 ? 0 : 11 - modulo;
};

export function gerarCPF(comMascara = false): string {
  const base = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");
  const d1 = calcularDigito(base, 10);
  const d2 = calcularDigito(base + String(d1), 11);
  const cpf = base + String(d1) + String(d2);

  if (!comMascara) return cpf;

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
