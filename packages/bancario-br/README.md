# @rebimboca/bancario-br

![npm version](https://img.shields.io/npm/v/@rebimboca/bancario-br?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/bancario-br?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote com utilitários bancários brasileiros para consulta, validação e geração de dados.

## Instalação

```bash
pnpm add @rebimboca/bancario-br
```

## Visão Geral

- 🏦 Consultas de banco por código e nome
- 🌐 Consulta de bancos em APIs externas (BrasilAPI e BCB)
- 💳 Geração e validação de cartão de crédito (Luhn)
- 🧾 Geração e validação de conta bancária
- 🔑 Geração de Chaves PIX

## Consultas

### `bancos`

Base estática com os principais bancos brasileiros (`ReadonlyArray<Banco>`).

### `bancoPorCodigo(codigo, listaBancos?)`

Busca um banco por código COMPE (normalizado para 3 dígitos).

```ts
bancoPorCodigo(341); // { codigo: "341", nome: "Itau Unibanco" }
bancoPorCodigo("1"); // { codigo: "001", nome: "Banco do Brasil" }
```

### `bancoPorNome(nome, listaBancos?)`

Busca o primeiro banco por nome, com busca parcial, case-insensitive e sem acento.

```ts
bancoPorNome("itau");
bancoPorNome("Itaú");
bancoPorNome("bradesco");
```

### `bancosPorNome(nome, listaBancos?)`

Busca todos os bancos que combinam com o termo informado.

```ts
bancosPorNome("banco");
```

### `bancosBrasilApi()`

Consulta bancos ativos via BrasilAPI.

- ⏱️ Timeout interno
- 🔁 Retry automático em falhas transientes

### `bancosBCB()`

Consulta participantes do STR (Banco Central do Brasil).

- ⏱️ Timeout interno
- 🔁 Retry automático em falhas transientes

## Geradores

### `gerarContaBancaria(agencia?, tamanhoConta?)`

Gera conta bancária com dígito verificador (módulo 11).

### `gerarCartaoCredito(bandeira?)`

Gera cartão de crédito válido por Luhn.

Retorna:

```ts
{
  numero: string;
  mascarado: string;
  bandeira: "visa" | "mastercard" | "amex" | "elo" | "hipercard";
  dataValidade: string; // MM/YY
}
```

### `gerarChavePix(tipo?)`

Gera uma chave PIX fictícia formatada para testes.
Tipos suportados: `"cpf"`, `"cnpj"`, `"telefone"`, `"email"`, `"aleatoria"`.

## Validadores

### `validarContaBancaria(conta, digito)`

Valida conta bancária usando módulo 11.

### `validarCartaoCredito(numero)`

Valida cartão usando algoritmo de Luhn.

### `identificarBandeiraCartao(numero)`

Identifica bandeira a partir do BIN.

### `validarCartaoComBandeira(numero, bandeira?)`

Valida Luhn e, quando bandeira informada, valida compatibilidade do BIN.

## Exemplo Rápido

```ts
import {
  bancoPorCodigo,
  bancoPorNome,
  bancosPorNome,
  bancosBCB,
  gerarCartaoCredito,
  validarCartaoCredito,
} from "@rebimboca/bancario-br";

const banco = bancoPorCodigo(341);
const porNome = bancoPorNome("Itaú");
const varios = bancosPorNome("banco");

const cartao = gerarCartaoCredito("mastercard");
const valido = validarCartaoCredito(cartao.numero);

const listaBCB = await bancosBCB();
```
