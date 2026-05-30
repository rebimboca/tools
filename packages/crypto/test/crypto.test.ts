import { describe, expect, it } from "vitest";

import {
  calculateCRC32,
  encodeMD5,
  encodeSHA1,
  encodeSHA256,
  encodeSHA512,
  generatePassword,
  isMD5,
  isSHA1,
  isSHA256,
  isSHA512,
  validatePasswordStrength,
  validateHash,
} from "../src";

describe("crypto converters", () => {
  it("hashes md5, sha1, sha256, sha512 deterministically", () => {
    expect(encodeMD5("abc")).toBe("900150983cd24fb0d6963f7d28e17f72");
    expect(encodeSHA1("abc")).toBe("a9993e364706816aba3e25717850c26c9cd0d89d");
    expect(encodeSHA256("abc")).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    expect(encodeSHA512("abc")).toBe(
      "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f"
    );
    expect(calculateCRC32("abc")).toBe("352441c2");
    expect(calculateCRC32("hello")).toBe("3610a686");
  });

  it("returns null for empty strings on hash functions", () => {
    expect(encodeMD5("")).toBeNull();
    expect(encodeSHA1("")).toBeNull();
    expect(encodeSHA256("")).toBeNull();
    expect(encodeSHA512("")).toBeNull();
    expect(calculateCRC32("")).toBeNull();
  });
});

describe("crypto generators (senha)", () => {
  it("validates parameters and returns null if out of range", () => {
    expect(generatePassword({ length: 3 })).toBeNull();
    expect(generatePassword({ length: 129 })).toBeNull();
    expect(generatePassword({ amount: 0 })).toBeNull();
    expect(generatePassword({ amount: 51 })).toBeNull();
    expect(
      generatePassword({
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: false,
        includeSpecialChars: false,
      })
    ).toBeNull();
  });

  it("generates a secure password string by default", () => {
    const pwd = generatePassword();
    expect(typeof pwd).toBe("string");
    expect(pwd!.length).toBe(12);

    // Guaranteed characters class checks
    expect(/[A-Z]/.test(pwd!)).toBe(true);
    expect(/[a-z]/.test(pwd!)).toBe(true);
    expect(/[0-9]/.test(pwd!)).toBe(true);
    expect(/[^A-Za-z0-9]/.test(pwd!)).toBe(true);
  });

  it("generates password array when amount > 1 is specified", () => {
    const pwds = generatePassword({ amount: 5, length: 16 });
    expect(Array.isArray(pwds)).toBe(true);
    expect(pwds!.length).toBe(5);
    pwds!.forEach((pwd) => {
      expect(pwd.length).toBe(16);
    });
  });

  it("respects exclusion options", () => {
    const pwd = generatePassword({
      includeUppercase: false,
      includeSpecialChars: false,
      length: 20,
    });
    expect(/[A-Z]/.test(pwd!)).toBe(false);
    expect(/[^A-Za-z0-9]/.test(pwd!)).toBe(false);
    expect(/[a-z]/.test(pwd!)).toBe(true);
    expect(/[0-9]/.test(pwd!)).toBe(true);
  });
});

describe("crypto validators", () => {
  it("validates md5, sha1, sha256, sha512 hash formats", () => {
    expect(isMD5("900150983cd24fb0d6963f7d28e17f72")).toBe(true);
    expect(isMD5("not-a-hash")).toBe(false);
    expect(isMD5(null as any)).toBe(false);

    expect(isSHA1("a9993e364706816aba3e25717850c26c9cd0d89d")).toBe(true);
    expect(isSHA1("a9993e364706816aba3e25717850c26c9cd0d89g")).toBe(false); // invalid hex char 'g'

    expect(isSHA256("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad")).toBe(true);
    expect(isSHA256("ba7816bf")).toBe(false); // too short

    expect(
      isSHA512(
        "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f"
      )
    ).toBe(true);
    expect(isSHA512("")).toBe(false);
  });

  it("validates hash algorithm with unified validateHash function", () => {
    expect(validateHash("900150983cd24fb0d6963f7d28e17f72", "md5")).toBe(true);
    expect(validateHash("a9993e364706816aba3e25717850c26c9cd0d89d", "sha1")).toBe(true);
    expect(validateHash("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad", "sha256")).toBe(true);
    expect(
      validateHash(
        "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f",
        "sha512"
      )
    ).toBe(true);
    expect(validateHash("invalid", "md5")).toBe(false);
    expect(validateHash("invalid", "invalid" as any)).toBe(false);
  });

  it("validates password strength and returns detailed feedback", () => {
    // Bad inputs
    const badInput = validatePasswordStrength(null as any);
    expect(badInput.score).toBe(0);
    expect(badInput.feedback).toContain("Senha inválida.");

    // Too short
    const short = validatePasswordStrength("Ab1!", 8);
    expect(short.isLengthValid).toBe(false);
    expect(short.score).toBe(1); // Met criteria >= 3 but length is invalid
    expect(short.feedback).toContain("A senha deve ter pelo menos 8 caracteres.");

    // Very short with no criteria
    const veryShortNoCriteria = validatePasswordStrength("a", 8);
    expect(veryShortNoCriteria.score).toBe(0);

    // Weak (length valid but missing many criteria)
    const weak = validatePasswordStrength("abcdefgh");
    expect(weak.isLengthValid).toBe(true);
    expect(weak.score).toBe(1);
    expect(weak.hasLowercase).toBe(true);
    expect(weak.hasUppercase).toBe(false);
    expect(weak.feedback).toContain("Adicione pelo menos uma letra maiúscula (A-Z).");

    // Moderate (length valid, 2 criteria met)
    const moderate = validatePasswordStrength("Abcdefgh");
    expect(moderate.score).toBe(2);

    // Strong (length valid, 3 or 4 criteria met but < 12 characters)
    const strongShort = validatePasswordStrength("Abcdefg1!"); // 9 chars
    expect(strongShort.score).toBe(3);

    // Very Strong (all criteria met + length >= 12)
    const veryStrong = validatePasswordStrength("Abcdefg1!abc");
    expect(veryStrong.score).toBe(4);
    expect(veryStrong.feedback.length).toBe(0);
  });
});
