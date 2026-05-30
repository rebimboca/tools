# @rebimboca/design

![npm version](https://img.shields.io/npm/v/@rebimboca/design?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/design?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote com utilitários para design de interfaces, manipulação de cores, tabelas ASCII e tipografia criativa.

## Instalação

```bash
pnpm add @rebimboca/design
```

## Visão Geral

- 🎨 Selecionador e conversor de cores (HEX, RGB, HSL)
- 🌈 Manipulação dinâmica (Lighten/Darken) e Paletas Predefinidas (Material/Tailwind)
- 🔤 Gerador de letras estilizadas e customizadas
- © Busca e formatação de símbolos e emojis
- 📊 Gerador de tabelas ASCII

## Utilitários (Utils)

### `colorPicker(input)`

Retorna múltiplas representações da cor informada (HEX, RGB, HSL, contraste, etc).

### `lighten(hex, percent)` e `darken(hex, percent)`

Clareia ou escurece uma cor HEX com base em um percentual.

### Paletas de Cores

- `getMaterialPalette()`: Retorna as paletas completas do Material Design.
- `getTailwindPalette()`: Retorna as paletas completas do Tailwind CSS.

## Formatadores (Formatters)

### `asciiTable()`

Gera e retorna a tabela padrão de caracteres ASCII.

### `fancyLetters(text, style?)`

Converte um texto padrão em fontes estilizadas Unicode.

### `customLetters(text, styleMap)`

Permite aplicar um mapa customizado de substituição de caracteres.

### `symbolsToCopy(category?)`

Retorna listas de símbolos e emojis formatados por categoria para fácil cópia.

## Exemplo Rápido

```ts
import { colorPicker, fancyLetters } from "@rebimboca/design";

const infoCor = colorPicker({ hex: "#ff0000" });
console.log(infoCor);

const titulo = fancyLetters("Meu Projeto", "bold");
console.log(titulo);
```
