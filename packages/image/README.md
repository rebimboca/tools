# @rebimboca/image

![npm version](https://img.shields.io/npm/v/@rebimboca/image?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/image?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote com utilitários flexíveis para geração de imagens de placeholder.

## Instalação

```bash
pnpm add @rebimboca/image
```

## Visão Geral

- 🖼️ Geração dinâmica de imagens customizáveis

## Geradores

### `generateImage(options)`

Gera uma imagem de mock para uso temporário. Retorna a URL final que pode ser incorporada a tags de imagem HTML. 

Suporta configurações customizadas de dimensão, texto e cor.

```ts
{
  width: number;
  height: number;
  text?: string;
  background?: string;
  color?: string;
}
```

## Exemplo Rápido

```ts
import { generateImage } from "@rebimboca/image";

const urlImagem = generateImage({
  width: 800,
  height: 600,
  text: "Meu Placeholder",
  background: "000000",
  color: "ffffff"
});

console.log(urlImagem);
```
