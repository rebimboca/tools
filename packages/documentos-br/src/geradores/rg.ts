export function gerarRG(comPontuacao = false): string {
  const base = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");
  const sum = base.split("").reduce((acc, c, i) => acc + Number(c) * (2 + i), 0);
  const d = sum % 11;
  const digit = d === 10 ? "X" : String(d);
  const rg = `${base}${digit}`;
  if (!comPontuacao) return rg;
  return rg.replace(/(\d{2})(\d{3})(\d{3})([\dX])/, "$1.$2.$3-$4");
}

export function validarRG(valor: string): boolean {
  const rg = valor.replace(/\./g, "").replace(/-/g, "").toUpperCase();
  if (!/^[0-9]{8}[0-9X]$/.test(rg)) return false;
  const base = rg.slice(0, 8);
  const sum = base.split("").reduce((acc, c, i) => acc + Number(c) * (2 + i), 0);
  const d = sum % 11;
  const digit = d === 10 ? "X" : String(d);
  return rg[8] === digit;
}
