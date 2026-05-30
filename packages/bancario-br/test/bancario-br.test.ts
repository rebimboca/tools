import { afterEach, describe, expect, it, vi } from "vitest";

import type { Banco } from "../src";
import {
  bancoPorCodigo,
  bancoPorNome,
  bancos,
  bancosBCB,
  bancosBrasilApi,
  bancosPorNome,
  gerarCartaoCredito,
  gerarContaBancaria,
  identificarBandeiraCartao,
  isValidIban,
  normalizarCodigoCompe,
  validarCartaoComBandeira,
  validarCartaoCredito,
  validarContaBancaria} from "../src";

const fetchOriginal = globalThis.fetch;

function makeBanco(codigo: string, nome: string): Banco {
  const c = normalizarCodigoCompe(codigo);
  if (!c) throw new Error(`Código COMPE inválido no teste: ${codigo}`);
  return { codigo: c, nome };
}

afterEach(() => {
  globalThis.fetch = fetchOriginal;
  vi.restoreAllMocks();
});

describe("bancario-br", () => {
  it("gera conta e valida digito", () => {
    const conta = gerarContaBancaria();
    expect(validarContaBancaria(conta.conta, conta.digito)).toBe(true);
  });

  it("gera cartao valido por luhn", () => {
    const cartao = gerarCartaoCredito();
    expect(validarCartaoCredito(cartao.numero)).toBe(true);
    expect(cartao.dataValidade).toBeDefined();
    expect(cartao.bandeira).toBe("visa");
  });

  it("identifica e valida bandeira do cartao", () => {
    const visaCard = gerarCartaoCredito("visa");
    expect(identificarBandeiraCartao(visaCard.numero)).toBe("visa");
    expect(validarCartaoComBandeira(visaCard.numero, "visa")).toBe(true);
    expect(validarCartaoComBandeira(visaCard.numero, "mastercard")).toBe(false);
  });

  it("valida codigos IBAN com mod 97 e regras do Brasil", () => {
    // Valid German IBAN
    expect(isValidIban("DE75 5121 0800 1245 1261 99")).toBe(true);
    // Valid French IBAN
    expect(isValidIban("FR76 3000 6000 0112 3456 7890 189")).toBe(true);
    // Valid Brazilian IBAN
    expect(isValidIban("BR37 0003 8166 0000 0000 0412 345C 1")).toBe(true);
    // Invalid IBAN (too short)
    expect(isValidIban("DE89")).toBe(false);
    // Invalid characters
    expect(isValidIban("DE75 5121 0800 1245 1261 9%")).toBe(false);
    // Invalid Brazilian IBAN (wrong length)
    expect(isValidIban("BR37 0003 8166 0000 0000 0412 345")).toBe(false);
    // Non-string
    expect(isValidIban(123 as unknown as string)).toBe(false);
  });

  describe("API Fluida: bancos", () => {
    it("objeto bancos é um array e possui dados", () => {
      expect(Array.isArray(bancos)).toBe(true);
      expect(bancos.length).toBeGreaterThan(0);
      expect(bancos.some((b) => b.codigo === "001")).toBe(true);
    });

    it("função bancoPorCodigo realiza consultas", () => {
      const itauStr = bancoPorCodigo("341");
      expect(itauStr?.nome).toBe("Itau Unibanco");

      const itauNum = bancoPorCodigo(341);
      expect(itauNum?.nome).toBe("Itau Unibanco");

      const bbNum = bancoPorCodigo(1);
      expect(bbNum?.nome).toBe("Banco do Brasil");

      const bbStr = bancoPorCodigo("1");
      expect(bbStr?.nome).toBe("Banco do Brasil");

      const listaCustomizada: ReadonlyArray<Banco> = [makeBanco("888", "Banco Oito")];
      const bancoCustomizado = bancoPorCodigo("888", listaCustomizada);
      expect(bancoCustomizado?.nome).toBe("Banco Oito");

      const bancoInexistente = bancoPorCodigo("001", listaCustomizada);
      expect(bancoInexistente).toBeNull();

      const codigoInvalido = bancoPorCodigo("abc");
      expect(codigoInvalido).toBeNull();
    });

    it("função bancoPorNome realiza consultas case-insensitive e sem acento", () => {
      const itauExato = bancoPorNome("Itau Unibanco");
      expect(itauExato?.codigo).toBe("341");

      const itauMinusculo = bancoPorNome("itau");
      expect(itauMinusculo?.codigo).toBe("341");

      const itauMaiusculo = bancoPorNome("ITAU");
      expect(itauMaiusculo?.codigo).toBe("341");

      const nubankExato = bancoPorNome("Nubank");
      expect(nubankExato?.codigo).toBe("260");

      const bradescoExato = bancoPorNome("Bradesco");
      expect(bradescoExato?.codigo).toBe("237");

      const itauComAcento = bancoPorNome("Itaú");
      expect(itauComAcento?.codigo).toBe("341");

      const bancoInexistente = bancoPorNome("Banco Fantasma");
      expect(bancoInexistente).toBeNull();

      const listaCustomizada: ReadonlyArray<Banco> = [makeBanco("999", "Banco Novo")];
      const bancoCustomizado = bancoPorNome("novo", listaCustomizada);
      expect(bancoCustomizado?.codigo).toBe("999");
    });

    it("função bancosPorNome retorna todos os bancos encontrados", () => {
      const resultado = bancosPorNome("banco");
      expect(resultado.length).toBeGreaterThan(1);
      expect(resultado.some((b) => b.codigo === "001")).toBe(true);
      expect(resultado.some((b) => b.codigo === "212")).toBe(true);

      const vazio = bancosPorNome("   ");
      expect(vazio).toEqual([]);
    });

    it("função bancosBrasilApi() busca de forma assíncrona", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([
          { code: 1, fullName: "Banco do Brasil" },
          { code: "341", name: "Itau Unibanco" }
        ])
      });

      const lista = await bancosBrasilApi();
      expect(lista.length).toBeGreaterThan(0);
      expect(lista.some((b) => b.codigo === "001")).toBe(true);
    });

    it("função bancosBCB() busca de forma assíncrona", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(
          [
            "ISPB,Nome_Reduzido,Numero_Codigo,Participa_da_Compe,Tipo_Instituicao,Nome_Extenso",
            '00000000,BB,001,Sim,Banco,"Banco do Brasil"',
            '00000000,ITAU,341,Sim,Banco,"Itau Unibanco"'
          ].join("\n")
        )
      });

      const lista = await bancosBCB();
      expect(lista.length).toBeGreaterThan(0);
      expect(lista.some((b) => b.codigo === "001")).toBe(true);
    });
  });
});
