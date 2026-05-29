import { describe, expect, it } from "vitest";

import { asciiTable, colorPicker, symbolsToCopy } from "../src";

describe("design", () => {
  it("returns symbols and ascii", () => {
    expect(symbolsToCopy("geral")?.length).toBeGreaterThan(0);
    expect(asciiTable().length).toBe(128);
  });
  it("color conversions", () => {
    expect(colorPicker({ hex: "#FF0000" })?.rgb.r).toBe(255);
    expect(colorPicker({})).toBeNull();
  });
});
