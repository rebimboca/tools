import { describe, expect, it } from "vitest";

import { isNonEmptyString, isPositiveInt, UFS } from "../src";

describe("shared", () => {
  it("guards", () => {
    expect(isNonEmptyString("abc")).toBe(true);
    expect(isNonEmptyString("")).toBe(false);
    expect(isPositiveInt(2)).toBe(true);
    expect(isPositiveInt(0)).toBe(false);
  });

  it("ufs", () => {
    expect(UFS.includes("SP")).toBe(true);
    expect(UFS.length).toBe(27);
  });
});
