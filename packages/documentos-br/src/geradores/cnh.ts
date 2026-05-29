function calcDigits(base: string): string {
  let sum = 0;
  for (let i = 0, w = 9; i < 9; i += 1, w -= 1) sum += Number(base[i]) * w;
  let d1 = sum % 11;
  if (d1 === 10) d1 = 0;
  sum = 0;
  for (let i = 0, w = 1; i < 9; i += 1, w += 1) sum += Number(base[i]) * w;
  let d2 = sum % 11;
  if (d2 === 10) d2 = 0;
  return `${d1}${d2}`;
}

export function gerarCNH(): string {
  const base = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");
  return `${base}${calcDigits(base)}`;
}

export function validarCNH(valor: string): boolean {
  const cnh = valor.replace(/\D/g, "");
  if (cnh.length !== 11) return false;
  return cnh.slice(9) === calcDigits(cnh.slice(0, 9));
}
