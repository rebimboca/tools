import { randomUUID } from "node:crypto";

export type TipoChavePix = "cpf" | "cnpj" | "email" | "telefone" | "aleatoria";

/**
 * Gera uma chave PIX fictícia formatada para fins de teste.
 * (Nota: O CPF e CNPJ gerados aqui são heurísticos e não garantem
 * passar em validadores matemáticos de dígito verificador).
 *
 * @param tipo - O tipo da chave desejada. Defaults to "aleatoria".
 * @returns A string da chave PIX correspondente.
 *
 * @example
 * ```ts
 * gerarChavePix("aleatoria"); // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 * gerarChavePix("email"); // "usuario_f47ac10b@provedor.com.br"
 * ```
 */
export function gerarChavePix(tipo: TipoChavePix = "aleatoria"): string {
  switch (tipo) {
    case "cpf": {
      const d = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join("");
      return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9, 11)}`;
    }
    case "cnpj": {
      const d = Array.from({ length: 14 }, () => Math.floor(Math.random() * 10)).join("");
      return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12, 14)}`;
    }
    case "telefone": {
      const ddd = Math.floor(Math.random() * 89) + 11;
      const num = Math.floor(Math.random() * 90000000) + 900000000;
      return `+55${ddd}${num}`;
    }
    case "email": {
      const id = randomUUID().split("-")[0];
      return `usuario_${id}@provedor.com.br`;
    }
    case "aleatoria":
    default:
      return randomUUID();
  }
}
