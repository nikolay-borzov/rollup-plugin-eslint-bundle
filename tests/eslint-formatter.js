/**
 * @param {import('../node_modules/@types/eslint/index').ESLint.LintResult[]} results
 * @returns {string}
 */
module.exports = function (results) {
  global.testEslintResults = results || []

  return ' '
}
