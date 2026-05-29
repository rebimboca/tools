import { describe, expect, it } from "vitest";

import { calcularFerias, calcularRescisaoContrato, formatarMoeda } from "../src";

describe("trabalho-br", () => {
  it("calculates", () => {
    expect(calcularFerias({ salarioBase: 3000, diasFerias: 30 })?.totalBruto).toBeGreaterThan(0);
    expect(
      calcularRescisaoContrato({ salario: 3000, mesesTrabalhadosNoAno: 6 })?.totalBruto
    ).toBeGreaterThan(0);
  });
  it("formats", () => {
    expect(formatarMoeda(10)).toContain("10");
  });
});
