import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // Vendored tooling, not our product code. The impeccable design skill
    // ships its own scripts; linting them reports hundreds of warnings we cannot fix
    // and would not want to, and it hides the ones in app/.
    ".agents/**",
    ".claude/**",
    ".cursor/**",
    ".impeccable/**",
  ]),
]);

export default eslintConfig;
