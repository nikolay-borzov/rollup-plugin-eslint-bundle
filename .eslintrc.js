module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  root: true,
  ignorePatterns: [
    '**/*.*',
    '!**/*.js',
    'tests/fixtures',
    'node_modules',
    'dist',
  ],
  env: {
    node: true,
  },
  plugins: ['prettier', 'standard', 'jsdoc'],
  extends: [
    'standard',
    'prettier',
    'plugin:prettier/recommended',
    'prettier/standard',
    'plugin:node/recommended',
    'plugin:jsdoc/recommended',
  ],
  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },
  rules: {
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns-description': 'off',
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules'],
      },
    ],
  },
}
