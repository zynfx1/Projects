import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint"; // 🎯 IMPORT FROM THE NEW PACKAGE
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1. BASE JS CONFIG
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: { 
      globals: { ...globals.browser, ...globals.node },
    },
  },
  
  // 2. JS RECOMMENDED RULES
  js.configs.recommended,

  // 3. TYPESCRIPT CONFIG (The Magic Part)
  // tseslint.configs.recommended is an array, so we spread it here
  ...tseslint.configs.recommended,
  
  // 4. TYPESCRIPT CUSTOMIZATION
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.vue"], // Apply to TS and Vue files
    languageOptions: {
       parserOptions: {
          project: "./tsconfig.json", // Ensure this points to your file
          extraFileExtensions: [".vue"], // logic to help TS check Vue files
       }
    }
  },

  // 5. VUE CONFIG
  ...pluginVue.configs["flat/essential"],
  
  // 6. YOUR CUSTOM RULES (Global)
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