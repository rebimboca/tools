import { describe, expect, it } from "vitest";

import { generateImage } from "../src";

describe("image", () => {
  it("generates data url", () => {
    expect(generateImage({ width: 100, height: 50 })).toContain("data:image/svg+xml");
  });
  it("returns null for invalid", () => {
    expect(generateImage({ width: 0, height: 10 })).toBeNull();
  });
});
