const somenteDigitos = (valor: string): string => valor.replace(/\D/g, "");

const calcularDigitoModulo11 = (numero: string): string => {
  let peso = 2;
  let soma = 0;

  for (let i = numero.length - 1; i >= 0; i -= 1) {
    soma += Number(numero[i]) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }

  const resto = soma % 11;
  const digito = 11 - resto;

  if (digito === 10) return "X";
  if (digito === 11) return "0";
  return String(digito);
};

export function validarContaBancaria(conta: string, digito: string): boolean {
  const contaNormalizada = somenteDigitos(conta);
  const digitoNormalizado = digito.trim().toUpperCase();

  if (!contaNormalizada || !digitoNormalizado) return false;

  return calcularDigitoModulo11(contaNormalizada) === digitoNormalizado;
}
