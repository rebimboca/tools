const LATIN_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "ut",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "ut",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "dolor",
  "in",
  "reprehenderit",
  "in",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "dolore",
  "eu",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "in",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum"
];

function getRandomWord(): string {
  return LATIN_WORDS[Math.floor(Math.random() * LATIN_WORDS.length)]!;
}

function generateSentence(minWords = 6, maxWords = 14): string {
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const sentenceWords: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    sentenceWords.push(getRandomWord());
  }
  const sentence = sentenceWords.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function generateParagraph(minSentences = 3, maxSentences = 6): string {
  const sentenceCount =
    Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(" ");
}

/**
 * Generates highly realistic and randomized dummy text in classic Latin (Lorem Ipsum).
 * Supports generating individual words, complete sentences, or multiline paragraphs.
 *
 * @param mode - The layout type: "paragraphs", "sentences", or "words". Default: "paragraphs".
 * @param amount - The quantity of elements to generate (1-100). Default: 1.
 * @returns The generated Lorem Ipsum string, or `null` if the parameters are invalid.
 *
 * @see https://www.lipsum.com/ - Standard reference site for Lorem Ipsum generators
 *
 * @example
 * ```ts
 * generateLoremIpsum("words", 5);       // "lorem ipsum dolor sit amet"
 * generateLoremIpsum("sentences", 2);   // "Consectetur adipiscing elit sed do. Labore et dolore magna aliqua."
 * ```
 */
export function generateLoremIpsum(
  mode: "paragraphs" | "sentences" | "words" = "paragraphs",
  amount = 1
): string | null {
  if (amount < 1 || amount > 100) return null;

  if (mode === "words") {
    // Return space-separated lowercased words
    const words: string[] = [];
    for (let i = 0; i < amount; i++) {
      words.push(getRandomWord());
    }
    return words.join(" ");
  }

  if (mode === "sentences") {
    const sentences: string[] = [];
    for (let i = 0; i < amount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(" ");
  }

  if (mode === "paragraphs") {
    const paragraphs: string[] = [];
    for (let i = 0; i < amount; i++) {
      paragraphs.push(generateParagraph());
    }
    return paragraphs.join("\n\n");
  }

  return null;
}
