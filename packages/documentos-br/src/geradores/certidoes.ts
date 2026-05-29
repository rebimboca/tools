export type TipoCertidao = "nascimento" | "casamento" | "obito";

export function gerarCertidao(tipo: TipoCertidao, comPontuacao = false): string | null {
  if (!["nascimento", "casamento", "obito"].includes(tipo)) return null;
  const prefix = tipo === "nascimento" ? "1" : tipo === "casamento" ? "2" : "3";
  const body = Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)).join("");
  const raw = `${prefix}${body}`;
  if (!comPontuacao) return raw;
  return raw.replace(
    /(\d{6})(\d{2})(\d{4})(\d{1})(\d{6})(\d{2})(\d{4})(\d{2})/,
    "$1 $2 $3 $4 $5 $6 $7 $8"
  );
}

export function validarCertidao(valor: string, tipo: TipoCertidao): boolean {
  const v = valor.replace(/\D/g, "");
  if (v.length < 20) return false;
  const expected = tipo === "nascimento" ? "1" : tipo === "casamento" ? "2" : "3";
  return v.startsWith(expected);
}
