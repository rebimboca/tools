import { describe, expect, it } from "vitest";

import { calculateCRC32, encodeMD5, encodeSHA1, generatePassword } from "../src";

describe("crypto", () => {
  it("hashes deterministically", () => {
    expect(encodeMD5("abc")).toBe("900150983cd24fb0d6963f7d28e17f72");
    expect(encodeSHA1("abc")).toBe("a9993e364706816aba3e25717850c26c9cd0d89d");
    expect(calculateCRC32("abc")).toBeTruthy();
  });
  it("password contract", () => {
    expect(generatePassword({ length: 2 })).toBeNull();
    expect(typeof generatePassword({ length: 12 })).toBe("string");
  });
});
