# rebimboca-tools

[English](./README.md) | Português (Brasil)

Monorepo de utilitários TypeScript/Node.js focado em dados brasileiros, texto, randomização, encoding, crypto, web e helpers compartilhados.

## Pacotes

- `@rebimboca/documentos-br`
- `@rebimboca/bancario-br`
- `@rebimboca/veiculos-br`
- `@rebimboca/pessoas-br`
- `@rebimboca/empresas-br`
- `@rebimboca/trabalho-br`
- `@rebimboca/text`
- `@rebimboca/random`
- `@rebimboca/encoding`
- `@rebimboca/crypto`
- `@rebimboca/web`
- `@rebimboca/seo`
- `@rebimboca/design`
- `@rebimboca/image`
- `@rebimboca/shared`
- `@rebimboca/tools` (agregador)

## Scripts

- `pnpm dev`
- `pnpm build`
- `pnpm test`
- `pnpm lint`
- `pnpm lint:fix`
- `pnpm typecheck`
- `pnpm bench`
- `pnpm format`
- `pnpm format:check`
- `pnpm changeset`
- `pnpm version-packages`
- `pnpm release`

## Convenções

As convenções do projeto estão em [CONVENTIONS.md](./CONVENTIONS.md).

## Versionamento e release

Este monorepo usa Changesets + SemVer.

### npm Trusted Publishing (GitHub Actions)

Este repositório está configurado para publicar via GitHub OIDC (Trusted Publishing), sem `NPM_TOKEN`.

Configuração necessária no npm (uma vez):

1. No npm, configurar Trusted Publisher para este repositório/workflow do GitHub.
2. Permitir ao menos a ação `npm publish` para esse trusted publisher.
3. Repetir para cada pacote que será publicado no escopo `@rebimboca`.

Workflows:

- CI: [ci.yml](./.github/workflows/ci.yml)
- Release: [release.yml](./.github/workflows/release.yml)
