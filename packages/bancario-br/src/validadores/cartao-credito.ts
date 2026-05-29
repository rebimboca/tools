const somenteDigitos = (valor: string): string => valor.replace(/\D/g, "");

export function validarCartaoCredito(numero: string): boolean {
  const digitos = somenteDigitos(numero);
  if (digitos.length < 13 || digitos.length > 19) return false;

  let soma = 0;
  let dobrar = false;

  for (let i = digitos.length - 1; i >= 0; i -= 1) {
    let n = Number(digitos[i]);
    if (dobrar) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    soma += n;
    dobrar = !dobrar;
  }

  return soma % 10 === 0;
}
