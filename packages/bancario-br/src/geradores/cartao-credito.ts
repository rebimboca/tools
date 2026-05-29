export interface CartaoCreditoGerado {
  numero: string;
  mascarado: string;
}

const gerarDigitos = (tamanho: number): string =>
  Array.from({ length: tamanho }, () => Math.floor(Math.random() * 10)).join("");

const calcularDigitoLuhn = (numeroParcial: string): number => {
  const digitos = numeroParcial.split("").map(Number).reverse();

  let soma = 0;

  for (let i = 0; i < digitos.length; i += 1) {
    let valor = digitos[i] ?? 0;
    if (i % 2 === 0) {
      valor *= 2;
      if (valor > 9) valor -= 9;
    }
    soma += valor;
  }

  return (10 - (soma % 10)) % 10;
};

export function gerarCartaoCredito(prefixo = "4539"): CartaoCreditoGerado {
  const base = `${prefixo}${gerarDigitos(15 - prefixo.length)}`;
  const digito = calcularDigitoLuhn(base);
  const numero = `${base}${digito}`;

  return {
    numero,
    mascarado: numero.replace(/(\d{4})(?=\d)/g, "$1 ")
  };
}
