# @rebimboca/documentos-br

## 0.2.0

### Minor Changes

- c48c212: Aprimoramentos profundos no tratamento de documentos nacionais:
  - Validador completo de Inscrição Estadual (`validarInscricaoEstadual`) com suporte integrado para todos os 27 estados.
  - Validador robusto de Título de Eleitor (`validarTituloEleitor`) com exceções estaduais de SP/MG.
  - Validação matemática de Certidões de Nascimento, Casamento e Óbito (`validarCertidao`).
  - Heurísticas de formatação inteligente reversa em strings brutas (`formatarDocumento`).
  - Detetor automático do tipo de documento a partir da estrutura sintática (`identificarDocumento`).

### Patch Changes

- Updated dependencies [c48c212]
  - @rebimboca/shared@0.2.0
