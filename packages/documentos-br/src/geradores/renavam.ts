const calcRenavam = (base: string): number => {
  const digits = base.padStart(11, "0").split("").map(Number);
  let mult = 2;
  let sum = 0;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    sum += (digits[i] ?? 0) * mult;
    mult = mult === 9 ? 2 : mult + 1;
  }
  const mod = sum % 11;
  const d = 11 - mod;
  return d >= 10 ? 0 : d;
};

export function gerarRENAVAM(): string {
  const base = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join("");
  return `${base}${calcRenavam(base)}`;
}

export function validarRENAVAM(valor: string): boolean {
  const r = valor.replace(/\D/g, "");
  if (r.length !== 11) return false;
  return Number(r[10]) === calcRenavam(r.slice(0, 10));
}
