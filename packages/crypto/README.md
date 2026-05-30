# @rebimboca/crypto

![npm version](https://img.shields.io/npm/v/@rebimboca/crypto?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/crypto?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote com utilitários de criptografia, geração de hashes, checksums e senhas seguras.

## Instalação

```bash
pnpm add @rebimboca/crypto
```

## Visão Geral

- 🔐 Conversores de Hash (MD5, SHA1, SHA256, SHA512, HMAC)
- 🧮 Checksums (CRC32)
- 🔑 Geração de senhas seguras e customizáveis
- 🆔 Geração nativa de UUID v4

## Conversores

### `encodeMD5(text)`

Gera o hash MD5 de uma string.

### `encodeSHA1(text)`

Gera o hash SHA-1 de uma string.

### `encodeSHA256(text)`

Gera o hash SHA-256 de uma string.

### `encodeSHA512(text)`

Gera o hash SHA-512 de uma string.

### `encodeHMAC(text, secret, algorithm?)`

Gera um código de autenticação de mensagem hash-based (HMAC) de uma string.

## Validadores

### `calculateCRC32(text)`

Calcula o checksum CRC32 de uma string.

## Geradores

### `generateUUID()`

Gera um UUID seguro versão 4 (aleatório) nativo.

### `generatePassword(options?)`

Gera uma ou mais senhas fortes com base nas opções de complexidade fornecidas.

```ts
{
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSpecialChars?: boolean;
  amount?: number;
}
```

## Exemplo Rápido

```ts
import { generatePassword, encodeSHA256 } from "@rebimboca/crypto";

const senha = generatePassword({ length: 16, includeSpecialChars: true });
const hash = encodeSHA256(senha as string);

console.log(senha, hash);
```
