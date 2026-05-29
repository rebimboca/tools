# @rebimboca/empresas-br

Ferramentas de dados de empresas brasileiras.

## Ferramentas

### Geradores

#### `gerarEmpresa(opcoes?: { estado?: UF; cidade?: string }): EmpresaGerada`

Gera empresa com nome/razão social, CNPJ, inscrição estadual e endereço.

#### `gerarCNPJ(comPontuacao?: boolean, formato?: "numerico" | "alfanumerico"): string`

Reexportado de `@rebimboca/documentos-br`.

#### `gerarInscricaoEstadual(estado: UF, comPontuacao?: boolean): string`

Reexportado de `@rebimboca/documentos-br`.

### Validadores

#### `validarCNPJ(cnpj: string): boolean`

Reexportado de `@rebimboca/documentos-br`.

#### `validarInscricaoEstadual(ie: string, estado: UF): boolean`

Reexportado de `@rebimboca/documentos-br`.

## Instalação

```bash
pnpm add @rebimboca/empresas-br
```
