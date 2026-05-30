# @rebimboca/random

![npm version](https://img.shields.io/npm/v/@rebimboca/random?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/random?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote com utilitários avançados de randomização, distribuições matemáticas e seletores aleatórios seguros.

## Instalação

```bash
pnpm add @rebimboca/random
```

## Visão Geral

- 🎲 Geração em lote de números aleatórios ordenáveis e únicos
- 🎨 Geração de cores e paletas HEX aleatórias
- 🎯 Seletores numéricos configuráveis

## Geradores

### `generateRandomNumbers(options)`

Gera um vetor robusto contendo números inteiros aleatórios que respeitam limites min/max. Permite garantir unicidade via Princípio de Dirichlet e aplica algoritmos de ordenação no retorno ou durante o processo seletivo.

```ts
{
  amount: number;
  min: number;
  max: number;
  unique?: boolean;
  listOrder?: "asc" | "desc" | "none";
  numberOrder?: "asc" | "desc" | "none";
}
```

### `gerarCorAleatoria()`

Retorna uma cor hexadecimal gerada aleatoriamente.

### `gerarPaletaAleatoria(quantidade?)`

Gera um array de cores hexadecimais randômicas formando uma paleta.

## Calculadoras

### `pickNumbers(options)`

Seleciona valores com probabilidade estocástica a partir de uma faixa específica.

## Exemplo Rápido

```ts
import { generateRandomNumbers } from "@rebimboca/random";

const numerosMegaSena = generateRandomNumbers({
  amount: 6,
  min: 1,
  max: 60,
  unique: true,
  listOrder: "asc"
});

console.log(numerosMegaSena); // [4, 12, 19, 31, 45, 59]
```
