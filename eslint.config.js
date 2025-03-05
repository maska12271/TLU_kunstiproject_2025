import js from "@eslint/js";
import ts from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  importPlugin.flatConfigs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: { version: "detect" }, // Automatically detect React version
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json", // Point to your tsconfig.json file
          alwaysTryTypes: true, // Optional: resolve type declarations even if no imports
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules, // React recommended rules
      ...react.configs["jsx-runtime"].rules, // JSX runtime rules
      ...reactHooks.configs.recommended.rules, // React Hooks rules
      "react/jsx-no-target-blank": "off", // Disable specific rule
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "warn", // Enable Prettier formatting warnings
    },
  },
  {
    files: ["**/*.cjs", "**/*.mjs"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    ignores: ["dist", "vite.config.js"],
  },
];
