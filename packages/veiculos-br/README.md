# @rebimboca/veiculos-br

Ferramentas de veículos brasileiros.

## Ferramentas

### Geradores

#### `gerarVeiculo(opcoes?: { estado?: UF; comPontuacao?: boolean }): VeiculoGerado`

Gera dados de veículo com placa e RENAVAM.

#### `gerarPlacaVeiculo(opcoes?: { estado?: UF; comPontuacao?: boolean }): string`

Gera placa válida no formato suportado.

#### `gerarRENAVAM(comPontuacao?: boolean): string`

Reexportado de `@rebimboca/documentos-br`.

### Validadores

#### `validarRENAVAM(renavam: string): boolean`

Reexportado de `@rebimboca/documentos-br`.

### Dados

#### `listarMarcas(): string[]`

#### `listarModelos(marca?: string): string[]`

#### `listarCategorias(): string[]`

## Instalação

```bash
pnpm add @rebimboca/veiculos-br
```
