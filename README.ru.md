[![en](https://img.shields.io/badge/lang-en-%233c3b6e)](./)

[![NPM version][npm-image]][npm-url] [![install size](https://packagephobia.com/badge?p=rollup-plugin-eslint-bundle)](https://packagephobia.com/result?p=rollup-plugin-eslint-bundle) ![build](https://github.com/nikolay-borzov/rollup-plugin-eslint-bundle/workflows/CI/badge.svg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![npm type definitions](https://img.shields.io/npm/types/rollup-plugin-eslint-bundle)

# rollup-plugin-eslint-bundle

[npm-image]: https://img.shields.io/npm/v/rollup-plugin-eslint-bundle.svg
[npm-url]: https://npmjs.org/package/rollup-plugin-eslint-bundle
[rollup]: https://github.com/rollup/rollup
[eslint]: https://github.com/eslint/eslint
[eslint-config]: https://eslint.org/docs/developer-guide/nodejs-api#parameters

🍣 Плагин для [Rollup] для проверки и исправления собранного кода с помощью [ESLint].

## Требования

Плагин требует Node.js v20.x, Rollup v4.x и ESLint v8.x

## Установка

```sh
npm i -D rollup-plugin-eslint-bundle
```

## Использование

```js
// rollup.config.js ESM
import { rollup } from 'rollup'
import { eslintBundle } from 'rollup-plugin-eslint-bundle'

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
      formatter: 'compact',
    }),
  ],

  output: {
    file: path.resolve(root, './dist/bundle.js'),
    format: 'es',
  },
}
```

```js
// Rollup JavaScript API
import { rollup } from 'rollup'
import { eslintBundle } from 'rollup-plugin-eslint-bundle'

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
      formatter: 'compact',
    }),
  ],
})

await bundle.write({
  file: 'dist/bundle.js',
  format: 'es',
})

await bundle.close()
```

## Опции

|                  | Описание                                                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eslintOptions`  | [Параметры класса ESLint](https://eslint.org/docs/developer-guide/nodejs-api#parameters).                                                                                       |
| `throwOnWarning` | `boolean` (по умолчанию: `false`)<br>Выбрасывать исключение при наличии ошибок ESLint с уровнем `warn`.                                                                         |
| `throwOnError`   | `boolean` (по умолчанию: `false`)<br>Выбрасывать исключение при наличии ошибок ESLint с уровнем `error`.                                                                        |
| `formatter`      | `string` (по умолчанию: `undefined`)<br>[Значение](https://eslint.org/docs/developer-guide/nodejs-api#-eslintloadformatternameorpath) будет передано в `eslint.loadFormatter()` |

## Лицензия

MIT License (MIT)

## Поучаствовать

Предложения улучшений (PR) и сообщения о найденных дефектов (Issues) приветствуются. Вопросы можно обсудить в рамках Обсуждений.
