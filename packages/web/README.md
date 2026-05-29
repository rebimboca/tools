# @rebimboca/web

Web and network utilities.

## Tools

### Queries

#### `getMyIp(): { ip: string; reverseDns?: string }`

#### `getMyBrowser(userAgent?: string): { name: string; version?: string; userAgent: string }`

#### `getMyOperatingSystem(userAgent?: string): { name: string; version?: string }`

### Generators

#### `generateQrCode(text: string, options?: { size?: number }): string`

Retorna Data URL ou SVG do QRCode.

### Converters

#### `textToHtml(text: string): string` (reexport from `@rebimboca/text`)

## Installation

```bash
pnpm add @rebimboca/web
```

## Usage

```ts
import { generateQrCode } from "@rebimboca/web";

const qr = generateQrCode("https://example.com", { size: 256 });
console.log(qr);
```
