import { describe, expect, it } from "vitest";
import { generateRandomNumbers, pickNumbers } from "../src";

describe("random", () => {
  it("generates within range", () => {
    const xs = generateRandomNumbers({ amount: 5, min: 1, max: 10 });
    expect(xs?.length).toBe(5);
    expect(xs?.every((n) => n >= 1 && n <= 10)).toBe(true);
  });

  it("handles sorting", () => {
    const asc = generateRandomNumbers({ amount: 10, min: 1, max: 100, listOrder: "asc" });
    const isSorted = asc?.every((val, i, arr) => !i || arr[i - 1]! <= val);
    expect(isSorted).toBe(true);
  });

  it("prevents infinite loops when unique amount exceeds range size", () => {
    const res = generateRandomNumbers({ amount: 10, min: 1, max: 5, unique: true });
    expect(res).toBeNull();
  });

  it("returns null for invalid", () => {
    expect(generateRandomNumbers({ amount: 0, min: 1, max: 2 })).toBeNull();
    expect(pickNumbers(10, 1, 1)).toBeNull();
  });
});
