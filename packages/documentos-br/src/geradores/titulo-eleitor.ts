import type { UF } from "../utilitarios/tipos";

export function gerarTituloEleitor(estado: UF): string {
  void estado;
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join("");
}

export function validarTituloEleitor(valor: string): boolean {
  return /^\d{12}$/.test(valor.replace(/\D/g, ""));
}
