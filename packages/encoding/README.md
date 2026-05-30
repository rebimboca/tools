# @rebimboca/encoding

![npm version](https://img.shields.io/npm/v/@rebimboca/encoding?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/encoding?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote para codificação e decodificação de dados em diversos formatos.

## Instalação

```bash
pnpm add @rebimboca/encoding
```

## Visão Geral

- 📝 Codificação e decodificação Base64
- 🌐 Codificação e decodificação de URLs (URLEncode)
- 🔢 Codificação e decodificação Binária
- 🔠 Codificação e decodificação Hexadecimal
- 🔄 Cifra de substituição ROT13

## Conversores

### `base64Encode(text)`

Converte uma string para o formato Base64.

### `base64Decode(base64)`

Decodifica uma string do formato Base64 de volta para texto legível.

### `urlEncode(value)`

Codifica caracteres especiais de uma string para uso seguro em URLs.

### `urlDecode(value)`

Decodifica uma string codificada em formato URL (URI).

### `binaryEncode(text)`

Converte uma string de texto em sua representação binária correspondente.

### `binaryDecode(binary)`

Decodifica uma sequência binária de volta para uma string de texto.

### `hexEncode(text)`

Converte uma string para sua representação hexadecimal.

### `hexDecode(hex)`

Decodifica uma string hexadecimal de volta para texto.

### `rot13(text)`

Aplica a cifra ROT13 em uma string de texto.

## Exemplo Rápido

```ts
import { base64Encode, base64Decode } from "@rebimboca/encoding";

const codificado = base64Encode("Minha Mensagem");
const decodificado = base64Decode(codificado);

console.log(codificado, decodificado);
```
