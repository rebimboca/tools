import { describe, expect, it } from "vitest";

import {
  gerarCNPJ,
  gerarCPF,
  gerarPISPASEP,
  validarCNPJ,
  validarCPF,
  validarPISPASEP
} from "../src";

describe("documentos-br", () => {
  it("cpf/cnpj", () => {
    const cpf = gerarCPF();
    const cnpj = gerarCNPJ();
    expect(validarCPF(cpf)).toBe(true);
    expect(validarCNPJ(cnpj)).toBe(true);
  });
  it("pis", () => {
    const pis = gerarPISPASEP();
    expect(validarPISPASEP(pis)).toBe(true);
  });
});
