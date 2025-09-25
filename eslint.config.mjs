import js from "@eslint/js";
import globals from "globals";
import airbnbBase from "eslint-config-airbnb-base";
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    extends: [js.configs.recommended, airbnbBase],
    rules: {
      // Add project-specific overrides here
      "no-console": 1,
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": "error",
      "import/no-cycle": "error",
      "import/no-self-import": "error",
      "import/no-duplicates": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-named-as-default": "warn",
      "import/no-named-as-default-member": "warn",

      // Node.js rules
      "node/no-missing-import": "off", // Handled by TypeScript
      "node/no-missing-require": "off", // Handled by TypeScript
      "node/no-unpublished-import": "off",
      "node/no-unsupported-features/es-syntax": "off",
      "node/shebang": "off",

      // General JavaScript/TypeScript rules
      "no-console": "warn",
      "no-debugger": "error",
      "no-alert": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      "no-return-assign": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "no-unmodified-loop-condition": "error",
      "no-unused-expressions": "error",
      "no-useless-call": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["error", "as-needed"],
      "object-shorthand": "error",
      "no-duplicate-imports": "error",
      "no-useless-rename": "error",
    },
  },
]);
