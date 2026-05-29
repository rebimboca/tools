import { somenteDigitos } from "../utilitarios/somente-digitos";

const calcularDigito = (base: string, fator: number): number => {
  let total = 0;

  for (const caractere of base) {
    total += Number(caractere) * fator;
    fator -= 1;
  }

  const modulo = total % 11;
  return modulo < 2 ? 0 : 11 - modulo;
};

export function validarCPF(entrada: string): boolean {
  const cpf = somenteDigitos(entrada);

  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const d1 = calcularDigito(cpf.slice(0, 9), 10);
  const d2 = calcularDigito(cpf.slice(0, 9) + String(d1), 11);

  return cpf === cpf.slice(0, 9) + String(d1) + String(d2);
}
