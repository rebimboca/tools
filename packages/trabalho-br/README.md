# @rebimboca/trabalho-br

Ferramentas trabalhistas brasileiras.

## Ferramentas

### Calculadoras

#### `calcularRescisaoContrato(entrada: RescisaoEntrada): RescisaoResultado`

Parâmetros comuns:

- `salario`
- `dataAdmissao`
- `dataDemissao`
- `tipoAviso`
- campos de férias/13º/FGTS conforme cenário

Retorno:

- resumo detalhado das verbas rescisórias.

#### `calcularFerias(entrada: FeriasEntrada): FeriasResultado`

Parâmetros comuns:

- `salarioBase`
- `diasFerias`
- `abonoPecuniario`
- campos adicionais de desconto/imposto quando aplicável

Retorno:

- detalhamento completo do cálculo de férias.

## Instalação

```bash
pnpm add @rebimboca/trabalho-br
```
