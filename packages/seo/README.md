# @rebimboca/seo

SEO utilities.

## Tools

### Generators

#### `generateMetaTags(input: { title: string; author?: string; keywords?: string[]; description?: string }): string`

Retorna bloco HTML com `<title>` e `<meta>` tags.

## Installation

```bash
pnpm add @rebimboca/seo
```

## Usage

```ts
import { generateMetaTags } from "@rebimboca/seo";

const tags = generateMetaTags({
  title: "Rebimboca",
  description: "Tools"
});

console.log(tags);
```
