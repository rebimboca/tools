# Contributing

## Quality gates

- `pnpm format:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

## Architecture

- Use owner package + re-export strategy for shared tools.
- Avoid cross-package imports from internal `src` paths.
- Follow import sorting and formatting enforced by ESLint + Prettier.

## Versioning

- Add a changeset for every functional change.
- Follow SemVer and CONVENTIONS.md.

## Changesets

- For every functional change, run `pnpm changeset`.
- Select the affected package(s).
- Choose the correct bump type: `patch`, `minor`, or `major`.
- Write a user-facing summary of what changed.
- Breaking public API changes must be `major`.
- Internal refactors with no public API change can be `patch`.

## Publishing

- Publishing is handled by GitHub Actions via npm Trusted Publishing (OIDC).
- Do not add `NPM_TOKEN`-based publish steps to workflows.
