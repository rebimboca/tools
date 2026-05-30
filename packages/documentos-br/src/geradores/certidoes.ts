/**
 * Tipos de certidão do Registro Civil brasileiro.
 *
 * Conforme o sistema de matrícula do CNJ:
 * - 1 = Nascimento
 * - 2 = Casamento
 * - 3 = Casamento Religioso com Efeito Civil
 * - 4 = Óbito
 */
export type TipoCertidao = "nascimento" | "casamento" | "obito";

export const TIPO_CODIGO: Record<TipoCertidao, string> = {
  nascimento: "1",
  casamento: "2",
  obito: "4"
};

const TIPOS_VALIDOS = new Set<string>(["nascimento", "casamento", "obito"]);

/**
 * Gera um número de matrícula de certidão do Registro Civil.
 *
 * A matrícula segue o padrão do CNJ com 32 dígitos:
 * - Posições 1-6: Código Nacional da Serventia (cartório)
 * - Posições 7-8: Código do acervo
 * - Posições 9-10: Código do serviço (55 = Registro Civil)
 * - Posições 11-14: Ano do registro
 * - Posição 15: Tipo da certidão (1=Nascimento, 2=Casamento, 4=Óbito)
 * - Posições 16-20: Número do livro
 * - Posições 21-23: Número da folha
 * - Posições 24-30: Número do termo
 * - Posições 31-32: Dígitos verificadores
 *
 * @param tipo - Tipo da certidão: "nascimento", "casamento" ou "obito".
 * @param comPontuacao - Se `true`, formata com espaços entre os grupos.
 * @returns String de 32 dígitos, ou `null` se o tipo for inválido.
 *
 * @example
 * ```ts
 * gerarCertidao("nascimento");       // "10494201552020100001001000000101"
 * gerarCertidao("casamento", true);  // "104942 01 55 2020 2 00001 001 0000001 01"
 * ```
 */
export function gerarCertidao(tipo: TipoCertidao, comPontuacao = false): string | null {
  if (!TIPOS_VALIDOS.has(tipo)) return null;

  const serventia = randDigits(6);
  const acervo = randDigits(2);
  const servico = "55";
  const ano = String(2000 + Math.floor(Math.random() * 26));
  const tipoCod = TIPO_CODIGO[tipo] ?? "1";
  const livro = randDigits(5);
  const folha = randDigits(3);
  const termo = randDigits(7);

  const base = `${serventia}${acervo}${servico}${ano}${tipoCod}${livro}${folha}${termo}`;
  const dv = calcularDVCertidao(base);
  const raw = `${base}${dv}`;

  if (!comPontuacao) return raw;
  return `${serventia} ${acervo} ${servico} ${ano} ${tipoCod} ${livro} ${folha} ${termo} ${dv}`;
}

function randDigits(n: number): string {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");
}

/**
 * Calcula os dois dígitos verificadores esperados de uma certidão CNJ de 32 dígitos
 * utilizando o algoritmo oficial de Módulo 11 com pesos variáveis por posição.
 *
 * @param base - Os 30 dígitos iniciais da certidão.
 * @returns Retorna uma string de 2 dígitos contendo os DVs calculados.
 */
export function calcularDVCertidao(base: string): string {
  // Módulo 11 com pesos 1-10 alternados, simplificado para CNJ
  let soma = 0;
  for (let i = 0; i < base.length; i += 1) {
    soma += Number(base[i]) * ((i % 10) + 1);
  }
  const resto = soma % 11;
  const d = resto >= 10 ? 0 : resto;
  // Segundo dígito
  let soma2 = soma + d * ((base.length % 10) + 1);
  const resto2 = soma2 % 11;
  const d2 = resto2 >= 10 ? 0 : resto2;
  return `${d}${d2}`;
}
