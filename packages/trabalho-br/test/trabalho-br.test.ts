import { describe, expect, it } from "vitest";

import {
  calcularFerias,
  calcularINSS,
  calcularIRRF,
  calcularRescisaoContrato,
  formatarMoeda} from "../src";

describe("trabalho-br", () => {
  it("calculates vacation with standard parameters", () => {
    const res = calcularFerias({ salarioBase: 3000, diasFerias: 30 });
    expect(res).not.toBeNull();
    expect(res?.valorFerias).toBe(3000.0);
    expect(res?.adicionalUmTerco).toBe(1000.0);
    expect(res?.totalBruto).toBe(4000.0);
    expect(res?.descontoINSS).toBeGreaterThan(0);
    expect(res?.totalLiquido).toBeLessThan(4000.0);
  });

  it("calculates vacation with abono pecuniario (CLT venda de ferias)", () => {
    const res = calcularFerias({ salarioBase: 3000, diasFerias: 20, abonoPecuniario: true });
    expect(res).not.toBeNull();
    expect(res?.valorFerias).toBe(2000.0);
    expect(res?.adicionalUmTerco).toBe(666.67);
    expect(res?.valorAbono).toBe(1000.0);
    expect(res?.adicionalUmTercoAbono).toBe(333.33);
    expect(res?.totalBruto).toBe(4000.0);
  });

  it("calculates progressive INSS tax correctly", () => {
    // 3000 bracket:
    // (1412.00 * 0.075) = 105.90
    // (2666.68 - 1412.00) * 0.09 = 112.92
    // (3000.00 - 2666.68) * 0.12 = 40.00
    // Total = 105.90 + 112.92 + 40.00 = 258.82
    expect(calcularINSS(3000.0)).toBeCloseTo(258.82, 1);
    expect(calcularINSS(0)).toBe(0);
  });

  it("calculates progressive IRRF tax correctly", () => {
    const inss = calcularINSS(3000.0);
    expect(calcularIRRF(3000.0, inss)).toBeCloseTo(36.15, 1);
  });

  it("calculates rescisao contrato", () => {
    const res = calcularRescisaoContrato({ salario: 3000, mesesTrabalhadosNoAno: 6 });
    expect(res?.totalBruto).toBeGreaterThan(0);
  });

  it("formats currency to BRL", () => {
    expect(formatarMoeda(10)).toContain("10");
  });
});
