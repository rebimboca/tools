import { NOMES } from "../dados/nomes";
import { SOBRENOMES } from "../dados/sobrenomes";

export function gerarNomes(quantidade = 1): string[] | null {
  if (quantidade < 1 || quantidade > 200) return null;
  return Array.from(
    { length: quantidade },
    () =>
      `${NOMES[Math.floor(Math.random() * NOMES.length)]} ${SOBRENOMES[Math.floor(Math.random() * SOBRENOMES.length)]}`
  );
}
