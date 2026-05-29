import { describe, expect, it } from "vitest";

import {
  base64Decode,
  base64Encode,
  binaryDecode,
  binaryEncode,
  urlDecode,
  urlEncode
} from "../src";

describe("encoding", () => {
  it("encodes/decodes base64", () => {
    const b = base64Encode("abc");
    expect(b).toBe("YWJj");
    expect(base64Decode(b!)).toBe("abc");
  });
  it("returns null for invalid input", () => {
    expect(base64Encode("")).toBeNull();
    expect(urlDecode("%")).toBeNull();
    expect(binaryDecode("01012")).toBeNull();
  });
  it("url and binary", () => {
    expect(urlDecode(urlEncode("a b")!)).toBe("a b");
    expect(binaryDecode(binaryEncode("A")!)).toBe("A");
  });
});
