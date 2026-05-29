import { describe, expect, it } from "vitest";

import {
  countCharacters,
  removeAccents,
  replaceOrRemoveNewlines,
  sortAlphabetically
} from "../src";

describe("text", () => {
  it("transforms text", () => {
    expect(removeAccents("ação")).toBe("acao");
    expect(replaceOrRemoveNewlines("a\nb", "replace", " ")).toBe("a b");
  });
  it("counts and sorts", () => {
    expect(countCharacters("a b")?.words).toBe(2);
    expect(sortAlphabetically("c\na\nb")).toBe("a\nb\nc");
  });
});
