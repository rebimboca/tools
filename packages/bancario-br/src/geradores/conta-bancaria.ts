export interface ContaBancariaGerada {
  agencia: string;
  conta: string;
  digito: string;
  contaCompleta: string;
}

const gerarDigitos = (tamanho: number): string =>
  Array.from({ length: tamanho }, () => Math.floor(Math.random() * 10)).join("");

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

export function gerarContaBancaria(
  agencia = gerarDigitos(4),
  tamanhoConta = 8
): ContaBancariaGerada {
  const conta = gerarDigitos(tamanhoConta);
  const digito = calcularDigitoModulo11(conta);

  return {
    agencia,
    conta,
    digito,
    contaCompleta: `${agencia}/${conta}-${digito}`
  };
}
