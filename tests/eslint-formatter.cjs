/**
 * @param {import('eslint').ESLint.LintResult[]} results
 * @returns {string}
 */
module.exports = function (results) {
  global.testEslintResults = results || []

  return ' '
}
