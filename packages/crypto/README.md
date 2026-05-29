# @rebimboca/crypto

Hash, checksum, and password utilities.

## Tools

### Converters

#### `encodeMD5(text: string): string`

#### `encodeSHA1(text: string): string`

### Validators

#### `calculateCRC32(text: string): string`

### Generators

#### `generatePassword(options?: { length?: number; includeUppercase?: boolean; includeLowercase?: boolean; includeNumbers?: boolean; includeSpecialChars?: boolean; amount?: number }): string | string[]`

## Installation

```bash
pnpm add @rebimboca/crypto
```

## Usage

```ts
import { generatePassword } from "@rebimboca/crypto";

const password = generatePassword({ length: 16 });
console.log(password);
```
