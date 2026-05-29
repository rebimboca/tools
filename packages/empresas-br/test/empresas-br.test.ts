import { describe, expect, it } from "vitest";

import { gerarEmpresa, validarCNPJ } from "../src";

describe("empresas-br", () => {
  it("generates company", () => {
    const e = gerarEmpresa();
    expect(e.razaoSocial).toBeTruthy();
    expect(validarCNPJ(e.cnpj)).toBe(true);
  });
});
