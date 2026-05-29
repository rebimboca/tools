import { describe, expect, it } from "vitest";

import { gerarCurriculo, gerarNomes, gerarPessoa, gerarPessoas } from "../src";

describe("pessoas-br", () => {
  it("generates people", () => {
    expect(gerarNomes(2)?.length).toBe(2);
    expect(gerarPessoa()?.nome).toBeTruthy();
    expect(gerarPessoas(2)?.length).toBe(2);
  });
  it("curriculo", () => {
    expect(gerarCurriculo({ nome: "A", email: "a@a.com" })).toContain("Nome:");
  });
});
