import { describe, expect, it } from "vitest";

import {
  asciiTable,
  calculateContrastRatio,
  colorPicker,
  customLetters,
  fancyLetters,
  generateGradient,
  generateHarmony,
  searchSymbols,
  smartTruncate,
  symbolsToCopy
} from "../src";

describe("design formatters and utils", () => {
  it("returns symbols and ascii table with correct descriptions", () => {
    expect(symbolsToCopy("geral")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("setas")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("formas")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("tecnologia")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("clima")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("musica")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("jogos")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("linhas")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("emojis_carinhas")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("emojis_gestos")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("emojis_animais")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("emojis_comidas")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("emojis_viagem")?.length).toBeGreaterThan(0);
    expect(symbolsToCopy("invalid-category")).toBeNull();

    expect(searchSymbols("comidas")?.length).toBeGreaterThan(0);
    expect(searchSymbols("clima")?.length).toBeGreaterThan(0);
    expect(searchSymbols("invalid")).toBeNull();
    expect(searchSymbols("")).toBeNull();
    expect(searchSymbols(null as unknown as string)).toBeNull();

    const table = asciiTable();
    expect(table.length).toBe(128);
    expect(table[0]?.description).toBe("Null (NUL)");
    expect(table[10]?.description).toBe("Line Feed (LF)");
    expect(table[65]?.description).toBe("Printable Character");
    expect(table[127]?.description).toBe("Delete (DEL)");
  });

  it("color conversions including HSL spaces", () => {
    // hex -> rgb & hsl
    const red = colorPicker({ hex: "#FF0000" });
    expect(red?.rgb.r).toBe(255);
    expect(red?.rgb.g).toBe(0);
    expect(red?.rgb.b).toBe(0);
    expect(red?.hsl.h).toBe(0);
    expect(red?.hsl.s).toBe(100);
    expect(red?.hsl.l).toBe(50);

    // hsl -> rgb & hex
    const green = colorPicker({ hsl: { h: 120, s: 100, l: 50 } });
    expect(green?.hex).toBe("#00FF00");
    expect(green?.rgb.r).toBe(0);
    expect(green?.rgb.g).toBe(255);
    expect(green?.rgb.b).toBe(0);

    // rgb -> hex & hsl
    const blue = colorPicker({ rgb: { r: 0, g: 0, b: 255 } });
    expect(blue?.hex).toBe("#0000FF");
    expect(blue?.hsl.h).toBe(240);

    // invalid hex input
    expect(colorPicker({ hex: "#FF000" })).toBeNull();
    expect(colorPicker({})).toBeNull();
  });

  it("fancyLetters transforms text in multiple styles", () => {
    expect(fancyLetters("")).toBeNull();

    const text = "abc";
    expect(fancyLetters(text, "smallcaps")).toBe("ᴀʙᴄ");
    expect(fancyLetters(text, "gothic")).toBe("𝔞𝔟𝔠");
    expect(fancyLetters(text, "bubble")).toBe("ⓐⓑⓒ");
    expect(fancyLetters(text, "monospace")).toBe("𝚊𝚋𝚌");
    expect(fancyLetters(text, "italic")).toBe("𝒶𝒷𝒸");

    // Case handling and unsupported chars
    expect(fancyLetters("Abc!", "bubble")).toBe("Ⓐⓑⓒ!");

    // customLetters tests
    expect(customLetters("", {})).toBeNull();
    expect(customLetters("a", { a: "4" })).toBe("4");
    expect(customLetters("A", { a: "4" })).toBe("4");
    expect(customLetters("ab", { a: "4" })).toBe("4b");
  });

  it("calculateContrastRatio computes contrast correctly", () => {
    // WCAG contrast check
    const ratio = calculateContrastRatio("#FFFFFF", "#000000");
    expect(ratio).toBe(21); // Max contrast

    const selfContrast = calculateContrastRatio("#FFFFFF", "#FFFFFF");
    expect(selfContrast).toBe(1); // Min contrast

    // Invalid values return null
    expect(calculateContrastRatio("#FF000", "#FFFFFF")).toBeNull();
    expect(calculateContrastRatio("#FFFFFF", "#invalid")).toBeNull();
  });

  it("generateHarmony generates correct color palettes", () => {
    expect(generateHarmony("#invalid", "complementary")).toBeNull();

    // Complementary
    const comp = generateHarmony("#FF0000", "complementary");
    expect(comp?.length).toBe(2);
    expect(comp?.[0]).toBe("#FF0000");
    expect(comp?.[1]).toBe("#00FFFF"); // Complementary of Red is Cyan

    // Analogous
    const anal = generateHarmony("#FF0000", "analogous");
    expect(anal?.length).toBe(3);

    // Triadic
    const triad = generateHarmony("#FF0000", "triadic");
    expect(triad?.length).toBe(3);

    // Monochromatic
    const mono = generateHarmony("#FF0000", "monochromatic");
    expect(mono?.length).toBeGreaterThanOrEqual(1);
  });

  it("generateGradient returns CSS gradient string", () => {
    expect(generateGradient("#invalid", "#000000")).toBeNull();

    const css = generateGradient("#FF0000", "#0000FF");
    expect(css).toBe("linear-gradient(135deg, #FF0000 0%, #0000FF 100%)");

    const customCss = generateGradient("#FF0000", "#0000FF", 90);
    expect(customCss).toBe("linear-gradient(90deg, #FF0000 0%, #0000FF 100%)");
  });

  it("smartTruncate truncates text gracefully", () => {
    expect(smartTruncate(null as unknown as string, 10)).toBeNull();
    expect(smartTruncate("hello", -1)).toBeNull();

    // Text fits
    expect(smartTruncate("Hello", 10)).toBe("Hello");

    // Text needs truncation, avoiding word cut
    expect(smartTruncate("Hello world testing", 15)).toBe("Hello world...");

    // Large single word truncation
    expect(smartTruncate("Supercalifragilistic", 10)).toBe("Superca...");

    // Custom suffix
    expect(smartTruncate("Hello world testing", 15, "---")).toBe("Hello world---");

    // Extreme constraints
    expect(smartTruncate("Hello", 2, "...")).toBe("..");
  });
});
