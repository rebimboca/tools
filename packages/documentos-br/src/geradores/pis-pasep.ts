const calcPis = (base: string): number => {
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const total = base.split("").reduce((acc, c, i) => acc + Number(c) * (weights[i] ?? 0), 0);
  const d = 11 - (total % 11);
  return d === 10 || d === 11 ? 0 : d;
};

export function gerarPISPASEP(comPontuacao = false): string {
  const base = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join("");
  const pis = `${base}${calcPis(base)}`;
  if (!comPontuacao) return pis;
  return pis.replace(/(\d{3})(\d{5})(\d{2})(\d)/, "$1.$2.$3-$4");
}

export function validarPISPASEP(valor: string): boolean {
  const pis = valor.replace(/\D/g, "");
  if (pis.length !== 11) return false;
  return Number(pis[10]) === calcPis(pis.slice(0, 10));
}
