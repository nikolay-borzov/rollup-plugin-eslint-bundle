/** @type {import("@commitlint/types").UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-case': [2, 'always', 'sentence-case'],
    'subject-case': [2, 'always', 'sentence-case'],
  },
}
