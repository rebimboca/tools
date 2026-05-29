import js from "@eslint/js";
import tseslint from "typescript-eslint";
import path from "node:path";
import { fileURLToPath } from "node:url";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintConfigPrettier from "eslint-config-prettier";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,mts,cts}"],
    linterOptions: {
      reportUnusedDisableDirectives: "error"
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" }
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@rebimboca/*/src/*",
                "../*/src/*",
                "../../*/src/*",
                "packages/*/src/*",
                "**/packages/*/src/*"
              ],
              message:
                "Import from package public API only. Do not import internal src paths from other packages."
            }
          ]
        }
      ]
    }
  },
  {
    files: ["**/test/**/*.{ts,mts,cts}", "**/*.test.{ts,mts,cts}"],
    rules: {
      "@typescript-eslint/no-magic-numbers": "off"
    }
  },
  {
    files: ["**/bench/**/*.{ts,mts,cts}", "**/*.bench.{ts,mts,cts}"],
    rules: {
      "@typescript-eslint/no-magic-numbers": "off"
    }
  },
  eslintConfigPrettier,
  {
    ignores: ["**/dist/**", "**/coverage/**", "**/node_modules/**"]
  }
];
