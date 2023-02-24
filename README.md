[![NPM version][npm-image]][npm-url] [![install size](https://packagephobia.com/badge?p=rollup-plugin-eslint-bundle)](https://packagephobia.com/result?p=rollup-plugin-eslint-bundle) ![build](https://github.com/nikolay-borzov/rollup-plugin-eslint-bundle/workflows/CI/badge.svg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![npm type definitions](https://img.shields.io/npm/types/rollup-plugin-eslint-bundle)

# rollup-plugin-eslint-bundle

[npm-image]: https://img.shields.io/npm/v/rollup-plugin-eslint-bundle.svg
[npm-url]: https://npmjs.org/package/rollup-plugin-eslint-bundle
[rollup]: https://github.com/rollup/rollup
[eslint-config]: https://eslint.org/docs/developer-guide/nodejs-api#parameters

🍣 A [Rollup] plugin to lint and fix bundled code with ESLint.

## Requirements

This plugin requires an Node.js v18.x, Rollup v3.x and ESLint v8.x

## Install

```sh
npm i -D rollup-plugin-eslint-bundle
```

## Usage

```js
// rollup.config.js ESM
import { rollup } from 'rollup';
import { eslintBundle } from 'rollup-plugin-eslint-bundle';

const root = path.dirname(url.fileURLToPath(import.meta.url))

export default {
  input: path.resolve(root, './main.js'),

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

  output: {
    file: path.resolve(root, './dist/bundle.js'),
    format: 'es',
  },
};

```

```js
// Rollup JavaScript API
import { rollup } from 'rollup';
import { eslintBundle } from 'rollup-plugin-eslint-bundle';

// ...

const bundle = await rollup.rollup({
  input: 'main.js',
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

await bundle.write({
  file: 'dist/bundle.js',
  format: 'es',
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
