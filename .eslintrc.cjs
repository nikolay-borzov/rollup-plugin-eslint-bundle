module.exports = {
  root: true,

  ignorePatterns: [
    '**/*.*',
    '!**/*.js',
    'tests/fixtures',
    'coverage',
    'node_modules',
    'dist',
  ],

  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },

  env: {
    node: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended',
    'plugin:n/recommended',
    'plugin:unicorn/recommended',
    'prettier-standard/prettier-file',
  ],

  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },

  // Keep rules grouped by plugin and sorted alphabetically
  rules: {
    'padding-line-between-statements': [
      'error',
      /* Empty line after import */
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      /* Empty line before return */
      { blankLine: 'always', prev: '*', next: 'return' },
      /* Empty line after const, let */
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
      /* Empty line between case and default inside switch */
      { blankLine: 'always', prev: 'case', next: ['case', 'default'] },
    ],

    /* eslint-plugin-jsdoc */

    // Descriptions should be sentence-like not comment-like
    'jsdoc/require-description-complete-sentence': 'warn',
    'jsdoc/require-hyphen-before-param-description': [
      'error',
      'never',
      { tags: { property: 'never' } },
    ],
    // Adding JSDoc is preferable but not required
    'jsdoc/require-jsdoc': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-property-description': 'off',
    'jsdoc/require-returns-description': 'off',
    'jsdoc/require-returns': 'off',

    /* eslint-plugin-unicorn */

    // I like reduce
    'unicorn/no-array-reduce': 'off',

    /* eslint-plugin-import */

    // Require extension for imports. Required by Node.js with `type: "module"`
    'import/extensions': ['error', 'always', { ignorePackages: true }],
    // Force using only named exports
    'import/no-default-export': 'error',
    // Sort imports
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],

    /* eslint-plugin-prettier */

    'prettier/prettier': 'warn',

    /* eslint-plugin-n (node) */

    'n/no-unsupported-features/es-syntax': ['error'],
  },

  overrides: [
    // Test files
    {
      files: 'tests/**/*',
      extends: ['plugin:ava/recommended'],
    },
    // Config CommonJS files
    {
      files: '*.cjs',
      rules: {
        /* eslint-plugin-unicorn */

        'unicorn/prefer-module': 'off',
      },
    },
  ],
}
