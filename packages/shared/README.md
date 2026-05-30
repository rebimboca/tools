# @rebimboca/shared

![npm version](https://img.shields.io/npm/v/@rebimboca/shared?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/shared?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote interno que contém contratos base, utilitários, exceções padronizadas e tipos comuns usados por todos os pacotes do ecossistema Rebimboca.

## Instalação

```bash
pnpm add @rebimboca/shared
```

## Visão Geral

- 🧬 Types e Interfaces unificados
- 🛡️ Classes de erro padronizadas (Errors)
- 🧩 Validadores e formatadores genéricos
- 🛠️ Funções e utilitários auxiliares (como Módulo 11, OnlyDigits e EscapeHTML)

## Conteúdo Principal

### `utils/guards.ts`

Type Guards do TypeScript para garantir segurança na tipagem em runtime.

### `utils/modulo11.ts`

Implementação robusta e eficiente do algoritmo Módulo 11 (usado em CPF, CNPJ, Contas Bancárias, etc).

### `utils/only-digits.ts`

Extrator otimizado que isola e retorna exclusivamente cadeias numéricas de uma string.

### `utils/escape-html.ts`

Sanitizador focado na prevenção de XSS ao escapar caracteres restritos do HTML.
