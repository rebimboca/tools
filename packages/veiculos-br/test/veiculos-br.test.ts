import { describe, expect, it } from "vitest";

import { gerarPlacaVeiculo, gerarVeiculo } from "../src";

describe("veiculos-br", () => {
  it("generates vehicle", () => {
    const v = gerarVeiculo();
    expect(v.placa.length).toBeGreaterThan(0);
  });
  it("generates plate", () => {
    expect(gerarPlacaVeiculo()).toMatch(/^[A-Z]{3}\d{4}$/);
  });
});
