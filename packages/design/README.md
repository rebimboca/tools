# @rebimboca/design

Design, table, and style utilities.

## Tools

### Utils

#### `colorPicker(input: { hex?: string; rgb?: { r: number; g: number; b: number } }): ColorInfo`

Retorna múltiplas representações da cor (HEX/RGB/HSL etc.).

### Formatters

#### `asciiTable(): Array<{ code: number; char: string; description?: string }>`

#### `fancyLetters(text: string, style?: string): string`

#### `customLetters(text: string, styleMap: Record<string, string>): string`

#### `symbolsToCopy(category?: string): string[]`

## Installation

```bash
pnpm add @rebimboca/design
```
