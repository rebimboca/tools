import { somenteDigitos } from "../utilitarios/somente-digitos";

/**
 * Valida matematicamente se um número de Título de Eleitor é válido.
 * A validação é feita aplicando o algoritmo de Módulo 11 sobre o sequencial de 8 dígitos,
 * o código de estado (UF) de dois dígitos e os dois dígitos verificadores (DV) finais.
 * Trata corretamente as exceções históricas dos estados de São Paulo (código "01")
 * e Minas Gerais (código "02"), onde o resto 0 da divisão por 11 é substituído por 1
 * ao invés de 0.
 *
 * @param valor - O número do Título de Eleitor a ser validado, com ou sem pontuação/formatação.
 * @returns Retorna true se o título for matematicamente válido, false caso contrário.
 *
 * @see https://www.ghiorzi.org/controbr.htm - Regras detalhadas de Módulo 11 e exceções para SP e MG
 * @see https://cadcobol.com.br/tabela_estados_titulo_eleitor.htm - Códigos de UF oficiais do TSE
 *
 * @example
 * ```ts
 * validarTituloEleitor("123456780120"); // ex: true ou false conforme cálculo de DV
 * ```
 */
export function validarTituloEleitor(valor: string): boolean {
  if (!valor) return false;
  
  const titulo = somenteDigitos(valor);
  if (titulo.length !== 12) return false;

  const base = titulo.slice(0, 8);
  const ufCode = titulo.slice(8, 10);
  const dv1Informado = Number(titulo[10]);
  const dv2Informado = Number(titulo[11]);

  // Valida o código do estado (deve ser de "01" a "28")
  const ufNum = Number(ufCode);
  if (ufNum < 1 || ufNum > 28) return false;

  // Cálculo do primeiro DV esperado
  let soma1 = 0;
  for (let i = 0; i < 8; i++) {
    soma1 += Number(base[i]) * (2 + i);
  }
  const resto1 = soma1 % 11;
  let dv1Esperado = resto1;
  if (resto1 === 10) {
    dv1Esperado = 0;
  } else if (resto1 === 0) {
    dv1Esperado = (ufCode === "01" || ufCode === "02") ? 1 : 0;
  }

  if (dv1Informado !== dv1Esperado) return false;

  // Cálculo do segundo DV esperado
  const seqUF = ufCode + String(dv1Esperado);
  let soma2 = 0;
  soma2 += Number(seqUF[0]) * 7;
  soma2 += Number(seqUF[1]) * 8;
  soma2 += Number(seqUF[2]) * 9;

  const resto2 = soma2 % 11;
  let dv2Esperado = resto2;
  if (resto2 === 10) {
    dv2Esperado = 0;
  } else if (resto2 === 0) {
    dv2Esperado = (ufCode === "01" || ufCode === "02") ? 1 : 0;
  }

  return dv2Informado === dv2Esperado;
}
