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
  it("encodes/decodes base64 with multibyte strings", () => {
    const text = "Olá mundo! 🌟";
    const b = base64Encode(text);
    expect(b).toBe("T2zDoSBtdW5kbyEg8J+Mnw==");
    expect(base64Decode(b!)).toBe(text);
  });

  it("returns null for invalid input", () => {
    expect(base64Encode("")).toBeNull();
    expect(urlDecode("%")).toBeNull();
    expect(binaryDecode("01012")).toBeNull();
  });

  it("url and binary multibyte support", () => {
    expect(urlDecode(urlEncode("a b")!)).toBe("a b");

    const text = "Café ☕";
    const binary = binaryEncode(text);
    expect(binaryDecode(binary!)).toBe(text);
  });
});
