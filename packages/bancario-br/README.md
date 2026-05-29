# @rebimboca/bancario-br

Ferramentas bancárias brasileiras.

## Ferramentas

### Geradores

#### `gerarContaBancaria(agencia?: string, tamanhoConta?: number): ContaBancariaGerada`

Gera uma conta bancária com dígito verificador (módulo 11).

Parâmetros:

- `agencia` (opcional): agência com 4 dígitos.
- `tamanhoConta` (opcional): tamanho da conta sem dígito (padrão `8`).

Retorno:

- `{ agencia, conta, digito, contaCompleta }`

#### `gerarCartaoCredito(bandeira?: BandeiraCartao): CartaoCreditoGerado`

Gera número de cartão válido por Luhn.

Parâmetros:

- `bandeira` (opcional): `mastercard | visa | amex | diners | discover | enroute | jcb | voyager | hipercard | aura`.

Retorno:

- `{ numero, mascarado, dataValidade, codigoSeguranca, bandeira }`

### Validadores

#### `validarContaBancaria(conta: string, digito: string, banco?: string): boolean`

Valida conta e dígito.

#### `validarCartaoCredito(numero: string, bandeira?: BandeiraCartao): boolean`

Valida cartão por Luhn e, quando informado, por regra de bandeira.

### Consultas

#### `consultarBancoPorNumero(codigo: string): Banco | null`

Busca banco por código COMPE (ex.: `001`, `237`, `341`).

#### `listarBancos(): ReadonlyArray<Banco>`

Lista bancos suportados para geração/validação.

## Instalação

```bash
pnpm add @rebimboca/bancario-br
```
