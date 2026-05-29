# Conventions

This document defines the official standards for the `rebimboca-tools` monorepo.

## 1. Purpose

Ensure consistent package organization, public API design, naming, and long-term maintainability across the repository.

## 2. Language rule

- Brazilian packages (`*-br`): use **pt-BR** for directories, file names, and public function names.
- Non-Brazilian packages: use **English** for directories, file names, and public function names.

Examples:

- BR: `geradores`, `validadores`, `consultas`, `gerarCPF`, `validarCPF`
- Non-BR: `generators`, `validators`, `queries`, `generateHash`, `validateChecksum`

## 3. Package naming

### 3.1 BR packages (pt-BR)

- `@rebimboca/documentos-br`
- `@rebimboca/bancario-br`
- `@rebimboca/veiculos-br`
- `@rebimboca/pessoas-br`
- `@rebimboca/empresas-br`
- `@rebimboca/trabalho-br`

### 3.2 Non-BR packages (English)

- `@rebimboca/text`
- `@rebimboca/random`
- `@rebimboca/encoding`
- `@rebimboca/crypto`
- `@rebimboca/web`
- `@rebimboca/seo`
- `@rebimboca/design`
- `@rebimboca/image`
- `@rebimboca/shared`
- `@rebimboca/tools`

## 4. Directory taxonomy

Each package must use generic categories based on responsibility.

### 4.1 BR packages (pt-BR)

Allowed categories:

- `geradores`
- `validadores`
- `formatadores`
- `conversores`
- `consultas`
- `calculadoras`
- `dados`
- `utilitarios`
- `tipos`
- `erros`

### 4.2 Non-BR packages (English)

Allowed categories:

- `generators`
- `validators`
- `formatters`
- `converters`
- `queries`
- `calculators`
- `data`
- `utils`
- `types`
- `errors`

## 5. Minimum package structure

```txt
packages/<package>/
├── src/
│   ├── <categories>
│   └── index.ts
├── test/
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

## 6. File and symbol naming rules

- Files and directories: `kebab-case`.
- Functions, variables, and constants: `camelCase`.
- Types, interfaces, and classes: `PascalCase`.
- Do not use accent marks in file or directory names.
- Import ordering must follow ESLint auto-fix (`simple-import-sort`).

## 7. Export rules

- Every functional directory must include an `index.ts` barrel file.
- `src/index.ts` defines the package public API.
- Avoid unplanned deep exports.
- For breaking changes, keep temporary aliases when possible for one major cycle.

## 8. Shared implementation rule (no duplicate logic)

- If the same tool is useful in more than one package, the implementation must exist in only one package (single source of truth).
- The package that best represents the domain owns the implementation (`owner package`).
- Other packages must consume and re-export that function instead of copying code.

Owner package decision criteria (in order):

1. Domain fit: the package where the tool is conceptually native.
2. Data dependency: the package that already owns required datasets/rules.
3. API coherence: the package where users most likely expect that feature.

Implementation pattern:

1. Implement and test in owner package.
2. Add explicit export in owner `src/index.ts`.
3. In secondary package, add dependency on owner package.
4. Re-export only the specific feature from secondary package.
5. Do not duplicate tests for core algorithm; add only integration-level checks in secondary package if needed.

Example:

- `symbols to copy` can be owned by `@rebimboca/design`.
- `@rebimboca/text` may re-export that specific function for convenience.

## 9. Implementation rules

- Use strict TypeScript.
- ESM is mandatory.
- Prefer pure and deterministic functions.
- Avoid unnecessary third-party dependencies.
- Preserve tree-shaking support (`sideEffects: false` where applicable).
- Error contract:
  - For invalid input or unsupported options in generators/converters/queries/calculators, return `null`.
  - Validators return `boolean` (`true`/`false`) and should not throw for normal invalid values.
  - Throw only for truly exceptional runtime failures (I/O, infrastructure), not user input validation.

## 10. Testing rules

- Use Vitest tests under `test/`.
- Every public feature should include success and failure test cases.
- Validators should include common invalid inputs and edge cases.
- Benchmarks must live inside the owning package (`packages/<pkg>/bench/*.bench.ts`), not in repository root.

## 11. Versioning and release rules

- Use Changesets for versioning and publishing.
- Follow SemVer:
  - `patch`: bug fixes with no API change.
  - `minor`: backward-compatible features.
  - `major`: breaking changes.
- Standard flow:
  1. `pnpm changeset`
  2. merge
  3. `pnpm version-packages`
  4. `pnpm release`

## 12. Aggregator package rule

`@rebimboca/tools` must only re-export main packages. It must not contain business logic.

## 13. Convention change governance

Any change to this document must:

1. Update this file.
2. Migrate the affected code/structure.
3. Update impacted package READMEs.
4. Add Changesets entries for breaking changes when applicable.
