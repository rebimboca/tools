import { describe, expect,it } from "vitest";

import { formatarTituloEleitor,gerarTituloEleitor, validarTituloEleitor } from "../src";
import { UFS } from "../src/utilitarios/tipos";

describe("Título de Eleitor", () => {
  it("deve gerar títulos de eleitor válidos para todas as UFs", () => {
    for (const uf of UFS) {
      const titulo = gerarTituloEleitor(uf);
      expect(titulo).toHaveLength(12);
      expect(validarTituloEleitor(titulo)).toBe(true);
    }
  });

  it("deve validar títulos conhecidos", () => {
    // Um título gerado e verificado matematicamente para SP (UF 01)
    const spTitulo = gerarTituloEleitor("SP");
    expect(validarTituloEleitor(spTitulo)).toBe(true);

    // Um título com tamanho incorreto deve ser inválido
    expect(validarTituloEleitor("123")).toBe(false);
    expect(validarTituloEleitor("")).toBe(false);
  });

  it("deve formatar o título corretamente", () => {
    const titulo = "123456789012";
    const formatado = formatarTituloEleitor(titulo);
    expect(formatado).toBe("1234 5678 9012");

    expect(formatarTituloEleitor("123")).toBeNull();
  });
});
