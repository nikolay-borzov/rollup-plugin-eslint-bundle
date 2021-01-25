# rollup-plugin-eslint-bundle [![NPM version][npm-image]][npm-url] ![build](https://github.com/nikolay-borzov/rollup-plugin-eslint-bundle/workflows/CI/badge.svg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[npm-image]: https://img.shields.io/npm/v/rollup-plugin-eslint-bundle.svg
[npm-url]: https://npmjs.org/package/rollup-plugin-eslint-bundle
[rollup]: https://github.com/rollup/rollup
[eslint-config]: https://eslint.org/docs/developer-guide/nodejs-api#parameters

[Rollup] plugin to lint (and fix) bundled code with ESLint.


## Install

```sh
npm i -D rollup-plugin-eslint-bundle
```

## Usage

```js
// rollup.config.js
import { rollup } from 'rollup';
import { eslintBundle } from 'rollup-plugin-eslint-bundle';

module.exports = {
  input: path.resolve(__dirname, './main.js'),

  output: {
    file: path.resolve(__dirname, './dist/bundle.js'),
    format: 'es',
    plugins: [
      eslintBundle({
        eslintOptions: {
          fix: true,
        },
        throwOnWarning: true,
        throwOnError: true,
        formatter: 'compact'
      }),
    ],
  },
};

```

```js
// Rollup JavaScript API
const rollup = require('rollup');
const { eslintBundle } = require('rollup-plugin-eslint-bundle');

// ...

const bundle = await rollup.rollup({
  input: 'main.js'
});

await bundle.write({
  file: 'dist/bundle.js',
  format: 'es',
  plugins: [
    eslintBundle({
      eslintOptions: {
        fix: true,
      },
      throwOnWarning: true,
      throwOnError: true,
      formatter: 'compact'
    })
  ]
});

await bundle.close();
```

## Options

### `eslintOptions`

[ESLint class options object](https://eslint.org/docs/developer-guide/nodejs-api#parameters).

### `throwOnWarning`

Type: `boolean`

Default: `false`

If true, will throw an error if any warnings were found.

### `throwOnError`

Type: `boolean`

Default: `false`

If true, will throw an error if any errors were found.

### `formatter`

Type: `string`

Default: `undefined`

[Value](https://eslint.org/docs/developer-guide/nodejs-api#-eslintloadformatternameorpath) to be passed to `eslint.loadFormatter()`

## License

MIT License (MIT)

## Contributing

If you find a bug or think about enhancement, feel free to contribute and submit an issue or a pull request.
