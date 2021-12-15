/* eslint-env node */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020, 
    sourceType: "module", 
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  plugins: [
    "react",
    "@typescript-eslint", 
    "react-hooks"
  ],
  extends: [
    "eslint:recommended", 
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    "react-hooks/rules-of-hooks": "error",
    "@typescript-eslint/ban-types": [
       "error",
       {
         "types": {
           "Object": "Avoid using the `Object` type. Did you mean `object`?",
           "Boolean": "Avoid using the `Boolean` type. Did you mean `boolean`?",
           "Number": "Avoid using the `Number` type. Did you mean `number`?",
           "String": "Avoid using the `String` type. Did you mean `string`?",
           "Symbol": "Avoid using the `Symbol` type. Did you mean `symbol`?",
           "Function": false,
           "object": false,
           "{}": false,
         }
       }
    ],
    "react-hooks/exhaustive-deps": "warn",
    "max-len": [2, { "code": 150, "ignoreUrls": true }],
    "no-redeclare": "error",
    "camelcase": "error",
    "jsx-quotes": ["error", "prefer-double"],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
      { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]},
    ],
  },
};
