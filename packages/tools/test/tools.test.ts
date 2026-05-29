import { describe, expect, it } from "vitest";

import { generatePassword, gerarCPF } from "../src";

describe("tools", () => {
  it("reexports", () => {
    expect(gerarCPF()).toBeTruthy();
    expect(generatePassword({ length: 10 })).toBeTruthy();
  });
});
