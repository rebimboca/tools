import { describe, it, expect } from "vitest";
import { gerarInscricaoEstadual, validarInscricaoEstadual, formatarInscricaoEstadual } from "../src";

describe("Inscrição Estadual", () => {
  it("deve gerar e validar IE válidas para SP", () => {
    for (let i = 0; i < 50; i++) {
      const ie = gerarInscricaoEstadual("SP");
      expect(ie).toHaveLength(12);
      expect(validarInscricaoEstadual(ie, "SP")).toBe(true);
    }
  });

  it("deve rejeitar IE inválidas para SP", () => {
    expect(validarInscricaoEstadual("111111111111", "SP")).toBe(false);
    expect(validarInscricaoEstadual("123", "SP")).toBe(false);
    expect(validarInscricaoEstadual("", "SP")).toBe(false);
  });

  it("deve gerar e validar IE genéricas para outras UFs", () => {
    const ie = gerarInscricaoEstadual("RJ");
    expect(ie.length).toBeGreaterThanOrEqual(8);
    expect(ie.length).toBeLessThanOrEqual(14);
    expect(validarInscricaoEstadual(ie, "RJ")).toBe(true);
  });

  it("deve formatar a IE corretamente para SP", () => {
    const ie = "110042490114";
    const formatado = formatarInscricaoEstadual(ie, "SP");
    expect(formatado).toBe("110.042.490-114");

    const ieOutro = "12345678";
    expect(formatarInscricaoEstadual(ieOutro, "RJ")).toBe(ieOutro);
  });
});
