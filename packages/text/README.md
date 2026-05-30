# @rebimboca/text

![npm version](https://img.shields.io/npm/v/@rebimboca/text?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/text?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote focado no processamento profundo de texto, transformações de strings e formatação idiomática.

## Instalação

```bash
pnpm add @rebimboca/text
```

## Visão Geral

- 🔄 Conversores estruturais (Uppercase, TitleCase, Número por Extenso)
- ✂️ Formatadores (Truncate, Reverse, Slugify, Normalização de acentos)
- 🧮 Contadores e análises léxicas (Caracteres, Palavras, Ocorrências, Tempo de Leitura)
- 🎭 Gerador avançado de textos para mock (Lorem Ipsum)
- ✍️ Corretor ortográfico automatizado

## Conversores

- `textToHtml(text)`
- `toUpperCase(text)`
- `toLowerCase(text)`
- `toTitleCase(text, options?)`
- `numberToWords(value, options?)` — Escreve números por extenso
- `removeAccents(text)`

## Formatadores

- `toSlug(text)` — Gera identificadores compatíveis para URLs seguras
- `sortAlphabetically(text, options?)`
- `truncateText(text, limit)`
- `splitString(text, separator)`
- `replaceOrRemoveNewlines(text, mode, replaceWith?)`
- `reverseText(text)`
- `fancyLetters(text, style?)`
- `customLetters(text, styleMap)`

## Calculadoras & Consultas

- `countCharacters(text)` — Retorna quantidade de caracteres, palavras e linhas.
- `countWordOccurrences(text, target)`
- `readingTime(text, wordsPerMinute?)` — Estima o tempo de leitura em minutos.
- `characterInfo(value)` — Extrai o CodePoint e HEX de cada caractere.

## Geradores

### `generateLoremIpsum(options?)`

Gera trechos customizados de texto baseados no padrão Lorem Ipsum para testes e placeholders.

## Exemplo Rápido

```ts
import { numberToWords, toSlug } from "@rebimboca/text";

const valorExato = numberToWords(150, { locale: "pt-BR", currency: true });
console.log(valorExato); // "cento e cinquenta reais"

const link = toSlug("Atenção: Oferta Imperdível!");
console.log(link); // "atencao-oferta-imperdivel"
```
