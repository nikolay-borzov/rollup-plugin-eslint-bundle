const path = require('path')
const { eslintBundle } = require('../dist')

module.exports = {
  input: path.resolve(__dirname, './src.js'),

  output: {
    file: path.resolve(__dirname, './dist/bundle.js'),
    format: 'es',
    sourcemap: true,
    plugins: [
      eslintBundle({
        eslintOptions: {
          fix: true,
        },
      }),
    ],
  },
};
