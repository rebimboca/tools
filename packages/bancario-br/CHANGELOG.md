# @rebimboca/bancario-br

## 0.2.0

### Minor Changes

- c48c212: Adiciona novas funções de validação e geração bancária:
  - Validador de IBAN (`isValidIban`) de acordo com o padrão do Banco Central do Brasil.
  - Gerador de chaves PIX aleatórias ou formatadas (`gerarChavePix`).
  - Identificação (`identificarBandeiraCartao`) e validação de bandeiras de cartões de crédito (`validarCartaoComBandeira`).
  - Modernização geral na API de consulta a bancos e normalização de inputs.

### Patch Changes

- Updated dependencies [c48c212]
  - @rebimboca/shared@0.2.0
