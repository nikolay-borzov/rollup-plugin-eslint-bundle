// TODO: Specify config type https://github.com/lint-staged/lint-staged/issues/1359
export default {
  '*.{js,cjs}': (filenames) => [
    `eslint --cache --fix ${filenames.join(' ')}`,
    'ava --fail-fast',
  ],
  // Lint all files when ESLint config is changed
  '.eslintrc.*': 'eslint --fix .',
  // Format supported non JavaScript files
  '!(*.{js,cjs})': 'prettier --write --ignore-unknown',
}
