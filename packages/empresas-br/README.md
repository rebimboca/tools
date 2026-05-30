# @rebimboca/empresas-br

![npm version](https://img.shields.io/npm/v/@rebimboca/empresas-br?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/empresas-br?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote para geração e validação de dados completos de empresas e entidades jurídicas brasileiras.

## Instalação

```bash
pnpm add @rebimboca/empresas-br
```

## Visão Geral

- 🏢 Geração de perfis completos de empresas fictícias
- 📜 Reexportação simplificada de geradores e validadores de CNPJ e Inscrição Estadual

## Geradores

### `gerarEmpresa(opcoes?)`

Gera um objeto contendo os dados completos de uma empresa, incluindo nome fantasia, razão social, CNPJ, inscrição estadual e endereço completo.

### Reexportações (`@rebimboca/documentos-br`)

- `gerarCNPJ(comPontuacao?, formato?)`
- `gerarInscricaoEstadual(estado, comPontuacao?)`

## Validadores

- `validarCNPJ(cnpj)`
- `validarInscricaoEstadual(ie, estado)`

## Exemplo Rápido

```ts
import { gerarEmpresa } from "@rebimboca/empresas-br";

const empresa = gerarEmpresa({ estado: "SP" });

console.log(empresa.razaoSocial);
console.log(empresa.cnpj);
```
