# @rebimboca/pessoas-br

Ferramentas de dados de pessoas brasileiras.

## Ferramentas

### Geradores

#### `gerarPessoa(opcoes?: GerarPessoaOpcoes): PessoaGerada`

Parâmetros:

- `sexo`: `masculino | feminino | aleatorio`
- `idade` (opcional)
- `estado` (opcional)
- `cidade` (opcional)
- `comPontuacao` (opcional)

Retorno inclui: nome, CPF, RG, nascimento, filiação, e-mail, senha, endereço, telefones e características.

#### `gerarPessoas(quantidade: number, opcoes?: GerarPessoaOpcoes): PessoaGerada[]`

Gera de `1` a `30` pessoas.

#### `gerarNomes(opcoes?: { raca?: string; genero?: string; quantidade?: number }): string[]`

#### `gerarNicks(opcoes?: { metodo?: string; quantidade?: number; letras?: number; nome?: string; sobrenome?: string }): string[]`

#### `gerarCurriculo(dados: CurriculoEntrada): CurriculoGerado`

## Instalação

```bash
pnpm add @rebimboca/pessoas-br
```
