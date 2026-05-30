# @rebimboca/trabalho-br

![npm version](https://img.shields.io/npm/v/@rebimboca/trabalho-br?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/trabalho-br?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote completo com utilitários corporativos e calculadoras financeiras baseadas na legislação trabalhista brasileira (CLT).

## Instalação

```bash
pnpm add @rebimboca/trabalho-br
```

## Visão Geral

- 💰 Cálculo completo de Férias e Abonos
- 📄 Cálculo detalhado de Rescisão Contratual (Aviso Prévio, 13º, FGTS)
- 📊 Cálculo de impostos de renda (IRRF) e INSS
- 💱 Formatação robusta de Moedas Brasileiras (BRL)
- 📅 Utilitários de manipulação de datas trabalhistas (Dias Úteis, Feriados)

## Calculadoras

### `calcularRescisaoContrato(entrada)`

Calcula os valores rescisórios completos retornando um resumo detalhado das verbas (saldo de salário, aviso prévio, férias proporcionais, décimo terceiro e multas).

### `calcularFerias(entrada)`

Calcula os valores devidos para as férias, considerando dias gozados, abono pecuniário, e 1/3 constitucional, deduzindo os encargos trabalhistas pertinentes.

### `calcularImpostoRenda(salario)`

Aplica a tabela progressiva oficial do IRRF brasileiro.

### `calcularINSS(salario)`

Aplica as alíquotas progressivas para dedução da contribuição do INSS.

## Utilitários Adicionais

- `Moeda` — Formatação estrita nos padrões ISO 4217 (BRL).
- `Datas Trabalhistas` — Feriados bancários e dias úteis federais (CLT).

## Exemplo Rápido

```ts
import { calcularFerias } from "@rebimboca/trabalho-br";

const holeriteFerias = calcularFerias({
  salarioBase: 3500,
  diasFerias: 30,
  abonoPecuniario: false
});

console.log(holeriteFerias.valorLiquido);
```
