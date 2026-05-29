const WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(
    " "
  );

export function generateLoremIpsum(
  mode: "paragraphs" | "sentences" | "words" = "paragraphs",
  amount = 1
): string | null {
  if (amount < 1 || amount > 100) return null;
  if (mode === "words")
    return Array.from({ length: amount }, (_, i) => WORDS[i % WORDS.length]).join(" ");
  if (mode === "sentences") {
    return Array.from(
      { length: amount },
      (_, i) =>
        `${WORDS[(i * 3) % WORDS.length]} ${WORDS[(i * 3 + 1) % WORDS.length]} ${WORDS[(i * 3 + 2) % WORDS.length]}.`
    ).join(" ");
  }
  return Array.from(
    { length: amount },
    (_, i) => `${generateLoremIpsum("sentences", 4 + (i % 3))}`
  ).join("\n\n");
}
