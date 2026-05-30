# @rebimboca/documentos-br

![npm version](https://img.shields.io/npm/v/@rebimboca/documentos-br?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/documentos-br?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote completo com utilitários para validação e geração de documentos brasileiros oficiais.

## Instalação

```bash
pnpm add @rebimboca/documentos-br
```

## Visão Geral

- 📄 Geração e validação de CPF, CNPJ e RG
- 🚗 Geração e validação de CNH e RENAVAM
- 🗳️ Geração e validação de Título de Eleitor
- 🏢 Geração e validação de Inscrição Estadual (IE) e PIS/PASEP
- 📜 Geração e validação de Certidões (Nascimento, Casamento, Óbito)
- 📮 Geração de CEP válido

## Geradores

### Pessoas Físicas e Veículos

- `gerarCPF(comPontuacao?, estadoOrigem?)`
- `gerarRG(comPontuacao?)`
- `gerarCNH(comPontuacao?)`
- `gerarPISPASEP(comPontuacao?)`
- `gerarRENAVAM(comPontuacao?)`
- `gerarTituloEleitor(estado)`
- `gerarCertidao(tipo, comPontuacao?)`

### Pessoas Jurídicas e Endereços

- `gerarCNPJ(comPontuacao?, formato?)`
- `gerarInscricaoEstadual(estado, comPontuacao?)`
- `gerarCEP(opcoes?)`

## Utilitários Adicionais

- `identificarDocumento(documento)` — Identifica heurísticamente o tipo de documento.
- `formatarDocumento(documento)` — Aplica automaticamente a máscara correta ao documento informado.

## Validadores

- `validarCPF(cpf)`
- `validarCNPJ(cnpj)`
- `validarRG(rg, estado?)`
- `validarCNH(cnh)`
- `validarPISPASEP(pis)`
- `validarRENAVAM(renavam)`
- `validarTituloEleitor(titulo)`
- `validarInscricaoEstadual(ie, estado)`
- `validarCertidao(numero, tipo)`

## Tipos Úteis

- `UF`: String literal contendo todas as siglas de estados brasileiros (ex: `SP`, `RJ`, `MG`).
- `CEPGerado`: Objeto contendo os dados do endereço (`cep`, `endereco`, `bairro`, `cidade`, `estado`).

## Exemplo Rápido

```ts
import { gerarCPF, validarCPF } from "@rebimboca/documentos-br";

const cpf = gerarCPF(true, "SP");
const valido = validarCPF(cpf);

console.log(`CPF: ${cpf} | Válido: ${valido}`);
```
