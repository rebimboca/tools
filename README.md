# rebimboca-tools

English | [Português (Brasil)](./README.pt-BR.md)

A TypeScript/Node.js utilities monorepo focused on Brazilian data, text, randomization, encoding, crypto, web, and shared helpers.

## Packages

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
- `@rebimboca/tools` (aggregator)

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

## Conventions

Project-wide conventions are documented in [CONVENTIONS.md](./CONVENTIONS.md).

## Versioning and release

This monorepo uses Changesets + SemVer.

### npm Trusted Publishing (GitHub Actions)

This repository is configured to publish via GitHub OIDC (Trusted Publishing), without `NPM_TOKEN`.

Required npm setup (one-time):

1. In npm, configure Trusted Publisher for this GitHub repository/workflow.
2. Allow at least `npm publish` action for the trusted publisher.
3. Repeat for each package that should be published under the `@rebimboca` scope.

Workflow:

- CI: [ci.yml](./.github/workflows/ci.yml)
- Release: [release.yml](./.github/workflows/release.yml)
