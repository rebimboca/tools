# @rebimboca/pessoas-br

![npm version](https://img.shields.io/npm/v/@rebimboca/pessoas-br?color=2ea44f)
![license](https://img.shields.io/npm/l/@rebimboca/pessoas-br?color=0366d6)
![types](https://img.shields.io/badge/types-TypeScript-3178c6)
![runtime](https://img.shields.io/badge/runtime-Node%2018%2B-339933)

Pacote completo para geração de dados demográficos, biográficos e curriculares fictícios de pessoas brasileiras.

## Instalação

```bash
pnpm add @rebimboca/pessoas-br
```

## Visão Geral

- 👤 Geração de perfis completos (CPF, RG, endereço, e-mail, senhas e muito mais)
- 📛 Geração massiva de nomes customizados (gênero, idade)
- 🎮 Gerador de nicknames
- 📑 Geração de currículos completos

## Geradores

### `gerarPessoa(opcoes?)`

Gera o perfil completo de um cidadão fictício contendo todos os dados cíveis, demográficos e sistêmicos, de acordo com as opções especificadas (como `sexo`, `estado`, `idade`).

### `gerarPessoas(quantidade, opcoes?)`

Permite a geração em lote de 1 a 30 perfis completos de uma única vez.

### `gerarNomes(opcoes?)`

Gera matrizes contendo apenas nomes aleatórios com base em customizações (quantidade, gênero, etc.).

### `gerarNicks(opcoes?)`

Utilitário ideal para aplicações de gaming e fóruns. Gera nicknames pseudo-aleatórios e pronunciáveis.

### `gerarCurriculo(dados)`

Estrutura dados para a formatação de um currículo base fictício.

## Exemplo Rápido

```ts
import { gerarPessoa } from "@rebimboca/pessoas-br";

const pessoa = gerarPessoa({ sexo: "feminino", estado: "RJ" });

console.log(pessoa.nome, pessoa.cpf, pessoa.endereco.cidade);
```
