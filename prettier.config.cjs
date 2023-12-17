/** @type {import("prettier").Config} */
module.exports = {
  ...require('prettier-config-standard'),
  trailingComma: 'all', // Better for diffs
}
