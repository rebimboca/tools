# @rebimboca/text

Text and string utilities.

## Tools

### Validators

#### `correctSpelling(text: string): string`

### Converters

#### `textToHtml(text: string): string`

#### `toUpperCase(text: string): string`

#### `toLowerCase(text: string): string`

#### `toTitleCase(text: string, options?: { ignoreShorterThan?: number; ignoreWords?: string[] }): string`

#### `numberToWords(value: number, options?: { locale?: "pt-BR" | "en"; currency?: boolean }): string`

#### `removeAccents(text: string): string`

### Formatters

#### `sortAlphabetically(text: string, options?: { order?: "asc" | "desc"; splitBy?: "newline" | "space" | "comma" | "semicolon"; dedupe?: boolean }): string`

#### `truncateText(text: string, limit: number): string`

#### `splitString(text: string, separator: string): string[]`

#### `replaceOrRemoveNewlines(text: string, mode: "remove" | "replace", replaceWith?: string): string`

#### `reverseText(text: string): string`

#### `fancyLetters(text: string, style?: string): string`

#### `customLetters(text: string, styleMap: Record<string, string>): string`

#### `symbolsToCopy(category?: string): string[]` (reexport from `@rebimboca/design`)

### Calculators

#### `countCharacters(text: string): { characters: number; words: number; lines: number }`

#### `countWordOccurrences(text: string, target: string): number`

### Queries

#### `characterInfo(value: string): Array<{ char: string; codePoint: number; hex: string }>`

### Generators

#### `generateLoremIpsum(options?: { mode?: "paragraphs" | "sentences" | "words"; amount?: number }): string`

### Utils

#### `normalizeWhitespace(text: string): string`

#### `safeTrim(text: string): string`

## Installation

```bash
pnpm add @rebimboca/text
```

## Usage

```ts
import { textToHtml } from "@rebimboca/text";

const html = textToHtml("<b>rebimboca</b>");
console.log(html);
```
