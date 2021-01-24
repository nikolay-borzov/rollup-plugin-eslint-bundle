# rollup-plugin-eslint-bundle ![build](https://github.com/nikolay-borzov/rollup-plugin-eslint-bundle/workflows/CI/badge.svg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[rollup]: https://github.com/rollup/rollup
[eslint-config]: https://eslint.org/docs/developer-guide/nodejs-api#parameters

[Rollup] plugin to lint (and fix) bundled code with ESLint.


## Install

```sh
npm i rollup-plugin-eslint-bundle -D
```

## Usage

```js
import { rollup } from 'rollup';
import { eslintBundle } from 'rollup-plugin-eslint-bundle';

rollup({
  entry: 'main.js',
  plugins: [
    eslintBundle({
      eslintOptions: {
        fix: true
      },
      throwOnWarning: true,
      throwOnError: true,
      formatter: 'compact'
    })
  ]
});
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

[Value](https://eslint.org/docs/developer-guide/nodejs-api#-eslintloadformatternameorpath) to be passed to `eslint.loadFormatter()`

## License

MIT License (MIT)

## Contributing

If you find a bug or think about enhancement, feel free to contribute and submit an issue or a pull request.
