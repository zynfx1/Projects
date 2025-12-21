import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },

{
    files: ["**/*.{js,ts,vue}"],
    rules: {
       'no-unused-vars': 'off',
       '@typescript-eslint/no-unused-vars': 'warn',
      'quotes': ['warn', 'single'],
      'semi': ['error', 'always'],
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'brace-style': ['error', '1tbs'],
      'comma-dangle': ['warn', 'always-multiline'],
      //'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  }
 
]);
