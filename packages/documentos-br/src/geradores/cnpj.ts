const onlyDigits = (v: string): string => v.replace(/\D/g, "");

const calc = (base: string, weights: number[]): number => {
  const total = base.split("").reduce((acc, c, i) => acc + Number(c) * (weights[i] ?? 0), 0);
  const r = total % 11;
  return r < 2 ? 0 : 11 - r;
};

export function gerarCNPJ(comPontuacao = false): string {
  const base = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join("");
  const d1 = calc(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calc(base + d1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const cnpj = `${base}${d1}${d2}`;
  if (!comPontuacao) return cnpj;
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export function validarCNPJ(entrada: string): boolean {
  const cnpj = onlyDigits(entrada);
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  const b = cnpj.slice(0, 12);
  const d1 = calc(b, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calc(b + d1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return cnpj === `${b}${d1}${d2}`;
}
