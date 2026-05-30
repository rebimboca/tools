/**
 * Gera uma placa de veículo brasileira válida no padrão tradicional (antigo) ou Mercosul.
 *
 * @param opcoes - Opções de configuração da placa.
 * @param opcoes.modelo - O padrão da placa: "antigo" (AAA-9999) ou "mercosul" (AAA9A99). Padrão: "mercosul".
 * @param opcoes.comPontuacao - Se true, inclui o hífen divisor (ex: AAA-9999 ou AAA-9A99). Padrão: false.
 * @returns Placa gerada como string.
 *
 * @see https://www.gov.br/infraestrutura/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao7802019.pdf - Padrão de Placas de Identificação Veicular (PIV) Mercosul
 *
 * @example
 * ```ts
 * gerarPlacaVeiculo({ modelo: "mercosul" }); // "ABC1D23"
 * gerarPlacaVeiculo({ modelo: "antigo", comPontuacao: true }); // "ABC-1234"
 * ```
 */
export function gerarPlacaVeiculo(opcoes?: {
  modelo?: "antigo" | "mercosul";
  comPontuacao?: boolean;
}): string {
  const modelo = opcoes?.modelo ?? "antigo";
  const comPontuacao = opcoes?.comPontuacao ?? false;

  const letras = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");

  if (modelo === "antigo") {
    const numeros = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("");
    return comPontuacao ? `${letras}-${numeros}` : `${letras}${numeros}`;
  }

  // Mercosul format: LLLNLNN (e.g. ABC1D23)
  const num1 = Math.floor(Math.random() * 10);
  const letraF = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const num2 = Array.from({ length: 2 }, () => Math.floor(Math.random() * 10)).join("");

  const raw = `${letras}${num1}${letraF}${num2}`;
  return comPontuacao ? `${letras}-${num1}${letraF}${num2}` : raw;
}
