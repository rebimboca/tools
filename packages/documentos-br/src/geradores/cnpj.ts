const onlyDigits = (v: string): string => v.replace(/\D/g, "");

const calc = (base: string, weights: number[]): number => {
  const total = base.split("").reduce((acc, c, i) => acc + Number(c) * (weights[i] ?? 0), 0);
  const r = total % 11;
  return r < 2 ? 0 : 11 - r;
};

/**
 * Gera um número de CNPJ (Cadastro Nacional da Pessoa Jurídica) válido.
 *
 * O CNPJ é composto por 14 dígitos no formato XX.XXX.XXX/XXXX-XX:
 * - Posições 1-8: Identificação da empresa.
 * - Posições 9-12: Número da filial (0001 = matriz).
 * - Posições 13-14: Dígitos verificadores calculados pelo Módulo 11.
 *
 * @param comPontuacao - Se `true`, retorna formatado "XX.XXX.XXX/XXXX-XX".
 * @returns String com o CNPJ gerado.
 *
 * @see https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/cadastros/cnpj - Cadastro Nacional da Pessoa Jurídica (CNPJ) na Receita Federal do Brasil
 * @see https://www.macoratti.net/alg_cnpj.htm - Algoritmo de validação do CNPJ

 *
 * @example
 * ```ts
 * gerarCNPJ();      // "11222333000181"
 * gerarCNPJ(true);  // "11.222.333/0001-81"
 * ```
 */
export function gerarCNPJ(comPontuacao = false): string {
  const base = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join("");
  const d1 = calc(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calc(base + d1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const cnpj = `${base}${d1}${d2}`;
  if (!comPontuacao) return cnpj;
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

/**
 * Valida um número de CNPJ verificando os dígitos verificadores.
 *
 * Rejeita CNPJs com todos os dígitos iguais (ex: 11.111.111/1111-11).
 *
 * @param entrada - CNPJ a validar, podendo conter pontuação.
 * @returns `true` se o CNPJ é matematicamente válido.
 *
 * @see https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/cadastros/cnpj - Cadastro Nacional da Pessoa Jurídica (CNPJ) na Receita Federal do Brasil

 *
 * @example
 * ```ts
 * validarCNPJ("11.222.333/0001-81"); // true
 * validarCNPJ("11.111.111/1111-11"); // false
 * ```
 */
export function validarCNPJ(entrada: string): boolean {
  const cnpj = onlyDigits(entrada);
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  const b = cnpj.slice(0, 12);
  const d1 = calc(b, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calc(b + d1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return cnpj === `${b}${d1}${d2}`;
}
