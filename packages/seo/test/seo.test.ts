import { describe, expect, it } from "vitest";

import { generateMetaTags } from "../src";

describe("seo", () => {
  it("generates meta tags", () => {
    const out = generateMetaTags({ title: "A", author: "B" });
    expect(out).toContain("<title>A</title>");
  });
  it("returns null for invalid", () => {
    expect(generateMetaTags({ title: "" })).toBeNull();
  });
});
