/* eslint-env node */
module.exports = {
  "*.{ts,tsx}": [
    "prettier --parser typescript --write",
    "eslint",
    () => 'tsc -p tsconfig.json',
  ],
  "*.json": [
    "prettier --write"
  ]
}