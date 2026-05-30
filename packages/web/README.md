# @rebimboca/web

![npm version](https://img.shields.io/npm/v/@rebimboca/web?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/web?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote que concentra ferramentas dinâmicas para navegação web, requisições de rede, validadores de URLs e geradores de códigos bidimensionais.

## Instalação

```bash
pnpm add @rebimboca/web
```

## Visão Geral

- 🌐 Validação estrita de URLs e E-mails (RFC 5322)
- 🛰️ Ferramentas para consulta de Identidade (Navegador, SO e Endereço IP Público)
- 📱 Gerador offline e seguro de QR Codes compatíveis com o padrão Denso Wave

## Consultas de Rede (Queries)

### `getMyIp()`

Consulta de forma assíncrona o endereço IPv4 ou IPv6 do cliente.

### `getMyBrowser(userAgent?)`

Parseia e decodifica a assinatura de cabeçalho `User-Agent` para extrair nome e versão do navegador.

### `getMyOperatingSystem(userAgent?)`

Extrator de metadados do sistema operacional subjacente.

## Geradores

### `generateQrCode(text, options?)`

Cria representações compactas e digitalizáveis (Data URL e SVG) de códigos de barras bidimensionais (QR Code).

## Validadores

### `isValidEmail(email)`

Validação canônica e rigorosa de endereços de correio eletrônico em conformidade com as regras da RFC 5322 e domínios corporativos.

### `isValidUrl(url)`

Verifica preventivamente, através da API construtora do JavaScript, a segurança e legibilidade de esquemas absolutos de protocolo (HTTP, HTTPS).

## Conversores

- `textToHtml(text)` — Reexportação do utilitário protetor de XSS (`@rebimboca/text`).

## Exemplo Rápido

```ts
import { generateQrCode, isValidUrl } from "@rebimboca/web";

const url = "https://github.com";

if (isValidUrl(url)) {
  const qr = generateQrCode(url, { size: 512 });
  console.log("QR Code (Data URI):", qr);
}
```
