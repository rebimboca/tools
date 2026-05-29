import { describe, expect, it } from "vitest";

import {
  consultarBancoPorNumero,
  gerarCartaoCredito,
  gerarContaBancaria,
  listarBancos,
  validarCartaoCredito,
  validarContaBancaria
} from "../src";

describe("bancario-br", () => {
  it("gera conta e valida digito", () => {
    const conta = gerarContaBancaria();
    expect(validarContaBancaria(conta.conta, conta.digito)).toBe(true);
  });

  it("gera cartao valido por luhn", () => {
    const cartao = gerarCartaoCredito();
    expect(validarCartaoCredito(cartao.numero)).toBe(true);
  });

  it("consulta banco por numero", () => {
    const banco = consultarBancoPorNumero("1");
    expect(banco?.codigo).toBe("001");
  });

  it("lista bancos", () => {
    expect(listarBancos().length).toBeGreaterThan(0);
  });
});
