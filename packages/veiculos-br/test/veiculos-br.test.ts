import { describe, expect, it } from "vitest";
import { gerarPlacaVeiculo, gerarVeiculo, validarPlacaVeiculo } from "../src";

describe("veiculos-br", () => {
  it("generates vehicle", () => {
    const v = gerarVeiculo();
    expect(v.placa.length).toBeGreaterThan(0);
  });

  it("generates plate with default antiguo format", () => {
    expect(gerarPlacaVeiculo()).toMatch(/^[A-Z]{3}\d{4}$/);
    expect(gerarPlacaVeiculo({ comPontuacao: true })).toMatch(/^[A-Z]{3}-\d{4}$/);
  });

  it("generates Mercosul format plate", () => {
    const plate = gerarPlacaVeiculo({ modelo: "mercosul" });
    expect(plate).toMatch(/^[A-Z]{3}\d[A-Z]\d{2}$/);
    expect(validarPlacaVeiculo(plate)).toBe(true);
  });

  it("validates both traditional and Mercosul vehicle plates", () => {
    expect(validarPlacaVeiculo("ABC-1234")).toBe(true);
    expect(validarPlacaVeiculo("ABC1234")).toBe(true);
    expect(validarPlacaVeiculo("ABC1D23")).toBe(true);
    expect(validarPlacaVeiculo("ABC-1D23")).toBe(true);
    expect(validarPlacaVeiculo("ABC123A")).toBe(false);
    expect(validarPlacaVeiculo("")).toBe(false);
  });
});
