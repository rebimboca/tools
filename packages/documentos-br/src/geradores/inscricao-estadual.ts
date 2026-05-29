import type { UF } from "../utilitarios/tipos";

export function gerarInscricaoEstadual(estado: UF): string {
  void estado;
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join("");
}

export function validarInscricaoEstadual(valor: string, estado: UF): boolean {
  void estado;
  return /^\d{8,14}$/.test(valor.replace(/\D/g, ""));
}
