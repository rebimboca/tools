import { describe, expect, it } from "vitest";
import {
  countCharacters,
  removeAccents,
  replaceOrRemoveNewlines,
  sortAlphabetically,
  numberToWords,
  correctSpelling,
  generateLoremIpsum,
  textToHtml,
  toSlug
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

  it("converts numbers to words including millions and billions", () => {
    expect(numberToWords(0)).toBe("zero");
    expect(numberToWords(1)).toBe("um");
    expect(numberToWords(15)).toBe("quinze");
    expect(numberToWords(105)).toBe("cento e cinco");
    expect(numberToWords(1000)).toBe("mil");
    expect(numberToWords(1500)).toBe("mil e quinhentos");
    expect(numberToWords(2000)).toBe("dois mil");
    expect(numberToWords(1000000)).toBe("um milhão");
    expect(numberToWords(2500300)).toBe("dois milhões e quinhentos mil e trezentos");
    expect(numberToWords(1000000000)).toBe("um bilhão");
    expect(numberToWords(1234567890)).toBe("um bilhão e duzentos e trinta e quatro milhões e quinhentos e sessenta e sete mil e oitocentos e noventa");
  });

  it("corrects spelling with expanded dictionary", () => {
    expect(correctSpelling("vc nao sabe tbm")).toBe("você não sabe também");
    expect(correctSpelling("Concerteza derrepente e excessao")).toBe("Com certeza de repente é exceção");
    expect(correctSpelling("")).toBeNull();
  });

  it("generates random lorem ipsum safely", () => {
    const words = generateLoremIpsum("words", 10);
    expect(words?.split(" ").length).toBe(10);

    const paragraph = generateLoremIpsum("paragraphs", 1);
    expect(paragraph?.length).toBeGreaterThan(50);
  });

  it("converts text to html entities", () => {
    expect(textToHtml("<div>")).toBe("&lt;div&gt;");
  });

  it("converts text to url-friendly slug", () => {
    expect(toSlug("Olá Mundo! Tudo Bem?")).toBe("ola-mundo-tudo-bem");
    expect(toSlug("   Café com Leite... ")).toBe("cafe-com-leite");
    expect(toSlug("")).toBeNull();
  });
});
