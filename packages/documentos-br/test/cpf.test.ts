import { describe, expect, it } from "vitest";

import { gerarCPF, validarCPF } from "../src";

describe("CPF", () => {
  it("valida CPF conhecido valido", () => {
    expect(validarCPF("529.982.247-25")).toBe(true);
  });

  it("invalida CPF com digitos repetidos", () => {
    expect(validarCPF("111.111.111-11")).toBe(false);
  });

  it("gera CPF valido", () => {
    const cpf = gerarCPF();
    expect(cpf).toHaveLength(11);
    expect(validarCPF(cpf)).toBe(true);
  });

  it("gera CPF mascarado valido", () => {
    const cpf = gerarCPF(true);
    expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    expect(validarCPF(cpf)).toBe(true);
  });
});
