export function gerarPlacaVeiculo(comPontuacao = false): string {
  const letras = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
  const numeros = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("");
  const raw = `${letras}${numeros}`;
  return comPontuacao ? `${letras}-${numeros}` : raw;
}
