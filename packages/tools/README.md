# @rebimboca/tools

![npm version](https://img.shields.io/npm/v/@rebimboca/tools?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/tools?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote agregador central que atua como porta de entrada (Facade) reexportando as funcionalidades de todos os pacotes satélites do ecossistema Rebimboca Tools.

## Instalação

A maneira mais prática de importar ferramentas do ecossistema se você precisa de funcionalidades de múltiplas áreas:

```bash
pnpm add @rebimboca/tools
```

## Visão Geral

Este pacote expõe diretamente em sua raiz os utilitários provenientes de:

- `@rebimboca/documentos-br`
- `@rebimboca/bancario-br`
- `@rebimboca/veiculos-br`
- `@rebimboca/pessoas-br`
- `@rebimboca/empresas-br`
- `@rebimboca/trabalho-br`
- `@rebimboca/text`
- `@rebimboca/random`
- `@rebimboca/encoding`
- `@rebimboca/crypto`
- `@rebimboca/web`
- `@rebimboca/seo`
- `@rebimboca/design`
- `@rebimboca/image`

## Exemplo Rápido

```ts
// Em vez de instalar 3 pacotes separados, importe tudo de um só lugar:
import { gerarCPF, generatePassword, generateMetaTags } from "@rebimboca/tools";
```
