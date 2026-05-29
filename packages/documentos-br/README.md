# @rebimboca/documentos-br

Ferramentas de documentos brasileiros.

## Ferramentas

### Geradores

#### `gerarCPF(comPontuacao?: boolean, estadoOrigem?: UF | "aleatorio"): string`

#### `gerarCNPJ(comPontuacao?: boolean, formato?: "numerico" | "alfanumerico"): string`

#### `gerarRG(comPontuacao?: boolean): string`

#### `gerarCNH(comPontuacao?: boolean): string`

#### `gerarPISPASEP(comPontuacao?: boolean): string`

#### `gerarRENAVAM(comPontuacao?: boolean): string`

#### `gerarTituloEleitor(estado: UF): string`

#### `gerarInscricaoEstadual(estado: UF, comPontuacao?: boolean): string`

#### `gerarCertidao(tipo: "nascimento" | "casamento" | "obito", comPontuacao?: boolean): string`

#### `gerarCEP(opcoes?: { estado?: UF; cidade?: string; comPontuacao?: boolean }): CEPGerado`

### Validadores

#### `validarCPF(cpf: string): boolean`

#### `validarCNPJ(cnpj: string): boolean`

#### `validarRG(rg: string, estado?: UF): boolean`

#### `validarCNH(cnh: string): boolean`

#### `validarPISPASEP(pis: string): boolean`

#### `validarRENAVAM(renavam: string): boolean`

#### `validarTituloEleitor(titulo: string): boolean`

#### `validarInscricaoEstadual(ie: string, estado: UF): boolean`

#### `validarCertidao(numero: string, tipo: "nascimento" | "casamento" | "obito"): boolean`

## Tipos úteis

- `UF`: `AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO`
- `CEPGerado`: `{ cep, endereco, bairro, cidade, estado }`

## Instalação

```bash
pnpm add @rebimboca/documentos-br
```

## Exemplo de uso

```ts
import { gerarCPF } from "@rebimboca/documentos-br";

const cpfComPontuacao = gerarCPF(true);
console.log(cpfComPontuacao);
```
