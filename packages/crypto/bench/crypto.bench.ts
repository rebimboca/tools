import { bench, describe } from "vitest";
import { encodeMD5, encodeSHA1, calculateCRC32 } from "../src";

const sample = "bench-sample-text-1234567890";

describe("crypto bench", () => {
  bench("MD5", () => {
    encodeMD5(sample);
  });

  bench("SHA1", () => {
    encodeSHA1(sample);
  });

  bench("CRC32", () => {
    calculateCRC32(sample);
  });
});
