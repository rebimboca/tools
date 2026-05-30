# @rebimboca/seo

![npm version](https://img.shields.io/npm/v/@rebimboca/seo?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/seo?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote para otimização de SEO, geração de meta tags e arquivos de indexação para web.

## Instalação

```bash
pnpm add @rebimboca/seo
```

## Visão Geral

- 🏷️ Geração de blocos de Meta Tags (HTML) para SEO
- 🗺️ Geração de `sitemap.xml` estruturado
- 🤖 Geração de políticas de rastreamento via `robots.txt`

## Geradores

### `generateMetaTags(input)`

Retorna um bloco HTML formatado contendo as tags `<title>` e `<meta>`, padronizadas e prontas para uso no `<head>` da aplicação.

### `generateSitemap(urls)`

Gera o conteúdo de um arquivo `sitemap.xml` para melhor indexação de URLs pelos motores de busca.

### `generateRobotsTxt(rules)`

Gera o conteúdo de um arquivo `robots.txt` especificando permissões e bloqueios para web crawlers.

## Exemplo Rápido

```ts
import { generateMetaTags } from "@rebimboca/seo";

const tags = generateMetaTags({
  title: "Rebimboca",
  description: "Ferramentas incríveis",
  keywords: ["utilitarios", "javascript", "brasil"]
});

console.log(tags);
```
