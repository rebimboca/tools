# @rebimboca/veiculos-br

![npm version](https://img.shields.io/npm/v/@rebimboca/veiculos-br?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/veiculos-br?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote com utilitários de geração, validação e listagem de dados automotivos e de transporte brasileiros.

## Instalação

```bash
pnpm add @rebimboca/veiculos-br
```

## Visão Geral

- 🚗 Geração estruturada de veículos (Marcas, Modelos, Categorias)
- 🪪 Gerador e Validador de Placas Veiculares (Padrão Antigo e Mercosul)
- 📑 Reexportação simplificada de validação e geração de RENAVAM

## Geradores

### `gerarVeiculo(opcoes?)`

Gera de forma automatizada o perfil técnico completo de um veículo contendo placa, RENAVAM, fabricante, modelo e categoria de registro.

### `gerarPlacaVeiculo(opcoes?)`

Gera placas de identificação veicular perfeitamente compatíveis com a resolução 780 do CONTRAN (Padrão Mercosul).

### Reexportações (`@rebimboca/documentos-br`)

- `gerarRENAVAM(comPontuacao?)`

## Validadores

### `validarPlacaVeiculo(placa)`

Verifica sintaticamente se a string submetida é uma placa de trânsito válida nos dois padrões utilizados em território nacional.

### Reexportações (`@rebimboca/documentos-br`)

- `validarRENAVAM(renavam)`

## Listagens e Dados Base

- `listarMarcas()`
- `listarModelos(marca?)`
- `listarCategorias()`

## Exemplo Rápido

```ts
import { gerarPlacaVeiculo, validarPlacaVeiculo } from "@rebimboca/veiculos-br";

const placa = gerarPlacaVeiculo({ comPontuacao: true });
console.log(`Placa gerada: ${placa}`);

const placaValida = validarPlacaVeiculo("ABC1D23"); // true (Padrão Mercosul)
```
