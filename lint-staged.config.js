/* eslint-env node */
module.exports = {
  "*.{ts,tsx}": [
    "prettier --parser typescript --write",
    "eslint",
    () => 'tsc -p tsconfig.json',
  ],
  "example/src/*.{ts,tsx}": [() => 'tsc -p example/tsconfig.json'],
  "*.json": [
    "prettier --write"
  ]
}